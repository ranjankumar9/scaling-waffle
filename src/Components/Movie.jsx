import React from "react";
import "./Movie.scss";
import { Link } from "react-router-dom";

export const Movie = ({ movie }) => {
  return (
    <Link to={`/details/${movie.imdbID}`}>
      <div className="movie">
        <img src={movie.Poster} alt={movie.Title} />
        <p>{movie.Title}</p>
        <h5>
          {" "}
          Type-{movie.Type} Year-{movie.Year}
        </h5>
      </div>
    </Link>
  );
};
