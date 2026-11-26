# Release process

IRIQODE is not ready for Marketplace publication until the theme has been validated in VS Code.

## Pre-release checklist

- [ ] Update the version in `package.json`.
- [ ] Update `CHANGELOG.md`.
- [ ] Initialize the pinned submodule with `git submodule update --init --recursive`.
- [ ] Run `npm run validate`.
- [ ] Package with `vsce package --no-dependencies`.
- [ ] Install the VSIX in a clean VS Code profile.
- [ ] Inspect all supported syntax and workbench states.
- [ ] Review screenshots and accessibility/contrast issues.
- [ ] Confirm asset provenance and license notices.
- [ ] Create a GitHub release with release notes and the tested VSIX.

## Publishing

Marketplace publishing is deliberately excluded from the automated workflow. It requires an explicit release decision and publisher credentials. Never commit publishing tokens or personal access tokens to the repository.


## Build the VSIX from GitHub Actions

1. Open the repository's **Actions** tab.
2. Select **Build IRIQODE VSIX**.
3. Choose **Run workflow** and select the branch to package.
4. Download the `iriqode-vsix` artifact from the completed run.
5. Extract the `.vsix` and install it with **Extensions: Install from VSIX…**.

This workflow only builds and uploads the VSIX artifact. It does not publish to the Visual Studio Marketplace or create a GitHub Release.
