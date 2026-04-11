---
sidebar_position: 1
---

# ⚙️ Settings Guide

The behavior of this plugin can be centrally managed from **Window > Logify > Settings** in the Unity Editor.

<img src={require('./img/settings.jpg').default} width="500" />

---

## 🛠️ General Settings

<img src={require('./img/settings1.jpg').default} width="500" />

Controls when the plugin is activated across the entire application.

| Setting | Description |
| --- | --- |
| **Activation Scope** | Select the build environment where Logify should operate. Choose carefully when including in release builds. Default is Development Build. |
| **Initialization Mode** | **Automatic** is recommended. Automatically initializes when scenes load. Select **Manual** if you want to control initialization timing manually and call `Logi.Initialize()`. Default is **Automatic**. |

---

## 🖱️ Dialog Trigger

Configure how users invoke the feedback screen.

<img src={require('./img/settings2.jpg').default} width="500" />

* **Dialog Trigger Position**: Choose the transparent trigger button placement from the screen's four corners.
* **Dialog Trigger Mode**: Select the trigger response mode.

| Mode | Description |
| --- | --- |
| **Long Press** | Press and hold |
| **Double Tap** | Tap twice consecutively |
| **Triple Tap** | Tap three times consecutively |

:::tip Preview
When the Game Window is displayed, clicking on the **Trigger Position** allows you to confirm the location.
:::

---

## 📊 Debug Utilities

Display real-time performance statistics (Stats) on screen.

### Stats Settings

<img src={require('./img/settings3.jpg').default} width="500" />

#### Activation Scope:

| Target | Description |
| --- | --- |
| **Disabled** | Completely disables the feature |
| **Editor Only** | Operates only within the Unity Editor |
| **Development Build Only** | Operates only on devices with a Development Build |
| **Both** | Operates in both the Editor and Development Builds |

#### Visual Appearance:
* **Mode**: Toggle between `Simple` (FPS/memory only) and detailed display
* **Font Size / Position**: Adjustable to match your device resolution during development

#### Performance Thresholds:
* Set thresholds that change colors (Red/Yellow/Green) according to FPS values

**Update Interval (sec)**: Specify the interval in seconds to update the statistics

### System Utilities {#system-utilities}

<img src={require('./img/settings4.jpg').default} width="500" />

* **Max Log Capacity**: Maximum number of Console Logs retained in memory
* **Enable System Utilities**: Adds features such as FPS adjustment within the [Custom](../custom/overview.md) tab
* **Force Logging In Build**: Controls whether to forcibly collect logs even in non-development builds

---

## 🔗 Feedback Integration

The most important section that determines where collected data is sent.

<img src={require('../feedback/advanced/img/setup4.jpg').default} width="500" />

### Feedback Service

Select the destination protocol.

* **[Http Feedback Service](../feedback/advanced/server-setup.md)**: Send via your own PHP server.
* **[Discord](../feedback/webhook-guides/discord.md) / [Slack Feedback Service](../feedback/webhook-guides/slack.md)**: Send directly to each service in a self-contained manner.

### Secret Generator

Opens a dedicated window to safely obfuscate important information (Webhook URLs and Shared Secrets).
