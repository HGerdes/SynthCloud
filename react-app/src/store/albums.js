const GET_ALBUMS = "/ALBUMS/getAlbums"
const SEARCH_ALBUMS = "/ALBUMS/searchAlbums"

const getAlbums = (getAllAlbums) => {
    return {
        type: GET_ALBUMS,
        getAllAlbums
    }
}

const searchAlbums = (albums) => {
    return {
        type: SEARCH_ALBUMS,
        albums
    }
}

export const findAlbums = (results) => async (dispatch) => {
    const res = await fetch("/api/albums/", {
        method: "POST",
        hearders: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({results})
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(searchAlbums(data))
    }
}



export const allAlbums = () => async (dispatch) => {
    const response = await fetch("/api/albums/")
    if (response.ok) {
        const data = await response.json();
        dispatch(getAlbums(data));
        return data;
    }
}

const initialState = {};

const albumReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_ALBUMS: {
            newState = Object.assign({}, state);
            newState.getAllAlbums = action.getAllAlbums;
            return newState;
        }
        default:
            return state;
    }
}

export default albumReducer;
