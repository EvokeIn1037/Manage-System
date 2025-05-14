import * as React from 'react';
import Box from '@mui/material/Box';
import { Stack } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

interface HomeGridProps {
  todayDate: Date;
}

function getMonthChar(month: number) {
    let monthstr = "";
    switch(month) {
        case 1:
            monthstr = "Jan";
            break;
        case 2:
            monthstr = "Feb";
            break;
        case 3:
            monthstr = "Mar";
            break;
        case 4:
            monthstr = "Apr";
            break;
        case 5:
            monthstr = "May";
            break;
        case 6:
            monthstr = "Jun";
            break;
        case 7:
            monthstr = "Jul";
            break;
        case 8:
            monthstr = "Aug";
            break;
        case 9:
            monthstr = "Sep";
            break;
        case 10:
            monthstr = "Oct";
            break;
        case 11:
            monthstr = "Nov";
            break;
        case 12:
            monthstr = "Dec";
            break;
    }
    return monthstr;
}

function splitDateToStrings(date: Date) {
  const year  = date.getFullYear().toString();                          // e.g. "2025"
//   const month = String(date.getMonth() + 1).padStart(2, '0');           // getMonth() is 0-based → "04"
//   const day   = String(date.getDate()).padStart(2, '0');        // "09"
  const month = getMonthChar(date.getMonth() + 1);
  const day   = String(date.getDate());
  return { year, month, day };
}

export default function HomeGrid({ todayDate }: HomeGridProps) {
  const { year, month, day } = splitDateToStrings(todayDate);

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
        <Stack>
            <Typography component="h2" variant="h4" sx={{ my: 4 }}>
                👋 Welcome to the Bettabot Data Dashboard!
            </Typography>
            <Grid
                container
                spacing={2}
                columns={12}
                sx={{ mb: (theme) => theme.spacing(2) }}
            >
                <Grid size={{ xs: 12, lg: 6 }}>
                    <Card variant="outlined" sx={{ width: '100%' }}>
                        <CardContent>
                            <Stack>
                                <CalendarTodayIcon />
                                <Grid
                                    container
                                    spacing={2}
                                    columns={12}
                                    sx={{ mb: (theme) => theme.spacing(2) }}
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <Grid size={{ xs: 6, lg: 6 }}>
                                        <Typography component="h3" variant="h5" sx={{ my: 4 }} align="center">
                                            {year}
                                        </Typography>
                                    </Grid>
                                    <Grid size={{ xs: 3, lg: 3 }}>
                                        <Typography component="h4" variant="h6" sx={{ my: 4 }} align="center">
                                            {month}
                                        </Typography>
                                    </Grid>
                                    <Grid size={{ xs: 3, lg: 3 }}>
                                        <Typography component="h4" variant="h6" sx={{ my: 4 }} align="center">
                                            {day}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid size={{ xs: 12, lg: 6 }}>
                    <Card variant="outlined" sx={{ width: '100%' }}>
                        <CardContent>
                            
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Stack>
    </Box>
    </>
  );
}