const fs = require('fs');
const path = require('path');
const dns = require('dns');
const { Pool } = require('pg');

// Auto-load .env if DATABASE_URL not set in environment
if (!process.env.DATABASE_URL) {
  try {
    const envPath = path.resolve(__dirname, '../.env');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      for (const line of content.split('\n')) {
        const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
        if (match && !process.env[match[1]]) {
          process.env[match[1]] = match[2].trim().replace(/^['"]|['"]$/g, '');
        }
      }
    }
  } catch (e) {
    // ignore
  }
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://root:root@localhost:5432/tertiary_education_sa',
  ssl: process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('localhost') ? { rejectUnauthorized: false } : false,
  connectionTimeoutMillis: 20000, // 20s allows Neon free tier compute to wake from sleep
  idleTimeoutMillis: 30000,
  max: 10,
  // Force IPv4 to prevent Windows ENETUNREACH / ETIMEDOUT delays on AWS IPv6 addresses
  lookup: (hostname, options, callback) => {
    return dns.lookup(hostname, { family: 4 }, callback);
  }
});

// NSC Level conversion helper
function getNSCLevel(pct) {
  const p = Number(pct) || 0;
  if (p >= 80) return 7;
  if (p >= 70) return 6;
  if (p >= 60) return 5;
  if (p >= 50) return 4;
  if (p >= 40) return 3;
  if (p >= 30) return 2;
  return 1;
}

// Calculate APS from marks (best 6 subjects excluding Life Orientation)
function calculateAPS(marks) {
  if (!marks || typeof marks !== 'object') return 0;
  return Object.entries(marks)
    .filter(([subject]) => !subject.toLowerCase().includes('life orientation'))
    .map(([, mark]) => getNSCLevel(mark))
    .sort((a, b) => b - a)
    .slice(0, 6)
    .reduce((sum, lvl) => sum + lvl, 0);
}

// Normalize subject names for fuzzy matching between student input and database subjects
function normalizeSubject(name) {
  if (!name) return '';
  const lower = name.toLowerCase().trim();
  if (lower.includes('math') && lower.includes('lit')) return 'Mathematical Literacy';
  if (lower === 'maths' || lower === 'mathematics' || lower === 'pure maths') return 'Mathematics';
  if (lower.includes('tech') && lower.includes('math')) return 'Technical Mathematics';
  if (lower === 'english hl' || lower === 'english home language' || lower === 'english (hl)') return 'English Home Language';
  if (lower === 'english fal' || lower === 'english first additional language' || lower === 'english (fal)') return 'English First Additional Language';
  if (lower === 'afrikaans hl' || lower === 'afrikaans home language' || lower === 'afrikaans (hl)') return 'Afrikaans Home Language';
  if (lower === 'afrikaans fal' || lower === 'afrikaans first additional language' || lower === 'afrikaans (fal)') return 'Afrikaans First Additional Language';
  if (lower.includes('physical') || lower === 'physics') return 'Physical Sciences';
  if (lower.includes('life science') || lower === 'biology') return 'Life Sciences';
  if (lower.includes('life orientation') || lower === 'lo') return 'Life Orientation';
  if (lower.includes('accounting')) return 'Accounting';
  if (lower.includes('business')) return 'Business Studies';
  if (lower.includes('economics')) return 'Economics';
  if (lower.includes('geography')) return 'Geography';
  if (lower.includes('history')) return 'History';
  if (lower.includes('tourism')) return 'Tourism';
  if (lower.includes('information tech') || lower === 'it') return 'Information Technology';
  if (lower.includes('computer app') || lower === 'cat') return 'Computer Applications Technology';
  return name.trim();
}

// Recognized official SA languages
const OFFICIAL_LANGUAGES = [
  'english', 'afrikaans', 'isizulu', 'isixhosa', 'sepedi', 'sesotho', 
  'setswana', 'xitsonga', 'siswati', 'tshivenda', 'isindebele', 'sign language'
];

function isLanguage(name) {
  if (!name) return false;
  const lower = name.toLowerCase();
  return OFFICIAL_LANGUAGES.some(lang => lower.includes(lang)) || lower.includes('language');
}

function isHomeLanguage(name) {
  if (!name) return false;
  const lower = name.toLowerCase();
  return (lower.includes(' hl') || lower.includes('home language') || lower.endsWith('hl') || lower.includes('(hl)')) && isLanguage(name);
}

