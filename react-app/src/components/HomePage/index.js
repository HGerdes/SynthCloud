import { React, useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router";
import { NavLink } from "react-router-dom";
import { allTracks } from  "../../store/tracks";
import { getUsers } from "../../store/users";
import { getTrackArtists } from "../../store/tracks";
import "./homepage.css";
import 'font-awesome/css/font-awesome.min.css';

const HomePage = () => {
    const ref = useRef(null);
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.session.user);
    const userId = currentUser.id;

    useEffect(() => {
        dispatch(getTrackArtists())
    },[dispatch])

    const artists = useSelector(state => {
        return state.tracks.getTrackArtists?.combined;
    })


    const scroll = (scrollOffset) => {
        ref.current.scrollLeft += scrollOffset;
    };


    useEffect(() => {
        dispatch(allTracks())
    }, [dispatch])

    const tracks = useSelector((state) => state.tracks.getAllTracks?.combined);

    return (
        <>
        <div className="homePageContainer">
            <div className="homePageInnerStuffContainer">
                <div className="recentlyPlayed">Recent Uploads</div>
                <div className="hpLRButtons">
                    <i onClick={() => scroll(-780)} className="fas fa-chevron-left"></i>
                    <i onClick={() => scroll(780)} className="fas fa-chevron-right"></i>
                </div>
                <div className="musicGridContainer">
                    <div className="tracks" ref={ref}>
                        {tracks?.map(track => (
                            <NavLink to={`/tracks/${track.track?.id}`} key={`${track.track?.id}`} className="track" key={track.track?.id}>
                                <div className="track">
                                    <div className="trackContainer">
                                        <img className="tracksPageTrackImage" src={track.track?.image_url} alt=""></img>
                                        <div className="tntd">
                                            <div className="trackName">{track.track?.name}</div>
                                            <div className="trackName">{track.user?.username}</div>
                                        </div>
                                    </div>
                                </div>
                            </NavLink>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default HomePage;
