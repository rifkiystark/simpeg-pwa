import Table from "../../components/table/Table";
import { useDispatch, useSelector } from "react-redux";
import { setSalary } from "../../reduxslice/masterDataSlice";
import { salaryColumn } from "./tableColumn";
import { useRef, useState } from "react";
import {
  addMasterGapok,
  masterGapok,
  updateMasterGapok,
} from "../../repository/masterData";
import { useEffect } from "react";
import SimpleReactValidator from "simple-react-validator";
import "simple-react-validator/dist/locale/id";
import { validateInput } from "../../helpers";
import Toast from "../../components/toast/Toast";
import LoadingIcon from "../../components/loading-icon/LoadingIcon";

function MasterSalary() {
  let dispatch = useDispatch();

  // STATE
  const [salaries, setSalaries] = useState([]);
  const salary = useSelector((state) => state.masterData.salary);
  const [salaryAdd, setSalaryAdd] = useState({
    masa_kerja: "",
    PP: "",
    kode_gol: "",
    gapok: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [isPosting, setIsPosting] = useState(false);

  const column = [
    ...salaryColumn,
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
              dispatch(setSalary(rowData));
            }}
          >
            Edit
          </button>
        </>
      ),
    },
  ];

  const validator = useRef(new SimpleReactValidator({ locale: "id" }));

  // API CALL
  const doGetMasterSalary = async () => {
    const { status, data, message } = await masterGapok();
    if (status) {
      setSalaries(data);
    }
  };

  const doEditMasterSalary = async (e) => {
    e.preventDefault();
    if (!validateInput(validator, salary)) {
      Toast.warningToast("Harap semua data diisi");
      return;
    }
    setIsUpdating(true);
    const { status, data, message } = await updateMasterGapok(salary);
    if (status) {
      Toast.successToast("Berhasil memperbarui data");
      doGetMasterSalary();
    } else {
      Toast.errorToast("Gagal memperbarui data");
    }
    setIsUpdating(false);
  };

  const doAddMasterSalary = async (e) => {
    e.preventDefault();
    if (!validateInput(validator, salaryAdd)) {
      Toast.warningToast("Harap semua data diisi");
      return;
    }
    setIsPosting(true);
    const { status, data, message } = await addMasterGapok(salaryAdd);
    if (status) {
      Toast.successToast("Berhasil menambah data");
      setSalaryAdd({
        masa_kerja: "",
        PP: "",
        kode_gol: "",
        gapok: "",
      });
      doGetMasterSalary();
    } else {
      Toast.errorToast("Gagal menambah data");
    }
    setIsPosting(false);
  };

  useEffect(() => {
    doGetMasterSalary();
  }, []);
  return (
    <div className="page-wrapper">
      <div className="container-xl">
        <div className="page-header d-print-none">
          <div className="row align-items-center">
            <div className="col">
              <div className="page-pretitle">Halaman Master Data</div>
              <h2 className="page-title">Master Data Gapok</h2>
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
                  <h3 className="card-title">Data Gapok</h3>
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
                data={{ column, data: salaries }}
                tableName="Master Data Gapok"
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
                Edit Gapok
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
              <form onSubmit={doEditMasterSalary}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Masa Kerja</label>
                    <input
                      type="number"
                      value={salary.masa_kerja}
                      onChange={(e) => {
                        dispatch(
                          setSalary({ ...salary, masa_kerja: e.target.value })
                        );
                      }}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">PP</label>
                    <input
                      type="text"
                      name="PP"
                      value={salary.PP}
                      onChange={(e) => {
                        dispatch(setSalary({ ...salary, PP: e.target.value }));
                      }}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Kode Golongan</label>
                    <input
                      type="text"
                      name="kode_gol"
                      value={salary.kode_gol}
                      onChange={(e) => {
                        dispatch(
                          setSalary({ ...salary, kode_gol: e.target.value })
                        );
                      }}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Gapok</label>
                    <input
                      type="number"
                      name="gapok"
                      value={salary.gapok}
                      onChange={(e) => {
                        dispatch(
                          setSalary({ ...salary, gapok: e.target.value })
                        );
                      }}
                      className="form-control"
                    />
                  </div>

                  <div className="col-md-12 text-end">
                    <button
                      type="submit"
                      value="Perbarui"
                      className="btn btn-success"
                    >
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
                Tambah Gapok
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
              <form onSubmit={doAddMasterSalary}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Masa Kerja</label>
                    <input
                      type="number"
                      value={salaryAdd.masa_kerja}
                      onChange={(e) =>
                        setSalaryAdd({
                          ...salaryAdd,
                          masa_kerja: e.target.value,
                        })
                      }
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">PP</label>
                    <input
                      type="text"
                      name="PP"
                      value={salaryAdd.PP}
                      onChange={(e) =>
                        setSalaryAdd({ ...salaryAdd, PP: e.target.value })
                      }
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Kode Golongan</label>
                    <input
                      type="text"
                      name="kode_gol"
                      value={salaryAdd.kode_gol}
                      onChange={(e) =>
                        setSalaryAdd({ ...salaryAdd, kode_gol: e.target.value })
                      }
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Gapok</label>
                    <input
                      type="number"
                      name="gapok"
                      value={salaryAdd.gapok}
                      onChange={(e) =>
                        setSalaryAdd({ ...salaryAdd, gapok: e.target.value })
                      }
                      className="form-control"
                    />
                  </div>

                  <div className="col-md-12 text-end">
                    <button
                      type="submit"
                      value="Perbarui"
                      className="btn btn-success"
                    >
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

export default MasterSalary;
