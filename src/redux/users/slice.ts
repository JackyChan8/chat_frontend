import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { reqGetUsers } from "./asyncActions";
import { UsersSliceState } from "./types";

const initialState: UsersSliceState = {
  users: [],
  message: "",
  isLoading: true,
  statusCode: null,
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        deleteUser: (state: UsersSliceState, action: PayloadAction<number>) => {
            if (state.users.length > 0) {
                state.users = state.users.filter((el) => el.id !== action.payload);
            } else {
                state.users = [];
            }
        },
        setMessage: (state: UsersSliceState, action: PayloadAction<string>) => {
            state.message = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(reqGetUsers.pending, (state, action) => {
            state.users = [];
            state.isLoading = true;
            state.message = "";
            state.statusCode = null;
        });
        builder.addCase(reqGetUsers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.users = action.payload.data;
            state.message = action.payload.message;
            state.statusCode = action.payload.statusCode;
        })
        builder.addCase(reqGetUsers.rejected, (state, action) => {
            state.users = [];
            state.isLoading = false;
            state.message = "";
            state.statusCode = null;
        })
    }
})

export const { deleteUser, setMessage } = usersSlice.actions;

export default usersSlice.reducer;
