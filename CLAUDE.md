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

# Working in this repository

These were kept in Claude Code's memory for unstrungApp, where eyesunstrung sessions do not see
them. Moved here 2026-11-19.

- **Push only when Joel says to push, in the current message.** "After this we will push" means
  after he has reviewed what comes back. Pushing `main` publishes eyesunstrung.vip, so it is a
  publication, not a backup. Committing locally is fine; say the commit is local.
- **Work on `main` in this folder.** No git worktrees and no branches unless Joel asks for one.
  If `main` has uncommitted changes, say what they are before working around them.
- **The dev server stays running.** Test the site on the Eleventy dev server at
  http://localhost:8080/ (`npm start`), and leave it running afterwards: Joel uses it to check
  pages with NVDA. Before testing, check whether 8080 is listening and start it in the background
  if not. Do not start a second server on another port. Restart it on 8080 if its watcher misses a
  change, as it once did with a new file.
- **Safari and iOS checks use real WebKit.** Playwright's WebKit is installed through
  unstrungApp's `node_modules/playwright-core`; launch it with `webkit.launch()` from that
  package, against the dev server or the live site. Do not imitate Safari in Edge: a dropdown fix
  once tested that way still failed on iOS. WebKit on Windows has no lock screen, AirPods or Now
  Playing, so those need Joel's phone.
- **unstrung releases reach the site through the workflow.** After an unstrung release, unless
  Joel says not to, run `gh workflow run site.yml --ref main -R joeldodson/eyesunstrung`, wait for
  it with `gh run watch <id> -R joeldodson/eyesunstrung --exit-status`, and check that
  https://eyesunstrung.vip/unstrung/app/ serves the new version. Browsers may keep a page for 10
  minutes, so tell Joel to reload on his phone. This is the one standing exception to the push
  rule, and it covers the workflow run only.

# Replying to Joel

Joel's global instructions cover headings, screenshots and plain writing. Also:

- **Questions one at a time.** When there are several decisions, put each to Joel separately as
  a pointed question with options, recommending one where there is one. A list of questions at
  the end of a long reply is hard to hold in mind when listening. A question asked in a reply's
  text goes last, under its own level 3 heading.
- **Name places instead of pointing.** No "shown here", "over there", "on the right" or "below",
  in replies or in anything written for the site. Name the landmark, heading, panel or section.
- **Long sessions.** In a very long session the desktop app has lost the newest messages from
  NVDA's browse mode. At a natural break, such as after a commit, offer to continue in a fresh
  session; the files in `docs/` carry the context.

# Design notes

`docs/` records how the site is built and why. `docs/site-structure.md` covers the layout,
sections and build checks. Read the relevant file before changing what it covers, and add to it
when a discussion settles something. Joel uses the repository as a backup.
