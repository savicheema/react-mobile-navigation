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

function App() {
  const contents: Content[] = [
    {
      content: (
        <>
          <Content heading="First" />
        </>
      ),
      navButtonTitle: "first",
      serial: 1,
    },
    {
      content: (
        <>
          <Content heading="Second" />
        </>
      ),
      navButtonTitle: "second",
      serial: 2,
    },
    {
      content: (
        <>
          <Content heading="Third" />
        </>
      ),
      navButtonTitle: "third",
      serial: 3,
    },
  ];
  return (
    <>
      App
      <MobileNavigation contents={contents} />
    </>
  );
}

export default App;
