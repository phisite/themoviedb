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

  interface ISearchResult {
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

  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState({ results: [] });

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchInput(e.target.value.length >= 1 ? e.target.value : "");
  };

  const getSearchResults = (searchInput: string) => {
    searchInput.length > 0
      ? axios({
          method: "get",
          url: `https://api.themoviedb.org/3/search/movie?api_key=${
            import.meta.env.VITE_THEMOVIEDB_API_KEY
          }&language=en-US&query=${searchInput}&page=1&include_adult=false`,
        })
          .then((response) => {
            setSearchResults(response.data);
          })
          .catch((error) => console.log(error))
      : setSearchResults({ results: [] });
  };

  useEffect(() => getSearchResults(searchInput), [searchInput]);

  return (
    <div className="bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
      <Navbar className="mb-4 bg-indigo-900 text-yellow-300 shadow-xl">
        <div className="flex-1">
          <Button className="text-xl normal-case" color="ghost">
            Movie DB
          </Button>
        </div>
        <div className="flex-none gap-2">
          <Form>
            <Input
              bordered
              type="text"
              placeholder="Search"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleSearchInputChange(e)
              }
              className="text-gray-900"
            />
          </Form>
        </div>
      </Navbar>
      <div
        className={`absolute z-10 w-full rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-900 shadow shadow-slate-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white ${
          searchResults.results.length > 0 ? "block" : "hidden"
        }`}
      >
        <div className="w-full rounded-t-lg border-b border-gray-200 px-4 py-2 dark:border-gray-600">
          {searchResults.results.length > 0
            ? `${searchResults.results.length} ${
                searchResults.results.length === 1 ? "result" : "results"
              } found`
            : "No search results found"}
        </div>
        <div className="h-48 overflow-y-auto">
          {searchResults.results.map((result: ISearchResult) => (
            <button
              key={result.id}
              type="button"
              className="flex w-full cursor-pointer gap-2 border-b border-gray-200 px-4 py-2 text-left font-semibold text-gray-600 hover:bg-gray-100 hover:text-gray-700 focus:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:text-white dark:focus:ring-gray-500"
            >
              <img
                src={
                  result.poster_path
                    ? `https://image.tmdb.org/t/p/w92${result.poster_path}`
                    : "https://placehold.co/40x60"
                }
                alt={`Poster for ${result.title}`}
                className="w-10 text-xs font-medium"
              />
              <div>{result.title}</div>
            </button>
          ))}
        </div>
      </div>
      <ul className="container mx-auto flex flex-wrap justify-center gap-4 px-4">
        {movies.results.length > 0 &&
          movies.results.map((movie: IMovie) => (
            <li key={movie.id} className="my-4 mx-4 w-80 max-w-sm">
              <Card className="glass">
                <figure>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={`Poster for ${movie.title ? movie.title : movie.name}`}
                    className="h-[30rem] w-80 object-cover"
                  />
                </figure>
                {/* <Card.Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={`Poster for ${movie.title ? movie.title : movie.name}`}
                  className="h-[30rem] w-80 object-cover"
                /> */}
                <Card.Body className="h-96 overflow-hidden">
                  <Card.Title tag="h2">
                    <div className="flex items-center gap-2">
                      <h2 className="gap-2 text-xl">
                        {movie.title ? movie.title : movie.name}{" "}
                        <Badge size="lg" className="bg-indigo-800 text-white">
                          {(movie.vote_average * 10).toPrecision(2)}%
                        </Badge>
                      </h2>
                    </div>
                  </Card.Title>
                  <p className="overflow-hidden text-ellipsis text-sm">
                    {movie.overview}
                  </p>
                </Card.Body>
              </Card>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;
