import React, { useState } from "react";
import { Collapse } from "reactstrap";
import { useLocation, Link } from 'react-router-dom';

import {
  FaCogs,
  FaRegChartBar,
  FaTachometerAlt,
  FaAngleRight,
  FaUserFriends,
  FaLayerGroup,
  FaStream,
  FaDesktop,
  FaHome,
  FaFile,
  FaRobot,
  FaProjectDiagram
} from "react-icons/fa";

import {useTranslation} from "react-i18next";

let menu = [
  {
    key: "home",
    title: "Menu.home",
    link: "/dashboard",
  },
  {
    key: "bots",
    title: "Menu.bots",
    link: "/bots",
  },
  {
    key: "botmachines",
    title: "Menu.botmachines",
    link: "/botmachines",
  },
  {
    key: "monitor",
    title: "Menu.analytics",
    link: "/Monitor",
  },

  {
    key: "AIServiceManager",
    title: "Menu.service_manager",
    link: "/ai-servicemanager",
  },

  {
    key: "settings",
    title: "Menu.settings",
    link: "/settings",
  },

  // {
  //   key: "users",
  //   title: "Settings",
  //   link: "",
  //   submenu: [
  //     {
  //       key: "view",
  //       title: "User Management",
  //       link: "/users/view",
  //     },
  //     {
  //       key: "create",
  //       title: "Generic Settings",
  //       link: "/users/create",
  //     },
  //   ],
  // },
];

const SidebarMenu = (props) => {
  const [activeItem, setItem] = useState(-1);
  const [activeSubItem, setSubItem] = useState(-1);
  const location = useLocation()
  const getMenuItemIcon = (key) => {
    switch (key) {
      case "bots":
        return <FaProjectDiagram className="fa-icon" size="20" />;
      case "botmachines":
        return <FaDesktop className="fa-icon" size="20" />;
      case "home":
        return <FaHome className="fa-icon" size="20" />;
      case "dashboard":
        return <FaTachometerAlt className="fa-icon" size="20" />;
      case "users":
        return <FaUserFriends className="fa-icon" size="20" />;
      case "viewlogs":
        return <FaFile className="fa-icon" size="20" />;
      case "groups":
        return <FaLayerGroup className="fa-icon" size="20" />;
      case "monitor":
        return <FaRegChartBar className="fa-icon" size="20" />;
      case "settings":
        return <FaCogs className="fa-icon" size="20" />;
      case "AIServiceManager":
        return <FaRobot className="fa-icon" size="20" />;
      default:
        return <FaHome className="fa-icon" size="20" />;
    }
  };

  const [t] = useTranslation('common');

  return (
    <div className={`sidebar-menu ${props.className}`}>
      <ul>
        {menu.map((item, index) => {
          return (
            <>
            <li
              key={index}
              className={`sidebar-dropdown ${
                location.pathname === item.link ? "active" : ""
              }`}
            >
              <Link to={item.link}
                href={item.link || "#"}
                onClick={() => {
                  setSubItem(-1);
                  setItem(index === activeItem ? -1 : index);
                }}
              >
                <i className="menu-icon">{getMenuItemIcon(item.key)}</i>
                <span className="menu-text" style={{fontSize: "16px"}}>{t(item.title)}</span>
                {item.submenu ? (
                  <span className="caret">
                    <FaAngleRight size="16" />
                  </span>
                ) : (
                  ""
                )}
                <i className="fa fa-chevron-right rightIcon"></i>
              </Link>
              <Collapse isOpen={index === activeItem}>
                {item.submenu ? (
                  <div className="sidebar-submenu">
                    <ul>
                      {item.submenu.map((i, idx) => (
                        <li
                          key={idx}
                          className={`${idx === activeSubItem ? "active" : ""}`}
                        >
                          <a
                            href={i.link || "#"}
                            onClick={() =>
                              setSubItem(idx === activeSubItem ? -1 : idx)
                            }
                          >
                            {i.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  ""
                )}
              </Collapse>
            </li>
            </>
          );
        })}
      </ul>
    </div>
  );
};

export default SidebarMenu;
