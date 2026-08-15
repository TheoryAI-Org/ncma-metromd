export interface BoardMember {
  /** Stable key, also used for the headshot filename. */
  slug: string;
  name: string;
  role: string;
  /** Company / affiliation line shown under the role. */
  affiliation: string;
  email: string;
  linkedin?: string;
  /** Path under /public. Omitted where the member has not submitted a headshot. */
  photo?: string;
  bio: string;
}

export const BOARD: BoardMember[] = [
  {
    slug: "hanks",
    name: "Jennifer Hanks",
    role: "Board Chair, President",
    affiliation: "Founder & CEO, MMC Government Solutions",
    email: "jahanks@mmcgovsolutions.com",
    linkedin: "https://www.linkedin.com/in/jahanks/",
    photo: "/images/board/hanks.jpg",
    bio: "Jennifer Hanks serves as CEO of MMC Government Solutions, a mission-driven firm that Empowers the Possible by advancing excellence, efficiency, and innovation across the federal enterprise. Having managed a portfolio exceeding $6 billion across 10 agencies and operations in 8 countries, MMC leads digital transformation initiatives at the intersection of procurement efficiency and human capital development. Leveraging its patent-pending Thermal Intelligence™ technology, MMC is charting new territory towards acquisition modernization. A former federal contracting officer, Jennifer brings nearly two decades of experience in acquisition management and a deep understanding of the challenges faced by today's procurement professionals. She is widely recognized for her ability to bridge policy and execution, translating workforce and operational challenges into sustainable, scalable solutions that drive measurable impact. Beyond her role at MMC, Jennifer is a respected leader within the National Contract Management Association (NCMA). As co-founder of the NCMA Metro Maryland Chapter, launched in 2024, she helped establish a vibrant hub for industry collaboration, professional development, and mentorship empowering contracting professionals to connect, grow, and lead across government and industry. A classically trained violist, Jennifer holds an M.S. in Management from The Catholic University of America, a Master's Certificate in Government Contracting from The George Washington University, and a B.M. in Music from the University of Miami. She resides in Maryland with her husband, Richard, and their three daughters.",
  },
  {
    slug: "thomas",
    name: "Chyanne Thomas",
    role: "President-Elect",
    affiliation: "Founder & CEO, Aurelus Solutions LLC · Army Veteran",
    email: "cthomas@aurelus.io",
    photo: "/images/board/thomas.jpg",
    bio: "Chyanne Thomas serves as the Vice President of Marketing and Communications for the NCMA MetroMD Chapter, leading strategic branding, outreach, and member engagement efforts. A U.S. Army Veteran and CEO of Aurelus Solutions LLC, she brings over a decade of leadership experience. As an Amazon #1 Best-Selling Author and personal coach her passion is to empower others to lead and live with purpose through personal transformation.",
  },
  {
    slug: "hopson",
    name: "Sonya Hopson",
    role: "VP, Operations",
    affiliation: "Founder & CEO, Sage Services Group LLC",
    email: "sonya@sageservicesgroupllc.com",
    linkedin: "https://linkedin.com/in/sonya-hopson-97817020",
    photo: "/images/board/hopson.jpg",
    bio: "Sonya is the CEO of Sage Services Group LLC, a professional services firm. For 15 years, Sage has provided training, human capital, engineering, and project management services to more than 20 government and commercial clients. Over the last 15 years, Sage's strategic guidance on mission critical projects has propelled organizations to optimal operational performance and sustained organizational effectiveness. Sonya is a graduate of Norfolk State (Physics), UMD (Mechanical Engineering), and George Washington University (Education Leadership). She is an active volunteer in the following organizations DECA, NCMA, NMSDC, WBENC, as well as her church and her sorority.",
  },
  {
    slug: "anderson",
    name: "Renita Anderson",
    role: "VP, Programs",
    affiliation: "CEO, Defense Technology Integration (DTI), LLC",
    email: "randerson@deftechno.com",
    linkedin: "https://www.linkedin.com/in/renitaanderson-46b47111",
    bio: "CEO, Defense Technology Integration (DTI), LLC, a professional services Information Technology (IT) firm. She is a Senior Executive results-driven Systems Engineer providing strategy for critical IT enterprise services to Federal Government and Private Sector customers. Services include cybersecurity, network engineering, AI, service desk, program management, system administration, data analytics, database administration, technical writing, data center, acquisition support, and scientific research services. Ms. Anderson previously served as the Deputy Branch Chief of Management at FDIC, Chief Information Officer at the Federal Retirement Thrift Investment Board, Deputy Director for Management and Operations at NIH, managing a $300 million Agency-wide Information Technology program for 19 years, Program Manager at NASA and Avionics Test Engineer at the Naval Air Test Patuxent River. Ms. Anderson received her B.S. in Electrical Engineering from Norfolk State University and M.S. from Johns Hopkins Whiting School of Engineering.",
  },
  {
    slug: "akinrogunde",
    name: "Dr. Patricia Akinrogunde",
    role: "VP, Training & Education",
    affiliation: "Triple Joy Group",
    email: "patricia@triplejoygroup.com",
    linkedin: "https://www.linkedin.com/in/patricia-o-a-6285251a/",
    bio: "Dr. Patricia O. Akinrogunde serves as the Vice President of Training & Education for the NCMA Metro Maryland Chapter. In this role, she leads the chapter's educational strategy, shaping a dynamic training curriculum that aligns with evolving industry trends and the professional development needs of contracting professionals. Dr. Akinrogunde is a federal acquisition leader with over a decade of experience in government contracting. She brings deep expertise in acquisition strategy, regulatory compliance, and workforce development. Her vision for MetroMD includes delivering timely, relevant, and high-impact programming—ranging from CMMC and FAR overhaul sessions to AI in GovCon, career transition support, and CMBOK-focused learning opportunities. As VP of Training & Education, she is committed to securing subject matter experts, enhancing member engagement, and ensuring that each session provides practical value to acquisition professionals at every stage of their careers. Her leadership approach emphasizes clarity, growth, and measurable impact. In addition to her federal service, Dr. Akinrogunde is a certified leadership coach, speaker, and trainer. She is passionate about equipping professionals with the tools, confidence, and strategic insight needed to thrive in both public and private sector environments. Through her service on the MetroMD Board, she remains dedicated to strengthening the contracting community and advancing excellence in acquisition leadership.",
  },
  {
    slug: "belaineh",
    name: "Bethlehem Belaineh",
    role: "VP, Communications",
    affiliation: "Founder & CEO, Theory AI",
    email: "be@theoryai.co",
    linkedin: "https://www.linkedin.com/in/bbelaineh",
    photo: "/images/board/belaineh.jpg",
    bio: "Bethlehem is the Founder & CEO of Theory AI, a dynamic technology consulting firm, and agoras health based in Washington, DC. Through her work with her startups, Bethlehem leads the development and launch of workflow automation, gamification, and other exciting products that speed up business needs and enhance user engagement for customers and stakeholders across diverse contexts and markets. Theory AI delivers AI-native Market Research, Product/Software Development, and Management Consulting services that address complex challenges in healthcare, education, and federal sectors to a wide variety of clients ranging from Government Technology firms to High-Growth startups. A thought leader in the Artificial Intelligence (AI) space, and with over a decade of experience in product management and strategy, Bethlehem holds multiple SCRUM certifications, such as ScrumMaster (CSM) and Scrum Product Owner (CSPO), and Advanced Scrum Product Owner (A-CSPO). Bethlehem holds a Bachelor of Science (BS) in Biological Physics, Economics from Brandeis University, a Master of Engineering degree in Data Analytics Engineering (MEng) from George Mason University and is working on completing her Masters of Information Systems (MIS) from George Mason University as well as a Masters of Business Administration (MBA) from Northwestern University.",
  },
  {
    slug: "sistrunk",
    name: "Joye Sistrunk, CPA",
    role: "Treasurer",
    affiliation: "President & CEO, Premier Group Services, Inc.",
    email: "accounting@pgs-cpa.com",
    linkedin: "https://www.linkedin.com/in/joyessistrunkcpa",
    photo: "/images/board/sistrunk.jpg",
    bio: "Joye Sistrunk, CPA, is founder and CEO of Premier Group Services, Inc., a Forbes Top 200 CPA firm established in 2005. As an Air Force Reserves veteran with degrees in Accounting and International Business, she brings unique expertise in federal compliance and procurement to lead a team of over 40 professionals delivering audit and advisory services nationwide. Under Joye's leadership, Premier Group has become a trusted partner to federal agencies, Offices of Inspector General, and government contractors, including DOE OIG, EPA, USTDA, and AmeriCorps. The firm specializes in GAGAS-compliant financial statement audits, federal grant compliance reviews, single audits, cybersecurity assessments, and performance audits. Premier Group holds multiple small business certifications—WOSB, EDWOSB, SDB, VOSB, and SDVOSB—reflecting Joye's commitment to expanding opportunities for diverse businesses in federal contracting. Her military service instilled values of integrity, discipline, and mission focus that shape the firm's culture and approach to client service. Joye's expertise in federal regulations, combined with her entrepreneurial vision, has positioned Premier Group as a premier provider of compliance and audit services. Her leadership demonstrates how technical excellence, combined with deep understanding of government operations, creates lasting value for public sector clients and strengthens accountability in federal programs.",
  },
  {
    slug: "sheckles",
    name: "Megan (MJ) Sheckles, SHRM-CP",
    role: "Director of Networking",
    affiliation: "Founder & CEO, Powered by MJ LLC",
    email: "info@mjpowered.com",
    linkedin: "https://www.linkedin.com/in/megan-mj-sheckles-shrm-cp-7670496/",
    photo: "/images/board/sheckles.jpg",
    bio: "Megan (MJ) Sheckles, a serial CEO who exudes a passion for people and a mission to help individuals and businesses thrive by unlocking their full potential of growth and excellence. Megan to create Powered by MJ LLC, an HR Solutions firm that provides fractional HR support, talent acquisition management and HR operations/employee relations to small businesses that are ready to prioritize their greatest asset—their people. Her expertise is backed by certifications, including the Society of Human Resources Management - Certified Professional (SHRM-CP) designation, HR Management certification from George Mason University, the Executive Strategic Inclusion Practitioner certification from Georgetown University, and an Organizational Development certification from Northwestern University. Being a serial CEO, her expertise doesn't stop at HR. She also runs MJ Events Management LLC, a boutique event management company in DC, MD, VA and Kentucky markets, specializing in weddings, group travel, corporate and government contracting. Lastly, Megan's most loved Founder/CEO title is with Get Moving With MJ LLC, where she specializes in real estate investing, mentorship and is an multi award-winning licensed realtor servicing DC, Maryland and Virginia. When Megan isn't leading businesses, she is supporting her alma mater, University of Louisville, as their Chapter President in DC, MD and VA, partnering and developing personally and professionally as an inductee of The BOW Collective, a black women-owned entrepreneurship organization as well as indulging in her love of travel, spa days, and reading.",
  },
  {
    slug: "parson",
    name: "Dr. Stephanie Parson",
    role: "Training & Education / Professional Development",
    affiliation: "President & CEO, Crowned Grace International",
    email: "saparson@crownedgrace.com",
    linkedin: "https://www.linkedin.com/in/drstephanieparson/",
    bio: "Dr. Stephanie Parson is a visionary leader, business strategist and executive coach with a proven track record in organizational transformation, leadership development and conflict resolution. As president and CEO of Crowned Grace International (CGINTL), she leads a global consulting firm specializing in mission support, information technology (IT) services and organizational change. Since 2003, CGINTL has supported federal agencies — including the U.S. Department of Defense, FEMA and the U.S. Army — as well as private sector clients across 17 countries. The firm's excellence earned it recognition as an Inc. 5000 awardee. With over 20 years of Fortune 100 executive experience, Dr. Parson helps businesses and government agencies streamline operations, develop leadership and drive sustainable growth. She has personally coached over 300 global executives and trained more than 7,000 professionals in leadership, business strategy and performance optimization. Before founding CGINTL, Dr. Parson held executive roles at major corporations: Vice President, Walt Disney World — led IT strategy, procurement and training, establishing Disney's first strategic planning process and Program Management Office; Vice President and CIO, Parsons Brinckerhoff (now WSP) — oversaw global IT strategy for an 8,000-employee engineering firm with 200+ offices worldwide; Director, Seagram Spirits and Wine Company — managed a $15M operations budget and a $24M capital budget, leading global IT teams. She is a U.S. Air Force veteran, a decorated officer before transitioning to the corporate sector.",
  },
];

/** The four members surfaced in the home page's "Your board" preview. */
export const BOARD_PREVIEW_SLUGS = ["hanks", "thomas", "hopson", "sistrunk"];
