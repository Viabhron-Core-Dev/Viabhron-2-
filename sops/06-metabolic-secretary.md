# SOP-06: The Metabolic Secretary
**Version:** 1.0.0
**Status:** Hatched
**Lead Agent:** The Librarian / The Fiscal Comptroller

## 🏛️ 1. Purpose
To provide autonomous, background monitoring of external data streams (Email, News, Market Trends) using the OS Heartbeat system, ensuring the Chairman is informed only when "Resonance" is detected.

## 🛠️ 2. Protocol
1.  **Pulse**: Every 60 minutes (configurable), the Heartbeat triggers the Metabolic Secretary.
2.  **Ingest**: The Secretary utilizes the **Workspace Bridge** (Email) and **Web Recon Shield** (News) to fetch latest data.
3.  **Filter**: The Librarian agent analyzes the data against the **Soul Core** (User Preferences).
4.  **Resonate**: If a high-resonance event is found (e.g., a critical email or a relevant news spike), a **Sovereign Notification** is issued.
5.  **Log**: All checks are recorded in the `HeartbeatLog` with an "impact" assessment.

## 🛡️ 3. Guardrails
*   **least-privilege**: The Secretary only has read access to specific folders/feeds.
*   **metabolic-cap**: Daily token usage for background checks is capped at 5% of the total budget.
*   **quiet-mode**: No notifications are issued during "Deep Work" or "Sleep" hours defined in the Soul Core.

---
*Ratified for Gamma-tier autonomous execution.*
