import { Link } from "react-router-dom"

const Navbar = () => {
    const level = "admin"
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
                            {(level === "admin" || level === "adminunit") ? <li className="nav-item">
                                <Link className="nav-link" to="employees">
                                    <span className="nav-link-icon d-md-none d-lg-inline-block">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <circle cx="9" cy="7" r="4" />
                                            <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                            <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
                                        </svg>
                                    </span>
                                    <span className="nav-link-title"> Pegawai </span>
                                </Link>
                            </li> : ""}

                            {(level === "admin") ?
                                <><li className="nav-item">
                                    <Link className="nav-link" to="users">
                                        <span className="nav-link-icon d-md-none d-lg-inline-block">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
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
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" href="#navbar-base" data-bs-toggle="dropdown" role="button" aria-expanded="false">
                                            <span className="nav-link-icon d-md-none d-lg-inline-block">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <ellipse cx="12" cy="6" rx="8" ry="3"></ellipse>
                                                    <path d="M4 6v6a8 3 0 0 0 16 0v-6" />
                                                    <path d="M4 12v6a8 3 0 0 0 16 0v-6" />
                                                </svg>
                                            </span>
                                            <span className="nav-link-title"> Master Data </span>
                                        </a>
                                        <div className="dropdown-menu">
                                            <div className="dropdown-menu-columns">
                                                <div className="dropdown-menu-column">
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
                                                </div>
                                                <div className="dropdown-menu-column">
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
                                            </div>
                                        </div>
                                    </li></> : ""}


                            {(level === "admin" || level === "adminunit") ?
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#navbar-extra" data-bs-toggle="dropdown" role="button" aria-expanded="false">
                                        <span className="nav-link-icon d-md-none d-lg-inline-block"><svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <circle cx="12" cy="12" r="9" />
                                            <polyline points="12 7 12 12 15 15" />
                                        </svg>
                                        </span>
                                        <span className="nav-link-title"> Presensi </span>
                                    </a>
                                    <div className="dropdown-menu">
                                        <a className="dropdown-item" href="{{ url('/') }}/presensi/data">
                                            Data Presensi
                                        </a>
                                        <a className="dropdown-item" href="{{ url('/') }}/presensi/setting"> Setting </a>
                                        <a className="dropdown-item" href="{{ url('/') }}/presensi/history"> Presensi Saya </a>
                                    </div>
                                </li> : (level === "pegawai") ?
                                    <>
                                        <li className="nav-item dropdown @if($active == 'pegawai') active @endif">
                                            <a className="nav-link dropdown-toggle" href="#navbar-base" data-bs-toggle="dropdown" role="button" aria-expanded="false">
                                                <span className="nav-link-icon d-md-none d-lg-inline-block">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                        <path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
                                                        <path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
                                                        <line x1="3" y1="6" x2="3" y2="19" />
                                                        <line x1="12" y1="6" x2="12" y2="19" />
                                                        <line x1="21" y1="6" x2="21" y2="19" />
                                                    </svg>
                                                </span>
                                                <span className="nav-link-title"> Kompentensi </span>
                                            </a>
                                            <div className="dropdown-menu">
                                                <div className="dropdown-menu-columns">
                                                    <div className="dropdown-menu-column">
                                                        <a className="dropdown-item" href="{{ url('/') }}/pegawai/profile/diklat/{{$pegawai->id_peg}}"> Diklat </a>
                                                        <a className="dropdown-item" href="{{ url('/') }}/pegawai/profile/gapok/{{$pegawai->id_peg}}"> Gapok </a>
                                                        <a className="dropdown-item" href="{{ url('/') }}/pegawai/profile/hukuman/{{$pegawai->id_peg}}"> Hukuman </a>

                                                        <a className="dropdown-item" href="{{ url('/') }}/pegawai/profile/jabatan/{{$pegawai->id_peg}}">
                                                            Jabatan Struktural
                                                        </a>
                                                        <a className="dropdown-item" href="{{ url('/') }}/pegawai/profile/jabatanfungsional/{{$pegawai->id_peg}}">
                                                            Jabatan Fungsional
                                                        </a>
                                                        <a className="dropdown-item" href="{{ url('/') }}/pegawai/profile/jabatantambahan/{{$pegawai->id_peg}}">
                                                            Jabatan Tambahan
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="nav-item @if($active == 'presensi') active @endif">
                                            <a className="nav-link" href="{{ url('/') }}/presensi/history">
                                                <span className="nav-link-icon d-md-none d-lg-inline-block">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                        <circle cx="12" cy="12" r="9" />
                                                        <polyline points="12 7 12 12 15 15" />
                                                    </svg>
                                                </span>
                                                <span className="nav-link-title"> Presensi </span>
                                            </a>
                                        </li>
                                        <li className="nav-item @if($active == 'profile') active @endif">
                                            <a className="nav-link" href="{{ url('/') }}/myprofile">
                                                <span className="nav-link-icon d-md-none d-lg-inline-block">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                        <circle cx="12" cy="7" r="4" />
                                                        <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                                                    </svg>
                                                </span>
                                                <span className="nav-link-title"> Profilku </span>
                                            </a>
                                        </li>
                                    </> : ""}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar