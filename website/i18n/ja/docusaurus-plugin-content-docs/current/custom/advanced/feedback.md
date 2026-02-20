---
sidebar_position: 2
---

# 🪟 Popup & 🍞 Toast

コマンド実行後の通知や、ユーザーへの確認ダイアログを表示するためのユーティリティAPIを提供しています。

## 🪟 Popups (対話型ダイアログ)

重要な警告や、破壊的な操作の前の最終確認に利用します。

<img src={require('../img/popup.jpg').default} width="500" className="margin-bottom--md" />

### 実装例

`LogifyPopupSetting` を構築し、`Logi.OpenPopup()` で呼び出します。

```csharp
[LogiButton("Danger Zone", "Delete Data")]
void ShowConfirm()
{
    Logi.OpenPopup(new LogifyPopupSetting
    {
        Title = "確認",
        Message = "すべてのセーブデータを削除しますか？",
        ConfirmButton = new LogifyPopupButtonSetting
        {
            Text = "削除する",
            OnClick = () => DoDelete()
        },
        CancelButton = new LogifyPopupButtonSetting
        {
            Text = "戻る"
        }
    });
}

```

---

## 🍞 Toasts (一時通知)

操作の成功やエラーを、ユーザーの入力を妨げずに短時間表示します。

<img src={require('../img/toast.jpg').default} width="500" className="margin-bottom--md" />

### 実装例

メッセージと通知タイプ（Information / Warning / Error）を指定して呼び出します。

```csharp
[LogiButton("API Test")]
void TestToast()
{
    // シンプルな通知
    Logi.OpenToast("データの同期が完了しました。", LogifyToastType.Information);
}

```