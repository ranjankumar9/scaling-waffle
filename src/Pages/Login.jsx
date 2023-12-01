"use client";

import { useState } from "react";
import {
  Button,
  Box,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [alertType, setAlertType] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleLogin = () => {
    const storedUserData = JSON.parse(localStorage.getItem("signup"));
    if (!storedUserData) {
      setError("User not found");
      setAlertType("error");
    } else {
      const { email: storedEmail, password: storedPassword } = storedUserData;
      if (
        formData.email === storedEmail &&
        formData.password === storedPassword
      ) {
        localStorage.setItem("Login", JSON.stringify("Authenticated"));
        setError("Login Successful!");
        setAlertType("success");
        navigate("/")
      } else {
        setError("Invalid email or password");
        setAlertType("error");
      }
    }
    setTimeout(() => {
      setError("");
      setAlertType(null);
    }, 2000);
  };

  return (
    <Box
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Navbar />
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={8}
        my={20}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
          Login
        </Heading>
        <FormControl id="email" isRequired>
          <FormLabel>Email address</FormLabel>
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: "gray.500" }}
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
          />
        </FormControl>
        {error && (
          <Alert status={alertType} my={4}>
            <AlertIcon />
            {error}
          </Alert>
        )}
        <Stack spacing={6}>
          <Button
            bg={"blue.400"}
            color={"white"}
            _hover={{
              bg: "blue.500",
            }}
            onClick={handleLogin}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
