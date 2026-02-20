---
sidebar_position: 3
---

# 🚀 Implementation Example: Form

By combining features, you can implement advanced debugging functionality such as sending bug reports with screenshots during device testing.

<img src={require('../../feature-guide/img/feedback.jpg').default} width="550" className="margin-bottom--md" />

### 🛠️ Implementation Points

This sample combines the following techniques:

1. **Context-Driven (`LogiViewContext`):** Retaining and clearing input values
2. **Preview Feature (`LogiPreview`):** Immediate display of captured screenshots
3. **Asynchronous Processing:** Preventing duplicate submissions during communication and toast notifications
4. **Lifecycle Management:** Proper texture memory release via `IDisposable`

### 📄 Feedback Form Sample Code (Simplified)

```csharp
public sealed class FeedbackForm : ILogiCommandGroup, IDisposable
{
    public string GroupName => "Feedback";
    public int Priority => 9999;

    public enum ReportType { Bug, Feedback }

    ReportType _reportType;
    string _userMessage;
    Sprite _captureSprite;
    bool _isSending;

    // --- UI Definition ---

    [LogiInput("Report Type <color=red>*</color>")]
    ReportType ReportTypeInput(ReportType type, LogiViewContext context)
    {
        if (context == LogiViewContext.ValueChanged) _reportType = type;
        return _reportType;
    }

    [LogiTextArea("Message <color=red>*</color>")]
    string MessageInput(string msg, LogiViewContext context)
    {
        if (context == LogiViewContext.ValueChanged) _userMessage = msg;
        return _userMessage;
    }

    [LogiButton(title:"Screenshot", buttonName:"Capture")]
    void StartCapture()
    {
        // Execute screenshot capture logic (Coroutine, etc.) and
        // store result in _captureSprite
    }

    [LogiPreview("Preview")]
    Sprite ScreenshotPreview() => _captureSprite;

    [LogiButton("Send Feedback", "Send")]
    async void Send()
    {
        // 1. Prevent duplicate submission and validation
        if (_isSending) return;

        if (string.IsNullOrEmpty(_userMessage))
        {
            Logi.OpenToast("Message is required.", LogifyToastType.Error);
            return;
        }

        try
        {
            _isSending = true;
            Logi.OpenToast("Submitting feedback...", LogifyToastType.Information);

            // 2. Execute asynchronous submission
            // Send including screenshot (byte[]) and logs (LogEntries) in context
            var result = await _dispatcher.SendFeedbackAsync(new FeedbackContext(
                message: _userMessage,
                isBug: _reportType == ReportType.Bug,
                screenshot: _captureSprite?.texture?.EncodeToJPG(75)
            ));

            // 3. Feedback based on result
            if (result.IsSuccess)
            {
                Logi.OpenToast("Submission completed successfully!", LogifyToastType.Information);
                ClearForm(); // Reset form only on success
            }
            else
            {
                // Failure due to server-side or communication error
                Logi.OpenToast($"Submission failed: {result.ErrorMessage}", LogifyToastType.Error);
                Debug.LogError($"[Logify] Feedback failed: {result.ErrorMessage}");
            }
        }
        catch (Exception e)
        {
            // Catch unexpected exceptions (network interruption, etc.)
            Logi.OpenToast("An unexpected error occurred.", LogifyToastType.Error);
            Debug.LogException(e);
        }
        finally
        {
            _isSending = false;
        }
    }

    void ClearForm()
    {
        _userMessage = string.Empty;
        ReleaseSprite(); // Dispose texture
    }

    public void Dispose() => ReleaseSprite();

    void ReleaseSprite() { /* Object.Destroy, etc. */ }
}

```
