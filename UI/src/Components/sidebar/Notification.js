import React, { useState } from "react";
import {
  DropdownItem,
  DropdownToggle,
  Dropdown,
  DropdownMenu,
} from "reactstrap";
import { FaBell, FaClock } from "react-icons/fa";
import NotificationIcon from "../../assets/images/alert.png"
import { useTranslation, withTranslation } from "react-i18next";


const Notification = (props) => {
  const [notificationIsOpen, setNotificationOpen] = useState(false);
  const [t] = useTranslation("common");

  return (
    <div className="sidebar-footer">
      <Dropdown
        isOpen={notificationIsOpen}
        toggle={() => setNotificationOpen(!notificationIsOpen)}
      >
        <DropdownToggle tag="div" className="dropdown-button position-relative">
          <span>
            <img src={NotificationIcon} alt="Notification" className="navBarIcons notification"/>
          </span>
          <sup className="badge badge-info p-2 notification">2</sup>
        </DropdownToggle>
        <DropdownMenu className="notification-menu">
          <DropdownItem header className="font-weight-bold notification-header">
            {t('Notifications.title')}
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem className="notifications">
            <div className="notification-content">
              <div className="content">
                <div className="notification-detail">
                {t('Notifications.lbl_msg')}.
                </div>
                <small className="float-right text-italic">
                  <FaClock></FaClock>&nbsp;6 {t('Notifications.lbl_msg_time')}
                </small>
              </div>
            </div>
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem className="notification-footer">View all</DropdownItem>
        </DropdownMenu>
      </Dropdown>

    </div>
  );
};

export default withTranslation('common')(Notification);
