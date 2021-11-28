const LOAD = "comment/LOAD_ALL_COMMENTS"
const LOAD_ONE_COMMENT = "comment/LOAD_ONE_COMMENT"
const ADD_COMMENT = "comment/ADD_COMMENT"
const DELETE_COMMENT = "comment/DELETE_COMMENT"
const EDIT_COMMENT = "comment/EDIT_COMMENT"

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

export const getComments = () => async dispatch => {
    const response = await fetch("/api/comments")

    if (response.ok) {
        const comments = await response.json();
        dispatch(loadAllComments(comments));
        return comments;
    }
}

export const getCommentsForSong = (id) => async dispatch => {
    const response = await fetch(`/api/comments/${id}`);
    if (response.ok) {
        const comments = await response.json();
        dispatch(loadAllComments(comments));
        return comments;
    }
}

export const createComment = (comment, id) => async dispatch => {
    const response = await fetch(`/api/comments/new`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(comment)
    })
    console.log("response", response, id)

    if (response.ok) {
        const comment = await response.json();
        dispatch(addOneComment(comment))
        return comment
    }
}

export const getSingleComment = (id) => async dispatch => {
    const response = await fetch(`/api/comments/list/${id}`)
    if (response.ok) {
        const comment = await response.json();
        dispatch(loadOneComment(comment))
        return comment;
    }
}

export const editSingleComment = (comment) => async dispatch => {
    console.log("store COMMMMMMENT", comment)
    const response = await fetch(`/api/comments/${comment.id}`, {
        method: "PUT",
        body: JSON.stringify(comment)
    });
    if (response.ok) {
        const comment = await response.json();
        dispatch(editComment(comment))
        return comment;
    }
}

export const deleteComment = (id) => async dispatch => {
    const response = await fetch(`/api/comments/list/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
          },
    });
    console.log("inDelCom")

    if (response.ok) {
        const comment = await response.json();
        dispatch(removeComment(comment))
    }
}

const initialState = {};

const commentReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD: {
            newState = Object.assign({}, state) //assign current state to newState
            newState.getAllComments = action.getAllComments; //run getAllInstruments on newState
            return newState;
        }

        case LOAD_ONE_COMMENT: {
            return {
                ...state,
                loadOneComment: action.loadOneComment
            }
        }

        case ADD_COMMENT: {
            return {
                ...state,
                addComment: action.addComment
            }
        }

        case DELETE_COMMENT: {
            return {
                ...state,
                deleteComment: action.deleteComment
            }
        }

        case EDIT_COMMENT: {
            return {
                ...state,
                editComment: action.editComment
            }
        }
        default:
            return state;
    }

}

export default commentReducer;
