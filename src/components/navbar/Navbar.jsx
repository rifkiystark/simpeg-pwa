import { useEffect } from "react"
import { Link } from "react-router-dom"
import $ from "jquery"

const Navbar = () => {
    const level = "admin"

    useEffect(() => {
        $(".dropend a.dropdown-toggle").on("click", function (e) {
            var $subMenu = $(this).children(".dropdown-menu");
            $subMenu.toggleClass("show");
            return false;
        });
    }, [])

    return (
        <div className="navbar-expand-md">
            <div className="collapse navbar-collapse" id="navbar-menu">
                <div className="navbar navbar-light">
                    <div className="container-xl">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="dashboard">
                                    <span className="nav-link-icon d-md-none d-lg-inline-block">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <circle cx="12" cy="13" r="2" />
                                            <line x1="13.45" y1="11.55" x2="15.5" y2="9.5" />
                                            <path d="M6.4 20a9 9 0 1 1 11.2 0z" />
                                        </svg>
                                    </span>
                                    <span className="nav-link-title"> Dashboard </span>
                                </Link>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#navbar-base" data-bs-toggle="dropdown" role="button" aria-expanded="false">
                                    <span className="nav-link-icon d-md-none d-lg-inline-block">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
                                            <path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
                                            <line x1="3" y1="6" x2="3" y2="19" />
                                            <line x1="12" y1="6" x2="12" y2="19" />
                                            <line x1="21" y1="6" x2="21" y2="19" />
                                        </svg>
                                    </span>
                                    <span className="nav-link-title"> Kompetensi </span>
                                </a>
                                <div className="dropdown-menu">
                                    <div className="dropdown-menu-columns">
                                        <div className="dropdown-menu-column">
                                            <Link className="dropdown-item" to="history/training"> Diklat </Link>
                                            <Link className="dropdown-item" to="history/salary"> Gapok </Link>
                                            <Link className="dropdown-item" to="history/punishment"> Hukuman </Link>

                                            <Link className="dropdown-item" to="history/structural-position">
                                                Jabatan Struktural
                                            </Link>
                                            <Link className="dropdown-item" to="history/functional-position">
                                                Jabatan Fungsional
                                            </Link>
                                            <Link className="dropdown-item" to="history/additional-position">
                                                Jabatan Tambahan
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="presence/history">
                                    <span className="nav-link-icon d-md-none d-lg-inline-block">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <circle cx="12" cy="12" r="9" />
                                            <polyline points="12 7 12 12 15 15" />
                                        </svg>
                                    </span>
                                    <span className="nav-link-title"> Presensi Saya </span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/profile">
                                    <span className="nav-link-icon d-md-none d-lg-inline-block">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <circle cx="12" cy="7" r="4" />
                                            <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                                        </svg>
                                    </span>
                                    <span className="nav-link-title"> Profilku </span>
                                </Link>
                            </li>
                            {level === "admin" ?
                                <>
                                    <span className="divider-navbar"></span>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="users">
                                            <span className="nav-link-icon d-md-none d-lg-inline-block">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <circle cx="9" cy="7" r="4" />
                                                    <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                                                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                                    <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
                                                </svg>
                                            </span>
                                            <span className="nav-link-title"> Pengguna </span>
                                        </Link>
                                    </li>
                                </>
                                : ''}
                            {(level === "admin" || level === "adminunit") ? <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#navbar-base" data-bs-toggle="dropdown" role="button" aria-expanded="false">
                                    <span className="nav-link-icon d-md-none d-lg-inline-block">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <ellipse cx="12" cy="6" rx="8" ry="3"></ellipse>
                                            <path d="M4 6v6a8 3 0 0 0 16 0v-6" />
                                            <path d="M4 12v6a8 3 0 0 0 16 0v-6" />
                                        </svg>
                                    </span>
                                    <span className="nav-link-title"> Kepegawaian </span>
                                </a>
                                <div className="dropdown-menu">
                                    <div className="dropdown-menu-columns">
                                        <div className="dropdown-menu-column">
                                            {level === "admin" ? <div className="dropend">
                                                <a className="dropdown-item dropdown-toggle" href="#sidebar-keuangan" data-bs-toggle="dropdown" data-bs-auto-close="outside" role="button" aria-expanded="false">
                                                    Master Data
                                                </a>
                                                <div className="dropdown-menu">
                                                    <Link className="dropdown-item" to="master/religions"> Agama </Link>
                                                    <Link className="dropdown-item" to="master/training">
                                                        Diklat
                                                    </Link>
                                                    <Link className="dropdown-item" to="master/salary"> Gapok </Link>
                                                    <Link className="dropdown-item" to="master/group">
                                                        Golongan
                                                    </Link>
                                                    <Link className="dropdown-item" to="master/education">
                                                        Pendidikan
                                                    </Link>
                                                    <Link className="dropdown-item" to="master/structural-position">
                                                        Jabatan Struktural
                                                    </Link>
                                                    <Link className="dropdown-item" to="master/functional-position">
                                                        Jabatan Fungsional
                                                    </Link>
                                                    <Link className="dropdown-item" to="master/additional-position">
                                                        Jabatan Tambahan
                                                    </Link>
                                                    <Link className="dropdown-item" to="master/units">
                                                        UPT
                                                    </Link>
                                                </div>
                                            </div> : <></>}


                                            <Link className="dropdown-item" to="employees"> Pegawai </Link>
                                            <div className="dropend">
                                                <a className="dropdown-item dropdown-toggle" href="#sidebar-presensi" data-bs-toggle="dropdown" data-bs-auto-close="outside" role="button" aria-expanded="false">
                                                    Presensi
                                                </a>
                                                <div className="dropdown-menu">
                                                    <Link className="dropdown-item" to="presence/data">
                                                        Data Presensi
                                                    </Link>
                                                    <Link className="dropdown-item" to="presence/setting"> Setting </Link>
                                                </div>
                                            </div>
                                            <Link className="dropdown-item" to="submission">
                                                <span className="nav-link-title"> Pengajuan </span>
                                                <span className="badge bg-red"></span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </li> : ""}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar