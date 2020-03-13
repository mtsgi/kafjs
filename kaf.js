"use strict";

class Kaf {
  constructor(options) {
    this._elem_selector = options.elem;
    this._elem = document.querySelector(options.elem);
    if(!this._elem) return Kaf.error('NoElementError');

    this._factors = this._elem.querySelectorAll(Kaf.attrs.join(', '));

    this._data = { ...options.data };
    for(const i in this._data) {
      Object.defineProperty(this, i, {
        get: () => this._data[i],
        set: value => {
          this._data[i] = value;
        }
      });
    }

    this._events = { ...options.events };
    for(const i in this._events) {
      this[i] = this._events[i];
    }

    this._factors.forEach(el => {
      if(el.hasAttribute('kit-e')) {
        el.getAttribute('kit-e').split(',').forEach(ev => {
          let ea = ev.trim().split(' ');
          el.addEventListener(ea[1] || 'click', () => this._events[ea[0]]());
        });
      }
      if(el.hasAttribute('kit:observe')) {
        el.innerHTML = this._data[el.getAttribute('kit:observe')]
      }
      if(el.hasAttribute('kit:bind')) {
        const binding = el.getAttribute('kit:bind');
        Object.defineProperty(this, binding, {
          get: () => this._data[binding],
          set: value => {
            this._data[binding] = value;
            this._factors.forEach(el => {
              if(el.getAttribute('kit:observe') === binding) el.innerHTML = value;
            });
          }
        });
        this[binding] = el.value;
        ['keydown', 'keyup', 'keypress', 'change'].forEach(et => {
          el.addEventListener(et, () => this[binding] = el.value);
        });
      }
    });
  }

  qs(...args) {
    let selector = args.join(', ');
    return selector ? this._elem.querySelectorAll(selector) : document.querySelectorAll(this._elem_selector);
  }

  static error(...messages) {
    if(Kaf.debugging) {
      console.group('KAF Error(s)');
      for(const message of messages) {
        console.warn('%cKAF Error', 'color: white; background: dodgerblue;border-radius: 4px; padding: 0 5px; box-shadow: inset 2px 2px 2px rgba(0, 0, 0, .1), inset -2px -2px 2px rgba(255, 255, 255, .4)', message);
      }
      console.groupEnd();
    }
    return false;
  }
}

Kaf.debugging = false;

Kaf.attrs = [
  "[kit-ref]",
  "[kit-e]",
  "[kit-src]",
  "[kit-alert]",
  "[kit-launch]",
  "[kit-close]",
  "[kit-text]",
  "[kit-html]",
  "[kit\\:bind]",
  "[kit\\:observe]",
  "[kit\\:value]",
  "[kit-value]",
  "[kit-color]",
  "[kit\\:if]",
  "[kit-if]",
  "[kit\\:for]"
]
