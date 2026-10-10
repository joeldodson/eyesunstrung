# Site structure

The sections of eyesunstrung.vip, how each page is laid out, and what is planned. Written
2026-09-29. `article-format.md` covers how articles are written.

## Layout

Every page has, in order: a skip link, the banner, the Main
navigation bar, the page, and the footer. All of it comes from `content/_includes/base.njk`.

The Main navigation bar holds Home, an Articles dropdown, an unstrung dropdown (Overview, The app,
Documentation, Videos) and About. About has `aria-label="About eyesunstrung"`, chosen 2026-10-08:
in browse mode, arrowing past the end of the unstrung dropdown reaches it, and "About" alone
sounded like About unstrung. The visible text stays "About", which is clear on screen and short.
Arrows are not kept inside a dropdown: that would need ARIA menus, which the W3C advises against
for site navigation. The dropdowns are `<details>` elements;
`content/assets/js/menu.js` only adds closing on Escape and when focus or a click moves away. The
bar is `content/_includes/main-menu.njk`, styled by `content/assets/css/menu.css` alone, so the
web app's page can carry it without the rest of the site's styles (see "unstrung, from its
releases").

The bar is slate (`#475569`) with cream text and a cream line along its top, the same in light and
dark mode, so it stands apart from the page in both. Each dropdown button has a chevron drawn with
CSS borders, with no text for a screen reader to read. On touchscreens (`pointer: coarse`), menu,
panel and footer links are at least 44 px tall; with a mouse they keep the 24 px WCAG AA minimum.

The site has no PNG icons, by Joel's choice (2026-09-30): the SVG favicon covers current browsers,
and iOS falls back to a page screenshot for a home-screen icon.

Some pages have a left column of navigation landmarks beside the page:

- **Contents:** named by the page's `h1`, listing its `##` headings with their `###` headings
  nested inside. Built at build time from the headings. Left out when the page has none.
- **Articles:** the list of articles, current one marked `aria-current="page"`. Article pages only.
- **unstrung:** The unstrung app, Documentation and Videos. The `/unstrung/` page only, set by
  `sidePanel: unstrung` in its front matter.
- **Documentation:** About unstrung and each unstrung document, by its Help menu name, current one
  marked. The `/unstrung/docs/` pages, set by `sidePanel: docs`.

Articles get the contents and the Articles panel. A page with `sidePanel` gets the contents and
the panel named. Any other page gets the contents panel alone by setting `contentsPanel: true` in
its front matter. Pages without any of these are a single column.

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
- **Space:** the list panel shows in full up to 14rem (about eight entries) and scrolls beyond
  that. The contents panel gets the rest, so it shows every heading when the window allows.
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

The banner spans the full window width and is at most 240 px tall, its drawn size. Narrower than
1200 px it scales down whole. Wider, the browser keeps the drawing's proportions and centres it, and
the wall, table and wood grain, which the SVG draws 4000 px past each edge of the 1200 by 240
drawing, fill the sides, so a maximised window shows a continuous scene with the guitar, sunglasses
and title centred. Checked 2026-09-30 at 375 to 3840 px wide by reading pixel colours from a capture:
the far edges are the banner's wall and table colours in both colour schemes, and points on the
guitar and title have identical colours at 1200, 1920 and 3840 px, so the drawing is neither
stretched nor off centre. The unstrung app should show it the same way: `width: 100%`,
`height: auto`, `max-height: 240px` on the `<img>`.

Both are drawn by `scripts/build-banner.mjs` (`npm run build:banner`); the SVG files are committed,
so the site build does not need to run it. The script's comments describe the geometry. The unstrung
app is to use the same banner and favicon; copying them into unstrungApp is still to do.

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
mailto link) and links to the eyesunstrung and unstrungApp repositories on GitHub. It starts with
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
| `/articles/` | `content/articles/index.md` | Contents panel only (`contentsPanel: true`), like the videos page: an `h2` per article, oldest first as Joel writes them, linking to it, with his Prompter's Notes |
| `/articles/<name>/` | `content/articles/<name>.md` | Contents and Articles panels |
| `/unstrung/` | `content/unstrung/index.njk`: unstrung's introduction, from the release | Contents and unstrung panels |
| `/unstrung/docs/` | `content/unstrung/docs/index.njk`: the About document, from the release | Contents and Documentation panels |
| `/unstrung/docs/<name>/` | `content/unstrung/docs/document.njk`, one page per document in the release | Contents and Documentation panels |
| `/unstrung/videos/` | `content/unstrung/videos/index.njk`, from `content/_data/videos.json` | Contents panel only (`contentsPanel: true`) |
| `/unstrung/app/` | The web app from the release; `content/unstrung/app/index.njk` adds the Main navigation bar | The app's own page, with the site's menu bar after its banner |

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

## The videos page

Built 2026-09-30 from the eyesunstrung YouTube channel, https://www.youtube.com/@eyesunstrung. The
channel was called "Joel Dodson" until Joel renamed it that day; `@unstrungApp` still reaches it.

