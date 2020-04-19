# [Chapter 2] KAF Events

The **kaf event** feature allows you to register JavaScript functions as **events** and manage them easily, as well as **clarify the relationships** between HTML elements and events.

## The Basics of KAF Events

As in the case of kaf data, it can be defined by passing **"Events" as an argument** to the optional `events` when the instance is initialized. And you can fire an event with an arbitrary trigger by giving the attribute `kit-e` to the element.

In the example below, a **hello** event is fired when **click** a button with `kit-e="hello click"` and a **greet** event is fired when **dblclick** a button with `kit-e="greet dblclick"`.

> See [here](https://developer.mozilla.org/en-US/docs/Web/Events) for a list of available event triggers.

<iframe width="100%" height="300" src="//jsfiddle.net/mtsgi/n6ofqrkh/4/embedded/js,html,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

There is an obvious advantage to registering a function as a kaf event rather than simply defining it as `function hello() { ... }` in plain JavaScript.

First of all, just by looking at the HTML markup, you can see **at a glance which elements trigger which events with which triggers**. And the available scope of the event is limited to the interior of the KAF instance.

> If you define the event `hello`, you can call the method like `kaf.hello()` from an instance of the Kaf class.
>
> This is why it is not possible to define events with names that exist as kaf data names.

Also, if you look at the example, you can see that in the **greet** event, we are referring and reusing the event in the instance, such as `this.hello();`. As a result, you'll get an alert saying **Hello** when a GREET event occurs.

## Shorthand notation and multiple allocation

Furthermore, in the case of **click** events, you can omit to describe the event type. That is, `kit-e="hello"` is equivalent to `kit-e="hello click"`.

Also, you can assign multiple events to a single element like `kit-e="hello click, greet dblclick"`, separated by commas. Take a look at the following example.

<iframe width="100%" height="300" src="//jsfiddle.net/mtsgi/Lb8wyna7/18/embedded/js,html,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

This is an example of three incremental events for three data named `a, b, c`, and incrementing them in various ways.

- First, `kit-e="add2a"` increments the value of `a` when you click.
- Next, `kit-e="add2b, add2c mouseover"` increments the value of `b` on clicking and `c` on mouseover.
- Finally, `kit-e="add2a, add2b, add2c"` increments all values of `a, b, c` on click.

## Advanced Examples

Here's a slightly more advanced example using a KAF event. You can conveniently use kaf events in conjunction with **kaf data** using instance references by `this`.

<iframe width="100%" height="300" src="//jsfiddle.net/mtsgi/6rav18qd/24/embedded/js,html,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

---

[＞ [Chapter 3] See About i18n Support Feature](/en/i18n)
