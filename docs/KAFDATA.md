# [第1章] kafデータ

**kafデータ**は、kaf.jsの根幹となる機能です。この機能を使うことで、データの内容に動的に対応するウェブサイトを構築することができます。

## kafデータの基本

まず、kafデータについて見ていきます。kafデータは、`data`オプションの各キーに渡すことで初期化時にkafデータの空間に割り当てられます。

<iframe width="100%" height="300" src="//jsfiddle.net/mtsgi/tas4n8c6/embedded/js,html,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

これは、kafデータの`a`という値に`100 + 500`という式の値を代入する、シンプルな例です。そして、要素に`kit:observe`属性を付与しています。これは、特定の**kafデータの内容を監視**します。

> kafデータに`a`という名前をつけた場合、Kafクラスのインスタンスから`kaf.a`とすると値を取得することができます。

**Result**を見ると、要素の内容が`600`になっていることがわかります。これはもちろん`100 + 500`という式の値ですが、重要なのはこのデータの持つ値が変化したとき、**要素の内容も同時に変化**するということです。

次にkafデータのリアルタイム性についてわかり易い例を紹介します。

## フォームによるバインディング

kaf.jsを使うと、`<input>`要素のようなフォーム部品に入力されたデータを取り扱うことが劇的に簡単になります。

<iframe width="100%" height="300" src="//jsfiddle.net/mtsgi/ukax1wrg/8/embedded/js,html,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

この例のように、`<input>`要素に`kit:bind="mydata"`と属性を付与することで、そのテキストボックスに入力された値は**リアルタイムに**kafデータの`mydata`というプロパティに格納されるようになります。

そして、データは更新されると`kit:observe`を持つ要素の内容も書き換えられることがわかります。これがkafデータがリアルタイムに要素と同期されるということの意味です。

<iframe width="100%" height="300" src="//jsfiddle.net/mtsgi/yb8samvz/2/embedded/js,html,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

さらに、`kit:bind`属性は**チェックボックスにも使用**することができます。通常、チェックボックスの値をJavaScriptで取得すると特定の文字列として処理されますが、kaf.jsでは使い勝手のため`true, false`という値に変換してkafデータに格納します。

> `kit:bind`属性を使ってデータとの紐付けを行うとき、kafの`data`オプションの中にデータ名を**事前に定義する必要はありません。**
> または、事前に定義されたデータ名に対して`kit:bind`でバインドすることで初期値を設定することもできます。

## 条件付きレンダリング

**kafデータ**のその他の使い方に、**条件付きレンダリング**というものがあります。

<iframe width="100%" height="300" src="//jsfiddle.net/mtsgi/jupgovx9/7/embedded/js,html,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

`kit:if`属性にkafデータの名前を指定すると、そのkafデータが**trueと評価される値**である時にだけ、その要素を表示します。

上の例では、チェックボックスそれぞれにkafデータを割り当て、その値によって要素の表示を切り替えています。

加えて、`kit:if`属性内では、以下の演算子を使用して要素の表示をさらに詳細に制御することができます。

- **`==` 演算子**
  - 右辺に**JavaScript式**または**kafデータ名**を渡すことで**kafデータ**と式(またはkafデータの値)が等価である場合のみ、その要素を表示します。
  - 例：`<div kit:if="name == 'John'"></div>`

- **`!=` 演算子**
  - 右辺に**JavaScript式**または**kafデータ名**を渡すことで**kafデータ**と式(またはkafデータの値)が等価でない場合のみ、その要素を表示します。
  - 例：`<div kit:if="number != 0"></div>`

- **`===` 演算子**
  - 右辺に**JavaScript式**または**kafデータ名**を渡すことで**kafデータ**と式(またはkafデータの値)が**厳密に**等価である場合のみ、その要素を表示します。
  - 例：`<div kit:if="number === 100"></div>` (この要素は、値が`"100"`という文字列の場合には表示されません)

- **`!==` 演算子**
  - 右辺に**JavaScript式**または**kafデータ名**を渡すことで**kafデータ**と式(またはkafデータの値)が**厳密に**等価でない場合のみ、その要素を表示します。
  - 例：`<div kit:if="password !== password_confirm"></div>` (この要素は、2つのkafデータの値が厳密に等価であるときは表示されません)

- **`??` 演算子**
  - kafデータが`null`と`undefined`以外の場合のみ、その要素を表示します。
  - 例：`<p kit:if="mydata.address.pref ??"></p>`

- **`&&` 演算子**
  - 右辺に**kafデータ名**を渡すことで、2つのkafデータがどちらも**trueと評価される値**の場合のみ、その要素を表示します。
  - 例：`<p kit:if="first_name && last_name"></p>`

- **`||` 演算子**
  - 右辺に**kafデータ名**を渡すことで、2つのkafデータのいずれかが**trueと評価される値**である場合に、その要素を表示します。
  - 例：`<p kit:if="mydata.height || mydata.width"></p>`

## 代入を行う要素

`kit:assign`属性を用いて、**クリックでkafデータへの値の代入を行う要素**を作ることができます。例を見てみましょう。

<iframe width="100%" height="300" src="//jsfiddle.net/mtsgi/yg0mqnex/10/embedded/js,html,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

`kit:assign="mydata 'Hello'"`という属性が付与されたボタンをクリックすると、`mydata`の値は`'Hello'`という文字列に変化します。注意するのは、代入する値は**JavaScriptの式**として成立する形で書く必要があることです。

これは、ボタンのクリックで決められたある特定の値をkafデータにセットしたいときに便利です。例えば、i18n機能での言語切替などには最適です。

---

[＞ [第2章] kafイベント について見る](/kafevents)
