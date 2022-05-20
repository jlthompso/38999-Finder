import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import {
  selectMilitaryType,
  selectCommercialType,
  selectShellStyle,
  selectShellSize,
  selectInsertArrangement,
  selectKeyArrangement,
  selectShellFinish,
  selectGender
} from './connectorSlice';
import { getPartNums } from '../app/partnums';
import * as dk from '../app/digikey';

const columns = [
  { field: 'partNum', headerName: 'Part Number', width: 200 },
  { field: 'mfgr', headerName: 'Manufacturer', width: 200 },
  { field: 'qty', headerName: 'Quantity Available', width: 180 },
  { field: 'price', headerName: 'Price (USD)', width: 100 },
  { field: 'vendor', headerName: 'Distributor', width: 200 },
];

export default function ConnectorTable() {
  const militaryType = useSelector(selectMilitaryType);
  const commercialType = useSelector(selectCommercialType);
  const shellStyle = useSelector(selectShellStyle);
  const shellSize = useSelector(selectShellSize);
  const insertArrangement = useSelector(selectInsertArrangement);
  const keyArrangement = useSelector(selectKeyArrangement);
  const shellFinish = useSelector(selectShellFinish);
  const gender = useSelector(selectGender);

  const [rows, setRows] = useState([{id: 0}]);
  let controller = new AbortController();
  let searching = false;
  useEffect(() => {
    setRows([{id: 0}]);
    if (accessToken) searchDigikey();
    //scrapePEI();
    //scrapeDigikey();
  }, [militaryType, commercialType, shellStyle, shellSize, insertArrangement, keyArrangement, shellFinish, gender]);

  const [authCode, setAuthCode] = useState();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('code')) {
      setAuthCode(params.get('code'));
    } else {
      dk.getAuthCode();
    }
  }, []);

  const [accessToken, setAccessToken] = useState();
  useEffect(() => {
    const getToken = async (code) => {
      const response = await dk.getAccessToken(code);
      setAccessToken(response.access_token);
    };

    if (authCode) getToken(authCode);
  }, [authCode]);

  const searchDigikey = async () => {
    const partNums = getPartNums({militaryType, commercialType, shellStyle, shellSize, insertArrangement, keyArrangement, shellFinish, gender});
    for (const partNum of partNums) {
      const response = await dk.search(accessToken, partNum);
      response.forEach(row => {
        setRows((rows) => [...rows, row]);
      });
    }
  };

  const scrapePEI = async () => {
    const partNums = getPartNums({militaryType, commercialType, shellStyle, shellSize, insertArrangement, keyArrangement, shellFinish, gender});
    for (const partNum of partNums) {
      const searchUrl = `http://localhost:3000/peigenesis/${partNum.replace('/', '%2F')}`;
      const response = await fetch(searchUrl);
      if (response.body) {
        const jsonData = await response.json();
        jsonData.forEach(row => {
          setRows((rows) => [...rows, row]);
        });
      }
    }
  };

  const scrapeDigikey = async () => {
    if (searching) {
      controller.abort();
      while (searching);
    }
    searching = true;
    const partNums = getPartNums({militaryType, commercialType, shellStyle, shellSize, insertArrangement, keyArrangement, shellFinish, gender});
    for (const partNum of partNums) {
      if (controller.signal.aborted) {
        setRows([{id: 0}]);
        break;
      }
      const searchUrl = `http://localhost:3000/digikey/${partNum.replace('/', '%2F')}`;
      const response = await fetch(searchUrl, {signal: controller.signal});
      if (controller.signal.aborted) {
        setRows([{id: 0}]);
        break;
      }
      if (response.body) {
        const jsonData = await response.json();
        jsonData.forEach(row => {
          setRows((rows) => [...rows, row]);
        });
      }
    }
    controller = new AbortController();
    searching = false;
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        initialState={{
          sorting: {
            sortModel: [{ field: 'qty', sort: 'desc' }],
          },
        }}
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
}