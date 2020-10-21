import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ScoreCard from './index';

import { useStateValue, actions } from '../../state'

export default function AlertDialog({ compId, courseData, open}) {  

  const [{}, dispatch ] = useStateValue();  

  const setOpen = (value) => {
    dispatch({
        type: actions.SCORECARD_OPEN,
        scorecardOpen: value
    })
  }

  const handleClose = () => {
    setOpen(false);
  };

  let competition;
  let courseInfo;
  courseData.some(course => {
      let foundComp = course.Competitions.find(comp => comp.Date === compId);
      if(foundComp){
        competition = foundComp;
        courseInfo = course;
        return true; 
      }
  });

  return (

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{competition.Name}</DialogTitle>
        <DialogContent>
            <ScoreCard 
                cardData={competition}
                courseData={courseInfo}
                readOnly={true}
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
  );
}
