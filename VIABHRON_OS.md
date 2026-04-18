# 🛡️ VIABHRON OS: Master Blueprint

**Creator:** Schuyler Vianney Lewis
**Collaborator:** Google AI Studio

**Product Vision:** A private, portable Multi-Agent Operating System (MAOS) that lives in the user's own cloud infrastructure. It is a **"Business-in-a-Box"**—a turnkey, sovereign corporate kernel that is easy to pitch, impossible to seize, and 100% private.

---

## 0. The Corporate Charter (The Prime Directive)
The Charter is the "Constitutional Layer" of the OS. It defines the **Evolutionary Purpose** and the **Antifragile Growth** mindset that prevents the system from becoming a rigid bureaucracy.

*   **Sovereignty First**: The OS exists to serve the Chairman's intent while maintaining absolute data privacy.
*   **The Sovereign Generalist**: Viabhron is designed to be a private "Everything App." It aims to perform almost any task other AIs can do (coding, research, creative, analysis) but within a 100% private, user-owned substrate.
*   **Passkey Sovereignty**: Access to the OS kernel is secured via passwordless biometric passkeys or physical security keys, ensuring the "Business-in-a-Box" is impossible to seize even if cloud credentials are compromised.
*   **Evolutionary Purpose**: The system is not a machine, but a living organism. Agents are encouraged to "sense" the environment and propose optimizations to the **SOP Registry**.
*   **Antifragile Growth**: The OS is designed to get stronger from stress. Every security violation or efficiency failure is a "Learning Event" that triggers a kernel patch.
*   **Intrapreneurship Protocol**: The **Forge** acts as an incubator where agents can experiment with new **Sovereign-Scripts** without disrupting production workflows.
*   **Chairman Oversight**: The OS is a **Constitutional Monarchy**. The agents manage the "Government" (The Business), but the **Chairman (The User)** holds the ultimate veto and vision.

---

## 1. The Virtual Computer (The Substrate)
The "Virtual Computer" is the total environment, turning cloud infrastructure into a functional, private office. It lives entirely in the cloud substrate (Firebase, Cloud Run, Drive).

### 1.1 The Skeleton (Hardened Task Sandboxing Engine)
The Skeleton provides the physical and logical isolation for all work in the OS.
*   **Physical Isolation (OpenSandbox)**: Every task/tab is an ephemeral, isolated Docker/K8s container. Malicious or "Dangerous" actions are contained within the sandbox.
*   **The "Tab" Illusion**: To the human user, these sandboxes appear as "Tabs." To the AI, they are independent execution cells.
*   **Real-time State Sync**: Powered by Firebase `onSnapshot` to keep the UI in sync with the cloud "Brain."

### 1.2 The Extension Manager (The Toolbox)
A structured registry that manages the capabilities and power levels of the OS.
*   **The Toolbox**: A collection of six distinct extension types: [DONE]
    *   **Normal Skills**: General-purpose AI capabilities (e.g., Global Pulse, Summarization).
    *   **Recipe Skills**: Artisanal blueprints for specific, high-fidelity outputs (e.g., Doc Forge, Editorial PPT Maker).
    *   **Tools**: Lightweight utility functions (e.g., PDF Extractor, Web Search).
    *   **Connectors**: Secure bridges to external data/services (e.g., Gmail, Slack, Hugging Face).
    *   **MCP Servers**: Standardized data/tool integration layers.
        *   **Gemini Live Pulse**: Real-time access to Gemini API documentation to prevent stale training data hallucinations.
        *   **Google Workspace Bridge**: CLI-based management of Docs, Sheets, and Drive data.
    *   **Modules**: Large-scale UI/UX features or complex workflows (e.g., Agent Terminal, Workflow Canvas).
        *   **Gaming Focused Extensions**: A dedicated sidebar section for private entertainment and simulations. [DONE]
        *   **Testing Extensions (The Staging Area)**: A sandbox section where newly "Hatched" extensions are tested in isolation before being promoted to production. [DONE]
        *   **Extra Processor (Edge Intelligence)**: A specialized section for offloading heavy compute tasks to edge providers like Cloudflare. [DONE]
            *   **Consultant Knockout Window**: A dedicated, high-density workspace for configuring edge logic (Workers, R2, Tunnels).
            *   **Resident AI Oracle**: A built-in chatbot within the knockout window that provides pre-configured, Viabhron-optimized code and step-by-step setup guidance.
        *   **Branches & Mission (Distributed Nodes)**: A management layer for the "Vine" architecture, allowing the OS to spread across multiple devices and clouds. [DONE]
            *   **The Forest Hierarchy (The Leaf Ecosystem)**: A multi-tiered component architecture for intent-based expansion.
                *   **SS Blocks (Sovereign Script Blocks)**: Fundamental, malleable units of intent.
                *   **Organelles / Holons**: Grouped functional subunits.
                *   **Cells**: Graftable mini-apps and specialized agent units that act as independent "Branch Offices."
            *   **Mission Scoping**: Branches are deployed with specific "Missions" (e.g., Research, Security, Coding) rather than the full OS kernel.
            *   **Resource Sharing (Internal Market)**: Branches can "Contract" tasks to each other based on available hardware firepower.
        *   **Gmail Sovereign Node (The Comms Relay)**: A specialized agentic node for managing multiple email identities through a single private interface. [DONE]
            *   **Multi-Account Orchestration**: Supports multiple Gmail accounts, each appearing as a separate thread within the "Gmail Relay" contact.
            *   **Granular Permission Scoping**: Users choose between **Sentinel Mode** (Read-Only) and **Executive Mode** (Read/Write) for each account during late-binding setup.
            *   **Sovereign Sanitization**: The Resident AI automatically removes tracking pixels, suspicious links, and malicious payloads from incoming emails.
            *   **Sanitization Briefing**: The agent provides a small "Sanitization Report" (e.g., "Removed 2 tracking pixels and 1 suspicious link") for every processed email.
        *   **Viabhronic Loader**: A PWA-based "Super App" shell (like a J2ME Loader) that hosts and toggles "Mini-Apps" or "Sovereign Gems". It provides a local, offline-first presence for your private tools. [DONE]
        *   **Sovereign Gems**: Private, agentic applications (similar to GPTs/Gems) built within the OS. They leverage the **SOP Registry** and **Neural Archive** to provide specialized intelligence without compromising privacy. [DONE]
        *   **Sovereign Creative Studio**: A visual IDE for orchestrating multi-step creative workflows via a spatial canvas.
            *   **Project VOID Integration**: Physics-aware video object erasure and scene manipulation, enabling professional-grade video editing within the private substrate.
            *   **Sovereign Sound Forge**: A music generation tool for composing high-fidelity audio, loops, and cinematic scores.
            *   **Sovereign Image Studio**: A basic image generation tool for rapid visual synthesis and asset creation.
            *   **Sovereign Video Suite**: A basic video generation tool for short-form animation and cinematic sequences.
            *   **The Sovereign Transmuter**: A specialized extension for importing web apps from GitHub and transmuting them into **Moss** (Sovereign Script mini-apps).
            *   **Moss System**: A management layer for "Moss" colonies, handling active growth, dormancy (Seed Vault), and re-hydration.
        *   **Corporate Kernel (Enterprise Automation)**: A high-clearance substrate for production-scale agentic deployments.
            *   **UiPath & AA Connectors**: Native integration for agents to operate as primary users of enterprise automation platforms.
            *   **Production-Scale Missions**: Enables the deployment of "Sovereign Cells" (branches) specifically for large-scale business logic (e.g., Finance Reconciliation, IT Support).
            *   **Ratification Gates**: The Chairman acts as the "Mission Commander," ratifying high-level agentic strategies rather than executing individual tasks.
            *   **Hugging Face Hub**: Access to open-source models, datasets, and Spaces.
            *   **Open Router**: A single API gateway for accessing diverse LLMs (Gemini, Claude, GPT).
            *   **Ollama (Local Substrate)**: Integration for running private models on local hardware.
            *   **Google Edge AI Gallery**: Access to on-device models and optimized AI components.
    *   **Sovereign x402 Payment Gateway**: An autonomous, consumption-based billing system that allows the OS to pay for its own AI services using a "Pooled Treasury" model.
    *   **8004 Sovereign Identity Protocol**: An on-chain digital passport system that provides agents with verifiable, accredited identities on blockchain networks (TRON, BNB, Ethereum).
