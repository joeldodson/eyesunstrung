// Fetches the web version of unstrung and its documentation from an unstrungApp release, for the
// site build:
//
//   npm run fetch:unstrung                       the latest release on GitHub
//   npm run fetch:unstrung -- --from <path>      a local Unstrung-web-<version>.tar.gz, or an
//                                                unpacked folder such as ../unstrungApp/dist-web
//
// Each unstrungApp release carries the built web app as Unstrung-web-<version>.tar.gz. This
// unpacks it into unstrung-release/ (not committed):
//
//   unstrung-release/app/          the app, which eleventy.config.js copies to /unstrung/app/
//   unstrung-release/user-docs/    the documentation, with index.json giving the order and titles,
//                                  which content/_data/unstrungDocs.js builds /unstrung/ and
//                                  /unstrung/docs/ from
//
// So the site shows the app and its documentation as they were at that release. Releases
// up to 0.6.1 carry no user-docs; the documentation pages then say so.
//
// Uses GITHUB_TOKEN if it is set, as it is in the site workflow, only to avoid GitHub's limit on
// anonymous requests. The repository is public.

import { execFileSync } from "node:child_process";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

const root = path.join(import.meta.dirname, "..");
const out = path.join(root, "unstrung-release");
const repo = "joeldodson/unstrungApp";

const fromIndex = process.argv.indexOf("--from");
const from = fromIndex === -1 ? null : process.argv[fromIndex + 1];
if (fromIndex !== -1 && !from) throw new Error("--from needs a path to a tarball or a folder");

async function download(url, file) {
  const headers = { "User-Agent": "eyesunstrung-site-build" };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  const response = await fetch(url, { headers: { ...headers, Accept: "application/octet-stream" } });
  if (!response.ok) throw new Error(`downloading ${url}: ${response.status} ${response.statusText}`);
  await fs.writeFile(file, Buffer.from(await response.arrayBuffer()));
}

async function latestReleaseTarball(scratch) {
  const headers = { "User-Agent": "eyesunstrung-site-build", Accept: "application/vnd.github+json" };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  const response = await fetch(`https://api.github.com/repos/${repo}/releases/latest`, { headers });
  if (!response.ok) throw new Error(`asking GitHub for the latest release: ${response.status} ${response.statusText}`);
  const release = await response.json();
  const asset = release.assets.find((a) => /^Unstrung-web-.+\.tar\.gz$/.test(a.name));
  if (!asset) throw new Error(`release ${release.tag_name} has no Unstrung-web-<version>.tar.gz asset`);
  const file = path.join(scratch, asset.name);
  await download(asset.browser_download_url, file);
  return { file, label: `${release.tag_name} (${asset.name})` };
}

await fs.rm(out, { recursive: true, force: true });
const app = path.join(out, "app");
await fs.mkdir(app, { recursive: true });

let label;
if (from && (await fs.stat(from)).isDirectory()) {
  await fs.cp(from, app, { recursive: true });
  label = path.resolve(from);
} else {
  const scratch = await fs.mkdtemp(path.join(os.tmpdir(), "unstrung-release-"));
  const tarball = from ? { file: path.resolve(from), label: path.resolve(from) } : await latestReleaseTarball(scratch);
  // tar is part of Windows 10 and later, macOS and Linux. Run from inside the folders with
  // relative names, since GNU tar reads "C:" in a path as a remote host.
  const relativeTarball = path.relative(app, tarball.file);
  execFileSync("tar", ["-xzf", relativeTarball], { cwd: app, stdio: "inherit" });
  await fs.rm(scratch, { recursive: true, force: true });
  label = tarball.label;
}

// The documentation is for this site's pages, not part of the app, so it does not go to
// /unstrung/app/.
const docs = path.join(app, "user-docs");
const hasDocs = await fs.stat(docs).then(() => true, () => false);
if (hasDocs) await fs.rename(docs, path.join(out, "user-docs"));

console.log("=== unstrung release ===");
console.log(`from:      ${label}`);
console.log(`app:       ${path.relative(root, app)}`);
console.log(`user-docs: ${hasDocs ? path.relative(root, path.join(out, "user-docs")) : "none in this release"}`);
