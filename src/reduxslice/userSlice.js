import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        nama: "",
        email: "",
        level: "",
    },
    reducers: {
        setUser: (state, user) => {
            return state = user.payload
        }
    }

})

export const { setUser } = userSlice.actions

export default userSlice.reducer