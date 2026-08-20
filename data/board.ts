export type BoardBody = "officers" | "directors" | "advisors";

export interface BoardMember {
  /** Stable key, also the headshot filename. Unique across all three bodies. */
  slug: string;
  body: BoardBody;
  name: string;
  /** Card kicker, e.g. "VP — Communications". Verbatim from the design. */
  position: string;
  /** Sector label above the organization, e.g. "Government (Federal)". */
  sector: string;
  /** Employer or firm. Omitted where the roster has none. */
  organization?: string;
  email?: string;
  linkedin?: string;
  /** Path under /public. Omitted until the member submits a headshot. */
  photo?: string;
  /** Bio content as ordered blocks. Four of the twelve bios have more than one. */
  bio?: BioBlock[];
}

/**
 * Bio bodies are structured rather than HTML so the site renders them in its own
 * type styles. Matches the block model the deferred admin panel will store as
 * JSONB — see .claude/specs/05-deferred.md.
 */
export type BioBlock = { type: "p"; text: string } | { type: "ul"; items: string[] };

// Officers & VPs — Jennifer Hanks, Chyanne Thomas, Patience Ibik pinned first;
// the remaining ten alphabetical by last name.
const OFFICERS: BoardMember[] = [
  {
    slug: "hanks",
    body: "officers",
    name: "Jennifer Hanks",
    position: "President",
    sector: "Industry",
    organization: "Founder & CEO, MMC Government Solutions",
    email: "jahanks@mmcgovsolutions.com",
    linkedin: "https://www.linkedin.com/in/jahanks/",
    photo: "/images/board/hanks.jpg",
    bio: [
      {
        type: "p",
        text: "Jennifer Hanks serves as CEO of MMC Government Solutions, a mission-driven firm that Empowers the Possible by advancing excellence, efficiency, and innovation across the federal enterprise. Having managed a portfolio exceeding $6 billion across 10 agencies and operations in 8 countries, MMC leads digital transformation initiatives at the intersection of procurement efficiency and human capital development. Leveraging its patent-pending Thermal Intelligence™ technology, MMC is charting new territory towards acquisition modernization. A former federal contracting officer, Jennifer brings nearly two decades of experience in acquisition management and a deep understanding of the challenges faced by today's procurement professionals. She is widely recognized for her ability to bridge policy and execution, translating workforce and operational challenges into sustainable, scalable solutions that drive measurable impact. Beyond her role at MMC, Jennifer is a respected leader within the National Contract Management Association (NCMA). As co-founder of the NCMA Metro Maryland Chapter, launched in 2024, she helped establish a vibrant hub for industry collaboration, professional development, and mentorship empowering contracting professionals to connect, grow, and lead across government and industry. A classically trained violist, Jennifer holds an M.S. in Management from The Catholic University of America, a Master's Certificate in Government Contracting from The George Washington University, and a B.M. in Music from the University of Miami. She resides in Maryland with her husband, Richard, and their three daughters.",
      },
    ],
  },
  {
    slug: "thomas",
    body: "officers",
    name: "Chyanne Thomas",
    position: "President-Elect",
    sector: "Industry",
    organization: "Founder & CEO, Aurelus Solutions LLC · Army Veteran",
    email: "cthomas@aurelus.io",
    linkedin: "https://www.linkedin.com/in/mschyannet/",
    photo: "/images/board/thomas.jpg",
    bio: [
      {
        type: "p",
        text: "Chyanne Thomas serves as the Vice President of Marketing and Communications for the NCMA MetroMD Chapter, leading strategic branding, outreach, and member engagement efforts. A U.S. Army Veteran and CEO of Aurelus Solutions LLC, she brings over a decade of leadership experience. As an Amazon #1 Best-Selling Author and personal coach her passion is to empower others to lead and live with purpose through personal transformation.",
      },
    ],
  },
  {
    slug: "ibik",
    body: "officers",
    name: "Patience Ibik",
    position: "VP — Secretary",
    sector: "Industry",
    organization: "Resolute Consulting",
    email: "patience.ibik@gmail.com",
    linkedin: "https://www.linkedin.com/in/patience-ibik-bb2339a1/",
    photo: "/images/board/ibik.jpg",
  },
  {
    slug: "belaineh",
    body: "officers",
    name: "Bethlehem Belaineh",
    position: "VP — Communications",
    sector: "Industry",
    organization: "Founder & CEO, Theory AI",
    email: "be@theoryai.co",
    linkedin: "https://www.linkedin.com/in/bbelaineh",
    photo: "/images/board/belaineh.jpg",
    bio: [
      {
        type: "p",
        text: "Bethlehem is the Founder & CEO of Theory AI, a dynamic technology consulting firm, and agoras health based in Washington, DC. Through her work with her startups, Bethlehem leads the development and launch of workflow automation, gamification, and other exciting products that speed up business needs and enhance user engagement for customers and stakeholders across diverse contexts and markets. Theory AI delivers AI-native Market Research, Product/Software Development, and Management Consulting services that address complex challenges in healthcare, education, and federal sectors to a wide variety of clients ranging from Government Technology firms to High-Growth startups. A thought leader in the Artificial Intelligence (AI) space, and with over a decade of experience in product management and strategy, Bethlehem holds multiple SCRUM certifications, such as ScrumMaster (CSM) and Scrum Product Owner (CSPO), and Advanced Scrum Product Owner (A-CSPO). Bethlehem holds a Bachelor of Science (BS) in Biological Physics, Economics from Brandeis University, a Master of Engineering degree in Data Analytics Engineering (MEng) from George Mason University and is working on completing her Masters of Information Systems (MIS) from George Mason University as well as a Masters of Business Administration (MBA) from Northwestern University.",
      },
    ],
  },
  {
    slug: "frazier",
    body: "officers",
    name: "Monique Frazier",
    position: "VP — University Outreach",
    sector: "Industry",
    organization: "Infosys Public Services",
    email: "monique.frazier@infosys.com",
    linkedin: "https://www.linkedin.com/in/monique-frazier-mba/",
  },
  {
    slug: "grimsley",
    body: "officers",
    name: "Antavia Grimsley",
    position: "VP — Programs",
    sector: "Government (Federal)",
    organization: "Elite Veteran Enterprises, LLC",
    email: "antavia@eliteveteranenterprises.com",
    linkedin: "https://www.linkedin.com/in/antaviagrimsley/",
  },
  {
    slug: "hanks-richard",
    body: "officers",
    name: "Richard Hanks",
    position: "VP — Strategic Initiatives",
    sector: "Industry, Former Government (State/Local)",
    organization: "MMC Government Solutions",
    email: "rdhanks@mmcgovsolutions.com",
    linkedin: "https://www.linkedin.com/in/richarddhanksmmc/",
  },
  {
    slug: "hopson",
    body: "officers",
    name: "Sonya Hopson",
    position: "VP — Operations",
    sector: "Industry, Former Government (Federal)",
    organization: "Founder & CEO, Sage Services Group LLC",
    email: "sonya@sageservicesgroupllc.com",
    linkedin: "https://linkedin.com/in/sonya-hopson-97817020",
    photo: "/images/board/hopson.jpg",
    bio: [
      {
        type: "p",
        text: "Sonya is the CEO of Sage Services Group LLC, a professional services firm. For 15 years, Sage has provided training, human capital, engineering, and project management services to more than 20 government and commercial clients. Over the last 15 years, Sage's strategic guidance on mission critical projects has propelled organizations to optimal operational performance and sustained organizational effectiveness. Sonya is a graduate of Norfolk State (Physics), UMD (Mechanical Engineering), and George Washington University (Education Leadership). She is an active volunteer in the following organizations DECA, NCMA, NMSDC, WBENC, as well as her church and her sorority.",
      },
    ],
  },
  {
    slug: "ingol",
    body: "officers",
    name: "Lester L. Ingol",
    position: "VP — Membership",
    sector: "Industry, Former Government (Federal)",
    organization: "Chief Operating Officer, Blue Line Global, LLC",
    linkedin: "https://www.linkedin.com/in/lester-l-ingol-b09591a1/",
    photo: "/images/board/ingol.jpg",
    bio: [
      {
        type: "p",
        text: "Lester L. Ingol serves as the Chief Operating Officer of Blue Line Global, LLC, where he leads the firm’s strategic and operational execution across its diverse mission portfolio. In this capacity, he drives organizational performance, operational excellence, and sustainable growth, ensuring alignment between enterprise objectives and client impact. Mr. Ingol is known for cultivating high-performing teams, instituting disciplined management frameworks, and applying mission-focused leadership grounded in decades of federal service. Prior to joining Blue Line Global, Mr. Ingol held multiple senior executive roles within the Federal Emergency Management Agency (FEMA), including Assistant Administrator for the Office of Business Management and Acting Chief Security Officer. Overseeing a $9 billion budget, he led complex portfolios in procurement, logistics, workforce development, and continuity readiness, shaping enterprise resilience and fiscal accountability. As Deputy Head of the Contracting Activity, he directed a $3.76 billion acquisition portfolio and nearly 10,000 annual procurement transactions, modernizing acquisition governance and performance oversight. A U.S. Marine Corps veteran and former U.S. Army Contracting Officer, Mr. Ingol has supported national responses to crises from Hurricane Katrina to the COVID-19 pandemic. He holds a Master’s in Management and Leadership from Webster University, a Bachelor’s in Management from Park University, and is a Senior Executive Fellow of Harvard University’s Kennedy School of Government and an alumnus of The Brookings Institution Executive Leadership Program.",
      },
    ],
  },
  {
    slug: "mcgraw",
    body: "officers",
    name: "Darrell McGraw",
    position: "VP — Development (Fundraising)",
    sector: "Industry",
    organization: "President & CEO, Q2 Consulting Solutions LLC",
    linkedin: "https://www.linkedin.com/in/darrell-mcgraw-6b30911/",
    bio: [
      {
        type: "p",
        text: "Mr. McGraw is President and CEO of Q2 Consulting Solutions LLC, a certified 8(a) company and Maryland State certified MBE, DBE, and SBE. He is an experienced executive and entrepreneur with over 25 years of technical management consulting experience with Fortune 500 companies including KPMG, Booz Allen Hamilton, and Accenture. He has been instrumental in bridging the gaps between technology and professional services for Federal clients to include digital and transformational efforts. Mr. McGraw holds a Master of Science (MS) in Information Systems Technology from George Washington University and a Bachelor of Art (BS) in Economics from the University of Maryland. He is also a certified Project Management Professional (PMP), Scheduling Professional (PMI-SP), LSS Green Belt, ITIL and Scum Master. In his spare time, he loves to give back to the community via non-profits, providing executive level guidance, governance, partnerships and management consulting advisory support as well as an active member of his Church – Mt. Calvary Baptist Church in Rockville Md.",
      },
    ],
  },
  {
    slug: "moore",
    body: "officers",
    name: "COL Dawn Moore",
    position: "VP — Government Relations & Policy",
    sector: "Government (Federal)",
    organization: "Office of the Chief, Army Reserve",
    email: "dawn_eakins@yahoo.com",
    linkedin: "https://www.linkedin.com/in/dawn-moore-6595074b/",
    photo: "/images/board/moore.jpg",
  },
  {
    slug: "pace",
    body: "officers",
    name: "Dr. Cynthia Pace",
    position: "VP — Training & Education",
    sector: "Industry",
    organization: "C. O. Pace, “The Leadership Guru,” LLC",
    email: "cpace@leadershipguru.com",
    linkedin: "https://www.linkedin.com/in/dr-cynthia-pace-50a5b936a/",
  },
  {
    slug: "sistrunk",
    body: "officers",
    name: "Joye Sistrunk, CPA",
    position: "VP — Treasurer",
    sector: "Industry",
    organization: "President & CEO, Premier Group Services, Inc.",
    email: "accounting@pgs-cpa.com",
    linkedin: "https://www.linkedin.com/in/joyessistrunkcpa",
    photo: "/images/board/sistrunk.jpg",
    bio: [
      {
        type: "p",
        text: "Joye Sistrunk, CPA, is founder and CEO of Premier Group Services, Inc., a Forbes Top 200 CPA firm established in 2005. As an Air Force Reserves veteran with degrees in Accounting and International Business, she brings unique expertise in federal compliance and procurement to lead a team of over 40 professionals delivering audit and advisory services nationwide. Under Joye's leadership, Premier Group has become a trusted partner to federal agencies, Offices of Inspector General, and government contractors, including DOE OIG, EPA, USTDA, and AmeriCorps. The firm specializes in GAGAS-compliant financial statement audits, federal grant compliance reviews, single audits, cybersecurity assessments, and performance audits. Premier Group holds multiple small business certifications—WOSB, EDWOSB, SDB, VOSB, and SDVOSB—reflecting Joye's commitment to expanding opportunities for diverse businesses in federal contracting. Her military service instilled values of integrity, discipline, and mission focus that shape the firm's culture and approach to client service. Joye's expertise in federal regulations, combined with her entrepreneurial vision, has positioned Premier Group as a premier provider of compliance and audit services. Her leadership demonstrates how technical excellence, combined with deep understanding of government operations, creates lasting value for public sector clients and strengthens accountability in federal programs.",
      },
    ],
  },
];

