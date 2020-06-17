/*Função que define o tamanho e a largura da tela e a atualiza caso o tamanho e a largura mudem*/
var altura = 0;
var largura = 0;
var vidas = 1;
var tempo = 15;

function ajustaTamanhoPalcoJogo() {
    largura = window.innerWidth;
    altura = window.innerHeight;

    console.log(largura, altura);
}

ajustaTamanhoPalcoJogo();

var cronometro = setInterval(function () {
    tempo -= 1;

    if(tempo < 0){
        clearInterval(cronometro);
        clearInterval(criaMosca);
        alert('Vitoria');
    }else{
        document.getElementById('cronometro').innerHTML = tempo;
    }
}, 1000)

function posicaoRandomica() {

    //remover o mosquito anterior (caso exista)
    if (document.getElementById('mosquito')) {

        document.getElementById('mosquito').remove();

        //console.log('Elemento selecionado foi: v' + vidas);
        if (vidas > 3) {
            window.location.href = 'fim_de_jogo.html'
        }
        else {
            document.getElementById('v' + vidas).src = "/img/coracao_vazio.png";
        }

        vidas++;
    }

    /*Criado uma variavel para criar posições aleatorias para o mosquito*/
    var posicaoX = Math.floor(Math.random() * largura) - 90;
    var posicaoY = Math.floor(Math.random() * altura) - 90;

    posicaoX = posicaoX < 0 ? 0 : posicaoX;
    posicaoY = posicaoY < 0 ? 0 : posicaoY;

    console.log(posicaoX, posicaoY);

    //criar o elemento html
    var mosquito = document.createElement('img');
    mosquito.src = '/img/mosca.png';
    mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio();

    //
    mosquito.style.left = posicaoX + 'px';
    mosquito.style.top = posicaoY + 'px';
    mosquito.style.position = 'absolute';
    mosquito.id = 'mosquito';
    mosquito.onclick = function () {
        this.remove();
    }

    document.body.appendChild(mosquito);

    console.log(ladoAleatorio());


}

function tamanhoAleatorio() {
    var classe = Math.floor(Math.random() * 3);
    console.log(classe);

    switch (classe) {
        case 0:
            return 'mosquito1'
        case 1:
            return 'mosquito2'
        case 2:
            return 'mosquito3'
    }
}

function ladoAleatorio() {
    var lado = Math.floor(Math.random() * 2);

    switch (lado) {
        case 0:
            return 'ladoA'
        case 1:
            return 'ladoB'
    }
}
