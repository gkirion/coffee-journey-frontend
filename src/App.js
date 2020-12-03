import logo from './logo.svg';
import './App.css';
import Coffee from './Coffee.js';
import NewCoffee from './NewCoffee.js';
import { Grid } from '@material-ui/core';
import { useState, useEffect } from 'react';


function App() {

  const [coffees, setCoffees] = useState([])

  const loadCoffees = () => {
    fetch('http://localhost:5000/coffeeJourney', {
      method: 'GET',
    }).then(coffees => coffees.json()).then(coffees => setCoffees(coffees))
  }
  
  const coffeeItems = coffees.map((coffee) => 
    <Grid item><Coffee name={coffee.name} company={coffee.company} tags={coffee.tags} price={coffee.price}></Coffee></Grid>
  )

  useEffect(() => {loadCoffees()}, []);

  return (
    <Grid container spacing={2}>
      {coffeeItems}
      <Grid item><NewCoffee></NewCoffee></Grid>
    </Grid>
  );
}

export default App;
