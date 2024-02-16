"use client";

import { useState, createRef } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./svgboard.module.css";

const Svgboard = () => {
  const svgRef = createRef();
  const [drawingObjects, setDrawingObjects] = useState([]);
  const [currentSelectedItem, setCurrentSelectedItem] = useState("");
  const [diagramType, setDiagramType] = useState("pencil");

  const getCoordinates = (event) => {
    const { top, left } = svgRef.current.getBoundingClientRect();
    const coords = {
      x: event.clientX - left,
      y: event.clientY - top,
    };
    console.log(`X: ${coords.x},Y: ${coords.y}`);
    return coords;
  };

  const handleMouseDown = (event) => {
    console.log("MouseDown, initial call");
    if (diagramType === "drag") {
      return;
    }
    const { x: initialXaxis, y: initialYaxis } = getCoordinates(event);
    const newDrawingObject = {
      id: uuidv4(),
      type: diagramType,
      backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      xStart: initialXaxis,
      yStart: initialYaxis,
      xEnd: initialXaxis,
      yEnd: initialYaxis,
      points: [],
    };
    setCurrentSelectedItem(newDrawingObject.id);
    setDrawingObjects((prevDrawingObject) => [
      ...prevDrawingObject,
      newDrawingObject,
    ]);
  };

  const handleMouseMove = (event) => {
    console.log("MouseMove");
    if (currentSelectedItem === "") {
      // This will cancel un-necessary state update.
      return;
    }

    setDrawingObjects((prevDrawingObject) =>
      prevDrawingObject.map((drawObject) => {
        console.log(`${drawObject.id} === ${currentSelectedItem}`);
        if (drawObject.id === currentSelectedItem) {
          const { x: endXaxis, y: endYaxis } = getCoordinates(event);
          // For pencil, we need to store all points in between the path.
          if (diagramType === "pencil") {
            const newPoints = [endXaxis, endYaxis];
            drawObject.points.push(newPoints);
            return drawObject;
          }
          if (diagramType === "drag") {
            const xDelta = endXaxis - drawObject.xStart;
            const yDelta = endYaxis - drawObject.yStart;
            return {
              ...drawObject,
              xStart: drawObject.xStart + xDelta,
              xEnd: drawObject.xEnd + xDelta,
              yStart: drawObject.yStart + yDelta,
              yEnd: drawObject.yEnd + yDelta,
            };
          }
          // For other type of diagrams, we just need to start and end.
          return {
            ...drawObject,
            xEnd: endXaxis,
            yEnd: endYaxis,
          };
        }
        return drawObject;
      })
    );
  };

  const handleMouseUp = () => {
    console.log("MouseUp");
    setCurrentSelectedItem("");
  };

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

  const renderRectangle = (objectDetails) => {
    const { axis: xAxis, dimension: width } = computeDimensions(
      objectDetails.xStart,
      objectDetails.xEnd
    );
    const { axis: yAxis, dimension: height } = computeDimensions(
      objectDetails.yStart,
      objectDetails.yEnd
    );

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

  const renderEllipse = (objectDetails) => {
    const { axis: xAxis, dimension: width } = computeDimensions(
      objectDetails.xStart,
      objectDetails.xEnd
    );
    const { axis: yAxis, dimension: height } = computeDimensions(
      objectDetails.yStart,
      objectDetails.yEnd
    );
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
      ></ellipse>
    );
  };

  const renderCircle = (objectDetails) => {
    const { axis: xAxis, dimension: width } = computeDimensions(
      objectDetails.xStart,
      objectDetails.xEnd
    );
    const { axis: yAxis, dimension: height } = computeDimensions(
      objectDetails.yStart,
      objectDetails.yEnd
    );
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
        onMouseDown={() => setCurrentSelectedItem(objectDetails.id)}
        onMouseUp={handleMouseUp}
      ></circle>
    );
  };

  const renderLine = (objectDetails) => {
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

  const renderArrowLine = (objectDetails) => {
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

  const renderPencil = (objectDetails) => {
    return (
      <polyline
        points={objectDetails.points.map((x) => x.join(",")).join(" ")}
        style={{
          fill: "none",
          stroke: objectDetails.backgroundColor,
          strokeWidth: 5,
        }}
      ></polyline>
    );
  };

  return (
    <section className={styles.container}>
      <section style={{ display: "flex", justifyContent: "space-around" }}>
        <button onClick={() => setDiagramType("rectangle")}>Rectangle</button>
        <button onClick={() => setDiagramType("ellipse")}>Ellipse</button>
        <button onClick={() => setDiagramType("circle")}>Circle</button>
        <button onClick={() => setDiagramType("line")}>Line</button>
        <button onClick={() => setDiagramType("arrow-line")}>Arrow Line</button>
        <button onClick={() => setDiagramType("pencil")}>Pencil</button>
        <button onClick={() => setDiagramType("drag")}>Drag</button>
      </section>
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
          switch (drawObject.type) {
            case "rectangle":
              return renderRectangle(drawObject);
            case "ellipse":
              return renderEllipse(drawObject);
            case "circle":
              return renderCircle(drawObject);
            case "line":
              return renderLine(drawObject);
            case "arrow-line":
              return renderArrowLine(drawObject);
            case "pencil":
              return renderPencil(drawObject);
          }
        })}
      </svg>
    </section>
  );
};

export default Svgboard;
