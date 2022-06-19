import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export const SignIn = () => {
  return (
		<Grid>
			<Typography color="text.primary" variant="h2" sx={{mb: 2}}>
        Sign In
      </Typography>
			<Grid container direction="column">
				<Grid item>
					<TextField
						label="Name"
						margin="dense"
					/>
				</Grid>
				
				<Grid item>
					<TextField
						label="Password"
						margin="dense"
					/>
				</Grid>
				
				<Grid item>
					<Button variant="contained" sx={{mt: 2}}>
						Sign In
					</Button>
				</Grid>
			</Grid>
		</Grid>
  );
}
