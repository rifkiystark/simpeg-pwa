import Table from "../../components/table/Table"

function DataPresence() {

    let dummyAllEmployee = {
        column: [
            {
                name: "No",
                key: "",
                render: (data, index, rowData) => (index + 1)
            },
            {
                name: "Nama",
                key: "name",
                render: (data, index, rowData) => data
            },
            {
                name: "WFH (Tepat Waktu)",
                key: "wfhOnTime",
                render: (data, index, rowData) => data
            },
            {
                name: "WFH (Terlambat)",
                key: "wfhLate",
                render: (data, index, rowData) => data
            },
            {
                name: "WFO (Tepat Waktu)",
                key: "wfoOnTime",
                render: (data, index, rowData) => data
            },
            {
                name: "WFO (Terlambat)",
                key: "wfoLate",
                render: (data, index, rowData) => data
            },
            {
                name: "Tidak Masuk",
                key: "notPresence",
                render: (data, index, rowData) => data
            },
            {
                name: "Total Masuk",
                key: "total",
                render: (data, index, rowData) => data
            },
        ],
        data: [
            {
                name: "Ananda Rifkiy Hasan",
                wfhOnTime: "2",
                wfhLate: "2",
                wfoOnTime: "6",
                wfoLate: "0",
                notPresence: "1",
                total: "9",
            }
        ]
    }

    let dummyOneEmployee = {
        column: [
            {
                name: "No",
                key: "",
                render: (data, index, rowData) => (index + 1)
            },
            {
                name: "Tanggal",
                key: "date",
                render: (data, index, rowData) => data
            },
            {
                name: "Waktu Masuk",
                key: "inTime",
                render: (data, index, rowData) => data
            },
            {
                name: "Waktu Pulang",
                key: "outTime",
                render: (data, index, rowData) => data
            },
            {
                name: "Tipe",
                key: "type",
                render: (data, index, rowData) => data
            },
            {
                name: "Keterangan",
                key: "note",
                render: (data, index, rowData) => data
            },
            {
                name: "Lokasi",
                key: "location",
                render: (data, index, rowData) => data
            },
        ],
        data: [
            {
                date: "12 Maret 2020",
                inTime: "06:54",
                outTime: "15:45",
                type: "WFO",
                note: "Tepat Waktu",
                location: "Dalam Kawasan UPT",
            }
        ]
    }

    return <>
        <div className="page-wrapper">
            <div className="container-xl">
                <div className="page-header d-print-none">
                    <div className="row align-items-center">
                        <div className="col">
                            <div className="page-pretitle">Halaman Presensi</div>
                            <h2 className="page-title">Data Presensi</h2>
                        </div>
                    </div>
                </div>
            </div>

            <section className="page-body">
                <div className="container-xl">
                    <div className="card card-primary card-outline">
                        <div className="card-body">
                            <h3 className="card-title">Data Presensi</h3>
                            <div className="row">
                                <div className="col-md-3">
                                    <form action="GET">
                                        <div className="row g-3">
                                            {/* @if(Auth::user()->isUPTAdmin) */}
                                            <input type="hidden" name="upt" value="{{$uptId}}" />
                                            {/* @else */}
                                            <div className="col-12 form-group">
                                                <label className="form-label" for="inputStatus">UPT</label>
                                                <select name="upt" id="inputUser" className="form-control" required>
                                                    <option value="all">Semua</option>
                                                    <option value="1">SMK Telkom</option>
                                                </select>
                                            </div>
                                            {/* @endif */}
                                            <div className="col-12 form-group">
                                                <label className="form-label" for="inputStatus">Tanggal Awal</label>
                                                <input className="form-control" type="date" name="tanggalAwal" value="" />
                                            </div>
                                            <div className="col-12 form-group">
                                                <label className="form-label" for="inputStatus">Tanggal Akhir</label>
                                                <input className="form-control" type="date" name="tanggalAkhir" value="" />
                                            </div>
                                            <div className="col-12 form-group">
                                                <label className="form-label" for="inputStatus">Pegawai</label>
                                                <select name="idPegawai" id="inputUser" className="form-control" required>
                                                    <option value="all">Semua</option>
                                                    {/* @foreach($pegawais as $p) */}
                                                    <option value="1">Ananda</option>
                                                    {/* @endforeach */}
                                                </select>
                                            </div>
                                            <div className="col-12 form-group">
                                                <label className="form-label" for="inputStatus">Hari</label>
                                                <div className="form-check mb-3">
                                                    <label className="form-label form-check-label">
                                                        <input type="checkbox" className="form-check-input" name="day[]" value="1" />Senin</label>
                                                </div>
                                                <div className="form-check mb-3">
                                                    <label className="form-label form-check-label">
                                                        <input type="checkbox" className="form-check-input" name="day[]" value="2" />Selasa</label>
                                                </div>
                                                <div className="form-check mb-3">
                                                    <label className="form-label form-check-label">
                                                        <input type="checkbox" className="form-check-input" name="day[]" value="3" />Rabu</label>
                                                </div>
                                                <div className="form-check mb-3">
                                                    <label className="form-label form-check-label">
                                                        <input type="checkbox" className="form-check-input" name="day[]" value="4" />Kamis</label>
                                                </div>
                                                <div className="form-check mb-3">
                                                    <label className="form-label form-check-label">
                                                        <input type="checkbox" className="form-check-input" name="day[]" value="5" />Jumat</label>
                                                </div>
                                                <div className="form-check mb-3">
                                                    <label className="form-label form-check-label">
                                                        <input type="checkbox" className="form-check-input" name="day[]" value="6" />Sabtu</label>
                                                </div>
                                                <div className="form-check mb-3">
                                                    <label className="form-label form-check-label">
                                                        <input type="checkbox" className="form-check-input" name="day[]" value="0" />Minggu</label>
                                                </div>

                                            </div>
                                            <div className="col-12 form-group">
                                                <label className="form-label" for="inputStatus">Action</label>
                                                <button type="submit" className="btn w-100 btn-dark mb-2" style={{ display: "block" }}>Filter</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="col-md-9">
                                    <Table data={dummyOneEmployee} tableName="Data Presensui Semua Pegawai" />

                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </section>

        </div>
    </>
}

export default DataPresence