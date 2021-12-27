

function PresenceOut() {

    return (
        <>
            <div class="page-wrapper">
                <div class="container-xl">
                    <div class="page-header d-print-none">
                        <div class="row align-items-center">
                            <div class="col">
                                <div class="page-pretitle">Halaman Presensi</div>
                                <h2 class="page-title">Pulang</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="page-body">
                    <div class="container-xl">
                        <div class="alert alert-success w-100" role="alert">
                            <div class="btn-list">
                                <form action="{{url('/')}}/presensi/pulang" method="POST">
                                    <input type="hidden" name="id_peg" value="{{$pegawai->id_peg}}" />
                                    <input type="hidden" name="pulang" value="{{$pulang}}" />
                                    <div class="form-row">
                                        <div class="col-12">
                                            <button type="submit" name="submit" class="btn btn-success">Pulang</button>
                                        </div>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </>
    )
}

export default PresenceOut