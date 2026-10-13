const http = require('http');
const { evaluateStudentQualification, getFilterOptions } = require('./matcher.cjs');
const { analyzeAcademicReport } = require('./ai.cjs');

const PORT = process.env.PORT || 5001;

const server = http.createServer(async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.url.startsWith('/api/programmes/qualify') && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      try {
        const parsed = JSON.parse(body || '{}');
        const result = await evaluateStudentQualification(parsed.marks, parsed.filters);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(result));
      } catch (err) {
        console.error('Server error /api/programmes/qualify:', err);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: err.message || 'Internal database error' }));
      }
    });
    return;
  }

  if (req.url.startsWith('/api/programmes/filters') && req.method === 'GET') {
    try {
      const result = await getFilterOptions();
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(result));
    } catch (err) {
      console.error('Server error /api/programmes/filters:', err);
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: err.message || 'Internal database error' }));
    }
    return;
  }

  if (req.url.startsWith('/api/ai/scan-report') && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      try {
        const parsed = JSON.parse(body || '{}');
        if (!parsed.image) {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Image data is required in the request payload.' }));
          return;
        }

        const result = await analyzeAcademicReport(parsed.image, parsed.mimeType || 'image/jpeg');
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(result));
      } catch (err) {
        console.error('Server error /api/ai/scan-report:', err);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: err.message || 'Error analyzing academic document' }));
      }
    });
    return;
  }

  res.statusCode = 404;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ error: 'Endpoint not found' }));
});

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`Tertiary Education API running on http://localhost:${PORT}`);
  });
}

module.exports = server;
