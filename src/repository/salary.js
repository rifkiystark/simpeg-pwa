import axiosIntance from "./_axios-instance";
import Const from "../constant";

const getSalaries = async (id) => {
  try {
    let result = await axiosIntance().get("gapok/get/" + id, {
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
const updateSalary = async (requestData) => {
  try {
    let result = await axiosIntance().post("gapok/update", requestData, {
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
const addSalary = async (requestData) => {
  try {
    let result = await axiosIntance().post("gapok/add", requestData, {
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
const deleteSalary = async (idGapok) => {
  try {
    let result = await axiosIntance().post(
      "gapok/delete",
      { id_gapok: idGapok },
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

export { getSalaries, updateSalary, deleteSalary, addSalary };
