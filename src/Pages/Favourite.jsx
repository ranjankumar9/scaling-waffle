import React, { useEffect, useState } from "react";
import { Movie } from "../Components/Movie";
import { Box, Button, Center, Flex, Text } from "@chakra-ui/react";
import Navbar from "../Components/Navbar";
import "./Favourite.scss";

export const Favorite = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem("favorite");

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      console.log("Retrieved data from localStorage:");
      setData(parsedData);
    }
  }, []);

  const handleDelete = (movieId) => {
    const updatedData = data.filter((movie) => movie.imdbID !== movieId);
    setData([...updatedData]);
    localStorage.setItem("favorite", JSON.stringify(updatedData));
  };

  return (
    <div className="favcontainer">
      <Navbar />
      <div className="favcontainer2">
        {data.length > 0 ? (
          data.map((movie) => (
            <div key={movie.imdbID} className="favcard">
              <Movie movie={movie} />
              <Center>
                <Button
                  colorScheme="red"
                  onClick={() => handleDelete(movie.imdbID)}
                >
                  Delete {movie.imdbID}
                </Button>
              </Center>
            </div>
          ))
        ) : (
          <Flex
            className="emptyfav"
            
          >
            <img
              src="https://static.vecteezy.com/system/resources/previews/004/968/488/original/add-to-favorite-list-concept-illustration-flat-design-eps10-simple-modern-graphic-element-for-landing-page-empty-state-ui-infographic-linear-icon-etc-vector.jpg"
              alt=""
              width={"600"}
            />
          </Flex>
        )}
      </div>
    </div>
  );
};
