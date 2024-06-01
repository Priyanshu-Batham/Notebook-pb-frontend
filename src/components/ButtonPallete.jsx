import React from "react";
import { Flex, Button } from "@radix-ui/themes";

const ButtonPallete = () => {
  return (
    <>
      <Flex gap="3">
        <Button color="indigo" variant="soft">
          Edit profile
        </Button>
        <Button color="cyan" variant="soft">
          Edit profile
        </Button>
        <Button color="orange" variant="soft">
          Edit profile
        </Button>
        <Button color="crimson" variant="soft">
          Edit profile
        </Button>
      </Flex>
    </>
  );
};

export default ButtonPallete;
