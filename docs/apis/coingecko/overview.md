---
id: overview
title: CoinGecko API — Overview
slug: /apis/coingecko/overview
sidebar_position: 1
---

# CoinGecko API Overview

The CoinGecko API provides cryptocurrency market data — including prices, market cap, trading volume, and coin metadata.  

This sample demonstrates best practices for documenting data-heavy APIs: a task-first quick start, clear pagination rules, and improved guidance where the official docs are often confusing.

---

## Why I Rewrote These Docs

When reviewing the official CoinGecko docs, I noticed recurring pain points:

- **Overwhelming parameter lists** — no guidance on which fields matter for common tasks.  
- **Pagination hidden** — `per_page` and `page` rules are scattered across endpoints.  
- **Rate limits unclear** — developers often hit HTTP 429 without knowing why.  
- **Root URL confusion** — Free and Pro endpoints use different domains, but this isn’t always surfaced clearly.  

**My goal in this rewrite is to:**
- Provide task-first quick starts that get results in under 2 minutes.  
- Surface pagination and rate limits up front.  
- Keep parameters minimal and contextual (required vs optional).  
- Defer error handling to the [Endpoints & Reference](./reference) section, where developers actually need it.

---

## Getting Started

**Base URLs:**
- Free plan: `https://api.coingecko.com/api/v3`  
- Pro plan: `https://pro-api.coingecko.com/api/v3`  

### Authentication

- **Free endpoints** require no API key.  
- **Pro endpoints** require an API key in the `x-cg-pro-api-key` header.  

### Rate Limits

- Free: ~50 requests per minute.  
- Pro: up to 300 requests per minute (depending on tier).  

If you exceed these, you’ll receive **HTTP 429 Too Many Requests**.  
For full error responses and recovery guidance, see the [Reference](./reference).

---

## Quick Start 

Retrieve the current Bitcoin price in USD:

```bash
curl "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
```
**Expected Response**
```json
{
  "bitcoin": { "usd": 43021 }
}
```
> Prefer a GUI? Download the Postman Collection or view the OpenAPI schema.

## Pagination
Most list endpoints use `page` and `per_page`:
```bash 
curl "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=50&page=2"
```
- `per_page`: max 250. Requests above this return only 250.
- `page`: starts at 1. Beyond the last page → empty array.
- Results are sorted by market cap desc by default.

## What’s Next
- See Endpoints & Reference for detailed parameter table, error handling, and developer tests.