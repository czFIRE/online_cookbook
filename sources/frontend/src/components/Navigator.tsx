import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PermMediaOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActual';
import { Components } from './Cookbook';
import axios from 'axios';

import {Link} from "react-router-dom";
import { RecipeProps } from './Recipe';
import path from './path.json';


const item = {
  py: '2px',
  px: 3,
  color: 'rgba(255, 255, 255, 0.7)',
  '&:hover, &:focus': {
    bgcolor: 'rgba(255, 255, 255, 0.08)',
  },
};

const itemCategory = {
  boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
  py: 1.5,
  px: 3,
};

export type NavigatorProps = {
  PaperProps: { style: {
    width: number;
  }};
  permanent: boolean;
  open?: boolean;
  sx?: {display: {
    sm: string; xs: string;
  }};
  onClose?: () => void;
  changeView: (comp: Components) => void;
  changeViewWithData: (data: any, comp: Components) => void;
}

export const Navigator = (props: NavigatorProps) => {
  const { ...other } = props;

  const variantValue: "permanent" | "temporary" = props.permanent === true ? "permanent" : "temporary";

  const categories = [
    {
      id: 'My recipes',
      children: [
        {
          id: 'Add recipe',
          icon: <PermMediaOutlinedIcon />, linkTo: "/recipe/create",
          comp: Components.AddRecipe
        },
      ],
    }
  ];

  return (
    <Drawer variant={variantValue} {...other}>
      <List disablePadding>
        <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, color: '#fff' }}>
          Cookbook
        </ListItem>
        <ListItem
          sx={{ ...item, ...itemCategory }}
          component={Link}
          to="/"
          onClick={() => props.changeView(Components.Welcome)}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText>Home page</ListItemText>
        </ListItem>
        
        <Box key={'All'} sx={{ bgcolor: '#101F33' }}>
          <ListItem disablePadding key={'All recipes'}
            onClick={async () => {
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
                  steps: p.steps
                };
                return res;
              });

              console.log("res", result);

              let result2 = await Promise.all(result).then((values) => values);
              console.log("finalreisalt", result2);

              props.changeViewWithData(result2, Components.SearchResult);
              }}>
            <ListItemButton sx={item} component={Link} to='/search' >
              <ListItemIcon><PermMediaOutlinedIcon /></ListItemIcon>
              <ListItemText>All recipes</ListItemText>
            </ListItemButton>
          </ListItem>
        </Box>
            
        {categories.map(({ id, children }) => (
          <Box key={id} sx={{ bgcolor: '#101F33' }}>
            <ListItem sx={{ py: 2, px: 3 }}>
              <ListItemText sx={{ color: '#fff' }}>{id}</ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon: icon,
              linkTo: linkTo, comp: component }) => (
              <ListItem disablePadding key={childId}
                onClick={() => {props.changeView(component)}}>
                <ListItemButton sx={item} component={Link} to={linkTo} >
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText>{childId}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}
      </List>
    </Drawer>
  );
}
