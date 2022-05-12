import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { useDispatch, useSelector } from 'react-redux';
import {
  setMilitaryType,
  setCommercialType,
  setShellStyle,
  setShellSize,
  setInsertArrangement,
  setKeyArrangement,
  setShellFinish,
  setGender
} from './connectorSlice';
import {
  selectMilitaryType,
  selectCommercialType,
  selectShellStyle,
  selectShellSize,
  selectInsertArrangement,
  selectKeyArrangement,
  selectShellFinish
} from './connectorSlice';

export default function SearchForm() {
  const dispatch = useDispatch();

  const militaryType = useSelector(selectMilitaryType);
  const commercialType = useSelector(selectCommercialType);
  const shellStyle = useSelector(selectShellStyle);
  const shellSize = useSelector(selectShellSize);
  const insertArrangement = useSelector(selectInsertArrangement);
  const keyArrangement = useSelector(selectKeyArrangement);
  const shellFinish = useSelector(selectShellFinish);

  return (
    <>
      <FormGroup sx={{ m: 1}}>
          <FormControlLabel control={<Switch
            id='military-switch'
            checked={militaryType}
            disabled={!commercialType}
            onChange={(e) => {
              if (!e.target.checked && !commercialType) e.target.checked = true;
              dispatch(setMilitaryType(e.target.checked));
            }}
          />} label="Military" />
          <FormControlLabel control={<Switch
            id='commercial-switch'
            checked={commercialType}
            disabled={!militaryType}
            onChange={(e) => {
              if (!e.target.checked && !militaryType) e.target.checked = true;
              dispatch(setCommercialType(e.target.checked));
            }}
          />} label="Commercial" />
      </FormGroup>

      <FormControl required fullWidth sx={{ m: 1}}>
        <InputLabel id="style-select-label">Shell Style</InputLabel>
        <Select
          labelId="style-select-label"
          id="style-select"
          value={shellStyle}
          label="Shell Style"
          onChange={(e) => {
            dispatch(setShellStyle(e.target.value))
          }}
        >
          <MenuItem value={"straight-plug"}>Straight Plug</MenuItem>
          <MenuItem value={"jam-nut-receptacle"}>Jam Nut Receptacle</MenuItem>
          <MenuItem value={"wall-mount-receptacle"}>Wall Mount Receptacle</MenuItem>
        </Select>
      </FormControl>

      <FormControl required fullWidth sx={{ m: 1}}>
        <InputLabel id="size-select-label">Shell Size</InputLabel>
        <Select
          labelId="size-select-label"
          id="size-select"
          value={shellSize}
          label="Shell Size"
          onChange={(e) => dispatch(setShellSize(e.target.value))}
        >
          <MenuItem value={9}>A (9)</MenuItem>
          <MenuItem value={11}>B (11)</MenuItem>
          <MenuItem value={13}>C (13)</MenuItem>
          <MenuItem value={15}>D (15)</MenuItem>
          <MenuItem value={17}>E (17)</MenuItem>
          <MenuItem value={19}>F (19)</MenuItem>
          <MenuItem value={21}>G (21)</MenuItem>
          <MenuItem value={23}>H (23)</MenuItem>
          <MenuItem value={25}>J (25)</MenuItem>
        </Select>
      </FormControl>

      <FormControl required fullWidth sx={{ m: 1}}>
        <InputLabel id="insert-select-label">Insert Arrangement</InputLabel>
        <Select
          labelId="insert-select-label"
          id="insert-select"
          value={insertArrangement}
          label="Insert Arrangement"
          onChange={(e) => dispatch(setInsertArrangement(e.target.value))}
        >
          <MenuItem value={35}>9-35</MenuItem>
          <MenuItem value={98}>9-98</MenuItem>
        </Select>
      </FormControl>

      <FormControl required fullWidth sx={{ m: 1}}>
        <InputLabel id="key-select-label">Key Arrangement</InputLabel>
        <Select
          labelId="key-select-label"
          id="key-select"
          value={keyArrangement}
          label="Key Arrangement"
          onChange={(e) => dispatch(setKeyArrangement(e.target.value))}
        >
          <MenuItem value={"n"}>N</MenuItem>
          <MenuItem value={"a"}>A</MenuItem>
          <MenuItem value={"b"}>B</MenuItem>
          <MenuItem value={"c"}>C</MenuItem>
          <MenuItem value={"d"}>D</MenuItem>
          <MenuItem value={"e"}>E</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ m: 1}}>
        <InputLabel id="finish-select-label">Shell Finish</InputLabel>
        <Select
          labelId="finish-select-label"
          id="finish-select"
          value={shellFinish}
          label="Shell Finish"
          onChange={(e) => dispatch(setShellFinish(e.target.value))}
        >
          <MenuItem value={"any"}>Any</MenuItem>
          <MenuItem value={"electroless-nickel"}>Electroless Nickel</MenuItem>
          <MenuItem value={"olive-drab-cadmium"}>Olive Drab Cadmium</MenuItem>
          <MenuItem value={"durmalon"}>Durmalon</MenuItem>
          <MenuItem value={"zinc-nickel"}>Zinc-Nickel</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1}}>
        <RadioGroup
          defaultValue="p"
          name="gender-radio-buttons-group"
          onChange={(e) => dispatch(setGender(e.target.value))}
        >
          <FormControlLabel value="p" control={<Radio />} label="Pins" />
          <FormControlLabel value="s" control={<Radio />} label="Sockets" />
        </RadioGroup>
      </FormControl>
    </>
  );
}