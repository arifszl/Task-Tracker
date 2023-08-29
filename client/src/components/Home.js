import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTasks } from "../store/Store";

const Home = () => {
  const deleteHandler = async (id) => {
    console.log(id);
    await fetch(`http://localhost:8000/deletetask/${id}`, {
      method: "DELETE",
    });
    fetchPosts();
  };

  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);

  const fetchPosts = async () => {
    const res = await fetch("http://localhost:8000/gettasks");
    const data = await res.json();

    dispatch(setTasks(data));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
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
          <div className="col-start-2 col-end-3  text-gray-500 text-lg font-bold">
            <h4>{task.title}</h4>
          </div>
          <div className="col-start-3 col-end-4  text-gray-500 text-lg font-bold">
            <h4>
              {task.priority == "1"
                ? "High"
                : task.priority == "2"
                ? "Medium"
                : "Low"}
            </h4>
          </div>
          <div className="col-start-4 col-end-5  text-gray-500 text-lg font-bold">
            <h4>{task.date.substring(0, 10)}</h4>
          </div>
          <div className="col-start-5 col-end-6  text-gray-500 text-lg font-bold">
            <select className="nav">
              <option value="ToDO">In Progress</option>
              <option value="Doing">Pending</option>
              <option value="Done">Completed</option>
            </select>
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
