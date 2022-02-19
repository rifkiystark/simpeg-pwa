import { useEffect } from "react";
import { useState } from "react";
import Table from "../../components/table/Table";
import Toast from "../../components/toast/Toast";
import { verifyAdditionalPosition } from "../../repository/additionalPosition";
import { verifyFunctionalPosition } from "../../repository/functionalPosition";
import { verifySalary } from "../../repository/salary";
import { verifyStructuralPosition } from "../../repository/structuralPosition";
import { getSubmissions } from "../../repository/submission";
import { verifyTraining } from "../../repository/training";
import { submissionColumn } from "./tableColumn";

function Submission() {
  const [jabatanFungsionals, setJabatanFungsionals] = useState([]);
  const [jabatanTambahans, setJabatanTambahans] = useState([]);
  const [jabatanStrukturals, setJabatanStrukturals] = useState([]);
  const [gapoks, setGapoks] = useState([]);
  const [diklats, setDiklats] = useState([]);

  // COLUMN
  const diklatColumn = [
    ...submissionColumn.diklats,
    {
      name: "Aksi",
      key: "",
      render: (data, index, rowData) => (
        <button
          className="btn btn-primary btn-sm"
          onClick={(e) => {
            verifyDiklat(rowData);
          }}
        >
          Verifikasi
        </button>
      ),
    },
  ];

  const fungsionalColumn = [
    ...submissionColumn.jabatanFungsionals,
    {
      name: "Aksi",
      key: "",
      render: (data, index, rowData) => (
        <button
          className="btn btn-primary btn-sm"
          onClick={(e) => {
            verifyFungsional(rowData);
          }}
        >
          Verifikasi
        </button>
      ),
    },
  ];

  const tambahanColumn = [
    ...submissionColumn.jabatanFungsionalTambahans,
    {
      name: "Aksi",
      key: "",
      render: (data, index, rowData) => (
        <button
          className="btn btn-primary btn-sm"
          onClick={(e) => {
            verifyTambahan(rowData);
          }}
        >
          Verifikasi
        </button>
      ),
    },
  ];

  const strukturalColumn = [
    ...submissionColumn.jabatanStrukturals,
    {
      name: "Aksi",
      key: "",
      render: (data, index, rowData) => (
        <button
          className="btn btn-primary btn-sm"
          onClick={(e) => {
            verifyStruktural(rowData);
          }}
        >
          Verifikasi
        </button>
      ),
    },
  ];

  const gapokColumn = [
    ...submissionColumn.gapoks,
    {
      name: "Aksi",
      key: "",
      render: (data, index, rowData) => (
        <button
          className="btn btn-primary btn-sm"
          onClick={(e) => {
            verifyGapok(rowData);
          }}
        >
          Verifikasi
        </button>
      ),
    },
  ];

  // API CALL
  const doGetSubmision = async () => {
    const { status, data } = await getSubmissions();
    if (status) {
      setJabatanFungsionals(data.jabatanFungsionals);
      setJabatanTambahans(data.jabatanTambahans);
      setJabatanStrukturals(data.jabatanStrukturals);
      setDiklats(data.diklats);
      setGapoks(data.gapoks);
    }
  };

  const verifyDiklat = async (training) => {
    const { status, data } = await verifyTraining(training.id_diklat);
    if (status) {
      doGetSubmision();
      Toast.successToast("Berhasil memverifikasi");
    } else {
      Toast.errorToast("Gagal memverifikasi");
    }
  };

  const verifyGapok = async (gapok) => {
    const { status, data } = await verifySalary(gapok.id_gapok);
    if (status) {
      doGetSubmision();
      Toast.successToast("Berhasil memverifikasi");
    } else {
      Toast.errorToast("Gagal memverifikasi");
    }
  };

  const verifyFungsional = async (fungsional) => {
    const { status, data } = await verifyFunctionalPosition(
      fungsional.id_jabatanf
    );
    if (status) {
      doGetSubmision();
      Toast.successToast("Berhasil memverifikasi");
    } else {
      Toast.errorToast("Gagal memverifikasi");
    }
  };

  const verifyStruktural = async (struktural) => {
    const { status, data } = await verifyStructuralPosition(
      struktural.id_jabatan
    );
    if (status) {
      doGetSubmision();
      Toast.successToast("Berhasil memverifikasi");
    } else {
      Toast.errorToast("Gagal memverifikasi");
    }
  };

  const verifyTambahan = async (tambahan) => {
    const { status, data } = await verifyAdditionalPosition(tambahan.id_jbtft);
    if (status) {
      doGetSubmision();
      Toast.successToast("Berhasil memverifikasi");
    } else {
      Toast.errorToast("Gagal memverifikasi");
    }
  };

  // COMPOHNENT DID MOUNT
  useEffect(() => {
    doGetSubmision();
  }, []);

  return (
    <div className="page-wrapper">
      <div className="container-xl">
        <div className="page-header d-print-none">
          <div className="row align-items-center">
            <div className="col">
              <div className="page-pretitle">Halaman Pengajuan</div>
              <h2 className="page-title">Pengajuan Kompetensi</h2>
            </div>
          </div>
        </div>
      </div>

      <section className="page-body">
        <div className="container-xl">
          <div className="card card-primary card-outline">
            <div className="card-body">
              <ul className="nav nav-pills mb-3">
                <li className="nav-item">
                  <a
                    href="#navpills-diklat"
                    className="nav-link active show"
                    data-bs-toggle="tab"
                    aria-expanded="false"
                  >
                    Diklat
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="#navpills-gapok"
                    className="nav-link"
                    data-bs-toggle="tab"
                    aria-expanded="false"
                  >
                    Gapok
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="#navpills-jabatan"
                    className="nav-link"
                    data-bs-toggle="tab"
                    aria-expanded="false"
                  >
                    Jabatan Struktural
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="#navpills-fungsional"
                    className="nav-link"
                    data-bs-toggle="tab"
                    aria-expanded="false"
                  >
                    Jabatan Fungsional
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="#navpills-tambahan"
                    className="nav-link"
                    data-bs-toggle="tab"
                    aria-expanded="false"
                  >
                    Jabatan Tambahan
                  </a>
                </li>
              </ul>
              <div className="tab-content br-n pn">
                <div id="navpills-diklat" className="tab-pane active show">
                  <Table
                    data={{
                      data: diklats,
                      column: diklatColumn,
                    }}
                    tableName="Data Jabatan Tambahan"
                  />
                </div>
                <div id="navpills-gapok" className="tab-pane">
                  <Table
                    data={{
                      data: gapoks,
                      column: gapokColumn,
                    }}
                    tableName="Data Jabatan Tambahan"
                  />
                </div>
                <div id="navpills-jabatan" className="tab-pane">
                  <Table
                    data={{
                      data: jabatanStrukturals,
                      column: strukturalColumn,
                    }}
                    tableName="Data Jabatan Tambahan"
                  />
                </div>
                <div id="navpills-fungsional" className="tab-pane">
                  <Table
                    data={{
                      data: jabatanFungsionals,
                      column: fungsionalColumn,
                    }}
                    tableName="Data Jabatan Tambahan"
                  />
                </div>
                <div id="navpills-tambahan" className="tab-pane">
                  <Table
                    data={{
                      data: jabatanTambahans,
                      column: tambahanColumn,
                    }}
                    tableName="Data Jabatan Tambahan"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Submission;
