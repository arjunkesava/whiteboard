import { v4 as uuidv4 } from "uuid";
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
                  key={uuidv4()}
                  objectDetails={drawObject}
                  xAxis={xAxis}
                  yAxis={yAxis}
                  width={width}
                  height={height}
                  handleMouseUp={handleMouseUp}
                  setCurrentSelectedItem={setCurrentSelectedItem}
                  className={styles["diagram-object"]}
                />
              );
            case "ellipse":
              return (
                <Ellipse
                  key={uuidv4()}
                  objectDetails={drawObject}
                  xAxis={xAxis}
                  yAxis={yAxis}
                  width={width}
                  height={height}
                  handleMouseUp={handleMouseUp}
                  setCurrentSelectedItem={setCurrentSelectedItem}
                  className={styles["diagram-object"]}
                />
              );
            case "circle":
              return (
                <Circle
                  key={uuidv4()}
                  objectDetails={drawObject}
                  xAxis={xAxis}
                  yAxis={yAxis}
                  width={width}
                  height={height}
                  handleMouseUp={handleMouseUp}
                  setCurrentSelectedItem={setCurrentSelectedItem}
                  className={styles["diagram-object"]}
                />
              );
            case "line":
              return (
                <Line
                  key={uuidv4()}
                  objectDetails={drawObject}
                  setCurrentSelectedItem={setCurrentSelectedItem}
                  handleMouseUp={handleMouseUp}
                  className={styles["diagram-object"]}
                />
              );
            case "arrow-line":
              return (
                <ArrowLine
                  key={uuidv4()}
                  objectDetails={drawObject}
                  setCurrentSelectedItem={setCurrentSelectedItem}
                  handleMouseUp={handleMouseUp}
                  className={styles["diagram-object"]}
                />
              );
            case "pencil":
              return (
                <Pencil
                  key={uuidv4()}
                  objectDetails={drawObject}
                  setCurrentSelectedItem={setCurrentSelectedItem}
                  handleMouseUp={handleMouseUp}
                  className={styles["diagram-object"]}
                />
              );
          }
        })}
      </svg>
    </section>
  );
};

export default Whiteboard;