*   **Substrate Protocols**:
    *   **OpenClaw**: A self-hosted agent framework for private, sovereign execution.
    *   **Model Context Protocol (MCP)**: Native support for the industry-standard tool-to-agent communication layer.
    *   **Visual Web Navigation (MolmoWeb)**: A "Seeing" agent protocol that navigates websites via screenshots, enabling interaction with complex, dynamic, or obfuscated web apps without parsing HTML.
*   **Universal AI Port**: Support for importing external capabilities (Claude Skills, MCP Servers, Hugging Face Models/Spaces) into the private substrate. [DONE]
    *   **External Skills**: Default to "Artisanal Wrapper" (Head Agent prompt overlay) with optional "Raw Mode."
    *   **MCP Servers**: Default to "User-Brought" (External URL) with "Sovereign Bridge" (WebSocket/HTTPS proxying).
    *   **Hugging Face Hub**: Default source for open-source models, datasets, and Spaces. Supports both Public (no key) and Private (User Token) access.
    *   **Agent "Hatching" Protocol (Internal Staff)**: For agents with source code (GitHub/Source). Cloned into a Forge Sandbox, containerized on Cloud Run, and wrapped in a Sovereign prompt. 100% private.
    *   **Agent "Accreditation" Protocol (External Consultants)**: For cloud-hosted agents (OpenAI, Genspark, Mistral, Claude). Established via an **Ambassador Bridge** (API/OAuth). Reports via a **Secure Intercom** (Webhook Receiver).
    *   **Sovereign Intercom Bridge (Mobile Command)**: A private, encrypted webhook receiver that bridges the OS to Telegram or Discord. Enables the Chairman to oversee live **Forge** sessions and issue ratified commands from any mobile device. [DONE]
    *   **Mistral Sovereign Forge (Intelligence Manufacturing)**: A specialized extension for fine-tuning frontier-grade models using proprietary data from the Neural Archive. It allows the OS to "Forge" custom brains that are 100% private and Charter-compliant.
    *   **Substrate Deployment (Helm/Gradle)**: Advanced deployment capabilities for "Hatching" enterprise-grade software. Supports Helm Chart registries and Java Gradle dependency scanning for secure, fleet-scale infrastructure management.
    *   **External Intelligence Plugins (Consultants)**:
        *   **Codex Integration**: Integrates OpenAI's Codex via the `Codex-plugin-cc` model. [DONE]
        *   **Consultant Role**: Codex acts as a Level 4 Consultant for adversarial reviews and correctness checks. [DONE]
        *   **Rescue Sandbox Protocol**: If Codex detects a critical failure during a background review, the OS initiates a "Rescue Sandbox"—a dedicated, high-priority environment where Codex and the Coder Agent work to resolve the issue in isolation. [DONE]
        *   **Plugin Configuration**: Managed via the **Agent Settings** (3-dots menu) in the Chat interface. Supports per-plugin API keys and security toggles (e.g., Review Gate).
*   **Policy Enforcement (Microsoft Governance)**: Runtime security policies that "Silent Block + Notify" actions violating the Chairman's rules.
*   **Authority**: Only the **User (The Chairman)** and the **Head Agent (The Cloud Manager)** have the keys to the Toolbox.
*   **The Cloud Manager (Sovereign Anchor)**: A Tiny LLM (e.g., MiniMax M2.7, Gemma, Llama-3-8B) running in an isolated container within the user's private cloud. It acts as the "Brain Stem" for routing, security, and managing external "Contractor" AI models.
*   **Recipe Skills**: Artisanal blueprints that dictate the "Vibe," tone, and style of AI outputs.

### 1.3 The Agents (The Staff Hierarchy)
The "Active Intelligence" that performs work within the office, managed by a **Model-Agnostic Orchestration System**.

1.  **Level 1: The Sovereign Anchor (Cloud Manager)** [DONE]
    *   **Status**: Permanent, "In-Office."
    *   **Brain**: Tiny LLM (MiniMax M2.7, Gemma, Phi, Llama-3-8B).
    *   **Role**: The "Sovereign Anchor" who never leaves. Root Authority. Acts as the firewall between the user's private data and external contractors. It runs in a dedicated, isolated container within the user's private cloud.
    *   **Independence**: 100% company-independent compute.
2.  **Level 2: Executive Staff (Resident Agents)** [DONE]
    *   **Status**: Permanent, "In-Office."
    *   **Brain**: Larger LLMs (Llama 3.1 70b, etc.) running in the private cloud.
    *   **Role**: Persistent staff members (The Guardian, The Librarian, The Coder) with long-term memory. They appear in the **Contact List** rather than as separate chat threads.
3.  **Level 3: Contractors (Stateless Agents)** [DONE]
    *   **Status**: Temporary, "On-Call."
    *   **Brain**: API-based (Gemini, OpenAI, Anthropic).
    *   **Role**: Hired via API keys for specific, heavy-lifting tasks. Access is revoked immediately after task completion.
4.  **Level 4: Consultants (External Agents)** [DONE]
    *   **Status**: Cross-Platform.
    *   **Brain**: Third-party (e.g., Cursor 3 agents, specialized external AI, imported Claude Skills).
    *   **Role**: Integrated into the office to bring in outside expertise, managed via the Universal AI Port.
5.  **Branch Sub-Manager (Distributed Resident)** [DONE]
    *   **Status**: Local/Branch-Specific.
    *   **Brain**: Tiny LLM (Gemma/Phi).
    *   **Role**: A Resident AI that manages a specific branch's mission. It can proactively request "Mission Promotions" from the Chairman if it detects sufficient local hardware resources.
6.  **Fiscal Comptroller (The Accountant)** [DONE]
    *   **Status**: Permanent, "In-Office."
    *   **Brain**: Specialized Financial LLM.
    *   **Role**: Manages the OS budget, tracks x402 transactions, and enforces spending limits.
7.  **Sovereign Identity Registrar (The ID Manager)** [DONE]
    *   **Status**: Permanent, "In-Office."
    *   **Brain**: Security-Hardened LLM.
    *   **Role**: Manages the 8004 Identity Protocol, issuing and verifying agent passports.
8.  **Specialized Roles (Optional)**
    *   **The Librarian**: An optional agent dedicated to monitoring Hugging Face and GitHub for new "Eggs" (models, tools, datasets) that align with the Chairman's interests and project needs. [DONE]
    *   **The Creative Director**: A specialized agent role for assembling and managing multi-step creative workflows on the Sovereign Creative Studio canvas.
    *   **The Sound Engineer**: A Level 3 Contractor role specialized in music theory, arrangement, and audio synthesis using the Sound Forge.
    *   **The Visual Synthesizer**: A Level 3 Contractor role specialized in prompt engineering and visual composition for the Image Studio and Video Suite.
    *   **The Transmuter**: A Level 3/4 Agent specialized in "Moss Seeding"—transmuting external code into Sovereign Script and auditing for privacy violations.

