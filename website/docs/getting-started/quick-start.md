---
sidebar_position: 2
---

# ⏱️ Verify in 10 Seconds

This plugin requires **no initial setup** after import. You can test functionality immediately after installation with the following steps.

### 1. Testing Procedure {#testing}

1. Open any scene in the Unity Editor and enter **Play mode**.
2. **Long press** the **top-left corner** (default position) of the screen.
3. If the debug dialog appears, the setup is successful.

<img src={require('./img/testing.jpg').default} width="600" />

### 2. Customizing Controls

**Settings:** `Window > Logify-Unity > Settings`

The activation conditions can be freely adjusted to match your project's UI layout.

**① Detection Area:** Adjust to any screen corner
**② Activation Trigger:** Long press / Double tap / Triple tap

<img src={require('./img/dialog-setting.jpg').default} width="400" />

---

:::tip Notes
* **Clean Scene Design:** Auto-generated using `[RuntimeInitializeOnLoadMethod]`, so it doesn't affect existing scene structure
* **Enable/Disable Toggle:** Can be switched from `Window > Logify-Unity > Settings`
* **Device Operation:** Works the same way on iOS / Android devices with similar gestures.
:::