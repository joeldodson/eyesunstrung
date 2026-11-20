# Article instructions

Everything Claude needs to write or revise an article for eyesunstrung.vip.
Read all of it at the start of every article session, before reading or writing any draft.

Joel built these up in a Claude chat project over the first two Claude-written articles, Physics, Math, and Music and Meet the Acoustic Guitar.
On 2026-11-19 the chat project wrote them out as one file, merging its configuration, its documents article-rules.md and writing-style.md, and its memory.
They were then checked against `docs/article-format.md` and `docs/site-structure.md`, made consistent with them, and saved here.
Articles are now written in Claude Code sessions in this repository, one session per article.

`docs/article-format.md` explains why the format rules exist and what the build checks.
These instructions are what to follow; that file is the reasoning behind them.

## Workflow in this repository

- Drafts live in `articlesWorkspace/` at the repository root, which is gitignored.
- When Joel says an article is finished, copy it into `content/articles/` under the same file name.
- Keep the copy in `articlesWorkspace/` as well. The finished articles there are the reference for Joel's style.
- When an article is published, it also needs its section on the `/articles/` page, `content/articles/index.md`: an `h2` linking to the article, then Joel's Prompter's Note. Joel writes the note. See "Prompter's Notes" later in this file.
- Write Markdown only. Do not write HTML versions of articles.
- `npm run build` builds the site and runs the build checks. Run it after copying an article into `content/articles/`, and report any failure.
- Commit only when Joel says to. Push only when Joel says to: pushing `main` publishes the site.

## About the site and the people

- The author is Joel, a blind guitar player. He is not a professional musician or teacher.
- The site is eyesunstrung.vip, built with Eleventy and published to GitHub Pages.
- The site's name is "eyesunstrung" and the app's is "unstrung", both one lowercase word, everywhere.
- Readers are a general audience, mostly blind or low-vision people, many with no musical background.
- Some articles are introductory material for a group of blind beginners that Joel will facilitate. He facilitates, he does not formally teach.
- Each article must stand alone. Never mention a class, a facilitator, or any specific group. An article may be recommended to a group, but it is not written for one.
- Never assume the reader can see. Never assume musical knowledge. Define a term the first time it appears.

## File and file name

- Write every article as a single complete Markdown file.
- Suggest a file name: lowercase words joined by hyphens, ending in .md, for example meet-the-acoustic-guitar.md.
- The file name becomes the address: `content/articles/meet-the-acoustic-guitar.md` is published at /articles/meet-the-acoustic-guitar/.

## Front matter

The file starts with front matter, with nothing before it, in exactly this form:

```
---
title: "The article title"
description: "One or two sentences summarizing the article, used in the article list and by search engines."
date: YYYY-MM-DD
---
```

- Title and description are always in double quotes.
- Use the date Joel gives. Otherwise use today's date.
- The build stops if `title`, `description` or `date` is missing.

## Structure

- No level 1 heading in the body. The site writes the title as the page's only `h1`.
- Sections start at level 2 (`##`) and go down one level at a time, `##` then `###` then `####`, never skipping a level.
- Do not number headings, and do not start one with "Part 1" or similar. The Page Contents panel numbers every heading itself (1, 1.1, 1.1.1), so a number in the heading would be read twice there.
- Physics, Math, and Music keeps its "Part 1:" headings, which predate that rule, by Joel's decision. It is not a model for new articles.
- Never repeat a heading's text. Two headings with the same text would need different ids.
- Keep headings free of symbols such as # or +, so their ids are predictable.
- Do not write a contents section, however long the article is. The site builds the Page Contents panel from the headings.
- Do not write a Prompter's Note in the article. Joel writes it on the `/articles/` page.
- Start with a short introduction paragraph before the first `##` heading. Say what the article covers and what it assumes.
- Sequences the reader performs, such as a touch tour, are a numbered list with one sentence per item.
- When the article introduces several terms, end it with a glossary, as described in "Glossary".

## Line and paragraph format

