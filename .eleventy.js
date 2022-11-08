const isProduction = process.env.NODE_ENV === "prod";

module.exports = function(eleventyConfig) {
	eleventyConfig.addPassthroughCopy("src/css");
	eleventyConfig.addPassthroughCopy("src/js");
	eleventyConfig.addPassthroughCopy("src/img");
	eleventyConfig.addPassthroughCopy("assets/uswds");

	// Uncomment if using a custom domain with GitHub Pages
	// eleventyConfig.addPassthroughCopy("CNAME");

	return {
		// Use this pathPrefix if using a custom domain so that 
		// Production builds generate links using the root:
		// pathPrefix: isProduction ? "" : "/{repository-name}/",
		pathPrefix: "/fare-capping/",
		dir: {
			input: "src",
			output: "docs",
			data: "_data"
		}
	};
};