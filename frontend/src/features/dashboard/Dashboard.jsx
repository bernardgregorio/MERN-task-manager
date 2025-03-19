import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Cards from "./Cards";
import Chart from "./Chart";
import Tasks from "./Tasks";
import User from "./User";

import {
  useFetchTaskQuery,
  useFetchTodoQuery,
  useFetchTaskByStatusQuery,
} from "./dashboardApiSlice";
import { GlobalContext } from "../../hooks/useContext";

const Dashboard = () => {
  const { data: taskData, isSuccess: isTaskSuccess } = useFetchTaskQuery();
  const { data: todoData, isSuccess: isTodoSuccess } = useFetchTodoQuery();
  const { data: taskByStatusData, isSuccess: isTaskByStatusSuccess } =
    useFetchTaskByStatusQuery();

  const context = {
    taskData: isTaskSuccess ? taskData : [],
    todoData: isTodoSuccess ? todoData : [],
    taskByStatusData: isTaskByStatusSuccess ? taskByStatusData : [],
  };

  return (
    <GlobalContext.Provider value={context}>
      <Box>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <Cards />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Chart />
          </Grid>
          <Grid size={{ xs: 8 }}>
            <Tasks />
          </Grid>
          <Grid size={{ xs: 4 }}>
            <User />
          </Grid>
        </Grid>
      </Box>
    </GlobalContext.Provider>
  );
};

export default Dashboard;
