import Table from "../../components/table/Table";
import { useSelector, useDispatch } from "react-redux";
import { setReligion } from "../../reduxslice/masterDataSlice";
import {
  addMasterAgama,
  masterAgama,
  updateMasterAgama,
} from "../../repository/masterData";
import { useEffect } from "react";
import { useState } from "react";
import { religionColumn } from "./tableColumn";
import Toast from "../../components/toast/Toast";
import LoadingIcon from "../../components/loading-icon/LoadingIcon";

function MasterReligion() {
  const dispatch = useDispatch();

  // STATE
  const [religions, setReligions] = useState([]);
  const religion = useSelector((state) => state.masterData.religion);
  const [religionAdd, setReligionAdd] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isPosting, setIsPosting] = useState(false);

  // COLUMN
  const column = [
    ...religionColumn,
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
              dispatch(
                setReligion({
                  kode_agama: rowData.kode_agama,
                  agama: rowData.agama,
                })
              );
            }}
          >
            Edit
          </button>
        </>
      ),
    },
  ];

  // API CALL
  const doGetReligions = async () => {
    const { status, data, message } = await masterAgama();
    setReligions(data);
  };

  const doEditReligion = async (e) => {
    e.preventDefault();
    if (religion.agama.trim() === "") {
      Toast.warningToast("Kolom agama tidak boleh kosong");
      return;
    }
    setIsUpdating(true);
    const { status, data, message } = await updateMasterAgama(religion);
    if (status) {
      Toast.successToast("Berhasil update data");
      doGetReligions();
    } else {
      Toast.errorToast("Gagal update data");
    }
    setIsUpdating(false);
  };

  const doAddReligion = async (e) => {
    e.preventDefault();
    if (religionAdd.trim() === "") {
      Toast.warningToast("Kolom agama harus diisi");
      return;
    }
    setIsPosting(true);
    const { status, data, message } = await addMasterAgama({
      agama: religionAdd,
    });
    if (status) {
      Toast.successToast("Berhasil menambah data");
      setReligionAdd("");
      doGetReligions();
    } else {
      Toast.errorToast("Gagal menambah data");
    }
    setIsPosting(false);
  };

  // COMPONENT DID MOUNT
  useEffect(() => {
    doGetReligions();
  }, []);

  return (
    <div className="page-wrapper">
      <div className="container-xl">
        <div className="page-header d-print-none">
          <div className="row align-items-center">
            <div className="col">
              <div className="page-pretitle">Halaman Master Data</div>
              <h2 className="page-title">Master Data Agama</h2>
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
                  <h3 className="card-title">Data Agama</h3>
                </div>
                <div className="col-6 text-end">
                  <button
                    type="button"
                    className="btn btn-success"
                    data-bs-toggle="modal"
                    data-bs-target="#ModalTambah"
                  >
                    Tambah
                  </button>
                </div>
              </div>
            </div>
            <div className="card-body">
              <Table
                data={{ column, data: religions }}
                tableName="Master Data Agama"
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
                Edit Agama
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
              <form onSubmit={doEditReligion}>
                <div className="row g-3">
                  <div className="col-md-12">
                    <label className="form-label">Agama</label>

                    <input
                      type="text"
                      name="jenis_diklat"
                      className="form-control"
                      value={religion.agama}
                      onChange={(e) => {
                        dispatch(
                          setReligion({
                            ...religion,
                            agama: e.target.value,
                          })
                        );
                      }}
                    />
                  </div>

                  <div className="col-md-12">
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
        id="ModalTambah"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Tambah Agama
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
              <form onSubmit={doAddReligion}>
                <div className="row g-3">
                  <div className="col-md-12">
                    <label className="form-label">Agama</label>
                    <input
                      type="text"
                      name="agama"
                      value={religionAdd}
                      onChange={(e) => {
                        setReligionAdd(e.target.value);
                      }}
                      className="form-control"
                    />
                  </div>

                  <div className="col-md-12">
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

export default MasterReligion;
