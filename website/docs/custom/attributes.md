---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 🏷️ Attribute List

Main attributes for building debug menus.

:::info Namespace
```csharp
using Logify;
```
:::

:::warning
⚠️ [Managed Stripping Considerations](#stripping-caution)
:::

## 🔘 [LogiButton]

Basic attribute for executing methods. UI automatically switches based on presence of arguments.

### 1. Button Only (No Arguments)

<img src={require('./img/button.jpg').default} width="500" className="margin-bottom--md" />

| Argument | Description |
| --- | --- |
| **1st argument** | Label name |
| **2nd argument** | Text within button |

```csharp
[LogiButton("Test Button", "Execute")]
void Test() { /* process */ }

```

### 2. With Input (With Arguments)

When applied to methods with arguments, UI is generated to input values and execute.
Supports `string`, `int`, `float`, `bool`, `Enum`.

| Argument | Description |
| --- | --- |
| **1st argument** | Label name |
| **2nd argument** | Text within button |
| **3rd argument** | Field initial value |

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

Attribute for directly inputting and modifying values.
Supports `string`, `int`, `float`, `bool`, `Enum`.

| Argument | Description |
| --- | --- |
| **1st argument** | Label name |
| **2nd argument** | Field initial value |

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

Adjust numeric values with range specification (slider).
Supports `int`, `float`.

<Tabs className="margin-bottom--md">
<TabItem value="range" label="Standard Range" default>
<img src={require('./img/range2.jpg').default} width="500" />

| Argument | Description |
| --- | --- |
| **1st argument** | Label name |
| **2nd argument** | Minimum value |
| **3rd argument** | Maximum value |
| **4th argument** | Field initial value |

```csharp
[LogiRange("Test Range integer", 0, 100, 10)]
void TestRangeButton(int integer) { }
```
</TabItem>
<TabItem value="range-btn" label="Range with Button">
<img src={require('./img/range.jpg').default} width="500" />

| Argument | Description |
| --- | --- |
| **1st argument** | Label name |
| **2nd argument** | Text within button |
| **3rd argument** | Minimum value |
| **4th argument** | Maximum value |
| **5th argument** | Field initial value |

```csharp
[LogiRangeButton("Test Range integer", "Run", 0, 100, 10)]
void TestRangeButton(int integer) { }
```
</TabItem>
</Tabs>

---

## 🖼️ [LogiPreview]

Allows viewing images.
Supports `Sprite`, `Texture2D`.

<img src={require('./img/preview.jpg').default} width="400" className="margin-bottom--md" />

```csharp
[LogiPreview("Test Sprite")]
Sprite GetPlayerIcon() => _playerIcon;
```

---

## 📝 Information Display

Attributes specialized for "displaying" debug information.

### [LogiLabel]

Simple text display.

<img src={require('./img/label.jpg').default} width="500" />

```csharp
[LogiLabel]
string GetStatus() => "Test Label";
```

### [LogiStatus]

Status display with label. Can select copy button display option.
<img src={require('./img/status.jpg').default} width="500" />

```csharp
[LogiStatus("Test Status", true)]
string GetBuildSign() => $"Integer set to: {_integer}";
```

### [LogiTextArea]

Suitable for viewing or inputting long text.
<img src={require('./img/textArea.jpg').default} width="500" />

```csharp
[LogiTextArea("Test Text Area")]
void UpdateLog(string text) { }
```

---

### ⚠️ Managed Stripping Considerations {#stripping-caution}

<img src={require('./img/managed-stripping.jpg').default} width="500" />

When Unity's build setting **Managed Stripping Level** is set to **Medium** or **High**, methods and fields not directly referenced in code may be removed (stripped) by Unity during builds.

Since `Logify-Unity` uses reflection to detect Attributes, they won't appear in the debug menu if stripped. If this occurs, add the **`[Preserve]`** attribute alongside attributes on members.

```csharp
using UnityEngine.Scripting; // Required for Preserve attribute
using Logify;

public class PlayerDebug : MonoBehaviour
{
    [LogiButton("Level Up")]
    [Preserve] // Stripping countermeasure
    void LevelUp()
    {
        // ...
    }
}
```

:::tip Batch Countermeasure
If applying `[Preserve]` individually is cumbersome, we recommend creating a `link.xml` file to collectively exclude specific classes or namespaces from stripping.

<details>
  <summary><b>Show link.xml configuration example</b></summary>

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
