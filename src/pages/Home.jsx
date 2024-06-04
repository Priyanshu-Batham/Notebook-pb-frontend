import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Box, Button, Heading, TextArea, TextField } from "@radix-ui/themes";
import NotesContainer from "../components/NotesContainer";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { createNote, setAllNotes, logInUser } from "../store/noteSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const Home = () => {
  const isLoggedIn = useSelector((state) => state.notes.isLoggedIn);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  // localStorage.setItem("authToken", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NTZlNDA2ZjFhZDI0NTM4MDUzOTAxMiIsIm5hbWUiOiJwcml5YW5zaHUiLCJpYXQiOjE3MTczNDI2NjB9.QfsHQtsw16v3hpmRJPOwMGtS0OVz8WCNUvMB_pWlZ5g");
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
        const url = "https://notebook-pb-backend.onrender.com/note/read";
        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authToken: token,
          },
        })
          .then((res) => {
            console.log(res);
            return res.json();
          })
          .then((data) => {
            if (data) {
              data.map((note) => {
                note.noteId = nanoid();
              });
              dispatch(setAllNotes({ notes: data }));
              dispatch(logInUser());
              setIsLoading(false);
              console.log(data);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
    setIsLoading(false);
  }, []);

  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.length < 5 || desc.length < 5) {
      alert("Input at least 5 characters");
      return;
    }
    dispatch(createNote({ title: title, desc: desc }));
    setTitle("");
    setDesc("");
  };

  return (
    <>
    {isLoading && <Loader />}

    {/* is not laoding then show home page content */}
      {!isLoading && (
        <Box>
          <form onSubmit={handleSubmit}>
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
            <Button variant="solid" mt={"3"} type="submit">
              <PlusCircledIcon /> Add Note
            </Button>
          </form>

          <NotesContainer />
        </Box>
      )}
    </>
  );
};

export default Home;
