# Site review, November 2026

A review of eyesunstrung.vip at commit 6f8eea3, done 2026-11-14. Nothing was changed: no source
edited, nothing committed, and the repository's `_site` folder was not touched. This file is the
only addition.

## How it was done

- Read every tracked file except the body of `scripts/build-banner.mjs`, of which only the header
  was read, and the text of the Physics, Math, and Music article, of which the front matter and
  headings were read.
- Built the site with Eleventy into a scratch folder outside the repository. The build passed its
  own checks.
- Served that build locally and drove it in Edge with the playwright-core already installed here.
  A script read the DOM, computed styles, element boxes and focus on all 15 pages, at 1280 by 800,
  1920 by 1080 and 320 by 640, in the light and dark schemes. No screenshots.
- One check, whether the videos page contacts YouTube before a video is opened, was also run in
  Playwright's WebKit, from unstrungApp's copy.
- Fetched four addresses from the live site to compare with the local build.

Each finding says how it was established: **measured** (the script showed it in the built pages),
**read** (seen in the source), or **judged** (an opinion from the CSS and the measurements).

Limits:

- The local `unstrung-release/` folder holds unstrung 0.7.0, so the documentation pages audited
  here are older than the live ones, which show 0.10.3. The layout findings do not depend on it.
  Where the live site differs, the finding says so.
- Nothing was read with NVDA, JAWS or VoiceOver. Nothing was tried on a phone or in real Safari.
- The section on look and feel is speculation from measurements. Nobody looked at a page.

## Summary

- Eleventy is used consistently. Every page of the site goes through the one layout. The app's
  page is the one deliberate exception, and it is handled cleanly.
- The HTML, CSS and JavaScript added around the Markdown are small and readable: 240 lines of
  configuration, 409 and 154 lines of CSS, 53 and 79 lines of JavaScript. There are a few stale
  comments and some duplication, none of it serious.
- The generated HTML is in good shape for WCAG 2.2 AA. The automatic checks found no failures in
  language, titles, headings, landmarks, alternative text, contrast of text, focus indicators,
  target size or tab order. The findings are in how the layout behaves when narrow, zoomed or in
  dark mode.
- The two-column pages are a conventional documentation layout and probably look tidy. The weak
  points are long lines of text, contents entries cut off with an ellipsis, and a documentation
  list that hides its last entries.

## Findings, most serious first

There is nothing I would call high. The site works, and no finding blocks a reader.

### Medium

#### 1. An open dropdown is wider than a 320 px window

Area: accessibility, WCAG 1.4.10 Reflow. Established: measured.

- `content/assets/css/header.css:113-125`. The dropdown list is positioned from the left edge of
  its own button, with `max-width: min(24rem, 90vw)`.
- At 320 px wide the Articles button starts at 89 px. Its open list ends at 339 px, and at 355 px
  on the Introduction article, where the current page's title is bold. The unstrung list starts at
  189 px and ends at 337 px, or 344 px on the documentation page.
- The page then scrolls sideways by 17 to 35 px while a dropdown is open. With the dropdowns closed
  no page scrolls sideways.
- 320 px is also what a 1280 px window gives at 400 percent zoom, which is the case WCAG has in
  mind.
- A longer article title makes it worse: the limit allows the list to reach 377 px.
- Smallest fix: in a narrow window, position the list from the menu bar and not from its button,
  with a left and right inset. Then it cannot pass the window's edge whatever the titles are.

#### 2. Contents entries are cut off, and only a mouse can show the rest

Area: accessibility, WCAG 1.4.10 Reflow and 1.4.4 Resize Text; also appearance. Established:
measured.

- `content/assets/css/style.css:252-259` and `:229-235`. Panel links and titles are one line each,
  cut off with an ellipsis. `docs/site-structure.md` records this as a decision, with the `title`
  attribute showing the whole text on hover.
- A screen reader gets the whole text. A sighted reader using a keyboard or a touchscreen does
  not: a `title` tooltip appears only under a mouse pointer.
- Counts of entries cut off:
  - Physics, Math, and Music: 31 of 65 at 1280 px wide, 27 of 65 at 320 px.
  - unstrung Videos: 3 of 4 at 1280 px. All start "unstrung App - ", so the part that tells them
    apart is the part that is lost.
  - unstrung Features: 4 of 34.
