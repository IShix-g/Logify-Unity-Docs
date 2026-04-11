---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 🏷️ Attribute一覧

デバッグメニューを構築するための主要な属性（Attributes）です。

:::info 名前空間
```csharp
using Logify;
```
:::

:::warning
⚠️ [Managed Stripping に関する注意点](#stripping-caution)
:::

## 🔘 [LogiButton]

メソッドを実行するための基本属性です。引数の有無により自動的にUIが切り替わります。

### 1. ボタンのみ（引数なし）

<img src={require('./img/button.jpg').default} width="500" className="margin-bottom--md" />

| 引数 | 説明 |
| --- | --- |
| **第1引数** | ラベル名 |
| **第2引数** | ボタン内のテキスト |

```csharp
[LogiButton("Test Button", "Execute")]
void Test() { /* 処理 */ }

```

### 2. インプットあり（引数あり）

引数を持つメソッドに付与すると、値を入力して実行できるUIが生成されます。  
`string`, `int`, `float`, `bool`, `Enum` に対応しています。

| 引数 | 説明 |
| --- | --- |
| **第1引数** | ラベル名 |
| **第2引数** | ボタン内のテキスト |
| **第3引数** | フィールドの初期値 |

<Tabs className="margin-bottom--md">
<TabItem value="num" label="Numeric / String" default>
<img src={require('./img/button2.jpg').default} width="500" />
```csharp
[LogiButton("Test Integer", 10)]
void Test(int integer) { }
```
</TabItem>
<TabItem value="bool" label="Boolean">
<img src={require('./img/button3.jpg').default} width="500" />
```csharp
[LogiButton("Test Boolean", "Set", true)]
void Test(bool boolean) { }
```
</TabItem>
<TabItem value="enum" label="Enum">
<img src={require('./img/button4.jpg').default} width="500" />
```csharp
[LogiButton("Test Enum", "Select")]
void Test(TestEnum type) { }
```
</TabItem>
</Tabs>

---

## 📥 [LogiInput]

値を直接入力・変更するための属性です。  
`string`, `int`, `float`, `bool`, `Enum` に対応しています。

| 引数 | 説明 |
| --- | --- |
| **第1引数** | ラベル名 |
| **第2引数** | フィールドの初期値 |

<Tabs className="margin-bottom--md">
<TabItem value="num" label="Numeric / String" default>
<img src={require('./img/input.jpg').default} width="500" />
```csharp
[LogiInput("Test Integer", 100)]
void Test(int integer) { }
```
</TabItem>
<TabItem value="bool" label="Boolean">
<img src={require('./img/input2.jpg').default} width="500" />
```csharp
[LogiInput("Test input Boolean", true)]
void TestInput(bool boolean) { }
```
</TabItem>
<TabItem value="enum" label="Enum">
<img src={require('./img/input3.jpg').default} width="500" />
```csharp
[LogiInput("Test input Enum")]
void TestInput(TestEnum type) { }
```
</TabItem>
</Tabs>

---

## 🎚️ [LogiRange] / [LogiRangeButton]

数値を範囲指定（スライダー）で調整します。  
`int`, `float` に対応しています。

<Tabs className="margin-bottom--md">
<TabItem value="range" label="Standard Range" default>
<img src={require('./img/range2.jpg').default} width="500" />

| 引数       | 説明        |
|----------|-----------|
| **第1引数** | ラベル名      |
| **第2引数** | 最小値 |
| **第3引数** | 最大値       |
| **第4引数** | フィールドの初期値 |

```csharp
[LogiRange("Test Range integer", 0, 100, 10)]
void TestRangeButton(int integer) { }
```
</TabItem>
<TabItem value="range-btn" label="Range with Button">
<img src={require('./img/range.jpg').default} width="500" />

| 引数       | 説明       |
|----------|----------|
| **第1引数** | ラベル名     |
| **第2引数** | ボタン内のテキスト |
| **第3引数** | 最小値      |
| **第4引数** | 最大値      |
| **第5引数** | フィールドの初期値 |

```csharp
[LogiRangeButton("Test Range integer", "Run", 0, 100, 10)]
void TestRangeButton(int integer) { }
```
</TabItem>
</Tabs>

---

## 🖼️ [LogiPreview]

画像を確認できます。  
`Sprite`、 `Texture2D` に対応します。

<img src={require('./img/preview.jpg').default} width="400" className="margin-bottom--md" />

```csharp
[LogiPreview("Test Sprite")]
Sprite GetPlayerIcon() => _playerIcon;
```

---

## 📝 Information Display

デバッグ情報を「表示」することに特化した属性です。

### [LogiLabel]

シンプルなテキスト表示。

<img src={require('./img/label.jpg').default} width="500" />

```csharp
[LogiLabel]
string GetStatus() => "Test Label";
```

### [LogiStatus]

ラベル付きのステータス表示。コピーボタンの表示オプションを選択可能です。
<img src={require('./img/status.jpg').default} width="500" />

```csharp
[LogiStatus("Test Status", true)]
string GetBuildSign() => $"Integer set to: {_integer}";
```

### [LogiTextArea]

長文の確認や入力に適しています。
<img src={require('./img/textArea.jpg').default} width="500" />

```csharp
[LogiTextArea("Test Text Area")]
void UpdateLog(string text) { }
```

---

### ⚠️ Managed Stripping に関する注意点 {#stripping-caution}

<img src={require('./img/managed-stripping.jpg').default} width="500" />

Unityのビルド設定で **Managed Stripping Level** が **Medium** または **High** に設定されている場合、コード上で直接参照されていないメソッドやフィールドは、Unityによってビルドから削除（ストリップ）される可能性があります。

`Logify` はリフレクションを使用して Attribute を検知するため、ストリッピングの対象になるとデバッグメニューに表示されません。この問題が発生した場合、Attribute を付与したメンバに **`[Preserve]`** 属性を併記してください。

```csharp
using UnityEngine.Scripting; // Preserve属性に必要
using Logify;

public class PlayerDebug : MonoBehaviour
{
    [LogiButton("Level Up")]
    [Preserve] // ストリッピング対策
    void LevelUp()
    {
        // ...
    }
}
```

:::tip 一括対策
個別に `[Preserve]` を付けるのが手間な場合は、`link.xml` ファイルを作成し、特定のクラスや名前空間をまとめてストリッピングの対象外に設定することをお勧めします。

<details>
  <summary><b>link.xmlの設定例を表示</b></summary>

```xml
<linker>
  <assembly fullname="Logify" preserve="all"/>

  <assembly fullname="YourGame.Scripts">
    
    <namespace fullname="YourGame.Debug" preserve="all"/>
    
    <type fullname="YourGame.Managers.PlayerManager" preserve="nothing">
      <method signature="System.Void LevelUp()"/>
      <method signature="System.Void AddItem(System.Int32,System.String)"/>
    </type>
  </assembly>

  <assembly fullname="UnityEngine.CoreModule" preserve="all"/>
</linker>
```
</details>

:::