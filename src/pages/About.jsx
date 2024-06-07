import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Box, Card, Flex, Heading, Link, Quote, Separator, Strong, Text } from "@radix-ui/themes";
import React from "react";
import styled from "styled-components";

const MyQuote = styled(Quote)`
  font-size: 30px;
  @media screen and (max-width: 600px) {
    font-size: 20px;
    text-align: center;
  }
`;

const About = () => {
  return (
    <Box>
      <Heading align="center" size="9" style={{ marginTop: "100px" }}>
        Notebook
      </Heading>
      <Flex align="center" justify="center" mt="3">
        <MyQuote>
          Write it down. You never know what amazing things will come of it.
        </MyQuote>
      </Flex>
      <Separator orientation="horizontal" size="4" style={{height: "3px", marginTop: "10px", backgroundColor: "purple", boxShadow: "10px 0px 10px purple"}}/>

      <Card mt="3" style={{backgroundColor: "purple"}}>
        <Heading size="5">About The Dev</Heading>
        <Text>Hi! My name is <Strong>Priyanshu Batham</Strong>, I am a final year graduate student pursuing <Strong>BCA</Strong> from <Strong>National Post Graduate College</Strong> in <Strong>Lucknow.</Strong> You can check out More of my work on <Link href="https://github.com/Priyanshu-Batham" target="_blank">Github <GitHubLogoIcon/></Link></Text>
      </Card>

      <Separator orientation="horizontal" size="4" style={{height: "3px", marginTop: "10px", backgroundColor: "purple", boxShadow: "10px 0px 10px purple"}}/>

      <Card mt="3" style={{backgroundColor: "purple"}}>
        <Heading size="5">Why does it takes too long to load?</Heading>
        <Text>The backend of this webapp is hosted on <Link href="https://render.com/" target="_blank">Render's</Link> free tier plan which causes the server to shutdown due to inactivity. After that, the new request triggers the server to first startup which takes the majority of time, however, once started it serves the requests blazingly fast. This Problem is called the <Strong>Cold Start.</Strong></Text>
      </Card>

      <Separator orientation="horizontal" size="4" style={{height: "3px", marginTop: "10px", backgroundColor: "purple", boxShadow: "10px 0px 10px purple"}}/>

      <Card mt="3" style={{backgroundColor: "purple"}}>
        <Heading size="5">How can I contribute?</Heading>
        <Text>Visit the Github Repo for the <Link href="https://github.com/Priyanshu-Batham/Notebook-pb-frontend" target="_blank">Frontend</Link> &  <Link href="https://github.com/Priyanshu-Batham/Notebook-pb-backend" target="_blank">Backend</Link> to Fork it and start contributing right away. I'll try my best to review and merge all the pull requests as soon as possible.</Text>
      </Card>

      <Separator orientation="horizontal" size="4" style={{height: "3px", marginTop: "10px", backgroundColor: "purple", boxShadow: "10px 0px 10px purple"}}/>

    </Box>
  );
};

export default About;
