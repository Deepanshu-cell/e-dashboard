import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getDataFromLocal } from "../LocalStorageHandler";

const PrivateComponent = () => {
  let isUserAuth = getDataFromLocal("user");
  return isUserAuth ? <Outlet /> : <Navigate to="/signup" />;
};

export default PrivateComponent;
