# [Chapter 1] KAF Data

**kaf data** is a fundamental feature of kaf.js. This feature allows you to build a website that dynamically responds to the content of the data.

## The Basics of KAF Data

First, let's look at KAF data, which is assigned to the space of KAF data at initialization by passing it to each key of the `data` option.

<iframe width="100%" height="300" src="//jsfiddle.net/mtsgi/tas4n8c6/embedded/js,html,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

This is a simple example of assigning the value of the expression `100 + 500` to the value of the KAF data named `a`. And another element is given the attribute `kit:observe`. It will **observe the content of certain KAF data**.

> If the kaf data is named `a`, you can get the value from an instance of the Kaf class as `kaf.a`.

If you look at the **Result**, you can see that the content of the element is `600`. This is, of course, the value of the expression `100 + 500`, but the important thing is that when the value of this data changes, **the content of the element also changes at the same time**.

The following is an easy to understand example of the real-time nature of KAF data.

## Binding by form

Using kaf.js makes it dramatically easier to handle data entered into a form component like the `<input>` element.

<iframe width="100%" height="300" src="//jsfiddle.net/mtsgi/ukax1wrg/8/embedded/js,html,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

As in this example, by adding the attribute `kit:bind="mydata"` to the `<input>` element, the value entered in that text box will be stored in the property `mydata` of the kaf data **in real time**.

And as the data is updated, the contents of elements with `kit:observe` are also rewritten. This is what it means that the KAF data is synchronized with the elements in real time.

<iframe width="100%" height="300" src="//jsfiddle.net/mtsgi/yb8samvz/2/embedded/js,html,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

In addition, the `kit:bind` attribute can also be used for **checkboxes**. Normally, the value of a checkbox is processed as a specific string when retrieved with JavaScript, but in kaf.js it is converted to a value of `true, false` and stored in kaf data for convenience.

> When using the `kit:bind` attribute to bind data, it is **not necessary to pre-define** the data name in the `data` option of the kaf.
> Or you can set the initial value by binding to a predefined data name with `kit:bind`.

## Conditional rendering

Other uses of **kaf data** include **conditional rendering**.

<iframe width="100%" height="300" src="//jsfiddle.net/mtsgi/jupgovx9/7/embedded/js,html,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

If the `kit:if` attribute is specified as the name of a kaf data, the element will be displayed only when the kaf data has **a value that evaluates to true**.

In the example above, each checkbox is assigned a KAF data, and its value is used to toggle the display of the element.

In addition, in the `kit:if` attribute, you can use the following operators to control the display of the element in more detail.

In addition, in the `kit:if` attribute, you can use the following operators to control the display of the element in more detail

- **`==` operator**
  - By passing a **JavaScript expression** or **kaf data name** on the right side, the element will be displayed only if the **kaf data** and the expression (or value of the kaf data) are equivalent.
  - Example: `<div kit:if="name == 'John'"></div>`

- **`!=` operator**
  - Passing a **JavaScript expression** or **kaf data name** on the right side will only display that element if the **kaf data** and the expression (or value of the kaf data) are not equivalent.
  - Example: `<div kit:if="number ! = 0"></div>`

- **`===` operator**
  - Passing a **JavaScript expression** or **kaf data name** on the right-hand side will only display that element if the **kaf data** and the expression (or value of the kaf data) are **strictly** equivalent.
  - Example: `<div kit:if="number === 100"></div>` (this element is not displayed if the value is a string `"100"`)

- **`!==` operator**
  - Passing a **JavaScript expression** or **kaf data name** on the right-hand side will only display that element if the **kaf data** and the expression (or value of the kaf data) are not **strictly** equivalent.
  - Example: `<div kit:if="password ! == password_confirm"></div>` (this element is not displayed when the values of the two KAF data are strictly equivalent)

- **`??` operator**
  - Only if the kaf data is not `null` and `undefined` will the element be displayed.
  - Example: `<p kit:if="mydata.address.pref ??" ></p>`

- **`&&` operator**
  - Passing a **kaf data name** on the right-hand side will only display that element if the two kaf data are both values **that are truthy**.
  - Example: `<p kit:if="first_name && last_name"></p>`

- **`||` operator**
  - Passing a **kaf data name** on the right-hand side will display the element if either of the two kaf data is a value **that are trythy**.
  - Example: `<p kit:if="mydata.height || mydata.width"></p>`

## Assigning elements

Using the `kit:assign` attribute, you can create an element **that assigns a value to the kaf data by clicking on it**. Let's look at an example.

<iframe width="100%" height="300" src="//jsfiddle.net/mtsgi/yg0mqnex/10/embedded/js,html,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

If you click the button with the attribute `kit:assign="mydata 'Hello'"`, the value of `mydata` is changed to the string `'Hello'`. Note that the value to be assigned must be written in the form of a **JavaScript expression**.


This is useful when you want to set a certain value in the KAF data that is determined by the click of a button. For example, it's great for language switching with the i18n function.

---

[＞ [Chapter 2] View About KAF Events](/en/kafevents)
