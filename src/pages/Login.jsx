import React, { useState } from "react";
import {
  Button,
  Callout,
  Card,
  Flex,
  Heading,
  TextField,
} from "@radix-ui/themes";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import Loader from "../components/Loader";

const MyFlex = styled(Flex)`
  height: 90vh;
`;

const MyCard = styled(Card)`
  border: 2px solid purple;
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState("");

  const showAlert = (msg, color) => {
    setAlert({ msg, color });
    setTimeout(() => setAlert(""), 2000);
  };

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    //sending the login details to backend api endpoint
    const data = {
      email: email,
      password: password.toString(),
    };
    const url = `https://notebook-pb-backend.onrender.com/user/login`;
    setIsLoading(true);
    fetch(url, {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("authToken", data.authToken);
        navigate("/");
        setIsLoading(false);
      })
      .catch((err) => {
        showAlert("Invalid Credentials", "red");
        console.log(err);
        setIsLoading(false);
      });
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
      {/* if loading then show a Loader */}
      {isLoading && <Loader />}
      <MyFlex justify="center" align="center" direction="column">
        {/* if loading then we hide this */}
        {!isLoading && (
          <MyCard variant="surface" style={{padding: "50px"}}>
            <form onSubmit={handleSubmit}>
              <Heading align="center" size="8" mb="5">
                Login
              </Heading>
              <Heading align="center" size="4">
                You will be redirected to the Home Page
              </Heading>
              <TextField.Root
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                mt="5"
                size="3"
                type="email"
                required
              />
              <TextField.Root
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                size="3"
                mt="3"
                type="password"
                required
              />
              <Flex flexGrow="1" direction="column" mt="5">
                <Button size="3" variant="solid" type="submit">
                  Login
                </Button>
              </Flex>
              <Flex flexGrow="1" direction="column" mt="3">
                <Button
                  size="3"
                  variant="outline"
                  onClick={() => navigate("/signup")}
                >
                  Signup
                </Button>
              </Flex>
            </form>
          </MyCard>
        )}
      </MyFlex>
    </>
  );
};

export default Login;
