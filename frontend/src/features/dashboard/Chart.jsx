import { useContext } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";

import { GlobalContext } from "../../hooks/useContext";

export default function Chart() {
  const context = useContext(GlobalContext);
  const sizing = {
    width: 500,
    height: 300,
  };
  const TOTAL = context.todoData
    .map((item) => item.total)
    .reduce((a, b) => a + b, 0);

  const getArcLabel = (params) => {
    const percent = params.value / TOTAL;
    return `${(percent * 100).toFixed(0)}%`;
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid size={{ xs: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="text.primary">
                Priority
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <PieChart
                  series={[
                    {
                      data: context.taskData.priorities || [],
                      arcLabel: getArcLabel,
                    },
                  ]}
                  sx={{
                    [`& .${pieArcLabelClasses.root}`]: {
                      fill: "white",
                      fontSize: 14,
                    },
                  }}
                  margin={{ right: 200 }}
                  {...sizing}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="text.primary">
                Status
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <BarChart
                  xAxis={[
                    {
                      scaleType: "band",
                      data: context.todoData.map((item) => item.status),
                    },
                  ]}
                  series={[
                    { data: context.todoData.map((item) => item.total) },
                  ]}
                  width={900}
                  height={300}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
