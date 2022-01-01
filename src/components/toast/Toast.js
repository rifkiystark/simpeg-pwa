import { toast } from "react-toastify"

const successToast = (message) => {
    return toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
     
    })
}

const warningToast = (message) => {
    return toast.warning(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
     
    })
}
const errorToast = (message) => {
    return toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
     
    })
}
const Toast = {
    successToast,
    warningToast,
    errorToast
}

export default Toast