- With the text spacing WCAG 1.4.12 asks a page to survive, the Physics count rises to 48 of 65.
- Whether an ellipsis is a failure of these criteria is argued both ways. The readers it affects
  are low vision readers who zoom, who are part of the site's audience.
- Recommendation: let entries wrap in the narrow, stacked layout at least, where the panel has the
  window's full width and height costs nothing. Consider wrapping in the side column too, with a
  hanging indent so the section number stays clear. The `title` attributes could then go.

#### 3. On a narrow screen the whole contents list comes before the page

Area: usability on phones. Established: measured.

- `content/assets/css/style.css:201-223`. Under 50rem the panels stack above the page at full
  height.
- At 320 px wide, the panels on the Physics article are 2336 px tall before the `h1`. On a
  touchscreen each entry is 44 px tall, not 34, so it is nearer 3000 px: four or five screens of
  links before the article starts. unstrung Features is 1296 px at the mouse size.
- A keyboard user has the skip link. A sighted touch user has nothing but scrolling.
- Options, any of which keeps the reading order:
  - limit the stacked panels to a part of the window's height and let them scroll inside, as the
    side column already does;
  - put the contents in a `<details>` element, closed in the narrow layout, which fits the site's
    use of `<details>` elsewhere but needs a few lines of script to open it in the wide layout;
  - leave it, on the ground that the phone audience is mostly screen reader users, who move by
    heading.

#### 4. The documentation list hides its last entries

Area: appearance, usability. Established: measured.

- `content/assets/css/style.css:193-199`. A second panel is limited to 14rem and scrolls beyond
  that. The comment above says this is about eight entries.
- It is about five. An entry is 34 px tall and the title 35 px, with 16 px of padding, so 14rem
  (224 px) holds the title and five entries.
- The local build's list has six entries. The last, Resources, starts at 605 px and the panel ends
  at 608 px: it is hidden, at every window height, until the panel is scrolled.
- The live site's list has seven entries, so two are hidden there.
- The test browser reported no width for the panel's scrollbar. I cannot say whether a sighted
  reader gets any sign that the list continues.
- The same panel on article pages holds three entries today and will reach the limit at six.
- Smallest fix: raise the limit, to 20rem or so, or drop it for the list panel and let the
  contents panel alone give way.

#### 5. Dark mode is declared in colours only

Area: appearance in dark mode; contrast of the dividers. Established: measured.

- `content/assets/css/style.css:45-56` sets dark colours, but nothing sets `color-scheme`. The
  computed value on every page is `normal`.
- So the browser draws its own parts light. On the videos page in dark mode the Playback speed
  select is black on white, on a page whose background is `#121518`. The scrollbars inside the
  panels are likely light too.
- One line, `color-scheme: light dark` on `:root`, fixes both.
- Separately, the slate dividers (`#475569`) are 2.4 to 1 against the dark page.
  `header.css` already notes this figure for the menu bar. The lines were asked for so that low
  vision readers can tell the regions apart, and in dark mode they are faint. This is not a WCAG
  failure, since the lines are not controls. A lighter line in dark mode, such as `--border` at
  6.0 to 1, would do what the lines are for.

#### 6. Lines of text are 90 to 110 characters long

Area: readability. Established: measured.

- `content/assets/css/style.css:42`, `--measure: 68ch`. A `ch` is the width of the digit 0, which
  in Atkinson Hyperlegible Next is wider than the average letter. The column comes to 717 px on
  single-column pages and 749 px beside panels.
- Measured from paragraphs on About and unstrung Features: about 90 to 110 characters to a full
  line.
- The usual advice is 45 to 75. WCAG's own figure, 80, is in 1.4.8, which is level AAA, so this is
  not an AA failure.
- It matters most for low vision readers using magnification, who lose the start of the next line
  on the way back.
- Recommendation: set the measure in `rem`, about 36rem, which gives roughly 70 to 75 characters.

#### 7. The app's page has no skip link

Area: accessibility, consistency. Established: measured locally, confirmed on the live site.

- `content/unstrung/app/index.njk` puts the banner and the Main navigation bar on the app's page.
  Every other page starts with "Skip to main content". This one does not.
- A keyboard user tabs through the banner, Home, Articles, unstrung and About before reaching the
  app, on the page where the keyboard matters most.
