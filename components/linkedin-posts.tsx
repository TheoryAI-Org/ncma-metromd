import { LINKEDIN_POSTS_SHOWN, linkedinPosts } from "@/data/linkedin";
import { socials } from "@/data/site";

const LINKEDIN_PAGE =
  socials.find((s) => s.name === "LinkedIn")?.href ??
  "https://www.linkedin.com/company/ncma-metromd/";

/**
 * Featured posts from the chapter's LinkedIn page.
 *
 * Each is LinkedIn's own embed, in an iframe pointing at linkedin.com, so the
 * post renders as it does there and stays current if it is edited. Nothing of
 * LinkedIn's runs on this page: an iframe cannot reach the surrounding
 * document, so no tracking script is added and the rest of the page is not
 * held up by it.
 *
 * With no posts listed the whole section is omitted rather than left empty.
 */
export function LinkedInPosts() {
  const posts = linkedinPosts.slice(0, LINKEDIN_POSTS_SHOWN);
  if (posts.length === 0) return null;

  return (
    <section className="pg" style={{ paddingTop: 64 }} aria-labelledby="li-heading">
      <div
        className="stack-md"
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 32,
          flexWrap: "wrap",
        }}
      >
        <div>
          <h2
            id="li-heading"
            style={{ fontSize: "clamp(26px, 5.2vw, 38px)", margin: "0 0 10px" }}
          >
            From LinkedIn
          </h2>
          <p
            style={{
              fontSize: 18,
              color: "var(--color-neutral-800)",
              maxWidth: "58ch",
              margin: 0,
            }}
          >
            What the chapter has been posting lately.
          </p>
        </div>
        <a
          className="link-rule"
          href={LINKEDIN_PAGE}
          target="_blank"
          rel="noopener noreferrer"
          style={{ flex: "none" }}
        >
          Follow us on LinkedIn
        </a>
      </div>

      <div className="li-grid">
        {posts.map((post) => (
          <iframe
            key={post.src}
            src={post.src}
            title={post.title}
            loading="lazy"
            frameBorder="0"
            allowFullScreen
            className="li-embed"
          />
        ))}
      </div>
    </section>
  );
}
