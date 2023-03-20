import {
  Transition,
  createBaseVNode,
  createBlock,
  createCommentVNode,
  createElementBlock,
  createTextVNode,
  normalizeClass,
  openBlock,
  renderSlot,
  withCtx
} from "./chunk-AQ3ZCXI5.js";
import "./chunk-RSJERJUL.js";

// node_modules/tiny-cookie/es/util.js
function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}
function escapeRe(str) {
  return str.replace(/[.*+?^$|[\](){}\\-]/g, "\\$&");
}
function computeExpires(str) {
  var lastCh = str.charAt(str.length - 1);
  var value = parseInt(str, 10);
  var expires = new Date();
  switch (lastCh) {
    case "Y":
      expires.setFullYear(expires.getFullYear() + value);
      break;
    case "M":
      expires.setMonth(expires.getMonth() + value);
      break;
    case "D":
      expires.setDate(expires.getDate() + value);
      break;
    case "h":
      expires.setHours(expires.getHours() + value);
      break;
    case "m":
      expires.setMinutes(expires.getMinutes() + value);
      break;
    case "s":
      expires.setSeconds(expires.getSeconds() + value);
      break;
    default:
      expires = new Date(str);
  }
  return expires;
}
function convert(opts) {
  var res = "";
  for (var key in opts) {
    if (hasOwn(opts, key)) {
      if (/^expires$/i.test(key)) {
        var expires = opts[key];
        if (typeof expires !== "object") {
          expires += typeof expires === "number" ? "D" : "";
          expires = computeExpires(expires);
        }
        res += ";" + key + "=" + expires.toUTCString();
      } else if (/^secure$/.test(key)) {
        if (opts[key]) {
          res += ";" + key;
        }
      } else {
        res += ";" + key + "=" + opts[key];
      }
    }
  }
  if (!hasOwn(opts, "path")) {
    res += ";path=/";
  }
  return res;
}

// node_modules/tiny-cookie/es/index.js
function get(key, decoder) {
  if (decoder === void 0) {
    decoder = decodeURIComponent;
  }
  if (typeof key !== "string" || !key) {
    return null;
  }
  var reKey = new RegExp("(?:^|; )" + escapeRe(key) + "(?:=([^;]*))?(?:;|$)");
  var match = reKey.exec(document.cookie);
  if (match === null) {
    return null;
  }
  return typeof decoder === "function" ? decoder(match[1]) : match[1];
}
function set(key, value, encoder, options) {
  if (encoder === void 0) {
    encoder = encodeURIComponent;
  }
  if (typeof encoder === "object" && encoder !== null) {
    options = encoder;
    encoder = encodeURIComponent;
  }
  var attrsStr = convert(options || {});
  var valueStr = typeof encoder === "function" ? encoder(value) : value;
  var newCookie = key + "=" + valueStr + attrsStr;
  document.cookie = newCookie;
}

