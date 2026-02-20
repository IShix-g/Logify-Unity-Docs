---
sidebar_position: 2
---

# 🚀 Scripting API (Logi Class)

All major features of `Logify` can be accessed through the `Logi` class.

:::info Namespace
```csharp
using Logify;
```
:::

## 🔹 Lifecycle

Initialization is typically performed automatically based on settings, but manual control is also possible.

| Method | Description |
| --- | --- |
| **`Initialize()`** | Manually initializes Logify (use when not in `Automatic` mode). |
| **`Release()`** | Releases Logify resources. Usually not required. |
> **💡 Tips:** In `Automatic` mode, Initialize cannot be called. To switch to `Manual` mode, see [Settings - Activation Scope](./setting.md).
```csharp
Logi.Initialize();
```

## 🔹 Dialog & UI Operations

Control debug menus and feedback screens from scripts.

| Method | Description |
| --- | --- |
| **`OpenDialog()`** | Opens the feedback/debug menu. |
| **`CloseDialog()`** | Closes the currently open dialog. |
| **`OpenPopup(LogifyPopupSetting)`** | Displays a custom popup. |
| **`OpenToast(string, LogifyToastType)`** | Shows a notification (toast) at the bottom of the screen. `ShowLog/Warning/Error` are also available. |

> **💡 Tips:** `OpenToast` only appears on screen while a dialog is displayed.

```csharp
// Display popup
Logi.OpenPopup(new LogifyPopupSetting
{
    Title = "Confirmation",
    Message = "Delete all save data?",
    ConfirmButton = new LogifyPopupButtonSetting
    {
        Text = "Delete",
        OnClick = () => DoDelete()
    },
    CancelButton = new LogifyPopupButtonSetting
    {
        Text = "Cancel"
    }
});

// Display notification
Logi.OpenToast("Data synchronization completed.", LogifyToastType.Information);
```

## 🔹 Custom Command Registration

Add your own debug buttons and commands to the Logify menu.

| Method | Description |
| --- | --- |
| **`Register(instance/type)`** | Registers methods in the specified instance or class as commands. |
| **`Unregister(instance/type)`** | Unregisters registered commands. |
| **`AddTo(instance)`** | Helps prevent forgetting to unregister. |

> **💡 Tips:** Registering `static` classes is supported but **not recommended.** See [Handling Static Classes](../custom/initialization.md#static-warning) for details.

#### From Registration to Unregistration

```csharp
// Registration
void Awake() => Logi.Register(this, "Tests (Instance)", 1);

// Must unregister on destroy
void OnDestroy() => Logi.Unregister(this);

[LogiButton("Test Button", "Execute")]
void Test() => Debug.Log("Test");
// ...
```

#### Using `AddTo`

```csharp
// Can bind lifecycle similar to Observable in UniRx
void Awake()
    => Logi.Register(this, "Tests (Instance)", 1)
       .AddTo(this); // Added

// No need for manual unregistration
// void OnDestroy() => Logi.Unregister(this);
// ...
```

#### Registering `static` Classes

```csharp
Logi.Register(typeof(TestStaticClass), "Tests (static)", 2);
```

## 🔹 Accessing Log Data

Directly access log entries accumulated in memory.

| Method | Description |
| --- | --- |
| **`GetLogEntries(err, warn, info)`** | Gets the list of currently held logs. Useful for implementing custom report submission logic. |
> **💡 Tips:** To use this in release builds, enable `Force Logging In Build` in settings.
```csharp
// You can adjust which logs to include via arguments.
List<ConsoleEntry> entries = Logi.GetLogEntries(showError: true, showWarning: true, showInfo: true);
// Array can be converted to formatted string.
var formattedString = entries.ToFormattedString();
```
