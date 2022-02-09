const userColumn = [
  {
    name: "No",
    key: "",
    render: (data, index, rowData) => index + 1,
  },
  {
    name: "Nama",
    key: "name",
    render: (data, index, rowData) => data,
  },
  {
    name: "Email",
    key: "email",
    render: (data, index, rowData) => data,
  },
  {
    name: "Level",
    key: "level",
    render: (data, index, rowData) => data,
  },
  
];

export { userColumn  };
