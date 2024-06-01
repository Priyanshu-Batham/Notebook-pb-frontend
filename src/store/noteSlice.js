import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  notes: []
}

export const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action) => {
      state.notes.unshift({
        "title": action.payload.title,
        "description": action.payload.desc
      })
    },
  },
})

// Action creators are generated for each case reducer function
export const { addNote } = noteSlice.actions

export default noteSlice.reducer