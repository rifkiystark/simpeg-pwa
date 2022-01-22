import moment from "moment";
import "moment/locale/id";
import { useEffect, useState } from "react";
import LoadingIcon from "../../components/loading-icon/LoadingIcon";
import Const from "../../constant";
import { presenceIn } from "../../repository/presence";
import Toast from "../../components/toast/Toast";
import { useNavigate } from "react-router";

function PresenceIn() {
  const settingPresence = JSON.parse(
    localStorage.getItem(Const.STORAGE_KEY.UPT_INFO)
  ).settings;
  const router = useNavigate();

  const [showNoGPS, setShowNoGPS] = useState(false);
  const [showOutLocation, setShowOutLocation] = useState(false);
  const [showInLocation, setShowInLocation] = useState(false);
  const [showLoading, setLoading] = useState(false);

  const [lat, setLatitude] = useState(0);
  const [long, setLongitude] = useState(0);
  const [type, setType] = useState("");
  const [lokasi, setLocation] = useState("Dalam kawasan UPT");
  const [keterangan, setNote] = useState("Tepat waktu");
  const [date, setDate] = useState("");
  const [masuk, setTime] = useState(0);

  const displayLocation = (latitude, longitude) => {
    var request = new XMLHttpRequest();

    var method = "GET";
    var url =
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
      longitude +
      "," +
      latitude +
      ".json?access_token=pk.eyJ1Ijoicmlma2l5c3RhcmsiLCJhIjoiY2tvOG8wcDF6MDRudjJucGQ1OG95YWgwMyJ9.BHb_nVFcJjl_gZR_wRjWeQ";
    var async = true;

    request.open(method, url, async);
    request.onreadystatechange = function () {
      if (request.readyState === 4 && request.status === 200) {
        var data = JSON.parse(request.responseText);
        var address = data.features[0].place_name;
        setLocation(address);
      }
    };
    request.send();
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, positionError, {
        enableHighAccuracy: true,
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const positionError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        navigator.permissions
          .query({
            name: "geolocation",
          })
          .then(console.log);
        alert("User denied the request for Geolocation.");
        break;

      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;

      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;

      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        break;
      default:
        alert("An unknown error occurred.");
        break;
    }
  };

  const getDistanceFromLatLonInMeters = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // metres
    const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c; // in metres
    return d;
  };

  const showPosition = (position) => {
    let { latitude, longitude } = position.coords;
    if (latitude != null && longitude != null) {
      console.log(settingPresence);
      var centerLat = settingPresence.latitude;
      var centerLng = settingPresence.longitude;

      var d = getDistanceFromLatLonInMeters(
        parseFloat(centerLat),
        parseFloat(centerLng),
        position.coords.latitude,
        position.coords.longitude
      );
      console.log(d);
      if (d <= settingPresence.radius) {
        setType("WFO");
        setLatitude(latitude);
        setLongitude(longitude);
        setShowInLocation(true);
        setShowOutLocation(false);
        setShowNoGPS(false);
      } else {
        displayLocation(position.coords.latitude, position.coords.longitude);

        setType("WFH");
        setLatitude(latitude);
        setLongitude(longitude);
        setShowInLocation(false);
        setShowOutLocation(true);
        setShowNoGPS(false);
      }
      moment.locale("id");
      setDate(moment().format("YYYY-MM-DD"));
      setTime(moment().unix());
      setNote(isLate());
    } else {
      setShowInLocation(false);
      setShowOutLocation(false);
      setShowNoGPS(true);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  const doPresence = async () => {
    setLoading(true);
    const { status, data, message } = await presenceIn({
      lat,
      long,
      type,
      lokasi,
      keterangan,
      date,
      masuk,
    });
    if (status) {
      Toast.successToast("Presensi Berhasil");
    } else {
      localStorage.setItem(
        Const.STORAGE_KEY.UNSYNC_PRESENCE,
        JSON.stringify(data)
      );
      Toast.warningToast(
        "Presensi gagal dikirim, tetap tenang, kami akan mengirimkan lagi nanti"
      );
    }
    setLoading(false);
    router("/dashboard", { replace: true });
  };

  const isLate = () => {
    const now = moment();
    const presenceTime = moment(settingPresence.waktu_masuk, "H:m");
    const diff = now.diff(presenceTime, "minutes");
    if (diff > 0) {
      return "Terlambat " + diff + " menit";
    } else {
      return "Tepat waktu";
    }
  };

  return (
    <>
      <div className="page-wrapper">
        <div className="container-xl">
          <div className="page-header d-print-none">
            <div className="row align-items-center">
              <div className="col">
                <div className="page-pretitle">Halaman Presensi</div>
                <h2 className="page-title">Masuk</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="page-body">
          <div className="container-xl">
            <div
              className="alert alert-warning w-100"
              role="alert"
              id="outLocation"
              style={{ display: showOutLocation ? "block" : "none" }}
            >
              <h4 className=" alert-title">
                Perhatian, anda berada di luar lokasi!
              </h4>
              <p className="text-muted">
                Anda sekarang berada di luar lokasi, jika posisi anda berada di
                dalam lokasi, tekan refresh lokasi untuk update lokasi. Jika
                anda menekan Masuk, maka anda akan berstatus WFH.
              </p>
              <div className="btn-list">
                <button onClick={getLocation} className="btn btn-warning">
                  Refresh Lokasi
                </button>

                <button onClick={doPresence} className="btn btn-success">
                  {!showLoading ? "Masuk" : <LoadingIcon />}
                </button>
              </div>
            </div>

            <div
              className="alert alert-success w-100"
              role="alert"
              id="inLocation"
              style={{ display: showInLocation ? "block" : "none" }}
            >
              <h4 className="alert-title">Anda berada di dalam lokasi!</h4>
              <p className="text-muted">Anda bisa melakukan presensi</p>
              <div className="btn-list">
                <button onClick={doPresence} className="btn btn-success">
                  {!showLoading ? "Masuk" : <LoadingIcon />}
                </button>
              </div>
            </div>

            <div
              className="alert alert-danger w-100"
              role="alert"
              id="noGPS"
              style={{ display: showNoGPS ? "block" : "none" }}
            >
              <h4 className=" alert-title">Perhatian, aktifkan GPS!</h4>
              <p className="text-muted">
                Tidak dapat memperoleh lokasi anda, mohon aktifkan GPS!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PresenceIn;
