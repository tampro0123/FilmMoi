import classes from "./Banner.module.css";
import request from "../../Component/Request/request";
import { useEffect, useState } from "react";

function Banner() {
    const [backgroundImg, setBackgroundImg] = useState(null);
    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        async function fetchMovies() {
            setIsLoading(true);
            const response = await fetch(
                `https://api.themoviedb.org/3/${request.fetchNetflixOriginals}`
            );
            const data = await response.json();
            const movies = await data.results;
            const randomMovies = await movies[
                Math.floor(Math.random() * movies.length)
            ];
            setMovie(randomMovies);
            setBackgroundImg(randomMovies.backdrop_path);
            setIsLoading(false);
        }
        fetchMovies();
    }, []);
    const backgroundImgContent = (
        <div
            className={classes.banner}
            style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${backgroundImg})`,
                backgroundRepeat: "no-repeat",
                width: "100%",
                backgroundSize: "cover",
            }}
        ></div>
    );
    const loadingContent = <div>Loading...</div>;
    return (
        <>
            {" "}
            {isLoading ? (
                loadingContent
            ) : (
                <>
                    {backgroundImg && backgroundImgContent}
                    <div className={classes["banner-content"]}>
                        <h1 className={classes.name}>{movie.name}</h1>
                        <div className={classes.actions}>
                            <button>Play</button>
                            <button>My List</button>
                        </div>
                        <div className={classes.overview}>{movie.overview}</div>
                    </div>
                </>
            )}
        </>
    );
}

export default Banner;
