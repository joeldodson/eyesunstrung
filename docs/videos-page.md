# The videos page, and how to bring it back

From 2026-09-30 to 2026-11-16 the site had a page at `/unstrung/videos/` showing the videos on
the eyesunstrung YouTube channel. Joel withdrew the videos on 2026-11-16, and the page and
everything that built it were removed that day. This file records how it worked, so it can be
revived.

## Commits

- **Last commit with the page:** `45e857d` ("Show when the site was last updated, in the
  footer"). Every removed file can be restored from it.
- **The removal:** `REMOVAL_COMMIT`, "Remove the videos page and what built it".
- **In unstrungApp:** `394ee7f`, "Remove the references to the unstrung videos", removed the
  Videos section from `user-docs/introduction.md`, which is also the `/unstrung/` page.

To bring the page back as it was:

```
git checkout 45e857d -- content/unstrung/videos/index.njk content/_data/videos.json content/assets/js/videos.js scripts/fetch-videos.mjs
```

Then put back by hand what the removal took out of shared files, all described below: the
`fetch:videos` line in `package.json`, the Videos entry in `content/_data/unstrungPages.json`,
the videos rules in `content/assets/css/style.css`, the `paragraphs` filter in
`eleventy.config.js`, the link in the fallback paragraph of `content/unstrung/index.njk`, the
README's line about `npm run fetch:videos`, and the parts of `docs/site-structure.md`.
`git show REMOVAL_COMMIT` lists every line. Reverting the removal commit (`git revert`) does all
of it at once, if nothing since has touched the same lines. Run `npm run fetch:videos` afterwards,
since `videos.json` holds the videos as of 2026-10-01.

## The channel

- https://www.youtube.com/@eyesunstrung, channel id `UC6eJXOpeqnDkpgZrPQNjagg`.
- It was called "Joel Dodson" until Joel renamed it on 2026-09-30. `@eyesunstrung` became its
  main handle; `@unstrungApp` still reached it, and unstrungApp's introduction linked to
  https://youtube.com/@unstrungApp.
- Three videos were on the page, newest first:
  - "unstrung App - chord practice (play along)", `LiG2sYoRYK4`, 2026-09-04.
  - "unstrung App - Chords and Notes", `6Yma_qkYmqk`, 2026-09-04.
  - "introduction to the unstrung application", `Kx5CoLyVwKI`, 2026-08-31.
- The channel's profile picture and banner were drawn for this site's banner and are still in
  `branding/`, made by `npm run build:branding`. They were not removed: the picture shown beside
  a shared link to the site, `content/assets/images/social-card.png`, is cut from the banner's
  drawing. `docs/site-structure.md` describes them.

## Fetching from YouTube

`scripts/fetch-videos.mjs`, run as `npm run fetch:videos`, wrote `content/_data/videos.json`.
Joel ran it after publishing a video or changing a title or description on YouTube, checked the
file and committed it. The site build never contacted YouTube, so YouTube being slow, down or
changed could not break a deploy. It needed no API key. It used Node's own `fetch`, with an
`Accept-Language: en-US` header and a browser-like `User-Agent`.

It read two public sources:

1. **The channel page**, `https://www.youtube.com/@eyesunstrung`. The page embeds its metadata
   as JSON. The script found the channel id with `/"externalId":"(UC[\w-]+)"/`, and the name and
   description with
   `/"channelMetadataRenderer":\{"title":"((?:[^"\\]|\\.)*)","description":"((?:[^"\\]|\\.)*)"/`.
   Both are JSON strings, so each was decoded with `JSON.parse` wrapped in quotes. If any of the
   three was missing it stopped, saying YouTube may have changed its layout.
2. **The channel's RSS feed**, `https://www.youtube.com/feeds/videos.xml?channel_id=<id>`. For
   each `<entry>` it took `<yt:videoId>`, `<title>`, `<published>` and `<media:description>`,
   undid the five XML escapes (`&lt;`, `&gt;`, `&quot;`, `&#39;`, `&amp;`, in that order, `&amp;`
   last), trimmed them, and sorted the videos newest first by `published`. An entry without an
   id, title or date stopped the script.

**The `===` marker.** The channel description on YouTube held more than the page should show.
Joel put `===` in it to mark the end of the page's part. The script kept only the text before the
first `===`, trimmed; with no marker it kept it all.

**The 15-video limit.** The feed lists only the 15 most recent videos. Past 15, the script would
have needed to keep older entries from the existing `videos.json`. It never did, since there were
three videos. Revived, this is the first thing to add.

The file it wrote:

```json
{
  "fetched": "2026-10-01",
  "channel": {
    "name": "eyesunstrung",
    "handle": "@eyesunstrung",
    "url": "https://www.youtube.com/@eyesunstrung",
    "id": "UC6eJXOpeqnDkpgZrPQNjagg",
    "description": "The channel description, up to the first ==="
  },
  "videos": [
    {
      "id": "LiG2sYoRYK4",
      "title": "unstrung App - chord practice (play along)",
      "published": "2026-09-04T06:58:45+00:00",
      "description": "The description Joel wrote on YouTube, plain text"
    }
  ]
}
```

Spelling and wording were fixed on YouTube and fetched again, never edited in the file.

## Building the page

`content/unstrung/videos/index.njk`, a Nunjucks page reading `videos` from the data file. Front
matter: title "unstrung Videos", a description for search and link previews, and
`contentsPanel: true`, so the only side panel was Page Contents, listing the `h2`s.

In order on the page:

- Under the `h1`, the channel description, then "All of these are on the eyesunstrung YouTube
  channel", the channel name as a link.
- For each video, newest first: an `h2` with its title, its description, and a `<details
  class="video">` disclosure whose summary was "Watch" and the title.
- Inside the disclosure, a `<label class="video-speed" hidden>` reading "Playback speed" around a
  `<select>` of 0.5, 0.75, Normal (1), 1.25, 1.5, 1.75 and 2 times, then the player:

```html
<iframe id="player-{{ video.id }}"
  src="https://www.youtube-nocookie.com/embed/{{ video.id }}?enablejsapi=1&amp;rel=0"
  title="{{ video.title }}" loading="lazy"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
```

- At the end, `<script src="/assets/js/videos.js" defer></script>`.

Why it was built that way:

- **`youtube-nocookie.com`** is YouTube's privacy-enhanced mode. With the player inside a closed
  disclosure and `loading="lazy"`, nothing loaded from YouTube until a disclosure was opened.
  Measured in Edge and WebKit during the November review.
- **`enablejsapi=1`** let the page command the player through YouTube's IFrame Player API, by
  `postMessage`, without loading YouTube's own script.
- **`rel=0`** limited the videos suggested at the end to this channel. YouTube stopped allowing
  suggestions to be turned off entirely in 2018.
- **The disclosure** kept a page of three players short for a screen reader, and kept YouTube
  from loading until it was wanted.
- **The speed select** existed because YouTube's own speed setting is in its player's menu and
  keyboard shortcuts, inside the frame, which Joel could not reach with NVDA. Shift+period does
  not work in the embedded player. The select was hidden until the script showed it, since it
  did nothing without the script.

### The `paragraphs` filter

YouTube descriptions are plain text. This filter in `eleventy.config.js` turned them into HTML:
escaped, blank lines between paragraphs, single line breaks kept as `<br>`, web addresses made
into links. The videos page was its only user, so it was removed with the page.

```js
  // Plain text from elsewhere (YouTube descriptions) as HTML: escaped, blank
  // lines between paragraphs, single line breaks kept, web addresses as links.
  eleventyConfig.addFilter("paragraphs", (text) => {
    const escape = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    const linkify = (s) => s.replace(/https?:\/\/[^\s<]+[^\s<.,;:!?)]/g, (url) => `<a href="${url}">${url}</a>`);
    return (text || "")
      .trim()
      .split(/\n\s*\n/)
      .map((para) => `<p>${linkify(escape(para.trim())).replace(/ *\n/g, "<br>\n")}</p>`)
      .join("\n");
  });
```

### `videos.js`

`content/assets/js/videos.js`, 79 lines, with no library:

- It found every `details.video` and its iframe and select.
- The speed was read from `localStorage` under `eyesunstrung-video-speed`, defaulting to 1, inside
  `try`, since storage can be unavailable.
- Each select was set to that speed and its label shown.
- When a player's iframe loaded, the script posted `{"event":"listening","id":<iframe id>,"channel":"widget"}`
  to `https://www.youtube-nocookie.com`, asking the player to report its state.
- A `message` listener, accepting only that origin, waited for the player's first `onReady` or
  `initialDelivery` event and then sent it the chosen speed.
- Commands were sent as `{"event":"command","func":<name>,"args":[...]}`: `pauseVideo` when a
  disclosure closed, and `setPlaybackRate` to every player when any select changed. The new speed
  was saved and every select set to match.
- Reopening a disclosure left the video paused where it was. The file's header comment said it
  resumed, which was wrong; the November review recorded that as finding 15.

Checked 2026-09-30 in Edge: the select shows and sets the player's rate; the rate is remembered
across a reload and applied to another video when it opens; a playing video pauses when its
disclosure closes and stays at the same time.

### Styles

In `content/assets/css/style.css`, after `.article-date`:

- `.video`: `margin-block: 1rem 2rem`.
- `.video summary`: styled as a link, in `var(--link)`, underlined with a 0.15em offset,
  `cursor: pointer`, at least 24px tall.
- `.video-speed:not([hidden])`: `display: block`, `margin-top: 0.75rem`. The `:not([hidden])`
  kept this from overriding the `hidden` attribute before the script ran.
- `.video-speed select`: `margin-inline-start: 0.5rem`, `font: inherit`.
- `.video iframe`: block, full width of the text column, `aspect-ratio: 16 / 9`, `height: auto`,
  `margin-top: 0.75rem`, no border.

`color-scheme: light dark`, added 2026-11-14, made the browser draw the speed select dark in dark
mode. It stays, as it also covers the panels' scrollbars.

## How the page was reached

- **`content/_data/unstrungPages.json`** had a fourth entry,
  `{ "url": "/unstrung/videos/", "label": "Videos" }`. That file feeds the unstrung dropdown in the
  Main navigation bar and the unstrung Pages panel on `/unstrung/`.
- **`content/unstrung/index.njk`**, when the release has no introduction, ended with "Run unstrung
  in your browser, or watch the unstrung videos", the second part linking to the page.
- **unstrungApp's `user-docs/introduction.md`** had a Videos section, last in the document. It
  linked to the YouTube channel and to the videos page, said the videos were short, meant to be
  heard, and recorded with screen sharing so the screen reader could be heard, and explained
  that shift+period does not work in the embedded player and the page's Playback speed select
  does instead.

## Known gaps at removal

- The 15-video limit in the fetch script, above.
- Long titles were cut off in Page Contents: three of four entries at 1280 px, since all started
  "unstrung App - ". The November review, finding 2.
- The November review asked whether a page of three or four entries needs a contents panel at
  all. It was not answered.
