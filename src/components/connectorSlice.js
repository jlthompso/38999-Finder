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

export const selectMilitaryType = (state) => state.connector.militaryType;
export const selectCommercialType = (state) => state.connector.commercialType;
export const selectShellStyle = (state) => state.connector.shellStyle;
export const selectShellSize = (state) => state.connector.setShellSize;
export const selectInsertArrangement = (state) => state.connector.selectInsertArrangement;
export const selectKeyArrangement = (state) => state.connector.selectKeyArrangement;
export const selectShellFinish = (state) => state.connector.shellFinish;
export const selectGender = (state) => state.connector.gender;

export default connectorSlice.reducer;