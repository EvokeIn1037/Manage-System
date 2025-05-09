import * as React from 'react';
import Box from '@mui/material/Box';
// import Stack from '@mui/material/Stack';
import AnalyticsGrid from './AnalyticsGrid';
import Typography from '@mui/material/Typography';
import Copyright from '../internals/components/Copyright';

interface MainGridProps {
  apiurl: string;
  selectedMenuItem: string;
  admin: boolean;
  todayDate: Date;
}

export default function MainGrid({ apiurl, selectedMenuItem, admin, todayDate }: MainGridProps) {
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1980px' } }}>
      {selectedMenuItem === "Home" && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "50vh",  // Adjusts to center in viewport
          }}
        >
          <Typography component="h2" variant="h4" sx={{ my: 4 }}>
            👋 Welcome to the Bettabot Data Dashboard!
          </Typography>
        </Box>
      )}
      {selectedMenuItem === "Analytics" && (
        <AnalyticsGrid apiurl={apiurl} todayDate={todayDate} />
      )}
      {selectedMenuItem === "Tasks" && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "50vh",  // Adjusts to center in viewport
          }}
        >
        <Typography component="h2" variant="h4" sx={{ my: 4 }}>
        👋 Welcome to the task section{admin ? ", administrator" : ""}!
        </Typography>
      </Box>
      )}
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}