// Directors — all eighteen alphabetical by last name.
const DIRECTORS: BoardMember[] = [
  {
    slug: "akinrogunde",
    body: "directors",
    name: "Dr. Patricia Akinrogunde",
    position: "Director — Training",
    sector: "Government (Federal)",
    organization: "Founder & CEO, The Triple Joy Group, LLC",
    linkedin: "https://www.linkedin.com/in/patricia-o-a-6285251a/",
    bio: [
      {
        type: "p",
        text: "Dr. Patricia Akinrogunde is a seasoned Federal Contracting Professional with over 15 years of experience in acquisition, procurement policy, and program management across multiple HUD portfolios. She currently serves as Vice President of Education for the NCMA Metro Maryland Chapter, leading efforts to advance professional development and training initiatives. Beyond federal service, Dr. Akinrogunde is the Founder and CEO of The Triple Joy Group, LLC, a leadership development and consulting firm specializing in DISC workshops, executive coaching, and organizational growth. She is passionate about empowering individuals and teams to lead with authenticity, purpose, and joy.",
      },
    ],
  },
  {
    slug: "alexander-sergeeff",
    body: "directors",
    name: "Stella Alexander-Sergeeff",
    position: "Director — Mentoring",
    sector: "Industry",
    linkedin: "https://www.linkedin.com/in/stella-alexander-sergeeff-0b407534b/",
  },
  {
    slug: "anderson",
    body: "directors",
    name: "Renita Anderson",
    position: "Director — Programs",
    sector: "Industry",
    organization: "CEO, Defense Technology Integration (DTI), LLC",
    email: "randerson@deftechno.com",
    linkedin: "https://www.linkedin.com/in/renita-anderson-46b47111/",
    bio: [
      {
        type: "p",
        text: "CEO, Defense Technology Integration (DTI), LLC, a professional services Information Technology (IT) firm. She is a Senior Executive results-driven Systems Engineer providing strategy for critical IT enterprise services to Federal Government and Private Sector customers. Services include cybersecurity, network engineering, AI, service desk, program management, system administration, data analytics, database administration, technical writing, data center, acquisition support, and scientific research services. Ms. Anderson previously served as the Deputy Branch Chief of Management at FDIC, Chief Information Officer at the Federal Retirement Thrift Investment Board, Deputy Director for Management and Operations at NIH, managing a $300 million Agency-wide Information Technology program for 19 years, Program Manager at NASA and Avionics Test Engineer at the Naval Air Test Patuxent River. Ms. Anderson received her B.S. in Electrical Engineering from Norfolk State University and M.S. from Johns Hopkins Whiting School of Engineering.",
      },
    ],
  },
  {
    slug: "bracey",
    body: "directors",
    name: "Dr. LaShonda Bracey",
    position: "Director — Social Media",
    sector: "Industry",
    email: "info@lashondabracey.com",
  },
  {
    slug: "canery",
    body: "directors",
    name: "Jon Canery",
    position: "Director — Media",
    sector: "Industry",
    organization: "Coalmine Photography",
    email: "jon.canery@coalminephotography.com",
  },
  {
    slug: "clark",
    body: "directors",
    name: "Major Clark",
    position: "Director — University Outreach",
    sector: "Industry",
    email: "majclk3@verizon.net",
    photo: "/images/board/clark.jpg",
  },
  {
    slug: "gray",
    body: "directors",
    name: "Sharlyn Gray",
    position: "Director — Chapter Volunteers",
    sector: "Industry",
    organization: "Q.O.L Security Solutions",
    email: "qolsecsolutions@outlook.com",
  },
  {
    slug: "irby",
    body: "directors",
    name: "Serapis Irby",
    position: "Director — Recruitment",
    sector: "Industry",
    organization: "Oasis Global Solutions",
    email: "serapisg@gmail.com",
  },
  {
    slug: "jones",
    body: "directors",
    name: "QC Jones",
    position: "Director — Government Relations & Policy",
    sector: "Industry",
    organization: "Nolan Mackenzie",
    email: "qcjones@nolanmac.com",
  },
  {
    slug: "mills",
    body: "directors",
    name: "Vanetta Mills",
    position: "Director — Records",
    sector: "Industry",
  },
  {
    slug: "parson",
    body: "directors",
    name: "Dr. Stephanie Parson",
    position: "Director — Training & Education",
    sector: "Industry",
    organization: "President & CEO, Crowned Grace International",
    email: "saparson@crownedgrace.com",
    linkedin: "https://www.linkedin.com/in/drstephanieparson/",
    bio: [
      {
        type: "p",
        text: "Dr. Stephanie Parson is a visionary leader, business strategist and executive coach with a proven track record in organizational transformation, leadership development and conflict resolution.",
      },
      {
        type: "p",
        text: "As president and CEO of Crowned Grace International (CGINTL), she leads a global consulting firm specializing in mission support, information technology (IT) services and organizational change. Since 2003, CGINTL has supported federal agencies – including the U.S. Department of Defense, FEMA and the U.S. Army – as well as private sector clients across 17 countries. The firm’s excellence earned it recognition as an Inc. 5000 awardee.",
      },
      {
        type: "p",
        text: "With over 20 years of Fortune 100 executive experience, Dr. Parson helps businesses and government agencies streamline operations, develop leadership and drive sustainable growth. She has personally coached over 300 global executives and trained more than 7,000 professionals in leadership, business strategy and performance optimization.",
      },
      {
        type: "p",
        text: "Before founding CGINTL, Dr. Parson held executive roles at major corporations:",
      },
      {
        type: "ul",
        items: [
          "Vice President, Walt Disney World – Led IT strategy, procurement and training. She established Disney’s first strategic planning process and Program Management Office, boosting efficiency and revenue.",
          "Vice President and CIO, Parsons Brinckerhoff (now WSP) – Oversaw global IT strategy for an 8,000-employee engineering firm with 200+ offices worldwide.",
          "Director, Seagram Spirits and Wine Company – Managed a $15M operations budget and a $24M capital budget, leading global IT teams.",
          "U.S. Air Force Veteran – A decorated officer before transitioning to the corporate sector.",
        ],
      },
    ],
  },
  {
    slug: "queen",
    body: "directors",
    name: "Dr. Oliver Queen",
    position: "Director — Program Operations",
    sector: "Government (Federal)",
    email: "oliver.queen74@gmail.com",
  },
  {
    slug: "robinson",
    body: "directors",
    name: "Brandon Robinson",
    position: "Director — Operations",
    sector: "Industry",
    linkedin: "https://www.linkedin.com/in/brandon-r-06440859/",
    bio: [
      {
        type: "p",
        text: "Brandon is a dynamic Talent Acquisition, Operations, and DEI leader with more than 15 years of experience driving strategic recruitment, workforce planning, employee engagement, and operational excellence across government, nonprofit, healthcare, education, and corporate sectors. Throughout his career, he has successfully led high-volume, full-cycle recruiting initiatives while partnering with executive leadership, hiring managers, and cross-functional teams to identify and secure top talent that supports organizational growth and performance. His expertise includes talent pipeline development, HR operations, onboarding, project coordination, compensation analysis, and implementing data-driven recruiting strategies that foster inclusive and high-performing workplace cultures.",
      },
      {
        type: "p",
        text: "Brandon has extensive experience managing recruitment efforts for roles ranging from entry-level professionals to executive leadership positions within federal government, healthcare, technology, and nonprofit organizations. He is skilled at developing targeted sourcing strategies, improving recruitment processes, enhancing candidate experiences, and implementing diversity-focused hiring initiatives that strengthen employee engagement and retention. He leverages ATS platforms, recruitment analytics, and relationship-building strategies to deliver measurable hiring outcomes in fast-paced environments.",
      },
      {
        type: "p",
        text: "In addition to talent acquisition, Brandon’s background includes operations management, education, program leadership, and executive support, which has strengthened his ability to lead teams, manage complex projects, and build collaborative partnerships. He is recognized for his strong communication skills, stakeholder engagement, leadership development, and ability to align talent strategies with organizational objectives while consistently delivering results that exceed expectations.",
      },
    ],
  },
  {
    slug: "scott",
    body: "directors",
    name: "Tracy Scott",
    position: "Director — Association Relations",
    sector: "Industry",
    email: "tracy.r.scott1@gmail.com",
  },
  {
    slug: "sheckles",
    body: "directors",
    name: "Megan Sheckles",
    position: "Director — Networking",
    sector: "Industry",
    organization: "Founder & CEO, Powered by MJ LLC",
    email: "info@mjpowered.com",
    linkedin: "https://www.linkedin.com/in/megan-mj-sheckles-shrm-cp-7670496/",
    photo: "/images/board/sheckles.jpg",
    bio: [
      {
        type: "p",
        text: "Megan (MJ) Sheckles, a serial CEO who exudes a passion for people and a mission to help individuals and businesses thrive by unlocking their full potential of growth and excellence. Megan to create Powered by MJ LLC, an HR Solutions firm that provides fractional HR support, talent acquisition management and HR operations/employee relations to small businesses that are ready to prioritize their greatest asset—their people. Her expertise is backed by certifications, including the Society of Human Resources Management - Certified Professional (SHRM-CP) designation, HR Management certification from George Mason University, the Executive Strategic Inclusion Practitioner certification from Georgetown University, and an Organizational Development certification from Northwestern University.",
      },
      {
        type: "p",
        text: "Being a serial CEO, her expertise doesn’t stop at HR. She also runs MJ Events Management LLC, a boutique event management company in DC, MD, VA and Kentucky markets, specializing in weddings, group travel, corporate and government contracting. Lastly, Megan’s most loved Founder/CEO title is with Get Moving With MJ LLC, where she specializes in real estate investing, mentorship and is an multi award-winning licensed realtor servicing DC, Maryland and Virginia.",
      },
      {
        type: "p",
        text: "When Megan isn’t leading businesses, she is supporting her alma mater, University of Louisville, as their Chapter President in DC, MD and VA, partnering and developing personally and professionally as an inductee of The BOW Collective, a black women-owned entrepreneurship organization as well as indulging in her love of travel, spa days, and reading.",
      },
    ],
  },
  {
    slug: "uddin",
    body: "directors",
    name: "Akil Uddin",
    position: "Director — Website Administration & Technology",
    sector: "Industry",
    organization: "AIN LLC",
    email: "akil@ainintel.com",
    linkedin: "https://www.linkedin.com/in/akil-uddin-54b88718/",
  },
  {
    slug: "venable",
    body: "directors",
    name: "Christi Venable",
    position: "Director — Wellness",
    sector: "Industry",
    organization: "Smile Therapy Services",
    email: "cvenable@smiletherapyservices.com",
    linkedin: "https://www.linkedin.com/in/christivenable/",
  },
  {
    slug: "wilkinson",
    body: "directors",
    name: "Dr. John Wilkinson",
    position: "Director — Fellows",
    sector: "Industry",
    organization: "tHInc, LLC",
    email: "jwilkinson@thinc-llc.com",
    linkedin: "https://www.linkedin.com/in/dr-john-w-wilkinson-pmp-cpcm-cfcm-2a55324/",
  },
];