function isAdditionalLanguage(name) {
  if (!name) return false;
  const lower = name.toLowerCase();
  return (lower.includes(' fal') || lower.includes('first additional') || lower.includes(' sal') || lower.includes('second additional') || lower.includes('(fal)')) && isLanguage(name);
}

function isMathSubject(name) {
  if (!name) return false;
  const lower = name.toLowerCase();
  return lower.includes('math') || lower.includes('mathematics') || lower.includes('wiskunde');
}

function isLifeOrientation(name) {
  if (!name) return false;
  const lower = name.toLowerCase();
  return lower.includes('life orientation') || lower === 'lo';
}

// Evaluate statutory National Senior Certificate (NSC) pass criteria and university endorsements
function evaluateNSCEndorsement(marks) {
  const entries = Object.entries(marks || {}).filter(([subj, m]) => subj && m !== undefined && m !== null && m !== '');
  const subjectCount = entries.length;

  const homeLangs = [];
  const additionalLangs = [];
  const otherLangs = [];
  let mathsSubj = null;
  let loSubj = null;

  for (const [subj, score] of entries) {
    const numScore = Number(score) || 0;
    if (isLifeOrientation(subj)) {
      loSubj = { name: subj, score: numScore, level: getNSCLevel(numScore) };
    } else if (isMathSubject(subj)) {
      mathsSubj = { name: subj, score: numScore, level: getNSCLevel(numScore) };
    } else if (isHomeLanguage(subj)) {
      homeLangs.push({ name: subj, score: numScore, level: getNSCLevel(numScore) });
    } else if (isAdditionalLanguage(subj)) {
      additionalLangs.push({ name: subj, score: numScore, level: getNSCLevel(numScore) });
    } else if (isLanguage(subj)) {
      otherLangs.push({ name: subj, score: numScore, level: getNSCLevel(numScore) });
    }
  }

  const allLanguages = [...homeLangs, ...additionalLangs, ...otherLangs];
  const hasHomeLanguage = homeLangs.length >= 1;
  const hasTwoLanguages = allLanguages.length >= 2;
  const hasMaths = !!mathsSubj;
  const hasLifeOrientation = !!loSubj;

  const validationIssues = [];
  if (!hasHomeLanguage) {
    validationIssues.push("No Home Language (HL) offered. NSC policy strictly requires at least 1 official Home Language passed at 40%+ (Level 3).");
  }
  if (!hasTwoLanguages) {
    validationIssues.push("Requires at least 2 official languages (1 Home Language + 1 Additional Language).");
  }
  if (!hasMaths) {
    validationIssues.push("Missing compulsory mathematical subject (Mathematics, Mathematical Literacy, or Technical Mathematics).");
  }
  if (!hasLifeOrientation) {
    validationIssues.push("Missing compulsory Life Orientation.");
  }
  if (subjectCount < 7) {
    validationIssues.push(`NSC requires a minimum of 7 subjects (currently ${subjectCount} registered).`);
  }

  // Non-LO subjects evaluated for 50%+ (Level 4) and 40%+ (Level 3) thresholds
  const nonLoEntries = entries
    .filter(([subj]) => !isLifeOrientation(subj))
    .map(([subj, score]) => ({ name: subj, score: Number(score) || 0, level: getNSCLevel(Number(score) || 0) }));

  const nonLoAt50 = nonLoEntries.filter(s => s.score >= 50).length;
  const nonLoAt40 = nonLoEntries.filter(s => s.score >= 40).length;
  const nonLoAt30 = nonLoEntries.filter(s => s.score >= 30).length;

  const bestHL = homeLangs.sort((a, b) => b.score - a.score)[0] || null;
  const passedHLAt40 = bestHL ? bestHL.score >= 40 : false;
  const passedSecondLangAt30 = allLanguages.filter(l => l !== bestHL).some(l => l.score >= 30);
  const passedLOAt40 = loSubj ? loSubj.score >= 40 : false;

  let endorsement = 'INVALID_OR_INCOMPLETE';
  let endorsementLabel = 'Invalid / Incomplete NSC Package';

  if (!hasHomeLanguage) {
    endorsement = 'INVALID_OR_INCOMPLETE';
    endorsementLabel = 'Invalid NSC (No Home Language)';
  } else if (!hasTwoLanguages || !hasMaths || !hasLifeOrientation || subjectCount < 7) {
    endorsement = 'INVALID_OR_INCOMPLETE';
    endorsementLabel = 'Incomplete NSC Package';
  } else if (passedHLAt40 && passedSecondLangAt30 && nonLoAt50 >= 4 && nonLoAt30 >= 6 && passedLOAt40) {
    endorsement = 'BACHELOR';
    endorsementLabel = "Bachelor's Degree Admission (B)";
  } else if (passedHLAt40 && passedSecondLangAt30 && nonLoAt40 >= 3 && nonLoAt30 >= 5 && passedLOAt40) {
    endorsement = 'DIPLOMA';
    endorsementLabel = 'Diploma Admission (D)';
  } else if (passedHLAt40 && nonLoAt40 >= 2 && nonLoAt30 >= 4) {
    endorsement = 'HIGHER_CERTIFICATE';
    endorsementLabel = 'Higher Certificate Admission (HC)';
  } else if (passedHLAt40 && nonLoAt40 >= 2 && nonLoAt30 >= 3) {
    endorsement = 'NSC_PASS';
    endorsementLabel = 'National Senior Certificate (Pass)';
  } else {
    endorsement = 'NOT_ACHIEVED';
    endorsementLabel = 'Did Not Meet Minimum NSC Pass';
  }

  return {
    isValid: validationIssues.length === 0,
    endorsement,
    endorsementLabel,
    hasHomeLanguage,
    homeLanguageName: bestHL ? bestHL.name : null,
    homeLanguageScore: bestHL ? bestHL.score : null,
    languageCount: allLanguages.length,
    hasMaths,
    hasLifeOrientation,
    subjectCount,
    nonLoAt50Count: nonLoAt50,
    nonLoAt40Count: nonLoAt40,
    validationIssues
  };
}

