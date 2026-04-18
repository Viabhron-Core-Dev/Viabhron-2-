# 🌲 Viabhron Forest Hierarchy: The Sovereign Extension Substrate

This document codifies the 8-division structural architecture of the Viabhron OS extensions, known as the **Forest Hierarchy**. This hierarchy ensures a modular, headless, and protocol-first approach to OS expansion.

---

## 🏛️ The 8 Divisions of the Vault HQ

| Division | Forest Metaphor | Purpose | Folder Path |
| :--- | :--- | :--- | :--- |
| **Engine** | **Heartwood** | Core Kernel logic and transpilation. | `/extensions/engine/` |
| **Connectors** | **Roots** | External bridges and 3rd-party API gateways. | `/extensions/connectors/` |
| **Modules** | **Trunk** | Resident OS organs and core services. | `/extensions/modules/` |
| **Tools** | **Branches** | Specialized utility substrates and task-specific tools. | `/extensions/tools/` |
| **Agents** | **Inhabitants** | Technical DNA and manifests for the modular workforce. | `/extensions/agents/` |
| **Skills** | **Leaves** | Self-built capabilities (Actions & Recipes). | `/extensions/skills/` |
| **MCP** | **Mycelium** | Standardized Model Context Protocol servers. | `/extensions/mcp/` |
| **Patches** | **Sap** | Efficiency, performance, and metabolic optimizations. | `/extensions/patches/` |

---

## 📂 Division Details

### 1. 🪵 Engine (Heartwood)
*   **Purpose**: The "Brain Stem" of the OS. Logic that governs how the OS expands and executes.
*   **Contents**: `ss-transpiler`, `seo` (Engine Orchestrator), `turboquant`.
*   **Constraint**: High-clearance only.

### 2. 🔌 Connectors (Roots)
*   **Purpose**: High-level bridges to the external world.
*   **Contents**: `x402` (Payments), `substack` (Publishing), `arduino` (IoT), `luma-uni-1` (Vision Provider).
*   **Constraint**: Requires "Ignition Keys" (API Keys).

### 3. 📦 Modules (Trunk)
*   **Purpose**: Persistent OS services and "Resident" organs.
*   **Contents**: `identity-8004`, `security-radar`, `agent-registry`, `smonitor-protocol`.
*   **Constraint**: Must be "Resident" (running in the private cloud).

### 4. 🛠️ Tools (Branches)
*   **Purpose**: Specialized utilities used by agents to perform specific tasks.
*   **Contents**: `refactor-specialist`, `vision-lab`, `deep-execution`.
*   **Constraint**: Usually "Contractor" level clearance.

### 5. 👥 Agents (Inhabitants)
*   **Purpose**: The "Workforce DNA." Machine-readable manifests for every agent role.
*   **Contents**: `cloud-manager`, `fiscal-comptroller`, `sentinel`, `symphony-conductor`.
*   **Constraint**: Defines role levels (1-5) and brain types.

### 6. 🍃 Skills (Leaves)
*   **Purpose**: Atomic capabilities sprouted by agents.
*   *   `/skills/actions/`: Functional TypeScript code (The Hands).
*   *   `/skills/recipes/`: Declarative SS manifests (The Memory).

### 7. 🍄 MCP (Mycelium)
*   **Purpose**: Standardized protocol-based tool access (Model Context Protocol).
*   **Contents**: `google-drive-mcp`, `sqlite-mcp`, `github-mcp`.
*   **Constraint**: Decouples tool logic from the LLM brain.

### 8. 💧 Patches (Sap)
*   **Purpose**: Substrate-level optimizations.
*   **Contents**: `efficiency-patches`, `metabolic-hotfixes`.

---

## 🛡️ Structural Protocols

### 1. Headless Architecture
The `/extensions/` directory is **Logic-Only**. All UI components (React/TSX) must reside in `src/components/Extensions/`. The extensions are configured via `manifest.json`.

### 2. Naming Convention
All extension and agent folders must use **`kebab-case`** (e.g., `identity-8004`, `refactor-specialist`).

### 3. The Vault Index
Every division folder MUST contain a `README.md` acting as a **Registry Table**. This allows the **Cloud Manager** and the Chairman to audit the OS's capabilities at a glance.

### 4. Manifest Integrity
The `"mission"` field in every `manifest.json` must exactly match the `"Purpose"` defined in `BLUEPRINTS.md`.

---

## 📜 Protocol Layer: `/sops/`
The root `/sops/` folder contains the **Genesis Manuals** for the OS. These are the "Instincts" that guide the workforce in executing complex, multi-stage procedures.

---

**Ratified by**: The Sovereign Chairman
**Date**: 2026-04-13
**Status**: 🟢 Architecture Formalized
