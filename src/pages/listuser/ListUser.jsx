import Table from "../../components/table/Table";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../reduxslice/userSlice";
import { userColumn } from "./tableColumn";
import { allUser, updateUser } from "../../repository/user";
import { useEffect } from "react";
import { useState } from "react";
import Toast from "../../components/toast/Toast";
import LoadingIcon from "../../components/loading-icon/LoadingIcon";
import Const from "../../constant";

function ListUser() {
  const dispatch = useDispatch();
  const column = [
    ...userColumn,
    {
      name: "Action",
      key: "",
      render: (data, index, rowData) => (
        <>
          <button
            className="btn btn-sm mt-1 me-1 w-100"
            data-bs-toggle="modal"
            data-bs-target="#ModalEdit"
            onClick={() => {
              setPassword("");
              dispatch(setUser(rowData));
            }}
          >
            Edit
          </button>
        </>
      ),
    },
  ];

  // STATE
  const user = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [password, setPassword] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  // API CALL
  const doGetUsers = async () => {
    const { status, data, message } = await allUser();
    if (status) {
      setUsers(data.data);
    }
  };

  const doUpdateUser = async (e) => {
    e.preventDefault();
    const payload = {
      id_user: user.id,
      email: user.email,
      level: user.level,
      password: password.trim(),
    };
    setIsUpdating(true);
    const { status, data, message } = await updateUser(payload);
    if (status) {
      Toast.successToast("Berhasil memperbarui data");
      doGetUsers();
    } else {
      Toast.errorToast(message);
    }
    setIsUpdating(false);
  };
  // TODO IMPORT


  // COMPONENT DID MOUNT
  useEffect(() => {
    doGetUsers();
  }, []);


  return (
    <div className="page-wrapper">
      <div className="container-xl">
        <div className="page-header d-print-none">
          <div className="row align-items-center">
            <div className="col">
              <div className="page-pretitle">Halaman Pengguna</div>
              <h2 className="page-title">Daftar Pengguna</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="page-body">
        <div className="container-xl">
          <div className="card">
            <div className="card-header pe-0">
              <div className="row w-100">
                <div className="col-md-6 col-sm-12">
                  <h3 className="card-title">Daftar Pengguna</h3>
                </div>
                <div className="col-md-6 col-sm-12 text-end">
                  <a
                    href={`${Const.BASE_URL}import/formatimportsimpeg.xlsx`}
                    className="btn btn-secondary me-1"
                    target="_blank"
                    rel="noreferrer"
                    download
                  >
                    Download Format Import
                  </a>
                  <button
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#modal-import"
                  >
                    Import
                  </button>
                </div>
              </div>
            </div>
            <div className="card-body">
              <Table data={{ column, data: users }} tableName="Data Pengguna" />
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal modal-blur fade"
        id="ModalEdit"
        tabindex="-1"
        role="dialog"
        aria-modal="true"
        style={{ paddingRight: 6 }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Pengguna</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={doUpdateUser} id="editForm">
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="text"
                    name="email"
                    className="form-control"
                    value={user.email}
                    onChange={(e) => {
                      dispatch(setUser({ ...user, email: e.target.value }));
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password Baru</label>
                  <input
                    type="text"
                    name="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Level</label>
                  <select
                    name="level"
                    className="form-select"
                    onChange={(e) => {
                      dispatch(setUser({ ...user, level: e.target.value }));
                    }}
                    value={user.level}
                  >
                    <option value="adminunit"> Admin Unit </option>
                    <option value="pegawai"> Pegawai </option>
                    <option value="adminkeuangansekolahmasuk">
                      Admin Keuangan Pemasukan Sekolah
                    </option>
                    <option value="adminkeuangansekolahkeluar">
                      Admin Keuangan Pengeluaran Sekolah
                    </option>
                    <option value="adminkeuanganmasuk">
                      Admin Keuangan Masuk
                    </option>
                    <option value="adminkeuangankeluar">
                      Admin Keuangan Keluar
                    </option>
                  </select>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn me-auto"
                data-bs-dismiss="modal"
              >
                Tutup
              </button>
              <button type="submit" className="btn btn-primary" form="editForm">
                {isUpdating ? <LoadingIcon /> : "Simpan"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal modal-blur fade"
        id="ModalDelete"
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
                Anda akan menghapus data pegawai <b>{user.nama}</b>
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
      <div
        className="modal modal-blur fade"
        id="modal-import"
        tabindex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Import Pengguna</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form
                action="http://localhost/simpeglocal/users/import"
                method="post"
                id="import"
                enctype="multipart/form-data"
              >
                <div class="mb-3">
                  <label class="form-label">File</label>
                  <input
                    type="file"
                    name="file"
                    class="form-control"
                    placeholder=""
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn me-auto"
                data-bs-dismiss="modal"
              >
                Tutup
              </button>
              <button type="submit" className="btn btn-primary" form="import">
                Simpan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListUser;
