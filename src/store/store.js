import { configureStore } from '@reduxjs/toolkit'
import noteReducers from './noteSlice'

export const store = configureStore({
  reducer: {
    notes: noteReducers
  },
})