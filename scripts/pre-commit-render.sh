#!/bin/bash
# Pre-commit hook: auto-render changed Quarto posts that have execution enabled.
#
# Toggle on:  git config hooks.renderPosts true
# Toggle off: git config hooks.renderPosts false
#             (or: git config --unset hooks.renderPosts)
#
# Install:
#   ln -sf ../../scripts/pre-commit-render.sh .git/hooks/pre-commit
#
set -e

# Check toggle — skip if not explicitly enabled
ENABLED=$(git config --get hooks.renderPosts 2>/dev/null || echo "false")
if [ "$ENABLED" != "true" ]; then
  exit 0
fi

# Find staged .qmd files that have changed
CHANGED_QMDS=$(git diff --cached --name-only --diff-filter=ACM | grep '\.qmd$' || true)

if [ -z "$CHANGED_QMDS" ]; then
  exit 0
fi

echo "[pre-commit] Checking for executable posts to re-render..."

for QMD in $CHANGED_QMDS; do
  # Only process files that have execute: enabled: true
  if ! grep -q 'enabled: true' "$QMD" 2>/dev/null; then
    continue
  fi

  POST_DIR=$(dirname "$QMD")
  VENV="$POST_DIR/.venv"

  # Skip if no venv exists for this post
  if [ ! -f "$VENV/bin/activate" ]; then
    echo "[pre-commit] WARN: $QMD has execution enabled but no .venv found at $VENV — skipping render"
    continue
  fi

  echo "[pre-commit] Rendering $QMD..."

  # Activate venv, render, deactivate
  (
    source "$VENV/bin/activate"
    quarto render "$QMD"
    deactivate
  )

  # Stage the updated freeze output
  FREEZE_DIR="site/_freeze"
  if [ -d "$FREEZE_DIR" ]; then
    git add "$FREEZE_DIR"
  fi

  # Stage the rendered post itself in case quarto modified it
  git add "$QMD"

  echo "[pre-commit] Done rendering $QMD"
done
