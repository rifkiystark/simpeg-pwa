import { useEffect } from "react";
import { useState } from "react";
import Table from "../../components/table/Table";
import { getListPegawai } from "../../repository/employee";
import { masterUPT } from "../../repository/masterData";
import { getPresencesData } from "../../repository/presence";
import { allEmployeeColumn, oneEmployeeColumn } from "./tableColumn";

function DataPresence() {
  // STATE
  const [idPegawai, setIdPegawai] = useState("all");
  const [tanggalAwal, setTanggalAwal] = useState(null);
  const [tanggalAkhir, setTanggalAkhir] = useState(null);
  const [day, setDay] = useState(["0", "1", "2", "3", "4", "5", "6"]);
  const [upt, setUpt] = useState("all");
  const [presences, setPresences] = useState([]);
  const [masterUpt, setMasterUpt] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);

  // API CALL
  const doGetPresenceData = async () => {
    const { status, data } = await getPresencesData(
      upt,
      tanggalAwal,
      tanggalAkhir,
      idPegawai,
      day
    );
    if (status) {
      data.data.presensi.map((presensi) => {
        presensi.totalDay = data.data.totalDay;
      });
      setPresences(data.data.presensi);
    }
  };
  const doGetMasterUPT = async () => {
    const { status, data } = await masterUPT();
    if (status) {
      setMasterUpt(data);
    }
  };
  const doGetEmployee = async () => {
    const { status, data } = await getListPegawai(-1);
    if (status) {
      setEmployeeList(data.data);
    }
  };

  // COMPONENT DID MOUNT
  useEffect(() => {
    doGetPresenceData();
    doGetMasterUPT();
    doGetEmployee();
  }, []);
  return (
    <>
      <div className="page-wrapper">
        <div className="container-xl">
          <div className="page-header d-print-none">
            <div className="row align-items-center">
              <div className="col">
                <div className="page-pretitle">Halaman Presensi</div>
                <h2 className="page-title">Data Presensi</h2>
              </div>
            </div>
          </div>
        </div>

        <section className="page-body">
          <div className="container-xl">
            <div className="card card-primary card-outline">
              <div className="card-body">
                <h3 className="card-title">Data Presensi</h3>
                <div className="row">
                  <div className="col-md-3">
                    <div className="row g-3">
                      <div className="col-12 form-group">
                        <label className="form-label" for="inputStatus">
                          UPT
                        </label>
                        <select
                          name="upt"
                          id="inputUser"
                          className="form-control"
                          value={upt}
                          onChange={(e) => {
                            setUpt(e.target.value);
                          }}
                        >
                          <option value="all">Semua</option>
                          {masterUpt.map((value, index) => {
                            return (
                              <option value={value.id} key={index}>
                                {value.upt}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div className="col-12 form-group">
                        <label className="form-label" for="inputStatus">
                          Tanggal Awal
                        </label>
                        <input
                          className="form-control"
                          type="date"
                          name="tanggalAwal"
                          value={tanggalAwal}
                          onChange={(e) => {
                            setTanggalAwal(e.target.value);
                          }}
                        />
                      </div>
                      <div className="col-12 form-group">
                        <label className="form-label" for="inputStatus">
                          Tanggal Akhir
                        </label>
                        <input
                          className="form-control"
                          type="date"
                          name="tanggalAkhir"
                          value={tanggalAkhir}
                          onChange={(e) => {
                            setTanggalAkhir(e.target.value);
                          }}
                        />
                      </div>
                      <div className="col-12 form-group">
                        <label className="form-label" for="inputStatus">
                          Pegawai
                        </label>
                        <select
                          name="idPegawai"
                          id="inputUser"
                          className="form-control"
                          value={idPegawai}
                          onChange={(e) => {
                            setIdPegawai(e.target.value);
                          }}
                        >
                          <option value="all">Semua</option>
                          {employeeList.map((value, index) => {
                            return (
                              <option value={value.id_peg} key={index}>
                                {value.nama}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div className="col-12 form-group">
                        <label className="form-label" for="inputStatus">
                          Hari
                        </label>
                        <div className="form-check mb-3">
                          <label className="form-label form-check-label">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={day.includes("1")}
                              onChange={(e) => {
                                if (!e.target.checked) {
                                  let filtered = day.filter(function (
                                    value,
                                    index,
                                    arr
                                  ) {
                                    return value != "1";
                                  });
                                  setDay(filtered);
                                } else {
                                  let newDay = [...day, "1"];
                                  setDay(newDay);
                                }
                              }}
                            />
                            Senin
                          </label>
                        </div>
                        <div className="form-check mb-3">
                          <label className="form-label form-check-label">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={day.includes("2")}
                              onChange={(e) => {
                                if (!e.target.checked) {
                                  let filtered = day.filter(function (
                                    value,
                                    index,
                                    arr
                                  ) {
                                    return value != "2";
                                  });
                                  setDay(filtered);
                                } else {
                                  let newDay = [...day, "2"];
                                  setDay(newDay);
                                }
                              }}
                            />
                            Selasa
                          </label>
                        </div>
                        <div className="form-check mb-3">
                          <label className="form-label form-check-label">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={day.includes("3")}
                              onChange={(e) => {
                                if (!e.target.checked) {
                                  let filtered = day.filter(function (
                                    value,
                                    index,
                                    arr
                                  ) {
                                    return value != "3";
                                  });
                                  setDay(filtered);
                                } else {
                                  let newDay = [...day, "3"];
                                  setDay(newDay);
                                }
                              }}
                            />
                            Rabu
                          </label>
                        </div>
                        <div className="form-check mb-3">
                          <label className="form-label form-check-label">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={day.includes("4")}
                              onChange={(e) => {
                                if (!e.target.checked) {
                                  let filtered = day.filter(function (
                                    value,
                                    index,
                                    arr
                                  ) {
                                    return value != "4";
                                  });
                                  setDay(filtered);
                                } else {
                                  let newDay = [...day, "4"];
                                  setDay(newDay);
                                }
                              }}
                            />
                            Kamis
                          </label>
                        </div>
                        <div className="form-check mb-3">
                          <label className="form-label form-check-label">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={day.includes("5")}
                              onChange={(e) => {
                                if (!e.target.checked) {
                                  let filtered = day.filter(function (
                                    value,
                                    index,
                                    arr
                                  ) {
                                    return value != "5";
                                  });
                                  setDay(filtered);
                                } else {
                                  let newDay = [...day, "5"];
                                  setDay(newDay);
                                }
                              }}
                            />
                            Jumat
                          </label>
                        </div>
                        <div className="form-check mb-3">
                          <label className="form-label form-check-label">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={day.includes("6")}
                              onChange={(e) => {
                                if (!e.target.checked) {
                                  let filtered = day.filter(function (
                                    value,
                                    index,
                                    arr
                                  ) {
                                    return value != "6";
                                  });
                                  setDay(filtered);
                                } else {
                                  let newDay = [...day, "6"];
                                  setDay(newDay);
                                }
                              }}
                            />
                            Sabtu
                          </label>
                        </div>
                        <div className="form-check mb-3">
                          <label className="form-label form-check-label">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={day.includes("0")}
                              onChange={(e) => {
                                if (!e.target.checked) {
                                  let filtered = day.filter(function (
                                    value,
                                    index,
                                    arr
                                  ) {
                                    return value != "0";
                                  });
                                  setDay(filtered);
                                } else {
                                  let newDay = [...day, "0"];
                                  setDay(newDay);
                                }
                              }}
                            />
                            Minggu
                          </label>
                        </div>
                      </div>
                      <div className="col-12 form-group">
                        <label className="form-label" for="inputStatus">
                          Action
                        </label>
                        <button
                          className="btn w-100 btn-dark mb-2"
                          style={{ display: "block" }}
                          onClick={doGetPresenceData}
                        >
                          Filter
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-9">
                    <Table
                      data={{
                        column:
                          idPegawai == "all"
                            ? allEmployeeColumn
                            : oneEmployeeColumn,
                        data: presences,
                      }}
                      tableName="Data Presensi Semua Pegawai"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default DataPresence;
