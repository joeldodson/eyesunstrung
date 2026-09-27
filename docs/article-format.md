# Article format

How articles for eyesunstrung.vip are written, and what the build checks. Written 2026-09-26.

Articles are Markdown files in `content/articles/`. The file name becomes the address:
`content/articles/physics-math-and-music.md` is published at `/articles/physics-math-and-music/`.
Every file there is listed, oldest first by `date`, in the Articles panel beside each article and
in the Articles dropdown of the Main navigation bar.

## The /articles/ page and Prompter's Notes

`content/articles/index.md` is the `/articles/` page, written by Joel. It has an `h2` for each
article, linking to it, followed by Joel's Prompter's Notes on that article. The dropdown's first
item, "All articles", links to it.

It lives in the articles folder but is not an article. Its front matter has
`eleventyExcludeFromCollections: true`, which keeps it out of the article lists, gives it the plain
page layout without panels or a date, and means only `title` is required. When a new article is
added, its section here is added by hand:

```
## [Article title](/articles/file-name/)

Prompter's Notes: ...
```

Each article page also gets a contents panel: a navigation landmark named by the article's title,
listing its `##` headings with their `###` headings nested inside. It is built from the headings
when the site is built, so articles never contain one. An article with no `##` or `###` headings
gets no contents panel.

Articles are often drafted by Claude in a Claude chat project. The instructions below are what
that project is given, so that every article arrives in a form that can be saved straight into
`content/articles/` with no conversion.

## Instructions for Claude

Paste this into the Claude project's instructions.

```
Write every article as a single Markdown file for the Eyes Unstrung website, which is built with Eleventy. Give me the complete file, ready to save, and suggest a file name: lowercase words joined by hyphens, ending in .md (for example physics-math-and-music.md). The file name becomes the address: /articles/physics-math-and-music/.

Start the file with a front matter block, exactly in this form, with nothing before it:

---
title: "The article title"
description: "One or two sentences summarising the article, used in the article list and by search engines."
date: YYYY-MM-DD
---

Always put the title and description in double quotes. Use the date I give you; if I don't give one, use today's date.

Rules for the body:

- Do not write a level 1 heading. The site writes the title as the only h1. Start sections at ## and go down one level at a time (##, then ###, then ####), never skipping a level.
- Use plain Markdown only: paragraphs, headings, bulleted lists with "-", numbered lists with "1.", **bold**, *italic*, links, and tables where a table is the clearest form. No raw HTML, no emoji shortcodes such as :smile:, no footnotes, no images.
- Never use the character pairs {{ or {% or {# anywhere, including inside code. The site's template engine reads them as commands and the build fails.
- Do not start a paragraph line with a number followed by a full stop unless it is a numbered list.
- Write for someone using a screen reader. Headings are the main way to navigate, so give each section a heading that says what it covers. Link text should make sense on its own; never "click here" or "this link". Don't rely on visual layout, colour or position ("the table below", "on the right").
- Do not write a contents section, however long the article is. The site will generate one from the headings.
- Every heading gets an id made from its text: lowercased, accents removed (è becomes e), apostrophes dropped, & replaced by "and", and every other run of spaces or punctuation replaced by one hyphen. So "## Part 1: Sound and waves" can be linked as [Part 1: Sound and waves](#part-1-sound-and-waves). Keep ## headings free of symbols such as # or +, so their ids are predictable. Two headings with the same text get the same id, so don't repeat a heading.
- To link to another article on the site, use /articles/ followed by its file name without .md and a trailing slash, for example [Physics, Math, and Music](/articles/physics-math-and-music/). Add #heading-id to link to a section of it.
- If there is a glossary, make it a ## heading at the end, with a bulleted list of "Term - definition" lines, one term per line, in alphabetical order.
```

Joel's changes to the first draft of these instructions, 2026-09-26: no Prompter's Note
placeholder (he adds that section himself when he wants one), and no contents section even for
long articles, because the article layout generates a contents panel from the headings.

Drafts are saved in `articlesWorkspace/` at the repository root, which is gitignored, and copied
into `content/articles/` once they have been read.

### Why these rules

- **Quoted title and description.** A title containing a colon breaks YAML front matter unless it
  is quoted. Quoting always avoids having to think about it.
- **No `h1`.** `content/_includes/base.njk` writes the title as the page's `h1`. A second one breaks
  navigation by heading level.
- **No `{{`, `{%` or `{#`.** Markdown here is run through Nunjucks first
  (`markdownTemplateEngine: "njk"` in `eleventy.config.js`), so those pairs are template syntax.
- **Heading ids.** Made by the `headings` transform in `eleventy.config.js`, using Eleventy's
  `slugify` filter, the same one its `IdAttributePlugin` uses. A repeated heading gets `-2`,
  `-3` and so on added. Tested
  2026-09-26: "Prompter's Note" becomes `prompters-note`, "Solfège: doh, ray, me" becomes
  `solfege-doh-ray-me`, "Part 1: Sound & waves" becomes `part-1-sound-and-waves`, and "C# and Db"
  becomes `c-and-db`, because `#` is dropped. That last one is why `##` headings, which the contents
  panel links to, should avoid symbols.
- **Bullets.** The site hides list bullets and keeps list semantics with `role="list"`, so articles
  use ordinary `-` lists.
- **Prompter's Note.** Joel adds this section himself when he wants one. Written as
  `## Prompter's Note`, its id is `prompters-note`.
- **Dates and order.** The articles list is sorted by `date`. Articles with the same date are
  sorted by file name, which is why `introduction.md` comes before `physics-math-and-music.md`
  when both are dated 2026-09-26.

## What the build checks

A problem stops the build (`npm start` or `npm run build`, and the GitHub workflow) with a message
naming the file and what is wrong, and pointing here.

Front matter, checked in `content/articles/articles.11tydata.js`:

- `title`, `description` and `date` are all present. Without a `date`, Eleventy falls back to the
  file's creation time, which changes when the repository is cloned, and the list order with it.

The built page, checked in `eleventy.config.js` after the build, once heading ids exist:

- Exactly one `h1`.
- No skipped heading levels, for example a `####` straight after a `##`.
- Every link to `#something` on the page matches a heading id.

Not checked: the rules about wording, link text and screen reader phrasing. Those are for reading.
