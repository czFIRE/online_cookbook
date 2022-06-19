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
import {MiniRecipe} from './MiniRecipe';

export type RecipesProps = {
	recipe: {
			name: string;
			time: string;
			image: string;
	}[];
}

export const SearchResult = () => {
	const mockResult = {
		"name": "Pizza",
		"time": "60 minut",
		"image": "/pizza.jpg"
	}
	const mockResults = [
    mockResult, mockResult, mockResult, mockResult, mockResult
  ]
  return (
		<Grid container spacing={2}>
			{mockResults.map((p) => <MiniRecipe />)}
		</Grid>
  );
}
