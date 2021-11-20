import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, NavLink } from 'react-router-dom';
import { loadOneTrack } from '../../store/tracks';

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
        </>
    )
}

export default SingleTrack;
