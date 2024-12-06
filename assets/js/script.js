const barraPesquisar = document.getElementById('pesquisa')

function Pesquisar() {
    console.log('Pesquisou')
    exibirProdutos(barraPesquisar.value)
}
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

// Carregar e exibir produtos com base na pesquisa
function exibirProdutos(pesquisa = '') {
    const produtosDiv = document.getElementById('produtos')
    const prodAtuais = localStorage.getItem('produtos')
    
    if (!prodAtuais) {
        produtosDiv.innerHTML = '<p class="poppins-regular">Nenhum produto encontrado.</p>'
        return
    }
    
    const produtos = JSON.parse(prodAtuais)
    produtosDiv.innerHTML = ''

    // Filtra os produtos se houver uma pesquisa
    const produtosFiltrados = produtos.filter(prod => prod.nome.toLowerCase().includes(pesquisa.toLowerCase()))

    // Se não encontrar nenhum produto que corresponda à pesquisa
    if (produtosFiltrados.length === 0) {
        produtosDiv.innerHTML = '<p class="poppins-regular">Nenhum produto encontrado.</p>'
        return
    }

    // Exibe os produtos filtrados (ou todos se não houver pesquisa)
    produtosFiltrados.forEach(function(produto) {
        const produtoDiv = document.createElement('div');
        produtoDiv.classList.add('product-item');

        // Criando o elemento de imagem (background)
        const imgProduto = document.createElement('div');
        imgProduto.classList.add('tamanho-sapatos-expositor');
        imgProduto.style.backgroundImage = `url(${produto.imagem})`;  // Definindo o fundo com a imagem

        // Criando o título do produto
        const titulo = document.createElement('p');
        titulo.classList.add('poppins-regular');
        titulo.textContent = produto.nome;  // Adicionando o nome do produto

        // Criando a div de detalhes
        const divDetalhes = document.createElement('div');
        divDetalhes.classList.add('detalhes-rectangle', 'd-flex', 'c-pointer'); // Colocando a classe d-flex para alinhar os itens

        // Criando o sinal de mais e a descrição de mais detalhes
        const sinalMais = document.createElement('div');
        sinalMais.classList.add('circle', 'd-flex', 'center-all');  // Classe do círculo para o ícone

        const imagemMais = document.createElement('img');
        imagemMais.classList.add('plus-size');
        imagemMais.src = 'assets/img/plus-solid-white.png';  // Caminho da imagem para o ícone de "mais"

        const maisDetalhes = document.createElement('p');
        maisDetalhes.classList.add('poppins-regular', 'color-white', 'l-spacing', 'm-l-10'); // Adicionando margem à esquerda
        maisDetalhes.textContent = 'MAIS DETALHES';  // Texto para "MAIS DETALHES"

        // Adicionando os elementos na estrutura correta
        produtoDiv.appendChild(imgProduto);
        produtoDiv.appendChild(titulo);
        produtoDiv.appendChild(divDetalhes);
        divDetalhes.appendChild(sinalMais);
        sinalMais.appendChild(imagemMais);
        divDetalhes.appendChild(maisDetalhes);

        // Adicionando o produto na div principal de produtos
        produtosDiv.appendChild(produtoDiv);

        // Criando os botões de editar e excluir
        const divEditarExcluir = document.createElement('div');
        divEditarExcluir.classList.add('edit-exclude-buttons');

        // Criando o botão de editar
        const buttonEditar = document.createElement('button');
        const iconeEditar = document.createElement('img');
        iconeEditar.src = 'assets/img/pen-solid.png';  // Ícone para editar
        iconeEditar.classList.add('icon-size');

        // Criando o botão de excluir
        const buttonExcluir = document.createElement('button');
        const iconeExcluir = document.createElement('img');
        iconeExcluir.src = 'assets/img/trash-solid.png';  // Ícone para excluir
        iconeExcluir.classList.add('icon-size');

        // Adicionando os botões de editar e excluir na estrutura
        produtoDiv.appendChild(divEditarExcluir);
        divEditarExcluir.appendChild(buttonEditar);
        divEditarExcluir.appendChild(buttonExcluir);
        buttonEditar.appendChild(iconeEditar);
        buttonExcluir.appendChild(iconeExcluir);

        // Eventos para os botões
        buttonEditar.addEventListener('click', function() {
            confirmarEditar(produto.codigo)
        })
        buttonExcluir.addEventListener('click', function() {
            confirmarExclusao(produto.codigo)
        })
    })
}

barraPesquisar.addEventListener('change', Pesquisar)
window.addEventListener('load', function() {
    console.log('Lista de produtos: ', localStorage.produtos)
    exibirProdutos()
})
