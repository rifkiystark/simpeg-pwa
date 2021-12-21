import { createSlice } from "@reduxjs/toolkit";

export const masterDataSlice = createSlice({
    name: 'masterData',
    initialState: {
        religion: {
            id: "",
            name: ""
        },
        training: {
            id: "",
            name: ""
        },
        salary: {
            kodeGapok: "",
            masaKerja: "",
            pp: "",
            kodeGolongan: "",
            gapok: "",

        },
        group: {
            kodeGolongan: "",
            pangkat: ""
        },
        education: {
            kodePendidikan: "",
            pendidikan: ""
        },
    },
    reducers: {
        setReligion: (state, data) => {
            state.religion = data.payload
        },
        setTraining: (state, data) => {
            state.training = data.payload
        },
        setSalary: (state, data) => {
            state.salary = data.payload
        },
        setGroup: (state, data) => {
            state.group = data.payload
        },
        setEducation: (state, data) => {
            state.education = data.payload
        },
    }

})

export const { setReligion, setTraining, setSalary, setGroup, setEducation } = masterDataSlice.actions

export default masterDataSlice.reducer