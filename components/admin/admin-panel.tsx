"use client";

import { useState } from "react";
import Link from "next/link";
import { Headshot } from "@/components/shared/headshot";
import { PageHeader } from "@/components/shared/page-header";
import { advisors, directors, officers } from "@/data/board";

const tabs = [
  "Dashboard",
  "Articles",
  "Editor",
  "Board roster",
  "Media",
  "Users",
] as const;
type Tab = (typeof tabs)[number];

/**
 * The design's content panel, ported as a front-end preview. Nothing here is
 * connected to a CMS — the one live part is the Board roster tab, which reads
 * the real roster in data/board.ts so the bio and headshot gaps it reports are
 * accurate. Wire the rest up when a backend exists.
 */
export function AdminPanel() {
  const [tab, setTab] = useState<Tab>("Dashboard");

  return (
    <main id="main" className="pg" style={{ paddingTop: 40, paddingBottom: 88 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          gap: 24,
          flexWrap: "wrap",
        }}
      >
        <div>
          <PageHeader
            kicker="Admin"
            title="Content panel"
            titleSize={44}
            titleStyle={{ margin: "10px 0 0" }}
          />
        </div>
        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
          <span className="tag tag-accent-2">Preview — not connected</span>
          <Link className="btn btn-ghost" href="/login">
            Sign out
          </Link>
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, marginTop: 28, flexWrap: "wrap" }}>
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            className={t === tab ? "btn btn-primary" : "btn btn-secondary"}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Dashboard" && <Dashboard />}
      {tab === "Articles" && <Articles />}
      {tab === "Editor" && <Editor />}
      {tab === "Board roster" && <Roster />}
      {tab === "Media" && <Media />}
      {tab === "Users" && <Users />}
    </main>
  );
}

// Advisors overlap the officer and director lists, so dedupe by name before
// counting gaps or listing media — otherwise a person is counted twice and
// the media grid renders two tiles keyed on the same filename.
const allMembers = [...officers, ...directors, ...advisors].filter(
  (m, i, list) => list.findIndex((other) => other.name === m.name) === i,
);

