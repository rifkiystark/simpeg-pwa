import { useRef } from "react";
import { useEffect, useState } from "react";
import SimpleReactValidator from "simple-react-validator";
import "simple-react-validator/dist/locale/id";
import LoadingIcon from "../../components/loading-icon/LoadingIcon";
import Toast from "../../components/toast/Toast";
import Const from "../../constant";
import { validateInput } from "../../helpers";
import {
  getSettingsPresence,
  updateSettingsPresence,
} from "../../repository/presence";

function SettingPresence() {
  // STATE
  const [presences, setPresences] = useState([]);
  const [foto, setFoto] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // VALIDATOR
  const validator = useRef(new SimpleReactValidator({ locale: "id" }));

  // API CALL
  const doGetSettingPresence = async () => {
    const { status, data } = await getSettingsPresence();
    if (status) {
      setPresences(data);
    }
  };
  const doUpdateSetting = async (index) => {
    try {
      const { waktu_masuk, waktu_pulang, radius, latitude, longitude } =
        presences[index].settings;
      if (
        !validateInput(validator, {
          waktu_masuk,
          waktu_pulang,
          radius,
          latitude,
          longitude,
        })
      ) {
        Toast.warningToast("Semua data harus diisi");
        return;
      }
      const formData = new FormData();
      formData.append("waktu_masuk", waktu_masuk);
      formData.append("waktu_pulang", waktu_pulang);
      formData.append("radius", radius);
      formData.append("latitude", latitude);
      formData.append("longitude", longitude);
      formData.append("id_upt", presences[index].id);

      if (foto != null) {
        formData.append("foto", foto);
      } else {
        if (
          presences[index].settings.id == undefined ||
          presences[index].settings.id == null
        ) {
          Toast.warningToast("Data Header tidak boleh kosong");
          return;
        }
      }
      setIsLoading(true);
      const { status, data } = await updateSettingsPresence(formData);
      if (status) {
        setFoto(null);
        doGetSettingPresence();
        Toast.successToast("Berhasil memperbarui data");
      } else {
        Toast.errorToast("Gagal memperbarui data");
      }
      setIsLoading(false);
    } catch (e) {
      Toast.warningToast("Semua data harus diisi");
    }
  };

  // this is similar to componentDidMount
  useEffect(() => {
    doGetSettingPresence();
  }, []);

  const onChange = (e, index) => {
    let tempPresence = [...presences];
    if (tempPresence[index].settings == null) {
      tempPresence[index].settings = {};
    }
    tempPresence[index].settings[e.target.name] = e.target.value;
    setPresences(tempPresence);
  };

  return (
    <>
      <div className="page-wrapper">
        <div className="container-xl">
          <div className="page-header d-print-none">
            <div className="row align-items-center">
              <div className="col">
                <div className="page-pretitle">Halaman Presensi</div>
                <h2 className="page-title">Pengaturan Presensi</h2>
              </div>
            </div>
          </div>
        </div>

        <section className="page-body">
          <div className="container-xl">
            <div className="card card-primary card-outline">
              <div className="card-body">
                <ul className="nav nav-pills mb-3">
                  {presences.map((presence, index) => (
                    <li className="nav-item">
                      <a
                        href={`#navpills-${presence.id}`}
                        className={`nav-link ${
                          index === 0 ? "active show" : ""
                        }`}
                        data-bs-toggle="tab"
                        aria-expanded="false"
                      >
                        {presence.upt}
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="tab-content br-n pn">
                  {presences.map((presence, index) => (
                    <div
                      id={`navpills-${presence.id}`}
                      className={`tab-pane ${index === 0 ? "active show" : ""}`}
                    >
                      <h3 className="card-title">Pengaturan Waktu</h3>
                      <div className="row">
                        <div className="col-md-6">
                          <label className="form-label">Waktu Masuk</label>
                          <div className="input-group clockpicker">
                            <input
                              type="time"
                              className="form-control"
                              name="waktu_masuk"
                              onChange={(e) => onChange(e, index)}
                              value={
                                presence.settings != null
                                  ? presence.settings.waktu_masuk
                                  : ""
                              }
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Waktu Pulang</label>
                          <div className="input-group">
                            <input
                              type="time"
                              className="form-control"
                              name="waktu_pulang"
                              onChange={(e) => onChange(e, index)}
                              value={
                                presence.settings != null
                                  ? presence.settings.waktu_pulang
                                  : ""
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <h3 className="card-title mt-3">Pengaturan Lokasi</h3>
                      <div className="row">
                        <div className="col-md-6">
                          <label className="form-label">Latitude</label>
                          <div className="input-group clockpicker">
                            <input
                              className="form-control"
                              name="latitude"
                              onChange={(e) => onChange(e, index)}
                              value={
                                presence.settings != null
                                  ? presence.settings.latitude
                                  : ""
                              }
                            />{" "}
                            <span className="input-group-append">
                              <span className="input-group-text">
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
                                  <circle cx="12" cy="11" r="3" />
                                  <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" />
                                </svg>
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Longitude</label>
                          <div className="input-group">
                            <input
                              className="form-control"
                              name="longitude"
                              onChange={(e) => onChange(e, index)}
                              value={
                                presence.settings != null
                                  ? presence.settings.longitude
                                  : ""
                              }
                            />{" "}
                            <span className="input-group-append">
                              <span className="input-group-text">
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
                                  <circle cx="12" cy="11" r="3" />
                                  <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" />
                                </svg>
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className="col-md-6 mt-3">
                          <label className="form-label">Radius</label>
                          <div className="input-group">
                            <input
                              className="form-control"
                              name="radius"
                              onChange={(e) => onChange(e, index)}
                              value={
                                presence.settings != null
                                  ? presence.settings.radius
                                  : ""
                              }
                              required
                            />{" "}
                            <span className="input-group-append">
                              <span className="input-group-text">meter</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <h3 className="card-title mt-3">
                        Pengaturan Header Ekspor
                      </h3>
                      <div className="row">
                        <div className="col-md-12">
                          <label className="form-label">Header</label>
                          <div className="input-group clockpicker">
                            <input
                              type="file"
                              name="foto"
                              className="form-control"
                              onChange={(e) => {
                                setFoto(e.target.files[0]);
                              }}
                            />
                          </div>
                        </div>

                        <div className="col-md-12">
                          <img
                            className="img img-fluid mt-3"
                            src={
                              Const.BASE_URL +
                              Const.FOTO_PREFIX +
                              presence.settings?.header
                            }
                            alt=""
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col">
                          <button
                            onClick={() => doUpdateSetting(index)}
                            className="mt-3 btn btn-primary"
                          >
                            {isLoading ? <LoadingIcon /> : "Simpan"}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default SettingPresence;
