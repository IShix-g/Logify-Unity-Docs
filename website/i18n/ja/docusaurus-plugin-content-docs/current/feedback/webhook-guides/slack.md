---
sidebar_position: 2
---

# 💬 Slack App 連携

Slack の Bot User 機能を利用して、フィードバックを特定のチャンネルに送信するための設定手順です。
Discord と異なり、Slack では「アプリの作成」と「チャンネルへの追加」の2段階の手順が必要です。

---

## OAuthトークンとチャンネルIDの取得 {#create-app}

まず、Slack API サイトで専用のアプリを作成します。

1.  **アプリ作成画面へ移動**  
    ブラウザで **[Slack API: Your Apps](https://api.slack.com/apps)** にアクセスし、**Create New App** ボタンをクリックします。
    <img src={require('./img/slack1.jpg').default} width="500" className="margin-bottom--md" />

2.  **マニフェストモードを選択**  
    設定を簡略化するため、**From a manifest** を選択します。
    <img src={require('./img/slack2.jpg').default} width="500" className="margin-bottom--md" />

3.  **ワークスペースの選択**  
    アプリを開発・インストールするワークスペースを選択します。
    <img src={require('./img/slack3.jpg').default} width="500" className="margin-bottom--md" />

4.  **マニフェスト(YAML)の入力**  
    **YAML** タブを選択し、以下のコードをコピーして貼り付けてください。

    :::tip 設定の変更
    アプリの名称を変更したい場合は、`name` (内部名) と `display_name` (表示名) を編集してください。
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

5.  **権限の確認と作成**
    Bot Scopes に `chat:write` と `files:write` が含まれていることを確認し、**Create** をクリックします。
    <img src={require('./img/slack5.jpg').default} width="500" className="margin-bottom--md" />

---

## インストールとトークン取得 {#install-app}

1.  **ワークスペースへインストール**  
    左側メニューの **OAuth & Permissions** を開き、**Install to [ワークスペース名]** をクリックします。
    <img src={require('./img/slack6.jpg').default} width="500" className="margin-bottom--md" />

    権限のリクエスト画面が表示されたら、「許可する」を選択してください。
    <img src={require('./img/slack7.jpg').default} width="500" className="margin-bottom--md" />

2.  **Bot User OAuth Token のコピー**  
    発行された **Bot User OAuth Token** (`xoxb-` で始まる文字列) をコピーし、控えておきます。これは後ほど Unity 側の設定で使用します。
    <img src={require('./img/slack8.jpg').default} width="500" className="margin-bottom--md" />

---

## チャンネルの設定 {#channel-setup}

Bot は招待されたチャンネルにのみ投稿できます。

1.  **アプリの追加**  
    Slack アプリでフィードバックを受信したいチャンネルを開き、右上の詳細アイコンをクリックします。
    <img src={require('./img/slack9.jpg').default} width="500" className="margin-bottom--md" />

    「インテグレーション」タブを開き、**アプリを追加する** をクリックします。
    <img src={require('./img/slack10.jpg').default} width="500" className="margin-bottom--md" />

    先ほど作成したアプリ（例: `logify-feedback`）を見つけて **追加** します。
    <img src={require('./img/slack11.jpg').default} width="500" className="margin-bottom--md" />

2.  **チャンネル ID の取得**  
    同じくチャンネル詳細画面の一番下にある **チャンネル ID**（例: `C12345678`）をコピーして控えておきます。
    <img src={require('./img/slack12.jpg').default} width="500" className="margin-bottom--md" />

---

## Unity 側の設定 {#unity-setup}

取得した「トークン」と「チャンネルID」を Logify-Unity に組み込みます。

### 1. 設定を開く
メニューバーの `Window > Logify-Unity > Settings` から設定ウィンドウを開きます。

### 2. サービスの選択
**Feedback Integration** セクションの **Feedback Service** ドロップダウンから、`Slack Feedback Service` を選択します。その後、**Secret Generator** の **Open** ボタンをクリックして生成ツールを開きます。

<img src={require('./img/integration-slack1.jpg').default} width="500" className="margin-bottom--md" />

### 3. セキュアな生成
以下の情報を入力し、**Generate** ボタンをクリックします。

* **Slack Token**: 先ほど控えた `xoxb-` から始まるトークン
* **Slack Channel**: 先ほど控えたチャンネル ID

<img src={require('./img/integration-slack2.jpg').default} width="500" className="margin-bottom--md" />

:::info 安全性について
`Generate` を実行すると、難読化された C++ コードと C# Bridge コードが自動生成されます。これにより、ビルド後のバイナリから トークン情報を直接抽出されるリスクを大幅に軽減します。
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
3.  指定した Slack チャンネルに、デバイス情報と共にメッセージが届いていることを確認してください。

<img src={require('../../feature-guide/img/feedback.jpg').default} width="550" className="margin-bottom--md" />

### 📬 受信例

<img src={require('./img/slack13.jpg').default} width="500" className="margin-bottom--md" />

---

### 🗄️ サーバー運用 (Optional)

基本設定はこれで完了です！  
アプリを不特定多数に公開する場合や、より高度なセキュリティ・柔軟な通知（メール連携など）が必要な場合は、サーバー運用というオプションもあります。

* ⚙️ [PHP サーバーセットアップ](../advanced/server-setup.md)  
  独自のバックエンドを構築し、トークンを完全に隠蔽したセキュアな通信を実現します。
* 🛡️ [サーバー運用とセキュリティ](../advanced/secure-server.md)  
  なぜサーバーが必要なのか？メリットとリスク管理について解説します。