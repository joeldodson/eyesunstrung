# Writing articles

Sessions in this repository are usually for writing one article for eyesunstrung.vip.

At the start of any session about an article, before reading or writing a draft, read
`docs/article-instructions.md` in full and follow it. It covers the workflow, the format, the voice,
how to describe things to blind readers, and how to work with Joel on a draft.
`docs/article-format.md` has the reasoning behind the format rules and what the build checks.

- Drafts are written in `articlesWorkspace/`, which is gitignored.
- A finished article is copied to `content/articles/`, and its copy stays in `articlesWorkspace/`.
- The finished articles in `articlesWorkspace/` show Joel's style. Read
  `meet-the-acoustic-guitar.md` there before drafting; it is the model for the voice.
- Commit and push only when Joel says to. Pushing `main` publishes the site.

# Design notes

`docs/` records how the site is built and why. `docs/site-structure.md` covers the layout,
sections and build checks. Read the relevant file before changing what it covers, and add to it
when a discussion settles something. Joel uses the repository as a backup.
