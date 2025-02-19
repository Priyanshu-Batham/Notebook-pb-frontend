import {
  ClipboardCopyIcon,
  OpenInNewWindowIcon,
  Pencil2Icon,
  Share1Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import {
  Box,
  Button,
  Card,
  Dialog,
  Flex,
  Heading,
  IconButton,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteNote, updateNote } from "../store/noteSlice";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const MyCard = styled(Card)`
  border: 2px solid purple;
`;

const Note = ({ title, desc, noteId, _id, showAlert }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [updateTitle, setUpdateTitle] = useState(title);
  const [updateDesc, setUpdateDesc] = useState(desc);
  const handleSubmit = () => {
    if (updateTitle.length < 1 || updateDesc.length < 1) {
      showAlert("Title and Description cannot be Empty", "red");
    } else {
      dispatch(
        updateNote({
          noteId: noteId,
          _id: _id,
          title: updateTitle,
          desc: updateDesc,
        })
      );
      // const url = "http://15.206.92.142/note/read";
      // fetch(url, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     authToken: token,
      //   },
      // })
      //   .then((res) => {
      //     console.log(res);
      //     return res.json();
      //   })
      //   .then((data) => {
      //     if (data) {
      //       data.map((note) => {
      //         note.noteId = nanoid();
      //       });
      //       dispatch(setAllNotes({ notes: data }));
      //       dispatch(logInUser());
      //       setIsLoading(false);
      //       console.log(data);
      //     }
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
      showAlert("Note Edited", "green");
    }
  };

  return (
    <Box width="150px" m="2">
      <MyCard variant="surface" size="2">
        {/* Edit Icon */}
        <Flex align="center" justify="center">
          <Dialog.Root>
            <Dialog.Trigger>
              <IconButton size="1" variant="outline" ml="3">
                <Pencil2Icon
                  width="15"
                  height="15"
                  style={{ cursor: "pointer" }}
                />
              </IconButton>
            </Dialog.Trigger>

            <Dialog.Content maxWidth="450px">
              <Dialog.Title>Edit Note</Dialog.Title>
              <Dialog.Description size="2" mb="4">
                Make changes to your note.
              </Dialog.Description>
              <Flex direction="column" gap="3">
                <label>
                  <Text as="div" size="2" mb="1" weight="bold">
                    Title
                  </Text>
                  <TextField.Root
                    value={updateTitle}
                    onChange={(e) => setUpdateTitle(e.target.value)}
                    placeholder="Enter your Title"
                  />
                </label>
                <label>
                  <Text as="div" size="2" mb="1" weight="bold">
                    Description
                  </Text>
                  <TextArea
                    value={updateDesc}
                    onChange={(e) => setUpdateDesc(e.target.value)}
                    placeholder="Enter your Description"
                  />
                </label>
              </Flex>
              <Flex gap="3" mt="4" justify="end">
                <Dialog.Close>
                  <Button variant="soft" color="gray">
                    Cancel
                  </Button>
                </Dialog.Close>
                <Dialog.Close>
                  <Button onClick={handleSubmit}>Save</Button>
                </Dialog.Close>
              </Flex>
            </Dialog.Content>
          </Dialog.Root>

          {/* Delete Icon */}
          <Dialog.Root>
            <Dialog.Trigger>
              <IconButton size="1" variant="outline" mx="4" color="red">
                <TrashIcon
                  width="15"
                  height="15"
                  color="red"
                  style={{ cursor: "pointer" }}
                />
              </IconButton>
            </Dialog.Trigger>

            <Dialog.Content maxWidth="450px">
              <Dialog.Title>Are You Sure To Delete?</Dialog.Title>

              <Flex gap="3" mt="4" justify="end">
                <Dialog.Close>
                  <Button variant="soft" color="gray">
                    Cancel
                  </Button>
                </Dialog.Close>
                <Dialog.Close>
                  <Button
                    color="red"
                    onClick={() => {
                      dispatch(deleteNote({ noteId, _id }));
                      showAlert("Note Deleted", "green");
                    }}
                  >
                    Delete
                  </Button>
                </Dialog.Close>
              </Flex>
            </Dialog.Content>
          </Dialog.Root>

          {/* Share Icon */}
          <Dialog.Root>
            <Dialog.Trigger>
              <IconButton size="1" variant="outline" mx="4" color="green">
                <Share1Icon
                  width="15"
                  height="15"
                  style={{ cursor: "pointer" }}
                />
              </IconButton>
            </Dialog.Trigger>

            <Dialog.Content maxWidth="450px">
              <Dialog.Title>Link To This Note</Dialog.Title>
              <form>
                <TextField.Root
                  size="3"
                  placeholder="Enter Title Here..."
                  value={`http://15.206.92.142/sharenote/${_id}`}
                  readOnly
                />
              </form>

              <Flex gap="3" mt="4" justify="end">
                <Dialog.Close>
                  <Button
                    variant="soft"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `http://15.206.92.142/sharenote/${_id}`
                      );
                      showAlert("Link Copied To Clipboard", "green");
                    }}
                  >
                    Copy
                    <ClipboardCopyIcon width="15" height="15" />
                  </Button>
                </Dialog.Close>
                <Dialog.Close>
                  <Button
                    onClick={() => {
                      navigate(`/sharenote/${_id}`);
                    }}
                  >
                    Open
                    <OpenInNewWindowIcon width="15" height="15" />
                  </Button>
                </Dialog.Close>
              </Flex>
            </Dialog.Content>
          </Dialog.Root>
        </Flex>

        <Heading my="3">{title}</Heading>
        <Text as="div" color="gray" size="2">
          {desc}
        </Text>
      </MyCard>
    </Box>
  );
};

export default Note;
