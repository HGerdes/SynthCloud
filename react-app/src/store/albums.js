const GET_ALBUMS = "/ALBUMS/getAlbums"

const getAlbums = (getAllAlbums) => {
    return {
        type: GET_ALBUMS,
        getAllAlbums
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
