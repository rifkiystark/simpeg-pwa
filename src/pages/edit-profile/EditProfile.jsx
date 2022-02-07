import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";
import "simple-react-validator/dist/locale/id";
import LoadingWrapper from "../../components/loading-wrapper/LoadingWrapper";
import Toast from "../../components/toast/Toast";
import Const from "../../constant";
import { validateInput } from "../../helpers";
import { editProfileGet, editProfilePost } from "../../repository/employee";

function EditProfile() {
  // REACT ROUTER
  const location = useLocation();
  const router = useNavigate();

  // INITIAL DATA
  const user = location.state?.user;
  const me = JSON.parse(localStorage.getItem(Const.STORAGE_KEY.USER_INFO));

  // STATE
  const [loadingContent, setLoadingContent] = useState(false);
  const [pendidikans, setPendidikan] = useState([]);
  const [upt, setUpt] = useState([]);
  const [agama, setAgama] = useState([]);
  const [pegawai, setPegawai] = useState({
    id_peg: "",
    nip: "",
    nama: "",
    nip_lama: "",
    t_lahir: "",
    tgl_lahir: "",
    jns_kelamin: "",
    kode_agama: "",
    sts_marital: "",
    kode_pdd: "",
    nama_sekolah: "",
    tahun_sttb: "",
    gelar_depan: "",
    gelar_belakang: "",
    hobi: "",
    sts_pegawai: "",
    id_user: "",
    no_telp: "",
    foto: "",
    created_at: "",
    updated_at: "",
    id_upt: "",
    nik: "",
    alamat_ktp: "",
    alamat_domisili: "",
    sts_keaktifan: "",
    tmt: "",
  });
  const [photo, setPhoto] = useState(null);
  const [password, setPassword] = useState(null);

  // VaLIDaTOR
  const validatorTab_1 = useRef(new SimpleReactValidator({ locale: "id" }));
  const validatorTab_2 = useRef(new SimpleReactValidator({ locale: "id" }));
  const validatorTab_3 = useRef(new SimpleReactValidator({ locale: "id" }));

  // REF
  const refTab_1 = useRef();
  const refTab_2 = useRef();
  const refTab_3 = useRef();

  // API CALL
  const doGetEditData = async () => {
    setLoadingContent(true);
    const { status, data, message } = await editProfileGet(user.id);
    setPegawai(data.data.pegawai);
    setPendidikan(data.data.pendidikans);
    setUpt(data.data.upt);
    setAgama(data.data.agama);
    setLoadingContent(false);
    console.log(data);
  };

  const doEdit = async (e) => {
    e.preventDefault();
    console.log(pegawai)
    if (
      // !validateInput(validatorTab_1, pegawai) ||
      // !validateInput(validatorTab_2, pegawai) ||
      !validateInput(validatorTab_3, pegawai)
    ) {
      Toast.warningToast("Isi semua data");
      return;
    }

    const fd = new FormData();
    fd.append("id_user", user.id);
    Object.keys(pegawai).forEach((key) => fd.append(key, pegawai[key]));

    if (photo != null) {
      fd.append("photo", photo);
    }

    if (password != null) {
      fd.append("password", password);
    }

    const { status, data, message } = await editProfilePost(fd);
    if (status) {
      doGetEditData();
      setPegawai({
        id_peg: "",
        nip: "",
        nama: "",
        nip_lama: "",
        t_lahir: "",
        tgl_lahir: "",
        jns_kelamin: "",
        kode_agama: "",
        sts_marital: "",
        kode_pdd: "",
        nama_sekolah: "",
        tahun_sttb: "",
        gelar_depan: "",
        gelar_belakang: "",
        hobi: "",
        sts_pegawai: "",
        id_user: "",
        no_telp: "",
        foto: "",
        created_at: "",
        updated_at: "",
        id_upt: "",
        nik: "",
        alamat_ktp: "",
        alamat_domisili: "",
        sts_keaktifan: "",
        tmt: "",
      });
      setPegawai({
        id_peg: null,
        nip: null,
        nama: null,
        nip_lama: null,
        t_lahir: null,
        tgl_lahir: null,
        jns_kelamin: null,
        kode_agama: null,
        sts_marital: null,
        kode_pdd: null,
        nama_sekolah: null,
        tahun_sttb: null,
        gelar_depan: null,
        gelar_belakang: null,
        hobi: null,
        sts_pegawai: null,
        id_user: null,
        no_telp: null,
        foto: null,
        created_at: null,
        updated_at: null,
        id_upt: null,
        nik: null,
        alamat_ktp: null,
        alamat_domisili: null,
        sts_keaktifan: null,
        tmt: null,
      });
      setPhoto(null);
      setPassword("");
      setPassword(null);
    } else {
      Toast.errorToast("Gagal memperbarui data");
    }
  };

  // COMPONENT DID MOUNT
  useEffect(() => {
    doGetEditData();
  }, []);

  if (loadingContent) {
    return <LoadingWrapper />;
  }
  return (
    <div className="page-wrapper">
      <div className="container-xl">
        <div className="page-header d-print-none">
          <div className="row align-items-center">
            <div className="col">
              <div className="page-pretitle">Halaman Profile</div>
              <h2 className="page-title">Edit Profil</h2>
            </div>
          </div>
        </div>
      </div>

      <section className="page-body">
        <div className="container-xl">
          <div className="card card-primary card-outline">
            <div className="card-body" style={{ paddingTop: 24 }}>
              <form onSubmit={doEdit}>
                <nav>
                  <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <a
                      className="nav-item nav-link active"
                      id="nav-home-tab"
                      data-bs-toggle="tab"
                      href="#nav-home"
                      role="tab"
                      aria-controls="nav-home"
                      aria-selected="true"
                      ref={refTab_1}
                    >
                      Umum
                    </a>
                    <a
                      className="nav-item nav-link"
                      id="nav-profile-tab"
                      data-bs-toggle="tab"
                      href="#nav-profile"
                      role="tab"
                      aria-controls="nav-profile"
                      aria-selected="false"
                      ref={refTab_2}
                    >
                      Detail 1
                    </a>
                    <a
                      className="nav-item nav-link"
                      id="nav-contact-tab"
                      data-bs-toggle="tab"
                      href="#nav-contact"
                      role="tab"
                      aria-controls="nav-contact"
                      aria-selected="false"
                      ref={refTab_3}
                    >
                      Detail 2
                    </a>
                  </div>
                </nav>
                <div className="tab-content" id="nav-tabContent">
                  <div
                    className="tab-pane fade show active p-3"
                    id="nav-home"
                    role="tabpanel"
                    aria-labelledby="nav-home-tab"
                  >
                    <div className="row g-3">
                      <div className="form-group col-md-6">
                        <label className="form-label required" for="inputNip">
                          NIK
                        </label>
                        <input
                          value={pegawai.nik}
                          type="number"
                          className="form-control"
                          onChange={(e) => {
                            setPegawai({ ...pegawai, nik: e.target.value });
                            validatorTab_1.current.showMessageFor("nik");
                          }}
                        />
                        {pegawai.nik != null &&
                          validatorTab_1.current.message(
                            "nik",
                            pegawai.nik,
                            "required"
                          )}
                      </div>
                      <div className="form-group col-md-6">
                        <label className="form-label required" for="inputNama">
                          Nama
                        </label>
                        <input
                          value={pegawai.nama}
                          type="text"
                          className="form-control"
                          id="inputNama"
                          onChange={(e) => {
                            setPegawai({ ...pegawai, nama: e.target.value });
                            validatorTab_1.current.showMessageFor("nama");
                          }}
                        />
                        {pegawai.nama != null &&
                          validatorTab_1.current.message(
                            "nama",
                            pegawai.nama,
                            "required"
                          )}
                      </div>
                      <div className="form-group col-md-6">
                        <label className="form-label required" for="inputNama">
                          Alamat KTP
                        </label>
                        <textarea
                          className="form-control"
                          name="alamat_ktp"
                          rows="4"
                          onChange={(e) => {
                            setPegawai({
                              ...pegawai,
                              alamat_ktp: e.target.value,
                            });
                            validatorTab_1.current.showMessageFor("alamat_ktp");
                          }}
                        >
                          {pegawai.alamat_ktp}
                        </textarea>
                        {pegawai.alamat_ktp != null &&
                          validatorTab_1.current.message(
                            "alamat_ktp",
                            pegawai.alamat_ktp,
                            "required"
                          )}
                      </div>
                      <div className="form-group col-md-6">
                        <label className="form-label required" for="inputNama">
                          Alamat Domisili
                        </label>
                        <textarea
                          className="form-control"
                          name="alamat_domisili"
                          rows="4"
                          onChange={(e) => {
                            setPegawai({
                              ...pegawai,
                              alamat_domisili: e.target.value,
                            });
                            validatorTab_1.current.showMessageFor(
                              "alamat_domisili"
                            );
                          }}
                        >
                          {pegawai.alamat_domisili}
                        </textarea>
                        {pegawai.alamat_domisili != null &&
                          validatorTab_1.current.message(
                            "alamat_domisili",
                            pegawai.alamat_domisili,
                            "required"
                          )}
                      </div>
                      <div className="form-group col-md-6">
                        <label className="form-label required" for="inputTtl">
                          Tempat
                        </label>
                        <input
                          value={pegawai.t_lahir}
                          type="text"
                          className="form-control"
                          onChange={(e) => {
                            setPegawai({ ...pegawai, t_lahir: e.target.value });
                            validatorTab_1.current.showMessageFor(
                              "tempat_lahir"
                            );
                          }}
                        />
                        {pegawai.t_lahir != null &&
                          validatorTab_1.current.message(
                            "tempat_lahir",
                            pegawai.t_lahir,
                            "required"
                          )}
                      </div>
                      <div className="form-group col-md-6">
                        <label className="form-label required" for="inputTgl">
                          Tgl Lahir
                        </label>
                        <input
                          value={pegawai.tgl_lahir}
                          type="date"
                          name="tgl_lahir"
                          className="form-control"
                          onChange={(e) => {
                            setPegawai({
                              ...pegawai,
                              tgl_lahir: e.target.value,
                            });
                            validatorTab_1.current.showMessageFor(
                              "tanggal_lahir"
                            );
                          }}
                        />
                        {pegawai.tgl_lahir != null &&
                          validatorTab_1.current.message(
                            "tanggal_lahir",
                            pegawai.tgl_lahir,
                            "required"
                          )}
                      </div>
                      <div className="form-group col-md-4">
                        <label
                          className="form-label required"
                          for="inputKelamin"
                        >
                          Jenis Kelamin
                        </label>
                        <select
                          className="form-select"
                          value={pegawai.jns_kelamin}
                          onChange={(e) => {
                            setPegawai({
                              ...pegawai,
                              jns_kelamin: e.target.value,
                            });
                            validatorTab_1.current.showMessageFor(
                              "jenis_kelamin"
                            );
                          }}
                        >
                          <option value="">---</option>
                          <option value="L" selected>
                            Laki-laki
                          </option>
                          <option value="P">Perempuan</option>
                        </select>
                        {pegawai.jns_kelamin != null &&
                          validatorTab_1.current.message(
                            "jenis_kelamin",
                            pegawai.jns_kelamin,
                            "required"
                          )}
                      </div>
                      <div className="form-group col-md-4">
                        <label
                          className="form-label required"
                          for="inputKelamin"
                        >
                          Status Pernikahan
                        </label>
                        <select
                          className="form-select"
                          value={pegawai.sts_marital}
                          onChange={(e) => {
                            setPegawai({
                              ...pegawai,
                              sts_marital: e.target.value,
                            });
                            validatorTab_1.current.showMessageFor(
                              "status_pernikahan"
                            );
                          }}
                        >
                          <option value="">---</option>
                          <option value="Menikah" selected>
                            Menikah
                          </option>
                          <option value="Belum Menikah">Belum Menikah</option>
                        </select>
                        {pegawai.sts_marital != null &&
                          validatorTab_1.current.message(
                            "status_pernikahan",
                            pegawai.sts_marital,
                            "required"
                          )}
                      </div>
                      <div className="form-group col-md-4">
                        <label
                          className="form-label required"
                          for="inputStatus"
                        >
                          Agama
                        </label>
                        <select
                          className="form-select"
                          value={pegawai.kode_agama}
                          onChange={(e) => {
                            setPegawai({
                              ...pegawai,
                              kode_agama: e.target.value,
                            });
                            validatorTab_1.current.showMessageFor("agama");
                          }}
                        >
                          <option value="">---</option>
                          {agama.map((value, index) => {
                            return (
                              <option key={index} value={value.kode_agama}>
                                {value.agama}
                              </option>
                            );
                          })}
                        </select>
                        {pegawai.kode_agama != null &&
                          validatorTab_1.current.message(
                            "agama",
                            pegawai.kode_agama,
                            "required"
                          )}
                      </div>
                      <div className="form-group col-md-4">
                        <label className="form-label required" for="inputTgl">
                          No.Telp
                        </label>
                        <input
                          value={pegawai.no_telp}
                          type="number"
                          className="form-control"
                          onChange={(e) => {
                            setPegawai({ ...pegawai, no_telp: e.target.value });
                            validatorTab_1.current.showMessageFor("no_telepon");
                          }}
                        />
                        {pegawai.no_telp != null &&
                          validatorTab_1.current.message(
                            "no_telepon",
                            pegawai.no_telp,
                            "required"
                          )}
                      </div>

                      <div className="form-group col-md-4">
                        <label className="form-label" for="inputFoto">
                          Foto
                        </label>
                        <input
                          type="file"
                          className="form-control"
                          name="foto"
                          id="inputFoto"
                          onChange={(e) => {
                            setPhoto(e.target.files[0]);
                          }}
                        />
                      </div>
                      <div className="form-group col-md-4">
                        <label className="form-label" for="inputFoto">
                          Password Baru
                        </label>
                        <div className="input-group input-group-flat">
                          <input
                            type="password"
                            id="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => {
                              setPassword(e.target.value);
                            }}
                          />
                          <span className="input-group-text">
                            <a
                              href="#"
                              className="link-secondary"
                              title="Show password"
                              data-bs-toggle="tooltip"
                              onclick="togglePassword()"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="icon"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path
                                  stroke="none"
                                  d="M0 0h24v24H0z"
                                  fill="none"
                                />
                                <circle cx="12" cy="12" r="2" />
                                <path d="M22 12c-2.667 4.667 -6 7 -10 7s-7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7" />
                              </svg>
                            </a>
                          </span>
                        </div>
                      </div>
                      <input type="hidden" name="user" value="9" />
                    </div>
                  </div>
                  <div
                    className="tab-pane fade p-3"
                    id="nav-profile"
                    role="tabpanel"
                    aria-labelledby="nav-profile-tab"
                  >
                    <div className="row g-3">
                      <div className="form-group col-md-6">
                        <label className="form-label required" for="inputNip">
                          NIP / NIPY
                        </label>
                        <input
                          value={pegawai.nip}
                          type="number"
                          className="form-control"
                          onChange={(e) => {
                            setPegawai({ ...pegawai, nip: e.target.value });
                            validatorTab_2.current.showMessageFor("nip");
                          }}
                        />
                        {pegawai.nip != null &&
                          validatorTab_2.current.message(
                            "nip",
                            pegawai.nip,
                            "required"
                          )}
                      </div>
                      <div className="form-group col-md-6">
                        <label className="form-label" for="inputNip">
                          NIP / NIPY Lama
                        </label>
                        <input
                          value={pegawai.nip_lama}
                          type="number"
                          className="form-control"
                          id="inputNip"
                          onChange={(e) => {
                            setPegawai({
                              ...pegawai,
                              nip_lama: e.target.value,
                            });
                            validatorTab_2.current.showMessageFor("nip_lama");
                          }}
                        />
                        {pegawai.nip_lama != null &&
                          validatorTab_2.current.message(
                            "nip_lama",
                            pegawai.nip_lama,
                            "required"
                          )}
                      </div>
                      <div className="form-group col-md-6">
                        <label className="form-label" for="inputNip">
                          TMT
                        </label>
                        <input
                          value={pegawai.tmt}
                          type="date"
                          className="form-control"
                          id="inputNip"
                          onChange={(e) => {
                            setPegawai({ ...pegawai, tmt: e.target.value });
                            validatorTab_2.current.showMessageFor("tmt");
                          }}
                        />
                        {pegawai.tmt != null &&
                          validatorTab_2.current.message(
                            "tmt",
                            pegawai.tmt,
                            "required"
                          )}
                      </div>
                      <div className="form-group col-md-6">
                        <label className="form-label required" for="inputFoto">
                          UPT
                        </label>
                        <select
                          className="form-control"
                          value={pegawai.id_upt}
                          onChange={(e) => {
                            setPegawai({ ...pegawai, id_upt: e.target.value });
                            validatorTab_2.current.showMessageFor("upt");
                          }}
                        >
                          <option value="">---</option>
                          {upt.map((value, index) => {
                            return (
                              <option key={index} value={value.id}>
                                {value.upt}
                              </option>
                            );
                          })}
                        </select>
                        {pegawai.id_upt != null &&
                          validatorTab_2.current.message(
                            "upt",
                            pegawai.id_upt,
                            "required"
                          )}
                      </div>
                      <div className="form-group col-md-6">
                        <label
                          className="form-label required"
                          for="inputStatus"
                        >
                          Status Kepegawaian
                        </label>
                        <select
                          className="form-select"
                          value={pegawai.sts_pegawai}
                          onChange={(e) => {
                            setPegawai({
                              ...pegawai,
                              sts_pegawai: e.target.value,
                            });
                            validatorTab_2.current.showMessageFor(
                              "status_pegawai"
                            );
                          }}
                        >
                          <option value="">---</option>
                          <option value="Tetap" selected>
                            Tetap
                          </option>
                          <option value="Tidak Tetap">Tidak Tetap</option>
                        </select>
                        {pegawai.sts_pegawai != null &&
                          validatorTab_2.current.message(
                            "status_pegawai",
                            pegawai.sts_pegawai,
                            "required"
                          )}
                      </div>

                      <div className="form-group col-md-6">
                        <label
                          className="form-label required"
                          for="inputStatus"
                        >
                          Status
                        </label>
                        <select
                          className="form-select"
                          value={pegawai.sts_keaktifan}
                          onChange={(e) => {
                            setPegawai({
                              ...pegawai,
                              sts_keaktifan: e.target.value,
                            });
                            validatorTab_2.current.showMessageFor(
                              "status_keaktifan"
                            );
                          }}
                        >
                          <option value="">---</option>
                          <option value="Aktif" selected>
                            Aktif
                          </option>
                          <option value="Tidak Aktif">Tidak Aktif</option>
                          <option value="Cuti">Cuti</option>
                          <option value="Pensiun">Pernsiun</option>
                        </select>
                        {pegawai.sts_keaktifan != null &&
                          validatorTab_2.current.message(
                            "status_keaktifan",
                            pegawai.sts_keaktifan,
                            "required"
                          )}
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade p-3"
                    id="nav-contact"
                    role="tabpanel"
                    aria-labelledby="nav-contact-tab"
                  >
                    <div className="row g-3">
                      <div className="form-group col-md-4">
                        <label
                          className="form-label required"
                          for="inputStatus"
                        >
                          Pendidikan Terakhir
                        </label>
                        <select
                          className="form-select"
                          value={pegawai.kode_pdd}
                          onChange={(e) => {
                            setPegawai({
                              ...pegawai,
                              kode_pdd: e.target.value,
                            });
                            validatorTab_3.current.showMessageFor("pendidikan");
                          }}
                        >
                          <option value="">---</option>
                          {pendidikans.map((value, index) => {
                            return (
                              <option key={index} value={value.kode_pdd}>
                                {value.pendidikan}
                              </option>
                            );
                          })}
                        </select>
                        {pegawai.kode_pdd != null &&
                          validatorTab_3.current.message(
                            "pendidikan",
                            pegawai.kode_pdd,
                            "required"
                          )}
                      </div>
                      <div className="form-group col-md-4">
                        <label className="form-label required" for="inputNip">
                          Institusi Pendidikan
                        </label>
                        <input
                          value={pegawai.nama_sekolah}
                          type="text"
                          className="form-control"
                          onChange={(e) => {
                            setPegawai({
                              ...pegawai,
                              nama_sekolah: e.target.value,
                            });
                            validatorTab_3.current.showMessageFor(
                              "institusi_pendidikan"
                            );
                          }}
                        />
                        {pegawai.nama_sekolah != null &&
                          validatorTab_3.current.message(
                            "institusi_pendidikan",
                            pegawai.nama_sekolah,
                            "required"
                          )}
                      </div>
                      <div className="form-group col-md-4">
                        <label
                          className="form-label required"
                          for="inputKarpeg"
                        >
                          Tahun Lulus
                        </label>
                        <input
                          value={pegawai.tahun_sttb}
                          type="number"
                          className="form-control"
                          onChange={(e) => {
                            setPegawai({
                              ...pegawai,
                              tahun_sttb: e.target.value,
                            });
                            validatorTab_3.current.showMessageFor(
                              "tahun_lulus"
                            );
                          }}
                        />
                        {pegawai.tahun_sttb != null &&
                          validatorTab_3.current.message(
                            "tahun_lulus",
                            pegawai.tahun_sttb,
                            "required"
                          )}
                      </div>
                      <div className="form-group col-md-6">
                        <label className="form-label" for="inputKarsu">
                          Gelar Depan
                        </label>
                        <input
                          value={pegawai.gelar_depan}
                          type="text"
                          className="form-control"
                          onChange={(e) => {
                            setPegawai({
                              ...pegawai,
                              gelar_depan: e.target.value,
                            });
                            validatorTab_3.current.showMessageFor(
                              "gelar_depan"
                            );
                          }}
                        />
                        {pegawai.gelar_depan != null &&
                          validatorTab_3.current.message(
                            "gelar_depan",
                            pegawai.gelar_depan,
                            "required"
                          )}
                      </div>
                      <div className="form-group col-md-6">
                        <label className="form-label" for="inputAskes">
                          Gelar Belakang
                        </label>
                        <input
                          value={pegawai.gelar_belakang}
                          type="text"
                          className="form-control"
                          onChange={(e) => {
                            setPegawai({
                              ...pegawai,
                              gelar_belakang: e.target.value,
                            });
                            validatorTab_3.current.showMessageFor(
                              "gelar_belakang"
                            );
                          }}
                        />
                        {pegawai.gelar_belakang != null &&
                          validatorTab_3.current.message(
                            "gelar_belakang",
                            pegawai.gelar_belakang,
                            "required"
                          )}
                      </div>

                      <div className="form-group col-md-8">
                        <label className="form-label" for="inputKarpeg">
                          Hobi
                        </label>
                        <input
                          value={pegawai.hobi}
                          type="text"
                          className="form-control"
                          onChange={(e) => {
                            setPegawai({ ...pegawai, hobi: e.target.value });
                            validatorTab_3.current.showMessageFor("hobi");
                          }}
                        />
                        {pegawai.hobi != null &&
                          validatorTab_3.current.message(
                            "hobi",
                            pegawai.hobi,
                            "required"
                          )}
                      </div>
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary ms-3">
                  Perbarui
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default EditProfile;
