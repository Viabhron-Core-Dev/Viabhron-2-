# 📜 SOP-09: Sovereign Social Interaction & Sandboxing

## 🎯 Purpose
To enable secure, federated social communication (Chat & Channels) between Viabhron instances while isolating high-risk external data from the OS core.

## 📋 Procedures

### 1. Sovereign URI Generation (The Link)
*   **Identity Mapping**: The **Sovereign Identity Registrar** maps a user's 8004 Identity to a temporary, rotatable Sovereign URI (e.g., `vaa://[encrypted-id]`).
*   **Link Distribution**: The Chairman shares this link as a "Sovereign WhatsApp Number."
*   **Access Control**: Links can be configured with expiration dates or single-use tokens to prevent unauthorized harvesting.

### 2. The Diplomatic Handshake (Inbound)
*   **Bulkhead Interception**: All incoming requests via the Sovereign URI are routed directly to the **Social Sandbox (Bulkhead)**.
*   **Diplomat Triage**: The **Diplomat Agent (Level 3)** performs initial triage:
    *   Verifies the sender's 8004 Accreditation.
    *   Scans for malicious payloads or social engineering patterns.
    *   Sanitizes the message content before presentation.

### 3. Sandboxed Communication (Chat)
*   **Isolated Storage**: Chat logs are stored in a dedicated, encrypted partition within the Social Sandbox, not the primary Soul Core.
*   **Zero-Trust UI**: The Chat UI is rendered as a "Thin Lens" that cannot access system-level APIs (e.g., `x402_treasury`, `blueprint_editor`).
*   **Ratified Export**: Moving data from the Social Sandbox to the OS core (e.g., saving a contact) requires explicit Chairman ratification.

### 4. Sovereign Channels (The Feed)
*   **Edge Hosting**: Public/Semi-private "Statuses" are pushed to a dedicated **Sovereign Edge Node** (Cloudflare R2/D1).
*   **Late-Binding Access**: The AAS manages who can "Pulse" the channel based on the viewer's accreditation level.
*   **Self-Destruct Logic**: Channels can be configured to "Fold" (delete data) automatically after a set period.

## 💻 Sovereign-Script (SS) Block
```json
{
  "action": "initialize_social_sandbox",
  "params": {
    "bulkhead_id": "social-01",
    "isolation_level": "maximum",
    "allowed_agents": ["diplomat-01"]
  }
}
```
