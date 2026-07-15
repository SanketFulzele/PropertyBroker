import { useEffect } from "react";
import { useLocation } from "react-router-dom";

type FbqFunction = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  push: (...args: unknown[]) => void;
  loaded: boolean;
  version: string;
};

declare global {
  interface Window {
    fbq?: FbqFunction;
    _fbq?: unknown;
  }
}

const PIXEL_ID = "1849098536468259";

let initialized = false;

function initializeFacebookPixel() {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return;
  }

  if (window.fbq) {
    return;
  }

  const queue: unknown[][] = [];
  const fbq = function (...args: unknown[]) {
    if (typeof fbq.callMethod === "function") {
      fbq.callMethod(...args);
    } else {
      queue.push(args);
    }
  } as FbqFunction;

  fbq.callMethod = undefined;
  fbq.queue = queue;
  fbq.push = (...args: unknown[]) => {
    queue.push(args);
  };
  fbq.loaded = true;
  fbq.version = "2.0";

  window.fbq = fbq;
  window._fbq = fbq;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";

  const firstScript = document.getElementsByTagName("script")[0];
  if (firstScript?.parentNode) {
    firstScript.parentNode.insertBefore(script, firstScript);
  } else {
    document.head.appendChild(script);
  }
}

export default function MetaPixel() {
  const location = useLocation();

  useEffect(() => {
    if (!initialized) {
      initializeFacebookPixel();
      if (window.fbq) {
        window.fbq("init", PIXEL_ID);
      }
      initialized = true;
    }

    if (window.fbq) {
      window.fbq("track", "PageView");
    }
  }, [location.pathname]);

  return null;
}