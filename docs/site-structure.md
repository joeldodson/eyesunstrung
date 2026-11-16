# Site structure

The sections of eyesunstrung.vip, how each page is laid out, and what is planned. Written
2026-09-29. `article-format.md` covers how articles are written.

## Layout

Every page has, in order: a skip link, the banner, the Main
navigation bar, the page, and the footer. All of it comes from `content/_includes/base.njk`.

The Main navigation bar holds Home, an Articles dropdown, an unstrung dropdown (Overview, The app,
Documentation) and About. About has `aria-label="About eyesunstrung"`, chosen 2026-10-08:
in browse mode, arrowing past the end of the unstrung dropdown reaches it, and "About" alone
sounded like About unstrung. The visible text stays "About", which is clear on screen and short.
Arrows are not kept inside a dropdown: that would need ARIA menus, which the W3C advises against
for site navigation. The dropdowns are `<details>` elements;
`content/assets/js/menu.js` adds closing on Escape and when focus or a click moves away, and, while a dropdown is open, Down and Up arrow moving through its links, wrapping at either end (2026-10-11). It keeps the arrows it uses from reaching the unstrung app, which listens for them on its page for playback. A screen reader in browse mode keeps the arrows for itself, so this is for keyboard users without one. The
bar is `content/_includes/main-menu.njk` and the banner `content/_includes/banner.njk`, both
styled by `content/assets/css/header.css` alone (called `menu.css` until 2026-10-11), so the web
app's page can carry them without the rest of the site's styles (see "unstrung, from its
releases").

Every link in the bar, and the skip link and the banner, has `tabindex="0"` (2026-10-11). Safari
on a Mac leaves links out of the tab order unless its "Press Tab to highlight each item on a
webpage" setting is on, so Tab reached only the Articles and unstrung buttons: not Home, About, any
dropdown item, or the skip link. An explicit tabindex puts a link in the order whatever that setting
says. Other browsers already stopped on them. Links in the page and the footer keep Safari's usual
behaviour. Checked with Playwright's WebKit, which skips links the way Safari does.

`menu.js` closes a dropdown when focus moves to something outside it, and not when focus moves to
nothing (2026-10-10). In WebKit, clicking a dropdown button focuses it, but pressing on a link
does not focus the link: focus goes to nothing, and closing the dropdown then left the click with no
link to land on. Reproduced in Playwright's WebKit with the old script, and fixed there.

The skip link, "Skip to main content", is first on every page, and since 2026-11-14 that includes
the web app's page. Joel's rule, the same day: on the site's own pages it goes to the page's `h1`;
on `/unstrung/app/` it goes to the app's Menu button, the first thing after the site's menu bar.

- On the site's pages the link is to `#page-title`, the `h1`, which is the first thing in `main`
  and comes after any side panels. It went to `main` itself before, which read the same but was
  not the heading. The `h1` has `tabindex="-1"`: it adds no tab stop, and lets the link put focus
  on the heading. Without it, WebKit scrolled to the target but left focus where it was, so the
  next Tab started again from the top of the page. That was true of the old target too.
- On the app's page the link is written by `content/unstrung/app/index.njk`, to
  `#app-menu-button`. `content/_data/unstrungApp.js` stops the build if the app's page has no
  element with that id. The desktop app has no skip link; it has no site menu to skip.
- The link's style moved from `style.css` to `header.css`, which the app's page loads.
- Checked 2026-11-14 in Edge and Playwright's WebKit on eleven pages: the link is the first tab
  stop, shows on screen with its outline when focused, and Enter puts focus on the `h1`, or on the
  Menu button on the app's page. In Edge the next Tab goes to the first link in `main`, never to a
  side panel. The `h1` shows the focus outline after the skip link and not after a mouse click.
  The eleven tab stops on About are the same as before.

Dropdown items are one line each, like the side panels' entries (2026-11-14, at Joel's request): a
title too long for the list is cut off with an ellipsis. This is CSS only (`white-space: nowrap`,
`overflow: hidden`, `text-overflow: ellipsis`), with no ARIA. The link's text in the page is still
the whole title, so a screen reader reads all of it, and each link has a `title` attribute with the
same text for hover. Checked in Edge with a 76-character title: the item stays one line, the page's
text and the accessibility tree both hold the whole title. Joel wants no wrapping in the dropdowns
or the panels.

