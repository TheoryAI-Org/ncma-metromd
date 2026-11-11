import type { PersonId } from "./board";

/**
 * The Member Highlight shown at the top of /highlight. Replace it each month;
 * the submission form below it stays the same.
 *
 * `intro` is the chapter's introduction. `words` is the member's own text, one
 * string per paragraph, published as written.
 */
export interface MemberHighlight {
  person: PersonId;
  /** e.g. "November 2026" */
  month: string;
  headline: string;
  intro: string[];
  /** Heading above the member's own words. */
  wordsHeading: string;
  words: string[];
  /** Attribution under their words. */
  signature: string;
}

export const currentHighlight: MemberHighlight | null = {
  person: "chyanne-thomas",
  month: "November 2026",
  headline: "Chyanne Thomas, President-Elect",
  intro: [
    "For this month’s member highlight, we're spotlighting our President-Elect, Chyanne Thomas, an exemplary leader. A US Army veteran and founding member of NCMA MetroMD, she leads with what the Army taught her: “take care of your people, and do the right thing even when no one’s watching”. Her heart is in opening doors for those who’ve been overlooked and investing in the next generation.",
  ],
  wordsHeading: "In her own words: presenting our President-Elect, Chyanne Thomas",
  words: [
    "When I think about what it means to be a veteran, I think about the people first: the ones who gave me a chance, the soldiers I got to take care of, and the friends I wish were still here.",
    "Two years before I enlisted, I was told I had too many tattoos to join - residuals of a past life. One day I received a call from Michael Finnell (my recruiter from 2 years prior). Mike put me in touch with Sergeant Zachary Quick, and within weeks I signed my Army contract on March 9, 2006.",
    "To Zach: I still think about the part you played in my beginning. You will never be forgotten.",
    "I finished up my associates and shipped out two days before my twenty-third birthday in the summer of 06. I had no idea what was waiting for me, but I was ready. The Army turned into the beginning of my beginning. I immersed myself into being Soldier and did so with a sense of pride and humility. I made Sergeant First Class in seven years. Became the 1st USASOC AG NCO of the Year, and in 2015 I was one of only three soldiers selected for E-7 (42A), and the only woman. I finished my first bachelor's and first master’s degree, and I coached and mentored Soldiers, professionally and personally. I also lived through things that changed me, some for the better and some not. Of everything I got to do in the Army, taking care of soldiers and their families meant the most. I am grateful to have experienced what it means to trust without question the person to your left and your right.",
    "I got out before I was ready and remember how scared I was to take off the uniform for the last time. I knew who I was when I put it on every morning; I was still figuring out who I was without it. When I shared that fear at the Warrior Transition Unit, someone told me something that helped me accept that my military chapter was changing:",
    "“You will forever be a Veteran.”",
    "I needed to hear that then.",
    "Some days, I still do.",
    "I gave some of the best parts of myself to those years.",
    "I’m proud of what I gave.",
    "I’m grateful for who I got to serve with.",
    "And I’m still learning how to carry it all.",
    "To my battle buddies who are no longer with us: thank you for the time we had. I miss you. I’m proud I got to serve beside you.",
  ],
  signature: "Chyanne Thomas, U.S. Army Veteran",
};
