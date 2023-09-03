import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";

import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function ChildModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Open Child Modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 200 }}>
          <h2 id="child-modal-title">Text in a child modal</h2>
          <p id="child-modal-description">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
          <Button onClick={handleClose}>Close Child Modal</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function NestedModal({ task }) {
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          className="absolute top-1/2 left-1/2  bg-slate-300 border border-slate-100 shadow-sm shadow-gray-400 rounded-md p-5 "
        >
          <Typography id="modal-modal-title">
            <div className="flex flex-row justify-between">
              <div>
                <h1 className="text-xl font-bold text-black">{task.title}</h1>
                <h3 className="text-lg  text-indigo-950">
                  {" "}
                  {task.date && task.date.toString().substring(0, 10)}
                </h3>
              </div>

              <div className="">
                <Button>
                  <EditIcon />
                </Button>
              </div>
            </div>
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
          >
            <h3 className="text-lg  text-indigo-950"> {task.description}</h3>
          </Typography>
          <div className="flex justify-end mt-5">
            <Button
              onClick={handleClose}
              color="error"
            >
              Close
            </Button>
          </div>
          <ChildModal />
        </Box>
      </Modal>
    </div>
  );
}
