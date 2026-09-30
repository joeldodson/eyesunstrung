# Site structure

The sections of eyesunstrung.vip, how each page is laid out, and what is planned. Written
2026-09-29. `article-format.md` covers how articles are written.

## Layout

Every page has, in order: a skip link, the banner, the Main
navigation bar, the page, and the footer. All of it comes from `content/_includes/base.njk`.

The Main navigation bar holds Home, an Articles dropdown, an unstrung dropdown and About. The
dropdowns are `<details>` elements; `content/assets/js/menu.js` only adds closing on Escape and when
focus or a click moves away.

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

Articles get both. Any other page gets the contents panel alone by setting `contentsPanel: true`
in its front matter. Pages without either are a single column.

This is the standard layout for any page that pairs content with navigation panels, including
`/unstrung/docs/` when it is built. All of it is in `base.njk` and `style.css`; a new section only
needs its own list panel.

- **Dividers:** a 2 px slate line, the menu bar's colour, runs down the page's left edge for its
  whole height, and the same line separates one panel from the next. There are no boxes around the
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
mailto link) and links to the eyesunstrung and unstrungApp repositories on GitHub.

## Sections

| Address | Source | Layout |
|---|---|---|
| `/` | `content/index.md` | Single column |
| `/about/` | `content/about.md` | Single column |
| `/articles/` | `content/articles/index.md` | Single column: an `h2` per article, linking to it, with Joel's Prompter's Notes |
| `/articles/<name>/` | `content/articles/<name>.md` | Contents and Articles panels |
| `/unstrung/` | `content/unstrung/index.md` | Single column. Placeholder |
| `/unstrung/docs/` | `content/unstrung/docs/index.md` | Single column. Placeholder |
| `/unstrung/videos/` | `content/unstrung/videos/index.njk`, from `content/_data/videos.json` | Contents panel only (`contentsPanel: true`) |
| `/unstrung/app/` | Built from unstrungApp | The web app. Not built yet |

## The videos page

Built 2026-09-30 from the unstrungApp YouTube channel, https://www.youtube.com/@unstrungApp.

- Under the `h1`, the channel's own description from YouTube, then a link to the channel.
- For each video, newest first: an `h2` with the video's title, the description Joel wrote on
  YouTube, and a `<details>` disclosure whose summary is "Watch" and the title. Inside it, the
  YouTube player, embedded from `youtube-nocookie.com` (YouTube's privacy-enhanced mode), with the
  video title as the frame's `title`. Nothing is loaded from YouTube until a disclosure is opened.
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

## Planned

- **`/unstrung/docs/`** will be structured like `/articles/`: an index page, and one page per
  document with the Contents panel and a panel listing all the documents. The documents are the
  help from unstrung's Help menu, which unstrungApp builds from its README
  (`scripts/build-help.mjs`). How they get from that repository to this one is still to be
  decided; the app build described in unstrungApp's `docs/eyesunstrung-site-and-web-app.md` is the
  obvious place.
- **`/unstrung/app/`** is where the web build of unstrung goes. It has no `index.md` here; the site
  workflow will copy the app's own files in.

## Build checks

The build stops, naming the file, on:

- an article missing `title`, `description` or `date` (`content/articles/articles.11tydata.js`);
- an article page with more than one `h1`, a skipped heading level, or a link to a heading on the
  page that does not exist;
- any link within the site, on any page, to a page, file or heading id that does not exist.

The last two run after the build in `eleventy.config.js`.
