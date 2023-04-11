import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { InputLabel, TextField } from "@mui/material";

export default function CreateWeekPopUp({
  open,
  onClose,
  onSaveAction,
  inputValue,
  handleInputChange,
}) {
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Tambah Week</DialogTitle>
      <DialogContent>
        <InputLabel id="nama-week-label">Nama Week</InputLabel>
        <TextField
          labelId="nama-week-label"
          autoFocus
          className="w-96"
          value={inputValue}
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          autoFocus
          variant="text"
          className="text-black normal-case"
        >
          Batal
        </Button>
        <Button
          onClick={onSaveAction}
          variant="filled"
          className="text-white normal-case bg-[#2ECC71]"
        >
          Simpan
        </Button>
      </DialogActions>
    </Dialog>
  );
}
