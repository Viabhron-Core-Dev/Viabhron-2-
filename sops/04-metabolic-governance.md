# 📜 SOP-04: Metabolic Governance

## 🎯 Purpose
To manage the OS's token budget and ensure metabolic efficiency.

## 📋 Procedures
1.  **Budget Audit**: The `fiscal-comptroller` reviews the daily x402 ledger.
2.  **Efficiency Check**: Identify any "leaky" extensions or agents using the `system-metrics`.
3.  **Limit Setting**: Adjust the daily spending limits based on the current treasury state.
4.  **Patch Application**: Apply `efficiency-patches` to optimize high-cost substrates.

## 💻 Sovereign-Script (SS) Block
```json
{
  "action": "optimize_metabolism",
  "params": {
    "daily_limit": "50.00",
    "currency": "USD",
    "auto_patch": true
  }
}
```
