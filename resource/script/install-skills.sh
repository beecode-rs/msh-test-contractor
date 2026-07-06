#!/usr/bin/env bash
# Install contract-testing-ts skills into global ~/.claude/skills/
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SKILLS_DIR="$(cd "$SCRIPT_DIR/../../.claude/skills" && pwd)"

mkdir -p ~/.claude/skills
ln -sf "$SKILLS_DIR/contract-testing-ts" ~/.claude/skills/contract-testing-ts
