import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Box, Button, Heading, TextArea, TextField } from "@radix-ui/themes";
import NotesContainer from "../components/NotesContainer";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { createNote, setAllNotes, logInUser } from "../store/noteSlice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const isLoggedIn = useSelector((state) => state.notes.isLoggedIn);
  const navigate = useNavigate();
  localStorage.setItem("authToken", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NTZlNDA2ZjFhZDI0NTM4MDUzOTAxMiIsIm5hbWUiOiJwcml5YW5zaHUiLCJpYXQiOjE3MTczNDI2NjB9.QfsHQtsw16v3hpmRJPOwMGtS0OVz8WCNUvMB_pWlZ5g");
  useEffect(() => {
    //if user is logged in then we don't do anything else:
    if (!isLoggedIn) {
      //look for his authToken in the local storage
      const token = localStorage.getItem("authToken");
      //if token is not found then we redirect user to login page
      if (!token) {
        navigate("/login");
      } 
      //if token is found then we fetch his notes 
      else {
        const url = 'https://notebook-pb-backend.onrender.com/note/read'
        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "authToken": token
          },
        })
        .then((res)=>{
          console.log(res);
          return res.json();
        })
        .then((data)=>{
          data.map((note)=>{
            note.noteId = nanoid();
          })
          dispatch(setAllNotes({notes: data}));
          console.log(data);
        })
        .catch((err)=>{
          console.log(err);
        })

        dispatch(logInUser());
      }
    }
  }, []);

  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  return (
    <>
      <Heading size="6" style={{ paddingTop: "60px" }}>
        Title
      </Heading>
      <Box my={"3"}>
        <TextField.Root
          size="3"
          placeholder="Enter Title Here..."
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </Box>
      <Heading size="6" mt={"5"}>
        Description
      </Heading>
      <Box my={"3"}>
        <TextArea
          size="3"
          placeholder="Enter Description Here..."
          value={desc}
          onChange={(e) => {
            setDesc(e.target.value);
          }}
        />
      </Box>
      <Button
        variant="solid"
        mt={"3"}
        onClick={() => {
          dispatch(createNote({ title: title, desc: desc }));
        }}
      >
        <PlusCircledIcon /> Add Note
      </Button>

      <NotesContainer />
    </>
  );
};

export default Home;
