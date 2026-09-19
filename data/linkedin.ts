/**
 * Posts from the chapter's LinkedIn page, featured on the home page.
 *
 * LinkedIn withdrew its company-feed widget, so there is no way to pull the
 * page's posts automatically. Each post is embedded individually instead.
 *
 * To add one:
 *   1. Open the post on LinkedIn.
 *   2. Use the "..." menu on the post and choose "Embed this post".
 *   3. Copy the src out of the iframe it gives you and paste it below.
 *
 * The src looks like this, and the long number is the post's own id:
 *   https://www.linkedin.com/embed/feed/update/urn:li:share:7000000000000000000
 *
 * Only public posts embed. Anything limited to connections or to members
 * renders as an empty frame, so check the post is public before adding it.
 *
 * Newest first; the home page shows the first three. With the list empty the
 * section does not render at all.
 */
export interface LinkedInPost {
  /** The embed src LinkedIn gives you, copied verbatim. */
  src: string;
  /** Describes the post for screen readers and for anyone editing this file. */
  title: string;
}

export const linkedinPosts: LinkedInPost[] = [];

/** How many of the above the home page shows. */
export const LINKEDIN_POSTS_SHOWN = 3;
