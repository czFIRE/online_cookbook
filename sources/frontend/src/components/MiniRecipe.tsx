import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import data from "./path.json";
import {Link} from "react-router-dom";


export type MiniRecipeProps = {
	name: string,
	rec_id: string,
	timeComplexity: any,
	imageURL: string,
}

export const MiniRecipe = (props: MiniRecipeProps) => {
  return (
		<Paper sx={{ margin: 'auto',
			height: 270,
			width: 200,
			overflow: 'hidden',
			mt: 2,
			}} component={Link} to={'/recipe/' + props.rec_id}>
			<Grid container direction="column" spacing={1}>
				<Grid item>
					<Box component="img"
						sx={{
							height: 200,
							width: 200
						}}
						alt="Food photo."
						src={"http://localhost:3003/" + props.imageURL}
					/>
				</Grid>
				<Grid item>
					<Grid container direction="row">
						<AccessTimeIcon color="inherit" />
						<Typography color="text.primary">
							{`${props.timeComplexity} min`}
						</Typography>
					</Grid>
					<Typography color="text.primary">
						{props.name}
					</Typography>
				</Grid>
			</Grid>
		</Paper>
  );
}
