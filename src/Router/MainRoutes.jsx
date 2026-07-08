
import { Route } from "react-router-dom";
import React from "react";
import Dashoborad from "../component/Dashobard/Dashoboard";


const routes = [
  {
    path: '/dashboard',
    element: <Dashoborad />,
  },

];

export const routeComponents = routes.map((route, index) => (
  <Route key={index} path={route.path} element={route.element} />
));
