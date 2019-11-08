function carregarMenu(titulo){
  $("#menu_container").load("menu.html",function(){
    $('#title-pg').html(titulo);
    var nome = localStorage.getItem('nm_user');
    
    if(nome.length > 0){
      $('#nm_user').html(nome);
    }
  });
}

var ativaMenu = true;
$(document).on('click','.menu-hamb',function(){
  if(ativaMenu){
    ativaMenu = false;
    $(".menu").css('margin-left',"0px");
  }else{
    ativaMenu = true;
    $(".menu").css('margin-left',"-100%");  
  }
});

// links do menu
$(document).on('click','#adm',function(){
  localStorage.setItem('listar','adm');
  location.href = "listar.html";
});

$(document).on('click','#prod',function(){
  localStorage.setItem('listar','prod');
  location.href = "listar.html";
});

$(document).on('click','#logout',function(){

  localStorage.removeItem('id_user');
  localStorage.removeItem('nm_user');
  localStorage.removeItem('hash');

  location.href = "index.html";
});

function buscarProdutoPorQrCode(code){
  localStorage.setItem('code',code);
  localStorage.setItem("cdEditar",0);
  localStorage.setItem('listar','prod');
  localStorage.setItem('form','editar');
  location.href = "prod.html";
}


$(document).on('click','#leitor',function(){
  cordova.plugins.barcodeScanner.scan(
      function (result) {
        buscarProdutoPorQrCode(result.text);        
      },
      function (error) {
          alert("Erro ao escanear: " + error);
      },
      {
          preferFrontCamera : false, // iOS and Android
          showFlipCameraButton : true, // iOS and Android
          showTorchButton : true, // iOS and Android
          torchOn: true, // Android, launch with the torch switched on (if available)
          saveHistory: true, // Android, save scan history (default false)
          prompt : "Place a barcode inside the scan area", // Android
          resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
          formats : "QR_CODE,PDF_417,CODE_39,QR_CODE", // default: all but PDF_417 and RSS_EXPANDED
          orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
          disableAnimations : true, // iOS
          disableSuccessBeep: false // iOS and Android
      }
   );
});