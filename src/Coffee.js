import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
  }
}));

function Coffee(props) {

  const classes = useStyles();
  const [showControls, setShowControls] = useState(false);

  return ( 
    <Grid container spacing={2} className={classes.root}>
      <Grid item><img src="scenery.jpg" class="Coffee-image"></img></Grid>
      <Grid item xs sm container direction="column" spacing={2} className={classes.info}>
        <Grid item xs>
          <Typography gutterBottom variant="subtitle1">{props.name}</Typography>
          <Typography gutterBottom variant="subtitle2">{props.company}</Typography>
        </Grid>
        <Grid item xs><Typography gutterBottom variant="body1">{props.tags}</Typography></Grid>
      </Grid>
      <Grid item xs={1} sm={1} container direction="column" spacing={2} onMouseEnter={() => {setShowControls(true)}} onMouseLeave={() => {setShowControls(false)}} className={classes.controls}>
        <Grid item xs={1} sm={1}>{props.price}€</Grid>
          {showControls && (
            <Grid item xs={1} sm={1} container direction="column">
              <Grid item xs={1} sm={1}>
                <IconButton>
                  <Edit></Edit>
                </IconButton>
              </Grid>
              <Grid item xs={1} sm={1}>
                <IconButton>
                  <DeleteIcon></DeleteIcon>
                </IconButton>
              </Grid>
            </Grid>
          )}
      </Grid>
    </Grid>
  );
}

export default Coffee;