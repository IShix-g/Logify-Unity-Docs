---
sidebar_position: 1
---

# 🏁 概要

ソースコードに **Attribute（属性）** を追加するだけで、独自のデバッグ操作を `Custom` タブに即座に生成します。
UI作成の工数をゼロにし、ロジックの検証に集中できます。

<img src={require('../feature-guide/img/custom.jpg').default} width="500" />

### ⚡ 1行でボタンを追加

メソッドに `[LogiButton]` を付与するだけで、ダイアログ上に実行ボタンが表示されます。

```csharp
[LogiButton("Test Button", "Execute")]
void Test() => Debug.Log("Test");
```

### 🎚️ 値のリアルタイム監視・変更

実行時のステータスを可視化する事もできます。

```csharp
[LogiStatus("Test Status", false)]
string TestStatus() => $"Integer set to: {_integer}";

// 画像の表示
[LogiPreview("Test Sprite")]
Sprite TestSprite() => _sprite;

```

### 🌱 初期化

`Awake`で登録する事で利用可能になります。  
`OnDestroy`で登録解除します。

```csharp
void Awake() => Logi.Register(this, "Tests (Instance)", 1);

void OnDestroy() => Logi.Unregister(this);

[LogiButton("Test Button", "Execute")]
void Test() => Debug.Log("Test");
```

### ⚙️ 特徴

* **ボイラープレート不要:** 手動のUI構築は一切不要です
* **タブ管理:** 登録時に渡される名称でタブ分けします

:::note
Managed Stripping Level が Medium 以上の場合は、リフレクション保護の設定が必要です。詳細は **[Managed Stripping に関する注意点](attributes.md#stripping-caution)** を参照してください。
:::