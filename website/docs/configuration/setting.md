---
sidebar_position: 1
---

# ⚙️ Settings (設定ガイド)

本プラグインの動作振る舞いは、Unityエディタ上の **Window > Logify-Unity > Settings** から一括で管理できます。

<img src={require('./img/settings.jpg').default} width="500" />

---

## 🛠️ 全般設定 (General)

アプリ全体での Logify の有効化タイミングを制御します。

| 設定項目 | 説明                                                                                                                              |
| --- |---------------------------------------------------------------------------------------------------------------------------------|
| **Activation Scope** | Logifyを動作させるビルド環境を選択します。リリースビルドに含める際は慎重に選択してください。初期値は、Development Buildです。                                                      |
| **Initialization Mode** | **Automatic** を推奨します。シーンロード時に自動で初期化されます。手動で初期化タイミングを制御したい場合は **Manual** を選択して`Logi.Initialize()`を呼んでください。初期値は **Automatic** です。 |

---

## 🖱️ ダイアログ・トリガー (Dialog Trigger)

ユーザーがフィードバック画面を呼び出す方法を設定します。

* **Dialog Trigger Position**: 画面の四隅から、トリガーとなる透明ボタンの配置場所を選択します。
* **Dialog Trigger Mode**: トリガーの反応形式を選択します。
* **Long Press**: 誤爆を防ぐため、長押し（デフォルト）での起動を推奨します。
* **Tap**: シンプルなタップで起動します。

:::tip Preview
Game Windowを表示していると **Trigger Position** をクリックした際、位置を確認できます。
:::

---

## 📊 デバッグユーティリティ (Debug Utilities)

画面上にリアルタイムのパフォーマンス統計（Stats）を表示します。

### Stats Settings

#### Visual Appearance:
* **Mode**: `Simple`（FPS/メモリのみ）や詳細表示を切り替えます
* **Font Size / Position**: 開発中の端末解像度に合わせて調整可能です

#### Performance Thresholds:
* FPSの数値に応じて色（Red/Yellow/Green）を変化させるしきい値を設定します

### System Utilities

* **Max Log Capacity**: メモリ内に保持するログ（Console Log）の最大行数です
* **Force Logging In Build**: 開発用ビルド以外でも強制的にログを収集するかどうかを制御します

---

## 🔗 フィードバック連携 (Feedback Integration)

収集したデータをどこに送信するかを決定する、最も重要なセクションです。

<img src={require('../feedback/advanced/img/setup4.jpg').default} width="500" />

### Feedback Service

送信先プロトコルを選択します。

* **[Http Feedback Service](../feedback/advanced/server-setup.md)**: 自前のPHPサーバーを経由して送信します）。
* **[Discord](../feedback/webhook-guides/discord.md) / [Slack Feedback Service](../feedback/webhook-guides/slack.md)**: アプリ完結型で各サービスへ直接送信します。

### Secret Generator

重要情報（Webhook URLやShared Secret）を安全に難読化するための専用ウィンドウを開きます。