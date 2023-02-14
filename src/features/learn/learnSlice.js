import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  topic: '',
  modalShow: false,
}

export const learnSlice = createSlice({
  name: 'keys',
  initialState,
  reducers: {
    changeTopic: (state, action) => {
      return { ...state, topic: action.payload };
    },
    setModalShow: (state, action) => {
      return { ...state, modalShow: action.payload };
    },
    changeLearnModal: (state, action) => {
      return action.payload;
    }
  }
});

export const { changeTopic, setModalShow, changeLearnModal } = learnSlice.actions;

export default learnSlice.reducer;