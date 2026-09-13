// Chapter roster, transcribed from the approved MetroMD redesign.
// Headshots live in public/images and are matched to members by surname.
//
// A person can sit on more than one roster — Jennifer Hanks is both an officer
// and an advisor, as are Richard Hanks and John Wilkinson. Their details live
// once, in `people`; each roster below is a list of seats naming the person and
// the role that seat carries. Edit a bio, headshot or LinkedIn in `people` and
// every roster the person sits on picks it up.

/** Everything true of a person regardless of which roster they sit on. */
export interface Person {
  name: string;
  org: string | null;
  sector: string | null;
  email: string | null;
  linkedin: string | null;
  /** Path under /public, or null when no headshot has been supplied yet. */
  image: string | null;
  bio: string | null;
}

export const people = {
  "jennifer-hanks": {
    name: "Jennifer Hanks, CFCM, Fellow",
    org: "Founder & CEO, MMC Government Solutions",
    sector: "Industry, Former Government (Federal)",
    email: null,
    linkedin: "https://www.linkedin.com/in/jahanks/",
    image: "/images/board-hanks.jpeg",
    bio: "Jennifer Hanks serves as CEO of MMC Government Solutions, a mission-driven firm that Empowers the Possible by advancing excellence, efficiency, and innovation across the federal enterprise. Having managed a portfolio exceeding $6 billion across 10 agencies and operations in 8 countries, MMC leads digital transformation initiatives at the intersection of procurement efficiency and human capital development. Leveraging its patent-pending Thermal Intelligence™ technology, MMC is charting new territory towards acquisition modernization. A former federal contracting officer, Jennifer brings nearly two decades of experience in acquisition management and a deep understanding of the challenges faced by today's procurement professionals. She is widely recognized for her ability to bridge policy and execution, translating workforce and operational challenges into sustainable, scalable solutions that drive measurable impact. Beyond her role at MMC, Jennifer is a respected leader within the National Contract Management Association (NCMA). As co-founder of the NCMA Metro Maryland Chapter, launched in 2024, she helped establish a vibrant hub for industry collaboration, professional development, and mentorship empowering contracting professionals to connect, grow, and lead across government and industry. A classically trained violist, Jennifer holds an M.S. in Management from The Catholic University of America, a Master's Certificate in Government Contracting from The George Washington University, and a B.M. in Music from the University of Miami. She resides in Maryland with her husband, Richard, and their three daughters.",
  },
  "chyanne-thomas": {
    name: "Chyanne Thomas",
    org: "Founder & CEO, Aurelus Solutions LLC · Army Veteran",
    sector: "Industry",
    email: null,
    linkedin: "https://www.linkedin.com/in/mschyannet/",
    image: "/images/board-thomas.png",
    bio: "Chyanne Thomas serves as the Vice President of Marketing and Communications for the NCMA MetroMD Chapter, leading strategic branding, outreach, and member engagement efforts. A U.S. Army Veteran and CEO of Aurelus Solutions LLC, she brings over a decade of leadership experience. As an Amazon #1 Best-Selling Author and personal coach her passion is to empower others to lead and live with purpose through personal transformation.",
  },
  "patience-ibik": {
    name: "Patience Ibik",
    org: "Resolute Consulting",
    sector: "Industry",
    email: null,
    linkedin: "https://www.linkedin.com/in/patience-ibik-bb2339a1/",
    image: "/images/board-ibik.jpeg",
    bio: null,
  },
  "bethlehem-belaineh": {
    name: "Bethlehem Belaineh",
    org: "Founder & CEO, Theory AI",
    sector: "Industry",
    email: null,
    linkedin: "https://www.linkedin.com/in/bbelaineh",
    image: "/images/board-belaineh.png",
    bio: "Bethlehem is the Founder & CEO of Theory AI, a dynamic technology consulting firm, and agoras health based in Washington, DC. Through her work with her startups, Bethlehem leads the development and launch of workflow automation, gamification, and other exciting products that speed up business needs and enhance user engagement for customers and stakeholders across diverse contexts and markets. Theory AI delivers AI-native Market Research, Product/Software Development, and Management Consulting services that address complex challenges in healthcare, education, and federal sectors to a wide variety of clients ranging from Government Technology firms to High-Growth startups. A thought leader in the Artificial Intelligence (AI) space, and with over a decade of experience in product management and strategy, Bethlehem holds multiple SCRUM certifications, such as ScrumMaster (CSM) and Scrum Product Owner (CSPO), and Advanced Scrum Product Owner (A-CSPO). Bethlehem holds a Bachelor of Science (BS) in Biological Physics, Economics from Brandeis University, a Master of Engineering degree in Data Analytics Engineering (MEng) from George Mason University and is working on completing her Masters of Information Systems (MIS) from George Mason University as well as a Masters of Business Administration (MBA) from Northwestern University.",
  },
  "monique-frazier": {
    name: "Monique Frazier",
    org: "Infosys Public Services",
    sector: "Industry",
    email: null,
    linkedin: "https://www.linkedin.com/in/monique-frazier-mba/",
    image: "/images/board-frazier.jpeg",
    bio: null,
  },
  "antavia-grimsley": {
    name: "Antavia Grimsley",
    org: "Elite Veteran Enterprises, LLC",
    sector: "Government (Federal)",
    email: null,
    linkedin: "https://www.linkedin.com/in/antaviagrimsley/",
    image: "/images/board-grimsley.jpeg",
    bio: null,
  },
  "richard-hanks": {
    name: "Richard Hanks",
    org: "MMC Government Solutions",
    sector: "Industry, Former Government (State/Local)",
    email: null,
    linkedin: "https://www.linkedin.com/in/richarddhanksmmc/",
    image: "/images/board-hanksrd.jpeg",
    bio: null,
  },
  "sonya-hopson": {
    name: "Sonya Hopson",
    org: "Founder & CEO, Sage Services Group LLC",
    sector: "Industry, Former Government (Federal)",
    email: null,
    linkedin: "https://linkedin.com/in/sonya-hopson-97817020",
    image: "/images/board-hopson.jpeg",
    bio: "Sonya is the CEO of Sage Services Group LLC, a professional services firm. For 15 years, Sage has provided training, human capital, engineering, and project management services to more than 20 government and commercial clients. Over the last 15 years, Sage's strategic guidance on mission critical projects has propelled organizations to optimal operational performance and sustained organizational effectiveness. Sonya is a graduate of Norfolk State (Physics), UMD (Mechanical Engineering), and George Washington University (Education Leadership). She is an active volunteer in the following organizations DECA, NCMA, NMSDC, WBENC, as well as her church and her sorority.",
  },
  "lester-l-ingol": {
    name: "Lester L. Ingol",
    org: "Chief Operating Officer, Blue Line Global, LLC",
    sector: "Industry, Former Government (Federal)",
    email: null,
    linkedin: "https://www.linkedin.com/in/lester-l-ingol-b09591a1/",
    image: "/images/board-ingol.jpeg",
    bio: "Lester L. Ingol serves as the Chief Operating Officer of Blue Line Global, LLC, where he leads the firm’s strategic and operational execution across its diverse mission portfolio. In this capacity, he drives organizational performance, operational excellence, and sustainable growth, ensuring alignment between enterprise objectives and client impact. Mr. Ingol is known for cultivating high-performing teams, instituting disciplined management frameworks, and applying mission-focused leadership grounded in decades of federal service. Prior to joining Blue Line Global, Mr. Ingol held multiple senior executive roles within the Federal Emergency Management Agency (FEMA), including Assistant Administrator for the Office of Business Management and Acting Chief Security Officer. Overseeing a $9 billion budget, he led complex portfolios in procurement, logistics, workforce development, and continuity readiness, shaping enterprise resilience and fiscal accountability. As Deputy Head of the Contracting Activity, he directed a $3.76 billion acquisition portfolio and nearly 10,000 annual procurement transactions, modernizing acquisition governance and performance oversight. A U.S. Marine Corps veteran and former U.S. Army Contracting Officer, Mr. Ingol has supported national responses to crises from Hurricane Katrina to the COVID-19 pandemic. He holds a Master’s in Management and Leadership from Webster University, a Bachelor’s in Management from Park University, and is a Senior Executive Fellow of Harvard University’s Kennedy School of Government and an alumnus of The Brookings Institution Executive Leadership Program.",
  },
  "darrell-mcgraw": {
    name: "Darrell McGraw",
    org: "President & CEO, Q2 Consulting Solutions LLC",
    sector: "Industry",
    email: null,
    linkedin: "https://www.linkedin.com/in/darrell-mcgraw-6b30911/",
    image: "/images/board-mcgraw.png",
    bio: "Mr. McGraw is President and CEO of Q2 Consulting Solutions LLC, a certified 8(a) company and Maryland State certified MBE, DBE, and SBE. He is an experienced executive and entrepreneur with over 25 years of technical management consulting experience with Fortune 500 companies including KPMG, Booz Allen Hamilton, and Accenture. He has been instrumental in bridging the gaps between technology and professional services for Federal clients to include digital and transformational efforts. Mr. McGraw holds a Master of Science (MS) in Information Systems Technology from George Washington University and a Bachelor of Art (BS) in Economics from the University of Maryland. He is also a certified Project Management Professional (PMP), Scheduling Professional (PMI-SP), LSS Green Belt, ITIL and Scum Master. In his spare time, he loves to give back to the community via non-profits, providing executive level guidance, governance, partnerships and management consulting advisory support as well as an active member of his Church – Mt. Calvary Baptist Church in Rockville Md.",
  },
  "dawn-moore": {
    name: "COL Dawn Moore",
    org: "Office of the Chief, Army Reserve",
    sector: "Government (Federal)",
    email: null,
    linkedin: "https://www.linkedin.com/in/dawn-moore-6595074b/",
    image: "/images/board-moore.jpeg",
    bio: null,
  },
  "cynthia-pace": {
    name: "Dr. Cynthia Pace",
    org: "C. O. Pace, “The Leadership Guru,” LLC",
    sector: "Industry",
    email: null,
    linkedin: "https://www.linkedin.com/in/dr-cynthia-pace-50a5b936a/",
    image: "/images/board-pace.png",
    bio: null,
  },
  "joye-sistrunk": {
    name: "Joye Sistrunk, CPA",
    org: "President & CEO, Premier Group Services, Inc.",
    sector: "Industry",
    email: null,
    linkedin: "https://www.linkedin.com/in/joyessistrunkcpa",
    image: "/images/board-sistrunk.jpeg",
    bio: "Joye Sistrunk, CPA, is founder and CEO of Premier Group Services, Inc., a Forbes Top 200 CPA firm established in 2005. As an Air Force Reserves veteran with degrees in Accounting and International Business, she brings unique expertise in federal compliance and procurement to lead a team of over 40 professionals delivering audit and advisory services nationwide. Under Joye's leadership, Premier Group has become a trusted partner to federal agencies, Offices of Inspector General, and government contractors, including DOE OIG, EPA, USTDA, and AmeriCorps. The firm specializes in GAGAS-compliant financial statement audits, federal grant compliance reviews, single audits, cybersecurity assessments, and performance audits. Premier Group holds multiple small business certifications—WOSB, EDWOSB, SDB, VOSB, and SDVOSB—reflecting Joye's commitment to expanding opportunities for diverse businesses in federal contracting. Her military service instilled values of integrity, discipline, and mission focus that shape the firm's culture and approach to client service. Joye's expertise in federal regulations, combined with her entrepreneurial vision, has positioned Premier Group as a premier provider of compliance and audit services. Her leadership demonstrates how technical excellence, combined with deep understanding of government operations, creates lasting value for public sector clients and strengthens accountability in federal programs.",
  },
  "patricia-akinrogunde": {
    name: "Dr. Patricia Akinrogunde",
    org: "Founder & CEO, The Triple Joy Group, LLC",
    sector: "Government (Federal)",
    email: null,
    linkedin: "https://www.linkedin.com/in/patricia-o-a-6285251a/",
    image: "/images/board-akinrogunde.jpeg",
    bio: "Dr. Patricia Akinrogunde is a seasoned Federal Contracting Professional with over 15 years of experience in acquisition, procurement policy, and program management across multiple HUD portfolios. She currently serves as Vice President of Education for the NCMA Metro Maryland Chapter, leading efforts to advance professional development and training initiatives. Beyond federal service, Dr. Akinrogunde is the Founder and CEO of The Triple Joy Group, LLC, a leadership development and consulting firm specializing in DISC workshops, executive coaching, and organizational growth. She is passionate about empowering individuals and teams to lead with authenticity, purpose, and joy.",
  },
  "lashonda-bracey": {
    name: "Dr. LaShonda Bracey",
    org: null,
    sector: "Industry",
    email: null,
    linkedin: null,
    image: null,
    bio: null,
  },
  "major-clark": {
    name: "Major Clark",
    org: null,
    sector: "Industry",
    email: null,
    linkedin: null,
    image: "/images/board-clark.jpg",
    bio: null,
  },
  "sharlyn-gray": {
    name: "Sharlyn Gray",
    org: "Q.O.L Security Solutions",
    sector: "Industry",
    email: null,
    linkedin: null,
    image: null,
    bio: null,
  },
  "serapis-irby": {
    name: "Serapis Irby",
    org: "Oasis Global Solutions",
    sector: "Industry",
    email: null,
    linkedin: null,
    image: null,
    bio: null,
  },
  "qc-jones": {
    name: "QC Jones",
    org: "Nolan Mackenzie",
    sector: "Industry",
    email: null,
    linkedin: null,
    image: null,
    bio: null,
  },
  "vanetta-mills": {
    name: "Vanetta Mills",
    org: null,
    sector: "Industry",
    email: null,
    linkedin: null,
    image: null,
    bio: null,
  },
  "stephanie-parson": {
    name: "Dr. Stephanie Parson",
    org: "President & CEO, Crowned Grace International",
    sector: "Industry",
    email: null,
    linkedin: "https://www.linkedin.com/in/drstephanieparson/",
    image: null,
    bio: "Dr. Stephanie Parson is a visionary leader, business strategist and executive coach with a proven track record in organizational transformation, leadership development and conflict resolution.",
  },
  "oliver-queen": {
    name: "Dr. Oliver Queen",
    org: null,
    sector: "Government (Federal)",
    email: null,
    linkedin: null,
    image: null,
    bio: null,
  },
  "brandon-robinson": {
    name: "Brandon Robinson",
    org: null,
    sector: "Industry",
    email: null,
    linkedin: "https://www.linkedin.com/in/brandon-r-06440859/",
    image: null,
    bio: "Brandon is a dynamic Talent Acquisition, Operations, and DEI leader with more than 15 years of experience driving strategic recruitment, workforce planning, employee engagement, and operational excellence across government, nonprofit, healthcare, education, and corporate sectors. Throughout his career, he has successfully led high-volume, full-cycle recruiting initiatives while partnering with executive leadership, hiring managers, and cross-functional teams to identify and secure top talent that supports organizational growth and performance. His expertise includes talent pipeline development, HR operations, onboarding, project coordination, compensation analysis, and implementing data-driven recruiting strategies that foster inclusive and high-performing workplace cultures.",
  },
  "megan-sheckles": {
    name: "Megan Sheckles",
    org: "Founder & CEO, Powered by MJ LLC",
    sector: "Industry",
    email: null,
    linkedin: "https://www.linkedin.com/in/megan-mj-sheckles-shrm-cp-7670496/",
    image: "/images/board-sheckles.jpeg",
    bio: "Megan (MJ) Sheckles, a serial CEO who exudes a passion for people and a mission to help individuals and businesses thrive by unlocking their full potential of growth and excellence. Megan to create Powered by MJ LLC, an HR Solutions firm that provides fractional HR support, talent acquisition management and HR operations/employee relations to small businesses that are ready to prioritize their greatest asset—their people. Her expertise is backed by certifications, including the Society of Human Resources Management - Certified Professional (SHRM-CP) designation, HR Management certification from George Mason University, the Executive Strategic Inclusion Practitioner certification from Georgetown University, and an Organizational Development certification from Northwestern University.",
  },
  "akil-uddin": {
    name: "Akil Uddin",
    org: "AIN LLC",
    sector: "Industry",
    email: null,
    linkedin: "https://www.linkedin.com/in/akil-uddin-54b88718/",
    image: null,
    bio: null,
  },
  "christi-venable": {
    name: "Christi Venable",
    org: "Smile Therapy Services",
    sector: "Industry",
    email: null,
    linkedin: "https://www.linkedin.com/in/christivenable/",
    image: null,
    bio: null,
  },
  "john-wilkinson": {
    name: "Dr. John W. Wilkinson",
    org: "tHInc, LLC",
    sector: "Industry, Former Government (Federal)",
    email: null,
    linkedin: "https://www.linkedin.com/in/dr-john-w-wilkinson-pmp-cpcm-cfcm-2a55324/",
    image: "/images/board-wilkinson.jpeg",
    bio: null,
  },
  "anton-c-bizzell": {
    name: "Dr. Anton C. Bizzell",
    org: "Bizzell Group",
    sector: "Industry, Former Government (Federal)",
    email: null,
    linkedin: "https://www.linkedin.com/in/antonbizzell/",
    image: "/images/board-bizzell.jpeg",
    bio: null,
  },
  "brittney-chappell": {
    name: "Brittney Chappell",
    org: "Alpha and Omega",
    sector: "Industry, Former Government (Federal)",
    email: null,
    linkedin: "https://www.linkedin.com/in/brittneychappell/",
    image: "/images/board-chappell.jpeg",
    bio: null,
  },
  "tracy-marcinowski": {
    name: "Tracy Marcinowski",
    org: "Strategic Acquisition Solutions, LLC",
    sector: "Industry, Former Government (Federal)",
    email: null,
    linkedin: "https://www.linkedin.com/in/tracy-marcinowski-910b729/",
    image: "/images/board-marcinowski.jpeg",
    bio: null,
  },
  "ray-mccollum": {
    name: "Ray McCollum",
    org: "National Science Foundation",
    sector: "Government",
    email: null,
    linkedin: "https://www.linkedin.com/in/ray-mccollum-mspm-cpcm-10a9a63/",
    image: "/images/board-mccollum.jpeg",
    bio: null,
  },
  "calvin-j-mitchell": {
    name: "Calvin J. Mitchell",
    org: "GDIT",
    sector: "Industry, Former Government (Federal)",
    email: null,
    linkedin: "https://www.linkedin.com/in/calvin-j-mitchell-jr-a705348/",
    image: "/images/board-mitchell.jpeg",
    bio: null,
  },
  "jimmy-d-smith": {
    name: "Jimmy D. Smith",
    org: "PEI / Smith Consulting",
    sector: "Industry",
    email: null,
    linkedin: "https://www.linkedin.com/in/jimmy-d-smith-72a285273/",
    image: "/images/board-smith.jpeg",
    bio: null,
  },
  "alexa-tsui": {
    name: "Alexa Tsui",
    org: "G2xchange",
    sector: "Industry",
    email: null,
    linkedin: "https://www.linkedin.com/in/alexatsui/",
    image: "/images/board-tsui.jpeg",
    bio: null,
  },
} satisfies Record<string, Person>;

