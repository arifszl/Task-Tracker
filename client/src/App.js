import "./App.css";
import Header from "./components/Header";
import AddTask from "./components/AddTask";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="">
      <div className="nav sticky top-0 z-10">
        <Header />
      </div>

      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/add"
          element={<AddTask />}
        />
      </Routes>
    </div>
  );
}

export default App;
