import * as React from "react";
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
        <button
          onClick={onClose}
          className="text-black normal-case p-3 text-sm hover:bg-grey2 rounded-lg"
        >
          Batal
        </button>
        <button
          onClick={onSaveAction}
          className="text-green normal-case p-3 text-sm hover:bg-grey2 rounded-lg"
        >
          Simpan
        </button>
      </DialogActions>
    </Dialog>
  );
}
