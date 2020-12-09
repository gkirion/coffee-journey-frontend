import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function DeleteModal(props) {

  const handleClose = () => {
    props.onClose();
  }

  const handleDelete = () => {
    props.onDelete();
  }

  return (
    <Dialog onClose={handleClose()} aria-labelledby="alert-dialog-title" >
      <DialogTitle id="alert-dialog-title">Delete Coffee?</DialogTitle>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={handleDelete}>Delete</Button>
        <Button variant="contained" onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteModal;