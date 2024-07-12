import Draggable from "react-draggable";

export interface IDraggableComponentFromModuleProps {
  children: JSX.Element;
}
const DraggableComponentFromModule = ({
  children,
}: IDraggableComponentFromModuleProps) => {
  return (
    <Draggable
      bounds="parent"
      onMouseDown={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="w-fit">{children}</div>
    </Draggable>
  );
};

export default DraggableComponentFromModule;
