import Table from "../../components/table/Table"


function HistorySalary() {
    let dummyGapok = {
        id_peg: 36,
        nip: "123456789",
        nama: "Ananda Rifkiy Hasan",
        nip_lama: null,
        t_lahir: "Banyumas",
        tgl_lahir: "2021-10-17",
        jns_kelamin: "L",
        kode_agama: 1,
        sts_marital: "Menikah",
        kode_pdd: 1,
        nama_sekolah: "ITTP",
        tahun_sttb: "2021",
        gelar_depan: null,
        gelar_belakang: null,
        hobi: null,
        sts_pegawai: "Tetap",
        id_user: 214,
        no_telp: "123123123",
        foto: "profile-123456789.png",
        created_at: "2021-12-10T15:13:10.000000Z",
        updated_at: "2021-10-16T17:19:04.000000Z",
        id_upt: 4,
        nik: "33021701040200061",
        alamat_ktp: "Desa Karanglewas Kidul",
        alamat_domisili: "Desa Karanglewas Kidul",
        sts_keaktifan: "Aktif",
        tmt: "2021-10-11",
        riwayatgapok: [
            {
                id_gapok: 1,
                id_peg: 36,
                no_sk: "12387612376",
                tgl_sk: "2021-10-12",
                pejabat_sk: "Budi",
                kode_gapok: 1,
                tmt: "2021-10-19",
                naik_selanjutnya: "2021-10-21",
                ket: "-",
                created_at: "2021-10-17T14:19:00.000000Z",
                updated_at: "2021-10-17T14:19:00.000000Z",
                updated_by: {
                    id: 9,
                    name: "Admin YPPMNU",
                    email: "yppmnu@gmail.com",
                    email_verified_at: "2021-11-25T08:56:31.000000Z",
                    level: "admin",
                    created_at: "2021-04-05T02:57:06.000000Z",
                    updated_at: "2021-11-25T08:56:31.000000Z",
                    role: "admin",
                },
                status: 1,
                dokumen_sk: "gapok-0aa5b06871a41663e22e43d34c5450be.png",
                gapok: {
                    kode_gapok: 1,
                    masa_kerja: 1,
                    PP: "200000",
                    kode_gol: "GP-1",
                    gapok: 1000000,
                    created_at: "2021-03-23T06:05:05.000000Z",
                    updated_at: "2021-03-23T06:05:05.000000Z",
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
                name: "Nomor SK",
                key: "no_sk",
                render: (data, index, rowData) => data
            },
            {
                name: "Tanggal SK",
                key: "tgl_sk",
                render: (data, index, rowData) => data
            },
            {
                name: "Pejabat Pengesah",
                key: "pejabat_sk",
                render: (data, index, rowData) => data
            },
            {
                name: "Terhitung Mulai",
                key: "tmt",
                render: (data, index, rowData) => data
            },
            {
                name: "Naik Selanjutnya",
                key: "naik_selanjutnya",
                render: (data, index, rowData) => data
            },
            {
                name: "Dokumen SK",
                key: "dokumen_sk",
                render: (data, index, rowData) => <a href={data} target="_blank">Dokumen</a>
            },
            {
                name: "Keterangan",
                key: "ket",
                render: (data, index, rowData) => data
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
        data: dummyGapok.riwayatgapok.filter(data => data.status === 1)
    }
    let tableSubmitted = {
        column: [
            {
                name: "No",
                key: "",
                render: (data, index, rowData) => (index + 1)
            },
            {
                name: "Nomor SK",
                key: "no_sk",
                render: (data, index, rowData) => data
            },
            {
                name: "Tanggal SK",
                key: "tgl_sk",
                render: (data, index, rowData) => data
            },
            {
                name: "Pejabat Pengesah",
                key: "pejabat_sk",
                render: (data, index, rowData) => data
            },
            {
                name: "Terhitung Mulai",
                key: "tmt",
                render: (data, index, rowData) => data
            },
            {
                name: "Naik Selanjutnya",
                key: "naik_selanjutnya",
                render: (data, index, rowData) => data
            },
            {
                name: "Dokumen SK",
                key: "dokumen_sk",
                render: (data, index, rowData) => <a href={data} target="_blank">Dokumen</a>
            },
            {
                name: "Keterangan",
                key: "ket",
                render: (data, index, rowData) => data
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
        data: dummyGapok.riwayatgapok.filter(data => data.status === 0)
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
                                <div className="page-pretitle">Halaman Gapok</div>
                                <h2 className="page-title">Riwayat Gapok : Ananda Rifkiy Hasan</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="page-body pb-4">
                <div className="container-xl">
                    <div className="card card-primary card-outline mb-3">

                        <div className="card-body">
                            <h3 className="card-title">Data Gapok</h3>
                            <a href="{{ url('/') }}/pegawai/diklat/tambah/{{$pegawai->id_peg}}" className="btn btn-success mb-3">
                                Tambah
                            </a>
                            <Table data={tableApproved} tableName="Riwayat Gapok Disetujui" />
                        </div>
                    </div>
                    <div className="card card-primary card-outline">
                        <div className="card-body">
                            <h3 className="card-title">Data Ajuan Gapok</h3>
                            <Table data={tableSubmitted} tableName="Riwayat Gapok Diajukan" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}


export default HistorySalary
