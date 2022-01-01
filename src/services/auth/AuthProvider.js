import {
    useLocation,
    Navigate,
} from 'react-router-dom';
import Const from '../../constant';
import { useNavigate } from 'react-router';
function AuthProvider({ children, level }) {
    const router = useNavigate()
    const token = localStorage.getItem(Const.STORAGE_KEY.TOKEN)
    const user = JSON.parse(localStorage.getItem(Const.STORAGE_KEY.USER_INFO))
    const location = useLocation();
    if (token == null || user == null) {
        return <Navigate to="/login" state={{ from: location }} />
    } else if(!level.includes(user.level)){
        return <Navigate to="/dashboard" />
    }

    return children
}

export default AuthProvider