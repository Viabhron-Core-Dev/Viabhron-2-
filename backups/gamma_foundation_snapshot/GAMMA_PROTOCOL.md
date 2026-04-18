# 📜 THE GAMMA PROTOCOL: Substrate Parity & R&D Governance

This document defines the official procedure for maintaining 1:1 parity between the **Gamma Lab** (R&D) and the **Beta Mirror** (Accredited Source).

---

## 🏛️ 1. The Objective
To ensure that the Gamma Lab remains a perfect "Digital Twin" of the Beta account, allowing for zero-drift testing of new extensions and agentic protocols.

## 🛠️ 2. The "Substrate Swap" Procedure
When a synchronization is triggered, the Gamma Lab substrate is overwritten by the Beta Mirror code, excluding specific environment-unique files.

### A. The Preservation List (DO NOT OVERWRITE)
The following files are unique to the Gamma environment and must be preserved during a swap:
*   `GAMMA_IDEAS.md`: R&D roadmap and experimental concepts.
*   `GAMMA_PROTOCOL.md`: This governance document.
*   `SOVEREIGN_MAP.md`: Repository role and sync mapping.
*   `EXPORT_MANIFEST.md`: The local audit trail for new features.
*   `firebase-applet-config.json`: Local cloud ignition keys.
*   `.env` / `.env.example`: Local environment configurations.

### B. The Overwrite Protocol (FULL SYNC)
All other files and directories are replaced with the latest "Accredited" versions from the Beta Mirror:
*   `/src`: Full Vaa client and Machine Room source code.
*   `/extensions`: The complete library of Hardened Blocks.
*   `package.json`, `tsconfig.json`, `vite.config.ts`: Build and dependency configurations.
*   `Dockerfile`, `server.ts`, `firestore.rules`: Infrastructure and security manifests.

## 🔄 3. The Sync Turn Handshake
1.  **Pull**: Fetch the latest code from `https://github.com/Viabhron-Core-Dev/Viabhron-by-vian`.
2.  **Merge**: Apply the code while respecting the **Preservation List**.
3.  **Reset**: The `EXPORT_MANIFEST.md` is cleared to mark the start of a new R&D cycle.
4.  **Hatch**: New extensions are built in Gamma and logged in the fresh manifest.
5.  **Ratify**: Once tested, the manifest and new code are pushed back to the Beta Mirror.

---
*Ratified by the Chairman for Gamma-tier execution.*
