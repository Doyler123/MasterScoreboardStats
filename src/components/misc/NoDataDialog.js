import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import moment from 'moment'

export default function NoDataDialog({open, handleClose, date}) {

  return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"No Data Available"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            { date && date.length === 2 ? "No data available for dates: " + moment(date[0]).format("DD/MM/YYYY") + " - " + moment(date[1]).format("DD/MM/YYYY") 
            : "Not enough rounds played."}
          </DialogContentText>
        </DialogContent>
        {
        date && date.length === 2
        ? <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    OK
                  </Button>
                </DialogActions>
        : null
        }
      </Dialog>
  );
}