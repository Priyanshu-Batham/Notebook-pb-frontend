import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
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

const Note = ({ title, desc, noteId, _id, showAlert }) => {
  const dispatch = useDispatch();
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
    }
  };

  return (
    <Box width="150px" m="2">
      <Card variant="surface" size="2">
        <Dialog.Root>
          <Dialog.Trigger>
            <IconButton size="1" variant="outline">
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

        <Dialog.Root>
          <Dialog.Trigger>
            <IconButton size="1" variant="outline" mx="4">
              <TrashIcon width="15" height="15" style={{ cursor: "pointer" }} />
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
                  onClick={() => {
                    dispatch(deleteNote({ noteId, _id }));
                  }}
                >
                  Delete
                </Button>
              </Dialog.Close>
            </Flex>
          </Dialog.Content>
        </Dialog.Root>

        <Heading my="3">{title}</Heading>
        <Text as="div" color="gray" size="2">
          {desc}
        </Text>
      </Card>
    </Box>
  );
};

export default Note;
