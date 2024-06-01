import { RowsIcon } from "@radix-ui/react-icons";
import {
  Box,
  Flex,
  Heading,
  Button,
  IconButton,
  DropdownMenu,
  Text,
  TabNav,
} from "@radix-ui/themes";
import styled from "styled-components";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const ResponsiveBox = styled(Box)`
  display: none;

  @media (min-width: 992px) {
    display: block;
  }
`;

const MyLink = styled(Link)`
  text-decoration: none;
  color: white;
`;

const Navbar = () => {
  const location = useLocation()
  return (
    <>
      <Box>
        <Flex gap="3" justify="between">
          <Box>
            <Heading weight={"bold"} style={{ fontSize: "35px" }} p={9}>
              <MyLink to="/">NoteBook</MyLink>
            </Heading>
          </Box>
          <ResponsiveBox>
            <TabNav.Root size="2">
              <TabNav.Link asChild active={location.pathname === "/"}>
                <Heading><MyLink to="/">Home</MyLink></Heading>
              </TabNav.Link>
              <TabNav.Link asChild active={location.pathname === "/about"}>
                <Heading><MyLink to="/about">About</MyLink></Heading>
              </TabNav.Link>
            </TabNav.Root>
          </ResponsiveBox>
          <ResponsiveBox>
            <Flex gap="3">
              <Button variant="soft">
                Log In
              </Button>
              <Button variant="solid">
                Sign Up
              </Button>
            </Flex>
          </ResponsiveBox>
          <Box display={{ xs: "block", lg: "none" }}>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <IconButton variant="solid" size={"3"}>
                  <RowsIcon width="18" height="18" />
                </IconButton>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item>
                  <Text>Log In</Text>
                </DropdownMenu.Item>
                <DropdownMenu.Item>
                  <Text>Sign Up</Text>
                </DropdownMenu.Item>
                <DropdownMenu.Separator />

                <DropdownMenu.Item>
                  <Text><MyLink to="/">Home</MyLink></Text>
                </DropdownMenu.Item>
                <DropdownMenu.Item>
                  <Text><MyLink to="/about">About</MyLink></Text>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default Navbar;
