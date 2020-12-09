import logo from './logo.svg';
import './App.css';
import Coffee from './Coffee.js';
import NewCoffee from './NewCoffee.js';
import { Button, Grid } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const useStyles = makeStyles((theme) => ({
    root: {
      justifyContent: 'center'
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalTitle: {
      maxWidth: 260,
      minWidth: 260
    }
}));

function App() {

  const classes = useStyles();
  const [coffees, setCoffees] = useState([])
  const [successfulDeleteOpen, setSuccessfulDeleteOpen] = useState(false)
  const [failedDeleteOpen, setFailedDeleteOpen] = useState(false)

  const loadCoffees = () => {
    fetch('http://localhost:5000/coffeeJourney', {
      method: 'GET',
    }).then(coffees => coffees.json()).then(coffees => setCoffees(coffees))
  }
  
  const coffeeItems = coffees.map((coffee) => 
    <Grid item><Coffee id={coffee.id} name={coffee.name} company={coffee.company} tags={coffee.tags} price={coffee.price} onSuccessfulDelete={() => {setSuccessfulDeleteOpen(true); setTimeout(() => {setSuccessfulDeleteOpen(false)}, 3000); loadCoffees();}} onFailedDelete={() => {setFailedDeleteOpen(true); setTimeout(() => {setFailedDeleteOpen(false)}, 3000);}}></Coffee></Grid>
  )

  useEffect(() => {loadCoffees()}, []);

  return (
    <Grid container spacing={2}>
      {coffeeItems}
      <Grid item><NewCoffee></NewCoffee></Grid>
      <Dialog
        className={classes.modal}
        open={successfulDeleteOpen}
        onClose={() => setSuccessfulDeleteOpen(false)}
        aria-labelledby="successful-delete-modal-title"        
      >
        <DialogTitle id="successful-delete-modal-title" className={classes.modalTitle}>
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            Coffee successfully deleted!
          </Alert>
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => {setSuccessfulDeleteOpen(false)}}>ok</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        className={classes.modal}
        open={failedDeleteOpen}
        onClose={() => setFailedDeleteOpen(false)}
        aria-labelledby="failed-delete-modal-title"        
      >
        <DialogTitle id="failed-delete-modal-title" className={classes.modalTitle}>
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            Coffee could not be deleted
          </Alert>
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => {setFailedDeleteOpen(false)}}>ok</Button>
        </DialogActions>
      </Dialog>


    </Grid>
  );
}

export default App;
