import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  fullName?: string;
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  phone?: string;
  companyName?: string;
  companyAddress?: string;
  country?: string;
  website?: string;
};

const initialState: User = {
  fullName: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  phone: "",
  companyName: "",
  companyAddress: "",
  country: "",
  website: "",
};

export const registerUser = createSlice({
  name: "user",
  initialState,
  reducers: {
    setRegisterUser(state, action: PayloadAction<User>) {
      return { ...state, ...action.payload };
    },
    deleteRegisterUser(state) {
      return state;
    },
  },
});

export const { setRegisterUser, deleteRegisterUser } = registerUser.actions;

export default registerUser.reducer;
