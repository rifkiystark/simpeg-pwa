import Table from "../../components/table/Table";
import { useEffect, useRef, useState } from "react";
import {
  masterGolongan,
  masterJabatanFungsional,
} from "../../repository/masterData";
import {
  addFunctionalPosition,
  deleteFunctionalPosition,
  getFunctionalPositions,
  updateFunctionalPosition,
} from "../../repository/functionalPosition";
import { useLocation, useNavigate } from "react-router-dom";
import Const from "../../constant";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import "simple-react-validator/dist/locale/id";
import { tableApproved, tableSubmitted } from "./tableColumn";
import { setFunctionalPosition } from "../../reduxslice/competenceDataSlice";
import LoadingIcon from "../../components/loading-icon/LoadingIcon";
import { validateInput } from "../../helpers";
import Toast from "../../components/toast/Toast";

function HistoryFunctionalPosition() {
  // REACT ROUTER
  const location = useLocation();
  const router = useNavigate();

  // INITIAL DATA
  const user = location.state?.user;
  const me = JSON.parse(localStorage.getItem(Const.STORAGE_KEY.USER_INFO));

  // REDUX
  const dispatch = useDispatch();
  const functionalPosition = useSelector(
    (state) => state.competence.functionalPosition
  );

  // TABLE COLUMN
  let columnApproved = [
    ...tableApproved.column,
    {
      name: "Aksi",
      key: "",
      render: (data, index, rowData) => (
        <>
          <a
            className="btn btn-primary btn-sm m-1"
            href="#"
            data-bs-toggle="modal"
            data-bs-target="#modal-edit"
            onClick={() => {
              dispatch(setFunctionalPosition(rowData));
            }}
          >
            Edit
          </a>
          <a
            className="btn btn-danger btn-sm m-1"
            href="#"
            data-bs-toggle="modal"
            data-bs-target="#modal-delete"
            onClick={() => {
              dispatch(setFunctionalPosition(rowData));
            }}
          >
            Hapus
          </a>
        </>
      ),
    },
  ];
  let columnSubmitted = tableSubmitted.column;

  // STATE
  const [masterFunctionalPosition, setMasterFunctionalPosition] = useState([]);
  const [masterGroups, setMasterGroups] = useState([]);
  const [approved, setApproved] = useState([]);
  const [submitted, setSubmitted] = useState([]);
  const [dataAddFunctionalPosition, setDataAddFunctionalPosition] = useState({
    no_sk: null,
    tgl_sk: null,
    pejabat_sk: null,
    kode_jbtf: null,
    tmt: null,
    kode_gol: null,
    ket: null,
    dokumen_sk: null,
    tamat_jabatan: null,
  });
  const [fileEdit, setFileEdit] = useState(null);
  const [loadingAddFunctionalPosition, setLoadingAddFunctionalPosition] =
    useState(false);
  const [loadingEditFunctionalPosition, setLoadingEditFunctionalPosition] =
    useState(false);
  const [loadingDeleteFunctionalPosition, setLoadingDeleteFunctionalPosition] =
    useState(false);

  // VALIDATOR
  const validatorAdd = useRef(new SimpleReactValidator({ locale: "id" }));
  const validatorEdit = useRef(new SimpleReactValidator({ locale: "id" }));

  // Close Modal Ref
  const closeRef = useRef();

  // API CALL
  const doGetMasterFunctionalPosition = async () => {
    const { status, data } = await masterJabatanFungsional();
    if (status) {
      setMasterFunctionalPosition(data);
    }
  };
  const doGetMasterGroup = async () => {
    const { status, data } = await masterGolongan();
    if (status) {
      setMasterGroups(data);
    }
  };
  const doGetFunctionalPositions = async () => {
    const { status, data } = await getFunctionalPositions(user.id);
    if (status) {
      setApproved(data.riwayatjabatanf.filter((d) => d.status === 1));
      setSubmitted(data.riwayatjabatanf.filter((d) => d.status === 0));
    }
  };

  const doAddFunctionalPosition = async (e) => {
    e.preventDefault();
    console.log(dataAddFunctionalPosition);
    if (validateInput(validatorAdd, dataAddFunctionalPosition)) {
      setLoadingAddFunctionalPosition(true);
      const fd = new FormData();
      fd.append("id_user", user.id);
      fd.append("no_sk", dataAddFunctionalPosition.no_sk);
      fd.append("tgl_sk", dataAddFunctionalPosition.tgl_sk);
      fd.append("pejabat_sk", dataAddFunctionalPosition.pejabat_sk);
      fd.append("kode_jbtf", dataAddFunctionalPosition.kode_jbtf);
      fd.append("kode_gol", dataAddFunctionalPosition.kode_gol);
      fd.append("tmt", dataAddFunctionalPosition.tmt);
      fd.append("tamat_jabatan", dataAddFunctionalPosition.tamat_jabatan);
      fd.append("dokumen_sk", dataAddFunctionalPosition.dokumen_sk);
      fd.append("ket", dataAddFunctionalPosition.ket);

      const { status } = await addFunctionalPosition(fd);
      if (status) {
        doGetFunctionalPositions();
        Toast.successToast("Berhasil menambah data jabatan fungsional");
        setDataAddFunctionalPosition({
          no_sk: "",
          tgl_sk: "",
          pejabat_sk: "",
          kode_jbtf: "",
          tmt: "",
          kode_gol: "",
          ket: "",
          dokumen_sk: "",
          tamat_jabatan: "",
        });
        setDataAddFunctionalPosition({
          no_sk: null,
          tgl_sk: null,
          pejabat_sk: null,
          kode_jbtf: null,
          tmt: null,
          kode_gol: null,
          ket: null,
          dokumen_sk: null,
          tamat_jabatan: null,
        });
      } else {
        Toast.errorToast("Gagal menambah data jabatan struktural");
      }
      setLoadingAddFunctionalPosition(false);
    } else {
      Toast.warningToast("Harap isi semua data");
    }
  };

  const doEditFunctionalPosition = async (e) => {
    e.preventDefault();
    if (validatorEdit.current.allValid()) {
      setLoadingEditFunctionalPosition(true);
      const fd = new FormData();
      fd.append("id_peg", functionalPosition.id_peg);
      fd.append("id_jabatanf", functionalPosition.id_jabatanf);
      fd.append("no_sk", functionalPosition.no_sk);
      fd.append("tgl_sk", functionalPosition.tgl_sk);
      fd.append("pejabat_sk", functionalPosition.pejabat_sk);
      fd.append("kode_jbtf", functionalPosition.kode_jbtf);
      fd.append("kode_gol", functionalPosition.kode_gol);
      fd.append("tmt", functionalPosition.tmt);
      fd.append("tamat_jabatan", functionalPosition.tamat_jabatan);
      fd.append("ket", functionalPosition.ket);

      if (fileEdit != null) {
        fd.append("dokumen_sk", fileEdit);
      }

      const { status } = await updateFunctionalPosition(fd);
      if (status) {
        doGetFunctionalPositions();
        Toast.successToast("Berhasil memperbarui data");
      } else {
        Toast.errorToast("Gagal memperbarui data");
      }
      setLoadingEditFunctionalPosition(false);
    } else {
      Toast.warningToast("Harap isi semua data");
    }
  };

  const doDeleteFunctionalPosition = async () => {
    setLoadingDeleteFunctionalPosition(true);
    const { status } = await deleteFunctionalPosition(
      functionalPosition.id_jabatanf
    );
    if (status) {
      doGetFunctionalPositions();
      closeRef.current.click();
      Toast.successToast("Berhasil menghapus data");
    } else {
      Toast.errorToast("Gagal menghapus data");
    }
    setLoadingDeleteFunctionalPosition(false);
  };

  // COMPONENT DID MOUNT
  useEffect(() => {
    doGetMasterGroup();
    doGetMasterFunctionalPosition();
    doGetFunctionalPositions();
  }, []);
  return (
    <>
      <div className="page-wrapper">
        <div className="container-xl">
          <div className="page-header d-print-none">
            <div className="row align-items-center">
              <div className="col">
                <div className="page-pretitle">Halaman Jabatan Fungsional</div>
                <h2 className="page-title">
                  Riwayat Jabatan Fungsional : {user.name}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="page-body pb-4">
        <div className="container-xl">
          <div className="card card-primary card-outline mb-3">
            <div className="card-body">
              <h3 className="card-title">Data Jabatan Fungsional</h3>
              <a
                href="#"
                className="btn btn-success mb-3"
                data-bs-toggle="modal"
                data-bs-target="#modal-add"
              >
                Tambah
              </a>
              <Table
                data={{ column: columnApproved, data: approved }}
                tableName="Riwayat Jabatan Fungsional Disetujui"
              />
            </div>
          </div>
          <div className="card card-primary card-outline">
            <div className="card-body">
              <h3 className="card-title">Data Ajuan Jabatan Fungsional</h3>
              <Table
                data={{ column: columnSubmitted, data: submitted }}
                tableName="Riwayat Jabatan Fungsional Diajukan"
              />
            </div>
          </div>
        </div>
      </section>
      <div
        className="modal modal-blur fade"
        id="modal-add"
        tabindex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-lg modal-dialog-centered"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Tambah Jabatan Fungsional</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={doAddFunctionalPosition}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label>No. SK</label>
                    <input
                      type="text"
                      name="no_sk"
                      className="form-control"
                      value={dataAddFunctionalPosition.no_sk}
                      onChange={(e) => {
                        setDataAddFunctionalPosition({
                          ...dataAddFunctionalPosition,
                          no_sk: e.target.value,
                        });
                        validatorAdd.current.showMessageFor("no_sk");
                      }}
                    />
                    {dataAddFunctionalPosition.no_sk != null &&
                      validatorAdd.current.message(
                        "no_sk",
                        dataAddFunctionalPosition.no_sk,
                        "required"
                      )}
                  </div>
                  <div className="col-md-6">
                    <label>Tanggal SK</label>
                    <input
                      type="date"
                      name="tgl_sk"
                      className="form-control"
                      value={dataAddFunctionalPosition.tgl_sk}
                      onChange={(e) => {
                        setDataAddFunctionalPosition({
                          ...dataAddFunctionalPosition,
                          tgl_sk: e.target.value,
                        });
                        validatorAdd.current.showMessageFor("tanggal_sk");
                      }}
                    />
                    {dataAddFunctionalPosition.tgl_sk != null &&
                      validatorAdd.current.message(
                        "tanggal_sk",
                        dataAddFunctionalPosition.tgl_sk,
                        "required"
                      )}
                  </div>
                  <div className="col-md-6">
                    <label>Pejabat Pengesah</label>
                    <input
                      type="text"
                      name="pejabat_sk"
                      className="form-control"
                      value={dataAddFunctionalPosition.pejabat_sk}
                      onChange={(e) => {
                        setDataAddFunctionalPosition({
                          ...dataAddFunctionalPosition,
                          pejabat_sk: e.target.value,
                        });
                        validatorAdd.current.showMessageFor("pejabat_sk");
                      }}
                    />
                    {dataAddFunctionalPosition.pejabat_sk != null &&
                      validatorAdd.current.message(
                        "pejabat_sk",
                        dataAddFunctionalPosition.pejabat_sk,
                        "required"
                      )}
                  </div>
                  <div className="col-md-6">
                    <label>Jabatan Fungsional</label>
                    <select
                      name="kode_jbtf"
                      className="form-control"
                      value={dataAddFunctionalPosition.kode_jbtf}
                      onChange={(e) => {
                        setDataAddFunctionalPosition({
                          ...dataAddFunctionalPosition,
                          kode_jbtf: e.target.value,
                        });
                        validatorAdd.current.showMessageFor(
                          "jabatan_fungsional"
                        );
                      }}
                    >
                      <option value="">Pilih jabatan</option>
                      {masterFunctionalPosition.map((value, index) => {
                        return (
                          <option key={index} value={value.kode_jbtf}>
                            {value.nama_jabatan}
                          </option>
                        );
                      })}
                    </select>
                    {dataAddFunctionalPosition.kode_jbtf != null &&
                      validatorAdd.current.message(
                        "jabatan_fungsional",
                        dataAddFunctionalPosition.kode_jbtf,
                        "required"
                      )}
                  </div>
                  <div className="col-md-6">
                    <label>Terhitung Mulai</label>
                    <input
                      type="date"
                      name="tmt"
                      className="form-control"
                      value={dataAddFunctionalPosition.tmt}
                      onChange={(e) => {
                        setDataAddFunctionalPosition({
                          ...dataAddFunctionalPosition,
                          tmt: e.target.value,
                        });
                        validatorAdd.current.showMessageFor("terhitung_mulai");
                      }}
                    />
                    {dataAddFunctionalPosition.tmt != null &&
                      validatorAdd.current.message(
                        "terhitung_mulai",
                        dataAddFunctionalPosition.tmt,
                        "required"
                      )}
                  </div>
                  <div className="col-md-6">
                    <label>Tamat Jabatan</label>
                    <input
                      type="date"
                      name="tamat_jabatan"
                      className="form-control"
                      value={dataAddFunctionalPosition.tamat_jabatan}
                      onChange={(e) => {
                        setDataAddFunctionalPosition({
                          ...dataAddFunctionalPosition,
                          tamat_jabatan: e.target.value,
                        });
                        validatorAdd.current.showMessageFor("tamat_jabatan");
                      }}
                    />
                    {dataAddFunctionalPosition.tamat_jabatan != null &&
                      validatorAdd.current.message(
                        "tamat_jabatan",
                        dataAddFunctionalPosition.tamat_jabatan,
                        "required"
                      )}
                  </div>
                  <div className="col-md-6">
                    <label>Golongan</label>
                    <select
                      name="kode_gol"
                      className="form-control"
                      value={dataAddFunctionalPosition.kode_gol}
                      onChange={(e) => {
                        setDataAddFunctionalPosition({
                          ...dataAddFunctionalPosition,
                          kode_gol: e.target.value,
                        });
                        validatorAdd.current.showMessageFor("golongan");
                      }}
                    >
                      <option value="">Pilih golongan</option>
                      {masterGroups.map((value, index) => {
                        return (
                          <option key={index} value={value.kode_gol}>
                            {value.pangkat}
                          </option>
                        );
                      })}
                    </select>
                    {dataAddFunctionalPosition.kode_gol != null &&
                      validatorAdd.current.message(
                        "golongan",
                        dataAddFunctionalPosition.kode_gol,
                        "required"
                      )}
                  </div>
                  <div className="col-md-6">
                    <label>File Dokumen SK</label>
                    <input
                      type="file"
                      name="dokumen_sk"
                      className="form-control"
                      onChange={(e) => {
                        setDataAddFunctionalPosition({
                          ...dataAddFunctionalPosition,
                          dokumen_sk: e.target.files[0],
                        });
                        validatorAdd.current.showMessageFor("dokumen_sk");
                      }}
                    />
                    {dataAddFunctionalPosition.dokumen_sk != null &&
                      validatorAdd.current.message(
                        "dokumen_sk",
                        dataAddFunctionalPosition.dokumen_sk,
                        "required"
                      )}
                  </div>

                  <div className="col-md-12">
                    <label>Keterangan</label>
                    <input
                      type="text"
                      name="ket"
                      className="form-control"
                      value={dataAddFunctionalPosition.ket}
                      onChange={(e) => {
                        setDataAddFunctionalPosition({
                          ...dataAddFunctionalPosition,
                          ket: e.target.value,
                        });
                        validatorAdd.current.showMessageFor("keterangan");
                      }}
                    />
                    {dataAddFunctionalPosition.ket != null &&
                      validatorAdd.current.message(
                        "keterangan",
                        dataAddFunctionalPosition.ket,
                        "required"
                      )}
                  </div>

                  <div className="col-md-12">
                    <button type="submit" className="btn btn-primary">
                      {loadingAddFunctionalPosition ? (
                        <LoadingIcon />
                      ) : (
                        "Tambah"
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal modal-blur fade"
        id="modal-edit"
        tabindex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-lg modal-dialog-centered"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Jabatan Fungsional</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={doEditFunctionalPosition}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label>No. SK</label>
                    <input
                      type="text"
                      name="no_sk"
                      className="form-control"
                      value={functionalPosition.no_sk}
                      onChange={(e) => {
                        dispatch(
                          setFunctionalPosition({
                            ...functionalPosition,
                            no_sk: e.target.value,
                          })
                        );
                        validatorEdit.current.showMessageFor("no_sk");
                      }}
                    />
                    {functionalPosition.no_sk != null &&
                      validatorEdit.current.message(
                        "no_sk",
                        functionalPosition.no_sk,
                        "required"
                      )}
                  </div>
                  <div className="col-md-6">
                    <label>Tanggal SK</label>
                    <input
                      type="date"
                      name="tgl_sk"
                      className="form-control"
                      value={functionalPosition.tgl_sk}
                      onChange={(e) => {
                        dispatch(
                          setFunctionalPosition({
                            ...functionalPosition,
                            tgl_sk: e.target.value,
                          })
                        );
                        validatorEdit.current.showMessageFor("tanggal_sk");
                      }}
                    />
                    {functionalPosition.tgl_sk != null &&
                      validatorEdit.current.message(
                        "tanggal_sk",
                        functionalPosition.tgl_sk,
                        "required"
                      )}
                  </div>
                  <div className="col-md-6">
                    <label>Pejabat Pengesah</label>
                    <input
                      type="text"
                      name="pejabat_sk"
                      className="form-control"
                      value={functionalPosition.pejabat_sk}
                      onChange={(e) => {
                        dispatch(
                          setFunctionalPosition({
                            ...functionalPosition,
                            pejabat_sk: e.target.value,
                          })
                        );
                        validatorEdit.current.showMessageFor("pejabat_sk");
                      }}
                    />
                    {functionalPosition.pejabat_sk != null &&
                      validatorEdit.current.message(
                        "pejabat_sk",
                        functionalPosition.pejabat_sk,
                        "required"
                      )}
                  </div>
                  <div className="col-md-6">
                    <label>Jabatan Fungsional</label>
                    <select
                      name="kode_jbtf"
                      className="form-control"
                      value={functionalPosition.kode_jbtf}
                      onChange={(e) => {
                        dispatch(
                          setFunctionalPosition({
                            ...functionalPosition,
                            kode_jbtf: e.target.value,
                          })
                        );
                        validatorEdit.current.showMessageFor(
                          "jabatan_fungsional"
                        );
                      }}
                    >
                      <option value="">Pilih jabatan</option>
                      {masterFunctionalPosition.map((value, index) => {
                        return (
                          <option key={index} value={value.kode_jbtf}>
                            {value.nama_jabatan}
                          </option>
                        );
                      })}
                    </select>
                    {functionalPosition.kode_jbtf != null &&
                      validatorEdit.current.message(
                        "jabatan_fungsional",
                        functionalPosition.kode_jbtf,
                        "required"
                      )}
                  </div>
                  <div className="col-md-6">
                    <label>Terhitung Mulai</label>
                    <input
                      type="date"
                      name="tmt"
                      className="form-control"
                      value={functionalPosition.tmt}
                      onChange={(e) => {
                        dispatch(
                          setFunctionalPosition({
                            ...functionalPosition,
                            tmt: e.target.value,
                          })
                        );
                        validatorEdit.current.showMessageFor("terhitung_mulai");
                      }}
                    />
                    {functionalPosition.tmt != null &&
                      validatorEdit.current.message(
                        "terhitung_mulai",
                        functionalPosition.tmt,
                        "required"
                      )}
                  </div>
                  <div className="col-md-6">
                    <label>Tamat Jabatan</label>
                    <input
                      type="date"
                      name="tamat_jabatan"
                      className="form-control"
                      value={functionalPosition.tamat_jabatan}
                      onChange={(e) => {
                        dispatch(
                          setFunctionalPosition({
                            ...functionalPosition,
                            tamat_jabatan: e.target.value,
                          })
                        );
                        validatorEdit.current.showMessageFor("tamat_jabatan");
                      }}
                    />
                    {functionalPosition.tamat_jabatan != null &&
                      validatorEdit.current.message(
                        "tamat_jabatan",
                        functionalPosition.tamat_jabatan,
                        "required"
                      )}
                  </div>
                  <div className="col-md-6">
                    <label>Golongan</label>
                    <select
                      name="kode_gol"
                      className="form-control"
                      value={functionalPosition.kode_gol}
                      onChange={(e) => {
                        dispatch(
                          setFunctionalPosition({
                            ...functionalPosition,
                            kode_gol: e.target.value,
                          })
                        );
                        validatorEdit.current.showMessageFor("golongan");
                      }}
                    >
                      <option value="">Pilih golongan</option>
                      {masterGroups.map((value, index) => {
                        return (
                          <option key={index} value={value.kode_gol}>
                            {value.pangkat}
                          </option>
                        );
                      })}
                    </select>
                    {functionalPosition.kode_gol != null &&
                      validatorEdit.current.message(
                        "golongan",
                        functionalPosition.kode_gol,
                        "required"
                      )}
                  </div>
                  <div className="col-md-6">
                    <label>File Dokumen SK</label>
                    <input
                      type="file"
                      name="dokumen_sk"
                      className="form-control"
                      onChange={(e) => {
                        setFileEdit(e.target.files[0]);
                        validatorEdit.current.showMessageFor("dokumen_sk");
                      }}
                    />
                    {functionalPosition.dokumen_sk != null &&
                      validatorEdit.current.message(
                        "dokumen_sk",
                        functionalPosition.dokumen_sk,
                        "required"
                      )}
                  </div>

                  <div className="col-md-12">
                    <label>Keterangan</label>
                    <input
                      type="text"
                      name="ket"
                      className="form-control"
                      value={functionalPosition.ket}
                      onChange={(e) => {
                        dispatch(
                          setFunctionalPosition({
                            ...functionalPosition,
                            ket: e.target.value,
                          })
                        );
                        validatorEdit.current.showMessageFor("keterangan");
                      }}
                    />
                    {functionalPosition.ket != null &&
                      validatorEdit.current.message(
                        "keterangan",
                        functionalPosition.ket,
                        "required"
                      )}
                  </div>

                  <div className="col-md-12">
                    <button type="submit" className="btn btn-primary">
                      {loadingEditFunctionalPosition ? (
                        <LoadingIcon />
                      ) : (
                        "Perbarui"
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal modal-blur fade"
        id="modal-delete"
        tabIndex="-1"
        role="dialog"
        aria-modal="true"
        style={{ paddingRight: 6 }}
      >
        <div
          className="modal-dialog modal-sm modal-dialog-centered"
          role="document"
        >
          <div className="modal-content">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              ref={closeRef}
            ></button>
            <div className="modal-status bg-danger"></div>
            <div className="modal-body text-center py-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon mb-2 text-danger icon-lg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M12 9v2m0 4v.01"></path>
                <path d="M5 19h14a2 2 0 0 0 1.84 -2.75l-7.1 -12.25a2 2 0 0 0 -3.5 0l-7.1 12.25a2 2 0 0 0 1.75 2.75"></path>
              </svg>
              <h3>Apakah anda yakin?</h3>
              <div className="text-muted">
                Anda akan menghapus data jabatan fungsional{" "}
                <b>{functionalPosition.no_sk}</b>
              </div>
            </div>
            <div className="modal-footer">
              <div className="w-100">
                <div className="row">
                  <div className="col">
                    <button
                      className="btn btn-white w-100"
                      data-bs-dismiss="modal"
                    >
                      Batal
                    </button>
                  </div>
                  <div className="col">
                    <button
                      className="btn btn-danger w-100"
                      onClick={() => {
                        doDeleteFunctionalPosition();
                      }}
                    >
                      {loadingDeleteFunctionalPosition ? (
                        <LoadingIcon />
                      ) : (
                        "Hapus"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HistoryFunctionalPosition;
