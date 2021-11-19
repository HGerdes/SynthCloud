const GET_GENRES = "/GENRES/getGenres"

const getGenres = (getAllGenres) => {
    return {
        type: GET_GENRES,
        getAllGenres
    }
}

export const allGenres = () => async (dispatch) => {
    const response = await fetch("/api/genres/")
    if (response.ok) {
        const data = await response.json();
        dispatch(allGenres(data));
        return data;
    }
}

const initialState = {};

const genreReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_GENRES: {
            newState = Object.assign({}, state);
            newState.allGenres = action.allGenres;
            return newState;
        }
        default:
            return state;
    }
}

export default genreReducer;
