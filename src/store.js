import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reduxslice/userSlice';
import masterDataReducer from './reduxslice/masterDataSlice';
import meReducer from './reduxslice/meSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    masterData: masterDataReducer,
    me: meReducer
  },
});