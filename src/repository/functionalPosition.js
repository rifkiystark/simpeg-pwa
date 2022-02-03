import axiosIntance from "./_axios-instance";
import Const from "../constant";

const getFunctionalPositions = async (id) => {
  try {
    let result = await axiosIntance().get("jabatan-fungsional/get/" + id, {
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
const updateFunctionalPosition = async (requestData) => {
  try {
    let result = await axiosIntance().post(
      "jabatan-fungsional/update",
      requestData,
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
const addFunctionalPosition = async (requestData) => {
  try {
    let result = await axiosIntance().post(
      "jabatan-fungsional/add",
      requestData,
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
const deleteFunctionalPosition = async (idJabatanFungsional) => {
  try {
    let result = await axiosIntance().post(
      "jabatan-fungsional/delete",
      { id_jabatanf: idJabatanFungsional },
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
  getFunctionalPositions,
  updateFunctionalPosition,
  deleteFunctionalPosition,
  addFunctionalPosition,
};
