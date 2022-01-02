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
                status: 1,
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
                        <a className="btn btn-primary btn-sm m-1" href="#" data-bs-toggle="modal" data-bs-target="#modal-edit">Edit</a>
                        <a className="btn btn-danger btn-sm m-1" href="#" data-bs-toggle="modal" data-bs-target="#modal-delete">Hapus</a>
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
                            <a href="#" className="btn btn-success mb-3" data-bs-toggle="modal" data-bs-target="#modal-add">
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

            <div className="modal modal-blur fade" id="modal-add" tabindex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Tambah Diklat</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form action="http://localhost/simpeglocal/pegawai/diklat/tambah" method="POST" enctype="multipart/form-data">
                                <div className="form-row row g-3">
                                    <div className="form-group col-md-6">
                                        <label className="form-label">Nama Diklat</label>
                                        <input type="text" name="nama_diklat" className="form-control" required />
                                    </div>

                                    <div className="form-group col-md-6">
                                        <label className="form-label">Jenis Diklat</label>
                                        <select name="jenis_diklat" className="form-control" required>
                                            <option value="1">Tingkat Kabupaten</option>
                                        </select>
                                    </div>



                                    <div className="form-group col-md-6">
                                        <label className="form-label">Tanggal Mulai</label>
                                        <input type="date" name="tgl_mulai" className="form-control" required />
                                    </div>

                                    <div className="form-group col-md-6">
                                        <label className="form-label">Tanggal Selesai</label>
                                        <input type="date" name="tgl_selesai" className="form-control" required />
                                    </div>

                                    <div className="form-group col-md-6">
                                        <label className="form-label">Nomor Sertifikat</label>
                                        <input type="text" name="nmr_sertifikat" className="form-control" required />
                                    </div>

                                    <div className="form-group col-md-6">
                                        <label className="form-label">Tahun Sertifikat</label>
                                        <input type="number" name="thn_sertifikat" className="form-control" required />
                                    </div>

                                    <div className="form-group col-md-6">
                                        <label className="form-label">Penyelenggara</label>
                                        <input type="text" name="penyelenggara" className="form-control" required />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label className="form-label">File Dokumen</label>
                                        <input type="file" name="dokumen_sk" className="form-control" required />
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <button type="sumbit" name="submit" className="btn btn-primary">Tambah</button>

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
                            <h5 className="modal-title">Tambah Diklat</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form action="http://localhost/simpeglocal/pegawai/diklat/tambah" method="POST" enctype="multipart/form-data">
                                <div className="form-row row g-3">
                                    <div className="form-group col-md-6">
                                        <label className="form-label">Nama Diklat</label>
                                        <input type="text" name="nama_diklat" className="form-control" required />
                                    </div>

                                    <div className="form-group col-md-6">
                                        <label className="form-label">Jenis Diklat</label>
                                        <select name="jenis_diklat" className="form-control" required>
                                            <option value="1">Tingkat Kabupaten</option>
                                        </select>
                                    </div>



                                    <div className="form-group col-md-6">
                                        <label className="form-label">Tanggal Mulai</label>
                                        <input type="date" name="tgl_mulai" className="form-control" required />
                                    </div>

                                    <div className="form-group col-md-6">
                                        <label className="form-label">Tanggal Selesai</label>
                                        <input type="date" name="tgl_selesai" className="form-control" required />
                                    </div>

                                    <div className="form-group col-md-6">
                                        <label className="form-label">Nomor Sertifikat</label>
                                        <input type="text" name="nmr_sertifikat" className="form-control" required />
                                    </div>

                                    <div className="form-group col-md-6">
                                        <label className="form-label">Tahun Sertifikat</label>
                                        <input type="number" name="thn_sertifikat" className="form-control" required />
                                    </div>

                                    <div className="form-group col-md-6">
                                        <label className="form-label">Penyelenggara</label>
                                        <input type="text" name="penyelenggara" className="form-control" required />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label className="form-label">File Dokumen</label>
                                        <input type="file" name="dokumen_sk" className="form-control" required />
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <button type="sumbit" name="submit" className="btn btn-primary">Tambah</button>

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
                            <div className="text-muted">Anda akan menghapus data diklat <b>nama diklat</b></div>
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


export default HistoryTraining
