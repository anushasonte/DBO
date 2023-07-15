import React, { useEffect} from "react";
//import SidebarHeader from "./sidebar-header";
import * as Constants from "../Constants";
import SidebarMenu from "./sidebar-menu";
//import SidebarFooter from './sidebar-footer';
import "./index.scss";
import i18next from "i18next";

const Sidebar = (props) => {
  useEffect(async () => {
    const languageCode = sessionStorage.getItem(
      // Constants.USER_LANGUAGE_ID_SESSION_ATTRIBUTE_NAME
    );
    i18next.changeLanguage(languageCode.toLowerCase());

  },[]);

return (
    <nav id="sidebar" className="sidebar-wrapper">
      {props.children}
      {/* <div onMouseEnter={props.handleHover} onMouseLeave={props.handleHover}> */}
      <div>
        <div className="sidebar-content">
          {/* <SidebarHeader
            className="sidebar-item"
            userInfo={props.userInfo}
            changeStatus={props.handleStatusChange}
          /> */}
          <SidebarMenu className="sidebar-item" />
        </div>
        {/* <SidebarFooter /> */}
      </div>
    </nav>
  );
};

export default Sidebar;
