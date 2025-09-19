---
id: release-2025-09
title: Release Notes – September 2025
sidebar_label: Sept 2025
---

These release notes provide an overview of new features, improvements, and bug fixes included in the September 2025 update.  

---

## New Features
- **Enhanced Authentication Flow**  
  Added support for JWT refresh tokens, reducing login interruptions for developers and end users.  

- **Improved Dashboard Filters**  
  Users can now filter monitoring dashboards by service name, region, and time range.  

---

## Improvements
- **Performance**: Reduced average API response times by 15%.  
- **Accessibility**: Updated UI components to meet WCAG 2.1 standards.  

---

## Bug Fixes
- Fixed an issue where container logs did not display in real time.  
- Resolved a problem with incorrect error codes (`401` vs `403`) when accessing restricted endpoints.  

---

## Known Issues
- Export to CSV may fail for datasets larger than 100k rows. A patch is in progress.  

---

## Upgrade Notes
- Docker images are now published under `v2` tags.  
- If you are using custom Falco rules, ensure they are updated before upgrading.  

---

_Last updated: September 19, 2025_
