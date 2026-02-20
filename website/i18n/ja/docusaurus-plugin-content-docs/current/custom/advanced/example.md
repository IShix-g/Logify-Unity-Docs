---
sidebar_position: 3
---

# 🚀 実装例：フォーム

機能を組み合わせることで、実機テスト中にスクリーンショット付きのバグレポートを送信するような、高度なデバッグ機能を実装できます。

<img src={require('../../feature-guide/img/feedback.jpg').default} width="550" className="margin-bottom--md" />

### 🛠️ 実装のポイント

このサンプルでは、以下のテクニックを組み合わせています：

1. **コンテキスト駆動 (`LogiViewContext`):** 入力値の保持とクリア
2. **プレビュー機能 (`LogiPreview`):** 撮影したスクリーンショットの即時表示
3. **非同期処理:** 通信中の二重送信防止とトースト通知
4. **ライフサイクル管理:** `IDisposable` によるテクスチャメモリの適切な解放

### 📄 フィードバックフォームのサンプルコード (Simplified)

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
        // スクリーンショット撮影ロジック (Coroutine等) を実行し
        // _captureSprite に結果を格納する
    }
    
    [LogiPreview("Preview")]
    Sprite ScreenshotPreview() => _captureSprite;

    [LogiButton("Send Feedback", "Send")]
    async void Send()
    {
        // 1. 二重送信防止とバリデーション
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
    
            // 2. 非同期送信処理の実行
            // スクリーンショット（byte[]）やログ（LogEntries）をコンテキストに含めて送信
            var result = await _dispatcher.SendFeedbackAsync(new FeedbackContext(
                message: _userMessage,
                isBug: _reportType == ReportType.Bug,
                screenshot: _captureSprite?.texture?.EncodeToJPG(75)
            ));
    
            // 3. 結果に応じたフィードバック
            if (result.IsSuccess)
            {
                Logi.OpenToast("Submission completed successfully!", LogifyToastType.Information);
                ClearForm(); // 成功時のみフォームをリセット
            }
            else
            {
                // サーバー側や通信エラーによる失敗
                Logi.OpenToast($"Submission failed: {result.ErrorMessage}", LogifyToastType.Error);
                Debug.LogError($"[Logify] Feedback failed: {result.ErrorMessage}");
            }
        }
        catch (Exception e)
        {
            // 予期せぬ例外（ネットワーク遮断など）の捕捉
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
        ReleaseSprite(); // テクスチャの破棄
    }

    public void Dispose() => ReleaseSprite();
    
    void ReleaseSprite() { /* Object.Destroy 等の処理 */ }
}

```