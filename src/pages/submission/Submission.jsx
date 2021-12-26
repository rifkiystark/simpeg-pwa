import Table from "../../components/table/Table"

function Submission() {
    let columnsData = {
        jabatanFungsionalTambahans: [
            {
                name: "No",
                key: "",
                render: (data, index, rowData) => (index + 1),
            },
            {
                name: "Nama Pegawai",
                key: "",
                render: (data, index, rowData) => rowData.list_pegawai.nama,
            },
            {
                name: "Nama Jabatan",
                key: "",
                render: (data, index, rowData) => rowData.jabatanfungsionalt.tugas_tambahan,
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
                render: (data, index, rowData) => <a href={rowData.dokumen_sk} target="_blank" rel="noreferrer">Dokumen</a>,
            },
            {
                name: "Di Update Oleh",
                key: "",
                render: (data, index, rowData) => rowData.updated_by.name,
            },
            {
                name: "Aksi",
                key: "",
                render: (data, index, rowData) => <a className="btn btn-primary btn-sm" href={rowData.id_jbtft}>Verifikasi</a>,
            },
        ],
        jabatanFungsionals: [
            {
                name: "No",
                key: "",
                render: (data, index, rowData) => (index + 1),
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
                render: (data, index, rowData) => <a href={rowData.dokumen_sk} target="_blank" rel="noreferrer">Dokumen</a>,
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
            {
                name: "Aksi",
                key: "",
                render: (data, index, rowData) => <a className="btn btn-primary btn-sm" href={rowData.id_jbtft}>Verifikasi</a>,
            },
        ],
        jabatanStrukturals: [
            {
                name: "No",
                key: "",
                render: (data, index, rowData) => (index + 1),
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
                render: (data, index, rowData) => <a href={rowData.dokumen_sk} target="_blank" rel="noreferrer">Dokumen</a>,
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
            {
                name: "Aksi",
                key: "",
                render: (data, index, rowData) => <a className="btn btn-primary btn-sm" href={rowData.id_jbtft}>Verifikasi</a>,
            },

        ],
        gapoks: [
            {
                name: "No",
                key: "",
                render: (data, index, rowData) => (index + 1),
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
                render: (data, index, rowData) => <a href={rowData.dokumen_sk} target="_blank" rel="noreferrer">Dokumen</a>,
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
            {
                name: "Aksi",
                key: "",
                render: (data, index, rowData) => <a className="btn btn-primary btn-sm" href={rowData.id_jbtft}>Verifikasi</a>,
            },
        ],
        diklats: [
            {
                name: "No",
                key: "",
                render: (data, index, rowData) => (index + 1),
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
                render: (data, index, rowData) => <a href={rowData.dokumen_sk} target="_blank" rel="noreferrer">Dokumen</a>,
            },
            {
                name: "Di Update Oleh",
                key: "",
                render: (data, index, rowData) => rowData.updated_by.name,
            },
            {
                name: "Aksi",
                key: "",
                render: (data, index, rowData) => <a className="btn btn-primary btn-sm" href={rowData.id_jbtft}>Verifikasi</a>,
            },
        ]
    }
    let dummyData = {
        jabatanFungsionalTambahans: [
            {
                id_jbtft: 7,
                id_peg: 41,
                no_sk: "12398o12893h",
                tgl_sk: "2021-12-23",
                pejabat_sk: "Budi",
                kode_jbtft: 7,
                tmt: "2021-12-23",
                created_at: "2021-12-25T05:03:38.000000Z",
                updated_at: "2021-12-25T05:03:38.000000Z",
                updated_by: {
                    id: 437,
                    name: "Ananda Rifkiy Hasan",
                    email: "ananda.rifkiy32@gmail.com",
                    email_verified_at: "2021-12-09T07:08:13.000000Z",
                    level: "pegawai",
                    created_at: "2021-10-15T06:02:42.000000Z",
                    updated_at: "2021-12-09T07:08:13.000000Z",
                    role: null,
                },
                status: 0,
                tamat_jabatan: "2021-12-16",
                dokumen_sk: "fungsionaltambahan-2679f4f36ffec2e7d2b1b232f3b9010e.png",
                jabatanfungsionalt: {
                    kode_jbtft: 7,
                    tugas_tambahan: "Resepsionis",
                    jabatan: null,
                    level: null,
                    ket: null,
                    created_at: "2021-06-18T20:39:17.000000Z",
                    updated_at: "2021-06-18T20:39:17.000000Z",
                },
                list_pegawai: {
                    id_peg: 41,
                    nip: "2384728999",
                    nama: "Ananda Rifkiy Hasan",
                    nip_lama: "8927984234986",
                    t_lahir: "laksd",
                    tgl_lahir: "2000-01-04",
                    jns_kelamin: "P",
                    kode_agama: 1,
                    sts_marital: "Belum Menikah",
                    kode_pdd: 5,
                    nama_sekolah: "ittp",
                    tahun_sttb: "2020",
                    gelar_depan: null,
                    gelar_belakang: null,
                    hobi: "beranang",
                    sts_pegawai: "Tetap",
                    id_user: 437,
                    no_telp: "81263761723",
                    foto: "profile-2384728999.png",
                    created_at: "2021-12-09T07:08:13.000000Z",
                    updated_at: "2021-12-09T07:08:13.000000Z",
                    id_upt: 2,
                    nik: "09878969588",
                    alamat_ktp: "kjhaskjd",
                    alamat_domisili: "klsndj",
                    sts_keaktifan: "Aktif",
                    tmt: "2000-03-02",
                },
            }
        ],
        jabatanFungsionals: [
            {
                id_jabatanf: 5,
                id_peg: 41,
                no_sk: "12398o12893h",
                tgl_sk: "2021-12-06",
                pejabat_sk: "Ahi",
                kode_jbtf: 3,
                tmt: "2021-12-01",
                kode_gol: 2,
                ket: "-",
                created_at: "2021-12-25T05:03:01.000000Z",
                updated_at: "2021-12-25T05:03:01.000000Z",
                updated_by: {
                    id: 437,
                    name: "Ananda Rifkiy Hasan",
                    email: "ananda.rifkiy32@gmail.com",
                    email_verified_at: "2021-12-09T07:08:13.000000Z",
                    level: "pegawai",
                    created_at: "2021-10-15T06:02:42.000000Z",
                    updated_at: "2021-12-09T07:08:13.000000Z",
                    role: null,
                },
                status: 0,
                tamat_jabatan: "2021-12-31",
                dokumen_sk: "fungsional-2679f4f36ffec2e7d2b1b232f3b9010e.png",
                jabatanfungsional: {
                    kode_jbtf: 3,
                    nama_jabatan: "Guru madya",
                    level: null,
                    ket: null,
                    created_at: "2021-03-23T06:12:35.000000Z",
                    updated_at: "2021-03-23T06:12:35.000000Z",
                },
                list_pegawai: {
                    id_peg: 41,
                    nip: "2384728999",
                    nama: "Ananda Rifkiy Hasan",
                    nip_lama: "8927984234986",
                    t_lahir: "laksd",
                    tgl_lahir: "2000-01-04",
                    jns_kelamin: "P",
                    kode_agama: 1,
                    sts_marital: "Belum Menikah",
                    kode_pdd: 5,
                    nama_sekolah: "ittp",
                    tahun_sttb: "2020",
                    gelar_depan: null,
                    gelar_belakang: null,
                    hobi: "beranang",
                    sts_pegawai: "Tetap",
                    id_user: 437,
                    no_telp: "81263761723",
                    foto: "profile-2384728999.png",
                    created_at: "2021-12-09T07:08:13.000000Z",
                    updated_at: "2021-12-09T07:08:13.000000Z",
                    id_upt: 2,
                    nik: "09878969588",
                    alamat_ktp: "kjhaskjd",
                    alamat_domisili: "klsndj",
                    sts_keaktifan: "Aktif",
                    tmt: "2000-03-02",
                },
            }
        ],
        jabatanStrukturals: [
            {
                id_jabatan: 5,
                id_peg: 41,
                no_sk: "12",
                tgl_sk: "2021-12-03",
                pejabat_sk: "wdwg",
                kode_jbts: 3,
                tmt: "2021-12-02",
                kode_gol: 2,
                ket: "wrw",
                created_at: "2021-12-25T05:02:29.000000Z",
                updated_at: "2021-12-25T05:02:29.000000Z",
                updated_by: {
                    id: 437,
                    name: "Ananda Rifkiy Hasan",
                    email: "ananda.rifkiy32@gmail.com",
                    email_verified_at: "2021-12-09T07:08:13.000000Z",
                    level: "pegawai",
                    created_at: "2021-10-15T06:02:42.000000Z",
                    updated_at: "2021-12-09T07:08:13.000000Z",
                    role: null,
                },
                status: 0,
                dokumen_sk: "struktural-1c65cef3dfd1e00c0b03923a1c591db4.jpg",
                tamat_jabatan: "2021-12-02",
                jabatanstruktural: {
                    kode_jbts: 3,
                    nama_jabatan: "Pegawai",
                    eselon: null,
                    level: null,
                    ket: null,
                    created_at: "2021-06-12T03:08:28.000000Z",
                    updated_at: "2021-06-12T03:08:28.000000Z",
                },
                list_pegawai: {
                    id_peg: 41,
                    nip: "2384728999",
                    nama: "Ananda Rifkiy Hasan",
                    nip_lama: "8927984234986",
                    t_lahir: "laksd",
                    tgl_lahir: "2000-01-04",
                    jns_kelamin: "P",
                    kode_agama: 1,
                    sts_marital: "Belum Menikah",
                    kode_pdd: 5,
                    nama_sekolah: "ittp",
                    tahun_sttb: "2020",
                    gelar_depan: null,
                    gelar_belakang: null,
                    hobi: "beranang",
                    sts_pegawai: "Tetap",
                    id_user: 437,
                    no_telp: "81263761723",
                    foto: "profile-2384728999.png",
                    created_at: "2021-12-09T07:08:13.000000Z",
                    updated_at: "2021-12-09T07:08:13.000000Z",
                    id_upt: 2,
                    nik: "09878969588",
                    alamat_ktp: "kjhaskjd",
                    alamat_domisili: "klsndj",
                    sts_keaktifan: "Aktif",
                    tmt: "2000-03-02",
                },
            }
        ],
        gapoks: [
            {
                id_gapok: 5,
                id_peg: 41,
                no_sk: "12321",
                tgl_sk: "2021-12-08",
                pejabat_sk: "Budi",
                kode_gapok: 1,
                tmt: "2021-12-22",
                naik_selanjutnya: "2021-12-31",
                ket: "-",
                created_at: "2021-12-25T05:02:09.000000Z",
                updated_at: "2021-12-25T05:02:09.000000Z",
                updated_by: {
                    id: 437,
                    name: "Ananda Rifkiy Hasan",
                    email: "ananda.rifkiy32@gmail.com",
                    email_verified_at: "2021-12-09T07:08:13.000000Z",
                    level: "pegawai",
                    created_at: "2021-10-15T06:02:42.000000Z",
                    updated_at: "2021-12-09T07:08:13.000000Z",
                    role: null,
                },
                status: 0,
                dokumen_sk: "gapok-4680c0c5b13db8f0da7ea34cf746826b.png",
                gapok: {
                    kode_gapok: 1,
                    masa_kerja: 1,
                    PP: "200000",
                    kode_gol: "GP-1",
                    gapok: 1000000,
                    created_at: "2021-03-23T06:05:05.000000Z",
                    updated_at: "2021-03-23T06:05:05.000000Z",
                },
                list_pegawai: {
                    id_peg: 41,
                    nip: "2384728999",
                    nama: "Ananda Rifkiy Hasan",
                    nip_lama: "8927984234986",
                    t_lahir: "laksd",
                    tgl_lahir: "2000-01-04",
                    jns_kelamin: "P",
                    kode_agama: 1,
                    sts_marital: "Belum Menikah",
                    kode_pdd: 5,
                    nama_sekolah: "ittp",
                    tahun_sttb: "2020",
                    gelar_depan: null,
                    gelar_belakang: null,
                    hobi: "beranang",
                    sts_pegawai: "Tetap",
                    id_user: 437,
                    no_telp: "81263761723",
                    foto: "profile-2384728999.png",
                    created_at: "2021-12-09T07:08:13.000000Z",
                    updated_at: "2021-12-09T07:08:13.000000Z",
                    id_upt: 2,
                    nik: "09878969588",
                    alamat_ktp: "kjhaskjd",
                    alamat_domisili: "klsndj",
                    sts_keaktifan: "Aktif",
                    tmt: "2000-03-02",
                },
            }
        ],
        diklats: [
            {
                id_diklat: 3,
                id_peg: 6,
                kode_diklat: 1,
                nama_diklat: "aaa",
                tgl_mulai: "2021-12-02",
                tgl_selesai: "2021-12-18",
                no_sertifikat: "3445",
                thn_sertifikat: "343",
                penyelenggara: "fdg",
                created_at: "2021-12-11T17:45:52.000000Z",
                updated_at: "2021-12-11T17:39:59.000000Z",
                updated_by: {
                    id: 438,
                    name: "d",
                    email: "teguhrijanandi02@gmail.com",
                    email_verified_at: "2021-12-08T08:02:50.000000Z",
                    level: "adminunit",
                    created_at: "2021-10-15T06:02:42.000000Z",
                    updated_at: "2021-12-08T08:02:50.000000Z",
                    role: null,
                },
                status: 0,
                dokumen_sk: "diklat-e53a38d5db38103ca6c1a7511ba64fd9.png",
                diklat: {
                    kode_diklat: 1,
                    jenis_diklat: "Tingkat Kabupaten",
                    ket: null,
                    created_at: "2021-03-23T06:03:36.000000Z",
                    updated_at: "2021-03-23T06:03:36.000000Z",
                },
                list_pegawai: {
                    id_peg: 6,
                    nip: "12345678",
                    nama: "Admin YPPMNU",
                    nip_lama: "123456789",
                    t_lahir: "Banyumas",
                    tgl_lahir: "1993-06-09",
                    jns_kelamin: "L",
                    kode_agama: 1,
                    sts_marital: "Menikah",
                    kode_pdd: 6,
                    nama_sekolah: "ITTP",
                    tahun_sttb: "2006",
                    gelar_depan: "Prof",
                    gelar_belakang: "S.Ag",
                    hobi: "Berkuda",
                    sts_pegawai: "Tetap",
                    id_user: 9,
                    no_telp: "0987654321232",
                    foto: "12345678.png",
                    created_at: "2021-11-25T08:57:41.000000Z",
                    updated_at: "2021-11-25T08:57:41.000000Z",
                    id_upt: 2,
                    nik: "43433434",
                    alamat_ktp: "er s",
                    alamat_domisili: "er",
                    sts_keaktifan: "Aktif",
                    tmt: null,
                },
            }
        ],
    }
    return (
        <div className="page-wrapper">
            <div className="container-xl">
                <div className="page-header d-print-none">
                    <div className="row align-items-center">
                        <div className="col">
                            <div className="page-pretitle">Halaman Pengajuan</div>
                            <h2 className="page-title">Pengajuan Kompetensi</h2>
                        </div>
                    </div>
                </div>
            </div>

            <section className="page-body">
                <div className="container-xl">
                    <div className="card card-primary card-outline">
                        <div className="card-body">
                            <ul className="nav nav-pills mb-3">
                                <li className="nav-item">
                                    <a href="#navpills-diklat" className="nav-link active show" data-bs-toggle="tab" aria-expanded="false">Diklat</a>
                                </li>
                                <li className="nav-item">
                                    <a href="#navpills-gapok" className="nav-link" data-bs-toggle="tab" aria-expanded="false">Gapok</a>
                                </li>
                                <li className="nav-item">
                                    <a href="#navpills-jabatan" className="nav-link" data-bs-toggle="tab" aria-expanded="false">Jabatan Struktural</a>
                                </li>
                                <li className="nav-item">
                                    <a href="#navpills-fungsional" className="nav-link" data-bs-toggle="tab" aria-expanded="false">Jabatan Fungsional</a>
                                </li>
                                <li className="nav-item">
                                    <a href="#navpills-tambahan" className="nav-link" data-bs-toggle="tab" aria-expanded="false">Jabatan Tambahan</a>
                                </li>
                            </ul>
                            <div className="tab-content br-n pn">
                                <div id="navpills-diklat" className="tab-pane active show">
                                    <Table data={{ data: dummyData.diklats, column: columnsData.diklats }} tableName="Data Jabatan Tambahan" />
                                </div>
                                <div id="navpills-gapok" className="tab-pane">
                                    <Table data={{ data: dummyData.gapoks, column: columnsData.gapoks }} tableName="Data Jabatan Tambahan" />
                                </div>
                                <div id="navpills-jabatan" className="tab-pane">
                                    <Table data={{ data: dummyData.jabatanStrukturals, column: columnsData.jabatanStrukturals }} tableName="Data Jabatan Tambahan" />
                                </div>
                                <div id="navpills-fungsional" className="tab-pane">
                                    <Table data={{ data: dummyData.jabatanFungsionals, column: columnsData.jabatanFungsionals }} tableName="Data Jabatan Tambahan" />
                                </div>
                                <div id="navpills-tambahan" className="tab-pane">
                                    <Table data={{ data: dummyData.jabatanFungsionalTambahans, column: columnsData.jabatanFungsionalTambahans }} tableName="Data Jabatan Tambahan" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Submission