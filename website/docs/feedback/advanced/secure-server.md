---
sidebar_position: 3
---

# 🛡️ Server Operations and Security

## Why "App-Only" is Insufficient?

This plugin uses "Secret Generator" to convert critical information into C++ native plugins, increasing resistance to binary analysis. However, this is merely a **first line of defense**.

### 1. Difference Between "Obfuscation" and "Isolation"

C++ plugin protection is "obfuscation". It makes information harder to read, but data still exists within the device. In contrast, server operations enable information **"isolation"**.

* **App-Only Type:** Webhook URLs and API keys are contained in binary. Once extracted, attackers can use the key freely
* **Server-Mediated Type:** App holds only "shared key (Shared Secret)", and **truly critical information (Discord URL, Slack token, mail server credentials) exists only inside the server**

### 2. Minimizing Attack Impact

Even if "Shared Secret" inside device leaks through analysis, having a server allows instant defensive measures:

* **Rate Limiting:** Blocks spam attacks like 100 submissions per minute by IP or Reporter ID. In app-only type, no way to stop attackers directly hitting webhooks.
* **Credential Invalidation:** Can invalidate leaked tokens or replace with new keys through server-side configuration alone, without updating app.
* **Dynamic Blacklist:** Can immediately BAN specific malicious users (Reporter ID) server-side.

### 3. Tampering Detection Role (HMAC Signature)

Server configuration performs **HMAC (Hash-based Message Authentication Code)** signature verification for each request.

This prevents "replay attacks" (resending copied packets) and "tampering" (arbitrarily rewriting submission content). Server only forwards requests to external services (Discord, etc.) when signature is correct.

---

### Summary

**"What's on device will eventually be stolen"**.
Stand on this premise and design so that even if stolen, it won't be fatal. That's the greatest advantage of server configuration.

Of course, "app-only type" simplicity is a powerful weapon in closed development environments. However, **when inviting external testers beyond development team or conducting public beta tests** where app spreads beyond your reach, this server configuration becomes strong insurance.

By leaving "what if" risk hedging to the server, developers can focus on feedback collection and improvement with peace of mind.
