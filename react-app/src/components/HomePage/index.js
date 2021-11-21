import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router";
import { NavLink } from "react-router-dom";
import { allTracks } from  "../../store/tracks";
import "./homepage.css";

const HomePage = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.session.user);
    const userId = currentUser.id;

    useEffect(() => {
        dispatch(allTracks())
    }, [dispatch])

    const tracks = useSelector((state) => state.tracks.getAllTracks?.list);

    return (
        <>
        <div className="homePageContainer">
            <div className="musicGridContainer">
                {tracks?.map(track => (
                    <div className="track" key={track?.id}>
                        <NavLink to={`/tracks/${track?.id}`} key={`${track?.id}`} className="trackLinks">
                            <div className="trackContainer">
                                <div className="trackName">{track?.name}</div>
                            </div>
                        </NavLink>
                    </div>
                ))}
            </div>
        </div>
        </>
    )
}

export default HomePage;
