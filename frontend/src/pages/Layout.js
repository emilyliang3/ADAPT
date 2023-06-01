import React from "react";
import {Outlet} from "react-router-dom";
import Navbar from "../Navbar";

const Layout = () => {
  let isSignedIn = false;
  return (
    <>
      <Navbar signedIn = {isSignedIn}/>
      <Outlet />
    </>
  );
};

export default Layout;