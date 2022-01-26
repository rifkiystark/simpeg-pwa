let tableApproved = {
  column: [
    {
      name: "No",
      key: "",
      render: (data, index, rowData) => index + 1,
    },
    {
      name: "Nama Diklat",
      key: "nama_diklat",
      render: (data, index, rowData) => data,
    },
    {
      name: "Jenis Diklat",
      key: "",
      render: (data, index, rowData) => rowData.diklat.jenis_diklat,
    },
    {
      name: "Tanggal Mulai",
      key: "tgl_mulai",
      render: (data, index, rowData) => data,
    },
    {
      name: "Tanggal Selesai",
      key: "tgl_selesai",
      render: (data, index, rowData) => data,
    },
    {
      name: "Nomor Sertifikat",
      key: "no_sertifikat",
      render: (data, index, rowData) => data,
    },
    {
      name: "Tahun Sertifikat",
      key: "thn_sertifikat",
      render: (data, index, rowData) => data,
    },
    {
      name: "Penyelenggara",
      key: "penyelenggara",
      render: (data, index, rowData) => data,
    },
    {
      name: "Dokumen Diklat",
      key: "dokumen_sk",
      render: (data, index, rowData) => (
        <a href={data} target="_blank">
          Dokumen
        </a>
      ),
    },
    {
      name: "Diupdate Oleh",
      key: "",
      render: (data, index, rowData) => rowData.updated_by.name,
    },
  ],
//   data: dummyDiklat.riwayatdiklat.filter((data) => data.status === 1),
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
      name: "Nama Diklat",
      key: "nama_diklat",
      render: (data, index, rowData) => data,
    },
    {
      name: "Jenis Diklat",
      key: "",
      render: (data, index, rowData) => rowData.diklat.jenis_diklat,
    },
    {
      name: "Tanggal Mulai",
      key: "tgl_mulai",
      render: (data, index, rowData) => data,
    },
    {
      name: "Tanggal Selesai",
      key: "tgl_selesai",
      render: (data, index, rowData) => data,
    },
    {
      name: "Nomor Sertifikat",
      key: "no_sertifikat",
      render: (data, index, rowData) => data,
    },
    {
      name: "Tahun Sertifikat",
      key: "thn_sertifikat",
      render: (data, index, rowData) => data,
    },
    {
      name: "Penyelenggara",
      key: "penyelenggara",
      render: (data, index, rowData) => data,
    },
    {
      name: "Dokumen Diklat",
      key: "dokumen_sk",
      render: (data, index, rowData) => (
        <a href={data} target="_blank">
          Dokumen
        </a>
      ),
    },
    {
      name: "Diupdate Oleh",
      key: "",
      render: (data, index, rowData) => rowData.updated_by.name,
    },
  ],
  data: [],
};

export { tableApproved, tableSubmitted };
