# Site structure

The sections of eyesunstrung.vip, how each page is laid out, and what is planned. Written
2026-09-29. `article-format.md` covers how articles are written.

## Layout

Every page has, in order: a skip link, the banner, the Main
navigation bar, the page, and the footer. All of it comes from `content/_includes/base.njk`.

The Main navigation bar holds Home, an Articles dropdown, an unstrung dropdown and About. The
dropdowns are `<details>` elements; `content/assets/js/menu.js` only adds closing on Escape and when
focus or a click moves away.

Some pages have a left column of navigation landmarks beside the page:

- **Contents:** named by the page's `h1`, listing its `##` headings with their `###` headings
  nested inside. Built at build time from the headings. Left out when the page has none.
- **Articles:** the list of articles, current one marked `aria-current="page"`. Article pages only.

Articles get both. Any other page gets the contents panel alone by setting `contentsPanel: true`
in its front matter. Pages without either are a single column.

## Banner, favicon and footer

The banner is one SVG image, `content/assets/images/banner.svg`, linking to the home page with the
alt text "eyesunstrung". It shows an unstrung archtop guitar, modelled on a 17-inch single-cutaway
archtop like Joel's Eastman AR905CE but with no maker's logo or inlay design, lying on its edge on a
table, with a pair of generic thick-framed sunglasses on the table under the neck joint, and
"eyesunstrung" in the upper right in Atkinson Hyperlegible Next, converted to outlines. It has its
own dark background, the same in light and dark mode. The favicon,
`content/assets/images/favicon.svg`, is the sunglasses on a square in the guitar's amber finish.

Both are drawn by `scripts/build-banner.mjs` (`npm run build:banner`); the SVG files are committed,
so the site build does not need to run it. The script's comments describe the geometry. The unstrung
app is to use the same banner and favicon; copying them into unstrungApp is still to do.

Checked 2026-09-29 by measuring the drawing in a browser, not by looking at it: everything is in the
frame; the pickguard, pickup, bridge, tailpiece, f-holes and the fretboard's end sit inside the body
outline; the title is at least 38 px from any part of the guitar; the sunglasses rest on the table
under the neck joint, slightly overlapping the body's edge; the title's contrast with the wall is
12:1 or better. How it looks has not been judged by a sighted person yet.

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
| `/unstrung/videos/` | `content/unstrung/videos/index.md` | Contents panel (`contentsPanel: true`). Placeholder |
| `/unstrung/app/` | Built from unstrungApp | The web app. Not built yet |

## Planned

- **`/unstrung/docs/`** will be structured like `/articles/`: an index page, and one page per
  document with the Contents panel and a panel listing all the documents. The documents are the
  help from unstrung's Help menu, which unstrungApp builds from its README
  (`scripts/build-help.mjs`). How they get from that repository to this one is still to be
  decided; the app build described in unstrungApp's `docs/eyesunstrung-site-and-web-app.md` is the
  obvious place.
- **`/unstrung/videos/`** will be one page of links to videos on the unstrungApp YouTube channel,
  grouped under headings, so the Contents panel lists the groups. The channel address still to be
  confirmed: `https://www.youtube.com/@unstrungApp`.
- **`/unstrung/app/`** is where the web build of unstrung goes. It has no `index.md` here; the site
  workflow will copy the app's own files in.

## Build checks

The build stops, naming the file, on:

- an article missing `title`, `description` or `date` (`content/articles/articles.11tydata.js`);
- an article page with more than one `h1`, a skipped heading level, or a link to a heading on the
  page that does not exist;
- any link within the site, on any page, to a page, file or heading id that does not exist.

The last two run after the build in `eleventy.config.js`.
