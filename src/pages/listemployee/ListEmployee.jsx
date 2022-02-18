import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Table from "../../components/table/Table";
import Const from "../../constant";
import { getListPegawai } from "../../repository/employee";
import { masterUPT } from "../../repository/masterData";
import { employeeColumn } from "./tableColumn";

function ListEmployee() {
  let isAdmin = true;
  // REACT ROUTER
  const location = useLocation();
  const router = useNavigate();

  // INITIAL DATA
  const user = location.state?.user;
  const me = JSON.parse(localStorage.getItem(Const.STORAGE_KEY.USER_INFO));

  // STATE
  const [upt, setUpt] = useState(-1);
  const [masterUpt, setMasterUpt] = useState([]);
  const [employees, setEmployees] = useState([]);

  const column = [
    ...employeeColumn,
    {
      name: "Action",
      key: "",
      render: (data, index, rowData) => (
        <>
          <button
            className="btn btn-sm mt-1 me-1"
            onClick={() => {
              router("/profile", {
                state: { user: { id: rowData.id_user } },
              });
            }}
          >
            Lihat
          </button>
        </>
      ),
    },
  ];

  // API CALL
  const doGetEmployeeList = async () => {
    const { status, data } = await getListPegawai(upt);
    if (status) {
      setEmployees(data.data);
    }
  };

  const doGetMasterUPT = async () => {
    const { status, data } = await masterUPT();
    if (status) {
      setMasterUpt(data);
    }
  };

  // COMPONENT DID MOUNT
  useEffect(() => {
    doGetEmployeeList();
    doGetMasterUPT();
  }, []);
  return (
    <div className="page-wrapper">
      <div className="container-xl">
        <div className="page-header d-print-none">
          <div className="row align-items-center">
            <div className="col">
              <div className="page-pretitle">Halaman Pegawai</div>
              <h2 className="page-title">Daftar Pegawai</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="page-body">
        <div className="container-xl">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Daftar Pegawai</h3>
            </div>
            <div className="card-body">
              {me.level == "admin" ? (
                <div className="row">
                  <div className="col-lg-4 col-md-6 col-sm-12">
                    <div className="mb-3">
                      <label className="form-label">UPT</label>
                      <div className="input-group">
                        <select
                          name="id_upt"
                          className="form-select"
                          value={upt}
                          onChange={(e) => {
                            setUpt(e.target.value);
                          }}
                        >
                          <option value={-1}>Semua</option>
                          {masterUpt.map((value, index) => {
                            return (
                              <option value={value.id}>{value.upt}</option>
                            );
                          })}
                        </select>
                        <button className="btn" onClick={doGetEmployeeList}>
                          Filter
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}

              <Table data={{ column, data: employees }} tableName="Pegawai" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListEmployee;
