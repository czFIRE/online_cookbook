import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import { styled } from '@mui/material/styles';

const Input = styled('input')({
  display: 'none',
});

export const AddRecipe = () => {
  return (
    <Grid container direction="column">
      <Typography color="text.primary" variant="h2">
        Add new recipe
      </Typography>
      <TextField
        id="outlined-name"
        label="Name"
        margin="dense"
      />
      <TextField
        id="outlined-name"
        label="Time"
        margin="dense"
      />
      <TextField
        id="outlined-name"
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
      <Typography color="text.primary">
        Ingrediences:
      </Typography>
    </Grid>
  );
}
