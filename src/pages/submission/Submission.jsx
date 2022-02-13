import { useEffect } from "react";
import { useState } from "react";
import Table from "../../components/table/Table";
import { getSubmissions } from "../../repository/submission";
import { submissionColumn } from "./tableColumn";

function Submission() {
  const [jabatanFungsionals, setJabatanFungsionals] = useState([]);
  const [jabatanTambahans, setJabatanTambahans] = useState([]);
  const [jabatanStrukturals, setJabatanStrukturals] = useState([]);
  const [gapoks, setGapoks] = useState([]);
  const [diklats, setDiklats] = useState([]);

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
                      column: submissionColumn.diklats,
                    }}
                    tableName="Data Jabatan Tambahan"
                  />
                </div>
                <div id="navpills-gapok" className="tab-pane">
                  <Table
                    data={{
                      data: gapoks,
                      column: submissionColumn.gapoks,
                    }}
                    tableName="Data Jabatan Tambahan"
                  />
                </div>
                <div id="navpills-jabatan" className="tab-pane">
                  <Table
                    data={{
                      data: jabatanStrukturals,
                      column: submissionColumn.jabatanStrukturals,
                    }}
                    tableName="Data Jabatan Tambahan"
                  />
                </div>
                <div id="navpills-fungsional" className="tab-pane">
                  <Table
                    data={{
                      data: jabatanFungsionals,
                      column: submissionColumn.jabatanFungsionals,
                    }}
                    tableName="Data Jabatan Tambahan"
                  />
                </div>
                <div id="navpills-tambahan" className="tab-pane">
                  <Table
                    data={{
                      data: jabatanTambahans,
                      column: submissionColumn.jabatanFungsionalTambahans,
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
