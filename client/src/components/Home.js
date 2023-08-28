import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
const Home = () => {
  const [tasks, setTasks] = useState([]);

  const fetchPosts = async () => {
    const res = await fetch("http://localhost:8000/gettasks");
    const data = await res.json();
    console.log(data);
    setTasks(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  tasks.map((task) => {
    console.log(task);
  });

  return (
    <>
      <div className="grid grid-cols-6 gap-4 place-items-center p-2 border border-slate-100  shadow-sm shadow-red-300 mt-5">
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
          className="grid grid-cols-6 gap-4 place-items-center  shadow-sm shadow-slate-50 mt-5"
          key={index}
        >
          <div className="col-start-2 col-end-3  text-gray-500 text-lg font-bold">
            <h4>Arif</h4>
          </div>
          <div className="col-start-3 col-end-4  text-gray-500 text-lg font-bold">
            <h4>{task.priority}</h4>
          </div>
          <div className="col-start-4 col-end-5  text-gray-500 text-lg font-bold">
            <h4>{task.date}</h4>
          </div>
          <div className="col-start-5 col-end-6  text-gray-500 text-lg font-bold">
            <select className="nav">
              <option value="ToDO">In Progress</option>
              <option value="Doing">Pending</option>
              <option value="Done">Completed</option>
            </select>
          </div>
          <div className="col-start-6   text-gray-500 text-lg font-bold">
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