export type PersonId = keyof typeof people;

/** A person in one seat: their details, plus the role that seat carries. */
export interface BoardMember extends Person {
  /** Unique per seat, so a person on two rosters has two ids. */
  id: string;
  /** Which person fills the seat; the same value across all their seats. */
  personId: PersonId;
  role: string;
}

/** A seat on a roster: who fills it, the role, and the id the seat is keyed on. */
interface Seat {
  person: PersonId;
  role: string;
  id: string;
}

function roster(seats: Seat[]): BoardMember[] {
  return seats.map(({ person, role, id }) => ({ ...people[person], personId: person, role, id }));
}

export const officers: BoardMember[] = roster([
  { person: "jennifer-hanks", role: "President", id: "bd-hanks" },
  { person: "chyanne-thomas", role: "President-Elect", id: "bd-thomas" },
  { person: "patience-ibik", role: "VP — Secretary", id: "bd-ibik" },
  { person: "joye-sistrunk", role: "VP — Treasurer", id: "bd-sistrunk" },
  { person: "bethlehem-belaineh", role: "VP — Communications", id: "bd-belaineh" },
  { person: "monique-frazier", role: "VP — University Outreach", id: "bd-frazier" },
  { person: "antavia-grimsley", role: "VP — Programs", id: "bd-grimsley" },
  { person: "richard-hanks", role: "VP — Strategic Initiatives", id: "bd-hanksrd" },
  { person: "sonya-hopson", role: "VP — Operations", id: "bd-hopson" },
  { person: "lester-l-ingol", role: "VP — Membership", id: "bd-ingol" },
  { person: "darrell-mcgraw", role: "VP — Development (Fundraising)", id: "bd-mcgraw" },
  { person: "dawn-moore", role: "VP — Government Relations & Policy", id: "bd-moore" },
  { person: "cynthia-pace", role: "VP — Training & Education", id: "bd-pace" },
]);

