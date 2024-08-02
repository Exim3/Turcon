import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook } from "react-redux";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import InventoryFilterReducer from "./slice/inventory";
import FilterReducer from "./slice/filterSlice";
import containerReducer from "./slice/containerCount";

export const store = configureStore({
  reducer: {
    CountryFilter: InventoryFilterReducer,
    Filter: FilterReducer,
    ContainerCounts: containerReducer,
  },
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
