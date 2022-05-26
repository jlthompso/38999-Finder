import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';

export default function TitleBar() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
            MIL-DTL-38999 Series III Connectory Inventory Search
          </Typography>
          <IconButton aria-label="delete">
            <InfoIcon fontSize='large' sx={{ color: 'white' }} onClick={handleOpen} />
          </IconButton>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                About 38999finder.com
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                This website was created by <a href='https://github.com/jlthompso' target='_blank'>Joe Thompson</a>.
                The source code is available on <a href='https://github.com/jlthompso/38999-Finder' target='_blank'>Github</a>.
              </Typography>
            </Box>
          </Modal>
        </Toolbar>
      </AppBar>
    </Box>
  );
}