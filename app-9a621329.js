/*! For license information please see app-9a621329.js.LICENSE.txt */
  export default function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) { return typeof obj; };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype
          ? "symbol"
          : typeof obj;
      };
    }

    return _typeof(obj);
  }
`,s.jsx=a("7.0.0-beta.0")`
  var REACT_ELEMENT_TYPE;

  export default function _createRawReactElement(type, props, key, children) {
    if (!REACT_ELEMENT_TYPE) {
      REACT_ELEMENT_TYPE = (
        typeof Symbol === "function" && Symbol["for"] && Symbol["for"]("react.element")
      ) || 0xeac7;
    }

    var defaultProps = type && type.defaultProps;
    var childrenLength = arguments.length - 3;

    if (!props && childrenLength !== 0) {
      // If we're going to assign props.children, we create a new object now
      // to avoid mutating defaultProps.
      props = {
        children: void 0,
      };
    }

    if (childrenLength === 1) {
      props.children = children;
    } else if (childrenLength > 1) {
      var childArray = new Array(childrenLength);
      for (var i = 0; i < childrenLength; i++) {
        childArray[i] = arguments[i + 3];
      }
      props.children = childArray;
    }

    if (props && defaultProps) {
      for (var propName in defaultProps) {
        if (props[propName] === void 0) {
          props[propName] = defaultProps[propName];
        }
      }
    } else if (!props) {
      props = defaultProps || {};
    }

    return {
      $$typeof: REACT_ELEMENT_TYPE,
      type: type,
      key: key === undefined ? null : '' + key,
      ref: null,
      props: props,
      _owner: null,
    };
  }
`,s.asyncIterator=a("7.0.0-beta.0")`
  export default function _asyncIterator(iterable) {
    var method
    if (typeof Symbol !== "undefined") {
      if (Symbol.asyncIterator) {
        method = iterable[Symbol.asyncIterator]
        if (method != null) return method.call(iterable);
      }
      if (Symbol.iterator) {
        method = iterable[Symbol.iterator]
        if (method != null) return method.call(iterable);
      }
    }
    throw new TypeError("Object is not async iterable");
  }
`,s.AwaitValue=a("7.0.0-beta.0")`
  export default function _AwaitValue(value) {
    this.wrapped = value;
  }
`,s.AsyncGenerator=a("7.0.0-beta.0")`
  import AwaitValue from "AwaitValue";

  export default function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null,
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg)
        var value = result.value;
        var wrappedAwait = value instanceof AwaitValue;

        Promise.resolve(wrappedAwait ? value.wrapped : value).then(
          function (arg) {
            if (wrappedAwait) {
              resume(key === "return" ? "return" : "next", arg);
              return
            }

            settle(result.done ? "return" : "normal", arg);
          },
          function (err) { resume("throw", err); });
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({ value: value, done: true });
          break;
        case "throw":
          front.reject(value);
          break;
        default:
          front.resolve({ value: value, done: false });
          break;
      }

      front = front.next;
      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    // Hide "return" method if generator return is not supported
    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () { return this; };
  }

  AsyncGenerator.prototype.next = function (arg) { return this._invoke("next", arg); };
  AsyncGenerator.prototype.throw = function (arg) { return this._invoke("throw", arg); };
  AsyncGenerator.prototype.return = function (arg) { return this._invoke("return", arg); };
`,s.wrapAsyncGenerator=a("7.0.0-beta.0")`
  import AsyncGenerator from "AsyncGenerator";

  export default function _wrapAsyncGenerator(fn) {
    return function () {
      return new AsyncGenerator(fn.apply(this, arguments));
    };
  }
`,s.awaitAsyncGenerator=a("7.0.0-beta.0")`
  import AwaitValue from "AwaitValue";

  export default function _awaitAsyncGenerator(value) {
    return new AwaitValue(value);
  }
`,s.asyncGeneratorDelegate=a("7.0.0-beta.0")`
  export default function _asyncGeneratorDelegate(inner, awaitWrap) {
    var iter = {}, waiting = false;

    function pump(key, value) {
      waiting = true;
      value = new Promise(function (resolve) { resolve(inner[key](value)); });
      return { done: false, value: awaitWrap(value) };
    };

    if (typeof Symbol === "function" && Symbol.iterator) {
      iter[Symbol.iterator] = function () { return this; };
    }

    iter.next = function (value) {
      if (waiting) {
        waiting = false;
        return value;
      }
      return pump("next", value);
    };

    if (typeof inner.throw === "function") {
      iter.throw = function (value) {
        if (waiting) {
          waiting = false;
          throw value;
        }
        return pump("throw", value);
      };
    }

    if (typeof inner.return === "function") {
      iter.return = function (value) {
        if (waiting) {
          waiting = false;
          return value;
        }
        return pump("return", value);
      };
    }

    return iter;
  }
`,s.asyncToGenerator=a("7.0.0-beta.0")`
  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  export default function _asyncToGenerator(fn) {
    return function () {
      var self = this, args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);
        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }
        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }
`,s.classCallCheck=a("7.0.0-beta.0")`
  export default function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
`,s.createClass=a("7.0.0-beta.0")`
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i ++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  export default function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }
`,s.defineEnumerableProperties=a("7.0.0-beta.0")`
  export default function _defineEnumerableProperties(obj, descs) {
    for (var key in descs) {
      var desc = descs[key];
      desc.configurable = desc.enumerable = true;
      if ("value" in desc) desc.writable = true;
      Object.defineProperty(obj, key, desc);
    }

    // Symbols are not enumerated over by for-in loops. If native
    // Symbols are available, fetch all of the descs object's own
    // symbol properties and define them on our target object too.
    if (Object.getOwnPropertySymbols) {
      var objectSymbols = Object.getOwnPropertySymbols(descs);
      for (var i = 0; i < objectSymbols.length; i++) {
        var sym = objectSymbols[i];
        var desc = descs[sym];
        desc.configurable = desc.enumerable = true;
        if ("value" in desc) desc.writable = true;
        Object.defineProperty(obj, sym, desc);
      }
    }
    return obj;
  }
`,s.defaults=a("7.0.0-beta.0")`
  export default function _defaults(obj, defaults) {
    var keys = Object.getOwnPropertyNames(defaults);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var value = Object.getOwnPropertyDescriptor(defaults, key);
      if (value && value.configurable && obj[key] === undefined) {
        Object.defineProperty(obj, key, value);
      }
    }
    return obj;
  }
`,s.defineProperty=a("7.0.0-beta.0")`
  export default function _defineProperty(obj, key, value) {
    // Shortcircuit the slow defineProperty path when possible.
    // We are trying to avoid issues where setters defined on the
    // prototype cause side effects under the fast path of simple
    // assignment. By checking for existence of the property with
    // the in operator, we can optimize most of this overhead away.
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
`,s.extends=a("7.0.0-beta.0")`
  export default function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };

    return _extends.apply(this, arguments);
  }
`,s.objectSpread=a("7.0.0-beta.0")`
  import defineProperty from "defineProperty";

  export default function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = (arguments[i] != null) ? Object(arguments[i]) : {};
      var ownKeys = Object.keys(source);
      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }
      ownKeys.forEach(function(key) {
        defineProperty(target, key, source[key]);
      });
    }
    return target;
  }
`,s.objectSpread2=a("7.5.0")`
  import defineProperty from "defineProperty";

  // This function is different to "Reflect.ownKeys". The enumerableOnly
  // filters on symbol properties only. Returned string properties are always
  // enumerable. It is good to use in objectSpread.

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }
    return keys;
  }

  export default function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = (arguments[i] != null) ? arguments[i] : {};
      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(
            target,
            key,
            Object.getOwnPropertyDescriptor(source, key)
          );
        });
      }
    }
    return target;
  }
`,s.inherits=a("7.0.0-beta.0")`
  import setPrototypeOf from "setPrototypeOf";

  export default function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) setPrototypeOf(subClass, superClass);
  }
`,s.inheritsLoose=a("7.0.0-beta.0")`
  export default function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }
`,s.getPrototypeOf=a("7.0.0-beta.0")`
  export default function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf
      ? Object.getPrototypeOf
      : function _getPrototypeOf(o) {
          return o.__proto__ || Object.getPrototypeOf(o);
        };
    return _getPrototypeOf(o);
  }
`,s.setPrototypeOf=a("7.0.0-beta.0")`
  export default function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
    return _setPrototypeOf(o, p);
  }
`,s.construct=a("7.0.0-beta.0")`
  import setPrototypeOf from "setPrototypeOf";

  function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;

    // core-js@3
    if (Reflect.construct.sham) return false;

    // Proxy can't be polyfilled. Every browser implemented
    // proxies before or at the same time as Reflect.construct,
    // so if they support Proxy they also support Reflect.construct.
    if (typeof Proxy === "function") return true;

    // Since Reflect.construct can't be properly polyfilled, some
    // implementations (e.g. core-js@2) don't set the correct internal slots.
    // Those polyfills don't allow us to subclass built-ins, so we need to
    // use our fallback implementation.
    try {
      // If the internal slots aren't set, this throws an error similar to
      //   TypeError: this is not a Date object.
      Date.prototype.toString.call(Reflect.construct(Date, [], function() {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  export default function _construct(Parent, args, Class) {
    if (isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      // NOTE: If Parent !== Class, the correct __proto__ is set *after*
      //       calling the constructor.
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }
    // Avoid issues with Class being present but undefined when it wasn't
    // present in the original call.
    return _construct.apply(null, arguments);
  }
`,s.isNativeFunction=a("7.0.0-beta.0")`
  export default function _isNativeFunction(fn) {
    // Note: This function returns "true" for core-js functions.
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }
`,s.wrapNativeSuper=a("7.0.0-beta.0")`
  import getPrototypeOf from "getPrototypeOf";
  import setPrototypeOf from "setPrototypeOf";
  import isNativeFunction from "isNativeFunction";
  import construct from "construct";

  export default function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !isNativeFunction(Class)) return Class;
      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }
      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);
        _cache.set(Class, Wrapper);
      }
      function Wrapper() {
        return construct(Class, arguments, getPrototypeOf(this).constructor)
      }
      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true,
        }
      });

      return setPrototypeOf(Wrapper, Class);
    }

    return _wrapNativeSuper(Class)
  }
`,s.instanceof=a("7.0.0-beta.0")`
  export default function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
      return !!right[Symbol.hasInstance](left);
    } else {
      return left instanceof right;
    }
  }
`,s.interopRequireDefault=a("7.0.0-beta.0")`
  export default function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
`,s.interopRequireWildcard=a("7.0.0-beta.0")`
  function _getRequireWildcardCache() {
    if (typeof WeakMap !== "function") return null;

    var cache = new WeakMap();
    _getRequireWildcardCache = function () { return cache; };
    return cache;
  }

  export default function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    }

    if (obj === null || (typeof obj !== "object" && typeof obj !== "function")) {
      return { default: obj }
    }

    var cache = _getRequireWildcardCache();
    if (cache && cache.has(obj)) {
      return cache.get(obj);
    }

    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor
          ? Object.getOwnPropertyDescriptor(obj, key)
          : null;
        if (desc && (desc.get || desc.set)) {
          Object.defineProperty(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }
    newObj.default = obj;
    if (cache) {
      cache.set(obj, newObj);
    }
    return newObj;
  }
`,s.newArrowCheck=a("7.0.0-beta.0")`
  export default function _newArrowCheck(innerThis, boundThis) {
    if (innerThis !== boundThis) {
      throw new TypeError("Cannot instantiate an arrow function");
    }
  }
`,s.objectDestructuringEmpty=a("7.0.0-beta.0")`
  export default function _objectDestructuringEmpty(obj) {
    if (obj == null) throw new TypeError("Cannot destructure undefined");
  }
`,s.objectWithoutPropertiesLoose=a("7.0.0-beta.0")`
  export default function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};

    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }
`,s.objectWithoutProperties=a("7.0.0-beta.0")`
  import objectWithoutPropertiesLoose from "objectWithoutPropertiesLoose";

  export default function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};

    var target = objectWithoutPropertiesLoose(source, excluded);
    var key, i;

    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }

    return target;
  }
`,s.assertThisInitialized=a("7.0.0-beta.0")`
  export default function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
  }
`,s.possibleConstructorReturn=a("7.0.0-beta.0")`
  import assertThisInitialized from "assertThisInitialized";

  export default function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }
    return assertThisInitialized(self);
  }
`,s.superPropBase=a("7.0.0-beta.0")`
  import getPrototypeOf from "getPrototypeOf";

  export default function _superPropBase(object, property) {
    // Yes, this throws if object is null to being with, that's on purpose.
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = getPrototypeOf(object);
      if (object === null) break;
    }
    return object;
  }
`,s.get=a("7.0.0-beta.0")`
  import superPropBase from "superPropBase";

  export default function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = superPropBase(target, property);

        if (!base) return;

        var desc = Object.getOwnPropertyDescriptor(base, property);
        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }
    return _get(target, property, receiver || target);
  }
`,s.set=a("7.0.0-beta.0")`
  import superPropBase from "superPropBase";
  import defineProperty from "defineProperty";

  function set(target, property, value, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.set) {
      set = Reflect.set;
    } else {
      set = function set(target, property, value, receiver) {
        var base = superPropBase(target, property);
        var desc;

        if (base) {
          desc = Object.getOwnPropertyDescriptor(base, property);
          if (desc.set) {
            desc.set.call(receiver, value);
            return true;
          } else if (!desc.writable) {
            // Both getter and non-writable fall into this.
            return false;
          }
        }

        // Without a super that defines the property, spec boils down to
        // "define on receiver" for some reason.
        desc = Object.getOwnPropertyDescriptor(receiver, property);
        if (desc) {
          if (!desc.writable) {
            // Setter, getter, and non-writable fall into this.
            return false;
          }

          desc.value = value;
          Object.defineProperty(receiver, property, desc);
        } else {
          // Avoid setters that may be defined on Sub's prototype, but not on
          // the instance.
          defineProperty(receiver, property, value);
        }

        return true;
      };
    }

    return set(target, property, value, receiver);
  }

  export default function _set(target, property, value, receiver, isStrict) {
    var s = set(target, property, value, receiver || target);
    if (!s && isStrict) {
      throw new Error('failed to set property');
    }

    return value;
  }
`,s.taggedTemplateLiteral=a("7.0.0-beta.0")`
  export default function _taggedTemplateLiteral(strings, raw) {
    if (!raw) { raw = strings.slice(0); }
    return Object.freeze(Object.defineProperties(strings, {
        raw: { value: Object.freeze(raw) }
    }));
  }
`,s.taggedTemplateLiteralLoose=a("7.0.0-beta.0")`
  export default function _taggedTemplateLiteralLoose(strings, raw) {
    if (!raw) { raw = strings.slice(0); }
    strings.raw = raw;
    return strings;
  }
`,s.readOnlyError=a("7.0.0-beta.0")`
  export default function _readOnlyError(name) {
    throw new Error("\\"" + name + "\\" is read-only");
  }
`,s.classNameTDZError=a("7.0.0-beta.0")`
  export default function _classNameTDZError(name) {
    throw new Error("Class \\"" + name + "\\" cannot be referenced in computed property keys.");
  }
`,s.temporalUndefined=a("7.0.0-beta.0")`
  // This function isn't mean to be called, but to be used as a reference.
  // We can't use a normal object because it isn't hoisted.
  export default function _temporalUndefined() {}
`,s.tdz=a("7.5.5")`
  export default function _tdzError(name) {
    throw new ReferenceError(name + " is not defined - temporal dead zone");
  }
`,s.temporalRef=a("7.0.0-beta.0")`
  import undef from "temporalUndefined";
  import err from "tdz";

  export default function _temporalRef(val, name) {
    return val === undef ? err(name) : val;
  }
`,s.slicedToArray=a("7.0.0-beta.0")`
  import arrayWithHoles from "arrayWithHoles";
  import iterableToArrayLimit from "iterableToArrayLimit";
  import nonIterableRest from "nonIterableRest";

  export default function _slicedToArray(arr, i) {
    return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || nonIterableRest();
  }
`,s.slicedToArrayLoose=a("7.0.0-beta.0")`
  import arrayWithHoles from "arrayWithHoles";
  import iterableToArrayLimitLoose from "iterableToArrayLimitLoose";
  import nonIterableRest from "nonIterableRest";

  export default function _slicedToArrayLoose(arr, i) {
    return arrayWithHoles(arr) || iterableToArrayLimitLoose(arr, i) || nonIterableRest();
  }
`,s.toArray=a("7.0.0-beta.0")`
  import arrayWithHoles from "arrayWithHoles";
  import iterableToArray from "iterableToArray";
  import nonIterableRest from "nonIterableRest";

  export default function _toArray(arr) {
    return arrayWithHoles(arr) || iterableToArray(arr) || nonIterableRest();
  }
`,s.toConsumableArray=a("7.0.0-beta.0")`
  import arrayWithoutHoles from "arrayWithoutHoles";
  import iterableToArray from "iterableToArray";
  import nonIterableSpread from "nonIterableSpread";

  export default function _toConsumableArray(arr) {
    return arrayWithoutHoles(arr) || iterableToArray(arr) || nonIterableSpread();
  }
`,s.arrayWithoutHoles=a("7.0.0-beta.0")`
  export default function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];
      return arr2;
    }
  }
`,s.arrayWithHoles=a("7.0.0-beta.0")`
  export default function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
`,s.iterableToArray=a("7.0.0-beta.0")`
  export default function _iterableToArray(iter) {
    if (
      Symbol.iterator in Object(iter) ||
      Object.prototype.toString.call(iter) === "[object Arguments]"
    ) return Array.from(iter);
  }
`,s.iterableToArrayLimit=a("7.0.0-beta.0")`
  export default function _iterableToArrayLimit(arr, i) {
    // this is an expanded form of \`for...of\` that properly supports abrupt completions of
    // iterators etc. variable names have been minimised to reduce the size of this massive
    // helper. sometimes spec compliance is annoying :(
    //
    // _n = _iteratorNormalCompletion
    // _d = _didIteratorError
    // _e = _iteratorError
    // _i = _iterator
    // _s = _step
    if (!(
      Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]"
    )) { return }
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;
    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
`,s.iterableToArrayLimitLoose=a("7.0.0-beta.0")`
  export default function _iterableToArrayLimitLoose(arr, i) {
    if (!(
      Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]"
    )) { return }
    var _arr = [];
    for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
      _arr.push(_step.value);
      if (i && _arr.length === i) break;
    }
    return _arr;
  }
`,s.nonIterableSpread=a("7.0.0-beta.0")`
  export default function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }
`,s.nonIterableRest=a("7.0.0-beta.0")`
  export default function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }
`,s.skipFirstGeneratorNext=a("7.0.0-beta.0")`
  export default function _skipFirstGeneratorNext(fn) {
    return function () {
      var it = fn.apply(this, arguments);
      it.next();
      return it;
    }
  }
`,s.toPrimitive=a("7.1.5")`
  export default function _toPrimitive(
    input,
    hint /*: "default" | "string" | "number" | void */
  ) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
`,s.toPropertyKey=a("7.1.5")`
  import toPrimitive from "toPrimitive";

  export default function _toPropertyKey(arg) {
    var key = toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }
`,s.initializerWarningHelper=a("7.0.0-beta.0")`
    export default function _initializerWarningHelper(descriptor, context){
        throw new Error(
          'Decorating class property failed. Please ensure that ' +
          'proposal-class-properties is enabled and runs after the decorators transform.'
        );
    }
`,s.initializerDefineProperty=a("7.0.0-beta.0")`
    export default function _initializerDefineProperty(target, property, descriptor, context){
        if (!descriptor) return;

        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0,
        });
    }