// Board of Advisors — Jennifer Hanks, Richard Hanks pinned first; the
// remaining eight alphabetical by last name.
const ADVISORS: BoardMember[] = [
  {
    slug: "hanks-advisor",
    body: "advisors",
    name: "Jennifer Hanks",
    position: "Board of Advisors — President",
    sector: "Industry, Former Government (Federal)",
    organization: "MMC Government Solutions",
    email: "jahanks@mmcgovsolutions.com",
    linkedin: "https://www.linkedin.com/in/jahanks/",
  },
  {
    slug: "hanks-richard-advisor",
    body: "advisors",
    name: "Richard Hanks",
    position: "Board of Advisors — Chairperson",
    sector: "Industry, Former State/Local Government",
    organization: "MMC Government Solutions",
    email: "rdhanks@mmcgovsolutions.com",
    linkedin: "https://www.linkedin.com/in/richarddhanksmmc/",
  },
  {
    slug: "bizzell",
    body: "advisors",
    name: "Dr. Anton C. Bizzell",
    position: "Board of Advisors",
    sector: "Industry, Former Government (Federal)",
    organization: "Bizzell Group",
    email: "abizzell@bizzellus.com",
    linkedin: "https://www.linkedin.com/in/antonbizzell/",
  },
  {
    slug: "chappell",
    body: "advisors",
    name: "Brittney Chappell",
    position: "Board of Advisors",
    sector: "Industry, Former Government (Federal)",
    organization: "Alpha and Omega",
    email: "bvc0425@gmail.com",
    linkedin: "https://www.linkedin.com/in/brittneychappell/",
  },
  {
    slug: "marcinowski",
    body: "advisors",
    name: "Traci Marcinowski",
    position: "Board of Advisors",
    sector: "Industry, Former Government (Federal)",
    organization: "Strategic Acquisition Solutions, LLC",
    email: "tmarcinowski@strategicacqsolutions.com",
    linkedin: "https://www.linkedin.com/in/tracy-marcinowski-910b729/",
  },
  {
    slug: "mccollum",
    body: "advisors",
    name: "Ray McCollum",
    position: "Board of Advisors",
    sector: "Government",
    organization: "National Science Foundation",
    email: "raymccollum@gmail.com",
    linkedin: "https://www.linkedin.com/in/ray-mccollum-mspm-cpcm-10a9a63/",
  },
  {
    slug: "mitchell",
    body: "advisors",
    name: "Calvin J. Mitchell",
    position: "Board of Advisors",
    sector: "Industry, Former Government (Federal)",
    organization: "GDIT",
    email: "calvin.mitchell@gdit.com",
    linkedin: "https://www.linkedin.com/in/calvin-j-mitchell-jr-cfcm-a705348/",
    photo: "/images/board/mitchell.jpg",
  },
  {
    slug: "smith",
    body: "advisors",
    name: "Jimmy D. Smith",
    position: "Board of Advisors",
    sector: "Industry",
    organization: "PEI / Smith Consulting",
    email: "jsmith@smithadvisoryconsulting.com",
    linkedin: "https://www.linkedin.com/in/jimmy-d-smith-72a285273/",
  },
  {
    slug: "tsui",
    body: "advisors",
    name: "Alexa Tsui",
    position: "Board of Advisors",
    sector: "Industry",
    organization: "G2xchange",
    email: "alexa@g2xchange.com",
    linkedin: "https://www.linkedin.com/in/alexatsui/",
  },
  {
    slug: "wilkinson-advisor",
    body: "advisors",
    name: "Dr. John W. Wilkinson",
    position: "Board of Advisors",
    sector: "Industry, Former Government (Federal)",
    organization: "tHInc, LLC",
    email: "jwilkinson@thinc-llc.com",
    linkedin: "https://www.linkedin.com/in/dr-john-w-wilkinson-pmp-cpcm-cfcm-2a55324/",
  },
];

export const BOARD: BoardMember[] = [...OFFICERS, ...DIRECTORS, ...ADVISORS];

/** Members of one body, already in display order. */
export function boardBody(body: BoardBody): BoardMember[] {
  return BOARD.filter((member) => member.body === body);
}

/** The four members in the home page's "Your board" preview. */
export const BOARD_PREVIEW_SLUGS = ["hanks", "thomas", "ibik", "belaineh"];
