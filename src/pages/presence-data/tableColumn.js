const allEmployeeColumn = [
  {
    name: "No",
    key: "",
    render: (data, index, rowData) => index + 1,
  },
  {
    name: "Nama",
    key: "nama",
    render: (data, index, rowData) => data,
  },
  {
    name: "WFH (Tepat Waktu)",
    key: "",
    render: (data, index, rowData) =>
      rowData.wfh?.filter((item) => item.keterangan.indexOf("erlambat") == -1)
        .length,
  },
  {
    name: "WFH (Terlambat)",
    key: "",
    render: (data, index, rowData) =>
      rowData.wfh?.filter((item) => item.keterangan.indexOf("erlambat") != -1)
        .length,
  },
  {
    name: "WFO (Tepat Waktu)",
    key: "",
    render: (data, index, rowData) =>
      rowData.wfo?.filter((item) => item.keterangan.indexOf("erlambat") == -1)
        .length,
  },
  {
    name: "WFO (Terlambat)",
    key: "",
    render: (data, index, rowData) =>
      rowData.wfo?.filter((item) => item.keterangan.indexOf("erlambat") != -1)
        .length,
  },
  {
    name: "Tidak Masuk",
    key: "notPresence",
    render: (data, index, rowData) =>
      rowData.totalDay - (rowData.wfo?.length + rowData.wfh?.length),
  },
  {
    name: "Total Masuk",
    key: "total",
    render: (data, index, rowData) => rowData.wfo?.length + rowData.wfh?.length,
  },
];

const oneEmployeeColumn = [
  {
    name: "No",
    key: "",
    render: (data, index, rowData) => index + 1,
  },
  {
    name: "Tanggal",
    key: "date",
    render: (data, index, rowData) => data,
  },
  {
    name: "Waktu Masuk",
    key: "masuk",
    render: (data, index, rowData) =>
      data != null ? new Date(data * 1000).toLocaleTimeString() : "-",
  },
  {
    name: "Waktu Pulang",
    key: "pulang",
    render: (data, index, rowData) =>
      data != null ? new Date(data * 1000).toLocaleTimeString() : "-",
  },
  {
    name: "Tipe",
    key: "type",
    render: (data, index, rowData) => data,
  },
  {
    name: "Keterangan",
    key: "keterangan",
    render: (data, index, rowData) => data,
  },
  {
    name: "Lokasi",
    key: "lokasi",
    render: (data, index, rowData) => data,
  },
];

export { allEmployeeColumn, oneEmployeeColumn };
