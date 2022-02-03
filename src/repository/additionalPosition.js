import axiosIntance from "./_axios-instance";
import Const from "../constant";

const getAdditionalPositions = async (id) => {
  try {
    let result = await axiosIntance().get("jabatan-tambahan/get/" + id, {
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
const updateAdditionalPosition = async (requestData) => {
  try {
    let result = await axiosIntance().post(
      "jabatan-tambahan/update",
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
const addAdditionalPosition = async (requestData) => {
  try {
    let result = await axiosIntance().post(
      "jabatan-tambahan/add",
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
const deleteAdditionalPosition = async (idJabatantambahan) => {
  try {
    let result = await axiosIntance().post(
      "jabatan-tambahan/delete",
      { id_jbtft: idJabatantambahan },
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
  getAdditionalPositions,
  updateAdditionalPosition,
  deleteAdditionalPosition,
  addAdditionalPosition,
};
