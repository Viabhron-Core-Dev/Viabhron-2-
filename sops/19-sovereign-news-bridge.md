# 📜 SOP-19: Sovereign News Ingestion & Resonance

## 🎯 Purpose
To provide a standardized procedure for ingesting urgent global/local news and filtering it for resonance with the user's current context and missions.

## 📋 Procedures

### 1. Source Aggregation
*   **Bridge Activation**: The **Sovereign News Bridge** extension aggregates data from pre-configured RSS feeds, News APIs, and STI (Threat Intel) streams.
*   **Sanitization**: The **Linguistic Engineer** sanitizes the incoming text to remove bias and clickbait.

### 2. Resonance Filtering
*   **Context Matching**: The **Librarian** cross-references the news items with the active nodes in the **Neural Archive**.
*   **Urgency Scoring**: The **Sentinel** assigns an urgency score (1-10) based on potential impact on the user's security or active missions.

### 3. Delivery & Action
*   **VAA Update**: Items with high resonance are pushed to the "Urgent News" tab in the **Modular VAA Shell**.
*   **CMVAA Briefing**: The **Cloud Manager (CMVAA)** receives a silent briefing of high-urgency items to proactively adjust OS strategy.

## 💻 Sovereign-Script (SS) Block: News Query
```json
{
  "action": "query_news",
  "params": {
    "category": "technology",
    "resonance_threshold": 0.7,
    "limit": 5
  }
}
```
