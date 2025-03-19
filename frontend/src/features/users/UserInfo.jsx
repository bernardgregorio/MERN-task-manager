import { useState } from "react";
import PropTypes from "prop-types";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { stringAvatar } from "../../utils/helper";

const UserInfo = ({ users, size = 38 }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const handlePopoverOpen = (event, user) => {
    setCurrentUser(user);
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Box>
      {((users && typeof users === "object" && Object.keys(users).length > 0) ||
        (Array.isArray(users) && users.length > 0)) && (
        <Stack direction="row" spacing={0}>
          {(Array.isArray(users) ? users : [users]).map((user) => (
            <Avatar
              key={user.username}
              {...stringAvatar(user.fullname, size)}
              onMouseEnter={(event) => handlePopoverOpen(event, user)}
              onMouseLeave={handlePopoverClose}
              aria-owns={open ? user.username : undefined}
              aria-haspopup="true"
            />
          ))}
        </Stack>
      )}
      {currentUser && (
        <Popover
          id={currentUser.username}
          sx={{ pointerEvents: "none" }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <Card sx={{ width: "fit-content", minWidth: 200 }}>
            <CardContent>
              <Stack direction={"row"} spacing={2}>
                <Stack
                  direction={"column"}
                  spacing={1}
                  sx={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Avatar {...stringAvatar(currentUser.fullname)} />

                  <Chip
                    label={currentUser.status}
                    color={currentUser.status == "Active" ? "success" : "error"}
                    size="small"
                  />
                </Stack>
                <Box>
                  <Typography variant="h6" component="div">
                    {currentUser.fullname}
                  </Typography>

                  <Typography variant="body2" color="primary">
                    {currentUser.email}
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary">
                    {currentUser.title}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Popover>
      )}
    </Box>
  );
};

export default UserInfo;

UserInfo.propTypes = {
  users: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  size: PropTypes.number,
};