In windows up to 40rem wide, an open dropdown is placed from the menu bar, 1rem from its left edge
and at most 1rem short of its right, not from its own button (2026-11-14). Placed from its button,
a list ran 17 to 35 px past a 320 px window and the page scrolled sideways, against WCAG 1.4.10.
The list opens under the whole bar, which is two rows of items at 320 px, so it can sit a row below
its button. Measured at 320, 390 and 639 px on a site page and the app's page: no list passes the
window's edge. Tapping and clicking items still follows them, in Edge and Playwright's WebKit.

The bar is slate (`#475569`) with cream text and a cream line along its top, the same in light and
dark mode, so it stands apart from the page in both. Each dropdown button has a chevron drawn with
CSS borders, with no text for a screen reader to read. On touchscreens (`pointer: coarse`), menu,
panel and footer links are at least 44 px tall; with a mouse they keep the 24 px WCAG AA minimum.

A page's text is 36rem wide (`--measure` in `style.css`), 576 px at the usual font size, on
single-column pages and beside the panels alike: about 70 to 80 characters to a line. Until
2026-11-14 it was 68ch, which came to 717 and 749 px and 90 to 110 characters, since a `ch` is the
width of the digit 0 and wider than the average letter.

`style.css` sets `color-scheme: light dark` (2026-11-14), so in dark mode the browser draws its own
parts dark: form controls, and the panels' scrollbars. Before, the Playback speed select on the
videos page, since removed, was black on white on the dark page.

Four changes to appearance were made on 2026-11-14 from the site review, by measurement alone;
Joel chose not to wait for a sighted person to look first. All are in `style.css`.

- **Lines in dark mode:** the lines beside the page column, between panels and above the footer
  take `--line`. On the light page that is the menu bar's slate, 7.6 to 1. On the dark page it is
  `--border`, 6.0 to 1, because slate there is 2.4 to 1 and the lines exist so low vision readers
  can tell the regions apart. The menu bar itself is slate in both schemes.
- **Panel links are not underlined.** In a list where every line is a link, in the link colour,
  under a title, the underline is not what marks them as links, and a long contents list of them
  was heavy. The underline returns under the pointer, and the current page keeps it, thick, with
  its bold. Links in the page's text and the footer are underlined as before. The focus outline is
  unchanged.
- **Contents levels:** the top-level entries of Page Contents, the page title and the `h2`
  sections, are weight 600; entries nested under them are 400. A current page in a list panel is
  700. The heavier entries are slightly wider, so one more entry on unstrung Features is cut off,
  5 of 34.
- **Footer on single-column pages:** the footer is as wide as `main`, so its text starts and ends
  where the page's text does, 352 to 928 px in a 1280 px window. It spanned the page width before,
  which put it 265 px to the left of the text. Its line is the footer's box, 16 px wider than the
  text each side, as `main`'s box is. Beside side panels the footer still fills the page column.

`docs/site-review-2026-11.md` is a review of the whole site, with findings and open questions.

The site has no PNG icons, by Joel's choice (2026-09-30): the SVG favicon covers current browsers,
and iOS falls back to a page screenshot for a home-screen icon. The one PNG published is the
picture for link previews, which no page displays; see "Search engines and shared links".

Some pages have a left column of navigation landmarks beside the page:

- **Page Contents:** its first link is the page's `h1`, unnumbered, followed by the `##` headings with their `###` and `####`
  headings nested inside, each with its section number. Built at build time from the headings.
  Left out when the page has no `##`, `###` or `####`.
