**PathwaysConnect**

**by JERNUAMBO Pathways**

*Full Application Specification, Feature Design & Build Roadmap*

| What PathwaysConnect Is PathwaysConnect is the official digital platform of JERNUAMBO Pathways NPO. It is not just an app. It is an entire ecosystem for South African learners, students, graduates and the communities around them. One platform. Eight powerful features. Zero excuses for any learner to be left behind. |
| :---- |

| Feature Module | What It Does | Inspired By |
| :---- | :---- | :---- |
| CONNECT — Mentor Matching | Tinder-style swipe matching between learners and student mentors | Tinder / Bumble BFF |
| VAULT — Secure Document Storage | Secure upload and storage of all academic and registration documents | Google Drive / Dropbox |
| SPARK — Daily Motivation | Daily motivational messages and multi-faith scripture library | YouVersion Bible App |
| THE CUBICLE — Video Tutoring | Live video tutoring sessions with screen sharing and whiteboard | Zoom / Google Meet |
| SOCIETIES — Campus Communities | University and college society groups for all students | Facebook Groups / Discord |
| GRAD DESK — Graduate Tutoring | Unemployed graduates offer tutoring to current students | Superprof / Tutor.com |
| BAZAAR — Student Marketplace | Buy and sell platform for student entrepreneurs | Facebook Marketplace |
| PULSE — Notifications & Feed | Central news feed for Pathways campaigns, funding alerts and events | Twitter / Instagram Feed |

**Available on Android  ·  iOS  ·  Web Browser**

Owner: JERNUAMBO Pathways NPO  |  April 2026  |  Strictly Confidential

# **1\. Why PathwaysConnect Exists**

The JERNUAMBO Pathways peer mentorship model was designed to be run on WhatsApp in Phase 1\. WhatsApp works. But it has critical limitations that will eventually kill the programme if not addressed:

| WhatsApp Limitation | What It Causes | How PathwaysConnect Solves It |
| :---- | :---- | :---- |
| Documents get lost in chat history | ID copies, matric results, NSFAS forms disappear | VAULT: permanent, organised, secure document storage per user |
| No structured matching | Coordinators manually pair learners and mentors | CONNECT: algorithm-based matching by field, location and availability |
| No verification of mentors | Anyone can claim to be a student | VAULT: proof of registration upload required before mentor status unlocked |
| Video calls go through personal numbers | Privacy risk for both parties | THE CUBICLE: in-app video calls — no number exchange required |
| No record of sessions | Progress tracking impossible | THE CUBICLE: session history, notes and recordings saved to VAULT |
| Community is fragmented | No shared space for university societies | SOCIETIES: verified campus communities in one place |
| Graduates have nowhere to monetise skills | Talent wasted after graduation | GRAD DESK: graduates earn income while helping current students |
| Student entrepreneurs have no platform | Business ideas die before launch | BAZAAR: zero-cost marketplace for student sellers |
| Motivation is ad hoc | No daily touchpoint to keep learners going | SPARK: daily automated motivation and scripture across all faiths |

# **2\. User Types & Profiles**

PathwaysConnect has five distinct user types. Each has a different profile, different features unlocked, and different verification requirements.

| User Type | Who They Are | Verification Required | Key Features Unlocked |
| :---- | :---- | :---- | :---- |
| LEARNER | Grade 11 or 12 learner at a secondary school | School name, grade, ID number (parent consent for under 18\) | CONNECT (as receiver), VAULT, SPARK, SOCIETIES (school), BAZAAR |
| STUDENT MENTOR | Currently enrolled tertiary student volunteering as mentor | Proof of registration, student number, institution name | CONNECT (as mentor), VAULT, SPARK, SOCIETIES, THE CUBICLE, BAZAAR, GRAD DESK (limited) |
| GRADUATE TUTOR | Unemployed or underemployed graduate offering tutoring | Degree/diploma certificate, student number, field of study | GRAD DESK (full), VAULT, SPARK, BAZAAR, SOCIETIES (alumni) |
| EDUCATOR / ADMIN | School teacher, university staff or Pathways coordinator | Institutional email verification | All features with oversight tools, progress dashboards, reporting |
| DONOR / CORPORATE | Company or individual sponsoring students | Business registration or ID, payment verification | PULSE feed, student profiles for funding, impact reports |

