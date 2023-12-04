import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  email: string;
  organisation: string;
  accessToken: string
}

const initialState: UserState = {
  email: "",
  organisation: "",
  accessToken: ""
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state = action.payload;
    },
    unsetUser: () => {
      state: initialState
    }
  },
});

export const { setUser, unsetUser } = userSlice.actions;

export default userSlice.reducer;