- **eyesunstrung Articles:** an "All Articles" link to `/articles/`, then the list of articles, current one
  marked `aria-current="page"`. Article pages only.
- **unstrung Pages:** The app and Documentation. The `/unstrung/` page only, set by
  `sidePanel: unstrung` in its front matter. The links and their names come from
  `content/_data/unstrungPages.json`, which the unstrung dropdown also reads, so a page has one
  name in both places; the panel leaves out the page it is on. Until 2026-11-14 the two lists
  were written separately, and the panel said "The unstrung app" where the dropdown said "The
  app". Joel chose "The app" for both.
- **unstrung Documentation:** About unstrung and each unstrung document, by its Help menu name,
  current one marked. The `/unstrung/docs/` pages, set by `sidePanel: docs`.

Articles get the contents and the eyesunstrung Articles panel. A page with `sidePanel` gets the contents and
the panel named. Any other page gets the contents panel alone by setting `contentsPanel: true` in
its front matter. Pages without any of these are a single column.

Every panel has a visible title, given above, and no `aria-label`. Decided with Joel on
2026-10-29, as on training.glidance.io: NVDA announces an unnamed navigation landmark as
"navigation landmark" followed by its first line, which is the title, so the title is heard once,
even when moving by landmark. With a label as well, the same words were heard twice. The contents
panel first had an `aria-label` and no visible title, and NVDA read the label and then the first
link; Joel preferred the list panels' sound, and a visible title helps sighted readers too. Its
title was "Current Page Contents" at first, which read as if the contents were the current page,
so it became "Page Contents".

This is the standard layout for any page that pairs content with navigation panels. All of it is
in `base.njk` and `style.css`; a new section only needs its own list panel.

- **Dividers:** a 2 px slate line, the menu bar's colour, runs down the left edge of the page
  column (main and the footer) from the menu bar to the bottom of the page, and the same line
  separates one panel from the next. The footer sits in that column, under main, so its own line
  spans only the column. There are no boxes around the
  panels. On narrow screens the panels stack above the page with the line under them.
- **Scrolling:** on wide screens the side column is sticky: it stays in view while the page scrolls,
  is at most the window's height, and scrolls inside itself if needed. It has its own grid column,
  so it never covers the page or a focused element in it. On narrow screens it scrolls with the
  page, since a fixed panel there would cover the article.
- **Stacked contents:** on narrow screens the Page Contents panel takes at most two fifths of the
  window's height, and never less than 12rem, and scrolls inside itself beyond that. Decided with
  Joel on 2026-11-14, from the site review: stacked at full height, the Physics article's panels
  put four or five phone screens of links before the article. It is CSS only, on the
  `contents-panel` class that `contentsNav` gives the panel; the links and their order are the
  same, so nothing changes for a screen reader. A `<details>` closed on narrow screens was the
  other option, and was not chosen: a screen reader user would have had to open it. Measured on a
  390 by 844 touchscreen: the article's `h1` starts at 746 px, where the panels alone were about
  3000 px tall before. A link far down the list, given focus, is scrolled into view inside the
  panel with its outline showing. The list panel is not limited.
- **Space:** the list panel shows in full up to 21rem, its title and eight entries, and scrolls
  beyond that. It was 14rem until 2026-11-14, which held only five entries: with six documents,
  the last, Resources, was out of view until the panel was scrolled. Measured 2026-11-14: eight entries
  show with no scrolling, and a ninth makes the panel scroll. The contents panel gets the rest, so it shows every heading when the window allows.
  Joel is fine with a long contents list scrolling; nothing more is done to avoid it.
- **One line per entry:** panel links do not wrap. A long title or heading is cut off at the
  panel's edge with an ellipsis. The link text is still the whole heading, so a screen reader reads
  all of it, and a `title` attribute with the same text shows it on hover; Chrome adds no extra
  description when the title matches the link text, and Joel confirmed on 2026-09-30 that NVDA
  reads a truncated entry once, in full. Focus outlines on panel links are drawn just
  inside the link so the scrolling panel does not clip them.
  Measured 2026-09-30: an article with 12 contents entries shows them all in a 700 px window.
  Physics, Math, and Music has 42 entries, 15 of them truncated on a wide screen, needing 1445 px,
  so its contents panel scrolls in ordinary windows.

