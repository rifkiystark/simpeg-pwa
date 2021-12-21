import {
    useLocation,
    Navigate,
} from 'react-router-dom';
function AuthProvider({ children, level }) {
    const user = {
        level: "admin"
    }
    const location = useLocation();
    if (!level.includes(user.level)) {
        return <Navigate to="/login" state={{ from: location }} />
    }

    return children
}

export default AuthProvider