import { getRandomColor } from "../helpers";
import DraggableComponentFromModule from "./DraggableComponentFromModule";

export interface IRecursiveDraggableProps {
  count: number;
  maxCount: number;
}

const RecursiveDraggable = ({ count, maxCount }: IRecursiveDraggableProps) => {
  const color = getRandomColor();
  return count === 1 ? (
    <div className="h-full w-full border-x-4 border-y-4 ">
      <DraggableComponentFromModule>
        <div className="flex flex-col w-fit " id={count.toString()}>
          <div className="w-16 font-bold">Title</div>
          <div
            className={`bg-[${color}]] `}
            style={{
              width: `${4}rem`,
              height: `${1}rem`,
            }}
          ></div>
        </div>
      </DraggableComponentFromModule>
    </div>
  ) : (
    <div className="h-full w-full border-x-4 border-y-4">
      {/* <div className="h-fit w-fit"> */}
      <DraggableComponentFromModule>
        <div className="flex flex-col  w-fit" id={count.toString()}>
          <div className="font-bold">Title after {count - 1} clicks</div>
          <div
            className={`bg-[${color}]`}
            style={{
              width: `${4 + 3 ** count}rem`,
              height: `${4 + 2 ** count}rem`,
            }}
          >
            <RecursiveDraggable maxCount={maxCount} count={count - 1} />
          </div>
        </div>
      </DraggableComponentFromModule>
      {/* </div> */}
    </div>
  );
};

export default RecursiveDraggable;
