import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import MenuItem from "@material-ui/core/MenuItem";
import ProjectButton from "./ProjectButton.js";
import axios from "axios";
import DeleteButton from "./DeleteButton.js";
import Delete from "@material-ui/icons/Delete";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const MyModal = (props) => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [nameIdPairs, setNameIdPairs] = React.useState([
    { name: "dummyName", projectId: "dummyId" },
  ]);

  const handleOpen = () => {
    axios.get(`http://localhost:3001/projects`).then((res) => {
      var pairs = [];
      const projects = res.data;
      projects.forEach((project) => {
        pairs.push({ name: project.name, projectId: project._id });
      });
      setNameIdPairs(pairs);
    });
    setOpen(true);
  };

  const createProjectButtons = (pair) => {
    return (
      <tr>
        <td>
          {React.createElement(ProjectButton, {
            text: pair.name,
            projectId: pair.projectId,
            onProjectChange: (project) => props.onProjectChange(project),
            onProjectButtonClick: handleClose,
          })}
        </td>
        <td>
          {React.createElement(DeleteButton, {
            text: pair.name,
            projectId: pair.projectId,
            onProjectChange: (project) => props.onProjectChange(project),
            onProjectButtonClick: handleClose,
          })}
        </td>
      </tr>
    );
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <MenuItem onClick={handleOpen}>Open</MenuItem>
      <Modal
        // aria-labelledby="simple-modal-title"
        // aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
        x
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Select Project</h2>
          <p id="simple-modal-description">
            {nameIdPairs.map((pair) => createProjectButtons(pair))}
          </p>
        </div>
      </Modal>
    </div>
  );
};
export default MyModal;
