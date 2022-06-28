import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import data from "./path.json";
import { List, ListItem } from '@mui/material';
import axios from 'axios';

export type RecipeProps = {
	name: string,
	id: string,
	portions: number,
	timeComplexity: number,
	description: string,
	category: string,
	ingredients: string[],
	steps: string[],
	imageURL: string,
}

export const getImages = async (id: string) => {
	const ret = `//localhost:3003/recipe/${id}/image`;
	return await axios.get(ret).then(x => {
		let tmp = x.data.data.Image[0].base64;

		return tmp;
	});
}

export const Recipe = (props: RecipeProps) => {
	return (
		<Paper sx={{ margin: 'auto', overflow: 'hidden' }} >
			<Grid container direction="column" spacing={1}>
				<Grid item>
					<Typography color="text.primary" variant="h2" sx={{ mt: 1 }} onChange={async () => {
					}}>
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

								alt="Food photo."
								src={"http://localhost:3003/" + props.imageURL}
							/>
						</Grid>
						<Grid item sx={{ ml: 2 }}>
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
										{`Category: ${props.category}`}
									</Typography>
								</Grid>
							</Grid>

							<Grid item>
								<Typography color="text.primary">
									Ingredients:
								</Typography>

								<Grid>
									<List sx={{ listStyleType: 'decimal' }}>
										{props.ingredients[0].split("\n").map((i) => {
											return (
												<ListItem sx={{ display: 'list-item', ml: 2 }}>
													{i}
												</ListItem>
											)
										})}
									</List>

								</Grid>
							</Grid>
							<Grid item>
								<Typography color="text.primary">
									Steps:
								</Typography>
								<Grid>
									<List sx={{ listStyleType: 'decimal' }}>
										{props.steps[0].split("\n").map((i) => {
											return (
												<ListItem sx={{ display: 'list-item', ml: 2 }}>
													{i}
												</ListItem>
											)
										})}
									</List>
								</Grid>
							</Grid>

							<Grid item>
								<Typography color="text.primary">
									Description:
								</Typography>
								<Typography color="text.secondary">
									<br />
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {props.description}
								</Typography>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Paper>
	);
}
