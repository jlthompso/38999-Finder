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
    //if (searching) controller.abort();
    setRows([{id: 0}]);
    //while(searching);
    scrapeDigikey();
  }, [militaryType, commercialType, shellStyle, shellSize, insertArrangement, keyArrangement, shellFinish, gender]);

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
      const searchUrl = `http://localhost:3000/${partNum.replace('/', '%2F')}`;
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