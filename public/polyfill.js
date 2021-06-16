/* eslint-disable */
/**
 * To detect you are in IE (for this case) by checking typeof(Event) which is
 * 'function' for all except IE where it is 'object'.
 * You can then safely polyfill the Event constructor using the approach above.
 * In IE11 it seems to be safe to set window.Event = CustomEvent.
 */
// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
// https://stackoverflow.com/questions/26596123/internet-explorer-9-10-11-event-constructor-doesnt-work
(function fixEvent() {
  if (typeof window.CustomEvent === 'function') return false; // If not IE

  function CustomEvent(event, origParams) {
    const params = origParams || { bubbles: false, cancelable: false, detail: undefined };
    const evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  }

  CustomEvent.prototype = window.Event.prototype;

  window.CustomEvent = CustomEvent;
  window.Event = CustomEvent;

  return null;
})();

/* https://github.com/DieterHolvoet/event-propagation-path */
(function fixEventPath() {
  Event.prototype.propagationPath = function propagationPath() {
    const polyfill = function () {
      let element = this.target || null;
      const pathArr = [element];

      if (!element || !element.parentElement) {
        return [];
      }

      while (element.parentElement) {
        element = element.parentElement;
        pathArr.unshift(element);
      }

      return pathArr;
    }.bind(this);

    return this.path || (this.composedPath && this.composedPath()) || polyfill();
  };
})();

/*! https://mths.be/repeat v0.2.0 by @mathias */
(function fixRepeat() {
  if (!String.prototype.repeat) {
    (function () {
      // needed to support `apply`/`call` with `undefined`/`null`
      const defineProperty = (function () {
        // IE 8 only supports `Object.defineProperty` on DOM elements
        try {
          const object = {};
          const $defineProperty = Object.defineProperty;
          var result = $defineProperty(object, object, object) && $defineProperty;
        } catch (error) {}
        return result;
      })();
      const repeat = function (count) {
        if (this == null) {
          throw TypeError();
        }
        let string = String(this);
        // `ToInteger`
        let n = count ? Number(count) : 0;
        if (n != n) {
          // better `isNaN`
          n = 0;
        }
        // Account for out-of-bounds indices
        if (n < 0 || n == Infinity) {
          throw RangeError();
        }
        let result = '';
        while (n) {
          if (n % 2 == 1) {
            result += string;
          }
          if (n > 1) {
            string += string;
          }
          n >>= 1;
        }
        return result;
      };
      if (defineProperty) {
        defineProperty(String.prototype, 'repeat', {
          value: repeat,
          configurable: true,
          writable: true,
        });
      } else {
        String.prototype.repeat = repeat;
      }
    })();
  }
})();

// Proxy polyfill from https://github.com/GoogleChrome/proxy-polyfill
(function(){function m(){function u(){return null}function l(a){return a?"object"===typeof a||"function"===typeof a:!1}function n(a){if(null!==a&&!l(a))throw new TypeError("Object prototype may only be an Object or null: "+a);}function v(a,c,A){function k(){}if(!l(a)||!l(c))throw new TypeError("Cannot create proxy with a non-object as target or handler");var g=c;c={get:null,set:null,apply:null,construct:null};for(var h in g){if(!(h in c))throw new TypeError("Proxy polyfill does not support trap '"+h+"'");c[h]=
g[h]}"function"===typeof g&&(c.apply=g.apply.bind(g));g=B(a);var p=!1,q=!1;if("function"===typeof a){var e=function(){var b=this&&this.constructor===e,d=Array.prototype.slice.call(arguments);k(b?"construct":"apply");return b&&c.construct?c.construct.call(this,a,d):!b&&c.apply?c.apply(a,this,d):b?(d.unshift(a),new (a.bind.apply(a,d))):a.apply(this,d)};p=!0}else a instanceof Array?(e=[],q=!0):e=w||null!==g?C(g):{};var x=c.get?function(b){k("get");return c.get(this,b,e)}:function(b){k("get");return this[b]},
D=c.set?function(b,d){k("set");c.set(this,b,d,e)}:function(b,d){k("set");this[b]=d},y={};f.getOwnPropertyNames(a).forEach(function(b){if(!((p||q)&&b in e)){var d=f.getOwnPropertyDescriptor(a,b);f.defineProperty(e,b,{enumerable:!!d.enumerable,get:x.bind(a,b),set:D.bind(a,b)});y[b]=!0}});h=!0;if(p||q){var E=f.setPrototypeOf||([].__proto__===Array.prototype?function(b,d){n(d);b.__proto__=d;return b}:u);g&&E(e,g)||(h=!1)}if(c.get||!h)for(var r in a)y[r]||f.defineProperty(e,r,{get:x.bind(a,r)});f.seal(a);
f.seal(e);return A?{proxy:e,revoke:function(){a=null;k=function(b){throw new TypeError("Cannot perform '"+b+"' on a proxy that has been revoked");}}}:e}var f=Object,w=!!f.create||!({__proto__:null}instanceof f),C=f.create||(w?function(a){n(a);return{__proto__:a}}:function(a){function c(){}n(a);if(null===a)throw new SyntaxError("Native Object.create is required to create objects with null prototype");c.prototype=a;return new c}),B=f.getPrototypeOf||([].__proto__===Array.prototype?function(a){a=a.__proto__;
return l(a)?a:null}:u);var t=function(a,c){if(void 0===(this&&this instanceof t?this.constructor:void 0))throw new TypeError("Constructor Proxy requires 'new'");return v(a,c)};t.revocable=function(a,c){return v(a,c,!0)};return t};var z="undefined"!==typeof process&&"[object process]"==={}.toString.call(process)||"undefined"!==typeof navigator&&"ReactNative"===navigator.product?global:self;z.Proxy||(z.Proxy=m(),z.Proxy.revocable=z.Proxy.revocable);})();