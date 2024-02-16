const Rectangle = ({
  objectDetails,
  xAxis,
  yAxis,
  width,
  height,
  setCurrentSelectedItem,
  handleMouseUp,
  className,
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
      className={className}
    />
  );
};
export default Rectangle;
