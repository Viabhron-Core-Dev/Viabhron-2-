# 📜 SOP-15: Sovereign Pulse Feed (SPF)

## 🎯 Purpose
To provide a standardized, standalone intelligence stream that synthesizes personal, security, and metabolic data into glanceable "Pulses" for agents and clients.

## 📋 Procedures

### 1. Data Orchestration
*   **Source Binding**: The SPF binds to the **Workspace Bridge**, **STI Bridge**, **Metabolic Secretary**, and **Fiscal Comptroller**.
*   **Fragment Collection**: It collects data "Fragments" from these sources based on the user's current context.

### 2. Synthesis & Compression
*   **Linguistic Processing**: Uses the **Linguistic Bridge** to compress raw data into high-fidelity "Pulses."
*   **Resonance Scoring**: Prioritizes information based on its relevance to active missions and security substrate.

### 3. Pulse Distribution (The Pulse API)
*   **UI Pulse**: Generates visual cards for the dashboard and mobile VAA.
*   **Voice Pulse**: Generates natural language scripts for the **Ambient Sounder**.
*   **Agent Pulse**: Generates JSON manifests for other agents (e.g., the **Librarian**) to process.

### 4. Privacy & Bulkhead Enforcement
*   **Local Synthesis**: All synthesis occurs within the user's private cloud environment.
*   **Zero-Leakage**: No personal data is sent to external synthesis providers unless explicitly ratified by the Chairman.

## 💻 Sovereign-Script (SS) Block
```json
{
  "action": "generate_pulse",
  "params": {
    "sources": ["workspace", "security", "metabolic"],
    "format": "briefing",
    "resonance_threshold": 7,
    "output_channels": ["ui", "voice", "agent"]
  }
}
```
