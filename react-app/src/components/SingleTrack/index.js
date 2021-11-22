import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, NavLink } from 'react-router-dom';
import { loadOneTrack } from '../../store/tracks';
import { allGenres } from '../../store/genres';
import WaveSurfer from 'wavesurfer.js';


import "./singleTrack.css"

const SingleTrack = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {pathname} = history.location;
    const uniqueTrackId = pathname.split("/")[2];
    const currentUser = useSelector(state => state.session.user);
    const [url, seturl] = useState("");
    let [isPlaying, setIsPlaying] = useState(false)
    let wavesurfer;
    const waveformRef = useRef(null);

    const oneTrack = useSelector(state => {
        return state.tracks.getOneTrack
    })
    let song = oneTrack?.song_url
    console.log(song)
    useEffect(() => {
        if (waveformRef.current) {
            wavesurfer = WaveSurfer.create({
                container: waveformRef.current,
                waveColor: '#D9DCFF',
                progressColor: '#4353FF',
                cursorColor: '#4353FF',
                barWidth: 3,
                barRadius: 3,
                cursorWidth: 1,
                height: 200,
                barGap: 3
            });
            if (song) {
                wavesurfer.load(song);
            }
            wavesurfer.on('ready', function () {
            },[]);
        return () => wavesurfer.destroy();
        }
    },[]);

    const playPause = () => {
        wavesurfer?.playPause();
        setIsPlaying(!isPlaying);
    }

    useEffect(() => {
        dispatch(loadOneTrack(uniqueTrackId))
    },[dispatch, uniqueTrackId])

    return (
        <>
            <div className="pageContainer">
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossOrigin="anonymous" />
                <script src="https://unpkg.com/wavesurfer.js@5.2.0/dist/wavesurfer.js"></script>
                <div className="trackDetails">
                    <div className="trackName">{oneTrack?.name}</div>
                    <img className="trackImage" src={oneTrack?.image_url} alt=""></img>
                </div>
                <div ref={waveformRef}> </div>
                <button onClick={() => playPause()} className="fas fa-play"></button>
            </div>
        </>
    )
}

export default SingleTrack;
