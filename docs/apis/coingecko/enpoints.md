---
id: reference
title: CoinGecko API — Endpoints & Reference
slug: /apis/coingecko/reference
sidebar_position: 2
---

# CoinGecko API — Endpoints & Reference

This section contains **task-first recipes** with parameter tables, pagination rules, and error handling.  
Unlike the overview, which stays high-level, this page surfaces the **details developers actually need when implementing**: parameters, rate limits, and full error examples.

---

## Task: Get top coins by market cap

```bash
curl "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1"
```
**Parameters**
| Name          | Type   | Required | Description                                                                          |
| ------------- | ------ | -------- | ------------------------------------------------------------------------------------ |
| `vs_currency` | string | ✓        | Currency code (e.g. `usd`, `eur`).                                                   |
| `order`       | string | x       | Sort order (`market_cap_desc`, `volume_desc`, `id_asc`). Default: `market_cap_desc`. |
| `per_page`    | int    | x        | Results per page (max **250**). Above 250 returns only 250.                          |
| `page`        | int    | x        | Page index (starts at 1). Beyond last page → empty array.                            |

**Expected Response (Truncated)**
``` json
[
  {
    "id": "bitcoin",
    "symbol": "btc",
    "name": "Bitcoin",
    "current_price": 43021,
    "market_cap": 845302394829,
    "total_volume": 35192839201
  }
]
```
**Error Example**
```json
{
  "status": 429,
  "error": "You have exceeded your request limit. Please wait and try again."
}
```
## Task: Get historical price for a coin
``` bash 
curl "https://api.coingecko.com/api/v3/coins/bitcoin/history?date=30-08-2024"
```
**Parameters**
| Name   | Type   | Required | Description                           |
| ------ | ------ | -------- | ------------------------------------- |
| `id`   | string | ✓       | Coin ID (e.g. `bitcoin`, `ethereum`). |
| `date` | string | ✓        | Format: `dd-mm-yyyy`.                 |

**Response**
```json
{
  "id": "bitcoin",
  "symbol": "btc",
  "market_data": {
    "current_price": { "usd": 25831 },
    "market_cap": { "usd": 500239128193 }
  }
}
```
**Edge Case**
- If the date is outside available history, returns 404:
```json
{ "status": 404, "error": "coin not found" }
```

## Task: Get ERC-20 token price (Ethereum contract)
```bash
curl "https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=0xdac17f958d2ee523a2206206994597c13d831ec7&vs_currencies=usd"
```
**Parameters**
| Name                 | Type   | Required | Description                                                   |
| -------------------- | ------ | -------- | ------------------------------------------------------------- |
| `contract_addresses` | string |   ✓     | ERC-20 contract address. Multiple supported, comma-separated. |
| `vs_currencies`      | string | ✓       | One or more currency codes.                                   |

**Response**
```json
{
  "0xdac17f958d2ee523a2206206994597c13d831ec7": { "usd": 1.0 }
}
```
**Pagination rules**
- `per_page`: max 250. Requests above this are capped.
- `page`: starts at 1. Beyond last page = [].
- Default sort order: market cap desc.
> Tip: Always check for empty arrays when paginating over dynamic data.

## Error handling

Errors may appear as JSON or HTML (timeouts). Always check the Content-Type header.
**Common errors**
| Status | Meaning                         | Example                                                               |
| ------ | ------------------------------- | --------------------------------------------------------------------- |
| 400    | Bad request (invalid parameter) | `{ "status": 400, "error": "invalid vs_currency" }`                   |
| 404    | Resource not found              | `{ "status": 404, "error": "coin not found" }`                        |
| 429    | Rate limit exceeded             | `{ "status": 429, "error": "You have exceeded your request limit." }` |
| 500    | Internal error                  | `{ "status": 500, "error": "unexpected server error" }`               |

**Recommended Handling**
- Retry with **exponential backoff** for 429/5xx.
- Cache responses (60s+) to reduce duplicate calls.
- Validate parameters locally to avoid 400s.

## Data freshness & reliability
- Market data updates every 1–2 minutes.
- Historical endpoints provide daily/hourly granularity depending on the call.
- Some data is cached; expect slight lag during peak hours.
- Timeouts may return HTML; use retries + content checks.

## Versioning
- Current version: v3.
- Backward compatibility generally maintained.
- Breaking changes and endpoint deprecations are announced on the [CoinGecko changelog](https://www.coingecko.com/en/api).
