# Contributing

Thank you for taking an interest in IRIQODE.

## Development setup

- Node.js 20 or later
- Visual Studio Code 1.85 or later
- npm
- `@vscode/vsce` for packaging

Clone the repository and validate the current theme:

```bash
npm run validate
```

Package locally after installing the VS Code Extension Manager:

```bash
npm install --global @vscode/vsce
vsce package
```

Install the resulting VSIX in VS Code and inspect the theme against the syntax fixtures and real projects.

## Change process

1. Open an issue for substantial changes.
2. Create a focused branch from `main`.
3. Keep pull requests limited to one coherent change.
4. Run validation before submitting.
5. Include screenshots for visual changes.
6. Explain any palette or scope changes and their impact on readability.

## Design constraints

- Preserve the approved IRIQODE visual direction and palette unless a tested change is proposed.
- Do not introduce excessive glow, decorative gradients, or noisy accents.
- Keep adjacent syntax roles distinguishable.
- Never modify the Nacre repository as part of IRIQODE work.
- Do not add third-party artwork without checking its license and attribution requirements.

## Commit style

Use concise conventional commit messages, for example:

- `feat: add semantic token mappings`
- `fix: improve inactive tab contrast`
- `docs: document icon asset provenance`
- `test: validate theme contribution schema`
