import { APP_MODES } from "./constants";
import { useEffect, useState } from "react";

export const useInitialScaleHook = (initialScale: number = 2) => {
  useEffect(() => {
    console.log("INITIAL SCALE", initialScale);
    document.querySelector<Element>("meta[name=viewport]")?.setAttribute(
      "content",
      `width=device-width,
         user-scalable=no,
         initial-scale=${initialScale / window.devicePixelRatio}`,
    );
  }, []);
};

function getAppMode(): "standalone" | "fullscreen" | "minimal-ui" | "browser" {
  if (window.matchMedia("(display-mode: standalone)").matches) {
    return APP_MODES["standalone"];
  }

  if (window.matchMedia("(display-mode: fullscreen)").matches) {
    return APP_MODES["fullscreen"];
  }

  if (window.matchMedia("(display-mode: minimal-ui)").matches) {
    return APP_MODES["minimal-ui"];
  }

  // iOS/iPadOS Safari when launched from the Home Screen
  // @ts-ignore
  if (window.navigator.standalone === true) {
    return APP_MODES["standalone"];
  }

  return APP_MODES["browser"];
}

export const useAppModeHook = (): {
  appMode: "standalone" | "fullscreen" | "browser" | "minimal-ui";
} => {
  const [appMode, setAppMode] = useState<
    "standalone" | "browser" | "minimal-ui" | "fullscreen"
  >("browser");

  useEffect(() => {
    setAppMode(getAppMode());
  }, []);

  return { appMode };
};
