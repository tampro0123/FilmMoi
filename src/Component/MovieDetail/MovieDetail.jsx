import { useDeferredValue, useEffect, useState } from "react";
import classes from "./MovieDetail.module.css";
import Youtube from "react-youtube";
function MovieDetails(props) {
    const [nameMovies, setNameMovies] = useState("");
    const [dataMovie, setDataMovie] = useState({});
    const deferredDataMovie = useDeferredValue(dataMovie);
    useEffect(() => {
        async function fetchMovie() {
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/${props.movie.id}/videos?api_key=2ea541116eeb26633fd12d3ed7aa4e9d`
            );
            const data = await response.json();
            setDataMovie(data);
        }
        fetchMovie();
        return;
    }, [props]);
    useEffect(() => {
        console.log(deferredDataMovie.results);
        if (deferredDataMovie.results === undefined) {
            console.log(props);
            setNameMovies(props.movie.name || props.movie.title);

            return;
        } else {
            const movieCurrent = deferredDataMovie.results.filter((movie) => {
                return (
                    movie.site === "YouTube" &&
                    (movie.type === "Trailer" || movie.type === "Teaser")
                );
            });
            if (movieCurrent.length > 0) {
                console.log(movieCurrent);
                setNameMovies(movieCurrent[0].name);
            } else {
                console.log(movieCurrent);
                setNameMovies(props.movie.name || props.movie.title);
            }
        }
        return;
    }, [props, deferredDataMovie]);
    const opts = {
        height: "400",
        width: "100%",
        playerVars: {
            autoplay: 0,
        },
    };
    const imgDetail = (
        <img
            src={`https://image.tmdb.org/t/p/original/${
                props.movie.poster_path || props.movie.backdrop_path
            }`}
            alt={props.movie.name}
        />
    );
    return (
        <div className={classes.movieDetailsContainer}>
            <div className={classes.detailMovie}>
                <h2 className={classes.name}>{nameMovies}</h2>
                <hr />
                <div>
                    <h3 className={classes.releaseDate}>
                        Release Date :{" "}
                        {props.movie.first_air_date || props.movie.release_date}
                    </h3>
                    <h3 className={classes.vote}>
                        Vote : {props.movie.vote_average} /10
                    </h3>
                </div>
                <h4 className={classes.overView}>{props.movie.overview}</h4>
            </div>
            <div className={classes.movieTrailer}>
                {" "}
                {deferredDataMovie.results === undefined ||
                deferredDataMovie.results.length < 1 ? (
                    imgDetail
                ) : (
                    <Youtube
                        videoId={deferredDataMovie.results[0].key}
                        opts={opts}
                    />
                )}
            </div>
        </div>
    );
}

export default MovieDetails;
