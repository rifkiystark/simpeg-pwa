import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reduxslice/userSlice';

export default configureStore({
  reducer: {
      user: userReducer
  },
})