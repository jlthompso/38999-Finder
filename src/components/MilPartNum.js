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
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';

export default function MilPartNum() {
  const visible = useSelector(selectMilitaryType);
  const shellStyle = useSelector(selectShellStyle);
  const shellSize = useSelector(selectShellSize);
  const insertArrangement = useSelector(selectInsertArrangement);
  const keyArrangement = useSelector(selectKeyArrangement);
  const shellFinish = useSelector(selectShellFinish);
  const gender = useSelector(selectGender);

  const formatShellStyle = (input) => {
    let output = '';

    switch (input) {
      case 'straight-plug':
        output = '26';
        break;
      case 'jam-nut-receptacle':
        output = '24';
        break;
      case 'wall-mount-receptacle':
        output = '20';
        break;
      default:
        console.error("Invalid shell style.");
        break;
    }
    
    return (
      <Tooltip title="Shell Style" arrow placement='top'>
        <Typography variant="partnum">
          {output}
        </Typography>
      </Tooltip>
    );
  };

const formatShellFinish = (input) => {
  let output = '';

  switch (input) {
    case 'any':
      output = '*';
      break;
    case 'electroless-nickel':
      output = 'F';
      break;
    case 'olive-drab-cadmium':
      output = 'W';
      break;
    case 'durmalon':
      output = 'T';
      break;
    case 'zinc-nickel':
      output = 'Z';
      break;
    default:
      console.error("Invalid shell finish.");
      break;
  }

  return (
    <Tooltip title="Service Class" arrow placement='top'>
      <Typography variant="partnum">
        {output}
      </Typography>
    </Tooltip>
  );
};

const formatShellSize = (input) => {
  let output = '';

  switch (input) {
    case 9:
      output = 'A';
      break;
    case 11:
      output = 'B';
      break;
    case 13:
      output = 'C';
      break;
    case 15:
      output = 'D';
      break;
    case 17:
      output = 'E';
      break;
    case 19:
      output = 'F';
      break;
    case 21:
      output = 'G';
      break;
    case 23:
      output = 'H';
      break;
    case 25:
      output = 'J';
      break;
    default:
      console.error("Invalid shell size.");
      break;
  }

  return (
    <Tooltip title="Shell Size" arrow placement='top'>
      <Typography variant="partnum">
        {output}
      </Typography>
    </Tooltip>
  );
};

  return (
    <Box minHeight={50} display={visible ? 'flex' : 'none'} alignItems='center'>
      <Tooltip title="Military Part Number" arrow placement='left'>
        <Typography variant="partnum">
          D38999/
        </Typography>
      </Tooltip>
      {formatShellStyle(shellStyle)}
      {formatShellFinish(shellFinish)}
      {formatShellSize(shellSize)}
      <Tooltip title="Insert Arrangement" arrow placement='top'>
        <Typography variant="partnum">
          {String(insertArrangement)}
        </Typography>
      </Tooltip>
      <Tooltip title="Contact Type" arrow placement='top'>
        <Typography variant="partnum">
          {gender.toUpperCase()}
        </Typography>
      </Tooltip>
      <Tooltip title="Key Arrangement" arrow placement='right'>
        <Typography variant="partnum">
          {keyArrangement.toUpperCase()}
        </Typography>
      </Tooltip>
    </Box>
  );
}