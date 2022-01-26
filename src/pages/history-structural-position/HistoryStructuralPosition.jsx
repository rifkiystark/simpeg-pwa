import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";
import "simple-react-validator/dist/locale/id";
import LoadingIcon from "../../components/loading-icon/LoadingIcon";
import Table from "../../components/table/Table";
import Toast from "../../components/toast/Toast";
import Const from "../../constant";
import { validateInput } from "../../helpers";
import { setStructuralPosition } from "../../reduxslice/competenceDataSlice";
import {
  masterGolongan,
  masterJabatanStruktural,
} from "../../repository/masterData";
import {
  addStructuralPosition,
  getStructuralPositions,
  deleteStructuralPosition,
  updateStructuralPosition,
} from "../../repository/structuralPosition";
import { tableApproved, tableSubmitted } from "./tableColumn";

function HistoryStructuralPosition() {
  // REACT ROUTER
  const location = useLocation();
  const router = useNavigate();

  // INITIAL DATA
  const user = location.state?.user;
  const me = JSON.parse(localStorage.getItem(Const.STORAGE_KEY.USER_INFO));

  // REDUX
  const dispatch = useDispatch();
  const structuralPosition = useSelector(
    (state) => state.competence.structuralPosition
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
              dispatch(setStructuralPosition(rowData));
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
              dispatch(setStructuralPosition(rowData));
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
  const [masterStructuralPostions, setMasterStructuralPostions] = useState([]);
  const [masterGroups, setMasterGroups] = useState([]);
  const [approved, setApproved] = useState([]);
  const [submitted, setSubmitted] = useState([]);
  const [dataAddStructuralPosition, setDataAddStructuralPosition] = useState({
    no_sk: null,
    tgl_sk: null,
    pejabat_sk: null,
    kode_jbts: null,
    tmt: null,
    kode_gol: null,
    ket: null,
    dokumen_sk: null,
    tamat_jabatan: null,
  });
  const [fileEdit, setFileEdit] = useState(null);
  const [fileEditStructuralPosition, setFileEditStructuralPosition] =
    useState(null);
  const [loadingAddStructuralPosition, setLoadingAddStructuralPosition] =
    useState(false);
  const [loadingEditStructuralPosition, setLoadingEditStructuralPosition] =
    useState(false);
  const [loadingDeleteStructuralPosition, setLoadingDeleteStructuralPosition] =
    useState(false);

  // VALIDATOR
  const validatorAdd = useRef(new SimpleReactValidator({ locale: "id" }));
  const validatorEdit = useRef(new SimpleReactValidator({ locale: "id" }));

  // Close Modal Ref
  const closeRef = useRef();

  // API
  const doGetMasterStructuralPosition = async () => {
    const { status, data } = await masterJabatanStruktural();
    if (status) {
      setMasterStructuralPostions(data);
    }
  };
  const doGetMasterGroup = async () => {
    const { status, data } = await masterGolongan();
    if (status) {
      setMasterGroups(data);
    }
  };
  const doGetStructuralPositions = async () => {
    const { status, data } = await getStructuralPositions(user.id);
    if (status) {
      setApproved(data.riwayatjabatan.filter((d) => d.status === 1));
      setSubmitted(data.riwayatjabatan.filter((d) => d.status === 0));
    }
  };

  const doAddStructuralPosition = async (e) => {
    e.preventDefault();
    if (validateInput(validatorAdd, dataAddStructuralPosition)) {
      setLoadingAddStructuralPosition(true);
      const fd = new FormData();
      fd.append("id_user", user.id);
      fd.append("no_sk", dataAddStructuralPosition.no_sk);
      fd.append("tgl_sk", dataAddStructuralPosition.tgl_sk);
      fd.append("pejabat_sk", dataAddStructuralPosition.pejabat_sk);
      fd.append("kode_jbts", dataAddStructuralPosition.kode_jbts);
      fd.append("kode_gol", dataAddStructuralPosition.kode_gol);
      fd.append("tmt", dataAddStructuralPosition.tmt);
      fd.append("tamat_jabatan", dataAddStructuralPosition.tamat_jabatan);
      fd.append("dokumen_sk", dataAddStructuralPosition.dokumen_sk);
      fd.append("ket", dataAddStructuralPosition.ket);

      const { status } = await addStructuralPosition(fd);
      if (status) {
        doGetStructuralPositions();
        Toast.successToast("Berhasil menambah data jabatan struktural");
        setDataAddStructuralPosition({
          no_sk: "",
          tgl_sk: "",
          pejabat_sk: "",
          kode_jbts: "",
          tmt: "",
          kode_gol: "",
          ket: "",
          dokumen_sk: "",
          tamat_jabatan: "",
        });
        setDataAddStructuralPosition({
          no_sk: null,
          tgl_sk: null,
          pejabat_sk: null,
          kode_jbts: null,
          tmt: null,
          kode_gol: null,
          ket: null,
          dokumen_sk: null,
          tamat_jabatan: null,
        });
      } else {
        Toast.errorToast("Gagal menambah data jabatan struktural");
      }
      setLoadingAddStructuralPosition(false);
    } else {
      Toast.warningToast("Harap isi semua data");
    }
  };

  const doEditStructuralPosition = async (e) => {
    e.preventDefault();
    if (validatorEdit.current.allValid()) {
      setLoadingEditStructuralPosition(true);
      const fd = new FormData();
      fd.append("id_peg", structuralPosition.id_peg);
      fd.append("id_jabatan", structuralPosition.id_jabatan);
      fd.append("no_sk", structuralPosition.no_sk);
      fd.append("tgl_sk", structuralPosition.tgl_sk);
      fd.append("pejabat_sk", structuralPosition.pejabat_sk);
      fd.append("kode_jbts", structuralPosition.kode_jbts);
      fd.append("kode_gol", structuralPosition.kode_gol);
      fd.append("tmt", structuralPosition.tmt);
      fd.append("tamat_jabatan", structuralPosition.tamat_jabatan);
      fd.append("ket", structuralPosition.ket);

      if (fileEdit != null) {
        fd.append("dokumen_sk", fileEdit);
      }

      const { status } = await updateStructuralPosition(fd);
      if (status) {
        doGetStructuralPositions();
        Toast.successToast("Berhasil memperbarui data");
      } else {
        Toast.errorToast("Gagal memperbarui data");
      }
      setLoadingEditStructuralPosition(false);
    } else {
      Toast.warningToast("Harap isi semua data");
    }
  };

  const doDeleteStructuralPosition = async () => {
    setLoadingDeleteStructuralPosition(true);
    const { status } = await deleteStructuralPosition(
      structuralPosition.id_jabatan
    );
    if (status) {
      doGetStructuralPositions();
      closeRef.current.click();
      Toast.successToast("Berhasil menghapus data");
    } else {
      Toast.errorToast("Gagal menghapus data");
    }
    setLoadingDeleteStructuralPosition(false);
  };

  // COMPONENT DID MOUNT
  useEffect(() => {
    if (!user) {
      router("/dashboard", { replace: true });
    } else {
      doGetMasterStructuralPosition();
      doGetMasterGroup();
      doGetStructuralPositions();
    }
  }, []);

  return (
    <>
      <div className="page-wrapper">
        <div className="container-xl">
          <div className="page-header d-print-none">
            <div className="row align-items-center">
              <div className="col">
                <div className="page-pretitle">Halaman Jabatan Struktural</div>
                <h2 className="page-title">
                  Riwayat Jabatan Struktural : Ananda Rifkiy Hasan
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
              <h3 className="card-title">Data Jabatan Struktural</h3>
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
                tableName="Riwayat Jabatan Struktural Disetujui"
              />
            </div>
          </div>
          <div className="card card-primary card-outline">
            <div className="card-body">
              <h3 className="card-title">Data Ajuan Jabatan Struktural</h3>
              <Table
                data={{ column: columnSubmitted, data: submitted }}
                tableName="Riwayat Jabatan Struktural Diajukan"
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
              <h5 className="modal-title">Tambah Jabatan Struktural</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={doAddStructuralPosition}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label>No. SK</label>
                    <input
                      type="text"
                      name="no_sk"
                      className="form-control"
                      value={dataAddStructuralPosition.no_sk}
                      onChange={(e) => {
                        setDataAddStructuralPosition({
                          ...dataAddStructuralPosition,
                          no_sk: e.target.value,
                        });
                        validatorAdd.current.showMessageFor("no_sk");
                      }}
                    />
                    {dataAddStructuralPosition.no_sk != null &&
                      validatorAdd.current.message(
                        "no_sk",
                        dataAddStructuralPosition.no_sk,
                        "required"
                      )}
                  </div>
                  <div className="col-md-6">
                    <label>Tanggal SK</label>
                    <input
                      type="date"
                      name="tgl_sk"
                      className="form-control"
                      value={dataAddStructuralPosition.tgl_sk}
                      onChange={(e) => {
                        setDataAddStructuralPosition({
                          ...dataAddStructuralPosition,
                          tgl_sk: e.target.value,
                        });
                        validatorAdd.current.showMessageFor("tanggal_sk");
                      }}
                    />
                    {dataAddStructuralPosition.tgl_sk != null &&
                      validatorAdd.current.message(
                        "tanggal_sk",
                        dataAddStructuralPosition.tgl_sk,
                        "required"
                      )}
                  </div>
                  <div className="col-md-6">
                    <label>Pejabat Pengesah</label>
                    <input
                      type="text"
                      name="pejabat_sk"
                      className="form-control"
                      value={dataAddStructuralPosition.pejabat_sk}
                      onChange={(e) => {
                        setDataAddStructuralPosition({
                          ...dataAddStructuralPosition,
                          pejabat_sk: e.target.value,
                        });
                        validatorAdd.current.showMessageFor("pejabat_sk");
                      }}
                    />
                    {dataAddStructuralPosition.pejabat_sk != null &&
                      validatorAdd.current.message(
                        "pejabat_sk",
                        dataAddStructuralPosition.pejabat_sk,
                        "required"
                      )}
                  </div>
                  <div className="col-md-6">
                    <label>Jabatan Struktural</label>
                    <select
                      name="kode_jbts"
                      className="form-control"
                      value={dataAddStructuralPosition.kode_jbts}
                      onChange={(e) => {
                        setDataAddStructuralPosition({
                          ...dataAddStructuralPosition,
                          kode_jbts: e.target.value,
                        });
                        validatorAdd.current.showMessageFor(
                          "jabatan_struktural"
                        );
                      }}
                    >
                      <option value="">Pilih jabatan</option>
                      {masterStructuralPostions.map((value, index) => {
                        return (
                          <option key={index} value={value.kode_jbts}>
                            {value.nama_jabatan}
                          </option>
                        );
                      })}
                    </select>
                    {dataAddStructuralPosition.kode_jbts != null &&
                      validatorAdd.current.message(
                        "jabatan_struktural",
                        dataAddStructuralPosition.kode_jbts,
                        "required"
                      )}
                  </div>
                  <div className="col-md-6">
                    <label>Terhitung Mulai</label>
                    <input
                      type="date"
                      name="tmt"
                      className="form-control"
                      value={dataAddStructuralPosition.tmt}
                      onChange={(e) => {
                        setDataAddStructuralPosition({
                          ...dataAddStructuralPosition,
                          tmt: e.target.value,
                        });
                        validatorAdd.current.showMessageFor("terhitung_mulai");
                      }}
                    />
                    {dataAddStructuralPosition.tmt != null &&
                      validatorAdd.current.message(
                        "terhitung_mulai",
                        dataAddStructuralPosition.tmt,
                        "required"
                      )}
                  </div>
                  <div className="col-md-6">
                    <label>Tamat Jabatan</label>
                    <input
                      type="date"
                      name="tamat_jabatan"
                      className="form-control"
                      value={dataAddStructuralPosition.tamat_jabatan}
                      onChange={(e) => {
                        setDataAddStructuralPosition({
                          ...dataAddStructuralPosition,
                          tamat_jabatan: e.target.value,
                        });
                        validatorAdd.current.showMessageFor("tamat_jabatan");
                      }}
                    />
                    {dataAddStructuralPosition.tamat_jabatan != null &&
                      validatorAdd.current.message(
                        "tamat_jabatan",
                        dataAddStructuralPosition.tamat_jabatan,
                        "required"
                      )}
                  </div>
                  <div className="col-md-6">
                    <label>Golongan</label>
                    <select
                      name="kode_gol"
                      className="form-control"
                      value={dataAddStructuralPosition.kode_gol}
                      onChange={(e) => {
                        setDataAddStructuralPosition({
                          ...dataAddStructuralPosition,
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
                    {dataAddStructuralPosition.kode_gol != null &&
                      validatorAdd.current.message(
                        "golongan",
                        dataAddStructuralPosition.kode_gol,
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
                        setDataAddStructuralPosition({
                          ...dataAddStructuralPosition,
                          dokumen_sk: e.target.files[0],
                        });
                        validatorAdd.current.showMessageFor("dokumen_sk");
                      }}
                    />
                    {dataAddStructuralPosition.dokumen_sk != null &&
                      validatorAdd.current.message(
                        "dokumen_sk",
                        dataAddStructuralPosition.dokumen_sk,
                        "required"
                      )}
                  </div>

                  <div className="col-md-12">
                    <label>Keterangan</label>
                    <input
                      type="text"
                      name="ket"
                      className="form-control"
                      value={dataAddStructuralPosition.ket}
                      onChange={(e) => {
                        setDataAddStructuralPosition({
                          ...dataAddStructuralPosition,
                          ket: e.target.value,
                        });
                        validatorAdd.current.showMessageFor("keterangan");
                      }}
                    />
                    {dataAddStructuralPosition.ket != null &&
                      validatorAdd.current.message(
                        "keterangan",
                        dataAddStructuralPosition.ket,
                        "required"
                      )}
                  </div>

                  <div className="col-md-12">
                    <button type="submit" className="btn btn-primary">
                      {loadingAddStructuralPosition ? (
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
              <h5 className="modal-title">Edit Jabatan Struktural</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={doEditStructuralPosition}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label>No. SK</label>
                    <input
                      type="text"
                      name="no_sk"
                      className="form-control"
                      value={structuralPosition.no_sk}
                      onChange={(e) => {
                        dispatch(
                          setStructuralPosition({
                            ...structuralPosition,
                            no_sk: e.target.value,
                          })
                        );
                        validatorEdit.current.showMessageFor("no_sk");
                      }}
                    />
                    {structuralPosition.no_sk != null &&
                      validatorEdit.current.message(
                        "no_sk",
                        structuralPosition.no_sk,
                        "required"
                      )}
                  </div>
                  <div className="col-md-6">
                    <label>Tanggal SK</label>
                    <input
                      type="date"
                      name="tgl_sk"
                      className="form-control"
                      value={structuralPosition.tgl_sk}
                      onChange={(e) => {
                        dispatch(
                          setStructuralPosition({
                            ...structuralPosition,
                            tgl_sk: e.target.value,
                          })
                        );
                        validatorEdit.current.showMessageFor("tanggal_sk");
                      }}
                    />
                    {structuralPosition.tgl_sk != null &&
                      validatorEdit.current.message(
                        "tanggal_sk",
                        structuralPosition.tgl_sk,
                        "required"
                      )}
                  </div>
                  <div className="col-md-6">
                    <label>Pejabat Pengesah</label>
                    <input
                      type="text"
                      name="pejabat_sk"
                      className="form-control"
                      value={structuralPosition.pejabat_sk}
                      onChange={(e) => {
                        dispatch(
                          setStructuralPosition({
                            ...structuralPosition,
                            pejabat_sk: e.target.value,
                          })
                        );
                        validatorEdit.current.showMessageFor("pejabat_sk");
                      }}
                    />
                    {structuralPosition.pejabat_sk != null &&
                      validatorEdit.current.message(
                        "pejabat_sk",
                        structuralPosition.pejabat_sk,
                        "required"
                      )}
                  </div>
                  <div className="col-md-6">
                    <label>Jabatan Struktural</label>
                    <select
                      name="kode_jbts"
                      className="form-control"
                      value={structuralPosition.kode_jbts}
                      onChange={(e) => {
                        dispatch(
                          setStructuralPosition({
                            ...structuralPosition,
                            kode_jbts: e.target.value,
                          })
                        );
                        validatorEdit.current.showMessageFor(
                          "jabatan_struktural"
                        );
                      }}
                    >
                      <option value="">Pilih jabatan</option>
                      {masterStructuralPostions.map((value, index) => {
                        return (
                          <option key={index} value={value.kode_jbts}>
                            {value.nama_jabatan}
                          </option>
                        );
                      })}
                    </select>
                    {structuralPosition.kode_jbts != null &&
                      validatorEdit.current.message(
                        "jabatan_struktural",
                        structuralPosition.kode_jbts,
                        "required"
                      )}
                  </div>
                  <div className="col-md-6">
                    <label>Terhitung Mulai</label>
                    <input
                      type="date"
                      name="tmt"
                      className="form-control"
                      value={structuralPosition.tmt}
                      onChange={(e) => {
                        dispatch(
                          setStructuralPosition({
                            ...structuralPosition,
                            tmt: e.target.value,
                          })
                        );
                        validatorEdit.current.showMessageFor("terhitung_mulai");
                      }}
                    />
                    {structuralPosition.tmt != null &&
                      validatorEdit.current.message(
                        "terhitung_mulai",
                        structuralPosition.tmt,
                        "required"
                      )}
                  </div>
                  <div className="col-md-6">
                    <label>Tamat Jabatan</label>
                    <input
                      type="date"
                      name="tamat_jabatan"
                      className="form-control"
                      value={structuralPosition.tamat_jabatan}
                      onChange={(e) => {
                        dispatch(
                          setStructuralPosition({
                            ...structuralPosition,
                            tamat_jabatan: e.target.value,
                          })
                        );
                        validatorEdit.current.showMessageFor("tamat_jabatan");
                      }}
                    />
                    {structuralPosition.tamat_jabatan != null &&
                      validatorEdit.current.message(
                        "tamat_jabatan",
                        structuralPosition.tamat_jabatan,
                        "required"
                      )}
                  </div>
                  <div className="col-md-6">
                    <label>Golongan</label>
                    <select
                      name="kode_gol"
                      className="form-control"
                      value={structuralPosition.kode_gol}
                      onChange={(e) => {
                        dispatch(
                          setStructuralPosition({
                            ...structuralPosition,
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
                    {structuralPosition.kode_gol != null &&
                      validatorEdit.current.message(
                        "golongan",
                        structuralPosition.kode_gol,
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
                    {structuralPosition.dokumen_sk != null &&
                      validatorEdit.current.message(
                        "dokumen_sk",
                        structuralPosition.dokumen_sk,
                        "required"
                      )}
                  </div>

                  <div className="col-md-12">
                    <label>Keterangan</label>
                    <input
                      type="text"
                      name="ket"
                      className="form-control"
                      value={structuralPosition.ket}
                      onChange={(e) => {
                        dispatch(
                          setStructuralPosition({
                            ...structuralPosition,
                            ket: e.target.value,
                          })
                        );
                        validatorEdit.current.showMessageFor("keterangan");
                      }}
                    />
                    {structuralPosition.ket != null &&
                      validatorEdit.current.message(
                        "keterangan",
                        structuralPosition.ket,
                        "required"
                      )}
                  </div>

                  <div className="col-md-12">
                    <button type="submit" className="btn btn-primary">
                      {loadingEditStructuralPosition ? (
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
                Anda akan menghapus data jabatan struktural{" "}
                <b>{structuralPosition.no_sk}</b>
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
                        doDeleteStructuralPosition();
                      }}
                    >
                      {loadingDeleteStructuralPosition ? (
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

export default HistoryStructuralPosition;
