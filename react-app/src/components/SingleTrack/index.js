import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, NavLink } from 'react-router-dom';
import { loadOneTrack } from '../../store/tracks';
import { allGenres } from '../../store/genres';

import "./singleTrack.css"

const SingleTrack = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {pathname} = history.location;
    const uniqueTrackId = pathname.split("/")[2];
    const currentUser = useSelector(state => state.session.user);

    const oneTrack = useSelector(state => {
        return state.tracks.getOneTrack
    })

    useEffect(() => {
        dispatch(loadOneTrack(uniqueTrackId))
    },[dispatch, uniqueTrackId])

    return (
        <>
            <div className="pageContainer">
            <script src="https://unpkg.com/wavesurfer.js"></script>
                <div className="trackDetails">
                    <div className="trackName">{oneTrack?.name}</div>
                        <img className="trackImage" src={oneTrack?.image_url} alt=""></img>
                </div>
            </div>
        </>
    )
}

export default SingleTrack;
