import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Count = {
  TotalInventoryContainer: number;
  TotalSelectedContainer: number;
};
const initialState: Count = {
  TotalInventoryContainer: 0,
  TotalSelectedContainer: 0,
};

const ContainerCount = createSlice({
  name: "ContainerCounts",
  initialState,
  reducers: {
    SetInventoryCount: (state, action: PayloadAction<number>) => {
      state.TotalInventoryContainer = action.payload;
    },
    SetSelectedCount: (state, action: PayloadAction<number>) => {
      state.TotalSelectedContainer = action.payload;
    },
  },
});
export const { SetInventoryCount, SetSelectedCount } = ContainerCount.actions;
export default ContainerCount.reducer;
