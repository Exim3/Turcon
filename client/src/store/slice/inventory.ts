import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Country {
  label: string;
  value: string;
}

interface InventoryFilterState {
  selectedCountries: Country[];
  selectedCountry: Country;
  selectedPorts: Country[];
  selectedPort: Country;
}

const initialState: InventoryFilterState = {
  selectedCountries: [],
  selectedPorts: [],
  selectedCountry: { label: "", value: "" },
  selectedPort: { label: "", value: "" },
};

export const InventoryFilterSlice = createSlice({
  name: "InventoryFilter",
  initialState,
  reducers: {
    setSelectedCountries: (state, action: PayloadAction<Country[]>) => {
      state.selectedCountries = action.payload;
    },
    setselectedPorts: (state, action: PayloadAction<Country[]>) => {
      state.selectedPorts = action.payload;
    },
    setSelectedCountry: (state, action: PayloadAction<Country>) => {
      state.selectedCountry = action.payload;
    },
    setselectedPort: (state, action: PayloadAction<Country>) => {
      state.selectedPort = action.payload;
    },
  },
});

export const {
  setSelectedCountries,
  setselectedPorts,
  setSelectedCountry,
  setselectedPort,
} = InventoryFilterSlice.actions;

export default InventoryFilterSlice.reducer;
