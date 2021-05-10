import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import MenuItem from "@material-ui/core/MenuItem";
import TrackExportButton from "./TrackExportButton";
import axios from "axios";
import DeleteButton from "./DeleteButton.js";
import Delete from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "20vw",
    textAlign: "center",
  },
}));

const TrackModal = (props) => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [nameIdPairs, setNameIdPairs] = React.useState([
    { name: "dummyName", projectId: "dummyId" },
  ]);

  const handleExport = () => {
    if (props.projectId.length < 1) {
      alert("You do not have any opened project.");
      return;
    }

    var pairs = [];

    axios
      .get(`http://localhost:3001/projects/getalltracks/${props.projectId}`)
      .then((res) => {
        const trackIds = res.data;
        trackIds.forEach((trackId) => {
          axios
            .get(`http://localhost:3001/tracks/findbyid/${trackId}`)
            .then((res) => {
              const trackName = res.data.name;
              pairs.push({ name: trackName, trackId: trackId });
              if (pairs.length > nameIdPairs.length) {
                setNameIdPairs(pairs);
              }
            });
        });
      });

    setOpen(true);
  };

  const exportTrackButtons = (pair) => {
    return (
      <tr style={{ verticalAlign: "middle" }}>
        <td>
          {React.createElement(TrackExportButton, {
            text: pair.name,
            trackId: pair.trackId,
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
      <MenuItem onClick={handleExport}>Export...</MenuItem>
      <Modal
        // aria-labelledby="simple-modal-title"
        // aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
        x
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Select Track to Export</h2>
          <center>
            <p id="simple-modal-description">
              {nameIdPairs.map((pair) => exportTrackButtons(pair))}
            </p>
          </center>
        </div>
      </Modal>
    </div>
  );
};
export default TrackModal;
