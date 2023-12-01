import {
  Box,
  Flex,
  Container,
  Avatar,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from "@chakra-ui/react";
import "./Navbar.scss";
import {
  MoonIcon,
  SunIcon,
  SearchIcon,
  StarIcon,
} from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const NavLink = (props) => {
  const { children } = props;

  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      href={"#"}
    >
      {children}
    </Box>
  );
};

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate("/Register");
  };

  const handleLogin = () => {
    navigate("/Login");
  };

  const handleLogout = () => {
    localStorage.removeItem("Login");
    navigate("/Login");
  };

  const handleFavourite = () => {
    navigate("/favorite");
  };

  const storedUserData = localStorage.getItem("Login");
  const showlogbtn = JSON.parse(localStorage.getItem("signup"));
  // console.log(showlogbtn.email, showlogbtn)

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Container maxW="container.xl">
          <Flex
            h={16}
            alignItems={"center"}
            justifyContent={"space-between"}
            direction={{ base: "column", md: "row" }}
          >
            <Box className="navbar" mb={{ base: 4, md: 0 }}>
              <img
                src="https://t3.ftcdn.net/jpg/04/31/58/66/360_F_431586600_Adp1wc2typOiQ2u5rCMDUs8lBZfvWtOW.jpg"
                alt="chi"
                onClick={() => navigate("/")}
              />
            </Box>

            <Flex alignItems={"center"} mt={{ base: 4, md: 0 }}>
              <Stack direction={"row"} spacing={2}>
                <Button onClick={toggleColorMode}>
                  {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                </Button>
                <Button onClick={handleSignup}>SignUp</Button>
                {showlogbtn && <Button onClick={handleLogin}>Login</Button>}
                {storedUserData && <Button>
                  <StarIcon onClick={handleFavourite} />
                </Button>}

                {storedUserData && (
                  <Menu>
                    <MenuButton
                      as={Button}
                      rounded={"full"}
                      variant={"link"}
                      cursor={"pointer"}
                      minW={0}
                    >
                      <Avatar
                        size={"sm"}
                        src={
                          showlogbtn.image || "https://cdn4.sharechat.com/Cuteboy_27768de2_1659176673989_sc_cmprsd_75.jpg?tenant=sc&referrer=pwa-sharechat-service&f=rsd_75.jpg"
                        }
                      />
                    </MenuButton>
                    <MenuList alignItems={"center"}>
                      <br />
                      <Center>
                        <Avatar
                          size={"2xl"}
                          src={
                            showlogbtn.image || "https://cdn4.sharechat.com/Cuteboy_27768de2_1659176673989_sc_cmprsd_75.jpg?tenant=sc&referrer=pwa-sharechat-service&f=rsd_75.jpg"
                          }
                        />
                      </Center>
                      <br />
                      <Center>
                        <p>
                          Email :-
                          {showlogbtn.email}
                        </p>
                      </Center>
                      <br />
                      <MenuDivider />
                      <MenuItem>Account Settings</MenuItem>
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </MenuList>
                  </Menu>
                )}
              </Stack>
            </Flex>
          </Flex>
        </Container>
      </Box>
    </>
  );
}
