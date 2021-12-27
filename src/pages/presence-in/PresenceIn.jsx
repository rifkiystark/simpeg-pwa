function PresenceIn() {
    return (
        <>
            <div class="page-wrapper">
                <div class="container-xl">
                    <div class="page-header d-print-none">
                        <div class="row align-items-center">
                            <div class="col">
                                <div class="page-pretitle">Halaman Presensi</div>
                                <h2 class="page-title">Masuk</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="page-body">
                    <div class="container-xl">
                        <div class="alert alert-warning w-100" role="alert" id="outLocation" style={{ display: "block" }}>
                            <h4 class=" alert-title">Perhatian, anda berada di luar lokasi!</h4>
                            <p class="text-muted">
                                Anda sekarang berada di luar lokasi, jika posisi anda berada di dalam lokasi, tekan refresh lokasi untuk update lokasi. Jika anda menekan Masuk, maka anda akan berstatus WFH.
                            </p>
                            <div class="btn-list">
                                <button onclick="getLocation()" class="btn btn-warning">Refresh Lokasi</button>
                                <form action="{{url('/')}}/presensi/masuk" method="POST">
                                    <input type="hidden" name="id_peg" value="{{$pegawai->id_peg}}" />
                                    <input type="hidden" name="masuk" value="{{$masuk}}" />
                                    <input type="hidden" name="latitude" id="latitude" />
                                    <input type="hidden" name="longitude" id="longitude" />
                                    <input type="hidden" name="location" id="location" value="Dalam Kawasan UPT" />
                                    <button type="submit" class="btn btn-success">Masuk</button>
                                </form>
                            </div>
                        </div>

                        <div class="alert alert-success w-100" role="alert" id="inLocation" style={{ display: "block" }}>
                            <h4 class="alert-title">Anda berada di dalam lokasi!</h4>
                            <p class="text-muted">
                                Anda bisa melakukan presensi
                            </p>
                            <div class="btn-list">
                                <form action="{{url('/')}}/presensi/masuk" method="POST">
                                    <input type="hidden" name="type" id="type2" />
                                    <input type="hidden" name="id_peg" value="{{$pegawai->id_peg}}" />
                                    <input type="hidden" name="masuk" value="{{$masuk}}" />
                                    <input type="hidden" name="latitude" id="latitude2" />
                                    <input type="hidden" name="longitude" id="longitude2" />
                                    <input type="hidden" name="location" id="location" value="Dalam Kawasan UPT" />
                                    <button type="submit" class="btn btn-success">Masuk</button>
                                </form>
                            </div>
                        </div>

                        <div class="alert alert-danger w-100" role="alert" id="noGPS" style={{ display: "block" }}>
                            <h4 class=" alert-title">Perhatian, aktifkan GPS!</h4>
                            <p class="text-muted">
                                Tidak dapat memperoleh lokasi anda, mohon aktifkan GPS!
                            </p>
                        </div>
                    </div>
                </div>


            </div>

        </>
    )
}

export default PresenceIn