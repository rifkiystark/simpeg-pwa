import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Const from "../../constant"
import { useEffect, useState } from 'react';
import { presenceStatus } from "../../repository/presence";
import moment from 'moment';


function DashboardPage() {
  const me = useSelector(state => state.me)
  const uptInfo = JSON.parse(localStorage.getItem(Const.STORAGE_KEY.UPT_INFO))
  const level = me != null ? me.level : ""
  const name = me != null ? me.name : ""
  const upt = uptInfo != null ? uptInfo.upt : ""

  const [greeting, setGreeting] = useState("")
  const [time, setTime] = useState("")
  const [date, setDate] = useState("")
  const [presence, setPresence] = useState(null)

  const showTime = () => {
    var date = new Date();
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    var s = date.getSeconds(); // 0 - 59

    if (h >= 4 && h <= 9) {
      setGreeting("Selamat Pagi")
    } else if (h > 9 && h <= 14) {
      setGreeting("Selamat Siang")
    } else if (h > 14 && h <= 17) {
      setGreeting("Selamat Sore")
    } else {
      setGreeting("Selamat Malam")
    }

    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;

    var time = h + ":" + m + ":" + s + " WIB"
    setTime(time);

    setDate(`${date.getDate()} ${Const.MONTH_ID[date.getMonth()]} ${date.getFullYear()}`)

    setTimeout(showTime, 1000);
  }

  const getPresenceStatus = async () => {
    const { status, data, message } = await presenceStatus()
    if(status){
      setPresence(data.presenceToday)
      if(message === ""){
        localStorage.setItem(Const.STORAGE_KEY.PRESENCE, JSON.stringify(data.presenceToday))
      }
    } 
  }

  useEffect(() => {
    showTime()
    getPresenceStatus()
  }, [])

  return (
    <div class="page-wrapper">
      <div class="container-xl">
        <div class="page-header d-print-none">
          <div class="row align-items-center">
            <div class="col">
              <div class="page-pretitle">Info Login</div>
              <h2 class="page-title">{name} | UPT : {upt}</h2>
            </div>

          </div>
        </div>
      </div>
      <div class="container-xl">
        <div class="page-header d-print-none">
          <div class="row align-items-center">
            <div class="col">
              <div class="page-pretitle">Halaman Pegawai</div>
              <h2 class="page-title">Presensi</h2>
            </div>
          </div>
        </div>
      </div>
      <div class="page-body">
        <div class="container-xl">
          <div class="row row-deck row-cards">
            <div class="col-sm-12 col-lg-6">
              <div class="card">
                <div class="progress progress-sm card-progress">
                  <div class="progress-bar" style={{ width: "100%" }} role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
                    <span class="visually-hidden"></span>
                  </div>
                </div>
                <div class="card-body">
                  <div class="d-flex align-items-center">
                    <div class="h3 mb-1" id="greetings">{greeting}</div>
                  </div>
                  <div class="h1 mb-1" id="clock">{time}</div>
                  <div class="d-flex align-items-center">
                    <div class="subheader" id="tanggal">{date}</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-sm-6 col-lg-3">
              <Link class="card" to={presence == null ? "/presence/in" : "#"}>
                <div class="card">
                  <div class="progress progress-sm card-progress">
                    <div class={`progress-bar ${presence != null ? "bg-green" : "bg-primary"}`} style={{ width: "100%" }} role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
                      <span class="visually-hidden"></span>
                    </div>
                  </div>
                  <div class="card-body">
                    <div class="d-flex align-items-center">
                      <div class="h3 mb-1">Presensi</div>
                    </div>
                    <div class="d-flex align-items-baseline">
                      <div class="h1 mb-1 me-2">Masuk</div>
                    </div>
                    <div class="d-flex align-items-center">
                      <div class="subheader">{presence != null ? "Anda masuk pada " + moment.unix(parseInt(presence.masuk)).format("HH:MM:ss") : ""}</div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div class="col-sm-6 col-lg-3">
              <Link class="card" to={presence == null || presence.keluar == null ? "/presence/out" : "#"}>
                <div class="card">
                  <div class="progress progress-sm card-progress">
                    <div class={`progress-bar ${presence != null ? presence.keluar != null ? "bg-green" : "bg-primary" : "bg-primary"}`} style={{ width: "100%" }} role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                      <span class="visually-hidden"></span>
                    </div>
                  </div>
                  <div class="card-body">
                    <div class="d-flex align-items-center">
                      <div class="h3 mb-1">Presensi</div>
                    </div>
                    <div class="d-flex align-items-baseline">
                      <div class="h1 mb-1 me-2">Pulang</div>
                    </div>
                    <div class="d-flex align-items-center">
                      <div class="subheader">{presence != null ? presence.keluar != null ? "Anda pulang pada " + moment.unix(parseInt(presence.keluar)).format("HH:MM:ss") : "" : ""}</div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div >

      {level === "admin" ? (
        <>
          <div class="container-xl">

            <div class="page-header d-print-none">
              <div class="row align-items-center">
                <div class="col">
                  <div class="page-pretitle">Halaman Admin</div>
                  <h2 class="page-title">Dashboard</h2>
                </div>
              </div>
            </div>
          </div>

          <div class="page-body">
            <div class="container-xl">
              <div class="row row-deck row-cards">
                <div class="col-md-6 col-xl-3">
                  <div class="card card-sm">
                    <div class="card-body">
                      <div class="row align-items-center">
                        <div class="col-auto">
                          <span class="bg-blue text-white avatar">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                              <circle cx="12" cy="7" r="4" />
                              <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                            </svg>
                          </span>
                        </div>
                        <div class="col">
                          <div class="font-weight-medium" style={{ fontSize: 20 }}>
                            12
                          </div>
                          <div class="text-muted">Pengguna</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 col-xl-3">
                  <div class="card card-sm">
                    <div class="card-body">
                      <div class="row align-items-center">
                        <div class="col-auto">
                          <span class="bg-yellow text-white avatar">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                              <circle cx="9" cy="7" r="4" />
                              <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                              <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
                            </svg>
                          </span>
                        </div>
                        <div class="col">
                          <div class="font-weight-medium" style={{ fontSize: 20 }}>
                            12
                          </div>
                          <div class="text-muted">Pegawai</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 col-xl-3">
                  <div class="card card-sm">
                    <div class="card-body">
                      <div class="row align-items-center">
                        <div class="col-auto">
                          <span class="bg-green text-white avatar">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                              <circle cx="12" cy="5" r="2" />
                              <path d="M10 22v-5l-1 -1v-4a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4l-1 1v5" />
                            </svg>
                          </span>
                        </div>
                        <div class="col">
                          <div class="font-weight-medium" style={{ fontSize: 20 }}>
                            12
                          </div>
                          <div class="text-muted">Laki-laki</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 col-xl-3">
                  <div class="card card-sm">
                    <div class="card-body">
                      <div class="row align-items-center">
                        <div class="col-auto">
                          <span class="bg-pink text-white avatar">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                              <circle cx="12" cy="5" r="2" />
                              <path d="M10 22v-4h-2l2 -6a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1l2 6h-2v4" />
                            </svg>
                          </span>
                        </div>
                        <div class="col">
                          <div class="font-weight-medium" style={{ fontSize: 20 }}>
                            12
                          </div>
                          <div class="text-muted">Perempuan</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )
        : <> </>}

    </div >
  )
}

export default DashboardPage