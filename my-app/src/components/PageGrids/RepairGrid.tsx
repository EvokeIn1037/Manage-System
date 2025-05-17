import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ReportTable from '../IssueReportComp/ReportTable';

interface RepairGridProps {
  admin: boolean;
  report: boolean;
  usr: string;
}

export default function RepairGrid({ admin, report, usr }: RepairGridProps) {
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
              👋 Welcome to the repairing task section {usr}!
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
              👋 Welcome to the repairing task section administration {usr}!
          </Typography>
      </Box>
      </>
    );
  }

  return (
    <>
      <ReportTable usr={usr} repairT={true} />
    </>
  );
}