### Numbers in the contents panel

Decided with Joel on 2026-10-29. Each heading's link in the Page Contents panel starts with its
section number: `h2` headings are 1, 2, 3; the `h3` headings under the first `h2` are 1.1, 1.2;
the `h4` headings under 1.1 are 1.1.1. The number is followed by a colon and a space, "1.2: Waves".
The headings on the page itself are not numbered.

- **Why:** the numbers are for screen reader users. Moving through the panel's list, each entry is
  heard on its own, and the number says where it sits: a new section or a part of the last one.
- **Why a colon:** some separation is needed, or the number runs into the heading's first word.
  A period or comma gives a short pause at most punctuation levels; a colon does the same, is
  announced or not along with them, and looks right. A dash is more likely to be spoken as "dash"
  than as a pause.
- **Built, not written:** `contentsNav` in `eleventy.config.js` adds the numbers, so pages,
  articles and unstrung's `user-docs` never number their own headings, and the numbers stay right
  when sections move.
- **The page title link:** the `h1` comes first in the contents panel, unnumbered, so the panel
  starts at the top of the page. It is a sibling of the `h2` entries, not their parent, which
  would add a list level to every entry.
- **Not in the headings:** the page's headings, and unstrung's Help documents in the app, were
  numbered the same way for part of 2026-10-29, and Joel dropped it the same day. NVDA read
  "heading level 2, 1: ..." on every heading. On a heading that is a link, as on `/articles/`, the
  number sat outside the link, so moving by heading landed on the number and Enter did not follow
  the link. Article headings such as "Part 1: Sound and waves" became "2: Part 1: Sound and
  waves". In the panel the numbers are part of each link's text, so none of this applies there.

## Banner, favicon and footer

The banner is one SVG image, `content/assets/images/banner.svg`, linking to the home page with the
alt text "eyesunstrung". It shows an unstrung archtop guitar, modelled on a 17-inch single-cutaway
archtop like Joel's Eastman AR905CE but with no maker's logo or inlay design, lying on its edge on a
table with the neck sloping down to the right so it rests on both the body and the headstock, a pair
of generic thick-framed sunglasses on the table under the neck, and
"eyesunstrung" in the upper right in Atkinson Hyperlegible Next, converted to outlines. It has its
own dark background, the same in light and dark mode. It is 1200 by 240; an earlier version with the
neck rising was 1200 by 360, which Joel found too tall. The tilt, about 9.6 degrees, is calculated
so the lower bout and the tuner buttons both touch the table. The guitar is centred left to right
between the banner's left edge and the start of the title. The favicon,
`content/assets/images/favicon.svg`, is the sunglasses on a square in the guitar's amber finish.

The banner spans the full window width. Its height is the smallest of 240 px (its drawn size), a
fifth of the window's width and a fifth of its height: the same rule as the unstrung desktop app,
used on the site since 2026-10-11 so a short window, such as a phone held sideways, keeps most of
its height for the page. Before, only the 240 px limit applied. Measured 2026-10-11 in Edge and
WebKit from 390 by 844 to 3840 by 2160: the image is the window's full width at the height the rule
gives, on a site page and on /unstrung/app/ alike. Narrower than 1200 px it scales down whole. In
a box wider than its drawing, the browser keeps the drawing's proportions and centres it, and
the wall, table and wood grain, which the SVG draws 4000 px past each edge of the 1200 by 240
drawing, fill the sides, so a maximised window shows a continuous scene with the guitar, sunglasses
and title centred. Checked 2026-09-30 at 375 to 3840 px wide by reading pixel colours from a capture:
the far edges are the banner's wall and table colours in both colour schemes, and points on the
guitar and title have identical colours at 1200, 1920 and 3840 px, so the drawing is neither
stretched nor off centre. The unstrung desktop app shows the same image with the same rule:
`width: 100%` and `height: min(240px, 20vw, 20vh)` on the `<img>`.

