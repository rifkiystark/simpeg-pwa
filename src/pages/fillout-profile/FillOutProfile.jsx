
function FillOutProfile() {
    return (
        <body className="antialiased border-top-wide border-primary d-flex flex-column">
            <div className="page page-center">
                <div className="container py-4">


                    <div class="card card-primary card-outline">
                        <div class="card-body" style={{ paddingTop: 24 }}>
                            <div className="text-center mb-4">
                                <h1>
                                    Lengkapi Profile : Ananda Rifkiy
                                </h1>
                                <a href="#" class="btn btn-outline-danger ms-3">Logout</a>

                            </div>
                            <form action="http://localhost/simpeglocal/pegawai/edit/6" method="POST" enctype="multipart/form-data">
                                <nav>
                                    <div class="nav nav-tabs" id="nav-tab" role="tablist">
                                        <a class="nav-item nav-link active" id="nav-home-tab" data-bs-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Umum</a>
                                        <a class="nav-item nav-link" id="nav-profile-tab" data-bs-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Detail 1</a>
                                        <a class="nav-item nav-link" id="nav-contact-tab" data-bs-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Detail 2</a>
                                    </div>
                                </nav>
                                <div class="tab-content" id="nav-tabContent">
                                    <div class="tab-pane fade show active p-3" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">

                                        <div class="row g-3">
                                            <div class="form-group col-md-6">
                                                <label class="form-label required" for="inputNip">NIK</label>
                                                <input value="43433434" type="number" class="form-control" id="inputNip" name="nik" required />
                                            </div>
                                            <div class="form-group col-md-6">
                                                <label class="form-label required" for="inputNama">Nama</label>
                                                <input value="Admin YPPMNU" type="text" class="form-control" id="inputNama" name="nama" required />
                                            </div>
                                            <div class="form-group col-md-6">
                                                <label class="form-label required" for="inputNama">Alamat KTP</label>
                                                <textarea class="form-control" name="alamat_ktp" rows="4" placeholder required>er s </textarea>
                                            </div>
                                            <div class="form-group col-md-6">
                                                <label class="form-label required" for="inputNama">Alamat Domisili</label>
                                                <textarea class="form-control" name="alamat_domisili" rows="4" placeholder="" required> er</textarea>
                                            </div>
                                            <div class="form-group col-md-6">
                                                <label class="form-label required" for="inputTtl">Tempat</label>
                                                <input value="Banyumas" type="text" name="t_lahir" class="form-control" required />
                                            </div>
                                            <div class="form-group col-md-6">
                                                <label class="form-label required" for="inputTgl">Tgl Lahir</label>
                                                <input value="1993-06-09" type="date" name="tgl_lahir" class="form-control" required />
                                            </div>
                                            <div class="form-group col-md-4">
                                                <label class="form-label required" for="inputKelamin">Jenis Kelamin</label>
                                                <select name="kelamin" id="inputKelamin" class="form-control" required>
                                                    <option value="">---</option>
                                                    <option value="L" selected >Laki-laki</option>
                                                    <option value="P" >Perempuan</option>
                                                </select>
                                            </div>
                                            <div class="form-group col-md-4">
                                                <label class="form-label required" for="inputKelamin">Status Pernikahan</label>
                                                <select name="sts_marital" id="inputKelamin" class="form-control" required>
                                                    <option value="">---</option>
                                                    <option value="Menikah" selected >Menikah</option>
                                                    <option value="Belum Menikah" >Belum Menikah</option>
                                                </select>
                                            </div>
                                            <div class="form-group col-md-4">
                                                <label class="form-label required" for="inputStatus">Agama</label>
                                                <select name="agama" id="inputUser" class="form-control" required>
                                                    <option value="">---</option>
                                                    <option value="1" selected >Islam</option>
                                                    <option value="2" >Kristen</option>
                                                    <option value="3" >Katolik</option>
                                                    <option value="4" >Budha</option>
                                                </select>
                                            </div>
                                            <div class="form-group col-md-4">
                                                <label class="form-label required" for="inputTgl">No.Telp</label>
                                                <input value="0987654321232" type="number" id="inputTgl" name="no_telp" class="form-control" required />
                                            </div>

                                            <div class="form-group col-md-4">
                                                <label class="form-label" for="inputFoto">Foto</label>
                                                <input type="file" class="form-control" name="foto" id="inputFoto" />
                                            </div>

                                            <div class="form-group col-md-4">
                                                <label class="form-label" for="inputFoto">Password Baru</label>
                                                <div class="input-group input-group-flat">
                                                    <input value="" type="password" id="password" class="form-control" name="password" />
                                                    <span class="input-group-text">
                                                        <a href="#" class="link-secondary" title="Show password" data-bs-toggle="tooltip" onclick="togglePassword()">
                                                            <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                                <circle cx="12" cy="12" r="2" />
                                                                <path d="M22 12c-2.667 4.667 -6 7 -10 7s-7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7" />
                                                            </svg>
                                                        </a>
                                                    </span>
                                                </div>

                                            </div>
                                            <input type="hidden" name="user" value="9" />



                                        </div>
                                    </div>
                                    <div class="tab-pane fade p-3" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">

                                        <div class="row g-3">
                                            <div class="form-group col-md-6">
                                                <label class="form-label required" for="inputNip">NIP / NIPY</label>
                                                <input value="12345678" type="number" class="form-control" id="inputNip" name="nipy" required />
                                            </div>
                                            <div class="form-group col-md-6">
                                                <label class="form-label" for="inputNip">NIP / NIPY Lama</label>
                                                <input value="123456789" type="number" class="form-control" id="inputNip" name="nipy_lama" />
                                            </div>
                                            <div class="form-group col-md-6">
                                                <label class="form-label" for="inputNip">TMT</label>
                                                <input value="" type="date" class="form-control" id="inputNip" name="tmt" />
                                            </div>
                                            <div class="form-group col-md-6">
                                                <label class="form-label required" for="inputFoto">UPT</label>
                                                <select name="id_upt" id="inputUser" class="form-control" required>
                                                    <option value="">---</option>
                                                    <option value="2" selected >SMK Ma&#039; arif NU 2 Ajibarang</option>
                                                    <option value="3" >STIKES Ibnu Sina</option>
                                                    <option value="4" >SMK Ma&#039; arif NU 1 Ajibarang</option>
                                                </select>
                                            </div>
                                            <div class="form-group col-md-6">
                                                <label class="form-label required" for="inputStatus">Status Kepegawaian</label>
                                                <select name="sts_pegawai" id="inputStatus" class="form-control" required>
                                                    <option value="">---</option>
                                                    <option value="Tetap" selected >Tetap</option>
                                                    <option value="Tidak Tetap" >Tidak Tetap</option>
                                                </select>
                                            </div>

                                            <div class="form-group col-md-6">
                                                <label class="form-label required" for="inputStatus">Status</label>
                                                <select name="sts_keaktifan" id="inputStatus" class="form-control" required>
                                                    <option value="">---</option>
                                                    <option value="Aktif" selected >Aktif</option>
                                                    <option value="Tidak Aktif" >Tidak Aktif</option>
                                                    <option value="Cuti" >Cuti</option>
                                                    <option value="Pensiun" >Pernsiun</option>
                                                </select>
                                            </div>

                                        </div>
                                    </div>
                                    <div class="tab-pane fade p-3" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                                        <div class="row g-3">
                                            <div class="form-group col-md-4">
                                                <label class="form-label required" for="inputStatus">Pendidikan Terakhir</label>
                                                <select name="pendidikan" id="inputUser" class="form-control" required>
                                                    <option value="">---</option>
                                                    <option value="1" >SD</option>
                                                    <option value="2" >SMP</option>
                                                    <option value="3" >SMA</option>
                                                    <option value="4" >D3</option>
                                                    <option value="5" >S1</option>
                                                    <option value="6" selected >S2</option>
                                                </select>
                                            </div>
                                            <div class="form-group col-md-4">
                                                <label class="form-label required" for="inputNip">Institusi Pendidikan</label>
                                                <input value="ITTP" type="text" class="form-control" id="inputNip" name="namasekolah" required />
                                            </div>
                                            <div class="form-group col-md-4">
                                                <label class="form-label required" for="inputKarpeg">Tahun Lulus</label>
                                                <input value="2006" type="number" name="sttb" id="inputKarpeg" class="form-control" required />
                                            </div>
                                            <div class="form-group col-md-6">
                                                <label class="form-label" for="inputKarsu">Gelar Depan</label>
                                                <input value="Prof" type="text" name="gelard" id="inputKarsu" class="form-control" />
                                            </div>
                                            <div class="form-group col-md-6">
                                                <label class="form-label" for="inputAskes">Gelar Belakang</label>
                                                <input value="S.Ag" type="text" name="gelarb" id="inputAskes" class="form-control" />
                                            </div>

                                            <div class="form-group col-md-8">
                                                <label class="form-label" for="inputKarpeg">Hobi</label>
                                                <input value="Berkuda" type="text" name="hobi" id="inputKarpeg" class="form-control" required />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" class="btn btn-primary ms-3">Perbarui</button>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </body>
    );
}

export default FillOutProfile