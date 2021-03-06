import Table from "../../components/table/Table"


function HistoryPunishment() {
    let dummyHukuman = {
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
        riwayatindisipliner: [
            {
                id_hukuman: 3,
                id_peg: 36,
                hukuman: "Libur 3 Hari",
                no_sk: "123123123",
                tgl_sk: "2021-12-26",
                pejabat_sk: "Budi",
                ket: "menjadi",
                created_at: "2021-12-26T10:24:00.000000Z",
                updated_at: "2021-12-26T10:24:00.000000Z",
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
                dokumen_sk: "hukuman-951e8ebaa29117befbbbaad741010f3d.pdf",
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
                name: "Hukuman",
                key: "hukuman",
                render: (data, index, rowData) => data
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
                        <a className="btn btn-primary btn-sm m-1" href="#" data-bs-toggle="modal" data-bs-target="#modal-edit">Edit</a>
                        <a className="btn btn-danger btn-sm m-1" href="#" data-bs-toggle="modal" data-bs-target="#modal-delete">Hapus</a>
                    </>
                )
            },
        ],
        data: dummyHukuman.riwayatindisipliner.filter(data => data.status === 1)
    }
    let tableSubmitted = {
        column: [
            {
                name: "No",
                key: "",
                render: (data, index, rowData) => (index + 1)
            },
            {
                name: "Hukuman",
                key: "hukuman",
                render: (data, index, rowData) => data
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
        data: dummyHukuman.riwayatindisipliner.filter(data => data.status === 0)
    }
    return (
        <>
            <div className="page-wrapper">
                <div className="container-xl">
                    <div className="page-header d-print-none">
                        <div className="row align-items-center">
                            <div className="col">
                                <div className="page-pretitle">Halaman Hukuman</div>
                                <h2 className="page-title">Riwayat Hukuman : Ananda Rifkiy Hasan</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="page-body pb-4">
                <div className="container-xl">
                    <div className="card card-primary card-outline mb-3">

                        <div className="card-body">
                            <h3 className="card-title">Data Hukuman</h3>
                            <a href="#" className="btn btn-success mb-3" data-bs-toggle="modal" data-bs-target="#modal-add">
                                Tambah
                            </a>
                            <Table data={tableApproved} tableName="Riwayat Hukuman Disetujui" />
                        </div>
                    </div>
                    <div className="card card-primary card-outline">
                        <div className="card-body">
                            <h3 className="card-title">Data Ajuan Hukuman</h3>
                            <Table data={tableSubmitted} tableName="Riwayat Hukuman Diajukan" />
                        </div>
                    </div>
                </div>
            </section>

            <div className="modal modal-blur fade" id="modal-add" tabindex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Tambah Hukuman</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form action="http://localhost/simpeglocal/pegawai/hukuman/tambah" method="post" enctype="multipart/form-data">

                                <div className="row g-3">

                                    <div className="col-md-6">
                                        <label className="form-label">Hukuman</label>
                                        <input type="text" name="hukuman" className="form-control" required="" />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">No.SK</label>
                                        <input type="text" name="no_sk" className="form-control" required="" />
                                    </div>


                                    <div className="col-md-6">
                                        <label className="form-label">Tanggal SK</label>
                                        <input type="date" name="tgl_sk" className="form-control" required="" />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Pejabat Pengesah</label>
                                        <input type="text" name="pejabat_sk" className="form-control" required="" />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">File Dokumen SK</label>
                                        <input type="file" name="dokumen_sk" className="form-control" required="" />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Keterangan</label>
                                        <input type="text" name="ket" className="form-control" />
                                    </div>
                                    <div className="col-md-12">
                                        <input type="submit" value="Tambah" className="btn btn-primary" />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal modal-blur fade" id="modal-edit" tabindex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Hukuman</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form action="http://localhost/simpeglocal/pegawai/hukuman/tambah" method="post" enctype="multipart/form-data">

                                <div className="row g-3">

                                    <div className="col-md-6">
                                        <label className="form-label">Hukuman</label>
                                        <input type="text" name="hukuman" className="form-control" required="" />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">No.SK</label>
                                        <input type="text" name="no_sk" className="form-control" required="" />
                                    </div>


                                    <div className="col-md-6">
                                        <label className="form-label">Tanggal SK</label>
                                        <input type="date" name="tgl_sk" className="form-control" required="" />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Pejabat Pengesah</label>
                                        <input type="text" name="pejabat_sk" className="form-control" required="" />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">File Dokumen SK</label>
                                        <input type="file" name="dokumen_sk" className="form-control" required="" />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Keterangan</label>
                                        <input type="text" name="ket" className="form-control" />
                                    </div>
                                    <div className="col-md-12">
                                        <input type="submit" value="Tambah" className="btn btn-primary" />
                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal modal-blur fade" id="modal-delete" tabIndex="-1" role="dialog" aria-modal="true" style={{ paddingRight: 6 }}>
                <div className="modal-dialog modal-sm modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        <div className="modal-status bg-danger"></div>
                        <div className="modal-body text-center py-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon mb-2 text-danger icon-lg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M12 9v2m0 4v.01"></path>
                                <path d="M5 19h14a2 2 0 0 0 1.84 -2.75l-7.1 -12.25a2 2 0 0 0 -3.5 0l-7.1 12.25a2 2 0 0 0 1.75 2.75"></path>
                            </svg>
                            <h3>Apakah anda yakin?</h3>
                            <div className="text-muted">Anda akan menghapus data hukuman <b>nama diklat</b></div>
                        </div>
                        <div className="modal-footer">
                            <div className="w-100">
                                <div className="row">
                                    <div className="col"><button className="btn btn-white w-100" data-bs-dismiss="modal">
                                        Batal
                                    </button></div>
                                    <div className="col"><a href="{{ url('/') }}/pegawai/hapus/{{$p->id_peg}}" className="btn btn-danger w-100" data-bs-dismiss="modal">
                                        Hapus
                                    </a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default HistoryPunishment
