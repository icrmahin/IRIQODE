# IRIQODE

**A spectral dark theme for Visual Studio Code.**

IRIQODE explores futuristic surrealism, iridescent color, and dark digital minimalism. Its visual identity is built around a quiet near-black workspace, a layered interface, and a carefully organized spectral syntax palette.

> **Project status:** Design specification established. Implementation has not started.

---

## 1. Design vision

### Core visual language

- **Futuristic surrealism:** imaginative, experimental, slightly mysterious, and technologically advanced.
- **Iridescent aesthetics:** a broad spectrum of coral, orange, rose, pink, violet, indigo, electric blue, and cyan.
- **Dark digital minimalism:** deep charcoal foundations with controlled illumination and restrained decoration.
- **Fluid color behavior:** colors transition through a coherent spectrum rather than relying on one dominant accent.
- **Precision:** strong hierarchy, readable syntax, deliberate spacing, and consistent interaction states.

The theme should feel atmospheric and expressive without becoming cyberpunk, mechanical, noisy, or excessively glossy.

### Visual principles

- Keep the editor background quiet and deeply dark.
- Use spectral colors to communicate syntax meaning, not as random decoration.
- Preserve strong contrast between token categories.
- Prefer crisp geometry and recognizable icon silhouettes.
- Use subtle borders, restrained highlights, and carefully layered surfaces.
- Avoid excessive glow, gradients, and visual effects that compete with code.

---

## 2. Color system

### 2.1 Workbench foundation

| Role | Color | Hex |
|---|---|---|
| Editor background | Deep near-black | `#090B10` |
| Sidebar / base surface | Dark charcoal | `#11151D` |
| Elevated surface | Raised charcoal | `#171C26` |
| Borders / separators | Muted dark slate | `#252936` |
| Selection | Muted violet-blue | `#30344A` |
| Primary foreground | Soft white | `#E8EAF0` |

The interface uses a **layered dark** model: the editor is the deepest surface; sidebars, tabs, panels, and menus become progressively lighter.

### 2.2 Spectral palette

| Spectrum position | Color | Hex |
|---|---|---|
| Coral | Warm coral | `#FF806B` |
| Rose | Soft rose | `#F39A86` |
| Pink | Iridescent pink | `#E995B9` |
| Violet | Soft violet | `#C18BDF` |
| Indigo | Electric indigo | `#9294F5` |
| Blue | Electric blue | `#73AFFF` |
| Cyan | Spectral cyan | `#64D3DB` |

The spectrum should feel fluid and balanced. No single hue should dominate the entire theme.

### 2.3 Supporting syntax colors

| Role | Hex |
|---|---|
| Keyword violet | `#A58BFF` |
| Function blue | `#72C9FF` |
| String pink | `#E6A5C7` |
| Number amber | `#F2B879` |
| Type cyan | `#64D9DC` |
| Operator cool white | `#C5CAD6` |
| Comment muted slate | `#737C8D` |
| JSX tag coral | `#FF8B75` |

These are the initial design values. Contrast and token behavior must be validated in the actual VS Code renderer before release.

---

## 3. Syntax highlighting specification

### 3.1 Variable color flow

Variables use a **continuous spectral progression across semantic roles**:

| Variable role | Initial color |
|---|---|
| Local variables | `#FF806B` |
| Parameters | `#F39A86` |
| Properties | `#E995B9` |
| Constants | `#C18BDF` |
| Destructured variables | `#9294F5` |
| Other identifiers | `#73AFFF` |
| Type-linked identifiers | `#64D3DB` |

**Technical constraint:** VS Code theme token foregrounds are solid colors. Standard TextMate and semantic-token theme rules cannot render a true multi-stop gradient inside a single identifier. IRIQODE will express the continuous-flow concept through a progression of colors across variable roles, not a literal gradient within each word.

Semantic token scopes must be tested against the language servers and grammars available in VS Code. Where a language does not expose a reliable semantic distinction, use sensible TextMate fallbacks.

### 3.2 Core token mapping

| Token | Color | Hex |
|---|---|---|
| `export` | Violet | `#A58BFF` |
| `default` | Pink | `#E995B9` |
| `function` | Electric blue | `#72C9FF` |
| Strings | Soft pink | `#E6A5C7` |
| Numbers | Warm amber | `#F2B879` |
| Types / interfaces | Cyan | `#64D9DC` |
| Operators | Cool white | `#C5CAD6` |
| Comments | Muted slate | `#737C8D` |
| JSX tags | Coral | `#FF8B75` |

Keywords such as `export`, `default`, and `function` must remain visually distinct; do not collapse them into one generic keyword color.

### 3.3 Initial language coverage

Prioritize consistent highlighting for:

- TypeScript and JavaScript
- TSX and JSX
- HTML
- CSS, SCSS, and related stylesheets
- JSON and JSONC
- Python
- Markdown
- Shell scripts

Additional languages can be added after the core palette and token hierarchy are stable.

---

## 4. Workbench and UI specification

### 4.1 Surface hierarchy

1. **Editor:** deepest near-black surface (`#090B10`).
2. **Sidebar and base panels:** dark charcoal (`#11151D`).
3. **Tabs, menus, and elevated panels:** raised charcoal (`#171C26`).
4. **Borders and separators:** subtle slate (`#252936`).

