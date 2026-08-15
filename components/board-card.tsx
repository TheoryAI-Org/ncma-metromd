"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Headshot } from "@/components/headshot";
import type { BoardMember } from "@/data/board";

const LinkedInIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.76V21h-4v-5.7c0-1.36-.03-3.1-1.9-3.1-1.9 0-2.2 1.47-2.2 3v5.8h-4z" />
  </svg>
);

export function BoardCard({ member }: { member: BoardMember }) {
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

      <h3 className={`text-2xl ${member.linkedin ? "mt-1.5" : "mt-4"} mb-0.5`}>
        {member.name}
      </h3>
      <div className="kick">{member.role}</div>
      <div className="mt-1.5 text-base text-neutral-700">{member.affiliation}</div>
      <div className="mt-2 flex flex-col gap-1">
        <a
          href={`mailto:${member.email}`}
          className="break-words text-sm text-cyan-700 hover:underline"
        >
          {member.email}
        </a>
      </div>

      <Dialog.Root>
        <Dialog.Trigger className="btn btn-ghost mt-2.5 pl-0">Read bio</Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-[rgba(32,30,29,0.55)] data-[state=open]:animate-in data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[82vh] w-[calc(100%-32px)] max-w-[760px] -translate-x-1/2 -translate-y-1/2 overflow-auto bg-paper p-7 shadow-lg sm:p-12">
            <Dialog.Close
              className="btn btn-icon absolute right-4 top-4"
              aria-label="Close"
            >
              ×
            </Dialog.Close>
            <Dialog.Title className="mb-5 max-w-[32ch] text-3xl">
              {member.name}
            </Dialog.Title>
            <Dialog.Description className="bio max-w-none">
              {member.bio}
            </Dialog.Description>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
