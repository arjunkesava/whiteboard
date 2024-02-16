const Pencil = ({ objectDetails, setCurrentSelectedItem, handleMouseUp }) => {
  return (
    <polyline
      points={objectDetails.points.map((x) => x.join(",")).join(" ")}
      style={{
        fill: "none",
        stroke: objectDetails.backgroundColor,
        strokeWidth: 5,
      }}
      onMouseDown={() => setCurrentSelectedItem(objectDetails.id)}
      onMouseUp={handleMouseUp}
    />
  );
};
export default Pencil;
