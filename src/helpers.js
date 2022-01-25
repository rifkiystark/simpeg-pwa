const formatRupiah = (angka) => {
  var number_string = angka
      .toString()
      .replace(/[^,\d]/g, "")
      .toString(),
    split = number_string.split(","),
    sisa = split[0].length % 3,
    rupiah = split[0].substr(0, sisa),
    ribuan = split[0].substr(sisa).match(/\d{3}/gi);

  // tambahkan titik jika yang di input sudah menjadi angka ribuan
  if (ribuan) {
    let separator = sisa ? "." : "";
    rupiah += separator + ribuan.join(".");
  }

  rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
  return rupiah ? "Rp. " + rupiah : "";
};

const validateInput = (srv, datas) => {
  for (const [key, value] of Object.entries(datas)) {
    if (!srv.current.check(value, "required")) {
      return false;
    }
  }
  return true;
};

export { formatRupiah, validateInput };
