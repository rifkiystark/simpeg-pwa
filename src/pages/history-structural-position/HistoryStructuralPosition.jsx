import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";
import "simple-react-validator/dist/locale/id";
import Table from "../../components/table/Table";
import Const from "../../constant";
import { setStructuralPosition } from "../../reduxslice/competenceDataSlice";
import {
  masterGolongan,
  masterJabatanStruktural,
} from "../../repository/masterData";
import { getStructuralPositions } from "../../repository/structuralPosition";
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
  const salary = useSelector((state) => state.competence.structuralPosition);

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
    kode_gapok: null,
    tmt: null,
    naik_selanjutnya: null,
    ket: null,
    dokumen_sk: null,
  });
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
              <form
                action="http://localhost/simpeglocal/pegawai/jabatan/tambah"
                method="post"
                enctype="multipart/form-data"
              >
                <div className="row g-3">
                  <div className="col-md-6">
                    <label>No. SK</label>
                    <input
                      type="text"
                      name="no_sk"
                      className="form-control"
                      required=""
                    />
                  </div>
                  <div className="col-md-6">
                    <label>Tanggal SK</label>
                    <input
                      type="date"
                      name="tgl_sk"
                      className="form-control"
                      required=""
                    />
                  </div>
                  <div className="col-md-6">
                    <label>Pejabat Pengesah</label>
                    <input
                      type="text"
                      name="pejabat_sk"
                      className="form-control"
                      required=""
                    />
                  </div>
                  <div className="col-md-6">
                    <label>Jabatan Struktural</label>
                    <select name="kode_jbts" className="form-control">
                      <option value="">Pilih jabatan</option>
                      {masterStructuralPostions.map((value, index) => {
                        return (
                          <option key={index} value={value.kode_jbts}>
                            {value.nama_jabatan}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label>Terhitung Mulai</label>
                    <input
                      type="date"
                      name="tmt"
                      className="form-control"
                      required=""
                    />
                  </div>
                  <div className="col-md-6">
                    <label>Tamat Jabatan</label>
                    <input
                      type="date"
                      name="tamat_jabatan"
                      className="form-control"
                      required=""
                    />
                  </div>
                  <div className="col-md-6">
                    <label>Golongan</label>
                    <select name="kode_gol" className="form-control" required>
                      <option value="">Pilih golongan</option>
                      {masterGroups.map((value, index) => {
                        return (
                          <option key={index} value={value.kode_gol}>
                            {value.pangkat}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label>File Dokumen SK</label>
                    <input
                      type="file"
                      name="dokumen_sk"
                      className="form-control"
                      required=""
                    />
                  </div>

                  <div className="col-md-12">
                    <label>Keterangan</label>
                    <input type="text" name="ket" className="form-control" />
                  </div>

                  <div className="col-md-12">
                    <input
                      type="submit"
                      value="Tambah"
                      className="btn btn-primary"
                    />
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
              <form
                action="http://localhost/simpeglocal/pegawai/jabatan/tambah"
                method="post"
                enctype="multipart/form-data"
              >
                <div className="row g-3">
                  <div className="col-md-6">
                    <label>No. SK</label>
                    <input
                      type="text"
                      name="no_sk"
                      className="form-control"
                      required=""
                    />
                  </div>
                  <div className="col-md-6">
                    <label>Tanggal SK</label>
                    <input
                      type="date"
                      name="tgl_sk"
                      className="form-control"
                      required=""
                    />
                  </div>
                  <div className="col-md-6">
                    <label>Pejabat Pengesah</label>
                    <input
                      type="text"
                      name="pejabat_sk"
                      className="form-control"
                      required=""
                    />
                  </div>
                  <div className="col-md-6">
                    <label>Jabatan Struktural</label>
                    <select
                      name="kode_jbts"
                      className="form-control"
                      required=""
                    >
                      <option value="1">Pimpinan</option>
                      <option value="2">Wakil Pimpinan</option>
                      <option value="3">Pegawai</option>
                      <option value="4">Guru</option>
                      <option value="5">Kepala Sekolah</option>
                      <option value="6">Wakil Kepala Sekolah</option>
                      <option value="7">KTU Yayasan</option>
                      <option value="8">Staff Yayasan</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label>Terhitung Mulai</label>
                    <input
                      type="date"
                      name="tmt"
                      className="form-control"
                      required=""
                    />
                  </div>
                  <div className="col-md-6">
                    <label>Tamat Jabatan</label>
                    <input
                      type="date"
                      name="tamat_jabatan"
                      className="form-control"
                      required=""
                    />
                  </div>
                  <div className="col-md-6">
                    <label>Golongan</label>
                    <select name="kode_gol" className="form-control" required>
                      <option value="-">-</option>
                      <option value="2">Kepala Sekolah</option>
                      <option value="3">Guru</option>
                      <option value="4">Wakil Kepala Sekolah</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label>File Dokumen SK</label>
                    <input
                      type="file"
                      name="dokumen_sk"
                      className="form-control"
                      required=""
                    />
                  </div>

                  <div className="col-md-12">
                    <label>Keterangan</label>
                    <input type="text" name="ket" className="form-control" />
                  </div>

                  <div className="col-md-12">
                    <input
                      type="submit"
                      value="Tambah"
                      className="btn btn-primary"
                    />
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
                Anda akan menghapus data jabatan struktural <b>nama diklat</b>
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

export default HistoryStructuralPosition;
