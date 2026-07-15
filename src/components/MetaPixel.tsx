import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    fbq: any;
    _fbq: any;
  }
}

const PIXEL_ID = "1849098536468259";

let initialized = false;

export default function MetaPixel() {
  const location = useLocation();

  useEffect(() => {
    if (!initialized) {
      !(function (f: any, b, e, v, n?: any, t?: any, s?: any) {
        if (f.fbq) return;

        n = f.fbq = function () {
          n.callMethod
            ? n.callMethod.apply(n, arguments)
            : n.queue.push(arguments);
        };

        if (!f._fbq) f._fbq = n;

        n.push = n;
        n.loaded = true;
        n.version = "2.0";
        n.queue = [];

        t = b.createElement(e);
        t.async = true;
        t.src = v;

        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(
        window,
        document,
        "script",
        "https://connect.facebook.net/en_US/fbevents.js"
      );

      window.fbq("init", PIXEL_ID);

      initialized = true;
    }

    window.fbq("track", "PageView");
  }, [location.pathname]);

  return null;
}