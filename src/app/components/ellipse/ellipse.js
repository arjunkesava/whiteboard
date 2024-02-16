const Ellipse = ({
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

  return (
    <ellipse
      key={objectDetails.id}
      cx={xAxis + rx}
      cy={yAxis + ry}
      rx={rx}
      ry={ry}
      fill={objectDetails.backgroundColor}
      onMouseDown={() => setCurrentSelectedItem(objectDetails.id)}
      onMouseUp={handleMouseUp}
      className="object--circle"
    ></ellipse>
  );
};
export default Ellipse;
