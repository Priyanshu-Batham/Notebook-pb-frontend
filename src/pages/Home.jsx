import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Box, Button, Heading, TextArea, TextField } from "@radix-ui/themes";
import NotesContainer from "../components/NotesContainer";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {addNote} from '../store/noteSlice'


const Home = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const dispatch = useDispatch();

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
      <Button variant="solid" mt={'3'} onClick={()=>{
        dispatch(addNote({title: title, desc: desc}))
      }}>
        <PlusCircledIcon /> Add Note
      </Button>

      <NotesContainer />
    </>
  );
};

export default Home;
