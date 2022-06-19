import * as React from 'react';
import Divider from '@mui/material/Divider';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import PermMediaOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActual';
import PublicIcon from '@mui/icons-material/Public';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import TimerIcon from '@mui/icons-material/Timer';
import SettingsIcon from '@mui/icons-material/Settings';
import PhonelinkSetupIcon from '@mui/icons-material/PhonelinkSetup';
import { Components } from './Cookbook';

import {Link} from "react-router-dom";

const categories = [
  {
    id: 'My recipes',
    children: [
      {
        id: 'Authentication',
        icon: <PeopleIcon />,
        linkTo: "/",
        active: true,
      },
      { id: 'Database', icon: <DnsRoundedIcon />, linkTo: "/" },
      {
        id: 'Add recipe',
        icon: <PermMediaOutlinedIcon />, linkTo: "/recipe/create"
      },
    ],
  },
  {
    id: 'Account',
    children: [
      { id: 'My recipes', icon: <SettingsIcon />, linkTo: "/" },
      { id: 'My account', icon: <TimerIcon />, linkTo: "/" },
      { id: 'Log out', icon: <PhonelinkSetupIcon />, linkTo: "/" },
    ],
  },
];

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
}

export const Navigator = (props: NavigatorProps) => {
  const { ...other } = props;

  const variantValue: "permanent" | "temporary" = props.permanent === true ? "permanent" : "temporary";

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
        {categories.map(({ id, children }) => (
          <Box key={id} sx={{ bgcolor: '#101F33' }}>
            <ListItem sx={{ py: 2, px: 3 }}>
              <ListItemText sx={{ color: '#fff' }}>{id}</ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon: icon, active: active,
              linkTo: linkTo }) => (
              <ListItem disablePadding key={childId}
                onClick={() => {props.changeView(Components.Welcome)}}>
                <ListItemButton selected={active} sx={item} component={Link} to={linkTo} >
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
