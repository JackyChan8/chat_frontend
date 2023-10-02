import { createAsyncThunk } from "@reduxjs/toolkit";

import authService from "@/services/AuthService";

type ReqSignUpBody = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type ReqSignInBody = {
  email: string;
  password: string;
};

export const reqSignUp = createAsyncThunk(
  "auth/sign-up",
  async (formData: ReqSignUpBody) => {
    const response = await authService.signUp(formData);
    return response.data;
  }
);

export const reqSignIn = createAsyncThunk(
  "auth/sign-in",
  async (formData: ReqSignInBody) => {
    const response = await authService.signIn(formData);
    return response.data;
  }
);
