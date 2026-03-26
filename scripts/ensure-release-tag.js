const packageMetadata = require("../package.json");

const tagName = String(process.env.GITHUB_REF_NAME || process.argv[2] || "").trim();
const expectedTag = `v${packageMetadata.version}`;

if (!tagName) {
  console.error("Release tag is missing. Expected:", expectedTag);
  process.exit(1);
}

if (tagName !== expectedTag) {
  console.error(`Tag ${tagName} does not match package version ${packageMetadata.version}. Expected ${expectedTag}.`);
  process.exit(1);
}

console.log(`Release tag ${tagName} matches package version ${packageMetadata.version}.`);
