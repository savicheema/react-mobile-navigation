// import { type ReactElement } from "react";
import type { JSX } from "react";
import * as React from "react";
import { CSS_CLASS_PREFIX } from "./constants";

export type Content = {
  content: JSX.Element;
  navButtonTitle: string;
  svgIcon?: SVGElement;
  serial: number;
};
const promiseScrollRight = ({ left }: { left: number }): Promise<void> =>
  new Promise((resolve) => {
    window.scrollTo({
      left,
      behavior: "smooth",
    });

    const interval = setInterval(() => {
      if (window.scrollX >= left - 10) {
        clearInterval(interval);
        setTimeout(() => {
          resolve();
        }, (left / window.innerWidth) * 200);
      }
    }, 100);
  });

const promiseScrollLeft = ({
  left,
  currentLeft,
}: {
  left: number;
  currentLeft: number;
}): Promise<void> =>
  new Promise((resolve) => {
    window.scrollTo({
      left,
      behavior: "smooth",
    });

    const interval = setInterval(() => {
      if (window.scrollX <= left) {
        clearInterval(interval);
        setTimeout(() => {
          resolve();
        }, ((currentLeft - left) / window.innerWidth) * 200);
      }
    }, 100);
  });

const promiseScrollTop = (): Promise<void> =>
  new Promise((resolve) => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setTimeout(() => {
      resolve();
    }, 40);
  });

export const debounce = (func: Function, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>; // Variable to hold the setTimeout ID

  return function (...args: any) {
    // 'this' context of the call
    // @ts-ignore
    const context = this;

    // 1. Clear the previous timeout:
    // If a call was made recently, clear its scheduled execution.
    clearTimeout(timeoutId);

    // 2. Set a new timeout:
    // Schedule the function 'func' to be executed after 'delay' milliseconds.
    timeoutId = setTimeout(() => {
      // Execute the original function with the correct context and arguments
      func.apply(context, args);
    }, delay);
  };
};

export const useNavigationScrollHook = () => {
  const {
    currentScrollLeft,
    setCurrentScrollLeft,
    isScrolling,
    setIsScrolling,
    setCurrentSerial,
    currentSerial,
  } = React.useContext(MobileNavigationContext);

  function handleScrollEvent(e: Event) {
    if (isScrolling) return;

    const mod = window.scrollX % window.innerWidth;

    // scroll right
    if (mod > 120 && mod < window.innerWidth / 2) {
      window.scrollTo({
        left:
          Math.floor(window.scrollX / window.innerWidth) * window.innerWidth,
        behavior: "smooth",
      });
      return;
    }
    // scroll left
    if (
      mod > window.innerWidth / 2 &&
      Math.ceil(window.scrollX / window.innerWidth) * window.innerWidth -
        window.scrollX >
        120
    ) {
      window.scrollTo({
        left: Math.ceil(window.scrollX / window.innerWidth) * window.innerWidth,
        behavior: "smooth",
      });
      return;
    }
  }

  const debouncedScrollEventHandler = debounce(handleScrollEvent, 120);

  React.useEffect(() => {
    if (!isScrolling) {
      window.addEventListener("touchmove", debouncedScrollEventHandler);
    } else {
      window.removeEventListener("touchmove", debouncedScrollEventHandler);
    }
  }, [isScrolling]);

  async function scroll(index: number, serial: number) {
    setCurrentSerial(serial);

    setIsScrolling(true);
    navigator.vibrate?.(40);

    const left = index * window.innerWidth;

    if (left > currentScrollLeft) {
      await promiseScrollRight({ left });
    } else {
      await promiseScrollLeft({ left, currentLeft: currentScrollLeft });
    }

    setCurrentScrollLeft(window.scrollX);

    await promiseScrollTop();

    setIsScrolling(false);
  }
  return {
    currentScrollLeft,
    setCurrentScrollLeft,
    scroll,
    currentSerial,
  };
};

const ContentContainer = ({ contents }: { contents: Content[] }) => {
  const { currentSerial } = useNavigationScrollHook();
  return (
    <>
      <style>
        {`.${CSS_CLASS_PREFIX}container {
        display: flex;
      }`}
      </style>
      <div
        className={`${CSS_CLASS_PREFIX}container`}
        data-testid="content-container"
      >
        <style>{`div.${CSS_CLASS_PREFIX}section {flex: 1 0 100vw; justify-content: center;}`}</style>
        {!contents?.length
          ? "no content"
          : contents.map((content, index) => (
              <div className={`${CSS_CLASS_PREFIX}section`} key={index}>
                <React.Activity
                  mode={content.serial === currentSerial ? "visible" : "hidden"}
                >
                  {content.content}
                </React.Activity>
              </div>
            ))}
      </div>
    </>
  );
};

const NavigationBar = ({ contents }: { contents: Content[] }) => {
  const { scroll } = useNavigationScrollHook();
  return (
    <>
      <style>
        {`div.${CSS_CLASS_PREFIX}navigation-bar {
            position: fixed;
            right: 0;
            left: 0;
            bottom: 8px;
            background-color: black;
            color: white;
            display: flex;
            justify-content: space-evenly;
            max-width: 100vw;
          }`}
      </style>
      <style>
        {`button.${CSS_CLASS_PREFIX}nav-button {
                      background-color: red;
                      flex: 1 0 auto;
                      border: 1px solid white;
                      padding: 16px 0;

                      @media screen and (min-width: 720px) {
                        padding: 12px 0;
                      }
                    }`}
      </style>
      <div
        className={`${CSS_CLASS_PREFIX}navigation-bar`}
        data-testid="navigation-bar"
      >
        {!contents?.length
          ? null
          : contents.map((content, index) => (
              <button
                type="button"
                className={`${CSS_CLASS_PREFIX}nav-button`}
                onClick={async () => {
                  scroll(index, content.serial);
                }}
                key={index}
              >
                {content.navButtonTitle}
              </button>
            ))}
      </div>
    </>
  );
};

type MobileNavigationContextType = {
  currentScrollLeft: number;
  setCurrentScrollLeft: React.Dispatch<React.SetStateAction<number>>;
  isScrolling: boolean;
  setIsScrolling: React.Dispatch<React.SetStateAction<boolean>>;
  currentSerial: number;
  setCurrentSerial: React.Dispatch<React.SetStateAction<number>>;
};

const MobileNavigationContext =
  React.createContext<MobileNavigationContextType>({
    currentScrollLeft: 0,
    setCurrentScrollLeft: () => 0,
    isScrolling: false,
    setIsScrolling: () => false,
    currentSerial: 1,
    setCurrentSerial: () => 1,
  });

const MobileNavigation = ({ contents }: { contents: Content[] }) => {
  function sortContent(content1: Content, content2: Content) {
    return content1.serial - content2.serial;
  }

  const sortedContent = [...contents].sort(sortContent);

  const [currentScrollLeft, setCurrentScrollLeft] = React.useState(0);
  const [isScrolling, setIsScrolling] = React.useState(false);
  const [currentSerial, setCurrentSerial] = React.useState(1);
  return (
    <MobileNavigationContext.Provider
      value={{
        currentScrollLeft,
        setCurrentScrollLeft,
        isScrolling,
        setIsScrolling,
        currentSerial,
        setCurrentSerial,
      }}
    >
      <div data-testid="mobile-navigation">
        <ContentContainer contents={sortedContent} />
        <NavigationBar contents={sortedContent} />
      </div>
    </MobileNavigationContext.Provider>
  );
};

export const useClientMobileNavigationHook = () => {
  const { currentSerial } = React.useContext(MobileNavigationContext);

  return { currentSerial };
};

export default MobileNavigation;
