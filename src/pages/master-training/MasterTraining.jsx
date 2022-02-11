import Table from "../../components/table/Table";
import { useDispatch, useSelector } from "react-redux";
import { setTraining } from "../../reduxslice/masterDataSlice";
import { trainingColumn } from "./tableColumn";
import { useEffect } from "react";
import {
  addMasterDiklat,
  masterDiklat,
  updateMasterDiklat,
} from "../../repository/masterData";
import id from "simple-react-validator/dist/locale/id";
import { useState } from "react";
import Toast from "../../components/toast/Toast";
import LoadingIcon from "../../components/loading-icon/LoadingIcon";

function MasterTraining() {
  let dispatch = useDispatch();

  // STATE
  const [trainings, setTrainings] = useState([]);
  const training = useSelector((state) => state.masterData.training);
  const [trainingAdd, settrainingAdd] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isPosting, setIsPosting] = useState(false);

  const column = [
    ...trainingColumn,
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
              dispatch(setTraining(rowData));
            }}
          >
            Edit
          </button>
        </>
      ),
    },
  ];

  // API CALL
  const doGetMasterTraining = async () => {
    const { status, data, message } = await masterDiklat();
    if (status) {
      setTrainings(data);
    }
  };

  const doAddMasterTraining = async (e) => {
    e.preventDefault();
    if (trainingAdd == "") {
      Toast.warningToast("Data diklat tidak boleh kosong");
      return;
    }
    setIsPosting(true);
    const { status, data, message } = await addMasterDiklat({
      jenis_diklat: trainingAdd,
    });
    if (status) {
      Toast.successToast("Berhasil menambah data");
      settrainingAdd("")
      doGetMasterTraining();
    }
    setIsPosting(false);
  };

  const doEditMasterTraining = async (e) => {
    e.preventDefault();
    if (training.jenis_diklat == "") {
      Toast.warningToast("Data diklat tidak boleh kosong");
      return;
    }
    setIsUpdating(true);
    const { status, data, message } = await updateMasterDiklat(training);
    if (status) {
      Toast.successToast("Berhasil mengupdate data");
      doGetMasterTraining();
    }
    setIsUpdating(false);
  };

  // COMPONENT DID MOUNT
  useEffect(() => {
    doGetMasterTraining();
  }, []);

  return (
    <div className="page-wrapper">
      <div className="container-xl">
        <div className="page-header d-print-none">
          <div className="row align-items-center">
            <div className="col">
              <div className="page-pretitle">Halaman Master Data</div>
              <h2 className="page-title">Master Data Diklat</h2>
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
                  <h3 className="card-title">Data Diklat</h3>
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
                data={{ column, data: trainings }}
                tableName="Master Data Diklat"
              />
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
                Tambah Diklat
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
              <form onSubmit={doAddMasterTraining}>
                <div className="row g-3">
                  <div className="col-md-12">
                    <label className="form-label">Jenis Diklat</label>
                    <input
                      type="text"
                      name="jenis_diklat"
                      className="form-control"
                      value={trainingAdd}
                      onChange={(e) => {
                        settrainingAdd(e.target.value);
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
                Edit Diklat
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
              <form onSubmit={doEditMasterTraining}>
                <div className="row g-3">
                  <div className="col-md-12">
                    <label className="form-label">Jenis Diklat</label>
                    <input
                      type="text"
                      name="jenis_diklat"
                      className="form-control"
                      value={training.jenis_diklat}
                      onChange={(e) => {
                        dispatch(
                          setTraining({
                            ...training,
                            jenis_diklat: e.target.value,
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
    </div>
  );
}

export default MasterTraining;
