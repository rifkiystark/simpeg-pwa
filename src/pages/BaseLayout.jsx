
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import Header from '../components/header/Header';
import Navbar from '../components/navbar/Navbar';
import { useSelector } from 'react-redux';
import { userInfo } from '../repository/auth';
import { useDispatch } from 'react-redux';
import { setMe } from '../reduxslice/meSlice';
import Const from '../constant';
import { syncPresence } from '../repository/presence';
import { useLocation } from 'react-router';

function BaseLayout() {
    const me = useSelector(state => state.me)
    const dispatch = useDispatch()
    const router = useNavigate()
    const location = useLocation()
   
    useEffect(() => {
        if(location.pathname == "/"){
            router("/dashboard", {replace: true})
        }
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
        async function syncPresences(){
            let unsyncPresences = []
            for(let i = 0; i < localStorage.length; i++){
                if(localStorage.key(i).includes("__UP__")){
                    unsyncPresences.push(JSON.parse(localStorage.getItem(localStorage.key(i))))
                }
            }
            const { status, data, message} = await syncPresence({unsyncPresences});
            if(status){
                for(let i = 0; i < localStorage.length; i++){
                    if(localStorage.key(i).includes("__UP__")){
                        localStorage.removeItem(localStorage.key(i))
                    }
                }
            } 
        }
        syncPresences()
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