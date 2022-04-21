import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'partNum', headerName: 'Part Number', width: 200, editable: true },
  { field: 'mfgr', headerName: 'Manufacturer', width: 200, editable: true },
  { field: 'qty', headerName: 'Quantity Available', width: 180, editable: true },
  { field: 'price', headerName: 'Price (USD)', width: 100, editable: true },
  { field: 'vendor', headerName: 'Distributor', width: 200, editable: true },
];

const rows = [
  { id: 0, partNum: 'D38999/26FA98SN', mfgr: 'Souriau', qty: 267, price: 26.86, vendor: 'PEI-Genesis' },
  { id: 1,  partNum: 'D38999/26FA98SN', mfgr: 'Amphenol', qty: 24, price: 25.47, vendor: 'PEI-Genesis' },
  { id: 2,  partNum: 'D38999/26FA98SN', mfgr: 'Conesys Aero-Electric', qty: 124, price:23.64 , vendor: 'PEI-Genesis' },
  { id: 3,  partNum: 'D38999/26FA98SN', mfgr: 'TE Connectivity Deutsch Connectors', qty: 101, price: 103.97, vendor: 'Digi-Key' },
  { id: 4,  partNum: 'D38999/26FA98SN', mfgr: 'Amphenol Aerospace Operations', qty: 5, price: 197.84, vendor: 'Digi-Key' },
  { id: 5,  partNum: 'D38999/26FA98SN', mfgr: 'Glenair', qty: 62, price: 1468.85, vendor: 'Digi-Key' },
  { id: 6,  partNum: 'D38999/26FA98SN-LC', mfgr: 'Glenair', qty: 34, price: 1457.85, vendor: 'Digi-Key' },
];

export default function ConnectorTable() {
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