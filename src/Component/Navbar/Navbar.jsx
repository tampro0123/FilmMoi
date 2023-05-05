import { Link } from "react-router-dom";
import { SearchIcon } from "../../Icon/Icon";
import classes from "./Navbar.module.css";
import React, { useState, useEffect } from "react";
function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        function handleScroll() {
            if (window.scrollY > 100) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        }
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div
            className={`${classes.header} ${
                scrolled ? classes["navbar--scroll"] : classes.navbar
            }`}
        >
            <Link to={"/"}>
                <h3>Movie App</h3>
            </Link>
            <Link to={"/search"}>
                <SearchIcon
                    className={classes.searchIcon}
                    fill={`${scrolled ? "#fff" : "#000"}`}
                />
            </Link>
        </div>
    );
}

export default Navbar;
