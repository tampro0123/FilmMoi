import Navbar from "../../Component/Navbar/Navbar";
import Banner from "../../Component/Banner/Banner";
import MoviesList from "../../Component/MoviesList/MoviesList";
import requests from "../../Component/Request/request";
import classes from "./Browse.module.css";

function Browse() {
    return (
        <div className="app">
            <Navbar />
            <Banner />
            <div className={classes.moviesListContainer}>
                <MoviesList
                    title=""
                    APIEndPoint={requests.fetchNetflixOriginals}
                    isOrigin={true}
                />
                <MoviesList
                    title="Xu hướng"
                    APIEndPoint={requests.fetchTrending}
                    isOrigin={false}
                />
                <MoviesList
                    title="Xếp hạng cao"
                    APIEndPoint={requests.fetchTopRated}
                    isOrigin={false}
                />
                <MoviesList
                    title="Hành Động"
                    APIEndPoint={requests.fetchActionMovies}
                    isOrigin={false}
                />
                <MoviesList
                    title="Hài"
                    APIEndPoint={requests.fetchComedyMovies}
                    isOrigin={false}
                />
                <MoviesList
                    title="Kinh dị"
                    APIEndPoint={requests.fetchHorrorMovies}
                    isOrigin={false}
                />
                <MoviesList
                    title="Lãng mạn"
                    APIEndPoint={requests.fetchRomanceMovies}
                    isOrigin={false}
                />
                <MoviesList
                    title="Tài Liệu"
                    APIEndPoint={requests.fetchDocumentaries}
                    isOrigin={false}
                />
            </div>
        </div>
    );
}

export default Browse;
