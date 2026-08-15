import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in | NCMA MetroMD Chapter",
  description:
    "The MetroMD member area holds the chapter roster, meeting slides and recordings, study materials and your event registrations.",
  robots: { index: false, follow: false },
};

const perks = [
  "Slides and recordings from past dinner meetings",
  "CPCM, CFCM, CCCM and CCMA study group materials",
  "Chapter roster and mentor matching",
  "Member rate at every event",
];

export default function LoginPage() {
  return (
    <div className="pg grid grid-cols-1 items-start gap-12 pb-24 pt-14 lg:grid-cols-2 lg:gap-[72px]">
      <div>
        <div className="kick">Members</div>
        <h1 className="mb-6 mt-4 text-4xl leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-[56px]">
          Sign in
        </h1>
        <p className="lede text-[19px]">
          The member area holds the chapter roster, meeting slides and recordings,
          study materials and your event registrations.
        </p>
        <ul className="mt-6 list-disc pl-5 text-[17px] leading-loose text-neutral-700">
          {perks.map((perk) => (
            <li key={perk}>{perk}</li>
          ))}
        </ul>
      </div>

      {/*
        TODO(auth): the member area does not exist yet — this is the redesign's
        sign-in surface with no identity provider behind it. There is no auth
        dependency in package.json and no session handling anywhere in the app,
        so wiring this is net-new work, not a hookup:
          1. Decide where member identity lives. NCMA Headquarters owns
             membership (see the Chapter Preference flow), so SSO against HQ —
             if they offer it — avoids the chapter maintaining its own roster.
          2. Otherwise add NextAuth (or Clerk/Auth0) plus a datastore; the
             project currently has no database at all, only static data/ files
             and the Eventbrite API.
        The form below is deliberately inert until that decision is made.
      */}
      <div className="card elev-sm p-8">
        <div className="field mb-4">
          <label htmlFor="login-email">Email</label>
          <input
            id="login-email"
            className="input"
            type="email"
            placeholder="you@agency.gov"
          />
        </div>
        <div className="field mb-4">
          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            className="input"
            type="password"
            placeholder="••••••••"
          />
        </div>
        <button type="button" className="btn btn-primary btn-block" disabled>
          Sign in
        </button>
        <p className="mt-3 text-sm text-neutral-600">
          The member area is not open yet.
        </p>
        <div className="mt-5 text-[15px] text-neutral-700">
          Not a member yet? Membership is through NCMA Headquarters — put
          &ldquo;MetroMD&rdquo; as your Chapter Preference.
        </div>
        <a
          className="btn btn-secondary mt-3"
          href="https://www.ncmahq.org/membership"
          target="_blank"
          rel="noopener noreferrer"
        >
          Join NCMA
        </a>
      </div>
    </div>
  );
}
