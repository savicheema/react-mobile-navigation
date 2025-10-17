import "./App.css";
import MobileNavigation, {
  type Content,
  useClientMobileNavigationHook,
} from "@savicheema/react-mobile-navigation";
import { BrowserRouter, Routes, Route, Link } from "react-router";

const ContentComponent = ({
  heading,
  currentSerial,
}: {
  heading: string;
  currentSerial: number;
}) => (
  <>
    <div className="my-2">
      ContentComponent: <b>{heading}</b>&nbsp;<i>{currentSerial}</i>
    </div>
    <Link to={"/blah"} className="bg-green-700 text-white px-[40px] py-[12px]">
      blah
    </Link>
  </>
);

const ContentDefaultComponent = ({
  heading,
  currentSerial,
}: {
  heading: string;
  currentSerial: number;
}) => (
  <>
    <div className="my-2">
      ContentDefault: <b>{heading}</b>&nbsp;<i>{currentSerial}</i>
    </div>
    <div>
      <Link to={"/1"} className="bg-green-700 text-white px-[40px] py-[12px]">
        1
      </Link>
    </div>
  </>
);
const Content = ({ heading }: { heading: string }) => {
  const mobileNavigationContext = useClientMobileNavigationHook();
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/1"
          element={
            <ContentComponent heading={heading} {...mobileNavigationContext} />
          }
        />
        <Route
          path="*"
          element={
            <ContentDefaultComponent
              heading={heading}
              {...mobileNavigationContext}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

const SVG = ({
  size,
  highlightStroke,
}: {
  size: number | undefined;
  highlightStroke: string | undefined;
}) => {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <circle
        r={"46"}
        cx={"50"}
        cy={"50"}
        stroke={highlightStroke || "hsla(0, 0%, 20%, 0.5)"}
        fill="transparent"
        strokeWidth={"8px"}
      />
    </svg>
  );
};

function App() {
  const contents: Content[] = [
    {
      content: (
        <>
          <Content heading="First" />
        </>
      ),
      navButtonTitle: "First",
      serial: 1,
      NavSVGIcon: SVG,
    },
    {
      content: (
        <>
          <Content heading="Second" />
        </>
      ),
      navButtonTitle: "Second",
      NavSVGIcon: SVG,
      serial: 2,
    },
    {
      content: (
        <>
          <Content heading="Third" />
        </>
      ),
      navButtonTitle: "Third",
      NavSVGIcon: SVG,
      serial: 3,
    },
    // {
    //   content: (
    //     <>
    //       <Content heading="Fourth" />
    //     </>
    //   ),
    //   navButtonTitle: "Fourth",
    //   NavSVGIcon: SVG,
    //   serial: 4,
    // },
  ];
  return (
    <>
      App
      <MobileNavigation
        contents={contents}
        navigationBarBGColor="hsla(125, 50%, 20%, 0.5)"
        navigationTextColor="hsl(125, 50%, 25%)"
        navIconSize={24}
      />
    </>
  );
}

export default App;
