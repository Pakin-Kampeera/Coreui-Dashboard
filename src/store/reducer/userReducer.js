import {createSlice} from '@reduxjs/toolkit';

const userReducer = createSlice({
    name: 'users',
    initialState: {
        account: []
    },
    reducers: {
        setUserRoles(state, action) {
            state.account = action.payload.account;
        }
    }
});

export const usersAction = userReducer.actions;

export default userReducer;
