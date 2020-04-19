# kaf.js へようこそ！

kaf.jsは、webサイト上でアプリケーションを構築するJavaScriptフレームワークです。

<iframe width="100%" height="300" src="//jsfiddle.net/mtsgi/b2c9m14v/19/embedded/js,html,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

上の作例のように、kaf.jsはフォーム要素等を利用した**データのバインディング**や、辞書を定義するだけで利用できる強力な**i18nのための機能**、非常に便利でかんたんな**イベントバインディングシステム**などを持った高機能かつ軽量なJavaScriptアプリケーションフレームワークです。

それでいて、他のJavaScriptフレームワークよりももっと簡単にあなたの**既存プロジェクトに組み込む**ことができます。新規プロジェクトでの利用もシンプルで、複雑な構成を要求せず、一般的なHTML構造の中にkafの便利な機能を導入することができます。

## はじめる

kaf.jsの利用方法の大まかな流れは、`kaf.js`ファイルから**Kafクラス**をインポートし、Kafクラスのインスタンスを`new Kaf()`式を使って生成することです。

そして、`new Kaf()`に引数として**kafのオプション**を渡す必要があります。オプションには指定できる様々な機能がありますが(後述)、まずkaf.js唯一の必須オプションである`elem`が登場します。

```html
<main id="kaf">Hello, kaf!</main>
<script type="module">
  import Kaf from "kaf.js";
  const kaf = new Kaf({
    elem: '#kaf'
  });
</script>
```

> `<script>`タグとして同一のHTMLファイル内からkafを初期化する場合、JavaScriptモジュールである必要があります。JavaScriptモジュールの詳細については[こちら](https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Modules)をご参照ください。

`elem`には、kaf.jsを初期化する対象となる要素の**セレクターを指定**します。上の例では、idが`"kaf"`の`<main>`要素に対してkaf.jsを初期化しています。kaf.jsインスタンスは、**この要素内だけで**機能をはたらかせることに注意してください。

---

[＞ 次に、kaf.jsの実際の機能や使い方を紹介します。](/guide)
