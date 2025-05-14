import { useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [drawerWidth, setDrawerWidth] = useState(280);
  const [sideBarTitle, setSideBarTitle] = useState("Task Management System");

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing && window.innerWidth <= 600) {
      setDrawerWidth(280);
      setMobileOpen(!mobileOpen);
    } else {
      if (drawerWidth === 280) {
        setDrawerWidth(60);
        setSideBarTitle("TMS");
      } else {
        setDrawerWidth(280);
        setSideBarTitle("Task Management System");
      }
    }
  };

  return (
    <Box className="w-full min-h-screen font-roboto bg-[#fafbfc]">
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        {/* navbar */}
        <Navbar
          handleDrawerToggle={handleDrawerToggle}
          drawerWidth={drawerWidth}
        />

        {/* side bar */}
        <Sidebar
          mobileOpen={mobileOpen}
          handleDrawerClose={handleDrawerClose}
          handleDrawerTransitionEnd={handleDrawerTransitionEnd}
          drawerWidth={drawerWidth}
          sideBarTitle={sideBarTitle}
        />

        {/* main content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
          <Box sx={{ p: 2, minHeight: "calc(100vh - 128px)" }}>
            <Outlet />
          </Box>
          {/* <Toolbar /> */}

          {/* footer */}
          <Footer />
        </Box>
      </Box>
    </Box>
  );
}

export default Layout;
