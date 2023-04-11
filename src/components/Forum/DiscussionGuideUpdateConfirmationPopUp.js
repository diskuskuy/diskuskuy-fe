import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function DiscussionGuideUpdateConfirmationPopUp({
  open,
  onClose,
  onYesAction,
}) {
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Konfirmasi</DialogTitle>
      <DialogContent>
        <DialogContentText>Apakah anda yakin?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          autoFocus
          variant="text"
          className="text-black normal-case"
        >
          Tidak
        </Button>
        <Button
          onClick={onYesAction}
          variant="filled"
          className="text-white normal-case bg-[#2ECC71]"
        >
          Ya
        </Button>
      </DialogActions>
    </Dialog>
  );
}
