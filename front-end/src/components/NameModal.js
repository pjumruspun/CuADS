import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import Button from "@material-ui/core/Button";

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

const NameModal = (props) => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState("");

  const handleNew = () => {
    setOpen(true);
  };

  const handleCreate = () => {
    axios
      .post(`http://localhost:3001/projects/new`, { name: text })
      .then((res) => {
        const project = res.data;
        console.log(project);
        // alert(`Created a new project with ID: ${project._id}`);
        props.onProjectChange(project);
      });
    handleClose();
  };

  const handleClose = () => {
    setText("");
    setOpen(false);
  };

  return (
    <div>
      <MenuItem onClick={handleNew}>New</MenuItem>
      <Modal
        // aria-labelledby="simple-modal-title"
        // aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Input new project name</h2>
          <p id="simple-modal-description">
            <TextField
              label="Your new project name"
              fullWidth="true"
              onChange={(e) => setText(e.target.value)}
            ></TextField>
            <Button onClick={handleCreate}>Create</Button>
          </p>
        </div>
      </Modal>
    </div>
  );
};
export default NameModal;
