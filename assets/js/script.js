const barraPesquisar = document.getElementById('pesquisa')

// produtoTeste = {
//     'nome': 'sapato1',
//     'descricao': 'sapato teste',
//     'categoria': 'sapatos',
//     'preco': 22.45
// }

function Pesquisar() {
    barraPesquisar.className = 'v'
    console.log('Pesquisou')
    exibirProdutos(barraPesquisar.value)
}


// Coisas para cadastro de produtos
function Produto(nome, descricao, categoria, preco, codigo, imagem) {
    this.nome = nome
    this.descricao = descricao
    this.categoria = categoria
    this.preco = preco
    this.codigo = codigo
    this.imagem = imagem
}

const cadastrar = document.getElementById('cadastrar')
cadastrar.addEventListener('submit', function(event) {
    event.preventDefault()

    const nome = document.getElementById('nome')
    const descricao = document.getElementById('descricao')
    const preco = document.getElementById('preco')
    const categoria = document.getElementById('categoria')
    const imagem = document.getElementById('imagem')

    const inputs = document.querySelectorAll('#cadastrar input')

    // Adicionando como objeto em localStorage
    let prodAtuais = localStorage.getItem('produtos')
    if (!prodAtuais) {
        prodAtuais = []
      } else {
        prodAtuais = JSON.parse(prodAtuais)
      }
    let idProduto = prodAtuais.length
    const produtoNovo = new Produto(nome.value, descricao.value, categoria.value, preco.value, idProduto, imagem.value)
    prodAtuais.push(produtoNovo)
    localStorage.setItem('produtos', JSON.stringify(prodAtuais))

    console.log(localStorage.produtos)

    // Esvaziando os inputs
    inputs.forEach(function(campo) {
        campo.value = ''
    })
    exibirProdutos()
})

// Edição de produtos
const modalEditar = document.getElementById('modal-editar')
function confirmarEditar(codigo) {
    produtoEdicao = JSON.parse(localStorage.getItem('produtos')).find(prod => prod.codigo === codigo)
    document.getElementById('nome2').value = produtoEdicao.nome
    document.getElementById('descricao2').value = produtoEdicao.descricao
    document.getElementById('categoria2').value = produtoEdicao.categoria
    document.getElementById('preco2').value = produtoEdicao.preco
    document.getElementById('imagem2').value = produtoEdicao.imagem
    modalEditar.style.display = 'block'

    let formulario = document.getElementById('editar')
    formulario.addEventListener('submit', function(event) {
        event.preventDefault()
        
        // Atualizando os valores com o que foi editado
        produtoEdicao.nome = document.getElementById('nome2').value
        produtoEdicao.descricao = document.getElementById('descricao2').value
        produtoEdicao.categoria = document.getElementById('categoria2').value
        produtoEdicao.preco = document.getElementById('preco2').value
    
        // Atualizando o produto no localStorage
        let produtos = JSON.parse(localStorage.getItem('produtos'))
        produtos = produtos.map(prod => prod.codigo === produtoEdicao.codigo ? produtoEdicao : prod)
        localStorage.setItem('produtos', JSON.stringify(produtos))
    
        modalEditar.style.display = 'none'
        exibirProdutos()
    })
}
// Para o botão de cancelar edição
const cancelarEditar = document.getElementById('cancelar-edicao')
cancelarEditar.addEventListener('click', function() {
    modalEditar.style.display = 'none'
    let campos = document.querySelectorAll('#editar input')
    campos.forEach(function(campo) {
        campo.value = ''
    })
})

// Exclusão de produtos
const modalExcluir = document.getElementById('modal-excluir')
function confirmarExclusao(codigo) {
    modalExcluir.style.display = 'block'
    const confirmarExclusao = document.getElementById('confirmar-exclusao')
    confirmarExclusao.addEventListener('click', function() {
        excluir(codigo)
    })
}
function excluir(codigo) {
    let produtos = JSON.parse(localStorage.getItem('produtos'))

    // Encontra o certo e exclui ele
    produtos = produtos.filter(prod => prod.codigo !== codigo)
    localStorage.setItem('produtos', JSON.stringify(produtos))
    exibirProdutos()
    modalExcluir.style.display = 'none'
}
// Para o cancelamento de exclusão
const cancelarExclusao = document.getElementById('cancelar-exclusao')
function cancelarExcluir() {
    modalExcluir.style.display = 'none'
}
cancelarExclusao.addEventListener('click', cancelarExcluir)


// Carregar e exibir produtos
function exibirProdutos(pesquisa) {
    const produtosDiv = document.getElementById('produtos')
    const prodAtuais = localStorage.getItem('produtos')
    
    if (!prodAtuais) {
        produtosDiv.innerHTML = '<p>Nenhum produto encontrado.</p>'
        return
    }
    
    const produtos = JSON.parse(prodAtuais)
    produtosDiv.innerHTML = ''

    produtos.forEach(function(produto) {
        // Criando uma div para cada produto
        const produtoDiv = document.createElement('div')
        produtoDiv.classList.add('produto')

        // Criando os elementos dentro da div do produto
        const nomeElement = document.createElement('h3')
        nomeElement.textContent = `Nome: ${produto.nome}`

        const descricaoElement = document.createElement('p')
        descricaoElement.textContent = `Descrição: ${produto.descricao}`

        const categoriaElement = document.createElement('p')
        categoriaElement.textContent = `Categoria: ${produto.categoria}`

        const editarElement = document.createElement('button')
        editarElement.textContent = 'Editar'
        editarElement.id = 'btn-editar'

        const excluirElement = document.createElement('button')
        excluirElement.textContent = 'Excluir'
        excluirElement.id = 'btn-excluir'
    
        const precoElement = document.createElement('p')
        precoElement.textContent = `Preço: R$ ${produto.preco}`
    
        // Adicionando os textos do elemento na div que pertence a ele
        produtoDiv.appendChild(nomeElement)
        produtoDiv.appendChild(descricaoElement)
        produtoDiv.appendChild(categoriaElement)
        produtoDiv.appendChild(precoElement)
        produtoDiv.appendChild(editarElement)
        produtoDiv.appendChild(excluirElement)
    
        produtosDiv.appendChild(produtoDiv)

        editarElement.addEventListener('click', function() {
            confirmarEditar(produto.codigo)
        })
        excluirElement.addEventListener('click', function() {
            confirmarExclusao(produto.codigo)
        })
    })
}

barraPesquisar.addEventListener('change', Pesquisar)
window.addEventListener('load', function() {
    console.log('Lista de produtos: ', localStorage.produtos)
    // localStorage.setItem('produtos', '')
    exibirProdutos()
})