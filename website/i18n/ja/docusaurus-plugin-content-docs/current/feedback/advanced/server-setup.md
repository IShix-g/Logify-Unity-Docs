---
sidebar_position: 1
---

# ⚙️ PHP サーバーセットアップと運用

不特定多数にアプリを配信する場合や、より高いセキュリティ（認証・流量制限）、およびメール連携を求める場合にこの構成を推奨します。

### 📋 システム要件
* **PHP 7.4 以上**
* **HTTPS 環境必須**（SSL通信が確立されていること）
* **SQLite3 サポート**（標準的なレンタルサーバーであれば多くの場合有効です）

---

## 🚀 サーバーのデプロイ

### 1. スクリプトの書き出し
Unity エディタのメニューから `Window > Logify-Unity > Export Server Script` を選択し、PHP ファイル一式を任意の場所に出力します。

<img src={require('./img/setup1.jpg').default} width="550" className="margin-bottom--md" />

### 2. サーバーへのアップロード
出力されたフォルダ（例: `logify-api`）をそのままサーバーへアップロードします。

<img src={require('./img/setup2.jpg').default} width="550" className="margin-bottom--md" />

### 3. セットアップの実行
ブラウザで `setup.php` にアクセスします。
（例: `https://yourdomain.com/logify-api/setup.php`）

このスクリプトは以下の処理を自動で行います。
* データの保存ディレクトリ（`data/`）の作成
* 適切なパーミッション（`chmod`）の設定
* セキュリティ保護用の `.htaccess` 生成
* 初期設定ファイル（`config.php`）の生成

#### 設定完了画面

:::info セットアップ完了後
画面に表示される **Server URL** を必ず控えてください。Unity 側の設定で使用します。
また、セキュリティのため完了後はサーバー上の `setup.php` を手動で削除することを推奨します。
:::

<img src={require('./img/setup3.jpg').default} width="550" className="margin-bottom--md" />

---

## 🛠️ Unity 側の設定

### 1. サービスの選択とURLの設定
`Window > Logify-Unity > Settings` を開き、**Feedback Service** に `HTTP Feedback Service` を選択します。
* **Server Url**: 先ほど控えた URL を入力します。

<img src={require('./img/setup4.jpg').default} width="550" className="margin-bottom--md" />

### 2. 接続情報の入力

* **Secret Generator**: `Open` をクリックして生成ウィンドウを開き、そのまま ①**Generate** を実行します。
* ②**Shared Secret** の値は、次のサーバー設定で使用するため控えておいてください。

<img src={require('./img/setup5.jpg').default} width="550" className="margin-bottom--md" />

:::info 安全性について
`Generate` を実行すると、難読化された C++ コードと C# Bridge コードが自動生成されます。これにより、ビルド後のバイナリから Webhook URL を抽出されるリスクを大幅に軽減します。
:::

:::caution IL2CPP ビルドの推奨
C++ プラグインによる保護を有効にするには、Unity の Build Settings で Scripting Backend を [IL2CPP] に設定してビルドしてください。

* **iOS / Android (IL2CPP):** 生成された Native C++ Plugin が使用され、強力に保護されます
* **Editor / Android (Mono):** 互換性のために自動生成された C# フォールバックコードが使用されます
:::

---

## ⚙️ サーバー構成の詳細設定 {#detailed-config}

セットアップ完了直後の `config.php` は、安全のためすべての通知機能が `false`（無効）になっています。**以下の手順で設定を完了させないと、動作確認テストを行っても通知が届きません。**

### 1. Shared Secret の紐付け

サーバー上の `config.php` を開き、Unity 側の Secret Generator で生成した **Shared Secret** を入力します。これが一致しないリクエストはサーバーで拒絶されます。

### 2. 利用するサービスの有効化とトークン設定

利用したいサービスの `enabled` を `true` に書き換え、必要な情報を入力してください。設定情報は以下の各ガイドを参照して取得してください。

* **[🤖 Discord 連携](../webhook-guides/discord.md)**：Webhook URL の取得方法
* **[💬 Slack 連携](../webhook-guides/slack.md)**：OAuth トークンとチャンネル ID の取得方法
* **[📧 メール連携](./mail.md)**：送信先・送信元アドレスの設定

