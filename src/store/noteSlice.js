import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  notes: [],
  isLoggedIn: false,
};

export const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    createNote: (state, action) => {
      //pulling out data from payload
      const { title, desc } = action.payload;
      const data = {
        title: title,
        description: desc,
        tag: "",
      };

      //hitting the createNote endpoint and getting a unique noteId
      const url = "http://15.206.92.142/note/create";
      const token = localStorage.getItem("authToken");
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authToken: token,
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });

      state.notes.push({
        title: title,
        description: desc,
        noteId: nanoid(),
      });
    },

    updateNote: (state, action) => {
      const { noteId, _id, title, desc } = action.payload;
      const data = {
        title: title,
        description: desc,
        tag: "",
      };
      const url = `http://15.206.92.142/note/update${_id}`;
      const token = localStorage.getItem("authToken");
      fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authToken: token,
        },
        body: JSON.stringify(data),
      }).catch((err) => {
        console.log(err);
      });

      state.notes.map((note) => {
        if (note.noteId === noteId) {
          note.title = title;
          note.description = desc;
        }
      });
    },

    deleteNote: (state, action) => {
      const { noteId, _id } = action.payload;
      const url = `http://15.206.92.142/note/delete${_id}`;
      const token = localStorage.getItem("authToken");
      fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authToken: token,
        },
      });

      state.notes = state.notes.filter((note) => note.noteId !== noteId);
    },

    setAllNotes: (state, action) => {
      state.notes = action.payload.notes;
    },

    logInUser: (state) => {
      state.isLoggedIn = true;
    },

    logOutUser: (state) => {
      state.isLoggedIn = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  createNote,
  deleteNote,
  updateNote,
  setAllNotes,
  logInUser,
  logOutUser,
} = noteSlice.actions;

export default noteSlice.reducer;
