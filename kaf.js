"use strict";

export default class Kaf {
  constructor(options) {
    this._elem_selector = options.elem;
    this._elem = document.querySelector(options.elem);
    if(!this._elem) return Kaf.error('[kaf] Element was not found.');

    this._factors = this._elem.querySelectorAll(Kaf.attrs.join(', '));
    this._styles = options.styles || new Object();

    this._dictionary = options.dictionary || { default: null };

    this._data = { ...Object.fromEntries(Object.entries(options.data).filter(d => typeof d[1] !== 'function')) };
    this._data.__locale = options.locale || 'default';
    for(const i in this._data) {
      Object.defineProperty(this, i, {
        get: () => this._data[i],
        set: value => {
          this._data[i] = value;
          this.$induce(i);
        }
      });
    }

    this._data.__calc = options.calc || new Object();
    this._calc = new Object();
    for(const i in this._data.__calc) {
      if(typeof this._data.__calc[i] == 'object') {
        for(const c in this._data.__calc[i]) {
          Object.defineProperty(this._calc, c, {
            get: () => this._data.__calc[i][c].apply(this),
            set: () => Kaf.error('You can\'t assign a value to calc data.')
          });
        }
      }
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
      if(el.hasAttribute('kit:assign')) {
        el.getAttribute('kit:assign').split(',').forEach(ae => {
          let at = ae.trim().split(' ');
          el.addEventListener('click', () => this[at[0]] = Kaf.eval(at[1]));
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
        if(this[binding]) return Kaf.error('[kit:bind] You can\'t assign the property which has already been defined.');
        Object.defineProperty(this, binding, {
          get: () => this._data[binding],
          set: value => {
            this._data[binding] = value;
            this.$induce(binding);
          }
        });
        if(el.type == 'checkbox') {
          this[binding] = el.checked;
          el.addEventListener('change', () => this[binding] = el.checked);
        }
        else {
          this[binding] = el.value;
          ['keydown', 'keyup', 'keypress', 'change'].forEach(et => {
            el.addEventListener(et, () => this[binding] = el.value);
          });
        }
      }
      if(el.hasAttribute("kit:if")) {
        el.setAttribute('kaf-node-id', this._nodenum);
      }
      if(el.hasAttribute("kit:for")) {
        if('content' in document.createElement('template')) {
          el.setAttribute('kaf-node-id', this._nodenum);
          this._data[`__kaf_node_id_${this._nodenum}`] = el.innerHTML;
          el.insertAdjacentHTML('afterend', `<kit-for kaf-node-id="${this._nodenum}"></kit-for>`);
        }
        else el.style.display = 'none';
        this.$induce(el.getAttribute("kit:for"));
      }
      if(el.hasAttribute("kit-i")) {
        el.setAttribute('kaf-node-id', this._nodenum);
        this._data[`__kaf_node_id_${this._nodenum}`] = el.innerHTML;
      }
    });
    this.$locale(this._data.__locale);

    for(const i in this._styles) {
      if(typeof this._styles[i] == 'string') this._elem.style[i] = this._styles[i];
      else if(typeof this._styles[i] == 'object') Kaf.attachStyles(this._elem, i, this._styles[i]);
    }
  }

  $qs(...args) {
    let selector = args.join(', ');
    return selector ? this._elem.querySelectorAll(selector) : document.querySelectorAll(this._elem_selector);
  }

  $induce(key) {
    const _value = this._data[key];
    for(const elem of this.$qs(`[kit\\:observe=${key}]`)) {
      elem.innerHTML = _value;
    }
    for(const elem of this.$qs(`[kit\\:value=${key}]`)) {
      elem.value = _value;
    }
    for(const elem of this.$qs(`[kit\\:if=${key}]`)) {
      if(_value) elem.style.display = 'block';
      else elem.style.display = 'none';
    }
    if(typeof _value == 'object') {
      for(const elem of this.$qs(`template[kit\\:for=${key}] + kit-for`)) {
        let _rep = this._data[`__kaf_node_id_${elem.getAttribute('kaf-node-id')}`], _result = '';
        for(const i in _value) {
          _result += _rep.replace(/{{\s*key\s*}}/g, i).replace(/{{\s*value\s*}}/g, _value[i]);
        }
        elem.innerHTML = _result;
      }
    }
    if(key == '__locale') this.$locale(_value);
    for(const calc in this._data.__calc[key]) {
      const calculated = this._calc[calc];
      for(const elem of this.$qs(`[kit\\:\\:observe=${calc}]`)) {
        elem.innerHTML = calculated;
      }
      for(const elem of this.$qs(`[kit\\:\\:value=${calc}]`)) {
        elem.value = calculated;
      }
    }
  }

  $locale(lang) {
    for(const el of this._elem.querySelectorAll('[kit-i]')) {
      this._data[`__kaf_node_id_${el.getAttribute('kaf-node-id')}`]
      el.innerHTML = this._data[`__kaf_node_id_${el.getAttribute('kaf-node-id')}`].replace(/{{\s*([^\s]*)\s*}}/g, (match, target) => {
        return Kaf.accessor(this._dictionary[this._data.__locale] || new Object(), target);
      });
    }
  }

  static accessor(obj, acc) {
    const accessors = acc.split('.');
    if(!obj) return Kaf.error('Could not find accessing object.') || undefined;
    else if(accessors[1]) return Kaf.accessor(obj[accessors[0]], accessors.slice(1).join('.'));
    else return obj[accessors[0]];
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
    } catch(error) {
      Kaf.error(`[styles] Invalid selector: ${selector}`);
    }
  }
}

Kaf.debugging = false;

Kaf.attrs = [
  "[kit-ref]",
  "[kit-e]",
  "[kit\\:bind]",
  "[kit\\:observe]",
  "[kit\\:value]",
  "[kit\\:if]",
  "[kit-if]",
  "[kit\\:for]",
  "[kit\\:assign]",
  "[kit-i]",
  "[kit\\:\\:observe]"
]
