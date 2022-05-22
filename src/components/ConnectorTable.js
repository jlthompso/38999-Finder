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
  { 
    field: 'vendor',
    headerName: 'Distributor',
    width: 200,
    renderCell: (params) => (<a href={params.row.link} target='_blank'>{params.row.vendor}</a>)
  },
];

let searching = false;
let abortSearch = false;

export default function ConnectorTable() {
  const militaryType = useSelector(selectMilitaryType);
  const commercialType = useSelector(selectCommercialType);
  const shellStyle = useSelector(selectShellStyle);
  const shellSize = useSelector(selectShellSize);
  const insertArrangement = useSelector(selectInsertArrangement);
  const keyArrangement = useSelector(selectKeyArrangement);
  const shellFinish = useSelector(selectShellFinish);
  const gender = useSelector(selectGender);

  const [rows, setRows] = useState([]);
  const [accessToken, setAccessToken] = useState();
  const [authCode, setAuthCode] = useState();

  useEffect(() => {
    setRows([]);
    if (accessToken) searchDigikey();
  }, [militaryType, commercialType, shellStyle, shellSize, insertArrangement, keyArrangement, shellFinish, gender, accessToken]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('code')) {
      setAuthCode(params.get('code'));
    } else {
      dk.getAuthCode();
    }
  }, []);

  useEffect(() => {
    const getToken = async (code) => {
      const response = await dk.getAccessToken(code);
      setAccessToken(response.access_token);
    };

    if (authCode) getToken(authCode);
  }, [authCode]);

  const searchDigikey = async () => {
    while (searching) {
      abortSearch = true;
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    searching = true;

    const partNums = getPartNums({militaryType, commercialType, shellStyle, shellSize, insertArrangement, keyArrangement, shellFinish, gender});
    for (const partNum of partNums) {
      const response = await dk.search(accessToken, partNum);

      if (abortSearch) {
        setRows([]);
        abortSearch = false;
        break;
      }

      response.forEach(row => {
        setRows((rows) => [...rows, row]);
      });
    }
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