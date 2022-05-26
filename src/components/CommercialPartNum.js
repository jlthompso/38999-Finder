import React from 'react';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import {
  selectCommercialType,
  selectShellStyle,
  selectShellSize,
  selectInsertArrangement,
  selectKeyArrangement,
  selectShellFinish,
  selectGender
} from './connectorSlice';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';

export default function CommercialPartNum(props) {
  const visible = useSelector(selectCommercialType);
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
        output = 'TV06';
        break;
      case 'jam-nut-receptacle':
        output = 'TV07';
        break;
      case 'wall-mount-receptacle':
        output = 'TVP00';
        break;
      default:
        console.error("Invalid shell style.");
        break;
    }
    
    return (
      <Tooltip title="Shell Style" arrow placement='left'>
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
        output = '**';
        break;
      case 'electroless-nickel':
        output = 'RF';
        break;
      case 'olive-drab-cadmium':
        output = 'RW';
        break;
      case 'durmalon':
        output = 'DT';
        break;
      case 'zinc-nickel':
        output = 'DZ';
        break;
      default:
        console.error("Invalid shell finish.");
        break;
    }
  
    return (
      <Tooltip title="Service Class" arrow>
        <Typography variant="partnum">
          {output}
        </Typography>
      </Tooltip>
    );
  };

  return (
    <Box minHeight={50} display={visible ? 'flex' : 'none'} alignItems='center'>
      {formatShellStyle(shellStyle)}
      {formatShellFinish(shellFinish)}
      <Typography variant="partnum" >
        -
      </Typography>
      <Tooltip title="Shell Size" arrow>
        <Typography variant="partnum">
          {String(shellSize)}
        </Typography>
      </Tooltip>
      <Typography variant="partnum">
        -
      </Typography>
      <Tooltip title="Insert Arrangement" arrow>
        <Typography variant="partnum">
          {String(insertArrangement)}
        </Typography>
      </Tooltip>
      <Tooltip title="Contact Type" arrow placement={(keyArrangement === 'n') ? 'right' : 'bottom'}>
        <Typography variant="partnum">
          {gender.toUpperCase()}
        </Typography>
      </Tooltip>
      <Tooltip title="Key Arrangement" arrow placement='right'>
        <Typography variant="partnum">
          {(keyArrangement !== 'n') ? keyArrangement.toUpperCase() : ''}
        </Typography>
      </Tooltip>
    </Box>
  );
}