// Map student marks to normalized dictionary
function normalizeStudentMarks(marks) {
  const normalized = {};
  if (!marks) return normalized;
  for (const [key, val] of Object.entries(marks)) {
    const normKey = normalizeSubject(key);
    normalized[normKey] = Number(val) || 0;
    // Also retain original key
    normalized[key] = Number(val) || 0;
  }
  return normalized;
}

let cachedProgrammes = null;
let lastProgrammesFetch = 0;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes cache

// Load all programmes with their requirements from the Postgres DB
async function getProgrammesWithRequirements() {
  const now = Date.now();
  if (cachedProgrammes && (now - lastProgrammesFetch) < CACHE_TTL_MS) {
    return cachedProgrammes;
  }

  const query = `
    SELECT 
      p.programme_id,
      p.name AS programme_name,
      p.faculty,
      p.department,
      p.duration_years,
      p.study_mode,
      p.description AS programme_description,
      i.institution_id,
      i.name AS institution_name,
      i.province,
      i.city,
      i.institution_type,
      i.website AS institution_website,
      q.qualification_type,
      q.nqf_level,
      json_agg(
        json_build_object(
          'id', pr.requirement_id,
          'type', pr.requirement_type,
          'min_points', pr.minimum_points,
          'min_pct', pr.minimum_percentage,
          'min_lvl', pr.minimum_level,
          'choice_group', pr.choice_group,
          'operator', pr.comparison_operator,
          'is_mandatory', pr.is_mandatory,
          'description', pr.requirement_description,
          'subject_name', s.name,
          'subject_code', s.subject_code
        )
      ) AS requirements
    FROM programmes p
    JOIN institutions i ON p.institution_id = i.institution_id
    LEFT JOIN qualifications q ON p.qualification_id = q.qualification_id
    JOIN programme_requirements pr ON p.programme_id = pr.programme_id
    LEFT JOIN subjects s ON pr.subject_id = s.subject_id
    WHERE p.active = TRUE
    GROUP BY p.programme_id, p.name, p.faculty, p.department, p.duration_years, p.study_mode, p.description,
             i.institution_id, i.name, i.province, i.city, i.institution_type, i.website,
             q.qualification_type, q.nqf_level
    ORDER BY i.name ASC, p.name ASC
  `;

  const maxAttempts = 2;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const result = await pool.query(query);
      cachedProgrammes = result.rows;
      lastProgrammesFetch = Date.now();
      return result.rows;
    } catch (err) {
      console.warn(`[Neon DB] Attempt ${attempt} failed:`, err.message);
      if (attempt < maxAttempts) {
        console.log('[Neon DB] Retrying in 2s (waiting for compute wake-up)...');
        await new Promise(r => setTimeout(r, 2000));
        continue;
      }
      throw err;
    }
  }
}