- One sentence per line in the Markdown file. It shows when a sentence is getting too long.
- A blank line between paragraphs. Lines with no blank line between them render as one paragraph.
- Each list item is a single sentence on a single line.

Physics, Math, and Music was written before this rule and has several sentences to a line. Meet the Acoustic Guitar follows it.

## Allowed Markdown

- Plain Markdown only: paragraphs, headings, bulleted lists with "-", numbered lists with "1.", bold, italic, links, and tables where a table is the clearest form.
- No raw HTML, no emoji shortcodes such as :smile:, no footnotes, no images.
- Never write two opening curly braces in a row, an opening curly brace followed by a percent sign, or an opening curly brace followed by a hash sign, anywhere in the file, code included. The site's template engine reads these pairs as commands and the build fails.
- Never start a paragraph line with a number followed by a full stop unless it is a numbered list.

## Accessibility

- Write for people using a screen reader. Headings are the main way to move through a page, so give each section a heading that says what it covers.
- Link text must make sense on its own. Never "click here" or "this link".
- Do not rely on visual layout, colour or position, such as "the table below" or "on the right".
- Say "later in this article" or "earlier in this article", not "below" or "above".

## Links

- Links within the site start with a slash, from the site's root. The build stops on a relative link such as `meet-the-acoustic-guitar/`, and on a link to a page or heading that does not exist.
- Link to another article as /articles/ followed by its file name without .md and a trailing slash, for example [Physics, Math, and Music](/articles/physics-math-and-music/).
- Add #heading-id to link to a section of an article, or to a heading in the same article.
- unstrung's documents are at /unstrung/docs/ followed by the document's name, for example [What Is unstrung?](/unstrung/docs/what-is-unstrung/).
- To make a link open in a new tab, end its text with "(opens in new tab)", for example [the unstrung web app (opens in new tab)](/unstrung/app/). The site adds what the browser needs, and the words warn a screen reader user. Nothing else opens a new tab.

## Heading ids

Every heading gets an id made from its text:

- Lowercase, with accents removed (è becomes e).
- Apostrophes dropped.
- "&" becomes "and".
- Every other run of spaces or punctuation becomes one hyphen.
- Example: "## Sound & waves: the basics" becomes #sound-and-waves-the-basics.
- Another: "## Holding the Guitar" becomes #holding-the-guitar.

## Glossary

- Put it at the end of the article, under a `##` heading.
- Use bulleted "Term - definition" lines, one term per line, in alphabetical order.

## Voice

- Plain, direct, and complete. Say what the thing is, then what matters about it.
- Slightly looser than a reference manual. Use contractions. A short reassuring line is fine, such as "It's simpler than it first seems."
- No clever humor, no jokes, no casual irreverence, no enthusiasm padding.
- Short declarative sentences. Occasionally a longer sentence for explanation.
- First person is allowed sparingly, for honest hedges and brief practical asides, such as "I'd get to know it early" or a note about what Joel does on his own guitar.
- Do not invent personal anecdotes. Only use first-person details Joel supplies.
- Hedge honestly when guitars or practices vary: "usually", "on most guitars", "yours may differ".
- Admit limits. If a detail is unconfirmed, leave it out or flag it to Joel, and do not assert it. For example, a claim about which way classical guitar tuning knobs turn was removed because it was never confirmed.
- The best example of the target style is Meet the Acoustic Guitar, `articlesWorkspace/meet-the-acoustic-guitar.md`.
- Two more references for the voice are the unstrung documents What Is unstrung? and the introduction, published at /unstrung/docs/what-is-unstrung/ and /unstrung/. Their source is in the unstrungApp repository, `user-docs/what-is-unstrung.md` and `user-docs/introduction.md`; with the repositories side by side, that is `../unstrungApp/user-docs/`. Read the files there. A web fetch returns only a summary of a page, not its text.

## Spelling and punctuation

