// In SignupForm.js
import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Box,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the form submission logic here
    console.log("Submitted:", { email, password });
  };

  return (
    <div className="flex flex-col justify-items-center w-full h-full ">
      <Box
        shadow="md"
        p={4}
        className="bg-gray-300 rounded-md lg:w-[35%] lg:h-[70%] mx-auto my-auto flex flex-col"
      >
        <h1 className="text-4xl font-semibold mx-auto mb-16 mt-8">Log In</h1>
        <form onSubmit={handleSubmit}>
          <VStack spacing={8}>
            <FormControl
              id="email"
              isRequired
              className="flex flex-col items-center"
            >
              <FormLabel width="80%">Email address</FormLabel>
              <Input
                width="80%"
                bg="white"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl
              id="password"
              isRequired
              className="flex flex-col items-center mt-6"
            >
              <FormLabel width="80%">Password</FormLabel>
              <Input
                width="80%"
                bg="white"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>

            <Button
              className="mt-10"
              type="submit"
              colorScheme="blue"
              size="md"
            >
              Submit
            </Button>
            <Text fontSize="sm" color="gray.600">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-500">
                Register here
              </Link>
            </Text>
          </VStack>
        </form>
      </Box>
    </div>
  );
}

export default SignupForm;
