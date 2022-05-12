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

export default function MilPartNum() {
  const visible = useSelector(selectMilitaryType);
  const shellStyle = useSelector(selectShellStyle);
  const shellSize = useSelector(selectShellSize);
  const insertArrangement = useSelector(selectInsertArrangement);
  const keyArrangement = useSelector(selectKeyArrangement);
  const shellFinish = useSelector(selectShellFinish);
  const gender = useSelector(selectGender);

  function getPartNum() {
    let partNum = "D38999/";

    switch (shellStyle) {
      case 'straight-plug':
        partNum += '26';
        break;
      case 'jam-nut-receptacle':
        partNum += '24';
        break;
      case 'wall-mount-receptacle':
        partNum += '20';
        break;
      default:
        console.error("Invalid shell style.");
        break;
    }

    switch (shellFinish) {
      case 'any':
        partNum += '*';
        break;
      case 'electroless-nickel':
        partNum += 'F';
        break;
      case 'olive-drab-cadmium':
        partNum += 'W';
        break;
      case 'durmalon':
        partNum += 'T';
        break;
      case 'zinc-nickel':
        partNum += 'Z';
        break;
      default:
        console.error("Invalid shell finish.");
        break;
    }

    switch (shellSize) {
      case 9:
        partNum += 'A';
        break;
      case 11:
        partNum += 'B';
        break;
      case 13:
        partNum += 'C';
        break;
      case 15:
        partNum += 'D';
        break;
      case 17:
        partNum += 'E';
        break;
      case 19:
        partNum += 'F';
        break;
      case 21:
        partNum += 'G';
        break;
      case 23:
        partNum += 'H';
        break;
      case 25:
        partNum += 'J';
        break;
      default:
        console.error("Invalid shell size.");
        break;
    }

    partNum += String(insertArrangement);

    partNum += gender.toUpperCase();

    partNum += keyArrangement.toUpperCase();

    return partNum;
  }

  return (
    <Typography variant="h4" component="div" align='center' mt={2} hidden={!visible} >
        {getPartNum()}
    </Typography>
  );
}