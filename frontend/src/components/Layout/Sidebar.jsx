import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TaskIcon from "@mui/icons-material/Assignment";
import TodoIcon from "@mui/icons-material/PlaylistAddCheck";
import TeamIcon from "@mui/icons-material/People";
import { Link } from "react-router-dom";

const Sidebar = ({
  mobileOpen,
  handleDrawerClose,
  handleDrawerTransitionEnd,
  drawerWidth,
}) => {
  const menu = [
    { name: "Dashboard", icon: <DashboardIcon />, link: "/" },
    { name: "Tasks", icon: <TaskIcon />, link: "/tasks" },
    { name: "To-Dos", icon: <TodoIcon />, link: "/todos" },
    { name: "Team Members", icon: <TeamIcon />, link: "/team-members" },
  ];

  const drawer = (
    <Box>
      <Toolbar>
        <Typography variant="h6" noWrap>
          Task Manager
        </Typography>
      </Toolbar>

      <List>
        {menu.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton component={Link} to={item.link}>
              <ListItemIcon
                sx={{ minWidth: drawerWidth === 60 ? 0 : undefined }}
              >
                {item.icon}
              </ListItemIcon>
              {drawerWidth !== 60 && <ListItemText primary={item.name} />}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: { sm: drawerWidth },
        flexShrink: { sm: 0 },
      }}
      aria-label="sidebar navigation"
    >
      {/* Mobile Sidebar */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        slotProps={{ root: { keepMounted: true } }}
      >
        {drawer}
      </Drawer>

      {/* Permanent Sidebar for Desktop */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;

Sidebar.propTypes = {
  mobileOpen: PropTypes.bool.isRequired,
  handleDrawerClose: PropTypes.func.isRequired,
  handleDrawerTransitionEnd: PropTypes.func.isRequired,
  drawerWidth: PropTypes.number,
};
