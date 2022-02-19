let submissionColumn = {
  jabatanFungsionalTambahans: [
    {
      name: "No",
      key: "",
      render: (data, index, rowData) => index + 1,
    },
    {
      name: "Nama Pegawai",
      key: "",
      render: (data, index, rowData) => rowData.list_pegawai.nama,
    },
    {
      name: "Nama Jabatan",
      key: "",
      render: (data, index, rowData) =>
        rowData.jabatanfungsionalt.tugas_tambahan,
    },
    {
      name: "No SK",
      key: "",
      render: (data, index, rowData) => rowData.no_sk,
    },
    {
      name: "Tanggal SK",
      key: "",
      render: (data, index, rowData) => rowData.tgl_sk,
    },
    {
      name: "Pejabat Pengesah",
      key: "",
      render: (data, index, rowData) => rowData.pejabat_sk,
    },
    {
      name: "Terhitung Mulai",
      key: "",
      render: (data, index, rowData) => rowData.tmt,
    },
    {
      name: "Tamat Jabatan",
      key: "",
      render: (data, index, rowData) => rowData.tamat_jabatan,
    },
    {
      name: "Dokumen SK",
      key: "",
      render: (data, index, rowData) => (
        <a href={rowData.dokumen_sk} target="_blank" rel="noreferrer">
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
  jabatanFungsionals: [
    {
      name: "No",
      key: "",
      render: (data, index, rowData) => index + 1,
    },
    {
      name: "Nama Pegawai",
      key: "",
      render: (data, index, rowData) => rowData.list_pegawai.nama,
    },
    {
      name: "Nama Jabatan",
      key: "",
      render: (data, index, rowData) => rowData.jabatanfungsional.nama_jabatan,
    },
    {
      name: "No SK",
      key: "",
      render: (data, index, rowData) => rowData.no_sk,
    },
    {
      name: "Tanggal SK",
      key: "",
      render: (data, index, rowData) => rowData.tgl_sk,
    },
    {
      name: "Pejabat Pengesah",
      key: "",
      render: (data, index, rowData) => rowData.pejabat_sk,
    },
    {
      name: "Terhitung Mulai",
      key: "",
      render: (data, index, rowData) => rowData.tmt,
    },
    {
      name: "Tamat Jabatan",
      key: "",
      render: (data, index, rowData) => rowData.tamat_jabatan,
    },
    {
      name: "Dokumen SK",
      key: "",
      render: (data, index, rowData) => (
        <a href={rowData.dokumen_sk} target="_blank" rel="noreferrer">
          Dokumen
        </a>
      ),
    },
    {
      name: "Keterangan Riwayat",
      key: "",
      render: (data, index, rowData) => rowData.ket,
    },
    {
      name: "Di Update Oleh",
      key: "",
      render: (data, index, rowData) => rowData.updated_by.name,
    },
  ],
  jabatanStrukturals: [
    {
      name: "No",
      key: "",
      render: (data, index, rowData) => index + 1,
    },
    {
      name: "Nama Pegawai",
      key: "",
      render: (data, index, rowData) => rowData.list_pegawai.nama,
    },
    {
      name: "Nama Jabatan",
      key: "",
      render: (data, index, rowData) => rowData.jabatanstruktural.nama_jabatan,
    },
    {
      name: "No SK",
      key: "",
      render: (data, index, rowData) => rowData.no_sk,
    },
    {
      name: "Tanggal SK",
      key: "",
      render: (data, index, rowData) => rowData.tgl_sk,
    },
    {
      name: "Pejabat Pengesah",
      key: "",
      render: (data, index, rowData) => rowData.pejabat_sk,
    },
    {
      name: "Terhitung Mulai",
      key: "",
      render: (data, index, rowData) => rowData.tmt,
    },
    {
      name: "Tamat Jabatan",
      key: "",
      render: (data, index, rowData) => rowData.tamat_jabatan,
    },
    {
      name: "Dokumen SK",
      key: "",
      render: (data, index, rowData) => (
        <a href={rowData.dokumen_sk} target="_blank" rel="noreferrer">
          Dokumen
        </a>
      ),
    },
    {
      name: "Keterangan Riwayat",
      key: "",
      render: (data, index, rowData) => rowData.ket,
    },
    {
      name: "Di Update Oleh",
      key: "",
      render: (data, index, rowData) => rowData.updated_by.name,
    },
  ],
  gapoks: [
    {
      name: "No",
      key: "",
      render: (data, index, rowData) => index + 1,
    },
    {
      name: "Nama Pegawai",
      key: "",
      render: (data, index, rowData) => rowData.list_pegawai.nama,
    },
    {
      name: "No SK",
      key: "",
      render: (data, index, rowData) => rowData.no_sk,
    },
    {
      name: "Tanggal SK",
      key: "",
      render: (data, index, rowData) => rowData.tgl_sk,
    },
    {
      name: "Pejabat Pengesah",
      key: "",
      render: (data, index, rowData) => rowData.pejabat_sk,
    },
    {
      name: "Terhitung Mulai",
      key: "",
      render: (data, index, rowData) => rowData.tmt,
    },
    {
      name: "Naik Selanjutnya",
      key: "",
      render: (data, index, rowData) => rowData.naik_selanjutnya,
    },
    {
      name: "Dokumen SK",
      key: "",
      render: (data, index, rowData) => (
        <a href={rowData.dokumen_sk} target="_blank" rel="noreferrer">
          Dokumen
        </a>
      ),
    },
    {
      name: "Keterangan Riwayat",
      key: "",
      render: (data, index, rowData) => rowData.ket,
    },
    {
      name: "Di Update Oleh",
      key: "",
      render: (data, index, rowData) => rowData.updated_by.name,
    },
  ],
  diklats: [
    {
      name: "No",
      key: "",
      render: (data, index, rowData) => index + 1,
    },
    {
      name: "Nama Pegawai",
      key: "",
      render: (data, index, rowData) => rowData.list_pegawai.nama,
    },
    {
      name: "Nama Diklat",
      key: "",
      render: (data, index, rowData) => rowData.nama_diklat,
    },
    {
      name: "Jenis Diklat",
      key: "",
      render: (data, index, rowData) => rowData.diklat.jenis_diklat,
    },
    {
      name: "Tanggal Mulai",
      key: "",
      render: (data, index, rowData) => rowData.tgl_mulai,
    },
    {
      name: "Tanggal Selesai",
      key: "",
      render: (data, index, rowData) => rowData.tgl_selesai,
    },
    {
      name: "Nomor Sertifikat",
      key: "",
      render: (data, index, rowData) => rowData.no_sertifikat,
    },
    {
      name: "Tahun Sertifikat",
      key: "",
      render: (data, index, rowData) => rowData.thn_sertifikat,
    },
    {
      name: "Penyelenggara",
      key: "",
      render: (data, index, rowData) => rowData.penyelenggara,
    },
    {
      name: "Dokumen Diklat",
      key: "",
      render: (data, index, rowData) => (
        <a href={rowData.dokumen_sk} target="_blank" rel="noreferrer">
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
};

export { submissionColumn };
