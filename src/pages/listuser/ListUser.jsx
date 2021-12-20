import Table from "../../components/table/Table"
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from "../../reduxslice/userSlice";




function ListUser() {
    const dispatch = useDispatch()
    const dummyUser = {
        column: [
            {
                name: "No",
                key: "",
                render: (data, index, rowData) => (index + 1)
            },
            {
                name: "Nama",
                key: "nama",
                render: (data, index, rowData) => data
            },
            {
                name: "Email",
                key: "email",
                render: (data, index, rowData) => data
            },
            {
                name: "Level",
                key: "level",
                render: (data, index, rowData) => data
            },
            {
                name: "Action",
                key: "",
                render: (data, index, rowData) => (<>
                    <a className="btn btn-sm mt-1" href="{{ url('/') }}/pegawai/profile/{{$p->id_peg}}">
                        Lihat
                    </a>
                    <button type="button" className="btn btn-danger btn-sm mt-1" data-bs-toggle="modal" data-bs-target="#ModalDelete" onClick={() => {
                        dispatch(setUser(rowData))
                    }}>
                        Hapus
                    </button></>)
            }
        ],
        data: [
            {
                nama: "Ananda Rifkiy Hasan",
                email: "ananda.rifkiy32@gmail.com",
                level: "admin",
            },
            {
                nama: "Hasan",
                email: "hasan@gmail.com",
                level: "keuangan",
            },
            {
                nama: "Hasan",
                email: "hasan@gmail.com",
                level: "keuangan",
            },
            {
                nama: "Hasan",
                email: "hasan@gmail.com",
                level: "keuangan",
            },
            {
                nama: "Hasan",
                email: "hasan@gmail.com",
                level: "keuangan",
            },
            {
                nama: "Hasan",
                email: "hasan@gmail.com",
                level: "keuangan",
            },
            {
                nama: "Hasan",
                email: "hasan@gmail.com",
                level: "keuangan",
            },
            {
                nama: "Hasan",
                email: "hasan@gmail.com",
                level: "keuangan",
            },
            {
                nama: "Hasan",
                email: "hasan@gmail.com",
                level: "keuangan",
            },
            {
                nama: "Hasan",
                email: "hasan@gmail.com",
                level: "keuangan",
            },
            {
                nama: "Hasan",
                email: "hasan@gmail.com",
                level: "keuangan",
            },
            {
                nama: "Hasan",
                email: "hasan@gmail.com",
                level: "keuangan",
            },
            {
                nama: "Hasan",
                email: "hasan@gmail.com",
                level: "keuangan",
            },
            {
                nama: "Hasan",
                email: "hasan@gmail.com",
                level: "keuangan",
            },
            {
                nama: "Hasan",
                email: "hasan@gmail.com",
                level: "keuangan",
            }
        ]
    }
    const user = useSelector((state) => state.user)
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
                        <div className="card-header">
                            <h3 className="card-title">Daftar Pengguna</h3>
                        </div>
                        <div className="card-body">
                            <Table data={dummyUser} />
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
                            <div className="text-muted">Anda akan menghapus data pegawai <b>{user.nama}</b></div>
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

export default ListUser