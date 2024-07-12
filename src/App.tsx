import { useCallback, useState } from "react";
import RecursiveDraggable from "./components/RecursiveDraggable";

function App() {
  const [count, setCount] = useState(1);

  const onClickHandlerToAddParent = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  return (
    <div className="w-screen h-screen">
      <div className="relative">
        <button
          className="absolute top-0 right-0"
          onClick={onClickHandlerToAddParent}
        >
          add Parent
        </button>
      </div>

      <div className="w-screen h-screen border-x-4 border-y-4">
        <RecursiveDraggable count={count} maxCount={count} />
      </div>
    </div>
  );
}

export default App;
