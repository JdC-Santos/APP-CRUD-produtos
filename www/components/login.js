//SCRIPTS DO ARQUIVO: INDEX.HTML
function validaInputUser(user){
  var validado = true;
  if(user == ""){
    validado = false;
    navigator.notification.alert(
        'Digite o usuário!',
        false,
        'ATENÇÃO',
        'OK'
    );
  }
  return validado;
}

function validaInputPw(pw){
  var validado = true;
  if(pw == ""){
    validado = false;
    navigator.notification.alert(
        'Digite a senha!',
        false,
        'ATENÇÃO',
        'OK'
    );
  }
  return validado;
}

$(document).ready(function(){
  $(document).on('submit','#formLogin',function(e){
    e.preventDefault();

    if( validaInputUser( $('#user').val() ) && validaInputPw( $('#pw').val() ) ){
      var form = $(this).serialize();
      $.ajax({
        url: url_login,
        type:'post',
        dataType:'json',
        data:form,
        success: function(data){
          if(data.status == 1){
            localStorage.setItem('id_user',data.cd);
            localStorage.setItem('nm_user',data.nome);
            localStorage.setItem('hash', data.hash);

            window.location.href = "dash.html";
          }else{
            navigator.notification.alert(
              'Usuario ou senha incorretos',
              false,
              'ATENÇÃO',
              'OK'
            );
          }
        },
        error: function (data) {
          navigator.notification.alert(
            data.msg,
            false,
            'ATENÇÃO',
            'OK'
          );
        }
      });
    }
  });

  // if(localStorage.hasOwnProperty('hash')){
  //   window.location.href = "dash.html";
  // }
});