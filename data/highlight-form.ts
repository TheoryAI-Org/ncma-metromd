/**
 * Questions for the Member Highlight submission form on /highlight.
 *
 * The first question ("Are you a member or a business?") picks which list
 * below is shown. Edit the wording, order or `required` flags here; the form
 * and the email the chapter receives both follow this file.
 *
 * The Member questions match the chapter's previous Google Form. The Small
 * Business list is a placeholder until those questions are supplied.
 */
export type HighlightQuestion =
  | { id: string; label: string; type: "text" | "email"; required?: boolean; autoComplete?: string }
  | { id: string; label: string; type: "textarea"; required?: boolean }
  | { id: string; label: string; type: "choice"; options: string[]; required?: boolean };

export const highlightPaths = {
  Member: [
    { id: "fullName", label: "Full Name", type: "text", required: true, autoComplete: "name" },
    { id: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
    { id: "ncmaMember", label: "Are you an NCMA Member?", type: "choice", options: ["Yes", "No"] },
    { id: "chapter", label: "NCMA Chapter Affiliation:", type: "text" },
    {
      id: "trend",
      label: "What’s one trend or challenge in the contracting space that you’re passionate about?",
      type: "textarea",
      required: true,
    },
    {
      id: "aspirations",
      label:
        "What are your professional aspirations within contract management, and how do you see NCMA helping you achieve them?",
      type: "textarea",
      required: true,
    },
    {
      id: "impact",
      label: "How do you plan to make an impact in the contracting space, and how can NCMA help support that vision?",
      type: "textarea",
      required: true,
    },
  ],
  // Placeholder until the chapter supplies the Small Business questions.
  "Small Business": [
    { id: "businessName", label: "Business Name", type: "text", required: true, autoComplete: "organization" },
    { id: "contactName", label: "Contact Name", type: "text", required: true, autoComplete: "name" },
    { id: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
    { id: "about", label: "Tell us about your business", type: "textarea", required: true },
  ],
} satisfies Record<string, HighlightQuestion[]>;

export type HighlightPath = keyof typeof highlightPaths;

/** Answer options for the first question, in the order the form shows them. */
export const highlightPathOptions: HighlightPath[] = ["Small Business", "Member"];
