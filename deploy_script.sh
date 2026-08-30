#!/usr/bin/env bash
#
# deploy_script.sh — OurDreams deploy pipeline
#
#   1. Commit & push source to https://github.com/MesonX-ai/ourdreams.git
#   2. Build the static site (next build  ->  out/)
#   3. Upload new/changed files to GoDaddy hosting over FTP using the
#      "OurDreams" entry in ftp-config.json, uploading only files whose
#      MD5 checksum differs from the last deploy (.deploy-checksums.json).
#
#   IMPORTANT: the upload target is the EXISTING public_html/ourdreams.us
#   folder on the hosting server. This script NEVER creates public_html or
#   ourdreams.us — if that folder is missing, the deploy aborts. Only
#   sub-folders inside ourdreams.us (e.g. new _next/ asset dirs) are created.
#
# Usage:
#   ./deploy_script.sh                  # commit (auto message) + push + build + upload
#   ./deploy_script.sh -m "my message"  # custom commit message
#   ./deploy_script.sh --dry-run        # build + show what would upload; no push/upload
#   ./deploy_script.sh --skip-git       # build + upload only (skip commit/push)

set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$PROJECT_DIR"

COMMIT_MSG=""
DRY_RUN=false
SKIP_GIT=false

while [[ $# -gt 0 ]]; do
  case "$1" in
    -m|--message) COMMIT_MSG="$2"; shift 2 ;;
    --dry-run)    DRY_RUN=true; shift ;;
    --skip-git)   SKIP_GIT=true; shift ;;
    -h|--help)    grep '^#' "$0" | sed 's/^# \{0,1\}//'; exit 0 ;;
    *) echo "Unknown option: $1 (see --help)"; exit 1 ;;
  esac
done

log()  { printf '\033[1;34m[OurDreams]\033[0m %s\n' "$*"; }
ok()   { printf '\033[1;32m[OurDreams]\033[0m %s\n' "$*"; }
fail() { printf '\033[1;31m[OurDreams]\033[0m %s\n' "$*" >&2; exit 1; }

# ---------------------------------------------------------------- #
# 1. Git: commit & push                                            #
# ---------------------------------------------------------------- #
if [[ "$SKIP_GIT" == true ]]; then
  log "Skipping git step (--skip-git)"
else
  if [[ "$DRY_RUN" == true ]]; then
    log "[dry-run] Would commit and push to origin (https://github.com/MesonX-ai/ourdreams.git)"
  else
    log "Committing and pushing source to GitHub..."
    git add -A
    if git diff --cached --quiet; then
      log "Nothing new to commit."
    else
      MSG="${COMMIT_MSG:-deploy: $(date '+%Y-%m-%d %H:%M:%S')}"
      git commit -m "$MSG"
    fi
    git push origin HEAD
    ok "Source pushed to GitHub."
  fi
fi

# ---------------------------------------------------------------- #
# 2. Build static site                                             #
# ---------------------------------------------------------------- #
log "Building static site (next build -> out/)..."
npm run build
[[ -f out/index.html ]] || fail "Build did not produce out/index.html — aborting."
ok "Static build complete."

# ---------------------------------------------------------------- #
# 3. Upload changed files via FTP (checksum-based)                 #
# ---------------------------------------------------------------- #
log "Uploading new/changed files to GoDaddy (public_html/ourdreams.us)..."
ARGS=()
[[ "$DRY_RUN" == true ]] && ARGS+=(--dry-run)
node scripts/ftp-deploy.mjs "${ARGS[@]}"
ok "Deploy finished."
