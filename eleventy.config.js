// Eleventy configuration for eyesunstrung.vip.
//
// Pages are Markdown in content/, rendered through the one layout in
// content/_includes/base.njk. The font comes from its npm package at build
// time, with its licence, so nothing third-party is committed here.

const fontPackage = "node_modules/@fontsource-variable/atkinson-hyperlegible-next";

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "content/assets": "assets" });
  eleventyConfig.addPassthroughCopy({
    [`${fontPackage}/files/atkinson-hyperlegible-next-latin-wght-normal.woff2`]:
      "assets/fonts/atkinson-hyperlegible-next-latin.woff2",
    [`${fontPackage}/LICENSE`]: "assets/fonts/OFL.txt",
  });

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
