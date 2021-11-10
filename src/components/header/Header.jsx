
import { Link } from "react-router-dom"
import logo from "../../assets/img/logo.svg"

const Header = () => {
    const fullname = "Ananda Rifkiy Hasan"
    const level = "Admin"

    return <header className="navbar navbar-expand-md navbar-light d-print-none">
        <div className="container-xl">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-menu">
                <span className="navbar-toggler-icon"></span>
            </button>
            <h1 className="
      navbar-brand navbar-brand-autodark
      d-none-navbar-horizontal
      pe-0 pe-md-3
      ">
                <Link to="/dashboard">
                    <img src={logo} width="110" height="32" alt="Tabler" className="navbar-brand-image" />
                </Link>
            </h1>
            <div className="navbar-nav flex-row order-md-last">
                <div className="nav-item d-flex me-3 dropdown">
                    <div className="btn-list">


                        <button data-bs-toggle="dropdown" className="btn btn-outline-white" style={{ padding: ".3rem .4rem" }} target="_blank" rel="noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" style={{ margin: 0, height: 24 }} viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <rect x="4" y="4" width="6" height="6" rx="1" />
                                <rect x="4" y="14" width="6" height="6" rx="1" />
                                <rect x="14" y="14" width="6" height="6" rx="1" />
                                <line x1="14" y1="7" x2="20" y2="7" />
                                <line x1="17" y1="4" x2="17" y2="10" />
                            </svg>
                            <span className="d-none d-xl-block">SekolaCloud Apps</span>
                        </button>
                        <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                            <a target="_blank" href="{{ str_replace('/simpeg', '', url('/')) }}/lms" className="dropdown-item"><span className="avatar avatar-xs rounded me-2" style={{ backgroundImage: 'url("/staticic/lms.svg")' }}></span>
                                LMS</a>

                            <a target="_blank" href="{{ str_replace('/simpeg', '', url('/')) }}/accounting/index.php" className="dropdown-item"><span className="avatar avatar-xs rounded me-2" style={{ backgroundImage: 'url("/staticic/simkeu.svg")' }}></span>
                                SIMKEU</a>

                            <a target="_blank" href="{{ str_replace('/simpeg', '', url('/')) }}/simpeg/index.php" className="dropdown-item"><span className="avatar avatar-xs rounded me-2" style={{ backgroundImage: 'url("/staticic/simpeg.svg")' }}></span>
                                SIMPEG</a>

                            <a target="_blank" href="{{ str_replace('/simpeg', '', url('/')) }}/kelulusan/index.php" className="dropdown-item"><span className="avatar avatar-xs rounded me-2" style={{ backgroundImage: 'url("/static/ic/ic-simaker.svg")' }}></span>
                                SIM KELULUSAN</a>

                            <a target="_blank" href="{{ str_replace('/simpeg', '', url('/')) }}/simaset/index.php/login" className="dropdown-item"><span className="avatar avatar-xs rounded me-2" style={{ backgroundImage: 'url("/staticic/simaset.svg")' }}></span>
                                SIMASET</a>

                            <a target="_blank" href="{{ str_replace('/simpeg', '', url('/')) }}/usermanagement/index.php/login" className="dropdown-item"><span className="avatar avatar-xs rounded me-2" style={{ backgroundImage: 'url("/staticic/simakun.svg")' }}></span>
                                SIMAKUN</a>

                        </div>
                    </div>
                </div>
                <div className="nav-item dropdown">
                    <a href="#" className="nav-link d-flex lh-1 text-reset p-0" data-bs-toggle="dropdown" aria-label="Open user menu">
                        <span className="avatar avatar-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <circle cx="12" cy="7" r="4" />
                                <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                            </svg>
                        </span>
                        <div className="d-none d-xl-block ps-2">
                            <div>{fullname}</div>
                            <div style={{
                                width: "fit-content",
                                background: "#353535",
                                fontSize: 10,
                                color: "white",
                                padding: "2px 4px",
                                borderRadius: 4, marginTop: 4
                            }}>{level}</div>
                        </div>
                    </a>
                    <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                        <Link to="login" className="dropdown-item">Logout</Link>
                    </div>
                </div>
            </div>
        </div>
    </header>
}

export default Header