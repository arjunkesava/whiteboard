const Rectangle = ({
  objectDetails,
  xAxis,
  yAxis,
  width,
  height,
  setCurrentSelectedItem,
  handleMouseUp,
}) => {
  return (
    <rect
      key={objectDetails.id}
      width={width}
      height={height}
      fill={objectDetails.backgroundColor}
      x={xAxis}
      y={yAxis}
      onMouseDown={() => setCurrentSelectedItem(objectDetails.id)}
      onMouseUp={handleMouseUp}
    />
  );
};
export default Rectangle;
