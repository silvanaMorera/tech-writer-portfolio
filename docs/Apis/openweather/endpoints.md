---
id: endpoints
title: OpenWeather — Endpoints & Reference
slug: /apis/openweather/endpoints
sidebar_position: 2
---

# Endpoints & Reference

This section defines query parameters, response schema, errors, quotas, and versioning notes.  
It directly addresses developer pain points around location rules, error discoverability, and API version stability.

---

## Common Rules

- **Auth:** include `appid` as a query parameter on every request.  
- **Format:** responses are JSON.  
- **Units:**  
  - `standard` (Kelvin)  
  - `metric` (°C)  
  - `imperial` (°F)  
- **Localization:** set `lang` to an ISO 639-1 code (`en`, `es`, `fr`).  

**Location selector (must use one of):**
- `q` (city, e.g. `London,UK`)  
- `lat` + `lon` (coordinates)  
- `id` (city ID)  
- `zip` (e.g., `94040,us`)  

> Pain point addressed: The original docs scatter these rules. Here they’re consolidated, with a constraint: *exactly one location method must be supplied.*

---

## GET `/data/2.5/weather`

Returns current weather for a single location.

### Query Parameters

| Name     | Type    | Required | Description |
|----------|---------|----------|-------------|
| `q`      | string  | one of   | City name, optionally with country (`Paris,FR`). |
| `lat`    | number  | one of   | Latitude, e.g., `51.51`. |
| `lon`    | number  | one of   | Longitude, e.g., `-0.13`. |
| `id`     | number  | one of   | City ID. |
| `zip`    | string  | one of   | ZIP and country code, e.g., `94040,us`. |
| `appid`  | string  | ✓        | API key. |
| `units`  | enum    | optional       | `standard` \| `metric` \| `imperial`. |
| `lang`   | string  | optional         | ISO code for localization, e.g., `es`, `fr`. |

---

### Example Request

```bash
curl "https://api.openweathermap.org/data/2.5/weather?q=Tokyo&units=metric&appid=$OPENWEATHER_API_KEY"
```

## Example Response (trimmed)
```json
{
  "coord": { "lon": 139, "lat": 35 },
  "weather": [
    { "id": 801, "main": "Clouds", "description": "few clouds", "icon": "02d" }
  ],
  "main": {
    "temp": 28.1,
    "feels_like": 30.0,
    "humidity": 65,
    "pressure": 1012
  },
  "wind": { "speed": 4.6, "deg": 220 },
  "name": "Tokyo"
}
```
### Error Handling

| Code | Meaning                         | Resolution                                   |
| ---- | ------------------------------- | -------------------------------------------- |
| 401  | Unauthorized (invalid key)      | Verify your API key and usage tier.          |
| 404  | Not found (city not recognized) | Check spelling or use `City,Country` format. |
| 429  | Too many requests (rate limit)  | Lower request rate or upgrade plan.          |

> Pain point addressed: Instead of burying errors in a separate page, they’re here where developers actually encounter them.

### Quotas & Limits 
- **Free tier**: 60 calls per minute, 1,000,000 calls per month. 
- **Note on versioning**: One Call v2.5 is deprecated; use v3.0 for advanced forecasts.
  - v3.0 requires credit card details, even for free usage.
  - Breaking changes are possible; check migration guides.
  
> Pain point addressed: Developers were surprised when integrations broke after v2.5 → v3.0. This section surfaces quota/version caveats proactively.