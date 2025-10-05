import "./App.css";
import MobileNavigation from "@savicheema/react-mobile-navigation";

const Card = () => (
  <div className="border-2 rounded-2xl p-2 my-2 min-h-[160px] sm:min-w-[480px] min-w-[520px]">
    Card
  </div>
);

const List = ({ title }) => {
  const list = Array(10).fill(1);

  return (
    <div className="flex flex-col items-center">
      <h2 className="font-bold py-2">{title}</h2>
      {list.map((value, index) => (
        <Card key={index} />
      ))}
    </div>
  );
};

function App() {
  const contents = [
    { content: <List title="First" />, navButtonTitle: "First" },
    { content: <List title="Second" />, navButtonTitle: "Second" },
    { content: <List title="Third" />, navButtonTitle: "Third" },
    { content: <List title="Fourth" />, navButtonTitle: "Fourth" },
  ];

  return (
    <>
      <MobileNavigation contents={contents} />
    </>
  );
}

export default App;
