import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  topic: 'privateKey',
  modalShow: true,
}

export const learnSlice = createSlice({
  name: 'keys',
  initialState,
  reducers: {
    changeTopic: (state, action) => {
      return {...state, topic: action.payload};
    },
    setModalShow: (state, action) => {
      return { ...state, modalShow: action.payload};
    }
  }
});

export const { changeTopic, setModalShow} = learnSlice.actions;

export default learnSlice.reducer;