export const directors: BoardMember[] = roster([
  { person: "patricia-akinrogunde", role: "Director — Training", id: "dir-akinrogunde" },
  { person: "lashonda-bracey", role: "Director — Social Media", id: "dir-bracey" },
  { person: "major-clark", role: "Director — University Outreach", id: "dir-clark" },
  { person: "sharlyn-gray", role: "Director — Chapter Volunteers", id: "dir-gray" },
  { person: "serapis-irby", role: "Director — Recruitment", id: "dir-irby" },
  { person: "qc-jones", role: "Director — Government Relations & Policy", id: "dir-jones" },
  { person: "vanetta-mills", role: "Director — Records", id: "dir-mills" },
  { person: "stephanie-parson", role: "Director — Training & Education", id: "dir-parson" },
  { person: "oliver-queen", role: "Director — Program Operations", id: "dir-queen" },
  { person: "brandon-robinson", role: "Director — Operations", id: "dir-robinson" },
  { person: "megan-sheckles", role: "Director — Networking", id: "dir-sheckles" },
  { person: "akil-uddin", role: "Director — Website Administration & Technology", id: "dir-uddin" },
  { person: "christi-venable", role: "Director — Wellness", id: "dir-venable" },
  { person: "john-wilkinson", role: "Director — Fellows", id: "dir-wilkinsonj" },
]);