- WCAG 2.4.1 is still met, by the landmarks. This is about consistency and effort.
- The app's `main` already has `id="content"` and `tabindex="-1"`, so a link to `#content` would
  work. The skip link's style is in `style.css`, which the app's page does not load; it would have
  to move to `header.css`.

### Low

#### 8. At the top of a long page, the list panel is below the window

Area: appearance. Established: measured.

- `content/assets/css/style.css:177-185`. The side column is at most the window's height, but at
  the top of the page it starts under the banner and menu bar, 208 px down in a 1280 by 800
  window.
- On unstrung Features in that window, the unstrung Documentation panel sits from 760 to 984 px.
  The window ends at 800 px. After scrolling 208 px it is in view, from 552 to 776 px.
- So a sighted reader arriving on a long document sees the contents and no list of the other
  documents.
- CSS cannot shorten the column by the height of what is above it. The plain fix is to put the
  short list panel first and the contents second. That changes the order a screen reader meets
  them in, so it is a question below.

#### 9. Heading checks cover articles only

Area: build checks. Established: read.

- `eleventy.config.js:181-190` checks for one `h1`, no skipped heading levels and no dead `#`
  links, on pages from `content/articles/` only.
- The unstrung documents are written in another repository and built into pages here. A skipped
  level in one of them would be published with no warning. So would one in `index.md` or
  `about.md`.
- The check is already written. Running it on every site page costs one changed filter.

#### 10. The link check misses relative links

Area: build checks. Established: read.

- `eleventy.config.js:202` matches only `href` values that start with `/`. A relative link such as
  `introduction/` is not checked, and neither is any `src`.
- No page has a relative link today. Either check them or stop the build on one.

#### 11. Markdown is run through Nunjucks, and nothing uses it

Area: Eleventy configuration. Established: read.

- `eleventy.config.js:246`, `markdownTemplateEngine: "njk"`. No Markdown file in `content/`
  contains `{{`, `{%` or `{#`.
- Its only effect is the rule in `docs/article-format.md` that an article must never contain those
  character pairs, or the build fails.
- Setting it to `false` removes the hazard and one rule from the instructions given to Claude.

#### 12. The unstrung section's links are written twice, with different words

Area: templates. Established: read.

- `content/_includes/main-menu.njk:30-35` lists Overview, The app, Documentation, Videos.
  `content/_includes/base.njk:63-67` lists The unstrung app, Documentation, Videos.
- One list in `content/_data/` would serve both. The differing labels may be intended; if so the
  data can carry both.
- The three list panels in `base.njk:47-84` repeat the same markup. A Nunjucks macro taking a
  title and a list of links would hold it once.

#### 13. How a page gets its panels takes three settings

Area: templates. Established: read.

- `base.njk:19-20` works out `isArticle` from the `articles` tag and
  `eleventyExcludeFromCollections`, beside `contentsPanel` and `sidePanel`.
- `content/articles/index.md` needs two flags to say "not an article, but with contents".
- Simpler: `articles.11tydata.js` sets `sidePanel: articles`, and the index page overrides it. The
  layout then reads one setting for the list and one for the contents.

#### 14. The introduction is published at two addresses

Area: structure. Established: read and measured.

- `/unstrung/` and `/unstrung/docs/introduction/` have the same text, the same `h1` and the same
  page title, "Welcome to unstrung | eyesunstrung". Only the list panel differs.
- Two browser tabs or history entries cannot be told apart. A search engine sees duplicate pages.
- Options: a canonical link on one of them; a different title for `/unstrung/`; or leave the
  introduction out of the documentation list and link to `/unstrung/` there.

#### 15. Comments and notes that no longer match

Area: documentation. Established: read.

- `docs/article-format.md:16-18` and `content/articles/articles.11tydata.js:5-6` say the
  `/articles/` page gets the plain layout without panels. It has `contentsPanel: true`, and
  `docs/site-structure.md` has it right.
- `content/assets/js/videos.js:6` says reopening a disclosure resumes the video. The code only
  pauses, and `docs/site-structure.md` says it stays paused.
- `docs/site-structure.md:150` says copying the banner into unstrungApp is still to do. The same
  file says the desktop app already shows it.
