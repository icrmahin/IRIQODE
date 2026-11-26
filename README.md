<div align="center">

# I R I Q O D E

**A spectral dark theme for Visual Studio Code.**

The supplied iridescent IRIQODE artwork is now the official extension icon.

Futuristic surrealism · Iridescent color · Dark digital minimalism

[![Validate](https://github.com/icrmahin/IRIQODE/actions/workflows/validate.yml/badge.svg)](https://github.com/icrmahin/IRIQODE/actions/workflows/validate.yml)
![Version](https://img.shields.io/badge/version-0.1.0-9294F5?style=flat)
![Status](https://img.shields.io/badge/status-in%20development-E995B9?style=flat)
![VS Code](https://img.shields.io/badge/VS%20Code-1.85%2B-73AFFF?style=flat)

</div>

---

IRIQODE is an expressive dark workspace built around a deep near-black foundation and a controlled spectral syntax system. Its color language moves from coral and rose through violet, indigo, electric blue, and cyan—without sacrificing code readability.

> **Current state:** The color theme has been tested in VS Code. Nacre's file/folder and product icon themes are integrated as independently selectable contributions.

## The visual system

| Foundation | Spectrum |
|:--|:--|
| <code>#090B10</code> Editor | <code>#FF806B</code> Coral |
| <code>#11151D</code> Base surface | <code>#E995B9</code> Pink |
| <code>#171C26</code> Elevated surface | <code>#C18BDF</code> Violet |
| <code>#252936</code> Borders | <code>#9294F5</code> Indigo |
| <code>#E8EAF0</code> Foreground | <code>#73AFFF</code> Blue · <code>#64D3DB</code> Cyan |

The editor stays quiet. Spectral color carries semantic meaning across variables, parameters, properties, constants, functions, types, and language syntax.

**Read the complete [Visual System](docs/VISUAL-SYSTEM.md)** for the palette, token mapping, workbench specification, icon principles, and acceptance criteria.

## Icon themes

IRIQODE includes two independently selectable icon themes sourced from Nacre:

- **IRIQODE File Icons** — Nacre's file glyphs and folder artwork, with restrained spectral folder-body colors assigned by purpose (source, components, assets, documentation, tests, configuration, data, and infrastructure). Embedded folder symbols and all file glyphs retain their original colors.
- **IRIQODE Product Icons** — the 171 product glyphs and their bundled WOFF2 font.

Activate them from the Command Palette:

- `Preferences: File Icon Theme` → **IRIQODE File Icons**
- `Preferences: Product Icon Theme` → **IRIQODE Product Icons**

The Nacre source is pinned as a Git submodule. The release workflow stages the icon assets into the VSIX; Nacre itself is never modified.

## Installation

IRIQODE is not yet published to the Visual Studio Marketplace.

For local development, package the extension:

```bash
npm run validate
npm run package
```

Then install the generated `.vsix` file using **Extensions: Install from VSIX…** in VS Code.

## Development

```bash
git clone --recurse-submodules https://github.com/icrmahin/IRIQODE.git
cd IRIQODE
npm run validate
```

The repository includes a GitHub Actions workflow that validates the extension and packages a VSIX on pushes and pull requests.

See [Contributing](CONTRIBUTING.md), [Architecture](docs/ARCHITECTURE.md), and the [Release process](docs/RELEASE.md).

## Project structure

```text
IRIQODE/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   ├── workflows/
│   └── pull_request_template.md
├── assets/
├── docs/
├── scripts/
├── themes/
├── vendor/
│   └── nacre-icons/   # pinned Nacre icon source
│   └── iriqode-color-theme.json
├── CHANGELOG.md
├── CONTRIBUTING.md
├── package.json
└── SECURITY.md
```

## Roadmap

- [x] Establish the visual direction and color system
- [x] Scaffold the standalone VS Code extension
- [x] Implement the initial workbench and syntax palette
- [x] Add automated validation and VSIX packaging
- [ ] Validate contrast and syntax in real VS Code projects
- [x] Integrate Nacre file, folder, and product icon themes
- [ ] Review icon rendering in a clean VS Code profile
- [ ] Capture final screenshots and prepare a release

## Project boundaries

IRIQODE remains a separate extension. Nacre is consumed as a pinned, read-only submodule and is never modified. Its icon artwork and font retain their MIT attribution; see [THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md).

## Licensing

IRIQODE's original code remains all-rights-reserved under [LICENSE.md](LICENSE.md). The Nacre artwork and product icon font retain their MIT license and original copyright notice in [THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md).
