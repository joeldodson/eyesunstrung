# eyesunstrung

The source of [eyesunstrung.vip](https://eyesunstrung.vip), a site about learning music and guitar
as a blind person, and eventually the home of the web version of
[Unstrung](https://github.com/joeldodson/unstrungApp).

Built with [Eleventy](https://www.11ty.dev/). Pages are Markdown files in `content/`, rendered
through the one layout in `content/_includes/base.njk`.

## Articles

Articles are Markdown files in `content/articles/`. `docs/article-format.md` describes the format,
holds the instructions given to Claude for drafting them, and lists what the build checks.
`docs/site-structure.md` describes the site's sections, page layouts and plans.

## Running it locally

```
npm install
npm start
```

The site is then at http://localhost:8080/ and rebuilds when a file changes.
`npm run build` writes the finished site to `_site/`.
`npm run build:banner` redraws the banner and favicon; see `docs/site-structure.md`.
`npm run fetch:videos` refreshes the videos page's data from YouTube; commit the result.

## Publishing

Pushing to `main` builds the site and publishes it to GitHub Pages through
`.github/workflows/site.yml`. Pushes to other branches build but do not publish.

## Font

Atkinson Hyperlegible Next, by the Braille Institute, under the SIL Open Font License 1.1. It is
installed from npm and copied into the site, with its licence, at build time.
