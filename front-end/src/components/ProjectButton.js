import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";

export default function ProjectButton(props) {
  const handleClick = () => {
    axios
      .get(`http://localhost:3001/projects/findbyid/${props.projectId}`)
      .then((res) => {
        const projectData = res.data;
        // LoadProject
        props.onProjectChange(projectData);
        props.onProjectButtonClick();
        // Can set everything else later here
      });
  };
  return <MenuItem onClick={handleClick}>{props.text}</MenuItem>;
}
