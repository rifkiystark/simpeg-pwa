import Table from "../../components/table/Table";
import { useDispatch, useSelector } from 'react-redux';
import { setSalary } from "../../reduxslice/masterDataSlice";


function MasterSalary() {
    let dispatch = useDispatch();
    let salary = useSelector((state) => state.masterData.salary)
    const dummySalary = {
        column: [
            {
                name: "Kode Gapok",
                key: "kodeGapok",
                render: (data, index, rowData) => data
            },
            {
                name: "Masa Kerja",
                key: "masaKerja",
                render: (data, index, rowData) => data
            },
            {
                name: "PP",
                key: "pp",
                render: (data, index, rowData) => data
            },
            {
                name: "Kode Golongan",
                key: "kodeGolongan",
                render: (data, index, rowData) => data
            },
            {
                name: "Gapok",
                key: "gapok",
                render: (data, index, rowData) => data
            },

            {
                name: "Action",
                key: "",
                render: (data, index, rowData) => (<>
                    <button className="btn btn-primary btn-sm mt-1 me-1" data-bs-toggle="modal" data-bs-target="#ModalEdit" onClick={() => {
                        dispatch(setSalary(rowData))
                    }}>
                        Edit
                    </button>
                    <button type="button" className="btn btn-danger btn-sm mt-1" data-bs-toggle="modal" data-bs-target="#ModalDelete" onClick={() => {
                        dispatch(setSalary(rowData))
                    }}>
                        Hapus
                    </button></>)
            }
        ],
        data: [
            {
                kodeGapok: "1",
                masaKerja: "1",
                pp: "1",
                kodeGolongan: "1",
                gapok: "1",
            }

        ]
    }
    return (
        <div className="page-wrapper">
            <div className="container-xl">
                <div className="page-header d-print-none">
                    <div className="row align-items-center">
                        <div className="col">
                            <div className="page-pretitle">Halaman Master Data</div>
                            <h2 className="page-title">Master Data Gapok</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="page-body">
                <div className="container-xl">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Data Gapok</h3>
                        </div>
                        <div className="card-body">
                            <Table data={dummySalary} tableName="Master Data Gapok" />
                        </div>
                    </div>
                </div>
            </div >
            <div className="modal modal-blur fade" id="ModalDelete" tabIndex="-1" role="dialog" aria-modal="true" style={{ paddingRight: 6 }}>
                <div className="modal-dialog modal-sm modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        <div className="modal-status bg-danger"></div>
                        <div className="modal-body text-center py-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon mb-2 text-danger icon-lg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M12 9v2m0 4v.01"></path>
                                <path d="M5 19h14a2 2 0 0 0 1.84 -2.75l-7.1 -12.25a2 2 0 0 0 -3.5 0l-7.1 12.25a2 2 0 0 0 1.75 2.75"></path>
                            </svg>
                            <h3>Apakah anda yakin?</h3>
                            <div className="text-muted">Anda akan menghapus data gapok <b>{salary.name}</b></div>
                        </div>
                        <div className="modal-footer">
                            <div className="w-100">
                                <div className="row">
                                    <div className="col"><button className="btn btn-white w-100" data-bs-dismiss="modal">
                                        Batal
                                    </button></div>
                                    <div className="col"><a href="{{ url('/') }}/pegawai/hapus/{{$p->id_peg}}" className="btn btn-danger w-100" data-bs-dismiss="modal">
                                        Hapus
                                    </a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal modal-blur fade" id="ModalEdit" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Edit Gapok</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form action="http://localhost/simpeglocal/pegawai/tmgapok/edit/proses" method="post">
                                <div class="row g-3">
                                    <input type="hidden" name="kode_gapok" value={salary.kodeGapok} class="form-control" />
                                    <div class="col-md-6">
                                        <label class="form-label">Masa Kerja</label>
                                        <input type="number" value="1" name={salary.masaKerja} class="form-control" />
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label">PP</label>
                                        <input type="text" name="PP" value={salary.pp} class="form-control" />
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label">Kode Golongan</label>
                                        <input type="text" name="kode_gol" value={salary.kodeGolongan} class="form-control" />
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label">Gapok</label>
                                        <input type="number" name="gapok" value={salary.gapok} class="form-control" />
                                    </div>


                                    <div class="col-md-12">
                                        <input type="submit" value="Perbarui" class="btn btn-success" />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}


export default MasterSalary