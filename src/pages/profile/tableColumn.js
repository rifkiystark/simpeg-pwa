let maritalColumn = [
  {
    name: "No",
    key: "",
    render: (data, index, rowData) => index + 1,
  },
  {
    name: "Nama",
    key: "nama_istri_suami",
    render: (data, index, rowData) => data,
  },
  {
    name: "Tempat Lahir",
    key: "t_lahir",
    render: (data, index, rowData) => data,
  },
  {
    name: "Tanggal Lahir",
    key: "tgl_lahir",
    render: (data, index, rowData) => data,
  },
  {
    name: "Jenis Kelamin",
    key: "jns_kelamin",
    render: (data, index, rowData) => data,
  },
  {
    name: "Status Tunjangan",
    key: "sts_tunjangan",
    render: (data, index, rowData) => data,
  },
  {
    name: "Tanggal Pernikahan",
    key: "tgl_menikah",
    render: (data, index, rowData) => data,
  },
  {
    name: "Keterangan",
    key: "ket",
    render: (data, index, rowData) => data,
  },
];
let childColumn = [
  {
    name: "No",
    key: "",
    render: (data, index, rowData) => index + 1,
  },
  {
    name: "Nama",
    key: "nama_anak",
    render: (data, index, rowData) => data,
  },
  {
    name: "Tempat Lahir",
    key: "t_lahir",
    render: (data, index, rowData) => data,
  },
  {
    name: "Tanggal Lahir",
    key: "tgl_lahir",
    render: (data, index, rowData) => data,
  },
  {
    name: "Jenis Kelamin",
    key: "jns_kelamin",
    render: (data, index, rowData) => data,
  },
  {
    name: "Status Tunjangan",
    key: "sts_tunjangan",
    render: (data, index, rowData) => data,
  },
  {
    name: "Status Pernikahan",
    key: "sts_menikah",
    render: (data, index, rowData) => data,
  },
  {
    name: "Keterangan",
    key: "ket",
    render: (data, index, rowData) => data,
  },
];
let parentColumn = [
  {
    name: "No",
    key: "",
    render: (data, index, rowData) => index + 1,
  },
  {
    name: "Nama",
    key: "nama_ortu",
    render: (data, index, rowData) => data,
  },
  {
    name: "Tempat Lahir",
    key: "t_lahir",
    render: (data, index, rowData) => data,
  },
  {
    name: "Tanggal Lahir",
    key: "tgl_lahir",
    render: (data, index, rowData) => data,
  },
  {
    name: "Jenis Kelamin",
    key: "jns_kelamin",
    render: (data, index, rowData) => data,
  },
  {
    name: "Alamat",
    key: "alamat",
    render: (data, index, rowData) => data,
  },
  {
    name: "Pekerjaan",
    key: "pekerjaan",
    render: (data, index, rowData) => data,
  },
  {
    name: "Keterangan",
    key: "ket",
    render: (data, index, rowData) => data,
  },
];

export { maritalColumn, childColumn, parentColumn };