Both are drawn by `scripts/build-banner.mjs` (`npm run build:banner`); the SVG files are committed,
so the site build does not need to run it. The script's comments describe the geometry. The unstrung
desktop app has its own copy of the banner, in unstrungApp, with a link to the site's full address.

Checked 2026-09-29 by measuring the drawing in a browser, not by looking at it: every part is in the
frame; the pickguard, pickup, bridge, tailpiece, f-holes and the fretboard's end sit inside the body
outline; the body and headstock touch the table within a pixel of each other; the title is more than
200 px from any part of the guitar; the sunglasses rest on the table in front of the guitar, under
the neck and clear of it; the title's contrast with the wall is 12:1 or better. Sighted friends of
Joel's looked at it on the live site on 2026-09-30 and found it very nicely done.

opentype.js 2.0.0's `toPathData()` wrote `NaN` for one coordinate of the title at 68 px, and a
browser stops drawing a path at the first bad number, so half the word went missing. The script now
writes the path data itself and refuses to write an SVG containing `NaN`.

The footer, on every page, has "Comments? Email feedback at eyesunstrung.vip" (the last part is the
mailto link) and links to the eyesunstrung and unstrungApp repositories on GitHub. Then "Site last
updated" and a date, added 2026-11-15 at Joel's request, and the copyright line. The date is the
day the site was built, since every publication is a build: a push to main, or the workflow run
by hand after an unstrung release, which changes the app and its documentation with no commit
here. It is given in Pacific time (`America/Los_Angeles`, in `eleventy.config.js`), Joel's zone,
because the workflow's clock is UTC and an evening publication would otherwise carry the next
day's date. The web app's page has no footer, so no date. It starts with
the same 2 px slate line as the other boundaries, at every window width, so low vision readers can
see where the page ends: across the footer on single-column pages, and across the page column only
on pages with side panels. The slate lines (menu bar, the column's left edge, between panels, above
the footer) are the site's one boundary style; Joel asked for them on 2026-09-30 so low vision
readers can tell the regions apart. Reading order is unchanged: panels, main, footer.

## Sections

| Address | Source | Layout |
|---|---|---|
| `/` | `content/index.md` | Single column |
| `/about/` | `content/about.md` | Single column |
| `/articles/` | `content/articles/index.md` | Contents panel only (`contentsPanel: true`): an `h2` per article, oldest first as Joel writes them, linking to it, with his Prompter's Notes |
| `/articles/<name>/` | `content/articles/<name>.md` | Contents and eyesunstrung Articles panels |
| `/unstrung/` | `content/unstrung/index.njk`: unstrung's introduction, from the release | Contents and unstrung Pages panels |
| `/unstrung/docs/` | `content/unstrung/docs/index.njk`: the About document, from the release | Contents and unstrung Documentation panels |
| `/unstrung/docs/<name>/` | `content/unstrung/docs/document.njk`, one page per document in the release | Contents and unstrung Documentation panels |
| `/unstrung/app/` | The web app from the release; `content/unstrung/app/index.njk` puts the site's banner and Main navigation bar in place of the app's banner | The app's own page, under the site's banner and menu bar |

## YouTube channel picture and banner

The unstrungApp YouTube channel's profile picture is the banner's guitar, table and sunglasses
without the title, framed square: `branding/unstrungApp-avatar.svg`, drawn by
`scripts/build-banner.mjs` from the same geometry as the banner. `npm run build:branding`
(`scripts/render-branding.mjs`) renders it to `branding/unstrungApp-avatar-150.png`, YouTube's
recommended 150 by 150, and `-800.png` for sharper display. `branding/` is not published with the
site; the files are for uploading to YouTube.

