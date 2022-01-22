import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Const from "../../constant";
import { useEffect, useState } from "react";
import { presenceStatus } from "../../repository/presence";
import moment from "moment";
import "moment/locale/id";
import { dashboard } from "../../repository/dashboard";

function DashboardPage() {
  moment().locale("id");
  const me = useSelector((state) => state.me);
  const uptInfo = JSON.parse(localStorage.getItem(Const.STORAGE_KEY.UPT_INFO));
  const level = me != null ? me.level : "";
  const name = me != null ? me.name : "";
  const upt = uptInfo != null ? uptInfo.upt : "";

  const [greeting, setGreeting] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [presence, setPresence] = useState(null);
  const [dashboardInformation, setDashboardInformation] = useState(null);

  const showTime = () => {
    var date = new Date();
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    var s = date.getSeconds(); // 0 - 59

    if (h >= 4 && h <= 9) {
      setGreeting("Selamat Pagi");
    } else if (h > 9 && h <= 14) {
      setGreeting("Selamat Siang");
    } else if (h > 14 && h <= 17) {
      setGreeting("Selamat Sore");
    } else {
      setGreeting("Selamat Malam");
    }

    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    var time = h + ":" + m + ":" + s + " WIB";
    setTime(time);

    setDate(
      `${date.getDate()} ${
        Const.MONTH_ID[date.getMonth()]
      } ${date.getFullYear()}`
    );

    setTimeout(showTime, 1000);
  };

  const getPresenceStatus = async () => {
    const { status, data, message } = await presenceStatus();
    if (status) {
      setPresence(data.presenceToday);
      if (message === "") {
        localStorage.setItem(
          Const.STORAGE_KEY.PRESENCE,
          JSON.stringify(data.presenceToday)
        );
      }
    }
  };

  const getDashboardInformation = async () => {
    const { status, data, message } = await dashboard();
    if (status) {
      setDashboardInformation(data);
    }
  };

  useEffect(() => {
    showTime();
    getPresenceStatus();
    console.log(level);
    if (level == "admin" || level == "adminunit") {
      getDashboardInformation();
    }
  }, []);

  return (
    <div className="page-wrapper">
      <div className="container-xl">
        <div className="page-header d-print-none">
          <div className="row align-items-center">
            <div className="col">
              <div className="page-pretitle">Info Login</div>
              <h2 className="page-title">
                {name} | UPT : {upt}
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="container-xl">
        <div className="page-header d-print-none">
          <div className="row align-items-center">
            <div className="col">
              <div className="page-pretitle">Halaman Pegawai</div>
              <h2 className="page-title">Presensi</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="page-body">
        <div className="container-xl">
          <div className="row row-deck row-cards">
            <div className="col-sm-12 col-lg-6">
              <div className="card">
                <div className="progress progress-sm card-progress">
                  <div
                    className="progress-bar"
                    style={{ width: "100%" }}
                    role="progressbar"
                    aria-valuenow="100"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    <span className="visually-hidden"></span>
                  </div>
                </div>
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div className="h3 mb-1" id="greetings">
                      {greeting}
                    </div>
                  </div>
                  <div className="h1 mb-1" id="clock">
                    {time}
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="subheader" id="tanggal">
                      {date}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-3">
              <Link
                className="card"
                to={presence == null ? "/presence/in" : "#"}
              >
                <div className="card">
                  <div className="progress progress-sm card-progress">
                    <div
                      className={`progress-bar ${
                        presence != null ? "bg-green" : "bg-primary"
                      }`}
                      style={{ width: "100%" }}
                      role="progressbar"
                      aria-valuenow="100"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      <span className="visually-hidden"></span>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="h3 mb-1">Presensi</div>
                    </div>
                    <div className="d-flex align-items-baseline">
                      <div className="h1 mb-1 me-2">Masuk</div>
                    </div>
                    <div className="d-flex align-items-center">
                      <div className="subheader">
                        {presence != null
                          ? "Anda masuk pada " +
                            moment
                              .unix(parseInt(presence.masuk))
                              .format("HH:mm:ss")
                          : ""}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-sm-6 col-lg-3">
              <Link
                className="card"
                to={
                  presence == null || presence.keluar == null
                    ? "/presence/out"
                    : "#"
                }
              >
                <div className="card">
                  <div className="progress progress-sm card-progress">
                    <div
                      className={`progress-bar ${
                        presence != null
                          ? presence.keluar != null
                            ? "bg-green"
                            : "bg-primary"
                          : "bg-primary"
                      }`}
                      style={{ width: "100%" }}
                      role="progressbar"
                      aria-valuenow="0"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      <span className="visually-hidden"></span>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="h3 mb-1">Presensi</div>
                    </div>
                    <div className="d-flex align-items-baseline">
                      <div className="h1 mb-1 me-2">Pulang</div>
                    </div>
                    <div className="d-flex align-items-center">
                      <div className="subheader">
                        {presence != null
                          ? presence.keluar != null
                            ? "Anda pulang pada " +
                              moment.unix(presence.keluar).format("HH:mm:ss")
                            : ""
                          : ""}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {level === "admin" ? (
        <>
          <div className="container-xl">
            <div className="page-header d-print-none">
              <div className="row align-items-center">
                <div className="col">
                  <div className="page-pretitle">Halaman Admin</div>
                  <h2 className="page-title">Dashboard</h2>
                </div>
              </div>
            </div>
          </div>

          <div className="page-body">
            <div className="container-xl">
              <div className="row row-deck row-cards">
                <div className="col-md-6 col-xl-3">
                  <div className="card card-sm">
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col-auto">
                          <span className="bg-blue text-white avatar">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="icon"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              strokeWidth="2"
                              stroke="currentColor"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <circle cx="12" cy="7" r="4" />
                              <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                            </svg>
                          </span>
                        </div>
                        <div className="col">
                          <div
                            className="font-weight-medium"
                            style={{ fontSize: 20 }}
                          >
                            {dashboardInformation != null
                              ? dashboardInformation.total_user
                              : "0"}
                          </div>
                          <div className="text-muted">Pengguna</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-xl-3">
                  <div className="card card-sm">
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col-auto">
                          <span className="bg-yellow text-white avatar">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="icon"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              strokeWidth="2"
                              stroke="currentColor"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <circle cx="9" cy="7" r="4" />
                              <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                              <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
                            </svg>
                          </span>
                        </div>
                        <div className="col">
                          <div
                            className="font-weight-medium"
                            style={{ fontSize: 20 }}
                          >
                            {dashboardInformation != null
                              ? dashboardInformation.total_pegawai
                              : "0"}
                          </div>
                          <div className="text-muted">Pegawai</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-xl-3">
                  <div className="card card-sm">
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col-auto">
                          <span className="bg-green text-white avatar">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="icon"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              strokeWidth="2"
                              stroke="currentColor"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <circle cx="12" cy="5" r="2" />
                              <path d="M10 22v-5l-1 -1v-4a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4l-1 1v5" />
                            </svg>
                          </span>
                        </div>
                        <div className="col">
                          <div
                            className="font-weight-medium"
                            style={{ fontSize: 20 }}
                          >
                            {dashboardInformation != null
                              ? dashboardInformation.laki
                              : "0"}
                          </div>
                          <div className="text-muted">Laki-laki</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-xl-3">
                  <div className="card card-sm">
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col-auto">
                          <span className="bg-pink text-white avatar">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="icon"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              strokeWidth="2"
                              stroke="currentColor"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <circle cx="12" cy="5" r="2" />
                              <path d="M10 22v-4h-2l2 -6a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1l2 6h-2v4" />
                            </svg>
                          </span>
                        </div>
                        <div className="col">
                          <div
                            className="font-weight-medium"
                            style={{ fontSize: 20 }}
                          >
                            {dashboardInformation != null
                              ? dashboardInformation.perempuan
                              : "0"}
                          </div>
                          <div className="text-muted">Perempuan</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <> </>
      )}
    </div>
  );
}

export default DashboardPage;
