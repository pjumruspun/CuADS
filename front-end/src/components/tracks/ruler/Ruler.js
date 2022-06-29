import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import gestureObserver from "./Gesture";
import "./index.less";

const Ruler = ({ value, start, end, step, onChange, className = "" }) => {
  const [val, setValue] = useState(value);
  const [percentage, setPercent] = useState(0.0001);
  const [offsetWidth, setOffsetWidth] = useState(0);
  const startPercentRef = useRef(0);
  const containerWidthRef = useRef(0);
  const rulerRef = useRef();
  const pointRef = useRef();

  useEffect(() => {
    transform();
  }, []);

  useEffect(() => {
    onChange(val);
  }, [val]);

  useEffect(() => {
    initRulerDrag();
  }, [rulerRef.current]);

  useEffect(() => {
    initPointDrag();
  }, [pointRef.current]);

  // useEffect(() => {
  //   let newVal = value < start ? start : value > end ? end : value;
  //   console.log("props", value, newVal)
  //   setValue(newVal);
  //   transform(newVal);
  // }, [value, start, end]);

  const maxMajorGridAllowed = 15;
  const majorGridTickOptions = [0.5, 1.0, 5.0, 10.0, 30.0, 60.0, 300.0, 600.0];

  // This function is similar to getStep() in TimeRuler.js
  const majorGridTick = () => {
    // Don't allow ticks more than maxMajorGridAllowed
    var chosenNumTicks;

    // Iterate through each option available
    for (let i = 0; i < majorGridTickOptions.length; ++i) {
      let tick = majorGridTickOptions[i];
      let numTicks = Math.floor((end - start) / tick);

      // If number of ticks is just below maxMajorGridAllowed,
      // We choose it
      if (numTicks < maxMajorGridAllowed) {
        chosenNumTicks = tick;
        break;
      }
    }

    return chosenNumTicks;
  };

  useEffect(() => {
    if (!offsetWidth) return;
    let val = ((end - start) * offsetWidth) / containerWidthRef.current + start;

    if (val < start) {
      val = start;
    } else if (val > end) {
      val = end;
    }
    setValue(val);
  }, [offsetWidth]);

  const transform = (offsetWidth) => {
    const left = offsetWidth || value;
    const percentage = (left - start) / (end - start);
    setPercent(Math.max(percentage, 0.0001));
  };

  useEffect(() => {
    // console.log("offset", percentage * containerWidthRef.current);
    setOffsetWidth(percentage * containerWidthRef.current);
  }, [percentage]);

  const initRulerDrag = () => {
    if (!rulerRef.current) return;

    const width = rulerRef.current.offsetWidth;
    containerWidthRef.current = width;

    const barClickObserver = gestureObserver(rulerRef.current);

    const barClick = ({ x }) => {
      const wrapperLeft = rulerRef.current.getBoundingClientRect().left;
      let currPercentage = (x - wrapperLeft) / width;
      if (currPercentage < 0) currPercentage = 0.0001;

      setPercent(currPercentage);
    };

    barClickObserver.clicks.forEach(barClick);
  };

  const dragMoves = ({ x }) => {
    setPercent((prev) => {
      // console.log("move", startPercentRef.current, x);

      let currPercentage =
        startPercentRef.current + x / containerWidthRef.current;

      if (currPercentage > 0.99) {
        currPercentage = 0.9999;
      }
      return Math.max(currPercentage, 0.0001);
    });
  };

  const initPointDrag = () => {
    if (!pointRef.current) return;

    const dragObserver = gestureObserver(pointRef.current);

    const dragStart = ({ x }) => {
      // console.log("start", percentage);
      setPercent((prev) => {
        startPercentRef.current = prev; // 记录开始位置
        return prev;
      });
      onDragStart(x);
    };

    const dragEnds = () => {
      onDragEnd(percentage);
    };

    dragObserver.horizontalMoveStarts.subscribe(dragStart);

    dragObserver.holds.subscribe(dragStart);

    dragObserver.dragMoves.subscribe(dragMoves);

    dragObserver.dragMoveEnds.subscribe(dragEnds);

    dragObserver.horizontalMoves.subscribe(dragMoves);

    dragObserver.horizontalMoveEnds.subscribe(dragEnds);
  };

  const onDragStart = (x) => {
    // console.log(x);
  };

  const onDragEnd = (x) => {
    // console.log(x);
  };

  const renderRuler = () => {
    // Width of each step in time ruler
    const stepWidth = (100 * step) / (end - start);
    // Contains all ticks
    let ruleDom = [];
    // Temp variable for storing each tick
    let ruleDiv;

    // Leftover amount at start
    let modResults = Math.round((start % step) * 10000) / 10000;
    let startLeftOver = step - modResults;
    // Boolean whether start aligns with ticks
    let isStartAlignedWithTicks = modResults == 0;
    // True starting point
    let trueStart = isStartAlignedWithTicks ? start : start + step - modResults;

    // If start not aligned with ticks,
    // We need to create an extra tick at start
    if (!isStartAlignedWithTicks) {
      // Calculate width proportionally to the start leftover amount
      let width = (stepWidth * startLeftOver) / step;
      ruleDiv = (
        <span key={start} className="line" style={{ width: `${width}%` }} />
      );
      ruleDom.push(ruleDiv);
    }

    // Loop to create the rest of ticks
    for (let i = trueStart; i <= end; i += step) {
      // Boolean whether the line should be drawn with major grid style
      let majorGridCondition = i % majorGridTick() === 0;

      // Tick width calculation
      // Boolean whether the current i is the last tick
      let isLastTick = i + step > end;
      let width;
      if (isLastTick) {
        // If last tick, should calculate width
        // Proportionally to the leftover amount
        let leftOverAmount = end - i;
        width = (stepWidth * leftOverAmount) / step;
      } else {
        width = stepWidth;
      }

      if (majorGridCondition) {
        // console.log(`major: ${i} width: ${width} ${isLastTick}`);
        ruleDiv = (
          <div
            key={i}
            className="rule-mark"
            style={i === end + 1 || i === end ? {} : { width: `${width}%` }}
          >
            <div className="line-text">{i}</div>
            <div className="line" />
          </div>
        );
      } else {
        // console.log(`\tminor: ${i} width: ${width} ${isLastTick}`);
        ruleDiv = (
          <span key={i} className="line" style={{ width: `${width}%` }} />
        );
      }
      ruleDom.push(ruleDiv);
    }

    // console.log(`${start} ${trueStart} ${end} ${step} ${modResults}`);
    // console.log(majorGridTick());
    return ruleDom;
  };

  return (
    <div className={`react-ruler-wrapper ${className}`}>
      <div className="ruler-container">
        <div className="ruler-wrapper" ref={rulerRef}>
          <div className="ruler-list">{renderRuler()}</div>
          <div
            className="ruler-drag"
            style={{
              transform: `scaleX(${percentage})`,
            }}
          >
            <div
              className="ruler-point"
              ref={pointRef}
              style={{
                transform: `scaleX(${1 / percentage})`,
              }}
            >
              <div className="point">
                {Math.round(val * 100) / 100 || start}
              </div>
              <div className="ruler-line" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ruler;
