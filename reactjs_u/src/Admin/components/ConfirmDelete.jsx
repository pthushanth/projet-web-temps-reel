import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import React from 'react';

const ConfirmDelete = ({open,handleClose,handleConfirm,title}) => {
    return (
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Are you sure you want to delete {title}?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirm}>Delete</Button>
        </DialogActions>
      </Dialog>
    );
}

export default ConfirmDelete;
