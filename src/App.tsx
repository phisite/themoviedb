import axios from "axios";
import { Badge, Button, Card, Form, Input, Navbar } from "react-daisyui";
import { useEffect, useState } from "react";

function App() {
  interface IMovie {
    backdrop_path: string;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    title: string;
    vote_average: number;
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
      <Navbar className="rounded-box bg-base-100 shadow-xl">
        <div className="flex-1">
          <Button className="text-xl normal-case" color="ghost">
            The Movie DB
          </Button>
        </div>
        <div className="flex-none gap-2">
          <Form>
            <Input bordered type="text" placeholder="Search" />
          </Form>
        </div>
      </Navbar>
      <ul className="container mx-auto px-4">
        {movies.results.length > 0 &&
          movies.results.map((movie: IMovie) => (
            <li key={movie.id} className="my-4 mx-auto max-w-sm">
              <Card>
                <Card.Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={`Poster for ${movie.title ? movie.title : movie.name}`}
                />
                <Card.Body>
                  <Card.Title tag="h2">
                    <div className="flex items-center gap-2">
                      <h2 className="gap-2 text-xl">
                        {movie.title ? movie.title : movie.name}{" "}
                        <Badge size="lg">
                          {(movie.vote_average * 10).toPrecision(2)}%
                        </Badge>
                      </h2>
                    </div>
                  </Card.Title>
                  <p>{movie.overview}</p>
                </Card.Body>
              </Card>
            </li>
          ))}
      </ul>
    </>
  );
}

export default App;
