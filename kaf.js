"use strict";

class Kaf {
  constructor(options) {
    this._elem_selector = options.elem;
    this._elem = document.querySelector(options.elem);
    if(!this._elem) return Kaf.error('NoElementError');

    this._factors = this._elem.querySelectorAll(Kaf.attrs.join(', '));
    this._styles = options.styles || new Object();

    this._data = { ...options.data };
    for(const i in this._data) {
      Object.defineProperty(this, i, {
        get: () => this._data[i],
        set: value => {
          this._data[i] = value;
          this.induce(i);
        }
      });
    }

    this._events = { ...options.events };
    for(const i in this._events) {
      this[i] = this._events[i];
    }

    this._nodenum = 0;
    this._factors.forEach(el => {
      this._nodenum++;
      if(el.hasAttribute('kit-e')) {
        el.getAttribute('kit-e').split(',').forEach(ev => {
          let ea = ev.trim().split(' ');
          el.addEventListener(ea[1] || 'click', () => this._events[ea[0]]());
        });
      }
      if(el.hasAttribute('kit-html')) {
        el.innerHTML = Kaf.eval(el.getAttribute('kit-html'));
      }
      if(el.hasAttribute('kit:observe')) {
        el.innerHTML = this._data[el.getAttribute('kit:observe')];
      }
      if(el.hasAttribute('kit:bind')) {
        const binding = el.getAttribute('kit:bind');
        Object.defineProperty(this, binding, {
          get: () => this._data[binding],
          set: value => {
            this._data[binding] = value;
            this.induce(binding);
          }
        });
        this[binding] = el.value;
        ['keydown', 'keyup', 'keypress', 'change'].forEach(et => {
          el.addEventListener(et, () => this[binding] = el.value);
        });
      }
      if(el.hasAttribute("kit:for")) {
        if('content' in document.createElement('template')) {
          el.setAttribute('kaf-node-id', this._nodenum);
          this._data[`__kaf_node_id_${this._nodenum}`] = el.innerHTML;
          el.insertAdjacentHTML('afterend', `<kit-for kaf-node-id="${this._nodenum}"></kit-for>`);
        }
        else el.style.display = 'none';
        this.induce(el.getAttribute("kit:for"));
      }
    });

    for(let i in this._styles) {
      if(typeof this._styles[i] == 'string') this._elem.style[i] = this._styles[i];
      else if(typeof this._styles[i] == 'object') Kaf.attachStyles(this._elem, i, this._styles[i]);
    }
  }

  qs(...args) {
    let selector = args.join(', ');
    return selector ? this._elem.querySelectorAll(selector) : document.querySelectorAll(this._elem_selector);
  }

  induce(key) {
    const _value = this._data[key];
    for(const elem of this.qs(`[kit\\:observe=${key}]`)) {
      elem.innerHTML = _value;
    }
    if(typeof _value == 'object') {
      for(let elem of this.qs(`template[kit\\:for=${key}] + kit-for`)) {
        let _rep = this._data[`__kaf_node_id_${elem.getAttribute('kaf-node-id')}`], _result = '';
        for(let i in _value) {
          _result += _rep.replace(/{{\s*key\s*}}/g, i).replace(/{{\s*value\s*}}/g, _value[i]);
        }
        elem.innerHTML = _result;
      }
    }
  }

  static error(...messages) {
    if(Kaf.debugging) {
      console.group('KAF Error(s)', (new Date()).toLocaleString());
      for(const message of messages) {
        console.warn('%cKAF Error', 'color: white; background: dodgerblue;border-radius: 4px; padding: 0 5px', message);
      }
      console.groupEnd();
    }
    return false;
  }

  static eval(expr) {
    return Function(`"use strict"; return(${expr})`)();
  }

  static attachStyles(parent = document, selector, object = {}) {
    try {
      const tlist = parent.querySelectorAll(selector);
      for(const d in object) {
        if(typeof object[d] == 'string') {
          for(const t of tlist) {
            t.style[d] = object[d];
          }
        }
        else if(typeof object[d] == 'object') {
          let _j = [selector, d].join(' ');
          if(d.indexOf('&') === 0) _j = [selector, d.substr(1)].join('');
          Kaf.attachStyles(parent, _j, object[d]);
        }
      }
    } catch (error) {
      Kaf.error(`Invalid selector: ${selector}`);
    }
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
