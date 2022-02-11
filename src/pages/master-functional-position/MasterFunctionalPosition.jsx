import Table from "../../components/table/Table";
import { useDispatch, useSelector } from "react-redux";
import { setFunctionalPosition } from "../../reduxslice/masterDataSlice";
import { functionalPositionColumn } from "./tableColumn";
import {
  addMasterJabatanFungsional,
  masterJabatanFungsional,
  updateMasterJabatanFungsional,
} from "../../repository/masterData";
import { useEffect } from "react";
import { useState } from "react";
import Toast from "../../components/toast/Toast";
import LoadingIcon from "../../components/loading-icon/LoadingIcon";

function MasterFunctionalPosition() {
  let dispatch = useDispatch();

  // STATE
  const [functionalPositions, setFunctionalPositions] = useState([]);
  const functionalPosition = useSelector(
    (state) => state.masterData.functionalPosition
  );
  const [functionalPositionAdd, setFunctionalPositionAdd] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isPosting, setIsPosting] = useState(false);

  const column = [
    ...functionalPositionColumn,
    {
      name: "Action",
      key: "",
      render: (data, index, rowData) => (
        <>
          <button
            className="btn btn-primary btn-sm mt-1 me-1"
            data-bs-toggle="modal"
            data-bs-target="#ModalEdit"
            onClick={() => {
              dispatch(setFunctionalPosition(rowData));
            }}
          >
            Edit
          </button>
        </>
      ),
    },
  ];

  // API CALL
  const doGetMasterFunctionalPosition = async () => {
    const { status, data } = await masterJabatanFungsional();
    if (status) {
      setFunctionalPositions(data);
    }
  };
  const doEditMasterFunctional = async (e) => {
    e.preventDefault();
    if (functionalPosition.nama_jabatan == "") {
      Toast.warningToast("Nama jabatan harus diisi");
      return;
    }
    setIsUpdating(true);
    const { status } = await updateMasterJabatanFungsional(functionalPosition);
    if (status) {
      doGetMasterFunctionalPosition();
      Toast.successToast("Berhasil memperbarui data");
    } else {
      Toast.errorToast("Gagal memperbarui data");
    }
    setIsUpdating(false);
  };
  const doAddMasterFunctional = async (e) => {
    e.preventDefault();
    if (functionalPositionAdd == "") {
      Toast.warningToast("Nama jabatan harus diisi");
      return;
    }
    setIsPosting(true);
    const { status } = await addMasterJabatanFungsional({
      nama_jabatan: functionalPositionAdd,
    });
    if (status) {
      doGetMasterFunctionalPosition();
      Toast.successToast("Berhasil menambah data");
      setFunctionalPositionAdd("");
    } else {
      Toast.errorToast("Gagal menambah data");
    }
    setIsPosting(false);
  };

  // COMPONENT DID MOUNT
  useEffect(() => {
    doGetMasterFunctionalPosition();
  }, []);
  return (
    <div className="page-wrapper">
      <div className="container-xl">
        <div className="page-header d-print-none">
          <div className="row align-items-center">
            <div className="col">
              <div className="page-pretitle">Halaman Master Data</div>
              <h2 className="page-title">Master Data Jabatan Fungsional</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="page-body">
        <div className="container-xl">
          <div className="card">
            <div className="card-header">
              <div className="row w-100">
                <div className="col-6">
                  <h3 className="card-title">Data Jabatan Fungsional</h3>
                </div>
                <div className="col-6 text-end">
                  <button
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#ModalAdd"
                  >
                    Tambah
                  </button>
                </div>
              </div>
            </div>
            <div className="card-body">
              <Table
                data={{ column, data: functionalPositions }}
                tableName="Master Data Jabatan Fungsional"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal modal-blur fade"
        id="ModalEdit"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Jabatan Fungsional
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
              <form onSubmit={doEditMasterFunctional}>
                <div className="row g-3">
                  <div className="col-md-12">
                    <label className="form-label">Jabatan Fungsional</label>
                    <input
                      type="text"
                      name="jenis_diklat"
                      className="form-control"
                      value={functionalPosition.nama_jabatan}
                      onChange={(e) => {
                        dispatch(
                          setFunctionalPosition({
                            ...functionalPosition,
                            nama_jabatan: e.target.value,
                          })
                        );
                      }}
                    />
                  </div>

                  <div className="col-md-12 text-end">
                    <button type="submit" className="btn btn-success">
                      {isUpdating ? <LoadingIcon /> : "Perbarui"}
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
        id="ModalAdd"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Tambah Jabatan Fungsional
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
              <form onSubmit={doAddMasterFunctional}>
                <div className="row g-3">
                  <div className="col-md-12">
                    <label className="form-label">Jabatan Fungsional</label>

                    <input
                      type="text"
                      name="jenis_diklat"
                      className="form-control"
                      value={functionalPositionAdd}
                      onChange={(e) => {
                        setFunctionalPositionAdd(e.target.value);
                      }}
                    />
                  </div>

                  <div className="col-md-12 text-end">
                    <button type="submit" className="btn btn-success">
                      {isPosting ? <LoadingIcon /> : "Tambah"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MasterFunctionalPosition;
