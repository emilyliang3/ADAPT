import React from "react";
import {Outlet} from "react-router-dom";
import Navbar from "../Navbar";
import {useUser} from '../firebaseFunctions.js'

const Layout = () => {
  return (
    <>
      <Navbar signedIn = {useUser()}/>
      <Outlet />
    </>
  );
};

export default Layout;