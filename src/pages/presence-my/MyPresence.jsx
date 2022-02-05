import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Table from "../../components/table/Table";
import Const from "../../constant";
import { getPresencesByUserId } from "../../repository/presence";
import { presenceTable } from "./tableColumn";

function MyPresence() {
  // REACT ROUTER
  const location = useLocation();
  const router = useNavigate();

  // INITIAL DATA
  const user = location.state?.user;
  const me = JSON.parse(localStorage.getItem(Const.STORAGE_KEY.USER_INFO));

  // STATE
  const [presences, setPresences] = useState([]);

  // API CALL
  const doGetPresences = async () => {
    const { status, data, message } = await getPresencesByUserId(user.id);
    if (status) {
      setPresences(data.data);
      console.log(data)
    }
  };

  // COMPONENT DID MOUNT
  useEffect(() => {
    doGetPresences();
  }, []);
  return (
    <div className="page-wrapper">
      <div className="container-xl">
        <div className="page-header d-print-none">
          <div className="row align-items-center">
            <div className="col">
              <div className="page-pretitle">Halaman Pengguna</div>
              <h2 className="page-title">Daftar Pengguna</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="page-body">
        <div className="container-xl">
          <div className="card">
            <div className="card-header pe-0">
              <div className="row w-100">
                <div className="col-md-6 col-sm-12">
                  <h3 className="card-title">Daftar Pengguna</h3>
                </div>
              </div>
            </div>
            <div className="card-body">
              <Table
                data={{ column: presenceTable.column, data: presences }}
                tableName="Data Presensi"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPresence;
