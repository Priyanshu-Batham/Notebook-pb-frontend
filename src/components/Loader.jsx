import { Box, Flex, Heading, Progress, Spinner } from "@radix-ui/themes";
import React from "react";

const Loader = (props) => {
  return (
    <Box style={{ marginTop: "30vh" }}>
      <Flex justify="center" align="center" mb="3">
        <Heading mr="3">{props.text}</Heading>
        <Spinner size="3" />
      </Flex>
      <Box maxWidth="500px" style={{ margin: "auto" }}>
        <Progress duration="1s" size="3" />
      </Box>
    </Box>
  );
};

export default Loader;
