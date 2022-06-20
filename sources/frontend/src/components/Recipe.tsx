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

export type RecipeProps = {
	name: string,
	portions: number,
	timeComplexity: number,
	description: string,
	category: string,
	ingredients: string[],
	steps: string[],
}

export const Recipe = (props: RecipeProps) => {
	console.log(props.ingredients);
  return (
		<Paper sx={{ margin: 'auto', overflow: 'hidden' }}>
			<Grid container direction="column" spacing={1}>
				<Grid item>
					<Typography color="text.primary" variant="h2" sx={{mt: 1}}>
						{props.name}
					</Typography>
				</Grid>
				<Grid item>
					<Grid container>
						<Grid item>
							<Box component="img"
								sx={{
									height: 200,
									width: 200,
									maxHeight: { xs: 250 },
									maxWidth: { xs: 250 },
								}}
								alt="Photo of pizza."
								src="/pizza.jpg"/>
						</Grid>
							<Grid item sx={{ml: 2}}>
								<Grid container spacing={3}>
									<Grid item>
										<Typography color="text.secondary">
											{`Portions: ${props.portions}`}
										</Typography>
									</Grid>
									<Grid item>
										<Typography color="text.secondary">
											{`Time: ${props.timeComplexity} min`}
										</Typography>
									</Grid>
									<Grid item>
										<Typography color="text.secondary">
											{`Category: `}
										</Typography>
									</Grid>
								</Grid>
								<Grid item>
									<Typography color="text.secondary">
										{props.description}
									</Typography>
								</Grid>
								<Grid item>
									<Typography color="text.primary">
										Ingredients:
									</Typography>
									<Grid>
										{props.ingredients.map((i) => {
											return (
												<Typography color="text.primary">
													{i}
												</Typography>
											)
										})}
									</Grid>
								</Grid>
								<Grid item>
									<Typography color="text.primary">
										Steps:
									</Typography>
									<Grid>
										{props.steps.map((s) => {
											return (
												<Typography color="text.primary">
													{s}
												</Typography>
											)
										})}
									</Grid>
								</Grid>
							</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Paper>
  );
}