# **3\. Feature 1 — CONNECT: Mentor Matching**

| 🧠  CONNECT — Smart Mentor Matching *Tinder-style swipe interface that matches learners to the right student mentor based on career goals, subject profile and location.* Learner creates profile: name, school, grade, subjects and levels, top 3 career interests Mentor creates profile: institution, faculty, year of study, subjects they can assist with, languages spoken, availability Algorithm presents mentor cards to learner — learner swipes right (interested) or left (not a fit) When both swipe right OR when mentor accepts a learner request — they are MATCHED Match unlocks the private VAULT chat for that pair Unlike dating apps: mentors can see learner profiles fully before accepting — safety first Pathways coordinator can manually override and assign matches for rural learners with few options Each mentor can hold a maximum of 5 active learner matches at one time — quality over quantity |
| :---- |

### **Matching Algorithm Logic**

| Matching Factor | Weight | How It Works |
| :---- | :---- | :---- |
| Career field alignment | 40% | Learner wants to be a doctor → mentor studying Medicine, Nursing or Health Sciences ranked first |
| Subject overlap | 25% | Learner doing Maths and Science → mentor who studied same subjects ranked higher |
| Language match | 15% | Mentor who speaks learner’s home language ranked higher for comfort and understanding |
| Location proximity | 10% | Local mentors ranked higher for potential in-person sessions |
| Mentor rating | 10% | Mentors rated higher by previous learners appear more often |

### **Safety Features Built Into CONNECT**

* All users are verified before matching is enabled

* No personal phone numbers are ever shared — all communication is in-app

* Learners under 18 require parent or guardian consent during registration

* All chat content is monitored by AI for inappropriate language or behaviour

* Report and block function available at all times

* Pathways admin can access any chat thread if a safeguarding concern is flagged

* Mentors who receive 3 complaints are automatically suspended pending review

# **4\. Feature 2 — VAULT: Secure Document Storage & Chat**

| 📂  VAULT — Your Secure Academic Safe *A secure, organised document storage system and encrypted chat space for each matched learner-mentor pair. Files never get lost. Data lives here, not on WhatsApp.* Every matched pair gets a private VAULT space — only they and Pathways admin can access it Learner uploads: ID document, matric results (when available), school report, parent income proof for NSFAS, any bursary application documents Mentor uploads: proof of university registration, student card, faculty letter — verifying they are who they claim to be Documents are categorised automatically: Personal, Academic, Applications, Financial, Other Version history kept — if a learner uploads an updated report, the old one is archived not deleted In-app chat is linked to the VAULT — mentors can reference a document in chat by tagging it Export function: learner can download all documents in one ZIP file at any time Document expiry alerts: app notifies when NSFAS deadline is approaching or application window opens All data encrypted at rest and in transit — POPIA (Protection of Personal Information Act) compliant |
| :---- |

### **Document Checklist Built Into VAULT**

| Document | Who Uploads It | Why It Is Needed | Status Tracker |
| :---- | :---- | :---- | :---- |
| South African ID or Birth Certificate | Learner | NSFAS, university applications, all admin | Green tick when uploaded |
| Latest school report (Grade 11 / midyear Grade 12\) | Learner | Subject levels, APS score calculation | Green tick when uploaded |
| Final Grade 12 results (NSC) | Learner | University and TVET admission | Unlocks after results released |
| Parent/Guardian ID | Learner (parent submits) | NSFAS means test | Green tick when uploaded |
| Parent/Guardian payslip or SASSA proof | Learner (parent submits) | NSFAS means test | Green tick when uploaded |
| Proof of residence | Learner | NSFAS and some university applications | Green tick when uploaded |
| University application confirmation | Learner | Tracks which institutions applied to | Auto-populated from application module |
| NSFAS application reference number | Learner | Tracks that application was submitted | Mentor enters this after helping learner apply |
| Proof of registration (mentor) | Mentor | Verification of enrolled student status | Required before mentor profile goes live |

# **5\. Feature 3 — SPARK: Daily Motivation & Multi-Faith Library**

