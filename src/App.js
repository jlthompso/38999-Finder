import React from 'react';
import './App.css';
import Grid from '@mui/material/Grid';
import TitleBar from './components/TitleBar'
import ConnectorTable from './components/ConnectorTable';
import SearchForm from './components/SearchForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TitleBar />
      </header>
      <Grid container spacing={2}>
          <Grid item xs={3}>
            <SearchForm />
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
