import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Link,
  Text,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    image: "",
  });

  const [alert, setAlert] = useState(null);

  const { userName, email, password, image } = formData;

  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSignup = () => {
    if (!userName || !email || !password) {
      setAlert({
        status: "error",
        message: "All fields are required",
      });

      setTimeout(() => {
        setAlert(null);
      }, 2000);

      return;
    }

    localStorage.setItem("signup", JSON.stringify(formData));
    navigate("/Login")
    setFormData({
      userName: "",
      email: "",
      password: "",
      image: "",
    });

    setAlert({
      status: "success",
      message: "Registration successful!",
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };


  return (
    <Box
      minH={"80vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Navbar />
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        rounded={"xl"}
        boxShadow={"md"}
        p={6}
        mt={"30px"}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
          Register
        </Heading>
        <FormControl id="userName">
          <FormLabel>User Icon</FormLabel>
          <Stack direction={["column", "row"]} spacing={6}>
            <Center>
              <Input
                placeholder="Image Url..."
                _placeholder={{ color: "gray.500" }}
                type="text"
                value={image}
                onChange={(e) => handleChange("image", e.target.value)}
              />
            </Center>
          </Stack>
        </FormControl>
        <FormControl id="userName" isRequired>
          <FormLabel>User name</FormLabel>
          <Input
            placeholder="UserName"
            _placeholder={{ color: "gray.500" }}
            type="text"
            value={userName}
            onChange={(e) => handleChange("userName", e.target.value)}
          />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Email address</FormLabel>
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: "gray.500" }}
            type="email"
            value={email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            placeholder="password"
            _placeholder={{ color: "gray.500" }}
            type="password"
            value={password}
            onChange={(e) => handleChange("password", e.target.value)}
          />
        </FormControl>
        <Stack spacing={6} direction={["column", "row"]}>
          <Button
            bg={"blue.400"}
            color={"white"}
            w="full"
            _hover={{
              bg: "blue.500",
            }}
            onClick={handleSignup}
          >
            Register
          </Button>
        </Stack>
        {alert && (
          <Alert status={alert.status} my={4}>
            <AlertIcon />
            {alert.message}
          </Alert>
        )}
        <Stack pt={1}>
          <Text align={"center"}>
            Already a user? <Link color={"blue.400"} onClick={() => navigate("/Login")}>Login</Link>
          </Text>
        </Stack>
      </Stack>
    </Box>
  );
}
