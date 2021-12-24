import Table from "../../components/table/Table"

function MyPresence() {

    const dummyPresence = {
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
                key: "masuk",
                render: (data, index, rowData) => new Date(data*1000).toLocaleTimeString()
            },
            {
                name: "Waktu Pulang",
                key: "keluar",
                render: (data, index, rowData) => data != null ? new Date(data*1000).toLocaleTimeString() : "-"
            },
            {
                name: "Tipe",
                key: "type",
                render: (data, index, rowData) => data
            },
            {
                name: "Keterangan",
                key: "keterangan",
                render: (data, index, rowData) => data
            },
            {
                name: "Lokasi",
                key: "lokasi",
                render: (data, index, rowData) => data
            },
            
        ],
        data: [
            {
                id: 3,
                id_peg: 6,
                masuk: 1632907685,
                keluar: null,
                date: "2021-09-29",
                lat: "-7.425838",
                long: "109.1983256",
                created_at: "2021-09-29T09:28:31.000000Z",
                updated_at: "2021-09-29T09:28:31.000000Z",
                type: "WFO",
                keterangan: "Terlambat (508 menit)",
                lokasi: "Dalam Kawasan UPT",
            },
            {
                id: 2,
                id_peg: 6,
                masuk: 1629271517,
                keluar: 1629271529,
                date: "2021-08-18",
                lat: "-7.411718100000001",
                long: "109.22586919999999",
                created_at: "2021-08-18T07:27:26.000000Z",
                updated_at: "2021-08-18T07:27:26.000000Z",
                type: "WFH",
                keterangan: "Terlambat (385 menit)",
                lokasi: "Bakso Malang Sor Pelem, Jln. Pemuda, Banyumas, Central Java 53132, Indonesia",
            },
        ]
    }

    return (
        <div className="page-wrapper">
            <div className="container-xl">
                <div className="page-header d-print-none">
                    <div className="row align-items-center">
                        <div className="col">
                            <div className="page-pretitle">Halaman Pengguna</div>
                            <h2 className="page-title">Daftar Pengguna</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="page-body">
                <div className="container-xl">
                    <div className="card">
                        <div className="card-header pe-0">
                            <div class="row w-100">
                                <div class="col-md-6 col-sm-12">
                                    <h3 class="card-title">Daftar Pengguna</h3>
                                </div>
                                
                            </div>
                        </div>
                        <div className="card-body">
                            <Table data={dummyPresence} tableName="Data Presensi" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyPresence