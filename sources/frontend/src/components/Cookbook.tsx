import * as React from 'react';
import { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import {Navigator} from './Navigator';
import {Header} from './Header';
import {Recipe} from './Recipe';
import {Welcome} from './Welcome';
import {SearchResult} from './SearchResult';
import {AddRecipe} from './AddRecipe';
import { SignIn } from './SignIn';
import {UserInfo} from './UserInfo';
import { useNavigate } from 'react-router-dom';
import { RecipeProps } from './Recipe';

import { theme } from '../models/MuiTheme';

const Copyright = () => {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://is.muni.cz/">
        Your PB138 team - Petr, Vojta, Lucka
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}

const drawerWidth = 256;

export enum Components {
  Welcome,
  AddRecipe,
  ShowRecipe,
  SearchResult,
  UserInfo,
  SignIn
}

export type CookbookProps = {
  centralComponent: Components
}


export const Cookbook = (props: CookbookProps) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [step, setStep] = useState<Components>(props.centralComponent);
  const [recipes, setRecipes] = useState<RecipeProps[]>([]);
  const [recipe, setRecipe] = useState<RecipeProps>(
    {
      name: "",
      id: "",
      portions: 0,
      timeComplexity: 0,
      description: "",
      category: "",
      ingredients: [],
      steps: [],
      imageURL: "",
  });
  const navigation = useNavigate();
  const newStep = (data, comp) => {
    setRecipes(data)
    setStep(comp);

  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <CssBaseline />
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          {isSmUp ? null : (
            <Navigator
              PaperProps={{ style: { width: drawerWidth } }}
              permanent={false}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              changeView={(comp: Components) => setStep(comp)}
              changeViewWithData={(data, comp) => newStep(data, comp)}
            />
          )}
          <Navigator
            PaperProps={{ style: { width: drawerWidth } }}
            permanent={true}
            sx={{ display: { sm: 'block', xs: 'none' } }}
            changeView={(comp: Components) => setStep(comp)}
            changeViewWithData={(data, comp) => newStep(data, comp)}
          />
        </Box>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Header onDrawerToggle={handleDrawerToggle} changeView={() => {
            navigation('/search');
            setStep(Components.SearchResult);
          }} />
          <Box component="main" sx={{ flex: 1, py: 6, px: 4, bgcolor: '#eaeff1' }}>
            {step == Components.Welcome
                && (
                <Welcome changeView={() => setStep(Components.SearchResult)}
                recipe={recipe}
                changeViewWithData={(data, comp) => newStep(data, comp)}/>        
            )}
            {step == Components.AddRecipe
                && (
                <AddRecipe/>        
            )}
            {step == Components.ShowRecipe
                && (
                <Recipe {...recipe}/>        
            )}
            {step == Components.SearchResult
                && (
                <SearchResult
                  changeView={(r) => {setStep(Components.ShowRecipe);
                    setRecipe(r);
                  }}
                  recipe={recipes}
                  />        
            )}
            {step == Components.UserInfo
                && (
                <UserInfo changeView={() => setStep(Components.ShowRecipe)}/>        
            )}
            {step == Components.SignIn
                && (
                <SignIn/>        
            )}
          </Box>
          <Box component="footer" sx={{ p: 2, bgcolor: '#eaeff1' }}>
            <Copyright />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
