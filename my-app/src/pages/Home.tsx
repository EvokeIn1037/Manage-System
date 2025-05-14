import * as React from 'react';
import type {} from '@mui/x-date-pickers/themeAugmentation';
import type {} from '@mui/x-charts/themeAugmentation';
import type {} from '@mui/x-data-grid-pro/themeAugmentation';
import type {} from '@mui/x-tree-view/themeAugmentation';
import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppNavbar from '../components/PagesComp/AppNavbar';
import Header from '../components/PagesComp/Header';
import MainGrid from '../components/PagesComp/MainGrid';
import SideMenu from '../components/SideMenuComp/SideMenu';
import AppTheme from '../theme/AppTheme';
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from '../theme/customizations';

interface DashboardProps {
  disableCustomTheme?: boolean;
  puburl: string;
  apiurl: string;
  user?: string;
  icon?: string;
  name?: string;
  admin?: boolean;
  report?: boolean;
}

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

export default function Dashboard(props: DashboardProps) {
  const { user, icon, name, admin, report } = props;
  const [selectedMenuItem, setSelectedMenuItem] = React.useState("Home");
  const [todayDate, setTodayDate] = React.useState(new Date(Date.now()));

  React.useEffect(() => {
    setTodayDate(new Date());
    const id = setInterval(() => setTodayDate(new Date()), 30 * 60 * 1000);
    return () => clearInterval(id);
  }, []);
  
  return (
    <AppTheme {...props} themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex' }}>
        <SideMenu selectedMenuItem={selectedMenuItem} setSelectedMenuItem={setSelectedMenuItem} {...props} user={user ? user : ""} icon={icon ? icon : ""} name={name ? name : ""} />
        <AppNavbar selectedMenuItem={selectedMenuItem} setSelectedMenuItem={setSelectedMenuItem} {...props} name={name ? name : ""} icon={icon ? icon : ""} />
        {/* Main content */}
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: 'auto',
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: 'center',
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            <Header selectedMenuItem={selectedMenuItem} />
            <MainGrid {...props} selectedMenuItem={selectedMenuItem} admin={admin ? admin : false} report={report ? report : false} usr={name ? name : ""} todayDate={todayDate} />
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}
