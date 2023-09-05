import React from "react";
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTasks } from "../store/TaskSlice";

const ActionBar = () => {
  const dispatch = useDispatch();
  const searchRef = useRef();
  const sortRef = useRef();
  const user = useSelector((state) => state.user);
  const resetHandler = async () => {
    const res = await fetch("http://localhost:8000/gettasks", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const data = await res.json();
    searchRef.current.value = "";
    dispatch(setTasks(data));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    let search = searchRef.current.value;

    const res = await fetch(`http://localhost:8000/search/${search}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const data = await res.json();

    dispatch(setTasks(data));
  };

  const sortingHandler = async (e) => {
    e.preventDefault();
    let sort = sortRef.current.value;

    const res = await fetch(`http://localhost:8000/sort/${sort}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const data = await res.json();

    dispatch(setTasks(data));
  };

  return (
    <div className="grid grid-cols-6  gap-6 place-items-center">
      <div className=" col-start-1 col-end-3  outline-none  text-black">
        <form
          onSubmit={submitHandler}
          className="flex"
        >
          <input
            ref={searchRef}
            placeholder="Search with title..."
            className=" rounded-3xl p-2 mr-2 outline "
          />
          <button
            type="submit"
            className="text-gray-400"
          >
            Search
          </button>
        </form>
      </div>
      <div className="col-start-3 col-end-4 outline-none  ">
        <button
          onClick={resetHandler}
          className="text-gray-400"
        >
          Reset
        </button>
      </div>

      <div className="col-end-7 col-span-2  outline-none  ">
        <form
          onSubmit={sortingHandler}
          className="flex"
        >
          <select
            ref={sortRef}
            className=" rounded-3xl p-2 mr-2 outline-none bg-gray-400"
          >
            <option>Sort by</option>
            <option value="Date">Date</option>
            <option value="Priority">Priority</option>
            {/* <option value="Status">Status</option> */}
          </select>
          <button className="text-gray-400">Sort</button>
        </form>
      </div>
    </div>

    //implement sorting of data based on input
  );
};

export default ActionBar;
