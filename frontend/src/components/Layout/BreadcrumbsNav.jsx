import { Link as RouterLink, useLocation } from "react-router-dom";
import { Breadcrumbs, Link, Typography } from "@mui/material";

const BreadcrumbsNav = () => {
  const location = useLocation();
  let pathnames = location.pathname.split("/").filter((x) => x);
  pathnames = [...new Set(pathnames)];

  const headers = [
    { tasks: "Tasks" },
    { todos: "To-Dos" },
    { "team-members": "Team Members" },
    { reports: "Reports" },
    { profile: "Profile" },
    { settings: "Settings" },
  ];

  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
      {pathnames.length > 0 ? (
        pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          return isLast ? (
            <Typography key={to} color="textPrimary" variant="h5">
              {headers.find((header) => header[value])[value]}
            </Typography>
          ) : (
            <Link key={to} component={RouterLink} to={to} color="inherit">
              {headers.find((header) => header[value])[value]}
            </Link>
          );
        })
      ) : (
        <Typography color="textPrimary" variant="h5">
          Dashboard
        </Typography>
      )}
    </Breadcrumbs>
  );
};

export default BreadcrumbsNav;
