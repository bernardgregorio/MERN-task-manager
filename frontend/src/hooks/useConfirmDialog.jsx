import { useState, useCallback } from "react";
import ConfirmDialog from "../components/ConfirmDialog";

const useConfirmDialog = () => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("warning");
  const [message, setMessage] = useState("");
  const [onConfirm, setOnConfirm] = useState(false);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const openDialog = useCallback(
    async (type, message, confirmAction = false) => {
      setOpen(false);
      setOnConfirm(false);

      await delay(100);

      setOpen(true);
      setType(type);
      setMessage(message);
      if (confirmAction) setOnConfirm(() => confirmAction);
      else setOnConfirm(false);
    },
    []
  );

  const handleClose = () => {
    setOpen(false);
    setOnConfirm(false);
  };

  const ConfirmDialogComponent = () => (
    <ConfirmDialog
      open={open}
      closeDialog={handleClose}
      type={type}
      message={message}
      handleConfirm={onConfirm ? onConfirm : false}
    />
  );

  return { openDialog, ConfirmDialogComponent };
};

export default useConfirmDialog;
