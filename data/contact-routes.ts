import "server-only";

import type { ContactTopic } from "@/data/site";

/**
 * Which board member handles each contact topic.
 *
 * This module is server-only: importing it from a client component is a build
 * error, which is what keeps these addresses out of the browser bundle. The
 * public topic labels live in `data/site.ts`; only the mapping to a real inbox
 * lives here.
 */
export const contactRoutes: ReadonlyArray<{
  topic: ContactTopic;
  name: string;
  email: string;
}> = [
  { topic: "Membership", name: "Jennifer Hanks", email: "jahanks@mmcgovsolutions.com" },
  { topic: "Programs and meetings", name: "Bethlehem Belaineh", email: "be@theoryai.co" },
  { topic: "Training and certification", name: "Dr. Patricia Akinrogunde", email: "patricia@triplejoygroup.com" },
  { topic: "Sponsorship", name: "Sonya Hopson", email: "sonya@sageservicesgroupllc.com" },
  { topic: "Newsletter", name: "Bethlehem Belaineh", email: "be@theoryai.co" },
  { topic: "Something else", name: "Jennifer Hanks", email: "jahanks@mmcgovsolutions.com" },
];
