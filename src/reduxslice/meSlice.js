import { createSlice } from "@reduxjs/toolkit";

export const meSlice = createSlice({
    name: 'me',
    initialState: null,
    reducers: {
        setMe: (state, user) => {
            return state = user.payload
        },
    },

})

export const { setMe } = meSlice.actions

export default meSlice.reducer