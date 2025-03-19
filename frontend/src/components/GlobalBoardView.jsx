import PropTypes from "prop-types";
import {
  useContext,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";

import { GlobalContext } from "../hooks/useContext";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const GlobalBoardView = forwardRef(function GlobalBoardView({ children }, ref) {
  const context = useContext(GlobalContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const isBoardInitialized = useRef(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const loadMore = () => {
    isBoardInitialized.current = false;
    context.setPage(context.page + 1);
  };

  useEffect(() => {
    if (context.isSuccess && context.data.data) {
      if (!isBoardInitialized.current || context.search === "") {
        isBoardInitialized.current = true;
        context.setBoardList((prev) => {
          const existingIds = new Set(prev.map((data) => data._id));
          const newData = context.data.data.filter(
            (data) => !existingIds.has(data._id)
          );
          return [...prev, ...newData];
        });
      } else if (context.search !== "") {
        context.setBoardList(context.data.data);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context.isSuccess, context.data.data]);

  useImperativeHandle(ref, () => ({
    handleClick,
  }));

  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill, minmax(min(320px, 100%), 1fr))",
          gap: 4,
        }}
      >
        {children}
        <Popover
          id="card-popover"
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuList>
            <MenuItem
              onClick={() => {
                context.setCat("update");
                context.setOpenForm(true);
                handleClose();
              }}
            >
              <ListItemIcon>
                <EditIcon color="success" />
              </ListItemIcon>
              <ListItemText>Edit</ListItemText>
            </MenuItem>
            <MenuItem
              onClick={() => {
                context.openDialog(
                  "warning",
                  "Are you sure you want to delete this user?",
                  () => context.handleDelete(context.record._id)
                );
                handleClose();
              }}
            >
              <ListItemIcon>
                <DeleteIcon color="error" />
              </ListItemIcon>
              <ListItemText>Delete</ListItemText>
            </MenuItem>
          </MenuList>
        </Popover>
      </Box>
      {context.data.totalPages > context.page && (
        <Button
          onClick={loadMore}
          variant="outlined"
          sx={{ mt: 2, textTransform: "none" }}
        >
          Load More
        </Button>
      )}
    </Box>
  );
});

export default GlobalBoardView;

GlobalBoardView.propTypes = {
  children: PropTypes.node,
};
