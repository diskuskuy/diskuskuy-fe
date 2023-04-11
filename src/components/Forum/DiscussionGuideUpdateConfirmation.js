import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const emails = ['username@gmail.com', 'user02@gmail.com'];

export default function SimpleDialog({ open, onClose, onYesAction }) {

    return (
      <Dialog onClose={onClose} open={open}>
        <DialogTitle>Konfirmasi</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Apakah anda yakin?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onYesAction}>Ya</Button>
          <Button onClick={onClose} autoFocus>
            Tidak
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  