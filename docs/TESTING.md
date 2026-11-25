# Testing

Automated checks verify the extension manifest and theme JSON. They do not prove that the theme looks correct in the VS Code renderer.

## Automated validation

```bash
npm run validate
```

## Package test

```bash
npm install --global @vscode/vsce
vsce package --no-dependencies
```

Install the resulting VSIX in a clean VS Code profile:

1. Open the Extensions view.
2. Open the view's overflow menu.
3. Choose **Install from VSIX…**.
4. Select the generated package.
5. Run **Preferences: Color Theme** and select **IRIQODE**.

## Visual review

Open the samples in `tests/fixtures/syntax/` and inspect:

- TypeScript and JavaScript declarations, parameters, properties, functions, types, and constants.
- TSX/JSX tags, attributes, expressions, and embedded strings.
- HTML tags and attributes.
- CSS selectors, properties, values, and colors.
- JSON keys, strings, numbers, and booleans.
- Python functions, classes, decorators, and comments.
- Markdown headings, emphasis, links, and code.
- Shell commands, flags, strings, and variables.

Also inspect the workbench: Explorer, tabs, terminal, search, quick input, notifications, panels, selection, focus, hover, errors, warnings, and disabled states.

Record screenshots and unresolved visual issues before calling the theme release-ready.
