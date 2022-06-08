import React from 'react';
import './App.css';
import TitleBar from './components/TitleBar'
import ConnectorTable from './components/ConnectorTable';
import SearchForm from './components/SearchForm';
import MilPartNum from './components/MilPartNum';
import Stack from '@mui/material/Stack';
import CommercialPartNum from './components/CommercialPartNum';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { selectShellSize, selectInsertArrangement } from './components/connectorSlice';
import { useSelector } from 'react-redux';

function App() {
  const partNumTheme = createTheme({
    typography: {
      partnum: {
        'font-weight': '400',
        'font-size': '2.125rem',
        'line-height': '1.235',
        'letter-spacing': '0.00735em',
        component: "div",
        align: 'center',
        display: 'inline',
        '&:hover': {
          'font-weight': '575',
          'font-size': '2.5rem',
        },
      }
    }
  });

  const shellSize = useSelector(selectShellSize);
  const insertArrangement = useSelector(selectInsertArrangement);

  return (
    <div className="App">
      <header className="App-header">
        <TitleBar />
      </header>
      <Stack spacing={2} direction="row">
        <Stack spacing={2} sx={{ width: '20%' }}>
          <SearchForm />
          <Container style={{ textAlign: "center" }}>
            <img src={`/img/${shellSize}-${insertArrangement}.jpg`} alt="Front Face of Pin Insert" width="60%" />
          </Container>
        </Stack>
        <Stack sx={{ width: '60%' }} alignItems='center'>
          <ThemeProvider theme={partNumTheme}>
            <MilPartNum />
            <CommercialPartNum />
          </ThemeProvider>
          <ConnectorTable />
        </Stack>
      </Stack>
    </div>
  );
}

export default App;
