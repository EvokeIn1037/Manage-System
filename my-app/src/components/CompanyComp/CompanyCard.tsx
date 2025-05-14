import * as React from 'react';
import Grid from '@mui/material/Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import MuiAvatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import BettaIcon from './../../assets/betta.ico'

const Avatar = styled(MuiAvatar)(({ theme }) => ({
  width: 28,
  height: 28,
  backgroundColor: (theme.vars || theme).palette.background.paper,
  color: (theme.vars || theme).palette.text.secondary,
  border: `1px solid ${(theme.vars || theme).palette.divider}`,
}));

export default function CompanyCard () {
    return (
        <>
            <Card variant="outlined" sx={{ width: '100%', height: '6vh' }}>
                <CardContent
                    sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: '100%',
                    px: 0,    // remove horizontal padding if you need tighter centering
                    }}
                >
                    <Grid
                        container
                        spacing={2}
                        columns={12}
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Grid size={{ xs: 6, lg: 6 }}>
                            <Avatar alt="Bettabot web" src={BettaIcon}></Avatar>
                        </Grid>
                        <Grid size={{ xs: 6, lg: 6 }}>
                            <Typography component="h4" variant="h6" align="center">
                                Betta
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </>
    );
}