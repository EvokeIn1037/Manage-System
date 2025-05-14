import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import BettaIco from './../../assets/betta.ico'

export function BettabotIcon() {
  return (
    <Avatar src={BettaIco} sx={{ height: 21, width: 100 }}> </Avatar>
  );
}