export const advisors: BoardMember[] = roster([
  { person: "jennifer-hanks", role: "Board of Advisors — President", id: "adv-hanksj" },
  { person: "richard-hanks", role: "Board of Advisors — Chairperson", id: "adv-hanksr" },
  { person: "anton-c-bizzell", role: "Board of Advisors", id: "adv-bizzell" },
  { person: "brittney-chappell", role: "Board of Advisors", id: "adv-chappell" },
  { person: "tracy-marcinowski", role: "Board of Advisors", id: "adv-marcinowski" },
  { person: "ray-mccollum", role: "Board of Advisors", id: "adv-mccollum" },
  { person: "calvin-j-mitchell", role: "Board of Advisors", id: "adv-mitchellc" },
  { person: "jimmy-d-smith", role: "Board of Advisors", id: "adv-smithj" },
  { person: "alexa-tsui", role: "Board of Advisors", id: "adv-tsui" },
  { person: "john-wilkinson", role: "Board of Advisors", id: "adv-wilkinson" },
]);

/** The four officers featured on the home page, in the order the design shows them. */
export const featuredBoard: BoardMember[] = [
  "bd-hanks",
  "bd-thomas",
  "bd-ibik",
  "bd-belaineh",
].map((id) => officers.find((m) => m.id === id)!);
