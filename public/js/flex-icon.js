/*
 * @Date: 2022-10-27 14:15:15
 * @LastEditTime: 2022-10-27 14:15:15
 * @LastEditors: 刘玉田
 * @Description:
 */
(window._iconfont_svg_string_3712446 =
  '<svg><symbol id="icon-align-center" viewBox="0 0 1024 1024"><path d="M460.16 1024V0h103.68v1024H460.16zM64 577.152h896v296.32H64v-296.32z m89.6 98.816v98.752h716.8v-98.752H153.6z m0-525.44h716.8v296.32H153.6v-296.32z m89.6 98.752v98.752h537.6V249.28H243.2z" fill="#262626" ></path></symbol><symbol id="icon-aligncenter-fill" viewBox="0 0 1024 1024"><path d="M460.16 1024V0h103.68v1024H460.16zM64 577.152h896v296.32H64v-296.32z m89.6-426.688h716.8v296.32H153.6v-296.32z" fill="#262626" ></path></symbol><symbol id="icon-a-Justifyspace-aroundrow" viewBox="0 0 1024 1024"><path d="M320 864H192v160H128v-160H0V160h128V0h64v160h128v704z m704 0h-128v160h-64v-160h-128V160h128V0h64v160h128v704z"  ></path></symbol><symbol id="icon-a-Justifyspace-betweenrow" viewBox="0 0 1024 1024"><path d="M64 1024H0V0h64v1024z m384-160H128V160h320v704z m448 0H576V160h320v704z m128 160h-64V0h64v1024z"  ></path></symbol><symbol id="icon-a-Alignflex-endrow" viewBox="0 0 1024 1024"><path d="M480 800V96H160v704h320z m384 0V96H544v704h320z m160 128v-64H0v64h1024z"  ></path></symbol><symbol id="icon-a-Justifyflex-startrow" viewBox="0 0 1024 1024"><path d="M608 160h320v704H608V160zM224 160h320v704H224V160zM96 0h64v1024H96V0z"  ></path></symbol><symbol id="icon-a-Justifyflex-endrow" viewBox="0 0 1024 1024"><path d="M416 160H96v704h320V160z m384 0H480v704h320V160z m128-160h-64v1024h64V0z"  ></path></symbol><symbol id="icon-a-Alignflex-startrow" viewBox="0 0 1024 1024"><path d="M480 224v704H160V224h320z m384 0v704H544V224h320z m160-128v64H0V96h1024z"  ></path></symbol></svg>'),
  (function (o) {
    var t = (t = document.getElementsByTagName("script"))[t.length - 1],
      e = t.getAttribute("data-injectcss"),
      t = t.getAttribute("data-disable-injectsvg");
    if (!t) {
      var n,
        i,
        a,
        h,
        s,
        v = function (t, e) {
          e.parentNode.insertBefore(t, e);
        };
      if (e && !o.__iconfont__svg__cssinject__) {
        o.__iconfont__svg__cssinject__ = !0;
        try {
          document.write(
            "<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>"
          );
        } catch (t) {
          console && console.log(t);
        }
      }
      (n = function () {
        var t,
          e = document.createElement("div");
        (e.innerHTML = o._iconfont_svg_string_3712446),
          (e = e.getElementsByTagName("svg")[0]) &&
            (e.setAttribute("aria-hidden", "true"),
            (e.style.position = "absolute"),
            (e.style.width = 0),
            (e.style.height = 0),
            (e.style.overflow = "hidden"),
            (e = e),
            (t = document.body).firstChild
              ? v(e, t.firstChild)
              : t.appendChild(e));
      }),
        document.addEventListener
          ? ~["complete", "loaded", "interactive"].indexOf(document.readyState)
            ? setTimeout(n, 0)
            : ((i = function () {
                document.removeEventListener("DOMContentLoaded", i, !1), n();
              }),
              document.addEventListener("DOMContentLoaded", i, !1))
          : document.attachEvent &&
            ((a = n),
            (h = o.document),
            (s = !1),
            l(),
            (h.onreadystatechange = function () {
              "complete" == h.readyState &&
                ((h.onreadystatechange = null), d());
            }));
    }
    function d() {
      s || ((s = !0), a());
    }
    function l() {
      try {
        h.documentElement.doScroll("left");
      } catch (t) {
        return void setTimeout(l, 50);
      }
      d();
    }
  })(window);
