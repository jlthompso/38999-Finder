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

export default function CommercialPartNum() {
  const visible = useSelector(selectCommercialType);
  const shellStyle = useSelector(selectShellStyle);
  const shellSize = useSelector(selectShellSize);
  const insertArrangement = useSelector(selectInsertArrangement);
  const keyArrangement = useSelector(selectKeyArrangement);
  const shellFinish = useSelector(selectShellFinish);
  const gender = useSelector(selectGender);

  function getPartNum() {
    let partNum = "";

    switch (shellStyle) {
      case 'straight-plug':
        partNum += 'TV06';
        break;
      case 'jam-nut-receptacle':
        partNum += 'TV07';
        break;
      case 'wall-mount-receptacle':
        partNum += 'TVP00';
        break;
      default:
        console.error("Invalid shell style.");
        break;
    }

    switch (shellFinish) {
      case 'any':
        partNum += '**';
        break;
      case 'electroless-nickel':
        partNum += 'RF';
        break;
      case 'olive-drab-cadmium':
        partNum += 'RW';
        break;
      case 'durmalon':
        partNum += 'DT';
        break;
      case 'zinc-nickel':
        partNum += 'DZ';
        break;
      default:
        console.error("Invalid shell finish.");
        break;
    }

    partNum += String(shellSize);

    partNum += '-';

    partNum += String(insertArrangement);

    partNum += gender.toUpperCase();

    partNum += (keyArrangement !== 'n') ? keyArrangement.toUpperCase() : '';

    return partNum;
  }

  return (
    <Typography variant="h4" component="div" align='center' mt={2} hidden={!visible} >
        {getPartNum()}
    </Typography>
  );
}