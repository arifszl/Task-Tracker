import "./App.css";
import Header from "./components/Header";
import AddTask from "./components/AddTask";
import Home from "./components/Home";
import ActionBar from "./components/ActionBar";
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/user/Register";
import Login from "./components/user/Login";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./store/UserSlice.js";
import { useNavigate } from "react-router-dom";
import { NativeSelect } from "@mui/material";
function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const curruser = useSelector((state) => state.user);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      dispatch(setUser(user));
    }
    if (!user) {
      navigate("/login");
    }
  }, [dispatch]);
  return (
    <div className="p-2">
      <div className="nav sticky top-0 z-10">
        <Header />
      </div>
      <div className="">
        <Routes>
          <Route
            path="/"
            element={curruser.email ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/add"
            element={curruser.email ? <AddTask /> : <Navigate to="/login" />}
          />
          <Route
            path="/register"
            element={!curruser.email ? <Register /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!curruser.email ? <Login /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
