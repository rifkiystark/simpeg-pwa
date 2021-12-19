import Table from "../../components/table/Table";



function ListEmployee() {
    let isAdmin = true;
    return (
        <div className="page-wrapper">
            <div className="container-xl">
                <div className="page-header d-print-none">
                    <div className="row align-items-center">
                        <div className="col">
                            <div className="page-pretitle">Halaman Pegawai</div>
                            <h2 className="page-title">Daftar Pegawai</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="page-body">
                <div className="container-xl">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Daftar Pegawai</h3>
                        </div>
                        <div className="card-body">

                            {isAdmin ? <div className="row">
                                <div className="col-lg-4 col-md-6 col-sm-12">
                                    <form action="GET">
                                        <div className="mb-3">
                                            <label className="form-label">UPT</label>
                                            <div className="input-group">
                                                <select name="id_upt" className="form-select">
                                                    <option value="all">Semua</option>
                                                </select>
                                                <button type="submit" className="btn">Filter</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div> : ""}

                            <Table />

                            
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
                            <div className="text-muted">Anda akan menghapus data pegawai <b>Ananda Rifkiy</b></div>
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
        </div >

    )
}


export default ListEmployee