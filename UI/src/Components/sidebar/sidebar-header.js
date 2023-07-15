import React from "react";
import userPic from "./img/user.jpg";

const SidebarHeader = (props) => {
  const { customer, tenant, ava } = props.userInfo;
  return (
    <div className="sidebar-header">
      <div className="d-flex flex-nowrap">
        <div className="user-pic">
          <img src={ava || userPic} alt="User picture" />
        </div>
        <div className="user-info">
          <span className="user-name">
            Organization: <strong>{customer}</strong>
          </span>
          <span className="user-name">
            Tenant: <strong>{tenant}</strong>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SidebarHeader;
