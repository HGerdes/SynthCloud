import { React, useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router";
import { NavLink } from "react-router-dom";
import { allTracks } from  "../../store/tracks";
import "./homepage.css";
import 'font-awesome/css/font-awesome.min.css';

import { VisibilityContext } from "react-horizontal-scrolling-menu";

const HomePage = () => {
    const ref = useRef(null);

    const scroll = (scrollOffset) => {
        ref.current.scrollLeft += scrollOffset;
    };

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
            <div className="homePageInnerStuffContainer">
                <div className="recentlyPlayed">Recent Uploads</div>

                <div className="hpLRButtons">
                    <i onClick={() => scroll(-1040)} className="fas fa-chevron-left"></i>
                    <i onClick={() => scroll(1040)} className="fas fa-chevron-right"></i>
                </div>

                <div className="musicGridContainer">
                    <div className="tracks" ref={ref}>

                        {tracks?.map(track => (
                            <div className="track" key={track?.id}>
                                <NavLink to={`/tracks/${track?.id}`} key={`${track?.id}`} className="trackLinks">
                                    <div className="trackContainer">
                                        <img className="tracksPageTrackImage" src={track?.image_url} alt=""></img>
                                        <div className="tntd">
                                            <div className="trackName">{track?.name}</div>
                                        </div>
                                    </div>
                                </NavLink>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default HomePage;
