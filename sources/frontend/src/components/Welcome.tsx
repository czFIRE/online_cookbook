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
			<Button variant="outlined" startIcon={<FastfoodIcon />} onClick={async () => {
				navigation('/search');
				props.changeView();
				let res = await axios.get(path.path.recipes).then(x => x);

              
				if (res.statusText != "OK") {
					console.log("Error here:", res);
					return;
				}

				let result: Promise<RecipeProps>[] = res.data.data.map(async (p, index) => {
					console.log("p", p, index);
					let resCategory = await axios.get(path.path.category + p.categoryId + "/name")
					.then(x => x);
					console.log("pp", resCategory, index)

					let images = await getImages(p.id);
					console.log("AAAAA", images);

					if (resCategory.statusText != "OK") {
						console.log("Error here:", resCategory);
						return;
					}
					console.log("ppp", resCategory.data.data);
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

				console.log("res", result);

				let result2 = await Promise.all(result).then((values) => values);
				console.log("finalreisalt", result2);

				props.changeViewWithData(result2, Components.SearchResult);
			}}>
				Show recipes
			</Button>			
		</Grid>
  );
}
