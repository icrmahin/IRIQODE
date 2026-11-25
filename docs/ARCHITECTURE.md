# Architecture

IRIQODE is a standalone Visual Studio Code extension. The color theme and future file icon theme are separate VS Code contributions and must remain independently selectable.

## Current structure

- `package.json` — extension metadata and contribution points.
- `themes/iriqode-color-theme.json` — workbench colors, TextMate rules, and semantic token colors.
- `scripts/validate.js` — dependency-free manifest and theme validation.
- `assets/` — project artwork and, later, extension identity assets.
- `.github/workflows/` — automated validation and packaging.

## Design implementation

The initial theme translates the approved palette into VS Code's supported theme schema. TextMate scopes provide grammar-level fallbacks; semantic token colors refine roles when a language server exposes them.

VS Code theme token foregrounds are solid colors. The spectral variable progression is therefore mapped across semantic roles, not rendered as a gradient inside a single identifier.

## Icon system

The file icon theme is intentionally not registered until its artwork, associations, and licensing are reviewed. Nacre remains a separate repository and must not be modified. Any reused artwork must be copied into this repository only after its license and attribution requirements are verified.

## Quality gates

1. Parse all JSON manifests.
2. Validate required theme contributions and design invariants.
3. Package a VSIX in CI.
4. Install and inspect the package in VS Code before release.
5. Review screenshots at native editor and workbench sizes.
