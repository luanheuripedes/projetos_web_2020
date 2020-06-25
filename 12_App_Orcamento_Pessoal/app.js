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
                continue;
            }

            //adicionando no meu array despesas a despesa recuperada no localStorage
            despesas.push(despesa);
        }
        return despesas;
    }

    pesquiar(despesa) {
        console.log(despesa);
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

function carregaListaDespesas() {
    let despesas = Array();

    despesas = bd.recuperarTodosRegistros();

    //selecionando o elemento tbody da tabela
    let listaDespesas = document.getElementById('listaDespesas');

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
                break;
            case 2:
                d.tipo = 'Educação'
                break;
            case 3:
                d.tipo = 'Lazer'
                break;
            case 4:
                d.tipo = 'Educação'
                break;
            case 5:
                d.tipo = 'Transporte'
                break;
        }

        linha.insertCell(1).innerHTML = d.tipo;
        linha.insertCell(2).innerHTML = d.descricao;
        linha.insertCell(3).innerHTML = d.valor;
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

    bd.pesquiar(despesa);
}

