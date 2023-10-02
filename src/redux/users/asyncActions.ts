import { createAsyncThunk } from "@reduxjs/toolkit";

import UsersService from "@/services/UsersService";

export const reqGetUsers = createAsyncThunk("chat/get/users", async () => {
  const response = await UsersService.getUsers();
  return response.data;
});
