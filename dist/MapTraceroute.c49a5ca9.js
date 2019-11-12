// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/vue-use-web/dist/vue-use-web.esm.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useBattery = useBattery;
exports.useClipboard = useClipboard;
exports.useDeviceLight = useDeviceLight;
exports.useDeviceMotion = useDeviceMotion;
exports.useDeviceOrientation = useDeviceOrientation;
exports.useDocumentVisibility = useDocumentVisibility;
exports.useEventListener = useEventListener;
exports.useFetch = useFetch;
exports.useFullscreen = useFullscreen;
exports.useGeolocation = useGeolocation;
exports.useIntersectionObserver = useIntersectionObserver;
exports.useLocalStorage = useLocalStorage;
exports.useMedia = useMedia;
exports.useMousePosition = useMousePosition;
exports.useNetwork = useNetwork;
exports.usePreferredColorScheme = usePreferredColorScheme;
exports.usePreferredLanguages = usePreferredLanguages;
exports.useScript = useScript;
exports.useWebSocket = useWebSocket;
exports.useWindowScrollPosition = useWindowScrollPosition;
exports.useWindowSize = useWindowSize;
exports.useWorker = useWorker;

var _compositionApi = require("@vue/composition-api");

/**
  * elweb v0.9.0
  * (c) 2019 Abdelrahman Awad
  * @license MIT
  */

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
var __assign = function () {
  __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

function __generator(thisArg, body) {
  var _ = {
    label: 0,
    sent: function () {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];

      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;

        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };

        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;

        case 7:
          op = _.ops.pop();

          _.trys.pop();

          continue;

        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }

          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }

          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }

          if (t && _.label < t[2]) {
            _.label = t[2];

            _.ops.push(op);

            break;
          }

          if (t[2]) _.ops.pop();

          _.trys.pop();

          continue;
      }

      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
}

var events = ['chargingchange', 'chargingtimechange', 'dischargingtimechange', 'levelchange'];

function useBattery() {
  var state = (0, _compositionApi.reactive)({
    isCharging: false,
    chargingTime: 0,
    dischargingTime: 0,
    level: 1
  });

  function updateBatteryInfo() {
    state.isCharging = this.charging;
    state.chargingTime = this.chargingTime || 0;
    state.dischargingTime = this.dischargingTime || 0;
    state.level = this.level;
  }

  (0, _compositionApi.onMounted)(function () {
    if (!('getBattery' in navigator)) {
      return;
    }

    navigator.getBattery().then(function (battery) {
      updateBatteryInfo.call(battery);
      events.forEach(function (evt) {
        battery.addEventListener(evt, updateBatteryInfo);
      });
    });
  });
  (0, _compositionApi.onUnmounted)(function () {
    if (!('getBattery' in navigator)) {
      return;
    }

    navigator.getBattery().then(function (battery) {
      events.forEach(function (evt) {
        battery.removeEventListener(evt, updateBatteryInfo);
      });
    });
  });
  return __assign({}, (0, _compositionApi.toRefs)(state));
}

function useClipboard() {
  var text = (0, _compositionApi.ref)('');

  function onCopy() {
    return __awaiter(this, void 0, void 0, function () {
      var _a;

      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            _a = text;
            return [4
            /*yield*/
            , navigator.clipboard.readText()];

          case 1:
            _a.value = _b.sent();
            return [2
            /*return*/
            ];
        }
      });
    });
  }

  (0, _compositionApi.onMounted)(function () {
    window.addEventListener('copy', onCopy);
  });
  (0, _compositionApi.onUnmounted)(function () {
    window.removeEventListener('copy', onCopy);
  });

  function write(txt) {
    text.value = txt;
    return navigator.clipboard.writeText(txt);
  }

  return {
    text: text,
    write: write
  };
}

function useDeviceLight() {
  var value = (0, _compositionApi.ref)(null);

  function handler(event) {
    value.value = event.value;
  } // TODO: Should we debounce/throttle the event?


  (0, _compositionApi.onMounted)(function () {
    window.addEventListener('devicelight', handler);
  });
  (0, _compositionApi.onUnmounted)(function () {
    window.removeEventListener('devicelight', handler);
  });
  return {
    value: value
  };
}

