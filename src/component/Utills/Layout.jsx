import React, { Fragment } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

function Layout() {
  return (
    <Fragment>
      <div className="layout-wrapper">
        <Sidebar />
        <div className="page-content">
          <Header />
          <Footer />
        </div>
      </div>
    </Fragment>
  );
}

export default Layout;
