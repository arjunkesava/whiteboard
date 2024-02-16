const Line = ({ objectDetails, setCurrentSelectedItem, handleMouseUp }) => {
  return (
    <line
      key={objectDetails.id}
      x1={objectDetails.xStart}
      y1={objectDetails.yStart}
      x2={objectDetails.xEnd}
      y2={objectDetails.yEnd}
      style={{
        stroke: objectDetails.backgroundColor,
        "stroke-width": 10,
      }}
      onMouseDown={() => setCurrentSelectedItem(objectDetails.id)}
      onMouseUp={handleMouseUp}
    />
  );
};
export default Line;
