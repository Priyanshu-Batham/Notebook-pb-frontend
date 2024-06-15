import { ExclamationTriangleIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { Box, Button, Callout, Heading, TextArea, TextField } from "@radix-ui/themes";
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
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    //if user is logged in then we don't do anything else:
    if (!isLoggedIn) {
      //look for his authToken in the local storage
      const token = localStorage.getItem("authToken");
      //if token is not found then we redirect user to login page
      if (!token) {
        navigate("/signup");
      }
      //if token is found then we fetch his notes
      else {
        setIsLoading(true);
        const url = "http://13.201.94.159/note/read";
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
  }, []);

  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [alert, setAlert] = useState("");

  const showAlert = (msg, color) => {
    setAlert({ msg, color });
    setTimeout(() => setAlert(""), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.length < 1 || desc.length < 1) {
      showAlert("Title And Description Should Not be Empty", "red")
      return;
    }
    dispatch(createNote({ title: title, desc: desc }));
    setTitle("");
    setDesc("");
    showAlert("Note Added", "green")
  };

  return (
    <>
      {/* showing alert on some error */}
      {alert && (
        <Callout.Root
          color={alert.color}
          role="alert"
          style={{ position: "fixed", left: 0, width: "100%" }}
        >
          <Callout.Icon>
            <ExclamationTriangleIcon />
          </Callout.Icon>
          <Callout.Text>{alert.msg}</Callout.Text>
        </Callout.Root>
      )}

      {isLoading && <Loader text={"Loading"} />}

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

          <NotesContainer showAlert={showAlert}/>
        </Box>
      )}
    </>
  );
};

export default Home;