- `README.md:7` says pages are Markdown files. Five of the sources are Nunjucks.
- `docs/site-structure.md:238-239` says the video fetch script needs to keep older entries once
  the channel passes 15 videos. It does not yet. There are three videos, so there is time.

#### 16. The Physics article breaks the site's own heading rule

Area: content. Established: read.

- `docs/article-format.md` tells Claude not to start a heading with "Part 1", because the contents
  panel numbers every entry.
- The article has "Part 1: Sound and Waves" and so on. Its contents panel reads "2: Part 1: Sound
  and Waves", since an earlier section takes number 1.
- The article predates the rule. The rule's own examples also still use "Part 1: Sound and waves".

#### 17. The workflow asks for more than it needs on pull requests

Area: deployment. Established: read.

- `.github/workflows/site.yml:7-13`. `contents: write` applies to every run, including pull
  requests, which only build.
- `push` and `pull_request` both fire for a branch with a pull request open, so it builds twice.
- Neither matters while Joel is the only contributor. Splitting build and deploy into two jobs,
  with write permission on the second only, is the tidy form.

#### 18. Nothing for search engines or link previews

Area: discoverability. Established: measured on the live site.

- No `sitemap.xml`, no `robots.txt` (both return 404), no canonical links, no Open Graph tags, no
  feed for the articles.
- A link to the site pasted into a message or a social post shows no title card.
- Whether any of it is wanted is a question below.

## Eleventy: is it used consistently?

Yes. Established by reading the sources and the build log.

- One layout, `base.njk`, set for every page by `addGlobalData`. All 14 site pages come through
  it: three Markdown pages, three files in `content/articles/`, and the Nunjucks templates under
  `content/unstrung/`.
- The app's page sets `layout: false` and is assembled from the release's own HTML. That is the
  only page outside the layout, and `docs/site-structure.md` explains why.
- Data comes from `content/_data/` in the ordinary way. Pagination makes the document pages.
  Directory data tags the articles and checks their front matter. These are all standard Eleventy.
- Three things are done by hand that Eleventy or markdown-it could do:
  - Heading ids are added by a transform using regular expressions. Eleventy 3 has
    `IdAttributePlugin` for this. The hand-written one also collects the headings for the contents
    panel in the same pass, which is a fair reason to keep it.
  - `role="list"` and the new-tab attributes are added by string replacement over the finished
    HTML. A markdown-it rule could do it at the source, but the unstrung documents go through a
    second markdown-it instance, and a transform covers both. Also a fair reason.
  - The unstrung documents are rendered by their own markdown-it in `unstrungDocs.js`, not by
    Eleventy's. Both use the same options today. If Eleventy's is ever customised, the documents
    will not follow unless the same change is made there.
- The transforms match exact strings: `<h2>` with no attributes, `<ul>` with no attributes. That
  is deliberate and documented. It is sound for Markdown output and would miss hand-written HTML
  with attributes.
- `unstrungDocs.js:36-39` renders the introduction a second time. It could take it from the
  `documents` list it has just built.
- Front matter style varies: titles and descriptions are quoted in the articles and Nunjucks pages
  and bare in `index.md`, `about.md` and `404.md`; the date is quoted in one article and bare in
  the other. All of it works.
- All six development dependencies are used. The two font packages look like a duplicate and are
  not: the variable one is the site's font, the fixed one gives the banner script weight 800.

## Where Markdown was supplemented

### HTML in Markdown

- One place in the whole of `content/`: the quotation on the home page, `content/index.md:6-11`,
  a `figure` with a `blockquote` and a `figcaption`. It is correct, minimal HTML and there is no
  Markdown for it.
- The documents from unstrungApp contain no raw HTML.

### Templates

- `content/unstrung/videos/index.njk` is the only page whose body is built from HTML. It is 33
  lines and clean: an `h2`, the description, and a `<details>` holding a labelled select and the
  frame. Each frame has a `title`.
- Measured in Edge and WebKit: the page makes no request to YouTube until a disclosure is opened,
  as the notes say. Once one is opened, the player loads from youtube-nocookie.com and from
  Google's own hosts for fonts and images.
- `base.njk`, `banner.njk` and `main-menu.njk` are clear and heavily commented. Findings 12 and 13
  are the only untidiness.

### CSS

- `style.css` and `header.css` are well organised and state their own accessibility rules at the
  top. No unused rules were found.
