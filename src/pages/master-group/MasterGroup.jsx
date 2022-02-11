import Table from "../../components/table/Table";
import { useDispatch, useSelector } from "react-redux";
import { setGroup } from "../../reduxslice/masterDataSlice";
import { groupColumn } from "./tableColumn";
import {
  addMasterGolongan,
  masterGolongan,
  updateMasterGolongan,
} from "../../repository/masterData";
import { useEffect } from "react";
import { useState } from "react";
import Toast from "../../components/toast/Toast";
import LoadingIcon from "../../components/loading-icon/LoadingIcon";

function MasterGroup() {
  let dispatch = useDispatch();

  // STATE
  const [groups, setGroups] = useState([]);
  const group = useSelector((state) => state.masterData.group);
  const [groupAdd, setGroupAdd] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const column = [
    ...groupColumn,
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
              dispatch(setGroup(rowData));
            }}
          >
            Edit
          </button>
        </>
      ),
    },
  ];

  // API CALL
  const doGetMasterGroup = async () => {
    const { status, data, message } = await masterGolongan();
    if (status) {
      setGroups(data);
    }
  };

  const doEditMasterGroup = async (e) => {
    e.preventDefault();
    if (group.pangkat == "") {
      Toast.warningToast("Pangkat harus diisi");
      return;
    }
    setIsUpdating(true);
    const { status, data, message } = await updateMasterGolongan(group);
    if (status) {
      Toast.successToast("Berhasil memperbarui data");
      doGetMasterGroup();
    } else {
      Toast.errorToast("Gagal memperbarui data");
    }
    setIsUpdating(false);
  };
  const doAddMasterGroup = async (e) => {
    e.preventDefault();
    if (groupAdd == "") {
      Toast.warningToast("Pangkat harus diisi");
      return;
    }
    setIsPosting(true);
    const { status, data, message } = await addMasterGolongan({
      pangkat: groupAdd,
    });
    if (status) {
      Toast.successToast("Berhasil menambah data");
      setGroupAdd("")
      doGetMasterGroup();
    } else {
      Toast.errorToast("Gagal menambah data");
    }
    setIsPosting(false);
  };

  // COMPONENT DID MOUNT
  useEffect(() => {
    doGetMasterGroup();
  }, []);
  return (
    <div className="page-wrapper">
      <div className="container-xl">
        <div className="page-header d-print-none">
          <div className="row align-items-center">
            <div className="col">
              <div className="page-pretitle">Halaman Master Data</div>
              <h2 className="page-title">Master Data Golongan</h2>
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
                  <h3 className="card-title">Data Golongan</h3>
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
                data={{ column, data: groups }}
                tableName="Master Data Golongan"
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
                Edit Golongan
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
              <form onSubmit={doEditMasterGroup}>
                <div className="row g-3">
                  <div className="col-md-12">
                    <label className="form-label">Pangkat</label>
                    <input
                      type="text"
                      name="jenis_diklat"
                      className="form-control"
                      value={group.pangkat}
                      onChange={(e) => {
                        dispatch(
                          setGroup({ ...group, pangkat: e.target.value })
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
                Tambah Golongan
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
              <form onSubmit={doAddMasterGroup}>
                <div className="row g-3">
                  <div className="col-md-12">
                    <label className="form-label">Pangkat</label>
                    <input
                      type="text"
                      name="jenis_diklat"
                      className="form-control"
                      value={groupAdd}
                      onChange={(e) => {
                        setGroupAdd(e.target.value);
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

export default MasterGroup;
