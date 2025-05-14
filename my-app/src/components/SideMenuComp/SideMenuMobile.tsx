import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer, { drawerClasses } from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
// import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
// import MenuButton from './../CustomComp/MenuButton';
import MenuContent from './MenuContent';
import { useNavigate } from 'react-router-dom';

interface SideMenuMobileProps {
  open: boolean | undefined;
  toggleDrawer: (newOpen: boolean) => () => void;
  selectedMenuItem: string;
  setSelectedMenuItem: (item: string) => void;
  puburl: string;
  name: string;
  icon: string;
}

export default function SideMenuMobile({ open, toggleDrawer, selectedMenuItem, setSelectedMenuItem, puburl, name, icon }: SideMenuMobileProps) {
  const navigate = useNavigate();
  
  const jumpLogout = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    navigate("/signin");
  };

  const icoUrl = icon ? `${puburl}${icon}` : "";
  
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={toggleDrawer(false)}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        [`& .${drawerClasses.paper}`]: {
          backgroundImage: 'none',
          backgroundColor: 'background.paper',
        },
      }}
    >
      <Stack
        sx={{
          maxWidth: '70dvw',
          height: '100%',
        }}
      >
        <Stack direction="row" sx={{ p: 2, pb: 0, gap: 1 }}>
          <Stack
            direction="row"
            sx={{ gap: 1, alignItems: 'center', flexGrow: 1, p: 1 }}
          >
            <Avatar
              sizes="small"
              alt="User"
              src={icoUrl}
              sx={{ width: 24, height: 24 }}
            />
            <Typography component="p" variant="h6">
              { name }
            </Typography>
          </Stack>
          {/* <MenuButton showBadge>
            <NotificationsRoundedIcon />
          </MenuButton> */}
        </Stack>
        <Divider />
        <Stack sx={{ flexGrow: 1 }}>
          <MenuContent selectedMenuItem={selectedMenuItem} setSelectedMenuItem={setSelectedMenuItem} />
          <Divider />
        </Stack>
        <Stack sx={{ p: 2 }}>
          <Button variant="outlined" fullWidth startIcon={<LogoutRoundedIcon />} onClick={jumpLogout}>
            Logout
          </Button>
        </Stack>
      </Stack>
    </Drawer>
  );
}