function Dashboard() {
  const missingBios = allMembers.filter((m) => !m.bio).length;
  const missingHeadshots = allMembers.filter((m) => !m.image).length;

  const stats = [
    { value: 3, label: "Awaiting review", accent: "var(--color-accent-700)" },
    { value: 7, label: "Drafts", accent: "var(--color-neutral-700)" },
    { value: 2, label: "Upcoming events", accent: "var(--color-neutral-700)" },
    { value: missingBios, label: "Missing bios", accent: "var(--color-accent-2-700)" },
    { value: missingHeadshots, label: "Missing headshots", accent: "var(--color-accent-2-700)" },
  ];

  const queue = [
    ["Building a training calendar around the FAR overhaul", "Article", "Dr. Cynthia Pace", "2 days ago"],
    ["September chapter newsletter", "Newsletter", "B. Belaineh", "4 days ago"],
    ["Antavia Grimsley — biography", "Board bio", "A. Grimsley", "6 days ago"],
  ];

  return (
    <div style={{ marginTop: 32 }}>
      <div
        className="grid-5"
        style={{ display: "grid", gridTemplateColumns: "repeat(5,minmax(0,1fr))", gap: 20 }}
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            style={{ border: "1px solid var(--color-neutral-300)", padding: "18px 20px" }}
          >
            <div style={{ fontSize: 38, lineHeight: 1, color: stat.accent }}>{stat.value}</div>
            <div
              style={{
                fontSize: 13,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: stat.accent,
                marginTop: 6,
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <h3 style={{ fontSize: 26, margin: "40px 0 14px" }}>Awaiting your review</h3>
      <div style={{ overflowX: "auto" }}>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Type</th>
              <th>Author</th>
              <th>Submitted</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {queue.map(([title, type, author, when]) => (
              <tr key={title}>
                <td>{title}</td>
                <td>{type}</td>
                <td>{author}</td>
                <td>{when}</td>
                <td style={{ textAlign: "right" }}>
                  <span className="tag tag-accent">In review</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Articles() {
  const rows: [string, string, string, string, string][] = [
    ["Building a training calendar around the FAR overhaul", "Dr. Cynthia Pace", "Training", "In review", "2 days ago"],
    ["What CMMC means for small primes", "Lester L. Ingol", "Compliance", "Draft", "5 days ago"],
    ["Notes from the September dinner meeting", "Chyanne Thomas", "Chapter", "Published", "2 weeks ago"],
    ["Bridging policy and execution", "Jennifer Hanks", "Leadership", "Published", "1 month ago"],
  ];
  const tagFor = (status: string) =>
    status === "In review" ? "tag tag-accent" : status === "Draft" ? "tag tag-neutral" : "tag tag-outline";

  return (
    <div style={{ marginTop: 32 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 20,
          flexWrap: "wrap",
        }}
      >
        <input
          className="input"
          type="text"
          placeholder="Search articles"
          style={{ width: 280 }}
          aria-label="Search articles"
        />
        <button className="btn btn-primary" type="button">
          New article
        </button>
      </div>
      <div style={{ overflowX: "auto", marginTop: 24 }}>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>Status</th>
              <th>Last edited</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([title, author, category, status, edited]) => (
              <tr key={title}>
                <td>{title}</td>
                <td>{author}</td>
                <td>{category}</td>
                <td>
                  <span className={tagFor(status)}>{status}</span>
                </td>
                <td>{edited}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Editor() {
  return (
    <div style={{ marginTop: 32, border: "1px solid var(--color-neutral-300)" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "14px 20px",
          borderBottom: "1px solid var(--color-neutral-300)",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
          <span className="tag tag-neutral">Draft</span>
          <span style={{ fontSize: 14, color: "var(--color-neutral-600)" }}>
            Saved 12 seconds ago
          </span>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button className="btn btn-ghost" type="button">
            Revisions
          </button>
          <button className="btn btn-secondary" type="button">
            Submit for review
          </button>
          <button className="btn btn-primary" type="button">
            Publish
          </button>
        </div>
      </div>

      <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        <div style={{ padding: "26px 22px", borderRight: "1px solid var(--color-neutral-300)" }}>
          <div className="field" style={{ marginBottom: 16 }}>
            <label htmlFor="editor-title">Title</label>
            <input
              className="input"
              id="editor-title"
              type="text"
              defaultValue="Building a training calendar around the FAR overhaul"
            />
          </div>
          <div className="field" style={{ marginBottom: 16 }}>
            <label htmlFor="editor-standfirst">Standfirst</label>
            <input
              className="input"
              id="editor-standfirst"
              type="text"
              placeholder="Two or three sentences framing the piece"
            />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div className="field">
              <label htmlFor="editor-author">Author</label>
              <input className="input" id="editor-author" type="text" defaultValue="Dr. Cynthia Pace" />
            </div>
            <div className="field">
              <label htmlFor="editor-category">Category</label>
              <input
                className="input"
                id="editor-category"
                type="text"
                defaultValue="Training & education"
              />
            </div>
          </div>

          <div
            style={{
              fontSize: 13,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--color-accent-700)",
              margin: "24px 0 10px",
            }}
          >
            Body
          </div>
          <div style={{ border: "1px solid var(--color-neutral-300)" }}>
            <div
              style={{
                display: "flex",
                gap: 6,
                padding: "8px 10px",
                borderBottom: "1px solid var(--color-neutral-300)",
                flexWrap: "wrap",
              }}
            >
              {["B", "I", "Link", "H2", "List", "Quote", "Image"].map((t) => (
                <button
                  key={t}
                  type="button"
                  className="btn btn-ghost"
                  style={{
                    padding: "4px 10px",
                    fontWeight: t === "B" ? 700 : undefined,
                    fontStyle: t === "I" ? "italic" : undefined,
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
            <div
              style={{
                padding: "18px 16px",
                minHeight: 240,
                fontSize: 15,
                lineHeight: 1.7,
                color: "var(--color-neutral-800)",
              }}
            >
              <p style={{ margin: "0 0 14px" }}>
                The chapter’s training year is built around four questions members keep
                asking, and each one becomes a session.
              </p>
              <div
                style={{
                  borderLeft: "3px solid var(--color-accent)",
                  paddingLeft: 14,
                  margin: "18px 0",
                  fontStyle: "italic",
                  fontSize: 17,
                }}
              >
                Pull quote block — drag to reposition, or click to add attribution.
              </div>
              <div
                style={{
                  background: "var(--color-neutral-100)",
                  padding: 24,
                  textAlign: "center",
                  fontSize: 14,
                  color: "var(--color-neutral-600)",
                  margin: "18px 0",
                }}
              >
                Image block — drop a file, or choose from the media library
              </div>
            </div>
          </div>
        </div>

        <div style={{ padding: "26px 22px", background: "var(--color-neutral-100)" }}>
          <div
            style={{
              fontSize: 13,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--color-neutral-700)",
            }}
          >
            Live preview
          </div>
          <div style={{ background: "#fff", padding: "26px 24px", marginTop: 12 }}>
            <div
              style={{
                fontSize: 12,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--color-accent-700)",
              }}
            >
              Training &amp; education
            </div>
            <h3
              style={{
                fontSize: 30,
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
                margin: "12px 0 14px",
              }}
            >
              Building a training calendar around the FAR overhaul
            </h3>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.7,
                color: "var(--color-neutral-800)",
                margin: "0 0 14px",
              }}
            >
              The chapter’s training year is built around four questions members keep asking,
              and each one becomes a session.
            </p>
            <div
              style={{
                fontSize: 20,
                fontStyle: "italic",
                lineHeight: 1.5,
                margin: "20px 0",
                maxWidth: "34ch",
              }}
            >
              Pull quote block — drag to reposition, or click to add attribution.
            </div>
            <div style={{ aspectRatio: "16 / 9", background: "var(--color-neutral-200)" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Roster() {
  const [group, setGroup] = useState<"Officers" | "Directors" | "Advisors">("Officers");
  const rows =
    group === "Officers" ? officers : group === "Directors" ? directors : advisors;
  const missing = { color: "var(--color-accent-2-700)" };

  return (
    <div style={{ marginTop: 32 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 20,
          flexWrap: "wrap",
        }}
      >
        <div className="seg">
          {(["Officers", "Directors", "Advisors"] as const).map((g) => (
            <label key={g} className="seg-opt">
              <input
                type="radio"
                name="bd"
                checked={group === g}
                onChange={() => setGroup(g)}
              />
              {g}
            </label>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <a
            className="btn btn-secondary"
            href={`mailto:?bcc=${rows
              .filter((m) => (!m.bio || !m.image) && m.email)
              .map((m) => m.email)
              .join(",")}&subject=${encodeURIComponent(
              "NCMA MetroMD — bio and headshot needed for the chapter site",
            )}`}
          >
            Email members missing bios
          </a>
          <button className="btn btn-primary" type="button">
            Add member
          </button>
        </div>
      </div>

      <div style={{ overflowX: "auto", marginTop: 24 }}>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Bio</th>
              <th>Headshot</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((member) => {
              const complete = Boolean(member.bio && member.image);
              return (
                <tr key={member.id}>
                  <td>{member.name}</td>
                  <td>{member.role}</td>
                  <td style={member.bio ? undefined : missing}>
                    {member.bio ? "Yes" : "Missing"}
                  </td>
                  <td style={member.image ? undefined : missing}>
                    {member.image ? "Yes" : "Missing"}
                  </td>
                  <td>
                    <span className={complete ? "tag tag-outline" : "tag tag-neutral"}>
                      {complete ? "Published" : "Draft"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p
        style={{
          fontSize: 15,
          color: "var(--color-neutral-700)",
          marginTop: 16,
          maxWidth: "64ch",
        }}
      >
        Bio and headshot status is read live from the site’s roster. A member counts as
        Published once both are on file.
      </p>
    </div>
  );
}

function Media() {
  const files = allMembers
    .filter((m) => m.image)
    .map((m) => ({ src: m.image!, name: m.image!.replace("/images/", "") }));

  return (
    <div style={{ marginTop: 32 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 20,
          flexWrap: "wrap",
        }}
      >
        <input
          className="input"
          type="text"
          placeholder="Search by filename or alt text"
          style={{ width: 300 }}
          aria-label="Search media"
        />
        <button className="btn btn-primary" type="button">
          Upload
        </button>
      </div>
      <div
        className="grid-5"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5,minmax(0,1fr))",
          gap: 20,
          marginTop: 24,
        }}
      >
        {files.map((file) => (
          <div key={file.name}>
            <Headshot src={file.src} alt={file.name} placeholder="File" sizes="20vw" />
            <div style={{ fontSize: 13, marginTop: 8, wordBreak: "break-all" }}>
              {file.name}
            </div>
          </div>
        ))}
        <div
          style={{
            border: "1px dashed var(--color-neutral-400)",
            aspectRatio: "4 / 5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            fontSize: 13,
            color: "var(--color-neutral-600)",
            padding: 12,
          }}
        >
          Drop files here
        </div>
      </div>
    </div>
  );
}

function Users() {
  const rows: [string, string, string, string][] = [
    ["Bethlehem Belaineh", "be@theoryai.co", "Administrator", "Today"],
    ["Jennifer Hanks", "jahanks@mmcgovsolutions.com", "Administrator", "Yesterday"],
    ["Chyanne Thomas", "cthomas@aurelus.io", "Editor", "3 days ago"],
    ["Dr. Cynthia Pace", "cpace@leadershipguru.com", "Editor", "1 week ago"],
  ];

  return (
    <div style={{ marginTop: 32 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 20,
          flexWrap: "wrap",
        }}
      >
        <p style={{ fontSize: 16, color: "var(--color-neutral-700)", margin: 0, maxWidth: "52ch" }}>
          Accounts are created by invitation — there is no public sign-up.
        </p>
        <button className="btn btn-primary" type="button">
          Invite user
        </button>
      </div>
      <div style={{ overflowX: "auto", marginTop: 24 }}>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Last active</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([name, email, role, active]) => (
              <tr key={email}>
                <td>{name}</td>
                <td>{email}</td>
                <td>
                  <span className={role === "Administrator" ? "tag tag-accent-2" : "tag tag-neutral"}>
                    {role}
                  </span>
                </td>
                <td>{active}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
