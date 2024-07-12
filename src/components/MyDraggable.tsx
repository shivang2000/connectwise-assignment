import { useCallback, useEffect, useRef, useState } from "react";

export interface IMyDraggableProps {
  children: JSX.Element;
}

const MyDraggable = ({ children }: IMyDraggableProps) => {
  const childRef = useRef<HTMLDivElement | null>(null);
  const parentRef = useRef<HTMLDivElement | null>(null);
  const [isMouseClickDown, setIsMouseClickDown] = useState(false);

  const [translateProperty, setTranslateProperty] = useState<{
    x: number;
    y: number;
  }>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    window.addEventListener("mousedown", (event) => {
      setIsMouseClickDown(true);
    });
  }, []);
  useEffect(() => {
    window.addEventListener("mouseup", (event) => {
      setIsMouseClickDown(false);
    });
  }, []);

  const mouseMoveHandler = useCallback(
    (event: MouseEvent) => {
      if (isMouseClickDown) {
        if (childRef.current) {
          const topleftcorener = [
            childRef.current.offsetLeft,
            childRef.current.offsetTop,
          ];
          const topRightcorener = [
            childRef.current.offsetLeft + childRef.current.clientWidth,
            childRef.current.offsetTop,
          ];
          const bottomleftcorener = [
            childRef.current.offsetLeft,
            childRef.current.offsetTop + childRef.current.clientHeight,
          ];
          const bottomRightcorener = [
            childRef.current.offsetLeft + childRef.current.clientWidth,
            childRef.current.offsetTop + childRef.current.clientHeight,
          ];
          const [x, y] = [event.clientX, event.clientY];

          console.log(
            "i am herr dancing",
            topleftcorener,
            topRightcorener,
            bottomleftcorener,
            bottomRightcorener,
            [x, y],
            topleftcorener[0] < x,
            bottomleftcorener[0] < x,
            topRightcorener[0] > x,
            bottomRightcorener[0] > x,
            topleftcorener[1] < y,
            topRightcorener[1] < y,
            bottomRightcorener[1] > y,
            bottomleftcorener[1] > y,
            topleftcorener[0] < x &&
              bottomleftcorener[0] < x &&
              topRightcorener[0] > x &&
              bottomRightcorener[0] > x &&
              topleftcorener[1] < y &&
              topRightcorener[1] < y &&
              bottomRightcorener[1] > y &&
              bottomleftcorener[1] > y
              ? "inside"
              : "outside"
          );

          if (
            topleftcorener[0] < x &&
            bottomleftcorener[0] < x &&
            topRightcorener[0] > x &&
            bottomRightcorener[0] > x &&
            topleftcorener[1] < y &&
            topRightcorener[1] < y &&
            bottomRightcorener[1] > y &&
            bottomleftcorener[1] > y
          ) {
            const newX = childRef.current.offsetLeft + event.movementX;
            const newY = childRef.current.offsetTop + event.movementY;

            setTranslateProperty({
              x: newX,
              y: newY,
            });
          } else {
          }
        }
      }
    },
    [isMouseClickDown]
  );

  useEffect(() => {
    window.addEventListener("mousemove", mouseMoveHandler);
    return () => {
      window.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, [isMouseClickDown, mouseMoveHandler]);

  return (
    <div className="relative w-fit h-fit" ref={parentRef}>
      <div
        className={`absolute  w-fit h-fit border-x-8 border-y-8`}
        style={{
          top: translateProperty.y + "px",
          left: translateProperty.x + "px",
        }}
        ref={childRef}
      >
        {children}
      </div>
    </div>
  );
};

export default MyDraggable;
