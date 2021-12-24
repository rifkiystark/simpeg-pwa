import { useEffect, useState } from 'react';

function SettingPresence() {
  let [presences, setPresences] = useState([])

  let dummyPresence = [
    {
      id: 2,
      upt: "SMK Ma'arif NU 2 Ajibarang",
      created_at: "2021-04-17T08:52:05.000000Z",
      updated_at: "2021-04-17T08:52:05.000000Z",
      settings: {
        id: 5,
        id_upt: 2,
        waktu_masuk: "08:00",
        waktu_pulang: "16:00",
        latitude: "-7.425822382722496",
        longitude: "109.1984223760588",
        radius: 2334,
        header: "header-c81e728d9d4c2f636f067f89cc14862c.png",
        updated_at: "2021-12-08T09:13:37.000000Z",
        created_at: "2021-04-27T15:35:15.000000Z",
      },
    },
    {
      id: 3,
      upt: "STIKES Ibnu Sina",
      created_at: "2021-04-27T12:59:19.000000Z",
      updated_at: "2021-04-27T12:59:19.000000Z",
      settings: {
        id: 6,
        id_upt: 3,
        waktu_masuk: "08:00",
        waktu_pulang: "16:00",
        latitude: "-7.383192316901588",
        longitude: "109.92978804694415",
        radius: 402,
        header: "",
        updated_at: "2021-11-27T12:23:53.000000Z",
        created_at: "2021-04-27T15:44:44.000000Z",
      },
    },
    {
      id: 4,
      upt: "SMK Ma'arif NU 1 Ajibarang",
      created_at: "2021-06-12T02:42:32.000000Z",
      updated_at: "2021-06-12T02:42:32.000000Z",
      settings: {
        id: 7,
        id_upt: 4,
        waktu_masuk: "07:00",
        waktu_pulang: "17:00",
        latitude: "-7.401604645551577",
        longitude: "109.07697744329869",
        radius: 230,
        header: "",
        updated_at: "2021-11-27T12:24:12.000000Z",
        created_at: "2021-06-12T02:59:32.000000Z",
      },
    },
  ]

  // this is similar to componentDidMount
  useEffect(() => {
    setPresences(dummyPresence)
  }, [])

  const onChange = (e, index) => {
    let tempPresence = [...presences]
    tempPresence[index].settings[e.target.name] = e.target.value
    //setPresences(oldPresences => { return [oldPresences, ...tempPresence] })
    setPresences(tempPresence)
    console.log(presences)
  }

  return <>
    <div class="page-wrapper">
      <div class="container-xl">
        <div class="page-header d-print-none">
          <div class="row align-items-center">
            <div class="col">
              <div class="page-pretitle">Halaman Presensi</div>
              <h2 class="page-title">Pengaturan Presensi</h2>
            </div>
          </div>
        </div>
      </div>

      <section class="page-body">
        <div class="container-xl">
          <div class="card card-primary card-outline">
            <div class="card-body">
              <ul class="nav nav-pills mb-3">
                {presences.map((presence, index) =>
                  <li class="nav-item"><a href={`#navpills-${presence.id}`} class={`nav-link ${index === 0 ? 'active show' : ''}`} data-bs-toggle="tab" aria-expanded="false">{presence.upt}</a></li>
                )}
              </ul>
              <div class="tab-content br-n pn">
                {presences.map((presence, index) =>
                  <div id={`navpills-${presence.id}`} class={`tab-pane ${index === 0 ? 'active show' : ''}`}>
                    <form action="{{url('/')}}/presensi/setting/simpan" method="POST" enctype="multipart/form-data">
                      <input type="hidden" name="id_upt" value="{{$u->id}}" />
                      <h3 class="card-title">Pengaturan Waktu</h3>
                      <div class="row">
                        <div class="col-md-6">
                          <label class="form-label">Waktu Masuk</label>
                          <div class="input-group clockpicker">
                            <input type="time" class="form-control" name="waktu_masuk" onChange={(e) => onChange(e, index)} value={(presence.settings != null) ? presence.settings.waktu_masuk : ''} />
                          </div>
                        </div>
                        <div class="col-md-6">
                          <label class="form-label">Waktu Pulang</label>
                          <div class="input-group">
                            <input type="time" class="form-control" name="waktu_pulang" value={(presence.settings != null) ? presence.settings.waktu_pulang : ''} />
                          </div>
                        </div>
                      </div>
                      <h3 class="card-title mt-3">Pengaturan Lokasi</h3>
                      <div class="row">
                        <div class="col-md-6">
                          <label class="form-label">Latitude</label>
                          <div class="input-group clockpicker">
                            <input class="form-control" name="latitude" onChange={(e) => onChange(e, index)} value={(presence.settings != null) ? presence.settings.latitude : ''} /> <span class="input-group-append"><span class="input-group-text"><svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                              <circle cx="12" cy="11" r="3" />
                              <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" />
                            </svg></span></span>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <label class="form-label">Longitude</label>
                          <div class="input-group">
                            <input class="form-control" name="longitude" onChange={(e) => onChange(e, index)} value={(presence.settings != null) ? presence.settings.longitude : ''} /> <span class="input-group-append"><span class="input-group-text"><svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                              <circle cx="12" cy="11" r="3" />
                              <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" />
                            </svg></span></span>
                          </div>
                        </div>
                        <div class="col-md-6 mt-3">
                          <label class="form-label">Radius</label>
                          <div class="input-group">
                            <input class="form-control" name="radius" onChange={(e) => onChange(e, index)} value={(presence.settings != null) ? presence.settings.radius : ''} required /> <span class="input-group-append"><span class="input-group-text">meter</span></span>
                          </div>
                        </div>
                      </div>
                      <h3 class="card-title mt-3">Pengaturan Header Ekspor</h3>
                      <div class="row">
                        <div class="col-md-12">
                          <label class="form-label">Header</label>
                          <div class="input-group clockpicker">
                            <input type="file" name="foto" class="form-control" />
                          </div>
                        </div>

                        <div class="col-md-12">
                          <img class="img img-fluid mt-3" src="@if($u->settings != null){{ asset('/foto').'/'.$u->settings->header}} @endif" alt="" />
                        </div>

                      </div>

                      <div class="row">
                        <div class="col">

                          <button type="submit" name="submit" class="mt-3 btn btn-primary">Simpan</button>
                        </div>
                      </div>
                    </form>
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>

        <div class="modal modal-blur fade" id="exampleModalCenter">
          <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Peta</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"><span>&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <input id="pac-input" class="controls" type="text" placeholder="Cari tempat..." />
                <div id="map"></div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>

      </section>
    </div>
  </>
}

export default SettingPresence