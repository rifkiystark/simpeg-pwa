import moment from "moment";

const Const = {
  BASE_URL: "https://sim.yppmnu.or.id/",
  API_PREFIX: "api/",
  FOTO_PREFIX: "foto/",
  STORAGE_KEY: {
    TOKEN: "__tang__",
    USER_INFO: "__SPKW__",
    UPT_INFO: "__NGD__",
    PRESENCE: "__P__" + moment().format("YYYY-MM-DD"),
    UNSYNC_PRESENCE: "__UP__" + moment().format("YYYY-MM-DD"),
  },
  MESSAGE_CODE: {
    FILL_USER_INFO: "fill",
    NOT_YET_PRESENCE_IN: "not_yet_presence_in",
  },
  MONTH_ID: [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ],
};

export default Const;
