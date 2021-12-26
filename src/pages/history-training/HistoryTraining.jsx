import Table from "../../components/table/Table"


function HistoryTraining() {
    let dummyDiklat = {
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
        riwayatdiklat: [
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
            }
        ],
    }

    let tableApproved = {
        column: [
            {
                name: "No",
                key: "",
                render: (data, index, rowData) => (index + 1)
            },
            {
                name: "Nama Diklat",
                key: "nama_diklat",
                render: (data, index, rowData) => data
            },
            {
                name: "Jenis Diklat",
                key: "",
                render: (data, index, rowData) => rowData.diklat.jenis_diklat
            },
            {
                name: "Tanggal Mulai",
                key: "tgl_mulai",
                render: (data, index, rowData) => data
            },
            {
                name: "Tanggal Selesai",
                key: "tgl_selesai",
                render: (data, index, rowData) => data
            },
            {
                name: "Nomor Sertifikat",
                key: "no_sertifikat",
                render: (data, index, rowData) => data
            },
            {
                name: "Tahun Sertifikat",
                key: "thn_sertifikat",
                render: (data, index, rowData) => data
            },
            {
                name: "Penyelenggara",
                key: "penyelenggara",
                render: (data, index, rowData) => data
            },
            {
                name: "Dokumen Diklat",
                key: "dokumen_sk",
                render: (data, index, rowData) => <a href={data} target="_blank">Dokumen</a>
            },
            {
                name: "Diupdate Oleh",
                key: "",
                render: (data, index, rowData) => rowData.updated_by.name
            },
            {
                name: "Aksi",
                key: "",
                render: (data, index, rowData) => (
                    <>
                        <a className="btn btn-primary btn-sm m-1" href="#">Edit</a>
                        <a className="btn btn-danger btn-sm m-1" href="#">Hapus</a>
                    </>
                )
            },
        ],
        data: dummyDiklat.riwayatdiklat.filter(data => data.status === 1)
    }
    let tableSubmitted = {
        column: [
            {
                name: "No",
                key: "",
                render: (data, index, rowData) => (index + 1)
            },
            {
                name: "Nama Diklat",
                key: "nama_diklat",
                render: (data, index, rowData) => data
            },
            {
                name: "Jenis Diklat",
                key: "",
                render: (data, index, rowData) => rowData.diklat.jenis_diklat
            },
            {
                name: "Tanggal Mulai",
                key: "tgl_mulai",
                render: (data, index, rowData) => data
            },
            {
                name: "Tanggal Selesai",
                key: "tgl_selesai",
                render: (data, index, rowData) => data
            },
            {
                name: "Nomor Sertifikat",
                key: "no_sertifikat",
                render: (data, index, rowData) => data
            },
            {
                name: "Tahun Sertifikat",
                key: "thn_sertifikat",
                render: (data, index, rowData) => data
            },
            {
                name: "Penyelenggara",
                key: "penyelenggara",
                render: (data, index, rowData) => data
            },
            {
                name: "Dokumen Diklat",
                key: "dokumen_sk",
                render: (data, index, rowData) => <a href={data} target="_blank">Dokumen</a>
            },
            {
                name: "Diupdate Oleh",
                key: "",
                render: (data, index, rowData) => rowData.updated_by.name
            },
            {
                name: "Aksi",
                key: "",
                render: (data, index, rowData) => (
                    <a className="btn btn-primary btn-sm m-1" href="#">Verifikasi</a>
                )
            },
        ],
        data: dummyDiklat.riwayatdiklat.filter(data => data.status === 0)
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
                                <div className="page-pretitle">Halaman Diklat</div>
                                <h2 className="page-title">Riwayat Diklat : Ananda Rifkiy Hasan</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="page-body pb-4">
                <div className="container-xl">
                    <div className="card card-primary card-outline mb-3">

                        <div className="card-body">
                            <h3 className="card-title">Data Diklat</h3>
                            <a href="{{ url('/') }}/pegawai/diklat/tambah/{{$pegawai->id_peg}}" className="btn btn-success mb-3">
                                Tambah
                            </a>
                            <Table data={tableApproved} tableName="Riwayat Diklat Disetujui" />
                        </div>
                    </div>
                    <div className="card card-primary card-outline">
                        <div className="card-body">
                            <h3 className="card-title">Data Ajuan Diklat</h3>
                            <Table data={tableSubmitted} tableName="Riwayat Diklat Diajukan" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}


export default HistoryTraining