- US spelling.
- Plain hyphens only. No em dashes or en dashes anywhere, including in "Term - definition" lines.
- Inches first, then metric, in the same sentence, for example "a little under two inches, or about four and a half centimeters".
- Hyphenate compound modifiers: right-handed, left-handed, steel-string, nylon-string, standard-sized.
- If an article names keyboard keys, write them as unstrung's documents do: lowercase, joined with plus, as in ctrl+o and alt+shift+a, and multi-word names in camel case, as in spaceBar and downArrow, so the synthesizer says them as words.

## Describing physical things to blind readers

- Describe by touch, shape, size, texture, and feel, not by appearance.
- Give tactile landmarks the reader can find, and say what they will feel.
- Order the description along a path the hands can follow. For a guitar, go from the body to the headstock, because that matches how a person explores an instrument in their lap.
- Define the frame of reference once, early, and then use it consistently. Words like behind, below, above, top, and bottom are ambiguous, so avoid them unless they are defined.
- For the guitar the frame is: picture the instrument hanging by its headstock from a hook, front facing you. The headstock end is the top, the far end of the body is the bottom, and up and down follow from that. This matches the usual luthier and player convention and stays true however the guitar is held.
- Use "front" for the face of the guitar that has the soundhole, noting once that it is also called the top or the soundboard. This avoids clashing with "top" meaning the headstock end.
- Use "toward the headstock" and "toward the body" for directions along the neck. Do not use "up the neck" as a direction. If the phrase comes up at all, explain that guitarists use it for moving toward higher pitch, which sounds backward next to the hanging frame.
- For the sides of the instrument, use "the thin-string side" and "the thick-string side". They work in any position.
- Describe the player's physical position in one place only, a section on holding the instrument. Do not repeat it in other sections.
- Include short safety notes where a real risk exists, for example sharp cut string ends at the headstock.
- Name things the way players do, and mention alternate names once, for example tuning machines, also called tuning keys.

## Working with Joel on a draft

- Joel edits drafts himself between turns. Always re-read the file from disk before editing it, and keep his wording.
- When he asks for corrections, fix only spelling, grammar, hyphenation, and clear mistakes. Report what changed. Give opinions separately and let him decide.
- Flag factual claims you are unsure about instead of burying them. Joel can check against a real instrument.
- After every edit, check that the file has:
  - no em dashes or en dashes;
  - none of the forbidden curly-brace pairs;
  - no repeated headings;
  - no level 1 heading in the body, and no skipped heading levels;
  - no numbered headings;
  - one sentence per line.

## Replying to Joel

Joel's global Claude Code instructions cover this, and apply in every session. In short:

- Joel is totally blind and navigates replies by heading with NVDA. Every reply, including progress messages between tool calls, has headings.
- Never use h1 or h2 in replies; the client shows Joel's prompt as an h2. Start at h3, one per progress update. Open the closing summary with h3 and use h4 for each point in it. Never skip a level.
- Keep replies flat and declarative: no filler, no enthusiasm padding, no restating the request.
- Never use screenshots, and never judge correctness from one. Judge from the Markdown, the built HTML, or the build's output.
- If something opens that needs Joel's attention and is not read aloud automatically, say so.

## Prompter's Notes

The `/articles/` page, `content/articles/index.md`, is Joel's.
It has an `h2` for each article, oldest first, linking to it, followed by Joel's Prompter's Note on that article: a short note, like an editor's note, giving context and a brief summary.
When an article is published, its section is added by hand in this form:

```
## [Article title](/articles/file-name/)

Prompter's Note: ...
```

Joel writes the note, or gives the words for it.

## Site markup, for templates and generated HTML

These apply only when changing the site's templates or HTML, not when writing an article. `docs/site-structure.md` has the details.

- The site uses semantic HTML for blind readers.
- No definition lists (`dl`). Definitions go in an unordered list: the term, a dash, then the definition.
- Lists have `list-style: none` and an explicit `role="list"`, so Safari still treats them as lists. The site adds the role itself; articles use ordinary "-" lists.
- Anything generated must be accessible to screen readers: proper headings, table header rows, labels, and alt text.
