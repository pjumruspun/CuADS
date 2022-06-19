import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Ruler from "./ruler/Ruler";
import "rc-ruler/dist/index.css";
import * as constant from "../../Constants";

const rootStyle = {
  height: constant.timeRulerHeight,
  border: constant.trackAreaBorder,
};

function TimeRuler(props) {
  const [value, setValue] = useState(0);
  const handleChange = (value) => {
    console.log(value);
  };
  return (
    <Grid item xs={constant.trackAreaRightXs} style={rootStyle}>
      <div style={{ marginTop: "-31px" }}>
        <Ruler
          value={value}
          start={0}
          end={props.duration}
          step={10}
          onChange={handleChange}
        ></Ruler>
      </div>
    </Grid>
  );
}

export default TimeRuler;
