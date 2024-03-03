import React from "react";

import { Box, Image, Text, Button } from "@chakra-ui/react";

export default function Post() {
  return (
    <Box w="450px" borderWidth="1px" borderRadius="lg" p={6} boxShadow="lg">
      <Image src="https://bit.ly/2Z4KKcF" alt="Post image" />
      <Text mt={4} fontWeight="bold" fontSize="xl">
        Post title
      </Text>
      <Text mt={2}>
        {" "}
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum
        dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit.
      </Text>
      <Button colorScheme="teal" size="md" mt={4}>
        Like
      </Button>
    </Box>
  );
}
