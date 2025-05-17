import * as React from 'react';
import Box from '@mui/material/Box';
import AnalyticsGrid from './../PageGrids/AnalyticsGrid';
import HomeGrid from './../PageGrids/HomeGrid';
import TestGrid from './../PageGrids/TestGrid';
import RepairGrid from '../PageGrids/RepairGrid';
import Copyright from './../CompanyComp/Copyright';

interface MainGridProps {
  apiurl: string;
  selectedMenuItem: string;
  admin: boolean;
  report: boolean;
  usr: string;
  todayDate: Date;
}

export default function MainGrid({ apiurl, selectedMenuItem, admin, report, usr, todayDate }: MainGridProps) {
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1980px' } }}>
      {selectedMenuItem === "Home" && (
        <HomeGrid todayDate={todayDate} />
      )}
      {selectedMenuItem === "Analytics" && (
        <AnalyticsGrid apiurl={apiurl} todayDate={todayDate} />
      )}
      {selectedMenuItem === "Test Tasks" && (
        <TestGrid admin={admin} report={report} usr={usr} />
      )}
      {selectedMenuItem === "Repair Tasks" && (
        <RepairGrid admin={admin} report={report} usr={usr} />
      )}
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}
