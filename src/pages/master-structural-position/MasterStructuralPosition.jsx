import Table from "../../components/table/Table";
import { useDispatch, useSelector } from "react-redux";
import { setStructuralPosition } from "../../reduxslice/masterDataSlice";
import { masterStructuralColumn } from "./tableColumn";
import {
  addMasterJabatanStruktural,
  masterJabatanStruktural,
  updateMasterJabatanStruktural,
} from "../../repository/masterData";
import { useEffect } from "react";
import { useState } from "react";
import Toast from "../../components/toast/Toast";
import LoadingIcon from "../../components/loading-icon/LoadingIcon";

function MasterStructuralPosition() {
  let dispatch = useDispatch();

  // STATE
  const [structuralPositions, setStructuralPositions] = useState([]);
  let structuralPosition = useSelector(
    (state) => state.masterData.structuralPosition
  );
  const [structuralPositionAdd, setStructuralPositionAdd] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isPosting, setIsPosting] = useState(false);

  const column = [
    ...masterStructuralColumn,
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
              dispatch(setStructuralPosition(rowData));
            }}
          >
            Edit
          </button>
        </>
      ),
    },
  ];

  // API CALL
  const doGetMasterStructural = async () => {
    const { status, data, message } = await masterJabatanStruktural();
    if (status) {
      setStructuralPositions(data);
    }
  };
  const doEditMasterStructural = async (e) => {
    e.preventDefault();
    if (structuralPosition.nama_jabatan == "") {
      Toast.warningToast("Nama jabatan harus diisi");
      return;
    }
    setIsUpdating(true);
    const { status, data } = await updateMasterJabatanStruktural(
      structuralPosition
    );
    if (status) {
      Toast.successToast("Berhasil memperbarui data");
      doGetMasterStructural();
    } else {
      Toast.errorToast("Gagal memperbarui data");
    }
    setIsUpdating(false);
  };
  const doAddMasterStructural = async (e) => {
    e.preventDefault();
    if (structuralPositionAdd == "") {
      Toast.warningToast("Nama jabatan harus diisi");
      return;
    }
    setIsPosting(true);
    const { status, data } = await addMasterJabatanStruktural({
      nama_jabatan: structuralPositionAdd,
    });
    if (status) {
      Toast.successToast("Berhasil menambah data");
      setStructuralPositionAdd("");
      doGetMasterStructural();
    } else {
      Toast.errorToast("Gagal menambah data");
    }
    setIsPosting(false);
  };

  // COMPONENT DID MOUNT
  useEffect(() => {
    doGetMasterStructural();
  }, []);

  return (
    <div className="page-wrapper">
      <div className="container-xl">
        <div className="page-header d-print-none">
          <div className="row align-items-center">
            <div className="col">
              <div className="page-pretitle">Halaman Master Data</div>
              <h2 className="page-title">Master Data Jabatan Struktural</h2>
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
                  <h3 className="card-title">Data Jabatan Struktural</h3>
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
                data={{ column, data: structuralPositions }}
                tableName="Master Data Jabatan Struktural"
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
                Edit Jabatan Struktural
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
              <form onSubmit={doEditMasterStructural}>
                <div className="row g-3">
                  <div className="col-md-12">
                    <label className="form-label">Jabatan Struktural</label>
                    <input
                      type="text"
                      name="jenis_diklat"
                      className="form-control"
                      value={structuralPosition.nama_jabatan}
                      onChange={(e) => {
                        dispatch(
                          setStructuralPosition({
                            ...structuralPosition,
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
                Tambah Jabatan Struktural
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
              <form onSubmit={doAddMasterStructural}>
                <div className="row g-3">
                  <div className="col-md-12">
                    <label className="form-label">Jabatan Struktural</label>
                    <input
                      type="text"
                      name="jenis_diklat"
                      className="form-control"
                      value={structuralPositionAdd}
                      onChange={(e) => {
                        setStructuralPositionAdd(e.target.value);
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

export default MasterStructuralPosition;
