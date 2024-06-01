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
  TextField,
} from "@radix-ui/themes";
import React from "react";

const Note = ({title, desc}) => {
  return (
    <Box width="200px" m="3">
      <Card variant="surface" size="2">
        <Dialog.Root>
          <Dialog.Trigger>
            <IconButton size="1" variant="outline">
              <Pencil2Icon width="15" height="15"  style={{cursor:"pointer"}}/>
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
                  defaultValue="Freja Johnsen"
                  placeholder="Enter your full name"
                />
              </label>
              <label>
                <Text as="div" size="2" mb="1" weight="bold">
                  Description
                </Text>
                <TextField.Root
                  defaultValue="freja@example.com"
                  placeholder="Enter your email"
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
                <Button>Save</Button>
              </Dialog.Close>
            </Flex>
          </Dialog.Content>
        </Dialog.Root>


        <Dialog.Root>
          <Dialog.Trigger>
            <IconButton size="1" variant="outline" mx="4">
              <TrashIcon width="15" height="15" style={{cursor:"pointer"}}/>
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
                <Button>Delete</Button>
              </Dialog.Close>
            </Flex>
          </Dialog.Content>
        </Dialog.Root>

        <Heading my="3">{title}t</Heading>
        <Text as="div" color="gray" size="2">
          {desc}
        </Text>
      </Card>
    </Box>
  );
};

export default Note;