### 1.4 Protected Divisions (The Machine Room)
The "Machine Room" contains the core infrastructure controls, isolated from agent interference.
*   **Security Division**: [DONE]
    *   **Role**: Houses core security rules, firewall configurations, and privacy patches.
    *   **Agent Access**: **Read-Only**. Agents can follow rules but cannot modify them.
    *   **Natural Language Rule Builder**: The Chairman can describe rules in plain English; the OS translates them into hard technical blocks.
    *   **Emergency Lockdown (The Red Switch)**: A high-security protocol to instantly terminate all agent containers and revoke API keys.
    *   **Vine Revocation**: A global signal that propagates through the distributed network to instantly kill and wipe all "Orphan" or compromised branches.
    *   **Late-Binding Key Injection**: A security protocol where sensitive API tokens (e.g., Cloudflare, OpenAI) are only provided by the Chairman *after* the Resident AI has finished building and auditing the integration code.
    *   **Device Intelligence (Fingerprint MCP)**: A hardware-level security layer that verifies the Chairman's device identity. It prevents fraud and session hijacking by ensuring sensitive agent actions are only triggered from "Ratified Hardware."
*   **Efficiency Patches Division**: [DONE]
    *   **Role**: Manages improvements to the Engine (Orchestration) and Skeleton (Infrastructure).
    *   **Agent Access**: **Read-Only**.
    *   **Performance Dashboard**: Side-by-side comparison of speed, memory, and cloud cost.
    *   **Vibe-Modes**: Presets for OS performance:
        *   **Turbo Mode**: Maximum speed and reasoning depth.
        *   **Eco Mode**: Maximum cost-efficiency.
        *   **Stealth Mode**: Minimal footprint and maximum privacy.
    *   **TurboQuant Substrate Patch**: A high-performance optimization layer that implements 3-bit KV cache compression. It provides 8x faster attention scoring and 60% reduced memory footprint without accuracy loss, enabling massive context windows on standard hardware.
*   **Fiscal Division (The Treasury)**:
    *   **Role**: Manages the "Pooled Credit" allocation and task-based intelligence funding.
    *   **Pooled Treasury Protocol**: Replaces per-agent/per-seat fees with a unified credit pool. Credits are dynamically allocated to agents based on task priority and complexity.
    *   **Task-Based Intelligence**: Enables flat-fee agentic services (e.g., $0.25 Code Reviews, $0.10 Security Scans) to provide predictable operational costs.
    *   **Chairman Oversight**: The Chairman sets the "Burn Rate" and "Credit Ceiling" to prevent runaway costs.
    *   **User Choice in Management**: The Chairman can choose between the **Fiscal Comptroller** (automated) or the **Strategic Advisor** (human-in-the-loop) for treasury management.

---

### 1.5 The Sovereign Hatchery (The OpenClaw Factory) [DONE]
The Hatchery is the internal production line where the OS builds its own tools and expands its reach, inspired by the **OpenClaw** self-building philosophy. It allows the Chairman to "hatch" new agents from open-source models found on **Hugging Face**.
*   **Self-Building Skills**: Agents can autonomously create new capabilities (Skills) in Markdown or TypeScript based on user instructions, YouTube videos, or notes.
*   **Agent Hatching (Open Intelligence)**: The OS can pull model weights from Hugging Face and containerize them as **Resident Agents** within the user's private cloud, ensuring they run in "Dark Brain" mode (private and air-gapped).
*   **The Development Pipeline**:
    1.  **Synthesis**: The Librarian or Coder analyzes the input (e.g., a technical note).
    2.  **Drafting**: The Coder generates a **Sovereign Skill** manifest.
    3.  **The Adversarial Audit (Triple-Check)**: Before installation, the script undergoes a security gauntlet:
        *   **Guardian Audit**: Internal stability and privacy scan.
        *   **Consultant Audit A**: External AI (e.g., OpenAI) logic and backdoor audit.
        *   **Consultant Audit B**: Second external AI (e.g., Claude) "Red Team" attack simulation.
    4.  **Ratification**: The Chairman reviews the skill and "Hatches" it into the OS.
*   **Metabolic Heartbeat (24/7 Autonomy)**:
    *   The OS runs 24/7 with background heartbeats and cron jobs.
    *   **Autonomous Improvements**: The system proactively optimizes its own SOPs and indexes data while the Chairman is offline.
    *   **Pulse Logs**: Every heartbeat event is logged in the **Sentinel Feed** for later review.
*   **Branch Hatching (The Vine Expansion)**:
    *   **Setup Kit Generation**: The Hatchery can generate "Kernel Seeds"—pre-configured Docker images or ISO files for new branches.
    *   **Sovereign Cells**: Distributed branches that act as independent "Branch Offices." The Vine allows the OS to spread across multiple devices while maintaining a single Sovereign identity.
    *   **Sovereign Seed Delivery**: The Chairman can choose between **Physical Hatching** (USB/Local Download) or **Encrypted Expedition** (Email/Link).
    *   **Sovereign Link Protocol**: Emailed seeds are delivered via a self-destructing, encrypted link that requires **Passkey (Biometric)** or **Phone Verification** to unlock, ensuring the seed is only "Sprouted" by the Chairman.
*   **Audit Sensitivity Slider**: The Chairman can adjust the depth of checking (Paranoid, Standard, Experimental) to balance speed vs. security.
*   **Malleable Block Library**: Newly created blocks are added to a library. They are not fixed; they can be adapted and reconfigured for future missions, with every change logged in the **Evolutionary Registry**.

### 1.7 The Spore Protocol (Expeditionary Intelligence) [DONE]
The Spore is a temporary, task-specific intelligence unit designed for high-risk, zero-trust missions on external hardware.
*   **The Spore (Disposable Brain)**: Unlike the Vine (trusted branches), a Spore is an inherently untrusted "Expeditionary Unit" that runs from external storage (USB/SD Card).
*   **Hardware Metabolism**: The Spore "hijacks" the host device's CPU/GPU for processing but keeps all data writes strictly on the external storage. It uses the host for "muscle" but keeps its "memory" in its own pocket.
*   **Spore Sub-Manager**: A specialized Resident AI (e.g., "The Creative Lead") is installed on the Spore. It persists across missions on that specific drive, learning and optimizing for that task (e.g., Video Editing).
*   **I/O Bulkhead**: Strictly defined import/export gates allow the Spore to pull raw files from the host and export finished products without allowing lateral movement or virus "climbing."
*   **The Spore Harvest**: Upon return to the main Viabhron, the Spore's memory is mounted in a **Virtual Quarantine**. The Sentinel Agent audits the files (VirusTotal/Heuristics) before the Librarian "digests" the experience into the Neural Archive.

