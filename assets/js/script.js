var barraPesquisar = document.getElementById('pesquisa')
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

barraPesquisar.addEventListener('change', Pesquisar)