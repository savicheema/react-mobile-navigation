import { ChildComponent } from "./file.tsx";

const MyComponent = () => {
  return (
    <div data-testid="my-component">
      MyComponent 11
      <ChildComponent />
    </div>
  );
};

export default MyComponent;