function throttle(wait, fn) {
  if (wait === 0) {
    return fn;
  }

  var timeout;
  return function () {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    var later = function () {
      timeout = undefined; // check if the fn call was cancelled.

      fn.apply(void 0, args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

var hasWindow = typeof window !== 'undefined';

function initState() {
  var defaults = function () {
    return {
      x: null,
      y: null,
      z: null
    };
  };

  var data = {
    acceleration: defaults(),
    accelerationIncludingGravity: defaults(),
    rotationRate: {
      alpha: null,
      beta: null,
      gamma: null
    },
    interval: 0
  };
  return (0, _compositionApi.reactive)(data);
}

function useDeviceMotion(options) {
  if (options === void 0) {
    options = {
      throttleMs: 10
    };
  }

  var state = initState();

  function onDeviceMotion(event) {
    state.acceleration = event.acceleration;
    state.accelerationIncludingGravity = event.accelerationIncludingGravity;
    state.rotationRate = event.rotationRate;
    state.interval = event.interval;
  }

  var handler = options.throttleMs ? throttle(options.throttleMs, onDeviceMotion) : onDeviceMotion;
  (0, _compositionApi.onMounted)(function () {
    window.addEventListener('devicemotion', handler, false);
  });
  (0, _compositionApi.onUnmounted)(function () {
    window.removeEventListener('devicemotion', handler, false);
  });
  return __assign({}, (0, _compositionApi.toRefs)(state));
}

function initState$1() {
  var data = {
    isAbsolute: false,
    gamma: 0,
    alpha: 0,
    beta: 0
  };
  return (0, _compositionApi.reactive)(data);
}

function useDeviceOrientation() {
  var state = initState$1();

  function handler(event) {
    state.isAbsolute = event.absolute;
    state.alpha = event.alpha;
    state.beta = event.beta;
    state.gamma = event.gamma;
  }

  (0, _compositionApi.onMounted)(function () {
    window.addEventListener('deviceorientation', handler);
  });
  (0, _compositionApi.onUnmounted)(function () {
    window.removeEventListener('deviceorientation', handler);
  });
  return __assign({}, (0, _compositionApi.toRefs)(state));
}

function useEventListener(target, type, handler, options) {
  (0, _compositionApi.onMounted)(function () {
    var t = (0, _compositionApi.isRef)(target) ? target.value : target;
    t.addEventListener(type, handler, options);
  });
  (0, _compositionApi.onBeforeUnmount)(function () {
    var t = (0, _compositionApi.isRef)(target) ? target.value : target;
    t.removeEventListener(type, handler, options);
  });
}
/**
 * Tracks visibility of the page.
 *
 * @returns True if the document is currently visible.
 *
 * @example
 * setup() {
 *  const isVisible = useDocumentVisibility()
 *  watch(() => console.log(isVisible))
 * }
 *
 */


function useDocumentVisibility() {
  var documentIsVisible = function () {
    return document.visibilityState === 'visible';
  };

  var isVisible = (0, _compositionApi.ref)(hasWindow ? documentIsVisible() : true);
  useEventListener(document, 'visibilitychange', function () {
    isVisible.value = documentIsVisible();
  });
  return isVisible;
}

function useFetch(url, options) {
  var stateDefs = {
    isLoading: false,
    success: false,
    error: false,
    cancelled: false,
    json: null,
    blob: null,
    text: '',
    type: 'unknown',
    status: undefined,
    statusText: '',
    headers: {}
  };
  var state = (0, _compositionApi.reactive)(stateDefs);
  var signal;
  var controller;

  if (typeof AbortController !== 'undefined') {
    controller = new AbortController();
    signal = controller.signal;
  }

  function execute() {
    state.isLoading = true;
    return window.fetch(url, __assign({
      signal: signal
    }, options)).then(function (res) {
      state.success = res.ok;
      state.error = !res.ok;
      state.isLoading = false;
      state.statusText = res.statusText;
      state.status = res.status;
      state.type = res.type;
      var headers = {};
      res.headers.forEach(function (value, key) {
        headers[key] = value;
      });
      state.headers = headers;
      return Promise.all([res.clone().text(), res.clone().blob(), res.json()]);
    }).then(function (_a) {
      var text = _a[0],
          blob = _a[1],
          json = _a[2]; // Graceful degradation for cancellation.

      if (state.cancelled) {
        return;
      }

      state.text = text;
      state.blob = blob;
      state.json = json;
    }).catch(function () {
      state.error = true;
      state.isLoading = false;
    });
  }

  (0, _compositionApi.onMounted)(execute);

  function cancel() {
    if (state.success) {
      return;
    }

    state.cancelled = true;

    if (controller) {
      controller.abort();
    }
  }

  return __assign(__assign({}, (0, _compositionApi.toRefs)(state)), {
    cancel: cancel,
    execute: execute
  });
}

function useFullscreen(target) {
  var isFullscreen = (0, _compositionApi.ref)(false);

  function exitFullscreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }

    isFullscreen.value = false;
  }

  function enterFullscreen() {
    exitFullscreen();
    target.value.requestFullscreen().then(function () {
      isFullscreen.value = true;
    });
  }

  return {
    isFullscreen: isFullscreen,
    enterFullscreen: enterFullscreen,
    exitFullscreen: exitFullscreen
  };
}

function useGeolocation(options) {
  var data = {
    coords: {
      accuracy: 0,
      latitude: 0,
      longitude: 0,
      altitude: null,
      altitudeAccuracy: null,
      heading: null,
      speed: null
    },
    locatedAt: undefined,
    error: ''
  };
  var state = (0, _compositionApi.reactive)(data);

  function updatePosition(position) {
    state.locatedAt = new Date(position.timestamp);
    state.coords = position.coords;
    state.error = '';
  }

  var watcher;
  (0, _compositionApi.onMounted)(function () {
    if ('geolocation' in navigator) {
      watcher = window.navigator.geolocation.watchPosition(updatePosition, undefined, options);
    }
  });
  (0, _compositionApi.onUnmounted)(function () {
    if (watcher) {
      window.navigator.geolocation.clearWatch(watcher);
    }
  });
  return __assign({}, (0, _compositionApi.toRefs)(state));
}

function useIntersectionObserver(target, options) {
  if (options === void 0) {
    options = {
      root: null,
      rootMargin: '0px'
    };
  }

  var state = (0, _compositionApi.reactive)({
    intersectionRatio: 0,
    isIntersecting: false,
    isFullyInView: false
  });

  function observe() {
    if (target.value) {
      observer.observe(target.value);
    }
  }

  var observer;
  (0, _compositionApi.onMounted)(function () {
    observer = new IntersectionObserver(function (_a) {
      var entry = _a[0];
      state.intersectionRatio = entry.intersectionRatio;

      if (entry.intersectionRatio > 0) {
        state.isIntersecting = true;
        state.isFullyInView = entry.intersectionRatio >= 1;
        return;
      }

      state.isIntersecting = false;
    }, options);
    observe();
  });

  function unobserve() {
    if (!observer) return;

    if (target.value) {
      observer.unobserve(target.value);
    }
  }

  (0, _compositionApi.onUnmounted)(unobserve);
  return __assign(__assign({}, (0, _compositionApi.toRefs)(state)), {
    observe: observe,
    unobserve: unobserve
  });
}

function parseValue(serializedVal) {
  var value = null;

  try {
    value = JSON.parse(serializedVal);
  } catch (_a) {
    value = serializedVal;
  }

  return value;
}

function useLocalStorage(key, def) {
  if (def === void 0) {
    def = undefined;
  }

  var value = (0, _compositionApi.ref)(null);

  var init = function () {
    var serializedVal = localStorage.getItem(key);

    if (serializedVal !== null) {
      value.value = parseValue(serializedVal);
      return;
    }

    value.value = def;
  };

  var initialized = false; // early init if possible.

  if (typeof window !== 'undefined') {
    init();
    initialized = true;
  }

  function handler(e) {
    if (e.key === key) {
      value.value = e.newValue ? parseValue(e.newValue) : null;
    }
  }

  (0, _compositionApi.onMounted)(function () {
    if (!initialized) {
      init();
    }

    window.addEventListener('storage', handler, true);
  });
  (0, _compositionApi.onUnmounted)(function () {
    localStorage.setItem(key, JSON.stringify(value.value));
    window.removeEventListener('storage', handler);
  });
  return {
    value: value
  };
}

function useMedia(query) {
  var mediaQuery; // try to fetch initial value (avoid SSR issues)

  if (typeof window !== 'undefined') {
    mediaQuery = window.matchMedia(query);
  }

  var matches = (0, _compositionApi.ref)(mediaQuery ? mediaQuery.matches : false);

  function handler(event) {
    matches.value = event.matches;
  }

  (0, _compositionApi.onMounted)(function () {
    if (!mediaQuery) {
      mediaQuery = window.matchMedia(query);
    }

    matches.value = mediaQuery.matches;
    mediaQuery.addListener(handler);
  });
  (0, _compositionApi.onUnmounted)(function () {
    mediaQuery.removeListener(handler);
  });
  return matches;
}

function useMousePosition() {
  var state = (0, _compositionApi.reactive)({
    x: 0,
    y: 0
  });

  function handler(e) {
    state.x = e.clientX;
    state.y = e.clientY;
  }

  (0, _compositionApi.onMounted)(function () {
    window.addEventListener('mousemove', handler, false);
  });
  (0, _compositionApi.onUnmounted)(function () {
    window.removeEventListener('mousemove', handler, false);
  });
  return __assign({}, (0, _compositionApi.toRefs)(state));
}

function makeState() {
  var data = {
    isOnline: true,
    offlineAt: undefined,
    downlink: undefined,
    downlinkMax: undefined,
    effectiveType: undefined,
    saveData: undefined,
    type: undefined
  };
  return (0, _compositionApi.reactive)(data);
}

function useNetwork() {
  var state = makeState();

  function updateNetworkInformation() {
    state.isOnline = window.navigator.onLine;
    state.offlineAt = state.isOnline ? undefined : new Date(); // skip for non supported browsers.

    if (!('connection' in window.navigator)) {
      return;
    }

    state.downlink = window.navigator.connection.downlink;
    state.downlinkMax = window.navigator.connection.downlinkMax;
    state.effectiveType = window.navigator.connection.effectiveType;
    state.saveData = window.navigator.connection.saveData;
    state.type = window.navigator.connection.type;
  }

  var onOffline = function () {
    state.isOnline = false;
    state.offlineAt = new Date();
  };

  var onOnline = function () {
    state.isOnline = true;
  };

  (0, _compositionApi.onMounted)(function () {
    updateNetworkInformation();
    window.addEventListener('offline', onOffline);
    window.addEventListener('online', onOnline);

    if ('connection' in window.navigator) {
      window.navigator.connection.addEventListener('change', updateNetworkInformation, false);
    }
  });
  (0, _compositionApi.onUnmounted)(function () {
    window.removeEventListener('offline', onOffline);
    window.removeEventListener('online', onOnline);

    if ('connection' in window.navigator) {
      window.navigator.connection.removeEventListener('change', updateNetworkInformation, false);
    }
  });
  return __assign({}, (0, _compositionApi.toRefs)(state));
}

function usePreferredColorScheme() {
  var queries = {
    light: '(prefers-color-scheme: light)',
    dark: '(prefers-color-scheme: dark)',
    'no-preference': '(prefers-color-scheme: no-preference)'
  };
  var isDark = useMedia(queries.dark);
  var isLight = useMedia(queries.light);
  var theme = (0, _compositionApi.computed)(function () {
    if (isDark.value) {
      return 'dark';
    }

    if (isLight.value) {
      return 'light';
    }

    return 'no-preference';
  });
  return theme;
}

function usePreferredLanguages() {
  var value = (0, _compositionApi.ref)(navigator.languages);

  function handler() {
    value.value = navigator.languages;
  }

  (0, _compositionApi.onMounted)(function () {
    window.addEventListener('languagechange', handler);
  });
  (0, _compositionApi.onUnmounted)(function () {
    window.removeEventListener('languagechange', handler);
  });
  return value;
}

function useScript(opts) {
  var state = (0, _compositionApi.reactive)({
    isLoading: false,
    error: false,
    success: false
  });
  var promise = new Promise(function (resolve, reject) {
    (0, _compositionApi.onMounted)(function () {
      var script = document.createElement('script'); // script.async = opts.async || true;
      // script.async = opts.defer || true;
      // script.noModule = !opts.module || false;

      script.onload = function () {
        state.isLoading = false;
        state.success = true;
        state.error = false;
        resolve();
      };

      script.onerror = function (err) {
        state.isLoading = false;
        state.success = false;
        state.error = true;
        reject(err);
      };

      script.src = opts.src;
      document.head.appendChild(script);
    });
  });
  return __assign(__assign({}, (0, _compositionApi.toRefs)(state)), {
    toPromise: function () {
      return promise;
    }
  });
}

function useWebSocket(url) {
  var data = (0, _compositionApi.ref)(null);
  var state = (0, _compositionApi.ref)('CONNECTING');
  var ws;

  var close = function close(code, reason) {
    if (!ws) return;
    ws.close(code, reason);
  };

  var send = function send(data) {
    if (!ws) return;
    ws.send(data);
  };

  (0, _compositionApi.onMounted)(function () {
    ws = new WebSocket(url);

    ws.onopen = function () {
      state.value = 'OPEN';
    };

    ws.onclose = ws.onerror = function () {
      state.value = 'CLOSED';
    };

    ws.onmessage = function (e) {
      data.value = e.data;
    };
  });
  (0, _compositionApi.onUnmounted)(function () {
    ws.close();
  });
  return {
    data: data,
    state: state,
    close: close,
    send: send
  };
}

function useWindowScrollPosition(options) {
  if (options === void 0) {
    options = {
      throttleMs: 100
    };
  }

  var state = (0, _compositionApi.reactive)({
    x: 0,
    y: 0
  });

  function setScrollPos() {
    state.x = window.pageXOffset;
    state.y = window.pageYOffset;
  }

  var onScroll = throttle(options.throttleMs, setScrollPos);
  (0, _compositionApi.onBeforeMount)(function () {
    setScrollPos();
  });
  (0, _compositionApi.onMounted)(function () {
    window.addEventListener('scroll', onScroll, {
      passive: true
    });
  });
  (0, _compositionApi.onUnmounted)(function () {
    window.removeEventListener('scroll', onScroll);
  });
  return __assign({}, (0, _compositionApi.toRefs)(state));
}

function useWindowSize(options) {
  if (options === void 0) {
    options = {
      throttleMs: 100
    };
  }

  var state = (0, _compositionApi.reactive)({
    width: 0,
    height: 0
  });

  function setSize() {
    state.width = window.innerWidth;
    state.height = window.innerHeight;
  }

  var onScroll = throttle(options.throttleMs, setSize);
  (0, _compositionApi.onBeforeMount)(function () {
    setSize();
  });
  (0, _compositionApi.onMounted)(function () {
    window.addEventListener('resize', onScroll, {
      passive: true
    });
  });
  (0, _compositionApi.onUnmounted)(function () {
    window.removeEventListener('resize', onScroll);
  });
  return __assign({}, (0, _compositionApi.toRefs)(state));
}

function useWorker(url) {
  var data = (0, _compositionApi.ref)(null);
  var worker;

  var post = function post(val) {
    if (!worker) return;
    worker.postMessage(val);
  };

  var terminate = function terminate() {
    if (!worker) return;
    worker.terminate();
  };

  (0, _compositionApi.onMounted)(function () {
    worker = new Worker(url);

    worker.onmessage = function (e) {
      data.value = e.data;
    };
  });
  (0, _compositionApi.onUnmounted)(function () {
    worker.terminate();
  });
  return {
    data: data,
    post: post,
    terminate: terminate
  };
}
},{"@vue/composition-api":"../node_modules/@vue/composition-api/dist/vue-composition-api.module.js"}],"utils/useMapHostname.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _compositionApi = require("@vue/composition-api");

