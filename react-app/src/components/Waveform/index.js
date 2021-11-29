import WaveSurfer from "wavesurfer.js";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import { loadOneTrack } from "../../store/tracks";

const WaveForm = () => {
    let wavesurfer;
    const waveformRef = useRef(null);
    const dispatch = useDispatch();
    const history = useHistory();
    const {pathname} = history.location;
    const uniqueTrackId = pathname.split("/")[2];

    useEffect(() => {
        dispatch(loadOneTrack(uniqueTrackId))
    },[dispatch, uniqueTrackId])

    const oneTrack = useSelector(state => state.tracks?.getOneTrack);

    let song = oneTrack?.combined[0].track.song_url;

    useEffect(() => {
        if (waveformRef.current) {
            wavesurfer = WaveSurfer.create({
                container: waveformRef.current,
                waveColor: "#D9DCFF",
                progressColor: "#fe3218",
                cursorColor: "#4353FF",
                barWidth: 3,
                barRadius: 3,
                cursorWidth: 3,
                height: 200,
                barGap: 1,
                responsive: true
            },[waveformRef.current]);

            if (song) {
                wavesurfer.load(song);
            }

            wavesurfer.on("ready", function () {
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
        <div className="waveformContainer">
                <i className="playPause fas fa-play"> </i>
                <div ref={waveformRef} className="waveform"> </div>
                <script src="https://unpkg.com/wavesurfer.js@5.2.0/dist/wavesurfer.js"></script>
                <div className="singleTrackInnerStuffContainer">
                    <div className="singleTrackDetails">
                        <div className="singleTrackArtist">{oneTrack?.combined[0].user.username}</div>
                        <div className="singleTrackName">{oneTrack?.combined[0].track.name}</div>
                        <img className="singleTrackImage" src={oneTrack?.combined[0].track.image_url} alt=""></img>
                    </div>
                </div>
        </div>
        </>
    )
}

export default WaveForm
