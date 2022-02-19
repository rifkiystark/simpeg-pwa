import { useState } from "react";
import logo from "../../assets/img/logo.svg";
import LoadingIcon from "../../components/loading-icon/LoadingIcon";
import Toast from "../../components/toast/Toast";
import "react-toastify/dist/ReactToastify.css";
import {
  presenceByNIPY,
  presenceInUpt,
  presenceOutUpt,
} from "../../repository/presence";

function PresenceInUpt() {
  const [nipy, setNipy] = useState("");
  const [pegawai, setPegawai] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [presensi, setPresensi] = useState(null);

  // API CALL
  const getPresensiByNIPY = async () => {
    clearData();
    const { status, data } = await presenceByNIPY(nipy);
    if (status) {
      setPegawai(data.pegawai);
      setPresensi(data.presensi);
    } else {
      Toast.warningToast("Pegawai tidak ditemukan");
    }
  };
  const doPresenceIn = async () => {
    setIsLoading(true);
    const { status, data } = await presenceInUpt(pegawai.id_peg);
    if (status) {
      Toast.successToast("Presensi berhasil");
      clearData();
      setNipy("");
    } else {
      Toast.errorToast("Presensi gagal");
    }
    setIsLoading(false);
  };
  const doPresenceOut = async () => {
    setIsLoading(true);
    const { status, data } = await presenceOutUpt(pegawai.id_peg);
    if (status) {
      Toast.successToast("Presensi berhasil");
      clearData();
      setNipy("");
    } else {
      Toast.errorToast("Presensi gagal");
    }
    setIsLoading(false);
  };

  const clearData = () => {
    setPegawai(null);
    setPresensi(null);
  };

  return (
    <body className="antialiased border-top-wide border-primary d-flex flex-column">
      <div className="page page-center">
        <div className="container-tight py-4">
          <div className="text-center mb-4">
            <a href=".">
              <img src={logo} height="48" width="128" alt="" />
            </a>
          </div>
          <div className="card card-md">
            <div className="card-body text-center">
              <h1 className="text-center">Masukan NIPY Anda</h1>
              <input
                type="text"
                className="form-control form-control-lg text-center"
                value={nipy}
                onChange={(e) => {
                  setNipy(e.target.value);
                }}
              />
              <div className="btn-list mt-3 justify-content-center">
                <button
                  className="btn btn-primary btn-lg"
                  onClick={() => {
                    getPresensiByNIPY();
                  }}
                >
                  Enter
                </button>
                <button
                  className="btn btn-lg mt-3"
                  onClick={() => {
                    clearData();
                    setNipy("")
                  }}
                >
                  Clear
                </button>
              </div>

              {pegawai != null && (
                <>
                  <div class="hr-text hr-text-center">
                    <span>Profil Pegawai</span>
                  </div>

                  <h1>{pegawai.nama}</h1>
                  {presensi == null ? (
                    <button
                      className="btn btn-success w-100 btn-lg py-4 mt-1"
                      onClick={() => {
                        doPresenceIn();
                      }}
                    >
                      {isLoading ? (
                        <LoadingIcon />
                      ) : (
                        <h1 className="mb-0">Masuk</h1>
                      )}
                    </button>
                  ) : presensi.keluar == null ? (
                    <button
                      className="btn btn-warning w-100 btn-lg py-4 mt-1"
                      onClick={() => {
                        doPresenceOut();
                      }}
                    >
                      {isLoading ? (
                        <LoadingIcon />
                      ) : (
                        <h1 className="mb-0">Pulang</h1>
                      )}
                    </button>
                  ) : (
                    <button className="btn w-100 btn-lg py-4 mt-1">
                      <h1 className="mb-0">Anda Sudah Presensi</h1>
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}

export default PresenceInUpt;
