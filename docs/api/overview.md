---
sidebar_position: 1
title: API Overview
---

# Traders Launch API

The Traders Launch API allows you to programmatically access account data, trading history, and performance metrics.

## Base URL

```
https://api.traderslaunch.com/v1
```

## Authentication

All API requests require authentication using an API key.

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
  https://api.traderslaunch.com/v1/accounts
```

### Getting Your API Key

1. Log in to your Traders Launch dashboard
2. Navigate to Settings > API
3. Click "Generate API Key"
4. Copy and securely store your key

:::caution
Your API key grants access to your account data. Never share it or commit it to version control.
:::

## Rate Limits

- **Standard:** 100 requests per minute
- **Burst:** 10 requests per second

Rate limit headers are included in all responses:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1699574400
```

## Response Format

All responses are JSON with consistent structure:

```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "timestamp": "2024-01-15T10:30:00Z",
    "request_id": "req_abc123"
  }
}
```

### Error Responses

```json
{
  "success": false,
  "error": {
    "code": "INVALID_API_KEY",
    "message": "The provided API key is invalid or expired"
  }
}
```

## Common Error Codes

| Code | Description |
|------|-------------|
| `INVALID_API_KEY` | API key is missing or invalid |
| `RATE_LIMITED` | Too many requests |
| `NOT_FOUND` | Resource not found |
| `VALIDATION_ERROR` | Invalid request parameters |
| `SERVER_ERROR` | Internal server error |

## SDKs

Official SDKs coming soon:
- JavaScript/TypeScript
- Python

## Need Help?

- Check our [API endpoints](/api/endpoints)
- Contact support at api@traderslaunch.com