- Small points:
  - `style.css` has two `:root` blocks of variables, at lines 33 and 109. One would do.
  - Logical properties (`margin-inline`, `padding-block`) are mixed with physical ones
    (`padding-left` at 244 and 292, `border-left` at 347). It only matters for a right-to-left
    language.
  - There are no styles for tables, code, `pre`, images or `hr` in the page. The article
    instructions allow tables. No page has one yet; a wide table would run past a narrow window.
    Worth a rule before the first one arrives.
  - The rule for the current page's link is in both files, `style.css:129` and `header.css:139`.
    The second is needed for the app's page; the first could be narrowed to the panels.

### JavaScript

- `menu.js`, 53 lines. Driven in Edge: Enter and spaceBar open a dropdown, downArrow and upArrow
  move through it and wrap, escape closes it and returns focus to its button, and tabbing past the
  last link closes it. No finding.
- `videos.js`, 79 lines. The speed select appeared on all three videos. Clean apart from the stale
  comment in finding 15.
- `eleventy.config.js` builds the contents panel's HTML from strings. It is the densest code in
  the repository and is commented line by line.
- `unstrungApp.js` cuts the app's page with a regular expression and stops the build if the page
  does not have exactly one `<header>` and one `</head>`. A sound guard.

## Accessibility of the generated HTML, against WCAG 2.2 AA

### What passed, on every site page

All measured in the built pages.

- `lang="en"`, and a title on every page. Titles are unique apart from finding 14.
- Exactly one `h1`, no skipped heading level, no repeated id.
- Landmarks: banner, navigation named Main, the panel navigations, main, footer.
- Every image has alternative text, every frame a title, no link is empty, every `ul` has
  `role="list"`.
- Text contrast: the lowest ratio on any page, in either scheme, is 6.28 to 1, the cream text on
  the menu bar. AA asks for 4.5.
- Focus: every tab stop on every page showed a solid 3 px outline. None was covered by another
  element, including inside the scrolling panels (2.4.7, 2.4.11).
- Target size: no link, button or select outside a sentence is under 24 px in either direction
  (2.5.8).
- Reflow: at 320 px no page scrolls sideways while the dropdowns are closed (1.4.10). Finding 1 is
  the open case.
- Text spacing: with WCAG's spacing applied, nothing overflows the window (1.4.12). Finding 2 is
  the cut-off entries.
- Tab order starts skip link, banner, Home, Articles, unstrung, About on every site page.
- No positive `tabindex`, no autofocus, no movement, no time limits.
- Links that open a new tab say so in their text. All five on the introduction do.
- The footer's feedback address is in the same place on every page (3.2.6).

### What the automatic checks cannot settle

- The navigation panels have no accessible name, by the decision of 2026-10-29. NVDA reads the
  visible title after "navigation landmark". A list of landmarks in JAWS or VoiceOver will show two
  or three entries all called "navigation". WCAG does not require the names. It is worth one
  listen in another screen reader if one is ever to hand.
- How `<details>` dropdowns are announced in VoiceOver on iOS, where Joel tests on his phone.
- Whether the order of panels, contents then list, is the one a reader wants. See question 4.

### Where it falls short

Findings 1 and 2 are the two with a WCAG criterion behind them. Findings 3 to 7 are about the same
readers but are not failures of AA.

## Look and feel

This section is speculation. It comes from the stylesheets and from measured positions of the
page's parts. A sighted person should check it.

### All pages

- Top of every page: the banner across the full window, 160 px tall in a 1280 by 800 window and
  216 px at 1920 by 1080, then a 46 px slate bar with cream text. Together they take about a
  quarter of the first screen, which is ordinary for a site with a picture banner.
- One typeface, three heading sizes, underlined blue links, slate lines between regions. The
  palette is small: the banner's browns and amber, slate, cream, blue. It should read as plain,
  calm and deliberate, closer to a well-kept documentation site than a designed one.
- Both colour schemes are covered. Finding 5 is the gap.

### Single-column pages: home, About, the 404 page

- The text column is 717 px wide and centred. In a 1280 px window it runs from 281 to 998 px.
- The menu bar's first item and the footer's text both start at 16 px, the edge of the 80rem page
  width. In a 1920 px window they start at 336 px and the text at 601 px.