| ✨  SPARK — Daily Motivation & Spiritual Fuel *Every morning, every user receives a motivational message and a scripture or quote from their chosen faith tradition. Because a young person who is spiritually and mentally grounded performs better academically.* Daily push notification at a user-selected time (e.g. 6:00 AM) with a motivational message Message rotates through: Jernuambo philosophy quotes, general motivational quotes, youth success stories User selects their faith preference during onboarding — this determines their scripture feed Faith selections are strictly personal and never shared with mentors or other users Scripture library is available 24/7 for personal study — not just daily push Search function within each faith text — search by keyword, book, chapter or theme Bookmark and highlight function — users save their favourite passages Share function — share a motivational quote or scripture to any social platform No faith is promoted over another — all are presented with equal prominence and respect |
| :---- |

### **Faith Library Content**

| Faith Tradition | Text Available | Format |
| :---- | :---- | :---- |
| Christianity | The Holy Bible — multiple translations (NIV, KJV, NKJV, The Message) | Full text, searchable, bookmarkable |
| Islam | The Holy Quran — Arabic text with English translation (multiple translators) | Full text, searchable, audio recitation option |
| Hinduism | The Bhagavad Gita, The Upanishads | Full text, searchable, commentary notes |
| Judaism | The Torah (Five Books of Moses) with commentary | Full text, searchable |
| Buddhism | The Dhammapada, core sutras | Full text, searchable |
| African Traditional | Ubuntu philosophy texts, African proverbs collection | Curated collection, expandable |
| No religious preference | General motivational quotes — Jernuambo philosophy, Nelson Mandela, Maya Angelou, Stoic philosophy | Daily quote rotation |

Copyright note: All Biblical and Quranic texts are available in the public domain or under open licences. The app will source these through established open-source scripture APIs such as Bible API and Al-Quran Cloud API at zero cost.

# **6\. Feature 4 — THE CUBICLE: Video Tutoring**

| 💻  THE CUBICLE — Live Video Tutoring Space *A built-in video calling and tutoring space that works like Zoom or Google Meet, but lives inside PathwaysConnect. No external app needed. No phone number shared.* Learner or student requests a tutoring session through the app Session is scheduled in the in-app calendar — both parties receive a reminder 30 minutes before Video call launches inside the app — no external link, no Zoom account needed Features during the call: video, audio, screen sharing, in-app whiteboard, chat sidebar Session timer visible to both parties — sessions default to 45 minutes with 15-minute extension option Session is recorded (with both parties’ consent) and saved to both users’ VAULT for revision After the session: learner rates the tutor and leaves a brief feedback note Mentor and Graduate Tutor accumulate a star rating visible on their profile Group tutoring: mentor can host a cubicle session with up to 10 learners at once for group revision |
| :---- |

### **Cubicle Session Types**

| Session Type | Who Uses It | Max Participants | Duration | Cost to Learner |
| :---- | :---- | :---- | :---- | :---- |
| Mentor session | Matched learner \+ student mentor | 2 | 45–60 minutes | FREE (food voucher funded by Pathways) |
| Graduate tutor session | Any student \+ graduate tutor | 1–3 | 30–90 minutes | Paid — set by tutor (R50–R300/hour) |
| Group revision | Mentor \+ up to 10 learners | 11 | 60–90 minutes | FREE |
| Society study group | Society members | Up to 30 | Open duration | FREE |
| Pathways workshop | Pathways admin to all users | Unlimited (webinar mode) | 60–120 minutes | FREE |

### **Whiteboard Features**

* Draw, write and annotate in real time — both tutor and learner can write simultaneously

* Pre-loaded subject templates: maths graph paper, chemistry periodic table, essay planning grid

* Save and export whiteboard as PDF to VAULT at end of session

* Image upload to whiteboard — tutor uploads a past paper and annotates it live

# **7\. Feature 5 — SOCIETIES: Campus Community Groups**

| 🏛  SOCIETIES — Your Campus in Your Pocket *Every university, TVET college and secondary school has its own verified community space on PathwaysConnect. Societies are like Facebook Groups but exclusively for the educational community — verified, safe and purposeful.* Every registered institution has an official SOCIETY on PathwaysConnect Users are automatically added to their institution’s society when they verify their registration Within each institution, sub-societies exist: by faculty, by year of study, by interest, by residence Users can join up to 10 societies simultaneously Society features: posts, comments, polls, event announcements, file sharing, live streams Society admins are verified members elected by the community or appointed by Pathways SRC (Student Representative Council) integration: official SRC announcements posted to society feed Inter-society connections: students from different institutions can collaborate on specific topics No anonymous accounts — all society members are verified and identifiable to admins |
| :---- |

