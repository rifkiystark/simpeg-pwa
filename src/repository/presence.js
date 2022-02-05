import axiosIntance from "./_axios-instance";
import Const from "../constant";

const presenceStatus = async () => {
  const todayPresence = JSON.parse(
    localStorage.getItem(Const.STORAGE_KEY.PRESENCE)
  );
  const unsyncPresence = JSON.parse(
    localStorage.getItem(Const.STORAGE_KEY.UNSYNC_PRESENCE)
  );
  if (todayPresence != null) {
    return {
      status: true,
      data: {
        presenceSetting: null,
        presenceToday: todayPresence,
      },
      message: Const.STORAGE_KEY.PRESENCE,
    };
  } else if (unsyncPresence != null) {
    return {
      status: true,
      data: {
        presenceSetting: null,
        presenceToday: unsyncPresence,
      },
      message: Const.STORAGE_KEY.UNSYNC_PRESENCE,
    };
  }
  try {
    let result = await axiosIntance().get("presensi/status", {
      headers: {
        Authorization:
          "Bearer " + localStorage.getItem(Const.STORAGE_KEY.TOKEN),
      },
    });
    return { status: true, data: result.data.data, message: "" };
  } catch (error) {
    return {
      status: false,
      data: {
        presenceSetting: null,
        presenceToday: null,
      },
      message: "",
    };
  }
};

const presenceIn = async (dataPresence) => {
  try {
    let result = await axiosIntance().post("presensi/masuk", dataPresence, {
      headers: {
        Authorization:
          "Bearer " + localStorage.getItem(Const.STORAGE_KEY.TOKEN),
      },
    });
    return { status: true, data: result.data, message: "" };
  } catch (error) {
    return { status: false, data: dataPresence, message: "" };
  }
};

const presenceOut = async (dataPresence) => {
  try {
    let result = await axiosIntance().post("presensi/pulang", dataPresence, {
      headers: {
        Authorization:
          "Bearer " + localStorage.getItem(Const.STORAGE_KEY.TOKEN),
      },
    });

    return { status: true, data: result.data, message: "" };
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        const todayUnsyncPresence = localStorage.getItem(
          Const.STORAGE_KEY.UNSYNC_PRESENCE
        );
        if (todayUnsyncPresence != null) {
          return { status: false, data: dataPresence, message: "" };
        } else {
          return {
            status: false,
            data: {},
            message: Const.MESSAGE_CODE.NOT_YET_PRESENCE_IN,
          };
        }
      }
    }
    return { status: false, data: dataPresence, message: "" };
  }
};

const syncPresence = async (dataPresence) => {
  try {
    let result = await axiosIntance().post(
      "presensi/sinkronisasi",
      dataPresence,
      {
        headers: {
          Authorization:
            "Bearer " + localStorage.getItem(Const.STORAGE_KEY.TOKEN),
        },
      }
    );

    return { status: true, data: result.data, message: "" };
  } catch (error) {
    return { status: false, data: dataPresence, message: "" };
  }
};

const getPresencesByUserId = async (userId) => {
  try {
    let result = await axiosIntance().get("presensi/history/" + userId, {
      headers: {
        Authorization:
          "Bearer " + localStorage.getItem(Const.STORAGE_KEY.TOKEN),
      },
    });
    return { status: true, data: result.data, message: "" };
  } catch (error) {
    return { status: false, data: null, message: "" };
  }
};

export {
  presenceStatus,
  presenceIn,
  presenceOut,
  syncPresence,
  getPresencesByUserId,
};
