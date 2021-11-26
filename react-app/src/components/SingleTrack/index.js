import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import { loadOneTrack } from "../../store/tracks";
import { allGenres } from "../../store/genres";
import { createComment } from "../../store/comments";
import WaveSurfer from "wavesurfer.js";
import { getCommentsForSong } from "../../store/comments";
import { deleteComment } from "../../store/comments";
import { editSingleComment } from "../../store/comments";

import "./singleTrack.css"

const SingleTrack = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {pathname} = history.location;
    const uniqueTrackId = pathname.split("/")[2];
    const currentUser = useSelector(state => state.session.user);
    let wavesurfer;
    const waveformRef = useRef(null);
    let userId;

    if (currentUser) {
        userId = currentUser.id;
    }

    useEffect(() => {
        dispatch(loadOneTrack(uniqueTrackId))
        dispatch(getCommentsForSong(uniqueTrackId))
    },[dispatch, uniqueTrackId])

    const oneTrack = useSelector(state => state.tracks?.getOneTrack);

    const comments = useSelector(state => {
        return state.comments.getAllComments?.combined;
    })

    let [count, setCount] = useState(0)

    let song = oneTrack?.combined[0].track.song_url;
    // let song = "http://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3"
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
            });

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
    },[waveformRef.current, count]);

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

    const [comment, setComment] = useState("");
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        const errors = [];

        if (comment.length < 1) {
            errors.push("Write a little more for your review")
        }

        if (comment.length > 255) {
            errors.push("Please shorten your review (255 characters max)")
        }

        setErrors(errors)
    },[comment])

    const onSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            user_id: userId,
            track_id: +uniqueTrackId,
            comment
        };
        console.log("payload", payload)
        await dispatch(createComment(payload, uniqueTrackId)).then(() => dispatch(getCommentsForSong(uniqueTrackId)));
        setComment("")
    };

    const deleteButton = (id) => {
        dispatch(deleteComment(id)).then(() => dispatch(getCommentsForSong(uniqueTrackId)));
    }

    useEffect(() => {
        count += 1;
    })

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
                    <div className="createCommentContainer">
                        <form className="newCommentForm" onSubmit={onSubmit}>
                            <ul className="errors">
                                {errors.map(error => (
                                    <li key={error}>{error}</li>
                                ))}
                            </ul>
                            <div className="enterCommentField">
                                <textarea
                                    name="comment"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Write a comment"
                                />
                            </div>
                            <button className="subButt" disabled={errors.length > 0} type="submit">Submit comment</button>
                        </form>
                    </div>
                    <div className="hr" id="tophr"></div>
                    <div className="commentContainer">
                        {comments?.map((comment => (
                            <div key={comment.id} className="comment">
                                <div className="commentDetContainer">
                                    <div className="commentUser">{comment.user.username}</div>
                                    <div className="commentContent">{comment.comment.comment}</div>
                                    <input className="editCommentInput hidden"  />
                                    {currentUser && currentUser.id === Number(comment.comment.user_id) && <>(<button className="editBtn" onClick={() => {
                                        document.querySelector(".commentContent").classList.add("hidden")
                                        document.querySelector(".editBtn").classList.add("hidden")
                                        document.querySelector(".editCommentInput").classList.remove("hidden")
                                        document.querySelector(".postEditCommentBtn").classList.remove("hidden")

                                    }}>Edit Comment</button>
                                    <button className="postEditCommentBtn hidden" onClick={() => {
                                        document.querySelector(".commentContent").classList.remove("hidden")
                                        document.querySelector(".editBtn").classList.remove("hidden")
                                        document.querySelector(".editCommentInput").classList.add("hidden")
                                        document.querySelector(".postEditCommentBtn").classList.add("hidden")
                                    }}>Post Comment</button>)</>}
                                    <div className="editCommentBtnContainer">
                                    {currentUser && currentUser.id === Number(comment.comment.user_id) && (<button className="delRevBtb" onClick={() => deleteButton(comment.comment.id)}>delete</button>)}
                                    </div>
                                </div>
                            </div>
                         )))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default SingleTrack;
