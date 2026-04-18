# 📜 SOP-02: Agent Accreditation

## 🎯 Purpose
To safely onboard and authorize new agent roles within the OS.

## 📋 Procedures
1.  **Role Selection**: Identify the required role from the `/extensions/agents/` registry.
2.  **Vibe Alignment**: Verify that the agent's DNA matches the current OS mission.
3.  **Permission Scoping**: Use the `agent-registry` to grant the minimum required permissions.
4.  **Accreditation**: Issue a temporary 8004 passport to the agent for the duration of its mission.

## 💻 Sovereign-Script (SS) Block
```json
{
  "action": "accreditate_agent",
  "params": {
    "role_id": "sentinel",
    "clearance_level": 2,
    "duration": "permanent"
  }
}
```
