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


const generatedFolderRoot = path.join(root, "icons", "build", "main", "folders");
const folderSvgPaths = [];
function collectFolderSvgs(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) collectFolderSvgs(target);
    else if (entry.isFile() && entry.name.toLowerCase().endsWith(".svg")) folderSvgPaths.push(target);
  }
}
collectFolderSvgs(generatedFolderRoot);
assert(folderSvgPaths.length > 0, "Generated folder artwork is missing.");
const folderBodyColors = new Set();
for (const svgPath of folderSvgPaths) {
  const svg = fs.readFileSync(svgPath, "utf8");
  const firstPath = svg.match(/<path\b[^>]*>/i);
  assert(firstPath, `Folder artwork has no body path: ${path.relative(root, svgPath)}`);
  const fill = firstPath[0].match(/\bfill=["'](#[0-9a-f]{6})["']/i);
  assert(fill, `Folder body has no explicit color: ${path.relative(root, svgPath)}`);
  folderBodyColors.add(fill[1].toUpperCase());
}
assert(folderBodyColors.size >= 6, `Expected purpose-based folder colors; found only ${folderBodyColors.size}.`);

console.log(`IRIQODE validation passed: ${folderBodyColors.size} folder body colors,  ${Object.keys(fileTheme.iconDefinitions).length} file/folder definitions and ${Object.keys(productTheme.iconDefinitions).length} product icons.`);
