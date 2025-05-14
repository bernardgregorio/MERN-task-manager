import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import BreadcrumbsNav from "../../components/Layout/BreadcrumbsNav";

const Setting = () => {
  return (
    <Box>
      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        <Box flexGrow={1}>
          <BreadcrumbsNav />
        </Box>
      </Stack>
      <Box>
        <Typography variant="subtitle1" gutterBottom>
          Visit{" "}
          <a
            href="https://tms.bernardev.com"
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 font-bold"
          >
            tms.bernardev.com
          </a>{" "}
          to experience the full capabilities of the Task Management System.
        </Typography>
      </Box>
    </Box>
  );
};

export default Setting;
