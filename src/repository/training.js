import axiosIntance from "./_axios-instance";
import Const from "../constant";

const getTrainings = async (id) => {
  try {
    let result = await axiosIntance().get("diklat/get/" + id, {
      headers: {
        Authorization:
          "Bearer " + localStorage.getItem(Const.STORAGE_KEY.TOKEN),
      },
    });
    return { status: true, data: result.data.data, message: "" };
  } catch (error) {
    return {
      status: false,
      data: null,
      message: "",
    };
  }
};
const updateTraining = async (requestData) => {
  try {
    let result = await axiosIntance().post("diklat/update", requestData, {
      headers: {
        Authorization:
          "Bearer " + localStorage.getItem(Const.STORAGE_KEY.TOKEN),
      },
    });
    return { status: true, data: result.data.data, message: "" };
  } catch (error) {
    return {
      status: false,
      data: null,
      message: "",
    };
  }
};
const addTraining = async (requestData) => {
  try {
    let result = await axiosIntance().post("diklat/add", requestData, {
      headers: {
        Authorization:
          "Bearer " + localStorage.getItem(Const.STORAGE_KEY.TOKEN),
      },
    });
    return { status: true, data: result.data.data, message: "" };
  } catch (error) {
    return {
      status: false,
      data: null,
      message: "",
    };
  }
};
const deleteTraining = async (idDiklat) => {
  try {
    let result = await axiosIntance().post(
      "diklat/delete",
      { id_diklat: idDiklat },
      {
        headers: {
          Authorization:
            "Bearer " + localStorage.getItem(Const.STORAGE_KEY.TOKEN),
        },
      }
    );
    return { status: true, data: result.data.data, message: "" };
  } catch (error) {
    return {
      status: false,
      data: null,
      message: "",
    };
  }
};

const verifyTraining = async (idDiklat) => {
  try {
    let result = await axiosIntance().post(
      "diklat/verify",
      { id: idDiklat },
      {
        headers: {
          Authorization:
            "Bearer " + localStorage.getItem(Const.STORAGE_KEY.TOKEN),
        },
      }
    );
    return { status: true, data: result.data.data, message: "" };
  } catch (error) {
    return {
      status: false,
      data: null,
      message: "",
    };
  }
};

export {
  getTrainings,
  updateTraining,
  deleteTraining,
  addTraining,
  verifyTraining,
};
