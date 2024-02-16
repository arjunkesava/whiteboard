const Circle = ({
  xAxis,
  yAxis,
  width,
  height,
  objectDetails,
  setCurrentSelectedItem,
  handleMouseUp,
}) => {
  const rx = width / 2;
  const ry = height / 2;
  const radius = Math.min(rx, ry);

  return (
    <circle
      key={objectDetails.id}
      cx={xAxis + rx}
      cy={yAxis + ry}
      r={radius}
      fill={objectDetails.backgroundColor}
      onMouseUp={handleMouseUp}
      onMouseDown={setCurrentSelectedItem(objectDetails.id)}
    ></circle>
  );
};
export default Circle;
