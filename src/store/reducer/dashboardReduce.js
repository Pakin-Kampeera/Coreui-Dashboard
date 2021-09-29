import {createSlice} from '@reduxjs/toolkit';

const dashboardReducer = createSlice({
    name: 'dashboard',
    initialState: {
        widget: {
            users: 0,
            messages: 0,
            stress: 0,
            nonStress: 0,
            cantTell: 0
        },
        table: [],
        stress: [],
        nonStress: [],
        average: {
            mapStress: [],
            mapNonStress: [],
            mapCantTell: []
        }
    },
    reducers: {
        setWidget(state, action) {
            const data = action.payload;
            state.widget.users = data.users;
            state.widget.messages = data.messages;
            state.widget.stress = data.stress;
            state.widget.nonStress = data.nonStress;
            state.widget.cantTell = data.cantTell;
        },
        setTable(state, action) {
            state.table = action.payload;
        },
        setWordCloud(state, action) {
            state.stress = action.payload.stress;
            state.nonStress = action.payload.nonStress;
        },
        setAverage(state, action) {
            state.average = action.payload;
        }
    }
});

export const dashboardAction = dashboardReducer.actions;

export default dashboardReducer;
