# IRIQODE for Neovim

The same IRIQODE color system, ported for Neovim and LazyVim.

## LazyVim installation

Create `lua/plugins/iriqode.lua` in your LazyVim configuration:

```lua
return {
  {
    "icrmahin/IRIQODE",
    name = "iriqode",
    lazy = false,
    priority = 1000,
    config = function()
      vim.cmd.colorscheme("iriqode")
    end,
  },
}
```

Then run:

```vim
:Lazy sync
```

Restart Neovim. The colorscheme is named `iriqode`.

## What is matched

- The exact IRIQODE editor background, surfaces, borders, selection, and foreground.
- The same coral, rose, pink, violet, indigo, blue, cyan, and amber syntax colors.
- Variable, parameter, property, constant, function, and type roles.
- Tree-sitter captures and LSP semantic-token highlight groups.
- Diagnostics, Git signs, completion menus, Telescope, file explorers, Lazy, Mason, and common LazyVim UI groups.
- ANSI terminal colors.

## Important parity note

Neovim runs inside a terminal, so its surrounding window chrome, tab bar, title bar, and terminal UI are controlled by your terminal emulator and Neovim UI plugins. IRIQODE matches the editor and common plugin surfaces; it cannot recolor the terminal emulator's own decorations like a native VS Code workbench theme.

For the closest result, enable true color in your terminal and use a terminal palette matching IRIQODE's ANSI colors. The colorscheme enables `termguicolors` itself.

## Files

- `colors/iriqode.lua` — Neovim colorscheme entry point.
- `lua/iriqode/init.lua` — highlight definitions and plugin integrations.
- `lua/iriqode/palette.lua` — canonical IRIQODE color values.

The VS Code theme remains the source of truth for the palette. This Neovim port mirrors its semantic mapping; Neovim and Tree-sitter may expose different syntax captures depending on parser and language server support.
