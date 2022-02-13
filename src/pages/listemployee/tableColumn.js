const employeeColumn = [
  {
    name: "No",
    key: "",
    render: (data, index, rowData) => index + 1,
  },
  {
    name: "NIP/NIPY",
    key: "nip",
    render: (data, index, rowData) => data,
  },
  {
    name: "NIP KTP",
    key: "nik",
    render: (data, index, rowData) => data,
  },
  {
    name: "Nama",
    key: "nama",
    render: (data, index, rowData) => data,
  },
  {
    name: "Jenis Kelamin",
    key: "jns_kelamin",
    render: (data, index, rowData) => data,
  },
  {
    name: "TTL",
    key: "",
    render: (data, index, rowData) => `${rowData.t_lahir} ${rowData.tgl_lahir}`,
  },
  {
    name: "TMT",
    key: "tmt",
    render: (data, index, rowData) => data,
  },
  {
    name: "Status Kepegawaian",
    key: "sts_pegawai",
    render: (data, index, rowData) => data,
  },
  {
    name: "Status Keaktifan",
    key: "sts_keaktifan",
    render: (data, index, rowData) => data,
  },
];

export { employeeColumn };
