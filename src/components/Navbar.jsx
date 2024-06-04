import { PinRightIcon, RowsIcon } from "@radix-ui/react-icons";
import {
  Box,
  Flex,
  Heading,
  Button,
  IconButton,
  DropdownMenu,
  Text,
  TabNav,
  Dialog,
  TextField,
} from "@radix-ui/themes";
import styled from "styled-components";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logOutUser } from "../store/noteSlice";

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
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.notes.isLoggedIn);
  const handleLogout = () => {
    localStorage.clear();
    dispatch(logOutUser());
    navigate("/login");
  };
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
            {/* if user is logged in */}
            {isLoggedIn && (
              <TabNav.Root size="2">
                <TabNav.Link asChild active={location.pathname === "/"}>
                  <Heading>
                    <MyLink to="/">Home</MyLink>
                  </Heading>
                </TabNav.Link>
                <TabNav.Link asChild active={location.pathname === "/about"}>
                  <Heading>
                    <MyLink to="/about">About</MyLink>
                  </Heading>
                </TabNav.Link>
              </TabNav.Root>
            )}

            {/* if user is not logged in */}
            {!isLoggedIn && (
              <TabNav.Root size="2">
                <TabNav.Link asChild active={location.pathname === "/login"}>
                  <Heading>
                    <MyLink to="/login">Login</MyLink>
                  </Heading>
                </TabNav.Link>
                <TabNav.Link asChild active={location.pathname === "/signup"}>
                  <Heading>
                    <MyLink to="/signup">Signup</MyLink>
                  </Heading>
                </TabNav.Link>
              </TabNav.Root>
            )}
          </ResponsiveBox>
          <ResponsiveBox>
            {isLoggedIn && (
              <Dialog.Root>
                <Dialog.Trigger>
                  <Button size="2">
                    Logout
                    <PinRightIcon />
                    </Button>
                </Dialog.Trigger>

                <Dialog.Content maxWidth="450px">
                  <Dialog.Title>Are you sure to Logout?</Dialog.Title>
                  <Flex gap="3" mt="4" justify="end">
                    <Dialog.Close>
                      <Button variant="soft" color="gray">
                        Cancel
                      </Button>
                    </Dialog.Close>
                    <Dialog.Close>
                      <Button onClick={handleLogout}>Logout</Button>
                    </Dialog.Close>
                  </Flex>
                </Dialog.Content>
              </Dialog.Root>
            )}
          </ResponsiveBox>
          <Box display={{ xs: "block", lg: "none" }}>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <IconButton variant="solid" size={"3"}>
                  <RowsIcon width="18" height="18" />
                </IconButton>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                {!isLoggedIn && (
                  <>
                    <DropdownMenu.Item>
                      <Text>
                        <MyLink to="/login">Login</MyLink>
                      </Text>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item>
                      <Text>
                        <MyLink to="/signup">Signup</MyLink>
                      </Text>
                    </DropdownMenu.Item>
                  </>
                )}

                {isLoggedIn && (
                  <>
                    <DropdownMenu.Item>
                      <Text>
                        <MyLink to="/">Home</MyLink>
                      </Text>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item>
                      <Text>
                        <MyLink to="/about">About</MyLink>
                      </Text>
                    </DropdownMenu.Item>
                    <DropdownMenu.Separator />
                    <Dialog.Root>
                      <Dialog.Trigger>
                        <Button>Logout</Button>
                      </Dialog.Trigger>

                      <Dialog.Content maxWidth="450px">
                        <Dialog.Title>Are you sure to Logout?</Dialog.Title>
                        <Flex gap="3" mt="4" justify="end">
                          <Dialog.Close>
                            <Button variant="soft" color="gray">
                              Cancel
                            </Button>
                          </Dialog.Close>
                          <Dialog.Close>
                            <Button onClick={handleLogout}>Logout</Button>
                          </Dialog.Close>
                        </Flex>
                      </Dialog.Content>
                    </Dialog.Root>
                  </>
                )}
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default Navbar;