YouTube crops the picture to a circle and often shows it under 100 px across, so everything sits
inside the circle and the sunglasses are 1.7 times their banner size, further forward on the table.
Measured 2026-09-30 at 150 px: the farthest point of the guitar is 69.7 px from the centre of the
75 px circle; the guitar is 137 by 55 px and the sunglasses 44 by 16 px, clear of the neck.

The channel banner is `branding/unstrungApp-youtube-banner.svg`, rendered by the same command to
`branding/unstrungApp-youtube-banner.png` at YouTube's recommended 2560 by 1440 (about 125 KB;
the limit is 6 MB). YouTube crops the banner per device: TVs show all of it, desktops a wide strip
across the middle, phones less. Only the central 1546 by 423 shows everywhere, so the whole site
banner, title included, is scaled 1.288 times to fit that safe area, centred, and the wall extends
up and the table's front edge down, darkening, to fill the rest. Measured 2026-09-30: the guitar,
sunglasses and title all fall inside the safe area, and every corner of the image is wall or table.

The videos were withdrawn on 2026-11-16. The picture and banner stay, because the picture shown
beside a shared link to the site is cut from the banner's drawing; see "Search engines and shared
links".

## The videos page, removed 2026-11-16

From 2026-09-30 to 2026-11-16, `/unstrung/videos/` showed the videos on the eyesunstrung YouTube
channel, with their descriptions fetched from YouTube by `npm run fetch:videos`. It was removed with
everything that built it when Joel withdrew the videos. `docs/videos-page.md` records how it worked
and which commits to restore it from.

## unstrung, from its releases

Added 2026-10-06. The web app and the unstrung documentation come from unstrungApp's releases, not
from this repository. Each release carries `Unstrung-web-<version>.tar.gz`, holding the app and a
`user-docs/` folder with the documents and an `index.json` giving their order, titles and Help menu
names. `scripts/fetch-unstrung.mjs` (`npm run fetch:unstrung`) downloads the latest one and unpacks
it into `unstrung-release/`, which is not committed. The site workflow runs it before every build.

- `eleventy.config.js` copies `unstrung-release/app/` to `/unstrung/app/` unchanged, except for
  the app's page, `index.html`, which the fetch script sets aside as
  `unstrung-release/app-page.html`.
- `content/unstrung/app/index.njk` writes that page to `/unstrung/app/` with the app's own banner,
  its `<header>`, replaced by the site's banner and Main navigation bar, "The app" marked as the
  current page, and `header.css` and `menu.js` added to its head. `content/_data/unstrungApp.js`
  finds the app's `<header>`, and the build stops if there is not exactly one. The page loads
  nothing else of the site's: `style.css` would restyle the app. Joel's rule, 2026-10-11: on
  eyesunstrung.vip, the banner and menu bar are the site's; only the app and its documentation
  come from unstrungApp. The desktop app keeps its own copy of the banner, whose link has to be a
  full address there. Added 2026-10-08 so the app page has the same
  menu as every other page; the app's own Menu button is in a navigation landmark named unstrung,
  after the site's Main one. The site's transforms (heading ids, list roles, new-tab links) skip
  this page.
- `content/_data/unstrungDocs.js` renders the documents with markdown-it. Each document's own `#`
  heading is its title, so it is left out of the body. The documents link to eyesunstrung.vip with
  full addresses, so the links work in the desktop app too; here they become site-relative, so the
  link check covers them.
- The introduction is published twice, at `/unstrung/` and `/unstrung/docs/introduction/`, with
  the same text and title. Since 2026-11-14 the second has a canonical link in its head naming
  `/unstrung/` as the main address, so search engines show that one. Joel chose this over a
  separate title or a single address. A page sets `canonical` in its front matter, and `base.njk`
  writes the link; no other page has one.
- `/unstrung/` is the introduction. `/unstrung/docs/` is the About document, the same text as the
  app's About unstrung dialog. Every other document has its own page at
  `/unstrung/docs/<name>/`, `<name>` being its file name in unstrungApp's `user-docs/`.
