import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function FooterBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <a href='https://www.38999finder.com'>38999finder.com</a> was created by {'\u00A0'}
            <a href='https://github.com/jlthompso' target={'_blank'}>Joe Thompson</a>.
            View the source code on {'\u00A0'}
            <a href='https://github.com/jlthompso/38999-Finder' target={'_blank'}>GitHub</a>.
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}