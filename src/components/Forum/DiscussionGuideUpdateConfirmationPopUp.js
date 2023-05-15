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
        <button
          onClick={onClose}
          className="text-black normal-case p-3 text-sm hover:bg-grey2 rounded-lg"
        >
          Tidak
        </button>
        <button
          onClick={onYesAction}
          className="text-green normal-case p-3 text-sm hover:bg-grey2 rounded-lg"
        >
          Ya
        </button>
      </DialogActions>
    </Dialog>
  );
}
