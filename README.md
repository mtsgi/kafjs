# kaf.js

![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/mtsgi/kafjs?style=for-the-badge&logo=github)
![GitHub commit activity](https://img.shields.io/github/commit-activity/y/mtsgi/kafjs?color=green&style=for-the-badge&logo=github)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/mtsgi/kafjs?style=for-the-badge&logo=github)

kaf.js is a javascript framework to build the application on websites.

![kaf.js](./logo_with_icon.png)

- [GitHub repository](https://github.com/mtsgi/kafjs)

## Features

kaf.js has four main features: **kaf data, kaf events, i18n support functions, and style control**.

#### [＞ English Documentation](https://kafjs.netlify.app/#/en/)

kaf.jsには、**kafデータ、kafイベント、i18n支援機能、スタイル制御**という4つの主軸機能があります。

#### [＞ 日本語ドキュメント](https://kafjs.netlify.app/)

## Usage

The simplest kaf.js template is the one below.

```html
<main id="kaf">Hello, kaf!</main>

<script type="module">
  import Kaf from "kaf.js";
  const kaf = new Kaf({
    elem: '#kaf'
  });
</script>
```

Please refer to [the documentation](https://kafjs.netlify.app/) for more information on usage.

## LICENSE

MIT License (c) mtsgi 2020

---

<iframe width="100%" height="300" src="//jsfiddle.net/mtsgi/b2c9m14v/19/embedded/js,html,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
