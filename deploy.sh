#!/usr/bin/env bash
#
# deploy.sh — Build, commit to GitHub, and deploy OurDreams to GoDaddy via FTP.
#
# Features:
#   - Commits and pushes source to https://github.com/MesonX-ai/ourdreams.git
#   - Builds static export (Next.js output: "export")
#   - Uploads only changed files using MD5 checksum comparison
#   - Deploys into the EXISTING `ourdreams.us` folder in the FTP home on GoDaddy
#     (the FTP home is public_html; override with FTP_REMOTE_DIR if it changes)
#
# Usage:
#   ./deploy.sh                  # full deploy (git + build + ftp)
#   ./deploy.sh --skip-git       # skip git commit/push
#   ./deploy.sh --skip-build     # skip the build step
#   ./deploy.sh --dry-run        # build + show what would be uploaded (no FTP)
#
set -euo pipefail

# ===================================================================
# Configuration
# ===================================================================
PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
BUILD_DIR="${PROJECT_DIR}/out"
GITHUB_REPO="https://github.com/MesonX-ai/ourdreams.git"
CHECKSUM_FILE="${PROJECT_DIR}/.deploy-checksums.json"
DEPLOY_HELPER="${PROJECT_DIR}/scripts/deploy-helper.mjs"

# FTP config — host/credentials pulled from ftp-config.json (the "OurDreams" entry)
FTP_CONFIG="${PROJECT_DIR}/../ftp-config.json"
FTP_HOST="$(node -e "console.log(require('${FTP_CONFIG}').find(e=>e.name==='OurDreams').host)")"
FTP_PORT="$(node -e "console.log(require('${FTP_CONFIG}').find(e=>e.name==='OurDreams').port)")"
FTP_USER="$(node -e "console.log(require('${FTP_CONFIG}').find(e=>e.name==='OurDreams').username)")"
FTP_PASS="$(node -e "console.log(require('${FTP_CONFIG}').find(e=>e.name==='OurDreams').password)")"

# Remote web root on GoDaddy — the FTP user's home IS public_html, and the
# site lives in the existing `ourdreams.us` folder inside it.
# (Env override: FTP_REMOTE_DIR=/some/other/path ./deploy.sh)
FTP_PATH="${FTP_REMOTE_DIR:-ourdreams.us}"

SKIP_GIT=false
SKIP_BUILD=false
DRY_RUN=false

for arg in "$@"; do
  case "$arg" in
    --skip-git)   SKIP_GIT=true ;;
    --skip-build) SKIP_BUILD=true ;;
    --dry-run)    DRY_RUN=true ;;
    -h|--help)
      grep '^#' "$0" | sed 's/^# \{0,1\}//'
      exit 0
      ;;
    *) echo "Unknown option: $arg"; exit 1 ;;
  esac
done

# ===================================================================
# Helpers
# ===================================================================
log()  { printf '\033[1;36m▸\033[0m %s\n' "$*"; }
ok()   { printf '\033[1;32m✓\033[0m %s\n' "$*"; }
warn() { printf '\033[1;33m⚠\033[0m %s\n' "$*"; }
err()  { printf '\033[1;31m✗\033[0m %s\n' "$*" >&2; }

# ===================================================================
# Step 1 — Git commit & push
# ===================================================================
if [[ "$SKIP_GIT" == true ]]; then
  log "Skipping git (--skip-git)"
else
  log "Preparing git repository…"
  cd "$PROJECT_DIR"

  if [[ ! -d .git ]]; then
    git init
    git branch -M main
    git remote add origin "$GITHUB_REPO" 2>/dev/null || git remote set-url origin "$GITHUB_REPO"
    ok "Git repo initialized, remote set to $GITHUB_REPO"
  fi

  git add -A

  if git diff --cached --quiet; then
    warn "No changes to commit."
  else
    git config user.name "OurDreams Deploy"
    git config user.email "deploy@ourdreams.local"

    CHANGED_COUNT="$(git diff --cached --numstat | wc -l | tr -d ' ')"
    COMMIT_MSG="deploy: $(date '+%Y-%m-%d %H:%M:%S') — ${CHANGED_COUNT} files changed"
    git commit -m "$COMMIT_MSG"
    ok "Committed: $COMMIT_MSG"

    git push -u origin main 2>&1 || {
      err "Push failed. Resolve manually and re-run with --skip-git."
      exit 1
    }
    ok "Pushed to $GITHUB_REPO"
  fi
fi

# ===================================================================
# Step 2 — Build static export
# ===================================================================
if [[ "$SKIP_BUILD" == true ]]; then
  log "Skipping build (--skip-build)"
else
  log "Building static export…"
  cd "$PROJECT_DIR"
  npm run build 2>&1 | tail -5

  if [[ ! -d "$BUILD_DIR" ]]; then
    err "Build output not found at $BUILD_DIR"
    exit 1
  fi
  ok "Static export ready in ${BUILD_DIR}"
fi

# ===================================================================
# Step 3 — Compute checksums & find changed files (Node.js helper)
# ===================================================================
log "Computing checksums…"
cd "$PROJECT_DIR"

CHANGED_FILES_RAW="$(node "$DEPLOY_HELPER" diff "$BUILD_DIR" "$CHECKSUM_FILE")"

if [[ -z "$CHANGED_FILES_RAW" ]]; then
  ok "No files changed since last deploy. Nothing to upload."
  exit 0
fi

# Split into array
CHANGED_FILES=()
while IFS= read -r line; do
  [[ -n "$line" ]] && CHANGED_FILES+=("$line")
done <<< "$CHANGED_FILES_RAW"
log "Found ${#CHANGED_FILES[@]} new/changed files to upload"

# ===================================================================
# Step 4 — Dry run
# ===================================================================
if [[ "$DRY_RUN" == true ]]; then
  echo ""
  echo "DRY RUN — would upload these files to ${FTP_PATH}:"
  printf '  %s\n' "${CHANGED_FILES[@]}"
  echo ""
  log "Dry run complete. No files uploaded."
  exit 0
fi

# ===================================================================
# Step 5 — Upload via FTP (only changed files, into existing folder)
# ===================================================================
log "Connecting to FTP ${FTP_HOST}:${FTP_PORT} → ${FTP_PATH}…"

if ! command -v lftp >/dev/null 2>&1; then
  err "lftp is required but not installed. Install with: brew install lftp"
  exit 1
fi

# Generate lftp script that uploads only changed files
LFTP_SCRIPT="$(node "$DEPLOY_HELPER" lftp-script "$BUILD_DIR" "$FTP_HOST" "$FTP_PORT" "$FTP_USER" "$FTP_PASS" "$FTP_PATH" "${CHANGED_FILES[@]}")"

log "Uploading ${#CHANGED_FILES[@]} files…"
echo "$LFTP_SCRIPT" | lftp 2>&1 | grep -v "^ "| grep -v "^cd " | head -30 || true

ok "Upload complete — ${#CHANGED_FILES[@]} files deployed to ${FTP_PATH}"

# ===================================================================
# Step 6 — Save checksums for next deploy
# ===================================================================
node "$DEPLOY_HELPER" save "$BUILD_DIR" "$CHECKSUM_FILE"
ok "Saved checksums to ${CHECKSUM_FILE}"

echo ""
ok "Deploy finished successfully!"
echo ""
echo "  Source:   ${GITHUB_REPO}"
echo "  Target:   ftp://${FTP_HOST}${FTP_PATH}"
echo "  Files:    ${#CHANGED_FILES[@]} uploaded"
echo "  Time:     $(date '+%Y-%m-%d %H:%M:%S')"
