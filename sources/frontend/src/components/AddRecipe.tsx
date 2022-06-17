import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { useNavigate, Link } from 'react-router-dom';

const Input = styled('input')({
  display: 'none',
});

export const AddRecipe = () => {
  const navigate = useNavigate();

  const [stepField, setStepField] = useState([
    { id: uuidv4(), value: "" },
  ]);

  const removeStepField = (id: any) => {
    const values  = [...stepField];
    values.splice(values.findIndex(value => value.id === id), 1);
    setStepField(values);
  }

  const [ingredientsField, setIngredientsField] = useState([
    { id: uuidv4(), value: "" },
  ]);

  const removeIngredientsField = (id: any) => {
    const values  = [...ingredientsField];
    values.splice(values.findIndex(value => value.id === id), 1);
    setIngredientsField(values);
  }

  const [basicField, setBasicField] = useState([
    { id: uuidv4(), value: "" },
  ]);

  const handleChangeInput = (id: string, event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, field: { id: string; value: string; }[], setter: any) => {
    const newInputFields = field.map(i => {
      if(id === i.id) {
        i.value = event.target.value
      }
      return i;
    })
    
    setter(newInputFields);
  }

  const handleSubmit = () => {
    //e.preventDefault();
    console.log("Submitted");

    // validate

    // send it to the DB

    // await DB response

    // Show user "recipe added"

    // redirect
    navigate('/');
  };

  const elem = (
    <Grid container direction="column">
      <Typography color="text.primary" variant="h2" sx={{mb: 2}}>
        Add new recipe
      </Typography>
      <TextField
        id="name"
        label="Name"
        margin="dense"
      />
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <TextField
            id="time"
            label="Time"
            margin="dense"
            //onChange={event => handleChangeInput("a", event, stepField, setStepField)}
          />
        </Grid>
        
        <Grid item>
          <TextField
            id="servings"
            label="Number of servings"
            margin="dense"
          />
        </Grid>

        <Grid item>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <label htmlFor="contained-button-file">
                <Input accept="image/*" id="contained-button-file" multiple type="file" />
                <Button variant="contained" component="span">
                  Upload photo
                </Button>
              </label>
            </Grid>
            
            <Grid item>
              <Typography color="text.primary">
                uploaded
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      
      <Grid item sx={{mt: 1}}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography color="text.primary">
              Steps:
            </Typography>
            <Grid>
              <Grid>
                {stepField.map(inputField => (
                  <Grid container alignItems="center">
                    <TextField
                      id={inputField.id}
                      margin="dense"
                      value={inputField.value}
                      onChange={event => handleChangeInput(inputField.id, event, stepField, setStepField)}
                      />
                    <IconButton disabled={stepField.length === 1} onClick={() => removeStepField(inputField.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                ))}
              </Grid>
              <IconButton onClick={() => setStepField([...stepField, { id: uuidv4(), value: "" }])}><AddIcon /></IconButton>
            </Grid>
          </Grid>
          
          <Grid item xs={8}>
            <Typography color="text.primary">
              Ingrediences:
            </Typography>
            <Grid>
              <Grid>
                {ingredientsField.map(inputField => (
                  <Grid container alignItems="center">
                    <TextField
                      id={inputField.id}
                      margin="dense"
                      value={inputField.value}
                      onChange={event => handleChangeInput(inputField.id, event, ingredientsField, setIngredientsField)}
                      />
                    <IconButton disabled={ingredientsField.length === 1} onClick={() => removeIngredientsField(inputField.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                ))}
              </Grid>
              <IconButton onClick={() => setIngredientsField([...ingredientsField, { id: uuidv4(), value: "" }])}><AddIcon /></IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item sx={{mt: 2}}>
        <Button variant="contained" onClick={event => handleSubmit()}>
          Save
        </Button>
      </Grid>
    </Grid>
  );

  console.log("ingredients:", ingredientsField);
  console.log("steps:", stepField);
  //console.log(recipeName);

  return elem;
}
