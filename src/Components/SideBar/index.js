import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

//import react pro sidebar components
import {
  ProSidebar,
  Menu,
  SubMenu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";

import styles from "./sideBar.css"; //import sidebar css from react-pro-sidebar module and our custom css

//import icons from react icons
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
  MdDashboard,
  MdLogout,
  MdQuestionAnswer,
  MdList,
  MdSettings,
  MdHotelClass,
  MdPhone,
} from "react-icons/md";

const SideBar = () => {
  //create initial menuCollapse state using useState hook
  const [menuCollapse, setMenuCollapse] = useState(false);

  const location = useLocation();
  const CurrentRoute = location.pathname;

  console.log(CurrentRoute, "CurrentRoute");

  const sideLinks = [
    {
      id: 1,
      icon: <MdDashboard />,
      route: "/dashboard",
      Title: "Dashboard",
    },
    {
      id: 2,
      icon: <MdQuestionAnswer />,
      route: "/career-enquiry",
      Title: "Career Enquiry",
    },
    {
      id: 3,
      icon: <MdList />,
      route: "/ttid-enquiry",
      Title: "TTID Enquiry",
    },
    {
      id: 4,
      icon: <MdHotelClass />,
      route: "/visitor-enquiry",
      Title: "Visitor Enquiry",
    },
    {
      id: 5,
      icon: <MdPhone />,
      route: "/telephonic-enquiry",
      Title: "Telephonic Enquiry",
    },
    {
      id: 6,
      icon: <MdSettings />,
      route: "/settings",
      Title: "Settings",
      subRoutes: [
        {
          id: 6.1,
          icon: <MdSettings />,
          route: "/settings/qualification",
          Title: "Qualification",
        },
        {
          id: 6.2,
          icon: <MdSettings />,
          route: "/settings/category",
          Title: "Category of the candidate",
        },
        {
          id: 6.3,
          icon: <MdSettings />,
          route: "/settings/educational",
          Title: "Educational Institute or College/ University",
        },
        {
          id: 6.4,
          icon: <MdSettings />,
          route: "/settings/branchmaster",
          Title: "Branch Master",
        },
        {
          id: 6.5,
          icon: <MdSettings />,
          route: "/settings/employeemaster",
          Title: "Employee master",
        },
        {
          id: 6.6,
          icon: <MdSettings />,
          route: "/settings/userights",
          Title: "User rights",
        },
      ],
    },
  ];
  const handleDropdownlist = () => {
    console.log("clecked");
  };
  const activeRoute = sideLinks.find((link) =>
    CurrentRoute.startsWith(link.route)
  )
    ? CurrentRoute
    : "/Dashboard";

  //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  return (
    <>
      <div className="header">
        {/* collapsed props to change menu size using menucollapse state */}
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
            <div className="closemenu" onClick={menuIconClick}>
              {/* changing menu collapse icon on click */}
              {menuCollapse ? (
                <MdOutlineKeyboardArrowLeft />
              ) : (
                <MdOutlineKeyboardArrowRight />
              )}
            </div>
          </SidebarHeader>
          <SidebarContent className="dropdownMenu">
            <Menu
              iconShape="square"
              onClick={() => {
                return handleDropdownlist();
              }}
            >
              {sideLinks.map((val) => {
                if (!val.subRoutes) {
                  return (
                    <MenuItem
                      key={val.id}
                      active={activeRoute.startsWith(val.route) ? true : false}
                      icon={val.icon}
                    >
                      <NavLink to={val.route}>{val.Title}</NavLink>
                    </MenuItem>
                  );
                } else {
                  return (
                    <>
                      {/* <MenuItem
                        key={val.id}
                        active={activeRoute.startsWith(val.route) ? true : false}
                        icon={val.icon}>
                        <NavLink to={val.route}>{val.Title}</NavLink>
                      </MenuItem> */}

                      <SubMenu
                        title={<NavLink to={val.route}>{val.Title}</NavLink>}
                        icon={val.icon}
                        onOpenChange={() => {}}
                        defaultOpen={true}
                        onClick={() => {
                          return console.log(activeRoute);
                        }}
                      >
                        {val.subRoutes.map((subRoute, index) => {
                          return (
                            <MenuItem
                              key={subRoute.id}
                              icon={subRoute.icon}
                              active={
                                activeRoute.startsWith(subRoute.route)
                                  ? true
                                  : false
                              }
                            >
                              <NavLink to={subRoute.route}>
                                {subRoute.Title}
                              </NavLink>
                            </MenuItem>
                          );
                        })}
                      </SubMenu>
                    </>
                  );
                }
              })}
            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <Menu iconShape="square">
              <MenuItem icon={<MdLogout />}>Logout</MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
    </>
  );
};

