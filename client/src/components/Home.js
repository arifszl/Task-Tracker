import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setTasks } from "../store/TaskSlice";
import { useEffect, useRef } from "react";
import ActionBar from "./ActionBar";
import { setUser } from "../store/UserSlice";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const style = {
    transform: "translate(-50%, -50%)",
    width: 450,
    p: 4,
  };
  const edittaskRef = useRef("");
  const editDateRef = useRef("");
  const editDescriptionRef = useRef("");
  const editStatusRef = useRef("");
  const user = useSelector((state) => state.user);
  const [isClicked, setIsClicked] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [task, setTask] = React.useState({});
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setIsClicked(false);
  };

  const editHandler = () => {
    setIsClicked(true);
  };

  const editFormData = async (formData, id) => {
    const res = await fetch(`http://localhost:8000/updatetask/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",

        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(formData),
    });

    return res;
  };

  const editFormSubmiHandler = async (id) => {
    alert("Task updated successfully");
    const formData = {
      title: edittaskRef.current.value,
      date: editDateRef.current.value,
      description: editDescriptionRef.current.value,
      status: editStatusRef.current.value,
    };

    const response = await editFormData(formData, id);

    if (response.ok) {
      handleClose();
      navigate(0);
    }
  };

  // get particular task details from backend and set it modal
  const taskgetter = (id) => async () => {
    const res = await fetch(`http://localhost:8000/gettask/${id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const data = await res.json();

    setTask(data);
    handleOpen();
  };

  const deleteHandler = async (id) => {
    await fetch(`http://localhost:8000/deletetask/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        //sending token to backend for verification
        Authorization: `Bearer ${user.token}`,
      },
    });
    fetchPosts();
  };

  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);

  const fetchPosts = async () => {
    const res = await fetch("http://localhost:8000/gettasks", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const data = await res.json();

    if (res.ok) {
      dispatch(setTasks(data));
    }
  };

  useEffect(() => {
    if (user.email) {
      fetchPosts();
    }
  }, []);

  return (
    <>
      <div className="flex mt-2 ">
        <ActionBar />
      </div>
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
            <form>
              <Typography id="modal-modal-title">
                <div className="flex flex-row justify-between">
                  {/* adding edit icon */}

                  <div>
                    {isClicked ? (
                      <>
                        <input
                          className="text-xl bg-slate-300 font-bold text-black"
                          type="text"
                          ref={edittaskRef}
                          defaultValue={task.title}
                        />
                        <input
                          className="text-lg  bg-slate-300  text-indigo-950"
                          ref={editDateRef}
                          type="date"
                          defaultValue={
                            task.date && task.date.toString().substring(0, 10)
                          }
                        />
                      </>
                    ) : (
                      <>
                        <h2 className="text-xl bg-slate-300 font-bold text-black">
                          {task.title}
                        </h2>
                        <h3 className="text-lg  bg-slate-300  text-indigo-950">
                          {task.date && task.date.toString().substring(0, 10)}
                        </h3>
                      </>
                    )}
                  </div>
                  {isClicked == false ? (
                    <div className="flex flex-row">
                      <EditIcon
                        onClick={editHandler}
                        className="text-red-600 text-lg font-bold"
                      />
                    </div>
                  ) : (
                    " "
                  )}
                </div>
              </Typography>
              <Typography
                id="modal-modal-description"
                sx={{ mt: 2 }}
              >
                {isClicked ? (
                  <>
                    <input
                      type="text"
                      ref={editDescriptionRef}
                      defaultValue={task.description}
                      className="text-lg  text-indigo-950  bg-slate-300"
                    />
                  </>
                ) : (
                  <>
                    <h4 className="text-lg  text-indigo-950  bg-slate-300">
                      {task.description}
                    </h4>
                  </>
                )}
              </Typography>
              <Typography
                id="modal-modal-description"
                sx={{ mt: 2 }}
              >
                <div className="col-start-5 col-end-6  bg-slate-300  text-gray-500 text-lg font-bold">
                  {isClicked ? (
                    <>
                      {" "}
                      <select
                        ref={editStatusRef}
                        className=" bg-slate-300"
                      >
                        <option value="In Progress">In Progress</option>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </>
                  ) : (
                    <h4>{task.status}</h4>
                  )}
                </div>
              </Typography>
              <div className="flex justify-end mt-5">
                {isClicked ? (
                  <Button
                    onClick={() => {
                      editFormSubmiHandler(task._id);
                    }}
                    color="error"
                  >
                    Submit
                  </Button>
                ) : (
                  " "
                )}
              </div>
            </form>
          </Box>
        </Modal>
      </div>

      <div className="grid grid-cols-6 gap-4 place-items-center p-2 border border-slate-100  shadow-sm shadow-gray-400 mt-5">
        <div className="col-start-2 col-end-3  text-gray-500 text-lg font-bold">
          <h4>Title</h4>
        </div>
        <div className="col-start-3 col-end-4  text-gray-500 text-lg font-bold">
          <h4>Priority</h4>
        </div>
        <div className="col-start-4 col-end-5  text-gray-500 text-lg font-bold">
          <h4>Due date</h4>
        </div>
        <div className="col-start-5 col-end-6  text-gray-500 text-lg font-bold">
          <h4>Status</h4>
        </div>
      </div>
      {tasks.map((task, index) => (
        <div
          className="grid grid-cols-6 gap-4 place-items-center shadow-sm shadow-slate-800 mt-5 "
          key={index}
        >
          <div className=" col-end-2  text-gray-500 text-lg font-bold">
            <h4>{index + 1}</h4>
          </div>
          <Button onClick={taskgetter(task._id)}>
            <div className="col-start-2 col-end-3  text-gray-500 text-lg font-bold">
              {" "}
              {task.title}
            </div>
          </Button>
          <div className="col-start-3 col-end-4  text-gray-500 text-lg font-bold">
            <h4>
              {task.priority === "1"
                ? "High"
                : task.priority === "2"
                ? "Medium"
                : "Low"}
            </h4>
          </div>
          <div className="col-start-4 col-end-5  text-gray-500 text-lg font-bold">
            <h4>{task.date.toString().substring(0, 10)}</h4>
          </div>
          <div className="col-start-5 col-end-6  text-gray-500 text-lg font-bold">
            <h4 className="nav">{task.status}</h4>
          </div>

          <div
            onClick={() => deleteHandler(task._id)}
            className="col-start-6   text-gray-500 text-lg font-bold"
          >
            <Button color="error">
              <DeleteIcon />
            </Button>
          </div>
        </div>
      ))}
    </>
  );
};

export default Home;
