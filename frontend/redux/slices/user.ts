import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper';
import { ResponseUser } from '../../components/Api/response';
import { AppState } from '../store';

export interface UserState { data: ResponseUser | null; }

const initialState: UserState = { data: null }

export const userSlice = createSlice({
    name: 'user',
    initialState,

    reducers: {
        setUserData: (state: UserState, action: PayloadAction<ResponseUser>) => { state.data = action.payload }
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.user,
            };
        },
    },
})

export const { setUserData } = userSlice.actions

export const selectUserData = (state: AppState) => state.user.data;

export const useReducer = userSlice.reducer