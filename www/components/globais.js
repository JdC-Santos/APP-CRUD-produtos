// This is a JavaScript file
var webservice = "https://jdc.profrodolfo.com.br/";
//endpoints do webservice
var url_login = webservice + "login.php";
var url_listar = webservice + "listar.php";
var url_cadastrar = webservice + "criar.php";
var url_editar = webservice + "editar.php";
var url_excluir = webservice + "excluir.php";
var url_fotos = webservice;

//dados de login
var hash = localStorage.getItem("hash");
var cd_usuario = localStorage.getItem("id_user");
var nm_usuario = localStorage.getItem("nm_user");

//variaveis globais para funcoes
var cd_excluir = 0;
var cd_carregar = 0;
var fotoProd;

var cdEditar = localStorage.getItem("cdEditar");
