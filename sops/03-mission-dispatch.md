# 📜 SOP-03: Mission Dispatch

## 🎯 Purpose
The standard workflow for executing tasks and ratifying results.

## 📋 Procedures
1.  **Mission Briefing**: Define the mission intent and success criteria.
2.  **Agent Selection**: The `cloud-manager` selects the most qualified agent for the task.
3.  **Sandbox Provisioning**: Create an isolated `parallel-forge` environment for execution.
4.  **Execution & Monitoring**: The `sentinel` monitors the agent's actions in real-time.
5.  **Ratification**: The Chairman reviews the results and ratifies the mission completion.

## 💻 Sovereign-Script (SS) Block
```json
{
  "action": "dispatch_mission",
  "params": {
    "intent": "security_audit",
    "target": "/extensions/connectors/",
    "agent_id": "adversarial-auditor"
  }
}
```
