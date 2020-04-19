# [第4章] スタイル制御

kaf.jsは特徴的な**スコープの制限された**スタイルの制御を**JavaScriptのオブジェクト記法**で行うことができる機能を持っています。

もう、複雑なセレクターを持ったCSSの記述や、ビルド時のSASSによるプリコンパイルなど、行う必要はありません。

## スタイルを記述する

まずは例を見てください。注目すべきはkafオプションの`styles`オブジェクトです。

<iframe width="100%" height="300" src="//jsfiddle.net/mtsgi/nedg1ukv/7/embedded/js,html,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

今見てもらったように、kafオプションに `styles` オブジェクトを渡すことでスタイル制御ができます。そして、例で渡しているスタイルオブジェクトは以下のとおりです。

```js
styles: {
  '.mybox1': {
    padding: '10px',
    backgroundColor: 'dodgerblue',
    color: 'white'
  },
  '.mybox2': {
    padding: '10px',
    backgroundColor: '#f0f0f0',
    '#mytext': {
      color: 'red'
    }
  }
}
```

このように、完全にJavaScriptのオブジェクト記法で、ウェブページのスタイルを制御することができます。

基本的には、**セレクター**のキーはオブジェクトを持ち、その中でスタイルシートのプロパティと値を記述します。

> `background-color`のようなハイフンを含むプロパティ名の場合は、ローワーキャメルケースで記述します。詳細は[こちら](https://developer.mozilla.org/ja/docs/Web/CSS/CSS_Properties_Reference)をご確認ください。

さらに、SASSの記法のように一つのセレクターの中に別のセレクターをネストさせることができます。`.mybox2`の中にある`#mytext`オブジェクトは、**前者が内包する後者**にマッチする要素(つまり、`.mybox2 #mytext`)を表します。このネストは、**何度でも行うことができます。**

> また、**Result**を見るとわかるように、`.mybox1`のセレクターに対するスタイルを記述していますが、**kafコンテナー**の外部にある`.mybox1`には何も影響を及ぼしていないことがわかります。kaf.jsのスタイル制御機能は、そのスコープがkafコンテナーの子要素に制限されています。

## ＆による親参照

ネストされたオブジェクトの中で、セレクターに`&`接頭辞を使用すると、ネスト元の参照を得ることができます。

<iframe width="100%" height="300" src="//jsfiddle.net/mtsgi/rsa1vnek/6/embedded/js,html,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

この例では、`'.mybox1'`に対応するオブジェクト内で `'&.large-text'`というセレクターを記述しています。これは、`'.mybox1.large-text'`にマッチする要素を示しています。

実際に、**Result**を見ると両方のクラスを持つ2番目の要素は文字が大きくなっていて、`.large-text`のみを持つ要素は何も影響を受けていないことがわかります。
