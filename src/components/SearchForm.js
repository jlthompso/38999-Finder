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

export default function SearchForm() {
  return (
    <>
      <FormGroup sx={{ m: 1}}>
          <FormControlLabel control={<Switch defaultChecked />} label="Military" />
          <FormControlLabel control={<Switch defaultChecked />} label="Commercial" />
      </FormGroup>

      <FormControl required fullWidth sx={{ m: 1}}>
        <InputLabel id="style-select-label">Shell Style</InputLabel>
        <Select
          labelId="style-select-label"
          id="style-select"
          value={"straight-plug"}
          label="Shell Style"
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
          value={9}
          label="Shell Size"
        >
          <MenuItem value={9}>A (9)</MenuItem>
          <MenuItem value={11}>B (11)</MenuItem>
          <MenuItem value={13}>C (13)</MenuItem>
          <MenuItem value={15}>D (15)</MenuItem>
          <MenuItem value={17}>E (17)</MenuItem>
          <MenuItem value={19}>F (18)</MenuItem>
        </Select>
      </FormControl>

      <FormControl required fullWidth sx={{ m: 1}}>
        <InputLabel id="insert-select-label">Insert Arrangement</InputLabel>
        <Select
          labelId="insert-select-label"
          id="insert-select"
          value={"15-4"}
          label="Insert Arrangement"
        >
          <MenuItem value={"15-4"}>15-4</MenuItem>
          <MenuItem value={"15-5"}>15-5</MenuItem>
          <MenuItem value={"15-15"}>15-15</MenuItem>
          <MenuItem value={"15-18"}>15-18</MenuItem>
          <MenuItem value={"15-19"}>15-19</MenuItem>
          <MenuItem value={"15-35"}>15-35</MenuItem>
        </Select>
      </FormControl>

      <FormControl required fullWidth sx={{ m: 1}}>
        <InputLabel id="key-select-label">Key Arrangement</InputLabel>
        <Select
          labelId="key-select-label"
          id="key-select"
          value={"N"}
          label="Key Arrangement"
        >
          <MenuItem value={"N"}>N</MenuItem>
          <MenuItem value={"A"}>A</MenuItem>
          <MenuItem value={"B"}>B</MenuItem>
          <MenuItem value={"C"}>C</MenuItem>
          <MenuItem value={"D"}>D</MenuItem>
          <MenuItem value={"E"}>E</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ m: 1}}>
        <InputLabel id="finish-select-label">Shell Finish</InputLabel>
        <Select
          labelId="finish-select-label"
          id="finish-select"
          value={"Any"}
          label="Shell Finish"
        >
          <MenuItem value={"Any"}>Any</MenuItem>
          <MenuItem value={"Electroless Nickel"}>Electroless Nickel</MenuItem>
          <MenuItem value={"Olive Drab Cadmium"}>Olive Drab Cadmium</MenuItem>
          <MenuItem value={"Durmalon"}>Durmalon</MenuItem>
          <MenuItem value={"Zinc-Nickel"}>Zinc-Nickel</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1}}>
        <RadioGroup
          defaultValue="p"
          name="gender-radio-buttons-group"
        >
          <FormControlLabel value="p" control={<Radio />} label="Pins" />
          <FormControlLabel value="s" control={<Radio />} label="Sockets" />
        </RadioGroup>
      </FormControl>
    </>
  );
}