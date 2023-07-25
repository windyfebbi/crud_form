<script>
  // Prevent forms from submitting.
  function preventFormSubmit() {
    var forms = document.querySelectorAll('form');
    for (var i = 0; i < forms.length; i++) {
      forms[i].addEventListener('submit', function(event) {
      event.preventDefault();
      });
    }
  }
  window.addEventListener("load", functionInit, true); 
  
  //INITIALIZE FUNCTIONS ONLOAD
  function functionInit(){  
    preventFormSubmit();
    getLastTenRows();
  };      
  
  //HANDLE FORM SUBMISSION
  function handleFormSubmit(formObject) {
    google.script.run.withSuccessHandler(createTable).processForm(formObject);
    document.getElementById("myForm").reset();
  }
  
  //GET LAST 10 ROWS
  function getLastTenRows (){
   google.script.run.withSuccessHandler(createTable).getLastTenRows();
  }
  
  
  //GET ALL DATA
  function getAllData(){
    //document.getElementById('dataTable').innerHTML = "";
    google.script.run.withSuccessHandler(createTable).getAllData();
  }
  
  
  //CREATE THE DATA TABLE
  function createTable(dataArray) {
    if(dataArray){
      var result = "<table class='table table-sm' style='font-size:0.8em'>"+
                   "<thead style='white-space: nowrap'>"+
                     "<tr>"+                               //Change table headings to match with the Google Sheet
                      "<th scope='col'>Delete</th>"+
                      "<th scope='col'>Edit</th>"+
                      "<th scope='col'>Nomor Agenda</th>"+
                      "<th scope='col'>Tanggal Agenda</th>"+
                      "<th scope='col'>Tanggal Masuk</th>"+
                      "<th scope='col'>Tanggal Surat CADIN</th>"+
                      "<th scope='col'>Nomor Surat CADIN</th>"+
                      "<th scope='col'>Tanggal Surat Lolos Butuh Asal</th>"+
                      "<th scope='col'>Nomor Surat Lolos Butuh Asal</th>"+
                      "<th scope='col'>Tanggal Surat Lolos Butuh Tujuan</th>"+
                      "<th scope='col'>Nomor Surat Lolos Butuh Tujuan</th>"+
                      "<th scope='col'>NIP</th>"+
                      "<th scope='col'>Nama Pengusul</th>"+
                      "<th scope='col'>Jenis Kelamin</th>"+
                      "<th scope='col'>Tanggal Lahir</th>"+
                      "<th scope='col'>Pangkat</th>"+
                      "<th scope='col'>Golongan</th>"+
                      "<th scope='col'>Jabatan</th>"+
                      "<th scope='col'>CDPW</th>"+
                      "<th scope='col'>Jenjang Sekolah Asal</th>"+
                      "<th scope='col'>Status Sekolah Asal</th>"+
                      "<th scope='col'>NPSN Asal</th>"+
                      "<th scope='col'>Nama Sekolah Asal</th>"+
                      "<th scope='col'>Kota Sekolah Asal</th>"+
                      "<th scope='col'>Mapel Diampu</th>"+
                      "<th scope='col'>Jenjang Sekolah Tujuan</th>"+
                      "<th scope='col'>Status Sekolah Tujuan</th>"+
                      "<th scope='col'>NPSN Tujuan</th>"+
                      "<th scope='col'>Nama Sekolah Tujuan</th>"+
                      "<th scope='col'>Kota Sekolah Tujuan</th>"+
                      "<th scope='col'>Mapel Tujuan</th>"+
                      "<th scope='col'>Tanggal Verifikasi</th>"+
                      "<th scope='col'>Petugas Verifikasi</th>"+
                      "<th scope='col'>Kelengkapan Berkas</th>"+
                      "<th scope='col'>Keterangan</th>"+
                      "<th scope='col'>Nota Pertimbangan</th>"+
                    "</tr>"+
                  "</thead>";
      for(var i=0; i<dataArray.length; i++) {
          result += "<tr>";
          result += "<td><button type='button' class='btn btn-danger btn-xs deleteBtn' onclick='deleteData(this);'>Delete</button></td>";
          result += "<td><button type='button' class='btn btn-warning btn-xs editBtn' onclick='editData(this);'>Edit</button></td>";
          for(var j=0; j<dataArray[i].length; j++){
              result += "<td>"+dataArray[i][j]+"</td>";
          }
          result += "</tr>";
      }
      result += "</table>";
      var div = document.getElementById('dataTable');
      div.innerHTML = result;
      document.getElementById("message").innerHTML = "";
    }else{
      var div = document.getElementById('dataTable');
      div.innerHTML = "Data not found!";
    }
  }

  //DELETE DATA
  function deleteData(el) {
    var result = confirm("Want to delete?");
    if (result) {
      var recordId = el.parentNode.parentNode.cells[2].innerHTML;
      google.script.run.withSuccessHandler(createTable).deleteData(recordId);
    }
  }
  
  
  //EDIT DATA
  function editData(el){
    var recordId = el.parentNode.parentNode.cells[2].innerHTML; //https://stackoverflow.com/a/32377357/2391195
    google.script.run.withSuccessHandler(populateForm).getRecordById(recordId);
  }

  //POPULATE FORM
  function populateForm(records){
    document.getElementById('NoAgenda').value = records[0][0];
    document.getElementById('tglAgenda').value = records[0][1];
    document.getElementById('tglMasuk').value = records[0][2];
    document.getElementById('tsCadin').value = records[0][3];
    document.getElementById('nsCadin').value = records[0][4];
    document.getElementById('tslbAsal').value = records[0][5];
    document.getElementById('nslbAsal').value = records[0][6];
    document.getElementById('tslbTujuan').value = records[0][7];
    document.getElementById('nslbTujuan').value = records[0][8];
    document.getElementById('nip').value = records[0][9];
    document.getElementById('nama').value = records[0][10];
    document.getElementById('jenisKelamin').value = records[0][11];
    document.getElementById('tglLahir').value = records[0][12];
    document.getElementById('pangkat').value = records[0][13];
    document.getElementById('golongan').value = records[0][14];
    document.getElementById("jabatan").value = records[0][15];
    document.getElementById('cdpw').value = records[0][16];
    document.getElementById("jenjangAsal").value = records[0][17];
    document.getElementById("statusAsal").value = records[0][18];
    document.getElementById('npsnAsal').value = records[0][19];
    document.getElementById('sekolahAsal').value = records[0][20];
    document.getElementById("kotaAsal").value = records[0][21];
    document.getElementById('mapelDiampu').value = records[0][22];
    document.getElementById("jenjangTujuan").value = records[0][23];
    document.getElementById("statusTujuan").value = records[0][24];
    document.getElementById('npsnTujuan').value = records[0][25];
    document.getElementById('sekolahTujuan').value = records[0][26];
    document.getElementById("kotaTujuan").value = records[0][27];
    document.getElementById('mapelTujuan').value = records[0][28];
    document.getElementById('tglVerifikasi').value = records[0][29];
    document.getElementById("petugasVerifikasi").value = records[0][30];
    document.getElementById("kelengkapan").value = records[0][31];
    document.getElementById('keterangan').value = records[0][32];
    document.getElementById("notaPertimbangan").value = records[0][33];
    document.getElementById("message").innerHTML = "<div class='alert alert-warning' role='alert'>Update Record [ID: "+records[0][0]+"]</div>";
  }

  //RETRIVE DATA FROM GOOGLE SHEET FOR JABATAN DROPDOWN
  function createJabatanDropdown() {
      //SUBMIT YOUR DATA RANGE FOR DROPDOWN AS THE PARAMETER
      google.script.run.withSuccessHandler(jabatanDropDown).getDropdownList("Jabatan!A1:A7");
  }
  
  //POPULATE JABATAN DROPDOWNS
  function jabatanDropDown(values) { //Ref: https://stackoverflow.com/a/53771955/2391195
    var list = document.getElementById('jabatan');   
    for (var i = 0; i < values.length; i++) {
      var option = document.createElement("option");
      option.value = values[i];
      option.text = values[i];
      list.appendChild(option);
    }
  }

  //RETRIVE DATA FROM GOOGLE SHEET FOR CDPW DROPDOWN
  function createCDPWDropdown() {
      //SUBMIT YOUR DATA RANGE FOR DROPDOWN AS THE PARAMETER
      google.script.run.withSuccessHandler(cdpwDropDown).getDropdownList("CDPW!A1:A13");
  }
  
  //POPULATE CDPW DROPDOWNS
  function cdpwDropDown(values) { //Ref: https://stackoverflow.com/a/53771955/2391195
    var list = document.getElementById('cdpw');   
    for (var i = 0; i < values.length; i++) {
      var option = document.createElement("option");
      option.value = values[i];
      option.text = values[i];
      list.appendChild(option);
    }
  }

  //RETRIVE DATA FROM GOOGLE SHEET FOR JENJANG ASAL DROPDOWN
  function createJenjangAsalDropdown() {
      //SUBMIT YOUR DATA RANGE FOR DROPDOWN AS THE PARAMETER
      google.script.run.withSuccessHandler(jenjangAsalDropDown).getDropdownList("Jenjang!A1:A4");
  }
  
  //POPULATE JENJANG ASAL DROPDOWNS
  function jenjangAsalDropDown(values) { //Ref: https://stackoverflow.com/a/53771955/2391195
    var list = document.getElementById('jenjangAsal');   
    for (var i = 0; i < values.length; i++) {
      var option = document.createElement("option");
      option.value = values[i];
      option.text = values[i];
      list.appendChild(option);
    }
  }
  
  //RETRIVE DATA FROM GOOGLE SHEET FOR STATUS ASAL DROPDOWN
  function createStatusAsalDropdown() {
      //SUBMIT YOUR DATA RANGE FOR DROPDOWN AS THE PARAMETER
      google.script.run.withSuccessHandler(statusAsalDropDown).getDropdownList("Status!A1:A2");
  }
  
  //POPULATE STATUS ASAL DROPDOWNS
  function statusAsalDropDown(values) { //Ref: https://stackoverflow.com/a/53771955/2391195
    var list = document.getElementById('statusAsal');   
    for (var i = 0; i < values.length; i++) {
      var option = document.createElement("option");
      option.value = values[i];
      option.text = values[i];
      list.appendChild(option);
    }
  }  

  //RETRIVE DATA FROM GOOGLE SHEET FOR KOTA ASAL DROPDOWN
  function createKotaAsalDropdown() {
      //SUBMIT YOUR DATA RANGE FOR DROPDOWN AS THE PARAMETER
      google.script.run.withSuccessHandler(kotaAsalDropDown).getDropdownList("Kota/Kab!A1:A28");
  }
  
  //POPULATE KOTA ASAL DROPDOWNS
  function kotaAsalDropDown(values) { //Ref: https://stackoverflow.com/a/53771955/2391195
    var list = document.getElementById('kotaAsal');   
    for (var i = 0; i < values.length; i++) {
      var option = document.createElement("option");
      option.value = values[i];
      option.text = values[i];
      list.appendChild(option);
    }
  }

  //RETRIVE DATA FROM GOOGLE SHEET FOR JENJANG TUJUAN DROPDOWN
  function createJenjangTujuanDropdown() {
      //SUBMIT YOUR DATA RANGE FOR DROPDOWN AS THE PARAMETER
      google.script.run.withSuccessHandler(jenjangTujuanDropDown).getDropdownList("Jenjang!A1:A4");
  }
  
  //POPULATE JENJANG TUJUAN DROPDOWNS
  function jenjangTujuanDropDown(values) { //Ref: https://stackoverflow.com/a/53771955/2391195
    var list = document.getElementById('jenjangTujuan');   
    for (var i = 0; i < values.length; i++) {
      var option = document.createElement("option");
      option.value = values[i];
      option.text = values[i];
      list.appendChild(option);
    }
  }

  //RETRIVE DATA FROM GOOGLE SHEET FOR STATUS TUJUAN DROPDOWN
  function createStatusTujuanDropdown() {
      //SUBMIT YOUR DATA RANGE FOR DROPDOWN AS THE PARAMETER
      google.script.run.withSuccessHandler(statusTujuanDropDown).getDropdownList("Status!A1:A2");
  }
  
  //POPULATE STATUS TUJUAN DROPDOWNS
  function statusTujuanDropDown(values) { //Ref: https://stackoverflow.com/a/53771955/2391195
    var list = document.getElementById('statusTujuan');   
    for (var i = 0; i < values.length; i++) {
      var option = document.createElement("option");
      option.value = values[i];
      option.text = values[i];
      list.appendChild(option);
    }
  }

  //RETRIVE DATA FROM GOOGLE SHEET FOR KOTA TUJUAN DROPDOWN
  function createKotaTujuanDropdown() {
      //SUBMIT YOUR DATA RANGE FOR DROPDOWN AS THE PARAMETER
      google.script.run.withSuccessHandler(kotaTujuanDropDown).getDropdownList("Kota/Kab!A1:A28");
  }
  
  //POPULATE KOTA TUJUAN DROPDOWNS
  function kotaTujuanDropDown(values) { //Ref: https://stackoverflow.com/a/53771955/2391195
    var list = document.getElementById('kotaTujuan');   
    for (var i = 0; i < values.length; i++) {
      var option = document.createElement("option");
      option.value = values[i];
      option.text = values[i];
      list.appendChild(option);
    }
  }

  //RETRIVE DATA FROM GOOGLE SHEET FOR PETUGAS VERIFIKASI DROPDOWN
  function createPetugasVerifikasiDropdown() {
      //SUBMIT YOUR DATA RANGE FOR DROPDOWN AS THE PARAMETER
      google.script.run.withSuccessHandler(petugasVerifikasiDropDown).getDropdownList("Petugas!A1:A4");
  }
  
  //POPULATE PETUGAS VERIFIKASI DROPDOWNS
  function petugasVerifikasiDropDown(values) { //Ref: https://stackoverflow.com/a/53771955/2391195
    var list = document.getElementById('petugasVerifikasi');   
    for (var i = 0; i < values.length; i++) {
      var option = document.createElement("option");
      option.value = values[i];
      option.text = values[i];
      list.appendChild(option);
    }
  }

  //RETRIVE DATA FROM GOOGLE SHEET FOR KELENGKAPAN BERKAS DROPDOWN
  function createKelengkapanBerkasDropdown() {
      //SUBMIT YOUR DATA RANGE FOR DROPDOWN AS THE PARAMETER
      google.script.run.withSuccessHandler(kelengkapanBerkasDropDown).getDropdownList("Kelengkapan!A1:A2");
  }
  
  //POPULATE KELENGKAPAN BERKAS DROPDOWNS
  function kelengkapanBerkasDropDown(values) { //Ref: https://stackoverflow.com/a/53771955/2391195
    var list = document.getElementById('kelengkapan');   
    for (var i = 0; i < values.length; i++) {
      var option = document.createElement("option");
      option.value = values[i];
      option.text = values[i];
      list.appendChild(option);
    }
  }

  //RETRIVE DATA FROM GOOGLE SHEET FOR NOTA PERTIMBANGAN DROPDOWN
  function createNotaPertimbanganDropdown() {
      //SUBMIT YOUR DATA RANGE FOR DROPDOWN AS THE PARAMETER
      google.script.run.withSuccessHandler(notaPertimbanganDropDown).getDropdownList("Nota Pertimbangan!A1:A4");
  }
  
  //POPULATE NOTA PERTIMBANGAN DROPDOWNS
  function notaPertimbanganDropDown(values) { //Ref: https://stackoverflow.com/a/53771955/2391195
    var list = document.getElementById('notaPertimbangan');   
    for (var i = 0; i < values.length; i++) {
      var option = document.createElement("option");
      option.value = values[i];
      option.text = values[i];
      list.appendChild(option);
    }
  }
</script>
