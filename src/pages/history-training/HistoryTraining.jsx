import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../components/table/Table";
import { setTraining } from "../../reduxslice/competenceDataSlice";
import {
  addTraining,
  deleteTraining,
  myTraining,
  updateTraining,
} from "../../repository/training";
import { masterDiklat as diklats } from "../../repository/masterData";
import { tableApproved, tableSubmitted } from "./data";
import Const from "../../constant";
import SimpleReactValidator from "simple-react-validator";
import "simple-react-validator/dist/locale/id";
import Toast from "../../components/toast/Toast";
import LoadingIcon from "../../components/loading-icon/LoadingIcon";

function HistoryTraining() {
  const dispatch = useDispatch();
  const me = JSON.parse(localStorage.getItem(Const.STORAGE_KEY.USER_INFO));
  const training = useSelector((state) => state.competence.training);
  const [fileEditTraining, setFileEditTraining] = useState(null);
  const [approved, setApproved] = useState([]);
  const [submitted, setSubmitted] = useState([]);
  const [masterDiklat, setMasterDiklat] = useState([]);
  const [loadingEditTraining, setLoadingEditTraining] = useState(false);
  const [loadingDeleteTraining, setLoadingDeleteTraining] = useState(false);
  const [loadingAddTraining, setLoadingAddTraining] = useState(false);

  const [dataAddDiklat, setAddDiklat] = useState({
    id_user: null,
    nama_diklat: null,
    kode_diklat: null,
    tgl_mulai: null,
    tgl_selesai: null,
    no_sertifikat: null,
    thn_sertifikat: null,
    penyelenggara: null,
    dokumen: null,
  });
  const columnApproved = [
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
              dispatch(setTraining(rowData));
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
              dispatch(setTraining(rowData));
            }}
          >
            Hapus
          </a>
        </>
      ),
    },
  ];
  let columnSubmitted = [];
  if (me.level == "pegawai") {
    columnSubmitted = tableSubmitted.column;
  } else {
    columnSubmitted = [
      ...tableSubmitted.column,
      {
        name: "Aksi",
        key: "",
        render: (data, index, rowData) => (
          <a className="btn btn-primary btn-sm m-1" href="#">
            Verifikasi
          </a>
        ),
      },
    ];
  }

  const simpleValidator = useRef(
    new SimpleReactValidator({
      locale: "id",
    })
  );

  let simpleValidatorAdd = useRef(
    new SimpleReactValidator({
      locale: "id",
    })
  );

  const getTrainings = async () => {
    const { status, data, message } = await myTraining();
    if (status) {
      setApproved(data.riwayatdiklat.filter((d) => d.status === 1));
      setSubmitted(data.riwayatdiklat.filter((d) => d.status === 0));
    }
  };
  const getMasterDiklat = async () => {
    const { status, data, message } = await diklats();
    if (status) {
      console.log(data);
      setMasterDiklat(data);
    }
  };

  useEffect(() => {
    getTrainings();
    getMasterDiklat();
  }, []);

  const doEditDiklat = async (e) => {
    e.preventDefault();
    if (simpleValidator.current.allValid()) {
      setLoadingEditTraining(true);
      const fd = new FormData();
      fd.append("id_diklat", training.id_diklat);
      fd.append("id_peg", training.id_peg);
      fd.append("nama_diklat", training.nama_diklat);
      fd.append("tgl_mulai", training.tgl_mulai);
      fd.append("tgl_selesai", training.tgl_selesai);
      fd.append("no_sertifikat", training.no_sertifikat);
      fd.append("thn_sertifikat", training.thn_sertifikat);
      fd.append("penyelenggara", training.penyelenggara);
      fd.append("kode_diklat", training.kode_diklat);
      if (fileEditTraining != null) {
        fd.append("dokumen_sk", fileEditTraining);
      }
      const { status, data, message } = await updateTraining(fd);
      if (status) {
        Toast.successToast("Berhasil memperbarui data diklat");
        setFileEditTraining(null);
        getTrainings();
      } else {
        Toast.warningToast("Gagal memperbarui data diklat");
      }
      setLoadingEditTraining(false);
    } else {
      simpleValidatorAdd.current.showMessages();
    }
  };

  const doDeleteTraining = async () => {
    setLoadingDeleteTraining(true);
    const { status } = await deleteTraining(training.id_diklat);
    if (status) {
      Toast.successToast("Hapus data diklat berhasil");
      getTrainings();
    } else {
      Toast.warningToast("Hapus data diklat gagal");
    }
    setLoadingDeleteTraining(false);
  };

  const doAddDiklat = async (e) => {
    e.preventDefault();
    if (simpleValidatorAdd.current.allValid()) {
      setLoadingAddTraining(true);
      const fd = new FormData();
      fd.append("id_user", me.id);
      fd.append("nama_diklat", dataAddDiklat.nama_diklat);
      fd.append("kode_diklat", dataAddDiklat.kode_diklat);
      fd.append("tgl_mulai", dataAddDiklat.tgl_mulai);
      fd.append("tgl_selesai", dataAddDiklat.tgl_selesai);
      fd.append("no_sertifikat", dataAddDiklat.no_sertifikat);
      fd.append("thn_sertifikat", dataAddDiklat.thn_sertifikat);
      fd.append("penyelenggara", dataAddDiklat.penyelenggara);
      fd.append("dokumen_sk", dataAddDiklat.dokumen);

      const { status } = await addTraining(fd);
      if (status) {
        getTrainings();
        Toast.successToast("Berhasil menambah data diklat");
        setAddDiklat({
          id_user: "",
          nama_diklat: "",
          kode_diklat: "",
          tgl_mulai: "",
          tgl_selesai: "",
          no_sertifikat: "",
          thn_sertifikat: "",
          penyelenggara: "",
          dokumen: "",
        });
        setAddDiklat({
          id_user: null,
          nama_diklat: null,
          kode_diklat: null,
          tgl_mulai: null,
          tgl_selesai: null,
          no_sertifikat: null,
          thn_sertifikat: null,
          penyelenggara: null,
          dokumen: null,
        });
      } else {
        Toast.warningToast("Gagal menambah data diklat");
      }

      setLoadingAddTraining(false);
    } else {
      Toast.errorToast("Harap lengkapi semua data");
    }
  };
  return (
    <>
      <div className="page-wrapper">
        <div className="container-xl">
          <div className="page-header d-print-none">
            <div className="row align-items-center">
              <div className="col">
                <div className="page-pretitle">Halaman Diklat</div>
                <h2 className="page-title">
                  Riwayat Diklat : Ananda Rifkiy Hasan
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
              <h3 className="card-title">Data Diklat</h3>
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
                tableName="Riwayat Diklat Disetujui"
              />
            </div>
          </div>
          <div className="card card-primary card-outline">
            <div className="card-body">
              <h3 className="card-title">Data Ajuan Diklat</h3>
              <Table
                data={{ column: columnSubmitted, data: submitted }}
                tableName="Riwayat Diklat Diajukan"
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
              <h5 className="modal-title">Tambah Diklat</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={doAddDiklat}>
                <div className="form-row row g-3">
                  <div className="form-group col-md-6">
                    <label className="form-label">Nama Diklat</label>
                    <input
                      type="text"
                      className="form-control"
                      value={dataAddDiklat.nama_diklat}
                      onChange={(e) => {
                        setAddDiklat({
                          ...dataAddDiklat,
                          nama_diklat: e.target.value,
                        });

                        simpleValidatorAdd.current.showMessageFor(
                          "Nama diklat"
                        );
                      }}
                    />
                    {dataAddDiklat.nama_diklat != null &&
                      simpleValidatorAdd.current.message(
                        "Nama diklat",
                        dataAddDiklat.nama_diklat,
                        "required"
                      )}
                  </div>

                  <div className="form-group col-md-6">
                    <label className="form-label">Jenis Diklat</label>
                    <select
                      className="form-control"
                      value={dataAddDiklat.kode_diklat}
                      onChange={(e) => {
                        setAddDiklat({
                          ...dataAddDiklat,
                          kode_diklat: e.target.value,
                        });

                        simpleValidatorAdd.current.showMessageFor(
                          "jenis_diklat"
                        );
                      }}
                    >
                      <option value="">Pilih jenis diklat</option>
                      {masterDiklat.map((data, index) => {
                        return (
                          <option key={index} value={data.kode_diklat}>
                            {data.jenis_diklat}
                          </option>
                        );
                      })}
                    </select>
                    {dataAddDiklat.kode_diklat != null &&
                      simpleValidatorAdd.current.message(
                        "jenis_diklat",
                        dataAddDiklat.kode_diklat,
                        "required"
                      )}
                  </div>

                  <div className="form-group col-md-6">
                    <label className="form-label">Tanggal Mulai</label>
                    <input
                      type="date"
                      className="form-control"
                      onChange={(e) => {
                        setAddDiklat({
                          ...dataAddDiklat,
                          tgl_mulai: e.target.value,
                        });

                        simpleValidatorAdd.current.showMessageFor(
                          "tanggal_mulai_diklat"
                        );
                      }}
                      value={dataAddDiklat.tgl_mulai}
                    />
                    {dataAddDiklat.tgl_mulai != null &&
                      simpleValidatorAdd.current.message(
                        "tanggal_mulai_diklat",
                        dataAddDiklat.tgl_mulai,
                        "required"
                      )}
                  </div>

                  <div className="form-group col-md-6">
                    <label className="form-label">Tanggal Selesai</label>
                    <input
                      type="date"
                      className="form-control"
                      onChange={(e) => {
                        setAddDiklat({
                          ...dataAddDiklat,
                          tgl_selesai: e.target.value,
                        });

                        simpleValidatorAdd.current.showMessageFor(
                          "tanggal_selesai_diklat"
                        );
                      }}
                      value={dataAddDiklat.tgl_selesai}
                    />
                    {dataAddDiklat.tgl_selesai != null &&
                      simpleValidatorAdd.current.message(
                        "tanggal_selesai_diklat",
                        dataAddDiklat.tgl_selesai,
                        "required"
                      )}
                  </div>

                  <div className="form-group col-md-6">
                    <label className="form-label">Nomor Sertifikat</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => {
                        setAddDiklat({
                          ...dataAddDiklat,
                          no_sertifikat: e.target.value,
                        });

                        simpleValidatorAdd.current.showMessageFor(
                          "nomor_sertifikat"
                        );
                      }}
                      value={dataAddDiklat.no_sertifikat}
                    />
                    {dataAddDiklat.no_sertifikat != null &&
                      simpleValidatorAdd.current.message(
                        "nomor_sertifikat",
                        dataAddDiklat.no_sertifikat,
                        "required"
                      )}
                  </div>

                  <div className="form-group col-md-6">
                    <label className="form-label">Tahun Sertifikat</label>
                    <input
                      type="number"
                      className="form-control"
                      onChange={(e) => {
                        setAddDiklat({
                          ...dataAddDiklat,
                          thn_sertifikat: e.target.value,
                        });

                        simpleValidatorAdd.current.showMessageFor(
                          "tahun_sertifikat"
                        );
                      }}
                      value={dataAddDiklat.thn_sertifikat}
                    />
                    {dataAddDiklat.thn_sertifikat != null &&
                      simpleValidatorAdd.current.message(
                        "tahun_sertifikat",
                        dataAddDiklat.thn_sertifikat,
                        "required|numeric"
                      )}
                  </div>

                  <div className="form-group col-md-6">
                    <label className="form-label">Penyelenggara</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => {
                        setAddDiklat({
                          ...dataAddDiklat,
                          penyelenggara: e.target.value,
                        });

                        simpleValidatorAdd.current.showMessageFor(
                          "penyelenggara"
                        );
                      }}
                      value={dataAddDiklat.penyelenggara}
                    />
                    {dataAddDiklat.penyelenggara != null &&
                      simpleValidatorAdd.current.message(
                        "penyelenggara",
                        dataAddDiklat.penyelenggara,
                        "required"
                      )}
                  </div>
                  <div className="form-group col-md-6">
                    <label className="form-label">File Dokumen</label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={(e) => {
                        setAddDiklat({
                          ...dataAddDiklat,
                          dokumen: e.target.files[0],
                        });
                      }}
                    />
                    {dataAddDiklat.dokumen != null &&
                      simpleValidatorAdd.current.message(
                        "dokumen_diklat",
                        dataAddDiklat.dokumen,
                        "required"
                      )}
                  </div>
                  <div className="col-md-12 form-group">
                    <button
                      type="submit"
                      name="submit"
                      className="btn btn-primary"
                    >
                      {!loadingAddTraining ? "Tambah" : <LoadingIcon />}
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
              <h5 className="modal-title">Edit Diklat</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={doEditDiklat}>
                <div className="form-row row g-3">
                  <div className="form-group col-md-6">
                    <label className="form-label">Nama Diklat</label>
                    <input
                      type="text"
                      className="form-control"
                      value={training.nama_diklat}
                      onChange={(e) => {
                        dispatch(
                          setTraining({
                            ...training,
                            nama_diklat: e.target.value,
                          })
                        );
                        simpleValidator.current.showMessageFor("Nama diklat");
                      }}
                    />
                    {simpleValidator.current.message(
                      "Nama diklat",
                      training.nama_diklat,
                      "required"
                    )}
                  </div>

                  <div className="form-group col-md-6">
                    <label className="form-label">Jenis Diklat</label>
                    <select
                      className="form-control"
                      value={training.kode_diklat}
                      onChange={(e) => {
                        dispatch(
                          setTraining({
                            ...training,
                            kode_diklat: e.target.value,
                          })
                        );
                        simpleValidator.current.showMessageFor("jenis_diklat");
                      }}
                    >
                      {masterDiklat.map((data, index) => {
                        return (
                          <option key={index} value={data.kode_diklat}>
                            {data.jenis_diklat}
                          </option>
                        );
                      })}
                    </select>
                    {simpleValidator.current.message(
                      "jenis_diklat",
                      training.kode_diklat,
                      "required"
                    )}
                  </div>

                  <div className="form-group col-md-6">
                    <label className="form-label">Tanggal Mulai</label>
                    <input
                      type="date"
                      className="form-control"
                      onChange={(e) => {
                        dispatch(
                          setTraining({
                            ...training,
                            tgl_mulai: e.target.value,
                          })
                        );
                        simpleValidator.current.showMessageFor(
                          "tanggal_mulai_diklat"
                        );
                      }}
                      value={training.tgl_mulai}
                    />
                    {simpleValidator.current.message(
                      "tanggal_mulai_diklat",
                      training.tgl_mulai,
                      "required"
                    )}
                  </div>

                  <div className="form-group col-md-6">
                    <label className="form-label">Tanggal Selesai</label>
                    <input
                      type="date"
                      className="form-control"
                      onChange={(e) => {
                        dispatch(
                          setTraining({
                            ...training,
                            tgl_selesai: e.target.value,
                          })
                        );
                        simpleValidator.current.showMessageFor(
                          "tanggal_selesai_diklat"
                        );
                      }}
                      value={training.tgl_selesai}
                    />
                    {simpleValidator.current.message(
                      "tanggal_selesai_diklat",
                      training.tgl_selesai,
                      "required"
                    )}
                  </div>

                  <div className="form-group col-md-6">
                    <label className="form-label">Nomor Sertifikat</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => {
                        dispatch(
                          setTraining({
                            ...training,
                            no_sertifikat: e.target.value,
                          })
                        );
                        simpleValidator.current.showMessageFor(
                          "nomor_sertifikat"
                        );
                      }}
                      value={training.no_sertifikat}
                    />
                    {simpleValidator.current.message(
                      "nomor_sertifikat",
                      training.no_sertifikat,
                      "required"
                    )}
                  </div>

                  <div className="form-group col-md-6">
                    <label className="form-label">Tahun Sertifikat</label>
                    <input
                      type="number"
                      className="form-control"
                      onChange={(e) => {
                        dispatch(
                          setTraining({
                            ...training,
                            thn_sertifikat: e.target.value,
                          })
                        );
                        simpleValidator.current.showMessageFor(
                          "tahun_sertifikat"
                        );
                      }}
                      value={training.thn_sertifikat}
                    />
                    {simpleValidator.current.message(
                      "tahun_sertifikat",
                      training.thn_sertifikat,
                      "required|numeric"
                    )}
                  </div>

                  <div className="form-group col-md-6">
                    <label className="form-label">Penyelenggara</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => {
                        dispatch(
                          setTraining({
                            ...training,
                            penyelenggara: e.target.value,
                          })
                        );
                        simpleValidator.current.showMessageFor("penyelenggara");
                      }}
                      value={training.penyelenggara}
                    />
                    {simpleValidator.current.message(
                      "penyelenggara",
                      training.penyelenggara,
                      "required"
                    )}
                  </div>
                  <div className="form-group col-md-6">
                    <label className="form-label">File Dokumen</label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={(e) => {
                        setFileEditTraining(e.target.files[0]);
                      }}
                    />
                  </div>
                  <div className="col-md-12 form-group">
                    <button
                      type="submit"
                      name="submit"
                      className="btn btn-primary"
                    >
                      {!loadingEditTraining ? "Perbarui" : <LoadingIcon />}
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
                Anda akan menghapus data diklat <b>{training.nama_diklat}</b>
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
                      onClick={doDeleteTraining}
                    >
                      {!loadingDeleteTraining ? "Hapus" : <LoadingIcon />}
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

export default HistoryTraining;
