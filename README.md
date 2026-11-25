<div align="center">

# I R I Q O D E

**A spectral dark theme for Visual Studio Code.**

Futuristic surrealism · Iridescent color · Dark digital minimalism

[![Validate and package](https://github.com/icrmahin/IRIQODE/actions/workflows/validate.yml/badge.svg)](https://github.com/icrmahin/IRIQODE/actions/workflows/validate.yml)
![Version](https://img.shields.io/badge/version-0.1.0-9294F5?style=flat)
![Status](https://img.shields.io/badge/status-in%20development-E995B9?style=flat)
![VS Code](https://img.shields.io/badge/VS%20Code-1.85%2B-73AFFF?style=flat)

</div>

---

IRIQODE is an expressive dark workspace built around a deep near-black foundation and a controlled spectral syntax system. Its color language moves from coral and rose through violet, indigo, electric blue, and cyan—without sacrificing code readability.

> **Current state:** The first standalone color-theme implementation and repository tooling are in place. Visual validation and icon design are still in progress.

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

## Installation

IRIQODE is not yet published to the Visual Studio Marketplace.

For local development, package the extension:

```bash
npm install
npm install --global @vscode/vsce
npm run validate
vsce package --no-dependencies
```

Then install the generated `.vsix` file using **Extensions: Install from VSIX…** in VS Code.

## Development

```bash
git clone https://github.com/icrmahin/IRIQODE.git
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
- [ ] Design and implement the file icon theme
- [ ] Capture final screenshots and prepare a release

## Project boundaries

IRIQODE is independent of [Nacre](https://github.com/icrmahin/Nacre). Nacre will not be modified. Any artwork considered for reuse must be copied into this repository only after its provenance and licensing requirements have been checked.

The extension icon and file icon theme are not final yet. No placeholder is presented as finished artwork.

## License

No open-source license has been granted yet. All rights are reserved by the copyright holder unless a separate license is added.
