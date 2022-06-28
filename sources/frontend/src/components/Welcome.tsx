import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import axios from 'axios';
import { getImages, RecipeProps } from './Recipe';
import { Components } from './Cookbook';
import path from './path.json';

export type WelcomeProps = {
	changeView: () => void;
	recipe: any;
	changeViewWithData: (data: any, comp: Components) => void;
}

export const showMiniImages = async (navigation, props) => {
	navigation('/search');
	props.changeView();
	let res = await axios.get(path.path.recipes).then(x => x);

  
	if (res.statusText != "OK") {
		return;
	}

	let result: Promise<RecipeProps>[] = res.data.data.map(async (p, index) => {
		let resCategory = await axios.get(path.path.category + p.categoryId + "/name")
		.then(x => x);

		let images = await getImages(p.id);

		if (resCategory.statusText != "OK") {
			return;
		}
		const res = {
			name: p.name,
			id: p.id,
			portions: p.portions,
			timeComplexity: p.timeComplexity,
			description: p.description,
			category: resCategory.data.data,
			ingredients: p.ingredients,
			steps: p.steps,
			imageURL: images
		};
		return res;
	});



	let result2 = await Promise.all(result).then((values) => values);


	props.changeViewWithData(result2, Components.SearchResult);
}

export const Welcome = (props: WelcomeProps) => {
	const navigation = useNavigate();
  	return (
		<Grid sx={{ margin: 'auto'}}
			container
			alignContent="center"
			direction="column"
			justifyContent="center"
			spacing={2}>
			<Typography color="text.primary" variant="h2" align='center'>
				Welcome to cookbook!
			</Typography>
			<Typography color="text.primary" align='center'>
				Try our the best recipes!
			</Typography>
			<Button variant="outlined" startIcon={<FastfoodIcon />} onClick={async () => await showMiniImages(navigation, props)}>
				Show recipes
			</Button>			
		</Grid>
  );
}