var _vueUseWeb = require("vue-use-web");

const BASE_URL = "http://localhost:3000/mapping";

const getCache = hostname => localStorage.getItem(hostname) && JSON.parse(localStorage.getItem(hostname));

const fetchMap = async hostname => {
  const response = await fetch(BASE_URL, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({
      hostname
    })
  });
  const json = await response.json();
  return {
    data: json.data,
    error: json.error
  };
};

const useMapHostname = hostname => {
  const {
    coords
  } = (0, _vueUseWeb.useGeolocation)({
    timeout: 27000
  });
  const user = (0, _compositionApi.computed)(() => ({
    latitude: coords.value.latitude || 51.44083,
    longitude: coords.value.longitude || 5.47778
  }));
  const parent = (0, _compositionApi.ref)(null);
  const childs = (0, _compositionApi.ref)(null);
  const errorRef = (0, _compositionApi.ref)(null);
  (0, _compositionApi.watch)([hostname], () => {
    if (!hostname.value) return;
    const cache = getCache(hostname.value);

    if (cache && cache.parent && cache.childs) {
      parent.value = cache.parent;
      childs.value = cache.childs;
      console.log("from cache", cache.parent, cache.childs);
      return;
    }

    console.log("fetching...", hostname.value);
    fetchMap(hostname.value).then(({
      data,
      error
    }) => {
      if (error) {
        console.log('error', error);
        errorRef.value = error;
        return;
      }

      console.log("fetched", data);
      parent.value = data.parent;
      childs.value = data.childs;
    });
  });
  (0, _compositionApi.watch)([parent, childs], () => {
    if (parent.value && childs.value) {
      errorRef.value = null;
      localStorage.setItem(hostname.value, JSON.stringify({
        parent: parent.value,
        childs: childs.value
      }));
    }
  });
  return {
    user,
    parent,
    childs,
    error: errorRef
  };
};

