---
sidebar_position: 2
---

# 💻 In-Game Console

実機上で Unity Editor の Console ウィンドウとほぼ同等のデバッグ体験を提供します。
`Debug.Log` や例外（Exception）を自動的にキャッチし、不具合調査に必要な情報を即座に表示します。

<img src={require('../feature-guide/img/console.jpg').default} width="500" />

### 🛠️ 基本機能

EditorのConsoleに慣れた開発者なら、説明不要で直感的に操作可能です。

* **Clear:** 表示されているログをすべて消去します
* **Collapse:** 重複するログを1つにまとめ、視認性を高めます

**Filter (Info/Warn/Error):**
* 各アイコンの横に現在のログ数が表示されます
* **カウント部分をタップ**することで、各レベルの表示/非表示を切り替えられます

* **Detail View:** ログ項目をタップすると、下部にスタックトレースの詳細が表示されます

### ⚠️ Editor Console との違い

以下の機能は利用できません。

* キーワードによる検索機能（Search）
* `Open Player Log` 等、外部ファイルへのアクセス機能

### ⚙️ ログ最大数の設定

メモリ消費を抑えるため、保持するログ数には上限があります。

* **デフォルト:** 1000件
* **変更方法:** Unityメニューの `Window > Logify-Unity > Settings` から変更可能です。

:::tip
ログ最大数を極端に増やすと、実機での UI 描画パフォーマンス（GC Alloc 等）に影響が出る場合があります。通常はデフォルトの1000件で運用し、大量のログを追跡する必要がある場合は、後述する **Feedback 機能** を使ってログファイルを外部に送信することを推奨します。
:::