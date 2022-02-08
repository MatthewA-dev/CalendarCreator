import { createSlice } from "@reduxjs/toolkit";

export const inputSlice = createSlice({
  name: "input",
  initialState: {
    classInput: "",
    invalidDateInput: "",
    startDate: "",
  },
  reducers: {
    setClassInput: (state, action) => {
      state.classInput = action.payload;
    },
    setInvalidInput: (state, action) => {
      state.invalidDateInput = action.payload;
    },
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },
  },
});

export const { setClassInput, setInvalidInput, setStartDate } =
  inputSlice.actions;

export default inputSlice.reducer;
