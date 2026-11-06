import { ContentScrollContext, MobileNavigationContext } from "./";
import { APP_MODES } from "./constants";
import { useEffect, useState, useContext } from "react";
import type { ContentScrollContextType, MobileNavigationContextType } from "./";

export const useInitialScaleHook = (initialScale: number = 2) => {
  useEffect(() => {
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

export const useProgrammedContainerScrollHook = () => {
  const { containerRef } = useContext<MobileNavigationContextType>(
    MobileNavigationContext,
  );
  const { setIsIgnoreScroll } =
    useContext<ContentScrollContextType>(ContentScrollContext);

  useEffect(() => {
    containerRef.current?.addEventListener("scrollend", () => {
      setIsIgnoreScroll(false);
    });
  });

  const scrollEl = (
    elRef = containerRef,
    {
      left = 0,
      top = 0,
      behavior = "smooth",
    }: {
      left?: number;
      top?: number;
      behavior?: ScrollBehavior | undefined;
    },
  ) => {
    setIsIgnoreScroll(true);
    elRef.current?.scroll({ left, top, behavior });
  };

  return {
    scrollEl,
  };
};
