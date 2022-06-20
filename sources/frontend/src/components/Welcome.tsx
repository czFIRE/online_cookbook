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
import { MiniRecipe } from './MiniRecipe';
import { useNavigate } from 'react-router-dom';

export type WelcomeProps = {
	changeView: () => void;
	recipe: any;
}

export const Welcome = (props: WelcomeProps) => {
	const mockResult = {
		"url": "/recipe/111",
		"name": "Pizza",
		"time": "60 minut",
		"image": "/pizza.jpg"
	}
	const mockResults = [
    mockResult, mockResult, mockResult, mockResult
  	]
	  const navigation = useNavigate();
  	return (
		<Grid sx={{ margin: 'auto', overflow: 'hidden' }}>
			<Typography color="text.primary" variant="h2" align='center'>
				Welcome to cookbook!
			</Typography>
			<Typography color="text.primary" align='center'>
				Try our the best recipes!
			</Typography>
			<Grid container spacing={2}>
				{mockResults.map((p) => {
				return (
					<Grid item>
						<div onClick={() => {
							navigation(p.url);
							props.changeView();
						}}>
							<MiniRecipe name={p.name} timeComplexity={p.time}/>
						</div>
					</Grid>
				)})}
			</Grid>
		</Grid>
  );
}