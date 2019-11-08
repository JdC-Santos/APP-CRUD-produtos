//CRIAR E EDITAR ============================================
$(document).on('submit','#formAdmin',function(e){
  e.preventDefault();

  if(localStorage.getItem('form') == "criar"){
    paramsAdmin(url_cadastrar);
  }else{
    paramsAdmin(url_editar);
  }

});

function paramsAdmin(acao){
  var params = {
    'criar': 'adm',
    'editar': 'adm',
    'nome': $('#nome').val(),
    'login': $('#login').val(),
    'email': $('#email').val(),
    'nivel': $('#nivel').val(),
    'pw': $('#pw').val(),
    'cd': $('#cd').val()
  }
  enviarRequisicao(acao,params,'onCriarEditarAdmin');
}

function onCriarEditarAdmin(json){
  alert(json.msg);
  if(json.status == 1){
    location.href = "listar.html";
  }
}

// CRIAR E EDITAR PRODUTOS =========================================

$(document).on('submit','#formProd',function(e){
  e.preventDefault();

  if(localStorage.getItem('form') == "criar"){
    paramsProd(url_cadastrar);
  }else{
    paramsProd(url_editar);
  }

});

function paramsProd(acao){
    // var params = {
    //   'criar': 'prod',
    //   'editar': 'prod',
    //   'nome': $('#nome').val(),
    //   'qtd': $('#qtd').val(),
    //   'status': $('#status').val(),
    //   'valor': $('#valor').val(),
    //   'cod_barras': $('#cod_barras').val(),
    //   'cd':$('#cd').val(),
    //   'foto': $("#foto")[0].files
    // }
    enviarRequisicaoComFoto(acao,'onCriarEditarProd');
  }

function onCriarEditarProd(json){
  alert(json.msg);
  if(json.status == 1){
    location.href = "listar.html";
  }
}

$(document).on('click','#btnCamera',function(){
  navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
    destinationType: Camera.DestinationType.FILE_URI 
  });

  function onSuccess(imageURI) {

      var image = document.getElementById('img_prod');
      moveFile(imageURI);

      $('#foto').attr('src',imageURI);
      // console.log("data:image/jpeg;base64," + imageURI);
      image.src = imageURI;
  }

  function onFail(message) {
      alert('Failed because: ' + message);
  }
});

function carregaDadosDeAcesso(){
  $('#cd_usuario').val(cd_usuario);
  $('#cd_hash_login').val(hash);
}

//--------------------------------------
function moveFile(file){

    var deferred = $q.defer();

    window.resolveLocalFileSystemURL(file,
        function resolveOnSuccess(entry){

            var dateTime = moment.utc(new Date).format('YYYYMMDD_HHmmss');
            var newFileName = dateTime + ".jpg";
            var newDirectory = "photos";

            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSys) {

                    //The folder is created if doesn't exist
                    fileSys.root.getDirectory( newDirectory,
                        {create:true, exclusive: false},
                        function(directory) {

                            entry.moveTo(directory, newFileName, function (entry) {
                                //Now we can use "entry.toURL()" for the img src
                                console.log(entry.toURL());
                                deferred.resolve(entry);

                            }, resOnError);
                        },
                        resOnError);
                },
                resOnError);
        }, resOnError);

    return deferred.promise;
}

function resOnError(error) {
    console.log('Awwww shnap!: ' + error.code);
}