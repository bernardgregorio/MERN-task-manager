import { useContext } from "react";
import Box from "@mui/material/Box";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { GlobalContext } from "../../hooks/useContext";

const Upload = () => {
  const context = useContext(GlobalContext);

  const handleCloseUpload = () => {
    context.setOpenUpload(false);
  };

  return (
    <Box>
      <Dialog
        open={context.openUpload}
        onClose={context.handleCloseForm}
        maxWidth="lg"
      >
        <DialogTitle>Upload File</DialogTitle>
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
          <Button onClick={handleCloseUpload} variant="outlined">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Upload;