Avoid unnecessary outlines. Use surface contrast and restrained separators to establish hierarchy.

### 4.2 Component behavior

| Component | Design direction |
|---|---|
| Activity bar | Dark, minimal; spectral active-state indicator |
| Sidebar / Explorer | Charcoal surface; clear file and folder hierarchy |
| Tabs | Subtle active-tab distinction; restrained inactive states |
| Editor groups | Deep near-black; minimal separators |
| Status bar | Elevated dark surface; concise spectral accents |
| Terminal | Same deep background and coherent syntax palette |
| Panels | Layered charcoal surfaces |
| Search | Clear match highlights without excessive brightness |
| Quick input / autocomplete | Elevated surface; strong selected-item contrast |
| Selection | Muted violet-blue |
| Cursor | Luminous coral |
| Focus states | Visible, controlled spectral emphasis |
| Errors | Controlled red |
| Warnings | Amber |
| Success | Cyan |

All states—active, inactive, selected, focused, disabled, hovered, error, and warning—must be designed and tested. Do not rely on color alone when the UI provides other state indicators.

---

## 5. Icon system

### 5.1 Foundation and separation

Nacre's existing file and product icon artwork is the visual foundation. IRIQODE must use **separate copied/adapted assets**. Do not modify the Nacre repository or its original assets.

Before copying assets, inspect the source repository and confirm applicable licensing and attribution requirements.

### 5.2 Icon principles

- Sharp geometric construction and crisp silhouettes.
- Recognizable file-type identities; do not replace familiar symbols merely to make them look futuristic.
- Spectral accents applied consistently and selectively.
- Folder bodies may use the active icon variant's accent color.
- Embedded folder sub-icons retain their multicolor artwork.
- Keep product icons recognizable and visually coherent.
- Avoid unnecessary gradients, glow, and ornamental details.
- Icons must remain legible at their actual VS Code display sizes.

The initial visual concepts are direction references, not final production assets. Actual Nacre artwork must be inspected before the icon set is implemented.

---

## 6. Quality and acceptance criteria

The design is ready for implementation review when:

- Code remains readable during extended coding sessions.
- Adjacent syntax categories are distinguishable without looking chaotic.
- TypeScript, JavaScript, JSX/TSX, CSS, JSON, HTML, and Python have coherent highlighting.
- The variable-role spectrum feels continuous while preserving semantic clarity.
- Workbench surfaces read as one layered system.
- Active, inactive, focused, selected, and disabled states are clear.
- Errors, warnings, and success states remain recognizable.
- Icons are legible at small sizes and preserve file-type recognition.
- Contrast is checked in the actual VS Code UI, not only in palette mockups.
- IRIQODE can be installed and used independently of Nacre.

---

## 7. Implementation roadmap

### Phase 0 — Design specification

- [x] Fix the IRIQODE identity and visual direction.
- [x] Establish the layered dark workbench approach.
- [x] Define the initial spectral palette.
- [x] Define variable-role color progression and syntax roles.
- [x] Establish the workbench and icon principles.
- [ ] Validate exact colors and contrast in VS Code.

### Phase 1 — Repository and extension foundation

- [ ] Create the standalone VS Code theme extension.
- [ ] Establish extension metadata, theme contribution, and project structure.
- [ ] Keep all implementation and assets independent from Nacre.
- [ ] Document asset provenance and licensing.

### Phase 2 — Theme implementation

- [ ] Implement workbench colors.
- [ ] Implement TextMate token rules.
- [ ] Implement semantic-token rules where supported.
- [ ] Add language-specific fallbacks.
- [ ] Test editor and workbench states.

### Phase 3 — Icon implementation

- [ ] Inspect Nacre's source icon assets and licensing.
- [ ] Copy approved assets into the IRIQODE project.
- [ ] Adapt folder geometry and spectral variants.
- [ ] Preserve recognizable file and product glyphs.
- [ ] Test icon legibility and consistency.

### Phase 4 — Validation and refinement

- [ ] Test representative projects and languages.
- [ ] Review contrast, readability, and visual hierarchy.
- [ ] Fix inconsistent token scopes and UI states.
- [ ] Review icons at native VS Code sizes.
- [ ] Capture screenshots for final visual review.

### Phase 5 — Packaging and release

- [ ] Configure extension packaging.
- [ ] Build and install a local VSIX for testing.
- [ ] Prepare complete documentation and screenshots.
- [ ] Decide on Marketplace publication only after validation.

---

## 8. Project boundaries

- IRIQODE is a separate project and a separate VS Code extension.
- Nacre remains unchanged.
- Reuse of Nacre artwork means copying/adapting approved assets, not sharing a mutable implementation.
- No production code, theme JSON, or icon assets are considered complete yet.
- The palette in this document is the initial specification and may be adjusted only through deliberate visual validation.

---

## 9. Repository status

This repository currently contains the design plan only. Implementation begins after the specification is translated into the extension structure.

**Project:** IRIQODE  
**Platform:** Visual Studio Code  
**Category:** Dark color theme and icon theme  
**Design direction:** Futuristic surrealism · Iridescent spectral color · Layered dark minimalism  
**Status:** Planning complete; implementation pending
