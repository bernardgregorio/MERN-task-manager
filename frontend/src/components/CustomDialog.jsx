import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const CustomDialog = ({
  open,
  setOpen,
  onConfirm,
  message,
  confirmBtn = false,
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Alert</DialogTitle>
          <DialogDescription>&nbsp;</DialogDescription>
        </DialogHeader>
        <div className="flex items-center mb-4">{message}</div>
        <DialogFooter className="justify-end">
          {confirmBtn && (
            <Button
              type="button"
              onClick={() => {
                onConfirm?.();
                setOpen(false);
              }}
            >
              Yes
            </Button>
          )}
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