### 設定例 (`config.php`)

Discordを有効にする

```php
return [
    //1. [必須] Unity側で生成した Shared Secret を入力
    'shared_secret' => 't8Hz4KNqlmI7gXjj8SFvKsu7IwYpBLImrijN_CKieak',

    'services' => [
        'discord' => [
            'enabled'     => true, // true に変更することで有効化
            'webhook_url' => 'https://discord.com/api/webhooks/...' // ガイドを参照して入力
        ],
        'slack' => [
            'enabled' => false, // 利用する場合は true に変更
            'token'   => '',    // xoxb-...
            'channel' => ''     // C...
        ],
        'email' => [
            'enabled' => false, // 利用する場合は true に変更
            'to'      => '', 
            'from'    => '', 
        ],
    ],
    // ...
];

```

### 設定ファイルの確認

`setup.php` の実行が正常に完了すると、ディレクトリ内に `config.php` が自動生成されます。

:::tip ファイルが表示されない場合
FTPクライアント（FileZilla等）をお使いの場合、キャッシュにより新しく生成されたファイルが一覧に反映されないことがあります。**「最新の情報に更新（Refresh）」** を実行して確認してください。
:::

:::warning 編集や上書きができない場合
サーバー環境によっては、PHPスクリプトが生成したファイルの所有権が「実行ユーザー（apache/www-data等）」になり、FTP経由での操作が制限されることがあります。

その場合は、サーバーのコントロールパネル（ファイルブラウザ）を開き、対象ファイルのパーミッションを **`644`** に変更してから編集を行ってください。
:::

:::warning 設定の反映
ファイルを編集した後は、必ず上書き保存（アップロード）を忘れないようにしてください。保存されていない場合、設定が反映されず動作確認に失敗します。
:::

---

## 🧪 動作確認 {#testing}

設定が完了したら、実際にフィードバックが届くかテストを行います。

1. **[動作確認の手順](../../getting-started/quick-start.md#testing)** に沿ってアプリを実行。
2. ゲーム内の **Custom > Feedback** タブから送信。
3. 指定したサービス（Discord/Slack/Email）に通知が届けば成功です。

<img src={require('../../feature-guide/img/feedback.jpg').default} width="550" className="margin-bottom--md" />

---

## 🛡️ 運用とトラブルシューティング

### 1. 悪質ユーザーのブロック（Blacklist）

特定の IP アドレスや `Reporter ID` を手動で拒絶したい場合は、`data/blacklist_???.txt` に 1 行ずつ追記してください。
<img src={require('./img/setup_blacklist.jpg').default} width="550" className="margin-bottom--md" />

### 2. アクセスレポートの確認

`report.php` にアクセスすることで、現在の送信数やブロック状況を確認できます。
URL の末尾に `config.php` で生成された `secret_key` を付与してアクセスします。

* **URL例**: `https://yourdomain.com/logify-api/report.php?key=xxxx`

出力されたサマリーは `data/__database_???.txt` に保存されます。

```shell
=== Logify Access Report (Generated: 2026-02-18 15:39:06) ===
Reporter ID                              | IP / Identifier (Full Hash) | Count | Last Request
---------------------------------------------------------------------------------------------------
d115e86e-ca84-4431-8781-06240224d72b     | 888.50.222.281              | 1     | 2026-02-18 15:33:17

=== Auto Blocked Clients ===
Reporter ID   | IP    | Active     | Blocked Until       | Last Violation      | Reason
----------------------------------------------------------------------------------------
...
```

<img src={require('./img/setup_database.jpg').default} width="550" className="margin-bottom--md" />

### 3. デバッグログ

送信に失敗する場合やサーバーエラー（500）が出る場合は、`data/debug_???.log` を確認してください。詳細なスタックトレースが記録されます。

### 4. 高度な設定（Rate Limit / Auto Block）

`config.php` 内の数値を調整することで、ブルートフォース攻撃や連続送信への対策を強化できます。

* **`rate_limit`**: 1ユーザーあたりの送信頻度（例：1時間に3回まで）。
* **`auto_block`**: 短時間に大量の違反リクエストを送ったユーザーを自動で一定時間隔離します。

```