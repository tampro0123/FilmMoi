import React, { useState } from "react";
import Navbar from "../../Component/Navbar/Navbar";
import SearchForm from "../../Component/SearchForm/SearchForm";
import ResultList from "../../Component/ResultsList/ResultList";
import classes from "./Search.module.css";

const Search = () => {
    const [listMovies, setListMovies] = useState([]);
    const handleGetDataSearch = (data) => {
        setListMovies(data);
    };
    return (
        <div className={classes.searchPage}>
            <Navbar />
            <SearchForm onGetData={handleGetDataSearch} />
            <ResultList movieList={listMovies} />
        </div>
    );
};

export default Search;
