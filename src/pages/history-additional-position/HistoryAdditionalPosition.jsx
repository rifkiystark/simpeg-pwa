import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Table from "../../components/table/Table";
import Const from "../../constant";
import { tableApproved, tableSubmitted } from "./tableColumn";
import { setAdditionalPosition } from "../../reduxslice/competenceDataSlice";
import SimpleReactValidator from "simple-react-validator";
import "simple-react-validator/dist/locale/id";
import { useEffect, useRef, useState } from "react";
import { masterJabatanTambahan } from "../../repository/masterData";
import {
  addAdditionalPosition,
  deleteAdditionalPosition,
  getAdditionalPositions,
  updateAdditionalPosition,
} from "../../repository/additionalPosition";
import Toast from "../../components/toast/Toast";
import { validateInput } from "../../helpers";
import LoadingIcon from "../../components/loading-icon/LoadingIcon";

function HistoryAdditionalPosition() {
  // REACT ROUTER
  const location = useLocation();
  const router = useNavigate();

  // INITIAL DATA
  const user = location.state?.user;
  const me = JSON.parse(localStorage.getItem(Const.STORAGE_KEY.USER_INFO));

  // REDUX
  const dispatch = useDispatch();
  const additionalPosition = useSelector(
    (state) => state.competence.additionalPosition
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
              dispatch(setAdditionalPosition(rowData));
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
              dispatch(setAdditionalPosition(rowData));
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
  const [masterAdditionalPostions, setMasterAdditionalPostions] = useState([]);
  const [masterGroups, setMasterGroups] = useState([]);
  const [approved, setApproved] = useState([]);
  const [submitted, setSubmitted] = useState([]);
  const [dataAddAdditionalPosition, setDataAddAdditionalPosition] = useState({
    no_sk: null,
    tgl_sk: null,
    pejabat_sk: null,
    kode_jbtft: null,
    tmt: null,
    tamat_jabatan: null,
    dokumen_sk: null,
  });
  const [fileEdit, setFileEdit] = useState(null);
  const [loadingAddAdditionalPosition, setLoadingAddAdditionalPosition] =
    useState(false);
  const [loadingEditAdditionalPosition, setLoadingEditAdditionalPosition] =
    useState(false);
  const [loadingDeleteAdditionalPosition, setLoadingDeleteAdditionalPosition] =
    useState(false);

  // VALIDATOR
  const validatorAdd = useRef(new SimpleReactValidator({ locale: "id" }));
  const validatorEdit = useRef(new SimpleReactValidator({ locale: "id" }));

  // Close Modal Ref
  const closeRef = useRef();

  // API
  const doGetMasterAdditionalPosition = async () => {
    const { status, data } = await masterJabatanTambahan();
    if (status) {
      setMasterAdditionalPostions(data);
    }
  };

  const doGetAdditionalPositions = async () => {
    const { status, data } = await getAdditionalPositions(user.id);
    if (status) {
      setApproved(data.riwayatjabatanft.filter((d) => d.status === 1));
      setSubmitted(data.riwayatjabatanft.filter((d) => d.status === 0));
    }
  };

  const doAddAdditionalPosition = async (e) => {
    e.preventDefault();
    if (validateInput(validatorAdd, dataAddAdditionalPosition)) {
      setLoadingAddAdditionalPosition(true);
      const fd = new FormData();
      fd.append("id_user", user.id);
      fd.append("no_sk", dataAddAdditionalPosition.no_sk);
      fd.append("tgl_sk", dataAddAdditionalPosition.tgl_sk);
      fd.append("pejabat_sk", dataAddAdditionalPosition.pejabat_sk);
      fd.append("kode_jbtft", dataAddAdditionalPosition.kode_jbtft);
      fd.append("tmt", dataAddAdditionalPosition.tmt);
      fd.append("tamat_jabatan", dataAddAdditionalPosition.tamat_jabatan);
      fd.append("dokumen_sk", dataAddAdditionalPosition.dokumen_sk);

      const { status } = await addAdditionalPosition(fd);
      if (status) {
        doGetAdditionalPositions();
        Toast.successToast("Berhasil menambah data jabatan struktural");
        setDataAddAdditionalPosition({
          no_sk: "",
          tgl_sk: "",
          pejabat_sk: "",
          kode_jbtft: "",
          tmt: "",
          tamat_jabatan: "",
          dokumen_sk: "",
        });
        setDataAddAdditionalPosition({
          no_sk: null,
          tgl_sk: null,
          pejabat_sk: null,
          kode_jbtft: null,
          tmt: null,
          tamat_jabatan: null,
          dokumen_sk: null,
        });
      } else {
        Toast.errorToast("Gagal menambah data jabatan struktural");
      }
      setLoadingAddAdditionalPosition(false);
    } else {
      Toast.warningToast("Harap isi semua data");
    }
  };

  const doEditAdditionalPosition = async (e) => {
    e.preventDefault();
    if (validatorEdit.current.allValid()) {
      setLoadingEditAdditionalPosition(true);
      const fd = new FormData();
      fd.append("id_peg", additionalPosition.id_peg);
      fd.append("id_jbtft", additionalPosition.id_jbtft);
      fd.append("no_sk", additionalPosition.no_sk);
      fd.append("tgl_sk", additionalPosition.tgl_sk);
      fd.append("pejabat_sk", additionalPosition.pejabat_sk);
      fd.append("kode_jbtft", additionalPosition.kode_jbtft);
      fd.append("tmt", additionalPosition.tmt);
      fd.append("tamat_jabatan", additionalPosition.tamat_jabatan);

      if (fileEdit != null) {
        fd.append("dokumen_sk", fileEdit);
      }

      const { status } = await updateAdditionalPosition(fd);
      if (status) {
        doGetAdditionalPositions();
        Toast.successToast("Berhasil memperbarui data");
      } else {
        Toast.errorToast("Gagal memperbarui data");
      }
      setLoadingEditAdditionalPosition(false);
    } else {
      Toast.warningToast("Harap isi semua data");
    }
  };

  const doDeleteAdditionalPosition = async () => {
    setLoadingDeleteAdditionalPosition(true);
    const { status } = await deleteAdditionalPosition(
      additionalPosition.id_jbtft
    );
    if (status) {
      doGetAdditionalPositions();
      closeRef.current.click();
      Toast.successToast("Berhasil menghapus data");
    } else {
      Toast.errorToast("Gagal menghapus data");
    }
    setLoadingDeleteAdditionalPosition(false);
  };

  // COMPONENT DID MOUNT
  useEffect(() => {
    doGetMasterAdditionalPosition();
    doGetAdditionalPositions();
  }, []);

  return (
    <>
      <div className="page-wrapper">
        <div className="container-xl">
          <div className="page-header d-print-none">
            <div className="row align-items-center">
              <div className="col">
                <div className="page-pretitle">Halaman Jabatan Tambahan</div>
                <h2 className="page-title">
                  Riwayat Jabatan Tambahan : Ananda Rifkiy Hasan
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
              <h3 className="card-title">Data Jabatan Tambahan</h3>
              <a
                href=""
                className="btn btn-success mb-3"
                data-bs-toggle="modal"
                data-bs-target="#modal-add"
              >
                Tambah
              </a>
              <Table
                data={{ column: columnApproved, data: approved }}
                tableName="Riwayat Jabatan Tambahan Disetujui"
              />
            </div>
          </div>
          <div className="card card-primary card-outline">
            <div className="card-body">
              <h3 className="card-title">Data Ajuan Jabatan Tambahan</h3>
              <Table
                data={{ column: columnSubmitted, data: submitted }}
                tableName="Riwayat Jabatan Tambahan Diajukan"
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
              <h5 className="modal-title">Tambah Jabatan Tambahan</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={doAddAdditionalPosition}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">No. SK</label>
                    <input
                      type="text"
                      name="no_sk"
                      className="form-control"
                      value={dataAddAdditionalPosition.no_sk}
                      onChange={(e) => {
                        setDataAddAdditionalPosition({
                          ...dataAddAdditionalPosition,
                          no_sk: e.target.value,
                        });
                        validatorAdd.current.showMessageFor("no_sk");
                      }}
                    />
                    {dataAddAdditionalPosition.no_sk != null &&
                      validatorAdd.current.message(
                        "no_sk",
                        dataAddAdditionalPosition.no_sk,
                        "required"
                      )}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Tanggal SK</label>
                    <input
                      type="date"
                      name="tgl_sk"
                      className="form-control"
                      value={dataAddAdditionalPosition.tgl_sk}
                      onChange={(e) => {
                        setDataAddAdditionalPosition({
                          ...dataAddAdditionalPosition,
                          tgl_sk: e.target.value,
                        });
                        validatorAdd.current.showMessageFor("tgl_sk");
                      }}
                    />
                    {dataAddAdditionalPosition.tgl_sk != null &&
                      validatorAdd.current.message(
                        "tgl_sk",
                        dataAddAdditionalPosition.tgl_sk,
                        "required"
                      )}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Pejabat Pengesah</label>
                    <input
                      type="text"
                      name="pejabat_sk"
                      className="form-control"
                      value={dataAddAdditionalPosition.pejabat_sk}
                      onChange={(e) => {
                        setDataAddAdditionalPosition({
                          ...dataAddAdditionalPosition,
                          pejabat_sk: e.target.value,
                        });
                        validatorAdd.current.showMessageFor("pejabat_sk");
                      }}
                    />
                    {dataAddAdditionalPosition.pejabat_sk != null &&
                      validatorAdd.current.message(
                        "pejabat_sk",
                        dataAddAdditionalPosition.pejabat_sk,
                        "required"
                      )}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Jabatan Tambahan</label>
                    <select
                      name="kode_jbtft"
                      className="form-control"
                      value={dataAddAdditionalPosition.kode_jbtft}
                      onChange={(e) => {
                        setDataAddAdditionalPosition({
                          ...dataAddAdditionalPosition,
                          kode_jbtft: e.target.value,
                        });
                        validatorAdd.current.showMessageFor("jabatan_tambahan");
                      }}
                    >
                      <option value="">Pilih jabatan</option>
                      {masterAdditionalPostions.map((value, index) => {
                        return (
                          <option value={value.kode_jbtft} key={index}>
                            {value.tugas_tambahan}
                          </option>
                        );
                      })}
                    </select>
                    {dataAddAdditionalPosition.kode_jbtft != null &&
                      validatorAdd.current.message(
                        "jabatan_tambahan",
                        dataAddAdditionalPosition.kode_jbtft,
                        "required"
                      )}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Terhitung Mulai</label>
                    <input
                      type="date"
                      name="tmt"
                      className="form-control"
                      value={dataAddAdditionalPosition.tmt}
                      onChange={(e) => {
                        setDataAddAdditionalPosition({
                          ...dataAddAdditionalPosition,
                          tmt: e.target.value,
                        });
                        validatorAdd.current.showMessageFor("tmt");
                      }}
                    />
                    {dataAddAdditionalPosition.tmt != null &&
                      validatorAdd.current.message(
                        "tmt",
                        dataAddAdditionalPosition.tmt,
                        "required"
                      )}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Tamat Jabatan</label>
                    <input
                      type="date"
                      name="tamat_jabatan"
                      className="form-control"
                      value={dataAddAdditionalPosition.tamat_jabatan}
                      onChange={(e) => {
                        setDataAddAdditionalPosition({
                          ...dataAddAdditionalPosition,
                          tamat_jabatan: e.target.value,
                        });
                        validatorAdd.current.showMessageFor("tamat_jabatan");
                      }}
                    />
                    {dataAddAdditionalPosition.tamat_jabatan != null &&
                      validatorAdd.current.message(
                        "tamat_jabatan",
                        dataAddAdditionalPosition.tamat_jabatan,
                        "required"
                      )}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">File Dokumen SK</label>
                    <input
                      type="file"
                      name="dokumen_sk"
                      className="form-control"
                      onChange={(e) => {
                        setDataAddAdditionalPosition({
                          ...dataAddAdditionalPosition,
                          dokumen_sk: e.target.files[0],
                        });
                        validatorAdd.current.showMessageFor("dokumen_sk");
                      }}
                    />
                    {dataAddAdditionalPosition.dokumen_sk != null &&
                      validatorAdd.current.message(
                        "dokumen_sk",
                        dataAddAdditionalPosition.dokumen_sk,
                        "required"
                      )}
                  </div>

                  <div className="col-md-12">
                    <button type="submit" className="btn btn-primary">
                      {loadingAddAdditionalPosition ? (
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
              <h5 className="modal-title">Edit Jabatan Tambahan</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={doEditAdditionalPosition}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">No. SK</label>
                    <input
                      type="text"
                      name="no_sk"
                      className="form-control"
                      value={additionalPosition.no_sk}
                      onChange={(e) => {
                        dispatch(
                          setAdditionalPosition({
                            ...additionalPosition,
                            no_sk: e.target.value,
                          })
                        );
                        validatorEdit.current.showMessageFor("no_sk");
                      }}
                    />
                    {addAdditionalPosition.no_sk != null &&
                      validatorEdit.current.message(
                        "no_sk",
                        addAdditionalPosition.no_sk,
                        "required"
                      )}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Tanggal SK</label>
                    <input
                      type="date"
                      name="tgl_sk"
                      className="form-control"
                      value={additionalPosition.tgl_sk}
                      onChange={(e) => {
                        dispatch(
                          setAdditionalPosition({
                            ...additionalPosition,
                            tgl_sk: e.target.value,
                          })
                        );
                        validatorEdit.current.showMessageFor("tgl_sk");
                      }}
                    />
                    {addAdditionalPosition.tgl_sk != null &&
                      validatorEdit.current.message(
                        "tgl_sk",
                        addAdditionalPosition.tgl_sk,
                        "required"
                      )}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Pejabat Pengesah</label>
                    <input
                      type="text"
                      name="pejabat_sk"
                      className="form-control"
                      value={additionalPosition.pejabat_sk}
                      onChange={(e) => {
                        dispatch(
                          setAdditionalPosition({
                            ...additionalPosition,
                            pejabat_sk: e.target.value,
                          })
                        );
                        validatorEdit.current.showMessageFor("pejabat_sk");
                      }}
                    />
                    {addAdditionalPosition.pejabat_sk != null &&
                      validatorEdit.current.message(
                        "pejabat_sk",
                        addAdditionalPosition.pejabat_sk,
                        "required"
                      )}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Jabatan Tambahan</label>
                    <select
                      name="kode_jbtft"
                      className="form-control"
                      value={additionalPosition.kode_jbtft}
                      onChange={(e) => {
                        dispatch(
                          setAdditionalPosition({
                            ...additionalPosition,
                            kode_jbtft: e.target.value,
                          })
                        );
                        validatorEdit.current.showMessageFor(
                          "jabatan_tambahan"
                        );
                      }}
                    >
                      <option value="">Pilih jabatan</option>
                      {masterAdditionalPostions.map((value, index) => {
                        return (
                          <option key={index} value={value.kode_jbtft}>
                            {value.tugas_tambahan}
                          </option>
                        );
                      })}
                    </select>
                    {additionalPosition.kode_jbtft != null &&
                      validatorEdit.current.message(
                        "jabatan_tambahan",
                        additionalPosition.kode_jbtft,
                        "required"
                      )}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Terhitung Mulai</label>
                    <input
                      type="date"
                      name="tmt"
                      className="form-control"
                      value={additionalPosition.tmt}
                      onChange={(e) => {
                        dispatch(
                          setAdditionalPosition({
                            ...additionalPosition,
                            tmt: e.target.value,
                          })
                        );
                        validatorEdit.current.showMessageFor("tmt");
                      }}
                    />
                    {addAdditionalPosition.tmt != null &&
                      validatorEdit.current.message(
                        "tmt",
                        addAdditionalPosition.tmt,
                        "required"
                      )}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Tamat Jabatan</label>
                    <input
                      type="date"
                      name="tamat_jabatan"
                      className="form-control"
                      value={additionalPosition.tamat_jabatan}
                      onChange={(e) => {
                        dispatch(
                          setAdditionalPosition({
                            ...additionalPosition,
                            tamat_jabatan: e.target.value,
                          })
                        );
                        validatorEdit.current.showMessageFor("tamat_jabatan");
                      }}
                    />
                    {addAdditionalPosition.tamat_jabatan != null &&
                      validatorEdit.current.message(
                        "tamat_jabatan",
                        addAdditionalPosition.tamat_jabatan,
                        "required"
                      )}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">File Dokumen SK</label>
                    <input
                      type="file"
                      name="dokumen_sk"
                      className="form-control"
                      onChange={(e) => {
                        setFileEdit(e.target.files[0]);
                        validatorEdit.current.showMessageFor("dokumen_sk");
                      }}
                    />
                    {additionalPosition.dokumen_sk != null &&
                      validatorEdit.current.message(
                        "dokumen_sk",
                        additionalPosition.dokumen_sk,
                        "required"
                      )}
                  </div>

                  <div className="col-md-12">
                    <button type="submit" className="btn btn-primary">
                      {loadingEditAdditionalPosition ? (
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
                Anda akan menghapus data jabatan tambahan{" "}
                <b>{additionalPosition.no_sk}</b>
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
                        doDeleteAdditionalPosition();
                      }}
                    >
                      {loadingDeleteAdditionalPosition ? (
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

export default HistoryAdditionalPosition;
