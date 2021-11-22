const LOAD_ALL_USERS = "user/LOAD_ALL_USERS";

const loadUsers = (getAllUsers, id) => ({
    type: LOAD_ALL_USERS,
    payload: getAllUsers, id
})

export const getUsers = () => async dispatch => {
    const response = await fetch("/api/users");
    if (response.ok) {
        const users = await response.json();
        dispatch(loadUsers(users));
        return users;
    }
}

const initialState = {};

const userReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_ALL_USERS: {
            newState = Object.assign({}, state) 
            newState.getAllUsers = action.getAllUsers;
            return newState;
        };
        default:
            return state;
    }
}

export default userReducer;
