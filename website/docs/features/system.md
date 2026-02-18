---
sidebar_position: 3
---

# ⚙️ System - Detailed Information

動作している端末のハードウェアおよびソフトウェア情報を一覧表示します。
不具合が発生した際、特定のOSバージョンやCPUアーキテクチャに依存する問題かどうかを即座に判断できます。

<img src={require('../feature-guide/img/system.jpg').default} width="500" />

### 📋 表示項目一覧

`System` タブでは、以下の情報がカテゴリー別に表示されます。

#### 1. Device & OS (基本情報)

端末の特定やOS依存の不具合調査に使用します。

| 項目名 | 説明 |
| --- | --- |
| **Operating System** | OSの種類とバージョン|
| **Device Name** | 端末の識別名 |
| **Device ID** | 端末固有のID（コピー可能） |
| **Device Type** | Desktop, Handheld などのデバイス種別 |
| **Device Model** | 具体的なモデル名（例：iPhone15,3） |
| **System Language** | 端末のシステム言語設定 |
| **Platform** | 動作しているプラットフォーム |

#### 2. Hardware (CPU/Memory)

演算能力やメモリ容量を確認します。

| 項目名 | 説明 |
| --- | --- |
| **CPU Type** | プロセッサの名称・アーキテクチャ |
| **CPU Count** | 論理プロセッサ数（コア数） |
| **System Memory** | 物理メモリの総容量 |
| **Battery Status** | 充電状態（AC接続中か、放電中かなど） |
| **Battery Level** | バッテリー残量（%） |

#### 3. Graphics & Display

描画負荷やグラフィックス性能、解像度の確認に使用します。

| 項目名 | 説明 |
| --- | --- |
| **Graphics Name** | GPUの名称 |
| **Graphics Vendor** | GPUのベンダー |
| **Graphics Version** | グラフィックスAPIのバージョン |
| **Graphics Memory** | VRAM（ビデオメモリ）容量。 |
| **Gfx Type** | グラフィックスAPI（Vulkan, Metal, Direct3D11など） |
| **Max Tex Size** | サポートされる最大テクスチャサイズ |
| **Screen Res** | 現在の解像度とリフレッシュレート（Hz） |
| **DPI** | 画面のピクセル密度 |
| **Instancing Support** | GPUインスタンシングの可否 |
| **Compute Shader** | コンピュートシェーダーの可否 |
| **HDR Display** | HDR表示（RGBAHalf）のサポート可否 |

#### 4. Application & Unity

ビルドバージョンやUnityの実行環境を確認します。

| 項目名 | 説明 |
| --- | --- |
| **Bundle ID** | アプリの識別子（com.company.product） |
| **App Version** | アプリのバージョン |
| **Build Number** | モバイル向けのビルド番号（LogifySettingsから取得） |
| **Unity Version** | 使用されているUnityエディタのバージョン |
| **IL2CPP** | スクリプティングバックエンドが IL2CPP かどうか |
| **Install Mode** | ストア経由か、開発用インストールか等の判別 |
| **Target FPS** | `Application.targetFrameRate` の設定値 |
| **VSync** | 垂直同期の設定状態 |

### 💡 活用シーン

:::tip 実戦活用例
- **シェーダーバグの調査**: `Graphics Name` や `Gfx Type` を確認し、特定のGPU（Adreno/Mali等）特有の描画エラーか、API（Vulkan/OpenGL ES）依存の問題かを切り分けます。
- **QAコストの削減**: テスターから送られるスクリーンショットに `System` 画面が含まれていれば、それだけで「どのビルドで」「どのスペックの端末で」起きた問題かが確定します。
- **リリース判定の材料**: `IL2CPP` が `True` になっているか、`Build Number` が最新かを確認し、デバッグビルドとリリース候補ビルドの取り違えを防止します。
  :::