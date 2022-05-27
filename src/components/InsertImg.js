import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectShellSize, selectInsertArrangement } from './connectorSlice';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import CircularProgress from '@mui/material/CircularProgress';

const imgSvc = 'https://image-38999.herokuapp.com/38999/';

export default function InsertImg() {
  const [imgUrl, setImgUrl] = useState();
  const [loading, setLoading] = useState(false);

  const shellSize = useSelector(selectShellSize);
  const insertArrangement = useSelector(selectInsertArrangement);

  useEffect(() => {
    fetchConnImg();
  }, [insertArrangement]);

  const fetchConnImg = async () => {
    setLoading(true);

    let milShellSize;
    switch (shellSize) {
      case 9:
        milShellSize = 'A';
        break;
      case 11:
        milShellSize = 'B';
        break;
      case 13:
        milShellSize = 'C';
        break;
      case 15:
        milShellSize = 'D';
        break;
      case 17:
        milShellSize = 'E';
        break;
      case 19:
        milShellSize = 'F';
        break;
      case 21:
        milShellSize = 'G';
        break;
      case 23:
        milShellSize = 'H';
        break;
      case 25:
        milShellSize = 'J';
        break;
      default:
        console.error("Invalid shell size received.");
        break;
    };

    const url = `${imgSvc}${milShellSize}${String(insertArrangement)}`;
    // await new Promise(resolve => setTimeout(resolve, 5000));  // uncomment to force loading indicator
    const response = await fetch(url);
    const jsonData = await response.json();
    const imgUrl = jsonData[`${milShellSize}${String(insertArrangement)}`];
    setImgUrl(imgUrl);

    setLoading(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box sx={{ height: 40 }}>
        {loading ? (
          <Fade
            in={loading}
            style={{
              transitionDelay: loading ? '800ms' : '0ms',
            }}
            unmountOnExit
          >
            <CircularProgress />
          </Fade>
        ) : (
          <img src={imgUrl} alt="Front Face of Pin Insert" width="60%" />
        )}
      </Box>
    </Box>
  );
}