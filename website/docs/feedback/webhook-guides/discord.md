---
sidebar_position: 1
---

# 🤖 Discord Webhook Integration

Setup procedure for receiving feedback directly using Discord's [Webhook feature](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks).
Automatically generates a C++ native plugin internally to securely handle tokens.

---

## Getting Webhook URL {#get-webhook-url}

First, issue a Webhook URL on the Discord server where you want to receive feedback.

1. **Open Channel Settings**
   Click **Edit Channel (⚙️)** of the text channel where you want to receive feedback.
   <img src={require('./img/discord1.jpg').default} width="400" className="margin-bottom--md" />

2. **Create Webhook**
   Select the **Integrations** tab and click the **Create Webhook** button.
   <img src={require('./img/discord2.jpg').default} width="550" className="margin-bottom--md" />

3. **Copy URL**
   Set a manageable name (e.g., "Logify Feedback") and click **Copy Webhook URL** to save it.
   <img src={require('./img/discord3.jpg').default} width="550" />

---

## Unity Setup {#unity-setup}

Integrate the obtained Webhook URL into Logify-Unity.

#### 1. Open Settings
Open the settings window from the menu bar `Window > Logify-Unity > Settings`.

#### 2. Select Service
In the **Feedback Integration** section, select `Discord Feedback Service` from the **Feedback Service** dropdown. Then click the **Open** button of **Secret Generator** to open the generation tool.

<img src={require('./img/integration-discord1.jpg').default} width="500" className="margin-bottom--md" />

#### 3. Secure Generation
Paste the URL you obtained earlier into the **Webhook URL** field and click the **Generate** button.

<img src={require('./img/integration-discord2.jpg').default} width="500" className="margin-bottom--md" />

:::info About Security
Executing `Generate` automatically generates obfuscated C++ code and C# Bridge code. This significantly reduces the risk of extracting the Webhook URL from the binary after build.
:::

:::caution IL2CPP Build Recommended
To enable protection via C++ plugin, set Scripting Backend to [IL2CPP] in Unity's Build Settings before building.

* **iOS / Android (IL2CPP):** Generated Native C++ Plugin is used, providing strong protection
* **Editor / Android (Mono):** Automatically generated C# fallback code is used for compatibility
:::

---

## 🧪 Testing {#testing}

Once setup is complete, test whether feedback is actually received.

1. Run the app following **[Testing Procedure](../../getting-started/quick-start.md#testing)**.
2. Open the in-game **Custom > Feedback** tab, enter any message, and submit.
3. Verify that the message with device information arrives in the designated Discord channel.

<img src={require('../../feature-guide/img/feedback.jpg').default} width="550" className="margin-bottom--md" />

### 📬 Reception Example
<img src={require('../../feature-guide/img/discord.jpg').default} width="550" />

---

### 🗄️ Server-Side Integration (Optional)

You're all set with the basic configuration!

If you plan to **distribute your build to a wider group of testers**, or if you require enhanced security and flexible notifications (such as email integration), consider using a dedicated backend server.

* ⚙️ **[PHP Server Setup and Operations](../advanced/server-setup.md)** Build your own backend to fully obfuscate tokens and ensure secure, encrypted communication.
* 🛡️ **[Server Operations and Security](../advanced/secure-server.md)** Learn why a server is beneficial for external testing, including the advantages of centralized risk management.