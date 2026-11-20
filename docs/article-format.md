# Article format

How articles for eyesunstrung.vip are written, and what the build checks. Written 2026-09-26.

Articles are Markdown files in `content/articles/`. The file name becomes the address:
`content/articles/physics-math-and-music.md` is published at `/articles/physics-math-and-music/`.
Every file there is listed, oldest first by `date`, in the eyesunstrung Articles panel beside each article and
in the Articles dropdown of the Main navigation bar.

## The /articles/ page and Prompter's Notes

`content/articles/index.md` is the `/articles/` page, written by Joel. It has an `h2` for each
article, linking to it, followed by Joel's Prompter's Notes on that article. The dropdown's first
item, "All articles", links to it.

It lives in the articles folder but is not an article. Its front matter has
`eleventyExcludeFromCollections: true`, which keeps it out of the article lists, leaves off the
article date and the eyesunstrung Articles panel, and means only `title` is required. Its
`contentsPanel: true` gives it the Page Contents panel. When a new article is
added, its section here is added by hand:

```
## [Article title](/articles/file-name/)

Prompter's Notes: ...
```

Each article page also gets a contents panel: a navigation landmark titled "Page Contents",
whose first link is the article's title, followed by its `##` headings with their `###` and `####`
headings nested inside. It is built from the headings when the site is built, so articles never
contain one. An article with no `##`, `###` or `####` headings gets no contents panel.

Each heading's link in the panel starts with its section number: `##` headings are 1, 2, 3, the
`###` headings under the first are 1.1, 1.2, and so on, with a colon, "1.2: ". The headings in the
article are not numbered, and articles never number their own headings. `docs/site-structure.md`
has the details.

## Instructions for Claude

Since 2026-11-19 articles are written with Claude Code in this repository, one session per
article, and the instructions Claude follows are in `docs/article-instructions.md`. `CLAUDE.md` at
the repository root tells every session to read them first. Drafts are saved in
`articlesWorkspace/` at the repository root, which is gitignored, and copied into
`content/articles/` once Joel has finished them. The copies stay in `articlesWorkspace/` as
examples of Joel's style.

Until then they were drafted in a Claude chat project. Until 2026-11-19 this section held the
instructions pasted into that project; the version of 2026-11-14 is in this file's history. The
chat project's own copy had drifted from it: it still used "Part 1: Sound and waves" as the heading
id example and lacked the new-tab rule. `docs/article-instructions.md` combines the two, with the
chat project's voice, style and process notes.

The heading id example in the instructions was "Part 1: Sound and waves" until 2026-11-14, which
the rule against "Part 1" headings contradicts. Physics, Math, and Music was written before that
rule and keeps its "Part 1:" headings, by Joel's decision the same day: its contents panel reads
"2: Part 1: Sound and Waves", and that is accepted for this article.

Joel's changes to the first draft of these instructions, 2026-09-26: no Prompter's Note
placeholder, and no contents section even for long articles, because the article layout generates
a contents panel from the headings.

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
- **Prompter's Note.** Joel writes these on the `/articles/` page, not in the articles; see
  "The /articles/ page and Prompter's Notes".
- **Dates and order.** The articles list is sorted by `date`. Articles with the same date are
  sorted by file name, which is why `introduction.md` comes before `physics-math-and-music.md`
  when both are dated 2026-09-26.

## What the build checks

A problem stops the build (`npm start` or `npm run build`, and the GitHub workflow) with a message
naming the file and what is wrong, and pointing here.

Front matter, checked in `content/articles/articles.11tydata.js`:

- `title`, `description` and `date` are all present. Without a `date`, Eleventy falls back to the
  file's creation time, which changes when the repository is cloned, and the list order with it.

The built page, checked in `eleventy.config.js` after the build, once heading ids exist. Since
2026-11-14 the same three checks run on every page of the site, not only articles;
`docs/site-structure.md`, under Build checks, says how the unstrung documents differ:

- Exactly one `h1`.
- No skipped heading levels, for example a `####` straight after a `##`.
- Every link to `#something` on the page matches a heading id.

Not checked: the rules about wording, link text and screen reader phrasing. Those are for reading.
