---
slug: /
sidebar_position: 1
title: 🏁 概要
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

![logo](/img/header.gif)

# 🏁 概要

**Logify-Unity** は、Unityモバイルゲーム開発における「実機デバッグの煩わしさ」を解消するために設計された、高機能ランタイム・デバッグツールです。

### ✨ 主な機能

Logify-Unityは、実機デバッグに必要なツールを統合した、以下の5つの主要機能を備えています。

### 📊 [Performance Stats](../features/stats.md)

実行中のパフォーマンスをリアルタイムで監視します。

<Tabs className="margin-bottom--md">
<TabItem value="good" label="Good" default>
<img src={require('./img/stats-good.jpg').default} width="500" />
</TabItem>
<TabItem value="warn" label="Warning">
<img src={require('./img/stats-warn.jpg').default} width="500" />
</TabItem>
<TabItem value="bad" label="Bad">
<img src={require('./img/stats-bad.jpg').default} width="500" />
</TabItem>
</Tabs>

* **FPS:** 急激なフレームレートの推移をカラーリング（警告色）で視覚的に通知します
* **メモリ監視:** 種類別にメモリの使用量を表示

### 💻 [In-Game Console](../features/console.md)

Unity EditorのConsoleウィンドウとほぼ同等の体験を実機上で提供します。

<img src={require('./img/console.jpg').default} width="500" />

* **ログ出力:** `Debug.Log` などの標準出力をキャッチ
* **フィルタリング:** ログレベル（Log/Warning/Error）による絞り込み、スタックトレースの確認が可能です

### ⚙️ [System - Detailed](../features/system.md)

動作している端末のハードウェア・ソフトウェア情報を一括表示します。

<img src={require('./img/system.jpg').default} width="500" className="margin-bottom--md" />

* **環境確認:** OSバージョン、モデル名、グラフィックスAPI、メモリ量など、不具合調査に必要な環境情報を即座に参照できます

### 🛠️ [Custom Menus](../custom/overview.md)

プロジェクト固有のデバッグ機能を最小限のコードで追加できます。

<img src={require('./img/custom.jpg').default} width="500" className="margin-bottom--md" />

* **独自UI:** スクリプトからアトリビュートを付与した関数を定義するだけで、ボタン、スライダー、入力フィールドなどを管理画面に追加可能
* **インスタンス操作:** 実行中のシングルトンや特定オブジェクトのパラメータを動的に変更できます

#### コードサンプル
```csharp
using Logify;

[LogiButton("Test Button", "Execute")]
void Test()
{
    Debug.Log("Test");
}

[LogiButton("Test Integer")]
void Test(int integer)
{
    Debug.Log("Test Integer: " + integer);
}
```

### 📧 [Feedback](../feedback/overview.md)

テスターや開発メンバーからのフィードバックを受け付けるフォームです。

<img src={require('./img/feedback.jpg').default} width="500" className="margin-bottom--md" />

#### Discordの受信例:
<img src={require('./img/discord.jpg').default} width="500" className="margin-bottom--md" />

* **マルチ連携:** ゲーム内から直接 **Slack / Discord / メール** へ報告を送信[*1]
* **自動添付:** 送信時のSystem情報、直近のログを自動的にパッケージングして送信可能です
* **スクリーンショット:** スクリーンショットも添付できます

:::note
`*1` メール送信機能を利用するには、中継用のエンドポイント（Server-side API）が必要です。即座に運用可能な PHP スクリプトをパッケージに同梱しています。PHPが利用できるサーバーであれば誰でも簡単に導入できます。詳しくは[サーバーセットアップ](../feedback/advanced/server-setup.md)をごらんください。
:::

---

### 🚀 開発の背景
モバイル開発において、エディタ上では再現しない実機特有の不具合調査は常に困難を極めます。本ライブラリは、シーンを汚さず、最小限の導入コストで、実機での内部状態の可視化と操作を可能にします。

### ✨ 主な特徴
* **Zero Setup:** プレハブの配置や初期化コードの記述は不要です
* **Low Overhead:** 非表示時はリソースをほぼ消費せず、パフォーマンスへの影響を最小限に抑えています
* **Native Feel:** iOS/Androidのタッチ入力に最適化された直感的な操作感
* **Clean Build:** 独自のストリッピング機構により、リリースビルドへの不要なリソース混入を防ぎます

### 🛠 動作の仕組み
内部的に `[RuntimeInitializeOnLoadMethod]` を使用して常駐します。既存の `EventSystem` や UI 構造を書き換えたりPrefabを設置したりする必要はありません。