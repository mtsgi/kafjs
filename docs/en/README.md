# Welcome to kaf.js!

kaf.js is a javascript framework to build the application on websites.

<iframe width="100%" height="300" src="//jsfiddle.net/mtsgi/b2c9m14v/17/embedded/js,html,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

As shown in the example above, kaf.js is a highly functional and lightweight JavaScript application framework with **data binding** using form elements, **powerful i18n features** that can be used by simply defining a dictionary, and a very convenient and easy **event binding system**.

And yet, you can **incorporate kaf.js into your existing projects** more easily than other JavaScript frameworks. It is simple to use in new projects and does not require a complex structure, allowing you to introduce kaf's useful features into a common HTML structure.

## Get started

The general flow of how to use kaf.js is to import a **Kaf class** from the `kaf.js` file and create an instance of the Kaf class with the expression `new Kaf()`.

And you need to pass **kaf option** as an argument to `new Kaf()`. The options have a variety of functions that can be specified (mentioned later), but first, there is the `elem` option, which is the only required option for kaf.js.

```html
<main id="kaf">Hello, kaf!</main>
<script type="module">
  import Kaf from "kaf.js";
  const kaf = new Kaf({
    elem: '#kaf'
  });
</script>
```

> If you want to initialize kaf from within the same HTML file as `<script>` tag, it must be a JavaScript module. For more information on the JavaScript module, please see [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules).

The `elem` is used to specify the **selector** of the element to initialize kaf.js. In the above example, the script initializes kaf.js for a `<main>` element with id `"kaf"`. Please note that the kaf.js instance performs its function **only inside this element**.
