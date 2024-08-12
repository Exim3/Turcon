import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define initial state
interface FilterState {
  size: { [key: string]: boolean };
  condition: { [key: string]: boolean };
  type: { [key: string]: boolean };
}

const initialState: FilterState = {
  size: {
    "20'FT": false,
    "20'FT HC": false,
    "40'FT": false,
    "40'FT HC": false,
  },
  condition: {
    SCRAP: false,
    DAMAGE: false,
    NEW: false,
    IICL: false,
    WWT: false,
    CARGOWORTHY: false,
    ASIS: false,
  },
  type: {
    DRY: false,
    REEFERS: false,
    OPENTOP: false,
    FLATRACK: false,
    TANKS: false,
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
        "20'FT": false,
        "40'FT": false,
        "20'FT HC": false,
        "40'FT HC": false,
      };
      state.condition = {
        SCRAP: false,
        DAMAGE: false,
        NEW: false,
        IICL: false,
        WWT: false,
        CARGOWORTHY: false,
        ASIS: false,
      };
      state.type = {
        DRY: false,
        REEFERS: false,
        OPENTOP: false,
        FLATRACK: false,
        TANKS: false,
      };
    },
  },
});

export const { toggleSize, toggleCondition, toggleType, clearFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
