import { React, useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { allTracks } from "../../store/tracks";
import "./profile.css"

const Profile = () => {
    const currentUser = useSelector((state) => state.session.user);
    const userId = currentUser.id;
    const tracks = useSelector((state) => state.tracks.getAllTracks?.combined);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(allTracks())
    }, [dispatch])

    return (
        <>
            <div className="profilePageContainer">
                <div className="profilePageInnerStuff">
                    <div className="profileTitle">Your Uploads</div>
                    <div className="commenthr" id="profilehr"></div>
                        {tracks?.map(track => (
                        <div key={`${track.track?.id}`}>
                            {track.track?.user_id === userId ?
                             <NavLink to={`/tracks/${track.track?.id}`} className="profileTrackLink">
                                <div className="profileTrackname"> {track.track?.name}
                                    <img id="profileTrackImages" src={track.track?.image_url}>
                                    </img>
                                </div>
                                </NavLink>
                            : ""}
                        </div>
                    ))}
                    <div id="profileImgSrc"></div>
                </div>
            </div>
        </>
    )
}

export default Profile;
