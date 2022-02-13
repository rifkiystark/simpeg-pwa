import Const from "../constant";
import axiosIntance from "./_axios-instance";

const getSubmissions = async () => {
  try {
    let result = await axiosIntance().get("pengajuan", {
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

export { getSubmissions };
