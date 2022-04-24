import React from 'react';
import './App.css';
import TitleBar from './components/TitleBar'
import ConnectorTable from './components/ConnectorTable';
import SearchForm from './components/SearchForm';
import MilPartNum from './components/MilPartNum';
import Stack from '@mui/material/Stack';
import CommercialPartNum from './components/CommercialPartNum';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TitleBar />
      </header>
      <Stack spacing={2} direction="row">
        <Stack spacing={2} sx={{ width: '20%' }}>
          <SearchForm />
          Insert Arrangement
        </Stack>
        <Stack spacing={2} sx={{ width: '60%' }}>
          <MilPartNum />
          <CommercialPartNum />
          <ConnectorTable />
        </Stack>
      </Stack>
    </div>
  );
}

export default App;