// Evaluate qualifications for a student
async function evaluateStudentQualification(studentMarks, filters = {}) {
  const normalizedMarks = normalizeStudentMarks(studentMarks);
  const studentAPS = calculateAPS(normalizedMarks);
  const nscStatus = evaluateNSCEndorsement(studentMarks);
  const rows = await getProgrammesWithRequirements();

  const results = [];

  for (const prog of rows) {
    // Apply optional filters
    if (filters.institution && prog.institution_name.toLowerCase() !== filters.institution.toLowerCase()) {
      continue;
    }
    if (filters.province && prog.province && prog.province.toLowerCase() !== filters.province.toLowerCase()) {
      continue;
    }
    if (filters.institution_type && prog.institution_type !== filters.institution_type) {
      continue;
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const match = prog.programme_name.toLowerCase().includes(q) ||
                    prog.institution_name.toLowerCase().includes(q) ||
                    (prog.faculty && prog.faculty.toLowerCase().includes(q));
      if (!match) continue;
    }

    const checks = [];
    let apsOk = true;
    let apsGap = 0;
    let minApsRequired = null;

    // Statutory Higher Education Endorsement Check
    const qualType = (prog.qualification_type || '').toLowerCase();
    const progName = (prog.programme_name || '').toLowerCase();
    const nqf = prog.nqf_level || 0;

    const isDegree = qualType.includes('degree') || qualType.includes('bachelor') || progName.includes('bachelor') || progName.startsWith('b ') || progName.startsWith('bsc') || progName.startsWith('bcom') || progName.startsWith('ba ') || progName.startsWith('beng') || nqf >= 7;
    const isDiploma = qualType.includes('diploma') || progName.includes('diploma') || nqf === 6;
    const isHigherCert = qualType.includes('higher certificate') || progName.includes('higher certificate') || nqf === 5;

    let statutoryPassOk = true;
    let statutoryGap = null;

    if (isDegree) {
      if (nscStatus.endorsement !== 'BACHELOR') {
        statutoryPassOk = false;
        if (!nscStatus.hasHomeLanguage) {
          statutoryGap = 'Statutory Block: NSC cannot be awarded without an official Home Language (HL). Bachelor admission requires NSC with Bachelor Pass.';
        } else if (nscStatus.endorsement === 'DIPLOMA' || nscStatus.endorsement === 'HIGHER_CERTIFICATE' || nscStatus.endorsement === 'NSC_PASS') {
          statutoryGap = `Statutory Block: Requires NSC Bachelor's Degree Admission endorsement (Current: ${nscStatus.endorsementLabel})`;
        } else {
          statutoryGap = `Statutory Block: Does not meet minimum NSC Bachelor's admission rules (${nscStatus.validationIssues[0] || 'Incomplete package'})`;
        }
      }
    } else if (isDiploma) {
      if (nscStatus.endorsement !== 'BACHELOR' && nscStatus.endorsement !== 'DIPLOMA') {
        statutoryPassOk = false;
        if (!nscStatus.hasHomeLanguage) {
          statutoryGap = 'Statutory Block: Missing Home Language (HL). Diploma admission requires an NSC with Diploma Pass endorsement.';
        } else {
          statutoryGap = `Statutory Block: Requires at least NSC Diploma Admission endorsement (Current: ${nscStatus.endorsementLabel})`;
        }
      }
    } else if (isHigherCert) {
      if (nscStatus.endorsement !== 'BACHELOR' && nscStatus.endorsement !== 'DIPLOMA' && nscStatus.endorsement !== 'HIGHER_CERTIFICATE') {
        statutoryPassOk = false;
        statutoryGap = 'Statutory Block: Requires at least Higher Certificate Admission endorsement';
      }
    }

    if (isDegree || isDiploma || isHigherCert) {
      checks.push({
        type: 'STATUTORY_ADMISSION',
        name: isDegree ? "NSC Bachelor's Degree Admission" : (isDiploma ? "NSC Diploma Admission" : "NSC Higher Certificate Admission"),
        required: isDegree ? "Bachelor Pass (40%+ HL, 4x 50%+ subjects, 2x 30%+)" : (isDiploma ? "Diploma Pass (40%+ HL, 3x 40%+ subjects)" : "Higher Certificate Pass"),
        achieved: nscStatus.endorsementLabel,
        passed: statutoryPassOk,
        gap: statutoryGap
      });
    }

    const choiceGroups = {};
    const compulsorySubjectReqs = [];
    const nonSubjectReqs = [];

    // Categorize requirements
    for (const req of prog.requirements) {
      if (req.type === 'APS') {
        minApsRequired = req.min_points;
        const passed = studentAPS >= req.min_points;
        if (!passed) {
          apsOk = false;
          apsGap = req.min_points - studentAPS;
        }
        checks.push({
          type: 'APS',
          name: 'Overall APS Score',
          required: req.min_points,
          achieved: studentAPS,
          passed,
          gap: !passed ? `Need +${apsGap} APS point${apsGap > 1 ? 's' : ''}` : null
        });
      } else if (req.type === 'NSC_SUBJECT') {
        if (req.choice_group) {
          if (!choiceGroups[req.choice_group]) choiceGroups[req.choice_group] = [];
          choiceGroups[req.choice_group].push(req);
        } else {
          compulsorySubjectReqs.push(req);
        }
      } else {
        nonSubjectReqs.push(req);
      }
    }

    let compulsorySubjectsOk = true;
    const subjectGaps = [];

    // Evaluate compulsory subjects (AND)
    for (const req of compulsorySubjectReqs) {
      const normSubjName = normalizeSubject(req.subject_name);
      const mark = normalizedMarks[normSubjName] !== undefined ? normalizedMarks[normSubjName] : (normalizedMarks[req.subject_name] ?? 0);
      const lvl = getNSCLevel(mark);

      let passed = true;
      let gapText = null;

      if (req.min_lvl && lvl < req.min_lvl) {
        passed = false;
        const lvlDiff = req.min_lvl - lvl;
        gapText = mark === 0 ? `Missing ${req.subject_name} (Need Level ${req.min_lvl})` : `Need Level ${req.min_lvl} (+${lvlDiff} level${lvlDiff > 1 ? 's' : ''})`;
      } else if (req.min_pct && mark < req.min_pct) {
        passed = false;
        const pctDiff = req.min_pct - mark;
        gapText = mark === 0 ? `Missing ${req.subject_name} (Need ${req.min_pct}%)` : `Need ${req.min_pct}% (+${pctDiff}%)`;
      }

      if (!passed) {
        compulsorySubjectsOk = false;
        subjectGaps.push(gapText);
      }

      checks.push({
        type: 'NSC_SUBJECT',
        name: req.subject_name,
        required: req.min_lvl ? `Level ${req.min_lvl}` : `${req.min_pct}%`,
        achieved: mark > 0 ? (req.min_lvl ? `Level ${lvl} (${mark}%)` : `${mark}%`) : 'Not Taken',
        passed,
        gap: gapText
      });
    }

    // Evaluate choice groups (OR)
    let choiceGroupsOk = true;
    for (const [groupName, reqs] of Object.entries(choiceGroups)) {
      let groupPassed = false;
      const optionDetails = [];

      for (const req of reqs) {
        const normSubjName = normalizeSubject(req.subject_name);
        const mark = normalizedMarks[normSubjName] !== undefined ? normalizedMarks[normSubjName] : (normalizedMarks[req.subject_name] ?? 0);
        const lvl = getNSCLevel(mark);

        let optionPassed = true;
        if (req.min_lvl && lvl < req.min_lvl) optionPassed = false;
        if (req.min_pct && mark < req.min_pct) optionPassed = false;
        if (mark === 0) optionPassed = false;

        optionDetails.push({
          subject: req.subject_name,
          required: req.min_lvl ? `Level ${req.min_lvl}` : `${req.min_pct}%`,
          achieved: mark > 0 ? `Level ${lvl} (${mark}%)` : 'Not Taken',
          passed: optionPassed
        });

        if (optionPassed) {
          groupPassed = true;
        }
      }

      if (!groupPassed) {
        choiceGroupsOk = false;
        const summary = reqs.map(r => `${r.subject_name} (Lvl ${r.min_lvl || ''})`).join(' OR ');
        subjectGaps.push(`Need one of: ${summary}`);
      }

      checks.push({
        type: 'CHOICE_GROUP',
        groupName,
        name: `Subject Option (${reqs.map(r => r.subject_name).join(' OR ')})`,
        options: optionDetails,
        passed: groupPassed,
        gap: !groupPassed ? `Requires either option` : null
      });
    }

    // Include non-subject notes
    for (const req of nonSubjectReqs) {
      if (req.type === 'ADDITIONAL_SELECTION') {
        checks.push({
          type: 'ADDITIONAL_SELECTION',
          name: 'Additional Selection Criteria',
          description: req.description || 'Audition, portfolio, interview or NBT score required',
          isAdvisory: true
        });
      } else if (req.type === 'ENDORSEMENT') {
        checks.push({
          type: 'ENDORSEMENT',
          name: 'Matric Endorsement',
          description: req.description || 'National Senior Certificate Bachelor / Diploma endorsement required',
          isAdvisory: true
        });
      }
    }

    if (!statutoryPassOk && statutoryGap) {
      subjectGaps.push(statutoryGap);
    }

    // Final qualification status
    const isDirectlyEligible = apsOk && compulsorySubjectsOk && choiceGroupsOk && statutoryPassOk;
    
    // Near Miss calculation: e.g. APS gap <= 4 or only 1 subject missed by 1 level (requires statutory pass)
    const isNearMiss = !isDirectlyEligible && statutoryPassOk && (
      (apsGap <= 4 && compulsorySubjectsOk && choiceGroupsOk) ||
      (apsOk && subjectGaps.length === 1 && !subjectGaps[0].startsWith('Missing') && !subjectGaps[0].startsWith('Statutory'))
    );

    let status = 'NOT_QUALIFIED';
    if (isDirectlyEligible) {
      status = 'QUALIFIED';
    } else if (isNearMiss) {
      status = 'NEAR_MISS';
    }

    results.push({
      programme_id: prog.programme_id,
      programme_name: prog.programme_name,
      faculty: prog.faculty,
      department: prog.department,
      duration_years: prog.duration_years,
      study_mode: prog.study_mode,
      programme_description: prog.programme_description,
      institution_name: prog.institution_name,
      province: prog.province,
      city: prog.city,
      institution_type: prog.institution_type,
      institution_website: prog.institution_website,
      qualification_type: prog.qualification_type,
      nqf_level: prog.nqf_level,
      min_aps: minApsRequired,
      status,
      checks,
      gaps: subjectGaps.concat(apsGap > 0 ? [`APS +${apsGap} point${apsGap > 1 ? 's' : ''}`] : [])
    });
  }

  // Sort: QUALIFIED first, then NEAR_MISS, then NOT_QUALIFIED
  results.sort((a, b) => {
    const rank = { 'QUALIFIED': 1, 'NEAR_MISS': 2, 'NOT_QUALIFIED': 3 };
    if (rank[a.status] !== rank[b.status]) return rank[a.status] - rank[b.status];
    if (a.institution_name !== b.institution_name) return a.institution_name.localeCompare(b.institution_name);
    return a.programme_name.localeCompare(b.programme_name);
  });

  const qualifiedCount = results.filter(r => r.status === 'QUALIFIED').length;
  const nearMissCount = results.filter(r => r.status === 'NEAR_MISS').length;

  return {
    student_aps: studentAPS,
    nsc_status: nscStatus,
    total_programmes_evaluated: rows.length,
    qualified_count: qualifiedCount,
    near_miss_count: nearMissCount,
    results
  };
}

