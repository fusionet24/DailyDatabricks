#!/bin/bash
# Usage: ./scripts/setup-post.sh site/tips/Tutorials/databricks-execute-template
# databricks-connect requires Python 3.12
set -e
POST_DIR="$1"
if [ -z "$POST_DIR" ]; then
  echo "Usage: $0 <post-directory>" && exit 1
fi
if [ ! -f "$POST_DIR/requirements.txt" ]; then
  echo "No requirements.txt found in $POST_DIR" && exit 1
fi

# Find Python 3.12 — required by databricks-connect
PYTHON=""
for candidate in python3.12 /opt/miniconda3/bin/python3.12; do
  if command -v "$candidate" &>/dev/null && "$candidate" --version 2>&1 | grep -q "3.12"; then
    PYTHON="$candidate"
    break
  fi
done
if [ -z "$PYTHON" ]; then
  echo "Error: Python 3.12 is required (databricks-connect constraint) but not found." && exit 1
fi
echo "Using $PYTHON ($($PYTHON --version))"

"$PYTHON" -m venv "$POST_DIR/.venv"
source "$POST_DIR/.venv/bin/activate"
pip install --upgrade pip
pip install -r "$POST_DIR/requirements.txt"
echo "Done. Activate with: source $POST_DIR/.venv/bin/activate"