### **Society Types Available**

| Society Type | Example | Who Joins | Purpose |
| :---- | :---- | :---- | :---- |
| Institution Society | University of Johannesburg | All UJ students on PathwaysConnect | General campus community, announcements, events |
| Faculty Society | UJ Faculty of Engineering | Engineering students and lecturers | Course help, industry connections, career guidance |
| Residence Society | Wits Jubilee Hall | Residence students | Community, events, safety notices |
| Interest Society | SA Medical Students Association | Students across all institutions in medicine | Professional network, study resources, career events |
| Faith Society | Muslim Students Association — National | Students of same faith across institutions | Faith-based support, events, community |
| School Society | \[School Name\] Class of 2026 | All learners from that school on PathwaysConnect | Peer support, study groups, matric preparation |
| Alumni Society | UJ Law Alumni | Graduates of specific programme | Mentorship, networking, job opportunities |
| Pathways National | All PathwaysConnect users | Everyone | Campaigns, announcements, crowdfunding updates |

# **8\. Feature 6 — GRAD DESK: Graduate Tutoring**

| 🎓  GRAD DESK — Where Graduates Earn and Students Learn *Unemployed and underemployed graduates register as paid tutors, offering their expertise to current students studying the same or related courses. GRAD DESK creates employment for graduates while improving pass rates for students.* Graduate registers on PathwaysConnect with degree/diploma certificate and transcript Graduate creates a GRAD DESK profile: subject specialisations, tutoring style, hourly rate, availability Current students search for a tutor by subject, institution, price range and rating Student books a session and pays in-app (card, EFT or Pathways voucher for funded students) Session takes place in THE CUBICLE After session: student rates the graduate tutor — rating is visible on their public profile Pathways takes a 10–15% platform commission on each paid session — this funds the NPO Graduates set their own rates: R50–R500 per hour depending on level and subject Graduates who were themselves supported by Pathways as learners are featured as “Pathways Alumni Tutors” — closing the full circle |
| :---- |

### **Why This Feature Changes Lives**

| Beneficiary | How GRAD DESK Helps Them |
| :---- | :---- |
| Unemployed graduate | Earns R3,000–R15,000/month from tutoring while job searching — keeps skills sharp, CV active |
| Current student | Learns from someone who just passed the same exam — more relevant than a textbook |
| Pathways NPO | Earns platform commission that funds food bank and mentor food vouchers — self-sustaining revenue |
| Universities | Higher pass rates and student retention — university partnerships become easier to secure |
| South African economy | Graduate talent is utilised rather than wasted during the unemployment gap |

### **GRAD DESK Revenue Model**

* Graduate charges R100/hour for a tutoring session

* PathwaysConnect takes 12% platform fee \= R12

* Graduate receives R88 per hour

* At 20 hours per month: graduate earns R1,760, Pathways earns R240 from that one tutor

* At 500 active graduate tutors doing 20 hours/month: Pathways earns R120,000/month from GRAD DESK alone

* This becomes a major self-sustaining revenue stream for the NPO within Year 2

# **9\. Feature 7 — BAZAAR: Student Marketplace**

| 🛒  BAZAAR — The Student Entrepreneur’s Market *A peer-to-peer marketplace exclusively for students and learners to buy and sell products and services. No listing fees. No commission on the first R1,000 of monthly sales. Built to develop entrepreneurial skills from day one.* Any verified student or learner can list a product or service for free Categories: food and baking, handmade crafts, clothing and fashion, digital products (notes, study guides), services (graphic design, photography, hair, nails), textbooks and stationery, electronics Seller creates a listing: product name, photos (up to 5), description, price, delivery or collection options Buyer browses by category, institution, price range or keyword In-app messaging between buyer and seller — no personal numbers shared Payment options: EFT, card, cash on collection — escrow payment option for higher-value items Seller ratings build over time — trust is earned through the platform Pathways commission: 0% on first R1,000/month per seller, 8% above that — encourages growth without punishing beginners Featured seller programme: top sellers get promoted in the Pathways app feed and social media — free marketing for student entrepreneurs |
| :---- |

### **Why the BAZAAR Matters Beyond Buying and Selling**

