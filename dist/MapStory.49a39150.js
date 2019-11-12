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
})({"components/MapStory.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _animeEs = _interopRequireDefault(require("animejs/lib/anime.es.js"));

var _compositionApi = require("@vue/composition-api");

var _vueSound = _interopRequireDefault(require("~/utils/vue-sound.js"));

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
const random = (from, to, fixed) => (Math.random() * (to - from) + from).toFixed(fixed) * 1;

var _default = {
  setup() {
    const {
      play,
      stop
    } = (0, _vueSound.default)();
    const sequence = (0, _compositionApi.ref)([]);
    const current = (0, _compositionApi.ref)(null);

    const animate = async () => {
      const last = sequence.value.length - 1;

      for (const [i, elt] of sequence.value.entries()) {
        const getAttr = (attr, def) => elt.attributes[attr] && elt.attributes[attr].value || def;

        current.value = i;
        await (0, _animeEs.default)({
          targets: elt,
          opacity: 1,
          duration: getAttr("duration", 4000),
          direction: i === last && "alternate",
          begin: () => {
            elt.style.display = "block";
            const songName = getAttr("song");
            if (songName) play(songName);
          },
          complete: () => {
            elt.style.display = "none";
            stop();
          }
        }).finished;
      }

      animate();
    };

    (0, _compositionApi.watch)(sequence, () => {
      if (!sequence.value.length) return;
      animate();
    });
    return {
      sequence,
      current,
      randomLL: [...Array(100).keys()].map(i => [[random(-180, 180, 3), random(-180, 180, 3)], [random(-180, 180, 3), random(-180, 180, 3)]])
    };
  }

};
exports.default = _default;
        var $6ed2cb = exports.default || module.exports;
      
      if (typeof $6ed2cb === 'function') {
        $6ed2cb = $6ed2cb.options;
      }
    
        /* template */
        Object.assign($6ed2cb, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "story" }, [
    _c(
      "h1",
      {
        directives: [
          { name: "refs", rawName: "v-refs:sequence", arg: "sequence" }
        ]
      },
      [_vm._v("opt out the yellow pages")]
    ),
    _vm._v(" "),
    _c(
      "p",
      {
        directives: [
          { name: "refs", rawName: "v-refs:sequence", arg: "sequence" }
        ]
      },
      [
        _vm._v(
          "Before Internet, one mean to contact people in different places of the world was using the phone."
        )
      ]
    ),
    _vm._v(" "),
    _c(
      "div",
      {
        directives: [
          { name: "refs", rawName: "v-refs:sequence", arg: "sequence" }
        ]
      },
      [
        _c("p", [
          _vm._v(
            "Each individuals were connected to each others by copper cables."
          )
        ]),
        _vm._v(" "),
        _vm._l(["map", "tor"], function(to) {
          return _c(
            "portal",
            { key: to, attrs: { to: to, tag: "g", slim: "" } },
            [
              _vm.current === 2 || _vm.current === 3
                ? _vm._l(_vm.randomLL, function(x) {
                    return _c("map-line", {
                      key: x[0][0],
                      attrs: { from: x[0], to: x[1], stroke: "yellow" }
                    })
                  })
                : _vm._e()
            ],
            2
          )
        }),
        _vm._v(" "),
        _vm._l(["map", "tor"], function(to) {
          return _c(
            "portal",
            { key: to, attrs: { to: to, tag: "g", slim: "" } },
            [
              _vm.current > 2
                ? [
                    _c(
                      "map-marker",
                      {
                        attrs: { coordinates: [10, 1], r: "8", fill: "black" }
                      },
                      [_c("circle", { attrs: { r: "8", fill: "black" } })]
                    )
                  ]
                : _vm._e()
            ],
            2
          )
        })
      ],
      2
    ),
    _vm._v(" "),
    _c("img", {
      directives: [
        { name: "refs", rawName: "v-refs:sequence", arg: "sequence" }
      ],
      attrs: {
        src:
          "https://www.thisiscolossal.com/wp-content/uploads/2014/09/tower-1.jpg"
      }
    }),
    _vm._v(" "),
    _c(
      "p",
      {
        directives: [
          { name: "refs", rawName: "v-refs:sequence", arg: "sequence" }
        ]
      },
      [_vm._v("Connected to this wireframe, you were given a phone number.")]
    ),
    _vm._v(" "),
    _c(
      "pre",
      {
        directives: [
          { name: "refs", rawName: "v-refs:sequence", arg: "sequence" }
        ],
        attrs: { duration: "1000" }
      },
      [_vm._v("+336 20 40 62 67")]
    ),
    _vm._v(" "),
    _c(
      "pre",
      {
        directives: [
          { name: "refs", rawName: "v-refs:sequence", arg: "sequence" }
        ],
        attrs: { duration: "1000" }
      },
      [_vm._v("+226 815 00 200")]
    ),
    _vm._v(" "),
    _c(
      "pre",
      {
        directives: [
          { name: "refs", rawName: "v-refs:sequence", arg: "sequence" }
        ],
        attrs: { duration: "1000" }
      },
      [_vm._v("+1 47-73904011")]
    ),
    _vm._v(" "),
    _c(
      "pre",
      {
        directives: [
          { name: "refs", rawName: "v-refs:sequence", arg: "sequence" }
        ],
        attrs: { duration: "1000" }
      },
      [_vm._v("+1 212 879 5500")]
    ),
    _vm._v(" "),
    _c(
      "p",
      {
        directives: [
          { name: "refs", rawName: "v-refs:sequence", arg: "sequence" }
        ]
      },
      [
        _vm._v(
          "This number or address is given by an authority, usually the state."
        )
      ]
    ),
    _vm._v(" "),
    _c(
      "p",
      {
        directives: [
          { name: "refs", rawName: "v-refs:sequence", arg: "sequence" }
        ]
      },
      [_vm._v("And it is listed in a repertory, called the white pages.")]
    ),
    _vm._v(" "),
    _c("img", {
      directives: [
        { name: "refs", rawName: "v-refs:sequence", arg: "sequence" }
      ],
      attrs: {
        src:
          "https://upload.wikimedia.org/wikipedia/commons/7/76/New_haven_directory_1878.jpg"
      }
    }),
    _vm._v(" "),
    _c(
      "div",
      {
        directives: [
          { name: "refs", rawName: "v-refs:sequence", arg: "sequence" }
        ],
        attrs: { duration: "3000", song: "connection" }
      },
      [
        _c("p", [
          _vm._v("You could call people from Eindhoven to London in no time.")
        ]),
        _vm._v(" "),
        _vm._l(["map", "tor"], function(to) {
          return _c(
            "portal",
            { key: to, attrs: { to: to, tag: "g", slim: "" } },
            [
              _vm.current === 12
                ? [
                    _c("map-line", {
                      attrs: {
                        from: [-0.118092, 51.509865],
                        to: [51.44083, 5.47778],
                        stroke: "yellow"
                      }
                    })
                  ]
                : _vm._e()
            ],
            2
          )
        })
      ],
      2
    ),
    _vm._v(" "),
    _c(
      "p",
      {
        directives: [
          { name: "refs", rawName: "v-refs:sequence", arg: "sequence" }
        ]
      },
      [_vm._v("Internet use the same kind of network and system.")]
    ),
    _vm._v(" "),
    _c(
      "p",
      {
        directives: [
          { name: "refs", rawName: "v-refs:sequence", arg: "sequence" }
        ]
      },
      [
        _vm._v(
          "Like the Phone System, it have the same notion of address, authorities and providers."
        )
      ]
    ),
    _vm._v(" "),
    _c(
      "p",
      {
        directives: [
          { name: "refs", rawName: "v-refs:sequence", arg: "sequence" }
        ]
      },
      [_vm._v("19th Century Phones are Today's Computers")]
    ),
    _vm._v(" "),
    _c(
      "p",
      {
        directives: [
          { name: "refs", rawName: "v-refs:sequence", arg: "sequence" }
        ]
      },
      [_vm._v("Phone books are Registries")]
    ),
    _vm._v(" "),
    _c(
      "pre",
      {
        directives: [
          { name: "refs", rawName: "v-refs:sequence", arg: "sequence" }
        ]
      },
      [
        _vm._v(
          '; <<>> DiG 9.8.3-P1 <<>> airkoryo.com.kp.\n;; global options: +cmd\n;; Got answer:\n;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 33458\n;; flags: qr rd ra; QUERY: 1, ANSWER: 6, AUTHORITY: 0, ADDITIONAL: 0\n\n;; QUESTION SECTION:\n;airkoryo.com.kp.\t\tIN\tANY\n\n;; ANSWER SECTION:\nairkoryo.com.kp.\t21599\tIN\tA\t175.45.176.69\nairkoryo.com.kp.\t21599\tIN\tSOA\tns1.airkoryo.com.kp. postmaster.airkoryo.com.kp. 2012042612 28800 7200 1209600 3600\nairkoryo.com.kp.\t21599\tIN\tNS\tns1.airkoryo.com.kp.\nairkoryo.com.kp.\t21599\tIN\tNS\tns2.airkoryo.com.kp.\nairkoryo.com.kp.\t21599\tIN\tMX\t10 mail.airkoryo.com.kp.\nairkoryo.com.kp.\t21599\tIN\tTXT\t"vspf1 ipv4:175.45.176.70 -all"\n\n;; Query time: 302 msec\n;; SERVER: 172.16.0.1#53(172.16.0.1)\n;; WHEN: Mon Sep 19 22:49:39 2016\n;; MSG SIZE  rcvd: 195\n\n; <<>> DiG 9.8.3-P1 <<>> co.kp.\n;; Got answer:\n;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 45384\n;; flags: qr rd ra; QUERY: 1, ANSWER: 3, AUTHORITY: 0, ADDITIONAL: 0\n\n;; QUESTION SECTION:\n;co.kp.\t\t\t\tIN\tANY\n\n;; ANSWER SECTION:\nco.kp.\t\t\t21599\tIN\tSOA\tns1.co.kp. root.co.kp. 2013082900 28800 86400 1209600 86400\nco.kp.\t\t\t21599\tIN\tNS\tns2.co.kp.\nco.kp.\t\t\t21599\tIN\tNS\tns1.co.kp.\n    '
        )
      ]
    ),
    _vm._v(" "),
    _c(
      "p",
      {
        directives: [
          { name: "refs", rawName: "v-refs:sequence", arg: "sequence" }
        ]
      },
      [_vm._v("Switchboard operators are DNS Servers")]
    ),
    _vm._v(" "),
    _c(
      "div",
      {
        directives: [
          { name: "refs", rawName: "v-refs:sequence", arg: "sequence" }
        ],
        attrs: { duration: "5000" }
      },
      [
        _c("video", {
          attrs: {
            autoplay: "",
            loop: "",
            src: "/[Bell Telephone Switchboard Operators] (1940-1950 -).9fcb01e4.null"
          }
        })
      ]
    ),
    _vm._v(" "),
    _c(
      "p",
      {
        directives: [
          { name: "refs", rawName: "v-refs:sequence", arg: "sequence" }
        ]
      },
      [_vm._v("and copper cables are ... copper cables")]
    )
  ])
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: "data-v-6ed2cb",
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
            api.createRecord('$6ed2cb', $6ed2cb);
          } else {
            api.reload('$6ed2cb', $6ed2cb);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"animejs/lib/anime.es.js":"../node_modules/animejs/lib/anime.es.js","@vue/composition-api":"../node_modules/@vue/composition-api/dist/vue-composition-api.module.js","~/utils/vue-sound.js":"utils/vue-sound.js","/Users/eliasrhouzlane/projects/dae/infrastructure/src/assets/video/[Bell Telephone Switchboard Operators] (1940-1950 -).mp4":[["[Bell Telephone Switchboard Operators] (1940-1950 -).9fcb01e4.null","assets/video/[Bell Telephone Switchboard Operators] (1940-1950 -).mp4"],"assets/video/[Bell Telephone Switchboard Operators] (1940-1950 -).mp4"],"_css_loader":"../node_modules/parcel/src/builtins/css-loader.js","vue-hot-reload-api":"../node_modules/vue-hot-reload-api/dist/index.js","vue":"../node_modules/vue/dist/vue.common.js"}],"../node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
},{}],"../node_modules/parcel/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel/src/builtins/bundle-loader.js":[function(require,module,exports) {
var getBundleURL = require('./bundle-url').getBundleURL;

function loadBundlesLazy(bundles) {
  if (!Array.isArray(bundles)) {
    bundles = [bundles];
  }

  var id = bundles[bundles.length - 1];

  try {
    return Promise.resolve(require(id));
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      return new LazyPromise(function (resolve, reject) {
        loadBundles(bundles.slice(0, -1)).then(function () {
          return require(id);
        }).then(resolve, reject);
      });
    }

    throw err;
  }
}

function loadBundles(bundles) {
  return Promise.all(bundles.map(loadBundle));
}

var bundleLoaders = {};

function registerBundleLoader(type, loader) {
  bundleLoaders[type] = loader;
}

module.exports = exports = loadBundlesLazy;
exports.load = loadBundles;
exports.register = registerBundleLoader;
var bundles = {};

function loadBundle(bundle) {
  var id;

  if (Array.isArray(bundle)) {
    id = bundle[1];
    bundle = bundle[0];
  }

  if (bundles[bundle]) {
    return bundles[bundle];
  }

  var type = (bundle.substring(bundle.lastIndexOf('.') + 1, bundle.length) || bundle).toLowerCase();
  var bundleLoader = bundleLoaders[type];

  if (bundleLoader) {
    return bundles[bundle] = bundleLoader(getBundleURL() + bundle).then(function (resolved) {
      if (resolved) {
        module.bundle.register(id, resolved);
      }

      return resolved;
    }).catch(function (e) {
      delete bundles[bundle];
      throw e;
    });
  }
}

function LazyPromise(executor) {
  this.executor = executor;
  this.promise = null;
}

LazyPromise.prototype.then = function (onSuccess, onError) {
  if (this.promise === null) this.promise = new Promise(this.executor);
  return this.promise.then(onSuccess, onError);
};

LazyPromise.prototype.catch = function (onError) {
  if (this.promise === null) this.promise = new Promise(this.executor);
  return this.promise.catch(onError);
};
},{"./bundle-url":"../node_modules/parcel/src/builtins/bundle-url.js"}],0:[function(require,module,exports) {
var b=require("../node_modules/parcel/src/builtins/bundle-loader.js");b.load([]).then(function(){require("components/MapStory.vue");});
},{}]},{},["../node_modules/parcel/src/builtins/hmr-runtime.js",0], null)
//# sourceMappingURL=/MapStory.49a39150.js.map