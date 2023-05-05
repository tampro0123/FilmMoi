import { useEffect, useState } from "react";
import classes from "./SearchForm.module.css";
import { SearchIcon } from "../../Icon/Icon";

function SearchForm(props) {
    const [searchValue, setSearchValue] = useState("");
    const [dataMovie, setDataMovie] = useState([]);
    const handleChangeInput = (e) => {
        e.preventDefault();
        setSearchValue(e.target.value);
    };
    const handlerResetSearch = (e) => {
        e.preventDefault();
        setSearchValue("");
        setDataMovie([]);
    };
    const handleSubmitSearch = async (e) => {
        e.preventDefault();
        if (searchValue.trim() === "") {
            alert("Vui lòng không để trống tên phim");
            setSearchValue("");
            setDataMovie([]);
            return;
        }
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/search/movie?api_key=2ea541116eeb26633fd12d3ed7aa4e9d&language=en&query=${searchValue}&page=1&include_adult=false`
            );
            const data = await response.json();
            const results = await data.results;
            setDataMovie(results);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        props.onGetData(dataMovie);
    }, [dataMovie, props]);

    return (
        <div className={classes.searchForm}>
            <form className={classes.formModal} onSubmit={handleSubmitSearch}>
                <div className={classes.header}>
                    <input
                        type="text"
                        placeholder="Tìm kiếm phim"
                        value={searchValue}
                        onChange={handleChangeInput}
                        className={classes.searchInput}
                    />
                    <div className={classes.searchAction}>
                        <SearchIcon
                            className={classes.searchIcon}
                            fill="#ccc"
                        />
                    </div>
                </div>
                <div className={classes.actionsForm}>
                    <button
                        className={classes.actionsReset}
                        onClick={handlerResetSearch}
                    >
                        RESET
                    </button>
                    <button type="submit" className={classes.actionsSearch}>
                        SEARCH
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SearchForm;