| Skill Developed | How BAZAAR Teaches It |
| :---- | :---- |
| Product development | Students must think about what people want to buy — not just what they want to make |
| Pricing strategy | Setting a price that covers costs and makes a profit — real business thinking |
| Marketing and photography | Taking good product photos, writing compelling descriptions — practical skills |
| Customer service | Responding to messages, managing complaints, delivering on promises |
| Financial management | Tracking sales, managing cash flow, saving profits — all within the app dashboard |
| Brand building | Building a store identity and reputation through consistent quality and ratings |
| Entrepreneurial confidence | Making a first sale is one of the most empowering experiences a young person can have |

### **BAZAAR Revenue for Pathways**

* No commission on first R1,000/month per seller — this onboards sellers without friction

* 8% commission on sales above R1,000/month per seller

* At 200 active sellers averaging R2,000/month above the threshold: Pathways earns R16,000/month

* Featured listing promotion: R50–R200 per week for premium placement — additional revenue stream

* By Year 2 with 1,000 active sellers: BAZAAR generates R50,000–R100,000/month for the NPO

# **10\. Technical Specification — How to Build PathwaysConnect**

PathwaysConnect will be built in three phases. Each phase delivers a working product that can be used, demonstrated to funders and improved before the next phase begins.

## **10.1 Phase 1 — MVP (Minimum Viable Product)**

### **Target: Launch by October 2026**

| Feature | Included in MVP | Technology |
| :---- | :---- | :---- |
| User registration and verification | Yes | Firebase Authentication \+ manual admin verification |
| CONNECT — mentor matching | Yes (simplified — admin assigns matches, swipe UI in Phase 2\) | React Native \+ Node.js backend |
| VAULT — document upload and storage | Yes | Firebase Storage \+ Firestore database |
| In-app chat (text only) | Yes | Firebase Realtime Database or Stream Chat API |
| SPARK — daily motivational push notification | Yes | OneSignal push notifications \+ curated content database |
| Scripture library (Bible and Quran) | Yes | Bible API \+ Al-Quran Cloud API (both free) |
| SOCIETIES — institution groups (basic) | Yes | Firestore collections per institution |
| PULSE — news feed | Yes | Simple CMS-powered feed |
| THE CUBICLE — video calling | No — Phase 2 | Too complex for MVP |
| GRAD DESK — paid tutoring | No — Phase 2 | Payment gateway needed |
| BAZAAR — marketplace | No — Phase 2 | Payment gateway needed |

## **10.2 Phase 2 — Full Feature App**

### **Target: Launch by April 2027**

| Feature Added | Technology |
| :---- | :---- |
| CONNECT — full swipe matching algorithm | Custom matching algorithm, React Native swipe UI (react-native-deck-swiper) |
| THE CUBICLE — live video tutoring | Daily.co or Agora.io SDK — both have NPO pricing tiers |
| Whiteboard feature in Cubicle | Konva.js or Excalidraw embedded in React Native WebView |
| GRAD DESK — graduate tutor bookings and payments | Stripe or Peach Payments SA gateway |
| BAZAAR — student marketplace | Custom listings \+ Peach Payments for SA card processing |
| Additional faith libraries (Hindu, Buddhist, Ubuntu) | Curated content database, manual upload |
| SOCIETIES — full features (polls, events, file sharing) | Firestore \+ cloud functions |
| Rating and review system (mentors, tutors, sellers) | Firestore rating collections |
| In-app payment for food voucher compensation | Voucher code generation system tied to Shoprite API |

## **10.3 Phase 3 — Scale & Intelligence**

### **Target: Launch by October 2027**

* AI-powered matching algorithm (machine learning on match success rates)

* AI study assistant: learner asks a question, app gives guided explanation (not just an answer)

* APS score calculator: learner inputs subjects and levels, app calculates APS and shows which universities they qualify for

* University application tracker: integrated with NSFAS and CAO/direct institution portals

* Employer integration: companies post internship and learnership opportunities directly to GRAD DESK

* Analytics dashboard for Pathways admin: real-time data on all users, matches, sessions, sales and donations

* Offline mode: core features (VAULT, SPARK, scripture) available without data connection

* Data compression: entire app optimised for low-data environments — R5 data should get you through a session

## **10.4 Technology Stack Summary**

