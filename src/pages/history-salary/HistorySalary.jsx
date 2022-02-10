import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";
import "simple-react-validator/dist/locale/id";
import LoadingIcon from "../../components/loading-icon/LoadingIcon";
import Table from "../../components/table/Table";
import Toast from "../../components/toast/Toast";
import Const from "../../constant";
import $ from "jquery";
import { formatRupiah, validateInput } from "../../helpers";
import { setSalary } from "../../reduxslice/competenceDataSlice";
import { masterGapok } from "../../repository/masterData";
import {
  addSalary,
  deleteSalary,
  getSalaries,
  updateSalary,
} from "../../repository/salary";
import { tableApproved, tableSubmitted } from "./tableColumn";

function HistorySalary() {
  // REACT ROUTER
  const location = useLocation();
  const router = useNavigate();

  // INITIAL DATA
  const user = location.state?.user;
  const me = JSON.parse(localStorage.getItem(Const.STORAGE_KEY.USER_INFO));

  // REDUX
  const dispatch = useDispatch();
  const salary = useSelector((state) => state.competence.salary);

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
              dispatch(setSalary(rowData));
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
              dispatch(setSalary(rowData));
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
  const [masterSalaries, setMasterSalaries] = useState([]);
  const [approved, setApproved] = useState([]);
  const [submitted, setSubmitted] = useState([]);
  const [dataAddSalary, setDataAddSalary] = useState({
    no_sk: null,
    tgl_sk: null,
    pejabat_sk: null,
    kode_gapok: null,
    tmt: null,
    naik_selanjutnya: null,
    ket: null,
    dokumen_sk: null,
  });
  const [fileEditSalary, setFileEditSalary] = useState(null);

  const [loadingAddSalary, setLoadingAddSalary] = useState(false);
  const [loadingEditSalary, setLoadingEditSalary] = useState(false);
  const [loadingDeleteSalary, setLoadingDeleteSalary] = useState(false);

  // VALIDATOR
  const validatorAdd = useRef(new SimpleReactValidator({ locale: "id" }));
  const validatorEdit = useRef(new SimpleReactValidator({ locale: "id" }));

  // Close Modal Ref
  const closeRef = useRef();

  // API
  const doAddSalary = async (e) => {
    e.preventDefault();
    console.log(dataAddSalary);
    if (validateInput(validatorAdd, dataAddSalary)) {
      setLoadingAddSalary(true);
      const fd = new FormData();
      fd.append("id_user", user.id);
      fd.append("no_sk", dataAddSalary.no_sk);
      fd.append("tgl_sk", dataAddSalary.tgl_sk);
      fd.append("pejabat_sk", dataAddSalary.pejabat_sk);
      fd.append("kode_gapok", dataAddSalary.kode_gapok);
      fd.append("tmt", dataAddSalary.tmt);
      fd.append("naik_selanjutnya", dataAddSalary.naik_selanjutnya);
      fd.append("dokumen_sk", dataAddSalary.dokumen_sk);
      fd.append("ket", dataAddSalary.ket);

      const { status } = await addSalary(fd);
      if (status) {
        doGetSalaries();
        Toast.successToast("Berhasil menambah data gaji pokok");
        setDataAddSalary({
          no_sk: "",
          tgl_sk: "",
          pejabat_sk: "",
          kode_gapok: "",
          tmt: "",
          naik_selanjutnya: "",
          ket: "",
          dokumen_sk: "",
        });
        setDataAddSalary({
          no_sk: null,
          tgl_sk: null,
          pejabat_sk: null,
          kode_gapok: null,
          tmt: null,
          naik_selanjutnya: null,
          ket: null,
          dokumen_sk: null,
        });
      } else {
        Toast.warningToast("Gagal menambah data gaji pokok");
      }

      setLoadingAddSalary(false);
    } else {
      Toast.errorToast("Harap isi semua data");
    }
  };
  const doEditSalary = async (e) => {
    e.preventDefault();
    if (validatorEdit.current.allValid()) {
      setLoadingEditSalary(true);
      const fd = new FormData();
      fd.append("id_gapok", salary.id_gapok);
      fd.append("id_peg", salary.id_peg);
      fd.append("no_sk", salary.no_sk);
      fd.append("tgl_sk", salary.tgl_sk);
      fd.append("pejabat_sk", salary.pejabat_sk);
      fd.append("kode_gapok", salary.kode_gapok);
      fd.append("tmt", salary.tmt);
      fd.append("naik_selanjutnya", salary.naik_selanjutnya);
      if (fileEditSalary != null) {
        fd.append("dokumen_sk", fileEditSalary);
      }
      fd.append("ket", salary.ket);

      const { status } = await updateSalary(fd);
      if (status) {
        doGetSalaries();
        Toast.successToast("Berhasil memperbarui data gaji pokok");
      } else {
        Toast.warningToast("Gagal memperbarui data gaji pokok");
      }

      setLoadingEditSalary(false);
    } else {
      validatorEdit.current.showMessages();
    }
  };

  const doGetSalaries = async () => {
    const { status, data, message } = await getSalaries(user.id);
    if (status) {
      setApproved(data.riwayatgapok.filter((d) => d.status === 1));
      setSubmitted(data.riwayatgapok.filter((d) => d.status === 0));
    }
  };

  const doGetMasterSalaries = async () => {
    const { status, data, message } = await masterGapok();
    if (status) {
      setMasterSalaries(data);
    }
  };

  const doDeleteSalary = async () => {
    setLoadingDeleteSalary(true);
    const { status } = await deleteSalary(salary.id_gapok);
    if (status) {
      doGetSalaries();
      closeRef.current.click();
      Toast.successToast("Berhasil menghapus data gaji pokok");
    } else {
      Toast.errorToast("Gagal menghapus data gaji pokok");
    }
    setLoadingDeleteSalary(false);
  };

  // COMPONENT DID MOUNT
  useEffect(() => {
    if (!user) {
      router("/dashboard", { replace: true });
    } else {
      doGetMasterSalaries();
      doGetSalaries();
    }
  }, []);
  return (
    <>
      <div className="page-wrapper">
        <div className="container-xl">
          <div className="page-header d-print-none">
            <div className="row align-items-center">
              <div className="col">
                <div className="page-pretitle">Halaman Gapok</div>
                <h2 className="page-title">Riwayat Gapok : {user?.name}</h2>
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
                tableName="Riwayat Gapok Disetujui"
              />
            </div>
          </div>
          <div className="card card-primary card-outline">
            <div className="card-body">
              <h3 className="card-title">Data Ajuan Gapok</h3>
              <Table
                data={{ column: columnSubmitted, data: submitted }}
                tableName="Riwayat Gapok Diajukan"
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
              <h5 className="modal-title">Tambah Gapok</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={doAddSalary}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">No SK</label>
                    <input
                      type="text"
                      name="no_sk"
                      className="form-control"
                      value={dataAddSalary.no_sk}
                      onChange={(e) => {
                        setDataAddSalary({
                          ...dataAddSalary,
                          no_sk: e.target.value,
                        });
                        validatorAdd.current.showMessageFor("no_sk");
                      }}
                    />
                    {dataAddSalary.no_sk != null &&
                      validatorAdd.current.message(
                        "no_sk",
                        dataAddSalary.no_sk,
                        "required"
                      )}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Tanggal SK</label>
                    <input
                      type="date"
                      name="tgl_sk"
                      className="form-control"
                      value={dataAddSalary.tgl_sk}
                      onChange={(e) => {
                        setDataAddSalary({
                          ...dataAddSalary,
                          tgl_sk: e.target.value,
                        });
                        validatorAdd.current.showMessageFor("tanggal_sk");
                      }}
                    />
                    {dataAddSalary.tgl_sk != null &&
                      validatorAdd.current.message(
                        "tanggal_sk",
                        dataAddSalary.tgl_sk,
                        "required"
                      )}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label" className="form-label">
                      File Dokumen SK
                    </label>
                    <input
                      type="file"
                      name="dokumen_sk"
                      className="form-control"
                      onChange={(e) => {
                        setDataAddSalary({
                          ...dataAddSalary,
                          dokumen_sk: e.target.files[0],
                        });
                        validatorAdd.current.showMessageFor("dokumen_sk");
                      }}
                    />
                    {dataAddSalary.dokumen_sk != null &&
                      validatorAdd.current.message(
                        "dokumen_sk",
                        dataAddSalary.dokumen_sk,
                        "required"
                      )}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Pejabat Pengesah</label>
                    <input
                      type="text"
                      name="pejabat_sk"
                      className="form-control"
                      value={dataAddSalary.pejabat_sk}
                      onChange={(e) => {
                        setDataAddSalary({
                          ...dataAddSalary,
                          pejabat_sk: e.target.value,
                        });
                        validatorAdd.current.showMessageFor("pejabat_pengesah");
                      }}
                    />
                    {dataAddSalary.pejabat_sk != null &&
                      validatorAdd.current.message(
                        "pejabat_pengesah",
                        dataAddSalary.pejabat_sk,
                        "required"
                      )}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Gaji Pokok</label>
                    <select
                      name="kode_gapok"
                      className="form-control"
                      value={dataAddSalary.kode_gapok}
                      onChange={(e) => {
                        setDataAddSalary({
                          ...dataAddSalary,
                          kode_gapok: e.target.value,
                        });
                        validatorAdd.current.showMessageFor("gaji_pokok");
                      }}
                    >
                      <option value="">Pilih gapok</option>
                      {masterSalaries.map((masterSalary, index) => {
                        return (
                          <option key={index} value={masterSalary.kode_gapok}>
                            {formatRupiah(masterSalary.gapok)}
                          </option>
                        );
                      })}
                    </select>
                    {dataAddSalary.kode_gapok != null &&
                      validatorAdd.current.message(
                        "gaji_pokok",
                        dataAddSalary.kode_gapok,
                        "required"
                      )}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Terhitung Mulai</label>
                    <input
                      type="date"
                      name="tmt"
                      className="form-control"
                      value={dataAddSalary.tmt}
                      onChange={(e) => {
                        setDataAddSalary({
                          ...dataAddSalary,
                          tmt: e.target.value,
                        });
                        validatorAdd.current.showMessageFor("terhitung_mulai");
                      }}
                    />
                    {dataAddSalary.tmt != null &&
                      validatorAdd.current.message(
                        "terhitung_mulai",
                        dataAddSalary.tmt,
                        "required"
                      )}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Naik Selanjutnya</label>
                    <input
                      type="date"
                      name="naik_selanjutnya"
                      className="form-control"
                      value={dataAddSalary.naik_selanjutnya}
                      onChange={(e) => {
                        setDataAddSalary({
                          ...dataAddSalary,
                          naik_selanjutnya: e.target.value,
                        });
                        validatorAdd.current.showMessageFor("naik_selanjutnya");
                      }}
                    />
                    {dataAddSalary.naik_selanjutnya != null &&
                      validatorAdd.current.message(
                        "naik_selanjutnya",
                        dataAddSalary.naik_selanjutnya,
                        "required"
                      )}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Keterangan</label>
                    <input
                      type="text"
                      name="ket"
                      className="form-control"
                      value={dataAddSalary.ket}
                      onChange={(e) => {
                        setDataAddSalary({
                          ...dataAddSalary,
                          ket: e.target.value,
                        });
                        validatorAdd.current.showMessageFor("keterangan");
                      }}
                    />
                    {dataAddSalary.ket != null &&
                      validatorAdd.current.message(
                        "keterangan",
                        dataAddSalary.ket,
                        "required"
                      )}
                  </div>
                  <div className="col-md-12">
                    <button type="submit" className="btn btn-primary">
                      {loadingAddSalary ? <LoadingIcon /> : "Tambah"}
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
              <h5 className="modal-title">Edit Gapok</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={doEditSalary}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">No SK</label>
                    <input
                      type="text"
                      name="no_sk"
                      className="form-control"
                      value={salary.no_sk}
                      onChange={(e) => {
                        dispatch(
                          setSalary({
                            ...salary,
                            no_sk: e.target.value,
                          })
                        );
                        validatorEdit.current.showMessageFor("no_sk");
                      }}
                    />
                    {salary.no_sk != null &&
                      validatorEdit.current.message(
                        "no_sk",
                        salary.no_sk,
                        "required"
                      )}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Tanggal SK</label>
                    <input
                      type="date"
                      name="tgl_sk"
                      className="form-control"
                      value={salary.tgl_sk}
                      onChange={(e) => {
                        dispatch(
                          setSalary({
                            ...salary,
                            tgl_sk: e.target.value,
                          })
                        );
                        validatorEdit.current.showMessageFor("tanggal_sk");
                      }}
                    />
                    {salary.tgl_sk != null &&
                      validatorEdit.current.message(
                        "tanggal_sk",
                        salary.tgl_sk,
                        "required"
                      )}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label" className="form-label">
                      File Dokumen SK
                    </label>
                    <input
                      type="file"
                      name="dokumen_sk"
                      className="form-control"
                      onChange={(e) => {
                        setFileEditSalary(e.target.files[0]);
                        validatorEdit.current.showMessageFor("dokumen_sk");
                      }}
                    />
                    {fileEditSalary != null &&
                      validatorEdit.current.message(
                        "dokumen_sk",
                        fileEditSalary,
                        "required"
                      )}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Pejabat Pengesah</label>
                    <input
                      type="text"
                      name="pejabat_sk"
                      className="form-control"
                      value={salary.pejabat_sk}
                      onChange={(e) => {
                        dispatch(
                          setSalary({
                            ...salary,
                            pejabat_sk: e.target.value,
                          })
                        );
                        validatorEdit.current.showMessageFor(
                          "pejabat_pengesah"
                        );
                      }}
                    />
                    {salary.pejabat_sk != null &&
                      validatorEdit.current.message(
                        "pejabat_pengesah",
                        salary.pejabat_sk,
                        "required"
                      )}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Gaji Pokok</label>
                    <select
                      name="kode_gapok"
                      className="form-control"
                      value={salary.kode_gapok}
                      onChange={(e) => {
                        dispatch(
                          setSalary({
                            ...salary,
                            kode_gapok: e.target.value,
                          })
                        );
                        validatorEdit.current.showMessageFor("gaji_pokok");
                      }}
                    >
                      <option value="">Pilih gapok</option>
                      {masterSalaries.map((masterSalary, index) => {
                        return (
                          <option key={index} value={masterSalary.kode_gapok}>
                            {formatRupiah(masterSalary.gapok)}
                          </option>
                        );
                      })}
                    </select>
                    {salary.kode_gapok != null &&
                      validatorEdit.current.message(
                        "gaji_pokok",
                        salary.kode_gapok,
                        "required"
                      )}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Terhitung Mulai</label>
                    <input
                      type="date"
                      name="tmt"
                      className="form-control"
                      value={salary.tmt}
                      onChange={(e) => {
                        dispatch(
                          setSalary({
                            ...salary,
                            tmt: e.target.value,
                          })
                        );
                        validatorEdit.current.showMessageFor("terhitung_mulai");
                      }}
                    />
                    {salary.tmt != null &&
                      validatorEdit.current.message(
                        "terhitung_mulai",
                        salary.tmt,
                        "required"
                      )}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Naik Selanjutnya</label>
                    <input
                      type="date"
                      name="naik_selanjutnya"
                      className="form-control"
                      value={salary.naik_selanjutnya}
                      onChange={(e) => {
                        dispatch(
                          setSalary({
                            ...salary,
                            naik_selanjutnya: e.target.value,
                          })
                        );
                        validatorEdit.current.showMessageFor(
                          "naik_selanjutnya"
                        );
                      }}
                    />
                    {salary.naik_selanjutnya != null &&
                      validatorEdit.current.message(
                        "naik_selanjutnya",
                        salary.naik_selanjutnya,
                        "required"
                      )}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Keterangan</label>
                    <input
                      type="text"
                      name="ket"
                      className="form-control"
                      value={salary.ket}
                      onChange={(e) => {
                        dispatch(
                          setSalary({
                            ...salary,
                            ket: e.target.value,
                          })
                        );
                        validatorEdit.current.showMessageFor("keterangan");
                      }}
                    />
                    {salary.ket != null &&
                      validatorEdit.current.message(
                        "keterangan",
                        salary.ket,
                        "required"
                      )}
                  </div>
                  <div className="col-md-12">
                    <button type="submit" className="btn btn-primary">
                      {loadingEditSalary ? <LoadingIcon /> : "Perbarui"}
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
                Anda akan menghapus data gapok <b>{salary.no_sk}</b>
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
                      onClick={doDeleteSalary}
                    >
                      {loadingDeleteSalary ? <LoadingIcon /> : "Hapus"}
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

export default HistorySalary;
