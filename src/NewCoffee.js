import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import { useState } from 'react';
import CoffeeForm from './CoffeeForm.js'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: 600,
    minWidth: 600,
    minHeight: 216,
    maxHeight: 216,
    width: '100%',
  },
  info: {
    minWidth: 200
  }, controls: {
    minWidth: 80
  }
}));

function NewCoffee(props) {

  const classes = useStyles();

  const [isEdit, setIsEdit] = useState(false);

  if (isEdit) {
    return <CoffeeForm onSuccessfulSubmit={props.onSuccessfulCreate} onFailedSubmit={props.onFailedCreate} onReset={() => {setIsEdit(false)}}></CoffeeForm>
  } else {
    return (
      <Grid container spacing={2} className={classes.root}>
        <Grid item>
          <Button variant="contained" color="primary" onClick={() => {setIsEdit(true)}}>New Coffee</Button>
        </Grid>
      </Grid>
    );
  }

}

export default NewCoffee;