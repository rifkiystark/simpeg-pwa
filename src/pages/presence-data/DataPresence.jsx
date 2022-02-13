import { useEffect } from "react";
import { useState } from "react";
import Table from "../../components/table/Table";
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

  // COMPONENT DID MOUNT
  useEffect(() => {
    doGetPresenceData();
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
                    <form action="GET">
                      <div className="row g-3">
                        {/* @if(Auth::user()->isUPTAdmin) */}
                        <input type="hidden" name="upt" value="{{$uptId}}" />
                        {/* @else */}
                        <div className="col-12 form-group">
                          <label className="form-label" for="inputStatus">
                            UPT
                          </label>
                          <select
                            name="upt"
                            id="inputUser"
                            className="form-control"
                            required
                          >
                            <option value="all">Semua</option>
                            <option value="1">SMK Telkom</option>
                          </select>
                        </div>
                        {/* @endif */}
                        <div className="col-12 form-group">
                          <label className="form-label" for="inputStatus">
                            Tanggal Awal
                          </label>
                          <input
                            className="form-control"
                            type="date"
                            name="tanggalAwal"
                            value=""
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
                            value=""
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
                            required
                          >
                            <option value="all">Semua</option>
                            {/* @foreach($pegawais as $p) */}
                            <option value="1">Ananda</option>
                            {/* @endforeach */}
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
                                name="day[]"
                                value="1"
                              />
                              Senin
                            </label>
                          </div>
                          <div className="form-check mb-3">
                            <label className="form-label form-check-label">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                name="day[]"
                                value="2"
                              />
                              Selasa
                            </label>
                          </div>
                          <div className="form-check mb-3">
                            <label className="form-label form-check-label">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                name="day[]"
                                value="3"
                              />
                              Rabu
                            </label>
                          </div>
                          <div className="form-check mb-3">
                            <label className="form-label form-check-label">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                name="day[]"
                                value="4"
                              />
                              Kamis
                            </label>
                          </div>
                          <div className="form-check mb-3">
                            <label className="form-label form-check-label">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                name="day[]"
                                value="5"
                              />
                              Jumat
                            </label>
                          </div>
                          <div className="form-check mb-3">
                            <label className="form-label form-check-label">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                name="day[]"
                                value="6"
                              />
                              Sabtu
                            </label>
                          </div>
                          <div className="form-check mb-3">
                            <label className="form-label form-check-label">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                name="day[]"
                                value="0"
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
                            type="submit"
                            className="btn w-100 btn-dark mb-2"
                            style={{ display: "block" }}
                          >
                            Filter
                          </button>
                        </div>
                      </div>
                    </form>
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
                      tableName="Data Presensui Semua Pegawai"
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
