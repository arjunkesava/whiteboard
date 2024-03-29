"use client";

import { useState, useEffect, createRef } from "react";
import { v4 as uuidv4 } from "uuid";
import Whiteboard from "./components/whiteboard/whiteboard";
import Tools from "./components/tools/tools";
import SideTools from "./components/sidetools/sidetools";

export default function Home() {
  const svgRef = createRef();
  const [drawingObjects, setDrawingObjects] = useState(JSON.parse(localStorage.getItem('drawingObjects')) ?? []);
  const [currentSelectedItem, setCurrentSelectedItem] = useState("");
  const [diagramType, setDiagramType] = useState("pencil");

  useEffect(() => {
    const interval = setInterval(() => {
      localStorage.setItem('drawingObjects', JSON.stringify(drawingObjects));
    }, 30000); // for every 30 seconds, the image gets saved
  
    return () => clearInterval(interval);
  }, [drawingObjects]);

  const resetState = () => {
    setDrawingObjects([]);
    setCurrentSelectedItem("");
    setDiagramType("pencil");
    localStorage.setItem('drawingObjects', JSON.stringify([]));
  };

  const getCoordinates = (event) => {
    const { top, left } = svgRef.current.getBoundingClientRect();
    const coords = {
      x: event.clientX - left,
      y: event.clientY - top,
    };
    return coords;
  };

  const handleMouseDown = (event) => {
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
    if (currentSelectedItem === "") {
      // This will cancel un-necessary state update.
      return;
    }

    setDrawingObjects((prevDrawingObject) =>
      prevDrawingObject.map((drawObject) => {
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
      }),
    );
  };

  const handleMouseUp = () => {
    setCurrentSelectedItem("");
  };

  return (
    <>
      <header className="navbar sticky-top bg-dark flex-md-nowrap p-3 shadow rounded">
        <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6 text-white">
          SVG - MS Paint - Art Work
        </a>
      </header>
      <div className="container-fluid">
        <div className="row">
          <Tools setDiagramType={setDiagramType} diagramType={diagramType} />

          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <SideTools clearEntireScreen={resetState} />
            <div className="container p-0">
              <Whiteboard
                svgRef={svgRef}
                handleMouseDown={handleMouseDown}
                handleMouseMove={handleMouseMove}
                handleMouseUp={handleMouseUp}
                setCurrentSelectedItem={setCurrentSelectedItem}
                drawingObjects={drawingObjects}
              />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
