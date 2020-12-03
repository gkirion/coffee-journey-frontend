import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import { useState } from 'react';
import CoffeeForm from './CoffeeForm.js'

function NewCoffee(props) {

  const [isEdit, setIsEdit] = useState(false);

  if (isEdit) {
    return <CoffeeForm onReset={() => {setIsEdit(false)}}></CoffeeForm>
  } else {
    return (
      <Button variant="contained" color="primary" onClick={() => {setIsEdit(true)}}>New Coffee</Button>
    );
  }

}

export default NewCoffee;