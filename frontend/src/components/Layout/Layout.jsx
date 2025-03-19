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
      setDrawerWidth(drawerWidth === 280 ? 60 : 280);
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
          mobileOpen={mobileOpen}
        />

        {/* side bar */}
        <Sidebar
          mobileOpen={mobileOpen}
          handleDrawerClose={handleDrawerClose}
          handleDrawerTransitionEnd={handleDrawerTransitionEnd}
          drawerWidth={drawerWidth}
        />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 2,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            pb: 10,
          }}
        >
          <Toolbar />
          <Outlet />
          <Toolbar />
        </Box>

        {/* footer */}
        <Footer />
      </Box>
    </Box>
  );
}

export default Layout;
