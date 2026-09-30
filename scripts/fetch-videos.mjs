// Fetches the unstrungApp YouTube channel's description and videos and writes
// them to content/_data/videos.json, which the /unstrung/videos/ page is built
// from.
//
//   npm run fetch:videos
//
// Run it after publishing a video (or editing a title or description on
// YouTube), check the result, and commit videos.json. The site build itself
// never contacts YouTube, so YouTube being slow or down cannot break a deploy.
//
// Sources, both public and needing no API key:
//   - the channel page, for the channel's id and its description;
//   - the channel's RSS feed, for each video's id, title, publication date and
//     full description. The feed lists the 15 most recent videos.

import fs from "node:fs";
import path from "node:path";

const handle = "@unstrungApp";
const channelUrl = `https://www.youtube.com/${handle}`;
const outFile = path.join(import.meta.dirname, "..", "content", "_data", "videos.json");

async function get(url) {
  const response = await fetch(url, { headers: { "Accept-Language": "en-US", "User-Agent": "Mozilla/5.0" } });
  if (!response.ok) throw new Error(`${url}: HTTP ${response.status}`);
  return response.text();
}

// The channel page embeds its metadata as JSON; the description is a JSON string.
const page = await get(channelUrl);
const channelId = /"externalId":"(UC[\w-]+)"/.exec(page)?.[1];
const descriptionJson = /"channelMetadataRenderer":\{"title":"(?:[^"\\]|\\.)*","description":"((?:[^"\\]|\\.)*)"/.exec(page)?.[1];
if (!channelId || descriptionJson === undefined) {
  throw new Error("Could not find the channel id or description on the channel page; YouTube may have changed its layout.");
}
const channelDescription = JSON.parse(`"${descriptionJson}"`).trim();

const feed = await get(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`);
const unescape = (text) =>
  text.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, "&");
const videos = feed
  .split("<entry>")
  .slice(1)
  .map((entry) => ({
    id: /<yt:videoId>([^<]+)<\/yt:videoId>/.exec(entry)?.[1],
    title: unescape(/<title>([^<]*)<\/title>/.exec(entry)?.[1] ?? "").trim(),
    published: /<published>([^<]+)<\/published>/.exec(entry)?.[1],
    description: unescape(/<media:description>([\s\S]*?)<\/media:description>/.exec(entry)?.[1] ?? "").trim(),
  }))
  .sort((a, b) => b.published.localeCompare(a.published)); // newest first

for (const video of videos) {
  if (!video.id || !video.title || !video.published) throw new Error(`Incomplete feed entry: ${JSON.stringify(video)}`);
}

const data = {
  fetched: new Date().toISOString().slice(0, 10),
  channel: { handle, url: channelUrl, id: channelId, description: channelDescription },
  videos,
};
fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, JSON.stringify(data, null, 2) + "\n");
console.log(`${videos.length} videos written to content/_data/videos.json, newest first:`);
for (const v of videos) console.log(`  ${v.published.slice(0, 10)}  ${v.title}`);
