import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reduxslice/userSlice';
import masterDataReducer from './reduxslice/masterDataSlice';
import meReducer from './reduxslice/meSlice';
import competenceReducer from './reduxslice/competenceDataSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    masterData: masterDataReducer,
    me: meReducer,
    competence: competenceReducer
  },
});