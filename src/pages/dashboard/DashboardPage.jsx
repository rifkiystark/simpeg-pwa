import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Const from "../../constant"


function DashboardPage() {
  const me = useSelector(state => state.me)
  const uptInfo = JSON.parse(localStorage.getItem(Const.STORAGE_KEY.UPT_INFO))
  const level = me != null ? me.level : ""
  const name = me != null ? me.name : ""
  const upt = uptInfo != null ? uptInfo.upt : ""
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
                    <div class="h3 mb-1" id="greetings">Selamat Pagi</div>
                  </div>
                  <div class="h1 mb-1" id="clock">01:39:13 WIB</div>
                  <div class="d-flex align-items-center">
                    <div class="subheader" id="tanggal">20 May 2021</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-sm-6 col-lg-3">
              <Link class="card" to="/presence/in">
                <div class="card">
                  <div class="progress progress-sm card-progress">
                    <div class="progress-bar bg-green" style={{ width: "100%" }} role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
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
                      <div class="subheader">Anda masuk pada 12:00:00</div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div class="col-sm-6 col-lg-3">
              <Link class="card" to="/presence/out">
                <div class="card">
                  <div class="progress progress-sm card-progress">
                    <div class="progress-bar bg-orange bg-green @endif" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
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
                      <div class="subheader">Anda pulang pada 16:00:00</div>
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