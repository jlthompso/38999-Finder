import React from 'react';
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

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        initialState={{
          sorting: {
            sortModel: [{ field: 'qty', sort: 'desc' }],
          },
        }}
        rows={getPartNums({militaryType, commercialType, shellStyle, shellSize, insertArrangement, keyArrangement, shellFinish, gender})}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
}