- The documents are written in unstrungApp, where they are also the app's Help menu. Fixes go
  there, and reach the site with the next release.
- Releases up to 0.6.1 have no `user-docs/`. With one of those, `/unstrung/` and `/unstrung/docs/`
  say the release does not include the documentation, and there are no document pages.
- `--from` takes a local tarball or folder instead, for trying an unreleased build.

## Search engines and shared links

Added 2026-11-14, from the site review. None of it is seen or heard by a reader of the site.

- **Sitemap:** `content/sitemap.njk` writes `/sitemap.xml`, every page's full address. It lists
  every page in `collections.all` except the 404 page and any page with `canonical` set, and adds
  `/articles/` and `/unstrung/app/` by name, since both keep themselves out of collections for
  other reasons. `document.njk` sets `addAllPagesToCollections`, or only the first document would
  be in `collections.all`. `content/robots.njk` writes `/robots.txt`, which allows everything and
  points to the sitemap.
- **Title cards:** `content/_includes/social-card.njk` writes the tags an app reads to preview a
  shared link (Open Graph): the page's title, its description, its address and a picture.
  `base.njk` includes it on every page but the 404 page, and `content/unstrung/app/index.njk` on
  the web app's page, whose front matter has a title and description for this alone.
- **The card's picture** is `content/assets/images/social-card.png`, 1200 by 630. It is the one
  PNG published with the site, and no page displays it: Joel's rule is that the site shows only
  SVG images. It exists because the apps that build link previews do not accept SVG, as YouTube
  does not. `npm run build:branding` makes it from the YouTube banner's drawing, cut to the site
  banner with wall above and table below; run it after `npm run build:banner` if the drawing
  changes, and commit the file.
- **Canonical:** a page that repeats another sets `canonical` in its front matter; see "unstrung,
  from its releases".
- `siteUrl`, the site's full address, is global data set in `eleventy.config.js`.
- No feed for the articles yet. Joel's decision: wait until there are more than two.

Checked 2026-11-14 in the built site: the sitemap parses as XML and lists 13 addresses, each an
existing page, with the 404 page and `/unstrung/docs/introduction/` left out; every page but the
404 page has the nine card tags with its own title and address; the picture is 1200 by 630 and
opaque, its corners are the wall and table colours, and the title's cream pixels sit from 716 to
1115 px across and 243 to 293 px down, well inside it. Not checked: how any app draws the card.
That needs the live site and a sighted person.

## Build checks

The build stops, naming the file, on:

- an article missing `title`, `description` or `date` (`content/articles/articles.11tydata.js`);
- any of this site's own pages with more than one `h1`, a skipped heading level, or a link to a
  heading on the page that does not exist. Until 2026-11-14 only articles were checked;
- any link within the site, on any page, to a page, file or heading id that does not exist, and
  any `src` naming a file of the site that does not exist;
- a relative link or `src`, such as `introduction/`, on one of this site's own pages
  (2026-11-14). Addresses within the site are written from its root, starting with `/`, which is
  what the check above can follow. The web app's page keeps its own relative addresses.

The last two run after the build in `eleventy.config.js`.

The same heading check runs on the pages built from the unstrung release: `/unstrung/`,
`/unstrung/docs/` and each document. There a problem prints a warning, starting
`[eyesunstrung] WARNING`, and the site is built anyway. Joel's decision, 2026-11-14: a document
cannot be fixed in this repository, only in unstrungApp's `user-docs` and a new release, and
stopping would block every other change to the site until then. The place to stop a bad document
is unstrungApp's own build, before a release; nothing there checks heading levels yet. The web
app's page is not checked.

Tested 2026-11-14: the site as it stands builds with no warning; a level 4 heading after a level 2
added to a local copy of a document gives the warning and a finished build; the same in a
temporary page of this site, with a link to a heading that does not exist, stops the build and
names both problems.
