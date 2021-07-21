import {createSlice} from '@reduxjs/toolkit';

const dashboardReducer = createSlice({
    name: 'dashboard',
    initialState: {
        widget: {
            users: 0,
            messages: 0,
            stress: 0,
            nonStress: 0
        },
        table: []
    },
    reducers: {
        setWidget(state, action) {
            const data = action.payload;
            state.widget.users = data.users;
            state.widget.messages = data.comments;
            state.widget.stress = data.stress;
            state.widget.nonStress = data.nonStress;
        },
        setTable(state, action) {
            state.table = action.payload;
        }
    }
});

export const dashboardAction = dashboardReducer.actions;

export default dashboardReducer;
