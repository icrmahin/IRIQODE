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
  { match: /(^|[_\-.])(components|widgets|fragments|ui)([_\-.]|$)/, color: "#C18BDF" },
  { match: /(^|[_\-.])(test|tests|jest|cypress|playwright|coverage|spec)([_\-.]|$)/, color: "#F2B879" },
  { match: /(^|[_\-.])(docs|documentation|storybook|wiki)([_\-.]|$)/, color: "#E995B9" },
  { match: /(^|[_\-.])(asset|assets|image|images|media|font|fonts|svg|static|public)([_\-.]|$)/, color: "#64D3DB" },
  { match: /(^|[_\-.])(config|configs|setting|settings|env|vscode|idea|webpack|babel|eslint|prettier|lint)([_\-.]|$)/, color: "#9294F5" },
  { match: /(^|[_\-.])(database|db|data|sql|prisma|migration)([_\-.]|$)/, color: "#73AFFF" },
  { match: /(^|[_\-.])(git|github|gitlab|ci|workflow|workflows|docker|kubernetes|deploy|infra|cloud)([_\-.]|$)/, color: "#64D3DB" },
  { match: /(^|[_\-.])(security|auth|permission|credential|key|secret)([_\-.]|$)/, color: "#A7D7A8" },
  { match: /(^|[_\-.])(locale|locales|i18n|translation|language)([_\-.]|$)/, color: "#E995B9" },
  { match: /(^|[_\-.])(package|packages|dependency|dependencies|node|vendor|third.party)([_\-.]|$)/, color: "#F39A86" },
  { match: /(^|[_\-.])(script|scripts|command|task|automation)([_\-.]|$)/, color: "#F2B879" },
  { match: /(^|[_\-.])(route|routes|router|navigation|api|server|backend|controller|middleware|service|provider|handler)([_\-.]|$)/, color: "#73AFFF" },
  { match: /(^|[_\-.])(src|source|app|page|pages|web|client|frontend|module|modules|plugin|extension|function|class|code)([_\-.]|$)/, color: "#FF806B" },
];

function semanticFolderColor(filename) {
  const name = path.basename(filename, ".svg").toLowerCase().replace(/^folder[_-]/, "");
  for (const entry of folderPurposeColors) {
    if (entry.match.test(name)) return entry.color;
  }
  return "#AEB6B5";
}

function recolorFolderBody(svg, color) {
  // Nacre folder SVGs put the folder silhouette in the first path.
  // Only that path is recolored; embedded task/language artwork remains intact.
  const firstPath = svg.match(/<path\b[^>]*>/i);
  if (!firstPath) return svg;
  const tag = firstPath[0];
  let updated;
  if (/\bfill\s*=/.test(tag)) {
    updated = tag.replace(/\bfill\s*=\s*(["']).*?\1/i, 'fill="' + color + '"');
  } else if (/\/>$/.test(tag)) {
    updated = tag.replace(/\/>$/, ' fill="' + color + '"/>');
  } else {
    updated = tag.replace(/>$/, ' fill="' + color + '">');
  }
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
