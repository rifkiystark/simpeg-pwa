import axiosIntance from "./_axios-instance";
import Const from "../constant";

const getStructuralPositions = async (id) => {
  try {
    let result = await axiosIntance().get("jabatan-struktural/get/" + id, {
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
const updateStructuralPosition = async (requestData) => {
  try {
    let result = await axiosIntance().post(
      "jabatan-struktural/update",
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
const addStructuralPosition = async (requestData) => {
  try {
    let result = await axiosIntance().post(
      "jabatan-struktural/add",
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
const deleteStructuralPosition = async (idJabatanStruktural) => {
  try {
    let result = await axiosIntance().post(
      "jabatan-struktural/delete",
      { id_jabatan_struktural: idJabatanStruktural },
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
  getStructuralPositions,
  updateStructuralPosition,
  deleteStructuralPosition,
  addStructuralPosition,
};
