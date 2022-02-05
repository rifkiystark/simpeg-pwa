import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";
import "simple-react-validator/dist/locale/id";
import LoadingIcon from "../../components/loading-icon/LoadingIcon";
import Table from "../../components/table/Table";
import Toast from "../../components/toast/Toast";
import Const from "../../constant";
import { validateInput } from "../../helpers";
import { addMarital, employeeByUserId } from "../../repository/employee";
import { masterPendidikan } from "../../repository/masterData";
import { childColumn, maritalColumn, parentColumn } from "./tableColumn";

function Profile() {
  // REACT ROUTER
  const location = useLocation();
  const router = useNavigate();

  // INITIAL DATA
  const user = location.state?.user;
  const me = JSON.parse(localStorage.getItem(Const.STORAGE_KEY.USER_INFO));

  // STATE
  const [employee, setEmployee] = useState({
    id_peg: null,
    nip: "",
    nama: "",
    nip_lama: "",
    t_lahir: "",
    tgl_lahir: "",
    jns_kelamin: "",
    kode_agama: null,
    sts_marital: "",
    kode_pdd: null,
    nama_sekolah: "",
    tahun_sttb: "",
    gelar_depan: null,
    gelar_belakang: null,
    hobi: "",
    sts_pegawai: "",
    id_user: null,
    no_telp: "",
    foto: "",
    created_at: "",
    updated_at: "",
    id_upt: null,
    nik: "",
    alamat_ktp: "",
    alamat_domisili: "",
    sts_keaktifan: "",
    tmt: "",
    naikkgb: [],
    agama: {
      kode_agama: null,
      agama: "",
      ket: null,
      created_at: "",
      updated_at: "",
    },
    pendidikan: [],
    suamiistri: [],
    anak: [],
    orangtua: [],
    upt: {
      id: null,
      upt: "",
      created_at: "",
      updated_at: "",
    },
  });

  const [loadingMarital, setLoadingMarital] = useState(false);

  const [pendidikans, setPendidikans] = useState([]);

  const [marital, setMarital] = useState({
    nama: null,
    kelamin: null,
    t_lahir: null,
    tgl_lahir: null,
    kelamin: null,
    pendidikan: null,
    tgl_menikah: null,
    sts_tunjangan: null,
    keterangan: null,
  });

  // VALIDATOR
  const validatorMarital = useRef(new SimpleReactValidator({ locale: "id" }));

  // API CALL
  const doGetUserById = async () => {
    const { status, data, message } = await employeeByUserId(user.id);
    setEmployee(data.data);
  };

  const doGetMasterPendidikan = async () => {
    const { status, data, message } = await masterPendidikan();
    setPendidikans(data);
  };

  const doAddMarital = async (e) => {
    e.preventDefault();

    if (validateInput(validatorMarital, marital)) {
      setLoadingMarital(true);
      const requestData = { ...marital, id_user: user.id };
      const { status, data, message } = await addMarital(requestData);
      if (status) {
        setMarital({
          nama: "",
          kelamin: "",
          t_lahir: "",
          tgl_lahir: "",
          kelamin: "",
          pendidikan: "",
          tgl_menikah: "",
          sts_tunjangan: "",
          keterangan: "",
        });
        setMarital({
          nama: null,
          kelamin: null,
          t_lahir: null,
          tgl_lahir: null,
          kelamin: null,
          pendidikan: null,
          tgl_menikah: null,
          sts_tunjangan: null,
          keterangan: null,
        });
        doGetUserById();
        Toast.successToast("Berhasil menambah data");
      } else {
        Toast.errorToast("Gagal menambah data");
      }
      setLoadingMarital(false);
    } else {
      Toast.warningToast("Harap isi semua data");
    }
  };

  useEffect(() => {
    doGetUserById();
    doGetMasterPendidikan();
  }, []);

  return (
    <div className="page-wrapper">
      <div className="container-xl">
        <div className="page-header d-print-none">
          <div className="row align-items-center">
            <div className="col">
              <div className="page-pretitle">Halaman Pegawai</div>
              <h2 className="page-title">Daftar Pegawai</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="page-body">
        <div className="container-xl">
          <div className="row">
            <div className="col-md-4">
              <div className="row g-3">
                <div className="col-12">
                  <div className="card card-primary card-outline">
                    <div className="card-body box-profile">
                      <div className="text-center mt-4">
                        <img
                          className="profile-user-img img-fluid img-circle"
                          src={Const.BASE_URL + "foto/" + employee.foto}
                          style={{
                            width: 100,
                            height: 100,
                            objectFit: "cover",
                            borderRadius: "50%",
                            border: "1px solid #a8a8a8",
                          }}
                          alt="User profile picture"
                        />
                      </div>

                      <h3 className="profile-username text-center">
                        {employee.gelar_depan} {employee.nama}
                        {employee.gelar_belakang}
                      </h3>

                      <p className="text-muted text-center">-</p>

                      <ul className="list-group list-group-unbordered mb-3">
                        <li className="list-group-item">
                          <b>NIPY</b>
                          <a className="float-right">{employee.nip}</a>
                        </li>
                        <li className="list-group-item">
                          <b>Telepon</b>
                          <a className="float-right">{employee.no_telp}</a>
                        </li>
                        <li className="list-group-item">
                          <b>Status</b>
                          <a className="float-right">{employee.sts_pegawai}</a>
                        </li>
                        <li className="list-group-item">
                          <b>UPT</b>
                          <a className="float-right">{employee.upt.upt}</a>
                        </li>
                      </ul>
                      <Link
                        to="/profile/edit"
                        className="btn btn-primary btn-block w-100"
                      >
                        <b>Edit</b>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className=" col-12">
                  <div className="card mb-4">
                    <div className="card-header py-3">
                      <h4 className="m-0 font-weight-bold text-primary text-center">
                        Kompetensi
                      </h4>
                    </div>
                    <div className="card-body" style={{ paddingTop: 8 }}>
                      <Link
                        to="/history/training"
                        className="btn btn-primary m-1"
                      >
                        Diklat
                      </Link>
                      <Link
                        to="/history/salary"
                        className="btn btn-success m-1"
                      >
                        Gapok
                      </Link>
                      <Link
                        to="/history/punishment"
                        className="btn btn-warning m-1"
                      >
                        Hukuman
                      </Link>
                      <hr />
                      <Link
                        to="/history/structural-position"
                        className="btn btn-danger m-1"
                      >
                        Jabatan
                      </Link>
                      <Link
                        to="/history/functional-position"
                        className="btn btn-info m-1"
                      >
                        Jabatan Fungsional
                      </Link>
                      <Link
                        to="/history/additional-position"
                        className="btn btn-danger m-1"
                      >
                        Jabatan Tambahan
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card">
                <div className="card-header p-2">
                  <ul className="nav nav-pills " data-bs-toggle="tabs">
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        href="#profile"
                        data-bs-toggle="tab"
                      >
                        Profile
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="#suamiistri"
                        data-bs-toggle="tab"
                      >
                        Suami / Istri
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#anak" data-bs-toggle="tab">
                        Anak
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#ortu" data-bs-toggle="tab">
                        Orang Tua
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="card-body">
                  <div className="tab-content">
                    <div className="active tab-pane show" id="profile">
                      <div className="">
                        <div className="mb-4 pl-2 pt-2 pr-2">
                          <div className="row">
                            <div className="col-md-4">NIPY</div>
                            <div className="col-md-8">: {employee.nip}</div>
                          </div>
                          <hr />

                          <div className="row">
                            <div className="col-md-4">NIPY Lama</div>
                            <div className="col-md-8">
                              : {employee.nip_lama}
                            </div>
                          </div>
                          <hr />

                          <div className="row">
                            <div className="col-md-4">NIK</div>
                            <div className="col-md-8">: {employee.nik}</div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-md-4">Nama</div>
                            <div className="col-md-8">
                              : {employee.gelar_depan} {employee.nama}
                              {employee.gelar_belakang}
                            </div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-md-4">
                              Tempat, Tanggal Lahir
                            </div>
                            <div className="col-md-8">
                              : {employee.t_lahir}, {employee.tgl_lahir}
                            </div>
                          </div>
                          <hr />

                          <div className="row">
                            <div className="col-md-4">Alamat KTP</div>
                            <div className="col-md-8">
                              : {employee.alamat_ktp}
                            </div>
                          </div>
                          <hr />

                          <div className="row">
                            <div className="col-md-4">Alamat KTP</div>
                            <div className="col-md-8">
                              : {employee.alamat_domisili}
                            </div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-md-4">Agama</div>
                            <div className="col-md-8">
                              : {employee.agama.agama}
                            </div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-md-4">Jenis Kelamin</div>
                            <div className="col-md-8">
                              :
                              {employee.jns_kelamin === "L"
                                ? "Laki-laki"
                                : "Perempuan"}
                            </div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-md-4">Hobi</div>
                            <div className="col-md-8">: {employee.hobi}</div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-md-4">Status Pernikahan</div>
                            <div className="col-md-8">
                              : {employee.sts_marital}
                            </div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-md-4">Status Kepegawaian</div>
                            <div className="col-md-8">
                              : {employee.sts_pegawai}
                            </div>
                          </div>
                          <hr />

                          <div className="row">
                            <div className="col-md-4">Status Keaktifan</div>
                            <div className="col-md-8">
                              : {employee.sts_keaktifan}
                            </div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-md-4">Pendidikan</div>
                            <div className="col-md-8">
                              :
                              {employee.pendidikan.map(
                                (data) => data.pendidikan
                              )}
                            </div>
                          </div>
                          <hr />

                          <div className="row">
                            <div className="col-md-4">Institusi Pendidikan</div>
                            <div className="col-md-8">
                              : {employee.nama_sekolah}
                            </div>
                          </div>
                          <hr />

                          <div className="row">
                            <div className="col-md-4">Tahun Lulus</div>
                            <div className="col-md-8">
                              : {employee.tahun_sttb}
                            </div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-md-4">No. Telp</div>
                            <div className="col-md-8">: {employee.no_telp}</div>
                          </div>
                          <hr />
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane" id="suamiistri">
                      <div className="">
                        <div className="mb-4 pl-2 pt-2 pr-2">
                          <Table
                            data={{
                              column: maritalColumn,
                              data: employee.suamiistri,
                            }}
                            tableName="Tes"
                          />
                          <button
                            type="button"
                            className="btn btn-primary btn-block"
                            data-bs-toggle="modal"
                            data-bs-target="#ModalSuami"
                          >
                            Tambah
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="tab-pane" id="anak">
                      <div className="">
                        <div className="mb-4 pl-2 pt-2 pr-2">
                          <Table
                            data={{ column: childColumn, data: employee.anak }}
                            tableName="Tes"
                          />

                          <button
                            type="button"
                            className="btn btn-primary btn-block"
                            data-bs-toggle="modal"
                            data-bs-target="#ModalAnak"
                          >
                            Tambah
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane" id="ortu">
                      <div className="">
                        <div className="mb-4 pl-2 pt-2 pr-2">
                          <Table
                            data={{
                              column: parentColumn,
                              data: employee.orangtua,
                            }}
                            tableName="Tes"
                          />

                          <button
                            type="button"
                            className="btn btn-primary btn-block"
                            data-bs-toggle="modal"
                            data-bs-target="#ModalOrtu"
                          >
                            Tambah
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="modal modal-blur fade"
              id="ModalSuami"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-centered"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Tambah Suami Istri
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times; </span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={doAddMarital}>
                      <div className="form-row g-3 row">
                        <div className="form-group col-md-4">
                          <label className="form-label" for="inputKarpeg">
                            Nama
                          </label>
                          <input
                            type="text"
                            name="nama"
                            id="inputKarpeg"
                            className="form-control"
                            value={marital.nama}
                            onChange={(e) => {
                              setMarital({ ...marital, nama: e.target.value });
                              validatorMarital.current.showMessageFor("nama");
                            }}
                          />
                          {marital.nama != null &&
                            validatorMarital.current.message(
                              "nama",
                              marital.nama,
                              "required"
                            )}
                        </div>
                        <div className="form-group col-md-4">
                          <label className="form-label" for="inputTtl">
                            Tempat
                          </label>
                          <input
                            type="text"
                            name="t_lahir"
                            className="form-control"
                            value={marital.t_lahir}
                            onChange={(e) => {
                              setMarital({
                                ...marital,
                                t_lahir: e.target.value,
                              });
                              validatorMarital.current.showMessageFor(
                                "tempat_lahir"
                              );
                            }}
                          />
                          {marital.t_lahir != null &&
                            validatorMarital.current.message(
                              "tempat_lahir",
                              marital.t_lahir,
                              "required"
                            )}
                        </div>
                        <div className="form-group col-md-4">
                          <label className="form-label" for="inputTgl">
                            Tgl Lahir
                          </label>
                          <input
                            type="date"
                            name="tgl_lahir"
                            className="form-control"
                            value={marital.tgl_lahir}
                            onChange={(e) => {
                              setMarital({
                                ...marital,
                                tgl_lahir: e.target.value,
                              });
                              validatorMarital.current.showMessageFor(
                                "tanggal_lahir"
                              );
                            }}
                          />
                          {marital.tgl_lahir != null &&
                            validatorMarital.current.message(
                              "tanggal_lahir",
                              marital.tgl_lahir,
                              "required"
                            )}
                        </div>
                        <div className="form-group col-md-4">
                          <label className="form-label" for="inputStatus">
                            Jenis Kelamin
                          </label>
                          <select
                            name="kelamin"
                            id="inputUser"
                            className="form-control"
                            value={marital.kelamin}
                            onChange={(e) => {
                              setMarital({
                                ...marital,
                                kelamin: e.target.value,
                              });
                              validatorMarital.current.showMessageFor(
                                "kelamin"
                              );
                            }}
                          >
                            <option value="">---</option>
                            <option value="L">Laki-laki</option>
                            <option value="P">Perempuan</option>
                          </select>
                          {marital.kelamin != null &&
                            validatorMarital.current.message(
                              "kelamin",
                              marital.kelamin,
                              "required"
                            )}
                        </div>
                        <div className="form-group col-md-4">
                          <label className="form-label" for="inputStatus">
                            Pendidikan
                          </label>
                          <select
                            name="pendidikan"
                            id="inputUser"
                            className="form-control"
                            value={marital.pendidikan}
                            onChange={(e) => {
                              setMarital({
                                ...marital,
                                pendidikan: e.target.value,
                              });
                              validatorMarital.current.showMessageFor(
                                "pendidikan"
                              );
                            }}
                          >
                            <option value="">---</option>
                            {pendidikans.map((pendidikan, index) => {
                              return (
                                <option key={index} value={pendidikan.kode_pdd}>
                                  {pendidikan.pendidikan}
                                </option>
                              );
                            })}
                          </select>
                          {marital.pendidikan != null &&
                            validatorMarital.current.message(
                              "pendidikan",
                              marital.pendidikan,
                              "required"
                            )}
                        </div>
                        <div className="form-group col-md-4">
                          <label className="form-label" for="inputStatus">
                            Tanggal Pernikahan
                          </label>
                          <input
                            type="date"
                            name="tgl_menikah"
                            className="form-control"
                            value={marital.tgl_menikah}
                            onChange={(e) => {
                              setMarital({
                                ...marital,
                                tgl_menikah: e.target.value,
                              });
                              validatorMarital.current.showMessageFor(
                                "tanggal_menikah"
                              );
                            }}
                          />
                          {marital.tgl_menikah != null &&
                            validatorMarital.current.message(
                              "tanggal_menikah",
                              marital.tgl_menikah,
                              "required"
                            )}
                        </div>
                        <div className="form-group col-md-6">
                          <label className="form-label" for="inputStatus">
                            Status Tunjangan
                          </label>
                          <select
                            name="sts_tunjangan"
                            id="inputUser"
                            className="form-control"
                            value={marital.sts_tunjangan}
                            onChange={(e) => {
                              setMarital({
                                ...marital,
                                sts_tunjangan: e.target.value,
                              });
                              validatorMarital.current.showMessageFor(
                                "status_tunjangan"
                              );
                            }}
                          >
                            <option value="">---</option>
                            <option value="Ya">Iya</option>
                            <option value="Tidak">Tidak</option>
                          </select>
                          {marital.sts_tunjangan != null &&
                            validatorMarital.current.message(
                              "status_tunjangan",
                              marital.sts_tunjangan,
                              "required"
                            )}
                        </div>
                        <div className="form-group col-md-6">
                          <label className="form-label" for="inputStatus">
                            Keterangan
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="keterangan"
                            value={marital.keterangan}
                            onChange={(e) => {
                              setMarital({
                                ...marital,
                                keterangan: e.target.value,
                              });
                              validatorMarital.current.showMessageFor(
                                "keterangan"
                              );
                            }}
                          />
                          {marital.keterangan != null &&
                            validatorMarital.current.message(
                              "keterangan",
                              marital.keterangan,
                              "required"
                            )}
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button type="submit" className="btn btn-primary">
                          {loadingMarital ? <LoadingIcon /> : "Tambah"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal modal-blur fade"
            id="ModalAnak"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Tambah Anak
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form
                    action="{{url('/')}/pegawai/anak/tambah/proses"
                    method="post"
                  >
                    <div className="form-row g-3 row">
                      <div className="form-group col-md-4">
                        <label className="form-label" for="inputKarpeg">
                          Nama
                        </label>
                        <input
                          type="text"
                          name="nama"
                          id="inputKarpeg"
                          className="form-control"
                          required
                        />
                      </div>
                      <div className="form-group col-md-4">
                        <label className="form-label" for="inputTtl">
                          Tempat
                        </label>
                        <input
                          type="text"
                          name="t_lahir"
                          className="form-control"
                        />
                      </div>
                      <div className="form-group col-md-4">
                        <label className="form-label" for="inputTgl">
                          Tgl Lahir
                        </label>
                        <input
                          type="date"
                          name="tgl_lahir"
                          className="form-control"
                        />
                      </div>
                      <div className="form-group col-md-4">
                        <label className="form-label" for="inputStatus">
                          Jenis Kelamin
                        </label>
                        <select
                          name="kelamin"
                          id="inputUser"
                          className="form-control"
                          required
                        >
                          <option>---</option>

                          <option value="L">Laki-laki</option>
                          <option value="P">Perempuan</option>
                        </select>
                      </div>
                      <div className="form-group col-md-4">
                        <label className="form-label" for="inputStatus">
                          Pendidikan
                        </label>
                        <select
                          name="pendidikan"
                          id="inputUser"
                          className="form-control"
                          required
                        >
                          <option>---</option>
                          <option value="{{$pdds->kode_pdd}">SD</option>
                        </select>
                      </div>
                      <div className="form-group col-md-4">
                        <label className="form-label" for="inputStatus">
                          Status Pernikahan
                        </label>
                        <select
                          name="sts_pernikahan"
                          id="inputUser"
                          className="form-control"
                          required
                        >
                          <option>---</option>
                          <option value="Menikah">Menikah</option>
                          <option value="Belum menikah">Belum menikah</option>
                        </select>
                      </div>
                      <div className="form-group col-md-6">
                        <label className="form-label" for="inputStatus">
                          Status Tunjangan
                        </label>
                        <select
                          name="sts_tunjangan"
                          id="inputUser"
                          className="form-control"
                          required
                        >
                          <option>---</option>
                          <option value="Iya">Iya</option>
                          <option value="Tidak">Tidak</option>
                        </select>
                      </div>
                      <div className="form-group col-md-6">
                        <label className="form-label" for="inputStatus">
                          Keterangan
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="keterangan"
                        />
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button type="submit" className="btn btn-primary">
                        Tambah
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal modal-blur fade"
            id="ModalOrtu"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Tambah Ortu
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form
                    action="{{url('/')}/pegawai/orangtua/tambah/proses"
                    method="post"
                  >
                    <div className="form-row g-3 row">
                      <div className="form-group col-md-4">
                        <label className="form-label" for="inputKarpeg">
                          Nama
                        </label>
                        <input
                          type="text"
                          name="nama"
                          id="inputKarpeg"
                          className="form-control"
                          required
                        />
                      </div>
                      <div className="form-group col-md-4">
                        <label className="form-label" for="inputTtl">
                          Tempat
                        </label>
                        <input
                          type="text"
                          name="t_lahir"
                          className="form-control"
                        />
                      </div>
                      <div className="form-group col-md-4">
                        <label className="form-label" for="inputTgl">
                          Tgl Lahir
                        </label>
                        <input
                          type="date"
                          name="tgl_lahir"
                          className="form-control"
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label className="form-label" for="inputStatus">
                          Jenis Kelamin
                        </label>
                        <select
                          name="kelamin"
                          id="inputUser"
                          className="form-control"
                          required
                        >
                          <option>---</option>

                          <option value="L">Laki-laki</option>
                          <option value="P">Perempuan</option>
                        </select>
                      </div>

                      <div className="form-group col-md-6">
                        <label className="form-label" for="inputStatus">
                          Alamat
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="alamat"
                        />
                      </div>

                      <div className="form-group col-md-6">
                        <label className="form-label" for="inputStatus">
                          Pekerjaan
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="pekerjaan"
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label className="form-label" for="inputStatus">
                          Keterangan
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="keterangan"
                        />
                      </div>
                    </div>

                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button type="submit" className="btn btn-primary">
                        Tambah
                      </button>
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

export default Profile;
