import { Link } from "react-router-dom";
import Table from "../../components/table/Table";


function Profile() {
    let dummyProfile = {
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
        naikkgb: [],
        agama: {
            kode_agama: 1,
            agama: "Islam",
            ket: null,
            created_at: "2021-10-17T06:15:40.000000Z",
            updated_at: "2021-10-17T06:15:40.000000Z",
        },
        pendidikan: [
            {
                kode_pdd: 6,
                pendidikan: "S2",
                ket: null,
                created_at: "2021-03-23T06:21:21.000000Z",
                updated_at: "2021-03-23T06:21:21.000000Z",
            }
        ],
        suamiistri: [
            {
                id_istrisuami: 1,
                id_peg: 6,
                nama_istri_suami: "Ananda Rifkiy Hasan",
                t_lahir: "Banyumas",
                tgl_lahir: "2021-09-13",
                jns_kelamin: "L",
                kode_pdd: 3,
                sts_tunjangan: "Ya",
                tgl_menikah: "2021-09-13",
                ket: "h",
                created_at: "2021-09-17T09:30:08.000000Z",
                updated_at: "2021-09-17T09:30:08.000000Z",
            },
            {
                id_istrisuami: 2,
                id_peg: 6,
                nama_istri_suami: "d",
                t_lahir: "s",
                tgl_lahir: "2021-12-09",
                jns_kelamin: "P",
                kode_pdd: 3,
                sts_tunjangan: "Ya",
                tgl_menikah: "2021-12-17",
                ket: "d",
                created_at: "2021-12-06T09:29:35.000000Z",
                updated_at: "2021-12-06T09:29:35.000000Z",
            },
            {
                id_istrisuami: 3,
                id_peg: 6,
                nama_istri_suami: "z",
                t_lahir: "z",
                tgl_lahir: "2021-12-15",
                jns_kelamin: "P",
                kode_pdd: 3,
                sts_tunjangan: "Ya",
                tgl_menikah: "2021-12-21",
                ket: "z",
                created_at: "2021-12-08T07:42:07.000000Z",
                updated_at: "2021-12-08T07:42:07.000000Z",
            },
        ],
        anak: [
            {
                id_anak: 1,
                id_peg: 6,
                nama_anak: "Ananda Rifkiy Hasan",
                t_lahir: "Banyumas",
                tgl_lair: "2021-09-20",
                jns_kelamin: "L",
                kode_pdd: 3,
                sts_tunjangan: "Tidak",
                sts_menikah: "Menikah",
                ket: "a",
                created_at: "2021-09-17T09:33:49.000000Z",
                updated_at: "2021-09-17T09:33:49.000000Z",
            },
            {
                id_anak: 2,
                id_peg: 6,
                nama_anak: "z",
                t_lahir: "c",
                tgl_lair: "2021-12-14",
                jns_kelamin: "L",
                kode_pdd: 3,
                sts_tunjangan: "Iya",
                sts_menikah: "Belum menikah",
                ket: "a",
                created_at: "2021-12-06T09:33:00.000000Z",
                updated_at: "2021-12-06T09:33:00.000000Z",
            },
        ],
        orangtua: [
            {
                id_ortu: 1,
                id_peg: 6,
                nama_ortu: "q",
                t_lahir: "q",
                tgl_lahir: "2021-12-15",
                jns_kelamin: "L",
                alamat: "s",
                pekerjaan: "s",
                ket: "s",
                created_at: "2021-12-06T09:38:55.000000Z",
                updated_at: "2021-12-06T09:38:55.000000Z",
            }
        ],
        upt: {
            id: 2,
            upt: "SMK Ma'arif NU 2 Ajibarang",
            created_at: "2021-04-17T08:52:05.000000Z",
            updated_at: "2021-04-17T08:52:05.000000Z",
        },
    };

    let tableMarital = {
        column: [
            {
                name: "No",
                key: "",
                render: (data, index, rowData) => index + 1
            },
            {
                name: "Nama",
                key: "nama_istri_suami",
                render: (data, index, rowData) => data
            },
            {
                name: "Tempat Lahir",
                key: "t_lahir",
                render: (data, index, rowData) => data
            },
            {
                name: "Tanggal Lahir",
                key: "tgl_lahir",
                render: (data, index, rowData) => data
            },
            {
                name: "Jenis Kelamin",
                key: "jns_kelamin",
                render: (data, index, rowData) => data
            },
            {
                name: "Status Tunjangan",
                key: "sts_tunjangan",
                render: (data, index, rowData) => data
            },
            {
                name: "Tanggal Pernikahan",
                key: "tgl_menikah",
                render: (data, index, rowData) => data
            },
            {
                name: "Keterangan",
                key: "ket",
                render: (data, index, rowData) => data
            },
        ],
        data: dummyProfile.suamiistri
    }
    let tableChild = {
        column: [
            {
                name: "No",
                key: "",
                render: (data, index, rowData) => index + 1
            },
            {
                name: "Nama",
                key: "nama_ortu",
                render: (data, index, rowData) => data
            },
            {
                name: "Tempat Lahir",
                key: "t_lahir",
                render: (data, index, rowData) => data
            },
            {
                name: "Tanggal Lahir",
                key: "tgl_lahir",
                render: (data, index, rowData) => data
            },
            {
                name: "Jenis Kelamin",
                key: "jns_kelamin",
                render: (data, index, rowData) => data
            },
            {
                name: "Status Tunjangan",
                key: "sts_tunjangan",
                render: (data, index, rowData) => data
            },
            {
                name: "Status Pernikahan",
                key: "sts_menikah",
                render: (data, index, rowData) => data
            },
            {
                name: "Keterangan",
                key: "ket",
                render: (data, index, rowData) => data
            },
        ],
        data: dummyProfile.anak
    }
    let tableParent = {
        column: [
            {
                name: "No",
                key: "",
                render: (data, index, rowData) => index + 1
            },
            {
                name: "Nama",
                key: "nama_orangtua",
                render: (data, index, rowData) => data
            },
            {
                name: "Tempat Lahir",
                key: "t_lahir",
                render: (data, index, rowData) => data
            },
            {
                name: "Tanggal Lahir",
                key: "tgl_lahir",
                render: (data, index, rowData) => data
            },
            {
                name: "Jenis Kelamin",
                key: "jns_kelamin",
                render: (data, index, rowData) => data
            },
            {
                name: "Alamat",
                key: "alamat",
                render: (data, index, rowData) => data
            },
            {
                name: "Pekerjaan",
                key: "pekerjaan",
                render: (data, index, rowData) => data
            },
            {
                name: "Keterangan",
                key: "ket",
                render: (data, index, rowData) => data
            },
        ],
        data: dummyProfile.orangtua
    }
    return (
        <div class="page-wrapper">
            <div class="container-xl">
                <div class="page-header d-print-none">
                    <div class="row align-items-center">
                        <div class="col">
                            <div class="page-pretitle">Halaman Pegawai</div>
                            <h2 class="page-title">Daftar Pegawai</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div class="page-body">
                <div class="container-xl">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="row g-3">
                                <div class="col-12">
                                    <div class="card card-primary card-outline">
                                        <div class="card-body box-profile">
                                            <div class="text-center mt-4">
                                                <img class="profile-user-img img-fluid img-circle" src="{{  str_replace('/index.php', '', url('/')) }}/foto/{{$pegawai->foto}}" style={{ width: 100, height: 100, objectFit: "cover" }} alt="User profile picture" />
                                            </div>

                                            <h3 class="profile-username text-center">{dummyProfile.gelar_depan} {dummyProfile.nama} {dummyProfile.gelar_belakang}</h3>

                                            <p class="text-muted text-center">-</p>

                                            <ul class="list-group list-group-unbordered mb-3">
                                                <li class="list-group-item">
                                                    <b>NIPY</b> <a class="float-right">{dummyProfile.nip}</a>
                                                </li>
                                                <li class="list-group-item">
                                                    <b>Telepon</b> <a class="float-right">{dummyProfile.no_telp}</a>
                                                </li>
                                                <li class="list-group-item">
                                                    <b>Status</b> <a class="float-right">{dummyProfile.sts_pegawai}</a>
                                                </li>
                                                <li class="list-group-item">
                                                    <b>UPT</b> <a class="float-right">{dummyProfile.upt.upt}</a>
                                                </li>
                                            </ul>
                                            <Link to="/profile/edit" class="btn btn-primary btn-block w-100"><b>Edit</b></Link>

                                        </div>
                                    </div>
                                </div>
                                <div class=" col-12">
                                    <div class="card mb-4">
                                        <div class="card-header py-3">
                                            <h4 class="m-0 font-weight-bold text-primary text-center">Kompetensi</h4>
                                        </div>
                                        <div class="card-body" style={{ paddingTop: 8 }}>

                                            <Link to="/history/training" class="btn btn-primary m-1">Diklat</Link>
                                            <Link to="/history/salary" class="btn btn-success m-1">Gapok</Link>
                                            <Link to="/history/punishment" class="btn btn-warning m-1">Hukuman</Link>
                                            <hr />
                                            <Link to="/history/structural-position" class="btn btn-danger m-1">Jabatan</Link>
                                            <Link to="/history/functional-position" class="btn btn-info m-1">Jabatan Fungsional</Link>
                                            <Link to="/history/additional-position" class="btn btn-danger m-1">Jabatan Tambahan</Link>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-8">
                            <div class="card">
                                <div class="card-header p-2">
                                    <ul class="nav nav-pills " data-bs-toggle="tabs">
                                        <li class="nav-item">
                                            <a class="nav-link active" href="#profile" data-bs-toggle="tab">Profile</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="#suamiistri" data-bs-toggle="tab">Suami / Istri</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="#anak" data-bs-toggle="tab">Anak</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="#ortu" data-bs-toggle="tab">Orang Tua</a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="card-body">
                                    <div class="tab-content">
                                        <div class="active tab-pane show" id="profile">
                                            <div class="">
                                                <div class="mb-4 pl-2 pt-2 pr-2">
                                                    <div class="row">
                                                        <div class="col-md-4">NIPY</div>
                                                        <div class="col-md-8">: {dummyProfile.nip}</div>
                                                    </div>
                                                    <hr />

                                                    <div class="row">
                                                        <div class="col-md-4">NIPY Lama</div>
                                                        <div class="col-md-8">: {dummyProfile.nip_lama}</div>
                                                    </div>
                                                    <hr />

                                                    <div class="row">
                                                        <div class="col-md-4">NIK</div>
                                                        <div class="col-md-8">: {dummyProfile.nik}</div>
                                                    </div>
                                                    <hr />
                                                    <div class="row">
                                                        <div class="col-md-4">Nama</div>
                                                        <div class="col-md-8">: {dummyProfile.gelar_depan} {dummyProfile.nama} {dummyProfile.gelar_belakang}</div>
                                                    </div>
                                                    <hr />
                                                    <div class="row">
                                                        <div class="col-md-4">Tempat, Tanggal Lahir</div>
                                                        <div class="col-md-8">
                                                            : {dummyProfile.t_lahir}, {dummyProfile.tgl_lahir}
                                                        </div>
                                                    </div>
                                                    <hr />


                                                    <div class="row">
                                                        <div class="col-md-4">Alamat KTP</div>
                                                        <div class="col-md-8">
                                                            : {dummyProfile.alamat_ktp}
                                                        </div>
                                                    </div>
                                                    <hr />

                                                    <div class="row">
                                                        <div class="col-md-4">Alamat KTP</div>
                                                        <div class="col-md-8">
                                                            : {dummyProfile.alamat_domisili}
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div class="row">
                                                        <div class="col-md-4">Agama</div>
                                                        <div class="col-md-8">
                                                            : {dummyProfile.agama.agama}
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div class="row">
                                                        <div class="col-md-4">Jenis Kelamin</div>
                                                        <div class="col-md-8">
                                                            : {dummyProfile.jns_kelamin === "L" ? "Laki-laki" : "Perempuan"}
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div class="row">
                                                        <div class="col-md-4">Hobi</div>
                                                        <div class="col-md-8">: {dummyProfile.hobi}</div>
                                                    </div>
                                                    <hr />
                                                    <div class="row">
                                                        <div class="col-md-4">Status Pernikahan</div>
                                                        <div class="col-md-8">
                                                            : {dummyProfile.sts_marital}
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div class="row">
                                                        <div class="col-md-4">Status Kepegawaian</div>
                                                        <div class="col-md-8">
                                                            : {dummyProfile.sts_pegawai}
                                                        </div>
                                                    </div>
                                                    <hr />

                                                    <div class="row">
                                                        <div class="col-md-4">Status Keaktifan</div>
                                                        <div class="col-md-8">
                                                            : {dummyProfile.sts_keaktifan}
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div class="row">
                                                        <div class="col-md-4">Pendidikan</div>
                                                        <div class="col-md-8">
                                                            : {dummyProfile.pendidikan.map(data => data.pendidikan)}
                                                        </div>
                                                    </div>
                                                    <hr />

                                                    <div class="row">
                                                        <div class="col-md-4">Institusi Pendidikan</div>
                                                        <div class="col-md-8">
                                                            : {dummyProfile.nama_sekolah}
                                                        </div>
                                                    </div>
                                                    <hr />

                                                    <div class="row">
                                                        <div class="col-md-4">Tahun Lulus</div>
                                                        <div class="col-md-8">
                                                            : {dummyProfile.tahun_sttb}
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div class="row">
                                                        <div class="col-md-4">No. Telp</div>
                                                        <div class="col-md-8">
                                                            : {dummyProfile.no_telp}
                                                        </div>
                                                    </div>
                                                    <hr />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane" id="suamiistri">
                                            <div class="">
                                                <div class="mb-4 pl-2 pt-2 pr-2">
                                                    <Table data={tableMarital} tableName="Tes" />
                                                    <button type="button" class="btn btn-primary btn-block" data-bs-toggle="modal" data-bs-target="#ModalSuami">Tambah</button>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="tab-pane" id="anak">
                                            <div class="">
                                                <div class="mb-4 pl-2 pt-2 pr-2">
                                                    <Table data={tableChild} tableName="Tes" />

                                                    <button type="button" class="btn btn-primary btn-block" data-bs-toggle="modal" data-bs-target="#ModalAnak">Tambah</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane" id="ortu">
                                            <div class="">
                                                <div class="mb-4 pl-2 pt-2 pr-2">
                                                    <Table data={tableParent} tableName="Tes" />

                                                    <button type="button" class="btn btn-primary btn-block" data-bs-toggle="modal" data-bs-target="#ModalOrtu">Tambah</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>


                        <div class="modal modal-blur fade" id="ModalSuami" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Tambah Suami Istri</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times; </span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <form action="{{url('/')}/pegawai/suamiistri/tambah/proses" method="post">
                                            <div class="form-row g-3 row">
                                                <div class="form-group col-md-4">
                                                    <label class="form-label" for="inputKarpeg">Nama</label>
                                                    <input type="text" name="nama" id="inputKarpeg" class="form-control" required />
                                                </div>
                                                <div class="form-group col-md-4">
                                                    <label class="form-label" for="inputTtl">Tempat</label>
                                                    <input type="text" name="t_lahir" class="form-control" />
                                                </div>
                                                <div class="form-group col-md-4">
                                                    <label class="form-label" for="inputTgl">Tgl Lahir</label>
                                                    <input type="date" name="tgl_lahir" class="form-control" />
                                                </div>
                                                <div class="form-group col-md-4">
                                                    <label class="form-label" for="inputStatus">Jenis Kelamin</label>
                                                    <select name="kelamin" id="inputUser" class="form-control" required>
                                                        <option>---</option>

                                                        <option value="L">Laki-laki</option>
                                                        <option value="P">Perempuan</option>

                                                    </select>
                                                </div>
                                                <div class="form-group col-md-4">
                                                    <label class="form-label" for="inputStatus">Pendidikan</label>
                                                    <select name="pendidikan" id="inputUser" class="form-control" required>
                                                        <option>---</option>

                                                        <option value="{{$pdds->kode_pdd}">asd</option>
                                                    </select>
                                                </div>
                                                <div class="form-group col-md-4">
                                                    <label class="form-label" for="inputStatus">Tanggal Pernikahan</label>
                                                    <input type="date" name="tgl_menikah" class="form-control" />
                                                </div>
                                                <div class="form-group col-md-6">
                                                    <label class="form-label" for="inputStatus">Status Tunjangan</label>
                                                    <select name="sts_tunjangan" id="inputUser" class="form-control" required>
                                                        <option>---</option>
                                                        <option value="Ya">Iya</option>
                                                        <option value="Tidak">Tidak</option>
                                                    </select>
                                                </div>
                                                <div class="form-group col-md-6">
                                                    <label class="form-label" for="inputStatus">Keterangan</label>
                                                    <input type="text" class="form-control" name="keterangan" />
                                                </div>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                <button type="submit" class="btn btn-primary">Tambah</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal modal-blur fade" id="ModalAnak" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Tambah Anak</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <form action="{{url('/')}/pegawai/anak/tambah/proses" method="post">
                                        <div class="form-row g-3 row">
                                            <div class="form-group col-md-4">
                                                <label class="form-label" for="inputKarpeg">Nama</label>
                                                <input type="text" name="nama" id="inputKarpeg" class="form-control" required />
                                            </div>
                                            <div class="form-group col-md-4">
                                                <label class="form-label" for="inputTtl">Tempat</label>
                                                <input type="text" name="t_lahir" class="form-control" />
                                            </div>
                                            <div class="form-group col-md-4">
                                                <label class="form-label" for="inputTgl">Tgl Lahir</label>
                                                <input type="date" name="tgl_lahir" class="form-control" />
                                            </div>
                                            <div class="form-group col-md-4">
                                                <label class="form-label" for="inputStatus">Jenis Kelamin</label>
                                                <select name="kelamin" id="inputUser" class="form-control" required>
                                                    <option>---</option>

                                                    <option value="L">Laki-laki</option>
                                                    <option value="P">Perempuan</option>

                                                </select>
                                            </div>
                                            <div class="form-group col-md-4">
                                                <label class="form-label" for="inputStatus">Pendidikan</label>
                                                <select name="pendidikan" id="inputUser" class="form-control" required>
                                                    <option>---</option>
                                                    <option value="{{$pdds->kode_pdd}">SD</option>
                                                </select>
                                            </div>
                                            <div class="form-group col-md-4">
                                                <label class="form-label" for="inputStatus">Status Pernikahan</label>
                                                <select name="sts_pernikahan" id="inputUser" class="form-control" required>
                                                    <option>---</option>
                                                    <option value="Menikah">Menikah</option>
                                                    <option value="Belum menikah">Belum menikah</option>
                                                </select>
                                            </div>
                                            <div class="form-group col-md-6">
                                                <label class="form-label" for="inputStatus">Status Tunjangan</label>
                                                <select name="sts_tunjangan" id="inputUser" class="form-control" required>
                                                    <option>---</option>
                                                    <option value="Iya">Iya</option>
                                                    <option value="Tidak">Tidak</option>
                                                </select>
                                            </div>
                                            <div class="form-group col-md-6">
                                                <label class="form-label" for="inputStatus">Keterangan</label>
                                                <input type="text" class="form-control" name="keterangan" />
                                            </div>

                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            <button type="submit" class="btn btn-primary">Tambah</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal modal-blur fade" id="ModalOrtu" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Tambah Ortu</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <form action="{{url('/')}/pegawai/orangtua/tambah/proses" method="post">
                                        <div class="form-row g-3 row">
                                            <div class="form-group col-md-4">
                                                <label class="form-label" for="inputKarpeg">Nama</label>
                                                <input type="text" name="nama" id="inputKarpeg" class="form-control" required />
                                            </div>
                                            <div class="form-group col-md-4">
                                                <label class="form-label" for="inputTtl">Tempat</label>
                                                <input type="text" name="t_lahir" class="form-control" />
                                            </div>
                                            <div class="form-group col-md-4">
                                                <label class="form-label" for="inputTgl">Tgl Lahir</label>
                                                <input type="date" name="tgl_lahir" class="form-control" />
                                            </div>
                                            <div class="form-group col-md-6">
                                                <label class="form-label" for="inputStatus">Jenis Kelamin</label>
                                                <select name="kelamin" id="inputUser" class="form-control" required>
                                                    <option>---</option>

                                                    <option value="L">Laki-laki</option>
                                                    <option value="P">Perempuan</option>

                                                </select>
                                            </div>

                                            <div class="form-group col-md-6">
                                                <label class="form-label" for="inputStatus">Alamat</label>
                                                <input type="text" class="form-control" name="alamat" />
                                            </div>

                                            <div class="form-group col-md-6">
                                                <label class="form-label" for="inputStatus">Pekerjaan</label>
                                                <input type="text" class="form-control" name="pekerjaan" />
                                            </div>
                                            <div class="form-group col-md-6">
                                                <label class="form-label" for="inputStatus">Keterangan</label>
                                                <input type="text" class="form-control" name="keterangan" />
                                            </div>
                                        </div>


                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            <button type="submit" class="btn btn-primary">Tambah</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile