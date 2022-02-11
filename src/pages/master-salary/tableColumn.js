import { formatRupiah } from "../../helpers";

const salaryColumn = [
  {
    name: "Kode Gapok",
    key: "kode_gapok",
    render: (data, index, rowData) => data,
  },
  {
    name: "Masa Kerja",
    key: "masa_kerja",
    render: (data, index, rowData) => data,
  },
  {
    name: "PP",
    key: "PP",
    render: (data, index, rowData) => formatRupiah(data),
  },
  {
    name: "Kode Golongan",
    key: "kode_gol",
    render: (data, index, rowData) => data,
  },
  {
    name: "Gapok",
    key: "gapok",
    render: (data, index, rowData) => formatRupiah(data),
  },
];

export { salaryColumn };
