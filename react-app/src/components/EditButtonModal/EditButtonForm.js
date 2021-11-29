import React,{ useEffect, useState } from 'react'
import { useDispatch } from "react-redux";
import { editSingleComment, getCommentsForSong } from '../../store/comments'
import { useHistory } from "react-router-dom"

const EditComments = ({setShowModal, ...props }) => {
    const dispatch = useDispatch()
    const history = useHistory();
    const {pathname} = history.location;
    const uniqueTrackId = pathname.split("/")[2];

    const [comment, setComment] = useState(props.theComment.comment)
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
        e.preventDefault()
        let editedComment = { id:props.theComment.id, comment:comment }
        const dispatchedComment = await dispatch(editSingleComment(editedComment))

        if (dispatchedComment) {
            dispatch(getCommentsForSong(uniqueTrackId))
            setShowModal(false)
        }
    }

    useEffect(() => {
        setComment(comment)
    }, [comment])

    return (
        <div>
            <form onSubmit={onSubmit}>
                <ul className="errors">
                    {errors.map(error => (
                        <li className="formError" key={error}>{error}</li>
                    ))}
                </ul>
                <input
                    type="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button type="submit" disabled={errors.length > 0}>submit</button>
            </form>
        </div>
    )
}

export default EditComments
