import React from 'react';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import {
  selectMilitaryType,
  selectShellStyle,
  selectShellSize,
  selectInsertArrangement,
  selectKeyArrangement,
  selectShellFinish,
  selectGender
} from './connectorSlice';
import { getMilitaryPartNum } from '../app/partnums';

export default function MilPartNum() {
  const visible = useSelector(selectMilitaryType);
  const shellStyle = useSelector(selectShellStyle);
  const shellSize = useSelector(selectShellSize);
  const insertArrangement = useSelector(selectInsertArrangement);
  const keyArrangement = useSelector(selectKeyArrangement);
  const shellFinish = useSelector(selectShellFinish);
  const gender = useSelector(selectGender);

  return (
    <Typography variant="h4" component="div" align='center' mt={2} hidden={!visible} >
        {getMilitaryPartNum({shellStyle, shellSize, insertArrangement, keyArrangement, shellFinish, gender})}
    </Typography>
  );
}