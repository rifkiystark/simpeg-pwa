import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../components/table/Table";
import { setTraining } from "../../reduxslice/competenceDataSlice";
import { myTraining } from "../../repository/training";
import { masterDiklat as diklats } from "../../repository/masterData";
import { tableApproved, tableSubmitted } from "./data";
import Const from "../../constant";
import SimpleReactValidator from "simple-react-validator";
import "simple-react-validator/dist/locale/id";

function HistoryTraining() {
  const dispatch = useDispatch();
  const me = JSON.parse(localStorage.getItem(Const.STORAGE_KEY.USER_INFO));
  const training = useSelector((state) => state.competence.training);
  let [approved, setApproved] = useState([]);
  let [submitted, setSubmitted] = useState([]);
  let [masterDiklat, setMasterDiklat] = useState([]);
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

  const editDiklat = (e) => {
    e.preventDefault();
    if(simpleValidator.current.allValid()){
      alert("valid");
    } else {
      alert("tidak");

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
              <form
                action="http://localhost/simpeglocal/pegawai/diklat/tambah"
                method="POST"
                enctype="multipart/form-data"
              >
                <div className="form-row row g-3">
                  <div className="form-group col-md-6">
                    <label className="form-label">Nama Diklat</label>
                    <input
                      type="text"
                      name="nama_diklat"
                      className="form-control"
                      required
                    />
                  </div>

                  <div className="form-group col-md-6">
                    <label className="form-label">Jenis Diklat</label>
                    <select
                      name="jenis_diklat"
                      className="form-control"
                      required
                      readOnly
                    >
                      {masterDiklat.map((data, index) => {
                        return (
                          <option key={index} value={data.kode_diklat}>
                            {data.jenis_diklat}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div className="form-group col-md-6">
                    <label className="form-label">Tanggal Mulai</label>
                    <input
                      type="date"
                      name="tgl_mulai"
                      className="form-control"
                      required
                    />
                  </div>

                  <div className="form-group col-md-6">
                    <label className="form-label">Tanggal Selesai</label>
                    <input
                      type="date"
                      name="tgl_selesai"
                      className="form-control"
                      required
                    />
                  </div>

                  <div className="form-group col-md-6">
                    <label className="form-label">Nomor Sertifikat</label>
                    <input
                      type="text"
                      name="nmr_sertifikat"
                      className="form-control"
                      required
                    />
                  </div>

                  <div className="form-group col-md-6">
                    <label className="form-label">Tahun Sertifikat</label>
                    <input
                      type="number"
                      name="thn_sertifikat"
                      className="form-control"
                      required
                    />
                  </div>

                  <div className="form-group col-md-6">
                    <label className="form-label">Penyelenggara</label>
                    <input
                      type="text"
                      name="penyelenggara"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label className="form-label">File Dokumen</label>
                    <input
                      type="file"
                      name="dokumen_sk"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-md-12 form-group">
                    <button
                      type="sumbit"
                      name="submit"
                      className="btn btn-primary"
                    >
                      Tambah
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
              <form onSubmit={editDiklat}>
                <input type="hidden" value={training.id_diklat} />
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
                        simpleValidator.current.showMessageFor(
                          "penyelenggara"
                        );
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
                    <input type="file" className="form-control" />
                  </div>
                  <div className="col-md-12 form-group">
                    <button
                      type="submit"
                      name="submit"
                      className="btn btn-primary"
                    >
                      Perbarui
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
                Anda akan menghapus data diklat <b>nama diklat</b>
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
                    <a
                      href="{{ url('/') }}/pegawai/hapus/{{$p->id_peg}}"
                      className="btn btn-danger w-100"
                      data-bs-dismiss="modal"
                    >
                      Hapus
                    </a>
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
