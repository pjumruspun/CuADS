import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Ruler from "./ruler/Ruler";
import "rc-ruler/dist/index.css";
import * as constant from "../../Constants";

const rootStyle = {
  height: constant.timeRulerHeight,
  border: constant.trackAreaBorder,
};

const maxTicksAllowed = 150;

// How long each ticks can potentially be, in seconds
const tickOptions = [0.05, 0.1, 0.5, 1.0, 5.0, 10.0, 30.0, 60.0];

function TimeRuler(props) {
  const [value, setValue] = useState(0);

  const handleChange = (value) => {
    // console.log(value);
  };

  const getStart = () => {
    // Scope of the time ruler should start from?
    return 0;
  };

  const getEnd = () => {
    // Scope of the time ruler should end at?
    return 600.6;
  };

  const getDuration = () => {
    return getEnd() - getStart();
  };

  const getStep = () => {
    // Don't allow ticks more than maxTicksAllowed
    var chosenNumTicks;

    // Iterate through each option available
    for (let i = 0; i < tickOptions.length; ++i) {
      let tick = tickOptions[i];
      let numTicks = Math.floor(getDuration() / tick);

      // If number of ticks is just below maxTicksAllowed,
      // We choose it
      if (numTicks < maxTicksAllowed) {
        chosenNumTicks = tick;
        break;
      }
    }

    return chosenNumTicks;
  };

  return (
    <Grid item xs={constant.trackAreaRightXs} style={rootStyle}>
      <div style={{ marginTop: "-31px" }}>
        <Ruler
          value={value}
          start={getStart()}
          end={getEnd()}
          step={getStep()}
          onChange={handleChange}
        ></Ruler>
      </div>
    </Grid>
  );
}

export default TimeRuler;
