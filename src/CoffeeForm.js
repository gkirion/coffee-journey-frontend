import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Rating from '@material-ui/lab/Rating';
import './Coffee.css';
import { Button, ButtonBase, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import _uniqueId from 'lodash/uniqueId';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 300,
    width: '100%',
  },
  image: {
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '4px solid currentColor',
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
  input: {
    display: 'none',
  },
  fields: {
    maxWidth: 392
  }
}));


function CoffeeForm(props) {
  const classes = useStyles();

  const [name, setName] = useState(props.name != undefined ? props.name : "");
  const [company, setCompany] = useState(props.company != undefined ? props.company : "");
  const [rating, setRating] = useState(props.rating != undefined ? props.rating : 4.5)
  const [tags, setTags] = useState(props.tags != undefined ? props.tags : "");
  const [price, setPrice] = useState(props.price != undefined ? props.price : "");
  const [image, setImage] = useState(props.image != undefined ? {url: props.image} : {url: "scenery.jpg"});
  const [id] = useState(_uniqueId('contained-button-file-'));

  const handleName = (event) => {
    setName(event.target.value);
  }

  const handleCompany = (event) => {
    setCompany(event.target.value);
  }

  const handleTags = (event) => {
    setTags(event.target.value);
  }

  const handlePrice = (event) => {
    setPrice(event.target.value);
  }

  const handleRating = (event) => {
    setRating(event.target.value);
  }

  const handleImage = (event) => {
    setImage({url: URL.createObjectURL(event.target.files[0]), file: event.target.files[0]});
    console.log(`image url: ${URL.createObjectURL(event.target.files[0])}`);
  }

  const submitCoffee = async () => {
    try {
      const formData = new FormData();
      formData.append('image', image.file);
      formData.append('name', name);
      formData.append('company', company);
      formData.append('rating', rating);
      formData.append('tags', tags);
      formData.append('price', price);

      await fetch('http://localhost:5000/coffeeJourney', {
        method: 'POST',
        body: formData
      }).then((response) => {
        if (response.status == 200) {
          props.onSuccessfulSubmit();
        } else {
          props.onFailedSubmit();
        }
      });
    } catch (e) {
      console.log(e);
      props.onFailedSubmit();
    }
  }

  const updateCoffee = async (coffeeId) => {
    try {
      const formData = new FormData();
      formData.append('image', image.file);
      formData.append('name', name);
      formData.append('company', company);
      formData.append('rating', rating);
      formData.append('tags', tags);
      formData.append('price', price);

      await fetch('http://localhost:5000/coffeeJourney/' + coffeeId, {
        method: 'PUT',
        body: formData
      }).then((response) => {
        if (response.status == 200) {
          props.onSuccessfulSubmit();
        } else {
          props.onFailedSubmit();
        }
      });
    } catch (e) {
      console.log(e);
      props.onFailedSubmit();
    }
  }

  const handleSubmit = () => {
    if (props.id != undefined) {
      updateCoffee(props.id)
    } else {
      submitCoffee()
    }
    resetForm()
  }

  const resetForm = () => {
    setName("");
    setCompany("");
    setTags("");
    setPrice("");
    setImage({url: "scenery.jpg"});
    if (props.onReset != undefined) {
      props.onReset()
    }
  }

  return (
    <form noValidate autoComplete="off">
      <Grid container spacing={2}>
        <Grid item>
          <div className={classes.root}>
            <input id={id} className={classes.input} type="file" accept="image/*" onChange={handleImage} />
            <label htmlFor={id}>
              <ButtonBase component="span"
              focusRipple
              key="scenery"
              type="file"
              className={classes.image}
              focusVisibleClassName={classes.focusVisible}
              style={{
                width: 256,
              }}
            >
              <span
                className={classes.imageSrc}
                style={{
                  backgroundImage: 'url("'+image.url+'")',
                }}
              />
              <span className={classes.imageBackdrop} />
              <span className={classes.imageButton}>
                <Typography
                  component="span"
                  variant="subtitle1"
                  color="inherit"
                  className={classes.imageTitle}>
                  Upload Image
                  <span className={classes.imageMarked} />
                </Typography>
              </span>
              </ButtonBase>
              </label>
          </div>
        </Grid>
        <Grid item xs={12} sm container direction="column" spacing={2} className={classes.fields}>
          <Grid item xs sm container spacing={2}>
            <Grid item xs={6}><TextField label="Name" name="name" value={name} onChange={handleName}></TextField></Grid>
            <Grid item xs={6}><TextField label="Price" type="number" InputProps={{inputProps : {min: 0, step: 0.1}}} name="price" value={price} onChange={handlePrice}></TextField></Grid>
            <Grid item xs={6}><TextField label="Company" name="company" value={company} onChange={handleCompany}></TextField></Grid>
            <Grid item xs={6} container alignItems="flex-end">
              <Rating label="Rating" name="rating" precision={0.5} value={rating} onChange={handleRating}></Rating>
            </Grid>
            <Grid item xs={12}><TextField fullWidth={true} label="Tags" multiline name="tags" value={tags} onChange={handleTags}></TextField></Grid>
          </Grid>
          <Grid item container spacing={2}><Grid item xs><Button variant="contained" color="primary" onClick={handleSubmit}>{props.id == undefined && 'Add Coffee'}{props.id != undefined && 'Update Coffee'}</Button></Grid><Grid item xs><Button variant="contained" onClick={resetForm}>Cancel</Button></Grid></Grid>
        </Grid>
      </Grid>
    </form>
  );

}

export default CoffeeForm;