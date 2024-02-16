const ArrowLine = ({
  objectDetails,
  setCurrentSelectedItem,
  handleMouseUp,
}) => {
  return (
    <line
      key={objectDetails.id}
      x1={objectDetails.xStart}
      y1={objectDetails.yStart}
      x2={objectDetails.xEnd}
      y2={objectDetails.yEnd}
      marker-end="url(#arrow)"
      style={{
        stroke: "black",
        strokeWidth: 5,
      }}
      onMouseDown={() => setCurrentSelectedItem(objectDetails.id)}
      onMouseUp={handleMouseUp}
    />
  );
};
export default ArrowLine;
