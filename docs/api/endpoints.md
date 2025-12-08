---
sidebar_position: 2
title: Endpoints
---

# API Endpoints

## Accounts

### List Accounts

Get all accounts for the authenticated user.

```http
GET /accounts
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "acc_123",
      "type": "evaluation",
      "size": 50000,
      "status": "active",
      "balance": 51250.00,
      "created_at": "2024-01-10T08:00:00Z"
    }
  ]
}
```

### Get Account

Get details for a specific account.

```http
GET /accounts/:id
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "acc_123",
    "type": "evaluation",
    "size": 50000,
    "status": "active",
    "balance": 51250.00,
    "profit_target": 3000,
    "current_profit": 1250,
    "daily_loss_limit": 1000,
    "trailing_drawdown": 2500,
    "drawdown_threshold": 48750,
    "trading_days": 8,
    "min_trading_days": 5,
    "created_at": "2024-01-10T08:00:00Z"
  }
}
```

---

## Trades

### List Trades

Get trade history for an account.

```http
GET /accounts/:id/trades
```

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `start_date` | string | ISO 8601 date (optional) |
| `end_date` | string | ISO 8601 date (optional) |
| `symbol` | string | Filter by symbol (optional) |
| `limit` | integer | Max results (default 100) |
| `offset` | integer | Pagination offset |

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "trd_456",
      "account_id": "acc_123",
      "symbol": "ESH4",
      "side": "buy",
      "quantity": 2,
      "entry_price": 4850.25,
      "exit_price": 4855.50,
      "pnl": 525.00,
      "commission": 8.40,
      "net_pnl": 516.60,
      "opened_at": "2024-01-15T14:30:00Z",
      "closed_at": "2024-01-15T15:45:00Z"
    }
  ],
  "meta": {
    "total": 156,
    "limit": 100,
    "offset": 0
  }
}
```

---

## Statistics

### Get Performance Stats

Get performance statistics for an account.

```http
GET /accounts/:id/stats
```

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `period` | string | `day`, `week`, `month`, `all` |

**Response:**

```json
{
  "success": true,
  "data": {
    "total_trades": 156,
    "winning_trades": 98,
    "losing_trades": 58,
    "win_rate": 62.8,
    "total_pnl": 1250.00,
    "avg_win": 85.50,
    "avg_loss": -62.30,
    "profit_factor": 1.85,
    "largest_win": 450.00,
    "largest_loss": -180.00,
    "avg_trade_duration": "45m",
    "most_traded_symbol": "ESH4"
  }
}
```

---

## Daily Summary

### Get Daily Summaries

Get daily P&L summaries.

```http
GET /accounts/:id/daily
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "date": "2024-01-15",
      "starting_balance": 50500.00,
      "ending_balance": 51250.00,
      "pnl": 750.00,
      "trades": 12,
      "win_rate": 66.7
    }
  ]
}
```

---

## Webhooks

### Subscribe to Events

Register a webhook to receive real-time updates.

```http
POST /webhooks
```

**Request Body:**

```json
{
  "url": "https://your-server.com/webhook",
  "events": ["trade.closed", "account.status_changed", "daily.summary"]
}
```

**Available Events:**

| Event | Description |
|-------|-------------|
| `trade.opened` | A new trade was opened |
| `trade.closed` | A trade was closed |
| `account.status_changed` | Account status changed (passed, failed, etc.) |
| `daily.summary` | End of day summary |
| `payout.requested` | Payout was requested |
| `payout.processed` | Payout was processed |
