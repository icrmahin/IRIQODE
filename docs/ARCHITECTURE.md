# Architecture

IRIQODE is a standalone Visual Studio Code extension. The color theme and future file icon theme are separate VS Code contributions and must remain independently selectable.

## Current structure

- `package.json` — extension metadata and contribution points.
- `themes/iriqode-color-theme.json` — workbench colors, TextMate rules, and semantic token colors.
- `scripts/validate.js` — dependency-free manifest and theme validation.
- `vendor/nacre-icons/` — pinned, read-only Nacre source submodule.
- `scripts/prepare-icons.js` — stages the Nacre SVGs, mappings, and product font into the extension package.
- `icons/` and `assets/fonts/` — generated local package assets; intentionally not committed.
- `.github/workflows/` — automated validation and packaging.

## Design implementation

The initial theme translates the approved palette into VS Code's supported theme schema. TextMate scopes provide grammar-level fallbacks; semantic token colors refine roles when a language server exposes them.

VS Code theme token foregrounds are solid colors. The spectral variable progression is therefore mapped across semantic roles, not rendered as a gradient inside a single identifier.

## Icon system

The file and product icon themes are separate contributions. `vendor/nacre-icons` pins the source repository at a specific commit. `npm run prepare:icons` runs Nacre's own icon generator, then copies its main file/folder theme, SVG assets, mappings, and WOFF2 font into the package paths, renaming the contribution IDs and font ID to IRIQODE. A semantic folder pass recolors only each folder silhouette according to its purpose; embedded marks and file glyphs remain unchanged. Generated assets are ignored by Git and are included in the VSIX after preparation. Nacre remains untouched. The MIT license and original notice are retained in `THIRD-PARTY-NOTICES.md`.

## Quality gates

1. Parse all JSON manifests.
2. Validate required theme contributions and design invariants.
3. Package a VSIX in CI.
4. Install and inspect the package in VS Code before release.
5. Review screenshots at native editor and workbench sizes.
