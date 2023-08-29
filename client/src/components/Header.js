import React from "react";

import { Button } from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { NavLink } from "react-router-dom";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className="text-lg   flex justify-between items-center  text-red-600 font-bold p-1 border-b-2 border-gray-500">
      <div className="m-1 ">
        <Link to="/">
          <span>
            <TaskAltIcon /> Task<span className="text-gray-400">Tracker</span>
          </span>
        </Link>
      </div>

      <div className="outline-none">
        <h1 className="text-lg text-white flex items-center cursor-pointer">
          <NavLink to="/add">
            <Button>
              {" "}
              <h1 className="text-white  text-opacity-70 font-semibold hover:text-amber-50">
                New Task
              </h1>
            </Button>{" "}
          </NavLink>

          <div className="ml-4 mr-3">
            <Avatar src="https://kajabi-storefronts-production.global.ssl.fastly.net/kajabi-storefronts-production/themes/284832/settings_images/rLlCifhXRJiT0RoN2FjK_Logo_roundbackground_black.png" />
          </div>
        </h1>
      </div>
    </div>
  );
};

export default Header;
