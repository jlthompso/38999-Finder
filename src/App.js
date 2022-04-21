import React from 'react';
import './App.css';
import Grid from '@mui/material/Grid';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            MIL-DTL-38999 Series III Connector Inventory Search
          </Grid>
          <Grid item xs={3}>
            <FormGroup>
              <FormControlLabel control={<Switch defaultChecked />} label="Military" />
              <FormControlLabel control={<Switch defaultChecked />} label="Commercial" />
            </FormGroup>
          </Grid>
          <Grid item xs={9}>
            Table
          </Grid>
          <Grid item xs={3}>
            Insert Arrangement
          </Grid>
        </Grid>
      </header>
    </div>
  );
}

export default App;
