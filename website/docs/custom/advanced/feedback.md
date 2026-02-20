---
sidebar_position: 2
---

# 🪟 Popup & 🍞 Toast

Provides utility APIs for displaying notifications after command execution and confirmation dialogs to users.

## 🪟 Popups (Interactive Dialogs)

Use for important warnings or final confirmations before destructive operations.

<img src={require('../img/popup.jpg').default} width="500" className="margin-bottom--md" />

### Implementation Example

Build `LogifyPopupSetting` and call with `Logi.OpenPopup()`.

```csharp
[LogiButton("Danger Zone", "Delete Data")]
void ShowConfirm()
{
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
}

```

---

## 🍞 Toasts (Temporary Notifications)

Display operation success or errors briefly without blocking user input.

<img src={require('../img/toast.jpg').default} width="500" className="margin-bottom--md" />

### Implementation Example

Call by specifying message and notification type (Information / Warning / Error).

```csharp
[LogiButton("API Test")]
void TestToast()
{
    // Simple notification
    Logi.OpenToast("Data synchronization completed.", LogifyToastType.Information);
}

```
