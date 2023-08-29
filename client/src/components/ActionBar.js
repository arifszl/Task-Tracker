import React from "react";
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTasks } from "../store/Store";

const ActionBar = () => {
  const dispatch = useDispatch();
  const searchRef = useRef();
  const sortRef = useRef();

  const resetHandler = async () => {
    const res = await fetch("http://localhost:8000/gettasks");
    const data = await res.json();
    searchRef.current.value = "";
    dispatch(setTasks(data));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    let search = searchRef.current.value;
    console.log(search);
    const res = await fetch(`http://localhost:8000/search/${search}`);
    const data = await res.json();
    console.log(data);
    dispatch(setTasks(data));
  };

  const sortingHandler = async (e) => {
    e.preventDefault();
    let sort = sortRef.current.value;
    console.log(sort);
    const res = await fetch(`http://localhost:8000/sort/${sort}`);
    const data = await res.json();
    console.log(data);
    dispatch(setTasks(data));
  };

  return (
    <div className="grid grid-cols-4 gap-4 place-items-center">
      <div className=" outline-none  text-black">
        <form
          onSubmit={submitHandler}
          className="flex"
        >
          <input
            ref={searchRef}
            placeholder="Search with title..."
            className=" rounded-3xl p-2 mr-2 outline-none "
          />
          <button className="text-gray-400">Search</button>
        </form>
      </div>
      <div className=" outline-none  flex ml-2">
        <button
          onClick={resetHandler}
          className="text-gray-400"
        >
          Reset
        </button>
      </div>

      <div className=" outline-none  ">
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
      <div className=" outline-none  flex ml-2">
        <button
          // onClick={resetSortHandler}
          className="text-gray-400"
        >
          Reset
        </button>
      </div>
    </div>

    //implement sorting of data based on input
  );
};

export default ActionBar;
