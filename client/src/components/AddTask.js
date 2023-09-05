import React from "react";

import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AddTask = () => {
  const navigate = useNavigate();
  const taskRef = useRef("");
  const descRef = useRef("");
  const dateRef = useRef("");
  const priorityRef = useRef("");
  const user = useSelector((state) => state.user);
  let sendFormData = async (formData) => {
    let response = await fetch("http://localhost:8000/addtask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        //sending token to backend for verification
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(formData),
      credentials: "include",
    });

    return response;
  };

  const formHandler = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please login to add task");
      navigate("/login");
      return;
    }
    let formData = {
      title: taskRef.current.value,
      date: dateRef.current.value,
      priority: priorityRef.current.value,
      description: descRef.current.value,
    };

    let response = await sendFormData(formData);

    if (response.status === 200) {
      alert("Task added successfully");
      navigate("/");
    }
  };
  return (
    <form onSubmit={formHandler}>
      <section className="text-white body-font ">
        <div className="container px-5 py-15 mx-auto -mt-12">
          <div className="flex flex-col text-center w-full mb-10 mt-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-Red-900">
              Add Task
            </h1>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="name"
                    className="leading-7 text-sm text-white font-semibold"
                  >
                    Title
                  </label>
                  <input
                    ref={taskRef}
                    type="text"
                    id="name"
                    name="name"
                    className="w-full bg-slate-100 bg-opacity-30 rounded-lg shadow-lg shadow-black  focus:border-black focus:bg-slate-50 focus:ring-2 focus:ring-slate-100 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="year"
                    className="leading-7 text-sm text-white font-semibold "
                  >
                    Status
                  </label>
                  <input
                    ref={dateRef}
                    type="date"
                    name=""
                    id=""
                    className="w-full bg-slate-100 bg-opacity-30 rounded-lg shadow-lg shadow-black  focus:border-black focus:bg-slate-50 focus:ring-2 focus:ring-slate-100 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="year"
                    className="leading-7 text-sm text-white font-semibold "
                  >
                    Priority
                  </label>

                  <select
                    name="priority"
                    ref={priorityRef}
                    className="w-full bg-slate-100 bg-opacity-30 rounded-lg shadow-lg shadow-black  focus:border-black focus:bg-slate-50 focus:ring-2 focus:ring-slate-100 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  >
                    <option>Select your priority</option>
                    <option value="1">High</option>
                    <option value="2">Medium</option>
                    <option value="3">Low</option>
                  </select>
                </div>
              </div>

              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="message"
                    className="leading-7 text-sm text-white font-semibold shadow-lg"
                  >
                    Description
                  </label>
                  <textarea
                    ref={descRef}
                    id="message"
                    name="message"
                    className="w-full bg-slate-100 bg-opacity-30 rounded-lg shadow-lg shadow-black focus:border-black focus:bg-slate-50 focus:ring-2 focus:ring-slate-100 h-32 text-base outline-none text-black py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  ></textarea>
                </div>
              </div>
              <div className="p-2 w-full">
                <button className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-black rounded text-lg">
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </form>
  );
};

export default AddTask;
