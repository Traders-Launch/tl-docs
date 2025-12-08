# TL Docs Scripts

## sync-from-linear.py

Syncs documentation from Linear to the public docs site.

### Setup

```bash
# Requires httpx
pip install httpx

# Set Linear API token
export LINEAR_API_TOKEN="your-token"
```

### Usage

```bash
# Preview changes (dry run)
python3 scripts/sync-from-linear.py --dry-run

# Apply changes
python3 scripts/sync-from-linear.py
```

### Configuration

Edit `SYNC_CONFIG` in the script to map Linear document IDs to local file paths:

```python
SYNC_CONFIG = {
    "linear-doc-id": "getting-started/overview.md",
}
```

Edit `CHANGELOG_PROJECTS` to specify which projects generate changelog entries:

```python
CHANGELOG_PROJECTS = {
    "project-id": "Project Name",
}
```

### Scheduled Execution

Add to cron for daily sync:

```bash
0 6 * * * cd /path/to/tl-docs && LINEAR_API_TOKEN=xxx python3 scripts/sync-from-linear.py
```

Or use a LaunchAgent for macOS.
