const presenceTable = {
  column: [
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
        new Date(data * 1000).toLocaleTimeString(),
    },
    {
      name: "Waktu Pulang",
      key: "keluar",
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
  ],
  data: [],
};

export { presenceTable };
