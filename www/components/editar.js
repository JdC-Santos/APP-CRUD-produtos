// This is a JavaScript file
if(localStorage.getItem('form') == "editar"){

  if(localStorage.getItem('listar') == "adm"){
    carregarAdmin();
  }else{
    carregarProd();
  }

}

function carregarAdmin(){
  var params = {
    'listar':'adm',
    'cd': cdEditar
  }
  enviarRequisicao(url_listar,params,'onCarregarAdmin');
}

function onCarregarAdmin(json){
  $('#nome').val(json[0].nm_usuario);
  $('#login').val(json[0].nm_login);
  $('#email').val(json[0].nm_email);
  $('#nivel').val(json[0].cd_nivel_acesso);
  $('#cd').val(json[0].cd_usuario);
  $('#pw').val('');
  $('#pw').attr('required',false);

  $('#btnEnviar').html('Salvar');
}

function carregarProd(){
  
  var params = {
    'listar':'prod',
    'cd': cdEditar,
    'cod_barrs':localStorage.getItem('code')
  }

  enviarRequisicao(url_listar,params,'onCarregarProd');
}

function onCarregarProd(json){
  
  var status  = json[0].ic_status;

  $('#nome').val(json[0].nm_produto);
  $('#qtd').val(json[0].qtd_produto);
  $('#valor').val(json[0].vl_produto);
  $('#opt_'+status).prop('selected', 'selected');
  $('#cod_barras').val(json[0].cd_barras);
  $('#cd').val(json[0].cd_produto);
  if(json[0].ds_foto != ""){
    $('#img_prod').attr('src',url_fotos+json[0].ds_foto);
  }else{
    $('#img_prod').attr('src','imgs/placeholder-prod.png');
  }
  console.log(url_fotos+json[0].ds_foto);

  $('#btnEnviar').html('Salvar');
}
