"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Headshot } from "@/components/headshot";
import type { BoardBody, BoardMember } from "@/data/board";

const LinkedInIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.76V21h-4v-5.7c0-1.36-.03-3.1-1.9-3.1-1.9 0-2.2 1.47-2.2 3v5.8h-4z" />
  </svg>
);

// Name size and margin form a per-body hierarchy — officers largest, advisors
// most compressed — measured from all 41 prototype cards (perfectly consistent
// within each body). See .claude/specs/01-design-system.md.
const NAME_STYLE: Record<BoardBody, { size: string; mt: string; mb: string }> = {
  officers: { size: "text-[30px]", mt: "mt-2.5", mb: "mb-1" },
  directors: { size: "text-[28px]", mt: "mt-2.5", mb: "mb-1" },
  advisors: { size: "text-[24px]", mt: "mt-1.5", mb: "mb-0.5" },
};

function Sector({ sector }: { sector: string }) {
  // Magenta reads "Government"; everything else, including every "Industry,
  // Former Government (…)" variant, stays neutral. Literal startsWith, not a
  // hardcoded name list — see the T4 spec for the exact five it selects.
  const color = sector.startsWith("Government") ? "text-magenta-700" : "text-neutral-700";
  return <div className={`mt-1.5 text-[11px] uppercase tracking-[0.05em] ${color}`}>{sector}</div>;
}

function Organization({ organization }: { organization: string }) {
  return <div className="mt-1.5 text-base text-neutral-700">{organization}</div>;
}

export function BoardCard({ member }: { member: BoardMember }) {
  const nameStyle = NAME_STYLE[member.body];
  // Advisors read position → organization → sector; officers and directors
  // read position → sector → organization. 10/10 advisor cards agree, against
  // 31/31 in the other two bodies.
  const isAdvisor = member.body === "advisors";

  return (
    <div>
      <Headshot src={member.photo} alt={member.name} />

      {member.linkedin && (
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${member.name} on LinkedIn`}
          className="mt-3 inline-flex text-cyan-700 hover:text-cyan"
        >
          <LinkedInIcon />
        </a>
      )}

      <h3
        className={`${nameStyle.size} font-bold leading-[1.15] tracking-[-0.01em] ${
          member.linkedin ? nameStyle.mt : "mt-4"
        } ${nameStyle.mb}`}
      >
        {member.name}
      </h3>
      <div className="kick text-xs tracking-[0.06em] whitespace-nowrap">{member.position}</div>

      {isAdvisor ? (
        <>
          {member.organization && <Organization organization={member.organization} />}
          <Sector sector={member.sector} />
        </>
      ) : (
        <>
          <Sector sector={member.sector} />
          {member.organization && <Organization organization={member.organization} />}
        </>
      )}

      {member.email && (
        <a
          href={`mailto:${member.email}`}
          className="mt-2 block text-[15px] text-cyan-700 hover:underline [overflow-wrap:anywhere]"
        >
          {member.email}
        </a>
      )}

      {member.bio && (
        <Dialog.Root>
          <Dialog.Trigger
            className="btn btn-ghost mt-2.5 pl-0"
            aria-label={`Read ${member.name}'s bio`}
          >
            Read bio
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-[200] bg-[rgba(32,30,29,0.55)] data-[state=open]:animate-in data-[state=open]:fade-in-0" />
            <Dialog.Content
              // Radix focuses this panel (tabindex="-1") on open; without
              // suppressing the outline, the global :focus-visible rule
              // traces a ring around the whole 760px panel instead of the
              // close button a keyboard user actually cares about.
              className="fixed left-1/2 top-1/2 z-[200] max-h-[82vh] w-[calc(100%-32px)] max-w-[760px] -translate-x-1/2 -translate-y-1/2 overflow-auto bg-paper p-7 shadow-lg focus:outline-none sm:px-12 sm:pb-12 sm:pt-11"
              aria-describedby={undefined}
            >
              <Dialog.Close
                className="btn btn-icon absolute right-4 top-4"
                aria-label="Close"
              >
                ×
              </Dialog.Close>
              <Dialog.Title className="mb-5 max-w-[32ch] text-[32px]">
                {member.name}
              </Dialog.Title>
              <div>
                {member.bio.map((block, i) =>
                  block.type === "ul" ? (
                    <ul key={i} className={`bio max-w-none list-disc pl-5 ${i > 0 ? "mt-5" : ""}`}>
                      {block.items.map((item, j) => (
                        <li key={j}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p key={i} className={`bio max-w-none ${i > 0 ? "mt-5" : ""}`}>
                      {block.text}
                    </p>
                  )
                )}
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      )}
    </div>
  );
}
