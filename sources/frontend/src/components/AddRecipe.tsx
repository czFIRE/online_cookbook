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
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Input = styled('input')({
  display: 'none',
});

export const AddRecipe = () => {
  const [stepCount, setStepCount] = useState(1);

  const [inputFields, setInputFields] = useState([
    { id: uuidv4(), step: "" },
  ]);

  return (
    <Grid container direction="column">
      <Typography color="text.primary" variant="h2">
        Add new recipe
      </Typography>
      <TextField
        id="standard-basic"
        label="Name"
        margin="dense"
      />
      <TextField
        id="filled-basic"
        label="Time"
        margin="dense"
      />
      <TextField
        id="standard-basic"
        label="Count of serving"
        margin="dense"
      />
      <Typography color="text.primary">
        Insert Photo
      </Typography>
      <label htmlFor="contained-button-file">
        <Input accept="image/*" id="contained-button-file" multiple type="file" />
        <Button variant="contained" component="span">
          Upload
        </Button>
      </label>
      <Typography color="text.primary">
        uploaded
      </Typography>
      <Typography color="text.primary">
        Steps:
      </Typography>
      <Grid>
        <Grid>
          {inputFields.map(inputField => (
            <Grid>
              <TextField id="standard-basic" value={inputField.step}/>
            </Grid>
          ))}
        </Grid>
        <IconButton onClick={() => setInputFields([...inputFields, { id: uuidv4(), step: "" }])}><AddIcon /></IconButton>
      </Grid>
      <Typography color="text.primary">
        Ingrediences:
      </Typography>
    </Grid>
  );
}
