import Table from "../../components/table/Table";
import { useDispatch, useSelector } from "react-redux";
import { setAdditionalPosition } from "../../reduxslice/masterDataSlice";
import { additionalPositionColumn } from "./tableColumn";
import {
  addMasterJabatanTambahan,
  masterJabatanTambahan,
  updateMasterJabatanTambahan,
} from "../../repository/masterData";
import { useEffect, useState } from "react";
import Toast from "../../components/toast/Toast";
import LoadingIcon from "../../components/loading-icon/LoadingIcon";

function MasterAdditionalPosition() {
  let dispatch = useDispatch();

  // STATE
  const [additionalPositions, setAdditionalPositions] = useState([]);
  const additionalPosition = useSelector(
    (state) => state.masterData.additionalPosition
  );
  const [additionalPositionAdd, setAdditionalPositionAdd] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isPosting, setIsPosting] = useState(false);

  const column = [
    ...additionalPositionColumn,
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
              dispatch(setAdditionalPosition(rowData));
            }}
          >
            Edit
          </button>
        </>
      ),
    },
  ];

  // API CALL
  const doGetMasterAdditionalPosition = async () => {
    const { status, data } = await masterJabatanTambahan();
    if (status) {
      setAdditionalPositions(data);
    }
  };
  const doEditAdditionalPosition = async (e) => {
    e.preventDefault();
    if (additionalPosition.tugas_tambahan == "") {
      Toast.warningToast("Nama jabatan harus diisi");
      return;
    }
    setIsUpdating(true);
    const { status } = await updateMasterJabatanTambahan(additionalPosition);
    if (status) {
      doGetMasterAdditionalPosition();
      Toast.successToast("Berhasil memperbarui data");
    } else {
      Toast.errorToast("Gagal memperbarui data");
    }
    setIsUpdating(false);
  };
  const doAddAdditionalPosition = async (e) => {
    e.preventDefault();
    if (additionalPositionAdd == "") {
      Toast.warningToast("Nama jabatan harus diisi");
      return;
    }
    setIsPosting(true);
    const { status } = await addMasterJabatanTambahan({
      tugas_tambahan: additionalPositionAdd,
    });
    if (status) {
      doGetMasterAdditionalPosition();
      Toast.successToast("Berhasil menambah data");
      setAdditionalPositionAdd("");
    } else {
      Toast.errorToast("Gagal menambah data");
    }
    setIsPosting(false);
  };

  // COMPONENT DID MOUNT
  useEffect(() => {
    doGetMasterAdditionalPosition();
  }, []);
  return (
    <div className="page-wrapper">
      <div className="container-xl">
        <div className="page-header d-print-none">
          <div className="row align-items-center">
            <div className="col">
              <div className="page-pretitle">Halaman Master Data</div>
              <h2 className="page-title">Master Data Jabatan Tambahan</h2>
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
                  <h3 className="card-title">Data Jabatan Tambahan</h3>
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
                data={{ column, data: additionalPositions }}
                tableName="Master Data Jabatan Tambahan"
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
                Edit Jabatan Tambahan
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
              <form onSubmit={doEditAdditionalPosition}>
                <div className="row g-3">
                  <div className="col-md-12">
                    <label className="form-label">Jabatan Tambahan</label>

                    <input
                      type="text"
                      className="form-control"
                      value={additionalPosition.tugas_tambahan}
                      onChange={(e) => {
                        dispatch(
                          setAdditionalPosition({
                            ...additionalPosition,
                            tugas_tambahan: e.target.value,
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
                Tambah Jabatan Tambahan
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
              <form onSubmit={doAddAdditionalPosition}>
                <div className="row g-3">
                  <div className="col-md-12">
                    <label className="form-label">Jabatan Tambahan</label>

                    <input
                      type="text"
                      className="form-control"
                      value={additionalPositionAdd}
                      onChange={(e) => {
                        setAdditionalPositionAdd(e.target.value);
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

export default MasterAdditionalPosition;
