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
const updateMasterDiklat = async (payload) => {
  try {
    let result = await axiosIntance().patch("master/diklat", payload, {
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
const addMasterDiklat = async (payload) => {
  try {
    let result = await axiosIntance().post("master/diklat", payload, {
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
const updateMasterGapok = async (payload) => {
  try {
    let result = await axiosIntance().patch("master/gapok", payload, {
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
const addMasterGapok = async (payload) => {
  try {
    let result = await axiosIntance().post("master/gapok", payload, {
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
const updateMasterJabatanStruktural = async (payload) => {
  try {
    let result = await axiosIntance().patch(
      "master/jabatan-struktural",
      payload,
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
const addMasterJabatanStruktural = async (payload) => {
  try {
    let result = await axiosIntance().post(
      "master/jabatan-struktural",
      payload,
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
const updateMasterGolongan = async (payload) => {
  try {
    let result = await axiosIntance().patch("master/golongan", payload, {
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
const addMasterGolongan = async (payload) => {
  try {
    let result = await axiosIntance().post("master/golongan", payload, {
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
const updateMasterJabatanFungsional = async (payload) => {
  try {
    let result = await axiosIntance().patch(
      "master/jabatan-fungsional",
      payload,
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
const addMasterJabatanFungsional = async (payload) => {
  try {
    let result = await axiosIntance().post(
      "master/jabatan-fungsional",
      payload,
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

const masterJabatanTambahan = async () => {
  try {
    let result = await axiosIntance().get("master/jabatan-tambahan", {
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
const updateMasterJabatanTambahan = async (payload) => {
  try {
    let result = await axiosIntance().patch(
      "master/jabatan-tambahan",
      payload,
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
const addMasterJabatanTambahan = async (payload) => {
  try {
    let result = await axiosIntance().post("master/jabatan-tambahan", payload, {
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

const masterPendidikan = async () => {
  try {
    let result = await axiosIntance().get("master/pendidikan", {
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
const updateMasterPendidikan = async (payload) => {
  try {
    let result = await axiosIntance().patch("master/pendidikan", payload, {
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
const addMasterPendidikan = async (payload) => {
  try {
    let result = await axiosIntance().post("master/pendidikan", payload, {
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

const masterAgama = async () => {
  try {
    let result = await axiosIntance().get("master/agama", {
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

const updateMasterAgama = async (payload) => {
  try {
    let result = await axiosIntance().patch("master/agama", payload, {
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
const addMasterAgama = async (payload) => {
  try {
    let result = await axiosIntance().post("master/agama", payload, {
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

const masterUPT = async () => {
  try {
    let result = await axiosIntance().get("master/upt", {
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

const updateMasterUPT = async (payload) => {
  try {
    let result = await axiosIntance().patch("master/upt", payload, {
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
const addMasterUPT = async (payload) => {
  try {
    let result = await axiosIntance().post("master/upt", payload, {
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
export {
  masterDiklat,
  updateMasterDiklat,
  addMasterDiklat,
  ///
  masterGapok,
  updateMasterGapok,
  addMasterGapok,
  ///
  masterJabatanStruktural,
  addMasterJabatanStruktural,
  updateMasterJabatanStruktural,
  ///
  masterGolongan,
  updateMasterGolongan,
  addMasterGolongan,
  ///
  masterJabatanFungsional,
  addMasterJabatanFungsional,
  updateMasterJabatanFungsional,
  ///
  masterJabatanTambahan,
  addMasterJabatanTambahan,
  updateMasterJabatanTambahan,
  ///
  masterPendidikan,
  addMasterPendidikan,
  updateMasterPendidikan,
  ///
  masterAgama,
  updateMasterAgama,
  addMasterAgama,
  ///
  masterUPT,
  updateMasterUPT,
  addMasterUPT,
};
