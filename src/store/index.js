import {configureStore} from '@reduxjs/toolkit';
import authReducer from './reducer/authReducer';
import dashboardReducer from './reducer/dashboardReduce';
import userReducer from './reducer/userReducer';

export default configureStore({
    reducer: {
        auth: authReducer.reducer,
        dashboard: dashboardReducer.reducer,
        user: userReducer.reducer
    }
});
