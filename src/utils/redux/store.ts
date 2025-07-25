import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from './Slice/userSlice'

export const store = configureStore({
  reducer: {
        UserData : userSlice.reducer,
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch