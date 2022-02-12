
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import logo from "../../assets/img/logo.svg"
import { setMe } from "../../reduxslice/meSlice"
import { useNavigate } from 'react-router';

const Header = () => {
    const dispatch = useDispatch()
    const me = useSelector((state) => state.me)

    const router = useNavigate()

    const fullname = me != null ? me.name : ""
    const level = me != null ?me.level : ""

    const logout = () => {
        localStorage.clear()
        dispatch(setMe(null))
        router("/login", { replace: true })
    }

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
                <div className="nav-item dropdown">
                    <a href="#" className="nav-link d-flex lh-1 text-reset p-0" data-bs-toggle="dropdown" aria-label="Open user menu">
                        <span className="avatar avatar-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinecap="round">
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
                        <button className="dropdown-item" onClick={logout}>Logout</button>
                    </div>
                </div>
            </div>
        </div>
    </header>
}

export default Header