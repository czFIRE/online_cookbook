import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Input = styled('input')({
  display: 'none',
});

export const AddRecipe = () => {
  const [stepCount, setStepCount] = useState(1);

  const [stepFields, setStepFields] = useState([
    { id: uuidv4(), step: "" },
  ]);

  const removeStepFields = (id: any) => {
    const values  = [...stepFields];
    console.log(id);
    values.splice(values.findIndex(value => value.id === id), 1);
    setStepFields(values);
  }

  const [ingrediceFields, setIngrediceFields] = useState([
    { id: uuidv4(), ingredice: "" },
  ]);

  const removeIngrediceFields = (id: any) => {
    const values  = [...ingrediceFields];
    console.log(id);
    values.splice(values.findIndex(value => value.id === id), 1);
    setIngrediceFields(values);
  }

  return (
    <Grid container direction="column">
      <Typography color="text.primary" variant="h2" sx={{mb: 2}}>
        Add new recipe
      </Typography>
      <TextField
        id="standard-basic"
        label="Name"
        margin="dense"
      />
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <TextField
            id="filled-basic"
            label="Time"
            margin="dense"
          />
        </Grid>
        
        <Grid item>
          <TextField
            id="standard-basic"
            label="Count of serving"
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
      
      <Grid item>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography color="text.primary">
              Steps:
            </Typography>
            <Grid>
              <Grid>
                {stepFields.map(inputField => (
                  <Grid container alignItems="center">
                    <TextField
                      id="standard-basic"
                      margin="dense"/>
                    <IconButton disabled={stepFields.length === 1} onClick={() => removeStepFields(inputField.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                ))}
              </Grid>
              <IconButton onClick={() => setStepFields([...stepFields, { id: uuidv4(), step: "" }])}><AddIcon /></IconButton>
            </Grid>
          </Grid>
          
          <Grid item xs={8}>
            <Typography color="text.primary">
              Ingrediences:
            </Typography>
            <Grid>
              <Grid>
                {ingrediceFields.map(inputField => (
                  <Grid container alignItems="center">
                    <TextField
                      id="standard-basic"
                      margin="dense"/>
                    <IconButton disabled={ingrediceFields.length === 1} onClick={() => removeIngrediceFields(inputField.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                ))}
              </Grid>
              <IconButton onClick={() => setIngrediceFields([...ingrediceFields, { id: uuidv4(), ingredice: "" }])}><AddIcon /></IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
