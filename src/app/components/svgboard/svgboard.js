"use client";

import { useState, createRef } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./svgboard.module.css";

const Svgboard = () => {
  const svgRef = createRef();
  const [drawingObjects, setDrawingObjects] = useState([]);
  const [currentSelectedItem, setCurrentSelectedItem] = useState("");
	const [diagramType, setDiagramType] = useState("");

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
    const { x: initialXaxis, y: initialYaxis } = getCoordinates(event);
    const newDrawingObject = {
      id: uuidv4(),
			type: diagramType,
      backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      xStart: initialXaxis,
      yStart: initialYaxis,
      xEnd: initialXaxis,
      yEnd: initialYaxis,
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
          console.log("inside selected corrd");
          console.log(endXaxis, endYaxis);
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
			></ellipse>
		);
	}

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
			></circle>
		);	
	}

  return (
      <section className={styles.container}>
				<button
					onClick={() => setDiagramType('rectangle')}
				>
					Rectangle
				</button>
				<button
					onClick={() => setDiagramType('ellipse')}
				>
					Ellipse
				</button>
				<button
					onClick={() => setDiagramType('circle')}
				>
					Circle
				</button>
        <svg
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          ref={svgRef}
          className={styles.canvas}
        >
          {drawingObjects.map((drawObject) => {
						switch(drawObject.type) {
							case "rectangle":
								return renderRectangle(drawObject);
							case "ellipse":
								return renderEllipse(drawObject);
							case "circle":
								return renderCircle(drawObject);
						}
					})}
        </svg>
      </section>
  );
};

export default Svgboard;
