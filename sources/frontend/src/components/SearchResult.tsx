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
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export type SearchProps = {
	recipe: {
			name: string;
			time: string;
			image: string;
	}[];
}

export type SearchRecipeProps = {
	changeView: any
	recipe: any;
}

export const SearchResult = (props: SearchRecipeProps) => {
  const navigation = useNavigate();
  
  return (
		<Grid container spacing={2}>
			{props.recipe.map((p) => {
			return (
				<Grid item>
					<div onClick={() => {
						navigation('/recipe/' + p.id);
						props.changeView(p);
					}}>
						<MiniRecipe key={p.id} name={p.name} timeComplexity={p.timeComplexity} />
					</div>
				</Grid>)})}
		</Grid>
  );
}
