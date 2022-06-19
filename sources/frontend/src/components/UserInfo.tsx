import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { MiniRecipe } from './MiniRecipe';

export const UserInfo = () => {
	const mockResult = {
		"name": "Pizza",
		"time": "60 minut",
		"image": "/pizza.jpg"
	}
	const mockResults = [
    mockResult, mockResult, mockResult, mockResult
  	]
  return (
		<Grid>
			<Typography color="text.primary" variant="h2" sx={{mb: 2}}>
        Name of user will be here
      </Typography>

			<Typography color="text.primary">
        Recipes:
      </Typography>

			<Grid container>
				{mockResults.map((p) => <MiniRecipe />)}
			</Grid>
		</Grid>
  );
}
