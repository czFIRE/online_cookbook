import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { MiniRecipe } from './MiniRecipe';
import { useNavigate } from 'react-router-dom';

export type UserInfoProps = {
	changeView: () => void;
}

export const UserInfo = (props: UserInfoProps) => {
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
		<Grid>
			<Typography color="text.primary" variant="h2" sx={{mb: 2}}>
        Name of user will be here
      </Typography>

			<Typography color="text.primary">
        Recipes:
      </Typography>

			<Grid container spacing={2}>
				{mockResults.map((p) => {
				return (
					<Grid item>
						<div onClick={() => {
								navigation(p.url);
								props.changeView();
							}}>
							
						</div>
					</Grid>)})}
			</Grid>
		</Grid>
  );
}
