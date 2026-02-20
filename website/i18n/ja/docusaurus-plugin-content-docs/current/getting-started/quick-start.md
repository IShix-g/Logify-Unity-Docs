---
sidebar_position: 2
---

# ⏱️ 10秒で動作を確認する

本プラグインは、インポート後の**初期セットアップが不要**です。導入後、以下のステップですぐに機能を試せます。

### 1. 動作確認の手順 {#testing}

1. Unityエディタで任意のシーンを開き、**Playモード**を開始します。
2. 画面の**左上隅（デフォルト位置）をロングプレス**（長押し）してください。
3. デバッグ用ダイアログが表示されれば成功です。

<img src={require('./img/testing.jpg').default} width="600" />

### 2. 操作のカスタマイズ

**設定：** `Window > Logify-Unity > Settings`

プロジェクトのUI配置に合わせて、起動条件は自由に変更可能です。

**① 判定エリア:** 画面の四隅の調整  
**② 起動トリガー:** ロングプレス / ダブルタップ / トリプルタップ

<img src={require('./img/dialog-setting.jpg').default} width="400" />

---

:::tip 補足
* **シーンを汚さない設計:** `[RuntimeInitializeOnLoadMethod]` を使用して自動生成されるため、既存のシーン構造に影響を与えません
* **有効化/無効化の切り替え:** `Window > Logify-Unity > Settings` から切り替え可能です
* **実機での動作:** iOS / Android の実機環境でも、同様の操作でダイアログを呼び出すことが可能です。
:::