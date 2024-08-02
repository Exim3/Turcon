import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define initial state
interface FilterState {
  size: { [key: string]: boolean };
  condition: { [key: string]: boolean };
  type: { [key: string]: boolean };
}

const initialState: FilterState = {
  size: {
    "40FT": false,
    "20FT": false,
    "40FT HC": false,
    "20FT HC": false,
  },
  condition: {
    Reefers: false,
    Tanks: false,
    Dry: false,
    OpenTop: false,
    FlatTrack: false,
  },
  type: {
    Scrab: false,
    Damage: false,
    IICL: false,
    New: false,
  },
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    toggleSize: (state, action: PayloadAction<string>) => {
      const { payload } = action;
      state.size[payload] = !state.size[payload];
    },
    toggleCondition: (state, action: PayloadAction<string>) => {
      const { payload } = action;
      state.condition[payload] = !state.condition[payload];
    },
    toggleType: (state, action: PayloadAction<string>) => {
      const { payload } = action;
      state.type[payload] = !state.type[payload];
    },
    clearFilters: (state) => {
      state.size = {
        "40FT": false,
        "20FT": false,
        "40FT HC": false,
        "20FT HC": false,
      };
      state.condition = {
        Reefers: false,
        Tanks: false,
        Dry: false,
        OpenTop: false,
        FlatTrack: false,
      };
      state.type = {
        Scrab: false,
        Damage: false,
        IICL: false,
        New: false,
      };
    },
  },
});

export const { toggleSize, toggleCondition, toggleType, clearFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
