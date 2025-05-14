import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import ChartUserByCountry from './../ChartsComp/ChartUserByCountry';
import CustomizedTreeView from './../CustomComp/CustomizedTreeView';
import CustomizedDataGrid from './../AnalyticsComp/CustomizedDataGrid';
import PageViewsBarChart from './../ChartsComp/PageViewsBarChart';
import SessionsChart from './../ChartsComp/SessionsChart';
import StatCard, { StatCardProps } from './../CustomComp/StatCard';
import DateSelectionMenu from './../AnalyticsComp/DateSelection';
import { GridRowsProp } from '@mui/x-data-grid';
import Search from './../AnalyticsComp/Search';
import SearchColMenu from './../AnalyticsComp/SearchColMenu';

interface AnalyticsGridProps {
  apiurl: string;
  todayDate: Date;
}

const data: StatCardProps[] = [
  {
    title: 'Users',
    value: '14k',
    interval: 'Last 30 days',
    trend: 'up',
    data: [
      200, 24, 220, 260, 240, 380, 100, 240, 280, 240, 300, 340, 320, 360, 340, 380,
      360, 400, 380, 420, 400, 640, 340, 460, 440, 480, 460, 600, 880, 920,
    ],
  },
  {
    title: 'Conversions',
    value: '325',
    interval: 'Last 30 days',
    trend: 'down',
    data: [
      1640, 1250, 970, 1130, 1050, 900, 720, 1080, 900, 450, 920, 820, 840, 600, 820,
      780, 800, 760, 380, 740, 660, 620, 840, 500, 520, 480, 400, 360, 300, 220,
    ],
  },
  {
    title: 'Event count',
    value: '200k',
    interval: 'Last 30 days',
    trend: 'neutral',
    data: [
      500, 400, 510, 530, 520, 600, 530, 520, 510, 730, 520, 510, 530, 620, 510, 530,
      520, 410, 530, 520, 610, 530, 520, 610, 530, 420, 510, 430, 520, 510,
    ],
  },
];

export default function AnalyticsGrid({ apiurl, todayDate }: AnalyticsGridProps) {
  const [dateTrig, setDateTrig] = React.useState(0);
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [rows, setRows] = React.useState<GridRowsProp>([]);
  const [rowsShown, setRowsShown] = React.useState<GridRowsProp>([]);
  const [searchMode, setSearchMode] = React.useState(0);
  return (
    <>
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',      // vertical centering
        justifyContent: 'space-between',
      }}
    >
      <Typography component="h2" variant="h6">
        Details
      </Typography>
    </Box>
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',      // vertical centering
        justifyContent: 'end',
        mb: 2,                     // bottom margin,
        gap: 1
      }}
    >
      <Grid
        container
        spacing={2}
        columns={12}
        justifyContent="center"   // horizontally center
        alignItems="center"       // vertically center
      >
        <Grid container spacing={1} columns={12} justifyContent="center" alignItems="center">
          <Grid size={{ xs: 5.5, sm: 5.5, lg: 5.5 }}>
            <SearchColMenu setSearchMode={setSearchMode} />
          </Grid>
          <Grid size={{ xs: 6.5, sm: 6.5, lg: 6.5 }}>
            <Search searchMode={searchMode} rows={rows} rowsShown={rowsShown} setRowsShown={setRowsShown} />
          </Grid>
        </Grid>
        <Grid>
          <DateSelectionMenu todayDate={todayDate} dateTrig={dateTrig} setDateTrig={setDateTrig} setStartDate={setStartDate} setEndDate={setEndDate} />
        </Grid>
      </Grid>
    </Box>
    <Grid container spacing={2} columns={12}>
      <Grid size={{ xs: 12, lg: 12 }}>
        <CustomizedDataGrid apiurl={apiurl} dateTrig={dateTrig} startDate={startDate} endDate={endDate} rows={rows} setRows={setRows} rowsShown={rowsShown} setRowsShown={setRowsShown} />
      </Grid>
    </Grid>
    {/* cards */}
    <Typography component="h2" variant="h6" sx={{ mt: 5, mb: 2 }}>
      Overview
    </Typography>
    <Grid
      container
      spacing={2}
      columns={12}
      sx={{ mb: (theme) => theme.spacing(2) }}
    >
      {data.map((card, index) => (
        <Grid key={index} size={{ xs: 12, sm: 6, lg: 4 }}>
          <StatCard {...card} />
        </Grid>
      ))}
      <Grid size={{ xs: 12, md: 6 }}>
        <SessionsChart />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <PageViewsBarChart />
      </Grid>
    </Grid>
    {/* <Grid size={{ xs: 12, lg: 3 }}>
    <Stack gap={2} direction={{ xs: 'column', sm: 'row', lg: 'column' }}>
        <CustomizedTreeView />
        <ChartUserByCountry />
    </Stack>
    </Grid> */}
    <Grid
      container
      spacing={2}
      columns={12}
      sx={{ mb: (theme) => theme.spacing(2) }}
    >
      <Grid size={{ xs: 12, lg: 6 }}>
        <CustomizedTreeView />
      </Grid>
      <Grid size={{ xs: 12, lg: 6 }}>
        <ChartUserByCountry />
      </Grid>
    </Grid>
    </>
  );
}