---
sidebar_position: 2
---

# 💬 Slack App Integration

Setup procedure for sending feedback to specific channels using Slack's Bot User feature.
Unlike Discord, Slack requires a two-step process: "creating the app" and "adding to channel".

---

## Getting OAuth Token and Channel ID {#create-app}

First, create a dedicated app on the Slack API site.

1. **Navigate to App Creation Screen**
   Access **[Slack API: Your Apps](https://api.slack.com/apps)** in browser and click the **Create New App** button.
   <img src={require('./img/slack1.jpg').default} width="500" className="margin-bottom--md" />

2. **Select Manifest Mode**
   Select **From a manifest** to simplify configuration.
   <img src={require('./img/slack2.jpg').default} width="500" className="margin-bottom--md" />

3. **Select Workspace**
   Select the workspace where you want to develop and install the app.
   <img src={require('./img/slack3.jpg').default} width="500" className="margin-bottom--md" />

4. **Enter Manifest (YAML)**
   Select the **YAML** tab and copy-paste the following code.

   :::tip Changing Settings
   To change the app name, edit `name` (internal name) and `display_name` (display name).
   :::

   ```yaml
   _metadata:
     major_version: 1
     minor_version: 1
   display_information:
     name: logify-feedback
     description: Bot tokens created for this app can just post messages to channels they're invited to
     background_color: "#d982b5"
   features:
     bot_user:
       display_name: Feedback
       always_online: true
     app_home:
       home_tab_enabled: false
       messages_tab_enabled: false
   oauth_config:
     scopes:
       bot:
         - chat:write
         - files:write
   ```
   <img src={require('./img/slack4.jpg').default} width="500" className="margin-bottom--md" />

5. **Confirm Permissions and Create**
   Verify that Bot Scopes includes `chat:write` and `files:write`, then click **Create**.
   <img src={require('./img/slack5.jpg').default} width="500" className="margin-bottom--md" />

---

## Installing and Getting Token {#install-app}

1. **Install to Workspace**
   Open **OAuth & Permissions** in the left menu and click **Install to [Workspace Name]**.
   <img src={require('./img/slack6.jpg').default} width="500" className="margin-bottom--md" />

   When the permission request screen appears, select "Allow".
   <img src={require('./img/slack7.jpg').default} width="500" className="margin-bottom--md" />

2. **Copy Bot User OAuth Token**
   Copy the issued **Bot User OAuth Token** (string starting with `xoxb-`) and save it. This will be used later in Unity settings.
   <img src={require('./img/slack8.jpg').default} width="500" className="margin-bottom--md" />

---

## Channel Setup {#channel-setup}

Bots can only post to channels they are invited to.

1. **Add App**
   Open the Slack app, navigate to the channel where you want to receive feedback, and click the details icon in the upper right.
   <img src={require('./img/slack9.jpg').default} width="500" className="margin-bottom--md" />

   Open the "Integrations" tab and click **Add apps**.
   <img src={require('./img/slack10.jpg').default} width="500" className="margin-bottom--md" />

   Find and **Add** the app you created earlier (e.g., `logify-feedback`).
   <img src={require('./img/slack11.jpg').default} width="500" className="margin-bottom--md" />

2. **Get Channel ID**
   Copy the **Channel ID** (e.g., `C12345678`) at the bottom of the same channel details screen and save it.
   <img src={require('./img/slack12.jpg').default} width="500" className="margin-bottom--md" />

---

## Unity Setup {#unity-setup}

Integrate the obtained "token" and "channel ID" into Logify-Unity.

### 1. Open Settings
Open the settings window from the menu bar `Window > Logify-Unity > Settings`.

### 2. Select Service
In the **Feedback Integration** section, select `Slack Feedback Service` from the **Feedback Service** dropdown. Then click the **Open** button of **Secret Generator** to open the generation tool.

<img src={require('./img/integration-slack1.jpg').default} width="500" className="margin-bottom--md" />

### 3. Secure Generation
Enter the following information and click the **Generate** button.

* **Slack Token**: Token starting with `xoxb-` saved earlier
* **Slack Channel**: Channel ID saved earlier

<img src={require('./img/integration-slack2.jpg').default} width="500" className="margin-bottom--md" />

:::info About Security
Executing `Generate` automatically generates obfuscated C++ code and C# Bridge code. This significantly reduces the risk of directly extracting token information from the binary after build.
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
3. Verify that the message with device information arrives in the designated Slack channel.

<img src={require('../../feature-guide/img/feedback.jpg').default} width="550" className="margin-bottom--md" />

### 📬 Reception Example

<img src={require('./img/slack13.jpg').default} width="500" className="margin-bottom--md" />

---

### 🗄️ Server-Side Integration (Optional)

You're all set with the basic configuration!

If you plan to **distribute your build to a wider group of testers**, or if you require enhanced security and flexible notifications (such as email integration), consider using a dedicated backend server.

* ⚙️ **[PHP Server Setup and Operations](../advanced/server-setup.md)** Build your own backend to fully obfuscate tokens and ensure secure, encrypted communication.
* 🛡️ **[Server Operations and Security](../advanced/secure-server.md)** Learn why a server is beneficial for external testing, including the advantages of centralized risk management.