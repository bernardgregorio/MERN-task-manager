import { useContext } from "react";
import Box from "@mui/material/Box";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { GlobalContext } from "../../hooks/useContext";

const Download = () => {
  const context = useContext(GlobalContext);

  const handleCloseDownload = () => {
    context.setOpenDownload(false);
  };

  return (
    <Box>
      <Dialog
        open={context.openDownload}
        onClose={context.handleCloseDownload}
        maxWidth="lg"
      >
        <DialogTitle>Download</DialogTitle>
        <DialogContent>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDownload} variant="outlined">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Download;
