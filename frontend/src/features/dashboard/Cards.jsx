import { useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import ListAltIcon from "@mui/icons-material/ListAlt";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";

import { GlobalContext } from "../../hooks/useContext";

function Cards() {
  const context = useContext(GlobalContext);

  const cards = [
    {
      id: 1,
      title: "Total Task",
      total: context.taskByStatusData.totalTasks,
      avatar: <AssignmentIcon sx={{ color: "white" }} />,
      color: "success.main",
    },
    {
      id: 2,
      title: "Completed Task",
      total: context.taskByStatusData.completedTasks,
      avatar: <AssignmentTurnedInIcon sx={{ color: "white" }} />,
      color: "info.main",
    },
    {
      id: 3,
      title: "In Progress Task",
      total: context.taskByStatusData.inProgressTasks,
      avatar: <ListAltIcon sx={{ color: "white" }} />,
      color: "warning.main",
    },
    {
      id: 4,
      title: "Todos",
      total: context.taskByStatusData.totalTodos,
      avatar: <FormatListNumberedIcon sx={{ color: "white" }} />,
      color: "error.main",
    },
  ];

  return (
    <Grid container spacing={2}>
      {cards.map((card) => (
        <Grid size={{ xs: 3 }} key={card.id}>
          <Card>
            <CardContent sx={{ height: "100%" }}>
              <Grid container spacing={0}>
                <Grid size={{ xs: 8 }}>
                  <Stack gap={1}>
                    <Typography variant="subtitle2" color="text.secondary">
                      {card.title}
                    </Typography>
                    <Typography
                      variant="h4"
                      color="text.primary"
                      sx={{ fontWeight: 600 }}
                    >
                      {card.total}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid
                  size={{ xs: 4 }}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Avatar sx={{ bgcolor: card.color, width: 48, height: 48 }}>
                    {card.avatar}
                  </Avatar>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default Cards;
