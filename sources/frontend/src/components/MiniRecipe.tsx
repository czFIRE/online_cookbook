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

export type MiniRecipeProps = {
	name: string;
	img: string;
	time: string;
}

export const MiniRecipe = () => {
  return (
		<Paper sx={{ margin: 'auto',
			height: 270,
			width: 200,
			overflow: 'hidden',
			mt: 2 }}>
			<Grid container direction="column" spacing={1}>
				<Grid item>
					<Box component="img"
						sx={{
							height: 200,
							width: 200
						}}
						alt="Photo of pizza."
						src="/pizza.jpg"/>
				</Grid>
				<Grid item>
					<Grid container direction="row">
						<AccessTimeIcon color="inherit" />
						<Typography color="text.primary" variant="h2">
							60 min
						</Typography>
					</Grid>
					<Typography color="text.primary" variant="h2">
						Pizza
					</Typography>
				</Grid>
			</Grid>
		</Paper>
  );
}
