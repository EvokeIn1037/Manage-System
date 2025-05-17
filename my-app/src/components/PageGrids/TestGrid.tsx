import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ReportTable from '../IssueReportComp/ReportTable';

interface TestGridProps {
  admin: boolean;
  report: boolean;
  usr: string;
}

export default function TestGrid({ admin, report, usr }: TestGridProps) {
  if (admin != true && report != true){
    return (
      <>
      <Box
          sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "75vh",  // Adjusts to center in viewport
          }}
      >
          <Typography component="h2" variant="h4" sx={{ my: 4 }}>
              👋 Welcome to the testing task section {usr}!
          </Typography>
      </Box>
      </>
    );
  }

  if (admin) {
    return (
      <>
      <Box
          sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "75vh",  // Adjusts to center in viewport
          }}
      >
          <Typography component="h2" variant="h4" sx={{ my: 4 }}>
              👋 Welcome to the testing task section administration {usr}!
          </Typography>
      </Box>
      </>
    );
  }

  return (
    <>
      <ReportTable usr={usr} testT={true} />
    </>
  );
}