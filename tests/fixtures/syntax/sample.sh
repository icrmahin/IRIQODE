#!/usr/bin/env bash
set -euo pipefail

THEME_NAME="IRIQODE"
VERSION="0.1.0"

printf 'Checking %s (%s)\n' "$THEME_NAME" "$VERSION"
npm run validate
