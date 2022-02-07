import axiosIntance from "./_axios-instance";
import Const from "../constant";

const employeeByUserId = async (userId) => {
  try {
    let result = await axiosIntance().get("pegawai/" + userId, {
      headers: {
        Authorization:
          "Bearer " + localStorage.getItem(Const.STORAGE_KEY.TOKEN),
      },
    });
    return { status: true, data: result.data, message: "" };
  } catch (error) {
    return {
      status: false,
      data: null,
      message: "",
    };
  }
};

const addMarital = async (requestData) => {
  try {
    let result = await axiosIntance().post("pegawai/suami-istri", requestData, {
      headers: {
        Authorization:
          "Bearer " + localStorage.getItem(Const.STORAGE_KEY.TOKEN),
      },
    });
    return { status: true, data: result.data, message: "" };
  } catch (error) {
    return {
      status: false,
      data: null,
      message: "",
    };
  }
};
const addChild = async (requestData) => {
  try {
    let result = await axiosIntance().post("pegawai/anak", requestData, {
      headers: {
        Authorization:
          "Bearer " + localStorage.getItem(Const.STORAGE_KEY.TOKEN),
      },
    });
    return { status: true, data: result.data, message: "" };
  } catch (error) {
    return {
      status: false,
      data: null,
      message: "",
    };
  }
};
const addParent = async (requestData) => {
  try {
    let result = await axiosIntance().post("pegawai/orang-tua", requestData, {
      headers: {
        Authorization:
          "Bearer " + localStorage.getItem(Const.STORAGE_KEY.TOKEN),
      },
    });
    return { status: true, data: result.data, message: "" };
  } catch (error) {
    return {
      status: false,
      data: null,
      message: "",
    };
  }
};

const editProfileGet = async (userId) => {
  try {
    let result = await axiosIntance().get("pegawai/edit/" + userId, {
      headers: {
        Authorization:
          "Bearer " + localStorage.getItem(Const.STORAGE_KEY.TOKEN),
      },
    });
    return { status: true, data: result.data, message: "" };
  } catch (error) {
    return {
      status: false,
      data: null,
      message: "",
    };
  }
};

export { employeeByUserId, addMarital, addChild, addParent, editProfileGet };
