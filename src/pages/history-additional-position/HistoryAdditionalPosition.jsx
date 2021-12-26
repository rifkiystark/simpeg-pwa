import Table from "../../components/table/Table"


function HistoryAdditionalPosition() {
    let dummyJabatanTambahan = {
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
        riwayatjabatanft: [
            {
                id_jbtft: 4,
                id_peg: 6,
                no_sk: "sas",
                tgl_sk: "2021-12-02",
                pejabat_sk: "ad",
                kode_jbtft: 5,
                tmt: "2021-12-01",
                created_at: "2021-12-08T16:15:47.000000Z",
                updated_at: "2021-12-08T16:15:47.000000Z",
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
                status: 1,
                tamat_jabatan: "2021-12-07",
                dokumen_sk: "fungsionaltambahan-2fd8bf298cbfca8f7a9525b28217e0fa.png",
                jabatanfungsionalt: {
                    kode_jbtft: 5,
                    tugas_tambahan: "Toolman",
                    jabatan: null,
                    level: null,
                    ket: null,
                    created_at: "2021-06-18T20:38:52.000000Z",
                    updated_at: "2021-06-18T20:38:52.000000Z",
                },
            }
        ],
    }

    let tableApproved = {
        column: [
            {
                name: "No",
                key: "",
                render: (data, index, rowData) => (index + 1),
            },
            {
                name: "Nama Jabatan",
                key: "",
                render: (data, index, rowData) => rowData.jabatanfungsionalt.tugas_tambahan,
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
                render: (data, index, rowData) => <a href={data} target="_blank" rel="noreferrer">Dokumen</a>,
            },
            {
                name: "Di Update Oleh",
                key: "",
                render: (data, index, rowData) => rowData.updated_by.name,
            },
            {
                name: "Aksi",
                key: "",
                render: (data, index, rowData) => (
                    <>
                        <a className="btn btn-primary btn-sm m-1" href="#">Edit</a>
                        <a className="btn btn-danger btn-sm m-1" href="#">Hapus</a>
                    </>
                ),
            },

        ],
        data: dummyJabatanTambahan.riwayatjabatanft.filter(data => data.status === 1)
    }
    let tableSubmitted = {
        column: [
            {
                name: "No",
                key: "",
                render: (data, index, rowData) => (index + 1),
            },
            {
                name: "Nama Jabatan",
                key: "",
                render: (data, index, rowData) => rowData.jabatanfungsionalt.tugas_tambahan,
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
                render: (data, index, rowData) => <a href={data} target="_blank" rel="noreferrer">Dokumen</a>,
            },
            {
                name: "Di Update Oleh",
                key: "",
                render: (data, index, rowData) => rowData.updated_by.name,
            },
            {
                name: "Aksi",
                key: "",
                render: (data, index, rowData) => (
                    <a className="btn btn-primary btn-sm m-1" href="#">Verifikasi</a>
                )
            },
        ],
        data: dummyJabatanTambahan.riwayatjabatanft.filter(data => data.status === 0)
    }
    return (
        <>
            <div className="page-wrapper">
                <div className="container-xl">
                    <div className="page-header d-print-none">
                        <div className="row mb-2">
                            <div className="col">
                                <a href="{{ url('/') }}/pegawai/profile/{{$pegawai->id_peg}}" className="btn btn-primary btn-sm">
                                    Kembali
                                </a>
                            </div>
                        </div>
                        <div className="row align-items-center">
                            <div className="col">
                                <div className="page-pretitle">Halaman Jabatan Tambahan</div>
                                <h2 className="page-title">Riwayat Jabatan Tambahan : Ananda Rifkiy Hasan</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="page-body pb-4">
                <div className="container-xl">
                    <div className="card card-primary card-outline mb-3">

                        <div className="card-body">
                            <h3 className="card-title">Data Jabatan Tambahan</h3>
                            <a href="{{ url('/') }}/pegawai/diklat/tambah/{{$pegawai->id_peg}}" className="btn btn-success mb-3">
                                Tambah
                            </a>
                            <Table data={tableApproved} tableName="Riwayat Jabatan Tambahan Disetujui" />
                        </div>
                    </div>
                    <div className="card card-primary card-outline">
                        <div className="card-body">
                            <h3 className="card-title">Data Ajuan Jabatan Tambahan</h3>
                            <Table data={tableSubmitted} tableName="Riwayat Jabatan Tambahan Diajukan" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}


export default HistoryAdditionalPosition
