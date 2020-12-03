import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Coffee from './Coffee.js';
import CoffeeForm from './CoffeeForm.js';
import NewCoffee from './NewCoffee.js'
import reportWebVitals from './reportWebVitals';
import { Grid } from '@material-ui/core';
import App from './App.js';

const name = 'baby';

const greeting = <h1>hello {name}!</h1>;

const newCoffee = <Grid item><NewCoffee></NewCoffee></Grid>

const coffeeItem = <Grid item><Coffee name="Brasil Blue Estate" company="Taf" tags="medium acidity, chocolate flavour, strong body" price="9.60" onSubmit={() => {console.log('ouououo')}}></Coffee></Grid>

ReactDOM.render(
  <App></App>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
