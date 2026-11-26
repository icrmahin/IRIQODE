const fs = require("node:fs");
const path = require("node:path");
const { execFileSync } = require("node:child_process");

const root = path.resolve(__dirname, "..");
const source = path.join(root, "vendor", "nacre-icons");
const requireSource = (relative) => {
  const target = path.join(source, relative);
  if (!fs.existsSync(target)) {
    throw new Error("Nacre icon submodule is missing. Run: git submodule update --init --recursive");
  }
  return target;
};

const copyTree = (from, to) => {
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.cpSync(from, to, { recursive: true, force: true });
};

// Run Nacre's own icon generator so IRIQODE receives the exact main icon
// theme, including its neutral folder treatment—not a palette variant.
execFileSync(
  process.execPath,
  [requireSource("scripts/build-icon-themes.mjs")],
  { cwd: source, stdio: "inherit" }
);

copyTree(requireSource("icons/files"), path.join(root, "icons/files"));
copyTree(requireSource("icons/build/main/folders"), path.join(root, "icons/build/main/folders"));

const fileTheme = JSON.parse(
  fs.readFileSync(requireSource("themes/nacre-main-file-icons.json"), "utf8")
);
fs.writeFileSync(
  path.join(root, "themes/iriqode-file-icons.json"),
  JSON.stringify(fileTheme, null, 2) + "\n"
);

const productTheme = JSON.parse(
  fs.readFileSync(requireSource("themes/nacre-product-icons.json"), "utf8")
);
productTheme.fonts[0].id = "iriqode-ui-icons";
productTheme.fonts[0].src[0].path = "../assets/fonts/iriqode-ui-icons.woff2";
for (const definition of Object.values(productTheme.iconDefinitions || {})) {
  if (definition.fontId) definition.fontId = "iriqode-ui-icons";
}
fs.mkdirSync(path.join(root, "assets/fonts"), { recursive: true });
fs.copyFileSync(
  requireSource("themes/nacre-ui-icons.woff2"),
  path.join(root, "assets/fonts/iriqode-ui-icons.woff2")
);
fs.writeFileSync(
  path.join(root, "themes/iriqode-product-icons.json"),
  JSON.stringify(productTheme, null, 2) + "\n"
);

console.log("Prepared the Nacre main file/folder theme and product icons for IRIQODE.");