- So the page has two left edges: one for the menu and footer, one 265 px further in for the text.
  Centred text under a left-aligned bar is common and not wrong, but the footer floating out to
  the left of the text it follows probably looks unanchored. Holding the footer to the text
  column's width on these pages would fix it.
- The home page opens with the quotation in a tinted box, centred, 387 px wide. A good opening.
- The lines are long (finding 6), which makes the column look dense.

### Two-column pages: articles, the unstrung pages, the videos page

- In a 1280 px window: panels from 16 to 304 px, the slate line at 304 px, text from 346 to
  1095 px. The panel column's left edge matches the menu bar's first item, so these pages have
  one left edge, which the single-column pages lack.
- To the right of the text there is 169 px of empty column inside the page width, in both window
  sizes measured. At 1920 px there are also 320 px margins each side. The block is centred as a
  whole, but the text sits left of the window's centre. It is the normal look of a documentation
  site and unlikely to bother anyone.
- The footer's line spans the whole page column, 918 px, which is wider than the 749 px of text
  above it. A small mismatch.
- Likely to be appealing: yes, in the way of a documentation site. A fixed list on the left that
  stays in view, a line, and a text column is a pattern readers know and trust.
- What probably lets it down:
  - Cut-off entries. On the Physics article about half the contents entries end in an ellipsis,
    and on the videos page three of four do. A column of half-finished lines looks unfinished.
  - Every entry is underlined. Sixty-five underlined lines in a narrow column is heavy. The
    underline is there so links are not marked by colour alone; inside a navigation list, where
    everything is a link, it is not needed for that.
  - The levels of the contents differ only by 1rem of indent. Bolder top-level entries or lighter
    sub-entries would let the eye find sections.
  - On pages with a short contents list, such as `/articles/` with three entries and the videos
    page with four, the panel is a small block beside a tall line. The two-column layout does
    little there, and a single column would look as good.
  - The hidden documentation entries (finding 4) and the list panel below the window (finding 8).
- On a phone the columns stack, and finding 3 applies.

## The five to fix first

1. The dropdowns at 320 px (finding 1). Small, and the one clear reflow failure.
2. `color-scheme` (finding 5). One line.
3. The documentation list's height (finding 4). One value, and the live site is hiding two
   documents from sighted readers now.
4. Line length (finding 6). One value.
5. The contents panel on narrow screens (findings 2 and 3 together), once the questions below are
   answered.

## Questions for Joel

1. Contents entries are one line each and cut off with an ellipsis, which you decided on
   2026-09-30. A sighted keyboard or touch user cannot read the rest. May entries wrap in the
   narrow, stacked layout? In the side column too?
   **Answered 2026-11-14: no.** Joel wants no line wrapping. The cut-off text is read in full by
   his screen reader. The recommendation in finding 2 is not to be built.
2. On a phone, the Physics article's contents run four or five screens before the article. Should
   the stacked contents be limited in height, collapsed in a `<details>`, or left?
3. Should the web app's page get the skip link that every other page has? If so, should it come
   from this site's template, or from unstrungApp so the desktop app has it too?
4. Should the list panel (articles, documentation) come before Page Contents? It would keep the
   list in view at the top of a long page. It would also change which navigation landmark a screen
   reader reaches first.
5. Should `/articles/` and the videos page keep a contents panel? Each has three or four entries,
   and sighted readers get a second column for little. Screen reader users get a landmark listing
   the headings they can already move through.
6. Is the introduction meant to live at both `/unstrung/` and `/unstrung/docs/introduction/`?
   If so, should one be marked as the main address?
7. Do you want the site found by search engines and shown well when a link is shared? That decides
   whether a sitemap, canonical links and Open Graph tags are worth adding. A feed for the
   articles is a separate question.
8. The Physics article's headings start "Part 1:", against the rule written after it. Rename the
   headings, which changes their ids and any links to them, or leave this article as it is?
9. In the unstrung dropdown the app is "The app" and in the side panel "The unstrung app". Is the
   difference intended?
10. May the heading checks run on every page, the unstrung documents included? A skipped level in
    a document would then stop the site build until it is fixed in unstrungApp and released.
11. Should a sighted person look over the two-column pages before any of the appearance points are
    acted on? The look and feel section is built from numbers.
