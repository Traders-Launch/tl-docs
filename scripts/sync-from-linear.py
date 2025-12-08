#!/usr/bin/env python3
"""
TL Docs Sync Agent

Syncs documentation from Linear to the public docs site.
Runs as a scheduled job to keep docs updated.

Usage:
    python3 sync-from-linear.py [--dry-run]
"""

import os
import json
import subprocess
import argparse
from datetime import datetime
from pathlib import Path

# Configuration
LINEAR_API_TOKEN = os.environ.get("LINEAR_API_TOKEN")
DOCS_REPO_PATH = Path(__file__).parent.parent
DOCS_PATH = DOCS_REPO_PATH / "docs"
CHANGELOG_PATH = DOCS_REPO_PATH / "changelog"

# Linear document IDs to sync (map to local paths)
# These are documents marked for public sync in Linear
SYNC_CONFIG = {
    # Format: "linear_doc_id": "local_path"
    # Add documents here as they're created in Linear
    # Example:
    # "f188aa09-5107-4c8f-8f65-846877c63c62": "getting-started/overview.md",
}

# Project IDs for changelog entries
CHANGELOG_PROJECTS = {
    "14e27bd4-359f-4100-b9e0-5d2a75b5e2d7": "Trading Platform",  # Trading Infrastructure
}


def run_linear_query(query: str, variables: dict = None) -> dict:
    """Execute a Linear GraphQL query."""
    import httpx

    response = httpx.post(
        "https://api.linear.app/graphql",
        headers={
            "Authorization": LINEAR_API_TOKEN,
            "Content-Type": "application/json",
        },
        json={"query": query, "variables": variables or {}},
        timeout=30,
    )
    response.raise_for_status()
    return response.json()


def fetch_linear_document(doc_id: str) -> dict:
    """Fetch a document from Linear by ID."""
    query = """
    query GetDocument($id: String!) {
        document(id: $id) {
            id
            title
            content
            updatedAt
        }
    }
    """
    result = run_linear_query(query, {"id": doc_id})
    return result.get("data", {}).get("document")


def fetch_completed_issues(project_id: str, since_days: int = 7) -> list:
    """Fetch recently completed issues for changelog."""
    query = """
    query GetCompletedIssues($projectId: ID!, $filter: IssueFilter) {
        project(id: $projectId) {
            issues(filter: $filter) {
                nodes {
                    id
                    title
                    description
                    completedAt
                    labels {
                        nodes {
                            name
                        }
                    }
                }
            }
        }
    }
    """
    # Note: Linear filter syntax may need adjustment
    result = run_linear_query(query, {
        "projectId": project_id,
        "filter": {"completedAt": {"gte": f"-{since_days}d"}}
    })
    return result.get("data", {}).get("project", {}).get("issues", {}).get("nodes", [])


def sync_document(doc_id: str, local_path: str, dry_run: bool = False) -> bool:
    """Sync a single document from Linear to local file."""
    doc = fetch_linear_document(doc_id)
    if not doc:
        print(f"  ❌ Document {doc_id} not found")
        return False

    full_path = DOCS_PATH / local_path

    # Add frontmatter
    content = f"""---
title: {doc['title']}
last_updated: {doc['updatedAt'][:10]}
---

{doc['content']}
"""

    if dry_run:
        print(f"  📄 Would update: {local_path}")
        print(f"     Title: {doc['title']}")
        return True

    full_path.parent.mkdir(parents=True, exist_ok=True)
    full_path.write_text(content)
    print(f"  ✅ Updated: {local_path}")
    return True


def generate_changelog_entry(issues: list, project_name: str, dry_run: bool = False) -> bool:
    """Generate a changelog entry from completed issues."""
    if not issues:
        return False

    today = datetime.now().strftime("%Y-%m-%d")
    filename = f"{today}-{project_name.lower().replace(' ', '-')}-updates.md"

    # Group by label
    features = []
    fixes = []
    improvements = []

    for issue in issues:
        labels = [l["name"].lower() for l in issue.get("labels", {}).get("nodes", [])]
        entry = f"- {issue['title']}"

        if "bug" in labels:
            fixes.append(entry)
        elif "feature" in labels:
            features.append(entry)
        else:
            improvements.append(entry)

    content = f"""---
slug: {today}-{project_name.lower().replace(' ', '-')}
title: {project_name} Updates
tags: [release]
---

# {project_name} Updates - {today}

"""

    if features:
        content += "## New Features\n\n" + "\n".join(features) + "\n\n"
    if improvements:
        content += "## Improvements\n\n" + "\n".join(improvements) + "\n\n"
    if fixes:
        content += "## Bug Fixes\n\n" + "\n".join(fixes) + "\n\n"

    content += "<!-- truncate -->\n"

    if dry_run:
        print(f"  📄 Would create changelog: {filename}")
        print(f"     {len(features)} features, {len(improvements)} improvements, {len(fixes)} fixes")
        return True

    full_path = CHANGELOG_PATH / filename
    if full_path.exists():
        print(f"  ⏭️  Changelog already exists: {filename}")
        return False

    full_path.write_text(content)
    print(f"  ✅ Created changelog: {filename}")
    return True


def commit_and_push(dry_run: bool = False) -> bool:
    """Commit and push changes to git."""
    os.chdir(DOCS_REPO_PATH)

    # Check for changes
    result = subprocess.run(["git", "status", "--porcelain"], capture_output=True, text=True)
    if not result.stdout.strip():
        print("\n📭 No changes to commit")
        return False

    if dry_run:
        print("\n📦 Would commit and push changes")
        return True

    subprocess.run(["git", "add", "-A"], check=True)
    subprocess.run([
        "git", "commit", "-m",
        f"docs: Auto-sync from Linear ({datetime.now().strftime('%Y-%m-%d')})\n\n"
        "🤖 Generated with [Claude Code](https://claude.com/claude-code)"
    ], check=True)
    subprocess.run(["git", "push"], check=True)
    print("\n✅ Changes committed and pushed")
    return True


def main():
    parser = argparse.ArgumentParser(description="Sync docs from Linear")
    parser.add_argument("--dry-run", action="store_true", help="Preview changes without applying")
    args = parser.parse_args()

    print("🔄 TL Docs Sync Agent")
    print(f"   Mode: {'Dry run' if args.dry_run else 'Live'}")
    print()

    if not LINEAR_API_TOKEN:
        print("❌ LINEAR_API_TOKEN not set")
        return 1

    changes_made = False

    # Sync documents
    if SYNC_CONFIG:
        print("📚 Syncing documents from Linear...")
        for doc_id, local_path in SYNC_CONFIG.items():
            if sync_document(doc_id, local_path, args.dry_run):
                changes_made = True
    else:
        print("📚 No documents configured for sync")

    # Generate changelog from completed issues
    print("\n📝 Checking for changelog updates...")
    for project_id, project_name in CHANGELOG_PROJECTS.items():
        try:
            issues = fetch_completed_issues(project_id)
            if generate_changelog_entry(issues, project_name, args.dry_run):
                changes_made = True
        except Exception as e:
            print(f"  ⚠️  Error fetching issues for {project_name}: {e}")

    # Commit and push
    if changes_made:
        commit_and_push(args.dry_run)

    print("\n✨ Sync complete!")
    return 0


if __name__ == "__main__":
    exit(main())
