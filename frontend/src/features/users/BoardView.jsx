import { useContext, useRef } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid2";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

import { stringAvatar } from "../../utils/helper";
import { GlobalContext } from "../../hooks/useContext";
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
      {context.boardList.map((user) => (
        <Card key={user._id}>
          <CardActionArea
            aria-describedby="card-popover"
            onClick={(e) => {
              handleClick(e);
              context.setRecord(user);
            }}
          >
            <CardContent>
              <Grid container spacing={2}>
                <Grid
                  size={4}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Stack direction={"column"} spacing={2}>
                    <Avatar {...stringAvatar(user.fullname, 52)} />
                    <Chip
                      label={user.statusName}
                      color="success"
                      size="small"
                    />
                  </Stack>
                </Grid>
                <Grid size={8} sx={{ minHeight: 130, height: "100%" }}>
                  <Typography variant="h6">{user.fullname}</Typography>
                  <Typography variant="body2" color="primary">
                    {user.email}
                  </Typography>
                  <Typography color="text.secondary">
                    {user.titleName}
                  </Typography>
                  <Typography variant="body2">{user.roleName}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </GlobalBoardView>
  );
};

export default BoardView;
