/*Função que define o tamanho e a largura da tela e a atualiza caso o tamanho e a largura mudem*/
var altura = 0, largura = 0;
function ajustaTamanhoPalcoJogo(){
    altura = window.innerHeight;
    largura = window.innerWidth;
    console.log(altura, largura);
}
