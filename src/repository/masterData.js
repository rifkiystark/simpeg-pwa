import axiosIntance from "./_axios-instance";
import Const from "../constant";

const masterDiklat = async () => {
  try {
    let result = await axiosIntance().get("master/diklat", {
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
const masterGapok = async () => {
  try {
    let result = await axiosIntance().get("master/gapok", {
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

const masterJabatanStruktural = async () => {
  try {
    let result = await axiosIntance().get("master/jabatan-struktural", {
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

const masterGolongan = async () => {
  try {
    let result = await axiosIntance().get("master/golongan", {
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

const masterJabatanFungsional = async () => {
  try {
    let result = await axiosIntance().get("master/jabatan-fungsional", {
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

export { masterDiklat, masterGapok, masterJabatanStruktural, masterGolongan, masterJabatanFungsional };