| Layer | Technology | Why This Choice | Estimated Cost |
| :---- | :---- | :---- | :---- |
| Mobile app | React Native (iOS \+ Android from one codebase) | One build serves both platforms — halves development cost | Included in dev cost |
| Web app | React.js (same codebase components reused) | Students without smartphones can access via browser | Included in dev cost |
| Backend / API | Node.js \+ Express | Fast, scalable, large developer community in SA | Included in dev cost |
| Database | Firebase Firestore | Real-time sync, scalable, generous free tier | R0–R800/month |
| File storage | Firebase Storage or AWS S3 | Secure, encrypted, scalable document storage | R200–R1,500/month |
| Authentication | Firebase Auth | Secure, supports phone, email, Google login | R0 (free tier) |
| Push notifications | OneSignal | Free up to 10,000 users, daily push for SPARK | R0–R500/month |
| Video calling | Daily.co or Agora.io | NPO pricing available, WebRTC-based, reliable in SA | R0–R3,000/month |
| Payments | Peach Payments (SA) | South African gateway, supports EFT \+ card \+ Instant EFT | 1.5–3.5% per transaction |
| Scripture APIs | Bible API \+ Al-Quran Cloud | Both free, well-documented, regularly updated | R0 |
| Hosting | Google Firebase Hosting or Vercel | Fast, secure, scalable | R0–R500/month |
| Analytics | Firebase Analytics \+ Mixpanel free tier | Track user behaviour to improve matching | R0–R500/month |

# **11\. Build Cost & Funding Plan**

## **11.1 Development Cost Estimates**

| Phase | What Gets Built | Development Cost | Timeline |
| :---- | :---- | :---- | :---- |
| **Phase 1 — MVP** | Registration, CONNECT (basic), VAULT, chat, SPARK, SOCIETIES (basic), PULSE | R40,000–R80,000 | 3–4 months |
| **Phase 2 — Full App** | Swipe matching, THE CUBICLE (video), GRAD DESK, BAZAAR, payments, ratings | R80,000–R160,000 | 4–6 months |
| **Phase 3 — AI & Scale** | AI matching, APS calculator, employer integration, offline mode, analytics | R150,000–R300,000 | 6–8 months |
| **TOTAL** |  | R270,000–R540,000 | 12–18 months total |

### **How to Reduce Development Cost Significantly**

* Apply to Google for Nonprofits: free Google Workspace, Google Cloud credits up to $100,000/year — this alone covers most hosting costs

* Apply to AWS Nonprofit Credits: free cloud hosting for qualifying NPOs

* Partner with a university ICT faculty: 4th-year or honours students build the MVP as a capstone project under supervision — cost is R0 to R20,000 for supervisor stipend

* Engage a SETA-funded ICT learnership cohort: students are paid by the SETA while building your app — you get the app, they get the qualification

* Use Appwrite or Supabase (open source Firebase alternatives) to avoid vendor lock-in and reduce long-term costs

* Post on Upwork or Contra for a South African React Native developer: R150–R400/hour vs R800–R1,500/hour for an agency

## **11.2 Realistic Phase 1 Budget with Cost Reduction**

| Cost Item | Full Price | With NPO Discounts/Partnerships | Notes |
| :---- | :---- | :---- | :---- |
| React Native developer (Phase 1, 3 months) | R60,000–R80,000 | R20,000–R40,000 | University partnership or Upwork freelancer |
| Firebase and hosting (Year 1\) | R5,000–R10,000 | R0–R2,000 | Google for Nonprofits credits |
| UI/UX design | R15,000–R30,000 | R5,000–R10,000 | Student designer from design faculty |
| Scripture API and content setup | R0 | R0 | Free APIs |
| Testing and quality assurance | R10,000–R20,000 | R5,000–R10,000 | University students as testers |
| App Store and Play Store fees | R1,500 (once-off) | R1,500 | Cannot be discounted |
| Domain and SSL | R500–R1,000 | R0 | Google for Nonprofits |
| **TOTAL PHASE 1** | R92,000–R141,000 | R31,500–R63,500 |  |

## **11.3 How to Fund the App Build**

