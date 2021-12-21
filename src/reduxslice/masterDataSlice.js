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
        structuralPosition: {
            kodeJabatanStruktural: "",
            namaJabatan: ""
        },
        functionalPosition: {
            kodeJabatanFungsional: "",
            namaJabatan: ""
        },
        additionalPosition: {
            kodeJabatanTambahan: "",
            namaJabatan: ""
        },
        units: {
            kodeUPT: "",
            upt: ""
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
        setStructuralPosition: (state, data) => {
            state.structuralPosition = data.payload
        },
        setFunctionalPosition: (state, data) => {
            state.functionalPosition = data.payload
        },
        setAdditionalPosition: (state, data) => {
            state.additionalPosition = data.payload
        },
        setUnits: (state, data) => {
            state.units = data.payload
        },
    }

})

export const {
    setReligion,
    setTraining,
    setSalary,
    setGroup,
    setEducation,
    setStructuralPosition,
    setFunctionalPosition,
    setAdditionalPosition,
    setUnits,
} = masterDataSlice.actions

export default masterDataSlice.reducer