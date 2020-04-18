# [第2章] kafイベント

**kafイベント**の機能を使うことで、JavaScriptの関数を**イベント**として登録し、簡単に管理することができるようになる上、HTML上の要素とイベントの**関係性を明確にする**ことができます。

## kafイベントの基本

kafデータのときと同じように、インスタンスの初期化時にオプションの`events`に**引数として"イベント"を渡す**ことで定義できます。そして、要素に`kit-e`属性を与えることで任意のトリガーで**イベントを発火**させることができます。

下の例では、`kit-e="hello click"`を持つボタンを**click**した時に**hello**イベントが、`kit-e="greet dblclick"`を持つボタンを**dblclick**した時に**greet**イベントが発生します。

> 使用可能なイベントのトリガーの一覧は[こちら](https://developer.mozilla.org/ja/docs/Web/Events)をご確認ください。

<iframe width="100%" height="300" src="//jsfiddle.net/mtsgi/n6ofqrkh/4/embedded/js,html,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

素のJavaScriptで、単に `function hello() { ... }` と関数を定義するよりも、kafイベントとして登録することで、明らかな利点があります。

まず、HTMLのマークアップを見るだけで、**どの要素がどのようなトリガーでどのイベントを引き起こすのか、一目瞭然**です。そして、イベントの利用可能なスコープはkafインスタンスの内部に限られます。

> `hello`というイベントを定義すると、Kafクラスのインスタンスから`kaf.hello()`のようにメソッドを呼び出すことができるようになります。
>
> このため、**kafデータ名として存在する名前のイベントを定義することはできません**。

また、例を見ると**greet**イベントの中で、`this.hello();`のようにインスタンス内のイベントを参照・再利用していることがわかります。結果的に、greetイベントが発生すると、**Hello**というアラートが表示されます。

## 省略記法と複数割当

さらに、**click**イベントの場合は、イベント種類を省略することができます。つまり、`kit-e="hello click"`は`kit-e="hello"`と等価です。

また、一つの要素に対して`kit-e="hello click, greet dblclick"`のようにカンマ区切りで複数のイベントをそれぞれのトリガーで割り当てることができます。次の例を見てください。

<iframe width="100%" height="300" src="//jsfiddle.net/mtsgi/Lb8wyna7/18/embedded/js,html,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

これは、`a, b, c`という3つのデータに対して3つのインクリメントのイベントを用意し、様々な方法でインクリメントを行う例です。

- まず、`kit-e="add2a"`はクリック時に`a`の値をインクリメントします。
- 次に、`kit-e="add2b, add2c mouseover"`はクリック時に`b`の値を、マウスオーバー時に`c`の値をインクリメントします。
- 最後に、`kit-e="add2a, add2b, add2c"`はクリック時に`a, b, c`すべての値をインクリメントします。

## 高度な例

kafイベントを用いた少し高度な例を示します。`this`によるインスタンス参照を用いて**kafデータ**と組み合わせながらkafイベントを使うことで、便利に使うことができます。

<iframe width="100%" height="300" src="//jsfiddle.net/mtsgi/6rav18qd/24/embedded/js,html,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