| Funding Source | Amount Available | How to Apply | Timeline |
| :---- | :---- | :---- | :---- |
| Google for Nonprofits — Cloud Credits | Up to $100,000/year in cloud credits | google.com/nonprofits — free, takes 2–4 weeks | Apply immediately after NPO registration |
| Allan Gray Orbis Foundation | R50,000–R500,000 for youth development tech | allangrayfoundation.org | Annual application window |
| Innovation Hub — Gauteng | R100,000–R500,000 for social innovation tech | theinnovationhub.com | Rolling applications |
| NYDA Technology Grant | R50,000–R200,000 for youth digital solutions | nyda.gov.za | Quarterly applications |
| SETA ICT Learnership | R0 direct cost — SETA pays developer learners | mict.org.za (MICT SETA) | 6–8 week application process |
| University Partnership | R0 — capstone project | Approach UCT, Wits, UJ, UNISA, TUT ICT departments | Submit project brief to faculty head |
| Corporate tech sponsor | R100,000–R500,000 | Vodacom, MTN, Standard Bank, Microsoft all fund edu-tech NPOs | Part of overall sponsorship proposal |

# **12\. Data Privacy, Safety & Legal Compliance**

PathwaysConnect handles sensitive personal information about minors, students and graduates. POPIA (Protection of Personal Information Act) compliance is not optional — it is a legal requirement and a trust requirement.

| POPIA Requirement | How PathwaysConnect Complies |
| :---- | :---- |
| Lawful processing | All data collected only for stated purposes — matching, tutoring, marketplace, community |
| Purpose specification | Users told exactly what their data is used for during onboarding — written in plain language |
| Further processing limitation | Data is never sold to third parties. Donor data is kept separate from student data. |
| Information quality | Users can update or delete their own information at any time |
| Openness | Privacy policy published in-app and on website in plain English and Zulu |
| Security safeguards | All data encrypted at rest (AES-256) and in transit (TLS 1.3) |
| Data subject participation | Users can request full data download or full account deletion at any time |
| Minor consent | Users under 18 require parent/guardian consent during registration — verified via ID upload |
| Information Officer | Pathways appoints a designated Information Officer as required by POPIA |
| Breach notification | SARS and affected users notified within 72 hours of any data breach |

### **Child Safety Protocols**

* All learner accounts (under 18\) are marked as minor accounts with restricted features

* Minors cannot use BAZAAR or GRAD DESK

* Minors cannot initiate CUBICLE sessions — mentor must initiate

* All CUBICLE sessions involving a minor are logged and available to Pathways admin

* Mandatory reporting protocol: any inappropriate content involving a minor is reported to SAPS and social services immediately

* Anonymous tip line: any user can report a safeguarding concern without revealing their identity

# **13\. PathwaysConnect Revenue Model**

PathwaysConnect is owned by JERNUAMBO Pathways NPO. All revenue generated by the app goes back into funding the NPO’s programmes — the food bank, mentor vouchers, student crowdfunding and career expos.

| Revenue Stream | How It Works | Year 1 Projection | Year 2 Projection |
| :---- | :---- | :---- | :---- |
| GRAD DESK commission (12%) | 12% of all paid tutoring sessions on the platform | R0–R30,000 | R80,000–R200,000 |
| BAZAAR commission (8% above R1k/seller) | 8% of seller revenue above R1,000/month threshold | R0–R20,000 | R50,000–R150,000 |
| BAZAAR featured listings | R50–R200/week for premium product placement | R0–R10,000 | R30,000–R80,000 |
| Corporate society sponsorship | Company sponsors an institution’s society feed (branded content) | R0–R50,000 | R100,000–R300,000 |
| Data insights reports (anonymised) | Aggregate anonymised data reports sold to universities and government | R0 | R50,000–R150,000 |
| Premium SPARK (ad-free \+ extra content) | Optional R29/month premium for students who want expanded content | R0 | R30,000–R100,000 |
| **TOTAL APP REVENUE** |  | R0–R110,000 | R340,000–R980,000 |

| The Beautiful Loop GRAD DESK pays graduate tutors — solving graduate unemployment. Pathways takes 12% — funding the food bank that feeds the students those tutors are teaching. BAZAAR generates income for student entrepreneurs — who then spend some of it in the BAZAAR. Pathways takes 8% above R1,000 — funding more mentor food vouchers. The app generates revenue that pays for itself and the programmes — without depending on donors. This is what makes PathwaysConnect different from every other NPO digital tool in South Africa. |
| :---- |

# **14\. App Launch Plan — 2026 to 2027**