`,s.applyDecoratedDescriptor=a("7.0.0-beta.0")`
    export default function _applyDecoratedDescriptor(target, property, decorators, descriptor, context){
        var desc = {};
        Object.keys(descriptor).forEach(function(key){
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;
        if ('value' in desc || desc.initializer){
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function(desc, decorator){
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0){
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0){
            // This is a hack to avoid this being processed by 'transform-runtime'.
            // See issue #9.
            Object.defineProperty(target, property, desc);
            desc = null;
        }

        return desc;
    }
`,s.classPrivateFieldLooseKey=a("7.0.0-beta.0")`
  var id = 0;
  export default function _classPrivateFieldKey(name) {
    return "__private_" + (id++) + "_" + name;
  }
`,s.classPrivateFieldLooseBase=a("7.0.0-beta.0")`
  export default function _classPrivateFieldBase(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
      throw new TypeError("attempted to use private field on non-instance");
    }
    return receiver;
  }
`,s.classPrivateFieldGet=a("7.0.0-beta.0")`
  export default function _classPrivateFieldGet(receiver, privateMap) {
    var descriptor = privateMap.get(receiver);
    if (!descriptor) {
      throw new TypeError("attempted to get private field on non-instance");
    }
    if (descriptor.get) {
      return descriptor.get.call(receiver);
    }
    return descriptor.value;
  }
`,s.classPrivateFieldSet=a("7.0.0-beta.0")`
  export default function _classPrivateFieldSet(receiver, privateMap, value) {
    var descriptor = privateMap.get(receiver);
    if (!descriptor) {
      throw new TypeError("attempted to set private field on non-instance");
    }
    if (descriptor.set) {
      descriptor.set.call(receiver, value);
    } else {
      if (!descriptor.writable) {
        // This should only throw in strict mode, but class bodies are
        // always strict and private fields can only be used inside
        // class bodies.
        throw new TypeError("attempted to set read only private field");
      }

      descriptor.value = value;
    }

    return value;
  }
`,s.classPrivateFieldDestructureSet=a("7.4.4")`
  export default function _classPrivateFieldDestructureSet(receiver, privateMap) {
    if (!privateMap.has(receiver)) {
      throw new TypeError("attempted to set private field on non-instance");
    }
    var descriptor = privateMap.get(receiver);
    if (descriptor.set) {
      if (!("__destrObj" in descriptor)) {
        descriptor.__destrObj = {
          set value(v) {
            descriptor.set.call(receiver, v)
          },
        };
      }
      return descriptor.__destrObj;
    } else {
      if (!descriptor.writable) {
        // This should only throw in strict mode, but class bodies are
        // always strict and private fields can only be used inside
        // class bodies.
        throw new TypeError("attempted to set read only private field");
      }

      return descriptor;
    }
  }
`,s.classStaticPrivateFieldSpecGet=a("7.0.2")`
  export default function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) {
    if (receiver !== classConstructor) {
      throw new TypeError("Private static access of wrong provenance");
    }
    if (descriptor.get) {
      return descriptor.get.call(receiver);
    }
    return descriptor.value;
  }
`,s.classStaticPrivateFieldSpecSet=a("7.0.2")`
  export default function _classStaticPrivateFieldSpecSet(receiver, classConstructor, descriptor, value) {
    if (receiver !== classConstructor) {
      throw new TypeError("Private static access of wrong provenance");
    }
    if (descriptor.set) {
      descriptor.set.call(receiver, value);
    } else {
      if (!descriptor.writable) {
        // This should only throw in strict mode, but class bodies are
        // always strict and private fields can only be used inside
        // class bodies.
        throw new TypeError("attempted to set read only private field");
      }
      descriptor.value = value;
    }

    return value;
  }
`,s.classStaticPrivateMethodGet=a("7.3.2")`
  export default function _classStaticPrivateMethodGet(receiver, classConstructor, method) {
    if (receiver !== classConstructor) {
      throw new TypeError("Private static access of wrong provenance");
    }
    return method;
  }
`,s.classStaticPrivateMethodSet=a("7.3.2")`
  export default function _classStaticPrivateMethodSet() {
    throw new TypeError("attempted to set read only static private field");
  }
`,s.decorate=a("7.1.5")`
  import toArray from "toArray";
  import toPropertyKey from "toPropertyKey";

  // These comments are stripped by @babel/template
  /*::
  type PropertyDescriptor =
    | {
        value: any,
        writable: boolean,
        configurable: boolean,
        enumerable: boolean,
      }
    | {
        get?: () => any,
        set?: (v: any) => void,
        configurable: boolean,
        enumerable: boolean,
      };

  type FieldDescriptor ={
    writable: boolean,
    configurable: boolean,
    enumerable: boolean,
  };

  type Placement = "static" | "prototype" | "own";
  type Key = string | symbol; // PrivateName is not supported yet.

  type ElementDescriptor =
    | {
        kind: "method",
        key: Key,
        placement: Placement,
        descriptor: PropertyDescriptor
      }
    | {
        kind: "field",
        key: Key,
        placement: Placement,
        descriptor: FieldDescriptor,
        initializer?: () => any,
      };

  // This is exposed to the user code
  type ElementObjectInput = ElementDescriptor & {
    [@@toStringTag]?: "Descriptor"
  };

  // This is exposed to the user code
  type ElementObjectOutput = ElementDescriptor & {
    [@@toStringTag]?: "Descriptor"
    extras?: ElementDescriptor[],
    finisher?: ClassFinisher,
  };

  // This is exposed to the user code
  type ClassObject = {
    [@@toStringTag]?: "Descriptor",
    kind: "class",
    elements: ElementDescriptor[],
  };

  type ElementDecorator = (descriptor: ElementObjectInput) => ?ElementObjectOutput;
  type ClassDecorator = (descriptor: ClassObject) => ?ClassObject;
  type ClassFinisher = <A, B>(cl: Class<A>) => Class<B>;

  // Only used by Babel in the transform output, not part of the spec.
  type ElementDefinition =
    | {
        kind: "method",
        value: any,
        key: Key,
        static?: boolean,
        decorators?: ElementDecorator[],
      }
    | {
        kind: "field",
        value: () => any,
        key: Key,
        static?: boolean,
        decorators?: ElementDecorator[],
    };

  declare function ClassFactory<C>(initialize: (instance: C) => void): {
    F: Class<C>,
    d: ElementDefinition[]
  }

  */

  /*::
  // Various combinations with/without extras and with one or many finishers

  type ElementFinisherExtras = {
    element: ElementDescriptor,
    finisher?: ClassFinisher,
    extras?: ElementDescriptor[],
  };

  type ElementFinishersExtras = {
    element: ElementDescriptor,
    finishers: ClassFinisher[],
    extras: ElementDescriptor[],
  };

  type ElementsFinisher = {
    elements: ElementDescriptor[],
    finisher?: ClassFinisher,
  };

  type ElementsFinishers = {
    elements: ElementDescriptor[],
    finishers: ClassFinisher[],
  };

  */

  /*::

  type Placements = {
    static: Key[],
    prototype: Key[],
    own: Key[],
  };

  */

  // ClassDefinitionEvaluation (Steps 26-*)
  export default function _decorate(
    decorators /*: ClassDecorator[] */,
    factory /*: ClassFactory */,
    superClass /*: ?Class<*> */,
    mixins /*: ?Array<Function> */,
  ) /*: Class<*> */ {
    var api = _getDecoratorsApi();
    if (mixins) {
      for (var i = 0; i < mixins.length; i++) {
        api = mixins[i](api);
      }
    }

    var r = factory(function initialize(O) {
      api.initializeInstanceElements(O, decorated.elements);
    }, superClass);
    var decorated = api.decorateClass(
      _coalesceClassElements(r.d.map(_createElementDescriptor)),
      decorators,
    );

    api.initializeClassElements(r.F, decorated.elements);

    return api.runClassFinishers(r.F, decorated.finishers);
  }

  function _getDecoratorsApi() {
    _getDecoratorsApi = function() {
      return api;
    };

    var api = {
      elementsDefinitionOrder: [["method"], ["field"]],

      // InitializeInstanceElements
      initializeInstanceElements: function(
        /*::<C>*/ O /*: C */,
        elements /*: ElementDescriptor[] */,
      ) {
        ["method", "field"].forEach(function(kind) {
          elements.forEach(function(element /*: ElementDescriptor */) {
            if (element.kind === kind && element.placement === "own") {
              this.defineClassElement(O, element);
            }
          }, this);
        }, this);
      },

      // InitializeClassElements
      initializeClassElements: function(
        /*::<C>*/ F /*: Class<C> */,
        elements /*: ElementDescriptor[] */,
      ) {
        var proto = F.prototype;

        ["method", "field"].forEach(function(kind) {
          elements.forEach(function(element /*: ElementDescriptor */) {
            var placement = element.placement;
            if (
              element.kind === kind &&
              (placement === "static" || placement === "prototype")
            ) {
              var receiver = placement === "static" ? F : proto;
              this.defineClassElement(receiver, element);
            }
          }, this);
        }, this);
      },

      // DefineClassElement
      defineClassElement: function(
        /*::<C>*/ receiver /*: C | Class<C> */,
        element /*: ElementDescriptor */,
      ) {
        var descriptor /*: PropertyDescriptor */ = element.descriptor;
        if (element.kind === "field") {
          var initializer = element.initializer;
          descriptor = {
            enumerable: descriptor.enumerable,
            writable: descriptor.writable,
            configurable: descriptor.configurable,
            value: initializer === void 0 ? void 0 : initializer.call(receiver),
          };
        }
        Object.defineProperty(receiver, element.key, descriptor);
      },

      // DecorateClass
      decorateClass: function(
        elements /*: ElementDescriptor[] */,
        decorators /*: ClassDecorator[] */,
      ) /*: ElementsFinishers */ {
        var newElements /*: ElementDescriptor[] */ = [];
        var finishers /*: ClassFinisher[] */ = [];
        var placements /*: Placements */ = {
          static: [],
          prototype: [],
          own: [],
        };

        elements.forEach(function(element /*: ElementDescriptor */) {
          this.addElementPlacement(element, placements);
        }, this);

        elements.forEach(function(element /*: ElementDescriptor */) {
          if (!_hasDecorators(element)) return newElements.push(element);

          var elementFinishersExtras /*: ElementFinishersExtras */ = this.decorateElement(
            element,
            placements,
          );
          newElements.push(elementFinishersExtras.element);
          newElements.push.apply(newElements, elementFinishersExtras.extras);
          finishers.push.apply(finishers, elementFinishersExtras.finishers);
        }, this);

        if (!decorators) {
          return { elements: newElements, finishers: finishers };
        }

        var result /*: ElementsFinishers */ = this.decorateConstructor(
          newElements,
          decorators,
        );
        finishers.push.apply(finishers, result.finishers);
        result.finishers = finishers;

        return result;
      },

      // AddElementPlacement
      addElementPlacement: function(
        element /*: ElementDescriptor */,
        placements /*: Placements */,
        silent /*: boolean */,
      ) {
        var keys = placements[element.placement];
        if (!silent && keys.indexOf(element.key) !== -1) {
          throw new TypeError("Duplicated element (" + element.key + ")");
        }
        keys.push(element.key);
      },

      // DecorateElement
      decorateElement: function(
        element /*: ElementDescriptor */,
        placements /*: Placements */,
      ) /*: ElementFinishersExtras */ {
        var extras /*: ElementDescriptor[] */ = [];
        var finishers /*: ClassFinisher[] */ = [];

        for (
          var decorators = element.decorators, i = decorators.length - 1;
          i >= 0;
          i--
        ) {
          // (inlined) RemoveElementPlacement
          var keys = placements[element.placement];
          keys.splice(keys.indexOf(element.key), 1);

          var elementObject /*: ElementObjectInput */ = this.fromElementDescriptor(
            element,
          );
          var elementFinisherExtras /*: ElementFinisherExtras */ = this.toElementFinisherExtras(
            (0, decorators[i])(elementObject) /*: ElementObjectOutput */ ||
              elementObject,
          );

          element = elementFinisherExtras.element;
          this.addElementPlacement(element, placements);

          if (elementFinisherExtras.finisher) {
            finishers.push(elementFinisherExtras.finisher);
          }

          var newExtras /*: ElementDescriptor[] | void */ =
            elementFinisherExtras.extras;
          if (newExtras) {
            for (var j = 0; j < newExtras.length; j++) {
              this.addElementPlacement(newExtras[j], placements);
            }
            extras.push.apply(extras, newExtras);
          }
        }

        return { element: element, finishers: finishers, extras: extras };
      },

      // DecorateConstructor
      decorateConstructor: function(
        elements /*: ElementDescriptor[] */,
        decorators /*: ClassDecorator[] */,
      ) /*: ElementsFinishers */ {
        var finishers /*: ClassFinisher[] */ = [];

        for (var i = decorators.length - 1; i >= 0; i--) {
          var obj /*: ClassObject */ = this.fromClassDescriptor(elements);
          var elementsAndFinisher /*: ElementsFinisher */ = this.toClassDescriptor(
            (0, decorators[i])(obj) /*: ClassObject */ || obj,
          );

          if (elementsAndFinisher.finisher !== undefined) {
            finishers.push(elementsAndFinisher.finisher);
          }

          if (elementsAndFinisher.elements !== undefined) {
            elements = elementsAndFinisher.elements;

            for (var j = 0; j < elements.length - 1; j++) {
              for (var k = j + 1; k < elements.length; k++) {
                if (
                  elements[j].key === elements[k].key &&
                  elements[j].placement === elements[k].placement
                ) {
                  throw new TypeError(
                    "Duplicated element (" + elements[j].key + ")",
                  );
                }
              }
            }
          }
        }

        return { elements: elements, finishers: finishers };
      },

      // FromElementDescriptor
      fromElementDescriptor: function(
        element /*: ElementDescriptor */,
      ) /*: ElementObject */ {
        var obj /*: ElementObject */ = {
          kind: element.kind,
          key: element.key,
          placement: element.placement,
          descriptor: element.descriptor,
        };

        var desc = {
          value: "Descriptor",
          configurable: true,
        };
        Object.defineProperty(obj, Symbol.toStringTag, desc);

        if (element.kind === "field") obj.initializer = element.initializer;

        return obj;
      },

      // ToElementDescriptors
      toElementDescriptors: function(
        elementObjects /*: ElementObject[] */,
      ) /*: ElementDescriptor[] */ {
        if (elementObjects === undefined) return;
        return toArray(elementObjects).map(function(elementObject) {
          var element = this.toElementDescriptor(elementObject);
          this.disallowProperty(elementObject, "finisher", "An element descriptor");
          this.disallowProperty(elementObject, "extras", "An element descriptor");
          return element;
        }, this);
      },

      // ToElementDescriptor
      toElementDescriptor: function(
        elementObject /*: ElementObject */,
      ) /*: ElementDescriptor */ {
        var kind = String(elementObject.kind);
        if (kind !== "method" && kind !== "field") {
          throw new TypeError(
            'An element descriptor\\'s .kind property must be either "method" or' +
              ' "field", but a decorator created an element descriptor with' +
              ' .kind "' +
              kind +
              '"',
          );
        }

        var key = toPropertyKey(elementObject.key);

        var placement = String(elementObject.placement);
        if (
          placement !== "static" &&
          placement !== "prototype" &&
          placement !== "own"
        ) {
          throw new TypeError(
            'An element descriptor\\'s .placement property must be one of "static",' +
              ' "prototype" or "own", but a decorator created an element descriptor' +
              ' with .placement "' +
              placement +
              '"',
          );
        }

        var descriptor /*: PropertyDescriptor */ = elementObject.descriptor;

        this.disallowProperty(elementObject, "elements", "An element descriptor");

        var element /*: ElementDescriptor */ = {
          kind: kind,
          key: key,
          placement: placement,
          descriptor: Object.assign({}, descriptor),
        };

        if (kind !== "field") {
          this.disallowProperty(elementObject, "initializer", "A method descriptor");
        } else {
          this.disallowProperty(
            descriptor,
            "get",
            "The property descriptor of a field descriptor",
          );
          this.disallowProperty(
            descriptor,
            "set",
            "The property descriptor of a field descriptor",
          );
          this.disallowProperty(
            descriptor,
            "value",
            "The property descriptor of a field descriptor",
          );

          element.initializer = elementObject.initializer;
        }

        return element;
      },

      toElementFinisherExtras: function(
        elementObject /*: ElementObject */,
      ) /*: ElementFinisherExtras */ {
        var element /*: ElementDescriptor */ = this.toElementDescriptor(
          elementObject,
        );
        var finisher /*: ClassFinisher */ = _optionalCallableProperty(
          elementObject,
          "finisher",
        );
        var extras /*: ElementDescriptors[] */ = this.toElementDescriptors(
          elementObject.extras,
        );

        return { element: element, finisher: finisher, extras: extras };
      },

      // FromClassDescriptor
      fromClassDescriptor: function(
        elements /*: ElementDescriptor[] */,
      ) /*: ClassObject */ {
        var obj = {
          kind: "class",
          elements: elements.map(this.fromElementDescriptor, this),
        };

        var desc = { value: "Descriptor", configurable: true };
        Object.defineProperty(obj, Symbol.toStringTag, desc);

        return obj;
      },

      // ToClassDescriptor
      toClassDescriptor: function(
        obj /*: ClassObject */,
      ) /*: ElementsFinisher */ {
        var kind = String(obj.kind);
        if (kind !== "class") {
          throw new TypeError(
            'A class descriptor\\'s .kind property must be "class", but a decorator' +
              ' created a class descriptor with .kind "' +
              kind +
              '"',
          );
        }

        this.disallowProperty(obj, "key", "A class descriptor");
        this.disallowProperty(obj, "placement", "A class descriptor");
        this.disallowProperty(obj, "descriptor", "A class descriptor");
        this.disallowProperty(obj, "initializer", "A class descriptor");
        this.disallowProperty(obj, "extras", "A class descriptor");

        var finisher = _optionalCallableProperty(obj, "finisher");
        var elements = this.toElementDescriptors(obj.elements);

        return { elements: elements, finisher: finisher };
      },

      // RunClassFinishers
      runClassFinishers: function(
        constructor /*: Class<*> */,
        finishers /*: ClassFinisher[] */,
      ) /*: Class<*> */ {
        for (var i = 0; i < finishers.length; i++) {
          var newConstructor /*: ?Class<*> */ = (0, finishers[i])(constructor);
          if (newConstructor !== undefined) {
            // NOTE: This should check if IsConstructor(newConstructor) is false.
            if (typeof newConstructor !== "function") {
              throw new TypeError("Finishers must return a constructor.");
            }
            constructor = newConstructor;
          }
        }
        return constructor;
      },

      disallowProperty: function(obj, name, objectType) {
        if (obj[name] !== undefined) {
          throw new TypeError(objectType + " can't have a ." + name + " property.");
        }
      }
    };

    return api;
  }

  // ClassElementEvaluation
  function _createElementDescriptor(
    def /*: ElementDefinition */,
  ) /*: ElementDescriptor */ {
    var key = toPropertyKey(def.key);

    var descriptor /*: PropertyDescriptor */;
    if (def.kind === "method") {
      descriptor = {
        value: def.value,
        writable: true,
        configurable: true,
        enumerable: false,
      };
    } else if (def.kind === "get") {
      descriptor = { get: def.value, configurable: true, enumerable: false };
    } else if (def.kind === "set") {
      descriptor = { set: def.value, configurable: true, enumerable: false };
    } else if (def.kind === "field") {
      descriptor = { configurable: true, writable: true, enumerable: true };
    }

    var element /*: ElementDescriptor */ = {
      kind: def.kind === "field" ? "field" : "method",
      key: key,
      placement: def.static
        ? "static"
        : def.kind === "field"
        ? "own"
        : "prototype",
      descriptor: descriptor,
    };
    if (def.decorators) element.decorators = def.decorators;
    if (def.kind === "field") element.initializer = def.value;

    return element;
  }

  // CoalesceGetterSetter
  function _coalesceGetterSetter(
    element /*: ElementDescriptor */,
    other /*: ElementDescriptor */,
  ) {
    if (element.descriptor.get !== undefined) {
      other.descriptor.get = element.descriptor.get;
    } else {
      other.descriptor.set = element.descriptor.set;
    }
  }

  // CoalesceClassElements
  function _coalesceClassElements(
    elements /*: ElementDescriptor[] */,
  ) /*: ElementDescriptor[] */ {
    var newElements /*: ElementDescriptor[] */ = [];

    var isSameElement = function(
      other /*: ElementDescriptor */,
    ) /*: boolean */ {
      return (
        other.kind === "method" &&
        other.key === element.key &&
        other.placement === element.placement
      );
    };

    for (var i = 0; i < elements.length; i++) {
      var element /*: ElementDescriptor */ = elements[i];
      var other /*: ElementDescriptor */;

      if (
        element.kind === "method" &&
        (other = newElements.find(isSameElement))
      ) {
        if (
          _isDataDescriptor(element.descriptor) ||
          _isDataDescriptor(other.descriptor)
        ) {
          if (_hasDecorators(element) || _hasDecorators(other)) {
            throw new ReferenceError(
              "Duplicated methods (" + element.key + ") can't be decorated.",
            );
          }
          other.descriptor = element.descriptor;
        } else {
          if (_hasDecorators(element)) {
            if (_hasDecorators(other)) {
              throw new ReferenceError(
                "Decorators can't be placed on different accessors with for " +
                  "the same property (" +
                  element.key +
                  ").",
              );
            }
            other.decorators = element.decorators;
          }
          _coalesceGetterSetter(element, other);
        }
      } else {
        newElements.push(element);
      }
    }

    return newElements;
  }

  function _hasDecorators(element /*: ElementDescriptor */) /*: boolean */ {
    return element.decorators && element.decorators.length;
  }

  function _isDataDescriptor(desc /*: PropertyDescriptor */) /*: boolean */ {
    return (
      desc !== undefined &&
      !(desc.value === undefined && desc.writable === undefined)
    );
  }

  function _optionalCallableProperty /*::<T>*/(
    obj /*: T */,
    name /*: $Keys<T> */,
  ) /*: ?Function */ {
    var value = obj[name];
    if (value !== undefined && typeof value !== "function") {
      throw new TypeError("Expected '" + name + "' to be a function");
    }
    return value;
  }

`,s.classPrivateMethodGet=a("7.1.6")`
  export default function _classPrivateMethodGet(receiver, privateSet, fn) {
    if (!privateSet.has(receiver)) {
      throw new TypeError("attempted to get private field on non-instance");
    }
    return fn;
  }
`,s.classPrivateMethodSet=a("7.1.6")`
  export default function _classPrivateMethodSet() {
    throw new TypeError("attempted to reassign private method");
  }
`,s.wrapRegExp=a("7.2.6")`
  import wrapNativeSuper from "wrapNativeSuper";
  import getPrototypeOf from "getPrototypeOf";
  import possibleConstructorReturn from "possibleConstructorReturn";
  import inherits from "inherits";

  export default function _wrapRegExp(re, groups) {
    _wrapRegExp = function(re, groups) {
      return new BabelRegExp(re, undefined, groups);
    };

    var _RegExp = wrapNativeSuper(RegExp);
    var _super = RegExp.prototype;
    var _groups = new WeakMap();

    function BabelRegExp(re, flags, groups) {
      var _this = _RegExp.call(this, re, flags);
      // if the regex is recreated with 'g' flag
      _groups.set(_this, groups || _groups.get(re));
      return _this;
    }
    inherits(BabelRegExp, _RegExp);

    BabelRegExp.prototype.exec = function(str) {
      var result = _super.exec.call(this, str);
      if (result) result.groups = buildGroups(result, this);
      return result;
    };
    BabelRegExp.prototype[Symbol.replace] = function(str, substitution) {
      if (typeof substitution === "string") {
        var groups = _groups.get(this);
        return _super[Symbol.replace].call(
          this,
          str,
          substitution.replace(/\\$<([^>]+)>/g, function(_, name) {
            return "$" + groups[name];
          })
        );
      } else if (typeof substitution === "function") {
        var _this = this;
        return _super[Symbol.replace].call(
          this,
          str,
          function() {
            var args = [];
            args.push.apply(args, arguments);
            if (typeof args[args.length - 1] !== "object") {
              // Modern engines already pass result.groups as the last arg.
              args.push(buildGroups(args, _this));
            }
            return substitution.apply(this, args);
          }
        );
      } else {
        return _super[Symbol.replace].call(this, str, substitution);
      }
    }

    function buildGroups(result, re) {
      // NOTE: This function should return undefined if there are no groups,
      // but in that case Babel doesn't add the wrapper anyway.

      var g = _groups.get(re);
      return Object.keys(g).reduce(function(groups, name) {
        groups[name] = result[g[name]];
        return groups;
      }, Object.create(null));
    }

    return _wrapRegExp.apply(this, arguments);
  }
`},function(e,t,n){"use strict";function r(){const e=u(n(100));return r=function(){return e},e}function i(){const e=a(n(84));return i=function(){return e},e}function s(){const e=a(n(50));return s=function(){return e},e}function o(){const e=u(n(1));return o=function(){return e},e}function a(e){return e&&e.__esModule?e:{default:e}}function l(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return l=function(){return e},e}function u(e){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=l();if(t&&t.has(e))return t.get(e);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var i in e)if(Object.prototype.hasOwnProperty.call(e,i)){var s=r?Object.getOwnPropertyDescriptor(e,i):null;s&&(s.get||s.set)?Object.defineProperty(n,i,s):n[i]=e[i]}return n.default=e,t&&t.set(e,n),n}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t="global"){let n;const r={global:c,module:p,umd:f,var:d}[t];if(!r)throw new Error(`Unsupported output type ${t}`);n=r(e);return(0,i().default)(n).code};function c(e){const t=o().identifier("babelHelpers"),n=[],r=o().functionExpression(null,[o().identifier("global")],o().blockStatement(n)),i=o().program([o().expressionStatement(o().callExpression(r,[o().conditionalExpression(o().binaryExpression("===",o().unaryExpression("typeof",o().identifier("global")),o().stringLiteral("undefined")),o().identifier("self"),o().identifier("global"))]))]);return n.push(o().variableDeclaration("var",[o().variableDeclarator(t,o().assignmentExpression("=",o().memberExpression(o().identifier("global"),t),o().objectExpression([])))])),h(n,t,e),i}function p(e){const t=[],n=h(t,null,e);return t.unshift(o().exportNamedDeclaration(null,Object.keys(n).map(e=>o().exportSpecifier(o().cloneNode(n[e]),o().identifier(e))))),o().program(t,[],"module")}function f(e){const t=o().identifier("babelHelpers"),n=[];return n.push(o().variableDeclaration("var",[o().variableDeclarator(t,o().identifier("global"))])),h(n,t,e),o().program([(r={FACTORY_PARAMETERS:o().identifier("global"),BROWSER_ARGUMENTS:o().assignmentExpression("=",o().memberExpression(o().identifier("root"),t),o().objectExpression([])),COMMON_ARGUMENTS:o().identifier("exports"),AMD_ARGUMENTS:o().arrayExpression([o().stringLiteral("exports")]),FACTORY_BODY:n,UMD_ROOT:o().identifier("this")},s().default`
    (function (root, factory) {
      if (typeof define === "function" && define.amd) {
        define(AMD_ARGUMENTS, factory);
      } else if (typeof exports === "object") {
        factory(COMMON_ARGUMENTS);
      } else {
        factory(BROWSER_ARGUMENTS);
      }
    })(UMD_ROOT, function (FACTORY_PARAMETERS) {
      FACTORY_BODY
    });
  `(r))]);var r}function d(e){const t=o().identifier("babelHelpers"),n=[];n.push(o().variableDeclaration("var",[o().variableDeclarator(t,o().objectExpression([]))]));const r=o().program(n);return h(n,t,e),n.push(o().expressionStatement(t)),r}function h(e,t,n){const i=e=>t?o().memberExpression(t,o().identifier(e)):o().identifier(`_${e}`),s={};return r().list.forEach((function(t){if(n&&n.indexOf(t)<0)return;const o=s[t]=i(t),{nodes:a}=r().get(t,i,o);e.push(...a)})),s}},function(e){e.exports=JSON.parse('{"name":"@babel/core","version":"7.8.4","description":"Babel compiler core.","main":"lib/index.js","author":"Sebastian McKenzie <sebmck@gmail.com>","homepage":"https://babeljs.io/","license":"MIT","publishConfig":{"access":"public"},"repository":"https://github.com/babel/babel/tree/master/packages/babel-core","keywords":["6to5","babel","classes","const","es6","harmony","let","modules","transpile","transpiler","var","babel-core","compiler"],"engines":{"node":">=6.9.0"},"funding":{"type":"opencollective","url":"https://opencollective.com/babel"},"browser":{"./lib/config/files/index.js":"./lib/config/files/index-browser.js","./lib/transform-file.js":"./lib/transform-file-browser.js","./src/config/files/index.js":"./src/config/files/index-browser.js","./src/transform-file.js":"./src/transform-file-browser.js"},"dependencies":{"@babel/code-frame":"^7.8.3","@babel/generator":"^7.8.4","@babel/helpers":"^7.8.4","@babel/parser":"^7.8.4","@babel/template":"^7.8.3","@babel/traverse":"^7.8.4","@babel/types":"^7.8.3","convert-source-map":"^1.7.0","debug":"^4.1.0","gensync":"^1.0.0-beta.1","json5":"^2.1.0","lodash":"^4.17.13","resolve":"^1.3.2","semver":"^5.4.1","source-map":"^0.5.0"},"devDependencies":{"@babel/helper-transform-fixture-test-runner":"^7.8.3"},"gitHead":"5c2e6bc07fed3d28801d93168622c99ae622653a"}')},function(e,t,n){"use strict";function r(){const e=g(n(19));return r=function(){return e},e}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=n(157),s=n(86),o=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=y();if(t&&t.has(e))return t.get(e);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var i in e)if(Object.prototype.hasOwnProperty.call(e,i)){var s=r?Object.getOwnPropertyDescriptor(e,i):null;s&&(s.get||s.set)?Object.defineProperty(n,i,s):n[i]=e[i]}n.default=e,t&&t.set(e,n);return n}(n(57)),a=g(n(87)),l=n(52),u=n(158);function c(){const e=g(n(13));return c=function(){return e},e}var p=n(53),f=n(88),d=n(414),h=g(n(415)),m=g(n(160));function y(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return y=function(){return e},e}function g(e){return e&&e.__esModule?e:{default:e}}var v=(0,r().default)((function*(e){const t=yield*(0,m.default)(e);if(!t)return null;const{options:n,context:r}=t,i={},o=[[]];try{const{plugins:e,presets:t}=n;if(!e||!t)throw new Error("Assertion failure - plugins and presets exist");if(yield*function*e(t,n){const a=[];for(let e=0;e<t.plugins.length;e++){const n=t.plugins[e];if(!1!==n.options)try{a.push(yield*E(n,r))}catch(r){throw e>0&&"BABEL_UNKNOWN_PLUGIN_PROPERTY"===r.code&&(0,f.checkNoUnwrappedItemOptionPairs)(t.plugins[e-1],n,"plugin",e,r),r}}const l=[];for(let e=0;e<t.presets.length;e++){const i=t.presets[e];if(!1!==i.options)try{l.push({preset:yield*S(i,r),pass:i.ownPass?[]:n})}catch(n){throw e>0&&"BABEL_UNKNOWN_OPTION"===n.code&&(0,f.checkNoUnwrappedItemOptionPairs)(t.presets[e-1],i,"preset",e,n),n}}if(l.length>0){o.splice(1,0,...l.map(e=>e.pass).filter(e=>e!==n));for(const{preset:t,pass:n}of l){if(!t)return!0;if(yield*e({plugins:t.plugins,presets:t.presets},n))return!0;t.options.forEach(e=>{(0,s.mergeOptions)(i,e)})}}a.length>0&&n.unshift(...a)}({plugins:e.map(e=>{const t=(0,l.getItemDescriptor)(e);if(!t)throw new Error("Assertion failure - must be config item");return t}),presets:t.map(e=>{const t=(0,l.getItemDescriptor)(e);if(!t)throw new Error("Assertion failure - must be config item");return t})},o[0]))return null}catch(e){throw/^\[BABEL\]/.test(e.message)||(e.message=`[BABEL] ${r.filename||"unknown"}: ${e.message}`),e}const a=i;return(0,s.mergeOptions)(a,n),a.plugins=o[0],a.presets=o.slice(1).filter(e=>e.length>0).map(e=>({plugins:e})),a.passPerPreset=a.presets.length>0,{options:a,passes:o}}));t.default=v;const b=(0,p.makeWeakCache)((function*({value:e,options:t,dirname:n,alias:r},i){if(!1===t)throw new Error("Assertion failure");t=t||{};let s=e;if("function"==typeof e){const a=Object.assign({},o,{},(0,h.default)(i));try{s=e(a,t,n)}catch(e){throw r&&(e.message+=` (While processing: ${JSON.stringify(r)})`),e}}if(!s||"object"!=typeof s)throw new Error("Plugin/Preset did not return an object.");if("function"==typeof s.then)throw yield*[],new Error("You appear to be using an async plugin, which your current version of Babel does not support. If you're using a published plugin, you may need to upgrade your @babel/core version.");return{value:s,options:t,dirname:n,alias:r}}));function*E(e,t){if(e.value instanceof a.default){if(e.options)throw new Error("Passed options to an existing Plugin instance will not work.");return e.value}return yield*T(yield*b(e,t),t)}const T=(0,p.makeWeakCache)((function*({value:e,options:t,dirname:n,alias:r},s){const o=(0,d.validatePluginObject)(e),l=Object.assign({},o);if(l.visitor&&(l.visitor=c().default.explode(Object.assign({},l.visitor))),l.inherits){const e={name:void 0,alias:`${r}$inherits`,value:l.inherits,options:t,dirname:n},o=yield*(0,i.forwardAsync)(E,t=>s.invalidate(n=>t(e,n)));l.pre=A(o.pre,l.pre),l.post=A(o.post,l.post),l.manipulateOptions=A(o.manipulateOptions,l.manipulateOptions),l.visitor=c().default.visitors.merge([o.visitor||{},l.visitor||{}])}return new a.default(l,t,r)})),x=(e,t)=>{if(e.test||e.include||e.exclude){const e=t.name?`"${t.name}"`:"/* your preset */";throw new Error([`Preset ${e} requires a filename to be set when babel is called directly,`,"```",`babel.transform(code, { filename: 'file.ts', presets: [${e}] });`,"```","See https://babeljs.io/docs/en/options#filename for more information."].join("\n"))}};function*S(e,t){const n=w(yield*b(e,t));return((e,t,n)=>{if(!t.filename){const{options:t}=e;x(t,n),t.overrides&&t.overrides.forEach(e=>x(e,n))}})(n,t,e),yield*(0,u.buildPresetChain)(n,t)}const w=(0,p.makeWeakCacheSync)(({value:e,dirname:t,alias:n})=>({options:(0,f.validate)("preset",e),alias:n,dirname:t}));function A(e,t){const n=[e,t].filter(Boolean);return n.length<=1?n[0]:function(...e){for(const t of n)t.apply(this,e)}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;t.default={auxiliaryComment:{message:"Use `auxiliaryCommentBefore` or `auxiliaryCommentAfter`"},blacklist:{message:"Put the specific transforms you want in the `plugins` option"},breakConfig:{message:"This is not a necessary option in Babel 6"},experimental:{message:"Put the specific transforms you want in the `plugins` option"},externalHelpers:{message:"Use the `external-helpers` plugin instead. Check out http://babeljs.io/docs/plugins/external-helpers/"},extra:{message:""},jsxPragma:{message:"use the `pragma` option in the `react-jsx` plugin. Check out http://babeljs.io/docs/plugins/transform-react-jsx/"},loose:{message:"Specify the `loose` option for the relevant plugin you are using or use a preset that sets the option."},metadataUsedHelpers:{message:"Not required anymore as this is enabled by default"},modules:{message:"Use the corresponding module transform plugin in the `plugins` option. Check out http://babeljs.io/docs/plugins/#modules"},nonStandard:{message:"Use the `react-jsx` and `flow-strip-types` plugins to support JSX and Flow. Also check out the react preset http://babeljs.io/docs/plugins/preset-react/"},optional:{message:"Put the specific transforms you want in the `plugins` option"},sourceMapName:{message:"The `sourceMapName` option has been removed because it makes more sense for the tooling that calls Babel to assign `map.file` themselves."},stage:{message:"Check out the corresponding stage-x presets http://babeljs.io/docs/plugins/#presets"},whitelist:{message:"Put the specific transforms you want in the `plugins` option"},resolveModuleSource:{version:6,message:"Use `babel-plugin-module-resolver@3`'s 'resolvePath' options"},metadata:{version:6,message:"Generated plugin metadata is always included in the output result"},sourceMapTarget:{version:6,message:"The `sourceMapTarget` option has been removed because it makes more sense for the tooling that calls Babel to assign `map.file` themselves."}}},function(e,t,n){"use strict";function r(){const e=s(n(18));return r=function(){return e},e}function i(){const e=s(n(413));return i=function(){return e},e}function s(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){const n=r().default.resolve(t,e).split(r().default.sep);return new RegExp(["^",...n.map((e,t)=>{const r=t===n.length-1;return"**"===e?r?f:p:"*"===e?r?c:u:0===e.indexOf("*.")?l+(0,i().default)(e.slice(1))+(r?a:o):(0,i().default)(e)+(r?a:o)})].join(""))};const o=`\\${r().default.sep}`,a=`(?:${o}|$)`,l=`[^${o}]+`,u=`(?:${l}${o})`,c=`(?:${l}${a})`,p=`${u}*?`,f=`${u}*?${c}?`},function(e,t,n){var r=n(83),i=/[\\^$.*+?()[\]{}|]/g,s=RegExp(i.source);e.exports=function(e){return(e=r(e))&&s.test(e)?e.replace(i,"\\$&"):e}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.validatePluginObject=function(e){const t={type:"root",source:"plugin"};return Object.keys(e).forEach(n=>{const r=i[n],s={type:"option",name:n,parent:t};if(!r){const e=new Error(`.${n} is not a valid Plugin property`);throw e.code="BABEL_UNKNOWN_PLUGIN_PROPERTY",e}r(s,e[n])}),e};var r=n(159);const i={name:r.assertString,manipulateOptions:r.assertFunction,pre:r.assertFunction,post:r.assertFunction,inherits:r.assertFunction,visitor:function(e,t){const n=(0,r.assertObject)(e,t);if(n&&(Object.keys(n).forEach(e=>function(e,t){if(t&&"object"==typeof t)Object.keys(t).forEach(t=>{if("enter"!==t&&"exit"!==t)throw new Error(`.visitor["${e}"] may only have .enter and/or .exit handlers.`)});else if("function"!=typeof t)throw new Error(`.visitor["${e}"] must be a function`);return t}(e,n[e])),n.enter||n.exit))throw new Error(`.${e} cannot contain catch-all "enter" or "exit" handlers. Please target individual nodes.`);return n},parserOverride:r.assertFunction,generatorOverride:r.assertFunction}},function(e,t,n){"use strict";function r(){const e=(t=n(154))&&t.__esModule?t:{default:t};var t;return r=function(){return e},e}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return{version:i.version,cache:e.simple(),env:t=>e.using(e=>void 0===t?e.envName:"function"==typeof t?(0,s.assertSimpleType)(t(e.envName)):(Array.isArray(t)||(t=[t]),t.some(t=>{if("string"!=typeof t)throw new Error("Unexpected non-string value");return t===e.envName}))),async:()=>!1,caller:t=>e.using(e=>(0,s.assertSimpleType)(t(e.caller))),assertVersion:o,tokTypes:void 0}};var i=n(57),s=n(53);function o(e){if("number"==typeof e){if(!Number.isInteger(e))throw new Error("Expected string or integer value.");e=`^${e}.0.0-0`}if("string"!=typeof e)throw new Error("Expected string or integer value.");if(r().default.satisfies(i.version,e))return;const t=Error.stackTraceLimit;"number"==typeof t&&t<25&&(Error.stackTraceLimit=25);const n=new Error(`Requires Babel "${e}", but was loaded with "${i.version}". `+'If you are sure you have a compatible version of @babel/core, it is likely that something in your build process is loading the wrong version. Inspect the stack trace of this error to look for the first entry that doesn\'t mention "@babel/core" or "babel-core" to see what is calling Babel.');throw"number"==typeof t&&(Error.stackTraceLimit=t),Object.assign(n,{code:"BABEL_VERSION_UNSUPPORTED",version:i.version,range:e})}},function(e,t,n){"use strict";function r(){const e=o(n(19));return r=function(){return e},e}Object.defineProperty(t,"__esModule",{value:!0}),t.transformAsync=t.transformSync=t.transform=void 0;var i=o(n(33)),s=n(161);function o(e){return e&&e.__esModule?e:{default:e}}const a=(0,r().default)((function*(e,t){const n=yield*(0,i.default)(t);return null===n?null:yield*(0,s.run)(n,e)}));t.transform=function(e,t,n){if("function"==typeof t&&(n=t,t=void 0),void 0===n)return a.sync(e,t);a.errback(e,t,n)};const l=a.sync;t.transformSync=l;const u=a.async;t.transformAsync=u},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;t.default=class{constructor(e,t,n){this._map=new Map,this.key=t,this.file=e,this.opts=n||{},this.cwd=e.opts.cwd,this.filename=e.opts.filename}set(e,t){this._map.set(e,t)}get(e){return this._map.get(e)}availableHelper(e,t){return this.file.availableHelper(e,t)}addHelper(e){return this.file.addHelper(e)}addImport(){return this.file.addImport()}getModuleName(){return this.file.getModuleName()}buildCodeFrameError(e,t,n){return this.file.buildCodeFrameError(e,t,n)}}},function(e,t,n){"use strict";function r(){const e=s(n(419));return r=function(){return e},e}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){if(!o){const e=i.default.sync({babelrc:!1,configFile:!1,plugins:[a]});if(o=e?e.passes[0][0]:void 0,!o)throw new Error("Assertion failure")}return o};var i=s(n(33));function s(e){return e&&e.__esModule?e:{default:e}}let o;const a={name:"internal.blockHoist",visitor:{Block:{exit({node:e}){let t=!1;for(let n=0;n<e.body.length;n++){const r=e.body[n];if(r&&null!=r._blockHoist){t=!0;break}}t&&(e.body=(0,r().default)(e.body,(function(e){let t=e&&e._blockHoist;return null==t&&(t=1),!0===t&&(t=2),-1*t})))}}}}},function(e,t,n){var r=n(420),i=n(422),s=n(143),o=n(82),a=s((function(e,t){if(null==e)return[];var n=t.length;return n>1&&o(e,t[0],t[1])?t=[]:n>2&&o(t[0],t[1],t[2])&&(t=[t[0]]),i(e,r(t,1),[])}));e.exports=a},function(e,t,n){var r=n(69),i=n(421);e.exports=function e(t,n,s,o,a){var l=-1,u=t.length;for(s||(s=i),a||(a=[]);++l<u;){var c=t[l];n>0&&s(c)?n>1?e(c,n-1,s,o,a):r(a,c):o||(a[a.length]=c)}return a}},function(e,t,n){var r=n(22),i=n(62),s=n(8),o=r?r.isConcatSpreadable:void 0;e.exports=function(e){return s(e)||i(e)||!!(o&&e&&e[o])}},function(e,t,n){var r=n(81),i=n(423),s=n(443),o=n(449),a=n(28),l=n(450),u=n(46);e.exports=function(e,t,n){var c=-1;t=r(t.length?t:[u],a(i));var p=s(e,(function(e,n,i){return{criteria:r(t,(function(t){return t(e)})),index:++c,value:e}}));return o(p,(function(e,t){return l(e,t,n)}))}},function(e,t,n){var r=n(424),i=n(432),s=n(46),o=n(8),a=n(440);e.exports=function(e){return"function"==typeof e?e:null==e?s:"object"==typeof e?o(e)?i(e[0],e[1]):r(e):a(e)}},function(e,t,n){var r=n(425),i=n(431),s=n(165);e.exports=function(e){var t=i(e);return 1==t.length&&t[0][2]?s(t[0][0],t[0][1]):function(n){return n===e||r(n,e,t)}}},function(e,t,n){var r=n(59),i=n(162);e.exports=function(e,t,n,s){var o=n.length,a=o,l=!s;if(null==e)return!a;for(e=Object(e);o--;){var u=n[o];if(l&&u[2]?u[1]!==e[u[0]]:!(u[0]in e))return!1}for(;++o<a;){var c=(u=n[o])[0],p=e[c],f=u[1];if(l&&u[2]){if(void 0===p&&!(c in e))return!1}else{var d=new r;if(s)var h=s(p,f,c,e,t,d);if(!(void 0===h?i(f,p,3,s,d):h))return!1}}return!0}},function(e,t,n){var r=n(59),i=n(163),s=n(428),o=n(430),a=n(43),l=n(8),u=n(63),c=n(113),p="[object Object]",f=Object.prototype.hasOwnProperty;e.exports=function(e,t,n,d,h,m){var y=l(e),g=l(t),v=y?"[object Array]":a(e),b=g?"[object Array]":a(t),E=(v="[object Arguments]"==v?p:v)==p,T=(b="[object Arguments]"==b?p:b)==p,x=v==b;if(x&&u(e)){if(!u(t))return!1;y=!0,E=!1}if(x&&!E)return m||(m=new r),y||c(e)?i(e,t,n,d,h,m):s(e,t,v,n,d,h,m);if(!(1&n)){var S=E&&f.call(e,"__wrapped__"),w=T&&f.call(t,"__wrapped__");if(S||w){var A=S?e.value():e,P=w?t.value():t;return m||(m=new r),h(A,P,n,d,m)}}return!!x&&(m||(m=new r),o(e,t,n,d,h,m))}},function(e,t){e.exports=function(e,t){for(var n=-1,r=null==e?0:e.length;++n<r;)if(t(e[n],n,e))return!0;return!1}},function(e,t,n){var r=n(22),i=n(120),s=n(27),o=n(163),a=n(429),l=n(77),u=r?r.prototype:void 0,c=u?u.valueOf:void 0;e.exports=function(e,t,n,r,u,p,f){switch(n){case"[object DataView]":if(e.byteLength!=t.byteLength||e.byteOffset!=t.byteOffset)return!1;e=e.buffer,t=t.buffer;case"[object ArrayBuffer]":return!(e.byteLength!=t.byteLength||!p(new i(e),new i(t)));case"[object Boolean]":case"[object Date]":case"[object Number]":return s(+e,+t);case"[object Error]":return e.name==t.name&&e.message==t.message;case"[object RegExp]":case"[object String]":return e==t+"";case"[object Map]":var d=a;case"[object Set]":var h=1&r;if(d||(d=l),e.size!=t.size&&!h)return!1;var m=f.get(e);if(m)return m==t;r|=2,f.set(e,t);var y=o(d(e),d(t),r,u,p,f);return f.delete(e),y;case"[object Symbol]":if(c)return c.call(e)==c.call(t)}return!1}},function(e,t){e.exports=function(e){var t=-1,n=Array(e.size);return e.forEach((function(e,r){n[++t]=[r,e]})),n}},function(e,t,n){var r=n(117),i=Object.prototype.hasOwnProperty;e.exports=function(e,t,n,s,o,a){var l=1&n,u=r(e),c=u.length;if(c!=r(t).length&&!l)return!1;for(var p=c;p--;){var f=u[p];if(!(l?f in t:i.call(t,f)))return!1}var d=a.get(e);if(d&&a.get(t))return d==t;var h=!0;a.set(e,t),a.set(t,e);for(var m=l;++p<c;){var y=e[f=u[p]],g=t[f];if(s)var v=l?s(g,y,f,t,e,a):s(y,g,f,e,t,a);if(!(void 0===v?y===g||o(y,g,n,s,a):v)){h=!1;break}m||(m="constructor"==f)}if(h&&!m){var b=e.constructor,E=t.constructor;b!=E&&"constructor"in e&&"constructor"in t&&!("function"==typeof b&&b instanceof b&&"function"==typeof E&&E instanceof E)&&(h=!1)}return a.delete(e),a.delete(t),h}},function(e,t,n){var r=n(164),i=n(23);e.exports=function(e){for(var t=i(e),n=t.length;n--;){var s=t[n],o=e[s];t[n]=[s,o,r(o)]}return t}},function(e,t,n){var r=n(162),i=n(433),s=n(437),o=n(89),a=n(164),l=n(165),u=n(54);e.exports=function(e,t){return o(e)&&a(t)?l(u(e),t):function(n){var o=i(n,e);return void 0===o&&o===t?s(n,e):r(t,o,3)}}},function(e,t,n){var r=n(166);e.exports=function(e,t,n){var i=null==e?void 0:r(e,t);return void 0===i?n:i}},function(e,t,n){var r=n(435),i=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,s=/\\(\\)?/g,o=r((function(e){var t=[];return 46===e.charCodeAt(0)&&t.push(""),e.replace(i,(function(e,n,r,i){t.push(r?i.replace(s,"$1"):n||e)})),t}));e.exports=o},function(e,t,n){var r=n(436);e.exports=function(e){var t=r(e,(function(e){return 500===n.size&&n.clear(),e})),n=t.cache;return t}},function(e,t,n){var r=n(61);function i(e,t){if("function"!=typeof e||null!=t&&"function"!=typeof t)throw new TypeError("Expected a function");var n=function(){var r=arguments,i=t?t.apply(this,r):r[0],s=n.cache;if(s.has(i))return s.get(i);var o=e.apply(this,r);return n.cache=s.set(i,o)||s,o};return n.cache=new(i.Cache||r),n}i.Cache=r,e.exports=i},function(e,t,n){var r=n(438),i=n(439);e.exports=function(e,t){return null!=e&&i(e,t,r)}},function(e,t){e.exports=function(e,t){return null!=e&&t in Object(e)}},function(e,t,n){var r=n(167),i=n(62),s=n(8),o=n(64),a=n(65),l=n(54);e.exports=function(e,t,n){for(var u=-1,c=(t=r(t,e)).length,p=!1;++u<c;){var f=l(t[u]);if(!(p=null!=e&&n(e,f)))break;e=e[f]}return p||++u!=c?p:!!(c=null==e?0:e.length)&&a(c)&&o(f,c)&&(s(e)||i(e))}},function(e,t,n){var r=n(441),i=n(442),s=n(89),o=n(54);e.exports=function(e){return s(e)?r(o(e)):i(e)}},function(e,t){e.exports=function(e){return function(t){return null==t?void 0:t[e]}}},function(e,t,n){var r=n(166);e.exports=function(e){return function(t){return r(t,e)}}},function(e,t,n){var r=n(444),i=n(24);e.exports=function(e,t){var n=-1,s=i(e)?Array(e.length):[];return r(e,(function(e,r,i){s[++n]=t(e,r,i)})),s}},function(e,t,n){var r=n(445),i=n(448)(r);e.exports=i},function(e,t,n){var r=n(446),i=n(23);e.exports=function(e,t){return e&&r(e,t,i)}},function(e,t,n){var r=n(447)();e.exports=r},function(e,t){e.exports=function(e){return function(t,n,r){for(var i=-1,s=Object(t),o=r(t),a=o.length;a--;){var l=o[e?a:++i];if(!1===n(s[l],l,s))break}return t}}},function(e,t,n){var r=n(24);e.exports=function(e,t){return function(n,i){if(null==n)return n;if(!r(n))return e(n,i);for(var s=n.length,o=t?s:-1,a=Object(n);(t?o--:++o<s)&&!1!==i(a[o],o,a););return n}}},function(e,t){e.exports=function(e,t){var n=e.length;for(e.sort(t);n--;)e[n]=e[n].value;return e}},function(e,t,n){var r=n(451);e.exports=function(e,t,n){for(var i=-1,s=e.criteria,o=t.criteria,a=s.length,l=n.length;++i<a;){var u=r(s[i],o[i]);if(u)return i>=l?u:u*("desc"==n[i]?-1:1)}return e.index-t.index}},function(e,t,n){var r=n(31);e.exports=function(e,t){if(e!==t){var n=void 0!==e,i=null===e,s=e==e,o=r(e),a=void 0!==t,l=null===t,u=t==t,c=r(t);if(!l&&!c&&!o&&e>t||o&&a&&u&&!l&&!c||i&&a&&u||!n&&u||!s)return 1;if(!i&&!o&&!c&&e<t||c&&n&&s&&!i&&!o||l&&n&&s||!a&&s||!u)return-1}return 0}},function(e,t,n){"use strict";function r(){const e=f(n(453));return r=function(){return e},e}function i(){const e=f(n(18));return i=function(){return e},e}function s(){const e=f(n(78));return s=function(){return e},e}function o(){const e=f(n(454));return o=function(){return e},e}function a(){const e=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=p();if(t&&t.has(e))return t.get(e);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var i in e)if(Object.prototype.hasOwnProperty.call(e,i)){var s=r?Object.getOwnPropertyDescriptor(e,i):null;s&&(s.get||s.set)?Object.defineProperty(n,i,s):n[i]=e[i]}n.default=e,t&&t.set(e,n);return n}(n(1));return a=function(){return e},e}function l(){const e=f(n(169));return l=function(){return e},e}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function*(e,t,n,s){if(n=`${n||""}`,s){if("Program"===s.type)s=a().file(s,[],[]);else if("File"!==s.type)throw new Error("AST root must be a Program or File node");s=(0,o().default)(s)}else s=yield*(0,c.default)(e,t,n);let p=null;if(!1!==t.inputSourceMap){if("object"==typeof t.inputSourceMap&&(p=l().default.fromObject(t.inputSourceMap)),!p){const e=g(h,s);if(e)try{p=l().default.fromComment(e)}catch(e){d("discarding unknown inline input sourcemap",e)}}if(!p){const e=g(m,s);if("string"==typeof t.filename&&e)try{const n=m.exec(e),s=r().default.readFileSync(i().default.resolve(i().default.dirname(t.filename),n[1]));s.length>1e6?d("skip merging input map > 1 MB"):p=l().default.fromJSON(s)}catch(e){d("discarding unknown file input sourcemap",e)}else e&&d("discarding un-loadable file input sourcemap")}}return new u.default(t,{code:n,ast:s,inputMap:p})};var u=f(n(99)),c=f(n(170));function p(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return p=function(){return e},e}function f(e){return e&&e.__esModule?e:{default:e}}const d=(0,s().default)("babel:transform:file");const h=/^[@#]\s+sourceMappingURL=data:(?:application|text)\/json;(?:charset[:=]\S+?;)?base64,(?:.*)$/,m=/^[@#][ \t]+sourceMappingURL=([^\s'"`]+)[ \t]*$/;function y(e,t,n){return t&&(t=t.filter(({value:t})=>!e.test(t)||(n=t,!1))),[t,n]}function g(e,t){let n=null;return a().traverseFast(t,t=>{[t.leadingComments,n]=y(e,t.leadingComments,n),[t.innerComments,n]=y(e,t.innerComments,n),[t.trailingComments,n]=y(e,t.trailingComments,n)}),n}},function(e,t){},function(e,t,n){var r=n(105);e.exports=function(e){return r(e,5)}},function(e,t){},function(e,t,n){var r=n(150),i=r.Buffer;function s(e,t){for(var n in e)t[n]=e[n]}function o(e,t,n){return i(e,t,n)}i.from&&i.alloc&&i.allocUnsafe&&i.allocUnsafeSlow?e.exports=r:(s(r,t),t.Buffer=o),s(i,o),o.from=function(e,t,n){if("number"==typeof e)throw new TypeError("Argument must not be a number");return i(e,t,n)},o.alloc=function(e,t,n){if("number"!=typeof e)throw new TypeError("Argument must be a number");var r=i(e);return void 0!==t?"string"==typeof n?r.fill(t,n):r.fill(t):r.fill(0),r},o.allocUnsafe=function(e){if("number"!=typeof e)throw new TypeError("Argument must be a number");return i(e)},o.allocUnsafeSlow=function(e){if("number"!=typeof e)throw new TypeError("Argument must be a number");return r.SlowBuffer(e)}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,n){let s=`Support for the experimental syntax '${e}' isn't currently enabled `+`(${t.line}:${t.column+1}):\n\n`+n;const o=r[e];if(o){const{syntax:e,transform:t}=o;if(e)if(t){const e=i(t);s+=`\n\nAdd ${e} to the 'plugins' section of your Babel config `+"to enable transformation."}else{const t=i(e);s+=`\n\nAdd ${t} to the 'plugins' section of your Babel config `+"to enable parsing."}}return s};const r={classProperties:{syntax:{name:"@babel/plugin-syntax-class-properties",url:"https://git.io/vb4yQ"},transform:{name:"@babel/plugin-proposal-class-properties",url:"https://git.io/vb4SL"}},decorators:{syntax:{name:"@babel/plugin-syntax-decorators",url:"https://git.io/vb4y9"},transform:{name:"@babel/plugin-proposal-decorators",url:"https://git.io/vb4ST"}},doExpressions:{syntax:{name:"@babel/plugin-syntax-do-expressions",url:"https://git.io/vb4yh"},transform:{name:"@babel/plugin-proposal-do-expressions",url:"https://git.io/vb4S3"}},dynamicImport:{syntax:{name:"@babel/plugin-syntax-dynamic-import",url:"https://git.io/vb4Sv"}},exportDefaultFrom:{syntax:{name:"@babel/plugin-syntax-export-default-from",url:"https://git.io/vb4SO"},transform:{name:"@babel/plugin-proposal-export-default-from",url:"https://git.io/vb4yH"}},exportNamespaceFrom:{syntax:{name:"@babel/plugin-syntax-export-namespace-from",url:"https://git.io/vb4Sf"},transform:{name:"@babel/plugin-proposal-export-namespace-from",url:"https://git.io/vb4SG"}},flow:{syntax:{name:"@babel/plugin-syntax-flow",url:"https://git.io/vb4yb"},transform:{name:"@babel/plugin-transform-flow-strip-types",url:"https://git.io/vb49g"}},functionBind:{syntax:{name:"@babel/plugin-syntax-function-bind",url:"https://git.io/vb4y7"},transform:{name:"@babel/plugin-proposal-function-bind",url:"https://git.io/vb4St"}},functionSent:{syntax:{name:"@babel/plugin-syntax-function-sent",url:"https://git.io/vb4yN"},transform:{name:"@babel/plugin-proposal-function-sent",url:"https://git.io/vb4SZ"}},importMeta:{syntax:{name:"@babel/plugin-syntax-import-meta",url:"https://git.io/vbKK6"}},jsx:{syntax:{name:"@babel/plugin-syntax-jsx",url:"https://git.io/vb4yA"},transform:{name:"@babel/plugin-transform-react-jsx",url:"https://git.io/vb4yd"}},logicalAssignment:{syntax:{name:"@babel/plugin-syntax-logical-assignment-operators",url:"https://git.io/vAlBp"},transform:{name:"@babel/plugin-proposal-logical-assignment-operators",url:"https://git.io/vAlRe"}},numericSeparator:{syntax:{name:"@babel/plugin-syntax-numeric-separator",url:"https://git.io/vb4Sq"},transform:{name:"@babel/plugin-proposal-numeric-separator",url:"https://git.io/vb4yS"}},optionalChaining:{syntax:{name:"@babel/plugin-syntax-optional-chaining",url:"https://git.io/vb4Sc"},transform:{name:"@babel/plugin-proposal-optional-chaining",url:"https://git.io/vb4Sk"}},pipelineOperator:{syntax:{name:"@babel/plugin-syntax-pipeline-operator",url:"https://git.io/vb4yj"},transform:{name:"@babel/plugin-proposal-pipeline-operator",url:"https://git.io/vb4SU"}},throwExpressions:{syntax:{name:"@babel/plugin-syntax-throw-expressions",url:"https://git.io/vb4SJ"},transform:{name:"@babel/plugin-proposal-throw-expressions",url:"https://git.io/vb4yF"}},typescript:{syntax:{name:"@babel/plugin-syntax-typescript",url:"https://git.io/vb4SC"},transform:{name:"@babel/plugin-transform-typescript",url:"https://git.io/vb4Sm"}},asyncGenerators:{syntax:{name:"@babel/plugin-syntax-async-generators",url:"https://git.io/vb4SY"},transform:{name:"@babel/plugin-proposal-async-generator-functions",url:"https://git.io/vb4yp"}},nullishCoalescingOperator:{syntax:{name:"@babel/plugin-syntax-nullish-coalescing-operator",url:"https://git.io/vb4yx"},transform:{name:"@babel/plugin-proposal-nullish-coalescing-operator",url:"https://git.io/vb4Se"}},objectRestSpread:{syntax:{name:"@babel/plugin-syntax-object-rest-spread",url:"https://git.io/vb4y5"},transform:{name:"@babel/plugin-proposal-object-rest-spread",url:"https://git.io/vb4Ss"}},optionalCatchBinding:{syntax:{name:"@babel/plugin-syntax-optional-catch-binding",url:"https://git.io/vb4Sn"},transform:{name:"@babel/plugin-proposal-optional-catch-binding",url:"https://git.io/vb4SI"}}},i=({name:e,url:t})=>`${e} (${t})`},function(e,t,n){"use strict";function r(){const e=o(n(169));return r=function(){return e},e}function i(){const e=o(n(84));return i=function(){return e},e}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){const{opts:n,ast:o,code:a,inputMap:l}=t,u=[];for(const t of e)for(const e of t){const{generatorOverride:t}=e;if(t){const e=t(o,n.generatorOpts,a,i().default);void 0!==e&&u.push(e)}}let c;if(0===u.length)c=(0,i().default)(o,n.generatorOpts,a);else{if(1!==u.length)throw new Error("More than one plugin attempted to override codegen.");if(c=u[0],"function"==typeof c.then)throw new Error("You appear to be using an async codegen plugin, which your current version of Babel does not support. If you're using a published plugin, you may need to upgrade your @babel/core version.")}let{code:p,map:f}=c;f&&l&&(f=(0,s.default)(l.toObject(),f));"inline"!==n.sourceMaps&&"both"!==n.sourceMaps||(p+="\n"+r().default.fromObject(f).toComment());"inline"===n.sourceMaps&&(f=null);return{outputCode:p,outputMap:f}};var s=o(n(459));function o(e){return e&&e.__esModule?e:{default:e}}},function(e,t,n){"use strict";function r(){const e=(t=n(460))&&t.__esModule?t:{default:t};var t;return r=function(){return e},e}function i(e){return`${e.line}/${e.columnStart}`}function s(e){const t=new(r().default.SourceMapConsumer)(Object.assign({},e,{sourceRoot:null})),n=new Map,i=new Map;let s=null;return t.computeColumnSpans(),t.eachMapping(e=>{if(null===e.originalLine)return;let r=n.get(e.source);r||(r={path:e.source,content:t.sourceContentFor(e.source,!0)},n.set(e.source,r));let o=i.get(r);o||(o={source:r,mappings:[]},i.set(r,o));const a={line:e.originalLine,columnStart:e.originalColumn,columnEnd:1/0,name:e.name};s&&s.source===r&&s.mapping.line===e.originalLine&&(s.mapping.columnEnd=e.originalColumn),s={source:r,mapping:a},o.mappings.push({original:a,generated:t.allGeneratedPositionsFor({source:e.source,line:e.originalLine,column:e.originalColumn}).map(e=>({line:e.line,columnStart:e.column,columnEnd:e.lastColumn+1}))})},null,r().default.SourceMapConsumer.ORIGINAL_ORDER),{file:e.file,sourceRoot:e.sourceRoot,sources:Array.from(i.values())}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){const n=s(e),o=s(t),a=new(r().default.SourceMapGenerator);for(const{source:e}of n.sources)"string"==typeof e.content&&a.setSourceContent(e.path,e.content);if(1===o.sources.length){const e=o.sources[0],t=new Map;!function(e,t){for(const{source:n,mappings:r}of e.sources)for(const{original:e,generated:i}of r)for(const r of i)t(r,e,n)}(n,(n,r,s)=>{!function(e,t,n){const r=function({mappings:e},{line:t,columnStart:n,columnEnd:r}){return function(e,t){const n=function(e,t){let n=0,r=e.length;for(;n<r;){const i=Math.floor((n+r)/2),s=e[i],o=t(s);if(0===o){n=i;break}o>=0?r=i:n=i+1}let i=n;if(i<e.length){for(;i>=0&&t(e[i])>=0;)i--;return i+1}return i}(e,t),r=[];for(let i=n;i<e.length&&0===t(e[i]);i++)r.push(e[i]);return r}(e,({original:e})=>t>e.line?-1:t<e.line?1:n>=e.columnEnd?-1:r<=e.columnStart?1:0)}(e,t);for(const{generated:e}of r)for(const t of e)n(t)}(e,n,e=>{const n=i(e);t.has(n)||(t.set(n,e),a.addMapping({source:s.path,original:{line:r.line,column:r.columnStart},generated:{line:e.line,column:e.columnStart},name:r.name}))})});for(const e of t.values()){if(e.columnEnd===1/0)continue;const n={line:e.line,columnStart:e.columnEnd},r=i(n);t.has(r)||a.addMapping({generated:{line:n.line,column:n.columnStart}})}}const l=a.toJSON();"string"==typeof n.sourceRoot&&(l.sourceRoot=n.sourceRoot);return l}},function(e,t,n){t.SourceMapGenerator=n(171).SourceMapGenerator,t.SourceMapConsumer=n(463).SourceMapConsumer,t.SourceNode=n(466).SourceNode},function(e,t){var n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");t.encode=function(e){if(0<=e&&e<n.length)return n[e];throw new TypeError("Must be between 0 and 63: "+e)},t.decode=function(e){return 65<=e&&e<=90?e-65:97<=e&&e<=122?e-97+26:48<=e&&e<=57?e-48+52:43==e?62:47==e?63:-1}},function(e,t,n){var r=n(34);function i(){this._array=[],this._sorted=!0,this._last={generatedLine:-1,generatedColumn:0}}i.prototype.unsortedForEach=function(e,t){this._array.forEach(e,t)},i.prototype.add=function(e){var t,n,i,s,o,a;t=this._last,n=e,i=t.generatedLine,s=n.generatedLine,o=t.generatedColumn,a=n.generatedColumn,s>i||s==i&&a>=o||r.compareByGeneratedPositionsInflated(t,n)<=0?(this._last=e,this._array.push(e)):(this._sorted=!1,this._array.push(e))},i.prototype.toArray=function(){return this._sorted||(this._array.sort(r.compareByGeneratedPositionsInflated),this._sorted=!0),this._array},t.MappingList=i},function(e,t,n){var r=n(34),i=n(464),s=n(173).ArraySet,o=n(172),a=n(465).quickSort;function l(e){var t=e;return"string"==typeof e&&(t=JSON.parse(e.replace(/^\)\]\}'/,""))),null!=t.sections?new p(t):new u(t)}function u(e){var t=e;"string"==typeof e&&(t=JSON.parse(e.replace(/^\)\]\}'/,"")));var n=r.getArg(t,"version"),i=r.getArg(t,"sources"),o=r.getArg(t,"names",[]),a=r.getArg(t,"sourceRoot",null),l=r.getArg(t,"sourcesContent",null),u=r.getArg(t,"mappings"),c=r.getArg(t,"file",null);if(n!=this._version)throw new Error("Unsupported version: "+n);i=i.map(String).map(r.normalize).map((function(e){return a&&r.isAbsolute(a)&&r.isAbsolute(e)?r.relative(a,e):e})),this._names=s.fromArray(o.map(String),!0),this._sources=s.fromArray(i,!0),this.sourceRoot=a,this.sourcesContent=l,this._mappings=u,this.file=c}function c(){this.generatedLine=0,this.generatedColumn=0,this.source=null,this.originalLine=null,this.originalColumn=null,this.name=null}function p(e){var t=e;"string"==typeof e&&(t=JSON.parse(e.replace(/^\)\]\}'/,"")));var n=r.getArg(t,"version"),i=r.getArg(t,"sections");if(n!=this._version)throw new Error("Unsupported version: "+n);this._sources=new s,this._names=new s;var o={line:-1,column:0};this._sections=i.map((function(e){if(e.url)throw new Error("Support for url field in sections not implemented.");var t=r.getArg(e,"offset"),n=r.getArg(t,"line"),i=r.getArg(t,"column");if(n<o.line||n===o.line&&i<o.column)throw new Error("Section offsets must be ordered and non-overlapping.");return o=t,{generatedOffset:{generatedLine:n+1,generatedColumn:i+1},consumer:new l(r.getArg(e,"map"))}}))}l.fromSourceMap=function(e){return u.fromSourceMap(e)},l.prototype._version=3,l.prototype.__generatedMappings=null,Object.defineProperty(l.prototype,"_generatedMappings",{get:function(){return this.__generatedMappings||this._parseMappings(this._mappings,this.sourceRoot),this.__generatedMappings}}),l.prototype.__originalMappings=null,Object.defineProperty(l.prototype,"_originalMappings",{get:function(){return this.__originalMappings||this._parseMappings(this._mappings,this.sourceRoot),this.__originalMappings}}),l.prototype._charIsMappingSeparator=function(e,t){var n=e.charAt(t);return";"===n||","===n},l.prototype._parseMappings=function(e,t){throw new Error("Subclasses must implement _parseMappings")},l.GENERATED_ORDER=1,l.ORIGINAL_ORDER=2,l.GREATEST_LOWER_BOUND=1,l.LEAST_UPPER_BOUND=2,l.prototype.eachMapping=function(e,t,n){var i,s=t||null;switch(n||l.GENERATED_ORDER){case l.GENERATED_ORDER:i=this._generatedMappings;break;case l.ORIGINAL_ORDER:i=this._originalMappings;break;default:throw new Error("Unknown order of iteration.")}var o=this.sourceRoot;i.map((function(e){var t=null===e.source?null:this._sources.at(e.source);return null!=t&&null!=o&&(t=r.join(o,t)),{source:t,generatedLine:e.generatedLine,generatedColumn:e.generatedColumn,originalLine:e.originalLine,originalColumn:e.originalColumn,name:null===e.name?null:this._names.at(e.name)}}),this).forEach(e,s)},l.prototype.allGeneratedPositionsFor=function(e){var t=r.getArg(e,"line"),n={source:r.getArg(e,"source"),originalLine:t,originalColumn:r.getArg(e,"column",0)};if(null!=this.sourceRoot&&(n.source=r.relative(this.sourceRoot,n.source)),!this._sources.has(n.source))return[];n.source=this._sources.indexOf(n.source);var s=[],o=this._findMapping(n,this._originalMappings,"originalLine","originalColumn",r.compareByOriginalPositions,i.LEAST_UPPER_BOUND);if(o>=0){var a=this._originalMappings[o];if(void 0===e.column)for(var l=a.originalLine;a&&a.originalLine===l;)s.push({line:r.getArg(a,"generatedLine",null),column:r.getArg(a,"generatedColumn",null),lastColumn:r.getArg(a,"lastGeneratedColumn",null)}),a=this._originalMappings[++o];else for(var u=a.originalColumn;a&&a.originalLine===t&&a.originalColumn==u;)s.push({line:r.getArg(a,"generatedLine",null),column:r.getArg(a,"generatedColumn",null),lastColumn:r.getArg(a,"lastGeneratedColumn",null)}),a=this._originalMappings[++o]}return s},t.SourceMapConsumer=l,u.prototype=Object.create(l.prototype),u.prototype.consumer=l,u.fromSourceMap=function(e){var t=Object.create(u.prototype),n=t._names=s.fromArray(e._names.toArray(),!0),i=t._sources=s.fromArray(e._sources.toArray(),!0);t.sourceRoot=e._sourceRoot,t.sourcesContent=e._generateSourcesContent(t._sources.toArray(),t.sourceRoot),t.file=e._file;for(var o=e._mappings.toArray().slice(),l=t.__generatedMappings=[],p=t.__originalMappings=[],f=0,d=o.length;f<d;f++){var h=o[f],m=new c;m.generatedLine=h.generatedLine,m.generatedColumn=h.generatedColumn,h.source&&(m.source=i.indexOf(h.source),m.originalLine=h.originalLine,m.originalColumn=h.originalColumn,h.name&&(m.name=n.indexOf(h.name)),p.push(m)),l.push(m)}return a(t.__originalMappings,r.compareByOriginalPositions),t},u.prototype._version=3,Object.defineProperty(u.prototype,"sources",{get:function(){return this._sources.toArray().map((function(e){return null!=this.sourceRoot?r.join(this.sourceRoot,e):e}),this)}}),u.prototype._parseMappings=function(e,t){for(var n,i,s,l,u,p=1,f=0,d=0,h=0,m=0,y=0,g=e.length,v=0,b={},E={},T=[],x=[];v<g;)if(";"===e.charAt(v))p++,v++,f=0;else if(","===e.charAt(v))v++;else{for((n=new c).generatedLine=p,l=v;l<g&&!this._charIsMappingSeparator(e,l);l++);if(s=b[i=e.slice(v,l)])v+=i.length;else{for(s=[];v<l;)o.decode(e,v,E),u=E.value,v=E.rest,s.push(u);if(2===s.length)throw new Error("Found a source, but no line and column");if(3===s.length)throw new Error("Found a source and line, but no column");b[i]=s}n.generatedColumn=f+s[0],f=n.generatedColumn,s.length>1&&(n.source=m+s[1],m+=s[1],n.originalLine=d+s[2],d=n.originalLine,n.originalLine+=1,n.originalColumn=h+s[3],h=n.originalColumn,s.length>4&&(n.name=y+s[4],y+=s[4])),x.push(n),"number"==typeof n.originalLine&&T.push(n)}a(x,r.compareByGeneratedPositionsDeflated),this.__generatedMappings=x,a(T,r.compareByOriginalPositions),this.__originalMappings=T},u.prototype._findMapping=function(e,t,n,r,s,o){if(e[n]<=0)throw new TypeError("Line must be greater than or equal to 1, got "+e[n]);if(e[r]<0)throw new TypeError("Column must be greater than or equal to 0, got "+e[r]);return i.search(e,t,s,o)},u.prototype.computeColumnSpans=function(){for(var e=0;e<this._generatedMappings.length;++e){var t=this._generatedMappings[e];if(e+1<this._generatedMappings.length){var n=this._generatedMappings[e+1];if(t.generatedLine===n.generatedLine){t.lastGeneratedColumn=n.generatedColumn-1;continue}}t.lastGeneratedColumn=1/0}},u.prototype.originalPositionFor=function(e){var t={generatedLine:r.getArg(e,"line"),generatedColumn:r.getArg(e,"column")},n=this._findMapping(t,this._generatedMappings,"generatedLine","generatedColumn",r.compareByGeneratedPositionsDeflated,r.getArg(e,"bias",l.GREATEST_LOWER_BOUND));if(n>=0){var i=this._generatedMappings[n];if(i.generatedLine===t.generatedLine){var s=r.getArg(i,"source",null);null!==s&&(s=this._sources.at(s),null!=this.sourceRoot&&(s=r.join(this.sourceRoot,s)));var o=r.getArg(i,"name",null);return null!==o&&(o=this._names.at(o)),{source:s,line:r.getArg(i,"originalLine",null),column:r.getArg(i,"originalColumn",null),name:o}}}return{source:null,line:null,column:null,name:null}},u.prototype.hasContentsOfAllSources=function(){return!!this.sourcesContent&&(this.sourcesContent.length>=this._sources.size()&&!this.sourcesContent.some((function(e){return null==e})))},u.prototype.sourceContentFor=function(e,t){if(!this.sourcesContent)return null;if(null!=this.sourceRoot&&(e=r.relative(this.sourceRoot,e)),this._sources.has(e))return this.sourcesContent[this._sources.indexOf(e)];var n;if(null!=this.sourceRoot&&(n=r.urlParse(this.sourceRoot))){var i=e.replace(/^file:\/\//,"");if("file"==n.scheme&&this._sources.has(i))return this.sourcesContent[this._sources.indexOf(i)];if((!n.path||"/"==n.path)&&this._sources.has("/"+e))return this.sourcesContent[this._sources.indexOf("/"+e)]}if(t)return null;throw new Error('"'+e+'" is not in the SourceMap.')},u.prototype.generatedPositionFor=function(e){var t=r.getArg(e,"source");if(null!=this.sourceRoot&&(t=r.relative(this.sourceRoot,t)),!this._sources.has(t))return{line:null,column:null,lastColumn:null};var n={source:t=this._sources.indexOf(t),originalLine:r.getArg(e,"line"),originalColumn:r.getArg(e,"column")},i=this._findMapping(n,this._originalMappings,"originalLine","originalColumn",r.compareByOriginalPositions,r.getArg(e,"bias",l.GREATEST_LOWER_BOUND));if(i>=0){var s=this._originalMappings[i];if(s.source===n.source)return{line:r.getArg(s,"generatedLine",null),column:r.getArg(s,"generatedColumn",null),lastColumn:r.getArg(s,"lastGeneratedColumn",null)}}return{line:null,column:null,lastColumn:null}},t.BasicSourceMapConsumer=u,p.prototype=Object.create(l.prototype),p.prototype.constructor=l,p.prototype._version=3,Object.defineProperty(p.prototype,"sources",{get:function(){for(var e=[],t=0;t<this._sections.length;t++)for(var n=0;n<this._sections[t].consumer.sources.length;n++)e.push(this._sections[t].consumer.sources[n]);return e}}),p.prototype.originalPositionFor=function(e){var t={generatedLine:r.getArg(e,"line"),generatedColumn:r.getArg(e,"column")},n=i.search(t,this._sections,(function(e,t){var n=e.generatedLine-t.generatedOffset.generatedLine;return n||e.generatedColumn-t.generatedOffset.generatedColumn})),s=this._sections[n];return s?s.consumer.originalPositionFor({line:t.generatedLine-(s.generatedOffset.generatedLine-1),column:t.generatedColumn-(s.generatedOffset.generatedLine===t.generatedLine?s.generatedOffset.generatedColumn-1:0),bias:e.bias}):{source:null,line:null,column:null,name:null}},p.prototype.hasContentsOfAllSources=function(){return this._sections.every((function(e){return e.consumer.hasContentsOfAllSources()}))},p.prototype.sourceContentFor=function(e,t){for(var n=0;n<this._sections.length;n++){var r=this._sections[n].consumer.sourceContentFor(e,!0);if(r)return r}if(t)return null;throw new Error('"'+e+'" is not in the SourceMap.')},p.prototype.generatedPositionFor=function(e){for(var t=0;t<this._sections.length;t++){var n=this._sections[t];if(-1!==n.consumer.sources.indexOf(r.getArg(e,"source"))){var i=n.consumer.generatedPositionFor(e);if(i)return{line:i.line+(n.generatedOffset.generatedLine-1),column:i.column+(n.generatedOffset.generatedLine===i.line?n.generatedOffset.generatedColumn-1:0)}}}return{line:null,column:null}},p.prototype._parseMappings=function(e,t){this.__generatedMappings=[],this.__originalMappings=[];for(var n=0;n<this._sections.length;n++)for(var i=this._sections[n],s=i.consumer._generatedMappings,o=0;o<s.length;o++){var l=s[o],u=i.consumer._sources.at(l.source);null!==i.consumer.sourceRoot&&(u=r.join(i.consumer.sourceRoot,u)),this._sources.add(u),u=this._sources.indexOf(u);var c=i.consumer._names.at(l.name);this._names.add(c),c=this._names.indexOf(c);var p={source:u,generatedLine:l.generatedLine+(i.generatedOffset.generatedLine-1),generatedColumn:l.generatedColumn+(i.generatedOffset.generatedLine===l.generatedLine?i.generatedOffset.generatedColumn-1:0),originalLine:l.originalLine,originalColumn:l.originalColumn,name:c};this.__generatedMappings.push(p),"number"==typeof p.originalLine&&this.__originalMappings.push(p)}a(this.__generatedMappings,r.compareByGeneratedPositionsDeflated),a(this.__originalMappings,r.compareByOriginalPositions)},t.IndexedSourceMapConsumer=p},function(e,t){t.GREATEST_LOWER_BOUND=1,t.LEAST_UPPER_BOUND=2,t.search=function(e,n,r,i){if(0===n.length)return-1;var s=function e(n,r,i,s,o,a){var l=Math.floor((r-n)/2)+n,u=o(i,s[l],!0);return 0===u?l:u>0?r-l>1?e(l,r,i,s,o,a):a==t.LEAST_UPPER_BOUND?r<s.length?r:-1:l:l-n>1?e(n,l,i,s,o,a):a==t.LEAST_UPPER_BOUND?l:n<0?-1:n}(-1,n.length,e,n,r,i||t.GREATEST_LOWER_BOUND);if(s<0)return-1;for(;s-1>=0&&0===r(n[s],n[s-1],!0);)--s;return s}},function(e,t){function n(e,t,n){var r=e[t];e[t]=e[n],e[n]=r}function r(e,t,i,s){if(i<s){var o=i-1;n(e,(c=i,p=s,Math.round(c+Math.random()*(p-c))),s);for(var a=e[s],l=i;l<s;l++)t(e[l],a)<=0&&n(e,o+=1,l);n(e,o+1,l);var u=o+1;r(e,t,i,u-1),r(e,t,u+1,s)}var c,p}t.quickSort=function(e,t){r(e,t,0,e.length-1)}},function(e,t,n){var r=n(171).SourceMapGenerator,i=n(34),s=/(\r?\n)/,o="$$$isSourceNode$$$";function a(e,t,n,r,i){this.children=[],this.sourceContents={},this.line=null==e?null:e,this.column=null==t?null:t,this.source=null==n?null:n,this.name=null==i?null:i,this[o]=!0,null!=r&&this.add(r)}a.fromStringWithSourceMap=function(e,t,n){var r=new a,o=e.split(s),l=0,u=function(){return e()+(e()||"");function e(){return l<o.length?o[l++]:void 0}},c=1,p=0,f=null;return t.eachMapping((function(e){if(null!==f){if(!(c<e.generatedLine)){var t=(n=o[l]).substr(0,e.generatedColumn-p);return o[l]=n.substr(e.generatedColumn-p),p=e.generatedColumn,d(f,t),void(f=e)}d(f,u()),c++,p=0}for(;c<e.generatedLine;)r.add(u()),c++;if(p<e.generatedColumn){var n=o[l];r.add(n.substr(0,e.generatedColumn)),o[l]=n.substr(e.generatedColumn),p=e.generatedColumn}f=e}),this),l<o.length&&(f&&d(f,u()),r.add(o.splice(l).join(""))),t.sources.forEach((function(e){var s=t.sourceContentFor(e);null!=s&&(null!=n&&(e=i.join(n,e)),r.setSourceContent(e,s))})),r;function d(e,t){if(null===e||void 0===e.source)r.add(t);else{var s=n?i.join(n,e.source):e.source;r.add(new a(e.originalLine,e.originalColumn,s,t,e.name))}}},a.prototype.add=function(e){if(Array.isArray(e))e.forEach((function(e){this.add(e)}),this);else{if(!e[o]&&"string"!=typeof e)throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got "+e);e&&this.children.push(e)}return this},a.prototype.prepend=function(e){if(Array.isArray(e))for(var t=e.length-1;t>=0;t--)this.prepend(e[t]);else{if(!e[o]&&"string"!=typeof e)throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got "+e);this.children.unshift(e)}return this},a.prototype.walk=function(e){for(var t,n=0,r=this.children.length;n<r;n++)(t=this.children[n])[o]?t.walk(e):""!==t&&e(t,{source:this.source,line:this.line,column:this.column,name:this.name})},a.prototype.join=function(e){var t,n,r=this.children.length;if(r>0){for(t=[],n=0;n<r-1;n++)t.push(this.children[n]),t.push(e);t.push(this.children[n]),this.children=t}return this},a.prototype.replaceRight=function(e,t){var n=this.children[this.children.length-1];return n[o]?n.replaceRight(e,t):"string"==typeof n?this.children[this.children.length-1]=n.replace(e,t):this.children.push("".replace(e,t)),this},a.prototype.setSourceContent=function(e,t){this.sourceContents[i.toSetString(e)]=t},a.prototype.walkSourceContents=function(e){for(var t=0,n=this.children.length;t<n;t++)this.children[t][o]&&this.children[t].walkSourceContents(e);var r=Object.keys(this.sourceContents);for(t=0,n=r.length;t<n;t++)e(i.fromSetString(r[t]),this.sourceContents[r[t]])},a.prototype.toString=function(){var e="";return this.walk((function(t){e+=t})),e},a.prototype.toStringWithSourceMap=function(e){var t={code:"",line:1,column:0},n=new r(e),i=!1,s=null,o=null,a=null,l=null;return this.walk((function(e,r){t.code+=e,null!==r.source&&null!==r.line&&null!==r.column?(s===r.source&&o===r.line&&a===r.column&&l===r.name||n.addMapping({source:r.source,original:{line:r.line,column:r.column},generated:{line:t.line,column:t.column},name:r.name}),s=r.source,o=r.line,a=r.column,l=r.name,i=!0):i&&(n.addMapping({generated:{line:t.line,column:t.column}}),s=null,i=!1);for(var u=0,c=e.length;u<c;u++)10===e.charCodeAt(u)?(t.line++,t.column=0,u+1===c?(s=null,i=!1):i&&n.addMapping({source:r.source,original:{line:r.line,column:r.column},generated:{line:t.line,column:t.column},name:r.name})):t.column++})),this.walkSourceContents((function(e,t){n.setSourceContent(e,t)})),{code:t.code,map:n}},t.SourceNode=a},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.transformFileSync=function(){throw new Error("Transforming files is not supported in browsers")},t.transformFileAsync=function(){return Promise.reject(new Error("Transforming files is not supported in browsers"))},t.transformFile=void 0;t.transformFile=function(e,t,n){"function"==typeof t&&(n=t),n(new Error("Transforming files is not supported in browsers"),null)}},function(e,t,n){"use strict";function r(){const e=o(n(19));return r=function(){return e},e}Object.defineProperty(t,"__esModule",{value:!0}),t.transformFromAstAsync=t.transformFromAstSync=t.transformFromAst=void 0;var i=o(n(33)),s=n(161);function o(e){return e&&e.__esModule?e:{default:e}}const a=(0,r().default)((function*(e,t,n){const r=yield*(0,i.default)(n);if(null===r)return null;if(!e)throw new Error("No AST given");return yield*(0,s.run)(r,t,e)}));t.transformFromAst=function(e,t,n,r){if("function"==typeof n&&(r=n,n=void 0),void 0===r)return a.sync(e,t,n);a.errback(e,t,n,r)};const l=a.sync;t.transformFromAstSync=l;const u=a.async;t.transformFromAstAsync=u},function(e,t,n){"use strict";function r(){const e=a(n(19));return r=function(){return e},e}Object.defineProperty(t,"__esModule",{value:!0}),t.parseAsync=t.parseSync=t.parse=void 0;var i=a(n(33)),s=a(n(170)),o=a(n(168));function a(e){return e&&e.__esModule?e:{default:e}}const l=(0,r().default)((function*(e,t){const n=yield*(0,i.default)(t);return null===n?null:yield*(0,s.default)(n.passes,(0,o.default)(n),e)}));t.parse=function(e,t,n){if("function"==typeof t&&(n=t,t=void 0),void 0===n)return l.sync(e,t);l.errback(e,t,n)};const u=l.sync;t.parseSync=u;const c=l.async;t.parseAsync=c},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var r,i,s,o=n(2),a=n.n(o),l=n(174),u=n.n(l),c=n(12),p=n.n(c);n(90),n(182),n(184),n(186),n(187),n(188),n(189);class f extends a.a.Component{constructor(){super(),this._textareaRef=a.a.createRef(),this._codeMirror=null,this._cached="",this.handleChange=this.handleChange.bind(this),this.handleFocus=this.handleFocus.bind(this)}componentDidMount(){const e=Object.assign({foldGutter:!0,gutters:["CodeMirror-linenumbers","CodeMirror-foldgutter"]},this.props);delete e.value,delete e.onChange,delete e.codeSample,this._codeMirror=p.a.fromTextArea(this._textareaRef.current,e),this._codeMirror.on("change",this.handleChange),this._codeMirror.on("focus",this.handleFocus),this.updateValue(this.props.value||"")}componentWillUnmount(){this._codeMirror&&this._codeMirror.toTextArea()}componentDidUpdate(e){this.props.value!==this._cached&&null!=this.props.value&&this.updateValue(this.props.value),this.props.mode!==e.mode&&null!=this.props.mode&&this._codeMirror.setOption("mode",this.props.mode)}updateValue(e){this._cached=e,this._codeMirror.setValue(e)}handleFocus(){this._codeMirror.getValue()===this.props.codeSample&&this._codeMirror.execCommand("selectAll")}handleChange(e,t){"setValue"!==t.origin&&(this._cached=e.getValue(),this.props.onChange(this._cached))}render(){return a.a.createElement("div",{className:"editor"},a.a.createElement("textarea",{ref:this._textareaRef}))}}s={lineNumbers:!0,tabSize:2,showCursorWhenSelecting:!0,autoCloseBrackets:!0,matchBrackets:!0},(i="defaultProps")in(r=f)?Object.defineProperty(r,i,{value:s,enumerable:!0,configurable:!0,writable:!0}):r[i]=s;class d extends a.a.Component{render(){return a.a.createElement("header",{className:"page-header"},a.a.createElement("h1",{className:"page-title"},"react-docgen: ",a.a.createElement("span",{className:"subtitle"},"PLAYGROUND")," ",a.a.createElement("select",{className:"flavor-select",onChange:e=>this.props.onLanguageChange(e.target.value)},a.a.createElement("option",{value:"js"},"JavaScript"),a.a.createElement("option",{value:"ts"},"TypeScript"),a.a.createElement("option",{value:"flow"},"Flow"))),a.a.createElement("a",{className:"nav-link",href:"https://github.com/reactjs/react-docgen"},a.a.createElement("span",null,"View on Github"),a.a.createElement("svg",{version:"1.1",width:"16",height:"16",viewBox:"0 0 16 16",className:"octicon octicon-mark-github","aria-hidden":"true"},a.a.createElement("path",{fillRule:"evenodd",d:"M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"}))))}}var h=n(0);const m=/^\*\s/;function y(e,t=!1){let n=[];return t&&e.node.trailingComments?n=e.node.trailingComments.filter(e=>"CommentBlock"===e.type&&m.test(e.value)):e.node.leadingComments?n=e.node.leadingComments.filter(e=>"CommentBlock"===e.type&&m.test(e.value)):e.node.comments&&(n=e.node.comments.filter(e=>e.leading&&"CommentBlock"===e.type&&m.test(e.value))),n.length>0?n[n.length-1].value.replace(/^[ \t]*\*[ \t]?/gm,"").trim():null}const g=["react","react/addons","react-native","proptypes","prop-types"];function v(e){return g.some((function(t){return t===e.toLowerCase()}))}function b(e,t){if(!e)return!1;for(const n in t){if(!e[n])return!1;if(t[n]&&"object"==typeof t[n]){if(!b(e[n],t[n]))return!1}else if(e[n]!==t[n])return!1}return!0}function E(e){do{e=e.get("object")}while(h.namedTypes.MemberExpression.check(e.node));return e}function T(e,t){const n=e.node;switch(n.type){case h.namedTypes.Identifier.name:return n.name;case h.namedTypes.Literal.name:return t?n.raw:n.value;default:throw new TypeError("Argument must be an Identifier or a Literal")}}function x(e){if(h.namedTypes.ObjectTypeSpreadProperty.check(e.node))return T(e.get("argument").get("id"),!1);if(e.node.computed){const t=e.get("key");if(h.namedTypes.Identifier.check(t.node)||h.namedTypes.MemberExpression.check(t.node)){const e=F(t).node;if(h.namedTypes.Literal.check(e)&&("string"==typeof e.value||"number"==typeof e.value))return"".concat(e.value)}return h.namedTypes.Identifier.check(t.node)?"".concat("@computed#").concat(t.node.name):!h.namedTypes.Literal.check(t.node)||"string"!=typeof t.node.value&&"number"!=typeof t.node.value?null:"".concat(t.node.value)}return T(e.get("key"),!1)}function S(e,t){return h.namedTypes.ObjectExpression.assert(e.node),e.get("properties").filter(e=>x(e)===t).map(e=>e.get("value"))[0]}function w(e){const t=[e];let n=[];for(;t.length>0;){const r=(e=t.shift()).node;if(h.namedTypes.CallExpression.check(r))t.push(e.get("callee"));else if(h.namedTypes.MemberExpression.check(r))if(t.push(e.get("object")),r.computed){const t=F(e.get("property"));void 0!==t?n=n.concat(w(t)):n.push("<computed>")}else n.push(r.property.name);else if(h.namedTypes.Identifier.check(r))n.push(r.name);else if(h.namedTypes.Literal.check(r))n.push(r.raw);else if(h.namedTypes.ThisExpression.check(r))n.push("this");else if(h.namedTypes.ObjectExpression.check(r)){const t=e.get("properties").map((function(e){return A(e.get("key"))+": "+A(e.get("value"))}));n.push("{"+t.join(", ")+"}")}else h.namedTypes.ArrayExpression.check(r)&&n.push("["+e.get("elements").map(A).join(", ")+"]")}return n.reverse()}function A(e){return w(e).join(".")}function P(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function C(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function D(e,t){Object(h.visit)(e,function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?P(Object(n),!0).forEach((function(t){C(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):P(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},O,{},t))}const k=()=>!1,O={visitFunctionDeclaration:k,visitFunctionExpression:k,visitClassDeclaration:k,visitClassExpression:k,visitIfStatement:k,visitWithStatement:k,visitSwitchStatement:k,visitWhileStatement:k,visitDoWhileStatement:k,visitForStatement:k,visitForInStatement:k,visitForOfStatement:k,visitExportNamedDeclaration:k,visitExportDefaultDeclaration:k,visitConditionalExpression:k};function _(e,t){if(e.length<1)return null;let n=e[0];const r=n.parent;if(h.namedTypes.ImportDefaultSpecifier.check(r.node)||h.namedTypes.ImportSpecifier.check(r.node)||h.namedTypes.ImportNamespaceSpecifier.check(r.node)||h.namedTypes.VariableDeclarator.check(r.node)||h.namedTypes.TypeAlias.check(r.node)||h.namedTypes.InterfaceDeclaration.check(r.node)||h.namedTypes.TSTypeAliasDeclaration.check(r.node)||h.namedTypes.TSInterfaceDeclaration.check(r.node))n=r;else if(h.namedTypes.Property.check(r.node)){const e=function e(t){const n=t.node;if(h.namedTypes.Property.check(n)){const r=e(t.parent);if(r)return new h.NodePath(h.builders.memberExpression(r.node,n.key,h.namedTypes.Literal.check(n.key)),r)}else{if(h.namedTypes.ObjectPattern.check(n))return e(t.parent);if(h.namedTypes.VariableDeclarator.check(n))return t.get("init")}return null}(r);if(e)return e}return n.node!==t.node?F(n):null}function F(e){const t=e.node;if(h.namedTypes.VariableDeclarator.check(t)){if(t.init)return F(e.get("init"))}else if(h.namedTypes.MemberExpression.check(t)){const t=F(E(e));if(h.namedTypes.ObjectExpression.check(t.node)){let n=t;for(const t of w(e).slice(1)){if(n&&h.namedTypes.ObjectExpression.check(n.node)&&(n=S(n,t)),!n)return e;n=F(n)}return n}}else{if(h.namedTypes.ImportDefaultSpecifier.check(t)||h.namedTypes.ImportNamespaceSpecifier.check(t)||h.namedTypes.ImportSpecifier.check(t))return e.parentPath.parentPath;if(h.namedTypes.AssignmentExpression.check(t)){if("="===t.operator)return F(e.get("right"))}else{if(h.namedTypes.TypeCastExpression.check(t)||h.namedTypes.TSAsExpression.check(t)||h.namedTypes.TSTypeAssertion.check(t))return F(e.get("expression"));if(h.namedTypes.Identifier.check(t)){if((h.namedTypes.ClassDeclaration.check(e.parentPath.node)||h.namedTypes.ClassExpression.check(e.parentPath.node)||h.namedTypes.Function.check(e.parentPath.node))&&e.parentPath.get("id")===e)return e.parentPath;let n,r=e.scope.lookup(t.name);if(r){if(n=function(e,t){const n=[],r=t.node.name;return D(e.path,{visitAssignmentExpression:function(e){const i=e.node;if(!h.namedTypes.Identifier.check(i.left)||i.left===t.node||i.left.name!==r||"="!==i.operator)return this.traverse(e);const s=e.get("right");for(let n=t;n&&null!=n.node;n=n.parent)if(n.node===s.node)return this.traverse(e);return n.push(s),!1}}),0===n.length?null:F(n.pop())}(r,e),!n){n=_(r.getBindings()[t.name],e)}}else if(r=e.scope.lookupType(t.name),r){n=_(r.getTypes()[t.name],e)}return n||e}}}return e}function N(e){const t=e.node;switch(t.type){case h.namedTypes.VariableDeclarator.name:if(t.init)return N(e.get("init"));break;case h.namedTypes.CallExpression.name:return b(t.callee,{type:h.namedTypes.Identifier.name,name:"require"})?t.arguments[0].value:N(e.get("callee"));case h.namedTypes.Identifier.name:case h.namedTypes.JSXIdentifier.name:{const t=F(e);if(t!==e)return N(t);break}case h.namedTypes.ImportDeclaration.name:return t.source.value;case h.namedTypes.MemberExpression.name:for(;e&&h.namedTypes.MemberExpression.check(e.node);)e=e.get("object");if(e)return N(e)}return null}function M(e,t){if(h.namedTypes.ExpressionStatement.check(e.node)&&(e=e.get("expression")),b(e.node,{callee:{property:{name:t}}})){const t=N(e.get("callee","object"));return Boolean(t&&v(t))}if(h.namedTypes.CallExpression.check(e.node)){const n=F(e.get("callee"));if(n===e.get("callee"))return!1;if(h.namedTypes.MemberExpression.check(n.node)&&h.namedTypes.Identifier.check(n.get("property").node)&&n.get("property").node.name===t||h.namedTypes.ImportDeclaration.check(n.node)&&n.node.specifiers.some(e=>e.imported&&e.imported.name===t)){const e=N(n);return Boolean(e&&v(e))}}return!1}function I(e){return M(e,"forwardRef")}function L(e){let t=null;if(function(e){const t=e.node;return h.namedTypes.ClassDeclaration.check(t)||h.namedTypes.ClassExpression.check(t)}(e)&&e.node.decorators&&e.node.decorators.length>0&&(t=y(e.get("decorators",e.node.decorators.length-1),!0)),null==t){let n=e;for(;n&&!h.namedTypes.Statement.check(n.node);)n=n.parent;n&&((h.namedTypes.ExportNamedDeclaration.check(n.parentPath.node)||h.namedTypes.ExportDefaultDeclaration.check(n.parentPath.node))&&(n=n.parentPath),t=y(n))}if(!t&&I(e)){const t=F(e.get("arguments",0));if(t.node!==e.node)return L(t)}return t}function j(e,t){return e.get("body","body").filter(e=>(!e.node.computed||h.namedTypes.Literal.check(e.node.key))&&!h.namedTypes.PrivateName.check(e.node.key)&&T(e.get("key"))===t&&"set"!==e.node.kind).map(e=>e.get("value"))[0]}function B(e,t){const n=function(e){if(h.namedTypes.VariableDeclaration.check(e.node)){const t=e.get("declarations");if(t.value.length&&1!==t.value.length)throw new TypeError("Got unsupported VariableDeclaration. VariableDeclaration must only have a single VariableDeclarator. Got "+t.value.length+" declarations.");return t.get(0,"id","name").value}if(h.namedTypes.FunctionDeclaration.check(e.node))return e.get("id","name").value;if(!(h.namedTypes.FunctionExpression.check(e.node)||h.namedTypes.ArrowFunctionExpression.check(e.node)||h.namedTypes.TaggedTemplateExpression.check(e.node)||h.namedTypes.CallExpression.check(e.node)||I(e)))throw new TypeError('Attempted to resolveName for an unsupported path. resolveName accepts a VariableDeclaration, FunctionDeclaration, FunctionExpression or CallExpression. Got "'+e.node.type+'".');{let t=e;for(;t.parent;){if(h.namedTypes.VariableDeclarator.check(t.parent.node))return t.parent.get("id","name").value;t=t.parent}}}(e),r=function(e){let t=e.parent;for(;t.parent;)t=t.parent;return t}(e);if(!n)return;let i;return Object(h.visit)(r,{visitAssignmentExpression(e){const r=e.get("left");return h.namedTypes.MemberExpression.check(r.node)?r.node.computed&&!h.namedTypes.Literal.check(r.node.property)||T(r.get("property"))!==t||A(r.get("object"))!==n?void this.traverse(r):(i=e.get("right"),!1):this.traverse(e)}}),i}function R(e){let t=null;return D(e.get("body"),{visitFunction:()=>!1,visitReturnStatement:e=>(t=F(e.get("argument")),!1)}),t}const U={getDefaultProps:"defaultProps",defaultProps:"getDefaultProps"},W={propTypes:e=>h.namedTypes.Function.check(e.node)?R(e):e},V={[h.namedTypes.ArrowFunctionExpression.name]:B,[h.namedTypes.CallExpression.name]:B,[h.namedTypes.FunctionExpression.name]:B,[h.namedTypes.FunctionDeclaration.name]:B,[h.namedTypes.VariableDeclaration.name]:B,[h.namedTypes.ObjectExpression.name]:S,[h.namedTypes.ClassDeclaration.name]:j,[h.namedTypes.ClassExpression.name]:j};function z(e,t){if(!function({node:e}){return h.namedTypes.ObjectExpression.check(e)||h.namedTypes.ClassDeclaration.check(e)||h.namedTypes.ClassExpression.check(e)||h.namedTypes.TaggedTemplateExpression.check(e)||h.namedTypes.VariableDeclaration.check(e)||h.namedTypes.ArrowFunctionExpression.check(e)||h.namedTypes.FunctionDeclaration.check(e)||h.namedTypes.FunctionExpression.check(e)||h.namedTypes.CallExpression.check(e)}(e))throw new TypeError('Got unsupported definition type. Definition must be one of ObjectExpression, ClassDeclaration, ClassExpression,VariableDeclaration, ArrowFunctionExpression, FunctionExpression, TaggedTemplateExpression, FunctionDeclaration or CallExpression. Got "'+e.node.type+'" instead.');const n=V[e.node.type]||B;let r=n(e,t);return!r&&U[t]&&(r=n(e,U[t])),r&&W[t]&&(r=W[t](r)),r}var K=n(175),$=n.n(K);function q(e){if(null==e.node.start){if("Literal"===e.node.type)return'"'.concat(e.node.value,'"');throw new Error("Cannot print raw value for type '".concat(e.node.type,"'. Please report this with an example at https://github.com/reactjs/react-docgen/issues"))}return function(e){const t=e.indexOf("\n");return e.slice(0,t+1)+$()(e.slice(t+1))}(function(e){do{if("File"===e.node.type)return e.node.__src;e=e.parentPath}while(null!=e);throw new Error("Could not find source attached to File node")}(e).slice(e.node.start,e.node.end))}function G(e){return!!e.node.typeAnnotation}function H(e){if(!G(e))return null;let t=e;do{t=t.get("typeAnnotation")}while(G(t)&&!h.namedTypes.FlowType.check(t.node)&&!h.namedTypes.TSType.check(t.node));return t}function Y(e){return h.namedTypes.Property.check(e)&&(h.namedTypes.Identifier.check(e.key)&&!e.computed||h.namedTypes.Literal.check(e.key))||h.namedTypes.SpreadElement.check(e)}function X(e){return h.namedTypes.ObjectTypeProperty.check(e)||h.namedTypes.ObjectTypeSpreadProperty.check(e)||h.namedTypes.TSPropertySignature.check(e)}function J(e,t=!1){if(h.namedTypes.ObjectExpression.check(e.value)&&e.value.properties.every(Y)||h.namedTypes.ObjectTypeAnnotation.check(e.value)&&e.value.properties.every(X)||h.namedTypes.TSTypeLiteral.check(e.value)&&e.value.members.every(X)){let n=[],r=!1;if((h.namedTypes.TSTypeLiteral.check(e.value)?e.get("members"):e.get("properties")).each(e=>{if(r)return;const i=e.value;if(h.namedTypes.Property.check(i)||h.namedTypes.ObjectTypeProperty.check(i)||h.namedTypes.TSPropertySignature.check(i)){const e=i.key.name||(t?i.key.raw:i.key.value);n.push(e)}else if(h.namedTypes.SpreadElement.check(i)||h.namedTypes.ObjectTypeSpreadProperty.check(i)){let t=F(e.get("argument"));if(h.namedTypes.GenericTypeAnnotation.check(t.value)){const e=F(t.get("id"));h.namedTypes.ObjectTypeAnnotation.check(e.get("right").value)&&(t=F(e.get("right")))}const i=J(t);if(!i)return void(r=!0);n=[...n,...i]}}),!r)return n}return null}function Q(e){if(function(e){return h.namedTypes.CallExpression.check(e)&&1===e.arguments.length&&h.namedTypes.MemberExpression.check(e.callee)&&h.namedTypes.Identifier.check(e.callee.object)&&"Object"===e.callee.object.name&&h.namedTypes.Identifier.check(e.callee.property)&&"keys"===e.callee.property.name}(e.node)){const t=J(F(e.get("arguments").get(0)));if(t){const e=t.filter((e,t,n)=>n.indexOf(e)===t).map(e=>h.builders.literal(e));return new h.NodePath(h.builders.arrayExpression(e))}}return null}const Z=new Set(["$Exact","$ReadOnly"]);function ee(e){if(h.namedTypes.GenericTypeAnnotation.check(e.node)){const t=e.get("id");return!!t&&Z.has(t.node.name)}return!1}function te(e){for(;ee(e);)e=e.get("typeParameters","params",0);return e}function ne(e){let t,n=te(e);if(n.node.id?t=n.get("id"):h.namedTypes.TSTypeReference.check(n.node)?t=n.get("typeName"):h.namedTypes.TSExpressionWithTypeArguments.check(n.node)&&(t=n.get("expression")),t){if(n=F(t),(e=>!e||h.namedTypes.Identifier.check(e.node)||h.namedTypes.ImportDeclaration.check(e.node)||h.namedTypes.CallExpression.check(e.node))(n))return;return h.namedTypes.TypeAlias.check(n.node)?ne(n.get("right")):h.namedTypes.TSTypeAliasDeclaration.check(n.node)?ne(n.get("typeAnnotation")):n}return n}function re(e){if(!e)return;const t=ne(e);return t&&t!==e?t:void 0}function ie(e,t,n){const r={},i=t.node.params.length;let s=0;return e.get("params").each(e=>{const o=e.node.name,a=e.node.default?e.get("default"):null,l=s<i?t.get("params",s++):a;if(l){let e=re(l)||l;const t=e.node.typeName||e.node.id;t&&n&&n[t.name]&&(e=n[t.name]),r[o]=e}}),r}function se(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function oe(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}const ae={AnyTypeAnnotation:"any",BooleanTypeAnnotation:"boolean",MixedTypeAnnotation:"mixed",NullLiteralTypeAnnotation:"null",NumberTypeAnnotation:"number",StringTypeAnnotation:"string",VoidTypeAnnotation:"void",EmptyTypeAnnotation:"empty"},le={BooleanLiteralTypeAnnotation:1,NumberLiteralTypeAnnotation:1,StringLiteralTypeAnnotation:1},ue={ArrayTypeAnnotation:function(e,t){return{name:"Array",elements:[fe(e.get("elementType"),t)],raw:q(e)}},GenericTypeAnnotation:function(e,t){if("$Keys"===e.node.id.name&&e.node.typeParameters)return function(e){let t=e.get("typeParameters","params",0);h.namedTypes.TypeofTypeAnnotation.check(t.node)?t=t.get("argument","id"):h.namedTypes.ObjectTypeAnnotation.check(t.node)||(t=t.get("id"));const n=F(t);if(n&&(h.namedTypes.ObjectExpression.check(n.node)||h.namedTypes.ObjectTypeAnnotation.check(n.node))){const t=J(n,!0);if(t)return{name:"union",raw:q(e),elements:t.map(e=>({name:"literal",value:e}))}}return null}(e);let n;if(h.namedTypes.QualifiedTypeIdentifier.check(e.node.id)){const t=e.get("id");n="React"===t.node.qualification.name?{name:"".concat(t.node.qualification.name).concat(t.node.id.name),raw:q(t)}:{name:q(t).replace(/<.*>$/,"")}}else n={name:e.node.id.name};const r=t&&t[n.name]||F(e.get("id"));e.node.typeParameters&&r.node.typeParameters&&(t=ie(r.get("typeParameters"),e.get("typeParameters"),t));if(t&&t[n.name]&&t[n.name].value.type===h.namedTypes.GenericTypeAnnotation.name)return n;t&&t[n.name]&&(n=fe(r,t));if(r&&r.node.right)n=fe(r.get("right"),t);else if(e.node.typeParameters){const r=e.get("typeParameters").get("params");n=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?se(Object(n),!0).forEach((function(t){oe(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):se(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},n,{elements:r.map(e=>fe(e,t)),raw:q(e)})}return n},ObjectTypeAnnotation:function(e,t){const n={name:"signature",type:"object",raw:q(e),signature:{properties:[]}};return e.get("callProperties").each(e=>{n.signature.constructor=fe(e.get("value"),t)}),e.get("indexers").each(e=>{n.signature.properties.push({key:fe(e.get("key"),t),value:ce(e.get("value"),t)})}),e.get("properties").each(e=>{h.namedTypes.ObjectTypeProperty.check(e.node)&&n.signature.properties.push({key:x(e),value:ce(e.get("value"),t)})}),n},InterfaceDeclaration:function(e){return{name:e.node.id.name}},UnionTypeAnnotation:function(e,t){return{name:"union",raw:q(e),elements:e.get("types").map(e=>fe(e,t))}},NullableTypeAnnotation:function(e,t){const n=H(e);if(!n)return null;const r=fe(n,t);return r.nullable=!0,r},FunctionTypeAnnotation:function(e,t){const n={name:"signature",type:"function",raw:q(e),signature:{arguments:[],return:fe(e.get("returnType"),t)}};if(e.get("params").each(e=>{const r=H(e);n.signature.arguments.push({name:e.node.name?e.node.name.name:"",type:r?fe(r,t):void 0})}),e.node.rest){const r=e.get("rest"),i=H(r);n.signature.arguments.push({name:r.node.name?r.node.name.name:"",type:i?fe(i,t):void 0,rest:!0})}return n},IntersectionTypeAnnotation:function(e,t){return{name:"intersection",raw:q(e),elements:e.get("types").map(e=>fe(e,t))}},TupleTypeAnnotation:function(e,t){const n={name:"tuple",raw:q(e),elements:[]};return e.get("types").each(e=>{n.elements.push(fe(e,t))}),n},TypeofTypeAnnotation:function(e,t){return fe(e.get("argument"),t)}};function ce(e,t){const n=fe(e,t);return n.required=!e.parentPath.node.optional,n}let pe={};function fe(e,t){const n=e.node;let r;const i=h.namedTypes.TypeAlias.check(e.parentPath.node);if(i){if(!0===pe[e.parentPath.node.id.name])return{name:e.parentPath.node.id.name};if("object"==typeof pe[e.parentPath.node.id.name])return pe[e.parentPath.node.id.name];pe[e.parentPath.node.id.name]=!0}return n.type in ae?r={name:ae[n.type]}:n.type in le?r={name:"literal",value:n.raw||"".concat(n.value)}:n.type in ue&&(r=ue[n.type](e,t)),r||(r={name:"unknown"}),i&&(pe[e.parentPath.node.id.name]=r),r}function de(e,t){pe={};const n=fe(e,t);return pe={},n}function he(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function me(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}const ye={TSAnyKeyword:"any",TSBooleanKeyword:"boolean",TSUnknownKeyword:"unknown",TSNeverKeyword:"never",TSNullKeyword:"null",TSUndefinedKeyword:"undefined",TSNumberKeyword:"number",TSStringKeyword:"string",TSSymbolKeyword:"symbol",TSThisType:"this",TSObjectKeyword:"object",TSVoidKeyword:"void"},ge={TSArrayType:function(e,t){return{name:"Array",elements:[Te(e.get("elementType"),t)],raw:q(e)}},TSTypeReference:function(e,t){let n;if(h.namedTypes.TSQualifiedName.check(e.node.typeName)){const t=e.get("typeName");n="React"===t.node.left.name?{name:"".concat(t.node.left.name).concat(t.node.right.name),raw:q(t)}:{name:q(t).replace(/<.*>$/,"")}}else n={name:e.node.typeName.name};const r=t&&t[n.name]||F(e.get("typeName"));e.node.typeParameters&&r.node.typeParameters&&(t=ie(r.get("typeParameters"),e.get("typeParameters"),t));t&&t[n.name]&&(n=Te(r));if(r&&r.node.typeAnnotation)n=Te(r.get("typeAnnotation"),t);else if(e.node.typeParameters){const r=e.get("typeParameters").get("params");n=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?he(Object(n),!0).forEach((function(t){me(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):he(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},n,{elements:r.map(e=>Te(e,t)),raw:q(e)})}return n},TSTypeLiteral:function(e,t){const n={name:"signature",type:"object",raw:q(e),signature:{properties:[]}};return e.get("members").each(e=>{if(h.namedTypes.TSPropertySignature.check(e.node)||h.namedTypes.TSMethodSignature.check(e.node)){const r=x(e);if(!r)return;n.signature.properties.push({key:r,value:ve(e.get("typeAnnotation"),t)})}else h.namedTypes.TSCallSignatureDeclaration.check(e.node)?n.signature.constructor=be(e,t):h.namedTypes.TSIndexSignature.check(e.node)&&n.signature.properties.push({key:Te(e.get("parameters").get(0).get("typeAnnotation"),t),value:ve(e.get("typeAnnotation"),t)})}),n},TSInterfaceDeclaration:function(e){return{name:e.node.id.name}},TSUnionType:function(e,t){return{name:"union",raw:q(e),elements:e.get("types").map(e=>Te(e,t))}},TSFunctionType:be,TSIntersectionType:function(e,t){return{name:"intersection",raw:q(e),elements:e.get("types").map(e=>Te(e,t))}},TSMappedType:function(e,t){const n=Te(e.get("typeParameter").get("constraint"),t);return n.required=!e.node.optional,{name:"signature",type:"object",raw:q(e),signature:{properties:[{key:n,value:Te(e.get("typeAnnotation"),t)}]}}},TSTupleType:function(e,t){const n={name:"tuple",raw:q(e),elements:[]};return e.get("elementTypes").each(e=>{n.elements.push(Te(e,t))}),n},TSTypeQuery:function(e,t){const n=F(e.get("exprName"));if(n&&n.node.typeAnnotation)return Te(n.get("typeAnnotation"),t);return{name:e.node.exprName.name}},TSTypeOperator:function(e){if("keyof"!==e.node.operator)return null;let t=e.get("typeAnnotation");h.namedTypes.TSTypeQuery.check(t.node)?t=t.get("exprName"):t.node.id&&(t=t.get("id"));const n=F(t);if(n&&(h.namedTypes.ObjectExpression.check(n.node)||h.namedTypes.TSTypeLiteral.check(n.node))){const t=J(n,!0);if(t)return{name:"union",raw:q(e),elements:t.map(e=>({name:"literal",value:e}))}}},TSIndexedAccessType:function(e,t){const n=Te(e.get("objectType"),t),r=Te(e.get("indexType"),t);if(!n.signature)return{name:"".concat(n.name,"[").concat(r.value.toString(),"]"),raw:q(e)};const i=n.signature.properties.find(e=>e.key===r.value.replace(/['"]+/g,""));if(!i)return{name:"unknown"};return{name:i.value.name,raw:q(e)}}};function ve(e,t){const n=Te(e,t);return n.required=!e.parentPath.node.optional,n}function be(e,t){const n={name:"signature",type:"function",raw:q(e),signature:{arguments:[],return:Te(e.get("typeAnnotation"),t)}};return e.get("parameters").each(e=>{const r=H(e),i={name:e.node.name||"",type:r?Te(r,t):void 0};"this"!==e.node.name?("RestElement"===e.node.type&&(i.name=e.node.argument.name,i.rest=!0),n.signature.arguments.push(i)):n.signature.this=i.type}),n}let Ee={};function Te(e,t){h.namedTypes.TSTypeAnnotation.check(e.node)&&(e=e.get("typeAnnotation"));const n=e.node;let r;const i=h.namedTypes.TSTypeAliasDeclaration.check(e.parentPath.node);if(i){if(!0===Ee[e.parentPath.node.id.name])return{name:e.parentPath.node.id.name};if("object"==typeof Ee[e.parentPath.node.id.name])return Ee[e.parentPath.node.id.name];Ee[e.parentPath.node.id.name]=!0}return n.type in ye?r={name:ye[n.type]}:h.namedTypes.TSLiteralType.check(n)?r={name:"literal",value:n.literal.raw||"".concat(n.literal.value)}:n.type in ge&&(r=ge[n.type](e,t)),r||(r={name:"unknown"}),i&&(Ee[e.parentPath.node.id.name]=r),r}function xe(e,t){Ee={};const n=Te(e,t);return Ee={},n}function Se(e){switch(e.node.type){case h.namedTypes.Identifier.name:return e.node.name;case h.namedTypes.AssignmentPattern.name:return Se(e.get("left"));case h.namedTypes.ObjectPattern.name:case h.namedTypes.ArrayPattern.name:return q(e);case h.namedTypes.RestElement.name:return"..."+Se(e.get("argument"));default:throw new TypeError("Parameter name must be an Identifier, an AssignmentPattern an "+"ObjectPattern or a RestElement, got ".concat(e.node.type))}}function we(e){return h.namedTypes.AssignmentExpression.check(e.node)?F(e.get("right")):e.get("value")}function Ae(e){const t=[];return we(e).get("params").each(e=>{let n=null;const r=H(e);r&&h.namedTypes.Flow.check(r.node)?(n=de(r),h.namedTypes.GenericTypeAnnotation.check(r.node)&&(n.alias=r.node.id.name)):r&&(n=xe(r),h.namedTypes.TSTypeReference.check(r.node)&&(n.alias=r.node.typeName.name));const i={name:Se(e),optional:e.node.optional,type:n};t.push(i)}),t}function Pe(e){const t=we(e);if(t.node.returnType){const e=H(t.get("returnType"));if(e&&h.namedTypes.Flow.check(e.node))return{type:de(e)};if(e)return{type:xe(e)}}return null}function Ce(e){if(h.namedTypes.AssignmentExpression.check(e.node))return["static"];const t=[];e.node.static&&t.push("static"),"get"!==e.node.kind&&"set"!==e.node.kind||t.push(e.node.kind);const n=e.get("value").node;return n.generator&&t.push("generator"),n.async&&t.push("async"),t}function De(e){if(h.namedTypes.AssignmentExpression.check(e.node)){let t=e;do{t=t.parent}while(t&&!h.namedTypes.ExpressionStatement.check(t.node));return t?y(t):null}return y(e)}function ke(e){if("private"===function(e){return h.namedTypes.AssignmentExpression.check(e.node)?null:e.node.accessibility}(e))return null;const t=function(e){if(h.namedTypes.AssignmentExpression.check(e.node)&&h.namedTypes.MemberExpression.check(e.node.left)){const t=e.node.left,n=t.property;return t.computed?h.namedTypes.Literal.check(n)?String(n.value):null:n.name}return x(e)}(e);return t?{name:t,docblock:De(e),modifiers:Ce(e),params:Ae(e),returns:Pe(e)}:null}function Oe(e){const t="ClassProperty"===e.type;return(h.namedTypes.MethodDefinition.check(e)||t)&&!e.computed&&!e.static&&(""===e.kind||"method"===e.kind||t)&&"render"===e.key.name}function _e(e){const t=e.node;if(!h.namedTypes.ClassDeclaration.check(t)&&!h.namedTypes.ClassExpression.check(t))return!1;if(!t.superClass)return!1;const n=F(e.get("superClass"));if(b(n.node,{property:{name:"Component"}})||b(n.node,{property:{name:"PureComponent"}})){const e=N(n);if(e&&v(e))return!0}if(t.body.body.some(Oe))return!0;if(e.parentPath&&e.parentPath.value){const t=Array.isArray(e.parentPath.value)?e.parentPath.value.find((function(e){return"ClassDeclaration"===e.type})):e.parentPath.value;if(t&&t.leadingComments&&t.leadingComments.some((function(e){return/@extends\s+React\.Component/.test(e.value)})))return!0}return!1}const Fe=["componentDidMount","componentDidReceiveProps","componentDidUpdate","componentWillMount","UNSAFE_componentWillMount","componentWillReceiveProps","UNSAFE_componentWillReceiveProps","componentWillUnmount","componentWillUpdate","UNSAFE_componentWillUpdate","getChildContext","getDefaultProps","getInitialState","render","shouldComponentUpdate","getDerivedStateFromProps","getDerivedStateFromError","getSnapshotBeforeUpdate","componentDidCatch"];function Ne(e){return(h.namedTypes.MethodDefinition.check(e.node)&&"constructor"!==e.node.kind||(h.namedTypes.ClassProperty.check(e.node)||h.namedTypes.Property.check(e.node))&&h.namedTypes.Function.check(e.get("value").node))&&!function(e){if(!h.namedTypes.MethodDefinition.check(e.node)&&!h.namedTypes.Property.check(e.node))return!1;const t=x(e);return!!t&&-1!==Fe.indexOf(t)}(e)}function Me(e,t){const n=[];if(!h.namedTypes.Identifier.check(t.node))return n;const r=t.node.name,i=t.scope.lookup(t.node.name);return D(e.path,{visitAssignmentExpression:function(e){return b(e.node.left,{type:"MemberExpression",object:{type:"Identifier",name:r}})&&e.scope.lookup(r)===i&&h.namedTypes.Function.check(F(e.get("right")).node)?(n.push(e),!1):this.traverse(e)}}),n}var Ie=n(176),Le=n.n(Ie);function je(e){if(!e)return null;const{type:t,name:n,expression:r,elements:i,applications:s}=e;switch(t){case"NameExpression":return{name:n};case"UnionType":return{name:"union",elements:i.map(e=>je(e))};case"AllLiteral":return{name:"mixed"};case"TypeApplication":return{name:r.name,elements:s.map(e=>je(e))};case"ArrayType":return{name:"tuple",elements:i.map(e=>je(e))};default:{const e=n||(r?r.name:null);return e?{name:e}:null}}}function Be(e){return!(!e.type||!e.type.type||"OptionalType"!==e.type.type)}function Re(e){const t=e.tags.find(e=>"return"===e.title||"returns"===e.title);return t?{description:t.description,type:je(t.type)}:null}function Ue(e){return e.tags?e.tags.filter(e=>"param"===e.title).map(e=>({name:e.name,description:e.description,type:je(e.type),optional:Be(e)})):[]}function We(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function Ve(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?We(Object(n),!0).forEach((function(t){ze(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):We(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function ze(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Ke(e,t){if(null==e&&null==t)return null;const n=Ve({},e);for(const e in t)null!=t[e]&&(n[e]=t[e]);return n}function $e(e,t,n){e.filter(e=>!n||h.namedTypes.AssignmentPattern.check(e.get("value").node)).forEach(e=>{if(h.namedTypes.Property.check(e.node)){const r=x(e);if(!r)return;const i=t.getPropDescriptor(r),s=function(e){let t,n=e.node;return h.namedTypes.Literal.check(n)?t=n.raw:(e=h.namedTypes.AssignmentPattern.check(e.node)?F(e.get("right")):F(e),h.namedTypes.ImportDeclaration.check(e.node)?t=n.name:(n=e.node,t=q(e))),void 0!==t?{value:t,computed:h.namedTypes.CallExpression.check(n)||h.namedTypes.MemberExpression.check(n)||h.namedTypes.Identifier.check(n)}:null}(n?e.get("value","right"):e.get("value"));s&&(i.defaultValue=s)}else if(h.namedTypes.SpreadElement.check(e.node)){const r=F(e.get("argument"));h.namedTypes.ObjectExpression.check(r.node)&&$e(r.get("properties"),t,n)}})}function qe(e,t=!1){const n=[];let r=null;e:for(;;)switch(!0){case h.namedTypes.MemberExpression.check(e.node):n.push({path:e.get("property"),computed:e.node.computed,argumentsPath:r}),r=null,e=e.get("object");break;case h.namedTypes.CallExpression.check(e.node):r=e.get("arguments"),e=e.get("callee");break;default:break e}return t&&n.length>0&&n.push({path:e,computed:!1,argumentsPath:r}),n.reverse()}function Ge(e){return qe(e).some(e=>!e.computed&&"isRequired"===e.path.node.name||e.computed&&"isRequired"===e.path.node.value)}function He(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function Ye(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Xe(e){return h.namedTypes.Property.check(e)&&(h.namedTypes.Identifier.check(e.key)&&!e.computed||h.namedTypes.Literal.check(e.key))||h.namedTypes.SpreadElement.check(e)}function Je(e){return h.namedTypes.ObjectTypeProperty.check(e)||h.namedTypes.ObjectTypeSpreadProperty.check(e)||h.namedTypes.TSPropertySignature.check(e)}function Qe(e,t=!1){if(h.namedTypes.ObjectExpression.check(e.value)&&e.value.properties.every(Xe)||h.namedTypes.ObjectTypeAnnotation.check(e.value)&&e.value.properties.every(Je)||h.namedTypes.TSTypeLiteral.check(e.value)&&e.value.members.every(Je)){const n=[];let r={},i=!1;if((h.namedTypes.TSTypeLiteral.check(e.value)?e.get("members"):e.get("properties")).each(e=>{if(i)return;const s=e.value;if("get"!==s.kind&&"set"!==s.kind)if(h.namedTypes.Property.check(s)||h.namedTypes.ObjectTypeProperty.check(s)||h.namedTypes.TSPropertySignature.check(s)){const i=s.key.name||(t?s.key.raw:s.key.value),o=e.get(i).parentPath.value,a=o.value.value||(t?o.value.raw:o.value.value);-1===n.indexOf(i)&&n.push(i),r[i]=a}else if(h.namedTypes.SpreadElement.check(s)||h.namedTypes.ObjectTypeSpreadProperty.check(s)){let t=F(e.get("argument"));if(h.namedTypes.GenericTypeAnnotation.check(t.value)){const e=F(t.get("id"));h.namedTypes.ObjectTypeAnnotation.check(e.get("right").value)&&(t=F(e.get("right")))}const s=Qe(t);if(!s)return void(i=!0);s.properties.forEach(e=>{-1===n.indexOf(e)&&n.push(e)}),r=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?He(Object(n),!0).forEach((function(t){Ye(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):He(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},r,{},s.values)}}),!i)return{properties:n.sort(),values:r}}return null}function Ze(e){if(function(e){return h.namedTypes.CallExpression.check(e)&&1===e.arguments.length&&h.namedTypes.MemberExpression.check(e.callee)&&h.namedTypes.Identifier.check(e.callee.object)&&"Object"===e.callee.object.name&&h.namedTypes.Identifier.check(e.callee.property)&&"values"===e.callee.property.name}(e.node)){const t=Qe(F(e.get("arguments").get(0)));if(t){const e=t.properties.map(e=>{const n=t.values[e];return void 0===n?h.builders.literal(null):h.builders.literal(n)});return new h.NodePath(h.builders.arrayExpression(e))}}return null}function et(e){const t=[];return e.get("elements").each((function(e){if(h.namedTypes.SpreadElement.check(e.node)){const n=F(e.get("argument"));return h.namedTypes.ArrayExpression.check(n.node)?t.push(...et(n)):t.push({value:q(e),computed:!h.namedTypes.Literal.check(e.node)})}const n=F(e);return t.push({value:q(n),computed:!h.namedTypes.Literal.check(n.node)})})),t}function tt(e,t){const n={name:e};if(h.namedTypes.ObjectExpression.check(t.node)||(t=F(t)),h.namedTypes.ObjectExpression.check(t.node)){const e={};t.get("properties").each((function(t){if(t.get("type").value===h.namedTypes.SpreadElement.name)return;const n=x(t);if(!n)return;const r=it(t.get("value")),i=y(t);i&&(r.description=i),r.required=Ge(t.get("value")),e[n]=r})),n.value=e}return n.value||(n.value=q(t),n.computed=!0),n}const nt=["array","bool","func","number","object","string","any","element","node","symbol","elementType"],rt=new Map([["oneOf",function(e){const t={name:"enum"};let n=F(e);return h.namedTypes.ArrayExpression.check(n.node)?t.value=et(n):(n=Q(n)||Ze(n),n?t.value=et(n):(t.computed=!0,t.value=q(e))),t}],["oneOfType",function(e){const t={name:"union"};return h.namedTypes.ArrayExpression.check(e.node)?t.value=e.get("elements").map((function(e){const t=it(e),n=y(e);return n&&(t.description=n),t})):(t.computed=!0,t.value=q(e)),t}],["instanceOf",function(e){return{name:"instanceOf",value:q(e)}}],["arrayOf",function(e){const t={name:"arrayOf"},n=y(e);n&&(t.description=n);const r=it(e);return"unknown"===r.name?(t.value=q(e),t.computed=!0):t.value=r,t}],["objectOf",function(e){const t={name:"objectOf"},n=y(e);n&&(t.description=n);const r=it(e);return"unknown"===r.name?(t.value=q(e),t.computed=!0):t.value=r,t}],["shape",tt.bind(null,"shape")],["exact",tt.bind(null,"exact")]]);function it(e){let t;if(qe(e,!0).some(e=>{const n=e.path.node;let r;if(h.namedTypes.Literal.check(n)?r=n.value:h.namedTypes.Identifier.check(n)&&!e.computed&&(r=n.name),r){if(nt.includes(r))return t={name:r},!0;if(rt.has(r)&&e.argumentsPath)return t=rt.get(r)(e.argumentsPath.get(0)),!0}}),!t){const n=e.node;t=h.namedTypes.Identifier.check(n)&&nt.includes(n.name)?{name:n.name}:h.namedTypes.CallExpression.check(n)&&h.namedTypes.Identifier.check(n.callee)&&rt.has(n.callee.name)?rt.get(n.callee.name)(e.get("arguments",0)):{name:"custom",raw:q(e)}}return t}function st(e,t){h.namedTypes.ObjectExpression.check(t.node)&&t.get("properties").each(t=>{switch(t.node.type){case h.namedTypes.Property.name:{const n=x(t);if(!n)return;const r=e(n),i=t.get("value"),s=function(e){const t=N(e);return!!t&&(v(t)||"ReactPropTypes"===t)}(i)?it(i):{name:"custom",raw:q(i)};s&&(r.type=s,r.required="custom"!==s.name&&Ge(i));break}case h.namedTypes.SpreadElement.name:{const n=F(t.get("argument"));switch(n.node.type){case h.namedTypes.ObjectExpression.name:st(e,n)}break}}})}function ot(e){return function(t,n){let r,i=z(n,e);if(i&&(i=F(i),i)){switch(e){case"childContextTypes":r=t.getChildContextDescriptor;break;case"contextTypes":r=t.getContextDescriptor;break;default:r=t.getPropDescriptor}st(r.bind(t),i)}}}const at=ot("propTypes"),lt=ot("contextTypes"),ut=ot("childContextTypes");function ct(e,t){const n=N(t);n&&e.addComposes(n)}var pt=(e,t)=>{const n=x(t);if(!n)return;const r=e.getPropDescriptor(n);r.description||(r.description=y(t)||"")};var ft=e=>{let t=null;if(_e(e)){const n=e.get("superTypeParameters");if(n.value){const e=n.get("params");t=3===e.value.length?e.get(1):e.get(0)}else{const n=z(e,"props");if(!n)return null;t=H(n.parentPath)}return t}const n=function(e){const t=F(e);if(I(t)){return F(t.get("arguments",0)).get("params",0)}return t.get("params",0)}(e);return n&&(t=H(n)),t};function dt(e,t,n,r){if(t.node.properties)t.get("properties").each(e=>n(e,r));else if(t.node.members)t.get("members").each(e=>n(e,r));else if("InterfaceDeclaration"===t.node.type)t.node.extends&&ht(e,t,n,r),t.get("body","properties").each(e=>n(e,r));else if("TSInterfaceDeclaration"===t.node.type)t.node.extends&&ht(e,t,n,r),t.get("body","body").each(e=>n(e,r));else if("IntersectionTypeAnnotation"===t.node.type||"TSIntersectionType"===t.node.type)t.get("types").each(t=>dt(e,t,n,r));else if("UnionTypeAnnotation"!==t.node.type){const i=re(t);i&&dt(e,i,n,r)}}function ht(e,t,n,r){t.get("extends").each(t=>{const i=re(t);if(i)i.node.typeParameters&&t.node.typeParameters&&(r=ie(i.get("typeParameters"),t.get("typeParameters"),r)),dt(e,i,n,r);else{const n=t.node.id||t.node.typeName||t.node.expression;n&&"Identifier"===n.type&&e.addComposes(n.name)}})}var mt=n(177),yt=n.n(mt);var gt=function(e){const t=e.props;return t&&function(e){Object.keys(e).forEach(t=>{const n=e[t];n.defaultValue&&(n.required=!1)})}(t),e};function vt(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}function bt(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function Et(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?bt(Object(n),!0).forEach((function(t){Tt(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):bt(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function Tt(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}const xt=n(57),St=n(18),wt={".ts":!0,".tsx":!0};function At(e,t){let n={plugins:[]};var r;return e&&(n=Et({},e,{plugins:e.plugins?[...e.plugins]:[]})),xt.loadPartialConfig(t).hasFilesystemConfig()||0!==n.plugins.length||(n.plugins=(r=t,["jsx",wt[St.extname(r.filename||"")]?"typescript":"flow","asyncGenerators","bigInt","classProperties","classPrivateProperties","classPrivateMethods",["decorators",{decoratorsBeforeExport:!1}],"doExpressions","dynamicImport","exportDefaultFrom","exportNamespaceFrom","functionBind","functionSent","importMeta","logicalAssignment","nullishCoalescingOperator","numericSeparator","objectRestSpread","optionalCatchBinding","optionalChaining",["pipelineOperator",{proposal:"minimal"}],"throwExpressions","topLevelAwait"])),n.plugins.push("estree"),n}function Pt(e,t,n){return t.map(t=>{const r=new yt.a;return e.forEach(e=>e(r,t,n)),gt(r.toObject())})}function Ct(e,t,n,r){const i=function(e={}){const{parserOptions:t}=e,n=vt(e,["parserOptions"]),r=At(t,n);return{parse:e=>xt.parseSync(e,Et({parserOpts:r},n))}}(r),s=i.parse(e);s.__src=e;const o=t(s,i);if(Array.isArray(o)){if(0===o.length)throw new Error("No suitable component definition found.");return Pt(n,o,i)}if(o)return Pt(n,[o],i)[0];throw new Error("No suitable component definition found.")}function Dt(e){return M(e,"createClass")||function(e){if(h.namedTypes.ExpressionStatement.check(e.node)&&(e=e.get("expression")),!b(e.node,{type:"CallExpression"}))return!1;const t=N(e);return Boolean(t&&"create-react-class"===t)}(e)}const kt=["Property","FunctionDeclaration","FunctionExpression","ArrowFunctionExpression"];function Ot(e){return"JSXElement"===e.node.type||"JSXFragment"===e.node.type||"CallExpression"===e.node.type&&function(e){return M(e,"createElement")}(e)||"CallExpression"===e.node.type&&function(e){return M(e,"cloneElement")}(e)||"CallExpression"===e.node.type&&function(e){if(h.namedTypes.ExpressionStatement.check(e.node)&&(e=e.get("expression")),!b(e.node,{callee:{property:{name:"only"}}}))return!1;const t=e.get("callee","object"),n=N(t);return!!b(t,{value:{property:{name:"Children"}}})&&Boolean(n&&v(n))}(e)}function _t(e,t){if(t.has(e))return!1;if(t.add(e),Ot(e))return!0;const n=F(e);if("ConditionalExpression"===n.node.type)return _t(n.get("consequent"),t)||_t(n.get("alternate"),t);if("LogicalExpression"===n.node.type)return _t(n.get("left"),t)||_t(n.get("right"),t);if(n!==e&&Ot(n))return!0;if("CallExpression"===n.node.type){let e,r=F(n.get("callee"));if(Ft(r,t))return!0;const i=[r.get("property")];if("MemberExpression"===r.node.type)if("Identifier"===r.get("object").node.type)e=F(r.get("object"));else if(h.namedTypes.MemberExpression.check(r.node)){do{r=r.get("object"),i.unshift(r.get("property"))}while(h.namedTypes.MemberExpression.check(r.node));e=F(r.get("object"))}if(e&&h.namedTypes.ObjectExpression.check(e.node)){const n=i.reduce((e,t)=>t&&e&&(e=S(e,t.node.name))&&h.namedTypes.Identifier.check(e.node)?F(e):e,e);if(!n||Ft(n,t))return!0}}return!1}function Ft(e,t=new WeakSet){let n=!1;if("ArrowFunctionExpression"===e.node.type&&"BlockStatement"!==e.get("body").node.type&&_t(e.get("body"),t))return!0;let r=e.scope;return"Property"===e.node.type&&(r=e.get("value").scope),Object(h.visit)(e,{visitReturnStatement(e){return e.scope===r&&(_t(e.get("argument"),t)?(n=!0,!1):void this.traverse(e))}}),n}function Nt(e){const t=e.node;return-1!==kt.indexOf(t.type)&&(("Property"!==t.type||!Dt(e.parent)&&!_e(e.parent))&&!!Ft(e))}const Mt=()=>!1;function It(e){let t;if(h.namedTypes.ClassDeclaration.check(e.node))e.node.id&&(t=e.node.id.name);else if(h.namedTypes.ClassExpression.check(e.node)){let{parentPath:n}=e;for(;n.node!==e.scope.node&&!h.namedTypes.BlockStatement.check(n.node);){if(h.namedTypes.VariableDeclarator.check(n.node)&&h.namedTypes.Identifier.check(n.node.id)){t=n.node.id.name;break}if(h.namedTypes.AssignmentExpression.check(n.node)&&h.namedTypes.Identifier.check(n.node.left)){t=n.node.left.name;break}n=n.parentPath}}if(!t)return;const n=e.scope;Object(h.visit)(n.node,{visitFunction:Mt,visitClassDeclaration:Mt,visitClassExpression:Mt,visitForInStatement:Mt,visitForStatement:Mt,visitAssignmentExpression:function(n){if(!h.namedTypes.MemberExpression.check(n.node.left))return!1;{const r=E(n.get("left"));if(h.namedTypes.Identifier.check(r.node)&&r.node.name===t){const[t]=qe(n.get("left"));if(t&&!t.path.node.computed){const r=h.builders.classProperty(t.path.node,n.node.right,null,!0);return e.get("body","body").value.push(r),!1}}this.traverse(n)}}})}function Lt(e){if(h.namedTypes.ExpressionStatement.check(e.node)&&(e=e.get("expression")),!h.namedTypes.AssignmentExpression.check(e.node)||!h.namedTypes.MemberExpression.check(e.node.left))return!1;const t=w(e.get("left"));return"module"===t[0]&&"exports"===t[1]||"exports"===t[0]}function jt(e){const t=[];return e.node.default?t.push(e.get("declaration")):e.node.declaration?h.namedTypes.VariableDeclaration.check(e.node.declaration)?e.get("declaration","declarations").each(e=>t.push(e)):t.push(e.get("declaration")):e.node.specifiers&&e.get("specifiers").each(e=>t.push(e.node.id?e.get("id"):e.get("local"))),t.map(e=>F(e))}function Bt(e){const t=e.node;if(h.namedTypes.CallExpression.check(t)&&!Dt(e)&&!I(e)&&t.arguments.length){const n=e.get("arguments",0);return t.arguments.length>1&&(h.namedTypes.Literal.check(n.node)||h.namedTypes.ObjectExpression.check(n.node)||h.namedTypes.ArrayExpression.check(n.node)||h.namedTypes.SpreadElement.check(n.node))?Bt(F(e.get("arguments",t.arguments.length-1))):Bt(F(n))}return e}function Rt(){return!1}function Ut(e){return Dt(e)||_e(e)||Nt(e)||I(e)}function Wt(e){if(Dt(e)){const t=F(e.get("arguments",0));if(h.namedTypes.ObjectExpression.check(t.node))return t}else{if(_e(e))return It(e),e;if(Nt(e)||I(e))return e}return null}const Vt=function(e){let t;function n(e){const n=jt(e).reduce((e,t)=>{if(Ut(t))e.push(t);else{const n=F(Bt(t));Ut(n)&&e.push(n)}return e},[]);if(0===n.length)return!1;if(n.length>1||t)throw new Error("Multiple exported component definitions found.");return t=Wt(n[0]),!1}return Object(h.visit)(e,{visitFunctionDeclaration:Rt,visitFunctionExpression:Rt,visitClassDeclaration:Rt,visitClassExpression:Rt,visitIfStatement:Rt,visitWithStatement:Rt,visitSwitchStatement:Rt,visitWhileStatement:Rt,visitDoWhileStatement:Rt,visitForStatement:Rt,visitForInStatement:Rt,visitForOfStatement:Rt,visitImportDeclaration:Rt,visitExportNamedDeclaration:n,visitExportDefaultDeclaration:n,visitAssignmentExpression:function(e){if(!Lt(e))return!1;if(!Ut(e=F(e.get("right")))&&!Ut(e=F(Bt(e))))return!1;if(t)throw new Error("Multiple exported component definitions found.");return t=Wt(e),!1}}),t},zt=[at,lt,ut,function(e,t){let n=z(t,"propTypes");if(n&&(n=F(n),n))switch(n.node.type){case h.namedTypes.ObjectExpression.name:!function(e,t){t.get("properties").each((function(t){switch(t.node.type){case h.namedTypes.SpreadElement.name:ct(e,F(t.get("argument")))}}))}(e,n);break;default:ct(e,n)}},function(e,t){let n=z(t,"propTypes");n&&(n=F(n),n&&function e(t,n){h.namedTypes.ObjectExpression.check(n.node)&&n.get("properties").each(n=>{if(h.namedTypes.Property.check(n.node))pt(t,n);else if(h.namedTypes.SpreadElement.check(n.node)){const r=F(n.get("argument"));e(t,r)}})}(e,n))},function(e,t){const n=ft(t);n&&dt(e,n,(t,n)=>{!function e(t,n,r){if(h.namedTypes.ObjectTypeSpreadProperty.check(n.node)){const i=te(n.get("argument"));if(h.namedTypes.ObjectTypeAnnotation.check(i.node))return void dt(t,i,(n,r)=>{e(t,n,r)},r);const s=i.get("id").get("name"),o=F(s);if(o&&h.namedTypes.TypeAlias.check(o.node)){const n=o.get("right");dt(t,n,(n,r)=>{e(t,n,r)},r)}else t.addComposes(s.node.name)}else if(h.namedTypes.ObjectTypeProperty.check(n.node)){const e=de(n.get("value"),r),i=x(n);if(!i)return;const s=t.getPropDescriptor(i);s.required=!n.node.optional,s.flowType=e,pt(t,n)}else if(h.namedTypes.TSPropertySignature.check(n.node)){const e=xe(n.get("typeAnnotation"),r),i=x(n);if(!i)return;const s=t.getPropDescriptor(i);s.required=!n.node.optional,s.tsType=e,pt(t,n)}}(e,t,n)})},function(e,t){let n=null;const r=function(e){let t=z(e,"defaultProps");if(!t)return null;if(t=F(t),!t)return null;if(h.namedTypes.FunctionExpression.check(t.node)){const e=R(t);e&&h.namedTypes.ObjectExpression.check(e.node)&&(t=e)}return t}(t);_e(t)||(n=function(e){const t=F(e);if(I(t)){return F(t.get("arguments",0)).get("params",0)}return t.get("params",0)}(t)),n&&h.namedTypes.ObjectPattern.check(n.node)&&$e(n.get("properties"),e,!0),r&&h.namedTypes.ObjectExpression.check(r.node)&&$e(r.get("properties"),e,!1)},function(e,t){e.set("description",L(t)||"")},function(e,t){let n=z(t,"displayName");if(n)n=F(n),h.namedTypes.FunctionExpression.check(n.node)&&(n=R(n)),n&&h.namedTypes.Literal.check(n.node)&&e.set("displayName",n.node.value);else if(h.namedTypes.ClassDeclaration.check(t.node)||h.namedTypes.FunctionDeclaration.check(t.node))e.set("displayName",T(t.get("id")));else if(h.namedTypes.ArrowFunctionExpression.check(t.node)||h.namedTypes.FunctionExpression.check(t.node)||I(t)){let n=t;for(;n.parent;){if(h.namedTypes.VariableDeclarator.check(n.parent.node))return void e.set("displayName",T(n.parent.get("id")));if(h.namedTypes.AssignmentExpression.check(n.parent.node)){const t=n.parent.get("left");if(h.namedTypes.Identifier.check(t.node)||h.namedTypes.Literal.check(t.node))return void e.set("displayName",T(t))}n=n.parent}}},function(e,t){let n=[];if(_e(t))n=t.get("body","body").filter(Ne);else if(h.namedTypes.ObjectExpression.check(t.node)){n=t.get("properties").filter(Ne);const e=z(t,"statics");e&&e.get("properties").each(e=>{Ne(e)&&(e.node.static=!0,n.push(e))})}else h.namedTypes.VariableDeclarator.check(t.parent.node)&&t.parent.node.init===t.node&&h.namedTypes.Identifier.check(t.parent.node.id)?n=Me(t.parent.scope,t.parent.get("id")):h.namedTypes.AssignmentExpression.check(t.parent.node)&&t.parent.node.right===t.node&&h.namedTypes.Identifier.check(t.parent.node.left)?n=Me(t.parent.scope,t.parent.get("left")):h.namedTypes.FunctionDeclaration.check(t.node)&&(n=Me(t.parent.scope,t.get("id")));e.set("methods",n.map(ke).filter(Boolean))},function(e){let t=e.get("methods");t&&(t=t.map(e=>{if(!e.docblock)return e;const t=function(e){const t=Le.a.parse(e);return{description:t.description||null,params:Ue(t),returns:Re(t)}}(e.docblock),n=Ke(t.returns,e.returns),r=e.params.map(e=>Ke(t.params.find(t=>t.name===e.name),e));return Ve({},e,{description:t.description||null,returns:n,params:r})}),e.set("methods",t))}];function Kt(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}const $t="import React, { Component } from 'react';\nimport PropTypes from 'prop-types';\n\n/**\n * General component description.\n */\nclass MyComponent extends Component {\n  render() {\n    // ...\n  }\n}\n\nMyComponent.propTypes = {\n  /**\n   * Description of prop \"foo\".\n   */\n  foo: PropTypes.number,\n  /**\n   * Description of prop \"bar\" (a custom validation function).\n   */\n  bar: function(props, propName, componentName) {\n    // ...\n  },\n  baz: PropTypes.oneOfType([\n    PropTypes.number,\n    PropTypes.string\n  ]).isRequired,\n};\n\nMyComponent.defaultProps = {\n  foo: 42,\n  bar: 21\n};\n\nexport default MyComponent;\n",qt=["jsx","asyncGenerators","bigInt","classProperties","classPrivateProperties","classPrivateMethods",["decorators",{decoratorsBeforeExport:!1}],"doExpressions","dynamicImport","exportDefaultFrom","exportNamespaceFrom","functionBind","functionSent","importMeta","logicalAssignment","nullishCoalescingOperator","numericSeparator","objectRestSpread","optionalCatchBinding","optionalChaining",["pipelineOperator",{proposal:"minimal"}],"throwExpressions","topLevelAwait"];class Gt extends a.a.Component{constructor(){super(),Kt(this,"handleChange",e=>{let t,n="text/plain";try{t=this.compile(e,this.state.options),n="application/json"}catch(e){t=String(e)}this.setState({value:t,mode:n,content:e})}),Kt(this,"handleLanguageChange",e=>{this.setState({options:this.buildOptions(e)},()=>this.handleChange(this.state.content))}),this._jsonRef=a.a.createRef();const e=this.buildOptions("js");this.state={value:this.compile($t,e),mode:"application/json",content:$t,options:e}}compile(e,t){return JSON.stringify(function(e,t,n,r={}){return t||(t=Vt),n||(n=zt),Ct(String(e),t,n,r)}(e,null,null,t),null,2)}buildOptions(e){const t={babelrc:!1,babelrcRoots:!1,configFile:!1,filename:"playground.js",parserOptions:{plugins:[...qt]}};switch(e){case"ts":t.parserOptions.plugins.push("typescript"),t.filename="playground.tsx";break;case"flow":t.parserOptions.plugins.push("flow")}return t}render(){return a.a.createElement(a.a.Fragment,null,a.a.createElement(d,{onLanguageChange:this.handleLanguageChange}),a.a.createElement("div",{className:"panels"},a.a.createElement(f,{value:this.state.content,mode:"text/jsx",codeSample:$t,onChange:this.handleChange}),a.a.createElement(f,{readOnly:!0,ref:this._jsonRef,value:this.state.value,mode:this.state.mode})))}}n(470),n(471);u.a.render(a.a.createElement(Gt,null),document.getElementById("root"))}]);