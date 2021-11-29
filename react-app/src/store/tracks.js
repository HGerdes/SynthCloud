const GET_TRACKS = "/TRACKS/getTracks"
const GET_ONE_TRACK = "/TRACKS/getOneTrack"
const UPDATE_TRACK = "/TRACK/updateTrack"
const DELETE_TRACK = "/TRACK/deleteTrack"
const ADD_TRACK = "/TRACK/createTrack"
const SEARCH_TRACKS = "/TRACK/searchTracks"
const GET_ARTISTS = "/TRACK/getArtist"

const getTracks = (getAllTracks) => {
    return {
        type: GET_TRACKS,
        getAllTracks
    }
}

const getOneTrack = (getOneTrack) => {
    return {
        type: GET_ONE_TRACK,
        getOneTrack
    }
}

const updateTrack = (updateTrack) => {
    return {
        type: UPDATE_TRACK,
        updateTrack
    }
}

const deleteTrack = (deleteTrack) => {
    return {
        type: DELETE_TRACK,
        deleteTrack
    }
}

const addTrack = (addTrack) => {
    return {
        type: ADD_TRACK,
        addTrack
    }
}

const searchTracks = (tracks) => {
    return {
        type: SEARCH_TRACKS,
        tracks
    }
}

const loadArtists = (loadArtists) => {
    return {
        type: GET_ARTISTS,
        loadArtists
    }
}

//Put on your thunkin cap because it's time for some thunkin
export const allTracks = () => async (dispatch) => {
    const response = await fetch("/api/tracks/")
    if (response.ok) {
        const data = await response.json();
        dispatch(getTracks(data));
        return data;
    }
};

export const loadOneTrack = (id) => async (dispatch) => {
    const response = await fetch(`/api/tracks/${id}`);
    if (response.ok) {
        const oneTrack = await response.json();
        dispatch(getOneTrack(oneTrack));
        return oneTrack;
    }
};

export const editTrack = (track) => async dispatch => {
    const response = await fetch(`/api/tracks/${track.id}/update`, {
        method: "PATCH",
        body: JSON.stringify(track)
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(updateTrack(data))
        return data;
    }
}

export const removeTrack = (track) => async dispatch => {
    const response = await fetch(`/api/tracks/${track}`, {
        method: "DELETE"
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(deleteTrack(data))
    }
}

export const createTrack = (fileForm) => async dispatch => {
    const {
        user_id,
        album_id,
        genre_id,
        name,
        file,
        image_url
    } = fileForm;

    const form = new FormData();
    form.append("user_id", user_id);
    form.append("album_id", album_id);
    form.append("genre_id", genre_id);
    form.append("name", name);
    form.append("file", file);
    form.append("image_url", image_url);

    console.log("FILEFORM", form)

    const response = await fetch(`/api/tracks/new`, {
        method: "POST",
        body: form

    })
    // console.log("REEEEEEEEEEEEEEEEE", response.body)
    // if (response.ok) {
    //     const data = await response.json();
    //     console.log("DAAAATA", data)
    //     dispatch(addTrack(data))
    // }
}

export const findTracks = (results) => async (dispatch) => {
    const object = {results:results}
    const res = await fetch("/api/tracks/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(object)
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(searchTracks(data))
    }
}

export const getTrackArtists = () => async dispatch => {
    const response = await fetch("/api/tracks/artist");

    if (response.ok) {
        const artists = await response.json();
        dispatch(loadArtists(artists));
        console.log(artists)
        return artists;
    }
}


//Reducer
const initialState = {};

const trackReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_TRACKS: {
            newState = Object.assign({}, state)
            newState.getAllTracks = action.getAllTracks;
            return newState;
        }

        case GET_ONE_TRACK: {
            return {
                ...state,
                getOneTrack: action.getOneTrack
            }
        }

        case UPDATE_TRACK: {
            return {
                ...state,
                updateTrack: action.updateTrack
            }
        }

        case DELETE_TRACK: {
            return {
                ...state,
                deleteTrack: action.deleteTrack
            }
        }

        case ADD_TRACK: {
            return {
                ...state,
                addTrack: action.addTrack
            }
        }

        case SEARCH_TRACKS: {
            return {
                ...state,
                searchTracks: action.tracks
            }
        }

        case GET_ARTISTS: {
            return {
                ...state,
                loadArtists: action.loadArtists
            }
        }
        default:
            return state;
    }
}

export default trackReducer;
