import Grid from '@mui/material/Grid';
import { MiniRecipe } from './MiniRecipe';
import { useNavigate } from 'react-router-dom';

export type SearchProps = {
	recipe: {
			name: string,
			time: string,
			image: string,
			imageURL: string,
	}[];
}

export type SearchRecipeProps = {
	changeView: any
	recipe: any;
}

export const SearchResult = (props: SearchRecipeProps) => {
  const navigation = useNavigate();
  
  return (
		<Grid container spacing={2} >
			{props.recipe.map((p) => {
			return (
				<Grid item>
					<div onClick={() => {
						navigation('/recipe/' + p.id);
						props.changeView(p);
					}}>
						<MiniRecipe key={p.id} rec_id={p.id} name={p.name} timeComplexity={p.timeComplexity} imageURL={p.imageURL} />
					</div>
				</Grid>)})}
		</Grid>
  );
}
