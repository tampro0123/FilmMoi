import { useState, useEffect } from "react";
import MovieDetails from "../MovieDetail/MovieDetail";
import classes from "./ResultList.module.css";

function ResultList(props) {
    const [MovieCurrent, setMovieCurrent] = useState(null);
    const handleClickPoster = (movie) => {
        if (MovieCurrent === null || movie.id !== MovieCurrent.id) {
            setMovieCurrent(movie);
        } else {
            setMovieCurrent(null);
        }
    };
    useEffect(() => {}, [MovieCurrent]);
    return (
        <div className={classes.movieListContainer}>
            <h3>Search Result</h3>
            <div className={classes.listItem}>
                {props.movieList.map((movie) => {
                    return (
                        <div
                            key={movie.id}
                            className={classes.item}
                            onClick={() => handleClickPoster(movie)}
                        >
                            <img
                                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                                alt={movie.title}
                            />
                        </div>
                    );
                })}
            </div>
            {MovieCurrent ? <MovieDetails movie={MovieCurrent} /> : null}
        </div>
    );
}

export default ResultList;
