import ReactDOM from "react-dom";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import UserInfo from "./pages/UserInfo";
import Food from "./pages/Food";
import Workout from "./pages/Workout";
import Login from "./pages/Login";
import NoPage from "./pages/NoPage";


import "./index.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
          <Route path="user-info" element={<UserInfo />} />
          <Route path="food" element={<Food />} />
          <Route path="workout" element={<Workout />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
