import Table from "../../components/table/Table";
import { useDispatch, useSelector } from 'react-redux';
import { setTraining } from "../../reduxslice/masterDataSlice";


function MasterTraining() {
    let dispatch = useDispatch();
    let training = useSelector((state) => state.masterData.training)
    const dummyTraining = {
        column: [
            {
                name: "Kode Diklat",
                key: "kodeDiklat",
                render: (data, index, rowData) => data
            },
            {
                name: "Jenis Diklat",
                key: "jenisDiklat",
                render: (data, index, rowData) => data
            },

            {
                name: "Action",
                key: "",
                render: (data, index, rowData) => (<>
                    <button className="btn btn-primary btn-sm mt-1 me-1" data-bs-toggle="modal" data-bs-target="#ModalEdit" onClick={() => {
                        dispatch(setTraining({ id: rowData.kodeDiklat, name: rowData.jenisDiklat }))
                    }}>
                        Edit
                    </button>
                    <button type="button" className="btn btn-danger btn-sm mt-1" data-bs-toggle="modal" data-bs-target="#ModalDelete" onClick={() => {
                        dispatch(setTraining({ id: rowData.kodeDiklat, name: rowData.jenisDiklat }))
                    }}>
                        Hapus
                    </button></>)
            }
        ],
        data: [
            {
                kodeDiklat: "1",
                jenisDiklat: "Tingkat Kabupaten",

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
                            <h2 className="page-title">Master Data Diklat</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="page-body">
                <div className="container-xl">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Data Diklat</h3>
                        </div>
                        <div className="card-body">



                            <Table data={dummyTraining} tableName="Master Data Diklat" />


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
                            <div className="text-muted">Anda akan menghapus data diklat <b>{training.name}</b></div>
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
            <div className="modal modal-blur fade" id="ModalEdit" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Diklat</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form action="http://localhost/simpeglocal/pegawai/tmdiklat/edit/proses" method="post">
                                <div className="row g-3">
                                    <div className="col-md-12">
                                        <label className="form-label">Jenis Diklat</label>
                                        <input type="hidden" name="kode_diklat" className="form-control" value={training.id} />
                                        <input type="text" name="jenis_diklat" className="form-control" value={training.name} />
                                    </div>


                                    <div className="col-md-12">
                                        <input type="submit" value="Perbarui" className="btn btn-success" />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default MasterTraining