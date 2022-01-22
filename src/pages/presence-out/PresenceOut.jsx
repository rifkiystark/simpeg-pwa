import moment from "moment"
import { useState } from 'react';
import LoadingIcon from "../../components/loading-icon/LoadingIcon";
import { presenceOut } from "../../repository/presence";
import { useNavigate } from 'react-router';
import Const from "../../constant";
import Toast from "../../components/toast/Toast";


function PresenceOut() {
    const router = useNavigate()
    
    const [isLoading, setLoading] = useState(false)
    
    const doPresenceOut = async () => {
        const keluar = moment().unix()
        const date = moment().format("YYYY-MM-DD")
        setLoading(true)
        const { status, data, message } = await presenceOut({ keluar, date });
        if (status) {
            Toast.successToast("Presensi Berhasil")
            let presence = JSON.parse(localStorage.getItem(Const.STORAGE_KEY.PRESENCE))
            presence = { ...presence, ...data.data }
            localStorage.setItem(Const.STORAGE_KEY.PRESENCE, JSON.stringify(presence))
        } else {
            if (message === Const.MESSAGE_CODE.NOT_YET_PRESENCE_IN) {
                Toast.warningToast("Anda belum melakukan presensi masuk")
            } else {
                Toast.warningToast("Presensi gagal dikirim, tetap tenang, kami akan mengirimkan lagi nanti")
                let unsyncPresence = JSON.parse(localStorage.getItem(Const.STORAGE_KEY.UNSYNC_PRESENCE))
                let presence = JSON.parse(localStorage.getItem(Const.STORAGE_KEY.PRESENCE))
                if (unsyncPresence != null) {
                    unsyncPresence = { ...unsyncPresence, ...data }
                } else if(presence != null) {
                    unsyncPresence = { ...presence, ...data }
                    localStorage.setItem(Const.STORAGE_KEY.PRESENCE, JSON.stringify(unsyncPresence))
                }
                localStorage.setItem(Const.STORAGE_KEY.UNSYNC_PRESENCE, JSON.stringify(unsyncPresence))
            }

        }
        setLoading(false)
        router("/dashboard", { replace: true })
    }
    return (
        <>
            <div className="page-wrapper">
                <div className="container-xl">
                    <div className="page-header d-print-none">
                        <div className="row align-items-center">
                            <div className="col">
                                <div className="page-pretitle">Halaman Presensi</div>
                                <h2 className="page-title">Pulang</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="page-body">
                    <div className="container-xl">
                        <div className="alert alert-success w-100" role="alert">
                            <div className="btn-list">
                                <div className="form-row">
                                    <div className="col-12">
                                        <button onClick={doPresenceOut} className="btn btn-success">{!isLoading ? "Pulang" : <LoadingIcon />}</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </>
    )
}

export default PresenceOut