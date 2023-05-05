import { useEffect, useState } from "react";
import MovieDetails from "../MovieDetail/MovieDetail";
import classes from "./MoviesList.module.css";

function MoviesList(props) {
    const [movies, setMovies] = useState([]);
    const [MovieCurrent, setMovieCurrent] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        async function fetchMovies() {
            setIsLoading(true);
            const response = await fetch(
                `https://api.themoviedb.org/3/${props.APIEndPoint}`
            );
            const data = await response.json();
            const moviesData = await data.results;
            setMovies(moviesData);
            setIsLoading(false);
        }
        fetchMovies();
    }, [props.APIEndPoint]);
    const handleClickPoster = (movie) => {
        if (MovieCurrent === null || movie.id !== MovieCurrent.id) {
            setMovieCurrent(movie);
        } else {
            setMovieCurrent(null);
        }
    };
    useEffect(() => {}, [MovieCurrent]);
    const loadingContent = <h2>Loading ... </h2>;
    return (
        <>
            {isLoading ? (
                loadingContent
            ) : (
                <div className={classes.moviesListContain}>
                    <h2 className={classes.title}>{props.title}</h2>
                    <div className={classes.movieListContent}>
                        {movies.map((movie, index) => {
                            return (
                                <div
                                    key={movie.id}
                                    onClick={() => handleClickPoster(movie)}
                                    className={classes.movieItem}
                                >
                                    <img
                                        className={
                                            props.isOrigin
                                                ? classes.imgOrigin
                                                : classes.image
                                        }
                                        src={`https://image.tmdb.org/t/p/original/${
                                            props.isOrigin
                                                ? movie.poster_path
                                                : movie.backdrop_path
                                        }`}
                                        alt=""
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
            {MovieCurrent ? <MovieDetails movie={MovieCurrent} /> : null}
        </>
    );
}

export default MoviesList;
