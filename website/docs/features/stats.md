---
sidebar_position: 1
---

# 📊 Performance Stats

ゲームの動作状況をリアルタイムで監視するためのオーバーレイ表示機能です。
FPS（フレームレート）や各種メモリ使用量を常に確認でき、パフォーマンスのボトルネックを早期に発見するのに役立ちます。

<img src={require('../feature-guide/img/stats.jpg').default} width="550" />

### 🛠️ 主な表示項目

* **FPS:** フレームレート。現在の処理速度を計測します
* **Mem:** 現在のトータル使用メモリ / 端末の最大メモリ
* **Gfx:** グラフィックス（VRAM）に関連するメモリ使用量
* **Mono:** C#（Managed）ヒープのメモリ使用量。GCの発生タイミングの把握に有効です

### 🎨 表示モードの切り替え

プロジェクトのデバッグニーズに合わせて、2つの表示モードを選択できます。

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

| モード | 特徴 |
| --- | --- |
| **Detailed** | すべての統計情報を詳細に表示します |
| **Simple** | FPSと主要なメモリ情報のみを1行でコンパクトに表示します |

<Tabs className="margin-bottom--md">
<TabItem value="num" label="Detailed" default>
<img src={require('../feature-guide/img/stats.jpg').default} width="500" />
</TabItem>
<TabItem value="bool" label="Simple">
<img src={require('./img/stats-simple.jpg').default} width="500" />
</TabItem>
</Tabs>

### ⚙️ カスタマイズ（Settings）

`Window > Logify-Unity > Settings` から、アプリのUIを邪魔しないように細かく調整が可能です。

<img src={require('./img/stats-setting.jpg').default} width="500" />

* **Activation Scope:** エディタのみ、実機のみ、あるいは両方で表示するかを選択できます。

#### Visual Appearance:
* **Mode:** Detailed / Simple の切り替え
* **Font Size:** テキストの大きさを調整
* **Position:** 画面の四隅（Right Top / Left Bottomなど）から表示位置を選択

#### Performance Thresholds:
* FPSの数値に応じてテキストの色を動的に変更します（例：30 FPS以下で黄色など）
* 閾値はスライダーで直感的にカスタマイズ可能です
* **Update Interval:** 更新間隔（秒）を設定します。デフォルトは 0.5 秒です