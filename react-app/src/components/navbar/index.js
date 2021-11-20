import React from 'react'
import { useState, useEffect, useRef } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import './navbar.css'
import './'
import { findTracks } from '../../store/tracks';
import { allTracks } from '../../store/tracks';

const Header = () => {
    const dispatch = useDispatch();
    const searchBar = useRef(null);
    const results = useRef(null);
    const searchResults = useSelector((state) => state.tracks.searchTracks?.search);
    const [search, setSearch] = useState("");
    const regex = new RegExp(search, "gi");

    useEffect(() => {
        if (search?.length > 0) {
            dispatch(findTracks(search))
            results.current.classList.remove("hidden");
            searchBar.current.style.borderBottom = "none";
            removeBorder();
        } else {
            results.current.classList.add("hidden");
            searchBar.current.style.borderBottom = "0.5px solid grey";
            addBorder();
        }
    }, [search, dispatch]);

    const addBorder = () => {
        searchBar.current.style.borderBottomLeftRadius = "4px";
        searchBar.current.style.borderBottomRightRadius = "4px";
      };

    const hide = (e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
            results.current.classList.add("hidden");
            searchBar.current.style.backgroundColor = "black";
            searchBar.current.style.borderBottom = "0.5px solid grey";
            addBorder();
        } else {
            searchBar.current.style.backgroundColor = "rgb(30,33,36)";
            searchBar.current.style.borderBottom = "none";
        }
    };

    const hideSearch = (e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
            results.current.classList.add("hidden");
            searchBar.current.style.backgroundColor = "rgb(202, 202, 202)";
            searchBar.current.style.borderBottom = "0.5px solid grey";
            setSearch("");
            addBorder();
        } else {
            searchBar.current.style.backgroundColor = "rgb(242, 242, 242)";
            searchBar.current.style.borderBottom = "none";
        }
    };

      const show = (e) => {
        searchBar.current.style.backgroundColor = "rgb(242, 242, 242)";
        if (e.target.value.length > 0) {
            results.current.classList.remove("hidden");
            searchBar.current.style.borderBottom = "none";
            removeBorder();
        } else {
            searchBar.current.style.borderBottom = "0.5px solid grey";
        }
    };

    const removeBorder = () => {
        searchBar.current.style.borderBottomLeftRadius = "0px";
        searchBar.current.style.borderBottomRightRadius = "0px";
    };

    const colorChange = () => {
        if (results.current.classList.contains("hidden")) {
            searchBar.current.style.backgroundColor = "rgb(242, 242, 242)";
        }
    };

    return (

    <div className="navBarContainer">
        <div className="logo">
            <NavLink to='/Home'>
                <img src={("https://i.imgur.com/gQywY2v.png")} className="cloudImage"/>
            </NavLink>
        </div>
        <div className="streamLink">
            <NavLink to='/stream'>
                Stream
            </NavLink>
        </div>
        <div className="search-container">
            <input className="search-bar"
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={(e) => show(e)}
            ref={searchBar}
            onMouseEnter={() =>
                (searchBar.current.style.backgroundColor = "rgb(242, 242, 242")
              }
            onMouseLeave={colorChange}
            />
            <div
            className="search-results hidden"
            tabIndex={0}
            ref={results}
            onMouseEnter={() =>
                (searchBar.current.style.backgroundColor = "rgb(242, 242, 242)")
            }
            >
            {searchResults?.length > 0 &&
                search?.length > 0 &&
                searchResults.map((result, i) => (
                <NavLink
                    to={`/tracks/${result.id}`}
                    key={result.id}
                    className="result"
                    onClick={(e) => hideSearch(e)}
                >
                    <div
                    className="result-name"
                    dangerouslySetInnerHTML={{
                        __html: result.name.replace(
                        regex,
                        (match) => `<span>${match}</span>`
                        ),
                    }}
                    ></div>
                </NavLink>
                ))}
            {searchResults?.length === 0 && search?.length > 0 && (
                <div className="no-result">
                We were unable to find any results for your search.
                </div>
            )}
            </div>
        </div>
        <div className="uploadLink">
            <NavLink to='/upload'>
                Upload
            </NavLink>
        </div>
        <div className="streamLink">
            <NavLink to='/profile'>
                Profile
            </NavLink>
        </div>
    </div>
    )
}

export default Header
