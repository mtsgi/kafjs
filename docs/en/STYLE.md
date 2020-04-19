# [Chapter 4] Style Controlling

kaf.js has the distinctive ability to control **scope-restricted** styles with **JavaScript object notation**.

You no longer need to write CSS with complex selectors, or precompile with SASS at build time.

## Describe the style

First, take a look at the example. Of note is the `styles` object of the kaf option.

<iframe width="100%" height="300" src="//jsfiddle.net/mtsgi/nedg1ukv/7/embedded/js,html,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

As you can see, you can control the style by passing `styles` objects to the kaf option. And below is the style object the example is passing.

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

As such, you can completely control the style of the web page with JavaScript object notation.

Basically, a **selector** key has an object, which describes the properties and values of the stylesheet.

> If the property name contains a hyphen, such as `background-color`, write it in the lower camel case. For more information, please visit [here](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Properties_Reference).

In addition, you can nest other selectors within one selector, just like the notation of SASS. The `#mytext` object in `.mybox2` represents `.mybox2 #mytext`. This nesting can be done **any number of times**.

> And as you can see from the **Result**, it describes the style for the `.mybox1` selector, but has no effect on the `.mybox1` outside of the **kaf container**. kaf.js style control features are limited in their scope to the child elements of the kaf container.

## Parent reference by &

In a nested object, you can use the `&` prefix on the selector to get a reference to the nested source.

<iframe width="100%" height="300" src="//jsfiddle.net/mtsgi/rsa1vnek/6/embedded/js,html,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

In this example, the selector `'&.large-text'` is written in the object corresponding to `'.mybox1'`. This represents elements that match `'.mybox1.large-text'`.

In actuality, if you look at the **Result** you can see that the second element with both classes is larger in character and the element with only `.large-text` is not affected at all.

