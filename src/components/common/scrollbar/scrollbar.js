/* eslint-disable */
import { h } from 'vue'
export default (function (t) {
  var e = {};

  function o(r) {
    if (e[r]) return e[r].exports;
    var i = e[r] = {
      i: r,
      l: !1,
      exports: {}
    };
    return t[r].call(i.exports, i, i.exports, o), i.l = !0, i.exports
  }
  o.m = t, o.c = e, o.d = function (t, e, r) {
    o.o(t, e) || Object.defineProperty(t, e, {
      enumerable: !0,
      get: r
    })
  }, o.r = function (t) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
      value: "Module"
    }), Object.defineProperty(t, "__esModule", {
      value: !0
    })
  }, o.t = function (t, e) {
    if (1 & e && (t = o(t)), 8 & e) return t;
    if (4 & e && "object" == typeof t && t && t.__esModule) return t;
    var r = Object.create(null);
    if (o.r(r), Object.defineProperty(r, "default", {
        enumerable: !0,
        value: t
      }), 2 & e && "string" != typeof t)
      for (var i in t) o.d(r, i, function (e) {
        return t[e]
      }.bind(null, i));
    return r
  }, o.n = function (t) {
    var e = t && t.__esModule ? function () {
      return t.default
    } : function () {
      return t
    };
    return o.d(e, "a", e), e
  }, o.o = function (t, e) {
    return Object.prototype.hasOwnProperty.call(t, e)
  }, o.p = "";
  return o(o.s = 1).default
}([function (t, e, o) {}, function (t, e, o) {
  "use strict";

  function r(t, e, o) {
    window[(o ? "add" : "remove") + "EventListener"](t, e)
  }
  o.r(e), o(0);
  var i = {
    name: "llScrollbar",
    props: {
      tag: {
        type: String,
        default: "div"
      },
      throttle: {
        type: Number,
        default: 14
      }
    },
    beforeCreate: function () {
      this.scrollbarWidth = function () {
        var t = document.createElement("div");
        t.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(t);
        var e = t.offsetWidth - t.clientWidth;
        return document.body.removeChild(t), e
      }(), this.X = this.Y = 0, this.scrol = {
        X: "scrollLeft",
        Y: "scrollTop"
      }, this.thumb = {
        X: "horizontal",
        Y: "vertical"
      }, this.offset = {
        X: "offsetWidth",
        Y: "offsetHeight"
      }
    },
    render: function () {
      const t = h
      var e = this,
        o = t("div", {
          class: "ll-scrollbar__bar vertical",
          onMousedown: function (t) {
            return e.mousedownHandler(t, "Y")
          }
        }, [t("div", {
          class: "ll-scrollbar__thumb",
          ref: "vertical"
        })]),
        r = t("div", {
          class: "ll-scrollbar__bar horizontal",
          onMousedown: function (t) {
            return e.mousedownHandler(t, "X")
          }
        }, [t("div", {
          class: "ll-scrollbar__thumb",
          ref: "horizontal"
        })]);
      return t("div", {
        class: "ll-scrollbar " + (navigator.userAgent.indexOf('Mac') > 0 ? 'isMac':''),
        ref: "wrap"
      }, [t("div", {
        class: "ll-scrollbar__view",
        ref: "view",
        onScroll: function (t, e) {
          var o = 0,
            r = null;
          return function () {
            var i = +new Date;
            r && clearTimeout(r), e <= i - o ? (o = i, t()) : r = setTimeout(function () {
              t(), r = null, o = +new Date
            }, e - i + o)
          }
        }(this.scroll, this.throttle),
        style: {
          marginRight: -this.scrollbarWidth + "px",
          marginBottom: -this.scrollbarWidth + "px"
        }
      }, [t(this.tag, {
        ref: "slot",
        class: "ll-scrollbar__slot"
      }, this.$slots.default())]), [r, o]])
    },
    mounted: function () {
      this.init()
      this.b=0
    },
    methods: {
      scroll: function (t) {
        this.b||this.init()
        var e = 0 < arguments.length && void 0 !== t ? t : "Y";
        this[e] = this.$refs.view[this.scrol[e]] * this["proportion" + e];
        var o = 9 === document.documentMode ? "-ms-transform" : "transform";
        this.$refs[this.thumb[e]].style[o] = "translate".concat(e, "(").concat(this[e], "px)"), "Y" === e && this.scroll("X")
      },
      mousedownHandler: function (t, e) {
        2 !== t.button && (document.selection && document.selection.empty(), this.axis = e, -1 < t.target.className.indexOf("thumb") ? (this.start = t["screen" + e] - this[e], r("mousemove", this.mousemoveHandler, 1)) : this.mousemoveHandler("", t["offset" + e] - this.$refs[this.thumb[e]][this.offset[e]] / 2), r("mouseup", this.mouseupHandler, 1))
      },
      mousemoveHandler: function (t, e, o) {
        var r = 2 < arguments.length && void 0 !== o ? o : this.axis;
        this.$refs.view[this.scrol[r]] = (void 0 !== e ? e : t["screen" + r] - this.start) / this["proportion" + r]
      },
      init: function () {
        this.b=1
        setTimeout(()=> (this.b=0),2000)
        var t = this.$refs.view,
          e = this.$refs.wrap.clientHeight,
          o = t.scrollTop,
          r = t.style;
        r.height = "", e !== t.clientHeight && (r.height = e + this.scrollbarWidth + "px", t.scrollTop = o), this.thumbInit(t.clientHeight, t.scrollHeight, "Y"), this.thumbInit(t.clientWidth, t.scrollWidth, "X"), this.scroll()
      },
      thumbInit: function (t, e, o) {
        var r = this.$refs[this.thumb[o]],
          i = r.style;
        t < e ? (i.display = "", i["X" === o ? "width" : "height"] = t / e * t + "px", this["proportion" + o] = (t - r[[this.offset[o]]]) / (e - t)) : i.display = "none"
      },
      mouseupHandler: function () {
        r("mouseup", this.mouseupHandler), r("mousemove", this.mousemoveHandler)
      }
    },
    updated: function () {
      this.init()
    },
    beforeDestroy: function () {
      this.ro && this.ro.disconnect()
    },
    install: function (t) {
      t.component(i.name, i)
    }
  };
  e.default = i
}]))