export default SideBar;

// import React, { useState } from "react";
// import { NavLink, useLocation } from "react-router-dom";

// //import react pro sidebar components
// import {
//   ProSidebar,
//   Menu,
//   SubMenu,
//   MenuItem,
//   SidebarHeader,
//   SidebarFooter,
//   SidebarContent,
// } from "react-pro-sidebar";
// import "react-pro-sidebar/dist/css/styles.css";

// import "./sideBar.css"; //import sidebar css from react-pro-sidebar module and our custom css

// //import icons from react icons
// import {
//   MdOutlineKeyboardArrowLeft,
//   MdOutlineKeyboardArrowRight,
//   MdDashboard,
//   MdLogout,
//   MdQuestionAnswer,
//   MdList,
//   MdSettings,
//   MdHotelClass,
//   MdPhone,
// } from "react-icons/md";

// const SideBar = () => {
//   //create initial menuCollapse state using useState hook
//   const [menuCollapse, setMenuCollapse] = useState(false);

//   const location = useLocation();
//   const CurrentRoute = location.pathname;

//   const sideLinks = [
//     {
//       id: 1,
//       icon: <MdDashboard />,
//       route: "/dashboard",
//       Title: "Dashboard",
//     },
//     {
//       id: 2,
//       icon: <MdQuestionAnswer />,
//       route: "/career-enquiry",
//       Title: "Career Enquiry",
//     },
//     {
//       id: 3,
//       icon: <MdList />,
//       route: "/ttid-enquiry",
//       Title: "TTID Enquiry",
//     },
//     {
//       id: 4,
//       icon: <MdHotelClass />,
//       route: "/visitor-enquiry",
//       Title: "Visitor Enquiry",
//     },
//     {
//       id: 5,
//       icon: <MdPhone />,
//       route: "/telephonic-enquiry",
//       Title: "Telephonic Enquiry",
//     },
//     {
//       id: 6,
//       icon: <MdSettings />,
//       route: "/settings",
//       Title: "Settings",
//     },
//   ];

//   const activeRoute = sideLinks.find(link => link.route === CurrentRoute) ? CurrentRoute : "/Dashboard";

//   //create a custom function that will change menucollapse state from false to true and true to false
//   const menuIconClick = () => {
//     //condition checking to change state from true to false and vice versa
//     menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
//   };

//   return (
//     <>
//       <div className="header">
//         {/* collapsed props to change menu size using menucollapse state */}
//         <ProSidebar collapsed={menuCollapse}>
//           <SidebarHeader>
//             <div className="closemenu" onClick={menuIconClick}>
//               {/* changing menu collapse icon on click */}
//               {menuCollapse ? (
//                 <MdOutlineKeyboardArrowLeft />
//               ) : (
//                 <MdOutlineKeyboardArrowRight />
//               )}
//             </div>
//           </SidebarHeader>
//           <SidebarContent>
//             <Menu iconShape="square">
//               {sideLinks.map((val) => (
//                 <Menuitem
//                   key={val.id}
//                   active={activeRoute === val.route ? true : false}
//                   icon={val.icon}
//                 >
//                   <NavLink to={val.route}>{val.Title}</NavLink>
//                 </Menuitem>
//               ))}
//               <SubMenu title="Components" >
//                 <MenuItem>Component 1</MenuItem>
//                 <MenuItem>Component 2</MenuItem>
//               </SubMenu>
//             </Menu>
//           </SidebarContent>
//           <SidebarFooter>
//             <Menu iconShape="square">
//               <MenuItem icon={<MdLogout />}>Logout</MenuItem>
//             </Menu>
//           </SidebarFooter>
//         </ProSidebar>
//       </div>
//     </>
//   );
// };

// export default SideBar;
