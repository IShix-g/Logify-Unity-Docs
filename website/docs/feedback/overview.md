---
sidebar_position: 1
---

# 🏁 概要

# フィードバックシステム概要

テスターや開発メンバーから直接フィードバックを受け付けるための専用フォームを提供します。
[Custom](../custom/overview.md) タブ内に自動的に `Feedback` タブが追加され、そこから報告を行うことができます。

![Feedback Form](../feature-guide/img/feedback.jpg)

## 🎯 主な機能

1.  **コンテキスト情報の自動収集**:
    ユーザーが入力するメッセージ以外に、OS情報、メモリ状況、FPS、スタックトレースなどを自動で付与します。
2.  **スクリーンショット添付**:
    Captureボタンをクリックして、送信データに含めます。
3.  **高度なセキュリティ対策**:
    連携モードに応じて、最適な保護機能が適用されます。
    * **サーバー連携時**:
      送信ペイロードはHMACにより署名され、通信経路およびサーバー側での改ざんを防止します。
    * **直接連携時(IL2CPPビルドのみ)**:
      `Secret Generator` が動的に生成する **C++ネイティブプラグイン（Native Bridge）** を介して機密情報（トークンなど）を扱います。メモリダンプや静的解析によるトークン抽出を著しく遅延させ、セキュリティリスクを最小限に抑えます。

---

## 🆔 Reporter ID について

フィードバックには、送信元を識別するための `reporter_id` が付与されます。

:::info Reporter ID の仕様
`reporter_id` は端末ごとに生成される一意のIDです。
**アプリをアンインストール（再インストール）すると、このIDは再生成され、新しい値になります。**
:::

これにより、ログイン機能を実装していない開発段階のアプリでも「どの端末（テスター）からの報告か」を区別することが可能です。

---

## 📊 自動収集されるデータ一覧

ユーザーが入力する「メッセージ」と「レポート種別（Bug/Feedback）」に加え、以下の技術データが自動的に送信されます。

### 📱 アプリケーション・環境情報

| 説明 | 取得ソース / 備考 |
| --- | --- |
| **ゲームタイトル** | `Application.productName` |
| **バンドルID / パッケージ名** | `Application.identifier` |
| **アプリバージョン** | `Application.version` |
| **Unityのバージョン** | `Application.unityVersion` |
| **インストール元ストア名** | `Application.installerName` (Editor時は "N/A") |
| **スクリプティングバックエンド** | `IL2CPP` または `Mono` |

### 💻 デバイス・OS情報

| 説明 | 取得ソース / 備考 |
| --- | --- |
| **プラットフォーム** | `Application.platform` (Android, IPhonePlayer, etc.) |
| **OSバージョン詳細** | `SystemInfo.operatingSystem` |
| **デバイスモデル名** | `SystemInfo.deviceModel` |
| **システム言語** | `Application.systemLanguage` |

### 🖥️ ディスプレイ・GPU情報

| 説明 | 取得ソース / 備考 |
| --- | --- |
| **画面解像度（幅）** | `Screen.width` |
| **画面解像度（高さ）** | `Screen.height` |
| **画面密度 (DPI)** | `Screen.dpi` |
| **リフレッシュレート** | `Screen.currentResolution` (F3形式) |
| **GPU名** | `SystemInfo.graphicsDeviceName` |
| **GPUタイプ** | `SystemInfo.graphicsDeviceType` (Metal, Vulkan, etc.) |
| **VRAM容量 (MB)** | `SystemInfo.graphicsMemorySize` |

### 🚀 パフォーマンス・実行状態

| 説明 | 取得ソース / 備考 |
| --- | --- |
| **システムメモリ (MB)** | `SystemInfo.systemMemorySize` |
| **アプリ起動経過時間** | `Time.realtimeSinceStartup` |
| **送信時の推定FPS** | `1.0f / Time.smoothDeltaTime` |
| **現在のアクティブシーン** | `SceneManager.GetActiveScene().name` |

---

## 📎 添付ファイル

テキストデータに加え、マルチパートフォームデータとして以下のファイルが含まれます。

1.  **screenshot** (`.jpg`)
    * キャプチャボタンでスクリーンショットを撮影（JPEG圧縮）
    * UIの状態やバグの見た目を即座に確認できます
2.  **logs** (`.txt`)
    * 直近のログ（Warning / Error）とそれに対応するスタックトレースのダンプ
    * エラー発生時のコールスタック解析に使用します

---

## 📋 Discordの受信例
<img src={require('../feature-guide/img/discord.jpg').default} width="550" />

---

## 🚀 次のステップ

フィードバックを受け取るための連携設定を行ってください。

#### 🔌 手軽に連携する（サーバー不要）
開発初期や、少人数のテストに最適です。
* **[🤖 Discord Webhook 連携](./webhook-guides/discord.md)**
* **[💬 Slack App 連携](./webhook-guides/slack.md)**

#### 🛡️ 堅牢に運用する（サーバー利用）
不特定多数の人がインストールする場合や、より高いセキュリティ・柔軟性を求める場合。  
メール連携をしたい場合に推奨します。
* **[⚙️ PHP サーバーセットアップ](./advanced/server-setup.md)**