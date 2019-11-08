//SCRIPTS USADOS EM MAIS DE UM ARQUIVO.
function listar(tipo){

  var res = null;
  var params = {'listar':tipo};
  var func = "carregaProds";

  if(tipo == "adm") func = "carregaAdmins";
    
  enviarRequisicao(url_listar,params,func);
}

function carregaAdmins(json){
 
  var conteudo = "";
  var btnVer  = '<button class="btn btn-info btnVer" value="$nr">';
      btnVer += '<span class=" glyphicon glyphicon-search table-icon"><span>';
      btnVer += '</button>';

  var btnExcluir  = '<button class="btn btn-danger btnExcluir" value="$nr">';
      btnExcluir += '<span class="glyphicon glyphicon-trash table-icon"><span>';
      btnExcluir += '</button>';

  for(var i =0; i < json.length; i++ ){
    var cd = json[i]['cd_usuario'];

    var btnV = btnVer.replace("$nr",cd);
    var btnE = btnExcluir.replace("$nr",cd);

    conteudo += '<tr>';
      conteudo += '<th scope="row">'+(i+1)+'</th>';
      conteudo += '<td>'+json[i]['nm_usuario']+'</td>';
      conteudo += '<td>'+btnV+'</td>';

      if(cd == 1){
        conteudo += '<td></td>';
      }else{
        conteudo += '<td>'+btnE+'</td>';
      }
      
    conteudo += '</tr>';
  }
  $('#table-conteudo').html(conteudo);
}

function carregaProds(json){
  
  if(json != null){
    var conteudo = "";
    var btnVer  = '<button class="btn btn-info btnVer" value="$nr">';
        btnVer += '<span class=" glyphicon glyphicon-search table-icon"><span>';
        btnVer += '</button>';

    var btnExcluir  = '<button class="btn btn-danger btnExcluir" value="$nr">';
        btnExcluir += '<span class="glyphicon glyphicon-trash table-icon"><span>';
        btnExcluir += '</button>';

    for(var i =0; i < json.length; i++ ){
      var cd = json[i]['cd_produto'];

      var btnV = btnVer.replace("$nr",cd);
      var btnE = btnExcluir.replace("$nr",cd);

      conteudo += '<tr>';
        conteudo += '<th scope="row">'+(i+1)+'</th>';
        conteudo += '<td>'+json[i]['nm_produto']+'</td>';
        conteudo += '<td>'+btnV+'</td>';

        if(cd == 1){
          conteudo += '<td></td>';
        }else{
          conteudo += '<td>'+btnE+'</td>';
        }
        
      conteudo += '</tr>';
    }
    $('#table-conteudo').html(conteudo);
  }
  
}

$(document).on('click','.btnExcluir',function(){
  cd_excluir = $(this).attr('value');
  var t = "produtp";
  if(localStorage.getItem('listar') == "adm") t = "administrador";

    navigator.notification.confirm(
        'Deseja mesmo excluir este '+t+'?',
        excluir,
        'EXCLUIR',
        ['NÃO','SIM']
    );
});

function excluir(buttonIndex) {

  if(buttonIndex == 2){
    var params = {'excluir':localStorage.getItem('listar'),'cd': cd_excluir}
    enviarRequisicao(url_excluir, params,'onExcluir');
  }
}

function onExcluir(json){

  navigator.notification.alert(
    json.msg,
    false,
    'Excluir',
    'OK'
  );

  if(json.status == 1){
    location.reload();
  }
}

$(document).on('click','.btnVer',function(){
  localStorage.setItem('form','editar');
  localStorage.setItem("cdEditar", $(this).attr('value'));
  
  var pg = localStorage.getItem('listar');
  location.href = pg+".html";
});

$(document).on("click",'#btnNovo',function(){
  localStorage.setItem('form','criar');
  
  var pg = localStorage.getItem('listar');
  location.href = pg+".html";
});