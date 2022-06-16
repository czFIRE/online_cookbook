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
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export const Register = () => {
  return (
		<Grid>
			<Typography color="text.primary" variant="h2">
        Register
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
					<TextField
						label="Password again"
						margin="dense"
					/>
				</Grid>

				<Grid item>
					<Button variant="contained">
						Register
					</Button>
				</Grid>
			</Grid>
		</Grid>
  );
}
