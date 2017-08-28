(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* Zepto v1.1.6 - zepto event ajax form ie - zeptojs.com/license */

var Zepto = function () {
  var undefined,
      key,
      $,
      classList,
      emptyArray = [],
      _slice = emptyArray.slice,
      _filter = emptyArray.filter,
      document = window.document,
      elementDisplay = {},
      classCache = {},
      cssNumber = { 'column-count': 1, 'columns': 1, 'font-weight': 1, 'line-height': 1, 'opacity': 1, 'z-index': 1, 'zoom': 1 },
      fragmentRE = /^\s*<(\w+|!)[^>]*>/,
      singleTagRE = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
      tagExpanderRE = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
      rootNodeRE = /^(?:body|html)$/i,
      capitalRE = /([A-Z])/g,


  // special attributes that should be get/set via method calls
  methodAttributes = ['val', 'css', 'html', 'text', 'data', 'width', 'height', 'offset'],
      adjacencyOperators = ['after', 'prepend', 'before', 'append'],
      table = document.createElement('table'),
      tableRow = document.createElement('tr'),
      containers = {
    'tr': document.createElement('tbody'),
    'tbody': table, 'thead': table, 'tfoot': table,
    'td': tableRow, 'th': tableRow,
    '*': document.createElement('div')
  },
      readyRE = /complete|loaded|interactive/,
      simpleSelectorRE = /^[\w-]*$/,
      class2type = {},
      toString = class2type.toString,
      zepto = {},
      camelize,
      uniq,
      tempParent = document.createElement('div'),
      propMap = {
    'tabindex': 'tabIndex',
    'readonly': 'readOnly',
    'for': 'htmlFor',
    'class': 'className',
    'maxlength': 'maxLength',
    'cellspacing': 'cellSpacing',
    'cellpadding': 'cellPadding',
    'rowspan': 'rowSpan',
    'colspan': 'colSpan',
    'usemap': 'useMap',
    'frameborder': 'frameBorder',
    'contenteditable': 'contentEditable'
  },
      isArray = Array.isArray || function (object) {
    return object instanceof Array;
  };

  zepto.matches = function (element, selector) {
    if (!selector || !element || element.nodeType !== 1) return false;
    var matchesSelector = element.webkitMatchesSelector || element.mozMatchesSelector || element.oMatchesSelector || element.matchesSelector;
    if (matchesSelector) return matchesSelector.call(element, selector);
    // fall back to performing a selector:
    var match,
        parent = element.parentNode,
        temp = !parent;
    if (temp) (parent = tempParent).appendChild(element);
    match = ~zepto.qsa(parent, selector).indexOf(element);
    temp && tempParent.removeChild(element);
    return match;
  };

  function type(obj) {
    return obj == null ? String(obj) : class2type[toString.call(obj)] || "object";
  }

  function isFunction(value) {
    return type(value) == "function";
  }
  function isWindow(obj) {
    return obj != null && obj == obj.window;
  }
  function isDocument(obj) {
    return obj != null && obj.nodeType == obj.DOCUMENT_NODE;
  }
  function isObject(obj) {
    return type(obj) == "object";
  }
  function isPlainObject(obj) {
    return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype;
  }
  function likeArray(obj) {
    return typeof obj.length == 'number';
  }

  function compact(array) {
    return _filter.call(array, function (item) {
      return item != null;
    });
  }
  function flatten(array) {
    return array.length > 0 ? $.fn.concat.apply([], array) : array;
  }
  camelize = function camelize(str) {
    return str.replace(/-+(.)?/g, function (match, chr) {
      return chr ? chr.toUpperCase() : '';
    });
  };
  function dasherize(str) {
    return str.replace(/::/g, '/').replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2').replace(/([a-z\d])([A-Z])/g, '$1_$2').replace(/_/g, '-').toLowerCase();
  }
  uniq = function uniq(array) {
    return _filter.call(array, function (item, idx) {
      return array.indexOf(item) == idx;
    });
  };

  function classRE(name) {
    return name in classCache ? classCache[name] : classCache[name] = new RegExp('(^|\\s)' + name + '(\\s|$)');
  }

  function maybeAddPx(name, value) {
    return typeof value == "number" && !cssNumber[dasherize(name)] ? value + "px" : value;
  }

  function defaultDisplay(nodeName) {
    var element, display;
    if (!elementDisplay[nodeName]) {
      element = document.createElement(nodeName);
      document.body.appendChild(element);
      display = getComputedStyle(element, '').getPropertyValue("display");
      element.parentNode.removeChild(element);
      display == "none" && (display = "block");
      elementDisplay[nodeName] = display;
    }
    return elementDisplay[nodeName];
  }

  function _children(element) {
    return 'children' in element ? _slice.call(element.children) : $.map(element.childNodes, function (node) {
      if (node.nodeType == 1) return node;
    });
  }

  // `$.zepto.fragment` takes a html string and an optional tag name
  // to generate DOM nodes nodes from the given html string.
  // The generated DOM nodes are returned as an array.
  // This function can be overriden in plugins for example to make
  // it compatible with browsers that don't support the DOM fully.
  zepto.fragment = function (html, name, properties) {
    var dom, nodes, container;

    // A special case optimization for a single tag
    if (singleTagRE.test(html)) dom = $(document.createElement(RegExp.$1));

    if (!dom) {
      if (html.replace) html = html.replace(tagExpanderRE, "<$1></$2>");
      if (name === undefined) name = fragmentRE.test(html) && RegExp.$1;
      if (!(name in containers)) name = '*';

      container = containers[name];
      container.innerHTML = '' + html;
      dom = $.each(_slice.call(container.childNodes), function () {
        container.removeChild(this);
      });
    }

    if (isPlainObject(properties)) {
      nodes = $(dom);
      $.each(properties, function (key, value) {
        if (methodAttributes.indexOf(key) > -1) nodes[key](value);else nodes.attr(key, value);
      });
    }

    return dom;
  };

  // `$.zepto.Z` swaps out the prototype of the given `dom` array
  // of nodes with `$.fn` and thus supplying all the Zepto functions
  // to the array. Note that `__proto__` is not supported on Internet
  // Explorer. This method can be overriden in plugins.
  zepto.Z = function (dom, selector) {
    dom = dom || [];
    dom.__proto__ = $.fn;
    dom.selector = selector || '';
    return dom;
  };

  // `$.zepto.isZ` should return `true` if the given object is a Zepto
  // collection. This method can be overriden in plugins.
  zepto.isZ = function (object) {
    return object instanceof zepto.Z;
  };

  // `$.zepto.init` is Zepto's counterpart to jQuery's `$.fn.init` and
  // takes a CSS selector and an optional context (and handles various
  // special cases).
  // This method can be overriden in plugins.
  zepto.init = function (selector, context) {
    var dom;
    // If nothing given, return an empty Zepto collection
    if (!selector) return zepto.Z();
    // Optimize for string selectors
    else if (typeof selector == 'string') {
        selector = selector.trim();
        // If it's a html fragment, create nodes from it
        // Note: In both Chrome 21 and Firefox 15, DOM error 12
        // is thrown if the fragment doesn't begin with <
        if (selector[0] == '<' && fragmentRE.test(selector)) dom = zepto.fragment(selector, RegExp.$1, context), selector = null;
        // If there's a context, create a collection on that context first, and select
        // nodes from there
        else if (context !== undefined) return $(context).find(selector);
          // If it's a CSS selector, use it to select nodes.
          else dom = zepto.qsa(document, selector);
      }
      // If a function is given, call it when the DOM is ready
      else if (isFunction(selector)) return $(document).ready(selector);
        // If a Zepto collection is given, just return it
        else if (zepto.isZ(selector)) return selector;else {
            // normalize array if an array of nodes is given
            if (isArray(selector)) dom = compact(selector);
            // Wrap DOM nodes.
            else if (isObject(selector)) dom = [selector], selector = null;
              // If it's a html fragment, create nodes from it
              else if (fragmentRE.test(selector)) dom = zepto.fragment(selector.trim(), RegExp.$1, context), selector = null;
                // If there's a context, create a collection on that context first, and select
                // nodes from there
                else if (context !== undefined) return $(context).find(selector);
                  // And last but no least, if it's a CSS selector, use it to select nodes.
                  else dom = zepto.qsa(document, selector);
          }
    // create a new Zepto collection from the nodes found
    return zepto.Z(dom, selector);
  };

  // `$` will be the base `Zepto` object. When calling this
  // function just call `$.zepto.init, which makes the implementation
  // details of selecting nodes and creating Zepto collections
  // patchable in plugins.
  $ = function $(selector, context) {
    return zepto.init(selector, context);
  };

  function extend(target, source, deep) {
    for (key in source) {
      if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
        if (isPlainObject(source[key]) && !isPlainObject(target[key])) target[key] = {};
        if (isArray(source[key]) && !isArray(target[key])) target[key] = [];
        extend(target[key], source[key], deep);
      } else if (source[key] !== undefined) target[key] = source[key];
    }
  }

  // Copy all but undefined properties from one or more
  // objects to the `target` object.
  $.extend = function (target) {
    var deep,
        args = _slice.call(arguments, 1);
    if (typeof target == 'boolean') {
      deep = target;
      target = args.shift();
    }
    args.forEach(function (arg) {
      extend(target, arg, deep);
    });
    return target;
  };

  // `$.zepto.qsa` is Zepto's CSS selector implementation which
  // uses `document.querySelectorAll` and optimizes for some special cases, like `#id`.
  // This method can be overriden in plugins.
  zepto.qsa = function (element, selector) {
    var found,
        maybeID = selector[0] == '#',
        maybeClass = !maybeID && selector[0] == '.',
        nameOnly = maybeID || maybeClass ? selector.slice(1) : selector,
        // Ensure that a 1 char tag name still gets checked
    isSimple = simpleSelectorRE.test(nameOnly);
    return isDocument(element) && isSimple && maybeID ? (found = element.getElementById(nameOnly)) ? [found] : [] : element.nodeType !== 1 && element.nodeType !== 9 ? [] : _slice.call(isSimple && !maybeID ? maybeClass ? element.getElementsByClassName(nameOnly) : // If it's simple, it could be a class
    element.getElementsByTagName(selector) : // Or a tag
    element.querySelectorAll(selector) // Or it's not simple, and we need to query all
    );
  };

  function filtered(nodes, selector) {
    return selector == null ? $(nodes) : $(nodes).filter(selector);
  }

  $.contains = document.documentElement.contains ? function (parent, node) {
    return parent !== node && parent.contains(node);
  } : function (parent, node) {
    while (node && (node = node.parentNode)) {
      if (node === parent) return true;
    }return false;
  };

  function funcArg(context, arg, idx, payload) {
    return isFunction(arg) ? arg.call(context, idx, payload) : arg;
  }

  function setAttribute(node, name, value) {
    value == null ? node.removeAttribute(name) : node.setAttribute(name, value);
  }

  // access className property while respecting SVGAnimatedString
  function className(node, value) {
    var klass = node.className || '',
        svg = klass && klass.baseVal !== undefined;

    if (value === undefined) return svg ? klass.baseVal : klass;
    svg ? klass.baseVal = value : node.className = value;
  }

  // "true"  => true
  // "false" => false
  // "null"  => null
  // "42"    => 42
  // "42.5"  => 42.5
  // "08"    => "08"
  // JSON    => parse if valid
  // String  => self
  function deserializeValue(value) {
    try {
      return value ? value == "true" || (value == "false" ? false : value == "null" ? null : +value + "" == value ? +value : /^[\[\{]/.test(value) ? $.parseJSON(value) : value) : value;
    } catch (e) {
      return value;
    }
  }

  $.type = type;
  $.isFunction = isFunction;
  $.isWindow = isWindow;
  $.isArray = isArray;
  $.isPlainObject = isPlainObject;

  $.isEmptyObject = function (obj) {
    var name;
    for (name in obj) {
      return false;
    }return true;
  };

  $.inArray = function (elem, array, i) {
    return emptyArray.indexOf.call(array, elem, i);
  };

  $.camelCase = camelize;
  $.trim = function (str) {
    return str == null ? "" : String.prototype.trim.call(str);
  };

  // plugin compatibility
  $.uuid = 0;
  $.support = {};
  $.expr = {};

  $.map = function (elements, callback) {
    var value,
        values = [],
        i,
        key;
    if (likeArray(elements)) for (i = 0; i < elements.length; i++) {
      value = callback(elements[i], i);
      if (value != null) values.push(value);
    } else for (key in elements) {
      value = callback(elements[key], key);
      if (value != null) values.push(value);
    }
    return flatten(values);
  };

  $.each = function (elements, callback) {
    var i, key;
    if (likeArray(elements)) {
      for (i = 0; i < elements.length; i++) {
        if (callback.call(elements[i], i, elements[i]) === false) return elements;
      }
    } else {
      for (key in elements) {
        if (callback.call(elements[key], key, elements[key]) === false) return elements;
      }
    }

    return elements;
  };

  $.grep = function (elements, callback) {
    return _filter.call(elements, callback);
  };

  if (window.JSON) $.parseJSON = JSON.parse;

  // Populate the class2type map
  $.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (i, name) {
    class2type["[object " + name + "]"] = name.toLowerCase();
  });

  // Define methods that will be available on all
  // Zepto collections
  $.fn = {
    // Because a collection acts like an array
    // copy over these useful array functions.
    forEach: emptyArray.forEach,
    reduce: emptyArray.reduce,
    push: emptyArray.push,
    sort: emptyArray.sort,
    indexOf: emptyArray.indexOf,
    concat: emptyArray.concat,

    // `map` and `slice` in the jQuery API work differently
    // from their array counterparts
    map: function map(fn) {
      return $($.map(this, function (el, i) {
        return fn.call(el, i, el);
      }));
    },
    slice: function slice() {
      return $(_slice.apply(this, arguments));
    },

    ready: function ready(callback) {
      // need to check if document.body exists for IE as that browser reports
      // document ready when it hasn't yet created the body element
      if (readyRE.test(document.readyState) && document.body) callback($);else document.addEventListener('DOMContentLoaded', function () {
        callback($);
      }, false);
      return this;
    },
    get: function get(idx) {
      return idx === undefined ? _slice.call(this) : this[idx >= 0 ? idx : idx + this.length];
    },
    toArray: function toArray() {
      return this.get();
    },
    size: function size() {
      return this.length;
    },
    remove: function remove() {
      return this.each(function () {
        if (this.parentNode != null) this.parentNode.removeChild(this);
      });
    },
    each: function each(callback) {
      emptyArray.every.call(this, function (el, idx) {
        return callback.call(el, idx, el) !== false;
      });
      return this;
    },
    filter: function filter(selector) {
      if (isFunction(selector)) return this.not(this.not(selector));
      return $(_filter.call(this, function (element) {
        return zepto.matches(element, selector);
      }));
    },
    add: function add(selector, context) {
      return $(uniq(this.concat($(selector, context))));
    },
    is: function is(selector) {
      return this.length > 0 && zepto.matches(this[0], selector);
    },
    not: function not(selector) {
      var nodes = [];
      if (isFunction(selector) && selector.call !== undefined) this.each(function (idx) {
        if (!selector.call(this, idx)) nodes.push(this);
      });else {
        var excludes = typeof selector == 'string' ? this.filter(selector) : likeArray(selector) && isFunction(selector.item) ? _slice.call(selector) : $(selector);
        this.forEach(function (el) {
          if (excludes.indexOf(el) < 0) nodes.push(el);
        });
      }
      return $(nodes);
    },
    has: function has(selector) {
      return this.filter(function () {
        return isObject(selector) ? $.contains(this, selector) : $(this).find(selector).size();
      });
    },
    eq: function eq(idx) {
      return idx === -1 ? this.slice(idx) : this.slice(idx, +idx + 1);
    },
    first: function first() {
      var el = this[0];
      return el && !isObject(el) ? el : $(el);
    },
    last: function last() {
      var el = this[this.length - 1];
      return el && !isObject(el) ? el : $(el);
    },
    find: function find(selector) {
      var result,
          $this = this;
      if (!selector) result = $();else if ((typeof selector === 'undefined' ? 'undefined' : _typeof(selector)) == 'object') result = $(selector).filter(function () {
        var node = this;
        return emptyArray.some.call($this, function (parent) {
          return $.contains(parent, node);
        });
      });else if (this.length == 1) result = $(zepto.qsa(this[0], selector));else result = this.map(function () {
        return zepto.qsa(this, selector);
      });
      return result;
    },
    closest: function closest(selector, context) {
      var node = this[0],
          collection = false;
      if ((typeof selector === 'undefined' ? 'undefined' : _typeof(selector)) == 'object') collection = $(selector);
      while (node && !(collection ? collection.indexOf(node) >= 0 : zepto.matches(node, selector))) {
        node = node !== context && !isDocument(node) && node.parentNode;
      }return $(node);
    },
    parents: function parents(selector) {
      var ancestors = [],
          nodes = this;
      while (nodes.length > 0) {
        nodes = $.map(nodes, function (node) {
          if ((node = node.parentNode) && !isDocument(node) && ancestors.indexOf(node) < 0) {
            ancestors.push(node);
            return node;
          }
        });
      }return filtered(ancestors, selector);
    },
    parent: function parent(selector) {
      return filtered(uniq(this.pluck('parentNode')), selector);
    },
    children: function children(selector) {
      return filtered(this.map(function () {
        return _children(this);
      }), selector);
    },
    contents: function contents() {
      return this.map(function () {
        return _slice.call(this.childNodes);
      });
    },
    siblings: function siblings(selector) {
      return filtered(this.map(function (i, el) {
        return _filter.call(_children(el.parentNode), function (child) {
          return child !== el;
        });
      }), selector);
    },
    empty: function empty() {
      return this.each(function () {
        this.innerHTML = '';
      });
    },
    // `pluck` is borrowed from Prototype.js
    pluck: function pluck(property) {
      return $.map(this, function (el) {
        return el[property];
      });
    },
    show: function show() {
      return this.each(function () {
        this.style.display == "none" && (this.style.display = '');
        if (getComputedStyle(this, '').getPropertyValue("display") == "none") this.style.display = defaultDisplay(this.nodeName);
      });
    },
    replaceWith: function replaceWith(newContent) {
      return this.before(newContent).remove();
    },
    wrap: function wrap(structure) {
      var func = isFunction(structure);
      if (this[0] && !func) var dom = $(structure).get(0),
          clone = dom.parentNode || this.length > 1;

      return this.each(function (index) {
        $(this).wrapAll(func ? structure.call(this, index) : clone ? dom.cloneNode(true) : dom);
      });
    },
    wrapAll: function wrapAll(structure) {
      if (this[0]) {
        $(this[0]).before(structure = $(structure));
        var children;
        // drill down to the inmost element
        while ((children = structure.children()).length) {
          structure = children.first();
        }$(structure).append(this);
      }
      return this;
    },
    wrapInner: function wrapInner(structure) {
      var func = isFunction(structure);
      return this.each(function (index) {
        var self = $(this),
            contents = self.contents(),
            dom = func ? structure.call(this, index) : structure;
        contents.length ? contents.wrapAll(dom) : self.append(dom);
      });
    },
    unwrap: function unwrap() {
      this.parent().each(function () {
        $(this).replaceWith($(this).children());
      });
      return this;
    },
    clone: function clone() {
      return this.map(function () {
        return this.cloneNode(true);
      });
    },
    hide: function hide() {
      return this.css("display", "none");
    },
    toggle: function toggle(setting) {
      return this.each(function () {
        var el = $(this);(setting === undefined ? el.css("display") == "none" : setting) ? el.show() : el.hide();
      });
    },
    prev: function prev(selector) {
      return $(this.pluck('previousElementSibling')).filter(selector || '*');
    },
    next: function next(selector) {
      return $(this.pluck('nextElementSibling')).filter(selector || '*');
    },
    html: function html(_html) {
      return 0 in arguments ? this.each(function (idx) {
        var originHtml = this.innerHTML;
        $(this).empty().append(funcArg(this, _html, idx, originHtml));
      }) : 0 in this ? this[0].innerHTML : null;
    },
    text: function text(_text) {
      return 0 in arguments ? this.each(function (idx) {
        var newText = funcArg(this, _text, idx, this.textContent);
        this.textContent = newText == null ? '' : '' + newText;
      }) : 0 in this ? this[0].textContent : null;
    },
    attr: function attr(name, value) {
      var result;
      return typeof name == 'string' && !(1 in arguments) ? !this.length || this[0].nodeType !== 1 ? undefined : !(result = this[0].getAttribute(name)) && name in this[0] ? this[0][name] : result : this.each(function (idx) {
        if (this.nodeType !== 1) return;
        if (isObject(name)) for (key in name) {
          setAttribute(this, key, name[key]);
        } else setAttribute(this, name, funcArg(this, value, idx, this.getAttribute(name)));
      });
    },
    removeAttr: function removeAttr(name) {
      return this.each(function () {
        this.nodeType === 1 && name.split(' ').forEach(function (attribute) {
          setAttribute(this, attribute);
        }, this);
      });
    },
    prop: function prop(name, value) {
      name = propMap[name] || name;
      return 1 in arguments ? this.each(function (idx) {
        this[name] = funcArg(this, value, idx, this[name]);
      }) : this[0] && this[0][name];
    },
    data: function data(name, value) {
      var attrName = 'data-' + name.replace(capitalRE, '-$1').toLowerCase();

      var data = 1 in arguments ? this.attr(attrName, value) : this.attr(attrName);

      return data !== null ? deserializeValue(data) : undefined;
    },
    val: function val(value) {
      return 0 in arguments ? this.each(function (idx) {
        this.value = funcArg(this, value, idx, this.value);
      }) : this[0] && (this[0].multiple ? $(this[0]).find('option').filter(function () {
        return this.selected;
      }).pluck('value') : this[0].value);
    },
    offset: function offset(coordinates) {
      if (coordinates) return this.each(function (index) {
        var $this = $(this),
            coords = funcArg(this, coordinates, index, $this.offset()),
            parentOffset = $this.offsetParent().offset(),
            props = {
          top: coords.top - parentOffset.top,
          left: coords.left - parentOffset.left
        };

        if ($this.css('position') == 'static') props['position'] = 'relative';
        $this.css(props);
      });
      if (!this.length) return null;
      var obj = this[0].getBoundingClientRect();
      return {
        left: obj.left + window.pageXOffset,
        top: obj.top + window.pageYOffset,
        width: Math.round(obj.width),
        height: Math.round(obj.height)
      };
    },
    css: function css(property, value) {
      if (arguments.length < 2) {
        var computedStyle,
            element = this[0];
        if (!element) return;
        computedStyle = getComputedStyle(element, '');
        if (typeof property == 'string') return element.style[camelize(property)] || computedStyle.getPropertyValue(property);else if (isArray(property)) {
          var props = {};
          $.each(property, function (_, prop) {
            props[prop] = element.style[camelize(prop)] || computedStyle.getPropertyValue(prop);
          });
          return props;
        }
      }

      var css = '';
      if (type(property) == 'string') {
        if (!value && value !== 0) this.each(function () {
          this.style.removeProperty(dasherize(property));
        });else css = dasherize(property) + ":" + maybeAddPx(property, value);
      } else {
        for (key in property) {
          if (!property[key] && property[key] !== 0) this.each(function () {
            this.style.removeProperty(dasherize(key));
          });else css += dasherize(key) + ':' + maybeAddPx(key, property[key]) + ';';
        }
      }

      return this.each(function () {
        this.style.cssText += ';' + css;
      });
    },
    index: function index(element) {
      return element ? this.indexOf($(element)[0]) : this.parent().children().indexOf(this[0]);
    },
    hasClass: function hasClass(name) {
      if (!name) return false;
      return emptyArray.some.call(this, function (el) {
        return this.test(className(el));
      }, classRE(name));
    },
    addClass: function addClass(name) {
      if (!name) return this;
      return this.each(function (idx) {
        if (!('className' in this)) return;
        classList = [];
        var cls = className(this),
            newName = funcArg(this, name, idx, cls);
        newName.split(/\s+/g).forEach(function (klass) {
          if (!$(this).hasClass(klass)) classList.push(klass);
        }, this);
        classList.length && className(this, cls + (cls ? " " : "") + classList.join(" "));
      });
    },
    removeClass: function removeClass(name) {
      return this.each(function (idx) {
        if (!('className' in this)) return;
        if (name === undefined) return className(this, '');
        classList = className(this);
        funcArg(this, name, idx, classList).split(/\s+/g).forEach(function (klass) {
          classList = classList.replace(classRE(klass), " ");
        });
        className(this, classList.trim());
      });
    },
    toggleClass: function toggleClass(name, when) {
      if (!name) return this;
      return this.each(function (idx) {
        var $this = $(this),
            names = funcArg(this, name, idx, className(this));
        names.split(/\s+/g).forEach(function (klass) {
          (when === undefined ? !$this.hasClass(klass) : when) ? $this.addClass(klass) : $this.removeClass(klass);
        });
      });
    },
    scrollTop: function scrollTop(value) {
      if (!this.length) return;
      var hasScrollTop = 'scrollTop' in this[0];
      if (value === undefined) return hasScrollTop ? this[0].scrollTop : this[0].pageYOffset;
      return this.each(hasScrollTop ? function () {
        this.scrollTop = value;
      } : function () {
        this.scrollTo(this.scrollX, value);
      });
    },
    scrollLeft: function scrollLeft(value) {
      if (!this.length) return;
      var hasScrollLeft = 'scrollLeft' in this[0];
      if (value === undefined) return hasScrollLeft ? this[0].scrollLeft : this[0].pageXOffset;
      return this.each(hasScrollLeft ? function () {
        this.scrollLeft = value;
      } : function () {
        this.scrollTo(value, this.scrollY);
      });
    },
    position: function position() {
      if (!this.length) return;

      var elem = this[0],

      // Get *real* offsetParent
      offsetParent = this.offsetParent(),

      // Get correct offsets
      offset = this.offset(),
          parentOffset = rootNodeRE.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset();

      // Subtract element margins
      // note: when an element has margin: auto the offsetLeft and marginLeft
      // are the same in Safari causing offset.left to incorrectly be 0
      offset.top -= parseFloat($(elem).css('margin-top')) || 0;
      offset.left -= parseFloat($(elem).css('margin-left')) || 0;

      // Add offsetParent borders
      parentOffset.top += parseFloat($(offsetParent[0]).css('border-top-width')) || 0;
      parentOffset.left += parseFloat($(offsetParent[0]).css('border-left-width')) || 0;

      // Subtract the two offsets
      return {
        top: offset.top - parentOffset.top,
        left: offset.left - parentOffset.left
      };
    },
    offsetParent: function offsetParent() {
      return this.map(function () {
        var parent = this.offsetParent || document.body;
        while (parent && !rootNodeRE.test(parent.nodeName) && $(parent).css("position") == "static") {
          parent = parent.offsetParent;
        }return parent;
      });
    }

    // for now
  };$.fn.detach = $.fn.remove

  // Generate the `width` and `height` functions
  ;['width', 'height'].forEach(function (dimension) {
    var dimensionProperty = dimension.replace(/./, function (m) {
      return m[0].toUpperCase();
    });

    $.fn[dimension] = function (value) {
      var offset,
          el = this[0];
      if (value === undefined) return isWindow(el) ? el['inner' + dimensionProperty] : isDocument(el) ? el.documentElement['scroll' + dimensionProperty] : (offset = this.offset()) && offset[dimension];else return this.each(function (idx) {
        el = $(this);
        el.css(dimension, funcArg(this, value, idx, el[dimension]()));
      });
    };
  });

  function traverseNode(node, fun) {
    fun(node);
    for (var i = 0, len = node.childNodes.length; i < len; i++) {
      traverseNode(node.childNodes[i], fun);
    }
  }

  // Generate the `after`, `prepend`, `before`, `append`,
  // `insertAfter`, `insertBefore`, `appendTo`, and `prependTo` methods.
  adjacencyOperators.forEach(function (operator, operatorIndex) {
    var inside = operatorIndex % 2; //=> prepend, append

    $.fn[operator] = function () {
      // arguments can be nodes, arrays of nodes, Zepto objects and HTML strings
      var argType,
          nodes = $.map(arguments, function (arg) {
        argType = type(arg);
        return argType == "object" || argType == "array" || arg == null ? arg : zepto.fragment(arg);
      }),
          parent,
          copyByClone = this.length > 1;
      if (nodes.length < 1) return this;

      return this.each(function (_, target) {
        parent = inside ? target : target.parentNode;

        // convert all methods to a "before" operation
        target = operatorIndex == 0 ? target.nextSibling : operatorIndex == 1 ? target.firstChild : operatorIndex == 2 ? target : null;

        var parentInDocument = $.contains(document.documentElement, parent);

        nodes.forEach(function (node) {
          if (copyByClone) node = node.cloneNode(true);else if (!parent) return $(node).remove();

          parent.insertBefore(node, target);
          if (parentInDocument) traverseNode(node, function (el) {
            if (el.nodeName != null && el.nodeName.toUpperCase() === 'SCRIPT' && (!el.type || el.type === 'text/javascript') && !el.src) window['eval'].call(window, el.innerHTML);
          });
        });
      });
    };

    // after    => insertAfter
    // prepend  => prependTo
    // before   => insertBefore
    // append   => appendTo
    $.fn[inside ? operator + 'To' : 'insert' + (operatorIndex ? 'Before' : 'After')] = function (html) {
      $(html)[operator](this);
      return this;
    };
  });

  zepto.Z.prototype = $.fn;

  // Export internal API functions in the `$.zepto` namespace
  zepto.uniq = uniq;
  zepto.deserializeValue = deserializeValue;
  $.zepto = zepto;

  return $;
}();

window.Zepto = Zepto;
window.$ === undefined && (window.$ = Zepto);(function ($) {
  var _zid = 1,
      undefined,
      slice = Array.prototype.slice,
      isFunction = $.isFunction,
      isString = function isString(obj) {
    return typeof obj == 'string';
  },
      handlers = {},
      specialEvents = {},
      focusinSupported = 'onfocusin' in window,
      focus = { focus: 'focusin', blur: 'focusout' },
      hover = { mouseenter: 'mouseover', mouseleave: 'mouseout' };

  specialEvents.click = specialEvents.mousedown = specialEvents.mouseup = specialEvents.mousemove = 'MouseEvents';

  function zid(element) {
    return element._zid || (element._zid = _zid++);
  }
  function findHandlers(element, event, fn, selector) {
    event = parse(event);
    if (event.ns) var matcher = matcherFor(event.ns);
    return (handlers[zid(element)] || []).filter(function (handler) {
      return handler && (!event.e || handler.e == event.e) && (!event.ns || matcher.test(handler.ns)) && (!fn || zid(handler.fn) === zid(fn)) && (!selector || handler.sel == selector);
    });
  }
  function parse(event) {
    var parts = ('' + event).split('.');
    return { e: parts[0], ns: parts.slice(1).sort().join(' ') };
  }
  function matcherFor(ns) {
    return new RegExp('(?:^| )' + ns.replace(' ', ' .* ?') + '(?: |$)');
  }

  function eventCapture(handler, captureSetting) {
    return handler.del && !focusinSupported && handler.e in focus || !!captureSetting;
  }

  function realEvent(type) {
    return hover[type] || focusinSupported && focus[type] || type;
  }

  function add(element, events, fn, data, selector, delegator, capture) {
    var id = zid(element),
        set = handlers[id] || (handlers[id] = []);
    events.split(/\s/).forEach(function (event) {
      if (event == 'ready') return $(document).ready(fn);
      var handler = parse(event);
      handler.fn = fn;
      handler.sel = selector;
      // emulate mouseenter, mouseleave
      if (handler.e in hover) fn = function fn(e) {
        var related = e.relatedTarget;
        if (!related || related !== this && !$.contains(this, related)) return handler.fn.apply(this, arguments);
      };
      handler.del = delegator;
      var callback = delegator || fn;
      handler.proxy = function (e) {
        e = compatible(e);
        if (e.isImmediatePropagationStopped()) return;
        e.data = data;
        var result = callback.apply(element, e._args == undefined ? [e] : [e].concat(e._args));
        if (result === false) e.preventDefault(), e.stopPropagation();
        return result;
      };
      handler.i = set.length;
      set.push(handler);
      if ('addEventListener' in element) element.addEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture));
    });
  }
  function remove(element, events, fn, selector, capture) {
    var id = zid(element);(events || '').split(/\s/).forEach(function (event) {
      findHandlers(element, event, fn, selector).forEach(function (handler) {
        delete handlers[id][handler.i];
        if ('removeEventListener' in element) element.removeEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture));
      });
    });
  }

  $.event = { add: add, remove: remove };

  $.proxy = function (fn, context) {
    var args = 2 in arguments && slice.call(arguments, 2);
    if (isFunction(fn)) {
      var proxyFn = function proxyFn() {
        return fn.apply(context, args ? args.concat(slice.call(arguments)) : arguments);
      };
      proxyFn._zid = zid(fn);
      return proxyFn;
    } else if (isString(context)) {
      if (args) {
        args.unshift(fn[context], fn);
        return $.proxy.apply(null, args);
      } else {
        return $.proxy(fn[context], fn);
      }
    } else {
      throw new TypeError("expected function");
    }
  };

  $.fn.bind = function (event, data, callback) {
    return this.on(event, data, callback);
  };
  $.fn.unbind = function (event, callback) {
    return this.off(event, callback);
  };
  $.fn.one = function (event, selector, data, callback) {
    return this.on(event, selector, data, callback, 1);
  };

  var returnTrue = function returnTrue() {
    return true;
  },
      returnFalse = function returnFalse() {
    return false;
  },
      ignoreProperties = /^([A-Z]|returnValue$|layer[XY]$)/,
      eventMethods = {
    preventDefault: 'isDefaultPrevented',
    stopImmediatePropagation: 'isImmediatePropagationStopped',
    stopPropagation: 'isPropagationStopped'
  };

  function compatible(event, source) {
    if (source || !event.isDefaultPrevented) {
      source || (source = event);

      $.each(eventMethods, function (name, predicate) {
        var sourceMethod = source[name];
        event[name] = function () {
          this[predicate] = returnTrue;
          return sourceMethod && sourceMethod.apply(source, arguments);
        };
        event[predicate] = returnFalse;
      });

      if (source.defaultPrevented !== undefined ? source.defaultPrevented : 'returnValue' in source ? source.returnValue === false : source.getPreventDefault && source.getPreventDefault()) event.isDefaultPrevented = returnTrue;
    }
    return event;
  }

  function createProxy(event) {
    var key,
        proxy = { originalEvent: event };
    for (key in event) {
      if (!ignoreProperties.test(key) && event[key] !== undefined) proxy[key] = event[key];
    }return compatible(proxy, event);
  }

  $.fn.delegate = function (selector, event, callback) {
    return this.on(event, selector, callback);
  };
  $.fn.undelegate = function (selector, event, callback) {
    return this.off(event, selector, callback);
  };

  $.fn.live = function (event, callback) {
    $(document.body).delegate(this.selector, event, callback);
    return this;
  };
  $.fn.die = function (event, callback) {
    $(document.body).undelegate(this.selector, event, callback);
    return this;
  };

  $.fn.on = function (event, selector, data, callback, one) {
    var autoRemove,
        delegator,
        $this = this;
    if (event && !isString(event)) {
      $.each(event, function (type, fn) {
        $this.on(type, selector, data, fn, one);
      });
      return $this;
    }

    if (!isString(selector) && !isFunction(callback) && callback !== false) callback = data, data = selector, selector = undefined;
    if (isFunction(data) || data === false) callback = data, data = undefined;

    if (callback === false) callback = returnFalse;

    return $this.each(function (_, element) {
      if (one) autoRemove = function autoRemove(e) {
        remove(element, e.type, callback);
        return callback.apply(this, arguments);
      };

      if (selector) delegator = function delegator(e) {
        var evt,
            match = $(e.target).closest(selector, element).get(0);
        if (match && match !== element) {
          evt = $.extend(createProxy(e), { currentTarget: match, liveFired: element });
          return (autoRemove || callback).apply(match, [evt].concat(slice.call(arguments, 1)));
        }
      };

      add(element, event, callback, data, selector, delegator || autoRemove);
    });
  };
  $.fn.off = function (event, selector, callback) {
    var $this = this;
    if (event && !isString(event)) {
      $.each(event, function (type, fn) {
        $this.off(type, selector, fn);
      });
      return $this;
    }

    if (!isString(selector) && !isFunction(callback) && callback !== false) callback = selector, selector = undefined;

    if (callback === false) callback = returnFalse;

    return $this.each(function () {
      remove(this, event, callback, selector);
    });
  };

  $.fn.trigger = function (event, args) {
    event = isString(event) || $.isPlainObject(event) ? $.Event(event) : compatible(event);
    event._args = args;
    return this.each(function () {
      // handle focus(), blur() by calling them directly
      if (event.type in focus && typeof this[event.type] == "function") this[event.type]();
      // items in the collection might not be DOM elements
      else if ('dispatchEvent' in this) this.dispatchEvent(event);else $(this).triggerHandler(event, args);
    });
  };

  // triggers event handlers on current element just as if an event occurred,
  // doesn't trigger an actual event, doesn't bubble
  $.fn.triggerHandler = function (event, args) {
    var e, result;
    this.each(function (i, element) {
      e = createProxy(isString(event) ? $.Event(event) : event);
      e._args = args;
      e.target = element;
      $.each(findHandlers(element, event.type || event), function (i, handler) {
        result = handler.proxy(e);
        if (e.isImmediatePropagationStopped()) return false;
      });
    });
    return result;
  }

  // shortcut methods for `.bind(event, fn)` for each event type
  ;('focusin focusout focus blur load resize scroll unload click dblclick ' + 'mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave ' + 'change select keydown keypress keyup error').split(' ').forEach(function (event) {
    $.fn[event] = function (callback) {
      return 0 in arguments ? this.bind(event, callback) : this.trigger(event);
    };
  });

  $.Event = function (type, props) {
    if (!isString(type)) props = type, type = props.type;
    var event = document.createEvent(specialEvents[type] || 'Events'),
        bubbles = true;
    if (props) for (var name in props) {
      name == 'bubbles' ? bubbles = !!props[name] : event[name] = props[name];
    }event.initEvent(type, bubbles, true);
    return compatible(event);
  };
})(Zepto);(function ($) {
  var jsonpID = 0,
      document = window.document,
      key,
      name,
      rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      scriptTypeRE = /^(?:text|application)\/javascript/i,
      xmlTypeRE = /^(?:text|application)\/xml/i,
      jsonType = 'application/json',
      htmlType = 'text/html',
      blankRE = /^\s*$/,
      originAnchor = document.createElement('a');

  originAnchor.href = window.location.href;

  // trigger a custom event and return false if it was cancelled
  function triggerAndReturn(context, eventName, data) {
    var event = $.Event(eventName);
    $(context).trigger(event, data);
    return !event.isDefaultPrevented();
  }

  // trigger an Ajax "global" event
  function triggerGlobal(settings, context, eventName, data) {
    if (settings.global) return triggerAndReturn(context || document, eventName, data);
  }

  // Number of active Ajax requests
  $.active = 0;

  function ajaxStart(settings) {
    if (settings.global && $.active++ === 0) triggerGlobal(settings, null, 'ajaxStart');
  }
  function ajaxStop(settings) {
    if (settings.global && ! --$.active) triggerGlobal(settings, null, 'ajaxStop');
  }

  // triggers an extra global event "ajaxBeforeSend" that's like "ajaxSend" but cancelable
  function ajaxBeforeSend(xhr, settings) {
    var context = settings.context;
    if (settings.beforeSend.call(context, xhr, settings) === false || triggerGlobal(settings, context, 'ajaxBeforeSend', [xhr, settings]) === false) return false;

    triggerGlobal(settings, context, 'ajaxSend', [xhr, settings]);
  }
  function ajaxSuccess(data, xhr, settings, deferred) {
    var context = settings.context,
        status = 'success';
    settings.success.call(context, data, status, xhr);
    if (deferred) deferred.resolveWith(context, [data, status, xhr]);
    triggerGlobal(settings, context, 'ajaxSuccess', [xhr, settings, data]);
    ajaxComplete(status, xhr, settings);
  }
  // type: "timeout", "error", "abort", "parsererror"
  function ajaxError(error, type, xhr, settings, deferred) {
    var context = settings.context;
    settings.error.call(context, xhr, type, error);
    if (deferred) deferred.rejectWith(context, [xhr, type, error]);
    triggerGlobal(settings, context, 'ajaxError', [xhr, settings, error || type]);
    ajaxComplete(type, xhr, settings);
  }
  // status: "success", "notmodified", "error", "timeout", "abort", "parsererror"
  function ajaxComplete(status, xhr, settings) {
    var context = settings.context;
    settings.complete.call(context, xhr, status);
    triggerGlobal(settings, context, 'ajaxComplete', [xhr, settings]);
    ajaxStop(settings);
  }

  // Empty function, used as default callback
  function empty() {}

  $.ajaxJSONP = function (options, deferred) {
    if (!('type' in options)) return $.ajax(options);

    var _callbackName = options.jsonpCallback,
        callbackName = ($.isFunction(_callbackName) ? _callbackName() : _callbackName) || 'jsonp' + ++jsonpID,
        script = document.createElement('script'),
        originalCallback = window[callbackName],
        responseData,
        abort = function abort(errorType) {
      $(script).triggerHandler('error', errorType || 'abort');
    },
        xhr = { abort: abort },
        abortTimeout;

    if (deferred) deferred.promise(xhr);

    $(script).on('load error', function (e, errorType) {
      clearTimeout(abortTimeout);
      $(script).off().remove();

      if (e.type == 'error' || !responseData) {
        ajaxError(null, errorType || 'error', xhr, options, deferred);
      } else {
        ajaxSuccess(responseData[0], xhr, options, deferred);
      }

      window[callbackName] = originalCallback;
      if (responseData && $.isFunction(originalCallback)) originalCallback(responseData[0]);

      originalCallback = responseData = undefined;
    });

    if (ajaxBeforeSend(xhr, options) === false) {
      abort('abort');
      return xhr;
    }

    window[callbackName] = function () {
      responseData = arguments;
    };

    script.src = options.url.replace(/\?(.+)=\?/, '?$1=' + callbackName);
    document.head.appendChild(script);

    if (options.timeout > 0) abortTimeout = setTimeout(function () {
      abort('timeout');
    }, options.timeout);

    return xhr;
  };

  $.ajaxSettings = {
    // Default type of request
    type: 'GET',
    // Callback that is executed before request
    beforeSend: empty,
    // Callback that is executed if the request succeeds
    success: empty,
    // Callback that is executed the the server drops error
    error: empty,
    // Callback that is executed on request complete (both: error and success)
    complete: empty,
    // The context for the callbacks
    context: null,
    // Whether to trigger "global" Ajax events
    global: true,
    // Transport
    xhr: function xhr() {
      return new window.XMLHttpRequest();
    },
    // MIME types mapping
    // IIS returns Javascript as "application/x-javascript"
    accepts: {
      script: 'text/javascript, application/javascript, application/x-javascript',
      json: jsonType,
      xml: 'application/xml, text/xml',
      html: htmlType,
      text: 'text/plain'
    },
    // Whether the request is to another domain
    crossDomain: false,
    // Default timeout
    timeout: 0,
    // Whether data should be serialized to string
    processData: true,
    // Whether the browser should be allowed to cache GET responses
    cache: true
  };

  function mimeToDataType(mime) {
    if (mime) mime = mime.split(';', 2)[0];
    return mime && (mime == htmlType ? 'html' : mime == jsonType ? 'json' : scriptTypeRE.test(mime) ? 'script' : xmlTypeRE.test(mime) && 'xml') || 'text';
  }

  function appendQuery(url, query) {
    if (query == '') return url;
    return (url + '&' + query).replace(/[&?]{1,2}/, '?');
  }

  // serialize payload and append it to the URL for GET requests
  function serializeData(options) {
    if (options.processData && options.data && $.type(options.data) != "string") options.data = $.param(options.data, options.traditional);
    if (options.data && (!options.type || options.type.toUpperCase() == 'GET')) options.url = appendQuery(options.url, options.data), options.data = undefined;
  }

  $.ajax = function (options) {
    var settings = $.extend({}, options || {}),
        deferred = $.Deferred && $.Deferred(),
        urlAnchor;
    for (key in $.ajaxSettings) {
      if (settings[key] === undefined) settings[key] = $.ajaxSettings[key];
    }ajaxStart(settings);

    if (!settings.crossDomain) {
      urlAnchor = document.createElement('a');
      urlAnchor.href = settings.url;
      urlAnchor.href = urlAnchor.href;
      settings.crossDomain = originAnchor.protocol + '//' + originAnchor.host !== urlAnchor.protocol + '//' + urlAnchor.host;
    }

    if (!settings.url) settings.url = window.location.toString();
    serializeData(settings);

    var dataType = settings.dataType,
        hasPlaceholder = /\?.+=\?/.test(settings.url);
    if (hasPlaceholder) dataType = 'jsonp';

    if (settings.cache === false || (!options || options.cache !== true) && ('script' == dataType || 'jsonp' == dataType)) settings.url = appendQuery(settings.url, '_=' + Date.now());

    if ('jsonp' == dataType) {
      if (!hasPlaceholder) settings.url = appendQuery(settings.url, settings.jsonp ? settings.jsonp + '=?' : settings.jsonp === false ? '' : 'callback=?');
      return $.ajaxJSONP(settings, deferred);
    }

    var mime = settings.accepts[dataType],
        headers = {},
        setHeader = function setHeader(name, value) {
      headers[name.toLowerCase()] = [name, value];
    },
        protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol,
        xhr = settings.xhr(),
        nativeSetHeader = xhr.setRequestHeader,
        abortTimeout;

    if (deferred) deferred.promise(xhr);

    if (!settings.crossDomain) setHeader('X-Requested-With', 'XMLHttpRequest');
    setHeader('Accept', mime || '*/*');
    if (mime = settings.mimeType || mime) {
      if (mime.indexOf(',') > -1) mime = mime.split(',', 2)[0];
      xhr.overrideMimeType && xhr.overrideMimeType(mime);
    }
    if (settings.contentType || settings.contentType !== false && settings.data && settings.type.toUpperCase() != 'GET') setHeader('Content-Type', settings.contentType || 'application/x-www-form-urlencoded');

    if (settings.headers) for (name in settings.headers) {
      setHeader(name, settings.headers[name]);
    }xhr.setRequestHeader = setHeader;

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        xhr.onreadystatechange = empty;
        clearTimeout(abortTimeout);
        var result,
            error = false;
        if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304 || xhr.status == 0 && protocol == 'file:') {
          dataType = dataType || mimeToDataType(settings.mimeType || xhr.getResponseHeader('content-type'));
          result = xhr.responseText;

          try {
            // http://perfectionkills.com/global-eval-what-are-the-options/
            if (dataType == 'script') (1, eval)(result);else if (dataType == 'xml') result = xhr.responseXML;else if (dataType == 'json') result = blankRE.test(result) ? null : $.parseJSON(result);
          } catch (e) {
            error = e;
          }

          if (error) ajaxError(error, 'parsererror', xhr, settings, deferred);else ajaxSuccess(result, xhr, settings, deferred);
        } else {
          ajaxError(xhr.statusText || null, xhr.status ? 'error' : 'abort', xhr, settings, deferred);
        }
      }
    };

    if (ajaxBeforeSend(xhr, settings) === false) {
      xhr.abort();
      ajaxError(null, 'abort', xhr, settings, deferred);
      return xhr;
    }

    if (settings.xhrFields) for (name in settings.xhrFields) {
      xhr[name] = settings.xhrFields[name];
    }var async = 'async' in settings ? settings.async : true;
    xhr.open(settings.type, settings.url, async, settings.username, settings.password);

    for (name in headers) {
      nativeSetHeader.apply(xhr, headers[name]);
    }if (settings.timeout > 0) abortTimeout = setTimeout(function () {
      xhr.onreadystatechange = empty;
      xhr.abort();
      ajaxError(null, 'timeout', xhr, settings, deferred);
    }, settings.timeout);

    // avoid sending empty string (#319)
    xhr.send(settings.data ? settings.data : null);
    return xhr;
  };

  // handle optional data/success arguments
  function parseArguments(url, data, success, dataType) {
    if ($.isFunction(data)) dataType = success, success = data, data = undefined;
    if (!$.isFunction(success)) dataType = success, success = undefined;
    return {
      url: url,
      data: data,
      success: success,
      dataType: dataType
    };
  }

  $.get = function () /* url, data, success, dataType */{
    return $.ajax(parseArguments.apply(null, arguments));
  };

  $.post = function () /* url, data, success, dataType */{
    var options = parseArguments.apply(null, arguments);
    options.type = 'POST';
    return $.ajax(options);
  };

  $.getJSON = function () /* url, data, success */{
    var options = parseArguments.apply(null, arguments);
    options.dataType = 'json';
    return $.ajax(options);
  };

  $.fn.load = function (url, data, success) {
    if (!this.length) return this;
    var self = this,
        parts = url.split(/\s/),
        selector,
        options = parseArguments(url, data, success),
        callback = options.success;
    if (parts.length > 1) options.url = parts[0], selector = parts[1];
    options.success = function (response) {
      self.html(selector ? $('<div>').html(response.replace(rscript, "")).find(selector) : response);
      callback && callback.apply(self, arguments);
    };
    $.ajax(options);
    return this;
  };

  var escape = encodeURIComponent;

  function serialize(params, obj, traditional, scope) {
    var type,
        array = $.isArray(obj),
        hash = $.isPlainObject(obj);
    $.each(obj, function (key, value) {
      type = $.type(value);
      if (scope) key = traditional ? scope : scope + '[' + (hash || type == 'object' || type == 'array' ? key : '') + ']';
      // handle data in serializeArray() format
      if (!scope && array) params.add(value.name, value.value);
      // recurse into nested objects
      else if (type == "array" || !traditional && type == "object") serialize(params, value, traditional, key);else params.add(key, value);
    });
  }

  $.param = function (obj, traditional) {
    var params = [];
    params.add = function (key, value) {
      if ($.isFunction(value)) value = value();
      if (value == null) value = "";
      this.push(escape(key) + '=' + escape(value));
    };
    serialize(params, obj, traditional);
    return params.join('&').replace(/%20/g, '+');
  };
})(Zepto);(function ($) {
  $.fn.serializeArray = function () {
    var name,
        type,
        result = [],
        add = function add(value) {
      if (value.forEach) return value.forEach(add);
      result.push({ name: name, value: value });
    };
    if (this[0]) $.each(this[0].elements, function (_, field) {
      type = field.type, name = field.name;
      if (name && field.nodeName.toLowerCase() != 'fieldset' && !field.disabled && type != 'submit' && type != 'reset' && type != 'button' && type != 'file' && (type != 'radio' && type != 'checkbox' || field.checked)) add($(field).val());
    });
    return result;
  };

  $.fn.serialize = function () {
    var result = [];
    this.serializeArray().forEach(function (elm) {
      result.push(encodeURIComponent(elm.name) + '=' + encodeURIComponent(elm.value));
    });
    return result.join('&');
  };

  $.fn.submit = function (callback) {
    if (0 in arguments) this.bind('submit', callback);else if (this.length) {
      var event = $.Event('submit');
      this.eq(0).trigger(event);
      if (!event.isDefaultPrevented()) this.get(0).submit();
    }
    return this;
  };
})(Zepto);(function ($) {
  // __proto__ doesn't exist on IE<11, so redefine
  // the Z function to use object extension instead
  if (!('__proto__' in {})) {
    $.extend($.zepto, {
      Z: function Z(dom, selector) {
        dom = dom || [];
        $.extend(dom, $.fn);
        dom.selector = selector || '';
        dom.__Z = true;
        return dom;
      },
      // this is a kludge but works
      isZ: function isZ(object) {
        return $.type(object) === 'array' && '__Z' in object;
      }
    });
  }

  // getComputedStyle shouldn't freak out when called
  // without a valid element as argument
  try {
    getComputedStyle(undefined);
  } catch (e) {
    var nativeGetComputedStyle = getComputedStyle;
    window.getComputedStyle = function (element) {
      try {
        return nativeGetComputedStyle(element);
      } catch (e) {
        return null;
      }
    };
  }
})(Zepto);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZha2VfODg4ZTU1NmUuanMiXSwibmFtZXMiOlsiWmVwdG8iLCJ1bmRlZmluZWQiLCJrZXkiLCIkIiwiY2xhc3NMaXN0IiwiZW1wdHlBcnJheSIsInNsaWNlIiwiZmlsdGVyIiwiZG9jdW1lbnQiLCJ3aW5kb3ciLCJlbGVtZW50RGlzcGxheSIsImNsYXNzQ2FjaGUiLCJjc3NOdW1iZXIiLCJmcmFnbWVudFJFIiwic2luZ2xlVGFnUkUiLCJ0YWdFeHBhbmRlclJFIiwicm9vdE5vZGVSRSIsImNhcGl0YWxSRSIsIm1ldGhvZEF0dHJpYnV0ZXMiLCJhZGphY2VuY3lPcGVyYXRvcnMiLCJ0YWJsZSIsImNyZWF0ZUVsZW1lbnQiLCJ0YWJsZVJvdyIsImNvbnRhaW5lcnMiLCJyZWFkeVJFIiwic2ltcGxlU2VsZWN0b3JSRSIsImNsYXNzMnR5cGUiLCJ0b1N0cmluZyIsInplcHRvIiwiY2FtZWxpemUiLCJ1bmlxIiwidGVtcFBhcmVudCIsInByb3BNYXAiLCJpc0FycmF5IiwiQXJyYXkiLCJvYmplY3QiLCJtYXRjaGVzIiwiZWxlbWVudCIsInNlbGVjdG9yIiwibm9kZVR5cGUiLCJtYXRjaGVzU2VsZWN0b3IiLCJ3ZWJraXRNYXRjaGVzU2VsZWN0b3IiLCJtb3pNYXRjaGVzU2VsZWN0b3IiLCJvTWF0Y2hlc1NlbGVjdG9yIiwiY2FsbCIsIm1hdGNoIiwicGFyZW50IiwicGFyZW50Tm9kZSIsInRlbXAiLCJhcHBlbmRDaGlsZCIsInFzYSIsImluZGV4T2YiLCJyZW1vdmVDaGlsZCIsInR5cGUiLCJvYmoiLCJTdHJpbmciLCJpc0Z1bmN0aW9uIiwidmFsdWUiLCJpc1dpbmRvdyIsImlzRG9jdW1lbnQiLCJET0NVTUVOVF9OT0RFIiwiaXNPYmplY3QiLCJpc1BsYWluT2JqZWN0IiwiT2JqZWN0IiwiZ2V0UHJvdG90eXBlT2YiLCJwcm90b3R5cGUiLCJsaWtlQXJyYXkiLCJsZW5ndGgiLCJjb21wYWN0IiwiYXJyYXkiLCJpdGVtIiwiZmxhdHRlbiIsImZuIiwiY29uY2F0IiwiYXBwbHkiLCJzdHIiLCJyZXBsYWNlIiwiY2hyIiwidG9VcHBlckNhc2UiLCJkYXNoZXJpemUiLCJ0b0xvd2VyQ2FzZSIsImlkeCIsImNsYXNzUkUiLCJuYW1lIiwiUmVnRXhwIiwibWF5YmVBZGRQeCIsImRlZmF1bHREaXNwbGF5Iiwibm9kZU5hbWUiLCJkaXNwbGF5IiwiYm9keSIsImdldENvbXB1dGVkU3R5bGUiLCJnZXRQcm9wZXJ0eVZhbHVlIiwiY2hpbGRyZW4iLCJtYXAiLCJjaGlsZE5vZGVzIiwibm9kZSIsImZyYWdtZW50IiwiaHRtbCIsInByb3BlcnRpZXMiLCJkb20iLCJub2RlcyIsImNvbnRhaW5lciIsInRlc3QiLCIkMSIsImlubmVySFRNTCIsImVhY2giLCJhdHRyIiwiWiIsIl9fcHJvdG9fXyIsImlzWiIsImluaXQiLCJjb250ZXh0IiwidHJpbSIsImZpbmQiLCJyZWFkeSIsImV4dGVuZCIsInRhcmdldCIsInNvdXJjZSIsImRlZXAiLCJhcmdzIiwiYXJndW1lbnRzIiwic2hpZnQiLCJmb3JFYWNoIiwiYXJnIiwiZm91bmQiLCJtYXliZUlEIiwibWF5YmVDbGFzcyIsIm5hbWVPbmx5IiwiaXNTaW1wbGUiLCJnZXRFbGVtZW50QnlJZCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmaWx0ZXJlZCIsImNvbnRhaW5zIiwiZG9jdW1lbnRFbGVtZW50IiwiZnVuY0FyZyIsInBheWxvYWQiLCJzZXRBdHRyaWJ1dGUiLCJyZW1vdmVBdHRyaWJ1dGUiLCJjbGFzc05hbWUiLCJrbGFzcyIsInN2ZyIsImJhc2VWYWwiLCJkZXNlcmlhbGl6ZVZhbHVlIiwicGFyc2VKU09OIiwiZSIsImlzRW1wdHlPYmplY3QiLCJpbkFycmF5IiwiZWxlbSIsImkiLCJjYW1lbENhc2UiLCJ1dWlkIiwic3VwcG9ydCIsImV4cHIiLCJlbGVtZW50cyIsImNhbGxiYWNrIiwidmFsdWVzIiwicHVzaCIsImdyZXAiLCJKU09OIiwicGFyc2UiLCJzcGxpdCIsInJlZHVjZSIsInNvcnQiLCJlbCIsInJlYWR5U3RhdGUiLCJhZGRFdmVudExpc3RlbmVyIiwiZ2V0IiwidG9BcnJheSIsInNpemUiLCJyZW1vdmUiLCJldmVyeSIsIm5vdCIsImFkZCIsImlzIiwiZXhjbHVkZXMiLCJoYXMiLCJlcSIsImZpcnN0IiwibGFzdCIsInJlc3VsdCIsIiR0aGlzIiwic29tZSIsImNsb3Nlc3QiLCJjb2xsZWN0aW9uIiwicGFyZW50cyIsImFuY2VzdG9ycyIsInBsdWNrIiwiY29udGVudHMiLCJzaWJsaW5ncyIsImNoaWxkIiwiZW1wdHkiLCJwcm9wZXJ0eSIsInNob3ciLCJzdHlsZSIsInJlcGxhY2VXaXRoIiwibmV3Q29udGVudCIsImJlZm9yZSIsIndyYXAiLCJzdHJ1Y3R1cmUiLCJmdW5jIiwiY2xvbmUiLCJpbmRleCIsIndyYXBBbGwiLCJjbG9uZU5vZGUiLCJhcHBlbmQiLCJ3cmFwSW5uZXIiLCJzZWxmIiwidW53cmFwIiwiaGlkZSIsImNzcyIsInRvZ2dsZSIsInNldHRpbmciLCJwcmV2IiwibmV4dCIsIm9yaWdpbkh0bWwiLCJ0ZXh0IiwibmV3VGV4dCIsInRleHRDb250ZW50IiwiZ2V0QXR0cmlidXRlIiwicmVtb3ZlQXR0ciIsImF0dHJpYnV0ZSIsInByb3AiLCJkYXRhIiwiYXR0ck5hbWUiLCJ2YWwiLCJtdWx0aXBsZSIsInNlbGVjdGVkIiwib2Zmc2V0IiwiY29vcmRpbmF0ZXMiLCJjb29yZHMiLCJwYXJlbnRPZmZzZXQiLCJvZmZzZXRQYXJlbnQiLCJwcm9wcyIsInRvcCIsImxlZnQiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJwYWdlWE9mZnNldCIsInBhZ2VZT2Zmc2V0Iiwid2lkdGgiLCJNYXRoIiwicm91bmQiLCJoZWlnaHQiLCJjb21wdXRlZFN0eWxlIiwiXyIsInJlbW92ZVByb3BlcnR5IiwiY3NzVGV4dCIsImhhc0NsYXNzIiwiYWRkQ2xhc3MiLCJjbHMiLCJuZXdOYW1lIiwiam9pbiIsInJlbW92ZUNsYXNzIiwidG9nZ2xlQ2xhc3MiLCJ3aGVuIiwibmFtZXMiLCJzY3JvbGxUb3AiLCJoYXNTY3JvbGxUb3AiLCJzY3JvbGxUbyIsInNjcm9sbFgiLCJzY3JvbGxMZWZ0IiwiaGFzU2Nyb2xsTGVmdCIsInNjcm9sbFkiLCJwb3NpdGlvbiIsInBhcnNlRmxvYXQiLCJkZXRhY2giLCJkaW1lbnNpb24iLCJkaW1lbnNpb25Qcm9wZXJ0eSIsIm0iLCJ0cmF2ZXJzZU5vZGUiLCJmdW4iLCJsZW4iLCJvcGVyYXRvciIsIm9wZXJhdG9ySW5kZXgiLCJpbnNpZGUiLCJhcmdUeXBlIiwiY29weUJ5Q2xvbmUiLCJuZXh0U2libGluZyIsImZpcnN0Q2hpbGQiLCJwYXJlbnRJbkRvY3VtZW50IiwiaW5zZXJ0QmVmb3JlIiwic3JjIiwiX3ppZCIsImlzU3RyaW5nIiwiaGFuZGxlcnMiLCJzcGVjaWFsRXZlbnRzIiwiZm9jdXNpblN1cHBvcnRlZCIsImZvY3VzIiwiYmx1ciIsImhvdmVyIiwibW91c2VlbnRlciIsIm1vdXNlbGVhdmUiLCJjbGljayIsIm1vdXNlZG93biIsIm1vdXNldXAiLCJtb3VzZW1vdmUiLCJ6aWQiLCJmaW5kSGFuZGxlcnMiLCJldmVudCIsIm5zIiwibWF0Y2hlciIsIm1hdGNoZXJGb3IiLCJoYW5kbGVyIiwic2VsIiwicGFydHMiLCJldmVudENhcHR1cmUiLCJjYXB0dXJlU2V0dGluZyIsImRlbCIsInJlYWxFdmVudCIsImV2ZW50cyIsImRlbGVnYXRvciIsImNhcHR1cmUiLCJpZCIsInNldCIsInJlbGF0ZWQiLCJyZWxhdGVkVGFyZ2V0IiwicHJveHkiLCJjb21wYXRpYmxlIiwiaXNJbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWQiLCJfYXJncyIsInByZXZlbnREZWZhdWx0Iiwic3RvcFByb3BhZ2F0aW9uIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInByb3h5Rm4iLCJ1bnNoaWZ0IiwiVHlwZUVycm9yIiwiYmluZCIsIm9uIiwidW5iaW5kIiwib2ZmIiwib25lIiwicmV0dXJuVHJ1ZSIsInJldHVybkZhbHNlIiwiaWdub3JlUHJvcGVydGllcyIsImV2ZW50TWV0aG9kcyIsInN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbiIsImlzRGVmYXVsdFByZXZlbnRlZCIsInByZWRpY2F0ZSIsInNvdXJjZU1ldGhvZCIsImRlZmF1bHRQcmV2ZW50ZWQiLCJyZXR1cm5WYWx1ZSIsImdldFByZXZlbnREZWZhdWx0IiwiY3JlYXRlUHJveHkiLCJvcmlnaW5hbEV2ZW50IiwiZGVsZWdhdGUiLCJ1bmRlbGVnYXRlIiwibGl2ZSIsImRpZSIsImF1dG9SZW1vdmUiLCJldnQiLCJjdXJyZW50VGFyZ2V0IiwibGl2ZUZpcmVkIiwidHJpZ2dlciIsIkV2ZW50IiwiZGlzcGF0Y2hFdmVudCIsInRyaWdnZXJIYW5kbGVyIiwiY3JlYXRlRXZlbnQiLCJidWJibGVzIiwiaW5pdEV2ZW50IiwianNvbnBJRCIsInJzY3JpcHQiLCJzY3JpcHRUeXBlUkUiLCJ4bWxUeXBlUkUiLCJqc29uVHlwZSIsImh0bWxUeXBlIiwiYmxhbmtSRSIsIm9yaWdpbkFuY2hvciIsImhyZWYiLCJsb2NhdGlvbiIsInRyaWdnZXJBbmRSZXR1cm4iLCJldmVudE5hbWUiLCJ0cmlnZ2VyR2xvYmFsIiwic2V0dGluZ3MiLCJnbG9iYWwiLCJhY3RpdmUiLCJhamF4U3RhcnQiLCJhamF4U3RvcCIsImFqYXhCZWZvcmVTZW5kIiwieGhyIiwiYmVmb3JlU2VuZCIsImFqYXhTdWNjZXNzIiwiZGVmZXJyZWQiLCJzdGF0dXMiLCJzdWNjZXNzIiwicmVzb2x2ZVdpdGgiLCJhamF4Q29tcGxldGUiLCJhamF4RXJyb3IiLCJlcnJvciIsInJlamVjdFdpdGgiLCJjb21wbGV0ZSIsImFqYXhKU09OUCIsIm9wdGlvbnMiLCJhamF4IiwiX2NhbGxiYWNrTmFtZSIsImpzb25wQ2FsbGJhY2siLCJjYWxsYmFja05hbWUiLCJzY3JpcHQiLCJvcmlnaW5hbENhbGxiYWNrIiwicmVzcG9uc2VEYXRhIiwiYWJvcnQiLCJlcnJvclR5cGUiLCJhYm9ydFRpbWVvdXQiLCJwcm9taXNlIiwiY2xlYXJUaW1lb3V0IiwidXJsIiwiaGVhZCIsInRpbWVvdXQiLCJzZXRUaW1lb3V0IiwiYWpheFNldHRpbmdzIiwiWE1MSHR0cFJlcXVlc3QiLCJhY2NlcHRzIiwianNvbiIsInhtbCIsImNyb3NzRG9tYWluIiwicHJvY2Vzc0RhdGEiLCJjYWNoZSIsIm1pbWVUb0RhdGFUeXBlIiwibWltZSIsImFwcGVuZFF1ZXJ5IiwicXVlcnkiLCJzZXJpYWxpemVEYXRhIiwicGFyYW0iLCJ0cmFkaXRpb25hbCIsIkRlZmVycmVkIiwidXJsQW5jaG9yIiwicHJvdG9jb2wiLCJob3N0IiwiZGF0YVR5cGUiLCJoYXNQbGFjZWhvbGRlciIsIkRhdGUiLCJub3ciLCJqc29ucCIsImhlYWRlcnMiLCJzZXRIZWFkZXIiLCJuYXRpdmVTZXRIZWFkZXIiLCJzZXRSZXF1ZXN0SGVhZGVyIiwibWltZVR5cGUiLCJvdmVycmlkZU1pbWVUeXBlIiwiY29udGVudFR5cGUiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJnZXRSZXNwb25zZUhlYWRlciIsInJlc3BvbnNlVGV4dCIsImV2YWwiLCJyZXNwb25zZVhNTCIsInN0YXR1c1RleHQiLCJ4aHJGaWVsZHMiLCJhc3luYyIsIm9wZW4iLCJ1c2VybmFtZSIsInBhc3N3b3JkIiwic2VuZCIsInBhcnNlQXJndW1lbnRzIiwicG9zdCIsImdldEpTT04iLCJsb2FkIiwicmVzcG9uc2UiLCJlc2NhcGUiLCJlbmNvZGVVUklDb21wb25lbnQiLCJzZXJpYWxpemUiLCJwYXJhbXMiLCJzY29wZSIsImhhc2giLCJzZXJpYWxpemVBcnJheSIsImZpZWxkIiwiZGlzYWJsZWQiLCJjaGVja2VkIiwiZWxtIiwic3VibWl0IiwiX19aIiwibmF0aXZlR2V0Q29tcHV0ZWRTdHlsZSJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBOztBQUVBLElBQUlBLFFBQVMsWUFBVztBQUN0QixNQUFJQyxTQUFKO0FBQUEsTUFBZUMsR0FBZjtBQUFBLE1BQW9CQyxDQUFwQjtBQUFBLE1BQXVCQyxTQUF2QjtBQUFBLE1BQWtDQyxhQUFhLEVBQS9DO0FB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QU9EO0FBQ0YsQ0FqQ0EsRUFpQ0VsSixLQWpDRiIsImZpbGUiOiJmYWtlXzg4OGU1NTZlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogWmVwdG8gdjEuMS42IC0gemVwdG8gZXZlbnQgYWpheCBmb3JtIGllIC0gemVwdG9qcy5jb20vbGljZW5zZSAqL1xuXG52YXIgWmVwdG8gPSAoZnVuY3Rpb24oKSB7XG4gIHZhciB1bmRlZmluZWQsIGtleSwgJCwgY2xhc3NMaXN0LCBlbXB0eUFycmF5ID0gW10sIHNsaWNlID0gZW1wdHlBcnJheS5zbGljZSwgZmlsdGVyID0gZW1wdHlBcnJheS5maWx0ZXIsXG4gICAgZG9jdW1lbnQgPSB3aW5kb3cuZG9jdW1lbnQsXG4gICAgZWxlbWVudERpc3BsYXkgPSB7fSwgY2xhc3NDYWNoZSA9IHt9LFxuICAgIGNzc051bWJlciA9IHsgJ2NvbHVtbi1jb3VudCc6IDEsICdjb2x1bW5zJzogMSwgJ2ZvbnQtd2VpZ2h0JzogMSwgJ2xpbmUtaGVpZ2h0JzogMSwnb3BhY2l0eSc6IDEsICd6LWluZGV4JzogMSwgJ3pvb20nOiAxIH0sXG4gICAgZnJhZ21lbnRSRSA9IC9eXFxzKjwoXFx3K3whKVtePl0qPi8sXG4gICAgc2luZ2xlVGFnUkUgPSAvXjwoXFx3KylcXHMqXFwvPz4oPzo8XFwvXFwxPnwpJC8sXG4gICAgdGFnRXhwYW5kZXJSRSA9IC88KD8hYXJlYXxicnxjb2x8ZW1iZWR8aHJ8aW1nfGlucHV0fGxpbmt8bWV0YXxwYXJhbSkoKFtcXHc6XSspW14+XSopXFwvPi9pZyxcbiAgICByb290Tm9kZVJFID0gL14oPzpib2R5fGh0bWwpJC9pLFxuICAgIGNhcGl0YWxSRSA9IC8oW0EtWl0pL2csXG5cbiAgICAvLyBzcGVjaWFsIGF0dHJpYnV0ZXMgdGhhdCBzaG91bGQgYmUgZ2V0L3NldCB2aWEgbWV0aG9kIGNhbGxzXG4gICAgbWV0aG9kQXR0cmlidXRlcyA9IFsndmFsJywgJ2NzcycsICdodG1sJywgJ3RleHQnLCAnZGF0YScsICd3aWR0aCcsICdoZWlnaHQnLCAnb2Zmc2V0J10sXG5cbiAgICBhZGphY2VuY3lPcGVyYXRvcnMgPSBbICdhZnRlcicsICdwcmVwZW5kJywgJ2JlZm9yZScsICdhcHBlbmQnIF0sXG4gICAgdGFibGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0YWJsZScpLFxuICAgIHRhYmxlUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKSxcbiAgICBjb250YWluZXJzID0ge1xuICAgICAgJ3RyJzogZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGJvZHknKSxcbiAgICAgICd0Ym9keSc6IHRhYmxlLCAndGhlYWQnOiB0YWJsZSwgJ3Rmb290JzogdGFibGUsXG4gICAgICAndGQnOiB0YWJsZVJvdywgJ3RoJzogdGFibGVSb3csXG4gICAgICAnKic6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgfSxcbiAgICByZWFkeVJFID0gL2NvbXBsZXRlfGxvYWRlZHxpbnRlcmFjdGl2ZS8sXG4gICAgc2ltcGxlU2VsZWN0b3JSRSA9IC9eW1xcdy1dKiQvLFxuICAgIGNsYXNzMnR5cGUgPSB7fSxcbiAgICB0b1N0cmluZyA9IGNsYXNzMnR5cGUudG9TdHJpbmcsXG4gICAgemVwdG8gPSB7fSxcbiAgICBjYW1lbGl6ZSwgdW5pcSxcbiAgICB0ZW1wUGFyZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXG4gICAgcHJvcE1hcCA9IHtcbiAgICAgICd0YWJpbmRleCc6ICd0YWJJbmRleCcsXG4gICAgICAncmVhZG9ubHknOiAncmVhZE9ubHknLFxuICAgICAgJ2Zvcic6ICdodG1sRm9yJyxcbiAgICAgICdjbGFzcyc6ICdjbGFzc05hbWUnLFxuICAgICAgJ21heGxlbmd0aCc6ICdtYXhMZW5ndGgnLFxuICAgICAgJ2NlbGxzcGFjaW5nJzogJ2NlbGxTcGFjaW5nJyxcbiAgICAgICdjZWxscGFkZGluZyc6ICdjZWxsUGFkZGluZycsXG4gICAgICAncm93c3Bhbic6ICdyb3dTcGFuJyxcbiAgICAgICdjb2xzcGFuJzogJ2NvbFNwYW4nLFxuICAgICAgJ3VzZW1hcCc6ICd1c2VNYXAnLFxuICAgICAgJ2ZyYW1lYm9yZGVyJzogJ2ZyYW1lQm9yZGVyJyxcbiAgICAgICdjb250ZW50ZWRpdGFibGUnOiAnY29udGVudEVkaXRhYmxlJ1xuICAgIH0sXG4gICAgaXNBcnJheSA9IEFycmF5LmlzQXJyYXkgfHxcbiAgICAgIGZ1bmN0aW9uKG9iamVjdCl7IHJldHVybiBvYmplY3QgaW5zdGFuY2VvZiBBcnJheSB9XG5cbiAgemVwdG8ubWF0Y2hlcyA9IGZ1bmN0aW9uKGVsZW1lbnQsIHNlbGVjdG9yKSB7XG4gICAgaWYgKCFzZWxlY3RvciB8fCAhZWxlbWVudCB8fCBlbGVtZW50Lm5vZGVUeXBlICE9PSAxKSByZXR1cm4gZmFsc2VcbiAgICB2YXIgbWF0Y2hlc1NlbGVjdG9yID0gZWxlbWVudC53ZWJraXRNYXRjaGVzU2VsZWN0b3IgfHwgZWxlbWVudC5tb3pNYXRjaGVzU2VsZWN0b3IgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5vTWF0Y2hlc1NlbGVjdG9yIHx8IGVsZW1lbnQubWF0Y2hlc1NlbGVjdG9yXG4gICAgaWYgKG1hdGNoZXNTZWxlY3RvcikgcmV0dXJuIG1hdGNoZXNTZWxlY3Rvci5jYWxsKGVsZW1lbnQsIHNlbGVjdG9yKVxuICAgIC8vIGZhbGwgYmFjayB0byBwZXJmb3JtaW5nIGEgc2VsZWN0b3I6XG4gICAgdmFyIG1hdGNoLCBwYXJlbnQgPSBlbGVtZW50LnBhcmVudE5vZGUsIHRlbXAgPSAhcGFyZW50XG4gICAgaWYgKHRlbXApIChwYXJlbnQgPSB0ZW1wUGFyZW50KS5hcHBlbmRDaGlsZChlbGVtZW50KVxuICAgIG1hdGNoID0gfnplcHRvLnFzYShwYXJlbnQsIHNlbGVjdG9yKS5pbmRleE9mKGVsZW1lbnQpXG4gICAgdGVtcCAmJiB0ZW1wUGFyZW50LnJlbW92ZUNoaWxkKGVsZW1lbnQpXG4gICAgcmV0dXJuIG1hdGNoXG4gIH1cblxuICBmdW5jdGlvbiB0eXBlKG9iaikge1xuICAgIHJldHVybiBvYmogPT0gbnVsbCA/IFN0cmluZyhvYmopIDpcbiAgICAgIGNsYXNzMnR5cGVbdG9TdHJpbmcuY2FsbChvYmopXSB8fCBcIm9iamVjdFwiXG4gIH1cblxuICBmdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB0eXBlKHZhbHVlKSA9PSBcImZ1bmN0aW9uXCIgfVxuICBmdW5jdGlvbiBpc1dpbmRvdyhvYmopICAgICB7IHJldHVybiBvYmogIT0gbnVsbCAmJiBvYmogPT0gb2JqLndpbmRvdyB9XG4gIGZ1bmN0aW9uIGlzRG9jdW1lbnQob2JqKSAgIHsgcmV0dXJuIG9iaiAhPSBudWxsICYmIG9iai5ub2RlVHlwZSA9PSBvYmouRE9DVU1FTlRfTk9ERSB9XG4gIGZ1bmN0aW9uIGlzT2JqZWN0KG9iaikgICAgIHsgcmV0dXJuIHR5cGUob2JqKSA9PSBcIm9iamVjdFwiIH1cbiAgZnVuY3Rpb24gaXNQbGFpbk9iamVjdChvYmopIHtcbiAgICByZXR1cm4gaXNPYmplY3Qob2JqKSAmJiAhaXNXaW5kb3cob2JqKSAmJiBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqKSA9PSBPYmplY3QucHJvdG90eXBlXG4gIH1cbiAgZnVuY3Rpb24gbGlrZUFycmF5KG9iaikgeyByZXR1cm4gdHlwZW9mIG9iai5sZW5ndGggPT0gJ251bWJlcicgfVxuXG4gIGZ1bmN0aW9uIGNvbXBhY3QoYXJyYXkpIHsgcmV0dXJuIGZpbHRlci5jYWxsKGFycmF5LCBmdW5jdGlvbihpdGVtKXsgcmV0dXJuIGl0ZW0gIT0gbnVsbCB9KSB9XG4gIGZ1bmN0aW9uIGZsYXR0ZW4oYXJyYXkpIHsgcmV0dXJuIGFycmF5Lmxlbmd0aCA+IDAgPyAkLmZuLmNvbmNhdC5hcHBseShbXSwgYXJyYXkpIDogYXJyYXkgfVxuICBjYW1lbGl6ZSA9IGZ1bmN0aW9uKHN0cil7IHJldHVybiBzdHIucmVwbGFjZSgvLSsoLik/L2csIGZ1bmN0aW9uKG1hdGNoLCBjaHIpeyByZXR1cm4gY2hyID8gY2hyLnRvVXBwZXJDYXNlKCkgOiAnJyB9KSB9XG4gIGZ1bmN0aW9uIGRhc2hlcml6ZShzdHIpIHtcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoLzo6L2csICcvJylcbiAgICAgICAgICAgLnJlcGxhY2UoLyhbQS1aXSspKFtBLVpdW2Etel0pL2csICckMV8kMicpXG4gICAgICAgICAgIC5yZXBsYWNlKC8oW2EtelxcZF0pKFtBLVpdKS9nLCAnJDFfJDInKVxuICAgICAgICAgICAucmVwbGFjZSgvXy9nLCAnLScpXG4gICAgICAgICAgIC50b0xvd2VyQ2FzZSgpXG4gIH1cbiAgdW5pcSA9IGZ1bmN0aW9uKGFycmF5KXsgcmV0dXJuIGZpbHRlci5jYWxsKGFycmF5LCBmdW5jdGlvbihpdGVtLCBpZHgpeyByZXR1cm4gYXJyYXkuaW5kZXhPZihpdGVtKSA9PSBpZHggfSkgfVxuXG4gIGZ1bmN0aW9uIGNsYXNzUkUobmFtZSkge1xuICAgIHJldHVybiBuYW1lIGluIGNsYXNzQ2FjaGUgP1xuICAgICAgY2xhc3NDYWNoZVtuYW1lXSA6IChjbGFzc0NhY2hlW25hbWVdID0gbmV3IFJlZ0V4cCgnKF58XFxcXHMpJyArIG5hbWUgKyAnKFxcXFxzfCQpJykpXG4gIH1cblxuICBmdW5jdGlvbiBtYXliZUFkZFB4KG5hbWUsIHZhbHVlKSB7XG4gICAgcmV0dXJuICh0eXBlb2YgdmFsdWUgPT0gXCJudW1iZXJcIiAmJiAhY3NzTnVtYmVyW2Rhc2hlcml6ZShuYW1lKV0pID8gdmFsdWUgKyBcInB4XCIgOiB2YWx1ZVxuICB9XG5cbiAgZnVuY3Rpb24gZGVmYXVsdERpc3BsYXkobm9kZU5hbWUpIHtcbiAgICB2YXIgZWxlbWVudCwgZGlzcGxheVxuICAgIGlmICghZWxlbWVudERpc3BsYXlbbm9kZU5hbWVdKSB7XG4gICAgICBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChub2RlTmFtZSlcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZWxlbWVudClcbiAgICAgIGRpc3BsYXkgPSBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQsICcnKS5nZXRQcm9wZXJ0eVZhbHVlKFwiZGlzcGxheVwiKVxuICAgICAgZWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsZW1lbnQpXG4gICAgICBkaXNwbGF5ID09IFwibm9uZVwiICYmIChkaXNwbGF5ID0gXCJibG9ja1wiKVxuICAgICAgZWxlbWVudERpc3BsYXlbbm9kZU5hbWVdID0gZGlzcGxheVxuICAgIH1cbiAgICByZXR1cm4gZWxlbWVudERpc3BsYXlbbm9kZU5hbWVdXG4gIH1cblxuICBmdW5jdGlvbiBjaGlsZHJlbihlbGVtZW50KSB7XG4gICAgcmV0dXJuICdjaGlsZHJlbicgaW4gZWxlbWVudCA/XG4gICAgICBzbGljZS5jYWxsKGVsZW1lbnQuY2hpbGRyZW4pIDpcbiAgICAgICQubWFwKGVsZW1lbnQuY2hpbGROb2RlcywgZnVuY3Rpb24obm9kZSl7IGlmIChub2RlLm5vZGVUeXBlID09IDEpIHJldHVybiBub2RlIH0pXG4gIH1cblxuICAvLyBgJC56ZXB0by5mcmFnbWVudGAgdGFrZXMgYSBodG1sIHN0cmluZyBhbmQgYW4gb3B0aW9uYWwgdGFnIG5hbWVcbiAgLy8gdG8gZ2VuZXJhdGUgRE9NIG5vZGVzIG5vZGVzIGZyb20gdGhlIGdpdmVuIGh0bWwgc3RyaW5nLlxuICAvLyBUaGUgZ2VuZXJhdGVkIERPTSBub2RlcyBhcmUgcmV0dXJuZWQgYXMgYW4gYXJyYXkuXG4gIC8vIFRoaXMgZnVuY3Rpb24gY2FuIGJlIG92ZXJyaWRlbiBpbiBwbHVnaW5zIGZvciBleGFtcGxlIHRvIG1ha2VcbiAgLy8gaXQgY29tcGF0aWJsZSB3aXRoIGJyb3dzZXJzIHRoYXQgZG9uJ3Qgc3VwcG9ydCB0aGUgRE9NIGZ1bGx5LlxuICB6ZXB0by5mcmFnbWVudCA9IGZ1bmN0aW9uKGh0bWwsIG5hbWUsIHByb3BlcnRpZXMpIHtcbiAgICB2YXIgZG9tLCBub2RlcywgY29udGFpbmVyXG5cbiAgICAvLyBBIHNwZWNpYWwgY2FzZSBvcHRpbWl6YXRpb24gZm9yIGEgc2luZ2xlIHRhZ1xuICAgIGlmIChzaW5nbGVUYWdSRS50ZXN0KGh0bWwpKSBkb20gPSAkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoUmVnRXhwLiQxKSlcblxuICAgIGlmICghZG9tKSB7XG4gICAgICBpZiAoaHRtbC5yZXBsYWNlKSBodG1sID0gaHRtbC5yZXBsYWNlKHRhZ0V4cGFuZGVyUkUsIFwiPCQxPjwvJDI+XCIpXG4gICAgICBpZiAobmFtZSA9PT0gdW5kZWZpbmVkKSBuYW1lID0gZnJhZ21lbnRSRS50ZXN0KGh0bWwpICYmIFJlZ0V4cC4kMVxuICAgICAgaWYgKCEobmFtZSBpbiBjb250YWluZXJzKSkgbmFtZSA9ICcqJ1xuXG4gICAgICBjb250YWluZXIgPSBjb250YWluZXJzW25hbWVdXG4gICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gJycgKyBodG1sXG4gICAgICBkb20gPSAkLmVhY2goc2xpY2UuY2FsbChjb250YWluZXIuY2hpbGROb2RlcyksIGZ1bmN0aW9uKCl7XG4gICAgICAgIGNvbnRhaW5lci5yZW1vdmVDaGlsZCh0aGlzKVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBpZiAoaXNQbGFpbk9iamVjdChwcm9wZXJ0aWVzKSkge1xuICAgICAgbm9kZXMgPSAkKGRvbSlcbiAgICAgICQuZWFjaChwcm9wZXJ0aWVzLCBmdW5jdGlvbihrZXksIHZhbHVlKSB7XG4gICAgICAgIGlmIChtZXRob2RBdHRyaWJ1dGVzLmluZGV4T2Yoa2V5KSA+IC0xKSBub2Rlc1trZXldKHZhbHVlKVxuICAgICAgICBlbHNlIG5vZGVzLmF0dHIoa2V5LCB2YWx1ZSlcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgcmV0dXJuIGRvbVxuICB9XG5cbiAgLy8gYCQuemVwdG8uWmAgc3dhcHMgb3V0IHRoZSBwcm90b3R5cGUgb2YgdGhlIGdpdmVuIGBkb21gIGFycmF5XG4gIC8vIG9mIG5vZGVzIHdpdGggYCQuZm5gIGFuZCB0aHVzIHN1cHBseWluZyBhbGwgdGhlIFplcHRvIGZ1bmN0aW9uc1xuICAvLyB0byB0aGUgYXJyYXkuIE5vdGUgdGhhdCBgX19wcm90b19fYCBpcyBub3Qgc3VwcG9ydGVkIG9uIEludGVybmV0XG4gIC8vIEV4cGxvcmVyLiBUaGlzIG1ldGhvZCBjYW4gYmUgb3ZlcnJpZGVuIGluIHBsdWdpbnMuXG4gIHplcHRvLlogPSBmdW5jdGlvbihkb20sIHNlbGVjdG9yKSB7XG4gICAgZG9tID0gZG9tIHx8IFtdXG4gICAgZG9tLl9fcHJvdG9fXyA9ICQuZm5cbiAgICBkb20uc2VsZWN0b3IgPSBzZWxlY3RvciB8fCAnJ1xuICAgIHJldHVybiBkb21cbiAgfVxuXG4gIC8vIGAkLnplcHRvLmlzWmAgc2hvdWxkIHJldHVybiBgdHJ1ZWAgaWYgdGhlIGdpdmVuIG9iamVjdCBpcyBhIFplcHRvXG4gIC8vIGNvbGxlY3Rpb24uIFRoaXMgbWV0aG9kIGNhbiBiZSBvdmVycmlkZW4gaW4gcGx1Z2lucy5cbiAgemVwdG8uaXNaID0gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgcmV0dXJuIG9iamVjdCBpbnN0YW5jZW9mIHplcHRvLlpcbiAgfVxuXG4gIC8vIGAkLnplcHRvLmluaXRgIGlzIFplcHRvJ3MgY291bnRlcnBhcnQgdG8galF1ZXJ5J3MgYCQuZm4uaW5pdGAgYW5kXG4gIC8vIHRha2VzIGEgQ1NTIHNlbGVjdG9yIGFuZCBhbiBvcHRpb25hbCBjb250ZXh0IChhbmQgaGFuZGxlcyB2YXJpb3VzXG4gIC8vIHNwZWNpYWwgY2FzZXMpLlxuICAvLyBUaGlzIG1ldGhvZCBjYW4gYmUgb3ZlcnJpZGVuIGluIHBsdWdpbnMuXG4gIHplcHRvLmluaXQgPSBmdW5jdGlvbihzZWxlY3RvciwgY29udGV4dCkge1xuICAgIHZhciBkb21cbiAgICAvLyBJZiBub3RoaW5nIGdpdmVuLCByZXR1cm4gYW4gZW1wdHkgWmVwdG8gY29sbGVjdGlvblxuICAgIGlmICghc2VsZWN0b3IpIHJldHVybiB6ZXB0by5aKClcbiAgICAvLyBPcHRpbWl6ZSBmb3Igc3RyaW5nIHNlbGVjdG9yc1xuICAgIGVsc2UgaWYgKHR5cGVvZiBzZWxlY3RvciA9PSAnc3RyaW5nJykge1xuICAgICAgc2VsZWN0b3IgPSBzZWxlY3Rvci50cmltKClcbiAgICAgIC8vIElmIGl0J3MgYSBodG1sIGZyYWdtZW50LCBjcmVhdGUgbm9kZXMgZnJvbSBpdFxuICAgICAgLy8gTm90ZTogSW4gYm90aCBDaHJvbWUgMjEgYW5kIEZpcmVmb3ggMTUsIERPTSBlcnJvciAxMlxuICAgICAgLy8gaXMgdGhyb3duIGlmIHRoZSBmcmFnbWVudCBkb2Vzbid0IGJlZ2luIHdpdGggPFxuICAgICAgaWYgKHNlbGVjdG9yWzBdID09ICc8JyAmJiBmcmFnbWVudFJFLnRlc3Qoc2VsZWN0b3IpKVxuICAgICAgICBkb20gPSB6ZXB0by5mcmFnbWVudChzZWxlY3RvciwgUmVnRXhwLiQxLCBjb250ZXh0KSwgc2VsZWN0b3IgPSBudWxsXG4gICAgICAvLyBJZiB0aGVyZSdzIGEgY29udGV4dCwgY3JlYXRlIGEgY29sbGVjdGlvbiBvbiB0aGF0IGNvbnRleHQgZmlyc3QsIGFuZCBzZWxlY3RcbiAgICAgIC8vIG5vZGVzIGZyb20gdGhlcmVcbiAgICAgIGVsc2UgaWYgKGNvbnRleHQgIT09IHVuZGVmaW5lZCkgcmV0dXJuICQoY29udGV4dCkuZmluZChzZWxlY3RvcilcbiAgICAgIC8vIElmIGl0J3MgYSBDU1Mgc2VsZWN0b3IsIHVzZSBpdCB0byBzZWxlY3Qgbm9kZXMuXG4gICAgICBlbHNlIGRvbSA9IHplcHRvLnFzYShkb2N1bWVudCwgc2VsZWN0b3IpXG4gICAgfVxuICAgIC8vIElmIGEgZnVuY3Rpb24gaXMgZ2l2ZW4sIGNhbGwgaXQgd2hlbiB0aGUgRE9NIGlzIHJlYWR5XG4gICAgZWxzZSBpZiAoaXNGdW5jdGlvbihzZWxlY3RvcikpIHJldHVybiAkKGRvY3VtZW50KS5yZWFkeShzZWxlY3RvcilcbiAgICAvLyBJZiBhIFplcHRvIGNvbGxlY3Rpb24gaXMgZ2l2ZW4sIGp1c3QgcmV0dXJuIGl0XG4gICAgZWxzZSBpZiAoemVwdG8uaXNaKHNlbGVjdG9yKSkgcmV0dXJuIHNlbGVjdG9yXG4gICAgZWxzZSB7XG4gICAgICAvLyBub3JtYWxpemUgYXJyYXkgaWYgYW4gYXJyYXkgb2Ygbm9kZXMgaXMgZ2l2ZW5cbiAgICAgIGlmIChpc0FycmF5KHNlbGVjdG9yKSkgZG9tID0gY29tcGFjdChzZWxlY3RvcilcbiAgICAgIC8vIFdyYXAgRE9NIG5vZGVzLlxuICAgICAgZWxzZSBpZiAoaXNPYmplY3Qoc2VsZWN0b3IpKVxuICAgICAgICBkb20gPSBbc2VsZWN0b3JdLCBzZWxlY3RvciA9IG51bGxcbiAgICAgIC8vIElmIGl0J3MgYSBodG1sIGZyYWdtZW50LCBjcmVhdGUgbm9kZXMgZnJvbSBpdFxuICAgICAgZWxzZSBpZiAoZnJhZ21lbnRSRS50ZXN0KHNlbGVjdG9yKSlcbiAgICAgICAgZG9tID0gemVwdG8uZnJhZ21lbnQoc2VsZWN0b3IudHJpbSgpLCBSZWdFeHAuJDEsIGNvbnRleHQpLCBzZWxlY3RvciA9IG51bGxcbiAgICAgIC8vIElmIHRoZXJlJ3MgYSBjb250ZXh0LCBjcmVhdGUgYSBjb2xsZWN0aW9uIG9uIHRoYXQgY29udGV4dCBmaXJzdCwgYW5kIHNlbGVjdFxuICAgICAgLy8gbm9kZXMgZnJvbSB0aGVyZVxuICAgICAgZWxzZSBpZiAoY29udGV4dCAhPT0gdW5kZWZpbmVkKSByZXR1cm4gJChjb250ZXh0KS5maW5kKHNlbGVjdG9yKVxuICAgICAgLy8gQW5kIGxhc3QgYnV0IG5vIGxlYXN0LCBpZiBpdCdzIGEgQ1NTIHNlbGVjdG9yLCB1c2UgaXQgdG8gc2VsZWN0IG5vZGVzLlxuICAgICAgZWxzZSBkb20gPSB6ZXB0by5xc2EoZG9jdW1lbnQsIHNlbGVjdG9yKVxuICAgIH1cbiAgICAvLyBjcmVhdGUgYSBuZXcgWmVwdG8gY29sbGVjdGlvbiBmcm9tIHRoZSBub2RlcyBmb3VuZFxuICAgIHJldHVybiB6ZXB0by5aKGRvbSwgc2VsZWN0b3IpXG4gIH1cblxuICAvLyBgJGAgd2lsbCBiZSB0aGUgYmFzZSBgWmVwdG9gIG9iamVjdC4gV2hlbiBjYWxsaW5nIHRoaXNcbiAgLy8gZnVuY3Rpb24ganVzdCBjYWxsIGAkLnplcHRvLmluaXQsIHdoaWNoIG1ha2VzIHRoZSBpbXBsZW1lbnRhdGlvblxuICAvLyBkZXRhaWxzIG9mIHNlbGVjdGluZyBub2RlcyBhbmQgY3JlYXRpbmcgWmVwdG8gY29sbGVjdGlvbnNcbiAgLy8gcGF0Y2hhYmxlIGluIHBsdWdpbnMuXG4gICQgPSBmdW5jdGlvbihzZWxlY3RvciwgY29udGV4dCl7XG4gICAgcmV0dXJuIHplcHRvLmluaXQoc2VsZWN0b3IsIGNvbnRleHQpXG4gIH1cblxuICBmdW5jdGlvbiBleHRlbmQodGFyZ2V0LCBzb3VyY2UsIGRlZXApIHtcbiAgICBmb3IgKGtleSBpbiBzb3VyY2UpXG4gICAgICBpZiAoZGVlcCAmJiAoaXNQbGFpbk9iamVjdChzb3VyY2Vba2V5XSkgfHwgaXNBcnJheShzb3VyY2Vba2V5XSkpKSB7XG4gICAgICAgIGlmIChpc1BsYWluT2JqZWN0KHNvdXJjZVtrZXldKSAmJiAhaXNQbGFpbk9iamVjdCh0YXJnZXRba2V5XSkpXG4gICAgICAgICAgdGFyZ2V0W2tleV0gPSB7fVxuICAgICAgICBpZiAoaXNBcnJheShzb3VyY2Vba2V5XSkgJiYgIWlzQXJyYXkodGFyZ2V0W2tleV0pKVxuICAgICAgICAgIHRhcmdldFtrZXldID0gW11cbiAgICAgICAgZXh0ZW5kKHRhcmdldFtrZXldLCBzb3VyY2Vba2V5XSwgZGVlcClcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHNvdXJjZVtrZXldICE9PSB1bmRlZmluZWQpIHRhcmdldFtrZXldID0gc291cmNlW2tleV1cbiAgfVxuXG4gIC8vIENvcHkgYWxsIGJ1dCB1bmRlZmluZWQgcHJvcGVydGllcyBmcm9tIG9uZSBvciBtb3JlXG4gIC8vIG9iamVjdHMgdG8gdGhlIGB0YXJnZXRgIG9iamVjdC5cbiAgJC5leHRlbmQgPSBmdW5jdGlvbih0YXJnZXQpe1xuICAgIHZhciBkZWVwLCBhcmdzID0gc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpXG4gICAgaWYgKHR5cGVvZiB0YXJnZXQgPT0gJ2Jvb2xlYW4nKSB7XG4gICAgICBkZWVwID0gdGFyZ2V0XG4gICAgICB0YXJnZXQgPSBhcmdzLnNoaWZ0KClcbiAgICB9XG4gICAgYXJncy5mb3JFYWNoKGZ1bmN0aW9uKGFyZyl7IGV4dGVuZCh0YXJnZXQsIGFyZywgZGVlcCkgfSlcbiAgICByZXR1cm4gdGFyZ2V0XG4gIH1cblxuICAvLyBgJC56ZXB0by5xc2FgIGlzIFplcHRvJ3MgQ1NTIHNlbGVjdG9yIGltcGxlbWVudGF0aW9uIHdoaWNoXG4gIC8vIHVzZXMgYGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGxgIGFuZCBvcHRpbWl6ZXMgZm9yIHNvbWUgc3BlY2lhbCBjYXNlcywgbGlrZSBgI2lkYC5cbiAgLy8gVGhpcyBtZXRob2QgY2FuIGJlIG92ZXJyaWRlbiBpbiBwbHVnaW5zLlxuICB6ZXB0by5xc2EgPSBmdW5jdGlvbihlbGVtZW50LCBzZWxlY3Rvcil7XG4gICAgdmFyIGZvdW5kLFxuICAgICAgICBtYXliZUlEID0gc2VsZWN0b3JbMF0gPT0gJyMnLFxuICAgICAgICBtYXliZUNsYXNzID0gIW1heWJlSUQgJiYgc2VsZWN0b3JbMF0gPT0gJy4nLFxuICAgICAgICBuYW1lT25seSA9IG1heWJlSUQgfHwgbWF5YmVDbGFzcyA/IHNlbGVjdG9yLnNsaWNlKDEpIDogc2VsZWN0b3IsIC8vIEVuc3VyZSB0aGF0IGEgMSBjaGFyIHRhZyBuYW1lIHN0aWxsIGdldHMgY2hlY2tlZFxuICAgICAgICBpc1NpbXBsZSA9IHNpbXBsZVNlbGVjdG9yUkUudGVzdChuYW1lT25seSlcbiAgICByZXR1cm4gKGlzRG9jdW1lbnQoZWxlbWVudCkgJiYgaXNTaW1wbGUgJiYgbWF5YmVJRCkgP1xuICAgICAgKCAoZm91bmQgPSBlbGVtZW50LmdldEVsZW1lbnRCeUlkKG5hbWVPbmx5KSkgPyBbZm91bmRdIDogW10gKSA6XG4gICAgICAoZWxlbWVudC5ub2RlVHlwZSAhPT0gMSAmJiBlbGVtZW50Lm5vZGVUeXBlICE9PSA5KSA/IFtdIDpcbiAgICAgIHNsaWNlLmNhbGwoXG4gICAgICAgIGlzU2ltcGxlICYmICFtYXliZUlEID9cbiAgICAgICAgICBtYXliZUNsYXNzID8gZWxlbWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKG5hbWVPbmx5KSA6IC8vIElmIGl0J3Mgc2ltcGxlLCBpdCBjb3VsZCBiZSBhIGNsYXNzXG4gICAgICAgICAgZWxlbWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShzZWxlY3RvcikgOiAvLyBPciBhIHRhZ1xuICAgICAgICAgIGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikgLy8gT3IgaXQncyBub3Qgc2ltcGxlLCBhbmQgd2UgbmVlZCB0byBxdWVyeSBhbGxcbiAgICAgIClcbiAgfVxuXG4gIGZ1bmN0aW9uIGZpbHRlcmVkKG5vZGVzLCBzZWxlY3Rvcikge1xuICAgIHJldHVybiBzZWxlY3RvciA9PSBudWxsID8gJChub2RlcykgOiAkKG5vZGVzKS5maWx0ZXIoc2VsZWN0b3IpXG4gIH1cblxuICAkLmNvbnRhaW5zID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNvbnRhaW5zID9cbiAgICBmdW5jdGlvbihwYXJlbnQsIG5vZGUpIHtcbiAgICAgIHJldHVybiBwYXJlbnQgIT09IG5vZGUgJiYgcGFyZW50LmNvbnRhaW5zKG5vZGUpXG4gICAgfSA6XG4gICAgZnVuY3Rpb24ocGFyZW50LCBub2RlKSB7XG4gICAgICB3aGlsZSAobm9kZSAmJiAobm9kZSA9IG5vZGUucGFyZW50Tm9kZSkpXG4gICAgICAgIGlmIChub2RlID09PSBwYXJlbnQpIHJldHVybiB0cnVlXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgZnVuY3Rpb24gZnVuY0FyZyhjb250ZXh0LCBhcmcsIGlkeCwgcGF5bG9hZCkge1xuICAgIHJldHVybiBpc0Z1bmN0aW9uKGFyZykgPyBhcmcuY2FsbChjb250ZXh0LCBpZHgsIHBheWxvYWQpIDogYXJnXG4gIH1cblxuICBmdW5jdGlvbiBzZXRBdHRyaWJ1dGUobm9kZSwgbmFtZSwgdmFsdWUpIHtcbiAgICB2YWx1ZSA9PSBudWxsID8gbm9kZS5yZW1vdmVBdHRyaWJ1dGUobmFtZSkgOiBub2RlLnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSlcbiAgfVxuXG4gIC8vIGFjY2VzcyBjbGFzc05hbWUgcHJvcGVydHkgd2hpbGUgcmVzcGVjdGluZyBTVkdBbmltYXRlZFN0cmluZ1xuICBmdW5jdGlvbiBjbGFzc05hbWUobm9kZSwgdmFsdWUpe1xuICAgIHZhciBrbGFzcyA9IG5vZGUuY2xhc3NOYW1lIHx8ICcnLFxuICAgICAgICBzdmcgICA9IGtsYXNzICYmIGtsYXNzLmJhc2VWYWwgIT09IHVuZGVmaW5lZFxuXG4gICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHJldHVybiBzdmcgPyBrbGFzcy5iYXNlVmFsIDoga2xhc3NcbiAgICBzdmcgPyAoa2xhc3MuYmFzZVZhbCA9IHZhbHVlKSA6IChub2RlLmNsYXNzTmFtZSA9IHZhbHVlKVxuICB9XG5cbiAgLy8gXCJ0cnVlXCIgID0+IHRydWVcbiAgLy8gXCJmYWxzZVwiID0+IGZhbHNlXG4gIC8vIFwibnVsbFwiICA9PiBudWxsXG4gIC8vIFwiNDJcIiAgICA9PiA0MlxuICAvLyBcIjQyLjVcIiAgPT4gNDIuNVxuICAvLyBcIjA4XCIgICAgPT4gXCIwOFwiXG4gIC8vIEpTT04gICAgPT4gcGFyc2UgaWYgdmFsaWRcbiAgLy8gU3RyaW5nICA9PiBzZWxmXG4gIGZ1bmN0aW9uIGRlc2VyaWFsaXplVmFsdWUodmFsdWUpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHZhbHVlID9cbiAgICAgICAgdmFsdWUgPT0gXCJ0cnVlXCIgfHxcbiAgICAgICAgKCB2YWx1ZSA9PSBcImZhbHNlXCIgPyBmYWxzZSA6XG4gICAgICAgICAgdmFsdWUgPT0gXCJudWxsXCIgPyBudWxsIDpcbiAgICAgICAgICArdmFsdWUgKyBcIlwiID09IHZhbHVlID8gK3ZhbHVlIDpcbiAgICAgICAgICAvXltcXFtcXHtdLy50ZXN0KHZhbHVlKSA/ICQucGFyc2VKU09OKHZhbHVlKSA6XG4gICAgICAgICAgdmFsdWUgKVxuICAgICAgICA6IHZhbHVlXG4gICAgfSBjYXRjaChlKSB7XG4gICAgICByZXR1cm4gdmFsdWVcbiAgICB9XG4gIH1cblxuICAkLnR5cGUgPSB0eXBlXG4gICQuaXNGdW5jdGlvbiA9IGlzRnVuY3Rpb25cbiAgJC5pc1dpbmRvdyA9IGlzV2luZG93XG4gICQuaXNBcnJheSA9IGlzQXJyYXlcbiAgJC5pc1BsYWluT2JqZWN0ID0gaXNQbGFpbk9iamVjdFxuXG4gICQuaXNFbXB0eU9iamVjdCA9IGZ1bmN0aW9uKG9iaikge1xuICAgIHZhciBuYW1lXG4gICAgZm9yIChuYW1lIGluIG9iaikgcmV0dXJuIGZhbHNlXG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gICQuaW5BcnJheSA9IGZ1bmN0aW9uKGVsZW0sIGFycmF5LCBpKXtcbiAgICByZXR1cm4gZW1wdHlBcnJheS5pbmRleE9mLmNhbGwoYXJyYXksIGVsZW0sIGkpXG4gIH1cblxuICAkLmNhbWVsQ2FzZSA9IGNhbWVsaXplXG4gICQudHJpbSA9IGZ1bmN0aW9uKHN0cikge1xuICAgIHJldHVybiBzdHIgPT0gbnVsbCA/IFwiXCIgOiBTdHJpbmcucHJvdG90eXBlLnRyaW0uY2FsbChzdHIpXG4gIH1cblxuICAvLyBwbHVnaW4gY29tcGF0aWJpbGl0eVxuICAkLnV1aWQgPSAwXG4gICQuc3VwcG9ydCA9IHsgfVxuICAkLmV4cHIgPSB7IH1cblxuICAkLm1hcCA9IGZ1bmN0aW9uKGVsZW1lbnRzLCBjYWxsYmFjayl7XG4gICAgdmFyIHZhbHVlLCB2YWx1ZXMgPSBbXSwgaSwga2V5XG4gICAgaWYgKGxpa2VBcnJheShlbGVtZW50cykpXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFsdWUgPSBjYWxsYmFjayhlbGVtZW50c1tpXSwgaSlcbiAgICAgICAgaWYgKHZhbHVlICE9IG51bGwpIHZhbHVlcy5wdXNoKHZhbHVlKVxuICAgICAgfVxuICAgIGVsc2VcbiAgICAgIGZvciAoa2V5IGluIGVsZW1lbnRzKSB7XG4gICAgICAgIHZhbHVlID0gY2FsbGJhY2soZWxlbWVudHNba2V5XSwga2V5KVxuICAgICAgICBpZiAodmFsdWUgIT0gbnVsbCkgdmFsdWVzLnB1c2godmFsdWUpXG4gICAgICB9XG4gICAgcmV0dXJuIGZsYXR0ZW4odmFsdWVzKVxuICB9XG5cbiAgJC5lYWNoID0gZnVuY3Rpb24oZWxlbWVudHMsIGNhbGxiYWNrKXtcbiAgICB2YXIgaSwga2V5XG4gICAgaWYgKGxpa2VBcnJheShlbGVtZW50cykpIHtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKylcbiAgICAgICAgaWYgKGNhbGxiYWNrLmNhbGwoZWxlbWVudHNbaV0sIGksIGVsZW1lbnRzW2ldKSA9PT0gZmFsc2UpIHJldHVybiBlbGVtZW50c1xuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGtleSBpbiBlbGVtZW50cylcbiAgICAgICAgaWYgKGNhbGxiYWNrLmNhbGwoZWxlbWVudHNba2V5XSwga2V5LCBlbGVtZW50c1trZXldKSA9PT0gZmFsc2UpIHJldHVybiBlbGVtZW50c1xuICAgIH1cblxuICAgIHJldHVybiBlbGVtZW50c1xuICB9XG5cbiAgJC5ncmVwID0gZnVuY3Rpb24oZWxlbWVudHMsIGNhbGxiYWNrKXtcbiAgICByZXR1cm4gZmlsdGVyLmNhbGwoZWxlbWVudHMsIGNhbGxiYWNrKVxuICB9XG5cbiAgaWYgKHdpbmRvdy5KU09OKSAkLnBhcnNlSlNPTiA9IEpTT04ucGFyc2VcblxuICAvLyBQb3B1bGF0ZSB0aGUgY2xhc3MydHlwZSBtYXBcbiAgJC5lYWNoKFwiQm9vbGVhbiBOdW1iZXIgU3RyaW5nIEZ1bmN0aW9uIEFycmF5IERhdGUgUmVnRXhwIE9iamVjdCBFcnJvclwiLnNwbGl0KFwiIFwiKSwgZnVuY3Rpb24oaSwgbmFtZSkge1xuICAgIGNsYXNzMnR5cGVbIFwiW29iamVjdCBcIiArIG5hbWUgKyBcIl1cIiBdID0gbmFtZS50b0xvd2VyQ2FzZSgpXG4gIH0pXG5cbiAgLy8gRGVmaW5lIG1ldGhvZHMgdGhhdCB3aWxsIGJlIGF2YWlsYWJsZSBvbiBhbGxcbiAgLy8gWmVwdG8gY29sbGVjdGlvbnNcbiAgJC5mbiA9IHtcbiAgICAvLyBCZWNhdXNlIGEgY29sbGVjdGlvbiBhY3RzIGxpa2UgYW4gYXJyYXlcbiAgICAvLyBjb3B5IG92ZXIgdGhlc2UgdXNlZnVsIGFycmF5IGZ1bmN0aW9ucy5cbiAgICBmb3JFYWNoOiBlbXB0eUFycmF5LmZvckVhY2gsXG4gICAgcmVkdWNlOiBlbXB0eUFycmF5LnJlZHVjZSxcbiAgICBwdXNoOiBlbXB0eUFycmF5LnB1c2gsXG4gICAgc29ydDogZW1wdHlBcnJheS5zb3J0LFxuICAgIGluZGV4T2Y6IGVtcHR5QXJyYXkuaW5kZXhPZixcbiAgICBjb25jYXQ6IGVtcHR5QXJyYXkuY29uY2F0LFxuXG4gICAgLy8gYG1hcGAgYW5kIGBzbGljZWAgaW4gdGhlIGpRdWVyeSBBUEkgd29yayBkaWZmZXJlbnRseVxuICAgIC8vIGZyb20gdGhlaXIgYXJyYXkgY291bnRlcnBhcnRzXG4gICAgbWFwOiBmdW5jdGlvbihmbil7XG4gICAgICByZXR1cm4gJCgkLm1hcCh0aGlzLCBmdW5jdGlvbihlbCwgaSl7IHJldHVybiBmbi5jYWxsKGVsLCBpLCBlbCkgfSkpXG4gICAgfSxcbiAgICBzbGljZTogZnVuY3Rpb24oKXtcbiAgICAgIHJldHVybiAkKHNsaWNlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpXG4gICAgfSxcblxuICAgIHJlYWR5OiBmdW5jdGlvbihjYWxsYmFjayl7XG4gICAgICAvLyBuZWVkIHRvIGNoZWNrIGlmIGRvY3VtZW50LmJvZHkgZXhpc3RzIGZvciBJRSBhcyB0aGF0IGJyb3dzZXIgcmVwb3J0c1xuICAgICAgLy8gZG9jdW1lbnQgcmVhZHkgd2hlbiBpdCBoYXNuJ3QgeWV0IGNyZWF0ZWQgdGhlIGJvZHkgZWxlbWVudFxuICAgICAgaWYgKHJlYWR5UkUudGVzdChkb2N1bWVudC5yZWFkeVN0YXRlKSAmJiBkb2N1bWVudC5ib2R5KSBjYWxsYmFjaygkKVxuICAgICAgZWxzZSBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKXsgY2FsbGJhY2soJCkgfSwgZmFsc2UpXG4gICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG4gICAgZ2V0OiBmdW5jdGlvbihpZHgpe1xuICAgICAgcmV0dXJuIGlkeCA9PT0gdW5kZWZpbmVkID8gc2xpY2UuY2FsbCh0aGlzKSA6IHRoaXNbaWR4ID49IDAgPyBpZHggOiBpZHggKyB0aGlzLmxlbmd0aF1cbiAgICB9LFxuICAgIHRvQXJyYXk6IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzLmdldCgpIH0sXG4gICAgc2l6ZTogZnVuY3Rpb24oKXtcbiAgICAgIHJldHVybiB0aGlzLmxlbmd0aFxuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbigpe1xuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICBpZiAodGhpcy5wYXJlbnROb2RlICE9IG51bGwpXG4gICAgICAgICAgdGhpcy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMpXG4gICAgICB9KVxuICAgIH0sXG4gICAgZWFjaDogZnVuY3Rpb24oY2FsbGJhY2spe1xuICAgICAgZW1wdHlBcnJheS5ldmVyeS5jYWxsKHRoaXMsIGZ1bmN0aW9uKGVsLCBpZHgpe1xuICAgICAgICByZXR1cm4gY2FsbGJhY2suY2FsbChlbCwgaWR4LCBlbCkgIT09IGZhbHNlXG4gICAgICB9KVxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9LFxuICAgIGZpbHRlcjogZnVuY3Rpb24oc2VsZWN0b3Ipe1xuICAgICAgaWYgKGlzRnVuY3Rpb24oc2VsZWN0b3IpKSByZXR1cm4gdGhpcy5ub3QodGhpcy5ub3Qoc2VsZWN0b3IpKVxuICAgICAgcmV0dXJuICQoZmlsdGVyLmNhbGwodGhpcywgZnVuY3Rpb24oZWxlbWVudCl7XG4gICAgICAgIHJldHVybiB6ZXB0by5tYXRjaGVzKGVsZW1lbnQsIHNlbGVjdG9yKVxuICAgICAgfSkpXG4gICAgfSxcbiAgICBhZGQ6IGZ1bmN0aW9uKHNlbGVjdG9yLGNvbnRleHQpe1xuICAgICAgcmV0dXJuICQodW5pcSh0aGlzLmNvbmNhdCgkKHNlbGVjdG9yLGNvbnRleHQpKSkpXG4gICAgfSxcbiAgICBpczogZnVuY3Rpb24oc2VsZWN0b3Ipe1xuICAgICAgcmV0dXJuIHRoaXMubGVuZ3RoID4gMCAmJiB6ZXB0by5tYXRjaGVzKHRoaXNbMF0sIHNlbGVjdG9yKVxuICAgIH0sXG4gICAgbm90OiBmdW5jdGlvbihzZWxlY3Rvcil7XG4gICAgICB2YXIgbm9kZXM9W11cbiAgICAgIGlmIChpc0Z1bmN0aW9uKHNlbGVjdG9yKSAmJiBzZWxlY3Rvci5jYWxsICE9PSB1bmRlZmluZWQpXG4gICAgICAgIHRoaXMuZWFjaChmdW5jdGlvbihpZHgpe1xuICAgICAgICAgIGlmICghc2VsZWN0b3IuY2FsbCh0aGlzLGlkeCkpIG5vZGVzLnB1c2godGhpcylcbiAgICAgICAgfSlcbiAgICAgIGVsc2Uge1xuICAgICAgICB2YXIgZXhjbHVkZXMgPSB0eXBlb2Ygc2VsZWN0b3IgPT0gJ3N0cmluZycgPyB0aGlzLmZpbHRlcihzZWxlY3RvcikgOlxuICAgICAgICAgIChsaWtlQXJyYXkoc2VsZWN0b3IpICYmIGlzRnVuY3Rpb24oc2VsZWN0b3IuaXRlbSkpID8gc2xpY2UuY2FsbChzZWxlY3RvcikgOiAkKHNlbGVjdG9yKVxuICAgICAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24oZWwpe1xuICAgICAgICAgIGlmIChleGNsdWRlcy5pbmRleE9mKGVsKSA8IDApIG5vZGVzLnB1c2goZWwpXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgICByZXR1cm4gJChub2RlcylcbiAgICB9LFxuICAgIGhhczogZnVuY3Rpb24oc2VsZWN0b3Ipe1xuICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyKGZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiBpc09iamVjdChzZWxlY3RvcikgP1xuICAgICAgICAgICQuY29udGFpbnModGhpcywgc2VsZWN0b3IpIDpcbiAgICAgICAgICAkKHRoaXMpLmZpbmQoc2VsZWN0b3IpLnNpemUoKVxuICAgICAgfSlcbiAgICB9LFxuICAgIGVxOiBmdW5jdGlvbihpZHgpe1xuICAgICAgcmV0dXJuIGlkeCA9PT0gLTEgPyB0aGlzLnNsaWNlKGlkeCkgOiB0aGlzLnNsaWNlKGlkeCwgKyBpZHggKyAxKVxuICAgIH0sXG4gICAgZmlyc3Q6IGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgZWwgPSB0aGlzWzBdXG4gICAgICByZXR1cm4gZWwgJiYgIWlzT2JqZWN0KGVsKSA/IGVsIDogJChlbClcbiAgICB9LFxuICAgIGxhc3Q6IGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgZWwgPSB0aGlzW3RoaXMubGVuZ3RoIC0gMV1cbiAgICAgIHJldHVybiBlbCAmJiAhaXNPYmplY3QoZWwpID8gZWwgOiAkKGVsKVxuICAgIH0sXG4gICAgZmluZDogZnVuY3Rpb24oc2VsZWN0b3Ipe1xuICAgICAgdmFyIHJlc3VsdCwgJHRoaXMgPSB0aGlzXG4gICAgICBpZiAoIXNlbGVjdG9yKSByZXN1bHQgPSAkKClcbiAgICAgIGVsc2UgaWYgKHR5cGVvZiBzZWxlY3RvciA9PSAnb2JqZWN0JylcbiAgICAgICAgcmVzdWx0ID0gJChzZWxlY3RvcikuZmlsdGVyKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgdmFyIG5vZGUgPSB0aGlzXG4gICAgICAgICAgcmV0dXJuIGVtcHR5QXJyYXkuc29tZS5jYWxsKCR0aGlzLCBmdW5jdGlvbihwYXJlbnQpe1xuICAgICAgICAgICAgcmV0dXJuICQuY29udGFpbnMocGFyZW50LCBub2RlKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICBlbHNlIGlmICh0aGlzLmxlbmd0aCA9PSAxKSByZXN1bHQgPSAkKHplcHRvLnFzYSh0aGlzWzBdLCBzZWxlY3RvcikpXG4gICAgICBlbHNlIHJlc3VsdCA9IHRoaXMubWFwKGZ1bmN0aW9uKCl7IHJldHVybiB6ZXB0by5xc2EodGhpcywgc2VsZWN0b3IpIH0pXG4gICAgICByZXR1cm4gcmVzdWx0XG4gICAgfSxcbiAgICBjbG9zZXN0OiBmdW5jdGlvbihzZWxlY3RvciwgY29udGV4dCl7XG4gICAgICB2YXIgbm9kZSA9IHRoaXNbMF0sIGNvbGxlY3Rpb24gPSBmYWxzZVxuICAgICAgaWYgKHR5cGVvZiBzZWxlY3RvciA9PSAnb2JqZWN0JykgY29sbGVjdGlvbiA9ICQoc2VsZWN0b3IpXG4gICAgICB3aGlsZSAobm9kZSAmJiAhKGNvbGxlY3Rpb24gPyBjb2xsZWN0aW9uLmluZGV4T2Yobm9kZSkgPj0gMCA6IHplcHRvLm1hdGNoZXMobm9kZSwgc2VsZWN0b3IpKSlcbiAgICAgICAgbm9kZSA9IG5vZGUgIT09IGNvbnRleHQgJiYgIWlzRG9jdW1lbnQobm9kZSkgJiYgbm9kZS5wYXJlbnROb2RlXG4gICAgICByZXR1cm4gJChub2RlKVxuICAgIH0sXG4gICAgcGFyZW50czogZnVuY3Rpb24oc2VsZWN0b3Ipe1xuICAgICAgdmFyIGFuY2VzdG9ycyA9IFtdLCBub2RlcyA9IHRoaXNcbiAgICAgIHdoaWxlIChub2Rlcy5sZW5ndGggPiAwKVxuICAgICAgICBub2RlcyA9ICQubWFwKG5vZGVzLCBmdW5jdGlvbihub2RlKXtcbiAgICAgICAgICBpZiAoKG5vZGUgPSBub2RlLnBhcmVudE5vZGUpICYmICFpc0RvY3VtZW50KG5vZGUpICYmIGFuY2VzdG9ycy5pbmRleE9mKG5vZGUpIDwgMCkge1xuICAgICAgICAgICAgYW5jZXN0b3JzLnB1c2gobm9kZSlcbiAgICAgICAgICAgIHJldHVybiBub2RlXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgcmV0dXJuIGZpbHRlcmVkKGFuY2VzdG9ycywgc2VsZWN0b3IpXG4gICAgfSxcbiAgICBwYXJlbnQ6IGZ1bmN0aW9uKHNlbGVjdG9yKXtcbiAgICAgIHJldHVybiBmaWx0ZXJlZCh1bmlxKHRoaXMucGx1Y2soJ3BhcmVudE5vZGUnKSksIHNlbGVjdG9yKVxuICAgIH0sXG4gICAgY2hpbGRyZW46IGZ1bmN0aW9uKHNlbGVjdG9yKXtcbiAgICAgIHJldHVybiBmaWx0ZXJlZCh0aGlzLm1hcChmdW5jdGlvbigpeyByZXR1cm4gY2hpbGRyZW4odGhpcykgfSksIHNlbGVjdG9yKVxuICAgIH0sXG4gICAgY29udGVudHM6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uKCkgeyByZXR1cm4gc2xpY2UuY2FsbCh0aGlzLmNoaWxkTm9kZXMpIH0pXG4gICAgfSxcbiAgICBzaWJsaW5nczogZnVuY3Rpb24oc2VsZWN0b3Ipe1xuICAgICAgcmV0dXJuIGZpbHRlcmVkKHRoaXMubWFwKGZ1bmN0aW9uKGksIGVsKXtcbiAgICAgICAgcmV0dXJuIGZpbHRlci5jYWxsKGNoaWxkcmVuKGVsLnBhcmVudE5vZGUpLCBmdW5jdGlvbihjaGlsZCl7IHJldHVybiBjaGlsZCE9PWVsIH0pXG4gICAgICB9KSwgc2VsZWN0b3IpXG4gICAgfSxcbiAgICBlbXB0eTogZnVuY3Rpb24oKXtcbiAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXsgdGhpcy5pbm5lckhUTUwgPSAnJyB9KVxuICAgIH0sXG4gICAgLy8gYHBsdWNrYCBpcyBib3Jyb3dlZCBmcm9tIFByb3RvdHlwZS5qc1xuICAgIHBsdWNrOiBmdW5jdGlvbihwcm9wZXJ0eSl7XG4gICAgICByZXR1cm4gJC5tYXAodGhpcywgZnVuY3Rpb24oZWwpeyByZXR1cm4gZWxbcHJvcGVydHldIH0pXG4gICAgfSxcbiAgICBzaG93OiBmdW5jdGlvbigpe1xuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICB0aGlzLnN0eWxlLmRpc3BsYXkgPT0gXCJub25lXCIgJiYgKHRoaXMuc3R5bGUuZGlzcGxheSA9ICcnKVxuICAgICAgICBpZiAoZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLCAnJykuZ2V0UHJvcGVydHlWYWx1ZShcImRpc3BsYXlcIikgPT0gXCJub25lXCIpXG4gICAgICAgICAgdGhpcy5zdHlsZS5kaXNwbGF5ID0gZGVmYXVsdERpc3BsYXkodGhpcy5ub2RlTmFtZSlcbiAgICAgIH0pXG4gICAgfSxcbiAgICByZXBsYWNlV2l0aDogZnVuY3Rpb24obmV3Q29udGVudCl7XG4gICAgICByZXR1cm4gdGhpcy5iZWZvcmUobmV3Q29udGVudCkucmVtb3ZlKClcbiAgICB9LFxuICAgIHdyYXA6IGZ1bmN0aW9uKHN0cnVjdHVyZSl7XG4gICAgICB2YXIgZnVuYyA9IGlzRnVuY3Rpb24oc3RydWN0dXJlKVxuICAgICAgaWYgKHRoaXNbMF0gJiYgIWZ1bmMpXG4gICAgICAgIHZhciBkb20gICA9ICQoc3RydWN0dXJlKS5nZXQoMCksXG4gICAgICAgICAgICBjbG9uZSA9IGRvbS5wYXJlbnROb2RlIHx8IHRoaXMubGVuZ3RoID4gMVxuXG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKGluZGV4KXtcbiAgICAgICAgJCh0aGlzKS53cmFwQWxsKFxuICAgICAgICAgIGZ1bmMgPyBzdHJ1Y3R1cmUuY2FsbCh0aGlzLCBpbmRleCkgOlxuICAgICAgICAgICAgY2xvbmUgPyBkb20uY2xvbmVOb2RlKHRydWUpIDogZG9tXG4gICAgICAgIClcbiAgICAgIH0pXG4gICAgfSxcbiAgICB3cmFwQWxsOiBmdW5jdGlvbihzdHJ1Y3R1cmUpe1xuICAgICAgaWYgKHRoaXNbMF0pIHtcbiAgICAgICAgJCh0aGlzWzBdKS5iZWZvcmUoc3RydWN0dXJlID0gJChzdHJ1Y3R1cmUpKVxuICAgICAgICB2YXIgY2hpbGRyZW5cbiAgICAgICAgLy8gZHJpbGwgZG93biB0byB0aGUgaW5tb3N0IGVsZW1lbnRcbiAgICAgICAgd2hpbGUgKChjaGlsZHJlbiA9IHN0cnVjdHVyZS5jaGlsZHJlbigpKS5sZW5ndGgpIHN0cnVjdHVyZSA9IGNoaWxkcmVuLmZpcnN0KClcbiAgICAgICAgJChzdHJ1Y3R1cmUpLmFwcGVuZCh0aGlzKVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9LFxuICAgIHdyYXBJbm5lcjogZnVuY3Rpb24oc3RydWN0dXJlKXtcbiAgICAgIHZhciBmdW5jID0gaXNGdW5jdGlvbihzdHJ1Y3R1cmUpXG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKGluZGV4KXtcbiAgICAgICAgdmFyIHNlbGYgPSAkKHRoaXMpLCBjb250ZW50cyA9IHNlbGYuY29udGVudHMoKSxcbiAgICAgICAgICAgIGRvbSAgPSBmdW5jID8gc3RydWN0dXJlLmNhbGwodGhpcywgaW5kZXgpIDogc3RydWN0dXJlXG4gICAgICAgIGNvbnRlbnRzLmxlbmd0aCA/IGNvbnRlbnRzLndyYXBBbGwoZG9tKSA6IHNlbGYuYXBwZW5kKGRvbSlcbiAgICAgIH0pXG4gICAgfSxcbiAgICB1bndyYXA6IGZ1bmN0aW9uKCl7XG4gICAgICB0aGlzLnBhcmVudCgpLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgJCh0aGlzKS5yZXBsYWNlV2l0aCgkKHRoaXMpLmNoaWxkcmVuKCkpXG4gICAgICB9KVxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9LFxuICAgIGNsb25lOiBmdW5jdGlvbigpe1xuICAgICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzLmNsb25lTm9kZSh0cnVlKSB9KVxuICAgIH0sXG4gICAgaGlkZTogZnVuY3Rpb24oKXtcbiAgICAgIHJldHVybiB0aGlzLmNzcyhcImRpc3BsYXlcIiwgXCJub25lXCIpXG4gICAgfSxcbiAgICB0b2dnbGU6IGZ1bmN0aW9uKHNldHRpbmcpe1xuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICB2YXIgZWwgPSAkKHRoaXMpXG4gICAgICAgIDsoc2V0dGluZyA9PT0gdW5kZWZpbmVkID8gZWwuY3NzKFwiZGlzcGxheVwiKSA9PSBcIm5vbmVcIiA6IHNldHRpbmcpID8gZWwuc2hvdygpIDogZWwuaGlkZSgpXG4gICAgICB9KVxuICAgIH0sXG4gICAgcHJldjogZnVuY3Rpb24oc2VsZWN0b3IpeyByZXR1cm4gJCh0aGlzLnBsdWNrKCdwcmV2aW91c0VsZW1lbnRTaWJsaW5nJykpLmZpbHRlcihzZWxlY3RvciB8fCAnKicpIH0sXG4gICAgbmV4dDogZnVuY3Rpb24oc2VsZWN0b3IpeyByZXR1cm4gJCh0aGlzLnBsdWNrKCduZXh0RWxlbWVudFNpYmxpbmcnKSkuZmlsdGVyKHNlbGVjdG9yIHx8ICcqJykgfSxcbiAgICBodG1sOiBmdW5jdGlvbihodG1sKXtcbiAgICAgIHJldHVybiAwIGluIGFyZ3VtZW50cyA/XG4gICAgICAgIHRoaXMuZWFjaChmdW5jdGlvbihpZHgpe1xuICAgICAgICAgIHZhciBvcmlnaW5IdG1sID0gdGhpcy5pbm5lckhUTUxcbiAgICAgICAgICAkKHRoaXMpLmVtcHR5KCkuYXBwZW5kKCBmdW5jQXJnKHRoaXMsIGh0bWwsIGlkeCwgb3JpZ2luSHRtbCkgKVxuICAgICAgICB9KSA6XG4gICAgICAgICgwIGluIHRoaXMgPyB0aGlzWzBdLmlubmVySFRNTCA6IG51bGwpXG4gICAgfSxcbiAgICB0ZXh0OiBmdW5jdGlvbih0ZXh0KXtcbiAgICAgIHJldHVybiAwIGluIGFyZ3VtZW50cyA/XG4gICAgICAgIHRoaXMuZWFjaChmdW5jdGlvbihpZHgpe1xuICAgICAgICAgIHZhciBuZXdUZXh0ID0gZnVuY0FyZyh0aGlzLCB0ZXh0LCBpZHgsIHRoaXMudGV4dENvbnRlbnQpXG4gICAgICAgICAgdGhpcy50ZXh0Q29udGVudCA9IG5ld1RleHQgPT0gbnVsbCA/ICcnIDogJycrbmV3VGV4dFxuICAgICAgICB9KSA6XG4gICAgICAgICgwIGluIHRoaXMgPyB0aGlzWzBdLnRleHRDb250ZW50IDogbnVsbClcbiAgICB9LFxuICAgIGF0dHI6IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKXtcbiAgICAgIHZhciByZXN1bHRcbiAgICAgIHJldHVybiAodHlwZW9mIG5hbWUgPT0gJ3N0cmluZycgJiYgISgxIGluIGFyZ3VtZW50cykpID9cbiAgICAgICAgKCF0aGlzLmxlbmd0aCB8fCB0aGlzWzBdLm5vZGVUeXBlICE9PSAxID8gdW5kZWZpbmVkIDpcbiAgICAgICAgICAoIShyZXN1bHQgPSB0aGlzWzBdLmdldEF0dHJpYnV0ZShuYW1lKSkgJiYgbmFtZSBpbiB0aGlzWzBdKSA/IHRoaXNbMF1bbmFtZV0gOiByZXN1bHRcbiAgICAgICAgKSA6XG4gICAgICAgIHRoaXMuZWFjaChmdW5jdGlvbihpZHgpe1xuICAgICAgICAgIGlmICh0aGlzLm5vZGVUeXBlICE9PSAxKSByZXR1cm5cbiAgICAgICAgICBpZiAoaXNPYmplY3QobmFtZSkpIGZvciAoa2V5IGluIG5hbWUpIHNldEF0dHJpYnV0ZSh0aGlzLCBrZXksIG5hbWVba2V5XSlcbiAgICAgICAgICBlbHNlIHNldEF0dHJpYnV0ZSh0aGlzLCBuYW1lLCBmdW5jQXJnKHRoaXMsIHZhbHVlLCBpZHgsIHRoaXMuZ2V0QXR0cmlidXRlKG5hbWUpKSlcbiAgICAgICAgfSlcbiAgICB9LFxuICAgIHJlbW92ZUF0dHI6IGZ1bmN0aW9uKG5hbWUpe1xuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpeyB0aGlzLm5vZGVUeXBlID09PSAxICYmIG5hbWUuc3BsaXQoJyAnKS5mb3JFYWNoKGZ1bmN0aW9uKGF0dHJpYnV0ZSl7XG4gICAgICAgIHNldEF0dHJpYnV0ZSh0aGlzLCBhdHRyaWJ1dGUpXG4gICAgICB9LCB0aGlzKX0pXG4gICAgfSxcbiAgICBwcm9wOiBmdW5jdGlvbihuYW1lLCB2YWx1ZSl7XG4gICAgICBuYW1lID0gcHJvcE1hcFtuYW1lXSB8fCBuYW1lXG4gICAgICByZXR1cm4gKDEgaW4gYXJndW1lbnRzKSA/XG4gICAgICAgIHRoaXMuZWFjaChmdW5jdGlvbihpZHgpe1xuICAgICAgICAgIHRoaXNbbmFtZV0gPSBmdW5jQXJnKHRoaXMsIHZhbHVlLCBpZHgsIHRoaXNbbmFtZV0pXG4gICAgICAgIH0pIDpcbiAgICAgICAgKHRoaXNbMF0gJiYgdGhpc1swXVtuYW1lXSlcbiAgICB9LFxuICAgIGRhdGE6IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKXtcbiAgICAgIHZhciBhdHRyTmFtZSA9ICdkYXRhLScgKyBuYW1lLnJlcGxhY2UoY2FwaXRhbFJFLCAnLSQxJykudG9Mb3dlckNhc2UoKVxuXG4gICAgICB2YXIgZGF0YSA9ICgxIGluIGFyZ3VtZW50cykgP1xuICAgICAgICB0aGlzLmF0dHIoYXR0ck5hbWUsIHZhbHVlKSA6XG4gICAgICAgIHRoaXMuYXR0cihhdHRyTmFtZSlcblxuICAgICAgcmV0dXJuIGRhdGEgIT09IG51bGwgPyBkZXNlcmlhbGl6ZVZhbHVlKGRhdGEpIDogdW5kZWZpbmVkXG4gICAgfSxcbiAgICB2YWw6IGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAgIHJldHVybiAwIGluIGFyZ3VtZW50cyA/XG4gICAgICAgIHRoaXMuZWFjaChmdW5jdGlvbihpZHgpe1xuICAgICAgICAgIHRoaXMudmFsdWUgPSBmdW5jQXJnKHRoaXMsIHZhbHVlLCBpZHgsIHRoaXMudmFsdWUpXG4gICAgICAgIH0pIDpcbiAgICAgICAgKHRoaXNbMF0gJiYgKHRoaXNbMF0ubXVsdGlwbGUgP1xuICAgICAgICAgICAkKHRoaXNbMF0pLmZpbmQoJ29wdGlvbicpLmZpbHRlcihmdW5jdGlvbigpeyByZXR1cm4gdGhpcy5zZWxlY3RlZCB9KS5wbHVjaygndmFsdWUnKSA6XG4gICAgICAgICAgIHRoaXNbMF0udmFsdWUpXG4gICAgICAgIClcbiAgICB9LFxuICAgIG9mZnNldDogZnVuY3Rpb24oY29vcmRpbmF0ZXMpe1xuICAgICAgaWYgKGNvb3JkaW5hdGVzKSByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKGluZGV4KXtcbiAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKSxcbiAgICAgICAgICAgIGNvb3JkcyA9IGZ1bmNBcmcodGhpcywgY29vcmRpbmF0ZXMsIGluZGV4LCAkdGhpcy5vZmZzZXQoKSksXG4gICAgICAgICAgICBwYXJlbnRPZmZzZXQgPSAkdGhpcy5vZmZzZXRQYXJlbnQoKS5vZmZzZXQoKSxcbiAgICAgICAgICAgIHByb3BzID0ge1xuICAgICAgICAgICAgICB0b3A6ICBjb29yZHMudG9wICAtIHBhcmVudE9mZnNldC50b3AsXG4gICAgICAgICAgICAgIGxlZnQ6IGNvb3Jkcy5sZWZ0IC0gcGFyZW50T2Zmc2V0LmxlZnRcbiAgICAgICAgICAgIH1cblxuICAgICAgICBpZiAoJHRoaXMuY3NzKCdwb3NpdGlvbicpID09ICdzdGF0aWMnKSBwcm9wc1sncG9zaXRpb24nXSA9ICdyZWxhdGl2ZSdcbiAgICAgICAgJHRoaXMuY3NzKHByb3BzKVxuICAgICAgfSlcbiAgICAgIGlmICghdGhpcy5sZW5ndGgpIHJldHVybiBudWxsXG4gICAgICB2YXIgb2JqID0gdGhpc1swXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbGVmdDogb2JqLmxlZnQgKyB3aW5kb3cucGFnZVhPZmZzZXQsXG4gICAgICAgIHRvcDogb2JqLnRvcCArIHdpbmRvdy5wYWdlWU9mZnNldCxcbiAgICAgICAgd2lkdGg6IE1hdGgucm91bmQob2JqLndpZHRoKSxcbiAgICAgICAgaGVpZ2h0OiBNYXRoLnJvdW5kKG9iai5oZWlnaHQpXG4gICAgICB9XG4gICAgfSxcbiAgICBjc3M6IGZ1bmN0aW9uKHByb3BlcnR5LCB2YWx1ZSl7XG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgdmFyIGNvbXB1dGVkU3R5bGUsIGVsZW1lbnQgPSB0aGlzWzBdXG4gICAgICAgIGlmKCFlbGVtZW50KSByZXR1cm5cbiAgICAgICAgY29tcHV0ZWRTdHlsZSA9IGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCwgJycpXG4gICAgICAgIGlmICh0eXBlb2YgcHJvcGVydHkgPT0gJ3N0cmluZycpXG4gICAgICAgICAgcmV0dXJuIGVsZW1lbnQuc3R5bGVbY2FtZWxpemUocHJvcGVydHkpXSB8fCBjb21wdXRlZFN0eWxlLmdldFByb3BlcnR5VmFsdWUocHJvcGVydHkpXG4gICAgICAgIGVsc2UgaWYgKGlzQXJyYXkocHJvcGVydHkpKSB7XG4gICAgICAgICAgdmFyIHByb3BzID0ge31cbiAgICAgICAgICAkLmVhY2gocHJvcGVydHksIGZ1bmN0aW9uKF8sIHByb3Ape1xuICAgICAgICAgICAgcHJvcHNbcHJvcF0gPSAoZWxlbWVudC5zdHlsZVtjYW1lbGl6ZShwcm9wKV0gfHwgY29tcHV0ZWRTdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKHByb3ApKVxuICAgICAgICAgIH0pXG4gICAgICAgICAgcmV0dXJuIHByb3BzXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFyIGNzcyA9ICcnXG4gICAgICBpZiAodHlwZShwcm9wZXJ0eSkgPT0gJ3N0cmluZycpIHtcbiAgICAgICAgaWYgKCF2YWx1ZSAmJiB2YWx1ZSAhPT0gMClcbiAgICAgICAgICB0aGlzLmVhY2goZnVuY3Rpb24oKXsgdGhpcy5zdHlsZS5yZW1vdmVQcm9wZXJ0eShkYXNoZXJpemUocHJvcGVydHkpKSB9KVxuICAgICAgICBlbHNlXG4gICAgICAgICAgY3NzID0gZGFzaGVyaXplKHByb3BlcnR5KSArIFwiOlwiICsgbWF5YmVBZGRQeChwcm9wZXJ0eSwgdmFsdWUpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKGtleSBpbiBwcm9wZXJ0eSlcbiAgICAgICAgICBpZiAoIXByb3BlcnR5W2tleV0gJiYgcHJvcGVydHlba2V5XSAhPT0gMClcbiAgICAgICAgICAgIHRoaXMuZWFjaChmdW5jdGlvbigpeyB0aGlzLnN0eWxlLnJlbW92ZVByb3BlcnR5KGRhc2hlcml6ZShrZXkpKSB9KVxuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIGNzcyArPSBkYXNoZXJpemUoa2V5KSArICc6JyArIG1heWJlQWRkUHgoa2V5LCBwcm9wZXJ0eVtrZXldKSArICc7J1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7IHRoaXMuc3R5bGUuY3NzVGV4dCArPSAnOycgKyBjc3MgfSlcbiAgICB9LFxuICAgIGluZGV4OiBmdW5jdGlvbihlbGVtZW50KXtcbiAgICAgIHJldHVybiBlbGVtZW50ID8gdGhpcy5pbmRleE9mKCQoZWxlbWVudClbMF0pIDogdGhpcy5wYXJlbnQoKS5jaGlsZHJlbigpLmluZGV4T2YodGhpc1swXSlcbiAgICB9LFxuICAgIGhhc0NsYXNzOiBmdW5jdGlvbihuYW1lKXtcbiAgICAgIGlmICghbmFtZSkgcmV0dXJuIGZhbHNlXG4gICAgICByZXR1cm4gZW1wdHlBcnJheS5zb21lLmNhbGwodGhpcywgZnVuY3Rpb24oZWwpe1xuICAgICAgICByZXR1cm4gdGhpcy50ZXN0KGNsYXNzTmFtZShlbCkpXG4gICAgICB9LCBjbGFzc1JFKG5hbWUpKVxuICAgIH0sXG4gICAgYWRkQ2xhc3M6IGZ1bmN0aW9uKG5hbWUpe1xuICAgICAgaWYgKCFuYW1lKSByZXR1cm4gdGhpc1xuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbihpZHgpe1xuICAgICAgICBpZiAoISgnY2xhc3NOYW1lJyBpbiB0aGlzKSkgcmV0dXJuXG4gICAgICAgIGNsYXNzTGlzdCA9IFtdXG4gICAgICAgIHZhciBjbHMgPSBjbGFzc05hbWUodGhpcyksIG5ld05hbWUgPSBmdW5jQXJnKHRoaXMsIG5hbWUsIGlkeCwgY2xzKVxuICAgICAgICBuZXdOYW1lLnNwbGl0KC9cXHMrL2cpLmZvckVhY2goZnVuY3Rpb24oa2xhc3Mpe1xuICAgICAgICAgIGlmICghJCh0aGlzKS5oYXNDbGFzcyhrbGFzcykpIGNsYXNzTGlzdC5wdXNoKGtsYXNzKVxuICAgICAgICB9LCB0aGlzKVxuICAgICAgICBjbGFzc0xpc3QubGVuZ3RoICYmIGNsYXNzTmFtZSh0aGlzLCBjbHMgKyAoY2xzID8gXCIgXCIgOiBcIlwiKSArIGNsYXNzTGlzdC5qb2luKFwiIFwiKSlcbiAgICAgIH0pXG4gICAgfSxcbiAgICByZW1vdmVDbGFzczogZnVuY3Rpb24obmFtZSl7XG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKGlkeCl7XG4gICAgICAgIGlmICghKCdjbGFzc05hbWUnIGluIHRoaXMpKSByZXR1cm5cbiAgICAgICAgaWYgKG5hbWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIGNsYXNzTmFtZSh0aGlzLCAnJylcbiAgICAgICAgY2xhc3NMaXN0ID0gY2xhc3NOYW1lKHRoaXMpXG4gICAgICAgIGZ1bmNBcmcodGhpcywgbmFtZSwgaWR4LCBjbGFzc0xpc3QpLnNwbGl0KC9cXHMrL2cpLmZvckVhY2goZnVuY3Rpb24oa2xhc3Mpe1xuICAgICAgICAgIGNsYXNzTGlzdCA9IGNsYXNzTGlzdC5yZXBsYWNlKGNsYXNzUkUoa2xhc3MpLCBcIiBcIilcbiAgICAgICAgfSlcbiAgICAgICAgY2xhc3NOYW1lKHRoaXMsIGNsYXNzTGlzdC50cmltKCkpXG4gICAgICB9KVxuICAgIH0sXG4gICAgdG9nZ2xlQ2xhc3M6IGZ1bmN0aW9uKG5hbWUsIHdoZW4pe1xuICAgICAgaWYgKCFuYW1lKSByZXR1cm4gdGhpc1xuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbihpZHgpe1xuICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpLCBuYW1lcyA9IGZ1bmNBcmcodGhpcywgbmFtZSwgaWR4LCBjbGFzc05hbWUodGhpcykpXG4gICAgICAgIG5hbWVzLnNwbGl0KC9cXHMrL2cpLmZvckVhY2goZnVuY3Rpb24oa2xhc3Mpe1xuICAgICAgICAgICh3aGVuID09PSB1bmRlZmluZWQgPyAhJHRoaXMuaGFzQ2xhc3Moa2xhc3MpIDogd2hlbikgP1xuICAgICAgICAgICAgJHRoaXMuYWRkQ2xhc3Moa2xhc3MpIDogJHRoaXMucmVtb3ZlQ2xhc3Moa2xhc3MpXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH0sXG4gICAgc2Nyb2xsVG9wOiBmdW5jdGlvbih2YWx1ZSl7XG4gICAgICBpZiAoIXRoaXMubGVuZ3RoKSByZXR1cm5cbiAgICAgIHZhciBoYXNTY3JvbGxUb3AgPSAnc2Nyb2xsVG9wJyBpbiB0aGlzWzBdXG4gICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIGhhc1Njcm9sbFRvcCA/IHRoaXNbMF0uc2Nyb2xsVG9wIDogdGhpc1swXS5wYWdlWU9mZnNldFxuICAgICAgcmV0dXJuIHRoaXMuZWFjaChoYXNTY3JvbGxUb3AgP1xuICAgICAgICBmdW5jdGlvbigpeyB0aGlzLnNjcm9sbFRvcCA9IHZhbHVlIH0gOlxuICAgICAgICBmdW5jdGlvbigpeyB0aGlzLnNjcm9sbFRvKHRoaXMuc2Nyb2xsWCwgdmFsdWUpIH0pXG4gICAgfSxcbiAgICBzY3JvbGxMZWZ0OiBmdW5jdGlvbih2YWx1ZSl7XG4gICAgICBpZiAoIXRoaXMubGVuZ3RoKSByZXR1cm5cbiAgICAgIHZhciBoYXNTY3JvbGxMZWZ0ID0gJ3Njcm9sbExlZnQnIGluIHRoaXNbMF1cbiAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gaGFzU2Nyb2xsTGVmdCA/IHRoaXNbMF0uc2Nyb2xsTGVmdCA6IHRoaXNbMF0ucGFnZVhPZmZzZXRcbiAgICAgIHJldHVybiB0aGlzLmVhY2goaGFzU2Nyb2xsTGVmdCA/XG4gICAgICAgIGZ1bmN0aW9uKCl7IHRoaXMuc2Nyb2xsTGVmdCA9IHZhbHVlIH0gOlxuICAgICAgICBmdW5jdGlvbigpeyB0aGlzLnNjcm9sbFRvKHZhbHVlLCB0aGlzLnNjcm9sbFkpIH0pXG4gICAgfSxcbiAgICBwb3NpdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoIXRoaXMubGVuZ3RoKSByZXR1cm5cblxuICAgICAgdmFyIGVsZW0gPSB0aGlzWzBdLFxuICAgICAgICAvLyBHZXQgKnJlYWwqIG9mZnNldFBhcmVudFxuICAgICAgICBvZmZzZXRQYXJlbnQgPSB0aGlzLm9mZnNldFBhcmVudCgpLFxuICAgICAgICAvLyBHZXQgY29ycmVjdCBvZmZzZXRzXG4gICAgICAgIG9mZnNldCAgICAgICA9IHRoaXMub2Zmc2V0KCksXG4gICAgICAgIHBhcmVudE9mZnNldCA9IHJvb3ROb2RlUkUudGVzdChvZmZzZXRQYXJlbnRbMF0ubm9kZU5hbWUpID8geyB0b3A6IDAsIGxlZnQ6IDAgfSA6IG9mZnNldFBhcmVudC5vZmZzZXQoKVxuXG4gICAgICAvLyBTdWJ0cmFjdCBlbGVtZW50IG1hcmdpbnNcbiAgICAgIC8vIG5vdGU6IHdoZW4gYW4gZWxlbWVudCBoYXMgbWFyZ2luOiBhdXRvIHRoZSBvZmZzZXRMZWZ0IGFuZCBtYXJnaW5MZWZ0XG4gICAgICAvLyBhcmUgdGhlIHNhbWUgaW4gU2FmYXJpIGNhdXNpbmcgb2Zmc2V0LmxlZnQgdG8gaW5jb3JyZWN0bHkgYmUgMFxuICAgICAgb2Zmc2V0LnRvcCAgLT0gcGFyc2VGbG9hdCggJChlbGVtKS5jc3MoJ21hcmdpbi10b3AnKSApIHx8IDBcbiAgICAgIG9mZnNldC5sZWZ0IC09IHBhcnNlRmxvYXQoICQoZWxlbSkuY3NzKCdtYXJnaW4tbGVmdCcpICkgfHwgMFxuXG4gICAgICAvLyBBZGQgb2Zmc2V0UGFyZW50IGJvcmRlcnNcbiAgICAgIHBhcmVudE9mZnNldC50b3AgICs9IHBhcnNlRmxvYXQoICQob2Zmc2V0UGFyZW50WzBdKS5jc3MoJ2JvcmRlci10b3Atd2lkdGgnKSApIHx8IDBcbiAgICAgIHBhcmVudE9mZnNldC5sZWZ0ICs9IHBhcnNlRmxvYXQoICQob2Zmc2V0UGFyZW50WzBdKS5jc3MoJ2JvcmRlci1sZWZ0LXdpZHRoJykgKSB8fCAwXG5cbiAgICAgIC8vIFN1YnRyYWN0IHRoZSB0d28gb2Zmc2V0c1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdG9wOiAgb2Zmc2V0LnRvcCAgLSBwYXJlbnRPZmZzZXQudG9wLFxuICAgICAgICBsZWZ0OiBvZmZzZXQubGVmdCAtIHBhcmVudE9mZnNldC5sZWZ0XG4gICAgICB9XG4gICAgfSxcbiAgICBvZmZzZXRQYXJlbnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciBwYXJlbnQgPSB0aGlzLm9mZnNldFBhcmVudCB8fCBkb2N1bWVudC5ib2R5XG4gICAgICAgIHdoaWxlIChwYXJlbnQgJiYgIXJvb3ROb2RlUkUudGVzdChwYXJlbnQubm9kZU5hbWUpICYmICQocGFyZW50KS5jc3MoXCJwb3NpdGlvblwiKSA9PSBcInN0YXRpY1wiKVxuICAgICAgICAgIHBhcmVudCA9IHBhcmVudC5vZmZzZXRQYXJlbnRcbiAgICAgICAgcmV0dXJuIHBhcmVudFxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICAvLyBmb3Igbm93XG4gICQuZm4uZGV0YWNoID0gJC5mbi5yZW1vdmVcblxuICAvLyBHZW5lcmF0ZSB0aGUgYHdpZHRoYCBhbmQgYGhlaWdodGAgZnVuY3Rpb25zXG4gIDtbJ3dpZHRoJywgJ2hlaWdodCddLmZvckVhY2goZnVuY3Rpb24oZGltZW5zaW9uKXtcbiAgICB2YXIgZGltZW5zaW9uUHJvcGVydHkgPVxuICAgICAgZGltZW5zaW9uLnJlcGxhY2UoLy4vLCBmdW5jdGlvbihtKXsgcmV0dXJuIG1bMF0udG9VcHBlckNhc2UoKSB9KVxuXG4gICAgJC5mbltkaW1lbnNpb25dID0gZnVuY3Rpb24odmFsdWUpe1xuICAgICAgdmFyIG9mZnNldCwgZWwgPSB0aGlzWzBdXG4gICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIGlzV2luZG93KGVsKSA/IGVsWydpbm5lcicgKyBkaW1lbnNpb25Qcm9wZXJ0eV0gOlxuICAgICAgICBpc0RvY3VtZW50KGVsKSA/IGVsLmRvY3VtZW50RWxlbWVudFsnc2Nyb2xsJyArIGRpbWVuc2lvblByb3BlcnR5XSA6XG4gICAgICAgIChvZmZzZXQgPSB0aGlzLm9mZnNldCgpKSAmJiBvZmZzZXRbZGltZW5zaW9uXVxuICAgICAgZWxzZSByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKGlkeCl7XG4gICAgICAgIGVsID0gJCh0aGlzKVxuICAgICAgICBlbC5jc3MoZGltZW5zaW9uLCBmdW5jQXJnKHRoaXMsIHZhbHVlLCBpZHgsIGVsW2RpbWVuc2lvbl0oKSkpXG4gICAgICB9KVxuICAgIH1cbiAgfSlcblxuICBmdW5jdGlvbiB0cmF2ZXJzZU5vZGUobm9kZSwgZnVuKSB7XG4gICAgZnVuKG5vZGUpXG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IG5vZGUuY2hpbGROb2Rlcy5sZW5ndGg7IGkgPCBsZW47IGkrKylcbiAgICAgIHRyYXZlcnNlTm9kZShub2RlLmNoaWxkTm9kZXNbaV0sIGZ1bilcbiAgfVxuXG4gIC8vIEdlbmVyYXRlIHRoZSBgYWZ0ZXJgLCBgcHJlcGVuZGAsIGBiZWZvcmVgLCBgYXBwZW5kYCxcbiAgLy8gYGluc2VydEFmdGVyYCwgYGluc2VydEJlZm9yZWAsIGBhcHBlbmRUb2AsIGFuZCBgcHJlcGVuZFRvYCBtZXRob2RzLlxuICBhZGphY2VuY3lPcGVyYXRvcnMuZm9yRWFjaChmdW5jdGlvbihvcGVyYXRvciwgb3BlcmF0b3JJbmRleCkge1xuICAgIHZhciBpbnNpZGUgPSBvcGVyYXRvckluZGV4ICUgMiAvLz0+IHByZXBlbmQsIGFwcGVuZFxuXG4gICAgJC5mbltvcGVyYXRvcl0gPSBmdW5jdGlvbigpe1xuICAgICAgLy8gYXJndW1lbnRzIGNhbiBiZSBub2RlcywgYXJyYXlzIG9mIG5vZGVzLCBaZXB0byBvYmplY3RzIGFuZCBIVE1MIHN0cmluZ3NcbiAgICAgIHZhciBhcmdUeXBlLCBub2RlcyA9ICQubWFwKGFyZ3VtZW50cywgZnVuY3Rpb24oYXJnKSB7XG4gICAgICAgICAgICBhcmdUeXBlID0gdHlwZShhcmcpXG4gICAgICAgICAgICByZXR1cm4gYXJnVHlwZSA9PSBcIm9iamVjdFwiIHx8IGFyZ1R5cGUgPT0gXCJhcnJheVwiIHx8IGFyZyA9PSBudWxsID9cbiAgICAgICAgICAgICAgYXJnIDogemVwdG8uZnJhZ21lbnQoYXJnKVxuICAgICAgICAgIH0pLFxuICAgICAgICAgIHBhcmVudCwgY29weUJ5Q2xvbmUgPSB0aGlzLmxlbmd0aCA+IDFcbiAgICAgIGlmIChub2Rlcy5sZW5ndGggPCAxKSByZXR1cm4gdGhpc1xuXG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKF8sIHRhcmdldCl7XG4gICAgICAgIHBhcmVudCA9IGluc2lkZSA/IHRhcmdldCA6IHRhcmdldC5wYXJlbnROb2RlXG5cbiAgICAgICAgLy8gY29udmVydCBhbGwgbWV0aG9kcyB0byBhIFwiYmVmb3JlXCIgb3BlcmF0aW9uXG4gICAgICAgIHRhcmdldCA9IG9wZXJhdG9ySW5kZXggPT0gMCA/IHRhcmdldC5uZXh0U2libGluZyA6XG4gICAgICAgICAgICAgICAgIG9wZXJhdG9ySW5kZXggPT0gMSA/IHRhcmdldC5maXJzdENoaWxkIDpcbiAgICAgICAgICAgICAgICAgb3BlcmF0b3JJbmRleCA9PSAyID8gdGFyZ2V0IDpcbiAgICAgICAgICAgICAgICAgbnVsbFxuXG4gICAgICAgIHZhciBwYXJlbnRJbkRvY3VtZW50ID0gJC5jb250YWlucyhkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsIHBhcmVudClcblxuICAgICAgICBub2Rlcy5mb3JFYWNoKGZ1bmN0aW9uKG5vZGUpe1xuICAgICAgICAgIGlmIChjb3B5QnlDbG9uZSkgbm9kZSA9IG5vZGUuY2xvbmVOb2RlKHRydWUpXG4gICAgICAgICAgZWxzZSBpZiAoIXBhcmVudCkgcmV0dXJuICQobm9kZSkucmVtb3ZlKClcblxuICAgICAgICAgIHBhcmVudC5pbnNlcnRCZWZvcmUobm9kZSwgdGFyZ2V0KVxuICAgICAgICAgIGlmIChwYXJlbnRJbkRvY3VtZW50KSB0cmF2ZXJzZU5vZGUobm9kZSwgZnVuY3Rpb24oZWwpe1xuICAgICAgICAgICAgaWYgKGVsLm5vZGVOYW1lICE9IG51bGwgJiYgZWwubm9kZU5hbWUudG9VcHBlckNhc2UoKSA9PT0gJ1NDUklQVCcgJiZcbiAgICAgICAgICAgICAgICghZWwudHlwZSB8fCBlbC50eXBlID09PSAndGV4dC9qYXZhc2NyaXB0JykgJiYgIWVsLnNyYylcbiAgICAgICAgICAgICAgd2luZG93WydldmFsJ10uY2FsbCh3aW5kb3csIGVsLmlubmVySFRNTClcbiAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9XG5cbiAgICAvLyBhZnRlciAgICA9PiBpbnNlcnRBZnRlclxuICAgIC8vIHByZXBlbmQgID0+IHByZXBlbmRUb1xuICAgIC8vIGJlZm9yZSAgID0+IGluc2VydEJlZm9yZVxuICAgIC8vIGFwcGVuZCAgID0+IGFwcGVuZFRvXG4gICAgJC5mbltpbnNpZGUgPyBvcGVyYXRvcisnVG8nIDogJ2luc2VydCcrKG9wZXJhdG9ySW5kZXggPyAnQmVmb3JlJyA6ICdBZnRlcicpXSA9IGZ1bmN0aW9uKGh0bWwpe1xuICAgICAgJChodG1sKVtvcGVyYXRvcl0odGhpcylcbiAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuICB9KVxuXG4gIHplcHRvLloucHJvdG90eXBlID0gJC5mblxuXG4gIC8vIEV4cG9ydCBpbnRlcm5hbCBBUEkgZnVuY3Rpb25zIGluIHRoZSBgJC56ZXB0b2AgbmFtZXNwYWNlXG4gIHplcHRvLnVuaXEgPSB1bmlxXG4gIHplcHRvLmRlc2VyaWFsaXplVmFsdWUgPSBkZXNlcmlhbGl6ZVZhbHVlXG4gICQuemVwdG8gPSB6ZXB0b1xuXG4gIHJldHVybiAkXG59KSgpXG5cbndpbmRvdy5aZXB0byA9IFplcHRvXG53aW5kb3cuJCA9PT0gdW5kZWZpbmVkICYmICh3aW5kb3cuJCA9IFplcHRvKVxuXG47KGZ1bmN0aW9uKCQpe1xuICB2YXIgX3ppZCA9IDEsIHVuZGVmaW5lZCxcbiAgICAgIHNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLFxuICAgICAgaXNGdW5jdGlvbiA9ICQuaXNGdW5jdGlvbixcbiAgICAgIGlzU3RyaW5nID0gZnVuY3Rpb24ob2JqKXsgcmV0dXJuIHR5cGVvZiBvYmogPT0gJ3N0cmluZycgfSxcbiAgICAgIGhhbmRsZXJzID0ge30sXG4gICAgICBzcGVjaWFsRXZlbnRzPXt9LFxuICAgICAgZm9jdXNpblN1cHBvcnRlZCA9ICdvbmZvY3VzaW4nIGluIHdpbmRvdyxcbiAgICAgIGZvY3VzID0geyBmb2N1czogJ2ZvY3VzaW4nLCBibHVyOiAnZm9jdXNvdXQnIH0sXG4gICAgICBob3ZlciA9IHsgbW91c2VlbnRlcjogJ21vdXNlb3ZlcicsIG1vdXNlbGVhdmU6ICdtb3VzZW91dCcgfVxuXG4gIHNwZWNpYWxFdmVudHMuY2xpY2sgPSBzcGVjaWFsRXZlbnRzLm1vdXNlZG93biA9IHNwZWNpYWxFdmVudHMubW91c2V1cCA9IHNwZWNpYWxFdmVudHMubW91c2Vtb3ZlID0gJ01vdXNlRXZlbnRzJ1xuXG4gIGZ1bmN0aW9uIHppZChlbGVtZW50KSB7XG4gICAgcmV0dXJuIGVsZW1lbnQuX3ppZCB8fCAoZWxlbWVudC5femlkID0gX3ppZCsrKVxuICB9XG4gIGZ1bmN0aW9uIGZpbmRIYW5kbGVycyhlbGVtZW50LCBldmVudCwgZm4sIHNlbGVjdG9yKSB7XG4gICAgZXZlbnQgPSBwYXJzZShldmVudClcbiAgICBpZiAoZXZlbnQubnMpIHZhciBtYXRjaGVyID0gbWF0Y2hlckZvcihldmVudC5ucylcbiAgICByZXR1cm4gKGhhbmRsZXJzW3ppZChlbGVtZW50KV0gfHwgW10pLmZpbHRlcihmdW5jdGlvbihoYW5kbGVyKSB7XG4gICAgICByZXR1cm4gaGFuZGxlclxuICAgICAgICAmJiAoIWV2ZW50LmUgIHx8IGhhbmRsZXIuZSA9PSBldmVudC5lKVxuICAgICAgICAmJiAoIWV2ZW50Lm5zIHx8IG1hdGNoZXIudGVzdChoYW5kbGVyLm5zKSlcbiAgICAgICAgJiYgKCFmbiAgICAgICB8fCB6aWQoaGFuZGxlci5mbikgPT09IHppZChmbikpXG4gICAgICAgICYmICghc2VsZWN0b3IgfHwgaGFuZGxlci5zZWwgPT0gc2VsZWN0b3IpXG4gICAgfSlcbiAgfVxuICBmdW5jdGlvbiBwYXJzZShldmVudCkge1xuICAgIHZhciBwYXJ0cyA9ICgnJyArIGV2ZW50KS5zcGxpdCgnLicpXG4gICAgcmV0dXJuIHtlOiBwYXJ0c1swXSwgbnM6IHBhcnRzLnNsaWNlKDEpLnNvcnQoKS5qb2luKCcgJyl9XG4gIH1cbiAgZnVuY3Rpb24gbWF0Y2hlckZvcihucykge1xuICAgIHJldHVybiBuZXcgUmVnRXhwKCcoPzpefCApJyArIG5zLnJlcGxhY2UoJyAnLCAnIC4qID8nKSArICcoPzogfCQpJylcbiAgfVxuXG4gIGZ1bmN0aW9uIGV2ZW50Q2FwdHVyZShoYW5kbGVyLCBjYXB0dXJlU2V0dGluZykge1xuICAgIHJldHVybiBoYW5kbGVyLmRlbCAmJlxuICAgICAgKCFmb2N1c2luU3VwcG9ydGVkICYmIChoYW5kbGVyLmUgaW4gZm9jdXMpKSB8fFxuICAgICAgISFjYXB0dXJlU2V0dGluZ1xuICB9XG5cbiAgZnVuY3Rpb24gcmVhbEV2ZW50KHR5cGUpIHtcbiAgICByZXR1cm4gaG92ZXJbdHlwZV0gfHwgKGZvY3VzaW5TdXBwb3J0ZWQgJiYgZm9jdXNbdHlwZV0pIHx8IHR5cGVcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZChlbGVtZW50LCBldmVudHMsIGZuLCBkYXRhLCBzZWxlY3RvciwgZGVsZWdhdG9yLCBjYXB0dXJlKXtcbiAgICB2YXIgaWQgPSB6aWQoZWxlbWVudCksIHNldCA9IChoYW5kbGVyc1tpZF0gfHwgKGhhbmRsZXJzW2lkXSA9IFtdKSlcbiAgICBldmVudHMuc3BsaXQoL1xccy8pLmZvckVhY2goZnVuY3Rpb24oZXZlbnQpe1xuICAgICAgaWYgKGV2ZW50ID09ICdyZWFkeScpIHJldHVybiAkKGRvY3VtZW50KS5yZWFkeShmbilcbiAgICAgIHZhciBoYW5kbGVyICAgPSBwYXJzZShldmVudClcbiAgICAgIGhhbmRsZXIuZm4gICAgPSBmblxuICAgICAgaGFuZGxlci5zZWwgICA9IHNlbGVjdG9yXG4gICAgICAvLyBlbXVsYXRlIG1vdXNlZW50ZXIsIG1vdXNlbGVhdmVcbiAgICAgIGlmIChoYW5kbGVyLmUgaW4gaG92ZXIpIGZuID0gZnVuY3Rpb24oZSl7XG4gICAgICAgIHZhciByZWxhdGVkID0gZS5yZWxhdGVkVGFyZ2V0XG4gICAgICAgIGlmICghcmVsYXRlZCB8fCAocmVsYXRlZCAhPT0gdGhpcyAmJiAhJC5jb250YWlucyh0aGlzLCByZWxhdGVkKSkpXG4gICAgICAgICAgcmV0dXJuIGhhbmRsZXIuZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKVxuICAgICAgfVxuICAgICAgaGFuZGxlci5kZWwgICA9IGRlbGVnYXRvclxuICAgICAgdmFyIGNhbGxiYWNrICA9IGRlbGVnYXRvciB8fCBmblxuICAgICAgaGFuZGxlci5wcm94eSA9IGZ1bmN0aW9uKGUpe1xuICAgICAgICBlID0gY29tcGF0aWJsZShlKVxuICAgICAgICBpZiAoZS5pc0ltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZCgpKSByZXR1cm5cbiAgICAgICAgZS5kYXRhID0gZGF0YVxuICAgICAgICB2YXIgcmVzdWx0ID0gY2FsbGJhY2suYXBwbHkoZWxlbWVudCwgZS5fYXJncyA9PSB1bmRlZmluZWQgPyBbZV0gOiBbZV0uY29uY2F0KGUuX2FyZ3MpKVxuICAgICAgICBpZiAocmVzdWx0ID09PSBmYWxzZSkgZS5wcmV2ZW50RGVmYXVsdCgpLCBlLnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgIHJldHVybiByZXN1bHRcbiAgICAgIH1cbiAgICAgIGhhbmRsZXIuaSA9IHNldC5sZW5ndGhcbiAgICAgIHNldC5wdXNoKGhhbmRsZXIpXG4gICAgICBpZiAoJ2FkZEV2ZW50TGlzdGVuZXInIGluIGVsZW1lbnQpXG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihyZWFsRXZlbnQoaGFuZGxlci5lKSwgaGFuZGxlci5wcm94eSwgZXZlbnRDYXB0dXJlKGhhbmRsZXIsIGNhcHR1cmUpKVxuICAgIH0pXG4gIH1cbiAgZnVuY3Rpb24gcmVtb3ZlKGVsZW1lbnQsIGV2ZW50cywgZm4sIHNlbGVjdG9yLCBjYXB0dXJlKXtcbiAgICB2YXIgaWQgPSB6aWQoZWxlbWVudClcbiAgICA7KGV2ZW50cyB8fCAnJykuc3BsaXQoL1xccy8pLmZvckVhY2goZnVuY3Rpb24oZXZlbnQpe1xuICAgICAgZmluZEhhbmRsZXJzKGVsZW1lbnQsIGV2ZW50LCBmbiwgc2VsZWN0b3IpLmZvckVhY2goZnVuY3Rpb24oaGFuZGxlcil7XG4gICAgICAgIGRlbGV0ZSBoYW5kbGVyc1tpZF1baGFuZGxlci5pXVxuICAgICAgaWYgKCdyZW1vdmVFdmVudExpc3RlbmVyJyBpbiBlbGVtZW50KVxuICAgICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIocmVhbEV2ZW50KGhhbmRsZXIuZSksIGhhbmRsZXIucHJveHksIGV2ZW50Q2FwdHVyZShoYW5kbGVyLCBjYXB0dXJlKSlcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gICQuZXZlbnQgPSB7IGFkZDogYWRkLCByZW1vdmU6IHJlbW92ZSB9XG5cbiAgJC5wcm94eSA9IGZ1bmN0aW9uKGZuLCBjb250ZXh0KSB7XG4gICAgdmFyIGFyZ3MgPSAoMiBpbiBhcmd1bWVudHMpICYmIHNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKVxuICAgIGlmIChpc0Z1bmN0aW9uKGZuKSkge1xuICAgICAgdmFyIHByb3h5Rm4gPSBmdW5jdGlvbigpeyByZXR1cm4gZm4uYXBwbHkoY29udGV4dCwgYXJncyA/IGFyZ3MuY29uY2F0KHNsaWNlLmNhbGwoYXJndW1lbnRzKSkgOiBhcmd1bWVudHMpIH1cbiAgICAgIHByb3h5Rm4uX3ppZCA9IHppZChmbilcbiAgICAgIHJldHVybiBwcm94eUZuXG4gICAgfSBlbHNlIGlmIChpc1N0cmluZyhjb250ZXh0KSkge1xuICAgICAgaWYgKGFyZ3MpIHtcbiAgICAgICAgYXJncy51bnNoaWZ0KGZuW2NvbnRleHRdLCBmbilcbiAgICAgICAgcmV0dXJuICQucHJveHkuYXBwbHkobnVsbCwgYXJncylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiAkLnByb3h5KGZuW2NvbnRleHRdLCBmbilcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImV4cGVjdGVkIGZ1bmN0aW9uXCIpXG4gICAgfVxuICB9XG5cbiAgJC5mbi5iaW5kID0gZnVuY3Rpb24oZXZlbnQsIGRhdGEsIGNhbGxiYWNrKXtcbiAgICByZXR1cm4gdGhpcy5vbihldmVudCwgZGF0YSwgY2FsbGJhY2spXG4gIH1cbiAgJC5mbi51bmJpbmQgPSBmdW5jdGlvbihldmVudCwgY2FsbGJhY2spe1xuICAgIHJldHVybiB0aGlzLm9mZihldmVudCwgY2FsbGJhY2spXG4gIH1cbiAgJC5mbi5vbmUgPSBmdW5jdGlvbihldmVudCwgc2VsZWN0b3IsIGRhdGEsIGNhbGxiYWNrKXtcbiAgICByZXR1cm4gdGhpcy5vbihldmVudCwgc2VsZWN0b3IsIGRhdGEsIGNhbGxiYWNrLCAxKVxuICB9XG5cbiAgdmFyIHJldHVyblRydWUgPSBmdW5jdGlvbigpe3JldHVybiB0cnVlfSxcbiAgICAgIHJldHVybkZhbHNlID0gZnVuY3Rpb24oKXtyZXR1cm4gZmFsc2V9LFxuICAgICAgaWdub3JlUHJvcGVydGllcyA9IC9eKFtBLVpdfHJldHVyblZhbHVlJHxsYXllcltYWV0kKS8sXG4gICAgICBldmVudE1ldGhvZHMgPSB7XG4gICAgICAgIHByZXZlbnREZWZhdWx0OiAnaXNEZWZhdWx0UHJldmVudGVkJyxcbiAgICAgICAgc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uOiAnaXNJbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWQnLFxuICAgICAgICBzdG9wUHJvcGFnYXRpb246ICdpc1Byb3BhZ2F0aW9uU3RvcHBlZCdcbiAgICAgIH1cblxuICBmdW5jdGlvbiBjb21wYXRpYmxlKGV2ZW50LCBzb3VyY2UpIHtcbiAgICBpZiAoc291cmNlIHx8ICFldmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQpIHtcbiAgICAgIHNvdXJjZSB8fCAoc291cmNlID0gZXZlbnQpXG5cbiAgICAgICQuZWFjaChldmVudE1ldGhvZHMsIGZ1bmN0aW9uKG5hbWUsIHByZWRpY2F0ZSkge1xuICAgICAgICB2YXIgc291cmNlTWV0aG9kID0gc291cmNlW25hbWVdXG4gICAgICAgIGV2ZW50W25hbWVdID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICB0aGlzW3ByZWRpY2F0ZV0gPSByZXR1cm5UcnVlXG4gICAgICAgICAgcmV0dXJuIHNvdXJjZU1ldGhvZCAmJiBzb3VyY2VNZXRob2QuYXBwbHkoc291cmNlLCBhcmd1bWVudHMpXG4gICAgICAgIH1cbiAgICAgICAgZXZlbnRbcHJlZGljYXRlXSA9IHJldHVybkZhbHNlXG4gICAgICB9KVxuXG4gICAgICBpZiAoc291cmNlLmRlZmF1bHRQcmV2ZW50ZWQgIT09IHVuZGVmaW5lZCA/IHNvdXJjZS5kZWZhdWx0UHJldmVudGVkIDpcbiAgICAgICAgICAncmV0dXJuVmFsdWUnIGluIHNvdXJjZSA/IHNvdXJjZS5yZXR1cm5WYWx1ZSA9PT0gZmFsc2UgOlxuICAgICAgICAgIHNvdXJjZS5nZXRQcmV2ZW50RGVmYXVsdCAmJiBzb3VyY2UuZ2V0UHJldmVudERlZmF1bHQoKSlcbiAgICAgICAgZXZlbnQuaXNEZWZhdWx0UHJldmVudGVkID0gcmV0dXJuVHJ1ZVxuICAgIH1cbiAgICByZXR1cm4gZXZlbnRcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVByb3h5KGV2ZW50KSB7XG4gICAgdmFyIGtleSwgcHJveHkgPSB7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50IH1cbiAgICBmb3IgKGtleSBpbiBldmVudClcbiAgICAgIGlmICghaWdub3JlUHJvcGVydGllcy50ZXN0KGtleSkgJiYgZXZlbnRba2V5XSAhPT0gdW5kZWZpbmVkKSBwcm94eVtrZXldID0gZXZlbnRba2V5XVxuXG4gICAgcmV0dXJuIGNvbXBhdGlibGUocHJveHksIGV2ZW50KVxuICB9XG5cbiAgJC5mbi5kZWxlZ2F0ZSA9IGZ1bmN0aW9uKHNlbGVjdG9yLCBldmVudCwgY2FsbGJhY2spe1xuICAgIHJldHVybiB0aGlzLm9uKGV2ZW50LCBzZWxlY3RvciwgY2FsbGJhY2spXG4gIH1cbiAgJC5mbi51bmRlbGVnYXRlID0gZnVuY3Rpb24oc2VsZWN0b3IsIGV2ZW50LCBjYWxsYmFjayl7XG4gICAgcmV0dXJuIHRoaXMub2ZmKGV2ZW50LCBzZWxlY3RvciwgY2FsbGJhY2spXG4gIH1cblxuICAkLmZuLmxpdmUgPSBmdW5jdGlvbihldmVudCwgY2FsbGJhY2spe1xuICAgICQoZG9jdW1lbnQuYm9keSkuZGVsZWdhdGUodGhpcy5zZWxlY3RvciwgZXZlbnQsIGNhbGxiYWNrKVxuICAgIHJldHVybiB0aGlzXG4gIH1cbiAgJC5mbi5kaWUgPSBmdW5jdGlvbihldmVudCwgY2FsbGJhY2spe1xuICAgICQoZG9jdW1lbnQuYm9keSkudW5kZWxlZ2F0ZSh0aGlzLnNlbGVjdG9yLCBldmVudCwgY2FsbGJhY2spXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gICQuZm4ub24gPSBmdW5jdGlvbihldmVudCwgc2VsZWN0b3IsIGRhdGEsIGNhbGxiYWNrLCBvbmUpe1xuICAgIHZhciBhdXRvUmVtb3ZlLCBkZWxlZ2F0b3IsICR0aGlzID0gdGhpc1xuICAgIGlmIChldmVudCAmJiAhaXNTdHJpbmcoZXZlbnQpKSB7XG4gICAgICAkLmVhY2goZXZlbnQsIGZ1bmN0aW9uKHR5cGUsIGZuKXtcbiAgICAgICAgJHRoaXMub24odHlwZSwgc2VsZWN0b3IsIGRhdGEsIGZuLCBvbmUpXG4gICAgICB9KVxuICAgICAgcmV0dXJuICR0aGlzXG4gICAgfVxuXG4gICAgaWYgKCFpc1N0cmluZyhzZWxlY3RvcikgJiYgIWlzRnVuY3Rpb24oY2FsbGJhY2spICYmIGNhbGxiYWNrICE9PSBmYWxzZSlcbiAgICAgIGNhbGxiYWNrID0gZGF0YSwgZGF0YSA9IHNlbGVjdG9yLCBzZWxlY3RvciA9IHVuZGVmaW5lZFxuICAgIGlmIChpc0Z1bmN0aW9uKGRhdGEpIHx8IGRhdGEgPT09IGZhbHNlKVxuICAgICAgY2FsbGJhY2sgPSBkYXRhLCBkYXRhID0gdW5kZWZpbmVkXG5cbiAgICBpZiAoY2FsbGJhY2sgPT09IGZhbHNlKSBjYWxsYmFjayA9IHJldHVybkZhbHNlXG5cbiAgICByZXR1cm4gJHRoaXMuZWFjaChmdW5jdGlvbihfLCBlbGVtZW50KXtcbiAgICAgIGlmIChvbmUpIGF1dG9SZW1vdmUgPSBmdW5jdGlvbihlKXtcbiAgICAgICAgcmVtb3ZlKGVsZW1lbnQsIGUudHlwZSwgY2FsbGJhY2spXG4gICAgICAgIHJldHVybiBjYWxsYmFjay5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG4gICAgICB9XG5cbiAgICAgIGlmIChzZWxlY3RvcikgZGVsZWdhdG9yID0gZnVuY3Rpb24oZSl7XG4gICAgICAgIHZhciBldnQsIG1hdGNoID0gJChlLnRhcmdldCkuY2xvc2VzdChzZWxlY3RvciwgZWxlbWVudCkuZ2V0KDApXG4gICAgICAgIGlmIChtYXRjaCAmJiBtYXRjaCAhPT0gZWxlbWVudCkge1xuICAgICAgICAgIGV2dCA9ICQuZXh0ZW5kKGNyZWF0ZVByb3h5KGUpLCB7Y3VycmVudFRhcmdldDogbWF0Y2gsIGxpdmVGaXJlZDogZWxlbWVudH0pXG4gICAgICAgICAgcmV0dXJuIChhdXRvUmVtb3ZlIHx8IGNhbGxiYWNrKS5hcHBseShtYXRjaCwgW2V2dF0uY29uY2F0KHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSkpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgYWRkKGVsZW1lbnQsIGV2ZW50LCBjYWxsYmFjaywgZGF0YSwgc2VsZWN0b3IsIGRlbGVnYXRvciB8fCBhdXRvUmVtb3ZlKVxuICAgIH0pXG4gIH1cbiAgJC5mbi5vZmYgPSBmdW5jdGlvbihldmVudCwgc2VsZWN0b3IsIGNhbGxiYWNrKXtcbiAgICB2YXIgJHRoaXMgPSB0aGlzXG4gICAgaWYgKGV2ZW50ICYmICFpc1N0cmluZyhldmVudCkpIHtcbiAgICAgICQuZWFjaChldmVudCwgZnVuY3Rpb24odHlwZSwgZm4pe1xuICAgICAgICAkdGhpcy5vZmYodHlwZSwgc2VsZWN0b3IsIGZuKVxuICAgICAgfSlcbiAgICAgIHJldHVybiAkdGhpc1xuICAgIH1cblxuICAgIGlmICghaXNTdHJpbmcoc2VsZWN0b3IpICYmICFpc0Z1bmN0aW9uKGNhbGxiYWNrKSAmJiBjYWxsYmFjayAhPT0gZmFsc2UpXG4gICAgICBjYWxsYmFjayA9IHNlbGVjdG9yLCBzZWxlY3RvciA9IHVuZGVmaW5lZFxuXG4gICAgaWYgKGNhbGxiYWNrID09PSBmYWxzZSkgY2FsbGJhY2sgPSByZXR1cm5GYWxzZVxuXG4gICAgcmV0dXJuICR0aGlzLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgIHJlbW92ZSh0aGlzLCBldmVudCwgY2FsbGJhY2ssIHNlbGVjdG9yKVxuICAgIH0pXG4gIH1cblxuICAkLmZuLnRyaWdnZXIgPSBmdW5jdGlvbihldmVudCwgYXJncyl7XG4gICAgZXZlbnQgPSAoaXNTdHJpbmcoZXZlbnQpIHx8ICQuaXNQbGFpbk9iamVjdChldmVudCkpID8gJC5FdmVudChldmVudCkgOiBjb21wYXRpYmxlKGV2ZW50KVxuICAgIGV2ZW50Ll9hcmdzID0gYXJnc1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgIC8vIGhhbmRsZSBmb2N1cygpLCBibHVyKCkgYnkgY2FsbGluZyB0aGVtIGRpcmVjdGx5XG4gICAgICBpZiAoZXZlbnQudHlwZSBpbiBmb2N1cyAmJiB0eXBlb2YgdGhpc1tldmVudC50eXBlXSA9PSBcImZ1bmN0aW9uXCIpIHRoaXNbZXZlbnQudHlwZV0oKVxuICAgICAgLy8gaXRlbXMgaW4gdGhlIGNvbGxlY3Rpb24gbWlnaHQgbm90IGJlIERPTSBlbGVtZW50c1xuICAgICAgZWxzZSBpZiAoJ2Rpc3BhdGNoRXZlbnQnIGluIHRoaXMpIHRoaXMuZGlzcGF0Y2hFdmVudChldmVudClcbiAgICAgIGVsc2UgJCh0aGlzKS50cmlnZ2VySGFuZGxlcihldmVudCwgYXJncylcbiAgICB9KVxuICB9XG5cbiAgLy8gdHJpZ2dlcnMgZXZlbnQgaGFuZGxlcnMgb24gY3VycmVudCBlbGVtZW50IGp1c3QgYXMgaWYgYW4gZXZlbnQgb2NjdXJyZWQsXG4gIC8vIGRvZXNuJ3QgdHJpZ2dlciBhbiBhY3R1YWwgZXZlbnQsIGRvZXNuJ3QgYnViYmxlXG4gICQuZm4udHJpZ2dlckhhbmRsZXIgPSBmdW5jdGlvbihldmVudCwgYXJncyl7XG4gICAgdmFyIGUsIHJlc3VsdFxuICAgIHRoaXMuZWFjaChmdW5jdGlvbihpLCBlbGVtZW50KXtcbiAgICAgIGUgPSBjcmVhdGVQcm94eShpc1N0cmluZyhldmVudCkgPyAkLkV2ZW50KGV2ZW50KSA6IGV2ZW50KVxuICAgICAgZS5fYXJncyA9IGFyZ3NcbiAgICAgIGUudGFyZ2V0ID0gZWxlbWVudFxuICAgICAgJC5lYWNoKGZpbmRIYW5kbGVycyhlbGVtZW50LCBldmVudC50eXBlIHx8IGV2ZW50KSwgZnVuY3Rpb24oaSwgaGFuZGxlcil7XG4gICAgICAgIHJlc3VsdCA9IGhhbmRsZXIucHJveHkoZSlcbiAgICAgICAgaWYgKGUuaXNJbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWQoKSkgcmV0dXJuIGZhbHNlXG4gICAgICB9KVxuICAgIH0pXG4gICAgcmV0dXJuIHJlc3VsdFxuICB9XG5cbiAgLy8gc2hvcnRjdXQgbWV0aG9kcyBmb3IgYC5iaW5kKGV2ZW50LCBmbilgIGZvciBlYWNoIGV2ZW50IHR5cGVcbiAgOygnZm9jdXNpbiBmb2N1c291dCBmb2N1cyBibHVyIGxvYWQgcmVzaXplIHNjcm9sbCB1bmxvYWQgY2xpY2sgZGJsY2xpY2sgJytcbiAgJ21vdXNlZG93biBtb3VzZXVwIG1vdXNlbW92ZSBtb3VzZW92ZXIgbW91c2VvdXQgbW91c2VlbnRlciBtb3VzZWxlYXZlICcrXG4gICdjaGFuZ2Ugc2VsZWN0IGtleWRvd24ga2V5cHJlc3Mga2V5dXAgZXJyb3InKS5zcGxpdCgnICcpLmZvckVhY2goZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAkLmZuW2V2ZW50XSA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICByZXR1cm4gKDAgaW4gYXJndW1lbnRzKSA/XG4gICAgICAgIHRoaXMuYmluZChldmVudCwgY2FsbGJhY2spIDpcbiAgICAgICAgdGhpcy50cmlnZ2VyKGV2ZW50KVxuICAgIH1cbiAgfSlcblxuICAkLkV2ZW50ID0gZnVuY3Rpb24odHlwZSwgcHJvcHMpIHtcbiAgICBpZiAoIWlzU3RyaW5nKHR5cGUpKSBwcm9wcyA9IHR5cGUsIHR5cGUgPSBwcm9wcy50eXBlXG4gICAgdmFyIGV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoc3BlY2lhbEV2ZW50c1t0eXBlXSB8fCAnRXZlbnRzJyksIGJ1YmJsZXMgPSB0cnVlXG4gICAgaWYgKHByb3BzKSBmb3IgKHZhciBuYW1lIGluIHByb3BzKSAobmFtZSA9PSAnYnViYmxlcycpID8gKGJ1YmJsZXMgPSAhIXByb3BzW25hbWVdKSA6IChldmVudFtuYW1lXSA9IHByb3BzW25hbWVdKVxuICAgIGV2ZW50LmluaXRFdmVudCh0eXBlLCBidWJibGVzLCB0cnVlKVxuICAgIHJldHVybiBjb21wYXRpYmxlKGV2ZW50KVxuICB9XG5cbn0pKFplcHRvKVxuXG47KGZ1bmN0aW9uKCQpe1xuICB2YXIganNvbnBJRCA9IDAsXG4gICAgICBkb2N1bWVudCA9IHdpbmRvdy5kb2N1bWVudCxcbiAgICAgIGtleSxcbiAgICAgIG5hbWUsXG4gICAgICByc2NyaXB0ID0gLzxzY3JpcHRcXGJbXjxdKig/Oig/ITxcXC9zY3JpcHQ+KTxbXjxdKikqPFxcL3NjcmlwdD4vZ2ksXG4gICAgICBzY3JpcHRUeXBlUkUgPSAvXig/OnRleHR8YXBwbGljYXRpb24pXFwvamF2YXNjcmlwdC9pLFxuICAgICAgeG1sVHlwZVJFID0gL14oPzp0ZXh0fGFwcGxpY2F0aW9uKVxcL3htbC9pLFxuICAgICAganNvblR5cGUgPSAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICBodG1sVHlwZSA9ICd0ZXh0L2h0bWwnLFxuICAgICAgYmxhbmtSRSA9IC9eXFxzKiQvLFxuICAgICAgb3JpZ2luQW5jaG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpXG5cbiAgb3JpZ2luQW5jaG9yLmhyZWYgPSB3aW5kb3cubG9jYXRpb24uaHJlZlxuXG4gIC8vIHRyaWdnZXIgYSBjdXN0b20gZXZlbnQgYW5kIHJldHVybiBmYWxzZSBpZiBpdCB3YXMgY2FuY2VsbGVkXG4gIGZ1bmN0aW9uIHRyaWdnZXJBbmRSZXR1cm4oY29udGV4dCwgZXZlbnROYW1lLCBkYXRhKSB7XG4gICAgdmFyIGV2ZW50ID0gJC5FdmVudChldmVudE5hbWUpXG4gICAgJChjb250ZXh0KS50cmlnZ2VyKGV2ZW50LCBkYXRhKVxuICAgIHJldHVybiAhZXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKClcbiAgfVxuXG4gIC8vIHRyaWdnZXIgYW4gQWpheCBcImdsb2JhbFwiIGV2ZW50XG4gIGZ1bmN0aW9uIHRyaWdnZXJHbG9iYWwoc2V0dGluZ3MsIGNvbnRleHQsIGV2ZW50TmFtZSwgZGF0YSkge1xuICAgIGlmIChzZXR0aW5ncy5nbG9iYWwpIHJldHVybiB0cmlnZ2VyQW5kUmV0dXJuKGNvbnRleHQgfHwgZG9jdW1lbnQsIGV2ZW50TmFtZSwgZGF0YSlcbiAgfVxuXG4gIC8vIE51bWJlciBvZiBhY3RpdmUgQWpheCByZXF1ZXN0c1xuICAkLmFjdGl2ZSA9IDBcblxuICBmdW5jdGlvbiBhamF4U3RhcnQoc2V0dGluZ3MpIHtcbiAgICBpZiAoc2V0dGluZ3MuZ2xvYmFsICYmICQuYWN0aXZlKysgPT09IDApIHRyaWdnZXJHbG9iYWwoc2V0dGluZ3MsIG51bGwsICdhamF4U3RhcnQnKVxuICB9XG4gIGZ1bmN0aW9uIGFqYXhTdG9wKHNldHRpbmdzKSB7XG4gICAgaWYgKHNldHRpbmdzLmdsb2JhbCAmJiAhKC0tJC5hY3RpdmUpKSB0cmlnZ2VyR2xvYmFsKHNldHRpbmdzLCBudWxsLCAnYWpheFN0b3AnKVxuICB9XG5cbiAgLy8gdHJpZ2dlcnMgYW4gZXh0cmEgZ2xvYmFsIGV2ZW50IFwiYWpheEJlZm9yZVNlbmRcIiB0aGF0J3MgbGlrZSBcImFqYXhTZW5kXCIgYnV0IGNhbmNlbGFibGVcbiAgZnVuY3Rpb24gYWpheEJlZm9yZVNlbmQoeGhyLCBzZXR0aW5ncykge1xuICAgIHZhciBjb250ZXh0ID0gc2V0dGluZ3MuY29udGV4dFxuICAgIGlmIChzZXR0aW5ncy5iZWZvcmVTZW5kLmNhbGwoY29udGV4dCwgeGhyLCBzZXR0aW5ncykgPT09IGZhbHNlIHx8XG4gICAgICAgIHRyaWdnZXJHbG9iYWwoc2V0dGluZ3MsIGNvbnRleHQsICdhamF4QmVmb3JlU2VuZCcsIFt4aHIsIHNldHRpbmdzXSkgPT09IGZhbHNlKVxuICAgICAgcmV0dXJuIGZhbHNlXG5cbiAgICB0cmlnZ2VyR2xvYmFsKHNldHRpbmdzLCBjb250ZXh0LCAnYWpheFNlbmQnLCBbeGhyLCBzZXR0aW5nc10pXG4gIH1cbiAgZnVuY3Rpb24gYWpheFN1Y2Nlc3MoZGF0YSwgeGhyLCBzZXR0aW5ncywgZGVmZXJyZWQpIHtcbiAgICB2YXIgY29udGV4dCA9IHNldHRpbmdzLmNvbnRleHQsIHN0YXR1cyA9ICdzdWNjZXNzJ1xuICAgIHNldHRpbmdzLnN1Y2Nlc3MuY2FsbChjb250ZXh0LCBkYXRhLCBzdGF0dXMsIHhocilcbiAgICBpZiAoZGVmZXJyZWQpIGRlZmVycmVkLnJlc29sdmVXaXRoKGNvbnRleHQsIFtkYXRhLCBzdGF0dXMsIHhocl0pXG4gICAgdHJpZ2dlckdsb2JhbChzZXR0aW5ncywgY29udGV4dCwgJ2FqYXhTdWNjZXNzJywgW3hociwgc2V0dGluZ3MsIGRhdGFdKVxuICAgIGFqYXhDb21wbGV0ZShzdGF0dXMsIHhociwgc2V0dGluZ3MpXG4gIH1cbiAgLy8gdHlwZTogXCJ0aW1lb3V0XCIsIFwiZXJyb3JcIiwgXCJhYm9ydFwiLCBcInBhcnNlcmVycm9yXCJcbiAgZnVuY3Rpb24gYWpheEVycm9yKGVycm9yLCB0eXBlLCB4aHIsIHNldHRpbmdzLCBkZWZlcnJlZCkge1xuICAgIHZhciBjb250ZXh0ID0gc2V0dGluZ3MuY29udGV4dFxuICAgIHNldHRpbmdzLmVycm9yLmNhbGwoY29udGV4dCwgeGhyLCB0eXBlLCBlcnJvcilcbiAgICBpZiAoZGVmZXJyZWQpIGRlZmVycmVkLnJlamVjdFdpdGgoY29udGV4dCwgW3hociwgdHlwZSwgZXJyb3JdKVxuICAgIHRyaWdnZXJHbG9iYWwoc2V0dGluZ3MsIGNvbnRleHQsICdhamF4RXJyb3InLCBbeGhyLCBzZXR0aW5ncywgZXJyb3IgfHwgdHlwZV0pXG4gICAgYWpheENvbXBsZXRlKHR5cGUsIHhociwgc2V0dGluZ3MpXG4gIH1cbiAgLy8gc3RhdHVzOiBcInN1Y2Nlc3NcIiwgXCJub3Rtb2RpZmllZFwiLCBcImVycm9yXCIsIFwidGltZW91dFwiLCBcImFib3J0XCIsIFwicGFyc2VyZXJyb3JcIlxuICBmdW5jdGlvbiBhamF4Q29tcGxldGUoc3RhdHVzLCB4aHIsIHNldHRpbmdzKSB7XG4gICAgdmFyIGNvbnRleHQgPSBzZXR0aW5ncy5jb250ZXh0XG4gICAgc2V0dGluZ3MuY29tcGxldGUuY2FsbChjb250ZXh0LCB4aHIsIHN0YXR1cylcbiAgICB0cmlnZ2VyR2xvYmFsKHNldHRpbmdzLCBjb250ZXh0LCAnYWpheENvbXBsZXRlJywgW3hociwgc2V0dGluZ3NdKVxuICAgIGFqYXhTdG9wKHNldHRpbmdzKVxuICB9XG5cbiAgLy8gRW1wdHkgZnVuY3Rpb24sIHVzZWQgYXMgZGVmYXVsdCBjYWxsYmFja1xuICBmdW5jdGlvbiBlbXB0eSgpIHt9XG5cbiAgJC5hamF4SlNPTlAgPSBmdW5jdGlvbihvcHRpb25zLCBkZWZlcnJlZCl7XG4gICAgaWYgKCEoJ3R5cGUnIGluIG9wdGlvbnMpKSByZXR1cm4gJC5hamF4KG9wdGlvbnMpXG5cbiAgICB2YXIgX2NhbGxiYWNrTmFtZSA9IG9wdGlvbnMuanNvbnBDYWxsYmFjayxcbiAgICAgIGNhbGxiYWNrTmFtZSA9ICgkLmlzRnVuY3Rpb24oX2NhbGxiYWNrTmFtZSkgP1xuICAgICAgICBfY2FsbGJhY2tOYW1lKCkgOiBfY2FsbGJhY2tOYW1lKSB8fCAoJ2pzb25wJyArICgrK2pzb25wSUQpKSxcbiAgICAgIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpLFxuICAgICAgb3JpZ2luYWxDYWxsYmFjayA9IHdpbmRvd1tjYWxsYmFja05hbWVdLFxuICAgICAgcmVzcG9uc2VEYXRhLFxuICAgICAgYWJvcnQgPSBmdW5jdGlvbihlcnJvclR5cGUpIHtcbiAgICAgICAgJChzY3JpcHQpLnRyaWdnZXJIYW5kbGVyKCdlcnJvcicsIGVycm9yVHlwZSB8fCAnYWJvcnQnKVxuICAgICAgfSxcbiAgICAgIHhociA9IHsgYWJvcnQ6IGFib3J0IH0sIGFib3J0VGltZW91dFxuXG4gICAgaWYgKGRlZmVycmVkKSBkZWZlcnJlZC5wcm9taXNlKHhocilcblxuICAgICQoc2NyaXB0KS5vbignbG9hZCBlcnJvcicsIGZ1bmN0aW9uKGUsIGVycm9yVHlwZSl7XG4gICAgICBjbGVhclRpbWVvdXQoYWJvcnRUaW1lb3V0KVxuICAgICAgJChzY3JpcHQpLm9mZigpLnJlbW92ZSgpXG5cbiAgICAgIGlmIChlLnR5cGUgPT0gJ2Vycm9yJyB8fCAhcmVzcG9uc2VEYXRhKSB7XG4gICAgICAgIGFqYXhFcnJvcihudWxsLCBlcnJvclR5cGUgfHwgJ2Vycm9yJywgeGhyLCBvcHRpb25zLCBkZWZlcnJlZClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFqYXhTdWNjZXNzKHJlc3BvbnNlRGF0YVswXSwgeGhyLCBvcHRpb25zLCBkZWZlcnJlZClcbiAgICAgIH1cblxuICAgICAgd2luZG93W2NhbGxiYWNrTmFtZV0gPSBvcmlnaW5hbENhbGxiYWNrXG4gICAgICBpZiAocmVzcG9uc2VEYXRhICYmICQuaXNGdW5jdGlvbihvcmlnaW5hbENhbGxiYWNrKSlcbiAgICAgICAgb3JpZ2luYWxDYWxsYmFjayhyZXNwb25zZURhdGFbMF0pXG5cbiAgICAgIG9yaWdpbmFsQ2FsbGJhY2sgPSByZXNwb25zZURhdGEgPSB1bmRlZmluZWRcbiAgICB9KVxuXG4gICAgaWYgKGFqYXhCZWZvcmVTZW5kKHhociwgb3B0aW9ucykgPT09IGZhbHNlKSB7XG4gICAgICBhYm9ydCgnYWJvcnQnKVxuICAgICAgcmV0dXJuIHhoclxuICAgIH1cblxuICAgIHdpbmRvd1tjYWxsYmFja05hbWVdID0gZnVuY3Rpb24oKXtcbiAgICAgIHJlc3BvbnNlRGF0YSA9IGFyZ3VtZW50c1xuICAgIH1cblxuICAgIHNjcmlwdC5zcmMgPSBvcHRpb25zLnVybC5yZXBsYWNlKC9cXD8oLispPVxcPy8sICc/JDE9JyArIGNhbGxiYWNrTmFtZSlcbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdClcblxuICAgIGlmIChvcHRpb25zLnRpbWVvdXQgPiAwKSBhYm9ydFRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICBhYm9ydCgndGltZW91dCcpXG4gICAgfSwgb3B0aW9ucy50aW1lb3V0KVxuXG4gICAgcmV0dXJuIHhoclxuICB9XG5cbiAgJC5hamF4U2V0dGluZ3MgPSB7XG4gICAgLy8gRGVmYXVsdCB0eXBlIG9mIHJlcXVlc3RcbiAgICB0eXBlOiAnR0VUJyxcbiAgICAvLyBDYWxsYmFjayB0aGF0IGlzIGV4ZWN1dGVkIGJlZm9yZSByZXF1ZXN0XG4gICAgYmVmb3JlU2VuZDogZW1wdHksXG4gICAgLy8gQ2FsbGJhY2sgdGhhdCBpcyBleGVjdXRlZCBpZiB0aGUgcmVxdWVzdCBzdWNjZWVkc1xuICAgIHN1Y2Nlc3M6IGVtcHR5LFxuICAgIC8vIENhbGxiYWNrIHRoYXQgaXMgZXhlY3V0ZWQgdGhlIHRoZSBzZXJ2ZXIgZHJvcHMgZXJyb3JcbiAgICBlcnJvcjogZW1wdHksXG4gICAgLy8gQ2FsbGJhY2sgdGhhdCBpcyBleGVjdXRlZCBvbiByZXF1ZXN0IGNvbXBsZXRlIChib3RoOiBlcnJvciBhbmQgc3VjY2VzcylcbiAgICBjb21wbGV0ZTogZW1wdHksXG4gICAgLy8gVGhlIGNvbnRleHQgZm9yIHRoZSBjYWxsYmFja3NcbiAgICBjb250ZXh0OiBudWxsLFxuICAgIC8vIFdoZXRoZXIgdG8gdHJpZ2dlciBcImdsb2JhbFwiIEFqYXggZXZlbnRzXG4gICAgZ2xvYmFsOiB0cnVlLFxuICAgIC8vIFRyYW5zcG9ydFxuICAgIHhocjogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIG5ldyB3aW5kb3cuWE1MSHR0cFJlcXVlc3QoKVxuICAgIH0sXG4gICAgLy8gTUlNRSB0eXBlcyBtYXBwaW5nXG4gICAgLy8gSUlTIHJldHVybnMgSmF2YXNjcmlwdCBhcyBcImFwcGxpY2F0aW9uL3gtamF2YXNjcmlwdFwiXG4gICAgYWNjZXB0czoge1xuICAgICAgc2NyaXB0OiAndGV4dC9qYXZhc2NyaXB0LCBhcHBsaWNhdGlvbi9qYXZhc2NyaXB0LCBhcHBsaWNhdGlvbi94LWphdmFzY3JpcHQnLFxuICAgICAganNvbjogICBqc29uVHlwZSxcbiAgICAgIHhtbDogICAgJ2FwcGxpY2F0aW9uL3htbCwgdGV4dC94bWwnLFxuICAgICAgaHRtbDogICBodG1sVHlwZSxcbiAgICAgIHRleHQ6ICAgJ3RleHQvcGxhaW4nXG4gICAgfSxcbiAgICAvLyBXaGV0aGVyIHRoZSByZXF1ZXN0IGlzIHRvIGFub3RoZXIgZG9tYWluXG4gICAgY3Jvc3NEb21haW46IGZhbHNlLFxuICAgIC8vIERlZmF1bHQgdGltZW91dFxuICAgIHRpbWVvdXQ6IDAsXG4gICAgLy8gV2hldGhlciBkYXRhIHNob3VsZCBiZSBzZXJpYWxpemVkIHRvIHN0cmluZ1xuICAgIHByb2Nlc3NEYXRhOiB0cnVlLFxuICAgIC8vIFdoZXRoZXIgdGhlIGJyb3dzZXIgc2hvdWxkIGJlIGFsbG93ZWQgdG8gY2FjaGUgR0VUIHJlc3BvbnNlc1xuICAgIGNhY2hlOiB0cnVlXG4gIH1cblxuICBmdW5jdGlvbiBtaW1lVG9EYXRhVHlwZShtaW1lKSB7XG4gICAgaWYgKG1pbWUpIG1pbWUgPSBtaW1lLnNwbGl0KCc7JywgMilbMF1cbiAgICByZXR1cm4gbWltZSAmJiAoIG1pbWUgPT0gaHRtbFR5cGUgPyAnaHRtbCcgOlxuICAgICAgbWltZSA9PSBqc29uVHlwZSA/ICdqc29uJyA6XG4gICAgICBzY3JpcHRUeXBlUkUudGVzdChtaW1lKSA/ICdzY3JpcHQnIDpcbiAgICAgIHhtbFR5cGVSRS50ZXN0KG1pbWUpICYmICd4bWwnICkgfHwgJ3RleHQnXG4gIH1cblxuICBmdW5jdGlvbiBhcHBlbmRRdWVyeSh1cmwsIHF1ZXJ5KSB7XG4gICAgaWYgKHF1ZXJ5ID09ICcnKSByZXR1cm4gdXJsXG4gICAgcmV0dXJuICh1cmwgKyAnJicgKyBxdWVyeSkucmVwbGFjZSgvWyY/XXsxLDJ9LywgJz8nKVxuICB9XG5cbiAgLy8gc2VyaWFsaXplIHBheWxvYWQgYW5kIGFwcGVuZCBpdCB0byB0aGUgVVJMIGZvciBHRVQgcmVxdWVzdHNcbiAgZnVuY3Rpb24gc2VyaWFsaXplRGF0YShvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMucHJvY2Vzc0RhdGEgJiYgb3B0aW9ucy5kYXRhICYmICQudHlwZShvcHRpb25zLmRhdGEpICE9IFwic3RyaW5nXCIpXG4gICAgICBvcHRpb25zLmRhdGEgPSAkLnBhcmFtKG9wdGlvbnMuZGF0YSwgb3B0aW9ucy50cmFkaXRpb25hbClcbiAgICBpZiAob3B0aW9ucy5kYXRhICYmICghb3B0aW9ucy50eXBlIHx8IG9wdGlvbnMudHlwZS50b1VwcGVyQ2FzZSgpID09ICdHRVQnKSlcbiAgICAgIG9wdGlvbnMudXJsID0gYXBwZW5kUXVlcnkob3B0aW9ucy51cmwsIG9wdGlvbnMuZGF0YSksIG9wdGlvbnMuZGF0YSA9IHVuZGVmaW5lZFxuICB9XG5cbiAgJC5hamF4ID0gZnVuY3Rpb24ob3B0aW9ucyl7XG4gICAgdmFyIHNldHRpbmdzID0gJC5leHRlbmQoe30sIG9wdGlvbnMgfHwge30pLFxuICAgICAgICBkZWZlcnJlZCA9ICQuRGVmZXJyZWQgJiYgJC5EZWZlcnJlZCgpLFxuICAgICAgICB1cmxBbmNob3JcbiAgICBmb3IgKGtleSBpbiAkLmFqYXhTZXR0aW5ncykgaWYgKHNldHRpbmdzW2tleV0gPT09IHVuZGVmaW5lZCkgc2V0dGluZ3Nba2V5XSA9ICQuYWpheFNldHRpbmdzW2tleV1cblxuICAgIGFqYXhTdGFydChzZXR0aW5ncylcblxuICAgIGlmICghc2V0dGluZ3MuY3Jvc3NEb21haW4pIHtcbiAgICAgIHVybEFuY2hvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKVxuICAgICAgdXJsQW5jaG9yLmhyZWYgPSBzZXR0aW5ncy51cmxcbiAgICAgIHVybEFuY2hvci5ocmVmID0gdXJsQW5jaG9yLmhyZWZcbiAgICAgIHNldHRpbmdzLmNyb3NzRG9tYWluID0gKG9yaWdpbkFuY2hvci5wcm90b2NvbCArICcvLycgKyBvcmlnaW5BbmNob3IuaG9zdCkgIT09ICh1cmxBbmNob3IucHJvdG9jb2wgKyAnLy8nICsgdXJsQW5jaG9yLmhvc3QpXG4gICAgfVxuXG4gICAgaWYgKCFzZXR0aW5ncy51cmwpIHNldHRpbmdzLnVybCA9IHdpbmRvdy5sb2NhdGlvbi50b1N0cmluZygpXG4gICAgc2VyaWFsaXplRGF0YShzZXR0aW5ncylcblxuICAgIHZhciBkYXRhVHlwZSA9IHNldHRpbmdzLmRhdGFUeXBlLCBoYXNQbGFjZWhvbGRlciA9IC9cXD8uKz1cXD8vLnRlc3Qoc2V0dGluZ3MudXJsKVxuICAgIGlmIChoYXNQbGFjZWhvbGRlcikgZGF0YVR5cGUgPSAnanNvbnAnXG5cbiAgICBpZiAoc2V0dGluZ3MuY2FjaGUgPT09IGZhbHNlIHx8IChcbiAgICAgICAgICghb3B0aW9ucyB8fCBvcHRpb25zLmNhY2hlICE9PSB0cnVlKSAmJlxuICAgICAgICAgKCdzY3JpcHQnID09IGRhdGFUeXBlIHx8ICdqc29ucCcgPT0gZGF0YVR5cGUpXG4gICAgICAgICkpXG4gICAgICBzZXR0aW5ncy51cmwgPSBhcHBlbmRRdWVyeShzZXR0aW5ncy51cmwsICdfPScgKyBEYXRlLm5vdygpKVxuXG4gICAgaWYgKCdqc29ucCcgPT0gZGF0YVR5cGUpIHtcbiAgICAgIGlmICghaGFzUGxhY2Vob2xkZXIpXG4gICAgICAgIHNldHRpbmdzLnVybCA9IGFwcGVuZFF1ZXJ5KHNldHRpbmdzLnVybCxcbiAgICAgICAgICBzZXR0aW5ncy5qc29ucCA/IChzZXR0aW5ncy5qc29ucCArICc9PycpIDogc2V0dGluZ3MuanNvbnAgPT09IGZhbHNlID8gJycgOiAnY2FsbGJhY2s9PycpXG4gICAgICByZXR1cm4gJC5hamF4SlNPTlAoc2V0dGluZ3MsIGRlZmVycmVkKVxuICAgIH1cblxuICAgIHZhciBtaW1lID0gc2V0dGluZ3MuYWNjZXB0c1tkYXRhVHlwZV0sXG4gICAgICAgIGhlYWRlcnMgPSB7IH0sXG4gICAgICAgIHNldEhlYWRlciA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7IGhlYWRlcnNbbmFtZS50b0xvd2VyQ2FzZSgpXSA9IFtuYW1lLCB2YWx1ZV0gfSxcbiAgICAgICAgcHJvdG9jb2wgPSAvXihbXFx3LV0rOilcXC9cXC8vLnRlc3Qoc2V0dGluZ3MudXJsKSA/IFJlZ0V4cC4kMSA6IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCxcbiAgICAgICAgeGhyID0gc2V0dGluZ3MueGhyKCksXG4gICAgICAgIG5hdGl2ZVNldEhlYWRlciA9IHhoci5zZXRSZXF1ZXN0SGVhZGVyLFxuICAgICAgICBhYm9ydFRpbWVvdXRcblxuICAgIGlmIChkZWZlcnJlZCkgZGVmZXJyZWQucHJvbWlzZSh4aHIpXG5cbiAgICBpZiAoIXNldHRpbmdzLmNyb3NzRG9tYWluKSBzZXRIZWFkZXIoJ1gtUmVxdWVzdGVkLVdpdGgnLCAnWE1MSHR0cFJlcXVlc3QnKVxuICAgIHNldEhlYWRlcignQWNjZXB0JywgbWltZSB8fCAnKi8qJylcbiAgICBpZiAobWltZSA9IHNldHRpbmdzLm1pbWVUeXBlIHx8IG1pbWUpIHtcbiAgICAgIGlmIChtaW1lLmluZGV4T2YoJywnKSA+IC0xKSBtaW1lID0gbWltZS5zcGxpdCgnLCcsIDIpWzBdXG4gICAgICB4aHIub3ZlcnJpZGVNaW1lVHlwZSAmJiB4aHIub3ZlcnJpZGVNaW1lVHlwZShtaW1lKVxuICAgIH1cbiAgICBpZiAoc2V0dGluZ3MuY29udGVudFR5cGUgfHwgKHNldHRpbmdzLmNvbnRlbnRUeXBlICE9PSBmYWxzZSAmJiBzZXR0aW5ncy5kYXRhICYmIHNldHRpbmdzLnR5cGUudG9VcHBlckNhc2UoKSAhPSAnR0VUJykpXG4gICAgICBzZXRIZWFkZXIoJ0NvbnRlbnQtVHlwZScsIHNldHRpbmdzLmNvbnRlbnRUeXBlIHx8ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnKVxuXG4gICAgaWYgKHNldHRpbmdzLmhlYWRlcnMpIGZvciAobmFtZSBpbiBzZXR0aW5ncy5oZWFkZXJzKSBzZXRIZWFkZXIobmFtZSwgc2V0dGluZ3MuaGVhZGVyc1tuYW1lXSlcbiAgICB4aHIuc2V0UmVxdWVzdEhlYWRlciA9IHNldEhlYWRlclxuXG4gICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCl7XG4gICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT0gNCkge1xuICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZW1wdHlcbiAgICAgICAgY2xlYXJUaW1lb3V0KGFib3J0VGltZW91dClcbiAgICAgICAgdmFyIHJlc3VsdCwgZXJyb3IgPSBmYWxzZVxuICAgICAgICBpZiAoKHhoci5zdGF0dXMgPj0gMjAwICYmIHhoci5zdGF0dXMgPCAzMDApIHx8IHhoci5zdGF0dXMgPT0gMzA0IHx8ICh4aHIuc3RhdHVzID09IDAgJiYgcHJvdG9jb2wgPT0gJ2ZpbGU6JykpIHtcbiAgICAgICAgICBkYXRhVHlwZSA9IGRhdGFUeXBlIHx8IG1pbWVUb0RhdGFUeXBlKHNldHRpbmdzLm1pbWVUeXBlIHx8IHhoci5nZXRSZXNwb25zZUhlYWRlcignY29udGVudC10eXBlJykpXG4gICAgICAgICAgcmVzdWx0ID0geGhyLnJlc3BvbnNlVGV4dFxuXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIGh0dHA6Ly9wZXJmZWN0aW9ua2lsbHMuY29tL2dsb2JhbC1ldmFsLXdoYXQtYXJlLXRoZS1vcHRpb25zL1xuICAgICAgICAgICAgaWYgKGRhdGFUeXBlID09ICdzY3JpcHQnKSAgICAoMSxldmFsKShyZXN1bHQpXG4gICAgICAgICAgICBlbHNlIGlmIChkYXRhVHlwZSA9PSAneG1sJykgIHJlc3VsdCA9IHhoci5yZXNwb25zZVhNTFxuICAgICAgICAgICAgZWxzZSBpZiAoZGF0YVR5cGUgPT0gJ2pzb24nKSByZXN1bHQgPSBibGFua1JFLnRlc3QocmVzdWx0KSA/IG51bGwgOiAkLnBhcnNlSlNPTihyZXN1bHQpXG4gICAgICAgICAgfSBjYXRjaCAoZSkgeyBlcnJvciA9IGUgfVxuXG4gICAgICAgICAgaWYgKGVycm9yKSBhamF4RXJyb3IoZXJyb3IsICdwYXJzZXJlcnJvcicsIHhociwgc2V0dGluZ3MsIGRlZmVycmVkKVxuICAgICAgICAgIGVsc2UgYWpheFN1Y2Nlc3MocmVzdWx0LCB4aHIsIHNldHRpbmdzLCBkZWZlcnJlZClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhamF4RXJyb3IoeGhyLnN0YXR1c1RleHQgfHwgbnVsbCwgeGhyLnN0YXR1cyA/ICdlcnJvcicgOiAnYWJvcnQnLCB4aHIsIHNldHRpbmdzLCBkZWZlcnJlZClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChhamF4QmVmb3JlU2VuZCh4aHIsIHNldHRpbmdzKSA9PT0gZmFsc2UpIHtcbiAgICAgIHhoci5hYm9ydCgpXG4gICAgICBhamF4RXJyb3IobnVsbCwgJ2Fib3J0JywgeGhyLCBzZXR0aW5ncywgZGVmZXJyZWQpXG4gICAgICByZXR1cm4geGhyXG4gICAgfVxuXG4gICAgaWYgKHNldHRpbmdzLnhockZpZWxkcykgZm9yIChuYW1lIGluIHNldHRpbmdzLnhockZpZWxkcykgeGhyW25hbWVdID0gc2V0dGluZ3MueGhyRmllbGRzW25hbWVdXG5cbiAgICB2YXIgYXN5bmMgPSAnYXN5bmMnIGluIHNldHRpbmdzID8gc2V0dGluZ3MuYXN5bmMgOiB0cnVlXG4gICAgeGhyLm9wZW4oc2V0dGluZ3MudHlwZSwgc2V0dGluZ3MudXJsLCBhc3luYywgc2V0dGluZ3MudXNlcm5hbWUsIHNldHRpbmdzLnBhc3N3b3JkKVxuXG4gICAgZm9yIChuYW1lIGluIGhlYWRlcnMpIG5hdGl2ZVNldEhlYWRlci5hcHBseSh4aHIsIGhlYWRlcnNbbmFtZV0pXG5cbiAgICBpZiAoc2V0dGluZ3MudGltZW91dCA+IDApIGFib3J0VGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGVtcHR5XG4gICAgICAgIHhoci5hYm9ydCgpXG4gICAgICAgIGFqYXhFcnJvcihudWxsLCAndGltZW91dCcsIHhociwgc2V0dGluZ3MsIGRlZmVycmVkKVxuICAgICAgfSwgc2V0dGluZ3MudGltZW91dClcblxuICAgIC8vIGF2b2lkIHNlbmRpbmcgZW1wdHkgc3RyaW5nICgjMzE5KVxuICAgIHhoci5zZW5kKHNldHRpbmdzLmRhdGEgPyBzZXR0aW5ncy5kYXRhIDogbnVsbClcbiAgICByZXR1cm4geGhyXG4gIH1cblxuICAvLyBoYW5kbGUgb3B0aW9uYWwgZGF0YS9zdWNjZXNzIGFyZ3VtZW50c1xuICBmdW5jdGlvbiBwYXJzZUFyZ3VtZW50cyh1cmwsIGRhdGEsIHN1Y2Nlc3MsIGRhdGFUeXBlKSB7XG4gICAgaWYgKCQuaXNGdW5jdGlvbihkYXRhKSkgZGF0YVR5cGUgPSBzdWNjZXNzLCBzdWNjZXNzID0gZGF0YSwgZGF0YSA9IHVuZGVmaW5lZFxuICAgIGlmICghJC5pc0Z1bmN0aW9uKHN1Y2Nlc3MpKSBkYXRhVHlwZSA9IHN1Y2Nlc3MsIHN1Y2Nlc3MgPSB1bmRlZmluZWRcbiAgICByZXR1cm4ge1xuICAgICAgdXJsOiB1cmxcbiAgICAsIGRhdGE6IGRhdGFcbiAgICAsIHN1Y2Nlc3M6IHN1Y2Nlc3NcbiAgICAsIGRhdGFUeXBlOiBkYXRhVHlwZVxuICAgIH1cbiAgfVxuXG4gICQuZ2V0ID0gZnVuY3Rpb24oLyogdXJsLCBkYXRhLCBzdWNjZXNzLCBkYXRhVHlwZSAqLyl7XG4gICAgcmV0dXJuICQuYWpheChwYXJzZUFyZ3VtZW50cy5hcHBseShudWxsLCBhcmd1bWVudHMpKVxuICB9XG5cbiAgJC5wb3N0ID0gZnVuY3Rpb24oLyogdXJsLCBkYXRhLCBzdWNjZXNzLCBkYXRhVHlwZSAqLyl7XG4gICAgdmFyIG9wdGlvbnMgPSBwYXJzZUFyZ3VtZW50cy5hcHBseShudWxsLCBhcmd1bWVudHMpXG4gICAgb3B0aW9ucy50eXBlID0gJ1BPU1QnXG4gICAgcmV0dXJuICQuYWpheChvcHRpb25zKVxuICB9XG5cbiAgJC5nZXRKU09OID0gZnVuY3Rpb24oLyogdXJsLCBkYXRhLCBzdWNjZXNzICovKXtcbiAgICB2YXIgb3B0aW9ucyA9IHBhcnNlQXJndW1lbnRzLmFwcGx5KG51bGwsIGFyZ3VtZW50cylcbiAgICBvcHRpb25zLmRhdGFUeXBlID0gJ2pzb24nXG4gICAgcmV0dXJuICQuYWpheChvcHRpb25zKVxuICB9XG5cbiAgJC5mbi5sb2FkID0gZnVuY3Rpb24odXJsLCBkYXRhLCBzdWNjZXNzKXtcbiAgICBpZiAoIXRoaXMubGVuZ3RoKSByZXR1cm4gdGhpc1xuICAgIHZhciBzZWxmID0gdGhpcywgcGFydHMgPSB1cmwuc3BsaXQoL1xccy8pLCBzZWxlY3RvcixcbiAgICAgICAgb3B0aW9ucyA9IHBhcnNlQXJndW1lbnRzKHVybCwgZGF0YSwgc3VjY2VzcyksXG4gICAgICAgIGNhbGxiYWNrID0gb3B0aW9ucy5zdWNjZXNzXG4gICAgaWYgKHBhcnRzLmxlbmd0aCA+IDEpIG9wdGlvbnMudXJsID0gcGFydHNbMF0sIHNlbGVjdG9yID0gcGFydHNbMV1cbiAgICBvcHRpb25zLnN1Y2Nlc3MgPSBmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgICBzZWxmLmh0bWwoc2VsZWN0b3IgP1xuICAgICAgICAkKCc8ZGl2PicpLmh0bWwocmVzcG9uc2UucmVwbGFjZShyc2NyaXB0LCBcIlwiKSkuZmluZChzZWxlY3RvcilcbiAgICAgICAgOiByZXNwb25zZSlcbiAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrLmFwcGx5KHNlbGYsIGFyZ3VtZW50cylcbiAgICB9XG4gICAgJC5hamF4KG9wdGlvbnMpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHZhciBlc2NhcGUgPSBlbmNvZGVVUklDb21wb25lbnRcblxuICBmdW5jdGlvbiBzZXJpYWxpemUocGFyYW1zLCBvYmosIHRyYWRpdGlvbmFsLCBzY29wZSl7XG4gICAgdmFyIHR5cGUsIGFycmF5ID0gJC5pc0FycmF5KG9iaiksIGhhc2ggPSAkLmlzUGxhaW5PYmplY3Qob2JqKVxuICAgICQuZWFjaChvYmosIGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbiAgICAgIHR5cGUgPSAkLnR5cGUodmFsdWUpXG4gICAgICBpZiAoc2NvcGUpIGtleSA9IHRyYWRpdGlvbmFsID8gc2NvcGUgOlxuICAgICAgICBzY29wZSArICdbJyArIChoYXNoIHx8IHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnYXJyYXknID8ga2V5IDogJycpICsgJ10nXG4gICAgICAvLyBoYW5kbGUgZGF0YSBpbiBzZXJpYWxpemVBcnJheSgpIGZvcm1hdFxuICAgICAgaWYgKCFzY29wZSAmJiBhcnJheSkgcGFyYW1zLmFkZCh2YWx1ZS5uYW1lLCB2YWx1ZS52YWx1ZSlcbiAgICAgIC8vIHJlY3Vyc2UgaW50byBuZXN0ZWQgb2JqZWN0c1xuICAgICAgZWxzZSBpZiAodHlwZSA9PSBcImFycmF5XCIgfHwgKCF0cmFkaXRpb25hbCAmJiB0eXBlID09IFwib2JqZWN0XCIpKVxuICAgICAgICBzZXJpYWxpemUocGFyYW1zLCB2YWx1ZSwgdHJhZGl0aW9uYWwsIGtleSlcbiAgICAgIGVsc2UgcGFyYW1zLmFkZChrZXksIHZhbHVlKVxuICAgIH0pXG4gIH1cblxuICAkLnBhcmFtID0gZnVuY3Rpb24ob2JqLCB0cmFkaXRpb25hbCl7XG4gICAgdmFyIHBhcmFtcyA9IFtdXG4gICAgcGFyYW1zLmFkZCA9IGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbiAgICAgIGlmICgkLmlzRnVuY3Rpb24odmFsdWUpKSB2YWx1ZSA9IHZhbHVlKClcbiAgICAgIGlmICh2YWx1ZSA9PSBudWxsKSB2YWx1ZSA9IFwiXCJcbiAgICAgIHRoaXMucHVzaChlc2NhcGUoa2V5KSArICc9JyArIGVzY2FwZSh2YWx1ZSkpXG4gICAgfVxuICAgIHNlcmlhbGl6ZShwYXJhbXMsIG9iaiwgdHJhZGl0aW9uYWwpXG4gICAgcmV0dXJuIHBhcmFtcy5qb2luKCcmJykucmVwbGFjZSgvJTIwL2csICcrJylcbiAgfVxufSkoWmVwdG8pXG5cbjsoZnVuY3Rpb24oJCl7XG4gICQuZm4uc2VyaWFsaXplQXJyYXkgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgbmFtZSwgdHlwZSwgcmVzdWx0ID0gW10sXG4gICAgICBhZGQgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUuZm9yRWFjaCkgcmV0dXJuIHZhbHVlLmZvckVhY2goYWRkKVxuICAgICAgICByZXN1bHQucHVzaCh7IG5hbWU6IG5hbWUsIHZhbHVlOiB2YWx1ZSB9KVxuICAgICAgfVxuICAgIGlmICh0aGlzWzBdKSAkLmVhY2godGhpc1swXS5lbGVtZW50cywgZnVuY3Rpb24oXywgZmllbGQpe1xuICAgICAgdHlwZSA9IGZpZWxkLnR5cGUsIG5hbWUgPSBmaWVsZC5uYW1lXG4gICAgICBpZiAobmFtZSAmJiBmaWVsZC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpICE9ICdmaWVsZHNldCcgJiZcbiAgICAgICAgIWZpZWxkLmRpc2FibGVkICYmIHR5cGUgIT0gJ3N1Ym1pdCcgJiYgdHlwZSAhPSAncmVzZXQnICYmIHR5cGUgIT0gJ2J1dHRvbicgJiYgdHlwZSAhPSAnZmlsZScgJiZcbiAgICAgICAgKCh0eXBlICE9ICdyYWRpbycgJiYgdHlwZSAhPSAnY2hlY2tib3gnKSB8fCBmaWVsZC5jaGVja2VkKSlcbiAgICAgICAgICBhZGQoJChmaWVsZCkudmFsKCkpXG4gICAgfSlcbiAgICByZXR1cm4gcmVzdWx0XG4gIH1cblxuICAkLmZuLnNlcmlhbGl6ZSA9IGZ1bmN0aW9uKCl7XG4gICAgdmFyIHJlc3VsdCA9IFtdXG4gICAgdGhpcy5zZXJpYWxpemVBcnJheSgpLmZvckVhY2goZnVuY3Rpb24oZWxtKXtcbiAgICAgIHJlc3VsdC5wdXNoKGVuY29kZVVSSUNvbXBvbmVudChlbG0ubmFtZSkgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQoZWxtLnZhbHVlKSlcbiAgICB9KVxuICAgIHJldHVybiByZXN1bHQuam9pbignJicpXG4gIH1cblxuICAkLmZuLnN1Ym1pdCA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgaWYgKDAgaW4gYXJndW1lbnRzKSB0aGlzLmJpbmQoJ3N1Ym1pdCcsIGNhbGxiYWNrKVxuICAgIGVsc2UgaWYgKHRoaXMubGVuZ3RoKSB7XG4gICAgICB2YXIgZXZlbnQgPSAkLkV2ZW50KCdzdWJtaXQnKVxuICAgICAgdGhpcy5lcSgwKS50cmlnZ2VyKGV2ZW50KVxuICAgICAgaWYgKCFldmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkgdGhpcy5nZXQoMCkuc3VibWl0KClcbiAgICB9XG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG59KShaZXB0bylcblxuOyhmdW5jdGlvbigkKXtcbiAgLy8gX19wcm90b19fIGRvZXNuJ3QgZXhpc3Qgb24gSUU8MTEsIHNvIHJlZGVmaW5lXG4gIC8vIHRoZSBaIGZ1bmN0aW9uIHRvIHVzZSBvYmplY3QgZXh0ZW5zaW9uIGluc3RlYWRcbiAgaWYgKCEoJ19fcHJvdG9fXycgaW4ge30pKSB7XG4gICAgJC5leHRlbmQoJC56ZXB0bywge1xuICAgICAgWjogZnVuY3Rpb24oZG9tLCBzZWxlY3Rvcil7XG4gICAgICAgIGRvbSA9IGRvbSB8fCBbXVxuICAgICAgICAkLmV4dGVuZChkb20sICQuZm4pXG4gICAgICAgIGRvbS5zZWxlY3RvciA9IHNlbGVjdG9yIHx8ICcnXG4gICAgICAgIGRvbS5fX1ogPSB0cnVlXG4gICAgICAgIHJldHVybiBkb21cbiAgICAgIH0sXG4gICAgICAvLyB0aGlzIGlzIGEga2x1ZGdlIGJ1dCB3b3Jrc1xuICAgICAgaXNaOiBmdW5jdGlvbihvYmplY3Qpe1xuICAgICAgICByZXR1cm4gJC50eXBlKG9iamVjdCkgPT09ICdhcnJheScgJiYgJ19fWicgaW4gb2JqZWN0XG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIC8vIGdldENvbXB1dGVkU3R5bGUgc2hvdWxkbid0IGZyZWFrIG91dCB3aGVuIGNhbGxlZFxuICAvLyB3aXRob3V0IGEgdmFsaWQgZWxlbWVudCBhcyBhcmd1bWVudFxuICB0cnkge1xuICAgIGdldENvbXB1dGVkU3R5bGUodW5kZWZpbmVkKVxuICB9IGNhdGNoKGUpIHtcbiAgICB2YXIgbmF0aXZlR2V0Q29tcHV0ZWRTdHlsZSA9IGdldENvbXB1dGVkU3R5bGU7XG4gICAgd2luZG93LmdldENvbXB1dGVkU3R5bGUgPSBmdW5jdGlvbihlbGVtZW50KXtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBuYXRpdmVHZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpXG4gICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgIH1cbiAgICB9XG4gIH1cbn0pKFplcHRvKVxuXG4iXX0=
},{}]},{},[1])