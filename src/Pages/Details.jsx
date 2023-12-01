import { Box, Button, Heading, Image, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import "./Details.scss"

export const Details = () => {
  const { id } = useParams();
  const [state, setState] = useState("");
  const [isAddedToFavorites, setIsAddedToFavorites] = useState(false);
  const toast = useToast();

  useEffect(() => {
    let Api = `https://omdbapi.com/?apikey=eb14ccc0&i=${id}`;
    fetching(Api);
  }, []);

  const fetching = (Api) => {
    axios
      .get(Api)
      .then((res) => {
        setState(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const addToFavourite = () => {
    const arr = JSON.parse(localStorage.getItem("favorite")) || [];

    // Check if the movie with the same ID is already in favorites
    const isAlreadyInFavorites = arr.some((movie) => movie.imdbID === state.imdbID);

    if (isAlreadyInFavorites) {
      // Display a toast notification for already added movie
      toast({
        title: "Movie is already in favorites",
        status: "info",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    } else {
      const fav = [...arr, state];
      localStorage.setItem("favorite", JSON.stringify(fav));

      // Display a toast notification for successfully added movie
      toast({
        title: "Movie added to favorites",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });

      // Set state to indicate that the movie has been added to favorites
      setIsAddedToFavorites(true);
    }
  };

  return (
    <>
      <Navbar />
      <Box className="details" w="20%" m="auto" mt={"20px"}>
        <Box className="detail-Box">
          <Box w={"100%"}>
            <Image width={"100%"} h={"max-content"} m={"auto"} src={state.Poster} />
          </Box>

          <Box className="detail-Box2">
            <Heading mt={"2%"} size={"xl"}>
              {state.Title}
            </Heading>
            <Box fontWeight={"500"} color={"gray"} className="mini-details" mt={"2%"}>
              <Button size={"sm"}>{state.Rated}</Button>
              <Text>{state.Genre}</Text>
              <Text>
                <i className="fa-solid fa-calendar-days"></i>&nbsp;{state.Year}
              </Text>
              <Text>
                <i className="fa-solid fa-clock"></i>&nbsp;{state.Runtime}
              </Text>
              <Text>Rating: {state.imdbRating}</Text>
            </Box>

            <Text fontWeight={"500"} color={"gray.600"} mt={"2%"}>
              {state.Plot}
            </Text>
            <Text fontWeight={"500"} mt={"2%"}>
              Writers:-{state.Writer}
            </Text>
            <Text fontWeight={"500"} color={"gray.600"} mt={"2%"}>
              Language:- {state.Language}
            </Text>
            <Text fontWeight={"500"} color={"gray.600"} mt={"2%"}>
              Country:-{state.Country}
            </Text>
            <Text fontWeight={"500"} color={"gray.600"} mt={"2%"}>
              Awards:-{state.Awards}
            </Text>
            <Box mt={"3%"} className="last-button">
              <Button colorScheme="blue" onClick={addToFavourite}>
                Favourite
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