// node_modules/vue-cookie-accept-decline/dist/vue-cookie-accept-decline.esm.js
var script = {
  name: "vue-cookie-accept-decline",
  props: {
    elementId: {
      type: String,
      required: true
    },
    debug: {
      type: Boolean,
      default: false
    },
    disableDecline: {
      type: Boolean,
      default: false
    },
    // floating: bottom-left, bottom-right, top-left, top-rigt
    // bar:  bottom, top
    position: {
      type: String,
      default: "bottom-left"
    },
    // floating, bar
    type: {
      type: String,
      default: "floating"
    },
    // slideFromBottom, slideFromTop, fade
    transitionName: {
      type: String,
      default: "slideFromBottom"
    },
    showPostponeButton: {
      type: Boolean,
      default: false
    },
    forceCookies: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      status: null,
      supportsLocalStorage: true,
      isOpen: false
    };
  },
  computed: {
    containerPosition: function containerPosition() {
      return "cookie--" + this.position;
    },
    containerType: function containerType() {
      return "cookie--" + this.type;
    }
  },
  mounted: function mounted() {
    this.checkLocalStorageFunctionality();
    this.init();
  },
  methods: {
    init: function init() {
      var visitedType = this.getCookieStatus();
      if (visitedType && (visitedType === "accept" || visitedType === "decline" || visitedType === "postpone")) {
        this.isOpen = false;
      }
      if (!visitedType) {
        this.isOpen = true;
      }
      this.status = visitedType;
      this.$emit("status", visitedType);
    },
    checkLocalStorageFunctionality: function checkLocalStorageFunctionality() {
      if (this.forceCookies) {
        this.supportsLocalStorage = false;
        return;
      }
      try {
        var test = "__vue-cookie-accept-decline-check-localStorage";
        window.localStorage.setItem(test, test);
        window.localStorage.removeItem(test);
      } catch (e) {
        console.error("Local storage is not supported, falling back to cookie use");
        this.supportsLocalStorage = false;
      }
    },
    setCookieStatus: function setCookieStatus(type) {
      if (this.supportsLocalStorage) {
        if (type === "accept") {
          localStorage.setItem("vue-cookie-accept-decline-" + this.elementId, "accept");
        }
        if (type === "decline") {
          localStorage.setItem("vue-cookie-accept-decline-" + this.elementId, "decline");
        }
        if (type === "postpone") {
          localStorage.setItem("vue-cookie-accept-decline-" + this.elementId, "postpone");
        }
      } else {
        if (type === "accept") {
          set("vue-cookie-accept-decline-" + this.elementId, "accept");
        }
        if (type === "decline") {
          set("vue-cookie-accept-decline-" + this.elementId, "decline");
        }
        if (type === "postpone") {
          set("vue-cookie-accept-decline-" + this.elementId, "postpone");
        }
      }
    },
    getCookieStatus: function getCookieStatus() {
      if (this.supportsLocalStorage) {
        return localStorage.getItem("vue-cookie-accept-decline-" + this.elementId);
      } else {
        return get("vue-cookie-accept-decline-" + this.elementId);
      }
    },
    accept: function accept() {
      if (!this.debug) {
        this.setCookieStatus("accept");
      }
      this.status = "accept";
      this.isOpen = false;
      this.$emit("clicked-accept");
    },
    decline: function decline() {
      if (!this.debug) {
        this.setCookieStatus("decline");
      }
      this.status = "decline";
      this.isOpen = false;
      this.$emit("clicked-decline");
    },
    postpone: function postpone() {
      if (!this.debug) {
        this.setCookieStatus("postpone");
      }
      this.status = "postpone";
      this.isOpen = false;
      this.$emit("clicked-postpone");
    },
    removeCookie: function removeCookie() {
      localStorage.removeItem("vue-cookie-accept-decline-" + this.elementId);
      this.status = null;
      this.$emit("removed-cookie");
    }
  }
};
var _hoisted_1 = ["id"];
var _hoisted_2 = createTextVNode("×");
var _hoisted_3 = createTextVNode(" We use cookies to ensure you get the best experience on our website. ");
var _hoisted_4 = createBaseVNode(
  "a",
  {
    href: "https://cookiesandyou.com/",
    target: "_blank"
  },
  "Learn More...",
  -1
  /* HOISTED */
);
var _hoisted_5 = createTextVNode("Opt Out");
var _hoisted_6 = createTextVNode("Got It!");
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(Transition, {
    appear: "",
    name: $props.transitionName
  }, {
    default: withCtx(function() {
      return [
        $data.isOpen ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(["cookie", ["cookie__" + $props.type, "cookie__" + $props.type + "--" + $props.position]]),
          id: $props.elementId
        }, [
          createBaseVNode(
            "div",
            {
              class: normalizeClass("cookie__" + $props.type + "__wrap")
            },
            [
              $props.showPostponeButton === true ? (openBlock(), createElementBlock(
                "div",
                {
                  key: 0,
                  onClick: _cache[0] || (_cache[0] = function() {
                    var args = [], len = arguments.length;
                    while (len--)
                      args[len] = arguments[len];
                    return $options.postpone && $options.postpone.apply($options, args);
                  }),
                  class: normalizeClass("cookie__" + $props.type + "__postpone-button"),
                  title: "Close"
                },
                [
                  renderSlot(_ctx.$slots, "postponeContent", {}, function() {
                    return [
                      _hoisted_2
                    ];
                  })
                ],
                2
                /* CLASS */
              )) : createCommentVNode("v-if", true),
              createBaseVNode(
                "div",
                {
                  class: normalizeClass("cookie__" + $props.type + "__content")
                },
                [
                  renderSlot(_ctx.$slots, "message", {}, function() {
                    return [
                      _hoisted_3,
                      _hoisted_4
                    ];
                  })
                ],
                2
                /* CLASS */
              ),
              createBaseVNode(
                "div",
                {
                  class: normalizeClass("cookie__" + $props.type + "__buttons")
                },
                [
                  $props.disableDecline === false ? (openBlock(), createElementBlock(
                    "button",
                    {
                      key: 0,
                      onClick: _cache[1] || (_cache[1] = function() {
                        var args = [], len = arguments.length;
                        while (len--)
                          args[len] = arguments[len];
                        return $options.decline && $options.decline.apply($options, args);
                      }),
                      class: normalizeClass([
                        "cookie__" + $props.type + "__buttons__button",
                        "cookie__" + $props.type + "__buttons__button--decline"
                      ])
                    },
                    [
                      renderSlot(_ctx.$slots, "declineContent", {}, function() {
                        return [
                          _hoisted_5
                        ];
                      })
                    ],
                    2
                    /* CLASS */
                  )) : createCommentVNode("v-if", true),
                  createBaseVNode(
                    "button",
                    {
                      onClick: _cache[2] || (_cache[2] = function() {
                        var args = [], len = arguments.length;
                        while (len--)
                          args[len] = arguments[len];
                        return $options.accept && $options.accept.apply($options, args);
                      }),
                      class: normalizeClass([
                        "cookie__" + $props.type + "__buttons__button",
                        "cookie__" + $props.type + "__buttons__button--accept"
                      ])
                    },
                    [
                      renderSlot(_ctx.$slots, "acceptContent", {}, function() {
                        return [
                          _hoisted_6
                        ];
                      })
                    ],
                    2
                    /* CLASS */
                  )
                ],
                2
                /* CLASS */
              )
            ],
            2
            /* CLASS */
          )
        ], 10, _hoisted_1)) : createCommentVNode("v-if", true)
      ];
    }),
    _: 3
    /* FORWARDED */
  }, 8, ["name"]);
}
script.render = render;
script.__file = "src/vue-cookie-accept-decline.vue";
function install(app) {
  if (install.installed) {
    return;
  }
  install.installed = true;
  app.component("VueCookieAcceptDecline", script);
}
var plugin = { install };
var GlobalVue = null;
if (typeof window !== "undefined") {
  GlobalVue = window.Vue;
} else if (typeof global !== "undefined") {
  GlobalVue = global.Vue;
}
if (GlobalVue && "use" in GlobalVue) {
  GlobalVue.use(plugin);
}
var vue_cookie_accept_decline_esm_default = script;
export {
  vue_cookie_accept_decline_esm_default as default,
  install
};
//# sourceMappingURL=vue-cookie-accept-decline.js.map