| Month | Action | Milestone |
| :---- | :---- | :---- |
| April–May 2026 | Apply for Google for Nonprofits. Brief university ICT faculty on capstone project. Draft app wireframes using Figma (free). Register pathwaysconnect.co.za domain. | Tech foundation laid |
| June–July 2026 | University capstone team or freelancer begins Phase 1 build. Content team begins curating SPARK daily messages and scripture database. Design team finalises UI. | **Phase 1 in development** |
| August–September 2026 | Beta testing with 50 selected learners and mentors. Fix bugs. Load all faith library content. Test VAULT document upload. Test SOCIETIES with 3 pilot institutions. | Beta app tested |
| October 2026 | **Phase 1 MVP live on Google Play Store and Apple App Store. Launch campaign on social media. First 500 users onboarded. Feature in Fund a Future 2026 crowdfunding campaign.** | MVP LIVE |
| November–December 2026 | Gather user feedback. Begin Phase 2 development (CUBICLE, GRAD DESK, BAZAAR). Apply for Allan Gray and NYDA tech grants. | **Phase 2 development begins** |
| February–March 2027 | **Phase 2 beta testing with pilot group. GRAD DESK soft launch with 20 graduate tutors. BAZAAR soft launch with 30 student sellers.** | **Phase 2 beta** |
| April 2027 | Full Phase 2 launch. Press release. Corporate partnership announcements. Target 5,000 users by end of April 2027\. | **Phase 2 LIVE** |
| October 2027 | **Phase 3 AI features begin. Employer integrations. APS calculator. 10,000+ users target. GRAD DESK generating R80,000+/month for NPO.** | **Phase 3 begins** |

# **15\. Investor & Tech Partner Pitch — PathwaysConnect**

**PathwaysConnect**

***One App. Eight Features. Zero Learners Left Behind.***

South Africa has a 45.5% youth unemployment rate. The majority of learners who fail to access tertiary education do not fail because of lack of talent. They fail because no one gave them the right information at the right time.

We built PathwaysConnect because we believe technology should be on the side of the learner. Not just a tool for those who already have access — but a lifeline for those who are one bad subject choice away from being excluded from the economy.

| What No Other App in South Africa Does PathwaysConnect matches learners to student mentors like Tinder — by career goal and subject profile. It stores their documents securely so nothing is lost on WhatsApp. It feeds their spirit with daily motivation and multi-faith scripture. It gives them a live tutoring cubicle without needing Zoom or a phone number. It connects them to their campus community without Facebook. It gives unemployed graduates a way to earn money by teaching what they know. It gives student entrepreneurs a marketplace to build a business from their dorm room. And it funds all of this through the platform itself — not just donor dependency. |
| :---- |

## **What We Are Looking For**

| Need | Amount | What It Delivers |
| :---- | :---- | :---- |
| **Phase 1 Build Partner** | R40,000–R80,000 or in-kind development | Working MVP live by October 2026 — 500 pilot users, 3 institutions |
| Cloud Infrastructure Sponsor | R50,000/year or Google for Nonprofits referral | Scalable hosting for 10,000+ users by April 2027 |
| Content Partnership | Non-monetary — scripture, motivational content, career guidance resources | SPARK and SOCIETIES richly populated from day one |
| University MOU Partnership | Non-monetary — institutional buy-in and student data verification | SOCIETIES and GRAD DESK launch with real verified communities |
| Corporate Tech Sponsor | R100,000–R500,000 | Fund Phase 2 and 3 — CUBICLE, GRAD DESK, BAZAAR, AI features |

| CLOSING STATEMENT We are not building another app. We are building the digital infrastructure that South Africa’s youth have never had. PathwaysConnect will be the first place a Grade 11 learner goes when they want to know what their future can look like. It will be the last place an unemployed graduate feels invisible. It will be the space where a student selling muffins from her room builds her first real business. Partner with us. Build this with us. Because every day we wait is another learner who falls through the cracks. PathwaysConnect — by JERNUAMBO Pathways. One app. Eight features. Zero learners left behind. Contact: \[Your Name\]  |  \[Email\]  |  \[Phone\] pathwaysconnect.co.za  |  JERNUAMBO Pathways NPO |
| :---- |

**PathwaysConnect — by JERNUAMBO Pathways**

*Sponsor a Future  ·  Build the Platform  ·  Change the Nation*

Document Date: April 2026  |  Version 1.0  |  STRICTLY CONFIDENTIAL