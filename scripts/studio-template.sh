#!/usr/bin/env bash

set -euo pipefail

readonly BASELINE_SUBJECT="chore: save studio template baseline"

usage() {
  cat <<'EOF'
Usage:
  ./scripts/studio-template.sh show
  ./scripts/studio-template.sh branch <new-branch>
  ./scripts/studio-template.sh copy <target-directory>

Commands:
  show                 Print the saved Studio template baseline commit.
  branch <new-branch>  Create and switch to a new branch from the baseline.
  copy <target-dir>    Export the baseline into a clean directory without .git.
EOF
}

die() {
  printf 'Error: %s\n' "$*" >&2
  exit 1
}

repo_root() {
  git rev-parse --show-toplevel 2>/dev/null || die "Run this script inside the Aerflow repository."
}

find_baseline_commit() {
  local root
  root="$(repo_root)"

  git -C "$root" log --all --grep="^${BASELINE_SUBJECT}$" --format='%H' -n 1
}

require_baseline_commit() {
  local commit
  commit="$(find_baseline_commit)"

  if [[ -z "$commit" ]]; then
    die "No Studio template baseline commit was found."
  fi

  printf '%s\n' "$commit"
}

show_baseline() {
  local root commit
  root="$(repo_root)"
  commit="$(require_baseline_commit)"

  git -C "$root" show -s --format='Studio template baseline: %H%nDate: %cs%nSubject: %s' "$commit"
}

create_branch() {
  local root commit branch_name
  root="$(repo_root)"
  commit="$(require_baseline_commit)"
  branch_name="${1:-}"

  [[ -n "$branch_name" ]] || die "Provide a branch name."

  if git -C "$root" show-ref --verify --quiet "refs/heads/$branch_name"; then
    die "Branch '$branch_name' already exists."
  fi

  git -C "$root" switch -c "$branch_name" "$commit"
}

copy_baseline() {
  local root commit target_dir
  root="$(repo_root)"
  commit="$(require_baseline_commit)"
  target_dir="${1:-}"

  [[ -n "$target_dir" ]] || die "Provide a target directory."

  if [[ -e "$target_dir" && ! -d "$target_dir" ]]; then
    die "Target path '$target_dir' already exists and is not a directory."
  fi

  if [[ -e "$target_dir" && -n "$(find "$target_dir" -mindepth 1 -maxdepth 1 2>/dev/null)" ]]; then
    die "Target directory '$target_dir' must not exist or must be empty."
  fi

  mkdir -p "$target_dir"
  git -C "$root" archive "$commit" | tar -x -C "$target_dir"

  printf 'Studio template copied to %s\n' "$target_dir"
}

main() {
  local command="${1:-}"

  case "$command" in
    show)
      show_baseline
      ;;
    branch)
      shift
      create_branch "${1:-}"
      ;;
    copy)
      shift
      copy_baseline "${1:-}"
      ;;
    -h|--help|help|"")
      usage
      ;;
    *)
      die "Unknown command: $command"
      ;;
  esac
}

main "$@"
