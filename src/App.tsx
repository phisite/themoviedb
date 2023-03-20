// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

import axios from "axios";
import { Card, Navbar } from "flowbite-react";
import { useEffect, useState } from "react";

function App() {
  interface IMovie {
    backdrop_path: string;
    id: number;
    name: string;
    overview: string;
    title: string;
  }

  const [movies, setMovies] = useState({ results: [] });
  const getMovies = () =>
    axios({
      method: "get",
      url: `https://api.themoviedb.org/3/trending/all/week?api_key=${
        import.meta.env.VITE_THEMOVIEDB_API_KEY
      }`,
    })
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => console.log(error));

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <>
      <Navbar fluid={true} rounded={true}>
        <Navbar.Brand href="/">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            The Movie DB
          </span>
        </Navbar.Brand>
      </Navbar>
      <ul className="container mx-auto px-4">
        {movies.results.length > 0 &&
          movies.results.map((movie: IMovie) => (
            <li key={movie.id} className="max-w-sm my-4 mx-auto">
              <Card
                imgSrc={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
              >
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {movie.title ? movie.title : movie.name}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  {movie.overview}
                </p>
              </Card>
            </li>
          ))}
      </ul>
    </>
  );
}

export default App;
