import Table from "../../components/table/Table";
import { useDispatch, useSelector } from "react-redux";
import { setEducation } from "../../reduxslice/masterDataSlice";
import { educationColumn } from "./tableColumn";
import {
  masterPendidikan,
  updateMasterPendidikan,
  addMasterPendidikan,
} from "../../repository/masterData";
import { useEffect, useState } from "react";
import Toast from "../../components/toast/Toast";
import LoadingIcon from "../../components/loading-icon/LoadingIcon";

function MasterEducation() {
  let dispatch = useDispatch();

  // STATE
  const [educations, setEducations] = useState([]);
  const education = useSelector((state) => state.masterData.education);
  const [educationAdd, setEducationAdd] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const column = [
    ...educationColumn,
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
              dispatch(setEducation(rowData));
            }}
          >
            Edit
          </button>
        </>
      ),
    },
  ];

  // API CALL
  const doGetMasterEducation = async () => {
    const { status, data } = await masterPendidikan();
    if (status) {
      setEducations(data);
    }
  };

  const doEditMasterEducation = async (e) => {
    e.preventDefault();
    if (education.pendidikan == "") {
      Toast.warningToast("Pendidikan harus diisi");
      return;
    }
    setIsUpdating(true);
    const { status, message } = await updateMasterPendidikan(education);
    if (status) {
      Toast.successToast("berhasil memperbarui data");
      doGetMasterEducation();
    } else {
      Toast.errorToast("Gagal memperbarui data");
    }
    setIsUpdating(false);
  };
  const doAddMasterEducation = async (e) => {
    e.preventDefault();
    if (educationAdd == "") {
      Toast.warningToast("Pendidikan harus diisi");
      return;
    }
    setIsPosting(true);
    const { status, message } = await addMasterPendidikan({
      pendidikan: educationAdd,
    });
    if (status) {
      Toast.successToast("Berhasil menambah data");
      setEducationAdd("");
      doGetMasterEducation();
    } else {
      Toast.errorToast("Gagal menambah data");
    }
    setIsPosting(false);
  };

  // COMPONENT DID MOUNT
  useEffect(() => {
    doGetMasterEducation();
  }, []);
  return (
    <div className="page-wrapper">
      <div className="container-xl">
        <div className="page-header d-print-none">
          <div className="row align-items-center">
            <div className="col">
              <div className="page-pretitle">Halaman Master Data</div>
              <h2 className="page-title">Master Data Pendidikan</h2>
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
                  <h3 className="card-title">Data Pendidikan</h3>
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
                data={{ column, data: educations }}
                tableName="Master Data Pendidikan"
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
                Edit Pendidikan
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
              <form onSubmit={doEditMasterEducation}>
                <div className="row g-3">
                  <div className="col-md-12">
                    <label className="form-label">Pendidikan</label>

                    <input
                      type="text"
                      name="jenis_diklat"
                      className="form-control"
                      value={education.pendidikan}
                      onChange={(e) => {
                        dispatch(
                          setEducation({
                            ...education,
                            pendidikan: e.target.value,
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
                Tambah Pendidikan
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
              <form onSubmit={doAddMasterEducation}>
                <div className="row g-3">
                  <div className="col-md-12">
                    <label className="form-label">Pendidikan</label>

                    <input
                      type="text"
                      name="jenis_diklat"
                      className="form-control"
                      value={educationAdd}
                      onChange={(e) => {
                        setEducationAdd(e.target.value);
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

export default MasterEducation;
