import Table from "../../components/table/Table";
import { useDispatch, useSelector } from "react-redux";
import { setUnit } from "../../reduxslice/masterDataSlice";
import { unitsColumn } from "./tableColumn";
import {
  addMasterUPT,
  masterUPT,
  updateMasterUPT,
} from "../../repository/masterData";
import { useEffect, useState } from "react";
import Toast from "../../components/toast/Toast";
import LoadingIcon from "../../components/loading-icon/LoadingIcon";

function MasterUnits() {
  let dispatch = useDispatch();

  // STATE
  const [units, setUnits] = useState([]);
  const unit = useSelector((state) => state.masterData.units);
  const [unitAdd, setUnitAdd] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isPosting, setIsPosting] = useState(false);

  const column = [
    ...unitsColumn,
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
              dispatch(setUnit(rowData));
            }}
          >
            Edit
          </button>
        </>
      ),
    },
  ];

  // API CALL
  const doGetMasterUnit = async () => {
    const { status, data, message } = await masterUPT();
    if (status) {
      setUnits(data);
    }
  };

  const doAddMasterUnit = async (e) => {
    e.preventDefault();
    if (unitAdd == "") {
      Toast.warningToast("Data diklat tidak boleh kosong");
      return;
    }
    setIsPosting(true);
    const { status } = await addMasterUPT({
      upt: unitAdd,
    });
    if (status) {
      Toast.successToast("Berhasil menambah data");
      setUnitAdd("");
      doGetMasterUnit();
    }
    setIsPosting(false);
  };

  const doEditMasterUnit = async (e) => {
    e.preventDefault();
    if (unit.upt == "") {
      Toast.warningToast("Data diklat tidak boleh kosong");
      return;
    }
    setIsUpdating(true);
    const { status } = await updateMasterUPT(unit);
    if (status) {
      Toast.successToast("Berhasil mengupdate data");
      doGetMasterUnit();
    }
    setIsUpdating(false);
  };

  // COMPONENT DID MOUNT
  useEffect(() => {
    doGetMasterUnit();
  }, []);
  return (
    <div className="page-wrapper">
      <div className="container-xl">
        <div className="page-header d-print-none">
          <div className="row align-items-center">
            <div className="col">
              <div className="page-pretitle">Halaman Master Data</div>
              <h2 className="page-title">Master Data UPT</h2>
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
                  <h3 className="card-title">Data UPT</h3>
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
                data={{ column, data: units }}
                tableName="Master Data UPT"
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
                Edit UPT
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
              <form onSubmit={doEditMasterUnit}>
                <div className="row g-3">
                  <div className="col-md-12">
                    <label className="form-label">UPT</label>

                    <input
                      type="text"
                      name="jenis_diklat"
                      className="form-control"
                      value={unit.upt}
                      onChange={(e) => {
                        dispatch(setUnit({ ...unit, upt: e.target.value }));
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
                Tambah UPT
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
              <form onSubmit={doAddMasterUnit}>
                <div className="row g-3">
                  <div className="col-md-12">
                    <label className="form-label">UPT</label>

                    <input
                      type="text"
                      name="jenis_diklat"
                      className="form-control"
                      value={unitAdd}
                      onChange={(e) => {
                        setUnitAdd(e.target.value);
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

export default MasterUnits;
