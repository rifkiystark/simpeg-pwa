let tableApproved = {
  column: [
    {
      name: "No",
      key: "",
      render: (data, index, rowData) => index + 1,
    },
    {
      name: "Nama Jabatan",
      key: "",
      render: (data, index, rowData) =>
        rowData.jabatanfungsionalt.tugas_tambahan,
    },
    {
      name: "No SK",
      key: "no_sk",
      render: (data, index, rowData) => data,
    },
    {
      name: "Tanggal SK",
      key: "tgl_sk",
      render: (data, index, rowData) => data,
    },
    {
      name: "Pejabat Pengesah",
      key: "pejabat_sk",
      render: (data, index, rowData) => data,
    },
    {
      name: "Terhitung Mulai",
      key: "tmt",
      render: (data, index, rowData) => data,
    },
    {
      name: "Tamat Jabatan",
      key: "tamat_jabatan",
      render: (data, index, rowData) => data,
    },
    {
      name: "Dokumen SK",
      key: "dokumen_sk",
      render: (data, index, rowData) => (
        <a href={data} target="_blank" rel="noreferrer">
          Dokumen
        </a>
      ),
    },
    {
      name: "Di Update Oleh",
      key: "",
      render: (data, index, rowData) => rowData.updated_by.name,
    },
  ],
  data: [],
};
let tableSubmitted = {
  column: [
    {
      name: "No",
      key: "",
      render: (data, index, rowData) => index + 1,
    },
    {
      name: "Nama Jabatan",
      key: "",
      render: (data, index, rowData) =>
        rowData.jabatanfungsionalt.tugas_tambahan,
    },
    {
      name: "No SK",
      key: "no_sk",
      render: (data, index, rowData) => data,
    },
    {
      name: "Tanggal SK",
      key: "tgl_sk",
      render: (data, index, rowData) => data,
    },
    {
      name: "Pejabat Pengesah",
      key: "pejabat_sk",
      render: (data, index, rowData) => data,
    },
    {
      name: "Terhitung Mulai",
      key: "tmt",
      render: (data, index, rowData) => data,
    },
    {
      name: "Tamat Jabatan",
      key: "tamat_jabatan",
      render: (data, index, rowData) => data,
    },
    {
      name: "Dokumen SK",
      key: "dokumen_sk",
      render: (data, index, rowData) => (
        <a href={data} target="_blank" rel="noreferrer">
          Dokumen
        </a>
      ),
    },
    {
      name: "Di Update Oleh",
      key: "",
      render: (data, index, rowData) => rowData.updated_by.name,
    },
  ],
  data: [],
};

export { tableApproved, tableSubmitted };
