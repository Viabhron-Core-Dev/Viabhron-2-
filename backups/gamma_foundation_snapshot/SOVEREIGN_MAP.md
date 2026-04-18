# 🗺️ VIABHRON SOVEREIGN REPOSITORY MAP

This document defines the roles and synchronization protocols for the Viabhron MAOS repository ecosystem.

---

## 🏛️ Repository Hierarchy

### 1. 🧪 The Gamma Lab (Current Environment)
*   **Role**: Primary R&D and Prototyping Sandbox.
*   **Purpose**: This is where new extensions, agent protocols, and architectural shifts are first engineered and tested.
*   **Status**: Experimental / Bleeding Edge.
*   **Sync Protocol**: Receives "Accredited" updates from the Beta Mirror; exports "Ratified" features back to the ecosystem.

### 2. 🏛️ The Beta Mirror (Accredited Repository)
*   **URL**: `https://github.com/Viabhron-Core-Dev/Viabhron-by-vian`
*   **Role**: The Sovereign Source of Truth.
*   **Purpose**: Serves as the stable, accredited version of the OS. All core modifications must be pushed here to be considered "Ratified."
*   **Status**: Stable / Accredited.
*   **Sync Protocol**: Acts as the master mirror for all Gamma instances.

---

## 🔄 Synchronization Workflow

1.  **Engineering**: Features are built and tested in the **Gamma Lab**.
2.  **Ratification**: Once a feature is stable, it is documented in the `EXPORT_MANIFEST.md`.
3.  **Export**: The Chairman pushes the ratified code from the Gamma Lab (or local dev) to the **Beta Mirror**.
4.  **Mirroring**: Other Gamma instances (like this one) perform a "Full Sync" from the Beta Mirror to stay aligned with the sovereign vision.

---

## 🛡️ Integrity & Governance

*   **Accreditation**: The **entire repository** (all source code, configuration, and documentation) residing in the Beta Mirror is considered "Accredited" for production-level agent missions.
*   **Sovereignty**: This mapping ensures that the AI remains a tool of the Chairman, following the established path from R&D to Ratification.
