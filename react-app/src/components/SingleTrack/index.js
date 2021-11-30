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
import EditButtonFormModal from "../EditButtonModal";

import { useParams } from "react-router";

const SingleTrack = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {pathname} = history.location;
    const uniqueTrackId = pathname.split("/")[2];
    const currentUser = useSelector(state => state.session.user);
    let wavesurfer;
    const waveformRef = useRef(null);
    let userId;
    const {id} = useParams();
    console.log(id)
    if (currentUser) {
        userId = currentUser.id;
    }

    useEffect(() => {
        document.querySelector(".playPause").classList.remove("fa-pause")
        document.querySelector(".playPause").classList.add("fa-play")
        dispatch(loadOneTrack(uniqueTrackId))
        dispatch(getCommentsForSong(uniqueTrackId))
    },[dispatch, uniqueTrackId, id, wavesurfer])

    const oneTrack = useSelector(state => state.tracks?.getOneTrack);

    const comments = useSelector(state => {
        return state.comments.getAllComments?.combined;
    })

    let [count, setCount] = useState(0)

    let song = oneTrack?.combined[0].track.song_url;
    // let song = "http://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3"
    useEffect(() => {
        console.log("WAVESURFER", wavesurfer)
        if (waveformRef.current || wavesurfer === 1 || wavesurfer === undefined) {
            wavesurfer = WaveSurfer.create({
                container: waveformRef.current,
                waveColor: "#D9DCFF",
                progressColor: "#fe3218",
                cursorColor: "#4353FF",
                barWidth: 3,
                barRadius: 3,
                cursorWidth: 3,
                height: 170,
                barGap: 1.5,
                responsive: true
            });
            console.log("WAVESURFER AFTER CREATE", wavesurfer)
            if (song) {
                wavesurfer.load(song);
            }

            wavesurfer.stop();

            wavesurfer.on("loading", function() {
                document.querySelector(".playPause").classList.add("hidden");
            })

            wavesurfer.on("ready", function () {
                document.querySelector(".playPause").addEventListener("click", function() {
                    if (wavesurfer === null) {
                        console.log("NULLLL")
                    }
                    wavesurfer.playPause()
                })

                document.querySelector(".playPause").classList.remove("hidden")
            },[]);

            return () => wavesurfer.destroy();
        }
    },[waveformRef.current, song, id]);

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
            errors.push("Comments can't be empty")
        }

        if (comment.length > 255) {
            errors.push("Please shorten your comment (255 characters max)")
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
                            <i className="playPause fas fa-play"> </i>
                            <div ref={waveformRef} className="waveform"> </div>
                        </div>
                    </div>

                    <div className="hr" id="tophr"></div>
                    <ul className="errors">
                                        {errors.map(error => (
                                            <li key={error}>{error} </li>
                                        ))}
                                    </ul>
                    <div className="allCommentStuff">
                        <div className="createCommentContainer">
                            <form className="newCommentForm" onSubmit={onSubmit}>
                                <div className="enterCommentField">
                                    <textarea
                                        className="commentField"
                                        name="comment"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        placeholder="Write a comment"
                                    />
                                </div>
                                <button className="subButt delComBtn" disabled={errors.length > 0} type="submit">Submit comment</button>
                            </form>
                        </div>
                        <div className="commentContainer">
                            {comments?.map((comment => (
                                <div key={comment.id} className="comment">
                                    <div className="commentDetContainer">
                                        <div className="commenthr" id="commenthr"></div>
                                        <div className="commentUser" id="commentEle">{comment.user.username}</div>
                                        <div className="commentContent">{comment.comment.comment}</div>
                                        <div className="commentBtnContainer">
                                            {currentUser && currentUser.id === Number(comment.comment.user_id) && (<button className="delComBtn" onClick={() => deleteButton(comment.comment.id)}>delete</button>)}
                                            {currentUser && currentUser.id === Number(comment.comment.user_id) && (<EditButtonFormModal theComment={comment.comment}/>)}
                                        </div>
                                    </div>
                                </div>
                            )))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SingleTrack;
