// Eleventy configuration for eyesunstrung.vip.
//
// Pages are Markdown in content/, rendered through the one layout in
// content/_includes/base.njk. The font comes from its npm package at build
// time, with its licence, so nothing third-party is committed here.

import { IdAttributePlugin } from "@11ty/eleventy";

const fontPackage = "node_modules/@fontsource-variable/atkinson-hyperlegible-next";

export default function (eleventyConfig) {
  // Gives every heading an id made from its text, so a page can link to its own
  // sections and other pages can link to them: "## Part 1: Sound and waves"
  // becomes id="part-1-sound-and-waves".
  eleventyConfig.addPlugin(IdAttributePlugin);

  // Bulleted lists are shown without bullets (see style.css). Safari drops list
  // semantics from a list with no bullets unless it has role="list", and
  // Markdown cannot add attributes, so add it to every <ul> here.
  eleventyConfig.addTransform("list-role", function (content) {
    if (!(this.page.outputPath || "").endsWith(".html")) return content;
    return content.replaceAll("<ul>", '<ul role="list">');
  });

  eleventyConfig.addPassthroughCopy({ "content/assets": "assets" });
  eleventyConfig.addPassthroughCopy({
    [`${fontPackage}/files/atkinson-hyperlegible-next-latin-wght-normal.woff2`]:
      "assets/fonts/atkinson-hyperlegible-next-latin.woff2",
    [`${fontPackage}/LICENSE`]: "assets/fonts/OFL.txt",
  });

  // Dates in front matter are read as midnight UTC, so format them in UTC too,
  // or a date can show as the day before.
  eleventyConfig.addFilter("isoDate", (date) => date.toISOString().slice(0, 10));
  eleventyConfig.addFilter("readableDate", (date) =>
    date.toLocaleDateString("en-US", { dateStyle: "long", timeZone: "UTC" }),
  );

  eleventyConfig.addGlobalData("layout", "base.njk");
  eleventyConfig.addGlobalData("year", () => new Date().getFullYear());
}

export const config = {
  dir: {
    input: "content",
    output: "_site",
  },
  markdownTemplateEngine: "njk",
};
