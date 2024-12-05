const barraPesquisar = document.getElementById('pesquisa')
barraPesquisar.className = 'v'

produtoTeste = {
    'nome': 'sapato1',
    'descricao': 'sapato teste',
    'categoria': 'sapatos',
    'preco': 22.45
}

var listaProdutos = [produtoTeste]

function carregarProdutos() {
    let listaProd = document.getElementById('produtos')
    // Gerar html dentro de listaProd para cada objeto na lista de produtos
    console.log('Produtos carregados')
}

function Pesquisar() {
    barraPesquisar.className = 'v'
    console.log('Funcionou')
    carregarProdutos()
}

/* Ao adicionar objetos na lista:
    sessionStorage.setItem('produtosAtuais', listaProdutos)
    var listaProdutos = JSON.parse(sessionStorage.'produtosAtuais')
*/

// Coisas para cadastro de produtos

function Produto(nome, descricao, categoria, preco) {
    this.nome = nome
    this.descricao = descricao
    this.categoria = categoria
    this.preco = preco
}

const cadastrar = document.getElementById('cadastrar')
cadastrar.addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome')
    const descricao = document.getElementById('descricao')
    const preco = document.getElementById('preco')
    const categoria = document.getElementById('categoria')

    const inputs = document.querySelectorAll('#cadastrar input')

    // Esvaziando os inputs
    inputs.forEach(function(campo) {
        campo.value = ''
    })

    // Adicionando como objeto
    const produtoNovo = new Produto(nome.value, descricao.value, categoria.value, preco.value)
    console.log(nome)
})

barraPesquisar.addEventListener('change', Pesquisar)