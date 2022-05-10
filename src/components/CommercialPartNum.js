import React from 'react';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { selectCommercialType } from './connectorSlice';

export default function CommercialPartNum() {
  const visible = useSelector(selectCommercialType);

  return (
    <Typography variant="h4" component="div" align='center' mt={2} hidden={!visible} >
        TVS06RF-11-98S
    </Typography>
  );
}