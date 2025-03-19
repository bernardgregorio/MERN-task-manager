import { useContext, useRef } from "react";
import { GlobalContext } from "../../hooks/useContext";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import CommentIcon from "@mui/icons-material/Comment";

import UserInfo from "../users/UserInfo";
import PriorityColor from "../priority/PriorityColor";
import GlobalBoardView from "../../components/GlobalBoardView";

const BoardView = () => {
  const wrapperRef = useRef();
  const context = useContext(GlobalContext);

  const handleClick = (e) => {
    if (wrapperRef.current) {
      wrapperRef.current.handleClick(e);
    }
  };

  return (
    <GlobalBoardView ref={wrapperRef}>
      {context.boardList.map((data) => (
        <Card key={data._id}>
          <CardActionArea
            aria-describedby="card-popover"
            onClick={(e) => {
              handleClick(e);
              context.setRecord(data);
            }}
          >
            <CardContent>
              <Typography variant="subtitle2" sx={{ mb: 2, height: 20 }}>
                {data.title.length > 40
                  ? data.title.slice(0, 40) + "..."
                  : data.title}
              </Typography>
              <Typography variant="body2" sx={{ height: 40 }}>
                {data.description.length > 80
                  ? data.description.slice(0, 80) + "..."
                  : data.description}
              </Typography>

              <Stack
                direction="row"
                spacing={2}
                sx={{
                  width: "100%",
                  mt: 2,
                }}
              >
                <Box flexGrow={1}>
                  {data.taskName != "N/A" && (
                    <PriorityColor priority={data.priorityName} />
                  )}
                </Box>
                <Box sx={{ color: "gray" }}>
                  <PlaylistAddCheckIcon fontSize="small" /> {data.todoCount}{" "}
                  <CommentIcon fontSize="small" /> 0
                </Box>
              </Stack>

              <Stack
                direction="row"
                spacing={2}
                sx={{
                  width: "100%",
                  mt: 2,
                }}
              >
                <Box flexGrow={1}>
                  <Chip label={data.statusName} color="primary" />
                </Box>
                <Box>
                  <UserInfo users={data.assignedUsers} size={36} />
                </Box>
              </Stack>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </GlobalBoardView>
  );
};

export default BoardView;
