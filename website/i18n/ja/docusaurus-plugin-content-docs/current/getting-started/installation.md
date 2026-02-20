---
sidebar_position: 1
---

# 📦 インストール方法

本プラグインは、 **Unity Asset Store** を通じて提供されます。以下の手順でプロジェクトへ導入してください。

### 1. アセットの購入

ブラウザでアセットを購入後、マイライブラリに追加します。

* **Asset Store URL:** [https://assetstore.unity.com/packages/slug/360718](https://assetstore.unity.com/packages/slug/360718)

### 2. Unityへのインポート

Unityエディタに戻り、以下の手順でインポートを行います。

1. **[Package Manager](https://docs.unity3d.com/ja/2023.2/Manual/Packages.html)** を開く (`Window > Package Manager`)
2. 左上のドロップダウンから **"Packages: My Assets"** を選択
3. 検索窓にアセット名`Logify`（または `360718`）を入力
4. **Download** ボタンをクリックし、完了後に **Import** をクリック

### 3. インポートの確認

本プラグインは [Package Manager (UPM)](https://docs.unity3d.com/ja/2023.2/Manual/Packages.html) で管理されます。  
インストール状態の確認は、Package Manager 内の "Packages: In Project" を参照してください。

:::tip ヒント
* **依存関係:** 特殊な外部ライブラリの事前導入は不要です
* **Assembly Definition:** `Runtime` および `Editor` はそれぞれ Assembly Definition (asmdef) で分離されています

**Assembly名:**
* **Runtime:** Ishix.Logify.Unity
* **Editor:** Ishix.Logify.Unity.Editor
:::