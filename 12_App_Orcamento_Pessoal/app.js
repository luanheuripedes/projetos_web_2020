class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano;
        this.mes = mes;
        this.dia = dia;
        this.tipo = tipo;
        this.descricao = descricao;
        this.valor = valor;
    }

    validarDados() {
        for (let i in this) { //eu percorro todos os atributos da classe despesa
            if (this[i] == undefined || this[i] == '' || this[i] == null) {
                return false;
            }
        }
        return true;
    }
}

class Bd {
    constructor() {
        let id = localStorage.getItem('id');

        if (id === null) {
            localStorage.setItem('id', 0);
        }
    }
    getProximoId() {
        let proximoId = localStorage.getItem('id');
        return parseInt(proximoId) + 1;
    }

    gravar(d) {
        let id = this.getProximoId();

        localStorage.setItem(id, JSON.stringify(d))

        localStorage.setItem('id', id);
    }

    recuperarTodosRegistros() {

        //array de despesas
        let despesas = Array();

        let id = localStorage.getItem('id');

        //recuperar toas as despesasa cadastradas 
        for (let i = 1; i <= id; i++) {

            //recuperar a despesa
            let despesa = JSON.parse(localStorage.getItem(i));

            //existe a possibilidade de haver indices que foram pulados/removidos
            //nestes casos nos vamos pular esses indices
            if (despesa === null) {
                continue
            }

            despesa.id = i;

            //adicionando no meu array despesas a despesa recuperada no localStorage
            despesas.push(despesa);
        }
        return despesas;
    }

    pesquisar(despesa) {

        let despesasFiltradas = Array();

        despesasFiltradas = this.recuperarTodosRegistros();

        console.log(despesasFiltradas);
        console.log(despesa);

        //ano
        if (despesa.ano != '') {
            console.log('Filtro de ano');
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano);
        }
        //mes
        if(despesa.mes != ''){
			console.log("filtro de mes");
			despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
		}

        //dia
        if (despesa.dia != '') {
            console.log('Filtro de dia')
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia);
        }

        //tipo
        if (despesa.tipo != '') {
            console.log('Filtro de tipo')
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo);
        }

        //descricao
        if (despesa.descricao != '') {
            console.log('Filtro de descricao')
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao);
        }

        //valor
        if (despesa.valor != '') {
            console.log('Filtro valor')
            despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor);
        }

        console.log(despesasFiltradas)
        return despesasFiltradas;
    }

    remover(id){
        localStorage.removeItem(id);
    }
}

let bd = new Bd();

function cadastrarDespesa() {
    let ano = document.getElementById('ano');
    let mes = document.getElementById('mes');
    let dia = document.getElementById('dia');
    let tipo = document.getElementById('tipo');
    let descricao = document.getElementById('descricao');
    let valor = document.getElementById('valor');

    let despesa = new Despesa(
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value
    );

    if (despesa.validarDados()) {
        bd.gravar(despesa);

        document.getElementById('modal_titulo').innerHTML = 'Registro inserido com sucesso';
        document.getElementById('modal_titulo_div').className = 'modal-header text-success';
        document.getElementById('modal_conteudo').innerHTML = 'Despesa foi cadastrada com sucesso!';
        document.getElementById('modal_btn').innerHTML = 'Voltar';
        document.getElementById('modal_btn').className = 'btn btn-success';

        //mensagem de sucesso
        $('#modalRegistraDespesa').modal('show');

        //limpando os campos apos a inserção dos dados
        ano.value = '';
        mes.value = '';
        dia.value = '';
        tipo.value = '';
        descricao.value = '';
        valor.value = '';

    } else {

        document.getElementById('modal_titulo').innerHTML = 'Erro na inclusão do registro';
        document.getElementById('modal_titulo_div').className = 'modal-header text-danger';
        document.getElementById('modal_conteudo').innerHTML = 'Erro na gravação, verifique se todos os campos foram preenchidos';
        document.getElementById('modal_btn').innerHTML = 'Voltar e corrigir'
        document.getElementById('modal_btn').className = 'btn btn-danger';

        //dialogo erro
        $('#modalRegistraDespesa').modal('show');//
    }
}

function carregaListaDespesas(despesas = Array(), filtro = false) {


    if (despesas.length == 0 && filtro == false) {
        despesas = bd.recuperarTodosRegistros();
    }

    //selecionando o elemento tbody da tabela
    let listaDespesas = document.getElementById('listaDespesas');
    listaDespesas.innerHTML = '';

    /*
    <tr>
        0 = <td>15/04/2020</td>
        1 = <td>Alimentação</td>
        2 = <td>Compras do mes</td>
        3 = <td>4775</td>
    </tr>
    */

    //percorrer o array despesas, listando cada despesa de forma dinamica
    despesas.forEach(function (d) {


        //criando a linha(tr)
        let linha = listaDespesas.insertRow();

        //criar as colunas (td)
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`;

        //ajustar o tipo
        switch (parseInt(d.tipo)) {
            case 1:
                d.tipo = 'Alimentação'
                break
            case 2:
                d.tipo = 'Educação'
                break
            case 3:
                d.tipo = 'Lazer'
                break
            case 4:
                d.tipo = 'Educação'
                break
            case 5:
                d.tipo = 'Transporte'
                break
        }

        linha.insertCell(1).innerHTML = d.tipo;
        linha.insertCell(2).innerHTML = d.descricao;
        linha.insertCell(3).innerHTML = d.valor;

        //criar o botao de exclusao
        let btn = document.createElement("button");
        btn.className = 'btn btn-danger';
        btn.innerHTML = '<i class="fas fa-times"> </i>'
        btn.id = `id_despesa_${d.id}`
        btn.onclick = function(){
            //remover despesa;
            let id = this.id.replace('id_despesa_', '');
            console.log(`aqui esta o id do replace ${id}`);
            //MODAL para a verificação do Sim ou Não para a exclusão    
            document.getElementById('modal_titulo').innerHTML = 'Exclusão';
            document.getElementById('modal_titulo_div').className = 'modal-header text-danger';
            document.getElementById('modal_conteudo').innerHTML = 'Clique em SIM par excluir e Não para voltar ';
            document.getElementById('modal_btn').innerHTML = 'SIM';
            document.getElementById('modal_btn2').innerHTML = 'NÃO'
            document.getElementById('modal_btn').className = 'btn btn-danger';
            document.getElementById('modal_btn2').className = 'btn btn-danger';

            //mensagem de sucesso
            $('#modalExcluirDespesa').modal('show');

            document.getElementById('modal_btn').onclick = function(){
                //console.log('Funcionous');
                 bd.remover(id);
                 window.location.reload();
            }
        }
        linha.insertCell(4).append(btn);

        console.log(d);
    })
}

function pesquisarDespesa() {
    let ano = document.getElementById('ano').value;
    let mes = document.getElementById('mes').value;
    let dia = document.getElementById('dia').value;
    let tipo = document.getElementById('tipo').value;
    let descricao = document.getElementById('descricao').value;
    let valor = document.getElementById('valor').value;

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor);

    let despesas = bd.pesquisar(despesa);

    carregaListaDespesas(despesas, true);
}

/*
1- Apresentar Modal na exclusão de uma despesa
2- Pagina de indicadores Ex: APRESENTAR DE FORMA AGRUPADA A SOMA DAS DESPESAS POR TIPO E MES

*/

