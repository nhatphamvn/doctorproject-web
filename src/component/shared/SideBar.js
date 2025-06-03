import React from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { NavLink } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import "./SideBar.css";

const SideBar = ({ collapsed, toggleSidebar }) => {
  // Tạo hàm để wrap NavLink với toggleSidebar
  const handleLinkClick = () => {
    toggleSidebar(); // Đóng sidebar khi click vào một mục
  };

  return (
    <div className={`sidebar-container ${collapsed ? "hidden" : "visible"}`}>
      <Sidebar
        collapsed={false}
        width="250px"
        style={{
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1000,
        }}
      >
        <Menu>
          <MenuItem onClick={handleLinkClick} component={<NavLink to="/" />}>
            <FormattedMessage id="navBar.home" />
          </MenuItem>
          <MenuItem
            onClick={handleLinkClick}
            component={<NavLink to="/system/all-blogs" />}
          >
            <FormattedMessage id="navBar.blogFamous" />
          </MenuItem>
          <MenuItem
            onClick={handleLinkClick}
            component={<NavLink to="/system/all-specialties" />}
          >
            <FormattedMessage id="navBar.specialtyFamous" />
          </MenuItem>
          <MenuItem
            onClick={handleLinkClick}
            component={<NavLink to="/system/all-doctors" />}
          >
            <FormattedMessage id="navBar.doctorFamous" />
          </MenuItem>
          <MenuItem
            onClick={handleLinkClick}
            component={<NavLink to="/system/all-clinics" />}
          >
            <FormattedMessage id="navBar.facilityFamous" />
          </MenuItem>
        </Menu>
      </Sidebar>

      {/* Overlay để click ra ngoài cũng ẩn sidebar */}
      {!collapsed && (
        <div className="sidebar-overlay" onClick={toggleSidebar} />
      )}
    </div>
  );
};

export default SideBar;
