import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import './Coffee.css';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: 600,
    minWidth: 600,
    width: '100%',
  },
  info: {
    minWidth: 200
  }, controls: {
    minWidth: 80
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    maxWidth: 400,
    minWidth: 400
  },
  modalTitle: {
  }
}));

function Coffee(props) {

  const classes = useStyles();
  const [showControls, setShowControls] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = (coffeeId) => {
    fetch('http://localhost:5000/coffeeJourney/' + coffeeId, {
      method: 'DELETE'
    }).then(response => {
      if (response.status == 200) {
        setShowDeleteModal(false)
        props.onSuccessfulDelete();
      } else {
        setShowDeleteModal(false)
        props.onFailedDelete();
      }
    })
  }

  return ( 
    <Grid container spacing={2} className={classes.root}>
      <Grid item><img src={props.imageUrl} class="Coffee-image"></img></Grid>
      <Grid item xs sm container direction="column" spacing={2} className={classes.info}>
        <Grid item xs>
          <Typography gutterBottom variant="subtitle1">{props.name}</Typography>
          <Typography gutterBottom variant="subtitle2">{props.company}</Typography>
        </Grid>
        <Grid item xs><Typography gutterBottom variant="body1">{props.tags}</Typography></Grid>
      </Grid>
      <Grid item xs={1} sm={1} container direction="column" spacing={2} className={classes.controls} onMouseEnter={() => {setShowControls(true)}} onMouseLeave={() => {setShowControls(false)}}>
        <Grid item xs={1} sm={1}>{props.price}€</Grid>
          {showControls && (
            <Grid item xs={1} sm={1} container direction="column">
              <Grid item xs={1} sm={1}>
                <IconButton>
                  <Edit></Edit>
                </IconButton>
              </Grid>
              <Grid item xs={1} sm={1}>
                <IconButton onClick={() => setShowDeleteModal(true)}>
                  <DeleteIcon></DeleteIcon>
                </IconButton>
              </Grid>
            </Grid>
          )}
          <Dialog
            className={classes.modal}
            open={showDeleteModal}
            onClose={() => setShowDeleteModal(false)} 
            aria-labelledby="alert-dialog-title"

          >
            <div className={classes.paper}>
              <DialogTitle id="alert-dialog-title">Delete Coffee?</DialogTitle>
              <DialogActions>
                <Button variant="contained" color="primary" onClick={() => handleDelete(props.id)}>Delete</Button>
                <Button variant="contained" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
              </DialogActions>
            </div>
          </Dialog>
      </Grid>
    </Grid>
  );
}

export default Coffee;