import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import auth from "./auth/slice";
import photo from "./photo/slice";
import users from "./users/slice";
import partner from "./partner/slice";
import profile from "./profile/slice";
import dialogs from "./chat/dialogs/slice";
import messages from "./chat/messages/slice";

export const store = configureStore({
    reducer: {
        auth,
        photo,
        users,
        dialogs,
        profile,
        messages,
        partner,
    }
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