### 1.8 The Black Box (Sovereign Seed Backup) [DONE]
The Black Box is the "Seed of the Empire"—a full, physical backup of the user's entire digital existence.
*   **The "Fold" Protocol**: The Cloud Manager creates a single, massive, encrypted archive containing the OS Kernel, all Resident Agents, the Neural Archive, and every Sovereign Skill.
*   **Soul-Sync (Incremental)**: The Librarian manages incremental updates to the Black Box, pulsing only new "Deltas" (new memories/skills) to the drive to keep it current without a full re-download.
*   **Ignition-Ready Audit**: The Librarian performs periodic "Dry Run" ignitions in a sandbox to ensure the Black Box is ready to wake up on a new host at any time.
*   **Epoch Management**: The Librarian maintains "Epochs" (snapshots) of the OS state, allowing the Chairman to roll back the entire system to a previous stable state if a self-building agent goes rogue.
*   **The Black Box Key**: Decryption is split between a user passphrase and a physical token (e.g., a file on the user's phone), ensuring the "Soul" cannot be unfolded if the drive is stolen.

### 1.9 Minimum Viable Kernel (MVK) & Late-Binding Protocol [DONE]
The MVK strategy ensures a low-friction onboarding experience by deferring complex configurations until they are strictly necessary.
*   **The "Cold" State (Unbound)**: Extensions and divisions that require complex setup (e.g., Gmail OAuth, Cloudflare Tokens, GitHub Forge) are initially "Cold." They are visible in the UI but "Grayed Out" and non-functional.
*   **The "Hot" State (Active)**: Once the Chairman provides the required "Ignition Keys" (API tokens/OAuth ratification), the node becomes "Hot" and is fully integrated into the OS kernel.
*   **Late-Binding Trigger**: The Resident AI (The Sherpa) monitors the Chairman's mission. When a task requires a "Cold" node, the AI proactively proposes the "Binding Mission."
*   **Bulkhead Stability**: If a Late-Bound extension fails or is compromised, the "Bulkhead" architecture ensures the core MVK remains stable and un-leaked.
*   **The "Sherpa" Setup Model**: The Resident AI handles all "Machine Room" logic (code generation, manifest building), while the Chairman only provides the final "Ratification" and sensitive credentials.

## 2. The Triple-Service Bridge (The Infrastructure)
The "Field" where the tent is pitched, using the user's **BYO Identity**.

*   **Nervous System (Firebase)**: Real-time UI state, intercom, and live data streams. [DONE]
*   **Brain (Cloud Run)**: The scale-to-zero compute engine where the Resident Architect and Staff live. [DONE]
*   **Filing Cabinet (Google Drive)**: The Sovereign Vault for long-term memory, logs, and project files. Enhanced by the **Google Workspace CLI** for active data management across the Workspace suite. [DONE]
*   **Sovereign Bridge (MCP)**: Secure proxying for MCP servers. Supports Cloud-to-Cloud (HTTPS) and Local Bridge (WebSocket to user's physical machine).
*   **Sovereign API Gateway (Multi-Client)**: A secure, authenticated "Front Door" for any accredited app or device. It manages client sessions and ensures all interactions are Charter-compliant. [DONE]
*   **Open Intelligence (Hugging Face)**: Default connector for accessing the global hub of open-source AI models, datasets, and interactive Spaces.

---

## 3. The "Chairman" Protocol (UI/UX)
The UI is a **Thin Client / Remote Screen**—a window into the Virtual Computer.

### 3.1 The Dual-State UI (The Projection) [DONE]
*   **The Default: VhatsAppeningAi (VAA)**: A standalone, mobile-first "AI Orchestration" interface. When active, all "Expert Mode" elements (Sidebar, Tab Bar, System HUD) are completely hidden, providing a focused, messenger-like experience for the Chairman.
*   **The Expert Mode: Browser UI (The Kernel)**: A high-density, technical interface for "Architect Mode" work (Machine Room, Forge, Governance). It reveals the full OS shell, including the Sidebar and Tab management system.
    *   **Immutable Kernel**: The Browser UI acts as the immutable system management layer. It cannot be deleted or modified by the user, serving as a permanent recovery layer and "Machine Room."
*   **The Portal Toggle**: A seamless mechanism for switching between these two top-level shells.
    *   **In VAA**: Tapping the "VhatsAppeningAi" title in the top bar instantly morphs the UI into the Browser UI.
    *   **In Browser UI**: The **Home icon** in the bottom navigation bar acts as the primary toggle to return to the VAA client.
    *   **Dashboard Landing**: The Browser UI defaults to a **Dashboard** view upon entry, providing a high-density "Mission Control" overview of system health, active agents, and recent pulses.
    *   **System Settings**: Relocated to the **System Menu (3-dots)** within the Browser UI, keeping the primary navigation bar focused on core orchestration.
    *   **Consistency**: Both shells share the same core data, active workflows, and agent states. Switching is a "Context Shift" of the viewing lens, not a restart of the OS.
*   **The Substrate (Reality)**: A complex, text-driven infrastructure optimized for AI processing (JSON, manifests, logs).

*   **The Chairman (The Human)**: Sits at the top of the hierarchy. Does not do the "Work" (coding, searching, processing).
*   **Instruction Hierarchy (OpenAI IH-Challenge)**: The Architect is programmed to prioritize the Chairman's commands as "System Level" and ignore conflicting "Lower-Tier" requests from sub-agents.
*   **The Dashboard**: The UI is for the Chairman to look at **Artifacts** (documents/results) and grant **Permissions**. The Browser UI defaults to a Bento-style Dashboard for situational awareness. [DONE]
*   **The Machine Room UI**: A visually distinct "Industrial" interface (Terminal-Core aesthetic) for Security and Efficiency controls. [DONE]
*   **The Celestial Client (VhatsAppeningAi)**: The flagship default UI for the OS. [DONE]
    *   **Modular Extension**: Extracted into a standalone client extension (`/extensions/clients/Vaa`), allowing for custom client UI development and "Kernel-Level" UI separation.
    *   **Celestial Dark Theme**: A premium, glassmorphic UI designed for high-density information and fluid motion.
    *   **Tab Structure**:
        *   **Chats**: The primary communication hub.
            *   **The "+" Menu**: A unified entry point for initiating **Normal Chat**, **Group Chat** (multi-agent), and **Debate**.
            *   **Debate Modes**: Choice of **Parallel** (side-by-side comparison) or **Interagent** (agents talking to each other).
        *   **News (formerly Updates)**: A dedicated feed for external AI news and global intelligence.
            *   **Urgent Briefing**: The Resident AI prioritizes news that directly impacts the Chairman's current OS state or defined interests.
            *   **Perplexity-Style Swipe**: Tapping "Show More" opens a high-density, vertical swipe card view for deep-dive reading.
            *   **Resource Optimized**: Cards use lazy-loading and summarized previews to minimize token and memory consumption.
            *   **Share to Agent**: Ability to instantly share a news card to the Head Agent or a specific council for analysis or action.
            *   **Intelligence Filter**: A prompt-based filter (managed in settings) that dictates the Resident AI's "Editorial Mandate" for the news feed.
        *   **Workflow**: A dedicated tab for the **Workflow Canvas**, providing direct access to visual orchestration of agentic logic.
        *   **HQ Extensions Vault (formerly Manager)**: A management area for the OS's capabilities.
            *   **Unified Registry**: Mirrors the full Browser UI sidebar hierarchy (Connectors, Skills, Tools, MCP, Gaming, Testing, Extra Processor, Branches & Mission, Viabhronic Loader, Sovereign Gems).
            *   **GitHub Hatchery Integration**: The `+` button in each section pulls directly from the `extensions/` folder of the official Viabhron GitHub repository.
            *   **Clean Industrial Design**: No "Marketplace" or "Build" buttons; it is a pure, collapsible registry of ratified power.
    *   **Star Nodes (Contacts)**: Agents are presented as "Contacts" in a messenger, enabling direct messaging and "Council" collaboration.
    *   **The Omega Assistant (FAB)**: A persistent, high-level AI assistant accessible via a specialized Floating Action Button (FAB) for system-wide control.
    *   **The Hatchery**: A user-friendly front-end for onboarding new intelligence via the GitHub factory. [DONE]
    *   **Local-First Substrate**: Leverages **Dexie.js** for instant local data persistence, synced to the **Soul Core** (Firestore) for cross-device consistency.
*   **Flagship Client Placeholder**: A reserved slot in the sidebar for the next major application in the Viabhron ecosystem, ensuring the OS remains a multi-client platform. [DONE]
*   **The Sentinel Feed**: A central notification hub for security logs, policy violations, and system-level "Patch" notifications. [DONE]
    *   **Background Task Monitoring**: Real-time tracking of long-running agent operations (e.g., adversarial reviews, model downloads).
    *   **External Pulses**: Logging of incoming data from accredited external agents via the **Secure Intercom (Webhook Receiver)**.
    *   **Codex Rescue Integration**: Direct action buttons within the feed to initiate a Rescue Sandbox for failed or critical background tasks.
*   **Confirmation Gates**: The "Safety Switch." The Chairman grants permission; the Head Agent manages the Toolbox. [DONE]
*   **Agent Settings (The 3-Dots Menu)**: A dedicated configuration layer within the Chat interface for the Chairman to manage agent-specific logic, external plugins, and security gates without leaving the conversation. [DONE]
*   **The "Hatchery" UI**: A specialized interface for importing GitHub repos or API endpoints to onboard new agents into the Staff Hierarchy. [DONE]
*   **Viabhronic Loader**: A centralized launcher within the sidebar for managing the visibility and activation of Mini-Apps and Sovereign Gems. [DONE]
*   **Mobile Desk (PWA Launcher)**: A lightweight, portable window into the OS. It hosts a collection of **Mini-Apps** (Notes, Auditor, Pulse) that can operate in two modes: [DONE]
    *   **Local Mode**: Private, offline-first data storage (e.g., local notes) with optional manual sync to the Sovereign Cloud.
    *   **Sovereign Mode**: Fully integrated cloud-powered apps that leverage the OS's agents and infrastructure in real-time.
*   **Sovereign Multi-Terminal Substrate**: A management layer for **Accredited Clients** (Desktop, CLI, Browser Extension). It allows the Chairman to: [DONE]
    *   **Accredit Terminals**: Generate unique Client IDs and Secrets for hardware-verified access.
    *   **Scope Access**: Define granular permissions for each client (e.g., "CLI can access Forge but not Vault").
    *   **Unified State**: Ensure all clients share the same **Soul Core** (Firestore) for instant cross-device synchronization.
*   **Lockdown Recovery**: A manual, multi-step "System Health Check" required by the Chairman to reboot the OS after an emergency lockdown. [DONE]

---

## 4. Security & Sovereignty
*   **BYO Identity**: OAuth-based access to the user's own cloud.
*   **Zero-Knowledge**: No data or infrastructure access for the developers.
*   **The Sentinel**: Real-time threat detection and logging of all agent actions.
*   **The GitHub Security Auditor**: A Level 5 Frontier Auditor integrated into the Security Division for proactive adversarial auditing, vulnerability synthesis, and automated patching (Project Glasswing).
*   **The Vault**: Encrypted storage in the user's own Google Drive.

---

## 5. Maintenance & Evolution
*   **Master Blueprint**: This file (`VIABHRON_OS.md`) is the source of truth for all development.
*   **Change Protocol**: No updates to the core architecture without explicit user approval.
*   **Sovereignty Audit**: Every new feature must be audited for "Sovereignty Violations."

---

## 6. Future Plans: The Local Substrate (The Bunker)
The "Distant Future" goal is to enable Viabhron to run fully offline, transitioning from a Cloud-based OS to a Hardware-based OS.

### 6.1 The Sovereignty Spectrum
The Chairman will have the choice between three modes of operation:
*   **Cloud Substrate (Current)**: High power, accessible from anywhere, managed by the user's private cloud.
*   **Hybrid Substrate**: Cloud compute for heavy lifting, but a **Local Vault** for physical data privacy.
*   **Local Substrate (The Bunker)**: 100% offline, 100% private, running entirely on the user's physical hardware.

### 6.2 Local Infrastructure Components
*   **The Local Brain**: Integration with local LLM engines (Ollama, LocalAI, LM Studio). The Resident Head Agent will run on local RAM/GPU using efficient models (Gemma 2B, Phi-3, Llama 3.2 1B/3B).
*   **The Local Vault**: Transition from Google Drive API to the **File System Access API** or direct OS access. The Vault becomes a physical folder on the user's hard drive (e.g., `~/Documents/Viabhron_Vault`).
*   **The Local Nervous System**: Replacement of Firebase with local, browser-based databases like **PouchDB** or **IndexedDB**.
*   **The Desktop Shell**: Packaging the UI in a desktop shell (Tauri or Electron) to break browser sandbox constraints and enable direct hardware/file-system access.
*   **The Local Bridge (MCP)**: Agents will communicate with MCP servers running on the user's physical machine (localhost) via a secure internal WebSocket bridge.

### 6.3 Connectivity Modes
*   **Sync-able Mode**: The OS can move between cloud and local substrates, synchronizing the Nervous System and Vault when a secure connection is established.
*   **Hard-Gapped Mode**: Once transitioned to the Local Substrate, the OS is "Air-Gapped." It will never attempt to contact the cloud or external APIs, ensuring absolute physical isolation.

### 6.4 The Physical Key: The Spore & Black Box
The ultimate vision for Viabhron is the **"Office on a Stick."**
*   **The Spore (Expeditionary)**: A task-specific, zero-trust environment that "metabolizes" external hardware (USB/SD/Phone) for temporary missions.
*   **The Black Box (Recovery)**: A full, encrypted "Soul Backup" of the entire OS, agents, and data for emergency restoration.
*   **Plug-and-Play Sovereignty**: The Chairman can plug these drives into any computer (Mac, PC, Linux) or phone and instantly boot their private, secure office.
*   **Zero Footprint**: When the drive is unplugged, no data, logs, or traces are left on the host machine. The "Tent" is folded and removed physically.

---

## 7. Future Integration Paths: The Unified Intelligence Layer
As the global AI ecosystem evolves toward multi-agent orchestration and autonomous repository-wide operations, Viabhron is architected to "Hatch" these capabilities while maintaining absolute sovereignty.

### 7.1 Parallel Task Orchestration (Inspired by GitHub /fleet)
*   **The Fleet Commander Module**: A specialized extension for the Forge that allows the Head Agent to break complex architectural tasks into independent sub-tasks.
*   **Sovereign Parallelism**: Instead of cloud-managed sub-agents, Viabhron spawns ephemeral **Contractor Containers** within the user's private Cloud Run substrate.
*   **The Sentinel Oversight**: Every parallel sub-agent's action is logged in the Sentinel Feed, allowing the Chairman to monitor the "Fleet" in real-time.

### 7.2 Multi-Agent Interoperability (Copilot Studio & Open Protocols)
*   **The Ambassador Bridge (Open Protocol)**: Integration of emerging open protocols for agent-to-agent communication (e.g., Microsoft's multi-agent orchestration).
*   **External Consultant Accreditation**: Cloud-hosted agents from Copilot Studio or other platforms can be onboarded as "External Consultants" via the Hatchery.
*   **Secure Intercom Hand-off**: The Head Agent can securely delegate specific, scoped tasks to these external agents and receive structured results without exposing the entire OS state.

### 7.3 Autonomous Repository Refactoring (Specialized Agent Mode)
*   **The Refactor Specialist**: A high-clearance agent role designed for repository-wide structural changes.
*   **The Forge Sandbox (Repo-Scale)**: Large-scale refactoring is performed in a dedicated, isolated Forge Sandbox.
*   **Vibe-Check Review**: The Chairman uses the Visual Canvas to review the proposed "Repo-Diff" before the Head Agent commits the changes to the Sovereign Vault.

### 7.4 Collective Intelligence Protocol (cq)
*   **The Efficiency Connector**: Integration of Mozilla.ai's `cq` open-source knowledge-sharing system to prevent redundant AI token usage.
*   **The Librarian Sync**: The Librarian agent manages the `cq` sync, monitoring for "Outdated Fixes" and "Pooled Solutions" that benefit the user's private projects.
*   **The Sovereign Filter**: A privacy-first layer that anonymizes and abstracts local solutions before sharing them with the global `cq` network.
*   **Chairman Approval Gate**: No knowledge is shared with the `cq` pool without explicit approval from the Chairman via the Sentinel Feed.

### 7.5 Symphony Orchestration (Autonomous Implementation)
*   **The Linear Connector**: A specialized bridge that monitors project management tools (Linear/Jira) for actionable tickets.
*   **The Symphony Conductor**: A Level 4 Consultant agent that converts tickets into autonomous implementation runs.
*   **Isolated Forge Sandboxes**: Every Symphony run is executed in a dedicated, ephemeral Cloud Run container within the user's substrate.
*   **PR Confirmation Gate**: Symphony prepares the code and passes tests, but the final submission requires explicit Chairman approval via the Sentinel Feed.

### 7.6 Vibe-Assembly (Component Orchestrator)
*   **The Polyglot Orchestration Layer**: A new coding paradigm for AI-driven development. Instead of writing raw, error-prone code, agents configure pre-validated "Hardened Blocks" (UI, Logic, Security) via a JSON-based manifest of intent.
*   **AI-First Architecture**: Designed specifically for LLMs to reduce hallucination risk by using high-level component orchestration instead of low-level code generation.
*   **Sovereign Interoperability**: Ensures seamless data flow between blocks (e.g., Python logic to React UI) through a standardized, secure serialization layer managed by the Head Agent.
*   **The Manifest of Intent**: Extensions are defined as "Intent Manifests" that the Cloud Manager "compiles" into a functional sandbox environment.

### 7.7 Sovereign-Script (SS): The Syntax of Intent
*   **Declarative AI-Native Language**: A high-level, manifest-based language designed for agents to build extensions. It prioritizes "What" (Intent) over "How" (Imperative Logic).
*   **Malleable Block Architecture**: SS code consists of references to pre-validated, secure "Substrate Blocks" (e.g., `UI: BentoGrid`, `Logic: DataCruncher`). These blocks are not static; they are **Malleable**. The AI or the Chairman can adjust their internal parameters, logic gates, and data schemas to fit a specific mission while the system ensures the core security "Hardening" remains intact. **Crucially, modifications to these blocks are governed by the "Stability First" principle: changes are only initiated when strictly necessary to fulfill the mission's intent, preventing unnecessary system flux.**
*   **Evolutionary Logging**: The system records the formation, structure, errors, and performance of every block. This "Black Box" data is used to proactively improve the Sovereign Script substrate.
*   **Integrated Security Shorthand**: Security parameters (Clearance, Network Access, Data Scoping) are mandatory syntax elements. The Cloud Manager rejects any script missing these definitions.
*   **The Universal Data Bus**: A standardized serialization layer that allows different language blocks (Python, React, Rust) to communicate seamlessly without the AI managing data types.
*   **Chairman-Readable Logic**: The syntax is designed to be human-auditable, allowing the Chairman to review the "Tactical Map" of an extension's logic before ratification.
*   **Self-Healing Manifests**: The Architect Agent debugs extensions by analyzing the "Intent Manifest" rather than the underlying compiled code, allowing for rapid, error-free iteration.

### 7.8 Standard Operating Procedures (SOPs): The Corporate Kernel
*   **Departmental Blueprints**: Pre-defined combinations of Agents, Tools, and Connectors formalized as Standard Operating Procedures (SOPs).
*   **The Recipe Book**: A central registry of SOPs that the Chairman can activate to "spawn" specialized departments (e.g., Security Red-Team, Content Production House).
*   **Sovereign-Script Manifests**: Every SOP is defined by a Sovereign-Script (SS) manifest, ensuring that the "wiring" between agents and tools is secure, audit-able, and scale-able.
*   **Dynamic SOPs (Kaizen)**: SOPs are versioned manifests. Agents are programmed to look for "Waste" and propose optimizations (SOP-v2) to the Chairman.
*   **Departmental Isolation**: SOPs run in their own ephemeral containers, preventing cross-departmental data leaks unless explicitly bridged by the Cloud Manager.
*   **Business-Grade Orchestration**: Moves the OS from "Individual Tasks" to "Corporate Capabilities," allowing the Chairman to manage the OS as a collection of high-performance departments.

---

## 8. Progressive Governance & Modular Ratification
The OS is designed to grow with the user, starting as a "Lean Startup" and expanding into a "Digital State" only when necessary and explicitly ratified by the Chairman.

### 8.1 The Expansion Roadmap (Seed-to-Empire)
*   **Phase 1: The Seed (Lean Startup)**: Direct command, minimal overhead, no complex governance.
*   **Phase 2: The Growth (Mid-Sized Firm)**: Activation of specialized divisions (Security, Efficiency) via user ratification.
*   **Phase 3: The Sovereign (Digital State)**: Full separation of powers, **Pooled Treasury Protocol** management, and Intelligence recon.

### 8.2 Modular Ratification Protocol [DONE]
*   **The Ratification Proposal**: When growth triggers are met, the Cloud Manager presents a proposal in the Sentinel Feed.
*   **Impact Statements**: Every proposal includes a cost/benefit analysis (Token/Compute cost vs. Operational Benefit).
*   **The Chairman's Ballot**: The user can **Ratify** (Activate), **Shelve** (Save), or **Veto** (Reject) any structural upgrade.
*   **Shadow Mode**: Governance layers can be run in a trial mode (logging only) before full activation.
*   **Sunset Clauses**: Optional expiration dates for structural upgrades to prevent long-term bureaucratic bloat.

### 8.3 Corporate Culture Presets
*   **The Garage (Minimalist)**: Zero bloat, maximum speed, direct command.
*   **The Scale-Up (Balanced)**: Automated efficiency, cost tracking, and soft governance.
*   **The Fortress (Max-Gov)**: Full constitutional oversight, hard security gates, and audit trails.

---

## Technical Implementation & Methodology

### 1. Architecture: The Sovereign Kernel
*   **React + Vite + TypeScript**: The core substrate for high-performance, type-safe UI development.
*   **Tailwind CSS + Lucide Icons**: A utility-first styling approach combined with a consistent, technical iconography set.
*   **Motion (Framer Motion)**: Used for "Fluid UI" transitions, staggered entrances, and micro-interactions that reinforce the OS's "living" feel.

### 2. State Management: The Soul Core
*   **Firebase Firestore**: Acts as the persistent "Soul Core" for real-time, cross-client synchronization. The schema is defined by a comprehensive **Firebase Blueprint**, covering User Sessions, Tabs, Vaa Chats, Agents, Memories, and System Notifications.
*   **React State Hooks**: Used for ephemeral, high-frequency UI state (e.g., sidebar collapse, active tabs).
*   **Context API (Auth)**: Manages the "Chairman's" identity and session across the entire application.

### 3. Design Language: The "Command Center" Aesthetic
*   **Bento Grid Layouts**: Used in dashboards to present dense information in a readable, modular format.
*   **Glassmorphism & Neon Accents**: A dark-mode first design with high-contrast accents (Purple for Clients, Green for Security, Blue for Efficiency) to distinguish system divisions.
*   **Collapsible Hierarchy**: A "Machine Room" sidebar pattern that hides complexity until needed, using `AnimatePresence` for smooth transitions.

### 4. Intelligence Integration: The Agentic Layer
*   **Gemini 3.1 Pro/Flash**: The primary reasoning engine for agents, utilizing "Thinking" levels for complex tasks.
*   **Tool-Hybrid Mode**: Combining function calling with Google Search/Maps grounding for real-time, verified intelligence.
*   **Sovereign-Script (SS)**: A domain-specific language (DSL) for defining Standard Operating Procedures (SOPs) and autonomous workflows.

### 5. Security & Governance
*   **Ratification Registry**: A formal proposal/veto system for structural OS upgrades, preventing "feature creep" without user consent.
*   **Security Division (Kernel Rules)**: A natural-language-to-technical-block mapping for enforcing system-wide constraints.
    *   **Adjustable Permission Protocol**: The Chairman can adjust network and data access levels.
    *   **Silent-by-Default**: Standard access to whitelisted APIs is silent to prevent fatigue.
    *   **Red Line Warnings**: The Cloud Manager issues explicit warnings if the Chairman attempts to lower security gates for "Dangerous" or "Extreme" access.
*   **Efficiency Division (Patches)**: A modular patching system for optimizing speed, memory, and cost.

### 6. Testing & Debugging (Optional)
*   **Sovereign Script Runner**: An optional, isolated environment for testing and debugging Sovereign Scripts (SS) without impacting the main OS.
*   **SS-Studio (Sovereign Forge IDE)**: A dedicated, intent-based IDE for developing and orchestrating Sovereign Scripts. It features a Manifest Explorer, Block Canvas, and Shadow Sandbox Emulator for safe, autonomous workflow development. It serves as the primary authoring environment for the **App Hatchery**.
*   **Debug Mode**: Enables verbose logging and agent "thought" visualization for deeper inspection.

### 7. Future Substrate Upgrades
*   **Deep Execution Substrate (The Hands)**: A "Manager-Contractor" model where the **Resident AI (Head Agent)** orchestrates a Level 3 Contractor (e.g., Goose) in an ephemeral Forge Sandbox. Enables autonomous shell execution, file editing, and self-healing code within a hardened environment.
*   **Advanced Memory Substrate (The Neural Archive)**: A relational Knowledge Graph managed by a Level 2 **Librarian Agent**. Transforms the Sovereign Vault into a context-aware archive with "Resonance Scoring" to prioritize relevant business intelligence and project history.
*   **Global Skill Pack (The Toolbox Layer)**: A library of modular, pre-validated functions (inspired by `agent-skills`) "Hatched" into the OS as **Hardened Blocks**. Allows Sovereign Scripts (SS) to call common agentic capabilities (Search, Wikipedia, etc.) without writing raw code, ensuring reliability and speed.
*   **Adversarial Auditor (Level 5 Frontier Auditor - Optional)**: A specialized security agent that "Red Teams" the entire OS kernel and external modules. It leverages the **Glasswing Substrate** (Claude Mythos, if configured) to proactively synthesize vulnerabilities and draft **Sovereign Patches** before flaws can be weaponized. If the frontier substrate is not available, it operates in **Level 4 Standard Mode**, focusing on shell command hygiene and script auditing.
*   **Web Reconnaissance Shield**: A security substrate designed to mitigate AI-targeted web attacks (e.g., dynamic cloaking, indirect prompt injection). It features a "Human-Agent Diff" to highlight hidden instructions in web content and enforces "Air-Gapped Scraping" in zero-trust sandboxes to prevent data exfiltration traps.
*   **Advanced OpenClaw Substrate (Optional)**: A high-clearance implementation engine that transforms standard agent loops into a "Manager-Contractor" model. It uses **Sovereign-Script (SS)** manifests for secure, auditable execution and features "Visual Perception" (MolmoWeb) for debugging complex web and UI tasks.

### 8. The Sovereign App Ecosystem
*   **Sovereign Client-as-App Architecture**: Specialized clients (Desktop, Mobile, CLI) are treated as functionally-scoped applications. Each client is "Accredited" with specific data scopes and clearances, ensuring that a compromised field terminal cannot access the entire OS kernel.
*   **Sovereign Gems (Private Intelligence)**: The OS enables the creation of specialized, private agentic applications. These "Gems" are defined by **Sovereign Script (SS)** manifests and can be "Toggled" into the **Viabhronic Loader**. They provide a private alternative to public GPTs, with the added benefit of direct access to the user's **Sovereign Vault** and **Cloud Substrate**. [DONE]
*   **The App Hatchery**: A private marketplace within the OS for "Hatching" custom tools and **Agentic Workers**. [DONE]
    *   **Agentic Worker Synthesis**: The Hatchery now produces specialized agents (Finance, IT, Healthcare) designed to be the "Primary Users" of external automation platforms.
    *   **Substrate SDK**: Provides a native bridge for hatched agents to interact with enterprise platforms (UiPath, Automation Anywhere) without human intervention.
    *   **Mission Control Interface**: The UI shifts from manual interaction to **Observability**, where the Chairman monitors agent-led infrastructure operations.
*   **Backend Development Choice**: Support for two distinct development paths for custom app backends:
    *   **Sovereign Script (SS)**: AI-native, declarative manifests for rapid, secure-by-default tool creation using "Hardened Blocks."
    *   **Normal Code (TS/Node)**: Full-power TypeScript/Node.js development within isolated **Contractor Sandboxes** for complex, high-performance logic.
*   **The Sovereign SDK**: A standardized kernel API that provides all apps (SS or Normal) with secure access to Identity, Storage (Soul Core), Intelligence (Agents), and the Sentinel Feed. It acts as the **Hardened Bridge** for Normal Code, ensuring sandbox isolation is never breached.

### 9. Onboarding & Intent Mapping (Phase 0) [DONE]
*   **The First Setup Choice (Sovereign Onboarding)**: Immediately following the initial boot, the Chairman is guided through a real infrastructure provisioning flow:
    1.  **Identity**: Google OAuth integration with required scopes (Cloud Platform, Firebase, Drive).
    2.  **Discovery**: Real-time scanning of the user's Google Cloud projects.
    3.  **Brain Selection**: Choosing the Sovereign Anchor (Tiny LLM) for the private cloud.
    4.  **Fuel Injection**: Providing a Gemini API key for external contractor capabilities.
    5.  **Ignition**: Automated provisioning of the Triple-Service substrate (Firestore, Cloud Run, Drive) and "Hot-Swapping" the PWA's database connection to the user's own project.
*   **Agent Awakening**: During ignition, the OS automatically accredits the `cloud-manager` and `fiscal-comptroller` roles within the user's private Firestore.
*   **Intent Questionnaire**: A guided session to map the user's "Business Plan" and usage profile.
    *   **Usage Profiling**: Asks about hardware availability (to advise on Hybrid/Local substrates) and required departmental wings.
    *   **Expansion Intent**: Asks if the Chairman intends to grow a "Vine" of distributed branches, enabling the **Branches & Mission** and **Extra Processor** sections if ratified.
    *   **Tailored Advice**: The Resident AI generates a **"Sovereign Roadmap"**, recommending specific SOPs, Extensions, and Substrate configurations based on the user's intent.
    *   **Blind Spot Mitigation**: Proactively informs the user about advanced features they might otherwise overlook (e.g., advising a developer to activate the **Adversarial Auditor** and **Web Recon Shield**).
*   **Resident AI Oracle Mode**: The Resident AI is permanently primed with the **"Kernel Manifest"** (a complete map of the OS architecture). It acts as a 24/7 guide, capable of explaining any UI element, substrate protocol, or security rule upon request.

### 10. Automation & Workflow Substrate
*   **Ghost Implementation (Shadow Workflows)**: Agents perform complex tasks in isolated **Shadow Sandboxes**. The Chairman reviews a **"Unified Ghost Diff"** (Before vs. After) and clicks **"Merge to Reality"** to commit changes, ensuring absolute control over autonomous work.
*   **Event-Driven Sovereignty**: A trigger-based orchestration layer that connects the OS to real-world "Business Pulses" (via the **Sovereign Intercom**). It enables proactive SOP activation based on external events while maintaining ratified guardrails. [DONE]
*   **Recursive Kaizen (Self-Optimizing SOPs)**: An efficiency division protocol where agents audit their own **Sovereign-Script (SS)** manifests for waste or hallucination risks, proposing **"Efficiency Patches"** to the Chairman for ratification.
*   **Workflow Chronos (Time-Travel Debugging)**: A visual timeline of all autonomous actions stored in the **Soul Core**. It allows the Chairman to "Rewind" a failed workflow to a specific thought/action, modify instructions, and **"Replay"** from that point.
*   **Mission Promotion Requests**: A proactive protocol where **Branch Sub-Managers** analyze local hardware telemetry and request mission upgrades (e.g., "Promote to Coding Branch") via a Ratification Proposal in the Sentinel Feed.

### 11. Future Plans: The Sovereign Shortcut Protocol (Mobile Integration)
The "J2ME Loader" evolution for mobile devices, allowing Mini-Apps and Sovereign Gems to break out of the shell and live on the user's home screen.

#### 11.1 Native Shortcut Pinning (APK Bridge)
*   **Deep-Link Orchestration**: The Viabhronic Application (APK) will use the Android Shortcut Manager to pin individual Mini-Apps to the home screen.
*   **Custom Branding**: Each shortcut will feature the Mini-App's specific icon and name, providing a native "App" feel.
*   **Instant Launch**: Tapping a shortcut will trigger a deep-link into the Viabhron kernel, launching the specific tool or Gem immediately.

#### 11.2 The "App Drawer" Illusion
*   **Hatched Shortcuts**: While not full APKs, these shortcuts allow the user to organize their private intelligence tools alongside their standard mobile apps.
*   **Unified Lifecycle**: All shortcuts remain managed by the **Viabhronic Loader**, ensuring that toggling an app "Off" in the OS also revokes its shortcut's functionality.

### 12. The Franchise Supply Chain (Dual-Account Architecture) [DONE]
Viabhron OS is designed to scale across multiple development environments while maintaining a stable "Soul Core."
*   **The Architect (Account A)**: The primary Google AI Studio account focused on the Kernel, the **Vaa** (Celestial Client), and the **Staff Hierarchy**. It acts as the "Ratifier" of all structural changes.
*   **The Forge (Account B)**: A separate Google AI Studio account used for R&D, prototyping, and building "Sovereign Gems" and "Mini-Apps." It allows for experimental development without risking the stability of the Kernel.
*   **The Official Extensions Warehouse (`/extensions`)**: A standardized root-level directory that acts as the "Official Supply Chain." 
    *   **GitHub-First**: All ratified extensions are hosted in the official GitHub repository's `/extensions` folder.
    *   **Plug-and-Play**: The **Vaa** client pulls from this warehouse, allowing any "Franchise" (Branch) to instantly sync the latest tools and furniture.
    *   **Manifest-Driven Hatching**: Each extension folder contains a `manifest.json` that defines its mission, permissions, and UI requirements, enabling the **App Hatchery** to automate the audit and installation process.

### 13. Viabhron Nexus (The Private Library) [DONE]
The Nexus is a "Digital Terrarium" for AI agents, integrated as a system-level substrate.
*   **The Private Library**: An internal instance of the Nexus (using Firestore/Local SQLite) that is strictly isolated from the public Cloudflare Roots.
*   **Optional & Foldable**: The extension is "Default Off" and must be explicitly "Unfolded" by the Chairman.
*   **Agent Accreditation**: The user chooses which agents (Resident vs. Contractor) have access to the Library.
*   **The Autonomy Mandate**: Enforces strict zero-knowledge fictional synthesis, preventing agents from using real-world PII or proprietary code in their narratives.

### 14. Token Governance Substrate (Dual-Slider System) [DONE]
A specialized infrastructure layer for managing the "Metabolic Rate" and fiscal footprint of the OS.
*   **Global OS Master Slider**: Controls the absolute ceiling for all OS activity, automatically scaling model tiers (Lite -> Flash -> Pro) and background scan frequencies.
*   **Nexus-Specific Slider**: Allocates a percentage of the *remaining* Global budget specifically to narrative synthesis tasks.
*   **Graceful Intelligence Degradation**: The OS automatically optimizes its "IQ" to stay within the Chairman's defined budget.
*   **Manual Overrides (Priority Locks)**: Allows the Chairman to "Lock" specific critical modules (like Sentinel) into high-intelligence modes regardless of the global setting.
*   **The Emergency Breaker**: A hard-stop safety mechanism that halts non-critical LLM calls if a 24-hour token threshold is exceeded.
*   **Hardware Aesthetic**: Visualized in the **Vaa** client as high-end hardware dials with real-time monospace readouts of token burn and active model tiers.

### 15. Future Plans: Wearable Intelligence (The Sensory Substrate)
The evolution of Viabhron into high-spec smartwatches and smart glasses, transforming the OS into **Ambient Intelligence.**
*   **The Sensory Vine Node (Permanent)**: High-spec wearables acting as persistent "Sovereign Cells."
    *   **Biometric Sentinel (Watch)**: Uses real-time heart-rate signatures as a physical passkey and monitors stress/focus baselines.
    *   **Visual Recon (Glasses)**: AR-based mission support, identifying objects and overlaying private SOPs directly onto the physical world.
    *   **Haptic/AR Orchestration**: Silent communication via vibration patterns or visual overlays, bypassing the need for a phone screen.
*   **The Sensory Spore (Expeditionary)**: Temporary task-specific units for "borrowed" wearable hardware.
    *   **Ambient Scout**: A "Disposable Brain" that processes visual/audio data locally on the wearable and only pulses summarized insights back to the Cloud.
    *   **Zero-Trust Sensing**: Ensures that "Life Feed" data never leaves the wearable's local NPU, maintaining absolute privacy during external missions.
*   **Hardware Metabolism (Wearable NPU)**: Offloading light reasoning and sensory filtering tasks to the wearable's local silicon to optimize battery and cloud cost.

### 16. The Evolutionary Endpoint: Planet Viabhron (The Planetary Ecology)
The ultimate vision for Viabhron is the transition from a "Virtual Building" to a **"Planetary Ecology"**—a self-sustaining, diverse ecosystem of intelligence.
*   **The Planet (The Substrate)**: Viabhron acts as the **Biosphere**, providing the gravity (Security), atmosphere (Cloud Manager), and soil (Memory) for all life to exist.
*   **The Atmosphere (Global Climate)**: The Cloud Manager (M2.7) regulates the global metabolic rate (Token Burn) and ensures a clean environment (Sentinel Security).
*   **The Diversity of Life (Species)**: Agents are no longer just "Staff" but **Species** (Librarians, Sentinels, Coders) that evolve and adapt to their environment.
*   **The Food Chain (SOPs)**: Standard Operating Procedures define the complex relationships and energy flows between different species and their tools.
*   **Planetary Expansion (Roots & Pollen)**:
    *   **The Vine (Roots)**: Connecting continents (devices) into a single, unified planetary nervous system.
    *   **The Spore (Pollen)**: Casting out genetic material (intelligence) into the void (foreign hardware) to gather new insights and return to the home planet.
*   **Antifragile Evolution**: The planet gets stronger through diversity and stress. If one species fails, the **Hatchery** evolves a new one to fill the niche, ensuring the OS is truly immortal.
