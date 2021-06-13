import React from "react";
import CIcon from "@coreui/icons-react";

const _nav = [
  {
    _tag: "CSidebarNavTitle",
    _children: ["Dashboard"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/dashboard",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    badge: {
      color: "info",
    },
  },
  {
    _tag: "CSidebarNavItem",
    name: "Users",
    to: "/users",
    icon: <CIcon name="cil-user" customClasses="c-sidebar-nav-icon" />,
    badge: {
      color: "info",
    },
  },
  {
    _tag: "CSidebarNavItem",
    name: "Notification",
    to: "/notification",
    icon: <CIcon name="cil-bell" customClasses="c-sidebar-nav-icon" />,
    badge: {
      color: "info",
    },
  },
];

export default _nav;
