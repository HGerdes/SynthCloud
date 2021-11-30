import React from 'react'
import { useState, useEffect, useRef } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import './navbar.css'
import './'
import { findTracks } from '../../store/tracks';
import { allTracks } from '../../store/tracks';
import 'font-awesome/css/font-awesome.min.css';
import AccountNav from "./accountNav"

const Header = () => {
    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const searchBar = useRef(null);
    const results = useRef(null);
    const searchResults = useSelector((state) => state.tracks.searchTracks?.search);
    const [search, setSearch] = useState("");
    const regex = new RegExp(search, "gi");
    //for ellipses dropdown
    const dropdown = useRef(null);
    const account = useRef(null);
    const [num, setNum] = useState(0);
    const userId = user?.id;
    const history = useHistory();

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

    //for ellipses menu
    const showDropdown = () => {

        if (num === 0) {
            dropdown.current.classList.remove("hidden");
            account.current.style.color = "rgb(199, 0, 189)";
            account.current.style.textDecoration = "underline";
            setNum(1);
        } else {
            dropdown.current.classList.add("hidden");
            account.current.style.color = "rgb(69,14,255)";
            account.current.style.textDecoration = "none";
            setNum(0);
        }
    };

    const profileFunc = () => {
        console.log(user)
        if (user) {
            const profileLink = `/profile/${userId}`
            history.push(profileLink)
        } else {
            history.push("/")
        }
    }

    return (

    <div className="navBarContainer">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossOrigin="anonymous" />

        <div className="navbarObjectsContainer">
            <div className="logo">
                <NavLink to='/Home' className="logo">
                    <img src={("https://i.imgur.com/gQywY2v.png")} className="cloudImage"/>
                </NavLink>
            </div>
            <div className="home">
                <NavLink to='/Home' className="home">
                    Home
                </NavLink>
            </div>
            {/* <div className="streamLink">
                <NavLink to='/stream' className="stream">
                    Stream
                </NavLink>
            </div> */}
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
                <NavLink to='/upload' className="uploadLink">
                    Upload
                </NavLink>
            </div>
            <div className="profileLink">
                <div onClick={() => profileFunc()} className="profileLink">
                    Profile
                </div>
            </div>
            <div className="account">
                <i className="fas fa-ellipsis-h account-word"
                    onClick={() => showDropdown()}
                    ref={account}
                ></i>
                 <div className="account-dropdown hidden" ref={dropdown}>
                    <AccountNav />
                </div>
            </div>
        </div>
    </div>
    )
}

export default Header
