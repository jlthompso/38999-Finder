import React from 'react';
import './App.css';
import Grid from '@mui/material/Grid';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import TitleBar from './components/TitleBar.js'
import ConnectorTable from './components/ConnectorTable.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TitleBar />
      </header>
      <Grid container spacing={2}>
          <Grid item xs={3}>
            <FormGroup>
              <FormControlLabel control={<Switch defaultChecked />} label="Military" />
              <FormControlLabel control={<Switch defaultChecked />} label="Commercial" />
            </FormGroup>
          </Grid>
          <Grid item xs={9}>
            <ConnectorTable />
          </Grid>
          <Grid item xs={3}>
            Insert Arrangement
          </Grid>
        </Grid>
    </div>
  );
}

export default App;
