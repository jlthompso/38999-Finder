import { createSlice } from '@reduxjs/toolkit';

export const connectorSlice = createSlice({
  name: 'connector',
  initialState: {
    militaryType: true,
    commercialType: true,
    shellStyle: 'straight-plug',
    shellSize: 9,
    insertArrangement: '11-98',
    keyArrangement: 'n',
    shellFinish: 'any',
    gender: 'p'
  },
  reducers: {
    setMilitaryType: (state, action) => {
      state.militaryType = action.payload;
    },
    setCommercialType: (state, action) => {
      state.commercialType = action.payload;
    },
    setShellStyle: (state, action) => {
      state.shellStyle = action.payload;
    },
    setShellSize: (state, action) => {
      state.shellSize = action.payload;
    },
    setInsertArrangement: (state, action) => {
      state.insertArrangement = action.payload;
    },
    setKeyArrangement: (state, action) => {
      state.keyArrangement = action.payload;
    },
    setShellFinish: (state, action) => {
      state.shellFinish = action.payload;
    },
    setGender: (state, action) => {
      state.gender = action.payload;
    }
  }
});

export const {
  setMilitaryType,
  setCommercialType,
  setShellStyle,
  setShellSize,
  setInsertArrangement,
  setKeyArrangement,
  setShellFinish,
  setGender
} = connectorSlice.actions;

export default connectorSlice.reducer;