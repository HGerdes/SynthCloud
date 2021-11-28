import React,{ useEffect, useState } from 'react'
import { useDispatch } from "react-redux";
import { editSingleComment } from '../../store/comments'

const EditComments = ({...props}) => {
    const dispatch = useDispatch()
    const [comment, setComment] = useState(props.theComment.comment)

    const onSubmit = async (e) => {
        e.preventDefault()
        console.log(props.theComment.id)
        let editedComment = { id:props.theComment.id, comment:comment }
        console.log("editedcomment", editedComment)
        await dispatch(editSingleComment(editedComment))
    }

    useEffect(() => {
        setComment(comment)
    }, [comment])

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button type="submit">submit</button>
            </form>
        </div>
    )
}

export default EditComments
