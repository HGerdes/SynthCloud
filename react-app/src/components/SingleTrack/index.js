import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, NavLink } from 'react-router-dom';
import { loadOneTrack } from '../../store/tracks';
import { allGenres } from '../../store/genres';
import WaveSurfer from 'wavesurfer.js';
import { getTrackArtists } from '../../store/tracks';

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

    const artists = useSelector(state => {
        return state.tracks?.getTrackArtists;
    })

    useEffect(() => {
        dispatch(loadOneTrack(uniqueTrackId))
    },[dispatch, uniqueTrackId])

    const oneTrack = useSelector(state => state.tracks?.getOneTrack);

    let song = oneTrack?.combined[0].track.song_url;
    // let song = 'http://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3'
    useEffect(() => {
        if (waveformRef.current) {
            wavesurfer = WaveSurfer.create({
                container: waveformRef.current,
                waveColor: '#D9DCFF',
                progressColor: '#fe3218',
                cursorColor: '#4353FF',
                barWidth: 3,
                barRadius: 3,
                cursorWidth: 1,
                height: 200,
                barGap: 1,
                responsive: true
            });

            if (song) {
                wavesurfer.load(song);
            }

            wavesurfer.on('ready', function () {
                document.querySelector(".playPause").addEventListener("click", function() {
                    wavesurfer.playPause()

                })
            },[]);

            return () => wavesurfer.destroy();
        }
    },[waveformRef.current]);

    useEffect(() => {
        document.querySelector(".playPause")?.addEventListener("click", function() {
            if (this.classList.contains("fa-play")) {
                console.log(this.classList)
                this.classList.remove("fa-play")
                this.classList.add("fa-pause")
            } else {
                this.classList.remove("fa-pause");
                this.classList.add("fa-play");
            }
        })
    },[this])




    return (
        <>
            <div className="singleTrackPageContainer">
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossOrigin="anonymous" />
                <script src="https://unpkg.com/wavesurfer.js@5.2.0/dist/wavesurfer.js"></script>
                <div className="singleTrackInnerStuffContainer">
                    <div className="singleTrackDetails">
                        <div className="singleTrackArtist">{oneTrack?.combined[0].user.username}</div>
                        <div className="singleTrackName">{oneTrack?.combined[0].track.name}</div>
                        <img className="singleTrackImage" src={oneTrack?.combined[0].track.image_url} alt=""></img>
                        <div className="waveformContainer">
                            <div ref={waveformRef} className="waveform"> </div>
                            <i className="playPause fas fa-play"> </i>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SingleTrack;
