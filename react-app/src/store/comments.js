const LOAD = "comment/LOAD_ALL_COMMENTS"
const LOAD_ONE_REVIEW = "comment/LOAD_ONE_COMMENT"
const ADD_REVIEW = "comment/ADD_COMMENT"
const DELETE_REVIEW = "comment/DELETE_COMMENT"
const EDIT_REVIEW = "comment/EDIT_COMMENT"

const loadAllComments = getAllComments => ({
    type: LOAD,
    getAllComments
})

const loadOneComment = loadOneComment => ({
    type: LOAD_ONE_COMMENT,
    loadOneComment
})

const addOneComment = addComment => ({
    type: ADD_COMMENT,
    addComment
})

const removeComment = deleteComment => ({
    type: DELETE_COMMENT,
    deleteComment
})

const editComment = editComment => ({
    type: EDIT_COMMENT,
    editComment
})

export const getComment = () => async dispatch => {
    const response = await fetch("/api/comments")

    if (response.ok) {
        const reviews = await response.json();
        dispatch(loadAllReviews(reviews));
        return reviews;
    }
}

export const getReviewsForInstrument = (id) => async dispatch => {
    const response = await fetch(`/api/reviews/${id}`);

    if (response.ok) {
        const data = await response.json();
        dispatch(loadAllReviews(data));
        return data;
    }
}
