import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { useReducer } from './slices/user';
import { createWrapper } from 'next-redux-wrapper';


export function makeStore() {
    return configureStore({ reducer: { user: useReducer }, })
}

export const store = makeStore()
export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>
export const wrapper = createWrapper<AppStore>(makeStore);