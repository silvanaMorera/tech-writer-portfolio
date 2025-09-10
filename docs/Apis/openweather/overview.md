---
id: overview
title: OpenWeather API — Overview
slug: /Apis/openweather/overview
---

# OpenWeather API Overview

The **OpenWeather API** provides access to current weather, forecasts, and historical climate data worldwide.  

This sample demonstrates best practices for API documentation: a **task first quickstart**, **clear references**, **integrated error handling**, and **improved guidance** where the official docs are often confusing.

---

## Why I Rewrote These Docs

When reviewing the original OpenWeather docs, I noticed several recurring pain points:

- **Confusing location parameters** — Developers often get duplicate results (e.g., `Lviv`, `Lviv Oblast`, `Lviv village`) with identical coordinates. The docs don’t clarify how to reliably disambiguate cities.  
- **Error handling buried** — The error codes are documented separately, not where developers actually hit them (during requests).  
- **Versioning friction** — The transition from One Call v2.5 to v3.0 broke existing integrations and introduced billing for endpoints that were previously free.

**My goal in this rewrite is to:**
- Provide **clearer location rules** (city, coordinates, zip) with constraints.  
- Integrate **error codes into tutorials and reference** instead of hiding them elsewhere.  
- Call out **versioning and quota concerns up front** so developers avoid surprises.

---

## Getting Started

**Base URL:**  
[openweathermap.org/api](https://openweathermap.org/api)

### Authentication

All requests require an API key.

1. **Create an account** at [openweathermap.org/api](https://openweathermap.org/api).   
2. **Generate an API key** from your account’s **API Keys** page.  
3. **Send the key** as the `appid` query parameter on every request.

> 💡 Tip: Store your key locally to avoid leaking it in terminals or repos:
```bash
export OPENWEATHER_API_KEY="YOUR_API_KEY"
```

### Quick Start 

Retrieve current weather for a city in metric units: 
``` bash
curl "https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=$OPENWEATHER_API_KEY"
```

Expected Response: 
- 200 OK with JSON payload containing main.temp, weather.description, and city metadata.
- See Endpoints & Reference for full schema and error handling. 

### Tutorials 

1. Get Current Weather by City 
``` bash
curl "https://api.openweathermap.org/data/2.5/weather?q=Rome&units=metric&appid=$OPENWEATHER_API_KEY"
```
2. Get 5-Day Forecast by Coordinates
``` bash 
curl "https://api.openweathermap.org/data/2.5/forecast?lat=35&lon=139&units=metric&appid=$OPENWEATHER_API_KEY"
```
3. Get Localized Weather in Spanish
``` bash 
curl "https://api.openweathermap.org/data/2.5/weather?q=Barcelona&units=metric&lang=es&appid=$OPENWEATHER_API_KEY"
```