- Under the `h1`, the channel's own description from YouTube, up to the first `===`, which Joel
  puts in the description on YouTube to mark where the page's part ends; the marker and everything
  after it are left out. Then a link to the channel.
- For each video, newest first: an `h2` with the video's title, the description Joel wrote on
  YouTube, and a `<details>` disclosure whose summary is "Watch" and the title. Inside it, the
  YouTube player, embedded from `youtube-nocookie.com` (YouTube's privacy-enhanced mode), with the
  video title as the frame's `title`. Nothing is loaded from YouTube until a disclosure is opened.
- Players are embedded with `enablejsapi=1`, so `content/assets/js/videos.js` can send them
  commands through YouTube's IFrame Player API (by `postMessage`, without YouTube's own script):
  - closing a disclosure pauses its video, and reopening leaves it paused where it was;
  - a "Playback speed" select above each player, 0.5 to 2 times, applies to every video on the
    page and is remembered in the browser. YouTube's own speed setting is in its player's settings
    menu and keyboard shortcuts, inside the frame, which Joel could not reach with NVDA; that part
    is YouTube's code and cannot be changed from here. The select is hidden until the script runs.
- `rel=0` limits the videos YouTube suggests at the end to this channel. YouTube stopped allowing
  suggestions to be turned off entirely in 2018.

Checked 2026-09-30 in Edge: the speed select shows and sets the player's rate; the rate is
remembered across a reload and applied to another video when it opens; a playing video pauses when
its disclosure closes and stays at the same time.
- The contents panel lists the `h2`s; there is no second panel.

The text comes from `content/_data/videos.json`, which `scripts/fetch-videos.mjs`
(`npm run fetch:videos`) writes from the channel page and the channel's public RSS feed, with no
API key. The site build never contacts YouTube, so it cannot fail because of YouTube. After
publishing a video, or changing a title or description on YouTube, run the script, check the file,
and commit it. The feed lists only the 15 most recent videos; past that, the script needs to keep
older entries from the existing file.

Descriptions are plain text on YouTube. The `paragraphs` filter in `eleventy.config.js` turns
them into HTML: blank lines separate paragraphs, single line breaks are kept, and web addresses
become links. Spelling and wording are fixed on YouTube, then fetched again.

## unstrung, from its releases

Added 2026-10-06. The web app and the unstrung documentation come from unstrungApp's releases, not
from this repository. Each release carries `Unstrung-web-<version>.tar.gz`, holding the app and a
`user-docs/` folder with the documents and an `index.json` giving their order, titles and Help menu
names. `scripts/fetch-unstrung.mjs` (`npm run fetch:unstrung`) downloads the latest one and unpacks
it into `unstrung-release/`, which is not committed. The site workflow runs it before every build.

- `eleventy.config.js` copies `unstrung-release/app/` to `/unstrung/app/` unchanged, except for
  the app's page, `index.html`, which the fetch script sets aside as
  `unstrung-release/app-page.html`.
- `content/unstrung/app/index.njk` writes that page to `/unstrung/app/` with the site's Main
  navigation bar added after the app's banner, "The app" marked as the current page, and
  `menu.css` and `menu.js` added to its head. `content/_data/unstrungApp.js` splits the page at
  its `</header>`, and the build stops if there is not exactly one. The page loads nothing else of
  the site's: `style.css` would restyle the app. Added 2026-10-08 so the app page has the same
  menu as every other page; the app's own Menu button is in a navigation landmark named unstrung,
  after the site's Main one. The site's transforms (heading ids, list roles, new-tab links) skip
  this page.
- `content/_data/unstrungDocs.js` renders the documents with markdown-it. Each document's own `#`
  heading is its title, so it is left out of the body. The documents link to eyesunstrung.vip with
  full addresses, so the links work in the desktop app too; here they become site-relative, so the
  link check covers them.
- `/unstrung/` is the introduction. `/unstrung/docs/` is the About document, the same text as the
  app's About unstrung dialog. Every other document has its own page at
  `/unstrung/docs/<name>/`, `<name>` being its file name in unstrungApp's `user-docs/`.
- The documents are written in unstrungApp, where they are also the app's Help menu. Fixes go
  there, and reach the site with the next release.
- Releases up to 0.6.1 have no `user-docs/`. With one of those, `/unstrung/` and `/unstrung/docs/`
  say the release does not include the documentation, and there are no document pages.
- `--from` takes a local tarball or folder instead, for trying an unreleased build.

## Build checks

The build stops, naming the file, on:

- an article missing `title`, `description` or `date` (`content/articles/articles.11tydata.js`);
- an article page with more than one `h1`, a skipped heading level, or a link to a heading on the
  page that does not exist;
- any link within the site, on any page, to a page, file or heading id that does not exist.

The last two run after the build in `eleventy.config.js`.
