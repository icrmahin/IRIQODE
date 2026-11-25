const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const readJson = (relativePath) => {
  const absolutePath = path.join(root, relativePath);
  return JSON.parse(fs.readFileSync(absolutePath, "utf8"));
};

const manifest = readJson("package.json");
const theme = readJson("themes/iriqode-color-theme.json");

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

assert(manifest.name === "iriqode", "Unexpected extension package name.");
assert(manifest.contributes?.themes?.length === 1, "Expected one contributed color theme.");
assert(theme.type === "dark", "Theme type must be dark.");
assert(theme.colors && typeof theme.colors === "object", "Workbench colors are missing.");
assert(Array.isArray(theme.tokenColors), "TextMate token colors are missing.");
assert(theme.colors["editor.background"] === "#090B10", "Editor background does not match the design specification.");

for (const [scope, rules] of Object.entries(theme.semanticTokenColors || {})) {
  assert(typeof rules === "string" || typeof rules === "object", `Invalid semantic token rule: ${scope}`);
}

console.log("IRIQODE validation passed.");
