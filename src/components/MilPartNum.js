import React from 'react';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { selectMilitaryType } from './connectorSlice';

export default function MilPartNum() {
  const visible = useSelector(selectMilitaryType);

  return (
    <Typography variant="h4" component="div" align='center' mt={2} hidden={!visible} >
        D38999/26FA98SN
    </Typography>
  );
}