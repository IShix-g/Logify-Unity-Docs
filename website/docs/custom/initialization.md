---
sidebar_position: 3
---

# ⚙️ Initialization & 📑 Tabs

複雑なUI構築を必要とせず、クラス単位で論理的に整理されたデバッグメニューを生成します。

<img src={require('./img/tab.jpg').default} width="550" className="margin-bottom--md" />

## 📑 自動グループ化の仕組み

`Logi.Register` を呼び出すと、Attribute（`[LogiButton]` など）を検知し、その**定義クラス単位**で自動的にグループ化され、上部のタブとして展開されます。

### ⌨️ 登録方法

登録には、自身のインスタンス、タブ名、および表示順序（Order）を指定します。

```csharp
// 登録
void Awake() => Logi.Register(this, "Tests (Instance)", 1);

// 必ず破棄時に解除が必要です
void OnDestroy() => Logi.Unregister(this);

[LogiButton("Test Button", "Execute")]
void Test() => Debug.Log("Test");

// ...

```

#### 💡 ライフサイクル管理の自動化

`OnDestroy` での解除漏れを防ぐため、オブジェクトの消滅を検知して自動で削除する `AddTo` 拡張メソッドも利用できます。

```csharp
// UniRxなどのObservableと同様の感覚でライフサイクルを紐付け可能
void Awake()
    => Logi.Register(this, "Tests (Instance)", 1)
       .AddTo(this); // 追加

// 自動で破棄時に登録解除されるので必要なし
// void OnDestroy() => Logi.Unregister(this);

```

---

### 🏗️ 高度な構成：ILogiCommandGroup の実装

`MonoBehaviour` であれば `Awake` 時に名前や順序を指定できますが、ピュアC#クラス（POCO）などで、**「クラス側で自身のタブ名や表示順序を定義したい」** 場合は、`ILogiCommandGroup` インターフェースを実装します。

これにより、登録側（Caller）が詳細を知らなくても、適切なメタデータを持ってメニューに構築されます。

```csharp
public sealed class MyClass : ILogiCommandGroup, IDisposable
{
    // タブ名（グループ名）の定義
    string ILogiCommandGroup.GroupName => "My Group";

    // タブの表示優先順位（昇順）
    int ILogiCommandGroup.Priority => 2;
    
    [LogiButton("Test Button", "Execute")]
    void Test() => Debug.Log("Test");

    // IDisposable を実装しておくと、
    // Logi.Unregister() 実行時、または紐付けたオブジェクトの破棄時に Dispose が呼ばれます。
    public void Dispose()
    {
        // マネージドリソースの解放など
    }
}

```

#### 🛠️ 登録側のコード

インターフェースを実装している場合、引数を省略してシンプルに登録できます。

```csharp
// クラス内の定義に基づいて自動でタブが生成される
var myClass = new MyClass();
Logi.Register(myClass).AddTo(this); 

```

---

## ⚠️ Staticクラスの取り扱い

Logify-Unityは `static` クラスの登録にも対応していますが、**推奨されません。**

デバッグUIの多くはシーン内の特定オブジェクトや状態と紐付いています。`static` クラスで登録した場合、シーン破棄後もUIが残り続けてしまい、実行時に `MissingReferenceException` を引き起こしたり、無効な操作を許容したりする原因となるためです。原則として、`MonoBehaviour` のライフサイクルに合わせた登録を推奨します。

---

## 💡 活用シーン：初期化 = タブの自動生成

実機デバッグにおいて、**「初期化時に登録する」** という1ステップだけで、デバッグメニューは常に最新かつ整理された状態に保たれます。

:::tip Point
クラス単位でタブが分かれるため、機能ごとにコンポーネントを分割するだけで、自然と使いやすいデバッグUIが構築されていきます。
:::