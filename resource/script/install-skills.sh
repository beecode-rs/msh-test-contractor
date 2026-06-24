#!/usr/bin/env bash
# Install test-contractor skills into global ~/.claude/skills/
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SKILLS_DIR="$(cd "$SCRIPT_DIR/../../.claude/skills" && pwd)"

mkdir -p ~/.claude/skills
ln -sf "$SKILLS_DIR/test-contractor" ~/.claude/skills/test-contractor
