---
sidebar_position: 1
---

# 🤖 Discord Webhook 連携

Discordの[Webhook 機能](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks)を利用して直接フィードバックを受信するための設定手順です。
トークンを安全に扱うため、内部で C++ ネイティブプラグインを自動生成します。

---

## Webhook URL の取得 {#get-webhook-url}

まず、フィードバックを受信したい Discord サーバーで Webhook URL を発行します。

1.  **チャンネル設定を開く**  
    フィードバックを受信したいテキストチャンネルの **Edit Channel (⚙️)** をクリックします。
    <img src={require('./img/discord1.jpg').default} width="400" className="margin-bottom--md" />

2.  **Webhook を作成**  
    **Integrations** タブを選択し、**Create Webhook** ボタンをクリックします。
    <img src={require('./img/discord2.jpg').default} width="550" className="margin-bottom--md" />

3.  **URL をコピー**  
    管理しやすい名称（例: "Logify Feedback"）を設定し、**Copy Webhook URL** をクリックして保存しておきます。
    <img src={require('./img/discord3.jpg').default} width="550" />

---

## Unity 側の設定 {#unity-setup}

取得した Webhook URL を Logify-Unity に組み込みます。

#### 1. 設定を開く
メニューバーの `Window > Logify-Unity > Settings` から設定ウィンドウを開きます。

#### 2. サービスの選択
**Feedback Integration** セクションの **Feedback Service** ドロップダウンから、`Discord Feedback Service` を選択します。その後、**Secret Generator** の **Open** ボタンをクリックして生成ツールを開きます。

<img src={require('./img/integration-discord1.jpg').default} width="500" className="margin-bottom--md" />

#### 3. セキュアな生成
**Webhook URL** フィールドに先ほど取得した URL をペーストし、**Generate** ボタンをクリックします。

<img src={require('./img/integration-discord2.jpg').default} width="500" className="margin-bottom--md" />

:::info 安全性について
`Generate` を実行すると、難読化された C++ コードと C# Bridge コードが自動生成されます。これにより、ビルド後のバイナリから Webhook URL を抽出されるリスクを大幅に軽減します。
:::

:::caution IL2CPP ビルドの推奨
C++ プラグインによる保護を有効にするには、Unity の Build Settings で Scripting Backend を [IL2CPP] に設定してビルドしてください。

* **iOS / Android (IL2CPP):** 生成された Native C++ Plugin が使用され、強力に保護されます
* **Editor / Android (Mono):** 互換性のために自動生成された C# フォールバックコードが使用されます
:::

---

## 🧪 動作確認 {#testing}

設定が完了したら、実際にフィードバックが届くかテストを行います。

1.  **[動作確認の手順](../../getting-started/quick-start.md#testing)** に沿ってアプリを実行します。
2.  ゲーム内の **Custom > Feedback** タブを開き、任意のメッセージを入力して送信します。
3.  指定した Discord チャンネルに、デバイス情報と共にメッセージが届いていることを確認してください。

<img src={require('../../feature-guide/img/feedback.jpg').default} width="550" className="margin-bottom--md" />

### 📬 受信例
<img src={require('../../feature-guide/img/discord.jpg').default} width="550" />