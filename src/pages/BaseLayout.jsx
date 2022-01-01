
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { ToastContainer } from 'react-toastify';
import Header from '../components/header/Header';
import Navbar from '../components/navbar/Navbar';
import { useSelector } from 'react-redux';
import { userInfo } from '../repository/auth';
import { useDispatch } from 'react-redux';
import { setMe } from '../reduxslice/meSlice';
import Const from '../constant';

function BaseLayout() {
    const me = useSelector(state => state.me)
    const dispatch = useDispatch()
    const router = useNavigate()
    useEffect(() => {
        async function fetchUserInfo() {
            const { status, data, message } = await userInfo()
            if (status) {
                localStorage.setItem(Const.STORAGE_KEY.USER_INFO, JSON.stringify(data.user))
                localStorage.setItem(Const.STORAGE_KEY.UPT_INFO, JSON.stringify(data.upt))
                dispatch(setMe(data.user))
            } else if(message === Const.MESSAGE_CODE.FILL_USER_INFO){
                router("/profile/fillout", { replace: true })
            }
        }
        if (me == null) {
            dispatch(setMe(JSON.parse(localStorage.getItem(Const.STORAGE_KEY.USER_INFO))))
            fetchUserInfo()
        }
    }, [])
    return (


        <div className="wrapper">
            <Header />
            <Navbar />
            <Outlet />

        </div>
    )
}

export default BaseLayout