import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Alert from "@mui/material/Alert";

const ConfirmDialog = ({
  open,
  closeDialog,
  type,
  message,
  handleConfirm = false,
}) => {
  const dialogTitle = (type) => {
    switch (type) {
      case "success":
        return (
          <Alert sx={{ padding: "10px 16px" }} severity="success">
            Success
          </Alert>
        );
      case "info":
        return (
          <Alert sx={{ padding: "10px 16px" }} severity="info">
            Information
          </Alert>
        );
      case "warning":
        return (
          <Alert sx={{ padding: "10px 16px" }} severity="warning">
            Warning
          </Alert>
        );
      default:
        return (
          <Alert sx={{ padding: "10px 16px" }} severity="error">
            Error
          </Alert>
        );
    }
  };

  return (
    <Dialog
      id="confirm-dialog"
      fullWidth={true}
      maxWidth="xs"
      open={open}
      onClose={closeDialog}
      className="font-roboto"
    >
      <DialogTitle id="alert-dialog-title" sx={{ padding: 0 }}>
        {dialogTitle(type)}
      </DialogTitle>

      <DialogContent>
        <div className="p-6">{message}</div>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog} variant="outlined">
          Close
        </Button>
        {handleConfirm && (
          <Button
            onClick={() => {
              closeDialog();
              handleConfirm();
            }}
            variant="contained"
          >
            Yes
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;

ConfirmDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  closeDialog: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  handleConfirm: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
};
