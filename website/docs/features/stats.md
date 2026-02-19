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

### 🚀 使いどころ

画面上にリアルタイムの負荷状況（FPS・メモリ消費）を表示し、実機テスト中の「違和感」を即座に数値で裏付けます。

#### 「カクつき」の原因特定
* FPSの低下と同時に **Mono**（Managedメモリ）が急増していれば、GC（ガベージコレクション）によるスパイクの可能性を疑えます。


#### グラフィックス負荷の監視
* **Gfx**（GPUメモリ）の数値を追うことで、テクスチャの読み込みすぎや、VRAM不足によるクラッシュの予兆を検知できます。


#### メモリリークの早期発見
* シーン遷移を繰り返しても **Mem**（Total Allocated）が減らなければ、参照が残り続けているリークの可能性をその場で判断できます。


#### QA・テスターとの連携
* バグ報告のスクリーンショットにこの数値が写っているだけで、エンジニアはプロファイラを回す前にある程度の「アタリ」を付けることができます。

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