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
applySemanticFolderColors(path.join(root, "icons/build/main/folders"));


const folderPurposeColors = [
  { match: /components|widgets|fragments|ui/, color: "#C18BDF" },
  { match: /test|jest|cypress|playwright|coverage|spec/, color: "#F2B879" },
  { match: /docs|documentation|storybook|wiki/, color: "#E995B9" },
  { match: /asset|image|media|font|svg|static|public/, color: "#64D3DB" },
  { match: /config|setting|env|vscode|idea|webpack|babel|eslint|prettier|lint/, color: "#9294F5" },
  { match: /database|db|data|sql|prisma|migration/, color: "#73AFFF" },
  { match: /git|github|gitlab|ci|workflow|docker|kubernetes|deploy|infra|cloud/, color: "#64D3DB" },
  { match: /security|auth|permission|credential|key|secret/, color: "#A7D7A8" },
  { match: /locale|i18n|translation|language/, color: "#E995B9" },
  { match: /package|dependency|node|vendor|third.party/, color: "#F39A86" },
  { match: /script|command|task|automation/, color: "#F2B879" },
  { match: /route|router|navigation|api|server|backend|controller|middleware|service|provider|handler/, color: "#73AFFF" },
  { match: /src|source|app|page|web|client|frontend|module|plugin|extension|function|class|code/, color: "#FF806B" },
];

function semanticFolderColor(filename) {
  const name = path.basename(filename, ".svg").toLowerCase();
  for (const entry of folderPurposeColors) {
    if (entry.match.test(name)) return entry.color;
  }
  return "#AEB6B5";
}

function recolorFolderBody(svg, color) {
  // Nacre folder SVGs put the folder silhouette in the first path.
  // Only that path is recolored; embedded task/language artwork remains intact.
  const firstPath = svg.match(/<path\\b[^>]*>/i);
  if (!firstPath) return svg;
  const tag = firstPath[0];
  const updated = /\\bfill\\s*=/.test(tag)
    ? tag.replace(/\\bfill\\s*=\\s*(["']).*?\\1/i, 'fill="' + color + '"')
    : tag.replace(/\\s*\\/>$/, ' fill="' + color + '"/>').replace(/>$/, ' fill="' + color + '">');
  return svg.replace(tag, updated);
}

function applySemanticFolderColors(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      applySemanticFolderColors(target);
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith(".svg")) {
      const color = semanticFolderColor(entry.name);
      const svg = fs.readFileSync(target, "utf8");
      fs.writeFileSync(target, recolorFolderBody(svg, color));
    }
  }
}

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
