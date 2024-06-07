import { Box, Flex, Heading, Quote, Separator } from "@radix-ui/themes";
import React from "react";

const About = () => {
  return (
    <Box>
      <Heading align="center" size="9" style={{ marginTop: "100px" }}>
        Notebook
      </Heading>
      <Flex align="center" justify="center" mt="3">
        <Quote style={{fontSize: "30px"}}>
        Write it down. You never know what amazing things will come of it.
        </Quote>
      </Flex>
        <Separator orientation="horizontal" size="4" />
    </Box>
  );
};

export default About;
