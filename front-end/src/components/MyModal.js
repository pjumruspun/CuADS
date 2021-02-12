import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import MenuItem from "@material-ui/core/MenuItem";
import ProjectButton from "./ProjectButton.js";
import axios from "axios";

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
  const [texts, setTexts] = React.useState(["11", "22"]);

  const handleOpen = () => {
    axios.get(`http://localhost:3001/projects`).then((res) => {
      var texts = [];
      const projects = res.data;
      projects.forEach((project) => {
        texts.push(project._id);
      });
      setTexts(texts);
    });
    setOpen(true);
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
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Select Project</h2>
          <p id="simple-modal-description">
            {React.createElement(ProjectButton, texts[0])}
            {texts.map((text) =>
              React.createElement(ProjectButton, {
                text: text,
                projectId: text,
                onProjectChange: (project) => props.onProjectChange(project),
                onProjectButtonClick: handleClose,
              })
            )}
          </p>
        </div>
      </Modal>
    </div>
  );
};
export default MyModal;
