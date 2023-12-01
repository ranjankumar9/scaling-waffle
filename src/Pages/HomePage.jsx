import { Input } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Movie } from "../Components/Movie";
import { Pagination } from "../Components/Pagination";
import Navbar from "../Components/Navbar";
import Slider from "../Components/Slider";
import "./HomePage.scss";

const HomePage = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("all");
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [yearfilter, setYearFilter] = useState("");
  const [yearsorting, setYearSorting] = useState("");
  const getData = () => {
    const url = `https://omdbapi.com/?apikey=eb14ccc0`;
    const params = {
      s: search,
      page: page,
      type: filter,
      y: yearfilter,
    };

    axios
      .get(url, { params })
      .then((res) => {
        console.log(res);
        let sortResult = res.data.Search || [];
        if (yearsorting === "latest") {
          sortResult = sortResult.sort(
            (a, b) => parseInt(b.Year) - parseInt(a.Year)
          );
          setData(sortResult);
        } else if (yearsorting === "old") {
          sortResult = sortResult.sort(
            (a, b) => parseInt(a.Year) - parseInt(b.Year)
          );
          setData(sortResult);
        }

        setData(res.data.Search);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getData();
  }, [search, page, yearsorting, filter, yearfilter]);

  console.log(data);

  return (
    <div className="main">
      <div>
        <Navbar />
      </div>
      <div>
        <Slider />
      </div>
      <div className="maincard">
        <div className="searchsort">
          <div className="search">
            <Input
              type="text"
              placeholder="Search Movies"
              w="100%"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="sort">
            <select
              id="ratingFilter"
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="">Filter Genre </option>
              <option value="movie">Movies</option>
              <option value="series">Series</option>
              <option value="episode">Episode</option>
            </select>
            <select
              id="yearFilter"
              onChange={(e) => setYearFilter(e.target.value)}
            >
              <option value="">Filter Year Wise </option>
              <option value="2022">2022</option>
              <option value="2000">2000</option>
              <option value="2020">2020</option>
            </select>
            <select
              id="genreFilter"
              onChange={(e) => setYearSorting(e.target.value)}
            >
              <option value="">Sort Year Wise</option>
              <option value="latest">Latest</option>
              <option value="old">Old</option>
              <option value="">All</option>
            </select>
          </div>
        </div>
        <div className="moviecard">
          {data &&
            data.map((movie) => <Movie movie={movie} key={movie.imdbID} />)}
        </div>
        <Pagination page={page} setPage={setPage} />
      </div>
    </div>
  );
};

export default HomePage;
