import React,{ useEffect, useState } from 'react'
import { useDispatch } from "react-redux";
import { editSingleComment } from '../../store/comments'

const EditComments = ({theComment}) => {
    const dispatch = useDispatch()

    const [comment, setComment] = useState(theComment)
    const onSubmit = async (e) => {
        e.preventDefault()
        await dispatch(editSingleComment(comment))
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
