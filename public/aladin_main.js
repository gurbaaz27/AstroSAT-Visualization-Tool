function AstroMath() {}
function Projection(t, e) {
  (this.PROJECTION = Projection.PROJ_TAN),
    (this.ROT = this.tr_oR(t, e)),
    (this.longitudeIsReversed = !1);
}
function Coo(t, e, i) {
  (this.lon = t),
    (this.lat = e),
    (this.prec = i),
    (this.frame = null),
    this.computeDirCos();
}
function Tokenizer(t, e) {
  (this.string = Strings.trim(t, e)), (this.sep = e), (this.pos = 0);
}
function Strings() {}
function Numbers() {}
function relMouseCoords(t) {
  if (t.offsetX) return { x: t.offsetX, y: t.offsetY };
  if (!Utils.cssScale) {
    var e = window.getComputedStyle(document.body, null),
      i =
        e.getPropertyValue("-webkit-transform") ||
        e.getPropertyValue("-moz-transform") ||
        e.getPropertyValue("-ms-transform") ||
        e.getPropertyValue("-o-transform") ||
        e.getPropertyValue("transform"),
      r = /matrix\((-?\d*\.?\d+),\s*0,\s*0,\s*(-?\d*\.?\d+),\s*0,\s*0\)/,
      o = i.match(r);
    Utils.cssScale = o ? parseFloat(o[1]) : 1;
  }
  var s = t,
    a = (s.target, s.target || s.srcElement),
    n = a.currentStyle || window.getComputedStyle(a, null),
    l = parseInt(n.borderLeftWidth, 10),
    h = parseInt(n.borderTopWidth, 10),
    c = a.getBoundingClientRect(),
    u = s.clientX,
    p = s.clientY;
  void 0 == s.clientX &&
    ((u = s.originalEvent.changedTouches[0].clientX),
    (p = s.originalEvent.changedTouches[0].clientY));
  var d = u - l - c.left,
    f = p - h - c.top;
  return { x: parseInt(d / Utils.cssScale), y: parseInt(f / Utils.cssScale) };
}
var cds = cds || {},
  A = A || {};
"object" != typeof JSON && (JSON = {}),
  (function () {
    "use strict";
    function f(t) {
      return t < 10 ? "0" + t : t;
    }
    function quote(t) {
      return (
        (escapable.lastIndex = 0),
        escapable.test(t)
          ? '"' +
            t.replace(escapable, function (t) {
              var e = meta[t];
              return "string" == typeof e
                ? e
                : "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4);
            }) +
            '"'
          : '"' + t + '"'
      );
    }
    function str(t, e) {
      var i,
        r,
        o,
        s,
        a,
        n = gap,
        l = e[t];
      switch (
        (l &&
          "object" == typeof l &&
          "function" == typeof l.toJSON &&
          (l = l.toJSON(t)),
        "function" == typeof rep && (l = rep.call(e, t, l)),
        typeof l)
      ) {
        case "string":
          return quote(l);
        case "number":
          return isFinite(l) ? String(l) : "null";
        case "boolean":
        case "null":
          return String(l);
        case "object":
          if (!l) return "null";
          if (
            ((gap += indent),
            (a = []),
            "[object Array]" === Object.prototype.toString.apply(l))
          ) {
            for (s = l.length, i = 0; i < s; i += 1) a[i] = str(i, l) || "null";
            return (
              (o =
                0 === a.length
                  ? "[]"
                  : gap
                  ? "[\n" + gap + a.join(",\n" + gap) + "\n" + n + "]"
                  : "[" + a.join(",") + "]"),
              (gap = n),
              o
            );
          }
          if (rep && "object" == typeof rep)
            for (s = rep.length, i = 0; i < s; i += 1)
              "string" == typeof rep[i] &&
                ((r = rep[i]),
                (o = str(r, l)) && a.push(quote(r) + (gap ? ": " : ":") + o));
          else
            for (r in l)
              Object.prototype.hasOwnProperty.call(l, r) &&
                (o = str(r, l)) &&
                a.push(quote(r) + (gap ? ": " : ":") + o);
          return (
            (o =
              0 === a.length
                ? "{}"
                : gap
                ? "{\n" + gap + a.join(",\n" + gap) + "\n" + n + "}"
                : "{" + a.join(",") + "}"),
            (gap = n),
            o
          );
      }
    }
    "function" != typeof Date.prototype.toJSON &&
      ((Date.prototype.toJSON = function (t) {
        return isFinite(this.valueOf())
          ? this.getUTCFullYear() +
              "-" +
              f(this.getUTCMonth() + 1) +
              "-" +
              f(this.getUTCDate()) +
              "T" +
              f(this.getUTCHours()) +
              ":" +
              f(this.getUTCMinutes()) +
              ":" +
              f(this.getUTCSeconds()) +
              "Z"
          : null;
      }),
      (String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function (
        t
      ) {
        return this.valueOf();
      }));
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
      escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
      gap,
      indent,
      meta = {
        "\b": "\\b",
        "\t": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\",
      },
      rep;
    "function" != typeof JSON.stringify &&
      (JSON.stringify = function (t, e, i) {
        var r;
        if (((gap = ""), (indent = ""), "number" == typeof i))
          for (r = 0; r < i; r += 1) indent += " ";
        else "string" == typeof i && (indent = i);
        if (
          ((rep = e),
          e &&
            "function" != typeof e &&
            ("object" != typeof e || "number" != typeof e.length))
        )
          throw new Error("JSON.stringify");
        return str("", { "": t });
      }),
      "function" != typeof JSON.parse &&
        (JSON.parse = function (text, reviver) {
          function walk(t, e) {
            var i,
              r,
              o = t[e];
            if (o && "object" == typeof o)
              for (i in o)
                Object.prototype.hasOwnProperty.call(o, i) &&
                  ((r = walk(o, i)), void 0 !== r ? (o[i] = r) : delete o[i]);
            return reviver.call(t, e, o);
          }
          var j;
          if (
            ((text = String(text)),
            (cx.lastIndex = 0),
            cx.test(text) &&
              (text = text.replace(cx, function (t) {
                return (
                  "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4)
                );
              })),
            /^[\],:{}\s]*$/.test(
              text
                .replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@")
                .replace(
                  /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                  "]"
                )
                .replace(/(?:^|:|,)(?:\s*\[)+/g, "")
            ))
          )
            return (
              (j = eval("(" + text + ")")),
              "function" == typeof reviver ? walk({ "": j }, "") : j
            );
          throw new SyntaxError("JSON.parse");
        });
  })(),
  (Logger = {}),
  (Logger.log = function (t, e) {
    try {
      var i = "";
      e && (i = JSON.stringify(e)),
        $.ajax({
          url: "//alasky.unistra.fr/cgi/AladinLiteLogger/log.py",
          data: {
            action: t,
            params: i,
            pageUrl: window.location.href,
            referer: document.referrer ? document.referrer : "",
          },
          method: "GET",
          dataType: "json",
        });
    } catch (t) {
      window.console && console.log("Exception: " + t);
    }
  }),
  (function (t) {
    "function" == typeof define && define.amd
      ? define(["jquery"], t)
      : "object" == typeof exports
      ? (module.exports = t)
      : t(jQuery);
  })(function (t) {
    function e(e) {
      var a = e || window.event,
        n = l.call(arguments, 1),
        h = 0,
        u = 0,
        p = 0,
        d = 0,
        f = 0,
        v = 0;
      if (
        ((e = t.event.fix(a)),
        (e.type = "mousewheel"),
        "detail" in a && (p = -1 * a.detail),
        "wheelDelta" in a && (p = a.wheelDelta),
        "wheelDeltaY" in a && (p = a.wheelDeltaY),
        "wheelDeltaX" in a && (u = -1 * a.wheelDeltaX),
        "axis" in a && a.axis === a.HORIZONTAL_AXIS && ((u = -1 * p), (p = 0)),
        (h = 0 === p ? u : p),
        "deltaY" in a && ((p = -1 * a.deltaY), (h = p)),
        "deltaX" in a && ((u = a.deltaX), 0 === p && (h = -1 * u)),
        0 !== p || 0 !== u)
      ) {
        if (1 === a.deltaMode) {
          var g = t.data(this, "mousewheel-line-height");
          (h *= g), (p *= g), (u *= g);
        } else if (2 === a.deltaMode) {
          var m = t.data(this, "mousewheel-page-height");
          (h *= m), (p *= m), (u *= m);
        }
        if (
          ((d = Math.max(Math.abs(p), Math.abs(u))),
          (!s || d < s) && ((s = d), r(a, d) && (s /= 40)),
          r(a, d) && ((h /= 40), (u /= 40), (p /= 40)),
          (h = Math[h >= 1 ? "floor" : "ceil"](h / s)),
          (u = Math[u >= 1 ? "floor" : "ceil"](u / s)),
          (p = Math[p >= 1 ? "floor" : "ceil"](p / s)),
          c.settings.normalizeOffset && this.getBoundingClientRect)
        ) {
          var y = this.getBoundingClientRect();
          (f = e.clientX - y.left), (v = e.clientY - y.top);
        }
        return (
          (e.deltaX = u),
          (e.deltaY = p),
          (e.deltaFactor = s),
          (e.offsetX = f),
          (e.offsetY = v),
          (e.deltaMode = 0),
          n.unshift(e, h, u, p),
          o && clearTimeout(o),
          (o = setTimeout(i, 200)),
          (t.event.dispatch || t.event.handle).apply(this, n)
        );
      }
    }
    function i() {
      s = null;
    }
    function r(t, e) {
      return (
        c.settings.adjustOldDeltas && "mousewheel" === t.type && e % 120 == 0
      );
    }
    var o,
      s,
      a = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
      n =
        "onwheel" in document || document.documentMode >= 9
          ? ["wheel"]
          : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
      l = Array.prototype.slice;
    if (t.event.fixHooks)
      for (var h = a.length; h; ) t.event.fixHooks[a[--h]] = t.event.mouseHooks;
    var c = (t.event.special.mousewheel = {
      version: "3.1.12",
      setup: function () {
        if (this.addEventListener)
          for (var i = n.length; i; ) this.addEventListener(n[--i], e, !1);
        else this.onmousewheel = e;
        t.data(this, "mousewheel-line-height", c.getLineHeight(this)),
          t.data(this, "mousewheel-page-height", c.getPageHeight(this));
      },
      teardown: function () {
        if (this.removeEventListener)
          for (var i = n.length; i; ) this.removeEventListener(n[--i], e, !1);
        else this.onmousewheel = null;
        t.removeData(this, "mousewheel-line-height"),
          t.removeData(this, "mousewheel-page-height");
      },
      getLineHeight: function (e) {
        var i = t(e),
          r = i["offsetParent" in t.fn ? "offsetParent" : "parent"]();
        return (
          r.length || (r = t("body")),
          parseInt(r.css("fontSize"), 10) ||
            parseInt(i.css("fontSize"), 10) ||
            16
        );
      },
      getPageHeight: function (e) {
        return t(e).height();
      },
      settings: { adjustOldDeltas: !0, normalizeOffset: !0 },
    });
    t.fn.extend({
      mousewheel: function (t) {
        return t ? this.bind("mousewheel", t) : this.trigger("mousewheel");
      },
      unmousewheel: function (t) {
        return this.unbind("mousewheel", t);
      },
    });
  }),
  (window.requestAnimFrame = (function () {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (t, e) {
        window.setTimeout(t, 1e3 / 60);
      }
    );
  })());
var Stats = function () {
  function t(t, e, i) {
    var r, o, s;
    for (o = 0; o < 30; o++)
      for (r = 0; r < 73; r++)
        (s = 4 * (r + 74 * o)),
          (t[s] = t[s + 4]),
          (t[s + 1] = t[s + 5]),
          (t[s + 2] = t[s + 6]);
    for (o = 0; o < 30; o++)
      (s = 4 * (73 + 74 * o)),
        o < e
          ? ((t[s] = O[i].bg.r), (t[s + 1] = O[i].bg.g), (t[s + 2] = O[i].bg.b))
          : ((t[s] = O[i].fg.r),
            (t[s + 1] = O[i].fg.g),
            (t[s + 2] = O[i].fg.b));
  }
  var e,
    i,
    r,
    o,
    s,
    a,
    n,
    l,
    h,
    c,
    u,
    p,
    d,
    f,
    v = 0,
    g = 2,
    m = 0,
    y = new Date().getTime(),
    S = y,
    w = y,
    C = 0,
    x = 1e3,
    _ = 0,
    b = 0,
    I = 1e3,
    M = 0,
    A = 0,
    T = 1e3,
    R = 0,
    O = {
      fps: { bg: { r: 16, g: 16, b: 48 }, fg: { r: 0, g: 255, b: 255 } },
      ms: { bg: { r: 16, g: 48, b: 16 }, fg: { r: 0, g: 255, b: 0 } },
      mb: { bg: { r: 48, g: 16, b: 26 }, fg: { r: 255, g: 0, b: 128 } },
    };
  (e = document.createElement("div")),
    (e.style.cursor = "pointer"),
    (e.style.width = "80px"),
    (e.style.opacity = "0.9"),
    (e.style.zIndex = "10001"),
    e.addEventListener(
      "click",
      function () {
        switch (
          (v++,
          v == g && (v = 0),
          (i.style.display = "none"),
          (n.style.display = "none"),
          (u.style.display = "none"),
          v)
        ) {
          case 0:
            i.style.display = "block";
            break;
          case 1:
            n.style.display = "block";
            break;
          case 2:
            u.style.display = "block";
        }
      },
      !1
    ),
    (i = document.createElement("div")),
    (i.style.backgroundColor =
      "rgb(" +
      Math.floor(O.fps.bg.r / 2) +
      "," +
      Math.floor(O.fps.bg.g / 2) +
      "," +
      Math.floor(O.fps.bg.b / 2) +
      ")"),
    (i.style.padding = "2px 0px 3px 0px"),
    e.appendChild(i),
    (r = document.createElement("div")),
    (r.style.fontFamily = "Helvetica, Arial, sans-serif"),
    (r.style.textAlign = "left"),
    (r.style.fontSize = "9px"),
    (r.style.color =
      "rgb(" + O.fps.fg.r + "," + O.fps.fg.g + "," + O.fps.fg.b + ")"),
    (r.style.margin = "0px 0px 1px 3px"),
    (r.innerHTML = '<span style="font-weight:bold">FPS</span>'),
    i.appendChild(r),
    (o = document.createElement("canvas")),
    (o.width = 74),
    (o.height = 30),
    (o.style.display = "block"),
    (o.style.marginLeft = "3px"),
    i.appendChild(o),
    (s = o.getContext("2d")),
    (s.fillStyle =
      "rgb(" + O.fps.bg.r + "," + O.fps.bg.g + "," + O.fps.bg.b + ")"),
    s.fillRect(0, 0, o.width, o.height),
    (a = s.getImageData(0, 0, o.width, o.height)),
    (n = document.createElement("div")),
    (n.style.backgroundColor =
      "rgb(" +
      Math.floor(O.ms.bg.r / 2) +
      "," +
      Math.floor(O.ms.bg.g / 2) +
      "," +
      Math.floor(O.ms.bg.b / 2) +
      ")"),
    (n.style.padding = "2px 0px 3px 0px"),
    (n.style.display = "none"),
    e.appendChild(n),
    (l = document.createElement("div")),
    (l.style.fontFamily = "Helvetica, Arial, sans-serif"),
    (l.style.textAlign = "left"),
    (l.style.fontSize = "9px"),
    (l.style.color =
      "rgb(" + O.ms.fg.r + "," + O.ms.fg.g + "," + O.ms.fg.b + ")"),
    (l.style.margin = "0px 0px 1px 3px"),
    (l.innerHTML = '<span style="font-weight:bold">MS</span>'),
    n.appendChild(l),
    (o = document.createElement("canvas")),
    (o.width = 74),
    (o.height = 30),
    (o.style.display = "block"),
    (o.style.marginLeft = "3px"),
    n.appendChild(o),
    (h = o.getContext("2d")),
    (h.fillStyle =
      "rgb(" + O.ms.bg.r + "," + O.ms.bg.g + "," + O.ms.bg.b + ")"),
    h.fillRect(0, 0, o.width, o.height),
    (c = h.getImageData(0, 0, o.width, o.height));
  try {
    performance &&
      performance.memory &&
      performance.memory.totalJSHeapSize &&
      (g = 3);
  } catch (t) {}
  return (
    (u = document.createElement("div")),
    (u.style.backgroundColor =
      "rgb(" +
      Math.floor(O.mb.bg.r / 2) +
      "," +
      Math.floor(O.mb.bg.g / 2) +
      "," +
      Math.floor(O.mb.bg.b / 2) +
      ")"),
    (u.style.padding = "2px 0px 3px 0px"),
    (u.style.display = "none"),
    e.appendChild(u),
    (p = document.createElement("div")),
    (p.style.fontFamily = "Helvetica, Arial, sans-serif"),
    (p.style.textAlign = "left"),
    (p.style.fontSize = "9px"),
    (p.style.color =
      "rgb(" + O.mb.fg.r + "," + O.mb.fg.g + "," + O.mb.fg.b + ")"),
    (p.style.margin = "0px 0px 1px 3px"),
    (p.innerHTML = '<span style="font-weight:bold">MB</span>'),
    u.appendChild(p),
    (o = document.createElement("canvas")),
    (o.width = 74),
    (o.height = 30),
    (o.style.display = "block"),
    (o.style.marginLeft = "3px"),
    u.appendChild(o),
    (d = o.getContext("2d")),
    (d.fillStyle = "#301010"),
    d.fillRect(0, 0, o.width, o.height),
    (f = d.getImageData(0, 0, o.width, o.height)),
    {
      domElement: e,
      update: function () {
        m++,
          (y = new Date().getTime()),
          (b = y - S),
          (I = Math.min(I, b)),
          (M = Math.max(M, b)),
          t(c.data, Math.min(30, 30 - (b / 200) * 30), "ms"),
          (l.innerHTML =
            '<span style="font-weight:bold">' +
            b +
            " MS</span> (" +
            I +
            "-" +
            M +
            ")"),
          h.putImageData(c, 0, 0),
          (S = y),
          y > w + 1e3 &&
            ((C = Math.round((1e3 * m) / (y - w))),
            (x = Math.min(x, C)),
            (_ = Math.max(_, C)),
            t(a.data, Math.min(30, 30 - (C / 100) * 30), "fps"),
            (r.innerHTML =
              '<span style="font-weight:bold">' +
              C +
              " FPS</span> (" +
              x +
              "-" +
              _ +
              ")"),
            s.putImageData(a, 0, 0),
            3 == g &&
              ((A = 9.54e-7 * performance.memory.usedJSHeapSize),
              (T = Math.min(T, A)),
              (R = Math.max(R, A)),
              t(f.data, Math.min(30, 30 - A / 2), "mb"),
              (p.innerHTML =
                '<span style="font-weight:bold">' +
                Math.round(A) +
                " MB</span> (" +
                Math.round(T) +
                "-" +
                Math.round(R) +
                ")"),
              d.putImageData(f, 0, 0)),
            (w = y),
            (m = 0));
      },
    }
  );
};
(Constants = {}),
  (Constants.PI = Math.PI),
  (Constants.C_PR = Math.PI / 180),
  (Constants.VLEV = 2),
  (Constants.EPS = 1e-7),
  (Constants.c = 0.105),
  (Constants.LN10 = Math.log(10)),
  (Constants.PIOVER2 = Math.PI / 2),
  (Constants.TWOPI = 2 * Math.PI),
  (Constants.TWOTHIRD = 2 / 3),
  (Constants.ARCSECOND_RADIAN = 484813681109536e-20),
  (SpatialVector = (function () {
    function t(t, e, i) {
      "use strict";
      (this.x = t),
        (this.y = e),
        (this.z = i),
        (this.ra_ = 0),
        (this.dec_ = 0),
        (this.okRaDec_ = !1);
    }
    return (
      (t.prototype.setXYZ = function (t, e, i) {
        (this.x = t), (this.y = e), (this.z = i), (this.okRaDec_ = !1);
      }),
      (t.prototype.length = function () {
        "use strict";
        return Math.sqrt(this.lengthSquared());
      }),
      (t.prototype.lengthSquared = function () {
        "use strict";
        return this.x * this.x + this.y * this.y + this.z * this.z;
      }),
      (t.prototype.normalized = function () {
        "use strict";
        var t = this.length();
        (this.x /= t), (this.y /= t), (this.z /= t);
      }),
      (t.prototype.set = function (t, e) {
        "use strict";
        (this.ra_ = t), (this.dec_ = e), (this.okRaDec_ = !0), this.updateXYZ();
      }),
      (t.prototype.angle = function (t) {
        "use strict";
        var e = this.y * t.z - this.z * t.y,
          i = this.z * t.x - this.x * t.z,
          r = this.x * t.y - this.y * t.x,
          o = Math.sqrt(e * e + i * i + r * r);
        return Math.abs(Math.atan2(o, dot(t)));
      }),
      (t.prototype.get = function () {
        "use strict";
        return [x, y, z];
      }),
      (t.prototype.toString = function () {
        "use strict";
        return "SpatialVector[" + this.x + ", " + this.y + ", " + this.z + "]";
      }),
      (t.prototype.cross = function (e) {
        "use strict";
        return new t(
          this.y * e.z - e.y * this.z,
          this.z * e.x - e.z * this.x,
          this.x * e.y - e.x() * this.y
        );
      }),
      (t.prototype.equal = function (t) {
        "use strict";
        return this.x == t.x && this.y == t.y && this.z == t.z();
      }),
      (t.prototype.mult = function (e) {
        "use strict";
        return new t(e * this.x, e * this.y, e * this.z);
      }),
      (t.prototype.dot = function (t) {
        "use strict";
        return this.x * t.x + this.y * t.y + this.z * t.z;
      }),
      (t.prototype.add = function (e) {
        "use strict";
        return new t(this.x + e.x, this.y + e.y, this.z + e.z);
      }),
      (t.prototype.sub = function (e) {
        "use strict";
        return new t(this.x - e.x, this.y - e.y, this.z - e.z);
      }),
      (t.prototype.dec = function () {
        "use strict";
        return (
          this.okRaDec_ || (this.normalized(), this.updateRaDec()), this.dec_
        );
      }),
      (t.prototype.ra = function () {
        "use strict";
        return (
          this.okRaDec_ || (this.normalized(), this.updateRaDec()), this.ra_
        );
      }),
      (t.prototype.updateXYZ = function () {
        "use strict";
        var t = Math.cos(this.dec_ * Constants.C_PR);
        (this.x = Math.cos(this.ra_ * Constants.C_PR) * t),
          (this.y = Math.sin(this.ra_ * Constants.C_PR) * t),
          (this.z = Math.sin(this.dec_ * Constants.C_PR));
      }),
      (t.prototype.updateRaDec = function () {
        "use strict";
        this.dec_ = Math.asin(this.z) / Constants.C_PR;
        var t = Math.cos(this.dec_ * Constants.C_PR);
        (this.ra_ =
          t > Constants.EPS || -Constants.EPS > t
            ? this.y > Constants.EPS || this.y < -Constants.EPS
              ? 0 > this.y
                ? 360 - Math.acos(this.x / t) / Constants.C_PR
                : Math.acos(this.x / t) / Constants.C_PR
              : 0 > this.x
              ? 180
              : 0
            : 0),
          (this.okRaDec_ = !0);
      }),
      (t.prototype.toRaRadians = function () {
        "use strict";
        var t = 0;
        return (
          (0 != this.x || 0 != this.y) && (t = Math.atan2(this.y, this.x)),
          0 > t && (t += 2 * Math.PI),
          t
        );
      }),
      (t.prototype.toDeRadians = function () {
        var t = z / this.length(),
          e = Math.acos(t);
        return Math.PI / 2 - e;
      }),
      t
    );
  })()),
  (AngularPosition = (function () {
    return (
      (AngularPosition = function (t, e) {
        "use strict";
        (this.theta = t), (this.phi = e);
      }),
      (AngularPosition.prototype.toString = function () {
        "use strict";
        return "theta: " + this.theta + ", phi: " + this.phi;
      }),
      AngularPosition
    );
  })()),
  (LongRangeSetBuilder = (function () {
    function t() {
      this.items = [];
    }
    return (
      (t.prototype.appendRange = function (t, e) {
        for (var i = t; e >= i; i++) i in this.items || this.items.push(i);
      }),
      t
    );
  })()),
  (HealpixIndex = (function () {
    function t(t) {
      "use strict";
      this.nside = t;
    }
    return (
      (t.NS_MAX = 8192),
      (t.ORDER_MAX = 13),
      (t.NSIDELIST = [
        1,
        2,
        4,
        8,
        16,
        32,
        64,
        128,
        256,
        512,
        1024,
        2048,
        4096,
        8192,
      ]),
      (t.JRLL = [2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4]),
      (t.JPLL = [1, 3, 5, 7, 0, 2, 4, 6, 1, 3, 5, 7]),
      (t.XOFFSET = [-1, -1, 0, 1, 1, 1, 0, -1]),
      (t.YOFFSET = [0, 1, 1, 1, 0, -1, -1, -1]),
      (t.FACEARRAY = [
        [8, 9, 10, 11, -1, -1, -1, -1, 10, 11, 8, 9],
        [5, 6, 7, 4, 8, 9, 10, 11, 9, 10, 11, 8],
        [-1, -1, -1, -1, 5, 6, 7, 4, -1, -1, -1, -1],
        [4, 5, 6, 7, 11, 8, 9, 10, 11, 8, 9, 10],
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        [1, 2, 3, 0, 0, 1, 2, 3, 5, 6, 7, 4],
        [-1, -1, -1, -1, 7, 4, 5, 6, -1, -1, -1, -1],
        [3, 0, 1, 2, 3, 0, 1, 2, 4, 5, 6, 7],
        [2, 3, 0, 1, -1, -1, -1, -1, 0, 1, 2, 3],
      ]),
      (t.SWAPARRAY = [
        [0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3],
        [0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 6],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 5],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [6, 6, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0],
        [3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0],
      ]),
      (t.Z0 = Constants.TWOTHIRD),
      (t.prototype.init = function () {
        "use strict";
        (this.ctab = Array(256)), (this.utab = Array(256));
        for (var e = 0; 256 > e; ++e)
          (this.ctab[e] =
            (1 & e) |
            ((2 & e) << 7) |
            ((4 & e) >> 1) |
            ((8 & e) << 6) |
            ((16 & e) >> 2) |
            ((32 & e) << 5) |
            ((64 & e) >> 3) |
            ((128 & e) << 4)),
            (this.utab[e] =
              (1 & e) |
              ((2 & e) << 1) |
              ((4 & e) << 2) |
              ((8 & e) << 3) |
              ((16 & e) << 4) |
              ((32 & e) << 5) |
              ((64 & e) << 6) |
              ((128 & e) << 7));
        (this.nl2 = 2 * this.nside),
          (this.nl3 = 3 * this.nside),
          (this.nl4 = 4 * this.nside),
          (this.npface = this.nside * this.nside),
          (this.ncap = 2 * this.nside * (this.nside - 1)),
          (this.npix = 12 * this.npface),
          (this.fact2 = 4 / this.npix),
          (this.fact1 = (this.nside << 1) * this.fact2),
          (this.order = t.nside2order(this.nside));
      }),
      (t.calculateNSide = function (e) {
        for (
          var i = 0,
            r = e * e,
            o = 180 / Constants.PI,
            s = 5184e4 * Constants.PI * o * o,
            a = Utils.castToInt(s / r),
            n = a / 12,
            l = Math.sqrt(n),
            h = t.NS_MAX,
            c = 0,
            u = 0;
          t.NSIDELIST.length > u;
          u++
        )
          if (
            (h >= Math.abs(l - t.NSIDELIST[u]) &&
              ((h = Math.abs(l - t.NSIDELIST[u])),
              (i = t.NSIDELIST[u]),
              (c = u)),
            l > i && t.NS_MAX > l && (i = t.NSIDELIST[c + 1]),
            l > t.NS_MAX)
          )
            return (
              console.log("nside cannot be bigger than " + t.NS_MAX), t.NS_MAX
            );
        return i;
      }),
      (t.nside2order = function (e) {
        "use strict";
        return (e & (e - 1)) > 0 ? -1 : Utils.castToInt(t.log2(e));
      }),
      (t.log2 = function (t) {
        "use strict";
        return Math.log(t) / Math.log(2);
      }),
      (t.prototype.ang2pix_nest = function (e, i) {
        "use strict";
        var r, o, s, a, n, l, h, c, u, p, d, f;
        if (
          (i >= Constants.TWOPI && (i -= Constants.TWOPI),
          0 > i && (i += Constants.TWOPI),
          e > Constants.PI || 0 > e)
        )
          throw {
            name: "Illegal argument",
            message: "theta must be between 0 and " + Constants.PI,
          };
        if (i > Constants.TWOPI || 0 > i)
          throw {
            name: "Illegal argument",
            message: "phi must be between 0 and " + Constants.TWOPI,
          };
        if (
          ((r = Math.cos(e)),
          (o = Math.abs(r)),
          (s = i / Constants.PIOVER2),
          t.Z0 >= o)
        ) {
          var v = this.nside * (0.5 + s),
            g = 0.75 * this.nside * r,
            h = v - g,
            c = v + g;
          (n = h >> this.order),
            (l = c >> this.order),
            (p = n == l ? (4 == n ? 4 : n + 4) : l > n ? n : l + 8),
            (d = Utils.castToInt(c & (this.nside - 1))),
            (f = Utils.castToInt(this.nside - (h & (this.nside - 1)) - 1));
        } else {
          (u = Utils.castToInt(s)), u >= 4 && (u = 3), (a = s - u);
          var m = this.nside * Math.sqrt(3 * (1 - o));
          (h = Utils.castToInt(a * m)),
            (c = Utils.castToInt((1 - a) * m)),
            (h = Math.min(t.NS_MAX - 1, h)),
            (c = Math.min(t.NS_MAX - 1, c)),
            r >= 0
              ? ((p = u),
                (d = Utils.castToInt(this.nside - c - 1)),
                (f = Utils.castToInt(this.nside - h - 1)))
              : ((p = u + 8), (d = h), (f = c));
        }
        return this.xyf2nest(d, f, p);
      }),
      (t.prototype.xyf2nest = function (t, e, i) {
        "use strict";
        return (
          (i << (2 * this.order)) +
          (this.utab[255 & t] |
            (this.utab[255 & (t >> 8)] << 16) |
            (this.utab[255 & (t >> 16)] << 32) |
            (this.utab[255 & (t >> 24)] << 48) |
            (this.utab[255 & e] << 1) |
            (this.utab[255 & (e >> 8)] << 17) |
            (this.utab[255 & (e >> 16)] << 33) |
            (this.utab[255 & (e >> 24)] << 49))
        );
      }),
      (t.prototype.nest2xyf = function (t) {
        "use strict";
        var e = {};
        e.face_num = t >> (2 * this.order);
        var i = t & (this.npface - 1),
          r =
            ((93823560581120 & i) >> 16) |
            ((614882086624428e4 & i) >> 31) |
            (21845 & i) |
            ((1431633920 & i) >> 15);
        return (
          (e.ix =
            this.ctab[255 & r] |
            (this.ctab[255 & (r >> 8)] << 4) |
            (this.ctab[255 & (r >> 16)] << 16) |
            (this.ctab[255 & (r >> 24)] << 20)),
          (i >>= 1),
          (r =
            ((93823560581120 & i) >> 16) |
            ((614882086624428e4 & i) >> 31) |
            (21845 & i) |
            ((1431633920 & i) >> 15)),
          (e.iy =
            this.ctab[255 & r] |
            (this.ctab[255 & (r >> 8)] << 4) |
            (this.ctab[255 & (r >> 16)] << 16) |
            (this.ctab[255 & (r >> 24)] << 20)),
          e
        );
      }),
      (t.prototype.pix2ang_nest = function (e) {
        "use strict";
        if (0 > e || e > this.npix - 1)
          throw { name: "Illegal argument", message: "ipix out of range" };
        var i,
          r,
          o,
          s = this.nest2xyf(e),
          a = s.ix,
          n = s.iy,
          l = s.face_num,
          h = (t.JRLL[l] << this.order) - a - n - 1;
        this.nside > h
          ? ((i = h), (r = 1 - i * i * this.fact2), (o = 0))
          : h > this.nl3
          ? ((i = this.nl4 - h), (r = i * i * this.fact2 - 1), (o = 0))
          : ((i = this.nside),
            (r = (this.nl2 - h) * this.fact1),
            (o = 1 & (h - this.nside)));
        var c = Math.acos(r),
          u = (t.JPLL[l] * i + a - n + 1 + o) / 2;
        return (
          u > this.nl4 && (u -= this.nl4),
          1 > u && (u += this.nl4),
          { theta: c, phi: (u - 0.5 * (o + 1)) * (Constants.PIOVER2 / i) }
        );
      }),
      (t.nside2Npix = function (e) {
        "use strict";
        if (0 > e || (e & -e) != e || e > t.NS_MAX)
          throw {
            name: "Illegal argument",
            message: "nside should be >0, power of 2, <" + t.NS_MAX,
          };
        return 12 * e * e;
      }),
      (t.prototype.xyf2ring = function (e, i, r) {
        "use strict";
        var o,
          s,
          a,
          n = t.JRLL[r] * this.nside - e - i - 1;
        this.nside > n
          ? ((o = n), (a = 2 * o * (o - 1)), (s = 0))
          : n > 3 * this.nside
          ? ((o = this.nl4 - n), (a = this.npix - 2 * (o + 1) * o), (s = 0))
          : ((o = this.nside),
            (a = this.ncap + (n - this.nside) * this.nl4),
            (s = 1 & (n - this.nside)));
        var l = (t.JPLL[r] * o + e - i + 1 + s) / 2;
        return (
          l > this.nl4 ? (l -= this.nl4) : 1 > l && (l += this.nl4), a + l - 1
        );
      }),
      (t.prototype.nest2ring = function (t) {
        "use strict";
        var e = this.nest2xyf(t);
        return this.xyf2ring(e.ix, e.iy, e.face_num);
      }),
      (t.prototype.corners_nest = function (t, e) {
        "use strict";
        var i = this.nest2ring(t);
        return this.corners_ring(i, e);
      }),
      (t.prototype.pix2ang_ring = function (t) {
        "use strict";
        var e, i, r, o, s, a, n, l, h;
        if (0 > t || t > this.npix - 1)
          throw { name: "Illegal argument", message: "ipix out of range" };
        return (
          (a = t + 1),
          this.ncap >= a
            ? ((l = a / 2),
              (h = Utils.castToInt(l)),
              (r = Utils.castToInt(Math.sqrt(l - Math.sqrt(h))) + 1),
              (o = a - 2 * r * (r - 1)),
              (e = Math.acos(1 - r * r * this.fact2)),
              (i = ((o - 0.5) * Constants.PI) / (2 * r)))
            : this.npix - this.ncap > t
            ? ((s = t - this.ncap),
              (r = s / this.nl4 + this.nside),
              (o = (s % this.nl4) + 1),
              (n = (1 & (r + this.nside)) > 0 ? 1 : 0.5),
              (e = Math.acos((this.nl2 - r) * this.fact1)),
              (i = ((o - n) * Constants.PI) / this.nl2))
            : ((s = this.npix - t),
              (r = Utils.castToInt(0.5 * (1 + Math.sqrt(2 * s - 1)))),
              (o = 4 * r + 1 - (s - 2 * r * (r - 1))),
              (e = Math.acos(Math.pow(r, 2) * this.fact2 - 1)),
              (i = ((o - 0.5) * Constants.PI) / (2 * r))),
          [e, i]
        );
      }),
      (t.prototype.ring = function (t) {
        "use strict";
        var e,
          i,
          r = 0,
          o = t + 1,
          s = 0;
        return (
          this.ncap >= o
            ? ((i = o / 2),
              (s = Utils.castToInt(i)),
              (r = Utils.castToInt(Math.sqrt(i - Math.sqrt(s))) + 1))
            : this.nl2 * (5 * this.nside + 1) >= o
            ? ((e = Utils.castToInt(o - this.ncap - 1)),
              (r = Utils.castToInt(e / this.nl4 + this.nside)))
            : ((e = this.npix - o + 1),
              (i = e / 2),
              (s = Utils.castToInt(i)),
              (r = Utils.castToInt(Math.sqrt(i - Math.sqrt(s))) + 1),
              (r = this.nl4 - r)),
          r
        );
      }),
      (t.prototype.integration_limits_in_costh = function (t) {
        "use strict";
        var e, i, r, o;
        return (
          (o = 1 * this.nside),
          this.nside >= t
            ? ((i = 1 - Math.pow(t, 2) / 3 / this.npface),
              (r = 1 - Math.pow(t - 1, 2) / 3 / this.npface),
              (e =
                t == this.nside
                  ? (2 * (this.nside - 1)) / 3 / o
                  : 1 - Math.pow(t + 1, 2) / 3 / this.npface))
            : this.nl3 > t
            ? ((i = (2 * (2 * this.nside - t)) / 3 / o),
              (r = (2 * (2 * this.nside - t + 1)) / 3 / o),
              (e = (2 * (2 * this.nside - t - 1)) / 3 / o))
            : ((r =
                t == this.nl3
                  ? (2 * (1 - this.nside)) / 3 / o
                  : Math.pow(4 * this.nside - t + 1, 2) / 3 / this.npface - 1),
              (e = Math.pow(this.nl4 - t - 1, 2) / 3 / this.npface - 1),
              (i = Math.pow(this.nl4 - t, 2) / 3 / this.npface - 1)),
          [r, i, e]
        );
      }),
      (t.prototype.pixel_boundaries = function (t, e, i, r) {
        var o,
          s,
          a,
          n,
          l,
          h,
          c,
          u,
          p = 1 * this.nside;
        if (Math.abs(r) >= 1 - 1 / 3 / this.npface)
          return (
            (c = i * Constants.PIOVER2),
            (u = (i + 1) * Constants.PIOVER2),
            [c, u]
          );
        if (1.5 * r >= 1)
          (o = Math.sqrt(3 * (1 - r))),
            (s = 1 / p / o),
            (a = e),
            (n = a - 1),
            (l = t - e),
            (h = l + 1),
            (c = Constants.PIOVER2 * (Math.max(n * s, 1 - h * s) + i)),
            (u = Constants.PIOVER2 * (Math.min(1 - l * s, a * s) + i));
        else if (1.5 * r > -1) {
          var d = 0.5 * (1 - 1.5 * r),
            f = d + 1,
            v = this.nside + (t % 2);
          (a = e - (v - t) / 2),
            (n = a - 1),
            (l = (v + t) / 2 - e),
            (h = l + 1),
            (c = Constants.PIOVER2 * (Math.max(f - h / p, n / p - d) + i)),
            (u = Constants.PIOVER2 * (Math.min(f - l / p, a / p - d) + i));
        } else {
          (o = Math.sqrt(3 * (1 + r))), (s = 1 / p / o);
          var g = 2 * this.nside;
          (a = t - g + e),
            (n = a - 1),
            (l = g - e),
            (h = l + 1),
            (c =
              Constants.PIOVER2 * (Math.max(1 - (g - n) * s, (g - h) * s) + i)),
            (u =
              Constants.PIOVER2 * (Math.min(1 - (g - a) * s, (g - l) * s) + i));
        }
        return [c, u];
      }),
      (t.vector = function (t, e) {
        "use strict";
        var i = 1 * Math.sin(t) * Math.cos(e),
          r = 1 * Math.sin(t) * Math.sin(e),
          o = 1 * Math.cos(t);
        return new SpatialVector(i, r, o);
      }),
      (t.prototype.corners_ring = function (e, i) {
        "use strict";
        var r = 2 * i + 2,
          o = Array(r),
          s = this.pix2ang_ring(e),
          a = Math.cos(s[0]),
          n = s[0],
          l = s[1],
          h = Utils.castToInt(l / Constants.PIOVER2),
          c = this.ring(e),
          u = Math.min(c, Math.min(this.nside, this.nl4 - c)),
          p = 0,
          d = Constants.PIOVER2 / u;
        (p =
          c >= this.nside && this.nl3 >= c
            ? Utils.castToInt(l / d + (c % 2) / 2) + 1
            : Utils.castToInt(l / d) + 1),
          (p -= h * u);
        var f = r / 2,
          v = this.integration_limits_in_costh(c),
          g = Math.acos(v[0]),
          m = Math.acos(v[2]),
          y = this.pixel_boundaries(c, p, h, v[0]);
        if (
          ((o[0] = p > u / 2 ? t.vector(g, y[1]) : t.vector(g, y[0])),
          (y = this.pixel_boundaries(c, p, h, v[2])),
          (o[f] = p > u / 2 ? t.vector(m, y[1]) : t.vector(m, y[0])),
          1 == i)
        ) {
          var S = Math.acos(v[1]);
          (y = this.pixel_boundaries(c, p, h, v[1])),
            (o[1] = t.vector(S, y[0])),
            (o[3] = t.vector(S, y[1]));
        } else
          for (var w = v[2] - v[0], C = w / (i + 1), x = 1; i >= x; x++)
            (a = v[0] + C * x),
              (n = Math.acos(a)),
              (y = this.pixel_boundaries(c, p, h, a)),
              (o[x] = t.vector(n, y[0])),
              (o[r - x] = t.vector(n, y[1]));
        return o;
      }),
      (t.vec2Ang = function (t) {
        "use strict";
        var e = t.z / t.length(),
          i = Math.acos(e),
          r = 0;
        return (
          (0 != t.x || 0 != t.y) && (r = Math.atan2(t.y, t.x)),
          0 > r && (r += 2 * Math.PI),
          [i, r]
        );
      }),
      (t.prototype.queryDisc = function (e, i, r, o) {
        "use strict";
        if (0 > i || i > Constants.PI)
          throw {
            name: "Illegal argument",
            message: "angular radius is in RADIAN and should be in [0,pi]",
          };
        var s,
          a,
          n,
          l,
          h,
          c,
          u,
          p,
          d,
          f,
          v,
          g,
          m,
          y,
          S,
          w,
          C,
          x,
          _,
          b = new LongRangeSetBuilder(),
          I = null,
          h = i;
        if (
          (o && (h += Constants.PI / this.nl4),
          (I = t.vec2Ang(e)),
          (c = I[0]),
          (u = I[1]),
          (v = this.fact2),
          (g = this.fact1),
          (l = Math.cos(c)),
          (_ = 1 / Math.sqrt((1 - l) * (1 + l))),
          (y = c - h),
          (S = c + h),
          (p = Math.cos(h)),
          (C = Math.cos(y)),
          (s = this.ringAbove(C) + 1),
          (w = Math.cos(S)),
          (a = this.ringAbove(w)),
          s > a && 0 == a && (a = s),
          0 >= y)
        )
          for (var M = 1; s > M; ++M) this.inRing(M, 0, Math.PI, b);
        for (n = s; a >= n; ++n)
          (x =
            this.nside > n
              ? 1 - n * n * v
              : this.nl3 >= n
              ? (this.nl2 - n) * g
              : (this.nl4 - n) * (this.nl4 - n) * v - 1),
            (d = (p - x * l) * _),
            (f = 1 - x * x - d * d),
            (m = Math.atan2(Math.sqrt(f), d)),
            isNaN(m) && (m = h),
            this.inRing(n, u, m, b);
        if (S >= Math.PI)
          for (var M = a + 1; this.nl4 > M; ++M)
            this.inRing(M, 0, Math.PI, b, !1);
        var A;
        if (r) {
          for (var T = b.items, R = [], O = 0; T.length > O; O++) {
            var P = this.ring2nest(T[O]);
            R.indexOf(P) >= 0 || R.push(P);
          }
          A = R;
        } else A = b.items;
        return A;
      }),
      (t.prototype.inRing = function (t, e, i, r, o) {
        "use strict";
        var s,
          a,
          n,
          l,
          h = !1,
          c = !1,
          u = 1e-12,
          p = 0,
          d = 0,
          f = 0,
          v = 0,
          g = ((e - i) % Constants.TWOPI) - u,
          m = e + i + u,
          y = ((e + i) % Constants.TWOPI) + u;
        if (
          (u > Math.abs(i - Constants.PI) && (h = !0),
          t >= this.nside && this.nl3 >= t
            ? ((d = t - this.nside + 1),
              (n = this.ncap + this.nl4 * (d - 1)),
              (l = n + this.nl4 - 1),
              (s = d % 2),
              (a = this.nl4))
            : (this.nside > t
                ? ((d = t), (n = 2 * d * (d - 1)), (l = n + 4 * d - 1))
                : ((d = 4 * this.nside - t),
                  (n = this.npix - 2 * d * (d + 1)),
                  (l = n + 4 * d - 1)),
              (a = 4 * d),
              (s = 1)),
          h)
        )
          return void r.appendRange(n, l);
        if (((p = s / 2), o))
          (f = Math.round((a * g) / Constants.TWOPI - p)),
            (v = Math.round((a * m) / Constants.TWOPI - p)),
            (f %= a),
            v > a && (v %= a);
        else {
          if (
            ((f = Math.ceil((a * g) / Constants.TWOPI - p)),
            (v = Utils.castToInt((a * y) / Constants.TWOPI - p)),
            f > v &&
              1 == t &&
              (v = Utils.castToInt((a * m) / Constants.TWOPI - p)),
            f == v + 1 && (f = v),
            1 == f - v && Constants.PI > i * a)
          )
            return void console.log(
              "the interval is too small and avay from center"
            );
          (f = Math.min(f, a - 1)), (v = Math.max(v, 0));
        }
        if ((f > v && (c = !0), c))
          (f += n), (v += n), r.appendRange(n, v), r.appendRange(f, l);
        else {
          if (0 > f)
            return (
              (f = Math.abs(f)),
              r.appendRange(n, n + v),
              void r.appendRange(l - f + 1, l)
            );
          (f += n), (v += n), r.appendRange(f, v);
        }
      }),
      (t.prototype.ringAbove = function (t) {
        "use strict";
        var e = Math.abs(t);
        if (e > Constants.TWOTHIRD) {
          var i = Utils.castToInt(this.nside * Math.sqrt(3 * (1 - e)));
          return t > 0 ? i : 4 * this.nside - i - 1;
        }
        return Utils.castToInt(this.nside * (2 - 1.5 * t));
      }),
      (t.prototype.ring2nest = function (t) {
        "use strict";
        var e = this.ring2xyf(t);
        return this.xyf2nest(e.ix, e.iy, e.face_num);
      }),
      (t.prototype.ring2xyf = function (e) {
        "use strict";
        var i,
          r,
          o,
          s,
          a = {};
        if (this.ncap > e) {
          (i = Utils.castToInt(0.5 * (1 + Math.sqrt(1 + 2 * e)))),
            (r = e + 1 - 2 * i * (i - 1)),
            (o = 0),
            (s = i),
            (a.face_num = 0);
          var n = r - 1;
          n >= 2 * i && ((a.face_num = 2), (n -= 2 * i)),
            n >= i && ++a.face_num;
        } else if (this.npix - this.ncap > e) {
          var l = e - this.ncap;
          this.order >= 0
            ? ((i = (l >> (this.order + 2)) + this.nside),
              (r = 1 + (l & (this.nl4 - 1))))
            : ((i = l / this.nl4 + this.nside), (r = (l % this.nl4) + 1)),
            (o = 1 & (i + this.nside)),
            (s = this.nside);
          var h,
            c,
            u = i - this.nside + 1,
            p = this.nl2 + 2 - u;
          this.order >= 0
            ? ((h =
                (r - Utils.castToInt(u / 2) + this.nside - 1) >> this.order),
              (c = (r - Utils.castToInt(p / 2) + this.nside - 1) >> this.order))
            : ((h = (r - Utils.castToInt(u / 2) + this.nside - 1) / this.nside),
              (c = (r - Utils.castToInt(p / 2) + this.nside - 1) / this.nside)),
            (a.face_num =
              c == h
                ? 4 == c
                  ? 4
                  : Utils.castToInt(c) + 4
                : h > c
                ? Utils.castToInt(c)
                : Utils.castToInt(h) + 8);
        } else {
          var l = this.npix - e;
          (i = Utils.castToInt(0.5 * (1 + Math.sqrt(2 * l - 1)))),
            (r = 4 * i + 1 - (l - 2 * i * (i - 1))),
            (o = 0),
            (s = i),
            (i = 2 * this.nl2 - i),
            (a.face_num = 8);
          var n = r - 1;
          n >= 2 * s && ((a.face_num = 10), (n -= 2 * s)),
            n >= s && ++a.face_num;
        }
        var d = i - t.JRLL[a.face_num] * this.nside + 1,
          f = 2 * r - t.JPLL[a.face_num] * s - o - 1;
        return (
          f >= this.nl2 && (f -= 8 * this.nside),
          (a.ix = (f - d) >> 1),
          (a.iy = -(f + d) >> 1),
          a
        );
      }),
      t
    );
  })()),
  (Utils = function () {}),
  (Utils.radecToPolar = function (t, e) {
    return {
      theta: Math.PI / 2 - (e / 180) * Math.PI,
      phi: (t / 180) * Math.PI,
    };
  }),
  (Utils.polarToRadec = function (t, e) {
    return {
      ra: (180 * e) / Math.PI,
      dec: (180 * (Math.PI / 2 - t)) / Math.PI,
    };
  }),
  (Utils.castToInt = function (t) {
    return t > 0 ? Math.floor(t) : Math.ceil(t);
  }),
  (AstroMath.D2R = Math.PI / 180),
  (AstroMath.R2D = 180 / Math.PI),
  (AstroMath.sign = function (t) {
    return t > 0 ? 1 : t < 0 ? -1 : 0;
  }),
  (AstroMath.cosd = function (t) {
    if (t % 90 == 0) {
      switch (Math.abs(Math.floor(t / 90 + 0.5)) % 4) {
        case 0:
          return 1;
        case 1:
          return 0;
        case 2:
          return -1;
        case 3:
          return 0;
      }
    }
    return Math.cos(t * AstroMath.D2R);
  }),
  (AstroMath.sind = function (t) {
    if (t % 90 == 0) {
      switch (Math.abs(Math.floor(t / 90 - 0.5)) % 4) {
        case 0:
          return 1;
        case 1:
          return 0;
        case 2:
          return -1;
        case 3:
          return 0;
      }
    }
    return Math.sin(t * AstroMath.D2R);
  }),
  (AstroMath.tand = function (t) {
    var e;
    return (
      (e = t % 360),
      0 == e || 180 == Math.abs(e)
        ? 0
        : 45 == e || 225 == e
        ? 1
        : -135 == e || -315 == e
        ? -1
        : Math.tan(t * AstroMath.D2R)
    );
  }),
  (AstroMath.asind = function (t) {
    return Math.asin(t) * AstroMath.R2D;
  }),
  (AstroMath.acosd = function (t) {
    return Math.acos(t) * AstroMath.R2D;
  }),
  (AstroMath.atand = function (t) {
    return Math.atan(t) * AstroMath.R2D;
  }),
  (AstroMath.atan2 = function (t, e) {
    if (0 == t) return e > 0 ? 0 : e < 0 ? Math.PI : NaN;
    var i = AstroMath.sign(t);
    if (0 == e) return (Math.PI / 2) * i;
    var r = Math.atan(Math.abs(t / e));
    return e > 0 ? r * i : e < 0 ? (Math.PI - r) * i : void 0;
  }),
  (AstroMath.atan2d = function (t, e) {
    return AstroMath.atan2(t, e) * AstroMath.R2D;
  }),
  (AstroMath.cosh = function (t) {
    return (Math.exp(t) + Math.exp(-t)) / 2;
  }),
  (AstroMath.sinh = function (t) {
    return (Math.exp(t) - Math.exp(-t)) / 2;
  }),
  (AstroMath.tanh = function (t) {
    return (Math.exp(t) - Math.exp(-t)) / (Math.exp(t) + Math.exp(-t));
  }),
  (AstroMath.acosh = function (t) {
    return Math.log(t + Math.sqrt(t * t - 1));
  }),
  (AstroMath.asinh = function (t) {
    return Math.log(t + Math.sqrt(t * t + 1));
  }),
  (AstroMath.atanh = function (t) {
    return 0.5 * Math.log((1 + t) / (1 - t));
  }),
  (AstroMath.sinc = function (t) {
    var e,
      i = Math.abs(t);
    return (
      i <= 0.001
        ? ((i *= i), (e = 1 - (i * (1 - i / 20)) / 6))
        : (e = Math.sin(i) / i),
      e
    );
  }),
  (AstroMath.asinc = function (t) {
    var e,
      i = Math.abs(t);
    return (
      i <= 0.001
        ? ((i *= i), (e = 1 + (i * (6 + 0.45 * i)) / 6))
        : (e = Math.asin(i) / i),
      e
    );
  }),
  (AstroMath.hypot = function (t, e) {
    return Math.sqrt(t * t + e * e);
  }),
  (AstroMath.eulerMatrix = function (t, e, i) {
    var r = new Array(3);
    (r[0] = new Array(3)), (r[1] = new Array(3)), (r[2] = new Array(3));
    var o = AstroMath.cosd(t),
      s = AstroMath.sind(t),
      a = AstroMath.cosd(e),
      n = AstroMath.sind(e),
      l = AstroMath.cosd(i),
      h = AstroMath.sind(i);
    return (
      (r[0][0] = l * a * o - h * s),
      (r[0][1] = -h * a * o - l * s),
      (r[0][2] = -n * o),
      (r[1][0] = l * a * s + h * o),
      (r[1][1] = -h * a * s + l * o),
      (r[1][2] = -n * s),
      (r[2][0] = -n * l),
      (r[2][1] = -n * o),
      (r[2][2] = a),
      r
    );
  }),
  (AstroMath.displayMatrix = function (t) {
    for (var e = t.length, i = 0, r = 0; r < e; r++)
      t[r].length > i && (i = t[r].length);
    for (var o = "<table>\n", r = 0; r < e; r++) {
      o += "<tr>";
      for (var s = 0; s < e; s++)
        (o += "<td>"),
          r < t[r].length && (o += t[r][s].toString()),
          (o += "</td>");
      o += "</td>\n";
    }
    return (o += "</table>\n");
  }),
  (Projection.PROJ_TAN = 1),
  (Projection.PROJ_TAN2 = 2),
  (Projection.PROJ_STG = 2),
  (Projection.PROJ_SIN = 3),
  (Projection.PROJ_SIN2 = 4),
  (Projection.PROJ_ZEA = 4),
  (Projection.PROJ_ARC = 5),
  (Projection.PROJ_SCHMIDT = 5),
  (Projection.PROJ_AITOFF = 6),
  (Projection.PROJ_AIT = 6),
  (Projection.PROJ_GLS = 7),
  (Projection.PROJ_MERCATOR = 8),
  (Projection.PROJ_MER = 8),
  (Projection.PROJ_LAM = 9),
  (Projection.PROJ_LAMBERT = 9),
  (Projection.PROJ_TSC = 10),
  (Projection.PROJ_QSC = 11),
  (Projection.PROJ_LIST = [
    "Mercator",
    Projection.PROJ_MERCATOR,
    "Gnomonic",
    Projection.PROJ_TAN,
    "Stereographic",
    Projection.PROJ_TAN2,
    "Orthographic",
    Projection.PROJ_SIN,
    "Zenithal",
    Projection.PROJ_ZEA,
    "Schmidt",
    Projection.PROJ_SCHMIDT,
    "Aitoff",
    Projection.PROJ_AITOFF,
    "Lambert",
    Projection.PROJ_LAMBERT,
  ]),
  (Projection.PROJ_NAME = [
    "-",
    "Gnomonic",
    "Stereographic",
    "Orthographic",
    "Equal-area",
    "Schmidt plates",
    "Aitoff",
    "Global sin",
    "Mercator",
    "Lambert",
  ]),
  (Projection.prototype = {
    setCenter: function (t, e) {
      this.ROT = this.tr_oR(t, e);
    },
    reverseLongitude: function (t) {
      this.longitudeIsReversed = t;
    },
    setProjection: function (t) {
      this.PROJECTION = t;
    },
    project: function (t, e) {
      var i = this.tr_ou(t, e),
        r = this.tr_uu(i, this.ROT),
        o = this.tr_up(this.PROJECTION, r);
      return null == o
        ? null
        : this.longitudeIsReversed
        ? { X: o[0], Y: -o[1] }
        : { X: -o[0], Y: -o[1] };
    },
    unproject: function (t, e) {
      this.longitudeIsReversed || (t = -t), (e = -e);
      var i = this.tr_pu(this.PROJECTION, t, e),
        r = this.tr_uu1(i, this.ROT),
        o = this.tr_uo(r);
      return { ra: o[0], dec: o[1] };
    },
    tr_up: function (t, e) {
      var i,
        r,
        o,
        s,
        a,
        n = e[0],
        l = e[1],
        h = e[2];
      if (0 == (i = AstroMath.hypot(n, l)) && 0 == h) return null;
      switch (t) {
        default:
          o = null;
          break;
        case Projection.PROJ_AITOFF:
          (r = Math.sqrt((i * (i + n)) / 2)),
            (s = Math.sqrt(2 * i * (i - n))),
            (r = Math.sqrt((1 + r) / 2)),
            (s /= r),
            (a = h / r),
            l < 0 && (s = -s),
            (o = [s, a]);
          break;
        case Projection.PROJ_GLS:
          (a = Math.asin(h)),
            (s = 0 != i ? Math.atan2(l, n) * i : 0),
            (o = [s, a]);
          break;
        case Projection.PROJ_MERCATOR:
          0 != i
            ? ((s = Math.atan2(l, n)), (a = AstroMath.atanh(h)), (o = [s, a]))
            : (o = null);
          break;
        case Projection.PROJ_TAN:
          n > 0 ? ((s = l / n), (a = h / n), (o = [s, a])) : (o = null);
          break;
        case Projection.PROJ_TAN2:
          (r = (1 + n) / 2),
            r > 0 ? ((s = l / r), (a = h / r), (o = [s, a])) : (o = null);
          break;
        case Projection.PROJ_ARC:
          n <= -1
            ? ((s = Math.PI), (a = 0))
            : ((i = AstroMath.hypot(l, h)),
              (r = n > 0 ? AstroMath.asinc(i) : Math.acos(n) / i),
              (s = l * r),
              (a = h * r)),
            (o = [s, a]);
          break;
        case Projection.PROJ_SIN:
          n >= 0 ? ((s = l), (a = h), (o = [s, a])) : (o = null);
          break;
        case Projection.PROJ_SIN2:
          (r = Math.sqrt((1 + n) / 2)),
            0 != r ? ((s = l / r), (a = h / r)) : ((s = 2), (a = 0)),
            (o = [s, a]);
          break;
        case Projection.PROJ_LAMBERT:
          (a = h), (s = 0), 0 != i && (s = Math.atan2(l, n)), (o = [s, a]);
      }
      return o;
    },
    tr_pu: function (t, e, i) {
      var r, o, s, a, n;
      switch (t) {
        default:
          return null;
        case Projection.PROJ_AITOFF:
          if ((r = (e * e) / 8 + (i * i) / 2) > 1) return null;
          (s = 1 - r),
            (o = Math.sqrt(1 - r / 2)),
            (a = (e * o) / 2),
            (n = i * o),
            (r = AstroMath.hypot(s, a)),
            0 != r &&
              ((o = s), (s = (o * o - a * a) / r), (a = (2 * o * a) / r));
          break;
        case Projection.PROJ_GLS:
          if (((n = Math.sin(i)), (r = 1 - n * n) < 0)) return null;
          (r = Math.sqrt(r)),
            (o = 0 != r ? e / r : 0),
            (s = r * Math.cos(o)),
            (a = r * Math.sin(o));
          break;
        case Projection.PROJ_MERCATOR:
          (n = AstroMath.tanh(i)),
            (r = 1 / AstroMath.cosh(i)),
            (s = r * Math.cos(e)),
            (a = r * Math.sin(e));
          break;
        case Projection.PROJ_LAMBERT:
          if (((n = i), (r = 1 - n * n) < 0)) return null;
          (r = Math.sqrt(r)), (s = r * Math.cos(e)), (a = r * Math.sin(e));
          break;
        case Projection.PROJ_TAN:
          (s = 1 / Math.sqrt(1 + e * e + i * i)), (a = e * s), (n = i * s);
          break;
        case Projection.PROJ_TAN2:
          (r = (e * e + i * i) / 4),
            (o = 1 + r),
            (s = (1 - r) / o),
            (a = e / o),
            (n = i / o);
          break;
        case Projection.PROJ_ARC:
          if ((r = AstroMath.hypot(e, i)) > Math.PI) return null;
          (o = AstroMath.sinc(r)), (s = Math.cos(r)), (a = o * e), (n = o * i);
          break;
        case Projection.PROJ_SIN:
          if ((o = 1 - e * e - i * i) < 0) return null;
          (s = Math.sqrt(o)), (a = e), (n = i);
          break;
        case Projection.PROJ_SIN2:
          if ((r = (e * e + i * i) / 4) > 1) return null;
          (o = Math.sqrt(1 - r)), (s = 1 - 2 * r), (a = o * e), (n = o * i);
      }
      return [s, a, n];
    },
    tr_oR: function (t, e) {
      var i = new Array(3);
      return (
        (i[0] = new Array(3)),
        (i[1] = new Array(3)),
        (i[2] = new Array(3)),
        (i[2][2] = AstroMath.cosd(e)),
        (i[0][2] = AstroMath.sind(e)),
        (i[1][1] = AstroMath.cosd(t)),
        (i[1][0] = -AstroMath.sind(t)),
        (i[1][2] = 0),
        (i[0][0] = i[2][2] * i[1][1]),
        (i[0][1] = -i[2][2] * i[1][0]),
        (i[2][0] = -i[0][2] * i[1][1]),
        (i[2][1] = i[0][2] * i[1][0]),
        i
      );
    },
    tr_ou: function (t, e) {
      var i = new Array(3),
        r = AstroMath.cosd(e);
      return (
        (i[0] = r * AstroMath.cosd(t)),
        (i[1] = r * AstroMath.sind(t)),
        (i[2] = AstroMath.sind(e)),
        i
      );
    },
    tr_uu: function (t, e) {
      var i = new Array(3),
        r = t[0],
        o = t[1],
        s = t[2];
      return (
        (i[0] = e[0][0] * r + e[0][1] * o + e[0][2] * s),
        (i[1] = e[1][0] * r + e[1][1] * o + e[1][2] * s),
        (i[2] = e[2][0] * r + e[2][1] * o + e[2][2] * s),
        i
      );
    },
    tr_uu1: function (t, e) {
      var i = new Array(3),
        r = t[0],
        o = t[1],
        s = t[2];
      return (
        (i[0] = e[0][0] * r + e[1][0] * o + e[2][0] * s),
        (i[1] = e[0][1] * r + e[1][1] * o + e[2][1] * s),
        (i[2] = e[0][2] * r + e[1][2] * o + e[2][2] * s),
        i
      );
    },
    tr_uo: function (t) {
      var e,
        i,
        r = t[0],
        o = t[1],
        s = t[2],
        a = r * r + o * o;
      if (0 == a) {
        if (0 == s) return null;
        (e = 0), (i = s > 0 ? 90 : -90);
      } else
        (i = AstroMath.atand(s / Math.sqrt(a))),
          (e = AstroMath.atan2d(o, r)) < 0 && (e += 360);
      return [e, i];
    },
  }),
  (Coo.factor = [3600, 60, 1]),
  (Coo.prototype = {
    setFrame: function (t) {
      this.frame = t;
    },
    computeDirCos: function () {
      var t = AstroMath.cosd(this.lat);
      (this.x = t * AstroMath.cosd(this.lon)),
        (this.y = t * AstroMath.sind(this.lon)),
        (this.z = AstroMath.sind(this.lat));
    },
    computeLonLat: function () {
      var t = this.x * this.x + this.y * this.y;
      (this.lon = 0),
        0 == t
          ? 0 == this.z
            ? ((this.lon = NaN), (this.lat = NaN))
            : (this.lat = this.z > 0 ? 90 : -90)
          : ((this.lon = AstroMath.atan2d(this.y, this.x)),
            (this.lat = AstroMath.atan2d(this.z, Math.sqrt(t))),
            this.lon < 0 && (this.lon += 360));
    },
    dist2: function (t) {
      var e = t.x - this.x,
        i = e * e;
      return (e = t.y - this.y), (i += e * e), (e = t.z - this.z), (i += e * e);
    },
    distance: function (t) {
      return 0 == t.x && 0 == t.y && 0 == t.z
        ? NaN
        : 0 == this.x && 0 == this.y && 0 == this.z
        ? NaN
        : 2 * AstroMath.asind(0.5 * Math.sqrt(this.dist2(t)));
    },
    convertTo: function (t) {
      this.frame.equals(t) ||
        (this.frame.toICRS(this.coo),
        t.fromICRS(this.coo),
        (this.frame = t),
        (this.lon = this.lat = NaN));
    },
    rotate: function (t) {
      var e, i, r;
      t != Umatrix3 &&
        ((e = t[0][0] * this.x + t[0][1] * this.y + t[0][2] * this.z),
        (i = t[1][0] * this.x + t[1][1] * this.y + t[1][2] * this.z),
        (r = t[2][0] * this.x + t[2][1] * this.y + t[2][2] * this.z),
        (this.x = e),
        (this.y = i),
        (this.z = r),
        (this.lon = this.lat = NaN));
    },
    rotate_1: function (t) {
      var e, i, r;
      t != Umatrix3 &&
        ((e = t[0][0] * this.x + t[1][0] * this.y + t[2][0] * this.z),
        (i = t[0][1] * this.x + t[1][1] * this.y + t[2][1] * this.z),
        (r = t[0][2] * this.x + t[1][2] * this.y + t[2][2] * this.z),
        (this.x = e),
        (this.y = i),
        (this.z = r),
        (this.lon = this.lat = NaN));
    },
    equals: function (t) {
      return this.x == t.x && this.y == t.y && this.z == t.z;
    },
    parse: function (t) {
      var e = t.indexOf("+");
      if ((e < 0 && (e = t.indexOf("-")), e < 0 && (e = t.indexOf(" ")), e < 0))
        return (this.lon = NaN), (this.lat = NaN), (this.prec = 0), !1;
      var i = t.substring(0, e),
        r = t.substring(e);
      return (this.lon = this.parseLon(i)), (this.lat = this.parseLat(r)), !0;
    },
    parseLon: function (t) {
      var t = t.trim();
      if (((t = t.replace(/:/g, " ")), t.indexOf(" ") < 0)) {
        var e = t.indexOf(".");
        return (this.prec = e < 0 ? 0 : t.length - e - 1), parseFloat(t);
      }
      for (var i = new Tokenizer(t, " "), r = 0, o = 0, s = 0; i.hasMore(); ) {
        var a = i.nextToken(),
          n = a.indexOf(".");
        switch (((o += parseFloat(a) * Coo.factor[r]), r)) {
          case 0:
            s = n < 0 ? 1 : 2;
            break;
          case 1:
            s = n < 0 ? 3 : 4;
            break;
          case 2:
            s = n < 0 ? 5 : 4 + a.length - n;
        }
        r++;
      }
      return (this.prec = s), (15 * o) / 3600;
    },
    parseLat: function (t) {
      var t = t.trim();
      t = t.replace(/:/g, " ");
      var e;
      if (
        ("-" == t.charAt(0)
          ? ((e = -1), (t = t.substring(1)))
          : "-" == t.charAt(0)
          ? ((e = 1), (t = t.substring(1)))
          : (e = 1),
        t.indexOf(" ") < 0)
      ) {
        var i = t.indexOf(".");
        return (this.prec = i < 0 ? 0 : t.length - i - 1), parseFloat(t) * e;
      }
      for (var r = new Tokenizer(t, " "), o = 0, s = 0, a = 0; r.hasMore(); ) {
        var n = r.nextToken(),
          l = n.indexOf(".");
        switch (((s += parseFloat(n) * Coo.factor[o]), o)) {
          case 0:
            a = l < 0 ? 1 : 2;
            break;
          case 1:
            a = l < 0 ? 3 : 4;
            break;
          case 2:
            a = l < 0 ? 5 : 4 + n.length - l;
        }
        o++;
      }
      return (this.prec = a), (s * e) / 3600;
    },
    format: function (t) {
      isNaN(this.lon) && this.computeLonLat();
      var e = "",
        i = "";
      if (t.indexOf("d") >= 0)
        (e = Numbers.format(this.lon, this.prec)),
          (i = Numbers.format(this.lat, this.prec));
      else
        var r = this.lon / 15,
          e = Numbers.toSexagesimal(r, this.prec + 1, !1),
          i = Numbers.toSexagesimal(this.lat, this.prec, !1);
      return (
        this.lat > 0 && (i = "+" + i),
        t.indexOf("/") >= 0 ? e + " " + i : t.indexOf("2") >= 0 ? [e, i] : e + i
      );
    },
  }),
  (Tokenizer.prototype = {
    hasMore: function () {
      return this.pos < this.string.length;
    },
    nextToken: function () {
      for (
        var t = this.pos;
        t < this.string.length && this.string.charAt(t) == this.sep;

      )
        t++;
      for (
        var e = t;
        e < this.string.length && this.string.charAt(e) != this.sep;

      )
        e++;
      return (this.pos = e), this.string.substring(t, e);
    },
  }),
  (Strings.trim = function (t, e) {
    for (var i = 0, r = t.length - 1; i < t.length && t.charAt(i) == e; ) i++;
    if (i == t.length) return "";
    for (; r > i && t.charAt(r) == e; ) r--;
    return t.substring(i, r + 1);
  }),
  (Numbers.pow10 = [
    1,
    10,
    100,
    1e3,
    1e4,
    1e5,
    1e6,
    1e7,
    1e8,
    1e9,
    1e10,
    1e11,
    1e12,
    1e13,
    1e14,
  ]),
  (Numbers.rndval = [
    0.5,
    0.05,
    0.005,
    5e-4,
    5e-5,
    5e-6,
    5e-7,
    5e-8,
    5e-9,
    5e-10,
    5e-11,
    5e-12,
    5e-13,
    5e-14,
    5e-14,
  ]),
  (Numbers.format = function (t, e) {
    if (e <= 0) return Math.round(t).toString();
    var i = t.toString(),
      r = i.indexOf("."),
      o = r >= 0 ? i.length - r - 1 : 0;
    if (e >= o) {
      r < 0 && (i += ".");
      for (var s = 0; s < e - o; s++) i += "0";
      return i;
    }
    return (i = (t + Numbers.rndval[e]).toString()), i.substr(0, r + e + 1);
  }),
  (Numbers.toSexagesimal = function (t, e, i) {
    var r = t < 0 ? "-" : i ? "+" : "",
      o = Math.abs(t);
    switch (e) {
      case 1:
        var s = Math.round(o);
        return r + s.toString();
      case 2:
        return r + Numbers.format(o, 1);
      case 3:
        var s = Math.floor(o),
          a = Math.round(60 * (o - s));
        return r + s + " " + a;
      case 4:
        var s = Math.floor(o),
          a = 60 * (o - s);
        return r + s + " " + Numbers.format(a, 1);
      case 5:
        var s = Math.floor(o),
          a = 60 * (o - s),
          n = Math.floor(a),
          l = Math.round(60 * (a - n));
        return r + s + " " + n + " " + l;
      case 6:
      case 7:
      case 8:
        var s = Math.floor(o);
        s < 10 && (s = "0" + s);
        var a = 60 * (o - s),
          n = Math.floor(a);
        n < 10 && (n = "0" + n);
        var l = 60 * (a - n);
        return r + s + " " + n + " " + Numbers.format(l, e - 5);
      default:
        return r + Numbers.format(o, 1);
    }
  }),
  (SimbadPointer = (function () {
    return (
      (SimbadPointer = {}),
      (SimbadPointer.MIRRORS = [
        "https://alasky.u-strasbg.fr/cgi/simbad-flat/simbad-quick.py",
        "https://alaskybis.u-strasbg.fr/cgi/simbad-flat/simbad-quick.py",
      ]),
      (SimbadPointer.query = function (t, e, i, r) {
        var o = new Coo(t, e, 7),
          s = { Ident: o.format("s/"), SR: i },
          a = function (t) {
            r.view.setCursor("pointer");
            var e = /(.*?)\/(.*?)\((.*?),(.*?)\)/g,
              i = e.exec(t);
            if (i) {
              var o = new Coo();
              o.parse(i[1]);
              var s = i[2],
                a =
                  '<div class="aladin-sp-title"><a target="_blank" href="http://simbad.u-strasbg.fr/simbad/sim-id?Ident=' +
                  encodeURIComponent(s) +
                  '">' +
                  s +
                  "</a></div>",
                n = '<div class="aladin-sp-content">';
              n += "<em>Type: </em>" + i[4] + "<br>";
              var l = i[3];
              Utils.isNumber(l) && (n += "<em>Mag: </em>" + l + "<br>"),
                (n +=
                  '<br><a target="_blank" href="http://cdsportal.u-strasbg.fr/?target=' +
                  encodeURIComponent(s) +
                  '">Query in CDS portal</a>'),
                (n += "</div>"),
                r.showPopup(o.lon, o.lat, a, n);
            } else r.hidePopup();
          },
          n = function () {
            r.view.setCursor("pointer"), r.hidePopup();
          };
        Utils.loadFromMirrors(SimbadPointer.MIRRORS, {
          data: s,
          onSuccess: a,
          onFailure: n,
          timeout: 5,
        });
      }),
      SimbadPointer
    );
  })()),
  (Box = (function () {
    var t = function (t) {
      (this.$parentDiv = $("<div>")),
        this.$parentDiv.addClass("aladin-box"),
        (t = t || {}),
        (this.css = t.css || { padding: "4px" }),
        (this.position = t.position || "bottom"),
        "right" == this.position && (this.css.left = "unset"),
        (this.css[this.position] = "4px"),
        (this.contentCss = t.contentCss || {}),
        (this.title = t.title || void 0),
        (this.content = t.content || void 0),
        (this.showHandler = void 0 === t.showHandler || t.showHandler),
        (this.openCallback = t.openCallback || void 0),
        (this.closeCallback = t.closeCallback || void 0),
        (this.changingDim = "width"),
        ("top" != this.position && "bottom" != this.position) ||
          (this.changingDim = "height"),
        (this.open = !1),
        this._render(),
        this.$parentDiv.show(),
        (this.open = !0),
        this.hide();
    };
    t.prototype = {
      show: function () {
        if (!this.open) {
          (this.open = !0),
            this.$parentDiv.show(),
            this._updateChevron(),
            "width" == this.changingDim &&
              this.$parentDiv.find(".aladin-box-title-label").show();
          var t = this,
            e = {};
          e[this.changingDim] = "show";
          var i = "width" == this.changingDim ? 0 : 400;
          this.$parentDiv
            .find(".aladin-box-content")
            .animate(e, i, function () {
              (t.css[t.position] = "4px"),
                t.updateStyle(t.css),
                "function" == typeof t.openCallback && t.openCallback();
            });
        }
      },
      hide: function () {
        if (this.open) {
          (this.open = !1),
            this._updateChevron(),
            "width" == this.changingDim &&
              this.$parentDiv.find(".aladin-box-title-label").hide();
          var t = this,
            e = {};
          e[this.changingDim] = "hide";
          var i = "width" == this.changingDim ? 0 : 400;
          this.$parentDiv
            .find(".aladin-box-content")
            .animate(e, i, function () {
              (t.css[t.position] = "0px"),
                t.updateStyle(t.css),
                "function" == typeof t.closeCallback && t.closeCallback();
            });
        }
      },
      realHide: function () {
        (this.open = !1), this.$parentDiv.hide();
      },
      updateStyle: function (t) {
        (this.css = t), this.$parentDiv.css(t);
      },
      setContent: function (t) {
        (this.content = t), this._render();
      },
      setTitle: function (t) {
        (this.title = t), this._render();
      },
      enable: function () {
        this.$parentDiv.enable();
      },
      disable: function () {
        this.$parentDiv.disable();
      },
      _render: function () {
        var t = this;
        this.$parentDiv.empty(), this.$parentDiv.off();
        var e = $('<div class="aladin-box-title">');
        if (this.showHandler) {
          var i = $('<span class="aladin-chevron">');
          e.append(i);
        }
        this.title &&
          e.append(
            ' <span class="aladin-box-title-label">' + this.title + "</span>"
          ),
          this.$parentDiv.append(e);
        var r = $(
          '<div class="aladin-box-content">' +
            (this.content ? this.content : "") +
            "</div>"
        );
        r.css(this.contentCss),
          this.$parentDiv.append(r),
          this._updateChevron(),
          this.updateStyle(this.css),
          e.on("click", function () {
            t.open ? t.hide() : t.show();
          });
      },
      _updateChevron: function () {
        this.$parentDiv
          .find(".aladin-chevron")
          .removeClass()
          .addClass("aladin-chevron " + e(this.position, this.open))
          .attr(
            "title",
            "Click to " +
              (this.open ? "hide " : "show ") +
              (this.title ? this.title : "") +
              " panel"
          );
      },
    };
    var e = function (t, e) {
      return ("top" == t && e) || ("bottom" == t && !e)
        ? "aladin-chevron-up"
        : ("bottom" == t && e) || ("top" == t && !e)
        ? "aladin-chevron-down"
        : ("right" == t && e) || ("left" == t && !e)
        ? "aladin-chevron-right"
        : ("left" == t && e) || ("right" == t && !e)
        ? "aladin-chevron-left"
        : "";
    };
    return t;
  })()),
  (CooConversion = (function () {
    var t = {};
    return (
      (t.GALACTIC_TO_J2000 = [
        -0.0548755604024359,
        0.4941094279435681,
        -0.867666148981161,
        -0.8734370902479237,
        -0.4448296299195045,
        -0.1980763734646737,
        -0.4838350155267381,
        0.7469822444763707,
        0.4559837762325372,
      ]),
      (t.J2000_TO_GALACTIC = [
        -0.0548755604024359,
        -0.873437090247923,
        -0.4838350155267381,
        0.4941094279435681,
        -0.4448296299195045,
        0.7469822444763707,
        -0.867666148981161,
        -0.1980763734646737,
        0.4559837762325372,
      ]),
      (t.Transform = function (t, e) {
        (t[0] = (t[0] * Math.PI) / 180), (t[1] = (t[1] * Math.PI) / 180);
        var i = new Array(
            Math.cos(t[0]) * Math.cos(t[1]),
            Math.sin(t[0]) * Math.cos(t[1]),
            Math.sin(t[1])
          ),
          r = new Array(
            i[0] * e[0] + i[1] * e[1] + i[2] * e[2],
            i[0] * e[3] + i[1] * e[4] + i[2] * e[5],
            i[0] * e[6] + i[1] * e[7] + i[2] * e[8]
          ),
          o = Math.sqrt(r[0] * r[0] + r[1] * r[1] + r[2] * r[2]),
          s = new Array(0, 0);
        s[1] = Math.asin(r[2] / o);
        var a = r[0] / o / Math.cos(s[1]),
          n = r[1] / o / Math.cos(s[1]);
        return (
          (s[0] = Math.atan2(n, a)),
          s[0] < 0 && (s[0] = s[0] + 2 * Math.PI),
          (s[0] = (180 * s[0]) / Math.PI),
          (s[1] = (180 * s[1]) / Math.PI),
          s
        );
      }),
      (t.GalacticToJ2000 = function (e) {
        return t.Transform(e, t.GALACTIC_TO_J2000);
      }),
      (t.J2000ToGalactic = function (e) {
        return t.Transform(e, t.J2000_TO_GALACTIC);
      }),
      t
    );
  })()),
  (Sesame = (function () {
    return (
      (Sesame = {}),
      (Sesame.cache = {}),
      (Sesame.SESAME_URL = "http://cds.u-strasbg.fr/cgi-bin/nph-sesame.jsonp"),
      (Sesame.getTargetRADec = function (t, e, i) {
        if (e) {
          if (/[a-zA-Z]/.test(t))
            Sesame.resolve(
              t,
              function (t) {
                e({
                  ra: t.Target.Resolver.jradeg,
                  dec: t.Target.Resolver.jdedeg,
                });
              },
              function (t) {
                i && i();
              }
            );
          else {
            var r = new Coo();
            r.parse(t), e && e({ ra: r.lon, dec: r.lat });
          }
        }
      }),
      (Sesame.resolve = function (t, e, i) {
        var r = Sesame.SESAME_URL;
        Utils.isHttpsContext() && (r = r.replace("http://", "https://")),
          $.ajax({
            url: r,
            data: { object: t },
            method: "GET",
            dataType: "jsonp",
            success: function (t) {
              t.Target && t.Target.Resolver && t.Target.Resolver ? e(t) : i(t);
            },
            error: i,
          });
      }),
      Sesame
    );
  })()),
  (HealpixCache = (function () {
    var t = {};
    return (
      (t.staticCache = { corners: { nside8: [] } }),
      (t.dynamicCache = {}),
      (t.lastNside = 8),
      (t.hpxIdxCache = null),
      (t.init = function () {
        var e = new HealpixIndex(8);
        e.init();
        for (var i, r = HealpixIndex.nside2Npix(8), o = 0; o < r; o++)
          (i = e.corners_nest(o, 1)), t.staticCache.corners.nside8.push(i);
        t.hpxIdxCache = e;
      }),
      t.init(),
      (t.corners_nest = function (e, i) {
        return 8 == i
          ? t.staticCache.corners.nside8[e]
          : (i != t.lastNside &&
              ((t.hpxIdxCache = new HealpixIndex(i)),
              t.hpxIdxCache.init(),
              (t.lastNside = i)),
            t.hpxIdxCache.corners_nest(e, 1));
      }),
      t
    );
  })()),
  (Utils = Utils || {}),
  (Utils.cssScale = void 0),
  (HTMLCanvasElement.prototype.relMouseCoords = relMouseCoords),
  Function.prototype.bind ||
    (Function.prototype.bind = function (t) {
      if ("function" != typeof this)
        throw new TypeError(
          "Function.prototype.bind - what is trying to be bound is not callable"
        );
      var e = [].slice,
        i = e.call(arguments, 1),
        r = this,
        o = function () {},
        s = function () {
          return r.apply(
            this instanceof o ? this : t || {},
            i.concat(e.call(arguments))
          );
        };
      return (s.prototype = this.prototype), s;
    }),
  ($ = $ || jQuery),
  ($.urlParam = function (t, e) {
    return (
      void 0 === e && (e = location.search),
      decodeURIComponent(
        (new RegExp("[?|&]" + t + "=([^&;]+?)(&|#|;|$)").exec(e) || [
          ,
          "",
        ])[1].replace(/\+/g, "%20")
      ) || null
    );
  }),
  (Utils.isNumber = function (t) {
    return !isNaN(parseFloat(t)) && isFinite(t);
  }),
  (Utils.isInt = function (t) {
    return Utils.isNumber(t) && Math.floor(t) == t;
  }),
  (Utils.debounce = function (t, e) {
    var i = null;
    return function () {
      var r = this,
        o = arguments;
      clearTimeout(i),
        (i = setTimeout(function () {
          t.apply(r, o);
        }, e));
    };
  }),
  (Utils.throttle = function (t, e, i) {
    e || (e = 250);
    var r, o;
    return function () {
      var s = i || this,
        a = +new Date(),
        n = arguments;
      r && a < r + e
        ? (clearTimeout(o),
          (o = setTimeout(function () {
            (r = a), t.apply(s, n);
          }, e)))
        : ((r = a), t.apply(s, n));
    };
  }),
  (Utils.LRUCache = function (t) {
    (this._keys = []),
      (this._items = {}),
      (this._expires = {}),
      (this._size = 0),
      (this._maxsize = t || 1024);
  }),
  (Utils.LRUCache.prototype = {
    set: function (t, e) {
      var i = this._keys,
        r = this._items,
        o = this._expires,
        s = this._size;
      s >= this._maxsize &&
        (i.sort(function (t, e) {
          return o[t] > o[e] ? -1 : o[t] < o[e] ? 1 : 0;
        }),
        s--,
        delete o[i[s]],
        delete r[i[s]]),
        (i[s] = t),
        (r[t] = e),
        (o[t] = Date.now()),
        s++,
        (this._keys = i),
        (this._items = r),
        (this._expires = o),
        (this._size = s);
    },
    get: function (t) {
      var e = this._items[t];
      return e && (this._expires[t] = Date.now()), e;
    },
    keys: function () {
      return this._keys;
    },
  }),
  (Utils.loadFromMirrors = function (t, e) {
    var i = (e && e.data) || null,
      r = (e && e.method, (e && e.dataType) || null),
      o = (e && e.timeout, (e && e.onSuccess) || null),
      s = (e && e.onFailure) || null;
    if (0 === t.length) "function" == typeof s && s();
    else {
      var a = { url: t[0], data: i };
      r && (a.dataType = r),
        $.ajax(a)
          .done(function (t) {
            "function" == typeof o && o(t);
          })
          .fail(function () {
            Utils.loadFromMirrors(t.slice(1), e);
          });
    }
  }),
  (Utils.getAjaxObject = function (t, e, i, r) {
    if ((!1 !== r && (r = !0), !0 === r))
      var o = Aladin.JSONP_PROXY + "?url=" + encodeURIComponent(t);
    else o = t;
    return (
      (e = e || "GET"),
      (i = i || null),
      $.ajax({ url: o, method: e, dataType: i })
    );
  }),
  (Utils.isHttpsContext = function () {
    return "https:" === window.location.protocol;
  }),
  (Utils.getAbsoluteURL = function (t) {
    var e = document.createElement("a");
    return (e.href = t), e.href;
  }),
  (Utils.uuidv4 = function () {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (t) {
        var e = (16 * Math.random()) | 0;
        return ("x" == t ? e : (3 & e) | 8).toString(16);
      }
    );
  }),
  (URLBuilder = (function () {
    return (
      (URLBuilder = {
        buildSimbadCSURL: function (t, e) {
          if (t && "object" == typeof t && "ra" in t && "dec" in t) {
            t = new Coo(t.ra, t.dec, 7).format("s");
          }
          return (
            "https://alasky.unistra.fr/cgi/simbad-flat/simbad-cs.py?target=" +
            encodeURIComponent(t) +
            "&SR=" +
            e +
            "&format=votable&SRUNIT=deg&SORTBY=nbref"
          );
        },
        buildNEDPositionCSURL: function (t, e, i) {
          return (
            "https://ned.ipac.caltech.edu/cgi-bin/nph-objsearch?search_type=Near+Position+Search&of=xml_main&RA=" +
            t +
            "&DEC=" +
            e +
            "&SR=" +
            i
          );
        },
        buildNEDObjectCSURL: function (t, e) {
          return (
            "https://ned.ipac.caltech.edu/cgi-bin/nph-objsearch?search_type=Near+Name+Search&radius=" +
            60 * e +
            "&of=xml_main&objname=" +
            t
          );
        },
        buildVizieRCSURL: function (t, e, i, r) {
          if (e && "object" == typeof e && "ra" in e && "dec" in e) {
            e = new Coo(e.ra, e.dec, 7).format("s");
          }
          var o = 1e5;
          return (
            r &&
              r.hasOwnProperty("limit") &&
              Utils.isNumber(r.limit) &&
              (o = parseInt(r.limit)),
            "https://vizier.unistra.fr/viz-bin/votable?-source=" +
              t +
              "&-c=" +
              encodeURIComponent(e) +
              "&-out.max=" +
              o +
              "&-c.rd=" +
              i
          );
        },
        buildSkyBotCSURL: function (t, e, i, r, o) {
          var s =
            "http://vo.imcce.fr/webservices/skybot/skybotconesearch_query.php?-from=AladinLite";
          if (
            ((s += "&RA=" + encodeURIComponent(t)),
            (s += "&DEC=" + encodeURIComponent(e)),
            (s += "&SR=" + encodeURIComponent(i)),
            (s += "&EPOCH=" + encodeURIComponent(r)),
            o)
          )
            for (var a in o)
              o.hasOwnProperty(a) &&
                (s += "&" + a + "=" + encodeURIComponent(o[a]));
          return s;
        },
      }),
      URLBuilder
    );
  })()),
  (MeasurementTable = (function () {
    return (
      (MeasurementTable = function (t) {
        (this.isShowing = !1),
          (this.divEl = $('<div class="aladin-measurement-div"></div>')),
          $(t).append(this.divEl);
      }),
      (MeasurementTable.prototype.showMeasurement = function (t) {
        this.divEl.empty();
        var e = "<thead><tr>",
          i = "<tr>";
        for (key in t.data)
          (e += "<th>" + key + "</th>"), (i += "<td>" + t.data[key] + "</td>");
        (e += "</tr></thead>"),
          (i += "</tr>"),
          this.divEl.append("<table>" + e + i + "</table>"),
          this.show();
      }),
      (MeasurementTable.prototype.show = function () {
        this.divEl.show();
      }),
      (MeasurementTable.prototype.hide = function () {
        this.divEl.hide();
      }),
      MeasurementTable
    );
  })()),
  (Color = (function () {
    return (
      (Color = {}),
      (Color.curIdx = 0),
      (Color.colors = [
        "#ff0000",
        "#0000ff",
        "#99cc00",
        "#ffff00",
        "#000066",
        "#00ffff",
        "#9900cc",
        "#0099cc",
        "#cc9900",
        "#cc0099",
        "#00cc99",
        "#663333",
        "#ffcc9a",
        "#ff9acc",
        "#ccff33",
        "#660000",
        "#ffcc33",
        "#ff00ff",
        "#00ff00",
        "#ffffff",
      ]),
      (Color.getNextColor = function () {
        var t = Color.colors[Color.curIdx % Color.colors.length];
        return Color.curIdx++, t;
      }),
      (Color.getLabelColorForBackground = function (t) {
        if (((rgb = t.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)), null == rgb))
          return "#111";
        (r = parseInt(rgb[1])), (g = parseInt(rgb[2])), (b = parseInt(rgb[3]));
        return 1 - (0.299 * r + 0.587 * g + 0.114 * b) / 255 < 0.5
          ? "#111"
          : "#eee";
      }),
      Color
    );
  })()),
  (AladinUtils = (function () {
    return {
      xyToView: function (t, e, i, r, o, s, a) {
        return (
          void 0 == a && (a = !0),
          a
            ? {
                vx: AladinUtils.myRound((o / 2) * (1 + s * t) - (o - i) / 2),
                vy: AladinUtils.myRound((o / 2) * (1 + s * e) - (o - r) / 2),
              }
            : {
                vx: (o / 2) * (1 + s * t) - (o - i) / 2,
                vy: (o / 2) * (1 + s * e) - (o - r) / 2,
              }
        );
      },
      viewToXy: function (t, e, i, r, o, s) {
        return {
          x: ((2 * t + (o - i)) / o - 1) / s,
          y: ((2 * e + (o - r)) / o - 1) / s,
        };
      },
      radecToViewXy: function (t, e, i, r, o, s, a, n) {
        var l;
        if (r.system != CooFrameEnum.SYSTEMS.J2000) {
          var h = CooConversion.J2000ToGalactic([t, e]);
          l = i.project(h[0], h[1]);
        } else l = i.project(t, e);
        return l ? AladinUtils.xyToView(l.X, l.Y, o, s, a, n, !1) : null;
      },
      myRound: function (t) {
        return t < 0 ? -1 * (0 | -t) : 0 | t;
      },
      isHpxPixVisible: function (t, e, i) {
        for (var r = 0; r < t.length; r++)
          if (
            t[r].vx >= -20 &&
            t[r].vx < e + 20 &&
            t[r].vy >= -20 &&
            t[r].vy < i + 20
          )
            return !0;
        return !1;
      },
      ipixToIpix: function (t, e, i) {},
      getZoomFactorForAngle: function (t, e) {
        var i = { ra: 0, dec: 0 },
          r = { ra: t, dec: 0 },
          o = new Projection(t / 2, 0);
        o.setProjection(e);
        var s = o.project(i.ra, i.dec),
          a = o.project(r.ra, r.dec);
        return 1 / Math.abs(s.X - a.Y);
      },
      grow2: function (t, e) {
        for (var i = 0, r = 0; r < 4; r++) null == t[r] && i++;
        if (i > 1) return t;
        for (var o = [], r = 0; r < 4; r++)
          o.push({ vx: t[r].vx, vy: t[r].vy });
        for (var r = 0; r < 2; r++) {
          var s = 1 == r ? 1 : 0,
            a = 1 == r ? 3 : 2;
          if (null == o[s]) {
            var n, l;
            0 == s || 3 == s ? ((n = 1), (l = 2)) : ((n = 0), (l = 3)),
              (o[s] = {
                vx: (o[n].vx + o[l].vx) / 2,
                vy: (o[n].vy + o[l].vy) / 2,
              });
          }
          if (null == o[a]) {
            var n, l;
            0 == a || 3 == a ? ((n = 1), (l = 2)) : ((n = 0), (l = 3)),
              (o[a] = {
                vx: (o[n].vx + o[l].vx) / 2,
                vy: (o[n].vy + o[l].vy) / 2,
              });
          }
          if (null != o[s] && null != o[a]) {
            var h = Math.atan2(o[a].vy - o[s].vy, o[a].vx - o[s].vx),
              c = e * Math.cos(h);
            (o[s].vx -= c),
              (o[a].vx += c),
              (c = e * Math.sin(h)),
              (o[s].vy -= c),
              (o[a].vy += c);
          }
        }
        return o;
      },
      SVG_ICONS: {
        CATALOG:
          '<svg xmlns="http://www.w3.org/2000/svg"><polygon points="1,0,5,0,5,3,1,3"  fill="FILLCOLOR" /><polygon points="7,0,9,0,9,3,7,3"  fill="FILLCOLOR" /><polygon points="10,0,12,0,12,3,10,3"  fill="FILLCOLOR" /><polygon points="13,0,15,0,15,3,13,3"  fill="FILLCOLOR" /><polyline points="1,5,5,9"  stroke="FILLCOLOR" /><polyline points="1,9,5,5" stroke="FILLCOLOR" /><line x1="7" y1="7" x2="15" y2="7" stroke="FILLCOLOR" stroke-width="2" /><polyline points="1,11,5,15"  stroke="FILLCOLOR" /><polyline points="1,15,5,11"  stroke="FILLCOLOR" /><line x1="7" y1="13" x2="15" y2="13" stroke="FILLCOLOR" stroke-width="2" /></svg>',
        MOC:
          '<svg xmlns="http://www.w3.org/2000/svg"><polyline points="0.5,7,2.5,7,2.5,5,7,5,7,3,10,3,10,5,13,5,13,7,15,7,15,9,13,9,13,12,10,12,10,14,7,14,7,12,2.5,12,2.5,10,0.5,10,0.5,7" stroke-width="1" stroke="FILLCOLOR" fill="transparent" /><line x1="1" y1="10" x2="6" y2="5" stroke="FILLCOLOR" stroke-width="0.5" /><line x1="2" y1="12" x2="10" y2="4" stroke="FILLCOLOR" stroke-width="0.5" /><line x1="5" y1="12" x2="12" y2="5" stroke="FILLCOLOR" stroke-width="0.5" /><line x1="7" y1="13" x2="13" y2="7" stroke="FILLCOLOR" stroke-width="0.5" /><line x1="10" y1="13" x2="13" y2="10" stroke="FILLCOLOR" stroke-width="0.5" /></svg>',
        OVERLAY:
          '<svg xmlns="http://www.w3.org/2000/svg"><polygon points="10,5,10,1,14,1,14,14,2,14,2,9,6,9,6,5" fill="transparent" stroke="FILLCOLOR" stroke-width="2"/></svg>',
      },
    };
  })()),
  (ProjectionEnum = {
    SIN: Projection.PROJ_SIN,
    AITOFF: Projection.PROJ_AITOFF,
  }),
  (CooFrameEnum = (function () {
    var t = { J2000: "J2000", GAL: "Galactic" };
    return {
      SYSTEMS: t,
      J2000: { label: "J2000", system: t.J2000 },
      J2000d: { label: "J2000d", system: t.J2000 },
      GAL: { label: "Galactic", system: t.GAL },
    };
  })()),
  (CooFrameEnum.fromString = function (t, e) {
    return t
      ? ((t = t.toLowerCase().replace(/^\s+|\s+$/g, "")),
        0 == t.indexOf("j2000d") || 0 == t.indexOf("icrsd")
          ? CooFrameEnum.J2000d
          : 0 == t.indexOf("j2000") || 0 == t.indexOf("icrs")
          ? CooFrameEnum.J2000
          : 0 == t.indexOf("gal")
          ? CooFrameEnum.GAL
          : e || null)
      : e || null;
  }),
  (HiPSDefinition = (function () {
    var t = function (t) {
      (this.properties = t),
        (this.id = this.getID()),
        (this.obsTitle = t.obs_title),
        (this.frame = t.hips_frame),
        (this.order = parseInt(t.hips_order)),
        (this.clientSortKey = t.client_sort_key),
        (this.tileFormats =
          t.hasOwnProperty("hips_tile_format") &&
          t.hips_tile_format.split(" ")),
        (this.urls = []),
        this.urls.push(t.hips_service_url);
      for (var e = 1; t.hasOwnProperty("hips_service_url_" + e); )
        this.urls.push(t["hips_service_url_" + e]), e++;
      this.clientApplications = t.client_application;
    };
    t.prototype = {
      getServiceURLs: function (t) {
        t = !0 === t;
      },
      getID: function () {
        if (this.properties.hasOwnProperty("ID")) return this.properties.ID;
        var t = null;
        return (
          this.properties.hasOwnProperty("creator_did") &&
            (t = this.properties.creator_did),
          null == t &&
            this.properties.hasOwnProperty("publisher_did") &&
            (t = this.properties.publisher_did),
          null != t &&
            ("ivo://" === t.slice(0, 6) && (t = t.slice(6)),
            (t = t.replace(/\?/g, "/"))),
          t
        );
      },
    };
    var e = [
        {
          ID: "CDS/P/2MASS/color",
          obs_title:
            "2MASS color J (1.23 microns), H (1.66 microns), K (2.16 microns)",
          client_sort_key: "04-001-00",
          client_application: ["AladinLite", "AladinDesktop"],
          hips_order: "9",
          hips_frame: "equatorial",
          hips_tile_format: "jpeg",
          hips_service_url: "http://alasky.unistra.fr/2MASS/Color",
          hips_service_url_1: "http://alaskybis.unistra.fr/2MASS/Color",
          hips_service_url_2: "https://alaskybis.unistra.fr/2MASS/Color",
        },
        {
          ID: "CDS/P/AKARI/FIS/Color",
          obs_title:
            "AKARI Far-infrared All-Sky Survey - color composition WideL/WideS/N60",
          client_sort_key: "04-05-00",
          client_application: ["AladinLite", "AladinDesktop"],
          hips_order: "5",
          hips_frame: "equatorial",
          hips_tile_format: "png jpeg",
          hips_service_url: "http://alasky.unistra.fr/AKARI-FIS/ColorLSN60",
          hips_service_url_1:
            "http://alaskybis.unistra.fr/AKARI-FIS/ColorLSN60",
          hips_service_url_2:
            "https://alaskybis.unistra.fr/AKARI-FIS/ColorLSN60",
        },
        {
          ID: "CDS/P/DECaLS/DR3/color",
          obs_title: "DECaLS DR3 color",
          hips_frame: "equatorial",
          hips_order: "11",
          hips_tile_format: "jpeg",
          hips_service_url: "http://alasky.unistra.fr/DECaLS/DR3/color",
        },
        {
          ID: "CDS/P/DSS2/blue",
          obs_title: "DSS2 Blue (XJ+S)",
          client_sort_key: "03-01-03",
          client_application: ["AladinLite", "AladinDesktop"],
          hips_order: "9",
          hips_frame: "equatorial",
          hips_tile_format: "jpeg fits",
          hips_service_url: "http://alasky.unistra.fr/DSS/DSS2-blue-XJ-S",
          hips_service_url_1: "http://alaskybis.unistra.fr/DSS/DSS2-blue-XJ-S",
          hips_service_url_2: "https://alaskybis.unistra.fr/DSS/DSS2-blue-XJ-S",
          hips_service_url_3: "http://healpix.ias.u-psud.fr/DSS2Blue",
        },
        {
          ID: "CDS/P/DSS2/color",
          obs_title: "DSS colored",
          client_sort_key: "03-00",
          client_application: ["AladinLite", "AladinDesktop"],
          hips_order: "9",
          hips_frame: "equatorial",
          hips_tile_format: "jpeg",
          hips_service_url: "http://alasky.unistra.fr/DSS/DSSColor",
          hips_service_url_1: "http://alaskybis.unistra.fr/DSS/DSSColor",
          hips_service_url_2: "https://alaskybis.unistra.fr/DSS/DSSColor",
          hips_service_url_3: "http://healpix.ias.u-psud.fr/DSSColorNew",
          hips_service_url_4: "http://skies.esac.esa.int/DSSColor/",
        },
        {
          ID: "CDS/P/DSS2/red",
          obs_title: "DSS2 Red (F+R)",
          client_sort_key: "03-01-02",
          client_application: ["AladinLite", "AladinDesktop"],
          hips_order: "9",
          hips_frame: "equatorial",
          hips_tile_format: "jpeg fits",
          hips_service_url: "http://alasky.unistra.fr/DSS/DSS2Merged",
          hips_service_url_1: "http://alaskybis.unistra.fr/DSS/DSS2Merged",
          hips_service_url_2: "https://alaskybis.unistra.fr/DSS/DSS2Merged",
          hips_service_url_3: "http://healpix.ias.u-psud.fr/DSS2Merged",
        },
        {
          ID: "P/PanSTARRS/DR1/g",
          hips_service_url: "http://alasky.u-strasbg.fr/Pan-STARRS/DR1/g",
          obs_title: "PanSTARRS DR1 g",
          hips_order: 11,
          hips_frame: "equatorial",
          hips_tile_format: "jpeg fits",
        },
        {
          ID: "CDS/P/Fermi/color",
          obs_title: "Fermi Color HEALPix survey",
          client_sort_key: "00-01-01",
          client_application: ["AladinLite", "AladinDesktop"],
          hips_order: "3",
          hips_frame: "equatorial",
          hips_tile_format: "jpeg",
          hips_service_url: "http://alasky.unistra.fr/Fermi/Color",
          hips_service_url_1: "http://alaskybis.unistra.fr/Fermi/Color",
          hips_service_url_2: "https://alaskybis.unistra.fr/Fermi/Color",
        },
        {
          ID: "CDS/P/Finkbeiner",
          obs_title: "Finkbeiner Halpha composite survey",
          client_sort_key: "06-01",
          client_application: ["AladinLite", "AladinDesktop"],
          hips_order: "3",
          hips_frame: "galactic",
          hips_tile_format: "jpeg fits",
          hips_service_url: "http://alasky.unistra.fr/FinkbeinerHalpha",
          hips_service_url_1: "http://alaskybis.unistra.fr/FinkbeinerHalpha",
          hips_service_url_2: "https://alaskybis.unistra.fr/FinkbeinerHalpha",
        },
        {
          ID: "CDS/P/GALEXGR6/AIS/color",
          obs_title: "GALEX GR6 AIS (until March 2014)- Color composition",
          client_sort_key: "02-01-01",
          client_application: ["AladinLite", "AladinDesktop"],
          hips_order: "8",
          hips_frame: "equatorial",
          hips_tile_format: "png jpeg",
          hips_service_url:
            "http://alasky.unistra.fr/GALEX/GR6-03-2014/AIS-Color",
          hips_service_url_1:
            "http://alaskybis.unistra.fr/GALEX/GR6-03-2014/AIS-Color",
          hips_service_url_2:
            "https://alaskybis.unistra.fr/GALEX/GR6-03-2014/AIS-Color",
        },
        {
          ID: "CDS/P/IRIS/color",
          obs_title: "IRAS-IRIS HEALPix survey, color",
          client_sort_key: "04-02-01",
          client_application: ["AladinLite", "AladinDesktop"],
          hips_order: "3",
          hips_frame: "galactic",
          hips_tile_format: "jpeg",
          hips_service_url: "http://alasky.unistra.fr/IRISColor",
          hips_service_url_1: "http://alaskybis.unistra.fr/IRISColor",
          hips_service_url_2: "https://alaskybis.unistra.fr/IRISColor",
          hips_service_url_3: "http://healpix.ias.u-psud.fr/IRISColor",
          hips_service_url_4: "http://skies.esac.esa.int/IRISColor/",
        },
        {
          ID: "CDS/P/Mellinger/color",
          obs_title: "Mellinger optical survey, color",
          client_sort_key: "03-03",
          client_application: ["AladinLite", "AladinDesktop"],
          hips_order: "4",
          hips_frame: "galactic",
          hips_tile_format: "jpeg",
          hips_service_url: "http://alasky.unistra.fr/MellingerRGB",
          hips_service_url_1: "http://alaskybis.unistra.fr/MellingerRGB",
          hips_service_url_2: "https://alaskybis.unistra.fr/MellingerRGB",
        },
        {
          ID: "CDS/P/SDSS9/color",
          obs_title: "SDSS 9 color",
          client_sort_key: "03-02-01",
          client_application: ["AladinLite", "AladinDesktop"],
          hips_order: "10",
          hips_frame: "equatorial",
          hips_tile_format: "jpeg",
          hips_service_url: "http://alasky.unistra.fr/SDSS/DR9/color",
          hips_service_url_1: "http://alaskybis.unistra.fr/SDSS/DR9/color",
          hips_service_url_2: "https://alaskybis.unistra.fr/SDSS/DR9/color",
          hips_service_url_3: "http://healpix.ias.u-psud.fr/SDSS9Color",
          hips_service_url_4: "http://skies.esac.esa.int/SDSS9Color/",
        },
        {
          ID: "CDS/P/SPITZER/color",
          obs_title: "IRAC HEALPix survey, color",
          client_sort_key: "04-03-00",
          client_application: ["AladinLite", "AladinDesktop"],
          hips_order: "9",
          hips_frame: "galactic",
          hips_tile_format: "jpeg",
          hips_service_url: "http://alasky.unistra.fr/SpitzerI1I2I4color",
          hips_service_url_1: "http://alaskybis.unistra.fr/SpitzerI1I2I4color",
          hips_service_url_2: "https://alaskybis.unistra.fr/SpitzerI1I2I4color",
          hips_service_url_3: "http://healpix.ias.u-psud.fr/SPITZERColor",
        },
        {
          ID: "CDS/P/allWISE/color",
          obs_title:
            "AllWISE color  Red (W4) , Green (W2) , Blue (W1) from raw Atlas Images",
          client_sort_key: "04-003-00",
          client_application: ["AladinLite", "AladinDesktop"],
          hips_order: "8",
          hips_frame: "equatorial",
          hips_tile_format: "jpeg",
          hips_service_url: "http://alasky.unistra.fr/AllWISE/RGB-W4-W2-W1",
          hips_service_url_1:
            "http://alaskybis.unistra.fr/AllWISE/RGB-W4-W2-W1",
          hips_service_url_2:
            "https://alaskybis.unistra.fr/AllWISE/RGB-W4-W2-W1",
        },
        {
          ID: "IPAC/P/GLIMPSE360",
          obs_title: "GLIMPSE360: Spitzer's Infrared Milky Way",
          client_sort_key: "04-03-0",
          client_application: ["AladinLite", "AladinDesktop"],
          hips_order: "9",
          hips_frame: "equatorial",
          hips_tile_format: "jpeg",
          hips_service_url:
            "http://www.spitzer.caltech.edu/glimpse360/aladin/data",
        },
        {
          ID: "JAXA/P/MAXI_SSC_SUM",
          hips_tile_format: "png",
          hips_frame: "equatorial",
          obs_title: "MAXI SSC all-sky image integrated for 4.5 years",
          hips_order: "6",
          hips_service_url:
            "http://darts.isas.jaxa.jp/pub/judo2/HiPS/maxi_ssc_sum",
          hips_service_url_1:
            "http://alasky.unistra.fr//JAXA/JAXA_P_MAXI_SSC_SUM",
          hips_service_url_2:
            "http://alaskybis.unistra.fr//JAXA/JAXA_P_MAXI_SSC_SUM",
          hips_service_url_3:
            "https://alaskybis.unistra.fr//JAXA/JAXA_P_MAXI_SSC_SUM",
        },
        {
          ID: "JAXA/P/SWIFT_BAT_FLUX",
          hips_tile_format: "png",
          hips_frame: "equatorial",
          obs_title: "Swift-BAT 70-month all-sray hard X-ray survey image",
          hips_order: "6",
          hips_service_url:
            "http://darts.isas.jaxa.jp/pub/judo2/HiPS/swift_bat_flux/",
          hips_service_url_1:
            "http://alasky.unistra.fr//JAXA/JAXA_P_SWIFT_BAT_FLUX",
          hips_service_url_2:
            "http://alaskybis.unistra.fr//JAXA/JAXA_P_SWIFT_BAT_FLUX",
          hips_service_url_3:
            "https://alaskybis.unistra.fr//JAXA/JAXA_P_SWIFT_BAT_FLUX",
        },
        {
          ID: "ov-gso/P/VTSS/Ha",
          obs_title: "Virginia Tech Spectral-Line Survey (VTSS) - Halpha image",
          client_sort_key: "06-xx",
          client_application: ["AladinLite", "AladinDesktop"],
          hips_order: "3",
          hips_frame: ["galactic", "galactic"],
          hips_tile_format: "png jpeg fits",
          hips_service_url:
            "http://cade.irap.omp.eu/documents/Ancillary/4Aladin/VTSS",
          hips_service_url_1: "http://alasky.unistra.fr/IRAP/VTSS",
          hips_service_url_2: "http://alaskybis.unistra.fr/IRAP/VTSS",
          hips_service_url_3: "https://alaskybis.unistra.fr/IRAP/VTSS",
        },
        {
          ID: "xcatdb/P/XMM/EPIC",
          obs_title: "XMM-Newton stacked EPIC images",
          hips_frame: "equatorial",
          hips_order: "7",
          hips_service_url: "http://saada.u-strasbg.fr/xmmallsky",
          hips_tile_format: "png fits",
          hips_service_url_1: "http://alasky.unistra.fr/SSC/xmmallsky",
          hips_service_url_2: "http://alaskybis.unistra.fr/SSC/xmmallsky",
          hips_service_url_3: "https://alaskybis.unistra.fr/SSC/xmmallsky",
        },
        {
          ID: "xcatdb/P/XMM/PN/color",
          obs_title:
            "False color X-ray images (Red=0.5-1 Green=1-2 Blue=2-4.5)Kev",
          hips_order: "7",
          hips_frame: "equatorial",
          hips_tile_format: "png jpeg",
          hips_service_url: "http://saada.unistra.fr/PNColor",
          hips_service_url_1:
            "http://alasky.u-strasbg.fr/SSC/xcatdb_P_XMM_PN_color",
          hips_service_url_2:
            "http://alaskybis.u-strasbg.fr/SSC/xcatdb_P_XMM_PN_color",
          hips_service_url_3:
            "https://alaskybis.u-strasbg.fr/SSC/xcatdb_P_XMM_PN_color",
        },
      ],
      i = [];
    t.LOCAL_STORAGE_KEY = "aladin:hips-list";
    (t.getLocalStorageDefinitions = function () {
      try {
        var e = window.localStorage.getItem(t.LOCAL_STORAGE_KEY);
        return null === e ? [] : window.JSON.parse(e);
      } catch (t) {
        return [];
      }
    }),
      (t.storeInLocalStorage = function (e) {
        try {
          window.localStorage.setItem(
            t.LOCAL_STORAGE_KEY,
            window.JSON.stringify(e)
          );
        } catch (t) {
          return !1;
        }
        return !0;
      });
    var r = [
        "http://alasky.u-strasbg.fr/MocServer/query",
        "http://alaskybis.u-strasbg.fr/MocServer/query",
      ],
      o = [
        "https://alasky.u-strasbg.fr/MocServer/query",
        "https://alaskybis.unistra.fr/MocServer/query",
      ];
    t.getRemoteDefinitions = function (t, e, i) {
      var t = t || { client_application: "AladinLite" };
      (t.fmt = "json"),
        (t.fields =
          "ID,obs_title,client_sort_key,client_application,hips_service_url*,hips_order,hips_tile_format,hips_frame");
      var s = Utils.isHttpsContext() ? o : r,
        a = function (t) {
          "function" == typeof e && e(t);
        },
        n = function () {
          console.error("Could not load HiPS definitions from urls " + s),
            "function" == typeof i && i();
        };
      Utils.loadFromMirrors(s, {
        data: t,
        onSuccess: a,
        onFailure: n,
        timeout: 5,
      });
    };
    var s = function (t, e) {
      for (var i = [], r = {}, o = 0; o < e.length; o++) {
        var s = e[o];
        r[s.ID] = s;
      }
      for (var o = 0; o < t.length; o++) {
        var s = t[o],
          a = s.ID;
        if (r.hasOwnProperty(a)) {
          var n = r[a];
          s.hasOwnProperty("_last_used_url") &&
            !n.hasOwnProperty("_last_used_url") &&
            (n._last_used_url = s._last_used_url),
            i.push(n);
        } else i.push(s);
      }
      return i;
    };
    return (
      (t.CACHE_RETENTION_TIME_SECONDS = 604800),
      (t.init = function () {
        i = e;
        for (
          var r = t.getLocalStorageDefinitions(),
            o = new Date().getTime(),
            a = [],
            n = 0;
          n < r.length;
          n++
        ) {
          var l = r[n];
          l.hasOwnProperty("_timestamp_retrieved") &&
            o - l._timestamp_retrieved > 1e3 * t.CACHE_RETENTION_TIME_SECONDS &&
            a.push(n);
        }
        for (var n = a.length - 1; n >= 0; n--) r.splice(a[n], 1);
        (i = s(i, r)),
          t.getRemoteDefinitions(
            { dataproduct_type: "image", client_application: "AladinLite" },
            function (e) {
              for (var r = new Date().getTime(), o = 0; o < e.length; o++)
                e[o]._timestamp_retrieved = r;
              (i = s(i, e)), t.storeInLocalStorage(i);
            }
          );
      }),
      (t.getALDefaultHiPSDefinitions = function () {
        for (var e = [], r = 0; r < i.length; r++) {
          var o = i[r];
          !o.hasOwnProperty("client_application") ||
            o.client_application.indexOf("AladinLite") < 0 ||
            e.push(new t(o));
        }
        return e;
      }),
      (t.getDefinitions = function () {
        for (var e = [], r = 0; r < i.length; r++) {
          var o = i[r];
          e.push(new t(o));
        }
        return e;
      }),
      (t.parseHiPSProperties = function (t) {
        if (null == t) return null;
        var e = {};
        t = t.replace(/[\r]/g, "");
        for (var i = t.split("\n"), r = 0; r < i.length; r++) {
          var o = $.trim(i[r]);
          if ("#" !== o.slice(0, 1)) {
            var s = o.indexOf("=");
            if (!(s < 0)) {
              var a = $.trim(o.slice(0, s)),
                n = $.trim(o.slice(s + 1));
              e[a] = n;
            }
          }
        }
        return e;
      }),
      (t.findByID = function (t, e) {
        var i = findByIDLocal(t);
        if (i.length > 0) return void ("function" == typeof e && e(i));
        findByIDRemote(t, e);
      }),
      (t.findByIDLocal = function (e, r) {
        for (var o = [], s = 0; s < i.length; s++) {
          var a = i[s];
          null != a.ID.match(e) && o.push(new t(a));
        }
        return o;
      }),
      (t.findByIDRemote = function (e, i) {
        t.findHiPSRemote({ ID: "*" + e + "*" }, i);
      }),
      (t.findHiPSRemote = function (e, i) {
        (e = e || {}),
          e.hasOwnProperty("dataproduct_type") ||
            (e.dataproduct_type = "image"),
          t.getRemoteDefinitions(e, function (e) {
            for (var r = [], o = 0; o < e.length; o++) r.push(new t(e[o]));
            "function" == typeof i && i(r);
          });
      }),
      (t.fromURL = function (e, i) {
        var r, o;
        "properties" === e.slice(-10)
          ? ((o = e), (r = o.slice(0, -11)))
          : ("/" === e.slice(-1) && (e = e.slice(0, -1)),
            (r = e),
            (o = r + "/properties"));
        var s = function (e) {
          var o = t.parseHiPSProperties(e);
          o.hasOwnProperty("hips_service_url") || (o.hips_service_url = r),
            "function" == typeof i && i(new t(o));
        };
        Utils.getAjaxObject(o, "GET", "text", !1)
          .done(function (t) {
            s(t);
          })
          .fail(function () {
            Utils.getAjaxObject(o, "GET", "text", !0)
              .done(function (t) {
                s(t);
              })
              .fail(function () {
                "function" == typeof i && i(null);
              });
          });
      }),
      (t.fromProperties = function (e) {
        return new t(e);
      }),
      t.init(),
      t
    );
  })()),
  (Downloader = (function () {
    var t = function (t) {
      (this.view = t),
        (this.nbDownloads = 0),
        (this.dlQueue = []),
        (this.urlsInQueue = {});
    };
    return (
      (t.prototype.emptyQueue = function () {
        (this.dlQueue = []), (this.urlsInQueue = {});
      }),
      (t.prototype.requestDownload = function (t, e, i) {
        e in this.urlsInQueue ||
          (this.dlQueue.push({ img: t, url: e, cors: i }),
          (this.urlsInQueue[e] = 1),
          this.tryDownload());
      }),
      (t.prototype.tryDownload = function () {
        for (; this.dlQueue.length > 0 && this.nbDownloads < 4; )
          this.startDownloadNext();
      }),
      (t.prototype.startDownloadNext = function () {
        var t = this.dlQueue.shift();
        if (t) {
          this.nbDownloads++;
          var e = this;
          (t.img.onload = function () {
            e.completeDownload(this, !0);
          }),
            (t.img.onerror = function (t) {
              e.completeDownload(this, !1);
            }),
            t.cors
              ? (t.img.crossOrigin = "anonymous")
              : void 0 !== t.img.crossOrigin && delete t.img.crossOrigin,
            (t.img.src = t.url);
        }
      }),
      (t.prototype.completeDownload = function (t, e) {
        if (
          (delete this.urlsInQueue[t.src],
          (t.onerror = null),
          (t.onload = null),
          this.nbDownloads--,
          e)
        ) {
          this.view.requestRedraw();
        } else t.dlError = !0;
        this.tryDownload();
      }),
      t
    );
  })()),
  function () {
    var t,
      e,
      i,
      r,
      o,
      s,
      a,
      n,
      l,
      h,
      c,
      u,
      p,
      d,
      f,
      v,
      g = {}.hasOwnProperty,
      m = function (t, e) {
        function i() {
          this.constructor = t;
        }
        for (var r in e) g.call(e, r) && (t[r] = e[r]);
        return (
          (i.prototype = e.prototype),
          (t.prototype = new i()),
          (t.__super__ = e.prototype),
          t
        );
      },
      y = [].slice;
    null == this.astro && (this.astro = {}),
      (t = (function () {
        function t() {}
        return (
          (t.include = function (t) {
            var e, i;
            for (e in t) (i = t[e]), (this.prototype[e] = i);
            return this;
          }),
          (t.extend = function (t) {
            var e, i;
            for (e in t) (i = t[e]), (this[e] = i);
            return this;
          }),
          (t.prototype.proxy = function (t) {
            var e = this;
            return function () {
              return t.apply(e, arguments);
            };
          }),
          (t.prototype.invoke = function (t, e, i) {
            var r;
            if (
              ((r =
                null != (null != e ? e.context : void 0) ? e.context : this),
              null != t)
            )
              return t.call(r, i, e);
          }),
          t
        );
      })()),
      (u = (function (t) {
        function e(t, e, i) {
          var r,
            o = this;
          (this.arg = t),
            (this.callback = e),
            (this.opts = i),
            (this.hdus = []),
            (this.blockCount = 0),
            (this.begin = 0),
            (this.end = this.BLOCKLENGTH),
            (this.offset = 0),
            (this.headerStorage = new Uint8Array()),
            "string" == typeof this.arg
              ? ((this.readNextBlock = this._readBlockFromBuffer),
                (r = new XMLHttpRequest()),
                r.open("GET", this.arg),
                (r.responseType = "arraybuffer"),
                (r.onerror = function () {
                  o.invoke(o.callback, o.opts);
                }),
                (r.onload = function () {
                  return 200 !== r.status
                    ? void o.invoke(o.callback, o.opts)
                    : ((o.arg = r.response),
                      (o.length = o.arg.byteLength),
                      o.readFromBuffer());
                }),
                r.send())
              : ((this.length = this.arg.size),
                (this.readNextBlock = this._readBlockFromFile),
                this.readFromFile());
        }
        return (
          m(e, t),
          (e.prototype.LINEWIDTH = 80),
          (e.prototype.BLOCKLENGTH = 2880),
          (File.prototype.slice =
            File.prototype.slice || File.prototype.webkitSlice),
          (Blob.prototype.slice =
            Blob.prototype.slice || Blob.prototype.webkitSlice),
          (e.prototype.readFromBuffer = function () {
            var t;
            return (
              (t = this.arg.slice(
                this.begin + this.offset,
                this.end + this.offset
              )),
              this.readBlock(t)
            );
          }),
          (e.prototype.readFromFile = function () {
            var t,
              e = this;
            return (
              (this.reader = new FileReader()),
              (this.reader.onloadend = function (t) {
                return e.readBlock(t.target.result);
              }),
              (t = this.arg.slice(
                this.begin + this.offset,
                this.end + this.offset
              )),
              this.reader.readAsArrayBuffer(t)
            );
          }),
          (e.prototype.readBlock = function (t) {
            var e, i, r, o, s, l, h, c, u, p, d, f, v;
            for (
              e = new Uint8Array(t),
                u = new Uint8Array(this.headerStorage),
                this.headerStorage = new Uint8Array(this.end),
                this.headerStorage.set(u, 0),
                this.headerStorage.set(e, this.begin),
                l = this.BLOCKLENGTH / this.LINEWIDTH;
              l--;

            )
              if (((s = l * this.LINEWIDTH), 32 !== e[s])) {
                if (
                  69 === e[s] &&
                  78 === e[s + 1] &&
                  68 === e[s + 2] &&
                  32 === e[s + 3]
                ) {
                  for (
                    h = "", v = this.headerStorage, d = 0, f = v.length;
                    d < f;
                    d++
                  )
                    (p = v[d]), (h += String.fromCharCode(p));
                  return (
                    (o = new n(h)),
                    ((this.start = this.end + this.offset),
                    (i = o.getDataLength()),
                    (c = this.arg.slice(this.start, this.start + i)),
                    o.hasDataUnit() && (r = this.createDataUnit(o, c)),
                    this.hdus.push(new a(o, r)),
                    (this.offset += this.end + i + this.excessBytes(i)),
                    this.offset === this.length)
                      ? ((this.headerStorage = null),
                        void this.invoke(this.callback, this.opts, this))
                      : ((this.blockCount = 0),
                        (this.begin = this.blockCount * this.BLOCKLENGTH),
                        (this.end = this.begin + this.BLOCKLENGTH),
                        (this.headerStorage = new Uint8Array()),
                        (t = this.arg.slice(
                          this.begin + this.offset,
                          this.end + this.offset
                        )),
                        void this.readNextBlock(t))
                  );
                }
                break;
              }
            (this.blockCount += 1),
              (this.begin = this.blockCount * this.BLOCKLENGTH),
              (this.end = this.begin + this.BLOCKLENGTH),
              (t = this.arg.slice(
                this.begin + this.offset,
                this.end + this.offset
              )),
              this.readNextBlock(t);
          }),
          (e.prototype._readBlockFromBuffer = function (t) {
            return this.readBlock(t);
          }),
          (e.prototype._readBlockFromFile = function (t) {
            return this.reader.readAsArrayBuffer(t);
          }),
          (e.prototype.createDataUnit = function (t, e) {
            var i;
            return (i = t.getDataType()), new astro.FITS[i](t, e);
          }),
          (e.prototype.excessBytes = function (t) {
            return (
              (this.BLOCKLENGTH - (t % this.BLOCKLENGTH)) % this.BLOCKLENGTH
            );
          }),
          (e.prototype.isEOF = function () {
            return this.offset === this.length;
          }),
          e
        );
      })(t)),
      (s = (function (t) {
        function e(t, e, i) {
          var r,
            o = this;
          (this.arg = t),
            (r = new u(this.arg, function (t) {
              return (o.hdus = r.hdus), o.invoke(e, i, o);
            }));
        }
        return (
          m(e, t),
          (e.prototype.getHDU = function (t) {
            var e, i, r, o;
            if (null != t && null != this.hdus[t]) return this.hdus[t];
            for (o = this.hdus, i = 0, r = o.length; i < r; i++)
              if (((e = o[i]), e.hasData())) return e;
          }),
          (e.prototype.getHeader = function (t) {
            return this.getHDU(t).header;
          }),
          (e.prototype.getDataUnit = function (t) {
            return this.getHDU(t).data;
          }),
          e
        );
      })(t)),
      (s.version = "0.6.5"),
      (this.astro.FITS = s),
      (r = (function (t) {
        function e(t, e) {
          e instanceof ArrayBuffer ? (this.buffer = e) : (this.blob = e);
        }
        return (
          m(e, t),
          (e.swapEndian = {
            B: function (t) {
              return t;
            },
            I: function (t) {
              return (t << 8) | (t >> 8);
            },
            J: function (t) {
              return (
                ((255 & t) << 24) |
                ((65280 & t) << 8) |
                ((t >> 8) & 65280) |
                ((t >> 24) & 255)
              );
            },
          }),
          (e.swapEndian[8] = e.swapEndian.B),
          (e.swapEndian[16] = e.swapEndian.I),
          (e.swapEndian[32] = e.swapEndian.J),
          e
        );
      })(t)),
      (this.astro.FITS.DataUnit = r),
      (l = {
        verifyOrder: function (t, e) {
          if (e !== this.cardIndex)
            return console.warn(
              t +
                " should appear at index " +
                this.cardIndex +
                " in the FITS header"
            );
        },
        verifyBetween: function (t, e, i, r) {
          if (!(e >= i && e <= r))
            throw (
              "The " +
              t +
              " value of " +
              e +
              " is not between " +
              i +
              " and " +
              r
            );
        },
        verifyBoolean: function (t) {
          return "T" === t;
        },
        VerifyFns: {
          SIMPLE: function () {
            var t;
            return (
              1 <= arguments.length ? y.call(arguments, 0) : [],
              (t = arguments[0]),
              (this.primary = !0),
              this.verifyOrder("SIMPLE", 0),
              this.verifyBoolean(t)
            );
          },
          XTENSION: function () {
            return (
              1 <= arguments.length ? y.call(arguments, 0) : [],
              (this.extension = !0),
              (this.extensionType = arguments[0]),
              this.verifyOrder("XTENSION", 0),
              this.extensionType
            );
          },
          BITPIX: function () {
            var t, e;
            if (
              (1 <= arguments.length ? y.call(arguments, 0) : [],
              (t = "BITPIX"),
              (e = parseInt(arguments[0])),
              this.verifyOrder(t, 1),
              8 !== e && 16 !== e && 32 !== e && -32 !== e && -64 !== e)
            )
              throw t + " value " + e + " is not permitted";
            return e;
          },
          NAXIS: function () {
            var t, e, i, r;
            if (
              (1 <= arguments.length ? y.call(arguments, 0) : [],
              (t = "NAXIS"),
              (i = parseInt(arguments[0])),
              !arguments[1] &&
                (this.verifyOrder(t, 2),
                this.verifyBetween(t, i, 0, 999),
                this.isExtension() &&
                  ("TABLE" === (r = this.extensionType) || "BINTABLE" === r) &&
                  ((e = 2), i !== e)))
            )
              throw t + " must be " + e + " for TABLE and BINTABLE extensions";
            return i;
          },
          PCOUNT: function () {
            var t, e, i, r, o;
            if (
              (1 <= arguments.length ? y.call(arguments, 0) : [],
              (t = "PCOUNT"),
              (r = parseInt(arguments[0])),
              (e = 3 + this.get("NAXIS")),
              this.verifyOrder(t, e),
              this.isExtension() &&
                ("IMAGE" === (o = this.extensionType) || "TABLE" === o) &&
                ((i = 0), r !== i))
            )
              throw (
                t +
                " must be " +
                i +
                " for the " +
                this.extensionType +
                " extensions"
              );
            return r;
          },
          GCOUNT: function () {
            var t, e, i, r, o;
            if (
              (1 <= arguments.length ? y.call(arguments, 0) : [],
              (t = "GCOUNT"),
              (r = parseInt(arguments[0])),
              (e = 3 + this.get("NAXIS") + 1),
              this.verifyOrder(t, e),
              this.isExtension() &&
                ("IMAGE" === (o = this.extensionType) ||
                  "TABLE" === o ||
                  "BINTABLE" === o) &&
                ((i = 1), r !== i))
            )
              throw (
                t +
                " must be " +
                i +
                " for the " +
                this.extensionType +
                " extensions"
              );
            return r;
          },
          EXTEND: function () {
            var t;
            if (
              (1 <= arguments.length ? y.call(arguments, 0) : [],
              (t = arguments[0]),
              !this.isPrimary())
            )
              throw "EXTEND must only appear in the primary header";
            return this.verifyBoolean(t);
          },
          BSCALE: function () {
            return (
              1 <= arguments.length ? y.call(arguments, 0) : [],
              parseFloat(arguments[0])
            );
          },
          BZERO: function () {
            return (
              1 <= arguments.length ? y.call(arguments, 0) : [],
              parseFloat(arguments[0])
            );
          },
          BLANK: function () {
            var t;
            return (
              1 <= arguments.length ? y.call(arguments, 0) : [],
              (t = arguments[0]),
              this.get("BITPIX") > 0 ||
                console.warn(
                  "BLANK is not to be used for BITPIX = " + this.get("BITPIX")
                ),
              parseInt(t)
            );
          },
          DATAMIN: function () {
            return (
              1 <= arguments.length ? y.call(arguments, 0) : [],
              parseFloat(arguments[0])
            );
          },
          DATAMAX: function () {
            return (
              1 <= arguments.length ? y.call(arguments, 0) : [],
              parseFloat(arguments[0])
            );
          },
          EXTVER: function () {
            return (
              1 <= arguments.length ? y.call(arguments, 0) : [],
              parseInt(arguments[0])
            );
          },
          EXTLEVEL: function () {
            return (
              1 <= arguments.length ? y.call(arguments, 0) : [],
              parseInt(arguments[0])
            );
          },
          TFIELDS: function () {
            var t;
            return (
              1 <= arguments.length ? y.call(arguments, 0) : [],
              (t = parseInt(arguments[0])),
              this.verifyBetween("TFIELDS", t, 0, 999),
              t
            );
          },
          TBCOL: function () {
            var t, e;
            return (
              1 <= arguments.length ? y.call(arguments, 0) : [],
              (e = arguments[0]),
              (t = arguments[2]),
              this.verifyBetween("TBCOL", t, 0, this.get("TFIELDS")),
              e
            );
          },
          ZIMAGE: function () {
            return (
              1 <= arguments.length ? y.call(arguments, 0) : [],
              this.verifyBoolean(arguments[0])
            );
          },
          ZCMPTYPE: function () {
            var t;
            if (
              (1 <= arguments.length ? y.call(arguments, 0) : [],
              "GZIP_1" !== (t = arguments[0]) &&
                "RICE_1" !== t &&
                "PLIO_1" !== t &&
                "HCOMPRESS_1" !== t)
            )
              throw "ZCMPTYPE value " + t + " is not permitted";
            if ("RICE_1" !== t)
              throw "Compress type " + t + " is not yet implement";
            return t;
          },
          ZBITPIX: function () {
            var t;
            if (
              (1 <= arguments.length ? y.call(arguments, 0) : [],
              8 !== (t = parseInt(arguments[0])) &&
                16 !== t &&
                32 !== t &&
                64 !== t &&
                -32 !== t &&
                -64 !== t)
            )
              throw "ZBITPIX value " + t + " is not permitted";
            return t;
          },
          ZNAXIS: function () {
            var t, e;
            return (
              1 <= arguments.length ? y.call(arguments, 0) : [],
              (e = parseInt(arguments[0])),
              (t = arguments[1]),
              (e = e),
              t || this.verifyBetween("ZNAXIS", e, 0, 999),
              e
            );
          },
          ZTILE: function () {
            return (
              1 <= arguments.length ? y.call(arguments, 0) : [],
              parseInt(arguments[0])
            );
          },
          ZSIMPLE: function () {
            return (
              1 <= arguments.length ? y.call(arguments, 0) : [],
              "T" === arguments[0]
            );
          },
          ZPCOUNT: function () {
            return (
              1 <= arguments.length ? y.call(arguments, 0) : [],
              parseInt(arguments[0])
            );
          },
          ZGCOUNT: function () {
            return (
              1 <= arguments.length ? y.call(arguments, 0) : [],
              parseInt(arguments[0])
            );
          },
          ZDITHER0: function () {
            return (
              1 <= arguments.length ? y.call(arguments, 0) : [],
              parseInt(arguments[0])
            );
          },
        },
      }),
      (this.astro.FITS.HeaderVerify = l),
      (n = (function (t) {
        function e(t) {
          var e, i, r;
          (this.primary = !1),
            (this.extension = !1),
            (this.verifyCard = {}),
            (r = this.VerifyFns);
          for (i in r) (e = r[i]), (this.verifyCard[i] = this.proxy(e));
          (this.cards = {}),
            (this.cards.COMMENT = []),
            (this.cards.HISTORY = []),
            (this.cardIndex = 0),
            (this.block = t),
            this.readBlock(t);
        }
        return (
          m(e, t),
          e.include(l),
          (e.prototype.arrayPattern = /(\D+)(\d+)/),
          (e.prototype.maxLines = 600),
          (e.prototype.get = function (t) {
            return this.contains(t) ? this.cards[t].value : null;
          }),
          (e.prototype.set = function (t, e, i) {
            return (
              (i = i || ""),
              (this.cards[t] = { index: this.cardIndex, value: e, comment: i }),
              (this.cardIndex += 1)
            );
          }),
          (e.prototype.contains = function (t) {
            return this.cards.hasOwnProperty(t);
          }),
          (e.prototype.readLine = function (t) {
            var e, i, r, o, s, a;
            if (((o = t.slice(0, 8).trim()), !("" === o)))
              return (
                (r = t.slice(8, 10)),
                (s = t.slice(10)),
                "= " !== r
                  ? void (
                      ("COMMENT" !== o && "HISTORY" !== o) ||
                      this.cards[o].push(s.trim())
                    )
                  : ((a = s.split(" /")),
                    (s = a[0]),
                    (e = a[1]),
                    (s = s.trim()),
                    (i = s[0]),
                    "'" === i
                      ? (s = s.slice(1, -1).trim())
                      : "T" !== s && "F" !== s && (s = parseFloat(s)),
                    (s = this.validate(o, s)),
                    this.set(o, s, e))
              );
          }),
          (e.prototype.validate = function (t, e) {
            var i, r, o, s, a;
            return (
              (r = null),
              (i = t),
              (o = this.arrayPattern.test(t)),
              o &&
                ((s = this.arrayPattern.exec(t)),
                (a = s.slice(1)),
                (i = a[0]),
                (r = a[1])),
              i in this.verifyCard && (e = this.verifyCard[i](e, o, r)),
              e
            );
          }),
          (e.prototype.readBlock = function (t) {
            var e, i, r, o, s, a, n;
            for (
              r = 80,
                o = t.length / r,
                o = o < this.maxLines ? o : this.maxLines,
                n = [],
                e = s = 0,
                a = o - 1;
              0 <= a ? s <= a : s >= a;
              e = 0 <= a ? ++s : --s
            )
              (i = t.slice(e * r, (e + 1) * r)), n.push(this.readLine(i));
            return n;
          }),
          (e.prototype.hasDataUnit = function () {
            return 0 !== this.get("NAXIS");
          }),
          (e.prototype.getDataLength = function () {
            var t, e, i, r, o;
            if (!this.hasDataUnit()) return 0;
            for (
              i = [], t = r = 1, o = this.get("NAXIS");
              1 <= o ? r <= o : r >= o;
              t = 1 <= o ? ++r : --r
            )
              i.push(this.get("NAXIS" + t));
            return (
              (e =
                (i.reduce(function (t, e) {
                  return t * e;
                }) *
                  Math.abs(this.get("BITPIX"))) /
                8),
              (e += this.get("PCOUNT"))
            );
          }),
          (e.prototype.getDataType = function () {
            switch (this.extensionType) {
              case "BINTABLE":
                return this.contains("ZIMAGE")
                  ? "CompressedImage"
                  : "BinaryTable";
              case "TABLE":
                return "Table";
              default:
                return this.hasDataUnit() ? "Image" : null;
            }
          }),
          (e.prototype.isPrimary = function () {
            return this.primary;
          }),
          (e.prototype.isExtension = function () {
            return this.extension;
          }),
          e
        );
      })(t)),
      (this.astro.FITS.Header = n),
      (c = {
        getExtent: function (t) {
          var e, i, r, o;
          for (e = t.length; e--; )
            if (((o = t[e]), !isNaN(o))) {
              r = i = o;
              break;
            }
          if (-1 === e) return [NaN, NaN];
          for (; e--; )
            (o = t[e]), isNaN(o) || (o < r && (r = o), o > i && (i = o));
          return [r, i];
        },
        getPixel: function (t, e, i) {
          return t[i * this.width + e];
        },
      }),
      (this.astro.FITS.ImageUtils = c),
      (h = (function (t) {
        function e(t, i) {
          var r, o, s, a, n, l, h;
          for (
            e.__super__.constructor.apply(this, arguments),
              a = t.get("NAXIS"),
              this.bitpix = t.get("BITPIX"),
              this.naxis = [],
              s = n = 1;
            1 <= a ? n <= a : n >= a;
            s = 1 <= a ? ++n : --n
          )
            this.naxis.push(t.get("NAXIS" + s));
          for (
            this.width = t.get("NAXIS1"),
              this.height = t.get("NAXIS2") || 1,
              this.depth = t.get("NAXIS3") || 1,
              this.bzero = t.get("BZERO") || 0,
              this.bscale = t.get("BSCALE") || 1,
              this.bytes = Math.abs(this.bitpix) / 8,
              this.length =
                (this.naxis.reduce(function (t, e) {
                  return t * e;
                }) *
                  Math.abs(this.bitpix)) /
                8,
              this.frame = 0,
              this.frameOffsets = [],
              this.frameLength = this.bytes * this.width * this.height,
              this.nBuffers = null != this.buffer ? 1 : 2,
              s = l = 0,
              h = this.depth - 1;
            0 <= h ? l <= h : l >= h;
            s = 0 <= h ? ++l : --l
          )
            (r = s * this.frameLength),
              (o = { begin: r }),
              null != this.buffer &&
                (o.buffers = [this.buffer.slice(r, r + this.frameLength)]),
              this.frameOffsets.push(o);
        }
        return (
          m(e, t),
          e.include(c),
          (e.prototype.allocationSize = 16777216),
          (e.prototype._getFrame = function (t, e, i, r) {
            var o, s, a, n, l, h, c;
            if (
              ((s = Math.abs(e) / 8),
              (n = a = t.byteLength / s),
              Math.abs(e),
              e > 0)
            ) {
              switch (e) {
                case 8:
                  (h = new Uint8Array(t)),
                    (h = new Uint16Array(h)),
                    (l = function (t) {
                      return t;
                    });
                  break;
                case 16:
                  (h = new Int16Array(t)),
                    (l = function (t) {
                      return ((255 & t) << 8) | ((t >> 8) & 255);
                    });
                  break;
                case 32:
                  (h = new Int32Array(t)),
                    (l = function (t) {
                      return (
                        ((255 & t) << 24) |
                        ((65280 & t) << 8) |
                        ((t >> 8) & 65280) |
                        ((t >> 24) & 255)
                      );
                    });
              }
              for (
                o =
                  parseInt(i) !== i || parseInt(r) !== r
                    ? new Float32Array(h.length)
                    : h;
                n--;

              )
                (h[n] = l(h[n])), (o[n] = i + r * h[n]);
            } else {
              for (
                o = new Uint32Array(t),
                  l = function (t) {
                    return (
                      ((255 & t) << 24) |
                      ((65280 & t) << 8) |
                      ((t >> 8) & 65280) |
                      ((t >> 24) & 255)
                    );
                  };
                a--;

              )
                (c = o[a]), (o[a] = l(c));
              for (o = new Float32Array(t); n--; ) o[n] = i + r * o[n];
            }
            return o;
          }),
          (e.prototype._getFrameAsync = function (t, e, i) {
            var r,
              o,
              s,
              a,
              n,
              l,
              h,
              c,
              u,
              p,
              d,
              f,
              v,
              g,
              m = this;
            (u = function (t) {
              var e, i, r, o, s, a, n;
              return (
                (a = t.data),
                (o = a.buffer),
                (i = a.bitpix),
                (s = a.bzero),
                (r = a.bscale),
                (n = a.url),
                importScripts(n),
                (e = _getFrame(o, i, s, r)),
                postMessage(e)
              );
            }),
              (a = u.toString().replace("return postMessage", "postMessage")),
              (a = "onmessage = " + a),
              (n = this._getFrame.toString()),
              (n = n.replace("function", "function _getFrame")),
              (h = "application/javascript"),
              (s = new Blob([a], { type: h })),
              (o = new Blob([n], { type: h })),
              (r = window.URL || window.webkitURL),
              (v = r.createObjectURL(s)),
              (f = r.createObjectURL(o)),
              (g = new Worker(v)),
              (c = {
                buffer: t[0],
                bitpix: this.bitpix,
                bzero: this.bzero,
                bscale: this.bscale,
                url: f,
              }),
              (l = 0),
              (p = null),
              (d = 0),
              (g.onmessage = function (o) {
                var s;
                return (
                  (s = o.data),
                  null == p && (p = new s.constructor(m.width * m.height)),
                  p.set(s, d),
                  (d += s.length),
                  (l += 1),
                  l === m.nBuffers
                    ? (m.invoke(e, i, p),
                      r.revokeObjectURL(v),
                      r.revokeObjectURL(f),
                      g.terminate())
                    : ((c.buffer = t[l]), g.postMessage(c, [t[l]]))
                );
              }),
              g.postMessage(c, [t[0]]);
          }),
          (e.prototype.getFrame = function (t, e, i) {
            var r,
              o,
              s,
              a,
              n,
              l,
              h,
              c,
              u,
              p,
              d,
              f,
              v = this;
            if (
              ((this.frame = t || this.frame),
              (l = this.frameOffsets[this.frame]),
              (a = l.buffers),
              (null != a ? a.length : void 0) === this.nBuffers)
            )
              return this._getFrameAsync(a, e, i);
            for (
              this.frameOffsets[this.frame].buffers = [],
                r = l.begin,
                o = this.blob.slice(r, r + this.frameLength),
                s = [],
                c = Math.floor(this.height / this.nBuffers),
                n = c * this.bytes * this.width,
                h = d = 0,
                f = this.nBuffers - 1;
              0 <= f ? d <= f : d >= f;
              h = 0 <= f ? ++d : --d
            )
              (p = h * n),
                h === this.nBuffers - 1
                  ? s.push(o.slice(p))
                  : s.push(o.slice(p, p + n));
            return (
              (a = []),
              (u = new FileReader()),
              (u.frame = this.frame),
              (h = 0),
              (u.onloadend = function (r) {
                var o;
                return (
                  (t = r.target.frame),
                  (o = r.target.result),
                  v.frameOffsets[t].buffers.push(o),
                  (h += 1),
                  h === v.nBuffers
                    ? v.getFrame(t, e, i)
                    : u.readAsArrayBuffer(s[h])
                );
              }),
              u.readAsArrayBuffer(s[0])
            );
          }),
          (e.prototype.getFrames = function (t, e, i, r) {
            var o,
              s = this;
            return (
              (o = function (r, a) {
                if ((s.invoke(i, a, r), (e -= 1), (t += 1), e))
                  return s.getFrame(t, o, a);
              }),
              this.getFrame(t, o, r)
            );
          }),
          (e.prototype.isDataCube = function () {
            return this.naxis.length > 2;
          }),
          e
        );
      })(r)),
      (this.astro.FITS.Image = h),
      (d = (function (t) {
        function e(t, i) {
          e.__super__.constructor.apply(this, arguments),
            (this.rowByteSize = t.get("NAXIS1")),
            (this.rows = t.get("NAXIS2")),
            (this.cols = t.get("TFIELDS")),
            (this.length = this.rowByteSize * this.rows),
            (this.heapLength = t.get("PCOUNT")),
            (this.columns = this.getColumns(t)),
            null != this.buffer
              ? ((this.rowsInMemory = this._rowsInMemoryBuffer),
                (this.heap = this.buffer.slice(
                  this.length,
                  this.length + this.heapLength
                )))
              : ((this.rowsInMemory = this._rowsInMemoryBlob),
                (this.firstRowInBuffer = this.lastRowInBuffer = 0),
                (this.nRowsInBuffer = Math.floor(
                  this.maxMemory / this.rowByteSize
                ))),
            (this.accessors = []),
            (this.descriptors = []),
            (this.elementByteLengths = []),
            this.setAccessors(t);
        }
        return (
          m(e, t),
          (e.prototype.maxMemory = 1048576),
          (e.prototype._rowsInMemoryBuffer = function () {
            return !0;
          }),
          (e.prototype._rowsInMemoryBlob = function (t, e) {
            return !(t < this.firstRowInBuffer) && !(e > this.lastRowInBuffer);
          }),
          (e.prototype.getColumns = function (t) {
            var e, i, r, o, s;
            for (
              e = [], i = o = 1, s = this.cols;
              1 <= s ? o <= s : o >= s;
              i = 1 <= s ? ++o : --o
            ) {
              if (((r = "TTYPE" + i), !t.contains(r))) return null;
              e.push(t.get(r));
            }
            return e;
          }),
          (e.prototype.getColumn = function (t, e, i) {
            var r,
              o,
              s,
              a,
              n,
              l,
              h,
              c,
              u,
              p,
              d = this;
            return null != this.blob
              ? ((c = this.columns.indexOf(t)),
                (a = this.descriptors[c]),
                (r = this.accessors[c]),
                this.elementByteLengths[c],
                (n = this.elementByteLengths.slice(0, c)),
                (n =
                  0 === n.length
                    ? 0
                    : n.reduce(function (t, e) {
                        return t + e;
                      })),
                (s =
                  null != this.typedArray[a]
                    ? new this.typedArray[a](this.rows)
                    : []),
                (p = ~~(this.maxMemory / this.rowByteSize)),
                (p = Math.min(p, this.rows)),
                (l = this.rows / p),
                (u = Math.floor(l) === l ? l : Math.floor(l) + 1),
                (h = 0),
                (c = 0),
                (o = function (t, i) {
                  var a, l, f, v;
                  for (
                    a = t.byteLength / d.rowByteSize,
                      v = new DataView(t),
                      l = n;
                    a--;

                  )
                    (s[h] = r(v, l)[0]), (h += 1), (l += d.rowByteSize);
                  if (((u -= 1), (c += 1), u))
                    return (f = c * p), d.getTableBuffer(f, p, o, i);
                  d.invoke(e, i, s);
                }),
                this.getTableBuffer(0, p, o, i))
              : ((o = function (i, r) {
                  return (
                    (s = i.map(function (e) {
                      return e[t];
                    })),
                    d.invoke(e, r, s)
                  );
                }),
                this.getRows(0, this.rows, o, i));
          }),
          (e.prototype.getTableBuffer = function (t, e, i, r) {
            var o,
              s,
              a,
              n,
              l = this;
            return (
              (e = Math.min(this.rows - t, e)),
              (o = t * this.rowByteSize),
              (a = o + e * this.rowByteSize),
              (s = this.blob.slice(o, a)),
              (n = new FileReader()),
              (n.row = t),
              (n.number = e),
              (n.onloadend = function (t) {
                return l.invoke(i, r, t.target.result);
              }),
              n.readAsArrayBuffer(s)
            );
          }),
          (e.prototype.getRows = function (t, e, i, r) {
            var o,
              s,
              a,
              n,
              l,
              h,
              c = this;
            return this.rowsInMemory(t, t + e)
              ? (null != this.blob
                  ? (a = this.buffer)
                  : ((o = t * this.rowByteSize),
                    (n = o + e * this.rowByteSize),
                    (a = this.buffer.slice(o, n))),
                (h = this._getRows(a, e)),
                this.invoke(i, r, h),
                h)
              : ((o = t * this.rowByteSize),
                (n =
                  o +
                  Math.max(
                    this.nRowsInBuffer * this.rowByteSize,
                    e * this.rowByteSize
                  )),
                (s = this.blob.slice(o, n)),
                (l = new FileReader()),
                (l.row = t),
                (l.number = e),
                (l.onloadend = function (o) {
                  var s;
                  return (
                    (s = o.target),
                    (c.buffer = s.result),
                    (c.firstRowInBuffer = c.lastRowInBuffer = s.row),
                    (c.lastRowInBuffer += s.number),
                    c.getRows(t, e, i, r)
                  );
                }),
                l.readAsArrayBuffer(s));
          }),
          e
        );
      })(r)),
      (this.astro.FITS.Tabular = d),
      (p = (function (t) {
        function e() {
          return (f = e.__super__.constructor.apply(this, arguments));
        }
        return (
          m(e, t),
          (e.prototype.dataAccessors = {
            A: function (t) {
              return t.trim();
            },
            I: function (t) {
              return parseInt(t);
            },
            F: function (t) {
              return parseFloat(t);
            },
            E: function (t) {
              return parseFloat(t);
            },
            D: function (t) {
              return parseFloat(t);
            },
          }),
          (e.prototype.setAccessors = function (t) {
            var e,
              i,
              r,
              o,
              s,
              a,
              n,
              l,
              h = this;
            for (
              s = /([AIFED])(\d+)\.*(\d+)*/, l = [], r = a = 1, n = this.cols;
              1 <= n ? a <= n : a >= n;
              r = 1 <= n ? ++a : --a
            )
              (i = t.get("TFORM" + r)),
                t.get("TTYPE" + r),
                (o = s.exec(i)),
                (e = o[1]),
                l.push(
                  (function (t) {
                    var e;
                    return (
                      (e = function (e) {
                        return h.dataAccessors[t](e);
                      }),
                      h.accessors.push(e)
                    );
                  })(e)
                );
            return l;
          }),
          (e.prototype._getRows = function (t) {
            var e, i, r, o, s, a, n, l, h, c, u, p, d, f, v, g, m, y, S;
            for (
              l = t.byteLength / this.rowByteSize,
                i = new Uint8Array(t),
                c = [],
                s = d = 0,
                y = l - 1;
              0 <= y ? d <= y : d >= y;
              s = 0 <= y ? ++d : --d
            ) {
              for (
                r = s * this.rowByteSize,
                  o = r + this.rowByteSize,
                  u = i.subarray(r, o),
                  n = "",
                  f = 0,
                  g = u.length;
                f < g;
                f++
              )
                (p = u[f]), (n += String.fromCharCode(p));
              for (
                n = n.trim().split(/\s+/),
                  h = {},
                  S = this.accessors,
                  a = v = 0,
                  m = S.length;
                v < m;
                a = ++v
              )
                (e = S[a]), (p = n[a]), (h[this.columns[a]] = e(p));
              c.push(h);
            }
            return c;
          }),
          e
        );
      })(d)),
      (this.astro.FITS.Table = p),
      (e = (function (t) {
        function e() {
          return (v = e.__super__.constructor.apply(this, arguments));
        }
        return (
          m(e, t),
          (e.prototype.typedArray = {
            B: Uint8Array,
            I: Uint16Array,
            J: Uint32Array,
            E: Float32Array,
            D: Float64Array,
            1: Uint8Array,
            2: Uint16Array,
            4: Uint32Array,
          }),
          (e.offsets = {
            L: 1,
            B: 1,
            I: 2,
            J: 4,
            K: 8,
            A: 1,
            E: 4,
            D: 8,
            C: 8,
            M: 16,
          }),
          (e.prototype.dataAccessors = {
            L: function (t, e) {
              var i, r;
              return (r = t.getInt8(e)), (e += 1), (i = 84 === r), [i, e];
            },
            B: function (t, e) {
              var i;
              return (i = t.getUint8(e)), (e += 1), [i, e];
            },
            I: function (t, e) {
              var i;
              return (i = t.getInt16(e)), (e += 2), [i, e];
            },
            J: function (t, e) {
              var i;
              return (i = t.getInt32(e)), (e += 4), [i, e];
            },
            K: function (t, e) {
              var i, r, o, s, a;
              return (
                (r = Math.abs(t.getInt32(e))),
                (e += 4),
                (o = Math.abs(t.getInt32(e))),
                (e += 4),
                (s = r % 10),
                (i = s ? -1 : 1),
                (r -= s),
                (a = i * ((r << 32) | o)),
                [a, e]
              );
            },
            A: function (t, e) {
              var i;
              return (
                (i = t.getUint8(e)),
                (i = String.fromCharCode(i)),
                (e += 1),
                [i, e]
              );
            },
            E: function (t, e) {
              var i;
              return (i = t.getFloat32(e)), (e += 4), [i, e];
            },
            D: function (t, e) {
              var i;
              return (i = t.getFloat64(e)), (e += 8), [i, e];
            },
            C: function (t, e) {
              var i, r, o;
              return (
                (r = t.getFloat32(e)),
                (e += 4),
                (o = t.getFloat32(e)),
                (e += 4),
                (i = [r, o]),
                [i, e]
              );
            },
            M: function (t, e) {
              var i, r, o;
              return (
                (r = t.getFloat64(e)),
                (e += 8),
                (o = t.getFloat64(e)),
                (e += 8),
                (i = [r, o]),
                [i, e]
              );
            },
          }),
          (e.prototype.toBits = function (t) {
            var e, i;
            for (e = [], i = 128; i >= 1; ) e.push(t & i ? 1 : 0), (i /= 2);
            return e;
          }),
          (e.prototype.getFromHeap = function (t, e, i) {
            var r, o, s, a, n;
            for (
              n = t.getInt32(e),
                e += 4,
                o = t.getInt32(e),
                e += 4,
                s = this.heap.slice(o, o + n),
                r = new this.typedArray[i](s),
                a = r.length;
              a--;

            )
              r[a] = this.constructor.swapEndian[i](r[a]);
            return [r, e];
          }),
          (e.prototype.setAccessors = function (t) {
            var e,
              i,
              r,
              s,
              a,
              n,
              l,
              h,
              c,
              u,
              p,
              d = this;
            for (
              l = /(\d*)([P|Q]*)([L|X|B|I|J|K|A|E|D|C|M]{1})/,
                p = [],
                s = c = 1,
                u = this.cols;
              1 <= u ? c <= u : c >= u;
              s = 1 <= u ? ++c : --c
            )
              (r = t.get("TFORM" + s)),
                (h = t.get("TTYPE" + s)),
                (n = l.exec(r)),
                (e = parseInt(n[1]) || 1),
                (a = n[2]),
                (i = n[3]),
                p.push(
                  (function (t, e) {
                    var i, r;
                    if (
                      (d.descriptors.push(t),
                      d.elementByteLengths.push(d.constructor.offsets[t] * e),
                      a)
                    )
                      switch (h) {
                        case "COMPRESSED_DATA":
                          i = function (e, i) {
                            var r, s, a;
                            return (
                              (a = d.getFromHeap(e, i, t)),
                              (r = a[0]),
                              (i = a[1]),
                              (s = new d.typedArray[
                                d.algorithmParameters.BYTEPIX
                              ](d.ztile[0])),
                              o.Rice(
                                r,
                                d.algorithmParameters.BLOCKSIZE,
                                d.algorithmParameters.BYTEPIX,
                                s,
                                d.ztile[0],
                                o.RiceSetup
                              ),
                              [s, i]
                            );
                          };
                          break;
                        case "GZIP_COMPRESSED_DATA":
                          i = function (t, e) {
                            var i;
                            for (
                              i = new Float32Array(d.width), s = i.length;
                              s--;

                            )
                              i[s] = NaN;
                            return [i, e];
                          };
                          break;
                        default:
                          i = function (e, i) {
                            return d.getFromHeap(e, i, t);
                          };
                      }
                    else
                      1 === e
                        ? (i = function (e, i) {
                            var r, o;
                            return (
                              (o = d.dataAccessors[t](e, i)),
                              (r = o[0]),
                              (i = o[1]),
                              [r, i]
                            );
                          })
                        : "X" === t
                        ? ((r = Math.log(e) / Math.log(2)),
                          (i = function (t, i) {
                            var o, s, a, n, l, h, c;
                            for (
                              a = t.buffer.slice(i, i + r),
                                l = new Uint8Array(a),
                                s = [],
                                h = 0,
                                c = l.length;
                              h < c;
                              h++
                            )
                              (n = l[h]), (o = d.toBits(n)), (s = s.concat(o));
                            return (
                              (i += r), [s.slice(0, +(e - 1) + 1 || 9e9), i]
                            );
                          }))
                        : (i =
                            "A" === t
                              ? function (t, i) {
                                  var r, o, s, a, n, l;
                                  for (
                                    o = t.buffer.slice(i, i + e),
                                      r = new Uint8Array(o),
                                      s = "",
                                      n = 0,
                                      l = r.length;
                                    n < l;
                                    n++
                                  )
                                    (a = r[n]), (s += String.fromCharCode(a));
                                  return (s = s.trim()), (i += e), [s, i];
                                }
                              : function (i, r) {
                                  var o, a, n;
                                  for (s = e, o = []; s--; )
                                    (n = d.dataAccessors[t](i, r)),
                                      (a = n[0]),
                                      (r = n[1]),
                                      o.push(a);
                                  return [o, r];
                                });
                    return d.accessors.push(i);
                  })(i, e)
                );
            return p;
          }),
          (e.prototype._getRows = function (t, e) {
            var i, r, o, s, a, n, l, h, c, u, p;
            for (l = new DataView(t), o = 0, a = []; e--; ) {
              for (
                s = {}, u = this.accessors, r = h = 0, c = u.length;
                h < c;
                r = ++h
              )
                (i = u[r]),
                  (p = i(l, o)),
                  (n = p[0]),
                  (o = p[1]),
                  (s[this.columns[r]] = n);
              a.push(s);
            }
            return a;
          }),
          e
        );
      })(d)),
      (this.astro.FITS.BinaryTable = e),
      (o = {
        RiceSetup: {
          1: function (t) {
            var e, i, r, o;
            return (o = 1), (e = 3), (i = 6), (r = t[0]), [e, i, r, o];
          },
          2: function (t) {
            var e, i, r, o, s;
            return (
              (s = 2),
              (i = 4),
              (r = 14),
              (o = 0),
              (e = t[0]),
              (o |= e << 8),
              (e = t[1]),
              (o |= e),
              [i, r, o, s]
            );
          },
          4: function (t) {
            var e, i, r, o, s;
            return (
              (s = 4),
              (i = 5),
              (r = 25),
              (o = 0),
              (e = t[0]),
              (o |= e << 24),
              (e = t[1]),
              (o |= e << 16),
              (e = t[2]),
              (o |= e << 8),
              (e = t[3]),
              (o |= e),
              [i, r, o, s]
            );
          },
        },
        Rice: function (t, e, i, r, o, s) {
          var a, n, l, h, c, u, p, d, f, v, g, m, y, S, w, C;
          for (
            n = 1 << c,
              w = s[i](t),
              c = w[0],
              u = w[1],
              v = w[2],
              S = w[3],
              m = new Uint8Array(256),
              y = 8,
              C = [128, 255],
              f = C[0],
              p = C[1];
            p >= 0;

          ) {
            for (; p >= f; ) (m[p] = y), (p -= 1);
            (f /= 2), (y -= 1);
          }
          for (m[0] = 0, a = t[S++], g = 8, p = 0; p < o; ) {
            for (g -= c; g < 0; ) (a = (a << 8) | t[S++]), (g += 8);
            if (
              ((h = (a >> g) - 1),
              (a &= (1 << g) - 1),
              (d = p + e),
              d > o && (d = o),
              h < 0)
            )
              for (; p < d; ) (r[p] = v), (p += 1);
            else if (h === u)
              for (; p < d; ) {
                for (f = n - g, l = a << f, f -= 8; f >= 0; )
                  (a = t[S++]), (l |= a << f), (f -= 8);
                g > 0
                  ? ((a = t[S++]), (l |= a >> -f), (a &= (1 << g) - 1))
                  : (a = 0),
                  0 == (1 & l) ? (l >>= 1) : (l = ~(l >> 1)),
                  (r[p] = l + v),
                  (v = r[p]),
                  p++;
              }
            else
              for (; p < d; ) {
                for (; 0 === a; ) (g += 8), (a = t[S++]);
                for (y = g - m[a], g -= y + 1, a ^= 1 << g, g -= h; g < 0; )
                  (a = (a << 8) | t[S++]), (g += 8);
                (l = (y << h) | (a >> g)),
                  (a &= (1 << g) - 1),
                  0 == (1 & l) ? (l >>= 1) : (l = ~(l >> 1)),
                  (r[p] = l + v),
                  (v = r[p]),
                  p++;
              }
          }
          return r;
        },
      }),
      (this.astro.FITS.Decompress = o),
      (i = (function (t) {
        function e(t, i) {
          var r, o, s, a, n, l;
          for (
            e.__super__.constructor.apply(this, arguments),
              this.zcmptype = t.get("ZCMPTYPE"),
              this.zbitpix = t.get("ZBITPIX"),
              this.znaxis = t.get("ZNAXIS"),
              this.zblank = t.get("ZBLANK"),
              this.blank = t.get("BLANK"),
              this.zdither = t.get("ZDITHER0") || 0,
              this.ztile = [],
              r = n = 1,
              l = this.znaxis;
            1 <= l ? n <= l : n >= l;
            r = 1 <= l ? ++n : --n
          )
            (a = t.contains("ZTILE" + r)
              ? t.get("ZTILE" + r)
              : 1 === r
              ? t.get("ZNAXIS1")
              : 1),
              this.ztile.push(a);
          for (
            this.width = t.get("ZNAXIS1"),
              this.height = t.get("ZNAXIS2") || 1,
              this.algorithmParameters = {},
              "RICE_1" === this.zcmptype &&
                ((this.algorithmParameters.BLOCKSIZE = 32),
                (this.algorithmParameters.BYTEPIX = 4)),
              r = 1;
            ;

          ) {
            if (((o = "ZNAME" + r), !t.contains(o))) break;
            (s = "ZVAL" + r),
              (this.algorithmParameters[t.get(o)] = t.get(s)),
              (r += 1);
          }
          (this.zmaskcmp = t.get("ZMASKCMP")),
            (this.zquantiz = t.get("ZQUANTIZ") || "LINEAR_SCALING"),
            (this.bzero = t.get("BZERO") || 0),
            (this.bscale = t.get("BSCALE") || 1);
        }
        return (
          m(e, t),
          e.include(c),
          e.extend(o),
          (e.randomGenerator = function () {
            var t, e, i, r, o, s, a;
            for (
              t = 16807,
                i = 2147483647,
                o = 1,
                r = new Float32Array(1e4),
                e = a = 0;
              a <= 9999;
              e = ++a
            )
              (s = t * o), (o = s - i * parseInt(s / i)), (r[e] = o / i);
            return r;
          }),
          (e.randomSequence = e.randomGenerator()),
          (e.prototype._getRows = function (t, e) {
            var i,
              r,
              o,
              s,
              a,
              n,
              l,
              h,
              c,
              u,
              p,
              d,
              f,
              v,
              g,
              m,
              y,
              S,
              w,
              C,
              x,
              _;
            for (
              g = new DataView(t),
                l = 0,
                r = new Float32Array(this.width * this.height);
              e--;

            ) {
              for (
                u = {}, x = this.accessors, a = y = 0, w = x.length;
                y < w;
                a = ++y
              )
                (i = x[a]),
                  (_ = i(g, l)),
                  (v = _[0]),
                  (l = _[1]),
                  (u[this.columns[a]] = v);
              for (
                o =
                  u.COMPRESSED_DATA ||
                  u.UNCOMPRESSED_DATA ||
                  u.GZIP_COMPRESSED_DATA,
                  u.ZBLANK || this.zblank,
                  p = u.ZSCALE || this.bscale,
                  m = u.ZZERO || this.bzero,
                  n = this.height - e,
                  d = n + this.zdither - 1,
                  f = (d - 1) % 1e4,
                  c = parseInt(500 * this.constructor.randomSequence[f]),
                  a = S = 0,
                  C = o.length;
                S < C;
                a = ++S
              )
                (v = o[a]),
                  (s = (n - 1) * this.width + a),
                  -2147483647 === v
                    ? (r[s] = NaN)
                    : -2147483646 === v
                    ? (r[s] = 0)
                    : ((h = this.constructor.randomSequence[c]),
                      (r[s] = (v - h + 0.5) * p + m)),
                  1e4 === (c += 1) &&
                    ((f = (f + 1) % 1e4),
                    (c = parseInt(500 * this.randomSequence[f])));
            }
            return r;
          }),
          (e.prototype.getFrame = function (t, e, i) {
            var r,
              o,
              s = this;
            return this.heap
              ? ((this.frame = t || this.frame),
                this.getRows(0, this.rows, e, i))
              : ((r = this.blob.slice(
                  this.length,
                  this.length + this.heapLength
                )),
                (o = new FileReader()),
                (o.onloadend = function (r) {
                  return (s.heap = r.target.result), s.getFrame(t, e, i);
                }),
                o.readAsArrayBuffer(r));
          }),
          e
        );
      })(e)),
      (this.astro.FITS.CompressedImage = i),
      (a = (function () {
        function t(t, e) {
          (this.header = t), (this.data = e);
        }
        return (
          (t.prototype.hasData = function () {
            return null != this.data;
          }),
          t
        );
      })()),
      (this.astro.FITS.HDU = a);
  }.call(this),
  (MOC = (function () {
    function t(t) {
      return Math.log(t) / Math.LN2;
    }
    (MOC = function (t) {
      (this.order = void 0),
        (this.type = "moc"),
        (t = t || {}),
        (this.name = t.name || "MOC"),
        (this.color = t.color || Color.getNextColor()),
        (this.opacity = t.opacity || 1),
        (this.opacity = Math.max(0, Math.min(1, this.opacity))),
        (this.lineWidth = t.lineWidth || 1),
        (this.adaptativeDisplay = !1 !== t.adaptativeDisplay),
        (this.proxyCalled = !1),
        (this._highResIndexOrder3 = new Array(768)),
        (this._lowResIndexOrder3 = new Array(768));
      for (var e = 0; e < 768; e++)
        (this._highResIndexOrder3[e] = {}), (this._lowResIndexOrder3[e] = {});
      (this.nbCellsDeepestLevel = 0), (this.isShowing = !0), (this.ready = !1);
    }),
      (MOC.MAX_NORDER = 13),
      (MOC.LOWRES_MAXORDER = 6),
      (MOC.HIGHRES_MAXORDER = 11),
      (MOC.PIVOT_FOV = 30),
      (MOC.prototype._removeDuplicatesFromIndexes = function () {
        for (var t, e, r = 0; r < 768; r++) {
          for (var o in this._highResIndexOrder3[r])
            (t = this._highResIndexOrder3[r][o]),
              (e = i(t)),
              (this._highResIndexOrder3[r][o] = e);
          for (var o in this._lowResIndexOrder3[r])
            (t = this._lowResIndexOrder3[r][o]),
              (e = i(t)),
              (this._lowResIndexOrder3[r][o] = e);
        }
      }),
      (MOC.prototype._addPix = function (t, e) {
        var i = Math.floor(e * Math.pow(4, 3 - t));
        if (t <= MOC.LOWRES_MAXORDER)
          t in this._lowResIndexOrder3[i] ||
            ((this._lowResIndexOrder3[i][t] = []),
            (this._highResIndexOrder3[i][t] = [])),
            this._lowResIndexOrder3[i][t].push(e),
            this._highResIndexOrder3[i][t].push(e);
        else if (t <= MOC.HIGHRES_MAXORDER) {
          t in this._highResIndexOrder3[i] ||
            (this._highResIndexOrder3[i][t] = []),
            this._highResIndexOrder3[i][t].push(e);
          var r = MOC.LOWRES_MAXORDER,
            o = Math.floor(e / Math.pow(4, t - r)),
            s = Math.floor(o * Math.pow(4, 3 - r));
          r in this._lowResIndexOrder3[s] ||
            (this._lowResIndexOrder3[s][r] = []),
            this._lowResIndexOrder3[s][r].push(o);
        } else {
          var r = MOC.LOWRES_MAXORDER,
            o = Math.floor(e / Math.pow(4, t - r)),
            s = Math.floor(o * Math.pow(4, 3 - r));
          r in this._lowResIndexOrder3[s] ||
            (this._lowResIndexOrder3[s][r] = []),
            this._lowResIndexOrder3[s][r].push(o),
            (r = MOC.HIGHRES_MAXORDER),
            (o = Math.floor(e / Math.pow(4, t - r)));
          var s = Math.floor(o * Math.pow(4, 3 - r));
          r in this._highResIndexOrder3[s] ||
            (this._highResIndexOrder3[s][r] = []),
            this._highResIndexOrder3[s][r].push(o);
        }
        this.nbCellsDeepestLevel += Math.pow(4, this.order - t);
      }),
      (MOC.prototype.skyFraction = function () {
        return this.nbCellsDeepestLevel / (12 * Math.pow(4, this.order));
      }),
      (MOC.prototype.dataFromJSON = function (t) {
        var e, i;
        for (var r in t)
          if (t.hasOwnProperty(r)) {
            (e = parseInt(r)),
              (void 0 === this.order || e > this.order) && (this.order = e);
            for (var o = 0; o < t[r].length; o++)
              (i = t[r][o]), this._addPix(e, i);
          }
        this.reportChange(), (this.ready = !0);
      }),
      (MOC.prototype.dataFromFITSURL = function (e, i) {
        var r = this,
          o = function () {
            var e;
            try {
              if (0 == this.hdus.length) {
                if (!0 !== r.proxyCalled) {
                  r.proxyCalled = !0;
                  var s =
                    Aladin.JSONP_PROXY +
                    "?url=" +
                    encodeURIComponent(r.dataURL);
                  new astro.FITS(s, o);
                }
                return;
              }
              e = this.getHeader(0);
            } catch (t) {
              return void console.error("Could not get header of extension #0");
            }
            var a = this.getHeader(1);
            if (e.contains("HPXMOC")) r.order = e.get("HPXMOC");
            else if (e.contains("MOCORDER")) r.order = e.get("MOCORDER");
            else if (a.contains("HPXMOC")) r.order = a.get("HPXMOC");
            else {
              if (!a.contains("MOCORDER"))
                return void console.error(
                  "Can not find MOC order in FITS file"
                );
              r.order = a.get("MOCORDER");
            }
            var n = this.getDataUnit(1),
              l = n.columns[0];
            n.getRows(0, n.rows, function (e) {
              for (var i = 0; i < e.length; i++) {
                var o = e[i][l],
                  s = Math.floor(Math.floor(t(Math.floor(o / 4))) / 2),
                  a = o - 4 * Math.pow(4, s);
                r._addPix(s, a);
              }
            }),
              (n = null),
              r._removeDuplicatesFromIndexes(),
              i && i(),
              r.reportChange(),
              (r.ready = !0);
          };
        (this.dataURL = e), new astro.FITS(this.dataURL, o);
      }),
      (MOC.prototype.setView = function (t) {
        (this.view = t), this.reportChange();
      }),
      (MOC.prototype.draw = function (t, e, i, r, o, s, a, n) {
        if (this.isShowing && this.ready) {
          var l =
            n > MOC.PIVOT_FOV && this.adaptativeDisplay
              ? this._lowResIndexOrder3
              : this._highResIndexOrder3;
          this._drawCells(t, l, n, e, i, CooFrameEnum.J2000, r, o, s, a);
        }
      }),
      (MOC.prototype._drawCells = function (t, i, r, s, a, n, l, h, c, u) {
        (t.lineWidth = this.lineWidth),
          1 == this.opacity
            ? (t.strokeStyle = this.color)
            : ((t.fillStyle = this.color), (t.globalAlpha = this.opacity)),
          t.beginPath();
        for (var p = [], d = 0; d < 768; d++) {
          var f = i[d];
          for (key in f) p.push(parseInt(key));
        }
        p.sort(function (t, e) {
          return t - e;
        });
        for (
          var v,
            g,
            m,
            y = p[p.length - 1],
            S = this.view.getVisiblePixList(3, CooFrameEnum.J2000),
            w = [],
            d = 0;
          d < S.length;
          d++
        ) {
          var m = S[d];
          (g = o(8, m, a, n, l, h, c, u, s)), g && w.push(m);
        }
        for (var f, C = 0; C <= y; C++) {
          v = 1 << C;
          for (var x = 0; x < w.length; x++) {
            if (((f = i[w[x]]), void 0 !== f[C]))
              if (C <= 3)
                for (var _ = 0; _ < f[C].length; _++) {
                  m = f[C][_];
                  for (var b = Math.pow(4, 3 - C), I = m * b, d = 0; d < b; d++)
                    (norder3Ipix = I + d),
                      (g = o(8, norder3Ipix, a, n, l, h, c, u, s)) && e(t, g);
                }
              else
                for (var _ = 0; _ < f[C].length; _++) {
                  m = f[C][_];
                  Math.floor(m / Math.pow(4, C - 3));
                  (g = o(v, m, a, n, l, h, c, u, s)), g && e(t, g);
                }
          }
        }
        1 == this.opacity ? t.stroke() : (t.fill(), (t.globalAlpha = 1));
      });
    var e = function (t, e) {
        t.moveTo(e[0].vx, e[0].vy),
          t.lineTo(e[1].vx, e[1].vy),
          t.lineTo(e[2].vx, e[2].vy),
          t.lineTo(e[3].vx, e[3].vy),
          t.lineTo(e[0].vx, e[0].vy);
      },
      i = function (t) {
        for (var e = {}, i = [], r = t.length, o = 0, s = 0; s < r; s++) {
          var a = t[s];
          1 !== e[a] && ((e[a] = 1), (i[o++] = a));
        }
        return i;
      },
      r = new SpatialVector(),
      o = function (t, e, i, o, s, a, n, l, h) {
        for (
          var c = [], u = [], p = r, d = HealpixCache.corners_nest(e, t), f = 0;
          f < 4;
          f++
        ) {
          if ((p.setXYZ(d[f].x, d[f].y, d[f].z), o && o.system != i.system)) {
            if (o.system == CooFrameEnum.SYSTEMS.J2000) {
              var v = CooConversion.J2000ToGalactic([p.ra(), p.dec()]);
              (lon = v[0]), (lat = v[1]);
            } else if (o.system == CooFrameEnum.SYSTEMS.GAL) {
              var v = CooConversion.GalacticToJ2000([p.ra(), p.dec()]);
              (lon = v[0]), (lat = v[1]);
            }
          } else (lon = p.ra()), (lat = p.dec());
          u[f] = h.project(lon, lat);
        }
        if (null == u[0] || null == u[1] || null == u[2] || null == u[3])
          return null;
        for (var f = 0; f < 4; f++)
          c[f] = AladinUtils.xyToView(u[f].X, u[f].Y, s, a, n, l);
        return c[0].vx < 0 && c[1].vx < 0 && c[2].vx < 0 && c[3].vx < 0
          ? null
          : c[0].vy < 0 && c[1].vy < 0 && c[2].vy < 0 && c[3].vy < 0
          ? null
          : c[0].vx >= s && c[1].vx >= s && c[2].vx >= s && c[3].vx >= s
          ? null
          : c[0].vy >= a && c[1].vy >= a && c[2].vy >= a && c[3].vy >= a
          ? null
          : (c = AladinUtils.grow2(c, 1));
      };
    return (
      (MOC.prototype.reportChange = function () {
        this.view && this.view.requestRedraw();
      }),
      (MOC.prototype.show = function () {
        this.isShowing || ((this.isShowing = !0), this.reportChange());
      }),
      (MOC.prototype.hide = function () {
        this.isShowing && ((this.isShowing = !1), this.reportChange());
      }),
      (MOC.prototype.contains = function (t, e) {
        var i = new HealpixIndex(Math.pow(2, this.order));
        i.init();
        for (
          var r = Utils.radecToPolar(t, e),
            o = i.ang2pix_nest(r.theta, r.phi),
            s = {},
            a = 0;
          a <= this.order;
          a++
        )
          s[a] = Math.floor(o / Math.pow(4, this.order - a));
        for (var n = 0; n < 768; n++) {
          var l = this._highResIndexOrder3[n];
          for (var h in l)
            if (h < 3)
              for (var c = l[h].length; c >= 0; c--)
                if (s[h] == l[h][c]) return !0;
        }
        var n = s[3],
          l = this._highResIndexOrder3[n];
        for (var h in l)
          for (var c = l[h].length; c >= 0; c--) if (s[h] == l[h][c]) return !0;
        return !1;
      }),
      MOC
    );
  })()),
  (CooGrid = (function () {
    function t(t, e, i, r, o, s, a) {
      var n,
        l = AladinUtils.viewToXy(e, i, r, o, s, a);
      try {
        n = t.unproject(l.x, l.y);
      } catch (t) {
        return null;
      }
      return { lon: n.ra, lat: n.dec };
    }
    var e = function () {};
    return (
      (e.prototype.redraw = function (e, i, r, o, s, a, n, l) {
        if (!(l > 60)) {
          var h = 0,
            c = 359.9999,
            u = -90,
            p = 90,
            d = t(i, 0, 0, o, s, a, n),
            f = t(i, o - 1, s - 1, o, s, a, n);
          (c = Math.min(d.lon, f.lon)),
            (h = Math.max(d.lon, f.lon)),
            (p = Math.min(d.lat, f.lat)),
            (u = Math.max(d.lat, f.lat));
          var v = t(i, 0, s - 1, o, s, a, n);
          (c = Math.min(c, v.lon)),
            (h = Math.max(h, v.lon)),
            (p = Math.min(p, v.lat)),
            (u = Math.max(u, v.lat));
          var g = t(i, o - 1, 0, o, s, a, n);
          (c = Math.min(c, g.lon)),
            (h = Math.max(h, g.lon)),
            (p = Math.min(p, g.lat)),
            (u = Math.max(u, g.lat));
          var m,
            y,
            S = h - c,
            w = u - p;
          l > 10
            ? ((m = 4), (y = 4))
            : l > 1
            ? ((m = 1), (y = 1))
            : l > 0.1
            ? ((m = 0.1), (y = 0.1))
            : ((m = 0.01), (y = 0.01));
          var C = Math.round(c % m) * m,
            x = Math.round(p % y) * y;
          (e.lineWidth = 1), (e.strokeStyle = "rgb(120,120,255)");
          for (var _ = x; _ < u + y; _ += y) {
            e.beginPath();
            var b;
            if (
              (b = AladinUtils.radecToViewXy(
                c,
                _,
                i,
                CooFrameEnum.J2000,
                o,
                s,
                a,
                n
              ))
            ) {
              e.moveTo(b.vx, b.vy);
              for (var I = 0, M = c; M < h + m; M += S / 10)
                I++,
                  (b = AladinUtils.radecToViewXy(
                    M,
                    _,
                    i,
                    CooFrameEnum.J2000,
                    o,
                    s,
                    a,
                    n
                  )),
                  e.lineTo(b.vx, b.vy),
                  3 == I && e.strokeText(_.toFixed(2), b.vx, b.vy - 2);
              e.stroke();
            }
          }
          for (var M = C; M < h + m; M += m) {
            e.beginPath();
            var b;
            if (
              (b = AladinUtils.radecToViewXy(
                M,
                p,
                i,
                CooFrameEnum.J2000,
                o,
                s,
                a,
                n
              ))
            ) {
              e.moveTo(b.vx, b.vy);
              for (var I = 0, _ = p; _ < u + y; _ += w / 10)
                I++,
                  (b = AladinUtils.radecToViewXy(
                    M,
                    _,
                    i,
                    CooFrameEnum.J2000,
                    o,
                    s,
                    a,
                    n
                  )),
                  e.lineTo(b.vx, b.vy),
                  3 == I && e.strokeText(M.toFixed(2), b.vx, b.vy - 2);
              e.stroke();
            }
          }
        }
      }),
      e
    );
  })()),
  (Footprint = (function () {
    return (
      (Footprint = function (t) {
        (this.polygons = t),
          (this.overlay = null),
          (this.id = "footprint-" + Utils.uuidv4()),
          (this.isShowing = !0),
          (this.isSelected = !1);
      }),
      (Footprint.prototype.setOverlay = function (t) {
        this.overlay = t;
      }),
      (Footprint.prototype.show = function () {
        this.isShowing ||
          ((this.isShowing = !0), this.overlay && this.overlay.reportChange());
      }),
      (Footprint.prototype.hide = function () {
        this.isShowing &&
          ((this.isShowing = !1), this.overlay && this.overlay.reportChange());
      }),
      (Footprint.prototype.dispatchClickEvent = function () {
        this.overlay &&
          this.overlay.view.aladinDiv.dispatchEvent(
            new CustomEvent("footprintClicked", {
              detail: { footprintId: this.id, overlayName: this.overlay.name },
            })
          );
      }),
      (Footprint.prototype.select = function () {
        this.isSelected ||
          ((this.isSelected = !0), this.overlay && this.overlay.reportChange());
      }),
      (Footprint.prototype.deselect = function () {
        this.isSelected &&
          ((this.isSelected = !1), this.overlay && this.overlay.reportChange());
      }),
      Footprint
    );
  })()),
  (Popup = (function () {
    return (
      (Popup = function (t, e) {
        (this.domEl = $(
          '<div class="aladin-popup-container"><div class="aladin-popup"><a class="aladin-closeBtn">&times;</a><div class="aladin-popupTitle"></div><div class="aladin-popupText"></div></div><div class="aladin-popup-arrow"></div></div>'
        )),
          this.domEl.appendTo(t),
          (this.view = e);
        var i = this;
        this.domEl.find(".aladin-closeBtn").click(function () {
          i.hide();
        });
      }),
      (Popup.prototype.hide = function () {
        this.domEl.hide(),
          (this.view.mustClearCatalog = !0),
          this.view.catalogForPopup.hide();
      }),
      (Popup.prototype.show = function () {
        this.domEl.show();
      }),
      (Popup.prototype.setTitle = function (t) {
        this.domEl.find(".aladin-popupTitle").html(t || "");
      }),
      (Popup.prototype.setText = function (t) {
        this.domEl.find(".aladin-popupText").html(t || ""),
          (this.w = this.domEl.outerWidth()),
          (this.h = this.domEl.outerHeight());
      }),
      (Popup.prototype.setSource = function (t) {
        this.source && (this.source.popup = null),
          (t.popup = this),
          (this.source = t),
          this.setPosition(t.x, t.y);
      }),
      (Popup.prototype.setPosition = function (t, e) {
        var i = t - this.w / 2,
          r = e - this.h;
        this.source && (r += this.source.catalog.sourceSize / 2),
          (this.domEl[0].style.left = i + "px"),
          (this.domEl[0].style.top = r + "px");
      }),
      Popup
    );
  })()),
  (Circle = (function () {
    return (
      (Circle = function (t, e, i) {
        (i = i || {}),
          (this.color = i.color || void 0),
          (this.id = "circle-" + Utils.uuidv4()),
          this.setCenter(t),
          this.setRadius(e),
          (this.overlay = null),
          (this.isShowing = !0),
          (this.isSelected = !1);
      }),
      (Circle.prototype.setOverlay = function (t) {
        this.overlay = t;
      }),
      (Circle.prototype.show = function () {
        this.isShowing ||
          ((this.isShowing = !0), this.overlay && this.overlay.reportChange());
      }),
      (Circle.prototype.hide = function () {
        this.isShowing &&
          ((this.isShowing = !1), this.overlay && this.overlay.reportChange());
      }),
      (Circle.prototype.dispatchClickEvent = function () {
        this.overlay &&
          this.overlay.view.aladinDiv.dispatchEvent(
            new CustomEvent("footprintClicked", {
              detail: { footprintId: this.id, overlayName: this.overlay.name },
            })
          );
      }),
      (Circle.prototype.select = function () {
        this.isSelected ||
          ((this.isSelected = !0), this.overlay && this.overlay.reportChange());
      }),
      (Circle.prototype.deselect = function () {
        this.isSelected &&
          ((this.isSelected = !1), this.overlay && this.overlay.reportChange());
      }),
      (Circle.prototype.setCenter = function (t) {
        (this.centerRaDec = t), this.overlay && this.overlay.reportChange();
      }),
      (Circle.prototype.setRadius = function (t) {
        (this.radiusDegrees = t), this.overlay && this.overlay.reportChange();
      }),
      (Circle.prototype.draw = function (t, e, i, r, o, s, a, n) {
        if (this.isShowing) {
          n = !0 === n || !1;
          var l;
          if (i.system != CooFrameEnum.SYSTEMS.J2000) {
            var h = CooConversion.J2000ToGalactic([
              this.centerRaDec[0],
              this.centerRaDec[1],
            ]);
            l = e.project(h[0], h[1]);
          } else l = e.project(this.centerRaDec[0], this.centerRaDec[1]);
          if (l) {
            var c,
              u = AladinUtils.xyToView(l.X, l.Y, r, o, s, a, !1),
              p = this.centerRaDec[0],
              d =
                this.centerRaDec[1] +
                (p > 0 ? -this.radiusDegrees : this.radiusDegrees);
            if (i.system != CooFrameEnum.SYSTEMS.J2000) {
              var h = CooConversion.J2000ToGalactic([p, d]);
              c = e.project(h[0], h[1]);
            } else c = e.project(p, d);
            if (c) {
              var f = AladinUtils.xyToView(c.X, c.Y, r, o, s, a, !1),
                v = f.vx - u.vx,
                g = f.vy - u.vy,
                m = Math.sqrt(v * v + g * g),
                y = this.color;
              !y && this.overlay && (y = this.overlay.color),
                y || (y = "#ff0000"),
                this.isSelected
                  ? (t.strokeStyle = Overlay.increaseBrightness(y, 50))
                  : (t.strokeStyle = y),
                t.beginPath(),
                t.arc(u.vx, u.vy, m, 0, 2 * Math.PI, !1),
                n || t.stroke();
            }
          }
        }
      }),
      Circle
    );
  })()),
  (Polyline = (function () {
    return (
      (Polyline = function (t, e) {
        (e = e || {}),
          (this.color = e.color || "white"),
          (this.lineWidth = e.lineWidth || 2),
          (this.radecArray = t),
          (this.overlay = null),
          (this.isShowing = !0),
          (this.isSelected = !1);
      }),
      (Polyline.prototype.setOverlay = function (t) {
        this.overlay = t;
      }),
      (Polyline.prototype.show = function () {
        this.isShowing ||
          ((this.isShowing = !0), this.overlay && this.overlay.reportChange());
      }),
      (Polyline.prototype.hide = function () {
        this.isShowing &&
          ((this.isShowing = !1), this.overlay && this.overlay.reportChange());
      }),
      (Polyline.prototype.select = function () {
        this.isSelected ||
          ((this.isSelected = !0), this.overlay && this.overlay.reportChange());
      }),
      (Polyline.prototype.deselect = function () {
        this.isSelected &&
          ((this.isSelected = !1), this.overlay && this.overlay.reportChange());
      }),
      (Polyline.prototype.setLineWidth = function (t) {
        this.lineWidth != t &&
          ((this.lineWidth = t), this.overlay.reportChange());
      }),
      (Polyline.prototype.setColor = function (t) {
        this.color != t && ((this.color = t), this.overlay.reportChange());
      }),
      (Polyline.prototype.draw = function (t, e, i, r, o, s, a) {
        if (
          this.isShowing &&
          this.radecArray &&
          !(this.radecArray.length < 2)
        ) {
          this.color && (t.strokeStyle = this.color);
          for (
            var n = AladinUtils.radecToViewXy(
                this.radecArray[0][0],
                this.radecArray[0][1],
                e,
                i,
                r,
                o,
                s,
                a
              ),
              l = 0;
            l < this.radecArray.length &&
            !(n = AladinUtils.radecToViewXy(
              this.radecArray[l][0],
              this.radecArray[l][1],
              e,
              i,
              r,
              o,
              s,
              a
            ));
            l++
          );
          if (n) {
            t.moveTo(n.vx, n.vy);
            for (var h, c = !1, u = !0, l = 1; l < this.radecArray.length; l++)
              (h = AladinUtils.radecToViewXy(
                this.radecArray[l][0],
                this.radecArray[l][1],
                e,
                i,
                r,
                o,
                s,
                a
              )),
                h
                  ? c
                    ? ((u = !0),
                      t.beginPath(),
                      (t.lineWidth = this.lineWidth),
                      t.moveTo(h.vx, h.vy),
                      (c = !1))
                    : t.lineTo(h.vx, h.vy)
                  : (u && t.stroke(), (u = !1), (c = !0));
            t.stroke();
          }
        }
      }),
      Polyline
    );
  })()),
  (Overlay = (function () {
    return (
      (Overlay = function (t) {
        (t = t || {}),
          (this.type = "overlay"),
          (this.name = t.name || "overlay"),
          (this.color = t.color || Color.getNextColor()),
          (this.lineWidth = t.lineWidth || 2),
          (this.overlays = []),
          (this.overlay_items = []),
          (this.isShowing = !0);
      }),
      (Overlay.prototype.show = function () {
        this.isShowing || ((this.isShowing = !0), this.reportChange());
      }),
      (Overlay.prototype.hide = function () {
        this.isShowing && ((this.isShowing = !1), this.reportChange());
      }),
      (Overlay.parseSTCS = function (t) {
        for (var e = [], i = t.match(/\S+/g), r = 0, o = i.length; r < o; ) {
          var s = i[r].toLowerCase();
          if ("polygon" == s) {
            var a = [];
            if (
              (r++,
              "icrs" == (h = i[r].toLowerCase()) || "j2000" == h || "fk5" == h)
            ) {
              for (; r + 2 < o; ) {
                var n = parseFloat(i[r + 1]);
                if (isNaN(n)) break;
                var l = parseFloat(i[r + 2]);
                a.push([n, l]), (r += 2);
              }
              a.push(a[0]), e.push(new Footprint(a));
            }
          } else if ("circle" == s) {
            var h;
            if (
              (r++,
              "icrs" == (h = i[r].toLowerCase()) || "j2000" == h || "fk5" == h)
            ) {
              var n, l, c;
              (n = parseFloat(i[r + 1])),
                (l = parseFloat(i[r + 2])),
                (c = parseFloat(i[r + 3])),
                e.push(A.circle(n, l, c)),
                (r += 3);
            }
          }
          r++;
        }
        return e;
      }),
      (Overlay.prototype.addFootprints = function (t) {
        for (var e = 0, i = t.length; e < i; e++) this.add(t[e], !1);
        this.view.requestRedraw();
      }),
      (Overlay.prototype.add = function (t, e) {
        (e = void 0 === e || e),
          t instanceof Footprint
            ? this.overlays.push(t)
            : this.overlay_items.push(t),
          t.setOverlay(this),
          e && this.view.requestRedraw();
      }),
      (Overlay.prototype.getFootprint = function (t) {
        return t < this.footprints.length ? this.footprints[t] : null;
      }),
      (Overlay.prototype.setView = function (t) {
        this.view = t;
      }),
      (Overlay.prototype.removeAll = function () {
        (this.overlays = []), (this.overlay_items = []);
      }),
      (Overlay.prototype.draw = function (t, e, i, r, o, s, a) {
        if (this.isShowing) {
          (t.strokeStyle = this.color),
            (t.lineWidth = this.lineWidth),
            t.beginPath(),
            (xyviews = []);
          for (var n = 0, l = this.overlays.length; n < l; n++)
            xyviews.push(
              this.drawFootprint(this.overlays[n], t, e, i, r, o, s, a)
            );
          t.stroke(),
            (t.strokeStyle = Overlay.increaseBrightness(this.color, 50)),
            t.beginPath();
          for (var n = 0, l = this.overlays.length; n < l; n++)
            this.overlays[n].isSelected &&
              this.drawFootprintSelected(t, xyviews[n]);
          t.stroke();
          for (var n = 0; n < this.overlay_items.length; n++)
            this.overlay_items[n].draw(t, e, i, r, o, s, a);
        }
      }),
      (Overlay.increaseBrightness = function (t, e) {
        (t = t.replace(/^\s*#|\s*$/g, "")),
          3 == t.length && (t = t.replace(/(.)/g, "$1$1"));
        var i = parseInt(t.substr(0, 2), 16),
          r = parseInt(t.substr(2, 2), 16),
          o = parseInt(t.substr(4, 2), 16);
        return (
          "#" +
          (0 | (256 + i + ((256 - i) * e) / 100)).toString(16).substr(1) +
          (0 | (256 + r + ((256 - r) * e) / 100)).toString(16).substr(1) +
          (0 | (256 + o + ((256 - o) * e) / 100)).toString(16).substr(1)
        );
      }),
      (Overlay.prototype.drawFootprint = function (t, e, i, r, o, s, a, n) {
        if (!t.isShowing) return null;
        for (
          var l = [], h = !1, c = t.polygons, u = 0, p = c.length;
          u < p;
          u++
        ) {
          var d;
          if (r.system != CooFrameEnum.SYSTEMS.J2000) {
            var f = CooConversion.J2000ToGalactic([c[u][0], c[u][1]]);
            d = i.project(f[0], f[1]);
          } else d = i.project(c[u][0], c[u][1]);
          if (!d) return null;
          var v = AladinUtils.xyToView(d.X, d.Y, o, s, a, n);
          l.push(v),
            !h && v.vx < o && v.vx >= 0 && v.vy <= s && v.vy >= 0 && (h = !0);
        }
        if (h) {
          e.moveTo(l[0].vx, l[0].vy);
          for (var u = 1, p = l.length; u < p; u++) e.lineTo(l[u].vx, l[u].vy);
        }
        return l;
      }),
      (Overlay.prototype.drawFootprintSelected = function (t, e) {
        if (e) {
          var i = e;
          t.moveTo(i[0].vx, i[0].vy);
          for (var r = 1, o = i.length; r < o; r++) t.lineTo(i[r].vx, i[r].vy);
        }
      }),
      (Overlay.prototype.reportChange = function () {
        this.view.requestRedraw();
      }),
      Overlay
    );
  })()),
  (cds.Source = (function () {
    return (
      (cds.Source = function (t, e, i, r) {
        (this.ra = t),
          (this.dec = e),
          (this.data = i),
          (this.catalog = null),
          (this.marker = (r && r.marker) || !1),
          this.marker &&
            ((this.popupTitle = r && r.popupTitle ? r.popupTitle : ""),
            (this.popupDesc = r && r.popupDesc ? r.popupDesc : ""),
            (this.useMarkerDefaultIcon =
              !r ||
              void 0 === r.useMarkerDefaultIcon ||
              r.useMarkerDefaultIcon)),
          (this.isShowing = !0),
          (this.isSelected = !1);
      }),
      (cds.Source.prototype.setCatalog = function (t) {
        this.catalog = t;
      }),
      (cds.Source.prototype.show = function () {
        this.isShowing ||
          ((this.isShowing = !0), this.catalog && this.catalog.reportChange());
      }),
      (cds.Source.prototype.hide = function () {
        this.isShowing &&
          ((this.isShowing = !1), this.catalog && this.catalog.reportChange());
      }),
      (cds.Source.prototype.select = function () {
        this.isSelected ||
          ((this.isSelected = !0), this.catalog && this.catalog.reportChange());
      }),
      (cds.Source.prototype.deselect = function () {
        this.isSelected &&
          ((this.isSelected = !1), this.catalog && this.catalog.reportChange());
      }),
      (cds.Source.prototype.actionClicked = function () {
        if (this.catalog && this.catalog.onClick) {
          var t = this.catalog.view;
          if ("showTable" == this.catalog.onClick)
            t.aladin.measurementTable.showMeasurement(this), this.select();
          else if ("showPopup" == this.catalog.onClick) {
            t.popup.setTitle("<br><br>");
            var e = '<div class="aladin-marker-measurement">';
            e += "<table>";
            for (var i in this.data)
              e += "<tr><td>" + i + "</td><td>" + this.data[i] + "</td></tr>";
            (e += "</table>"),
              (e += "</div>"),
              t.popup.setText(e),
              t.popup.setSource(this),
              t.popup.show();
          } else
            "function" == typeof this.catalog.onClick &&
              (this.catalog.onClick(this), (t.lastClickedObject = this));
        }
      }),
      (cds.Source.prototype.actionOtherObjectClicked = function () {
        this.catalog && this.catalog.onClick && this.deselect();
      }),
      cds.Source
    );
  })()),
  (cds.Catalog = (function () {
    function t(t, e, i) {
      var r, o;
      if (((r = o = null), e))
        for (var s = 0, a = t.length; s < a; s++) {
          var n = t[s];
          if (Utils.isInt(e) && e < t.length) {
            r = e;
            break;
          }
          if ((n.ID && n.ID === e) || (n.name && n.name === e)) {
            r = s;
            break;
          }
        }
      if (i)
        for (var s = 0, a = t.length; s < a; s++) {
          var n = t[s];
          if (Utils.isInt(i) && i < t.length) {
            o = i;
            break;
          }
          if ((n.ID && n.ID === i) || (n.name && n.name === i)) {
            o = s;
            break;
          }
        }
      for (var s = 0, a = t.length; s < a && (null == r || null == o); s++) {
        var n = t[s];
        if (!r && n.ucd) {
          var l = $.trim(n.ucd.toLowerCase());
          if (0 == l.indexOf("pos.eq.ra") || 0 == l.indexOf("pos_eq_ra")) {
            r = s;
            continue;
          }
        }
        if (!o && n.ucd) {
          var l = $.trim(n.ucd.toLowerCase());
          if (0 == l.indexOf("pos.eq.dec") || 0 == l.indexOf("pos_eq_dec")) {
            o = s;
            continue;
          }
        }
      }
      if (null == r && null == o)
        for (var s = 0, a = t.length; s < a; s++) {
          var n = t[s],
            h = n.name || n.ID || "";
          (h = h.toLowerCase()),
            r ||
            (0 != h.indexOf("ra") &&
              0 != h.indexOf("_ra") &&
              0 != h.indexOf("ra(icrs)") &&
              0 != h.indexOf("_ra") &&
              0 != h.indexOf("alpha"))
              ? o ||
                (0 != h.indexOf("dej2000") &&
                  0 != h.indexOf("_dej2000") &&
                  0 != h.indexOf("de") &&
                  0 != h.indexOf("de(icrs)") &&
                  0 != h.indexOf("_de") &&
                  0 != h.indexOf("delta")) ||
                (o = s)
              : (r = s);
        }
      return (null != r && null != o) || ((r = 0), (o = 1)), [r, o];
    }
    return (
      (cds.Catalog = function (t) {
        (t = t || {}),
          (this.type = "catalog"),
          (this.name = t.name || "catalog"),
          (this.color = t.color || Color.getNextColor()),
          (this.sourceSize = t.sourceSize || 8),
          (this.markerSize = t.sourceSize || 12),
          (this.shape = t.shape || "square"),
          (this.maxNbSources = t.limit || void 0),
          (this.onClick = t.onClick || void 0),
          (this.raField = t.raField || void 0),
          (this.decField = t.decField || void 0),
          (this.indexationNorder = 5),
          (this.sources = []),
          (this.hpxIdx = new HealpixIndex(this.indexationNorder)),
          this.hpxIdx.init(),
          (this.displayLabel = t.displayLabel || !1),
          (this.labelColor = t.labelColor || this.color),
          (this.labelFont = t.labelFont || "10px sans-serif"),
          this.displayLabel &&
            ((this.labelColumn = t.labelColumn),
            this.labelColumn || (this.displayLabel = !1)),
          (this.shape instanceof Image ||
            this.shape instanceof HTMLCanvasElement) &&
            (this.sourceSize = this.shape.width),
          (this._shapeIsFunction = !1),
          $.isFunction(this.shape) && (this._shapeIsFunction = !0),
          (this.selectionColor = "#00ff00"),
          this.updateShape(t),
          (this.cacheMarkerCanvas = document.createElement("canvas")),
          (this.cacheMarkerCanvas.width = this.markerSize),
          (this.cacheMarkerCanvas.height = this.markerSize);
        var e = this.cacheMarkerCanvas.getContext("2d");
        (e.fillStyle = this.color), e.beginPath();
        var i = this.markerSize / 2;
        e.arc(i, i, i - 2, 0, 2 * Math.PI, !1),
          e.fill(),
          (e.lineWidth = 2),
          (e.strokeStyle = "#ccc"),
          e.stroke(),
          (this.isShowing = !0);
      }),
      (cds.Catalog.createShape = function (t, e, i) {
        if (t instanceof Image || t instanceof HTMLCanvasElement) return t;
        var r = document.createElement("canvas");
        r.width = r.height = i;
        var o = r.getContext("2d");
        return (
          o.beginPath(),
          (o.strokeStyle = e),
          (o.lineWidth = 2),
          "plus" == t
            ? (o.moveTo(i / 2, 0),
              o.lineTo(i / 2, i),
              o.stroke(),
              o.moveTo(0, i / 2),
              o.lineTo(i, i / 2),
              o.stroke())
            : "cross" == t
            ? (o.moveTo(0, 0),
              o.lineTo(i - 1, i - 1),
              o.stroke(),
              o.moveTo(i - 1, 0),
              o.lineTo(0, i - 1),
              o.stroke())
            : "rhomb" == t
            ? (o.moveTo(i / 2, 0),
              o.lineTo(0, i / 2),
              o.lineTo(i / 2, i),
              o.lineTo(i, i / 2),
              o.lineTo(i / 2, 0),
              o.stroke())
            : "triangle" == t
            ? (o.moveTo(i / 2, 0),
              o.lineTo(0, i - 1),
              o.lineTo(i - 1, i - 1),
              o.lineTo(i / 2, 0),
              o.stroke())
            : "circle" == t
            ? (o.arc(i / 2, i / 2, i / 2 - 1, 0, 2 * Math.PI, !0), o.stroke())
            : (o.moveTo(1, 0),
              o.lineTo(1, i - 1),
              o.lineTo(i - 1, i - 1),
              o.lineTo(i - 1, 1),
              o.lineTo(1, 1),
              o.stroke()),
          r
        );
      }),
      (cds.Catalog.parseVOTable = function (e, i, r, o, s, a) {
        function n(t) {
          var e;
          if (t.find("RESOURCE").length > 0) e = "";
          else {
            if (((e = t.find("*").first()), 0 == e.length)) return "";
            e = e.prop("tagName");
            var i = e.indexOf(":");
            e = e.substring(0, i) + "\\:";
          }
          return e;
        }
        function l(e, i) {
          e = e.replace(/^\s+/g, "");
          var o = [
              "name",
              "ID",
              "ucd",
              "utype",
              "unit",
              "datatype",
              "arraysize",
              "width",
              "precision",
            ],
            l = [],
            h = 0,
            c = $($.parseXML(e)),
            u = n(c);
          c.find(u + "FIELD").each(function () {
            for (var t = {}, e = 0; e < o.length; e++) {
              var i = o[e];
              $(this).attr(i) && (t[i] = $(this).attr(i));
            }
            t.ID || (t.ID = "col_" + h), l.push(t), h++;
          });
          var p,
            d,
            f = t(l, s, a);
          (p = f[0]), (d = f[1]);
          var v,
            g,
            m = [],
            y = new Coo();
          c.find(u + "TR").each(function () {
            var t = {},
              e = 0;
            $(this)
              .find(u + "TD")
              .each(function () {
                var i = l[e].name ? l[e].name : l[e].id;
                (t[i] = $(this).text()), e++;
              });
            var i = l[p].name ? l[p].name : l[p].id,
              o = l[d].name ? l[d].name : l[d].id;
            if (
              (Utils.isNumber(t[i]) && Utils.isNumber(t[o])
                ? ((v = parseFloat(t[i])), (g = parseFloat(t[o])))
                : (y.parse(t[i] + " " + t[o]), (v = y.lon), (g = y.lat)),
              m.push(new cds.Source(v, g, t)),
              r && m.length == r)
            )
              return !1;
          }),
            i && i(m);
        }
        Utils.getAjaxObject(e, "GET", "text", o).done(function (t) {
          l(t, i);
        });
      }),
      (cds.Catalog.prototype.updateShape = function (t) {
        (t = t || {}),
          (this.color = t.color || this.color || Color.getNextColor()),
          (this.sourceSize = t.sourceSize || this.sourceSize || 6),
          (this.shape = t.shape || this.shape || "square"),
          (this.selectSize = this.sourceSize + 2),
          (this.cacheCanvas = cds.Catalog.createShape(
            this.shape,
            this.color,
            this.sourceSize
          )),
          (this.cacheSelectCanvas = cds.Catalog.createShape(
            "square",
            this.selectionColor,
            this.selectSize
          )),
          this.reportChange();
      }),
      (cds.Catalog.prototype.addSources = function (t) {
        (t = [].concat(t)), (this.sources = this.sources.concat(t));
        for (var e = 0, i = t.length; e < i; e++) t[e].setCatalog(this);
        this.reportChange();
      }),
      (cds.Catalog.prototype.addSourcesAsArray = function (e, i) {
        for (var r = [], o = 0; o < e.length; o++) r.push({ name: e[o] });
        var s,
          a,
          n = t(r, this.raField, this.decField);
        (s = n[0]), (a = n[1]);
        for (var l, h, c, u, p = [], d = new Coo(), f = 0; f < i.length; f++) {
          (c = i[f]),
            Utils.isNumber(c[s]) && Utils.isNumber(c[a])
              ? ((l = parseFloat(c[s])), (h = parseFloat(c[a])))
              : (d.parse(c[s] + " " + c[a]), (l = d.lon), (h = d.lat)),
            (u = {});
          for (var o = 0; o < e.length; o++) u[e[o]] = c[o];
          p.push(A.source(l, h, u));
        }
        this.addSources(p);
      }),
      (cds.Catalog.prototype.getSources = function () {
        return this.sources;
      }),
      (cds.Catalog.prototype.selectAll = function () {
        if (this.sources)
          for (var t = 0; t < this.sources.length; t++)
            this.sources[t].select();
      }),
      (cds.Catalog.prototype.deselectAll = function () {
        if (this.sources)
          for (var t = 0; t < this.sources.length; t++)
            this.sources[t].deselect();
      }),
      (cds.Catalog.prototype.getSource = function (t) {
        return t < this.sources.length ? this.sources[t] : null;
      }),
      (cds.Catalog.prototype.setView = function (t) {
        (this.view = t), this.reportChange();
      }),
      (cds.Catalog.prototype.remove = function (t) {
        var e = this.sources.indexOf(t);
        e < 0 ||
          (this.sources[e].deselect(),
          this.sources.splice(e, 1),
          this.reportChange());
      }),
      (cds.Catalog.prototype.removeAll = cds.Catalog.prototype.clear = function () {
        this.sources = [];
      }),
      (cds.Catalog.prototype.draw = function (t, e, i, r, o, s, a) {
        if (this.isShowing) {
          this._shapeIsFunction && t.save();
          for (var n = [], l = 0, h = this.sources.length; l < h; l++) {
            cds.Catalog.drawSource(
              this,
              this.sources[l],
              t,
              e,
              i,
              r,
              o,
              s,
              a
            ) && n.push(this.sources[l]);
          }
          this._shapeIsFunction && t.restore(),
            (t.strokeStyle = this.selectionColor);
          for (var c, l = 0, h = n.length; l < h; l++)
            (c = n[l]),
              c.isSelected && cds.Catalog.drawSourceSelection(this, c, t);
          if (this.displayLabel) {
            (t.fillStyle = this.labelColor), (t.font = this.labelFont);
            for (var l = 0, h = n.length; l < h; l++)
              cds.Catalog.drawSourceLabel(this, n[l], t);
          }
        }
      }),
      (cds.Catalog.drawSource = function (t, e, i, r, o, s, a, n, l) {
        if (!e.isShowing) return !1;
        var h,
          c = t.sourceSize;
        if (o.system != CooFrameEnum.SYSTEMS.J2000) {
          var u = CooConversion.J2000ToGalactic([e.ra, e.dec]);
          h = r.project(u[0], u[1]);
        } else h = r.project(e.ra, e.dec);
        if (h) {
          var p = AladinUtils.xyToView(h.X, h.Y, s, a, n, l, !0),
            d = e.popup ? 100 : e.sourceSize;
          if (p) {
            if (p.vx > s + d || p.vx < 0 - d || p.vy > a + d || p.vy < 0 - d)
              return (e.x = e.y = void 0), !1;
            (e.x = p.vx),
              (e.y = p.vy),
              t._shapeIsFunction
                ? t.shape(e, i, t.view.getViewParams())
                : e.marker && e.useMarkerDefaultIcon
                ? i.drawImage(t.cacheMarkerCanvas, e.x - c / 2, e.y - c / 2)
                : i.drawImage(
                    t.cacheCanvas,
                    e.x - t.cacheCanvas.width / 2,
                    e.y - t.cacheCanvas.height / 2
                  ),
              e.popup && e.popup.setPosition(e.x, e.y);
          }
          return !0;
        }
        return !1;
      }),
      (cds.Catalog.drawSourceSelection = function (t, e, i) {
        if (e && e.isShowing && e.x && e.y) {
          var r = t.selectSize;
          i.drawImage(t.cacheSelectCanvas, e.x - r / 2, e.y - r / 2);
        }
      }),
      (cds.Catalog.drawSourceLabel = function (t, e, i) {
        if (e && e.isShowing && e.x && e.y) {
          var r = e.data[t.labelColumn];
          r && i.fillText(r, e.x, e.y);
        }
      }),
      (cds.Catalog.prototype.reportChange = function () {
        this.view && this.view.requestRedraw();
      }),
      (cds.Catalog.prototype.show = function () {
        this.isShowing || ((this.isShowing = !0), this.reportChange());
      }),
      (cds.Catalog.prototype.hide = function () {
        this.isShowing &&
          ((this.isShowing = !1),
          this.view &&
            this.view.popup &&
            this.view.popup.source &&
            this.view.popup.source.catalog == this &&
            this.view.popup.hide(),
          this.reportChange());
      }),
      cds.Catalog
    );
  })()),
  (ProgressiveCat = (function () {
    function t(t, e) {
      var i = [
          "name",
          "ID",
          "ucd",
          "utype",
          "unit",
          "datatype",
          "arraysize",
          "width",
          "precision",
        ],
        r = [],
        o = 0;
      return (
        (t.keyRa = t.keyDec = null),
        $(e)
          .find("FIELD")
          .each(function () {
            for (var e = {}, s = 0; s < i.length; s++) {
              var a = i[s];
              $(this).attr(a) && (e[a] = $(this).attr(a));
            }
            e.ID || (e.ID = "col_" + o),
              t.keyRa ||
                !e.ucd ||
                (0 != e.ucd.indexOf("pos.eq.ra") &&
                  0 != e.ucd.indexOf("POS_EQ_RA")) ||
                (e.name ? (t.keyRa = e.name) : (t.keyRa = e.ID)),
              t.keyDec ||
                !e.ucd ||
                (0 != e.ucd.indexOf("pos.eq.dec") &&
                  0 != e.ucd.indexOf("POS_EQ_DEC")) ||
                (e.name ? (t.keyDec = e.name) : (t.keyDec = e.ID)),
              r.push(e),
              o++;
          }),
        r
      );
    }
    function e(t, e, i) {
      if (!t.keyRa || !t.keyDec) return [];
      lines = e.split("\n");
      for (var r = [], o = 0; o < i.length; o++)
        i[o].name ? r.push(i[o].name) : r.push(i[o].ID);
      for (var s, a = [], n = new Coo(), l = 2; l < lines.length; l++) {
        var h = {},
          c = lines[l].split("\t");
        if (!(c.length < r.length)) {
          for (var u = 0; u < r.length; u++) h[r[u]] = c[u];
          var p, d;
          Utils.isNumber(h[t.keyRa]) && Utils.isNumber(h[t.keyDec])
            ? ((p = parseFloat(h[t.keyRa])), (d = parseFloat(h[t.keyDec])))
            : (n.parse(h[t.keyRa] + " " + h[t.keyDec]),
              (p = n.lon),
              (d = n.lat)),
            (s = new cds.Source(p, d, h)),
            a.push(s),
            s.setCatalog(t);
        }
      }
      return a;
    }
    return (
      (ProgressiveCat = function (t, e, i, r) {
        (r = r || {}),
          (this.type = "progressivecat"),
          (this.rootUrl = t),
          Utils.isHttpsContext() &&
            (/u-strasbg.fr/i.test(this.rootUrl) ||
              /unistra.fr/i.test(this.rootUrl)) &&
            (this.rootUrl = this.rootUrl.replace("http://", "https://")),
          (this.frameStr = e),
          (this.frame = CooFrameEnum.fromString(e) || CooFrameEnum.J2000),
          (this.maxOrder = i),
          (this.isShowing = !0),
          (this.name = r.name || "progressive-cat"),
          (this.color = r.color || Color.getNextColor()),
          (this.shape = r.shape || "square"),
          (this.sourceSize = r.sourceSize || 6),
          (this.selectSize = this.sourceSize + 2),
          (this.selectionColor = "#00ff00"),
          (this.filterFn = r.filter || void 0),
          (this.onClick = r.onClick || void 0),
          (this.sourcesCache = new Utils.LRUCache(100)),
          this.updateShape(r),
          (this.maxOrderAllsky = 2),
          (this.isReady = !1);
      }),
      (ProgressiveCat.readProperties = function (t, e, i) {
        if (e) {
          var r = t + "/properties";
          $.ajax({
            url: r,
            method: "GET",
            dataType: "text",
            success: function (t) {
              for (var i = {}, r = t.split("\n"), o = 0; o < r.length; o++) {
                var s = r[o],
                  a = s.indexOf("="),
                  n = $.trim(s.substring(0, a)),
                  l = $.trim(s.substring(a + 1));
                i[n] = l;
              }
              e(i);
            },
            error: function (t) {
              i && i(t);
            },
          });
        }
      }),
      (ProgressiveCat.prototype = {
        init: function (t) {
          var e = this;
          (this.view = t),
            this.maxOrder && this.frameStr
              ? this._loadMetadata()
              : ProgressiveCat.readProperties(
                  e.rootUrl,
                  function (t) {
                    (e.properties = t),
                      (e.maxOrder = e.properties.hips_order),
                      (e.frame = CooFrameEnum.fromString(
                        e.properties.hips_frame
                      )),
                      e._loadMetadata();
                  },
                  function (t) {
                    console.log(
                      "Could not find properties for HiPS " + e.rootUrl
                    );
                  }
                );
        },
        updateShape: cds.Catalog.prototype.updateShape,
        _loadMetadata: function () {
          var e = this;
          $.ajax({
            url: e.rootUrl + "/Metadata.xml",
            method: "GET",
            success: function (i) {
              (e.fields = t(e, i)), e._loadAllskyNewMethod();
            },
            error: function (t) {
              e._loadAllskyOldMethod();
            },
          });
        },
        _loadAllskyNewMethod: function () {
          var t = this;
          $.ajax({
            url: t.rootUrl + "/Norder1/Allsky.tsv",
            method: "GET",
            success: function (i) {
              (t.order1Sources = e(t, i, t.fields)),
                t.order2Sources && ((t.isReady = !0), t._finishInitWhenReady());
            },
            error: function (t) {
              console.log("Something went wrong: " + t);
            },
          }),
            $.ajax({
              url: t.rootUrl + "/Norder2/Allsky.tsv",
              method: "GET",
              success: function (i) {
                (t.order2Sources = e(t, i, t.fields)),
                  t.order1Sources &&
                    ((t.isReady = !0), t._finishInitWhenReady());
              },
              error: function (t) {
                console.log("Something went wrong: " + t);
              },
            });
        },
        _loadAllskyOldMethod: function () {
          (this.maxOrderAllsky = 3),
            this._loadLevel2Sources(),
            this._loadLevel3Sources();
        },
        _loadLevel2Sources: function () {
          var i = this;
          $.ajax({
            url: i.rootUrl + "/Norder2/Allsky.xml",
            method: "GET",
            success: function (r) {
              (i.fields = t(i, r)),
                (i.order2Sources = e(i, $(r).find("CSV").text(), i.fields)),
                i.order3Sources && ((i.isReady = !0), i._finishInitWhenReady());
            },
            error: function (t) {
              console.log("Something went wrong: " + t);
            },
          });
        },
        _loadLevel3Sources: function () {
          var t = this;
          $.ajax({
            url: t.rootUrl + "/Norder3/Allsky.xml",
            method: "GET",
            success: function (i) {
              (t.order3Sources = e(t, $(i).find("CSV").text(), t.fields)),
                t.order2Sources && ((t.isReady = !0), t._finishInitWhenReady());
            },
            error: function (t) {
              console.log("Something went wrong: " + t);
            },
          });
        },
        _finishInitWhenReady: function () {
          this.view.requestRedraw(), this.loadNeededTiles();
        },
        draw: function (t, e, i, r, o, s, a) {
          if (
            this.isShowing &&
            this.isReady &&
            (this.drawSources(this.order1Sources, t, e, i, r, o, s, a),
            this.drawSources(this.order2Sources, t, e, i, r, o, s, a),
            this.drawSources(this.order3Sources, t, e, i, r, o, s, a),
            this.tilesInView)
          )
            for (var n, l, h, c = 0; c < this.tilesInView.length; c++)
              (h = this.tilesInView[c]),
                (l = h[0] + "-" + h[1]),
                (n = this.sourcesCache.get(l)) &&
                  this.drawSources(n, t, e, i, r, o, s, a);
        },
        drawSources: function (t, e, i, r, o, s, a, n) {
          if (t) {
            for (var l, h = 0, c = t.length; h < c; h++)
              (l = t[h]),
                (this.filterFn && !this.filterFn(l)) ||
                  cds.Catalog.drawSource(this, l, e, i, r, o, s, a, n);
            for (var h = 0, c = t.length; h < c; h++)
              (l = t[h]),
                l.isSelected &&
                  ((this.filterFn && !this.filterFn(l)) ||
                    cds.Catalog.drawSourceSelection(this, l, e));
          }
        },
        getSources: function () {
          var t = [];
          if (
            (this.order1Sources && (t = t.concat(this.order1Sources)),
            this.order2Sources && (t = t.concat(this.order2Sources)),
            this.order3Sources && (t = t.concat(this.order3Sources)),
            this.tilesInView)
          )
            for (var e, i, r, o = 0; o < this.tilesInView.length; o++)
              (r = this.tilesInView[o]),
                (i = r[0] + "-" + r[1]),
                (e = this.sourcesCache.get(i)) && (t = t.concat(e));
          return t;
        },
        deselectAll: function () {
          if (this.order1Sources)
            for (var t = 0; t < this.order1Sources.length; t++)
              this.order1Sources[t].deselect();
          if (this.order2Sources)
            for (var t = 0; t < this.order2Sources.length; t++)
              this.order2Sources[t].deselect();
          if (this.order3Sources)
            for (var t = 0; t < this.order3Sources.length; t++)
              this.order3Sources[t].deselect();
          var e = this.sourcesCache.keys();
          for (key in e)
            if (this.sourcesCache[key])
              for (var i = this.sourcesCache[key], t = 0; t < i.length; t++)
                i[t].deselect();
        },
        show: function () {
          this.isShowing ||
            ((this.isShowing = !0),
            this.loadNeededTiles(),
            this.reportChange());
        },
        hide: function () {
          this.isShowing && ((this.isShowing = !1), this.reportChange());
        },
        reportChange: function () {
          this.view.requestRedraw();
        },
        getTileURL: function (t, e) {
          var i = 1e4 * Math.floor(e / 1e4);
          return (
            this.rootUrl + "/Norder" + t + "/Dir" + i + "/Npix" + e + ".tsv"
          );
        },
        loadNeededTiles: function () {
          if (this.isShowing) {
            this.tilesInView = [];
            var t = this.view.realNorder;
            if (
              (t > this.maxOrder && (t = this.maxOrder),
              !(t <= this.maxOrderAllsky))
            ) {
              for (
                var i, r, o = this.view.getVisibleCells(t, this.frame), s = 3;
                s <= t;
                s++
              ) {
                i = [];
                for (var a = 0; a < o.length; a++)
                  (r = Math.floor(o[a].ipix / Math.pow(4, t - s))),
                    i.indexOf(r) < 0 && i.push(r);
                for (var n = 0; n < i.length; n++)
                  this.tilesInView.push([s, i[n]]);
              }
              for (var l, h, a = 0; a < this.tilesInView.length; a++)
                (l = this.tilesInView[a]),
                  (h = l[0] + "-" + l[1]),
                  this.sourcesCache.get(h) ||
                    (function (t, i, r) {
                      var o = i + "-" + r;
                      $.ajax({
                        url: t.getTileURL(i, r),
                        method: "GET",
                        success: function (i) {
                          t.sourcesCache.set(o, e(t, i, t.fields)),
                            t.view.requestRedraw();
                        },
                        error: function () {
                          t.sourcesCache.set(o, []);
                        },
                      });
                    })(this, l[0], l[1]);
            }
          }
        },
        reportChange: function () {
          this.view && this.view.requestRedraw();
        },
      }),
      ProgressiveCat
    );
  })()),
  (Tile = (function () {
    function t(t, e) {
      (this.img = t), (this.url = e);
    }
    return (
      (t.isImageOk = function (t) {
        return (
          !!t.allSkyTexture ||
          (!!t.src &&
            !!t.complete &&
            (void 0 === t.naturalWidth || 0 != t.naturalWidth))
        );
      }),
      t
    );
  })()),
  (TileBuffer = (function () {
    function t() {
      (this.pointer = 0),
        (this.tilesMap = {}),
        (this.tilesArray = new Array(e));
      for (var t = 0; t < e; t++)
        this.tilesArray[t] = new Tile(new Image(), null);
    }
    var e = 800;
    return (
      (t.prototype.addTile = function (t) {
        if (this.getTile(t)) return null;
        var i = this.tilesArray[this.pointer];
        return (
          null != i.url && ((i.img.src = null), delete this.tilesMap[i.url]),
          (this.tilesArray[this.pointer].url = t),
          (this.tilesMap[t] = this.tilesArray[this.pointer]),
          this.pointer++,
          this.pointer >= e && (this.pointer = 0),
          this.tilesMap[t]
        );
      }),
      (t.prototype.getTile = function (t) {
        return this.tilesMap[t];
      }),
      t
    );
  })()),
  (ColorMap = (function () {
    return (
      (ColorMap = function (t) {
        (this.view = t),
          (this.reversed = !1),
          (this.mapName = "native"),
          (this.sig = this.signature());
      }),
      (ColorMap.MAPS = {}),
      (ColorMap.MAPS.eosb = {
        name: "Eos B",
        r: [
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          9,
          18,
          27,
          36,
          45,
          49,
          57,
          72,
          81,
          91,
          100,
          109,
          118,
          127,
          136,
          131,
          139,
          163,
          173,
          182,
          191,
          200,
          209,
          218,
          227,
          213,
          221,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          229,
          229,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          229,
          229,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          229,
          229,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          229,
          229,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          229,
          229,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          229,
          229,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          229,
          229,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          229,
          229,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          229,
          229,
          255,
          253,
          251,
          249,
          247,
          245,
          243,
          241,
          215,
          214,
          235,
          234,
          232,
          230,
          228,
          226,
          224,
          222,
          198,
          196,
          216,
          215,
          213,
          211,
          209,
          207,
          205,
          203,
          181,
          179,
          197,
          196,
          194,
          192,
          190,
          188,
          186,
          184,
          164,
          162,
          178,
          176,
          175,
          173,
          171,
          169,
          167,
          165,
          147,
          145,
          159,
          157,
          156,
          154,
          152,
          150,
          148,
          146,
          130,
          128,
          140,
          138,
          137,
          135,
          133,
          131,
          129,
          127,
          113,
          111,
          121,
          119,
          117,
          117,
        ],
        g: [
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          7,
          15,
          23,
          31,
          39,
          47,
          55,
          57,
          64,
          79,
          87,
          95,
          103,
          111,
          119,
          127,
          135,
          129,
          136,
          159,
          167,
          175,
          183,
          191,
          199,
          207,
          215,
          200,
          207,
          239,
          247,
          255,
          255,
          255,
          255,
          255,
          255,
          229,
          229,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          229,
          229,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          229,
          229,
          255,
          250,
          246,
          242,
          238,
          233,
          229,
          225,
          198,
          195,
          212,
          208,
          204,
          199,
          195,
          191,
          187,
          182,
          160,
          156,
          169,
          165,
          161,
          157,
          153,
          148,
          144,
          140,
          122,
          118,
          127,
          125,
          123,
          121,
          119,
          116,
          114,
          112,
          99,
          97,
          106,
          104,
          102,
          99,
          97,
          95,
          93,
          91,
          80,
          78,
          84,
          82,
          80,
          78,
          76,
          74,
          72,
          70,
          61,
          59,
          63,
          61,
          59,
          57,
          55,
          53,
          50,
          48,
          42,
          40,
          42,
          40,
          38,
          36,
          33,
          31,
          29,
          27,
          22,
          21,
          21,
          19,
          16,
          14,
          12,
          13,
          8,
          6,
          3,
          1,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
        ],
        b: [
          116,
          121,
          127,
          131,
          136,
          140,
          144,
          148,
          153,
          157,
          145,
          149,
          170,
          174,
          178,
          182,
          187,
          191,
          195,
          199,
          183,
          187,
          212,
          216,
          221,
          225,
          229,
          233,
          238,
          242,
          221,
          225,
          255,
          247,
          239,
          231,
          223,
          215,
          207,
          199,
          172,
          164,
          175,
          167,
          159,
          151,
          143,
          135,
          127,
          119,
          100,
          93,
          95,
          87,
          79,
          71,
          63,
          55,
          47,
          39,
          28,
          21,
          15,
          7,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
        ],
      }),
      (ColorMap.MAPS.rainbow = {
        name: "Rainbow",
        r: [
          0,
          4,
          9,
          13,
          18,
          22,
          27,
          31,
          36,
          40,
          45,
          50,
          54,
          58,
          61,
          64,
          68,
          69,
          72,
          74,
          77,
          79,
          80,
          82,
          83,
          85,
          84,
          86,
          87,
          88,
          86,
          87,
          87,
          87,
          85,
          84,
          84,
          84,
          83,
          79,
          78,
          77,
          76,
          71,
          70,
          68,
          66,
          60,
          58,
          55,
          53,
          46,
          43,
          40,
          36,
          33,
          25,
          21,
          16,
          12,
          4,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          4,
          8,
          12,
          21,
          25,
          29,
          33,
          42,
          46,
          51,
          55,
          63,
          67,
          72,
          76,
          80,
          89,
          93,
          97,
          101,
          110,
          114,
          119,
          123,
          131,
          135,
          140,
          144,
          153,
          157,
          161,
          165,
          169,
          178,
          182,
          187,
          191,
          199,
          203,
          208,
          212,
          221,
          225,
          229,
          233,
          242,
          246,
          250,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
        ],
        g: [
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          4,
          8,
          16,
          21,
          25,
          29,
          38,
          42,
          46,
          51,
          55,
          63,
          67,
          72,
          76,
          84,
          89,
          93,
          97,
          106,
          110,
          114,
          119,
          127,
          131,
          135,
          140,
          144,
          152,
          157,
          161,
          165,
          174,
          178,
          182,
          187,
          195,
          199,
          203,
          208,
          216,
          220,
          225,
          229,
          233,
          242,
          246,
          250,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          250,
          242,
          238,
          233,
          229,
          221,
          216,
          212,
          208,
          199,
          195,
          191,
          187,
          178,
          174,
          170,
          165,
          161,
          153,
          148,
          144,
          140,
          131,
          127,
          123,
          119,
          110,
          106,
          102,
          97,
          89,
          85,
          80,
          76,
          72,
          63,
          59,
          55,
          51,
          42,
          38,
          34,
          29,
          21,
          17,
          12,
          8,
          0,
        ],
        b: [
          0,
          3,
          7,
          10,
          14,
          19,
          23,
          28,
          32,
          38,
          43,
          48,
          53,
          59,
          63,
          68,
          72,
          77,
          81,
          86,
          91,
          95,
          100,
          104,
          109,
          113,
          118,
          122,
          127,
          132,
          136,
          141,
          145,
          150,
          154,
          159,
          163,
          168,
          173,
          177,
          182,
          186,
          191,
          195,
          200,
          204,
          209,
          214,
          218,
          223,
          227,
          232,
          236,
          241,
          245,
          250,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          246,
          242,
          238,
          233,
          225,
          220,
          216,
          212,
          203,
          199,
          195,
          191,
          187,
          178,
          174,
          170,
          165,
          157,
          152,
          148,
          144,
          135,
          131,
          127,
          123,
          114,
          110,
          106,
          102,
          97,
          89,
          84,
          80,
          76,
          67,
          63,
          59,
          55,
          46,
          42,
          38,
          34,
          25,
          21,
          16,
          12,
          8,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
        ],
      }),
      (ColorMap.MAPS.cubehelix = {
        name: "Cubehelix",
        r: [
          0,
          1,
          3,
          4,
          6,
          8,
          9,
          10,
          12,
          13,
          14,
          15,
          17,
          18,
          19,
          20,
          20,
          21,
          22,
          23,
          23,
          24,
          24,
          25,
          25,
          25,
          26,
          26,
          26,
          26,
          26,
          26,
          26,
          26,
          26,
          26,
          26,
          25,
          25,
          25,
          25,
          24,
          24,
          24,
          23,
          23,
          23,
          23,
          22,
          22,
          22,
          21,
          21,
          21,
          21,
          21,
          21,
          20,
          20,
          20,
          21,
          21,
          21,
          21,
          21,
          22,
          22,
          22,
          23,
          23,
          24,
          25,
          26,
          27,
          27,
          28,
          30,
          31,
          32,
          33,
          35,
          36,
          38,
          39,
          41,
          43,
          45,
          47,
          49,
          51,
          53,
          55,
          57,
          60,
          62,
          65,
          67,
          70,
          72,
          75,
          78,
          81,
          83,
          86,
          89,
          92,
          95,
          98,
          101,
          104,
          107,
          110,
          113,
          116,
          120,
          123,
          126,
          129,
          132,
          135,
          138,
          141,
          144,
          147,
          150,
          153,
          155,
          158,
          161,
          164,
          166,
          169,
          171,
          174,
          176,
          178,
          181,
          183,
          185,
          187,
          189,
          191,
          193,
          194,
          196,
          198,
          199,
          201,
          202,
          203,
          204,
          205,
          206,
          207,
          208,
          209,
          209,
          210,
          211,
          211,
          211,
          212,
          212,
          212,
          212,
          212,
          212,
          212,
          212,
          211,
          211,
          211,
          210,
          210,
          210,
          209,
          208,
          208,
          207,
          207,
          206,
          205,
          205,
          204,
          203,
          203,
          202,
          201,
          201,
          200,
          199,
          199,
          198,
          197,
          197,
          196,
          196,
          195,
          195,
          194,
          194,
          194,
          193,
          193,
          193,
          193,
          193,
          193,
          193,
          193,
          193,
          193,
          194,
          194,
          195,
          195,
          196,
          196,
          197,
          198,
          199,
          200,
          200,
          202,
          203,
          204,
          205,
          206,
          208,
          209,
          210,
          212,
          213,
          215,
          217,
          218,
          220,
          222,
          223,
          225,
          227,
          229,
          231,
          232,
          234,
          236,
          238,
          240,
          242,
          244,
          245,
          247,
          249,
          251,
          253,
          255,
        ],
        g: [
          0,
          0,
          1,
          1,
          2,
          2,
          3,
          4,
          4,
          5,
          6,
          6,
          7,
          8,
          9,
          10,
          11,
          11,
          12,
          13,
          14,
          15,
          17,
          18,
          19,
          20,
          21,
          22,
          24,
          25,
          26,
          28,
          29,
          31,
          32,
          34,
          35,
          37,
          38,
          40,
          41,
          43,
          45,
          46,
          48,
          50,
          52,
          53,
          55,
          57,
          58,
          60,
          62,
          64,
          66,
          67,
          69,
          71,
          73,
          74,
          76,
          78,
          79,
          81,
          83,
          84,
          86,
          88,
          89,
          91,
          92,
          94,
          95,
          97,
          98,
          99,
          101,
          102,
          103,
          104,
          106,
          107,
          108,
          109,
          110,
          111,
          112,
          113,
          114,
          114,
          115,
          116,
          116,
          117,
          118,
          118,
          119,
          119,
          120,
          120,
          120,
          121,
          121,
          121,
          121,
          122,
          122,
          122,
          122,
          122,
          122,
          122,
          122,
          122,
          122,
          122,
          122,
          122,
          122,
          122,
          121,
          121,
          121,
          121,
          121,
          121,
          121,
          121,
          121,
          120,
          120,
          120,
          120,
          120,
          120,
          120,
          120,
          120,
          120,
          121,
          121,
          121,
          121,
          121,
          122,
          122,
          122,
          123,
          123,
          124,
          124,
          125,
          125,
          126,
          127,
          127,
          128,
          129,
          130,
          131,
          131,
          132,
          133,
          135,
          136,
          137,
          138,
          139,
          140,
          142,
          143,
          144,
          146,
          147,
          149,
          150,
          152,
          154,
          155,
          157,
          158,
          160,
          162,
          164,
          165,
          167,
          169,
          171,
          172,
          174,
          176,
          178,
          180,
          182,
          183,
          185,
          187,
          189,
          191,
          193,
          194,
          196,
          198,
          200,
          202,
          203,
          205,
          207,
          208,
          210,
          212,
          213,
          215,
          216,
          218,
          219,
          221,
          222,
          224,
          225,
          226,
          228,
          229,
          230,
          231,
          232,
          233,
          235,
          236,
          237,
          238,
          239,
          240,
          240,
          241,
          242,
          243,
          244,
          244,
          245,
          246,
          247,
          247,
          248,
          248,
          249,
          250,
          250,
          251,
          251,
          252,
          252,
          253,
          253,
          254,
          255,
        ],
        b: [
          0,
          1,
          3,
          4,
          6,
          8,
          9,
          11,
          13,
          15,
          17,
          19,
          21,
          23,
          25,
          27,
          29,
          31,
          33,
          35,
          37,
          39,
          41,
          43,
          45,
          47,
          48,
          50,
          52,
          54,
          56,
          57,
          59,
          60,
          62,
          63,
          65,
          66,
          67,
          69,
          70,
          71,
          72,
          73,
          74,
          74,
          75,
          76,
          76,
          77,
          77,
          77,
          78,
          78,
          78,
          78,
          78,
          78,
          78,
          77,
          77,
          77,
          76,
          76,
          75,
          75,
          74,
          73,
          73,
          72,
          71,
          70,
          69,
          68,
          67,
          66,
          66,
          65,
          64,
          63,
          61,
          60,
          59,
          58,
          58,
          57,
          56,
          55,
          54,
          53,
          52,
          51,
          51,
          50,
          49,
          49,
          48,
          48,
          47,
          47,
          47,
          46,
          46,
          46,
          46,
          46,
          47,
          47,
          47,
          48,
          48,
          49,
          50,
          50,
          51,
          52,
          53,
          55,
          56,
          57,
          59,
          60,
          62,
          64,
          65,
          67,
          69,
          71,
          74,
          76,
          78,
          81,
          83,
          86,
          88,
          91,
          94,
          96,
          99,
          102,
          105,
          108,
          111,
          114,
          117,
          120,
          124,
          127,
          130,
          133,
          136,
          140,
          143,
          146,
          149,
          153,
          156,
          159,
          162,
          165,
          169,
          172,
          175,
          178,
          181,
          184,
          186,
          189,
          192,
          195,
          197,
          200,
          203,
          205,
          207,
          210,
          212,
          214,
          216,
          218,
          220,
          222,
          224,
          226,
          227,
          229,
          230,
          231,
          233,
          234,
          235,
          236,
          237,
          238,
          239,
          239,
          240,
          241,
          241,
          242,
          242,
          242,
          243,
          243,
          243,
          243,
          243,
          243,
          243,
          243,
          243,
          243,
          242,
          242,
          242,
          242,
          241,
          241,
          241,
          241,
          240,
          240,
          240,
          239,
          239,
          239,
          239,
          239,
          238,
          238,
          238,
          238,
          238,
          238,
          238,
          238,
          239,
          239,
          239,
          240,
          240,
          240,
          241,
          242,
          242,
          243,
          244,
          245,
          246,
          247,
          248,
          249,
          250,
          252,
          253,
          255,
        ],
      }),
      (ColorMap.MAPS_CUSTOM = ["cubehelix", "eosb", "rainbow"]),
      (ColorMap.MAPS_NAMES = ["native", "grayscale"].concat(
        ColorMap.MAPS_CUSTOM
      )),
      (ColorMap.prototype.reverse = function (t) {
        (this.reversed = t || !this.reversed),
          (this.sig = this.signature()),
          this.view.requestRedraw();
      }),
      (ColorMap.prototype.signature = function () {
        var t = this.mapName;
        return this.reversed && (t += " reversed"), t;
      }),
      (ColorMap.prototype.update = function (t) {
        (this.mapName = t),
          (this.sig = this.signature()),
          this.view.requestRedraw();
      }),
      (ColorMap.prototype.apply = function (t) {
        if ("native" == this.sig) return t;
        if (t.cmSig == this.sig) return t.cmImg;
        var e = document.createElement("canvas");
        (e.width = t.width), (e.height = t.height);
        var i = e.getContext("2d");
        i.drawImage(t, 0, 0);
        var r,
          o,
          s,
          a = i.getImageData(0, 0, e.width, e.height),
          n = a.data,
          l = n.length,
          h = 3;
        "grayscale" == this.mapName
          ? (h = 1)
          : ColorMap.MAPS_CUSTOM.indexOf(this.mapName) >= 0 && (h = 2);
        for (var c = 0; c < l; c += 4) {
          switch (h) {
            case 1:
              r = o = s = AladinUtils.myRound((n[c] + n[c + 1] + n[c + 2]) / 3);
              break;
            case 2:
              this.reversed
                ? ((r = ColorMap.MAPS[this.mapName].r[255 - n[c]]),
                  (o = ColorMap.MAPS[this.mapName].g[255 - n[c + 1]]),
                  (s = ColorMap.MAPS[this.mapName].b[255 - n[c + 2]]))
                : ((r = ColorMap.MAPS[this.mapName].r[n[c]]),
                  (o = ColorMap.MAPS[this.mapName].g[n[c + 1]]),
                  (s = ColorMap.MAPS[this.mapName].b[n[c + 2]]));
              break;
            default:
              (r = n[c]), (o = n[c + 1]), (s = n[c + 2]);
          }
          2 != h &&
            this.reversed &&
            ((r = 255 - r), (o = 255 - o), (s = 255 - s)),
            (n[c] = r),
            (n[c + 1] = o),
            (n[c + 2] = s);
        }
        return (
          (a.data = n),
          i.putImageData(a, 0, 0),
          (t.cmSig = this.sig),
          (t.cmImg = e),
          t.cmImg
        );
      }),
      ColorMap
    );
  })()),
  (HpxKey = (function () {
    "use strict";
    var t = function (t, e, i, r, o, s, a, n, l) {
      (this.norder = t),
        (this.npix = e),
        (this.nside = Math.pow(2, t)),
        (this.hips = i),
        (this.frame = i.cooFrame),
        (this.width = r),
        (this.height = o),
        (this.dx = s || 0),
        (this.dy = a || 0),
        (this.allskyTexture = n || void 0),
        (this.allskyTextureSize = l),
        (this.parente = 0),
        (this.children = null),
        (this.ancestor = null);
    };
    t.createHpxKeyfromAncestor = function (e, i) {
      var r = new t(
        e.norder + 1,
        4 * e.npix + i,
        e.hips,
        e.width / 2,
        e.height / 2,
        2 == i || 3 == i ? e.dx + e.width / 2 : e.dx,
        1 == i || 3 == i ? e.dy + e.height / 2 : e.dy,
        e.allskyTexture,
        e.allskyTextureSize
      );
      return (r.parente = e.parente + 1), (r.ancestor = e.ancestor || e), r;
    };
    t.prototype = {
      draw: function (t, e) {
        var r = 0,
          o = this.getProjViewCorners(e);
        if (null == o) return 0;
        var s = new Date().getTime(),
          a =
            null == this.ancestor &&
            this.norder >= 3 &&
            s - this.hips.lastUpdateDateNeededTiles > 0.1;
        try {
          if (i(o)) {
            var n = this.drawChildren(t, e, 4);
            if (n > 0) return n;
          }
        } catch (t) {
          return 0;
        }
        var l = null == this.ancestor ? this.norder : this.ancestor.norder,
          h = null == this.ancestor ? this.npix : this.ancestor.npix,
          c = this.hips.getTileURL(l, h),
          u = this.hips.tileBuffer.getTile(c);
        if ((u && Tile.isImageOk(u.img)) || this.allskyTexture) {
          this.allskyTexture ||
            this.hips.tileSize ||
            (this.hips.tileSize = u.img.width);
          var p = this.allskyTexture || u.img,
            d = this.allskyTextureSize || p.width;
          this.parente && (d /= Math.pow(2, this.parente)),
            this.hips.drawOneTile2(t, p, o, d, null, this.dx, this.dy, !0, l),
            (r += 2);
        } else
          a &&
            !u &&
            ((u = this.hips.tileBuffer.addTile(c)),
            e.downloader.requestDownload(u.img, u.url, this.hips.useCors),
            (this.hips.lastUpdateDateNeededTiles = s),
            e.requestRedrawAtDate(
              s + HpxImageSurvey.UPDATE_NEEDED_TILES_DELAY + 10
            ));
        return r;
      },
      drawChildren: function (t, e, i) {
        var r = 0;
        if (this.width > 1 && this.norder < 13 && this.parente < i) {
          var o = this.getChildren();
          if (null != o)
            for (var s = 0; s < 4; s++)
              null != o[s] && (r += o[s].draw(t, e, i));
        }
        return r;
      },
      getChildren: function () {
        if (null != this.children) return this.children;
        for (var e = [], i = 0; i < 4; i++) {
          var r = t.createHpxKeyfromAncestor(this, i);
          e[i] = r;
        }
        return (this.children = e), this.children;
      },
      getProjViewCorners: function (t) {
        var e = [],
          i = [],
          r = new SpatialVector();
        corners = HealpixCache.corners_nest(this.npix, this.nside);
        for (var o, s, a = 0; a < 4; a++) {
          if (
            (r.setXYZ(corners[a].x, corners[a].y, corners[a].z),
            this.frame.system != t.cooFrame.system)
          ) {
            if (this.frame.system == CooFrameEnum.SYSTEMS.J2000) {
              var n = CooConversion.J2000ToGalactic([r.ra(), r.dec()]);
              (o = n[0]), (s = n[1]);
            } else if (this.frame.system == CooFrameEnum.SYSTEMS.GAL) {
              var n = CooConversion.GalacticToJ2000([r.ra(), r.dec()]);
              (o = n[0]), (s = n[1]);
            }
          } else (o = r.ra()), (s = r.dec());
          e[a] = t.projection.project(o, s);
        }
        if (null == e[0] || null == e[1] || null == e[2] || null == e[3])
          return null;
        for (var a = 0; a < 4; a++)
          i[a] = AladinUtils.xyToView(
            e[a].X,
            e[a].Y,
            t.width,
            t.height,
            t.largestDim,
            t.zoomFactor
          );
        return i;
      },
    };
    var e = function (t, e, i) {
        var r = t[e].vx - t[i].vx,
          o = t[e].vy - t[i].vy;
        return r * r + o * o;
      },
      i = function (t) {
        var i, r;
        if ((i = e(t, 0, 2)) > 78400 || (r = e(t, 2, 1)) > 78400) return !0;
        if (0 == i || 0 == r) throw "Rhomb error";
        var o = e(t, 0, 3),
          s = e(t, 1, 2);
        if (0 == s || 0 == s) throw "Rhomb error";
        return (s > o ? o / s : s / o) < 0.7 && (o > 22500 || s > 22500);
      };
    return t;
  })()),
  (HpxImageSurvey = (function () {
    function t(t, e, i, r, o, s, a, n, l, h, c, u, p, d, f, v, g, m, y) {
      (v = v || 0),
        (g = g || 0),
        m || (m = !1),
        (l += v),
        (c += v),
        (p += v),
        (h += g),
        (u += g),
        (d += g);
      var S = (i + o + a) / 3,
        w = (r + s + n) / 3,
        S = (i + o + a) / 3,
        w = (r + s + n) / 3;
      t.save(),
        f && (t.globalAlpha = f),
        (coeff = 0.02),
        t.beginPath(),
        t.moveTo((1 + coeff) * i - S * coeff, (1 + coeff) * r - w * coeff),
        t.lineTo((1 + coeff) * o - S * coeff, (1 + coeff) * s - w * coeff),
        t.lineTo((1 + coeff) * a - S * coeff, (1 + coeff) * n - w * coeff),
        t.closePath(),
        t.clip(),
        m &&
          ((coeff = 0.01),
          (i = (1 + coeff) * i - S * coeff),
          (r = (1 + coeff) * r - w * coeff),
          (o = (1 + coeff) * o - S * coeff),
          (s = (1 + coeff) * s - w * coeff),
          (a = (1 + coeff) * a - S * coeff),
          (n = (1 + coeff) * n - w * coeff));
      var C = 1 / (l * (d - u) - c * d + p * u + (c - p) * h);
      t.transform(
        -(h * (a - o) - u * a + d * o + (u - d) * i) * C,
        (u * n + h * (s - n) - d * s + (d - u) * r) * C,
        (l * (a - o) - c * a + p * o + (c - p) * i) * C,
        -(c * n + l * (s - n) - p * s + (p - c) * r) * C,
        (l * (d * o - u * a) + h * (c * a - p * o) + (p * u - c * d) * i) * C,
        (l * (d * s - u * n) + h * (c * n - p * s) + (p * u - c * d) * r) * C
      ),
        t.drawImage(e, 0, 0),
        t.restore();
    }
    function e(t, e, i, r, o, s, a, n, l, h, c, u, p, d, f, v, g, m) {
      (v = v || 0),
        (g = g || 0),
        m || (m = !1),
        (l += v),
        (c += v),
        (p += v),
        (h += g),
        (u += g),
        (d += g);
      var y = (i + o + a) / 3,
        S = (r + s + n) / 3,
        y = (i + o + a) / 3,
        S = (r + s + n) / 3;
      t.save(), f && (t.globalAlpha = f);
      var w = 0.01;
      m && (w = 0.01),
        t.beginPath(),
        t.moveTo((1 + w) * i - y * w, (1 + w) * r - S * w),
        t.lineTo((1 + w) * o - y * w, (1 + w) * s - S * w),
        t.lineTo((1 + w) * a - y * w, (1 + w) * n - S * w),
        t.closePath(),
        t.clip(),
        m &&
          ((w = 0.03),
          (i = (1 + w) * i - y * w),
          (r = (1 + w) * r - S * w),
          (o = (1 + w) * o - y * w),
          (s = (1 + w) * s - S * w),
          (a = (1 + w) * a - y * w),
          (n = (1 + w) * n - S * w));
      var C = 1 / (l * (d - u) - c * d + p * u + (c - p) * h);
      t.transform(
        -(h * (a - o) - u * a + d * o + (u - d) * i) * C,
        (u * n + h * (s - n) - d * s + (d - u) * r) * C,
        (l * (a - o) - c * a + p * o + (c - p) * i) * C,
        -(c * n + l * (s - n) - p * s + (p - c) * r) * C,
        (l * (d * o - u * a) + h * (c * a - p * o) + (p * u - c * d) * i) * C,
        (l * (d * s - u * n) + h * (c * n - p * s) + (p * u - c * d) * r) * C
      ),
        t.drawImage(e, 0, 0),
        t.restore();
    }
    var i = function (t, e, r, o, s, a) {
      if (t instanceof HiPSDefinition) this.hipsDefinition = t;
      else {
        var n = {};
        (this.id = t),
          (n.ID = this.id),
          (this.name = e),
          (n.obs_title = this.name),
          "/" === r.slice(-1)
            ? (this.rootUrl = r.substr(0, r.length - 1))
            : (this.rootUrl = r),
          (this.additionalParams = (a && a.additionalParams) || null),
          (this.rootUrl = Utils.getAbsoluteURL(this.rootUrl)),
          Utils.isHttpsContext() &&
            (/u-strasbg.fr/i.test(this.rootUrl) ||
              /unistra.fr/i.test(this.rootUrl)) &&
            (this.rootUrl = this.rootUrl.replace("http://", "https://")),
          (a = a || {}),
          (this.imgFormat = a.imgFormat || "jpg"),
          (this.minOrder = a.minOrder || null),
          (this.cooFrame = CooFrameEnum.fromString(o, CooFrameEnum.J2000)),
          (this.longitudeReversed = a.longitudeReversed || !1),
          this.rootUrl.indexOf("/glimpse360/aladin/data") >= 0 &&
            (this.cooFrame = CooFrameEnum.J2000),
          (this.maxOrder = s),
          (this.hipsDefinition = HiPSDefinition.fromProperties(n));
      }
      (this.ascendingLongitude = !1),
        (this.tileSize = void 0),
        (this.allskyTexture = null),
        (this.alpha = 0),
        (this.allskyTextureSize = 0),
        (this.lastUpdateDateNeededTiles = 0);
      for (var l = !1, h = 0; h < i.SURVEYS.length; h++)
        i.SURVEYS[h].id == this.id && (l = !0);
      l ||
        i.SURVEYS.push({
          id: this.id,
          url: this.rootUrl,
          name: this.name,
          maxOrder: this.maxOrder,
          frame: this.cooFrame,
        }),
        (i.SURVEYS_OBJECTS[this.id] = this);
    };
    (i.UPDATE_NEEDED_TILES_DELAY = 1e3),
      (i.prototype.init = function (t, e) {
        (this.view = t),
          this.cm || (this.cm = new ColorMap(this.view)),
          (this.tileBuffer = this.view.tileBuffer),
          (this.useCors = !1);
        var i = this;
        $.support.cors
          ? $.ajax({
              type: "GET",
              url:
                this.rootUrl +
                "/properties" +
                (this.additionalParams ? "?" + this.additionalParams : ""),
              dataType: "text",
              xhrFields: {},
              headers: {},
              success: function () {
                (i.useCors = !0), i.retrieveAllskyTextures(), e && e();
              },
              error: function (t, r, o) {
                i.retrieveAllskyTextures(), e && e();
              },
            })
          : (this.retrieveAllskyTextures(), e());
      }),
      (i.DEFAULT_SURVEY_ID = "P/DSS2/color"),
      (i.SURVEYS_OBJECTS = {}),
      (i.SURVEYS = [
        {
          id: "P/2MASS/color",
          url: "http://alasky.u-strasbg.fr/2MASS/Color",
          name: "2MASS colored",
          maxOrder: 9,
          frame: "equatorial",
          format: "jpeg",
        },
        {
          id: "P/DSS2/color",
          url: "http://alasky.u-strasbg.fr/DSS/DSSColor",
          name: "DSS colored",
          maxOrder: 9,
          frame: "equatorial",
          format: "jpeg",
        },
        {
          id: "P/DSS2/red",
          url: "http://alasky.u-strasbg.fr/DSS/DSS2Merged",
          name: "DSS2 Red (F+R)",
          maxOrder: 9,
          frame: "equatorial",
          format: "jpeg fits",
        },
        {
          id: "P/PanSTARRS/DR1/g",
          url: "http://alasky.u-strasbg.fr/Pan-STARRS/DR1/g",
          name: "PanSTARRS DR1 g",
          maxOrder: 11,
          frame: "equatorial",
          format: "jpeg fits",
        },
        {
          id: "P/PanSTARRS/DR1/color-z-zg-g",
          url: "http://alasky.u-strasbg.fr/Pan-STARRS/DR1/color-z-zg-g",
          name: "PanSTARRS DR1 color",
          maxOrder: 11,
          frame: "equatorial",
          format: "jpeg",
        },
        {
          id: "P/DECaPS/DR1/color",
          url: "http://alasky.u-strasbg.fr/DECaPS/DR1/color",
          name: "DECaPS DR1 color",
          maxOrder: 11,
          frame: "equatorial",
          format: "jpeg png",
        },
        {
          id: "P/Fermi/color",
          url: "http://alasky.u-strasbg.fr/Fermi/Color",
          name: "Fermi color",
          maxOrder: 3,
          frame: "equatorial",
          format: "jpeg",
        },
        {
          id: "P/Finkbeiner",
          url: "http://alasky.u-strasbg.fr/FinkbeinerHalpha",
          maxOrder: 3,
          frame: "galactic",
          format: "jpeg fits",
          name: "Halpha",
        },
        {
          id: "P/GALEXGR6/AIS/color",
          url: "http://alasky.unistra.fr/GALEX/GR6-03-2014/AIS-Color",
          name: "GALEX Allsky Imaging Survey colored",
          maxOrder: 8,
          frame: "equatorial",
          format: "jpeg",
        },
        {
          id: "P/IRIS/color",
          url: "http://alasky.u-strasbg.fr/IRISColor",
          name: "IRIS colored",
          maxOrder: 3,
          frame: "galactic",
          format: "jpeg",
        },
        {
          id: "P/Mellinger/color",
          url: "http://alasky.u-strasbg.fr/MellingerRGB",
          name: "Mellinger colored",
          maxOrder: 4,
          frame: "galactic",
          format: "jpeg",
        },
        {
          id: "P/SDSS9/color",
          url: "http://alasky.u-strasbg.fr/SDSS/DR9/color",
          name: "SDSS9 colored",
          maxOrder: 10,
          frame: "equatorial",
          format: "jpeg",
        },
        {
          id: "P/SPITZER/color",
          url: "http://alasky.u-strasbg.fr/SpitzerI1I2I4color",
          name: "IRAC color I1,I2,I4 - (GLIMPSE, SAGE, SAGE-SMC, SINGS)",
          maxOrder: 9,
          frame: "galactic",
          format: "jpeg",
        },
        {
          id: "P/VTSS/Ha",
          url: "http://alasky.u-strasbg.fr/VTSS/Ha",
          maxOrder: 3,
          frame: "galactic",
          format: "png jpeg fits",
          name: "VTSS-Ha",
        },
        {
          id: "P/XMM/EPIC",
          url: "http://saada.u-strasbg.fr/xmmallsky",
          name: "XMM-Newton stacked EPIC images (no phot. normalization)",
          maxOrder: 7,
          frame: "equatorial",
          format: "png fits",
        },
        {
          id: "P/XMM/PN/color",
          url: "http://saada.unistra.fr/PNColor",
          name: "XMM PN colored",
          maxOrder: 7,
          frame: "equatorial",
          format: "png jpeg",
        },
        {
          id: "P/allWISE/color",
          url: "http://alasky.u-strasbg.fr/AllWISE/RGB-W4-W2-W1/",
          name: "AllWISE color",
          maxOrder: 8,
          frame: "equatorial",
          format: "jpeg",
        },
        {
          id: "P/GLIMPSE360",
          url: "http://www.spitzer.caltech.edu/glimpse360/aladin/data",
          name: "GLIMPSE360",
          maxOrder: 9,
          frame: "equatorial",
          format: "jpeg",
        },
      ]),
      (i.getAvailableSurveys = function () {
        return i.SURVEYS;
      }),
      (i.getSurveyInfoFromId = function (t) {
        for (var e = i.getAvailableSurveys(), r = 0; r < e.length; r++)
          if (e[r].id == t) return e[r];
        return null;
      }),
      (i.getSurveyFromId = function (t) {
        if (i.SURVEYS_OBJECTS[t]) return i.SURVEYS_OBJECTS[t];
        var e = i.getSurveyInfoFromId(t);
        if (e) {
          var r = {};
          return (
            e.format &&
              e.format.indexOf("jpeg") < 0 &&
              e.format.indexOf("png") >= 0 &&
              (r.imgFormat = "png"),
            new i(e.id, e.name, e.url, e.frame, e.maxOrder, r)
          );
        }
        return null;
      }),
      (i.prototype.getTileURL = function (t, e) {
        var i = 1e4 * Math.floor(e / 1e4);
        return (
          this.rootUrl +
          "/Norder" +
          t +
          "/Dir" +
          i +
          "/Npix" +
          e +
          "." +
          this.imgFormat +
          (this.additionalParams ? "?" + this.additionalParams : "")
        );
      }),
      (i.prototype.retrieveAllskyTextures = function () {
        var t = new Image();
        this.useCors && (t.crossOrigin = "anonymous");
        var e = this;
        (t.onload = function () {
          (e.allskyTextureSize = t.width / 27),
            (e.allskyTexture = t),
            e.view.requestRedraw();
        }),
          (t.src =
            this.rootUrl +
            "/Norder3/Allsky." +
            this.imgFormat +
            (this.additionalParams ? "?" + this.additionalParams : ""));
      }),
      (i.prototype.draw = function (t, e, i, r) {
        i = void 0 !== i && i;
        var o = e.getVisibleCells(3, this.cooFrame),
          s = null,
          a = Math.min(r, this.maxOrder);
        if (
          (r >= 3 && (s = 3 == r ? o : e.getVisibleCells(a, this.cooFrame)), i)
        )
          return (
            r <= 4 && this.drawAllsky(t, o, a, e),
            void (r >= 3 && this.drawHighres(t, s, a, e))
          );
        e.curNorder >= 3
          ? this.redrawHighres(t, s, e.curNorder)
          : this.redrawAllsky(t, o, e.fov, e.curNorder);
      }),
      (i.prototype.drawHighres = function (t, e, i, r) {
        for (var o = [], s = {}, a = {}, n = 0; n < e.length; n++) {
          var l = e[n].ipix,
            h = this.getTileURL(i, l),
            c = this.tileBuffer.getTile(h);
          if (!(c && Tile.isImageOk(c.img)))
            for (var u = i - 1; u >= 3 && u >= i - 4; u--) {
              var p = ~~(l / Math.pow(4, i - u)),
                d = u + "-" + p;
              if (!0 === s[d] || !0 === a) break;
              var f = this.getTileURL(u, p),
                v = this.tileBuffer.getTile(f),
                g = v && Tile.isImageOk(v.img);
              if (g) {
                o.push({ ipix: p, order: u }), (s[d] = !0);
                break;
              }
              a[d] = !0;
            }
        }
        o = o.sort(function (t, e) {
          return t.order - e.order;
        });
        for (var m = this.tileSize || 512, n = 0; n < o.length; n++) {
          var y = o[n];
          new HpxKey(y.order, y.ipix, this, m, m).draw(t, r);
        }
        for (var n = 0; n < e.length; n++)
          new HpxKey(i, e[n].ipix, this, m, m).draw(t, r);
      }),
      (i.prototype.drawAllsky = function (t, e, i, r) {
        if (
          !(this.view.curNorder > 6) &&
          this.allskyTexture &&
          Tile.isImageOk(this.allskyTexture)
        ) {
          for (var o, s, a, n, l = [], h = 0; h < e.length; h++)
            (o = e[h]),
              (s = o.ipix),
              (n = this.allskyTextureSize * Math.floor(s / 27)),
              (a = this.allskyTextureSize * (s - 27 * Math.floor(s / 27))),
              l.push(
                new HpxKey(
                  3,
                  e[h].ipix,
                  this,
                  this.allskyTextureSize,
                  this.allskyTextureSize,
                  a,
                  n,
                  this.allskyTexture,
                  this.allskyTextureSize
                )
              );
          for (var h = 0; h < l.length; h++) l[h].draw(t, r);
        }
      }),
      (i.prototype.redrawAllsky = function (t, e, i, r) {
        if (!(this.view.curNorder > 6) && this.allskyTexture)
          for (var o, s, a, n = 0, l = 0, h = e.length; l < h; l++)
            if (
              ((o = e[l]),
              (a = o.ipix),
              this.allskyTexture && Tile.isImageOk(this.allskyTexture))
            ) {
              var c = this.allskyTextureSize * Math.floor(a / 27),
                u = this.allskyTextureSize * (a - 27 * Math.floor(a / 27));
              if (i > 40) {
                (n = 0.02),
                  (n = 0),
                  (s = {
                    x: (o[0].vx + o[2].vx) / 2,
                    y: (o[0].vy + o[2].vy) / 2,
                  });
                for (var p = 0; p < 4; p++) {
                  var d = { x: o[p].vx - s.x, y: o[p].vy - s.y };
                  (o[p].vx += n * d.x), (o[p].vy += n * d.y);
                }
              }
              this.drawOneTile(
                t,
                this.allskyTexture,
                o,
                this.allskyTextureSize,
                null,
                u,
                c,
                !0
              );
            }
      }),
      (i.prototype.getColorMap = function () {
        return this.cm;
      });
    var r = !0;
    return (
      (i.prototype.redrawHighres = function (t, e, o) {
        if (0 != e.length) {
          r = !r;
          var s,
            a,
            n,
            l,
            h,
            c,
            u,
            p,
            d = new Date().getTime(),
            f =
              d - this.lastUpdateDateNeededTiles > i.UPDATE_NEEDED_TILES_DELAY,
            v = o - 1,
            g = [],
            m = [],
            y = {},
            S = !1,
            w = [],
            C = [];
          if (f) {
            var x = [
              (e[0][0].vx + e[0][1].vx) / 2,
              (e[0][0].vy + e[0][1].vy) / 2,
            ];
            e = e.sort(function (t, e) {
              var i = [(t[0].vx + t[2].vx) / 2, (t[0].vy + t[2].vy) / 2],
                r = [(e[0].vx + e[2].vx) / 2, (e[0].vy + e[2].vy) / 2];
              return (
                (i[0] - x[0]) * (i[0] - x[0]) +
                (i[1] - x[1]) * (i[1] - x[1]) -
                ((r[0] - x[0]) * (r[0] - x[0]) + (r[1] - x[1]) * (r[1] - x[1]))
              );
            });
          }
          for (var _ = 0, b = e.length; _ < b; _++)
            if (
              ((h = e[_]),
              (p = h.ipix),
              (u = ~~(p / 4)),
              (l = this.getTileURL(v, u)),
              f &&
                v >= 3 &&
                (n = this.tileBuffer.addTile(l)) &&
                C.push({ img: n.img, url: l }),
              (a = this.getTileURL(o, p)),
              (s = this.tileBuffer.getTile(a)))
            )
              Tile.isImageOk(s.img)
                ? g.push({ img: s.img, corners: h })
                : ((S = !0),
                  f && !s.img.dlError && w.push({ img: s.img, url: a }),
                  v >= 3 &&
                    !y[u] &&
                    ((n = this.tileBuffer.getTile(l)),
                    n &&
                      Tile.isImageOk(n.img) &&
                      (c = this.view.getPositionsInView(u, v)) &&
                      m.push({ img: n.img, corners: c, ipix: u }),
                    (y[u] = 1)));
            else {
              if (((S = !0), f)) {
                var s = this.tileBuffer.addTile(a);
                s && w.push({ img: s.img, url: a });
              }
              v >= 3 &&
                !y[u] &&
                ((n = this.tileBuffer.getTile(l)),
                n &&
                  Tile.isImageOk(n.img) &&
                  (c = this.view.getPositionsInView(u, v)) &&
                  m.push({ img: n.img, corners: c, ipix: u }),
                (y[u] = 1));
            }
          for (var _ = 0, b = m.length; _ < b; _++)
            this.drawOneTile(t, m[_].img, m[_].corners, m[_].img.width);
          for (var _ = 0, b = g.length; _ < b; _++) {
            var I = null,
              M = g[_].img;
            M.fadingStart &&
              M.fadingEnd &&
              d < M.fadingEnd &&
              ((I =
                0.2 +
                ((d - M.fadingStart) / (M.fadingEnd - M.fadingStart)) * 0.8),
              this.requestRedraw()),
              this.drawOneTile(t, M, g[_].corners, M.width, I);
          }
          if (f) {
            for (var _ = 0, b = w.length; _ < b; _++)
              this.view.downloader.requestDownload(
                w[_].img,
                w[_].url,
                this.useCors
              );
            for (var _ = 0, b = C.length; _ < b; _++)
              this.view.downloader.requestDownload(
                C[_].img,
                C[_].url,
                this.useCors
              );
            this.lastUpdateDateNeededTiles = d;
          }
          S &&
            this.view.requestRedrawAtDate(d + i.UPDATE_NEEDED_TILES_DELAY + 10);
        }
      }),
      (i.prototype.drawOneTile = function (t, i, r, o, s, a, n, l) {
        var h = this.useCors ? this.cm.apply(i) : i;
        e(
          t,
          h,
          r[0].vx,
          r[0].vy,
          r[1].vx,
          r[1].vy,
          r[3].vx,
          r[3].vy,
          o - 1,
          o - 1,
          o - 1,
          0,
          0,
          o - 1,
          s,
          a,
          n,
          l
        ),
          e(
            t,
            h,
            r[1].vx,
            r[1].vy,
            r[3].vx,
            r[3].vy,
            r[2].vx,
            r[2].vy,
            o - 1,
            0,
            0,
            o - 1,
            0,
            0,
            s,
            a,
            n,
            l
          );
      }),
      (i.prototype.drawOneTile2 = function (e, i, r, o, s, a, n, l, h) {
        var c = this.useCors ? this.cm.apply(i) : i,
          u = h <= 3 ? (o < 100 ? 0.5 : 0.2) : 0;
        t(
          e,
          c,
          r[0].vx,
          r[0].vy,
          r[1].vx,
          r[1].vy,
          r[3].vx,
          r[3].vy,
          o - u,
          o - u,
          o - u,
          0 + u,
          0 + u,
          o - u,
          s,
          a,
          n,
          l,
          h
        ),
          t(
            e,
            c,
            r[1].vx,
            r[1].vy,
            r[3].vx,
            r[3].vy,
            r[2].vx,
            r[2].vy,
            o - u,
            0 + u,
            0 + u,
            o - u,
            0 + u,
            0 + u,
            s,
            a,
            n,
            l,
            h
          );
      }),
      (i.prototype.setAlpha = function (t) {
        (t = +t),
          (this.alpha = Math.max(0, Math.min(t, 1))),
          this.view.requestRedraw();
      }),
      (i.prototype.getAlpha = function () {
        return this.alpha;
      }),
      i
    );
  })()),
  (HealpixGrid = (function () {
    var t = function () {};
    return (
      (t.prototype.redraw = function (t, e, i, r) {
        (t.lineWidth = 1), (t.strokeStyle = "rgb(150,150,220)"), t.beginPath();
        for (var o, s = 0, a = e.length; s < a; s++)
          (o = e[s]),
            (ipix = o.ipix),
            t.moveTo(o[0].vx, o[0].vy),
            t.lineTo(o[1].vx, o[1].vy),
            t.lineTo(o[2].vx, o[2].vy);
        t.stroke(), (t.strokeStyle = "#FFDDDD"), t.beginPath();
        for (var s = 0, a = e.length; s < a; s++)
          (o = e[s]),
            (ipix = o.ipix),
            t.strokeText(
              r + "/" + ipix,
              (o[0].vx + o[2].vx) / 2,
              (o[0].vy + o[2].vy) / 2
            );
        t.stroke();
      }),
      t
    );
  })()),
  (Location = (function () {
    return (
      (Location = function (t) {
        this.$div = $(t);
      }),
      (Location.prototype.update = function (t, e, i, r) {
        r = (r && !0 === r) || !1;
        var o = new Coo(t, e, 7);
        i == CooFrameEnum.J2000
          ? this.$div.html(o.format("s/"))
          : (CooFrameEnum.J2000d, this.$div.html(o.format("d/"))),
          this.$div.toggleClass("aladin-reticleColor", r);
      }),
      Location
    );
  })()),
  (View = (function () {
    function t(e, i, o, s, a) {
      (this.aladin = e),
        (this.options = e.options),
        (this.aladinDiv = this.aladin.aladinDiv),
        (this.popup = new Popup(this.aladinDiv, this)),
        this.createCanvases(),
        (this.location = i),
        (this.fovDiv = o),
        (this.mustClearCatalog = !0),
        (this.mustRedrawReticle = !0),
        (this.mode = t.PAN),
        (this.minFOV = this.maxFOV = null),
        (this.healpixGrid = new HealpixGrid(this.imageCanvas)),
        (this.cooFrame = s || CooFrameEnum.GAL);
      var n, l;
      (n = l = 0),
        (this.projectionMethod = ProjectionEnum.SIN),
        (this.projection = new Projection(n, l)),
        this.projection.setProjection(this.projectionMethod),
        (this.zoomLevel = 0),
        (this.zoomFactor = this.computeZoomFactor(this.zoomLevel)),
        (this.viewCenter = { lon: n, lat: l }),
        a && this.setZoom(a),
        (this.imageSurvey = null),
        (this.catalogs = []);
      var h = document.createElement("canvas");
      h.width = h.height = 24;
      var c = h.getContext("2d");
      (c.lineWidth = 6),
        c.beginPath(),
        (c.strokeStyle = "#eee"),
        c.arc(12, 12, 8, 0, 2 * Math.PI, !0),
        c.stroke(),
        (c.lineWidth = 3),
        c.beginPath(),
        (c.strokeStyle = "#c38"),
        c.arc(12, 12, 8, 0, 2 * Math.PI, !0),
        c.stroke(),
        (this.catalogForPopup = A.catalog({ shape: h, sourceSize: 24 })),
        this.catalogForPopup.hide(),
        this.catalogForPopup.setView(this),
        (this.overlays = []),
        (this.mocs = []),
        (this.allOverlayLayers = []),
        (this.tileBuffer = new TileBuffer()),
        this.fixLayoutDimensions(),
        (this.curNorder = 1),
        (this.realNorder = 1),
        (this.curOverlayNorder = 1),
        (this.dragging = !1),
        (this.dragx = null),
        (this.dragy = null),
        (this.needRedraw = !0),
        (this.pinchZoomParameters = {
          isPinching: !1,
          initialFov: void 0,
          initialDistance: void 0,
        }),
        (this.downloader = new Downloader(this)),
        (this.flagForceRedraw = !1),
        (this.fadingLatestUpdate = null),
        (this.dateRequestRedraw = null),
        (this.showGrid = !1),
        r(this),
        (this.resizeTimer = null);
      var u = this;
      $(window).resize(function () {
        clearTimeout(u.resizeTimer),
          (u.resizeTimer = setTimeout(function () {
            u.fixLayoutDimensions(u);
          }, 100));
      }),
        setTimeout(function () {
          var t = $(u.aladinDiv).width(),
            e = $(u.aladinDiv).height();
          (u.width === t && u.height !== e) ||
            (u.fixLayoutDimensions(), u.setZoomLevel(u.zoomLevel));
        }, 1e3);
    }
    function e(t, e, i, r) {
      if (t.projection) {
        var o,
          s = AladinUtils.viewToXy(
            e,
            i,
            t.width,
            t.height,
            t.largestDim,
            t.zoomFactor
          );
        try {
          o = t.projection.unproject(s.x, s.y);
        } catch (t) {}
        o && t.location.update(o.ra, o.dec, t.cooFrame, r);
      }
    }
    (t.PAN = 0),
      (t.SELECT = 1),
      (t.TOOL_SIMBAD_POINTER = 2),
      (t.DRAW_SOURCES_WHILE_DRAGGING = !0),
      (t.DRAW_MOCS_WHILE_DRAGGING = !0),
      (t.CALLBACKS_THROTTLE_TIME_MS = 100),
      (t.prototype.createCanvases = function () {
        var t = $(this.aladinDiv);
        t.find(".aladin-imageCanvas").remove(),
          t.find(".aladin-catalogCanvas").remove(),
          t.find(".aladin-reticleCanvas").remove(),
          (this.imageCanvas = $(
            "<canvas class='aladin-imageCanvas'></canvas>"
          ).appendTo(this.aladinDiv)[0]),
          (this.catalogCanvas = $(
            "<canvas class='aladin-catalogCanvas'></canvas>"
          ).appendTo(this.aladinDiv)[0]),
          (this.reticleCanvas = $(
            "<canvas class='aladin-reticleCanvas'></canvas>"
          ).appendTo(this.aladinDiv)[0]);
      }),
      (t.prototype.fixLayoutDimensions = function () {
        Utils.cssScale = void 0;
        var t = $(this.aladinDiv).width(),
          e = $(this.aladinDiv).height();
        (this.width = Math.max(t, 1)),
          (this.height = Math.max(e, 1)),
          (this.cx = this.width / 2),
          (this.cy = this.height / 2),
          (this.largestDim = Math.max(this.width, this.height)),
          (this.smallestDim = Math.min(this.width, this.height)),
          (this.ratio = this.largestDim / this.smallestDim),
          (this.mouseMoveIncrement = 160 / this.largestDim),
          (this.imageCtx = this.imageCanvas.getContext("2d")),
          (this.catalogCtx = this.catalogCanvas.getContext("2d")),
          (this.reticleCtx = this.reticleCanvas.getContext("2d")),
          (this.imageCtx.canvas.width = this.width),
          (this.catalogCtx.canvas.width = this.width),
          (this.reticleCtx.canvas.width = this.width),
          (this.imageCtx.canvas.height = this.height),
          (this.catalogCtx.canvas.height = this.height),
          (this.reticleCtx.canvas.height = this.height),
          i(this.imageCtx, this.aladin.options.pixelateCanvas),
          this.logoDiv ||
            (this.logoDiv = $(this.aladinDiv).find(".aladin-logo")[0]),
          this.width > 800
            ? ($(this.logoDiv).removeClass("aladin-logo-small"),
              $(this.logoDiv).addClass("aladin-logo-large"),
              $(this.logoDiv).css("width", "90px"))
            : ($(this.logoDiv).addClass("aladin-logo-small"),
              $(this.logoDiv).removeClass("aladin-logo-large"),
              $(this.logoDiv).css("width", "32px")),
          this.computeNorder(),
          this.requestRedraw();
      });
    var i = function (t, e) {
      var i = !e;
      (t.imageSmoothingEnabled = i),
        (t.webkitImageSmoothingEnabled = i),
        (t.mozImageSmoothingEnabled = i),
        (t.msImageSmoothingEnabled = i),
        (t.oImageSmoothingEnabled = i);
    };
    (t.prototype.setMode = function (e) {
      (this.mode = e),
        this.mode == t.SELECT
          ? this.setCursor("crosshair")
          : this.mode == t.TOOL_SIMBAD_POINTER
          ? (this.popup.hide(),
            (this.reticleCanvas.style.cursor = ""),
            $(this.reticleCanvas).addClass("aladin-sp-cursor"))
          : this.setCursor("default");
    }),
      (t.prototype.setCursor = function (e) {
        this.reticleCanvas.style.cursor != e &&
          this.mode != t.TOOL_SIMBAD_POINTER &&
          (this.reticleCanvas.style.cursor = e);
      }),
      (t.prototype.getCanvasDataURL = function (t, e, i) {
        t = t || "image/png";
        var r = document.createElement("canvas");
        (e = e || this.width),
          (i = i || this.height),
          (r.width = e),
          (r.height = i);
        var o = r.getContext("2d");
        return (
          o.drawImage(this.imageCanvas, 0, 0, r.width, r.height),
          o.drawImage(this.catalogCanvas, 0, 0, r.width, r.height),
          o.drawImage(this.reticleCanvas, 0, 0, r.width, r.height),
          r.toDataURL(t)
        );
      }),
      (computeFov = function (t) {
        var e = doComputeFov(t, t.zoomFactor);
        return (t.mouseMoveIncrement = e / t.imageCanvas.width), e;
      }),
      (doComputeFov = function (t, e) {
        var i;
        if (t.zoomFactor < 1) i = 180;
        else {
          var r = AladinUtils.viewToXy(
              0,
              t.cy,
              t.width,
              t.height,
              t.largestDim,
              e
            ),
            o = t.projection.unproject(r.x, r.y),
            s = AladinUtils.viewToXy(
              t.imageCanvas.width - 1,
              t.cy,
              t.width,
              t.height,
              t.largestDim,
              e
            ),
            a = t.projection.unproject(s.x, s.y);
          i = new Coo(o.ra, o.dec).distance(new Coo(a.ra, a.dec));
        }
        return i;
      }),
      (updateFovDiv = function (t) {
        if (isNaN(t.fov)) return void t.fovDiv.html("FoV:");
        var e;
        (e =
          t.fov > 1
            ? Math.round(100 * t.fov) / 100 + "Â°"
            : 60 * t.fov > 1
            ? Math.round(60 * t.fov * 100) / 100 + "'"
            : Math.round(3600 * t.fov * 100) / 100 + '"'),
          t.fovDiv.html("FoV: " + e);
      }),
      (createListeners = function (i) {
        var r = !1;
        "ontouchstart" in window && (r = !0),
          (onDblClick = function (t) {
            var e = i.imageCanvas.relMouseCoords(t),
              r = AladinUtils.viewToXy(
                e.x,
                e.y,
                i.width,
                i.height,
                i.largestDim,
                i.zoomFactor
              );
            try {
              var o = i.projection.unproject(r.x, r.y);
            } catch (t) {
              return;
            }
            (radec = []),
              i.cooFrame.system == CooFrameEnum.SYSTEMS.GAL
                ? (radec = CooConversion.GalacticToJ2000([o.ra, o.dec]))
                : (radec = [o.ra, o.dec]),
              i.pointTo(radec[0], radec[1]);
          }),
          r || $(i.reticleCanvas).dblclick(onDblClick),
          $(i.reticleCanvas).bind("mousedown touchstart", function (e) {
            if (
              "touchstart" === e.type &&
              e.originalEvent &&
              e.originalEvent.targetTouches &&
              2 == e.originalEvent.targetTouches.length
            ) {
              (i.dragging = !1), (i.pinchZoomParameters.isPinching = !0);
              var r = i.aladin.getFov();
              return (
                (i.pinchZoomParameters.initialFov = Math.max(r[0], r[1])),
                void (i.pinchZoomParameters.initialDistance = Math.sqrt(
                  Math.pow(
                    e.originalEvent.targetTouches[0].clientX -
                      e.originalEvent.targetTouches[1].clientX,
                    2
                  ) +
                    Math.pow(
                      e.originalEvent.targetTouches[0].clientY -
                        e.originalEvent.targetTouches[1].clientY,
                      2
                    )
                ))
              );
            }
            var o = i.imageCanvas.relMouseCoords(e);
            return (
              e.originalEvent && e.originalEvent.targetTouches
                ? ((i.dragx = e.originalEvent.targetTouches[0].clientX),
                  (i.dragy = e.originalEvent.targetTouches[0].clientY))
                : ((i.dragx = o.x), (i.dragy = o.y)),
              (i.dragging = !0),
              i.mode == t.PAN
                ? i.setCursor("move")
                : i.mode == t.SELECT &&
                  (i.selectStartCoo = { x: i.dragx, y: i.dragy }),
              !1
            );
          }),
          $(i.reticleCanvas).bind("click mouseout touchend", function (r) {
            if ("touchend" === r.type && i.pinchZoomParameters.isPinching)
              return (
                (i.pinchZoomParameters.isPinching = !1),
                void (i.pinchZoomParameters.initialFov = i.pinchZoomParameters.initialDistance = void 0)
              );
            var o = !0 === i.realDragging,
              s = i.mode === t.SELECT && i.dragging;
            if (i.dragging && (i.setCursor("default"), (i.dragging = !1), o)) {
              i.realDragging = !1;
              var a = i.aladin.callbacksByEventName.positionChanged;
              if ("function" == typeof a) {
                var n = i.aladin.pix2world(i.width / 2, i.height / 2);
                void 0 !== n && a({ ra: n[0], dec: n[1], dragging: !1 });
              }
            }
            if (s)
              return (
                i.aladin.fire(
                  "selectend",
                  i.getObjectsInBBox(
                    i.selectStartCoo.x,
                    i.selectStartCoo.y,
                    i.dragx - i.selectStartCoo.x,
                    i.dragy - i.selectStartCoo.y
                  )
                ),
                (i.mustRedrawReticle = !0),
                void i.requestRedraw()
              );
            if (
              ((i.mustClearCatalog = !0),
              (i.mustRedrawReticle = !0),
              (i.dragx = i.dragy = null),
              ("mouseout" === r.type || "touchend" === r.type) &&
                (i.requestRedraw(!0),
                e(i, i.width / 2, i.height / 2, !0),
                "mouseout" === r.type))
            )
              return void (
                i.mode === t.TOOL_SIMBAD_POINTER && i.setMode(t.PAN)
              );
            var l = i.imageCanvas.relMouseCoords(r);
            if (i.mode == t.TOOL_SIMBAD_POINTER) {
              var h = i.aladin.pix2world(l.x, l.y);
              return (
                i.setMode(t.PAN),
                i.setCursor("wait"),
                void SimbadPointer.query(
                  h[0],
                  h[1],
                  Math.min(1, (15 * i.fov) / i.largestDim),
                  i.aladin
                )
              );
            }
            var c = i.closestObjects(l.x, l.y, 5);
            if (!o && c) {
              var u = c[0];
              u instanceof Footprint || u instanceof Circle
                ? u.dispatchClickEvent()
                : u.marker
                ? (i.popup.setTitle(u.popupTitle),
                  i.popup.setText(u.popupDesc),
                  i.popup.setSource(u),
                  i.popup.show())
                : (i.lastClickedObject &&
                    i.lastClickedObject.actionOtherObjectClicked &&
                    i.lastClickedObject.actionOtherObjectClicked(),
                  u.actionClicked()),
                (i.lastClickedObject = u);
              var p = i.aladin.callbacksByEventName.objectClicked;
              "function" == typeof p && p(u);
            } else if (i.lastClickedObject && !o) {
              i.aladin.measurementTable.hide(),
                i.popup.hide(),
                i.lastClickedObject instanceof Footprint ||
                  i.lastClickedObject.actionOtherObjectClicked(),
                (i.lastClickedObject = null);
              var p = i.aladin.callbacksByEventName.objectClicked;
              "function" == typeof p && p(null);
            }
            var d = i.aladin.callbacksByEventName.click;
            if ("function" == typeof d) {
              var n = i.aladin.pix2world(l.x, l.y);
              void 0 !== n &&
                d({ ra: n[0], dec: n[1], x: l.x, y: l.y, isDragging: o });
            }
            i.refreshProgressiveCats(), i.requestRedraw(!0);
          });
        var o,
          s = null;
        $(i.reticleCanvas).bind("mousemove touchmove", function (a) {
          if (
            (a.preventDefault(),
            "touchmove" === a.type &&
              i.pinchZoomParameters.isPinching &&
              a.originalEvent &&
              a.originalEvent.touches &&
              2 == a.originalEvent.touches.length)
          ) {
            var n = Math.sqrt(
              Math.pow(
                a.originalEvent.touches[0].clientX -
                  a.originalEvent.touches[1].clientX,
                2
              ) +
                Math.pow(
                  a.originalEvent.touches[0].clientY -
                    a.originalEvent.touches[1].clientY,
                  2
                )
            );
            return void i.setZoom(
              (i.pinchZoomParameters.initialFov *
                i.pinchZoomParameters.initialDistance) /
                n
            );
          }
          var l = i.imageCanvas.relMouseCoords(a);
          if (!i.dragging || r) {
            e(i, l.x, l.y);
            var h = i.aladin.callbacksByEventName.mouseMove;
            if ("function" == typeof h) {
              var c = i.aladin.pix2world(l.x, l.y);
              void 0 !== c
                ? h({ ra: c[0], dec: c[1], x: l.x, y: l.y })
                : null != s && h({ ra: null, dec: null, x: l.x, y: l.y }),
                (s = c);
            }
            if (!i.dragging && !i.mode == t.SELECT) {
              var u = i.closestObjects(l.x, l.y, 5);
              if (u) {
                i.setCursor("pointer");
                var p = i.aladin.callbacksByEventName.objectHovered;
                if ("function" == typeof p && u[0] != o) {
                  p(u[0]);
                }
                o = u[0];
              } else {
                i.setCursor("default");
                var p = i.aladin.callbacksByEventName.objectHovered;
                if ("function" == typeof p && o) {
                  o = null;
                  p(null);
                }
              }
            }
            if (!r) return;
          }
          if (i.dragging) {
            var d, f;
            if (a.originalEvent && a.originalEvent.targetTouches) {
              a.originalEvent.targetTouches[0].clientX - i.dragx,
                a.originalEvent.targetTouches[0].clientY - i.dragy;
              var v = AladinUtils.viewToXy(
                  a.originalEvent.targetTouches[0].clientX,
                  a.originalEvent.targetTouches[0].clientY,
                  i.width,
                  i.height,
                  i.largestDim,
                  i.zoomFactor
                ),
                g = AladinUtils.viewToXy(
                  i.dragx,
                  i.dragy,
                  i.width,
                  i.height,
                  i.largestDim,
                  i.zoomFactor
                );
              (d = i.projection.unproject(v.x, v.y)),
                (f = i.projection.unproject(g.x, g.y));
            } else {
              l.x - i.dragx, l.y - i.dragy;
              var v = AladinUtils.viewToXy(
                  l.x,
                  l.y,
                  i.width,
                  i.height,
                  i.largestDim,
                  i.zoomFactor
                ),
                g = AladinUtils.viewToXy(
                  i.dragx,
                  i.dragy,
                  i.width,
                  i.height,
                  i.largestDim,
                  i.zoomFactor
                );
              (d = i.projection.unproject(v.x, v.y)),
                (f = i.projection.unproject(g.x, g.y));
            }
            if (
              (a.originalEvent && a.originalEvent.targetTouches
                ? ((i.dragx = a.originalEvent.targetTouches[0].clientX),
                  (i.dragy = a.originalEvent.targetTouches[0].clientY))
                : ((i.dragx = l.x), (i.dragy = l.y)),
              i.mode == t.SELECT)
            )
              return void i.requestRedraw();
            (i.viewCenter.lon += f.ra - d.ra),
              (i.viewCenter.lat += f.dec - d.dec),
              i.viewCenter.lat > 90
                ? (i.viewCenter.lat = 90)
                : i.viewCenter.lat < -90 && (i.viewCenter.lat = -90),
              i.viewCenter.lon < 0
                ? (i.viewCenter.lon = 360 + i.viewCenter.lon)
                : i.viewCenter.lon > 360 &&
                  (i.viewCenter.lon = i.viewCenter.lon % 360),
              (i.realDragging = !0),
              i.requestRedraw();
          }
        }),
          ($(i.aladinDiv).onselectstart = function () {
            return !1;
          }),
          $(i.reticleCanvas).on("mousewheel", function (t) {
            t.preventDefault(), t.stopPropagation();
            var e = i.zoomLevel,
              r = t.deltaY;
            return (
              t.hasOwnProperty("originalEvent") &&
                (r = -t.originalEvent.deltaY),
              r > 0 ? (e += 1) : (e -= 1),
              i.setZoomLevel(e),
              !1
            );
          });
      });
    var r = function (e) {
      var i = new Stats();
      (i.domElement.style.top = "50px"),
        $("#aladin-statsDiv").length > 0 &&
          $("#aladin-statsDiv")[0].appendChild(i.domElement),
        (e.stats = i),
        createListeners(e),
        (e.executeCallbacksThrottled = Utils.throttle(function () {
          var t = e.aladin.pix2world(e.width / 2, e.height / 2),
            i = e.fov;
          if (void 0 !== t && void 0 !== i) {
            var r = t[0],
              o = t[1];
            if (r !== this.ra || o !== this.dec) {
              var s = e.aladin.callbacksByEventName.positionChanged;
              "function" == typeof s && s({ ra: r, dec: o, dragging: !0 }),
                (this.ra = r),
                (this.dec = o);
            }
            if (i !== this.old_fov) {
              var a = e.aladin.callbacksByEventName.zoomChanged;
              "function" == typeof a && a(i), (this.old_fov = i);
            }
          }
        }, t.CALLBACKS_THROTTLE_TIME_MS)),
        (e.displayHpxGrid = !1),
        (e.displaySurvey = !0),
        (e.displayCatalog = !1),
        (e.displayReticle = !0),
        (e.fov = computeFov(e)),
        updateFovDiv(e),
        e.redraw();
    };
    (t.prototype.requestRedrawAtDate = function (t) {
      this.dateRequestDraw = t;
    }),
      (t.prototype.getBackgroundColor = function () {
        var t = "rgb(0, 0, 0)";
        if (!this.imageSurvey) return t;
        var e = this.imageSurvey.getColorMap();
        if (!e) return t;
        if ("native" == e.mapName || "grayscale" == e.mapName)
          return e.reversed ? "rgb(255, 255, 255)" : t;
        var i = e.reversed ? 255 : 0;
        return (
          "rgb(" +
          ColorMap.MAPS[e.mapName].r[i] +
          "," +
          ColorMap.MAPS[e.mapName].g[i] +
          "," +
          ColorMap.MAPS[e.mapName].b[i] +
          ")"
        );
      }),
      (t.prototype.getViewParams = function () {
        var t =
          this.width > this.height
            ? this.fov / this.width
            : this.fov / this.height;
        return {
          fov: [this.width * t, this.height * t],
          width: this.width,
          height: this.height,
        };
      }),
      (t.prototype.redraw = function () {
        var e = this.needRedraw;
        requestAnimFrame(this.redraw.bind(this));
        var i = new Date().getTime();
        if (this.dateRequestDraw && i > this.dateRequestDraw)
          this.dateRequestDraw = null;
        else if (!this.needRedraw) {
          if (!this.flagForceRedraw) return;
          this.flagForceRedraw = !1;
        }
        this.stats.update();
        var r = this.imageCtx;
        r.start2D && r.start2D(),
          r.clearRect(0, 0, this.imageCanvas.width, this.imageCanvas.height);
        var o = this.getBackgroundColor();
        if (this.projectionMethod == ProjectionEnum.SIN)
          if (this.fov >= 60) {
            (r.fillStyle = o), r.beginPath();
            var s = this.cx > this.cy ? this.cx : this.cy;
            r.arc(this.cx, this.cy, s * this.zoomFactor, 0, 2 * Math.PI, !0),
              r.fill();
          } else
            (r.fillStyle = o),
              r.fillRect(0, 0, this.imageCanvas.width, this.imageCanvas.height);
        else
          this.projectionMethod == ProjectionEnum.AITOFF &&
            r.ellipse &&
            ((r.fillStyle = o),
            r.beginPath(),
            r.ellipse(
              this.cx,
              this.cy,
              2.828 * this.cx * this.zoomFactor,
              this.cx * this.zoomFactor * 1.414,
              0,
              0,
              2 * Math.PI
            ),
            r.fill());
        r.finish2D && r.finish2D(),
          this.projection.setCenter(this.viewCenter.lon, this.viewCenter.lat),
          this.projection.setProjection(this.projectionMethod);
        var a = null;
        if (
          (this.imageSurvey &&
            this.imageSurvey.isReady &&
            this.displaySurvey &&
            (null == this.aladin.reduceDeformations
              ? this.imageSurvey.draw(r, this, !this.dragging, this.curNorder)
              : this.imageSurvey.draw(
                  r,
                  this,
                  this.aladin.reduceDeformations,
                  this.curNorder
                )),
          this.overlayImageSurvey &&
            this.overlayImageSurvey.isReady &&
            ((r.globalAlpha = this.overlayImageSurvey.getAlpha()),
            null == this.aladin.reduceDeformations
              ? this.overlayImageSurvey.draw(
                  r,
                  this,
                  !this.dragging,
                  this.curOverlayNorder
                )
              : this.overlayImageSurvey.draw(
                  r,
                  this,
                  this.aladin.reduceDeformations,
                  this.curOverlayNorder
                ),
            (r.globalAlpha = 1)),
          this.displayHpxGrid)
        ) {
          var n = this.getVisibleCells(3),
            a = null;
          this.curNorder >= 3 &&
            (a =
              3 == this.curNorder ? n : this.getVisibleCells(this.curNorder)),
            a && this.curNorder > 3
              ? this.healpixGrid.redraw(r, a, this.fov, this.curNorder)
              : this.healpixGrid.redraw(r, n, this.fov, 3);
        }
        this.showGrid &&
          (null == this.cooGrid && (this.cooGrid = new CooGrid()),
          this.cooGrid.redraw(
            r,
            this.projection,
            this.cooFrame,
            this.width,
            this.height,
            this.largestDim,
            this.zoomFactor,
            this.fov
          ));
        var l = this.catalogCtx,
          h = !1;
        if (
          (this.mustClearCatalog &&
            (l.clearRect(0, 0, this.width, this.height),
            (h = !0),
            (this.mustClearCatalog = !1)),
          this.catalogs &&
            this.catalogs.length > 0 &&
            this.displayCatalog &&
            (!this.dragging || t.DRAW_SOURCES_WHILE_DRAGGING))
        ) {
          h || (l.clearRect(0, 0, this.width, this.height), (h = !0));
          for (var c = 0; c < this.catalogs.length; c++) {
            this.catalogs[c].draw(
              l,
              this.projection,
              this.cooFrame,
              this.width,
              this.height,
              this.largestDim,
              this.zoomFactor
            );
          }
        }
        this.catalogForPopup.isShowing &&
          this.catalogForPopup.sources.length > 0 &&
          (h || (l.clearRect(0, 0, this.width, this.height), (h = !0)),
          this.catalogForPopup.draw(
            l,
            this.projection,
            this.cooFrame,
            this.width,
            this.height,
            this.largestDim,
            this.zoomFactor
          ));
        var u = this.catalogCtx;
        if (
          this.overlays &&
          this.overlays.length > 0 &&
          (!this.dragging || t.DRAW_SOURCES_WHILE_DRAGGING)
        ) {
          h || (l.clearRect(0, 0, this.width, this.height), (h = !0));
          for (var c = 0; c < this.overlays.length; c++)
            this.overlays[c].draw(
              u,
              this.projection,
              this.cooFrame,
              this.width,
              this.height,
              this.largestDim,
              this.zoomFactor
            );
        }
        var p = this.catalogCtx;
        if (
          this.mocs &&
          this.mocs.length > 0 &&
          (!this.dragging || t.DRAW_MOCS_WHILE_DRAGGING)
        ) {
          h || (l.clearRect(0, 0, this.width, this.height), (h = !0));
          for (var c = 0; c < this.mocs.length; c++)
            this.mocs[c].draw(
              p,
              this.projection,
              this.cooFrame,
              this.width,
              this.height,
              this.largestDim,
              this.zoomFactor,
              this.fov
            );
        }
        this.mode == t.SELECT && (mustRedrawReticle = !0);
        var d = this.reticleCtx;
        if (
          ((this.mustRedrawReticle || this.mode == t.SELECT) &&
            d.clearRect(0, 0, this.width, this.height),
          this.displayReticle)
        ) {
          if (!this.reticleCache) {
            var f = document.createElement("canvas"),
              v = this.options.reticleSize;
            (f.width = v), (f.height = v);
            var g = f.getContext("2d");
            (g.lineWidth = 2),
              (g.strokeStyle = this.options.reticleColor),
              g.beginPath(),
              g.moveTo(v / 2, v / 2 + (v / 2 - 1)),
              g.lineTo(v / 2, v / 2 + 2),
              g.moveTo(v / 2, v / 2 - (v / 2 - 1)),
              g.lineTo(v / 2, v / 2 - 2),
              g.moveTo(v / 2 + (v / 2 - 1), v / 2),
              g.lineTo(v / 2 + 2, v / 2),
              g.moveTo(v / 2 - (v / 2 - 1), v / 2),
              g.lineTo(v / 2 - 2, v / 2),
              g.stroke(),
              (this.reticleCache = f);
          }
          d.drawImage(
            this.reticleCache,
            this.width / 2 - this.reticleCache.width / 2,
            this.height / 2 - this.reticleCache.height / 2
          ),
            (this.mustRedrawReticle = !1);
        }
        if (
          this.projectionMethod == ProjectionEnum.SIN &&
          this.fov >= 60 &&
          !0 === this.aladin.options.showAllskyRing
        ) {
          r.strokeStyle = this.aladin.options.allskyRingColor;
          var m = this.aladin.options.allskyRingWidth;
          (r.lineWidth = m), r.beginPath();
          var s = this.cx > this.cy ? this.cx : this.cy;
          r.arc(
            this.cx,
            this.cy,
            (s - m / 2 + 1) * this.zoomFactor,
            0,
            2 * Math.PI,
            !0
          ),
            r.stroke();
        }
        if (this.mode == t.SELECT && this.dragging) {
          d.fillStyle = "rgba(100, 240, 110, 0.25)";
          var y = this.dragx - this.selectStartCoo.x,
            S = this.dragy - this.selectStartCoo.y;
          d.fillRect(this.selectStartCoo.x, this.selectStartCoo.y, y, S);
        }
        e == this.needRedraw && (this.needRedraw = !1),
          this.dragging || this.updateObjectsLookup(),
          this.executeCallbacksThrottled();
      }),
      (t.prototype.forceRedraw = function () {
        this.flagForceRedraw = !0;
      }),
      (t.prototype.refreshProgressiveCats = function () {
        if (this.catalogs)
          for (var t = 0; t < this.catalogs.length; t++)
            "progressivecat" == this.catalogs[t].type &&
              this.catalogs[t].loadNeededTiles();
      }),
      (t.prototype.getVisiblePixList = function (t, e) {
        var i,
          r = Math.pow(2, t),
          o = HealpixIndex.nside2Npix(r);
        if (this.fov > 80) {
          i = [];
          for (var s = 0; s < o; s++) i.push(s);
        } else {
          var a = new HealpixIndex(r);
          a.init();
          var n = new SpatialVector(),
            l = AladinUtils.viewToXy(
              this.cx,
              this.cy,
              this.width,
              this.height,
              this.largestDim,
              this.zoomFactor
            ),
            h = this.projection.unproject(l.x, l.y),
            c = [];
          e && e.system != this.cooFrame.system
            ? e.system == CooFrameEnum.SYSTEMS.J2000
              ? (c = CooConversion.GalacticToJ2000([h.ra, h.dec]))
              : e.system == CooFrameEnum.SYSTEMS.GAL &&
                (c = CooConversion.J2000ToGalactic([h.ra, h.dec]))
            : (c = [h.ra, h.dec]),
            this.imageSurvey && this.imageSurvey.longitudeReversed,
            n.set(c[0], c[1]);
          var u = 0.5 * this.fov * this.ratio;
          this.fov > 60 ? (u *= 1.6) : this.fov > 12 ? (u *= 1.45) : (u *= 1.1),
            (i = a.queryDisc(n, (u * Math.PI) / 180, !0, !0));
          var p = Utils.radecToPolar(c[0], c[1]);
          (ipixCenter = a.ang2pix_nest(p.theta, p.phi)), i.unshift(ipixCenter);
        }
        return i;
      }),
      (t.prototype.getVisibleCells = function (t, e) {
        !e && this.imageSurvey && (e = this.imageSurvey.cooFrame);
        var i,
          r = [],
          o = [],
          s = new SpatialVector(),
          a = Math.pow(2, t),
          n = HealpixIndex.nside2Npix(a),
          l = null;
        if (this.fov > 80) {
          i = [];
          for (var h = 0; h < n; h++) i.push(h);
        } else {
          var c = new HealpixIndex(a);
          c.init();
          var u = new SpatialVector(),
            p = AladinUtils.viewToXy(
              this.cx,
              this.cy,
              this.width,
              this.height,
              this.largestDim,
              this.zoomFactor
            ),
            d = this.projection.unproject(p.x, p.y),
            f = [];
          e && e.system != this.cooFrame.system
            ? e.system == CooFrameEnum.SYSTEMS.J2000
              ? (f = CooConversion.GalacticToJ2000([d.ra, d.dec]))
              : e.system == CooFrameEnum.SYSTEMS.GAL &&
                (f = CooConversion.J2000ToGalactic([d.ra, d.dec]))
            : (f = [d.ra, d.dec]),
            this.imageSurvey && this.imageSurvey.longitudeReversed,
            u.set(f[0], f[1]);
          var v = 0.5 * this.fov * this.ratio;
          this.fov > 60 ? (v *= 1.6) : this.fov > 12 ? (v *= 1.45) : (v *= 1.1),
            (i = c.queryDisc(u, (v * Math.PI) / 180, !0, !0));
          var g = Utils.radecToPolar(f[0], f[1]);
          (l = c.ang2pix_nest(g.theta, g.phi)), i.unshift(l);
        }
        for (var h, m, y, S = 0, w = i.length; S < w; S++)
          if (!((h = i[S]) == l && S > 0)) {
            var C = [];
            corners = HealpixCache.corners_nest(h, a);
            for (var x = 0; x < 4; x++) {
              if (
                (s.setXYZ(corners[x].x, corners[x].y, corners[x].z),
                e && e.system != this.cooFrame.system)
              ) {
                if (e.system == CooFrameEnum.SYSTEMS.J2000) {
                  var d = CooConversion.J2000ToGalactic([s.ra(), s.dec()]);
                  (m = d[0]), (y = d[1]);
                } else if (e.system == CooFrameEnum.SYSTEMS.GAL) {
                  var d = CooConversion.GalacticToJ2000([s.ra(), s.dec()]);
                  (m = d[0]), (y = d[1]);
                }
              } else (m = s.ra()), (y = s.dec());
              o[x] = this.projection.project(m, y);
            }
            if (null != o[0] && null != o[1] && null != o[2] && null != o[3]) {
              for (var x = 0; x < 4; x++)
                C[x] = AladinUtils.xyToView(
                  o[x].X,
                  o[x].Y,
                  this.width,
                  this.height,
                  this.largestDim,
                  this.zoomFactor
                );
              if (
                !(
                  (C[0].vx < 0 && C[1].vx < 0 && C[2].vx < 0 && C[3].vx < 0) ||
                  (C[0].vy < 0 && C[1].vy < 0 && C[2].vy < 0 && C[3].vy < 0) ||
                  (C[0].vx >= this.width &&
                    C[1].vx >= this.width &&
                    C[2].vx >= this.width &&
                    C[3].vx >= this.width) ||
                  (C[0].vy >= this.height &&
                    C[1].vy >= this.height &&
                    C[2].vy >= this.height &&
                    C[3].vy >= this.height)
                )
              ) {
                if (this.projection.PROJECTION == ProjectionEnum.AITOFF) {
                  var _ = C[0].vx - C[2].vx,
                    b = C[0].vy - C[2].vy,
                    I = Math.sqrt(_ * _ + b * b);
                  if (I > this.largestDim / 5) continue;
                  if (
                    ((_ = C[1].vx - C[3].vx),
                    (b = C[1].vy - C[3].vy),
                    (I = Math.sqrt(_ * _ + b * b)) > this.largestDim / 5)
                  )
                    continue;
                }
                (C.ipix = h), r.push(C);
              }
            }
          }
        return r;
      }),
      (t.prototype.getPositionsInView = function (t, e) {
        for (
          var i,
            r,
            o = [],
            s = new SpatialVector(),
            a = Math.pow(2, e),
            n = [],
            l = HealpixCache.corners_nest(t, a),
            h = 0;
          h < 4;
          h++
        ) {
          if (
            (s.setXYZ(l[h].x, l[h].y, l[h].z),
            this.imageSurvey &&
              this.imageSurvey.cooFrame.system != this.cooFrame.system)
          ) {
            if (
              this.imageSurvey.cooFrame.system == CooFrameEnum.SYSTEMS.J2000
            ) {
              var c = CooConversion.J2000ToGalactic([s.ra(), s.dec()]);
              (i = c[0]), (r = c[1]);
            } else if (
              this.imageSurvey.cooFrame.system == CooFrameEnum.SYSTEMS.GAL
            ) {
              var c = CooConversion.GalacticToJ2000([s.ra(), s.dec()]);
              (i = c[0]), (r = c[1]);
            }
          } else (i = s.ra()), (r = s.dec());
          o[h] = this.projection.project(i, r);
        }
        if (null == o[0] || null == o[1] || null == o[2] || null == o[3])
          return null;
        for (var h = 0; h < 4; h++)
          n[h] = AladinUtils.xyToView(
            o[h].X,
            o[h].Y,
            this.width,
            this.height,
            this.largestDim,
            this.zoomFactor
          );
        return n;
      }),
      (t.prototype.computeZoomFactor = function (t) {
        return t > 0
          ? AladinUtils.getZoomFactorForAngle(
              180 / Math.pow(1.15, t),
              this.projectionMethod
            )
          : 1 + 0.1 * t;
      }),
      (t.prototype.setZoom = function (t) {
        if (!(t < 0 || (t > 180 && !this.aladin.options.allowFullZoomout))) {
          var e = Math.log(180 / t) / Math.log(1.15);
          this.setZoomLevel(e);
        }
      }),
      (t.prototype.setShowGrid = function (t) {
        (this.showGrid = t), this.requestRedraw();
      }),
      (t.prototype.setZoomLevel = function (t) {
        if (this.minFOV || this.maxFOV) {
          var e = doComputeFov(this, this.computeZoomFactor(Math.max(-2, t)));
          if (
            (this.maxFOV && e > this.maxFOV) ||
            (this.minFOV && e < this.minFOV)
          )
            return;
        }
        this.projectionMethod == ProjectionEnum.SIN
          ? !0 === this.aladin.options.allowFullZoomout
            ? this.width / this.height > 2
              ? (this.zoomLevel = Math.max(-7, t))
              : this.width / this.height < 0.5
              ? (this.zoomLevel = Math.max(-2, t))
              : (this.zoomLevel = Math.max(-6, t))
            : (this.zoomLevel = Math.max(-2, t))
          : (this.zoomLevel = Math.max(-7, t)),
          (this.zoomFactor = this.computeZoomFactor(this.zoomLevel));
        this.fov;
        if (
          ((this.fov = computeFov(this)),
          updateFovDiv(this),
          this.computeNorder(),
          this.forceRedraw(),
          this.requestRedraw(),
          !this.debounceProgCatOnZoom)
        ) {
          var i = this;
          this.debounceProgCatOnZoom = Utils.debounce(function () {
            i.refreshProgressiveCats();
          }, 300);
        }
        this.debounceProgCatOnZoom();
      }),
      (t.prototype.computeNorder = function () {
        var t = this.fov / this.largestDim,
          e = HealpixIndex.calculateNSide(1843200 * t),
          i = Math.log(e) / Math.log(2);
        (i = Math.max(i, 1)),
          (this.realNorder = i),
          this.fov <= 50 && i <= 2 && (i = 3),
          this.imageSurvey &&
            i <= 2 &&
            this.imageSurvey.minOrder > 2 &&
            (i = this.imageSurvey.minOrder);
        var r = i;
        this.imageSurvey &&
          i > this.imageSurvey.maxOrder &&
          (i = this.imageSurvey.maxOrder),
          this.overlayImageSurvey &&
            r > this.overlayImageSurvey.maxOrder &&
            (r = this.overlayImageSurvey.maxOrder),
          i > HealpixIndex.ORDER_MAX && (i = HealpixIndex.ORDER_MAX),
          r > HealpixIndex.ORDER_MAX && (r = HealpixIndex.ORDER_MAX),
          (this.curNorder = i),
          (this.curOverlayNorder = r);
      }),
      (t.prototype.untaintCanvases = function () {
        this.createCanvases(),
          createListeners(this),
          this.fixLayoutDimensions();
      }),
      (t.prototype.setOverlayImageSurvey = function (t, e) {
        if (!t)
          return (this.overlayImageSurvey = null), void this.requestRedraw();
        $.support.cors &&
          this.overlayImageSurvey &&
          !this.overlayImageSurvey.useCors &&
          this.untaintCanvases();
        var i;
        "string" == typeof t
          ? (i = HpxImageSurvey.getSurveyFromId(t)) ||
            (i = HpxImageSurvey.getSurveyFromId(
              HpxImageSurvey.DEFAULT_SURVEY_ID
            ))
          : (i = t),
          (i.isReady = !1),
          (this.overlayImageSurvey = i);
        var r = this;
        i.init(this, function () {
          r.computeNorder(),
            (i.isReady = !0),
            r.requestRedraw(),
            r.updateObjectsLookup(),
            e && e();
        });
      }),
      (t.prototype.setUnknownSurveyIfNeeded = function () {
        o && (this.setImageSurvey(o), (o = void 0));
      });
    var o = void 0;
    return (
      (t.prototype.setImageSurvey = function (t, e) {
        if (t) {
          $.support.cors &&
            this.imageSurvey &&
            !this.imageSurvey.useCors &&
            this.untaintCanvases();
          var i;
          "string" == typeof t
            ? (i = HpxImageSurvey.getSurveyFromId(t)) ||
              ((i = HpxImageSurvey.getSurveyFromId(
                HpxImageSurvey.DEFAULT_SURVEY_ID
              )),
              (o = t))
            : (i = t),
            (this.tileBuffer = new TileBuffer()),
            this.downloader.emptyQueue(),
            (i.isReady = !1),
            (this.imageSurvey = i),
            this.projection.reverseLongitude(
              this.imageSurvey.longitudeReversed
            );
          var r = this;
          i.init(this, function () {
            r.computeNorder(),
              (i.isReady = !0),
              r.requestRedraw(),
              r.updateObjectsLookup(),
              e && e();
          });
        }
      }),
      (t.prototype.requestRedraw = function () {
        this.needRedraw = !0;
      }),
      (t.prototype.changeProjection = function (t) {
        (this.projectionMethod = t), this.requestRedraw();
      }),
      (t.prototype.changeFrame = function (t) {
        var e = this.cooFrame;
        if (
          ((this.cooFrame = t),
          this.cooFrame.system == CooFrameEnum.SYSTEMS.GAL &&
            this.cooFrame.system != e.system)
        ) {
          var i = CooConversion.J2000ToGalactic([
            this.viewCenter.lon,
            this.viewCenter.lat,
          ]);
          (this.viewCenter.lon = i[0]), (this.viewCenter.lat = i[1]);
        } else if (
          this.cooFrame.system == CooFrameEnum.SYSTEMS.J2000 &&
          this.cooFrame.system != e.system
        ) {
          var r = CooConversion.GalacticToJ2000([
            this.viewCenter.lon,
            this.viewCenter.lat,
          ]);
          (this.viewCenter.lon = r[0]), (this.viewCenter.lat = r[1]);
        }
        this.location.update(
          this.viewCenter.lon,
          this.viewCenter.lat,
          this.cooFrame,
          !0
        ),
          this.requestRedraw();
      }),
      (t.prototype.showHealpixGrid = function (t) {
        (this.displayHpxGrid = t), this.requestRedraw();
      }),
      (t.prototype.showSurvey = function (t) {
        (this.displaySurvey = t), this.requestRedraw();
      }),
      (t.prototype.showCatalog = function (t) {
        (this.displayCatalog = t),
          this.displayCatalog || (this.mustClearCatalog = !0),
          this.requestRedraw();
      }),
      (t.prototype.showReticle = function (t) {
        (this.displayReticle = t),
          (this.mustRedrawReticle = !0),
          this.requestRedraw();
      }),
      (t.prototype.pointTo = function (t, e) {
        if (
          ((t = parseFloat(t)), (e = parseFloat(e)), !isNaN(t) && !isNaN(e))
        ) {
          if (this.cooFrame.system == CooFrameEnum.SYSTEMS.J2000)
            (this.viewCenter.lon = t), (this.viewCenter.lat = e);
          else if (this.cooFrame.system == CooFrameEnum.SYSTEMS.GAL) {
            var i = CooConversion.J2000ToGalactic([t, e]);
            (this.viewCenter.lon = i[0]), (this.viewCenter.lat = i[1]);
          }
          this.location.update(
            this.viewCenter.lon,
            this.viewCenter.lat,
            this.cooFrame,
            !0
          ),
            this.forceRedraw(),
            this.requestRedraw();
          var r = this;
          setTimeout(function () {
            r.refreshProgressiveCats();
          }, 1e3);
        }
      }),
      (t.prototype.makeUniqLayerName = function (t) {
        if (!this.layerNameExists(t)) return t;
        for (var e = 1; ; ++e) {
          var i = t + "_" + e;
          if (!this.layerNameExists(i)) return i;
        }
      }),
      (t.prototype.layerNameExists = function (t) {
        for (var e = this.allOverlayLayers, i = 0; i < e.length; i++)
          if (t == e[i].name) return !0;
        return !1;
      }),
      (t.prototype.removeLayers = function () {
        (this.catalogs = []),
          (this.overlays = []),
          (this.mocs = []),
          (this.allOverlayLayers = []),
          this.requestRedraw();
      }),
      (t.prototype.addCatalog = function (t) {
        (t.name = this.makeUniqLayerName(t.name)),
          this.allOverlayLayers.push(t),
          this.catalogs.push(t),
          "catalog" == t.type
            ? t.setView(this)
            : "progressivecat" == t.type && t.init(this);
      }),
      (t.prototype.addOverlay = function (t) {
        (t.name = this.makeUniqLayerName(t.name)),
          this.overlays.push(t),
          this.allOverlayLayers.push(t),
          t.setView(this);
      }),
      (t.prototype.addMOC = function (t) {
        (t.name = this.makeUniqLayerName(t.name)),
          this.mocs.push(t),
          this.allOverlayLayers.push(t),
          t.setView(this);
      }),
      (t.prototype.getObjectsInBBox = function (t, e, i, r) {
        i < 0 && ((t += i), (i = -i)), r < 0 && ((e += r), (r = -r));
        var o,
          s,
          a,
          n = [];
        if (this.catalogs)
          for (var l = 0; l < this.catalogs.length; l++)
            if (((o = this.catalogs[l]), o.isShowing)) {
              s = o.getSources();
              for (var h = 0; h < s.length; h++)
                (a = s[h]),
                  a.isShowing &&
                    a.x &&
                    a.y &&
                    a.x >= t &&
                    a.x <= t + i &&
                    a.y >= e &&
                    a.y <= e + r &&
                    n.push(a);
            }
        return n;
      }),
      (t.prototype.updateObjectsLookup = function () {
        this.objLookup = [];
        var t, e, i, r, o;
        if (this.catalogs)
          for (var s = 0; s < this.catalogs.length; s++)
            if (((t = this.catalogs[s]), t.isShowing)) {
              e = t.getSources();
              for (var a = 0; a < e.length; a++)
                (i = e[a]),
                  i.isShowing &&
                    i.x &&
                    i.y &&
                    ((r = i.x),
                    (o = i.y),
                    void 0 === this.objLookup[r] && (this.objLookup[r] = []),
                    void 0 === this.objLookup[r][o] &&
                      (this.objLookup[r][o] = []),
                    this.objLookup[r][o].push(i));
            }
      }),
      (t.prototype.closestObjects = function (t, e, i) {
        var r,
          o = this.catalogCanvas,
          s = o.getContext("2d");
        if (((s.lineWidth = 6), this.overlays))
          for (var a = 0; a < this.overlays.length; a++) {
            r = this.overlays[a];
            for (var n = 0; n < r.overlays.length; n++) {
              for (
                var l = r.overlays[n], h = [], c = 0;
                c < l.polygons.length;
                c++
              ) {
                var u = AladinUtils.radecToViewXy(
                  l.polygons[c][0],
                  l.polygons[c][1],
                  this.projection,
                  this.cooFrame,
                  this.width,
                  this.height,
                  this.largestDim,
                  this.zoomFactor
                );
                u && h.push({ x: u.vx, y: u.vy });
              }
              for (var p = 0; p < h.length - 1; p++)
                if (
                  (s.beginPath(),
                  s.moveTo(h[p].x, h[p].y),
                  s.lineTo(h[p + 1].x, h[p + 1].y),
                  s.isPointInStroke(t, e))
                )
                  return (d = l), [d];
            }
            for (var n = 0; n < r.overlay_items.length; n++)
              if (
                r.overlay_items[n] instanceof Circle &&
                (r.overlay_items[n].draw(
                  s,
                  this.projection,
                  this.cooFrame,
                  this.width,
                  this.height,
                  this.largestDim,
                  this.zoomFactor,
                  !0
                ),
                s.isPointInStroke(t, e))
              )
                return (d = r.overlay_items[n]), [d];
          }
        if (!this.objLookup) return null;
        for (var d, f, v = 0; v <= i; v++) {
          d = f = null;
          for (var g = -i; g <= i; g++)
            if (this.objLookup[t + g])
              for (var m = -i; m <= i; m++)
                if (this.objLookup[t + g][e + m]) {
                  var y = g * g + m * m;
                  d
                    ? y < f && ((f = y), (d = this.objLookup[t + g][e + m]))
                    : ((d = this.objLookup[t + g][e + m]), (f = y));
                }
          if (d) return d;
        }
        return null;
      }),
      t
    );
  })()),
  (Aladin = (function () {
    function t(t, e, i, r, o) {
      function s(t) {
        return (t * Math.PI) / 180;
      }
      function a(t) {
        return (180 * t) / Math.PI;
      }
      var e = s(e),
        t = s(t),
        r = s(r),
        i = s(i),
        n =
          2 *
          Math.asin(
            Math.sqrt(
              Math.pow(Math.sin((e - r) / 2), 2) +
                Math.cos(e) * Math.cos(r) * Math.pow(Math.sin((t - i) / 2), 2)
            )
          ),
        l = Math.sin((1 - o) * n) / Math.sin(n),
        h = Math.sin(o * n) / Math.sin(n),
        c = l * Math.cos(e) * Math.cos(t) + h * Math.cos(r) * Math.cos(i),
        u = l * Math.cos(e) * Math.sin(t) + h * Math.cos(r) * Math.sin(i),
        p = l * Math.sin(e) + h * Math.sin(r),
        d = Math.atan2(u, c),
        f = Math.atan2(p, Math.sqrt(Math.pow(c, 2) + Math.pow(u, 2)));
      return [a(d), a(f)];
    }
    var e = function (t, i) {
      if (0 == $(t).length)
        return void console.log(
          "Could not find div " +
            t +
            ". Aborting creation of Aladin Lite instance"
        );
      var r = this;
      if (
        (void 0 === i && (i = this.getOptionsFromQueryString()),
        "zoom" in (i = i || {}))
      ) {
        var o = i.zoom;
        delete i.zoom, (i.fov = o);
      }
      var s = {};
      for (var a in e.DEFAULT_OPTIONS)
        void 0 !== i[a] ? (s[a] = i[a]) : (s[a] = e.DEFAULT_OPTIONS[a]);
      for (var a in i) void 0 === e.DEFAULT_OPTIONS[a] && (s[a] = i[a]);
      (this.options = s),
        $(
          "<style type='text/css'> .aladin-reticleColor { color: " +
            this.options.reticleColor +
            "; font-weight:bold;} </style>"
        ).appendTo(t),
        (this.aladinDiv = t),
        (this.reduceDeformations = !0),
        $(t).addClass("aladin-container");
      var n = CooFrameEnum.fromString(s.cooFrame, CooFrameEnum.J2000),
        l = $(
          '<div class="aladin-location">' +
            (s.showFrame
              ? '<select class="aladin-frameChoice"><option value="' +
                CooFrameEnum.J2000.label +
                '" ' +
                (n == CooFrameEnum.J2000 ? 'selected="selected"' : "") +
                '>J2000</option><option value="' +
                CooFrameEnum.J2000d.label +
                '" ' +
                (n == CooFrameEnum.J2000d ? 'selected="selected"' : "") +
                '>J2000d</option><option value="' +
                CooFrameEnum.GAL.label +
                '" ' +
                (n == CooFrameEnum.GAL ? 'selected="selected"' : "") +
                ">GAL</option></select>"
              : "") +
            '<span class="aladin-location-text"></span></div>'
        ).appendTo(t),
        h = $('<div class="aladin-fov"></div>').appendTo(t);
      s.showZoomControl &&
        $(
          '<div class="aladin-zoomControl"><a href="#" class="zoomPlus" title="Zoom in">+</a><a href="#" class="zoomMinus" title="Zoom out">&ndash;</a></div>'
        ).appendTo(t),
        s.showFullscreenControl &&
          $(
            '<div class="aladin-fullscreenControl aladin-maximize" title="Full screen"></div>'
          ).appendTo(t),
        (this.fullScreenBtn = $(t).find(".aladin-fullscreenControl")),
        this.fullScreenBtn.click(function () {
          r.toggleFullscreen(r.options.realFullscreen);
        }),
        $(document).on(
          "fullscreenchange webkitfullscreenchange mozfullscreenchange MSFullscreenChange",
          function (t) {
            var e =
              document.fullscreenElement ||
              document.webkitFullscreenElement ||
              document.mozFullScreenElement ||
              document.msFullscreenElement;
            if (null === e || void 0 === e) {
              r.fullScreenBtn.removeClass("aladin-restore"),
                r.fullScreenBtn.addClass("aladin-maximize"),
                r.fullScreenBtn.attr("title", "Full screen"),
                $(r.aladinDiv).removeClass("aladin-fullscreen");
              var i = r.callbacksByEventName.fullScreenToggled,
                o = r.fullScreenBtn.hasClass("aladin-restore");
              "function" == typeof i && i(o);
            }
          }
        ),
        $(
          "<div class='aladin-logo-container'><a href='http://aladin.unistra.fr/' title='Powered by Aladin Lite' target='_blank'><div class='aladin-logo'></div></a></div>"
        ).appendTo(t),
        (this.boxes = []),
        (this.measurementTable = new MeasurementTable(t));
      var c = new Location(l.find(".aladin-location-text"));
      if (
        ((this.view = new View(this, c, h, n, s.fov)),
        this.view.setShowGrid(s.showCooGrid),
        $.ajax({
          url: "//aladin.unistra.fr/java/nph-aladin.pl",
          data: { frame: "aladinLiteDic" },
          method: "GET",
          dataType: "jsonp",
          success: function (t) {
            for (var e = {}, i = 0; i < t.length; i++) e[t[i].id] = !0;
            for (var i = 0; i < HpxImageSurvey.SURVEYS.length; i++)
              e[HpxImageSurvey.SURVEYS[i].id] ||
                t.push(HpxImageSurvey.SURVEYS[i]);
            (HpxImageSurvey.SURVEYS = t), r.view.setUnknownSurveyIfNeeded();
          },
          error: function () {},
        }),
        s.showLayersControl)
      ) {
        var u = $(
          '<div class="aladin-layersControl-container" title="Manage layers"><div class="aladin-layersControl"></div></div>'
        );
        u.appendTo(t);
        var p = $(
          '<div class="aladin-box aladin-layerBox aladin-cb-list"></div>'
        );
        p.appendTo(t),
          this.boxes.push(p),
          u.click(function () {
            return r.hideBoxes(), r.showLayerBox(), !1;
          });
      }
      if (s.showGotoControl) {
        var u = $(
          '<div class="aladin-gotoControl-container" title="Go to position"><div class="aladin-gotoControl"></div></div>'
        );
        u.appendTo(t);
        var d = $(
          '<div class="aladin-box aladin-gotoBox"><a class="aladin-closeBtn">&times;</a><div style="clear: both;"></div><form class="aladin-target-form">Go to: <input type="text" placeholder="Object name/position" /></form></div>'
        );
        d.appendTo(t), this.boxes.push(d);
        var f = d.find(".aladin-target-form input");
        f.on("paste keydown", function () {
          $(this).removeClass("aladin-unknownObject");
        }),
          u.click(function () {
            return (
              r.hideBoxes(),
              f.val(""),
              f.removeClass("aladin-unknownObject"),
              d.show(),
              f.focus(),
              !1
            );
          }),
          d.find(".aladin-closeBtn").click(function () {
            return r.hideBoxes(), !1;
          });
      }
      if (s.showSimbadPointerControl) {
        var u = $(
          '<div class="aladin-simbadPointerControl-container" title="SIMBAD pointer"><div class="aladin-simbadPointerControl"></div></div>'
        );
        u.appendTo(t),
          u.click(function () {
            r.view.setMode(View.TOOL_SIMBAD_POINTER);
          });
      }
      if (s.showShareControl) {
        var u = $(
          '<div class="aladin-shareControl-container" title="Get link for current view"><div class="aladin-shareControl"></div></div>'
        );
        u.appendTo(t);
        var v = $(
          '<div class="aladin-box aladin-shareBox"><a class="aladin-closeBtn">&times;</a><div style="clear: both;"></div>Link to previewer: <span class="info"></span><input type="text" class="aladin-shareInput" /></div>'
        );
        v.appendTo(t),
          this.boxes.push(v),
          u.click(function () {
            r.hideBoxes(), v.show();
            var t = r.getShareURL();
            return (
              v.find(".aladin-shareInput").val(t).select(),
              document.execCommand("copy"),
              !1
            );
          }),
          v.find(".aladin-closeBtn").click(function () {
            return r.hideBoxes(), !1;
          });
      }
      if ((this.gotoObject(s.target), s.log)) {
        var g = i;
        (g.version = e.VERSION), Logger.log("startup", g);
      }
      if ((this.showReticle(s.showReticle), s.catalogUrls))
        for (var m = 0, y = s.catalogUrls.length; m < y; m++)
          this.createCatalogFromVOTable(s.catalogUrls[m]);
      this.setImageSurvey(s.survey), this.view.showCatalog(s.showCatalog);
      var S = this;
      $(t)
        .find(".aladin-frameChoice")
        .change(function () {
          S.setFrame($(this).val());
        }),
        $("#projectionChoice").change(function () {
          S.setProjection($(this).val());
        }),
        $(t)
          .find(".aladin-target-form")
          .submit(function () {
            return (
              S.gotoObject($(this).find("input").val(), function () {
                $(t)
                  .find(".aladin-target-form input")
                  .addClass("aladin-unknownObject");
              }),
              !1
            );
          });
      var w = $(t).find(".zoomPlus");
      w.click(function () {
        return S.increaseZoom(), !1;
      }),
        w.bind("mousedown", function (t) {
          t.preventDefault();
        });
      var C = $(t).find(".zoomMinus");
      C.click(function () {
        return S.decreaseZoom(), !1;
      }),
        C.bind("mousedown", function (t) {
          t.preventDefault();
        }),
        s.fullScreen &&
          window.setTimeout(function () {
            r.toggleFullscreen(r.options.realFullscreen);
          }, 1e3),
        (this.callbacksByEventName = {});
    };
    (e.VERSION = "2020-08-24"),
      (e.JSONP_PROXY = "https://alasky.unistra.fr/cgi/JSONProxy"),
      (e.DEFAULT_OPTIONS = {
        target: "0 +0",
        cooFrame: "J2000",
        survey: "P/DSS2/color",
        fov: 60,
        showReticle: !0,
        showZoomControl: !0,
        showFullscreenControl: !0,
        showLayersControl: !0,
        showGotoControl: !0,
        showSimbadPointerControl: !1,
        showShareControl: !1,
        showCatalog: !0,
        showFrame: !0,
        showCooGrid: !1,
        fullScreen: !1,
        reticleColor: "rgb(178, 50, 178)",
        reticleSize: 22,
        log: !0,
        allowFullZoomout: !1,
        realFullscreen: !1,
        showAllskyRing: !1,
        allskyRingColor: "#c8c8ff",
        allskyRingWidth: 8,
        pixelateCanvas: !0,
      }),
      (e.prototype.toggleFullscreen = function (t) {
        (t = Boolean(t)),
          this.fullScreenBtn.toggleClass("aladin-maximize aladin-restore");
        var e = this.fullScreenBtn.hasClass("aladin-restore");
        if (
          (this.fullScreenBtn.attr(
            "title",
            e ? "Restore original size" : "Full screen"
          ),
          $(this.aladinDiv).toggleClass("aladin-fullscreen"),
          t)
        )
          if (e) {
            var i = this.aladinDiv;
            i.requestFullscreen
              ? i.requestFullscreen()
              : i.webkitRequestFullscreen
              ? i.webkitRequestFullscreen()
              : i.mozRequestFullScreen
              ? i.mozRequestFullScreen()
              : i.msRequestFullscreen && i.msRequestFullscreen();
          } else
            document.exitFullscreen
              ? document.exitFullscreen()
              : document.webkitExitFullscreen
              ? document.webkitExitFullscreen()
              : document.mozCancelFullScreen
              ? document.mozCancelFullScreen()
              : document.webkitExitFullscreen &&
                document.webkitExitFullscreen();
        this.view.fixLayoutDimensions();
        var r = this.callbacksByEventName.zoomChanged;
        "function" == typeof r && r(this.view.fov);
        var o = this.callbacksByEventName.fullScreenToggled;
        "function" == typeof o && o(e);
      }),
      (e.prototype.updateSurveysDropdownList = function (t) {
        t = t.sort(function (t, e) {
          return t.order
            ? t.order && t.order > e.order
              ? 1
              : -1
            : t.id > e.id;
        });
        var e = $(this.aladinDiv).find(".aladin-surveySelection");
        e.empty();
        for (var i = 0; i < t.length; i++) {
          var r = this.view.imageSurvey.id == t[i].id;
          e.append(
            $("<option />").attr("selected", r).val(t[i].id).text(t[i].name)
          );
        }
      }),
      (e.prototype.getOptionsFromQueryString = function () {
        var t = {},
          e = $.urlParam("target");
        e && (t.target = e);
        var i = $.urlParam("frame");
        i && CooFrameEnum[i] && (t.frame = i);
        var r = $.urlParam("survey");
        r && HpxImageSurvey.getSurveyInfoFromId(r) && (t.survey = r);
        var o = $.urlParam("zoom");
        o && o > 0 && o < 180 && (t.zoom = o);
        var s = $.urlParam("showReticle");
        s && (t.showReticle = "true" == s.toLowerCase());
        var a = $.urlParam("cooFrame");
        a && (t.cooFrame = a);
        var n = $.urlParam("fullScreen");
        return void 0 !== n && (t.fullScreen = n), t;
      }),
      (e.prototype.setZoom = function (t) {
        this.view.setZoom(t);
      }),
      (e.prototype.setFoV = e.prototype.setFov = function (t) {
        this.view.setZoom(t);
      }),
      (e.prototype.adjustFovForObject = function (t) {
        var e = this;
        this.getFovForObject(t, function (t) {
          e.setFoV(t);
        });
      }),
      (e.prototype.getFovForObject = function (t, e) {
        var i =
            "SELECT galdim_majaxis, V FROM basic JOIN ident ON oid=ident.oidref JOIN allfluxes ON oid=allfluxes.oidref WHERE id='" +
            t +
            "'",
          r =
            "//simbad.u-strasbg.fr/simbad/sim-tap/sync?query=" +
            encodeURIComponent(i) +
            "&request=doQuery&lang=adql&format=json&phase=run";
        Utils.getAjaxObject(r, "GET", "json", !1).done(function (t) {
          var i = 4 / 60;
          if ("data" in t && t.data.length > 0) {
            var r = Utils.isNumber(t.data[0][0]) ? t.data[0][0] / 60 : null,
              o = Utils.isNumber(t.data[0][1]) ? t.data[0][1] : null;
            null !== r
              ? (i = 2 * r)
              : null !== o && o < 10 && (i = (2 * Math.pow(2, 6 - o / 2)) / 60);
          }
          "function" == typeof e && e(i);
        });
      }),
      (e.prototype.setFrame = function (t) {
        if (t) {
          var e = CooFrameEnum.fromString(t, CooFrameEnum.J2000);
          e != this.view.cooFrame &&
            (this.view.changeFrame(e),
            $(this.aladinDiv).find(".aladin-frameChoice").val(e.label));
        }
      }),
      (e.prototype.setProjection = function (t) {
        if (t)
          switch ((t = t.toLowerCase())) {
            case "aitoff":
              this.view.changeProjection(ProjectionEnum.AITOFF);
              break;
            case "sinus":
            default:
              this.view.changeProjection(ProjectionEnum.SIN);
          }
      }),
      (e.prototype.gotoObject = function (t, e) {
        var i = (errorCallback = void 0);
        if (
          ("object" == typeof e
            ? (e.hasOwnProperty("success") && (i = e.success),
              e.hasOwnProperty("error") && (errorCallback = e.error))
            : "function" == typeof e && (errorCallback = e),
          /[a-zA-Z]/.test(t))
        ) {
          var r = this;
          Sesame.resolve(
            t,
            function (t) {
              var e = t.Target.Resolver.jradeg,
                o = t.Target.Resolver.jdedeg;
              r.view.pointTo(e, o), "function" == typeof i && i(r.getRaDec());
            },
            function (e) {
              console &&
                (console.log("Could not resolve object name " + t),
                console.log(e)),
                "function" == typeof errorCallback && errorCallback();
            }
          );
        } else {
          var o = new Coo();
          o.parse(t);
          var s = [o.lon, o.lat];
          this.view.cooFrame == CooFrameEnum.GAL &&
            (s = CooConversion.GalacticToJ2000(s)),
            this.view.pointTo(s[0], s[1]),
            "function" == typeof i && i(this.getRaDec());
        }
      }),
      (e.prototype.gotoPosition = function (t, e) {
        var i;
        (i =
          this.view.cooFrame == CooFrameEnum.GAL
            ? CooConversion.GalacticToJ2000([t, e])
            : [t, e]),
          this.view.pointTo(i[0], i[1]);
      });
    var i = function (e) {
      var r = e.animationParams;
      if (null != r && r.running) {
        var o = new Date().getTime();
        if (o > r.end)
          return (
            e.gotoRaDec(r.raEnd, r.decEnd), void (r.complete && r.complete())
          );
        var s = (o - r.start) / (r.end - r.start),
          a = t(r.raStart, r.decStart, r.raEnd, r.decEnd, s);
        (curRa = a[0]),
          (curDec = a[1]),
          e.gotoRaDec(curRa, curDec),
          setTimeout(function () {
            i(e);
          }, 50);
      }
    };
    (e.prototype.stopAnimation = function () {
      this.zoomAnimationParams && (this.zoomAnimationParams.running = !1),
        this.animationParams && (this.animationParams.running = !1);
    }),
      (e.prototype.animateToRaDec = function (t, e, r, o) {
        (r = r || 5), (this.animationParams = null);
        var s = {};
        (s.start = new Date().getTime()),
          (s.end = new Date().getTime() + 1e3 * r);
        var a = this.getRaDec();
        (s.raStart = a[0]),
          (s.decStart = a[1]),
          (s.raEnd = t),
          (s.decEnd = e),
          (s.complete = o),
          (s.running = !0),
          (this.animationParams = s),
          i(this);
      });
    var r = function (t) {
      var e = t.zoomAnimationParams;
      if (null != e && e.running) {
        var i = new Date().getTime();
        if (i > e.end)
          return t.setFoV(e.fovEnd), void (e.complete && e.complete());
        var o = (i - e.start) / (e.end - e.start),
          s = e.fovStart + (e.fovEnd - e.fovStart) * Math.sqrt(o);
        t.setFoV(s),
          setTimeout(function () {
            r(t);
          }, 50);
      }
    };
    return (
      (e.prototype.zoomToFoV = function (t, e, i) {
        (e = e || 5), (this.zoomAnimationParams = null);
        var o = {};
        (o.start = new Date().getTime()),
          (o.end = new Date().getTime() + 1e3 * e);
        var s = this.getFov();
        (o.fovStart = Math.max(s[0], s[1])),
          (o.fovEnd = t),
          (o.complete = i),
          (o.running = !0),
          (this.zoomAnimationParams = o),
          r(this);
      }),
      (e.prototype.getRaDec = function () {
        return this.view.cooFrame.system == CooFrameEnum.SYSTEMS.J2000
          ? [this.view.viewCenter.lon, this.view.viewCenter.lat]
          : CooConversion.GalacticToJ2000([
              this.view.viewCenter.lon,
              this.view.viewCenter.lat,
            ]);
      }),
      (e.prototype.gotoRaDec = function (t, e) {
        this.view.pointTo(t, e);
      }),
      (e.prototype.showHealpixGrid = function (t) {
        this.view.showHealpixGrid(t);
      }),
      (e.prototype.showSurvey = function (t) {
        this.view.showSurvey(t);
      }),
      (e.prototype.showCatalog = function (t) {
        this.view.showCatalog(t);
      }),
      (e.prototype.showReticle = function (t) {
        this.view.showReticle(t), $("#displayReticle").attr("checked", t);
      }),
      (e.prototype.removeLayers = function () {
        this.view.removeLayers();
      }),
      (e.prototype.addCatalog = function (t) {
        this.view.addCatalog(t);
      }),
      (e.prototype.addOverlay = function (t) {
        this.view.addOverlay(t);
      }),
      (e.prototype.addMOC = function (t) {
        this.view.addMOC(t);
      }),
      (e.prototype.createImageSurvey = function (t, e, i, r, o, s) {
        return new HpxImageSurvey(t, e, i, r, o, s);
      }),
      (e.prototype.getBaseImageLayer = function () {
        return this.view.imageSurvey;
      }),
      (e.prototype.setImageSurvey = function (t, e) {
        if (
          (this.view.setImageSurvey(t, e),
          this.updateSurveysDropdownList(HpxImageSurvey.getAvailableSurveys()),
          this.options.log)
        ) {
          var i = t;
          "string" != typeof t && (i = t.rootUrl),
            Logger.log("changeImageSurvey", i);
        }
      }),
      (e.prototype.setBaseImageLayer = e.prototype.setImageSurvey),
      (e.prototype.getOverlayImageLayer = function () {
        return this.view.overlayImageSurvey;
      }),
      (e.prototype.setOverlayImageLayer = function (t, e) {
        this.view.setOverlayImageSurvey(t, e);
      }),
      (e.prototype.increaseZoom = function (t) {
        t || (t = 5), this.view.setZoomLevel(this.view.zoomLevel + t);
      }),
      (e.prototype.decreaseZoom = function (t) {
        t || (t = 5), this.view.setZoomLevel(this.view.zoomLevel - t);
      }),
      (e.prototype.createCatalog = function (t) {
        return A.catalog(t);
      }),
      (e.prototype.createProgressiveCatalog = function (t, e, i, r) {
        return new ProgressiveCat(t, e, i, r);
      }),
      (e.prototype.createSource = function (t, e, i) {
        return new cds.Source(t, e, i);
      }),
      (e.prototype.createMarker = function (t, e, i, r) {
        return (i = i || {}), (i.marker = !0), new cds.Source(t, e, r, i);
      }),
      (e.prototype.createOverlay = function (t) {
        return new Overlay(t);
      }),
      (e.prototype.createFootprintsFromSTCS = function (t) {
        return A.footprintsFromSTCS(t);
      }),
      (A.footprintsFromSTCS = function (t) {
        return Overlay.parseSTCS(t);
      }),
      (A.MOCFromURL = function (t, e, i) {
        var r = new MOC(e);
        return r.dataFromFITSURL(t, i), r;
      }),
      (A.MOCFromJSON = function (t, e) {
        var i = new MOC(e);
        return i.dataFromJSON(t), i;
      }),
      (e.prototype.createCatalogFromVOTable = function (t, e) {
        return A.catalogFromURL(t, e);
      }),
      (A.catalogFromURL = function (t, e, i, r) {
        var o = A.catalog(e);
        return (
          cds.Catalog.parseVOTable(
            t,
            function (t) {
              o.addSources(t), i && i(t);
            },
            o.maxNbSources,
            r,
            o.raField,
            o.decField
          ),
          o
        );
      }),
      (A.catalogFromSimbad = function (t, e, i, r) {
        "name" in (i = i || {}) || (i.name = "Simbad");
        var o = URLBuilder.buildSimbadCSURL(t, e);
        return A.catalogFromURL(o, i, r, !1);
      }),
      (A.catalogFromNED = function (t, e, i, r) {
        "name" in (i = i || {}) || (i.name = "NED");
        var o;
        if (t && "object" == typeof t)
          "ra" in t &&
            "dec" in t &&
            (o = URLBuilder.buildNEDPositionCSURL(t.ra, t.dec, e));
        else {
          if (/[a-zA-Z]/.test(t)) o = URLBuilder.buildNEDObjectCSURL(t, e);
          else {
            var s = new Coo();
            s.parse(t), (o = URLBuilder.buildNEDPositionCSURL(s.lon, s.lat, e));
          }
        }
        return A.catalogFromURL(o, i, r);
      }),
      (A.catalogFromVizieR = function (t, e, i, r, o) {
        "name" in (r = r || {}) || (r.name = "VizieR:" + t);
        var s = URLBuilder.buildVizieRCSURL(t, e, i, r);
        return A.catalogFromURL(s, r, o, !1);
      }),
      (A.catalogFromSkyBot = function (t, e, i, r, o, s, a) {
        (o = o || {}), "name" in (s = s || {}) || (s.name = "SkyBot");
        var n = URLBuilder.buildSkyBotCSURL(t, e, i, r, o);
        return A.catalogFromURL(n, s, a, !1);
      }),
      (e.AVAILABLE_CALLBACKS = [
        "select",
        "objectClicked",
        "objectHovered",
        "footprintClicked",
        "footprintHovered",
        "positionChanged",
        "zoomChanged",
        "click",
        "mouseMove",
        "fullScreenToggled",
      ]),
      (e.prototype.on = function (t, i) {
        e.AVAILABLE_CALLBACKS.indexOf(t) < 0 ||
          (this.callbacksByEventName[t] = i);
      }),
      (e.prototype.select = function () {
        this.fire("selectstart");
      }),
      (e.prototype.fire = function (t, e) {
        if ("selectstart" === t) this.view.setMode(View.SELECT);
        else if ("selectend" === t) {
          this.view.setMode(View.PAN);
          var i = this.callbacksByEventName.select;
          "function" == typeof i && i(e);
        }
      }),
      (e.prototype.hideBoxes = function () {
        if (this.boxes)
          for (var t = 0; t < this.boxes.length; t++) this.boxes[t].hide();
      }),
      (e.prototype.updateCM = function () {}),
      (e.prototype.showLayerBox = function () {
        var t = this,
          e = $(this.aladinDiv).find(".aladin-layerBox");
        e.empty(),
          e.append(
            '<a class="aladin-closeBtn">&times;</a><div style="clear: both;"></div><div class="aladin-label">Base image layer</div><select class="aladin-surveySelection"></select><div class="aladin-cmap">Color map:<div><select class="aladin-cmSelection"></select><button class="aladin-btn aladin-btn-small aladin-reverseCm" type="button">Reverse</button></div></div><div class="aladin-box-separator"></div><div class="aladin-label">Overlay layers</div>'
          );
        for (
          var i = e.find(".aladin-cmap"),
            r = e.find(".aladin-cmSelection"),
            o = 0;
          o < ColorMap.MAPS_NAMES.length;
          o++
        )
          r.append($("<option />").text(ColorMap.MAPS_NAMES[o]));
        r.val(t.getBaseImageLayer().getColorMap().mapName);
        for (
          var s = this.view.allOverlayLayers, a = "<ul>", o = s.length - 1;
          o >= 0;
          o--
        ) {
          var n = s[o],
            l = n.name,
            h = "";
          n.isShowing && (h = 'checked="checked"');
          var c = "",
            u = "";
          if ("catalog" == n.type || "progressivecat" == n.type) {
            var p = n.getSources().length;
            (c = p + " source" + (p > 1 ? "s" : "")),
              (u = AladinUtils.SVG_ICONS.CATALOG);
          } else
            "moc" == n.type
              ? ((c =
                  "Coverage: " +
                  (100 * n.skyFraction()).toFixed(3) +
                  " % of sky"),
                (u = AladinUtils.SVG_ICONS.MOC))
              : "overlay" == n.type && (u = AladinUtils.SVG_ICONS.OVERLAY);
          var d = $("<div></div>").css("color", n.color).css("color"),
            f = Color.getLabelColorForBackground(d);
          (a +=
            '<li><div class="aladin-stack-icon" style=\'background-image: url("data:image/svg+xml;base64,' +
            window.btoa(u.replace(/FILLCOLOR/g, n.color)) +
            "\");'></div>"),
            (a +=
              '<input type="checkbox" ' +
              h +
              ' id="aladin_lite_' +
              l +
              '"></input><label for="aladin_lite_' +
              l +
              '" class="aladin-layer-label" style="background: ' +
              n.color +
              "; color:" +
              f +
              ';" title="' +
              c +
              '">' +
              l +
              "</label></li>");
        }
        (a += "</ul>"),
          e.append(a),
          e.append('<div class="aladin-blank-separator"></div>');
        var h = "";
        this.view.displayReticle && (h = 'checked="checked"');
        var v = $('<input type="checkbox" ' + h + ' id="displayReticle" />');
        e.append(v).append('<label for="displayReticle">Reticle</label><br/>'),
          v.change(function () {
            t.showReticle($(this).is(":checked"));
          }),
          (h = ""),
          this.view.displayHpxGrid && (h = 'checked="checked"');
        var g = $('<input type="checkbox" ' + h + ' id="displayHpxGrid"/>');
        e
          .append(g)
          .append('<label for="displayHpxGrid">HEALPix grid</label><br/>'),
          g.change(function () {
            t.showHealpixGrid($(this).is(":checked"));
          }),
          e.append(
            '<div class="aladin-box-separator"></div><div class="aladin-label">Tools</div>'
          );
        var m = $(
          '<button class="aladin-btn" type="button">Export view as PNG</button>'
        );
        e.append(m),
          m.click(function () {
            t.exportAsPNG();
          }),
          e.find(".aladin-closeBtn").click(function () {
            return t.hideBoxes(), !1;
          }),
          this.updateSurveysDropdownList(HpxImageSurvey.getAvailableSurveys()),
          $(this.aladinDiv)
            .find(".aladin-surveySelection")
            .change(function () {
              var e = HpxImageSurvey.getAvailableSurveys()[
                $(this)[0].selectedIndex
              ];
              t.setImageSurvey(e.id, function () {
                var e = t.getBaseImageLayer();
                e.useCors
                  ? (r.val(e.getColorMap().mapName), i.show(), m.show())
                  : (i.hide(), m.hide());
              });
            }),
          i.find(".aladin-cmSelection").change(function () {
            var e = $(this).find(":selected").val();
            t.getBaseImageLayer().getColorMap().update(e);
          }),
          i.find(".aladin-reverseCm").click(function () {
            t.getBaseImageLayer().getColorMap().reverse();
          }),
          this.getBaseImageLayer().useCors
            ? (i.show(), m.show())
            : (i.hide(), m.hide()),
          e.find(".aladin-reverseCm").parent().attr("disabled", !0),
          $(this.aladinDiv)
            .find(".aladin-layerBox ul input")
            .change(function () {
              var e = $(this).attr("id").substr(12),
                i = t.layerByName(e);
              $(this).is(":checked") ? i.show() : i.hide();
            }),
          e.show();
      }),
      (e.prototype.layerByName = function (t) {
        for (var e = this.view.allOverlayLayers, i = 0; i < e.length; i++)
          if (t == e[i].name) return e[i];
        return null;
      }),
      (e.prototype.exportAsPNG = function (t) {
        var e = window.open();
        e.document.write('<img src="' + this.getViewDataURL() + '">'),
          (e.document.title = "Aladin Lite snapshot");
      }),
      (e.prototype.getViewDataURL = function (t) {
        var t = t || {};
        if ("object" != typeof t) {
          t = { format: t };
        }
        return this.view.getCanvasDataURL(t.format, t.width, t.height);
      }),
      (e.prototype.getViewWCS = function (t) {
        var e = this.getRaDec(),
          i = this.getFov();
        return {
          NAXIS: 2,
          NAXIS1: this.view.width,
          NAXIS2: this.view.height,
          RADECSYS: "ICRS",
          CRPIX1: this.view.width / 2,
          CRPIX2: this.view.height / 2,
          CRVAL1: e[0],
          CRVAL2: e[1],
          CTYPE1: "RA---SIN",
          CTYPE2: "DEC--SIN",
          CD1_1: i[0] / this.view.width,
          CD1_2: 0,
          CD2_1: 0,
          CD2_2: i[1] / this.view.height,
        };
      }),
      (e.prototype.setFovRange = e.prototype.setFOVRange = function (t, e) {
        if (t > e) {
          var i = t;
          (t = e), (e = i);
        }
        (this.view.minFOV = t), (this.view.maxFOV = e);
      }),
      (e.prototype.pix2world = function (t, e) {
        if (this.view) {
          var i,
            r = AladinUtils.viewToXy(
              t,
              e,
              this.view.width,
              this.view.height,
              this.view.largestDim,
              this.view.zoomFactor
            );
          try {
            i = this.view.projection.unproject(r.x, r.y);
          } catch (t) {
            return;
          }
          return this.view.cooFrame == CooFrameEnum.GAL
            ? CooConversion.GalacticToJ2000([i.ra, i.dec])
            : [i.ra, i.dec];
        }
      }),
      (e.prototype.world2pix = function (t, e) {
        if (this.view) {
          var i;
          if (this.view.cooFrame == CooFrameEnum.GAL) {
            var r = CooConversion.J2000ToGalactic([t, e]);
            i = this.view.projection.project(r[0], r[1]);
          } else i = this.view.projection.project(t, e);
          if (i) {
            var o = AladinUtils.xyToView(
              i.X,
              i.Y,
              this.view.width,
              this.view.height,
              this.view.largestDim,
              this.view.zoomFactor
            );
            return [o.vx, o.vy];
          }
          return null;
        }
      }),
      (e.prototype.getFovCorners = function (t) {
        (!t || t < 1) && (t = 1);
        for (var e, i, r, o, s = [], a = 0; a < 4; a++) {
          (e = 0 == a || 3 == a ? 0 : this.view.width - 1),
            (i = a < 2 ? 0 : this.view.height - 1),
            (r = a < 2 ? this.view.width - 1 : 0),
            (o = 1 == a || 2 == a ? this.view.height - 1 : 0);
          for (var n = 0; n < t; n++)
            s.push(
              this.pix2world(e + (n / t) * (r - e), i + (n / t) * (o - i))
            );
        }
        return s;
      }),
      (e.prototype.getFov = function () {
        var t = this.view.fov,
          e = this.getSize(),
          i = (e[1] / e[0]) * t;
        return (t = Math.min(t, 180)), (i = Math.min(i, 180)), [t, i];
      }),
      (e.prototype.getSize = function () {
        return [this.view.width, this.view.height];
      }),
      (e.prototype.getParentDiv = function () {
        return $(this.aladinDiv);
      }),
      e
    );
  })()),
  (A.aladin = function (t, e) {
    return new Aladin($(t)[0], e);
  }),
  (A.imageLayer = function (t, e, i, r) {
    return new HpxImageSurvey(t, e, i, null, null, r);
  }),
  (A.source = function (t, e, i, r) {
    return new cds.Source(t, e, i, r);
  }),
  (A.marker = function (t, e, i, r) {
    return (i = i || {}), (i.marker = !0), A.source(t, e, r, i);
  }),
  (A.polygon = function (t) {
    var e = t.length;
    return (
      e > 0 &&
        ((t[0][0] == t[e - 1][0] && t[0][1] == t[e - 1][1]) ||
          t.push([t[0][0], t[0][1]])),
      new Footprint(t)
    );
  }),
  (A.polyline = function (t, e) {
    return new Polyline(t, e);
  }),
  (A.circle = function (t, e, i, r) {
    return new Circle([t, e], i, r);
  }),
  (A.graphicOverlay = function (t) {
    return new Overlay(t);
  }),
  (A.catalog = function (t) {
    return new cds.Catalog(t);
  }),
  (A.catalogHiPS = function (t, e) {
    return new ProgressiveCat(t, null, null, e);
  }),
  (Aladin.prototype.box = function (t) {
    var e = new Box(t);
    return e.$parentDiv.appendTo(this.aladinDiv), e;
  }),
  (Aladin.prototype.showPopup = function (t, e, i, r) {
    this.view.catalogForPopup.removeAll();
    var o = A.marker(t, e, {
      popupTitle: i,
      popupDesc: r,
      useMarkerDefaultIcon: !1,
    });
    this.view.catalogForPopup.addSources(o),
      this.view.catalogForPopup.show(),
      this.view.popup.setTitle(i),
      this.view.popup.setText(r),
      this.view.popup.setSource(o),
      this.view.popup.show();
  }),
  (Aladin.prototype.hidePopup = function () {
    this.view.popup.hide();
  }),
  (Aladin.prototype.getShareURL = function () {
    var t = this.getRaDec(),
      e = new Coo();
    return (
      (e.prec = 7),
      (e.lon = t[0]),
      (e.lat = t[1]),
      "http://aladin.unistra.fr/AladinLite/?target=" +
        encodeURIComponent(e.format("s")) +
        "&fov=" +
        this.getFov()[0].toFixed(2) +
        "&survey=" +
        encodeURIComponent(
          this.getBaseImageLayer().id || this.getBaseImageLayer().rootUrl
        )
    );
  }),
  (Aladin.prototype.getEmbedCode = function () {
    var t = this.getRaDec(),
      e = new Coo();
    (e.prec = 7), (e.lon = t[0]), (e.lat = t[1]);
    var i = this.getBaseImageLayer().id,
      r = this.getFov()[0],
      o = "";
    return (
      (o +=
        '<link rel="stylesheet" href="http://aladin.unistra.fr/AladinLite/api/v2/latest/aladin.min.css" />\n'),
      (o +=
        '<script type="text/javascript" src="//code.jquery.com/jquery-1.9.1.min.js" charset="utf-8"></script>\n'),
      (o +=
        '<div id="aladin-lite-div" style="width:400px;height:400px;"></div>\n'),
      (o +=
        '<script type="text/javascript" src="http://aladin.unistra.fr/AladinLite/api/v2/latest/aladin.min.js" charset="utf-8"></script>\n'),
      (o += '<script type="text/javascript">\n'),
      (o +=
        'var aladin = A.aladin("#aladin-lite-div", {survey: "' +
        i +
        'P/DSS2/color", fov: ' +
        r.toFixed(2) +
        ', target: "' +
        e.format("s") +
        '"});\n'),
      (o += "</script>")
    );
  }),
  (Aladin.prototype.displayFITS = function (t, e, i, r) {
    e = e || {};
    var o = { url: t };
    e.color && (o.color = !0),
      e.outputFormat && (o.format = e.outputFormat),
      e.order && (o.order = e.order),
      e.nocache && (o.nocache = e.nocache);
    var s = this;
    $.ajax({
      url: "https://alasky.unistra.fr/cgi/fits2HiPS",
      data: o,
      method: "GET",
      dataType: "json",
      success: function (t) {
        if ("success" != t.status)
          return (
            console.error("An error occured: " + t.message),
            void (r && r(t.message))
          );
        var o = e.label || "FITS image",
          a = t.data.meta;
        s.setOverlayImageLayer(
          s.createImageSurvey(o, o, t.data.url, "equatorial", a.max_norder, {
            imgFormat: "png",
          })
        );
        var n = (e && e.transparency) || 1;
        s.getOverlayImageLayer().setAlpha(n);
        var l = !0;
        i && (l = i(a.ra, a.dec, a.fov)),
          !0 === l && (s.gotoRaDec(a.ra, a.dec), s.setFoV(a.fov));
      },
    });
  }),
  (Aladin.prototype.displayJPG = Aladin.prototype.displayPNG = function (
    t,
    e,
    i,
    r
  ) {
    (e = e || {}),
      (e.color = !0),
      (e.label = "JPG/PNG image"),
      (e.outputFormat = "png"),
      this.displayFITS(t, e, i, r);
  }),
  (Aladin.prototype.setReduceDeformations = function (t) {
    (this.reduceDeformations = t), this.view.requestRedraw();
  }),
  $ && ($.aladin = A.aladin);
