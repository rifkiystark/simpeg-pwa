import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reduxslice/userSlice';
import masterDataReducer from './reduxslice/masterDataSlice';

export default configureStore({
  reducer: {
      user: userReducer,
      masterData: masterDataReducer
  },
})