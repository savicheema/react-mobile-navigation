import "./App.css";
import MobileNavigation, {
  type Content,
} from "@savicheema/react-mobile-navigation";
import { BrowserRouter, Routes, Route, Link } from "react-router";

const ContentComponent = ({ heading }: { heading: string }) => (
  <>
    <div className="my-2">
      ContentComponent <b>{heading}</b>
    </div>
    <Link to={"/blah"} className="bg-green-700 text-white px-[40px] py-[12px]">
      blah
    </Link>
  </>
);

const ContentDefaultComponent = ({ heading }: { heading: string }) => (
  <>
    <div className="my-2">
      ContentDefault <b>{heading}</b>
    </div>
    <div>
      <Link to={"/1"} className="bg-green-700 text-white px-[40px] py-[12px]">
        1
      </Link>
    </div>
  </>
);
const Content = ({ heading }: { heading: string }) => (
  <BrowserRouter>
    <Routes>
      <Route path="/1" element={<ContentComponent heading={heading} />} />
      <Route path="*" element={<ContentDefaultComponent heading={heading} />} />
    </Routes>
  </BrowserRouter>
);

function App() {
  const contents: Content[] = [
    {
      content: (
        <>
          <Content heading="First" />
        </>
      ),
      navButtonTitle: "first",
    },
    {
      content: (
        <>
          <Content heading="Second" />
        </>
      ),
      navButtonTitle: "second",
    },
    {
      content: (
        <>
          <Content heading="Third" />
        </>
      ),
      navButtonTitle: "third",
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
