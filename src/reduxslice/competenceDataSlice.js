import { createSlice } from "@reduxjs/toolkit";

export const competenceSlice = createSlice({
  name: "competence",
  initialState: {
    religion: {
      id: "",
      name: "",
    },
    training: {
      dokumen_sk: "",
      id_diklat: "",
      id_peg: "",
      kode_diklat: "",
      nama_diklat: "",
      no_sertifikat: "",
      penyelenggara: "",
      status: "",
      tgl_mulai: "",
      tgl_selesai: "",
      thn_sertifikat: "",
    },
    salary: {
      id_gapok: "",
      id_peg: "",
      no_sk: "",
      tgl_sk: "",
      pejabat_sk: "",
      kode_gapok: "",
      tmt: "",
      naik_selanjutnya: "",
      ket: "",
      status: "",
      dokumen_sk: "",
    },
    group: {
      kodeGolongan: "",
      pangkat: "",
    },
    education: {
      kodePendidikan: "",
      pendidikan: "",
    },
    structuralPosition: {
      kodeJabatanStruktural: "",
      namaJabatan: "",
    },
    functionalPosition: {
      kodeJabatanFungsional: "",
      namaJabatan: "",
    },
    additionalPosition: {
      kodeJabatanTambahan: "",
      namaJabatan: "",
    },
    units: {
      kodeUPT: "",
      upt: "",
    },
  },
  reducers: {
    setReligion: (state, data) => {
      state.religion = data.payload;
    },
    setTraining: (state, data) => {
      state.training = data.payload;
    },
    setSalary: (state, data) => {
      state.salary = data.payload;
    },
    setGroup: (state, data) => {
      state.group = data.payload;
    },
    setEducation: (state, data) => {
      state.education = data.payload;
    },
    setStructuralPosition: (state, data) => {
      state.structuralPosition = data.payload;
    },
    setFunctionalPosition: (state, data) => {
      state.functionalPosition = data.payload;
    },
    setAdditionalPosition: (state, data) => {
      state.additionalPosition = data.payload;
    },
    setUnits: (state, data) => {
      state.units = data.payload;
    },
  },
});

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
} = competenceSlice.actions;

export default competenceSlice.reducer;
