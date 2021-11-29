import React,{ useEffect, useState } from 'react'
import { useDispatch } from "react-redux";
import { editSingleComment, getCommentsForSong } from '../../store/comments'
import { useHistory } from "react-router-dom"

const EditComments = ({setShowModal, ...props }) => {
    const dispatch = useDispatch()
    const [comment, setComment] = useState(props.theComment.comment)
    const history = useHistory();
    const {pathname} = history.location;
    const uniqueTrackId = pathname.split("/")[2];
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
                <input
                    type="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button type="submit">submit</button>
            </form>
        </div>
    )
}

export default EditComments
