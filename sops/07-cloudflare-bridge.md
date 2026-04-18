# SOP-07: The Cloudflare Sovereign Bridge

## 🏛️ Purpose
To provide the Viabhron OS with a structured, agentic interface for global cloud orchestration using the Cloudflare `cf` CLI. This allows agents to provision, manage, and monitor edge infrastructure with zero-trust security and fiscal accountability.

## 🛠️ Protocol

### 1. The "cf" Schema Enforcement
*   **Strict Naming**: All infrastructure resources must follow the `cf` CLI's strict naming conventions.
*   **Schema Validation**: Before any command is executed, the `Cloud Architect` agent must validate the parameters against the Cloudflare HTTP operation schema.

### 2. Multi-Account Portfolio Management
*   **Account Sharding**: The OS supports multiple Cloudflare accounts (Personal, Business, Research).
*   **Isolation**: Resources in different accounts must remain logically and securely isolated.
*   **Accountant Role**: The **Procurement Officer** manages the "Ignition Keys" and metabolic health for each account in the portfolio.

### 3. Late Binding & Mission Dispatch
*   **Just-in-Time Binding**: Agents do not bind to a specific account until the moment of execution.
*   **Selection Logic**: The OS selects the optimal account based on:
    *   Metabolic Budget (Remaining free tier/credits).
    *   Mission Priority (Latency vs. Cost).
    *   Security Tier (Sensitive data stays in "Sovereign" accounts).

### 4. User Choice & Ratification
*   **Deployment Menu**: Every non-automated deployment must present a "User Choice" menu to the Chairman.
*   **Ratification Gate**: The Chairman must ratify the selected account and estimated cost before the `Cloud Architect` provisions resources.

### 5. Deployment Workflow
*   **Simulation First**: Use the **MOSS Local Explorer** to simulate the deployment locally before pushing to the global edge.
*   **Atomic Rollbacks**: Every deployment must generate a "Reversion Script" that can undo the changes if the **Sentinel** detects a security anomaly.

## 🛡️ Guardrails
*   **Secret Isolation**: API keys and tokens must never be stored in agent memory or chat logs. They must be managed via the OS's secure environment variables.
*   **Zero-Trust Access**: All deployed Workers must default to "Access Restricted" mode, requiring 8004 Identity accreditation for entry.
*   **Metabolic Breaker**: If a deployment causes a spike in API costs, the **Metabolic Breaker** will automatically pause the Worker and alert the Chairman.

## 📊 Success Metrics
*   **Provisioning Latency**: Time from natural language intent to live edge deployment.
*   **Schema Compliance**: Percentage of commands that pass validation on the first attempt.
*   **Fiscal Accuracy**: Alignment between estimated and actual cloud costs.
