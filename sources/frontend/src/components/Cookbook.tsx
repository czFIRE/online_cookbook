import * as React from 'react';
import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import {Navigator} from './Navigator';
import Content from './Content';
import {Header} from './Header';
import {Recipe} from './Recipe';
import {Welcome} from './Welcome';
import {MiniRecipe} from './MiniRecipe';
import {SearchResult} from './SearchResult';
import {AddRecipe} from './AddRecipe';
import { Register } from './Register';
import { SignIn } from './SignIn';
import {UserInfo} from './UserInfo';
import { useNavigate } from 'react-router-dom';
import { createContext } from 'vm';
import { RecipeProps } from './Recipe';

const Copyright = () => {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}

let theme = createTheme({
  palette: {
    primary: {
      light: '#63ccff',
      main: '#009be5',
      dark: '#006db3',
    },
  },
  typography: {
    h1: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
    h2: {
      fontWeight: 500,
      fontSize: 20,
      letterSpacing: 0.5,
    }
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiTab: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});

theme = {
  ...theme,
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#081627',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
        contained: {
          boxShadow: 'none',
          '&:active': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          marginLeft: theme.spacing(1),
        },
        indicator: {
          height: 3,
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
          backgroundColor: theme.palette.common.white,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          margin: '0 16px',
          minWidth: 0,
          padding: 0,
          [theme.breakpoints.up('md')]: {
            padding: 0,
            minWidth: 0,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: theme.spacing(1),
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 4,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgb(255,255,255,0.15)',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            color: '#4fc3f7',
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: 14,
          fontWeight: theme.typography.fontWeightMedium,
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: 'inherit',
          minWidth: 'auto',
          marginRight: theme.spacing(2),
          '& svg': {
            fontSize: 20,
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 32,
          height: 32,
        },
      },
    },
  },
};

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
      steps: []
  });
  const navigation = useNavigate();
  const newStep = (data, comp) => {
    setRecipes(data)
    setStep(comp);
    console.log(data);
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
