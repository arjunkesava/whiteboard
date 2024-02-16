import styles from "./whiteboard.module.css";
import Rectangle from "../rectangle/rectangle";
import Ellipse from "../ellipse/ellipse";
import Circle from "../circle/circle";
import Line from "../line/line";
import ArrowLine from "../arrow-line/arrow-line";
import Pencil from "../pencil/pencil";

const Whiteboard = ({
  svgRef,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  drawingObjects,
  setCurrentSelectedItem,
}) => {
  const computeDimensions = (startAxis, endAxis) => {
    if (startAxis < endAxis) {
      return {
        axis: startAxis,
        dimension: endAxis - startAxis,
      };
    }
    return {
      axis: endAxis,
      dimension: startAxis - endAxis,
    };
  };

  return (
    <section className={styles.container}>
      <svg
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        ref={svgRef}
        className={styles.canvas}
      >
        <defs>
          {/* We need to define a marker for arrow */}
          <marker
            id="arrow"
            viewBox="0 0 10 10"
            refX="5"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" />
          </marker>
        </defs>
        {drawingObjects.map((drawObject) => {
          const { axis: xAxis, dimension: width } = computeDimensions(
            drawObject.xStart,
            drawObject.xEnd,
          );
          const { axis: yAxis, dimension: height } = computeDimensions(
            drawObject.yStart,
            drawObject.yEnd,
          );

          switch (drawObject.type) {
            case "rectangle":
              return (
                <Rectangle
                  objectDetails={drawObject}
                  xAxis={xAxis}
                  yAxis={yAxis}
                  width={width}
                  height={height}
                  handleMouseUp={handleMouseUp}
                  setCurrentSelectedItem={setCurrentSelectedItem}
                />
              );
            case "ellipse":
              return (
                <Ellipse
                  objectDetails={drawObject}
                  xAxis={xAxis}
                  yAxis={yAxis}
                  width={width}
                  height={height}
                  handleMouseUp={handleMouseUp}
                  setCurrentSelectedItem={setCurrentSelectedItem}
                />
              );
            case "circle":
              return (
                <Circle
                  objectDetails={drawObject}
                  xAxis={xAxis}
                  yAxis={yAxis}
                  width={width}
                  height={height}
                  handleMouseUp={handleMouseUp}
                  setCurrentSelectedItem={setCurrentSelectedItem}
                />
              );
            case "line":
              return (
                <Line
                  objectDetails={drawObject}
                  setCurrentSelectedItem={setCurrentSelectedItem}
                  handleMouseUp={handleMouseUp}
                />
              );
            case "arrow-line":
              return (
                <ArrowLine
                  objectDetails={drawObject}
                  setCurrentSelectedItem={setCurrentSelectedItem}
                  handleMouseUp={handleMouseUp}
                />
              );
            case "pencil":
              return (
                <Pencil
                  objectDetails={drawObject}
                  setCurrentSelectedItem={setCurrentSelectedItem}
                  handleMouseUp={handleMouseUp}
                />
              );
          }
        })}
      </svg>
    </section>
  );
};

export default Whiteboard;
