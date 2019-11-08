if(hash == ""){
  storage.clear();
  location.href = "index.html";
}

function enviarRequisicao(endpoint,ArrayParam,func){

  ArrayParam['cd_hash_login'] = hash;
  ArrayParam['cd_usuario'] = cd_usuario;

  var ret = null;

  $.ajax({
    url: endpoint,
    type:'post',
    dataType:'json',
    data: ArrayParam,
    success: function(data){
      console.log('sucesso: ' + data);
      ret =  data;
    },
    error: function(data){
      console.log('erro: ' + data);
      ret = data;
    }
  }).done(function(){
    window[func](ret);
  });
}

function enviarRequisicaoComFoto(endpoint,func){
  var ret = null;
  var formdata = new FormData($("form[name='formProd']")[0]);
  formdata.append('foto',fotoProd);
  
  $.ajax({
    url: endpoint,
    type:'post',
    dataType:'json',
    data: formdata,
    processData: false,
    contentType: false,
    success: function(data){
      console.log('sucesso: ' + data);
      ret =  data;
    },
    error: function(data){
      console.log('erro: ' + data);
      ret = data;
    }
  }).done(function(){
    window[func](ret);
  });
}

