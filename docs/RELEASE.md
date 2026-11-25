# Release process

IRIQODE is not ready for Marketplace publication until the theme has been validated in VS Code.

## Pre-release checklist

- [ ] Update the version in `package.json`.
- [ ] Update `CHANGELOG.md`.
- [ ] Run `npm run validate`.
- [ ] Package with `vsce package --no-dependencies`.
- [ ] Install the VSIX in a clean VS Code profile.
- [ ] Inspect all supported syntax and workbench states.
- [ ] Review screenshots and accessibility/contrast issues.
- [ ] Confirm asset provenance and license notices.
- [ ] Create a GitHub release with release notes and the tested VSIX.

## Publishing

Marketplace publishing is deliberately excluded from the automated workflow. It requires an explicit release decision and publisher credentials. Never commit publishing tokens or personal access tokens to the repository.
