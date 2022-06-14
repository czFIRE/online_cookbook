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

export const MiniRecipe = () => {
  return (
		<Paper sx={{ margin: 'auto', overflow: 'hidden' }}>
			<Grid container direction="column" spacing={1}>
				<Grid item>
					<Box component="img"
						sx={{
							height: 200,
							width: 200,
							maxHeight: { xs: 200, md: 167 },
							maxWidth: { xs: 200, md: 250 },
						}}
						alt="Photo of pizza."
						src="/pizza.jpg"/>
				</Grid>
				<Grid item>
					<Typography color="text.primary" variant="h2">
						Pizza
					</Typography>
				</Grid>
			</Grid>
		</Paper>
  );
}
