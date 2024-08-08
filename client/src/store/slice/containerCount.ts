import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Count = {
  TotalInventoryContainer: number;
  TotalSelectedContainer: number;
  TotalCartCount: number;
};
const initialState: Count = {
  TotalInventoryContainer: 0,
  TotalSelectedContainer: 0,
  TotalCartCount: 0,
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
    SetCartCount: (state, action: PayloadAction<number>) => {
      state.TotalCartCount = action.payload;
    },
    AddCartCount: (state, action: PayloadAction<number>) => {
      state.TotalCartCount += action.payload;
    },
  },
});
export const {
  SetInventoryCount,
  SetSelectedCount,
  SetCartCount,
  AddCartCount,
} = ContainerCount.actions;
export default ContainerCount.reducer;
