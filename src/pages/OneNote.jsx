import { Box, Card, Flex, Heading, Separator } from "@radix-ui/themes";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { setAllNotes, logInUser } from "../store/noteSlice";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import styled from "styled-components";

const MyCard = styled(Card)`
  border: 2px solid purple;
  padding: 50px;
`
const MyFlex = styled(Flex)`
  height: 90vh;
`

const OneNote = () => {
  const isLoggedIn = useSelector((state) => state.notes.isLoggedIn);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    console.log(params.noteId);
    //if user is logged in then we don't do anything else:
    if (!isLoggedIn) {
      //look for user's authToken in the local storage
      const token = localStorage.getItem("authToken");

      //if token is found then we fetch his notes
      if (token) {
        setIsLoading(true);
        let url = "https://notebook-pb-backend.onrender.com/note/read";
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
              console.log(data);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }

    //now fetch the specific note
    let url = `https://notebook-pb-backend.onrender.com/note/getThisOne/${params.noteId}`;
      setIsLoading(true);
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          console.log(res);
          return res.json();
        })
        .then((data) => {
          if (data) {
            setTitle(data.title);
            setDesc(data.description);
            setIsLoading(false);
            console.log(data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
  }, []);
  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <MyFlex align="center" justify="center">
        <MyCard>
          <Heading size="8">{title}</Heading>
          <Separator orientation="horizontal" size="4" m="4"/>
          <Heading size="5">{desc}</Heading>
        </MyCard>
        </MyFlex>
      )}
    </>
  );
};

export default OneNote;
