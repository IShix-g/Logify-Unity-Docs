---
sidebar_position: 2
---

# 📋 Requirements

* **Unity:** 2022.3+
* **Platforms:** iOS 12+ / Android Lollipop 5.1 (API 22)+
* **Scripting Backend:** IL2CPP (recommended) / Mono supported

:::info
**💡 Additional Notes**

This plugin has been tested and verified on iOS / Android devices.

* **Platform Compatibility**
  While it should theoretically work in any environment where the `Resources` API is available, operation on platforms other than those listed above is not officially supported.
* **Resource Management Safety**
  Although the plugin uses the `Resources` folder internally, **it does not generate files that are included in builds.** You can safely integrate it without worrying about unnecessary assets being included in release builds (store distribution binaries).
:::
