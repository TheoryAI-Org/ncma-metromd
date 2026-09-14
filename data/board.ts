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
    linkedin: "https://www.linkedin.com/in/bbelaineh/",
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
    bio: "Monique Frazier is a seasoned business consulting leader and the IPS US Practice Lead for Organizational Change Management at Infosys Public Services. With over 20 years of experience, she specializes in guiding clients through strategic transformation and human-centered change initiatives. Monique holds an MBA from Temple University and is certified in PMP, Lean Six Sigma, and Strategic Thinking. She’s a passionate mentor and CSR advocate, serving on the board of Y-KNOT Inc. and championing youth empowerment in the D.C. area. Her work has earned her recognition as a “CIO on the Rise” and a trusted voice in digital transformation.",
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
    bio: "Richard Hanks, co-founder and inaugural president of NCMA Metro Maryland (“MetroMD”), is a seasoned executive focused on strengthening the government contracting ecosystem for local businesses and community members. While leading MetroMD, Richard has helped build a community where government, industry, and the small-business community can connect, learn, and grow. Through tested and innovative engagement, the chapter reached nearly 1,000 federal contracting professionals across 22 events during a two-year period. Richard is also the co-founder and Chief Business Officer of MMC Government Solutions, an SBA certified small business whose leadership team has led or managed nearly $6 billion in federal requirements across 9 agencies in 8 countries on four continents. MMC helps the clients buy better, faster, and more effectively by enhancing their acquisition functions and human capital capabilities through solutions like its proprietary Thermal Intelligence® platform. Richard brings experience spanning federal acquisition, business development, workforce strategy, real estate, and community building. He is particularly committed to helping emerging firms navigate the federal marketplace by expanding access and creating durable connections. He holds a B.S. from Florida A&M University and an MBA from the University of Chicago. He lives in Prince George’s County with his lovely wife and amazing daughters.",
  },
  "sonya-hopson": {
    name: "Sonya Hopson",
    org: "Founder & CEO, Sage Services Group LLC",
    sector: "Industry, Former Government (Federal)",
    email: null,
    linkedin: "https://www.linkedin.com/in/sonya-hopson-97817020/",
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
    linkedin: "https://www.linkedin.com/in/joyessistrunkcpa/",
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
    linkedin: "https://www.linkedin.com/in/dr-lashonda-bracey-mct-msed-pmp-6a91928/",
    image: "/images/board-bracey.jpeg",
    bio: "Experienced owner with a demonstrated history of working in the e-learning industry. Skilled in Captivate, learning management, instructional design, public speaking, and web design. A strong community and social services professional with an M.S.Ed. focused in Training and Development / Instructional Design from Ferris State University.",
  },
  "major-clark": {
    name: "Major L. Clark, III, JD, MS",
    org: "Chief Operating Officer, Denise Bailey Clark, HR Consulting, LLC",
    sector: "Industry",
    email: null,
    linkedin: "https://www.linkedin.com/in/major-l-clark-iii-jd-ms-acc-8241649a/",
    image: "/images/board-clark.jpg",
    bio: "Major L. Clark III has had nearly 40 years of professional experience in corporate and government organizations as an executive. Currently, Major Clark retired from the federal government and is Chief Operating Officer for Denise Bailey Clark, HR Consulting, LLC. Prior to his retirement, three of the last Presidents of the United States of America appointed him to serve as the Acting Chief of the Office of Advocacy with the United States Small Business Administration. In this capacity he was the head of a team of lawyers and economists who monitored the impact of federal regulations on small businesses. He and his team saved small businesses more than $8 billion in regulatory compliance cost. Prior to being appointed acting chief counsel, Mr. Clark was an Advocate in the Office of Advocacy where he was responsible for procurement and government contracting issues, including regulations related to women procurement issues, the HUBZone, 8(a), Small Business Innovation Research, and minority enterprise development programs, cyber security and international trade. Before joining Advocacy, he was a senior corporate officer for one of the fastest growing minority-owned technical businesses in the United States, the Maxima Corporation. During his 11 years at the Maxima Corporation, Major managed multi-million-dollar federal contracts and was the senior corporate officer for administration. In his earlier tenure in public service, he received national recognition as the first African American to serve as the chief administrative officer for the Small Business Committee of the U.S. House of Representatives under the chair of Congressman Parren J. Mitchell of Maryland. Major drafted several innovative laws for small and minority businesses during this time, most still at the center of today’s federal small business programs. Major is also an Adjunct Professor, Organizational Development for the Graduate Management Program at the University of Maryland Global Campus. He earned his juris doctor and master’s degrees from the University of Iowa and his bachelor’s degree in Political Science from A&T University. He is certified by the Federal Internal Coaching Program and the Executive Coaching CoachDiversity program as an Associated Diversity Coach.",
  },
  "sharlyn-gray": {
    name: "Sharlyn Gray",
    org: "Q.O.L Security Solutions",
    sector: "Industry",
    email: null,
    linkedin: "https://www.linkedin.com/in/sharlyn-gray-658b82320/",
    image: "/images/board-gray.png",
    bio: null,
  },
  "serapis-irby": {
    name: "Serapis Irby",
    org: "Oasis Global Solutions",
    sector: "Industry",
    email: null,
    linkedin: "https://www.linkedin.com/in/george-serapis-irby-27b376a/",
    image: "/images/board-irby.jpeg",
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
  "oliver-queen": {
    name: "Dr. Oliver Queen, Jr., PhD, MBA, PMP",
    org: null,
    sector: "Government (Federal)",
    email: null,
    linkedin: "https://www.linkedin.com/in/dr-oliver-queen-jr/",
    image: "/images/board-queen.jpg",
    bio: "Dr. Oliver Queen, Jr., PhD, MBA, PMP, is a federal acquisition, program management, and workforce development professional with extensive experience supporting complex civilian and Department of Defense programs. His career spans acquisition strategy, contracting, program and project management, IT modernization, technical writing, curriculum development, and professional training. Dr. Queen has supported organizations including the Federal Aviation Administration, Department of Health and Human Services, Defense Information Systems Agency, and Federal Emergency Management Agency. He also serves as an instructor and subject matter expert supporting Federal Acquisition Institute professional development programs, bringing practical federal acquisition and program management experience into the classroom. His commitment to service extends beyond his professional work. Dr. Queen’s current and previous volunteer leadership includes Former Treasurer of the Harvard Kennedy School Black Alumni Association, Military Liaison with the Project Management Institute (PMI), member of the Excelsior University Alumni Leadership Council, and several other positions. As Director, Program Operations for the NCMA Metro Maryland Chapter, Dr. Queen brings federal acquisition expertise, program leadership, education, and volunteer service to strengthening chapter operations, expanding professional development, increasing member engagement, and delivering relevant programs that advance the contracting and acquisition community.",
  },
  "brandon-robinson": {
    name: "Brandon Robinson",
    org: null,
    sector: "Industry",
    email: null,
    linkedin: "https://www.linkedin.com/in/brandon-r-06440859/",
    image: "/images/board-robinson.jpeg",
    bio: "Brandon is a dynamic Talent Acquisition, Operations, and DEI leader with more than 15 years of experience driving strategic recruitment, workforce planning, employee engagement, and operational excellence across government, nonprofit, healthcare, education, and corporate sectors. Throughout his career, he has successfully led high-volume, full-cycle recruiting initiatives while partnering with executive leadership, hiring managers, and cross-functional teams to identify and secure top talent that supports organizational growth and performance. His expertise includes talent pipeline development, HR operations, onboarding, project coordination, compensation analysis, and implementing data-driven recruiting strategies that foster inclusive and high-performing workplace cultures.",
  },
  "megan-sheckles": {
    name: "Megan Sheckles",
    org: "Founder & CEO, Powered by MJ LLC",
    sector: "Industry",
    email: null,
    linkedin: "https://www.linkedin.com/in/megan-mj-sheckles-shrm-cp-7670496/",
    image: "/images/board-sheckles.jpeg",
    bio: "Megan (MJ) Sheckles, a serial CEO who exudes a passion for people and a mission to help individuals and businesses thrive by unlocking their full potential of growth and excellence. Megan created Powered by MJ LLC, an HR Solutions firm that provides fractional HR support, talent acquisition management and HR operations/employee relations to small businesses that are ready to prioritize their greatest asset—their people. Her expertise is backed by certifications, including the Society of Human Resources Management - Certified Professional (SHRM-CP) designation, HR Management certification from George Mason University, the Executive Strategic Inclusion Practitioner certification from Georgetown University, and an Organizational Development certification from Northwestern University. Being a serial CEO, her expertise doesn't stop at HR. She also runs MJ Events Management LLC, a boutique event management company in DC, MD, VA and Kentucky markets, specializing in weddings, group travel, corporate and government contracting. Lastly, Megan's most loved Founder/CEO title is with Get Moving With MJ LLC, where she specializes in real estate investing, mentorship and is an multi award-winning licensed realtor servicing DC, Maryland and Virginia. When Megan isn't leading businesses, she is supporting her alma mater, University of Louisville, as their Chapter President in DC, MD and VA, partnering and developing personally and professionally as an inductee of The BOW Collective, a black women-owned entrepreneurship organization as well as indulging in her love of travel, spa days, and reading.",
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
    bio: "Christi Venable is a licensed Professional counselor and an award-winning Business Owner, Corporate Wellness Expert, Organizational Leadership and Culture Change agent, AI Consultant and Keynote Speaker. She is a certified Gallup Strengths Finder Coach. She is the founder of SMILE Therapy Services, a mental health, wellness, and consulting company that she managed to build from the ground up. SMILE's mission is to change the way the workplace views and responds to mental health and wellness. Christi focuses on improving psychological safety and workplace culture through her preventative SMILE Framework to help companies retain employees and increase capacity. Christi has worked with Fortune 500 companies, government agencies and non-profit organizations improving employee wellbeing and transforming the workplace cultures with preventative mental health solutions. Christi and her team have provided workplace wellness and leadership solutions for over 500,000 employees. SMILE has been named one of the fastest growing companies in the country by INC5000 2 years in a row and Top 100 Minority Business Entity for DC, Maryland and Virginia. Christi was named SBA's Small Businessperson of the year for Washington DC in 2020 and Enterprising Women of the year in 2022. Christi received her undergraduate degree from Penn State University and her Graduate degree from George Washington University.",
  },
  "john-wilkinson": {
    name: "Dr. John W. Wilkinson, PMP, CPCM, CFCM, Fellow",
    org: "tHInc, LLC",
    sector: "Industry, Former Government (Federal)",
    email: null,
    linkedin: "https://www.linkedin.com/in/dr-john-w-wilkinson-pmp-cpcm-cfcm-2a55324/",
    image: "/images/board-wilkinson.jpeg",
    bio: "Dr. John W. Wilkinson, PMP, CPCM, CFCM, Fellow is the President of tHInc, LLC — a verified Service Disabled, Veteran-Owned Small Business (SDVOSB) specializing in contract management, program management, and workforce development. John specializes in workforce and leadership development programs involving ISO and ANSI standards, training, and certification programs at the international, federal, state, and local acquisition levels. John holds a Bachelor of Science (Aeronautics) degree, a Master of Business Administration degree, and a Doctorate of Education degree. Accomplishments that may cause some to question John’s judgment include completing 3 marathons, an Olympic triathlon (and 8 sprint triathlons), and running 2,657 miles with his grandchildren in a stroller (the tires needed to be changed twice!). John’s personal mission statement is, “To live my life with integrity, to pursue personal mastery, and to help others look like heroes.”",
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
    bio: "Tracy Marcinowski is a Managing Partner of Strategic Acquisition Solutions, LLC, where she advises clients on federal acquisition strategy, procurement operations, and government go-to-market positioning. With over 25 years spanning both government and industry, Tracy brings rare dual-side perspective to the small business community. Her federal career includes serving as Assistant Commissioner for Acquisition at GSA’s Public Buildings Service, overseeing a $7 billion procurement portfolio and a nationwide workforce of 800+, along with senior acquisition leadership roles at the Department of Veterans Affairs, U.S. Coast Guard, and U.S. Air Force. She also served as a Senior Contracts Manager at CACI, bridging industry practice with government procurement realities. Tracy is a recognized voice in federal acquisition reform and small business strategy.",
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
    bio: "Calvin J. Mitchell Jr. is a growth-focused federal acquisition executive with two decades of experience leading enterprise procurement strategy, shaping government buying behavior, and driving multi-billion-dollar growth across civilian, defense, and intelligence markets. He is recognized for his ability to influence early-stage opportunity shaping, engage effectively with C-suite and senior government leaders, and architect differentiated capture strategies that integrate cloud, AI, cyber, and digital modernization priorities. Calvin currently serves as Senior Director of Strategic Acquisitions & Engagement at General Dynamics Information Technology (GDIT), where he guides enterprise acquisition strategy and competitive positioning across key federal markets. He leads pre-RFP engagement efforts, advises executive leadership on procurement trends, and designs capture strategies for major GWACs, BPAs, and IDIQs. Prior to joining industry, Calvin served as the U.S. Department of Education’s Deputy Assistant Secretary for Acquisition, where he led department-wide procurement modernization, achieving significant cost efficiencies and cycle-time reductions. He also oversaw sourcing strategy for the $1.6 trillion Federal Student Aid portfolio, introducing AI-enabled tools and increasing data transparency. Earlier roles at the Department included leading the Office of Small & Disadvantaged Business Utilization and managing a $700 million acquisition portfolio as Deputy Director of Contracts & Acquisitions Management. Calvin’s federal career also includes leadership at the General Services Administration, where he directed a 160-person national organization supporting governmentwide procurement strategy, as well as key acquisition roles with the U.S. Army Corps of Engineers, U.S. Army Geospatial Center, and Army Contracting Command. He has supported national defense programs, global procurement operations across 130 countries, and numerous high-sensitivity, high-value federal missions. He also served as a Congressional Fellow with the House Committee on Homeland Security, advising lawmakers on acquisition policy and oversight. Calvin holds an MBA and a Bachelor of Science in Business Management from Centenary College.",
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
    org: "CEO, Forum",
    sector: "Industry",
    email: null,
    linkedin: "https://www.linkedin.com/in/alexatsui/",
    image: "/images/board-tsui.jpeg",
    bio: "With an illustrious career spanning almost two decades in the government contracting arena, Alexa Tsui brings a wealth of experience and an impeccable track record of excellence to the forefront. Her journey has been marked by a dynamic evolution, characterized by the seamless integration of market intelligence proficiency, business development acumen, and an unwavering commitment to innovation. Alexa’s foray into government contracting commenced in the realm of market intelligence—a domain where she meticulously honed her expertise in deciphering intricate landscapes, dissecting voluminous data, and distilling actionable insights. This early immersion in market intelligence served as the foundational compass guiding her career trajectory, and she has notably contributed her talents to industry giants such as INPUT (GovWin) and Bloomberg Government (Bgov). As her career trajectory unfolded, Alexa ventured deeper into the multifaceted world of government contracting, undergoing a transformative shift into the challenging yet exhilarating realm of Business Development and Capture. Here, she wielded her strategic prowess to orchestrate initiatives that transformed opportunities into contracts. Her innate passion for cultivating client relationships, pinpointing avenues for growth, and forging strategic partnerships emerged as the driving force behind her myriad accomplishments. Notably, her nearly decade-long tenure at Technik provided a pivotal platform for her growth, where she held key roles spanning recruiting, business development, capture, and project delivery management. Her subsequent role at MetaPhase, spanning 2.5 years, was marked by strategic growth and capture initiatives, with a specialized focus on low-code/no-code platforms. As Chief Operating Officer of G2X, Alexa worked at the convergence point where market intelligence, business development, and capture seamlessly merge — a domain where data-driven insights serve as the bedrock for informed strategic pursuits, fostering a holistic approach that empowers her to deliver unparalleled value to clients and partners alike. Throughout her journey, Alexa’s professional path has been an unceasing quest for knowledge, innovation, and the creation of profound impact. She has had the privilege of collaborating with distinguished professionals, forging enduring relationships, and contributing significantly to the progress of the government contracting community. She even coined a new hashtag for government contracting, #govcom (Government Community).",
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
