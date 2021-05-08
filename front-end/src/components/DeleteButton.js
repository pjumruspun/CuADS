import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";

export default function ProjectButton(props) {
  const showDeleteConfirmation = () => {
    if (
      window.confirm(
        `Are you sure you want to delete the project ${props.text}?`
      )
    ) {
      deleteProject();
    }
  };

  const deleteProject = () => {
   axios
      .get(
        `http://localhost:3001/projects/getalltracks/${props.projectId}`
      )
      .then((response) => {
        const trackIdList = response.data;
	trackIdList.map((trackId) => {
          axios
            .get(`http://localhost:3001/tracks/findbyid/${trackId}`)
            .then((res) => {
		res.data.audioClips.map((id) => {
		const response = axios.delete(
      	`	http://localhost:3001/audio-clips/${id}`
    	);
	});
	});
    }); 
   });   
   axios
      .delete(`http://localhost:3001/projects/${props.projectId}`)
      .then((res) => {
        const projectData = res.data;
        const emptyProjectData = {
          _id: "",
          name: "",
          passcode: "",
          tracks: [],
        };
        props.onProjectChange(emptyProjectData);
        props.onProjectButtonClick();
      });
  };

  return <DeleteIcon onClick={showDeleteConfirmation}></DeleteIcon>;
}