let cachedFilters = null;
let lastFiltersFetch = 0;

// Get filter choices (Institutions, Provinces, Faculties)
async function getFilterOptions() {
  const now = Date.now();
  if (cachedFilters && (now - lastFiltersFetch) < CACHE_TTL_MS) {
    return cachedFilters;
  }

  const instQuery = `
    SELECT DISTINCT i.name, i.province, i.institution_type
    FROM institutions i
    JOIN programmes p ON i.institution_id = p.institution_id
    JOIN programme_requirements pr ON p.programme_id = pr.programme_id
    ORDER BY i.name ASC
  `;

  const maxAttempts = 2;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const result = await pool.query(instQuery);
      const institutions = result.rows.map(r => r.name);
      const provinces = [...new Set(result.rows.map(r => r.province).filter(Boolean))].sort();
      cachedFilters = { institutions, provinces };
      lastFiltersFetch = Date.now();
      return cachedFilters;
    } catch (err) {
      console.warn(`[Neon DB Filter] Attempt ${attempt} failed:`, err.message);
      if (attempt < maxAttempts) {
        await new Promise(r => setTimeout(r, 2000));
        continue;
      }
      throw err;
    }
  }
}

module.exports = {
  pool,
  getNSCLevel,
  calculateAPS,
  evaluateStudentQualification,
  getFilterOptions
};