var _default = useMapHostname;
exports.default = _default;
},{"@vue/composition-api":"../node_modules/@vue/composition-api/dist/vue-composition-api.module.js","vue-use-web":"../node_modules/vue-use-web/dist/vue-use-web.esm.js"}],"components/MapTraceroute.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _compositionApi = require("@vue/composition-api");

var _useMapHostname = _interopRequireDefault(require("~/utils/useMapHostname.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  props: {
    hostname: String
  },

  setup(props, {
    emit
  }) {
    const hostname = (0, _compositionApi.computed)(() => props.hostname);
    const {
      user,
      parent,
      childs,
      error
    } = (0, _useMapHostname.default)(hostname);
    (0, _compositionApi.watch)(error, () => error.value && emit("error", error.value));
    return {
      user,
      parent,
      childs,
      error
    };
  }

};
exports.default = _default;
        var $56f26a = exports.default || module.exports;
      
      if (typeof $56f26a === 'function') {
        $56f26a = $56f26a.options;
      }
    
        /* template */
        Object.assign($56f26a, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      !_vm.error
        ? _c(
            "portal",
            { attrs: { to: "map", tag: "g", slim: "" } },
            [
              _vm.parent && _vm.user
                ? _c("map-line", {
                    attrs: {
                      from: [_vm.parent.longitude, _vm.parent.latitude],
                      to: [_vm.user.longitude, _vm.user.latitude],
                      stroke: "red",
                      "stroke-width": 24
                    }
                  })
                : _vm._e(),
              _vm._v(" "),
              _vm._l(_vm.childs, function(ref) {
                var longitude = ref.longitude
                var latitude = ref.latitude
                var hostname = ref.hostname
                return [
                  _c("map-line", {
                    key: hostname + longitude,
                    attrs: {
                      from: [_vm.parent.longitude, _vm.parent.latitude],
                      to: [longitude, latitude],
                      stroke: "red"
                    }
                  }),
                  _vm._v(" "),
                  _c(
                    "map-marker",
                    {
                      key: hostname + latitude,
                      attrs: {
                        coordinates: [longitude, latitude],
                        r: 2,
                        fill: "red"
                      }
                    },
                    [_c("circle", { attrs: { r: "2", fill: "red" } })]
                  )
                ]
              })
            ],
            2
          )
        : _vm._e(),
      _vm._v(" "),
      _c(
        "select",
        {
          directives: [
            {
              name: "model",
              rawName: "v-model",
              value: _vm.hostname,
              expression: "hostname"
            }
          ],
          on: {
            change: function($event) {
              var $$selectedVal = Array.prototype.filter
                .call($event.target.options, function(o) {
                  return o.selected
                })
                .map(function(o) {
                  var val = "_value" in o ? o._value : o.value
                  return val
                })
              _vm.hostname = $event.target.multiple
                ? $$selectedVal
                : $$selectedVal[0]
            }
          }
        },
        [
          _c("option", [_vm._v("https://www.nsa.gov/")]),
          _vm._v(" "),
          _c("option", [_vm._v("https://www.alexandermcqueen.com/")]),
          _vm._v(" "),
          _c("option", [_vm._v("https://www.japan.go.jp/")]),
          _vm._v(" "),
          _c("option", [_vm._v("https://www.elysee.fr/")]),
          _vm._v(" "),
          _c("option", [_vm._v("https://www.designacademy.nl/")])
        ]
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$56f26a', $56f26a);
          } else {
            api.reload('$56f26a', $56f26a);
          }
        }

        
      }
    })();
},{"@vue/composition-api":"../node_modules/@vue/composition-api/dist/vue-composition-api.module.js","~/utils/useMapHostname.js":"utils/useMapHostname.js","vue-hot-reload-api":"../node_modules/vue-hot-reload-api/dist/index.js","vue":"../node_modules/vue/dist/vue.common.js"}],"../node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62886" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel/src/builtins/hmr-runtime.js"], null)
//# sourceMappingURL=/MapTraceroute.c49a5ca9.js.map