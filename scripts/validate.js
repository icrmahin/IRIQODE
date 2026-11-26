const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const readJson = (relativePath) => JSON.parse(fs.readFileSync(path.join(root, relativePath), "utf8"));
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const checkAsset = (ownerFile, relativePath) => {
  const absolute = path.resolve(path.dirname(path.join(root, ownerFile)), relativePath);
  assert(absolute.startsWith(root + path.sep), `Asset path escapes repository: ${relativePath}`);
  assert(fs.existsSync(absolute), `Missing icon asset: ${relativePath} (referenced by ${ownerFile})`);
};

const manifest = readJson("package.json");
const colorTheme = readJson("themes/iriqode-color-theme.json");
const fileTheme = readJson("themes/iriqode-file-icons.json");
const productTheme = readJson("themes/iriqode-product-icons.json");

assert(manifest.name === "iriqode", "Unexpected extension package name.");
assert(manifest.contributes?.themes?.some(item => item.path === "./themes/iriqode-color-theme.json"), "Color theme contribution is missing.");
assert(manifest.contributes?.iconThemes?.some(item => item.id === "iriqode-file-icons"), "File icon contribution is missing.");
assert(manifest.contributes?.productIconThemes?.some(item => item.id === "iriqode-product-icons"), "Product icon contribution is missing.");
assert(colorTheme.type === "dark", "Color theme type must be dark.");
assert(colorTheme.colors?.["editor.background"] === "#090B10", "Editor background does not match the approved palette.");
assert(Array.isArray(colorTheme.tokenColors), "TextMate token colors are missing.");

for (const definition of Object.values(fileTheme.iconDefinitions || {})) {
  if (definition.iconPath) checkAsset("themes/iriqode-file-icons.json", definition.iconPath);
}
assert(Object.keys(fileTheme.iconDefinitions || {}).length >= 300, "File/folder icon definitions look incomplete.");
assert(productTheme.fonts?.length > 0, "Product icon font declaration is missing.");
for (const font of productTheme.fonts) {
  for (const source of font.src || []) checkAsset("themes/iriqode-product-icons.json", source.path);
}
assert(Object.keys(productTheme.iconDefinitions || {}).length >= 150, "Product icon definitions look incomplete.");

console.log(`IRIQODE validation passed: ${Object.keys(fileTheme.iconDefinitions).length} file/folder definitions and ${Object.keys(productTheme.iconDefinitions).length} product icons.`);
