function Produto(nome, descricao, categoria, preco, imagem, sexo, codigo) {
    this.nome = nome
    this.descricao = descricao
    this.categoria = categoria
    this.preco = preco
    this.codigo = codigo
    this.imagem = imagem
    this.sexo = sexo
}
const cadastrar = document.getElementById('cadastrar')
cadastrar.addEventListener('submit', function(event) {
    event.preventDefault()

    const nome = document.getElementById('nome')
    const descricao = document.getElementById('descricao')
    const preco = document.getElementById('preco')
    const categoria = document.getElementById('categoria')
    const imagem = document.getElementById('imagem')

    const caixaMasculino = document.getElementById('caixa-m')
    const caixaFeminino = document.getElementById('caixa-f')
    let sexo = ''
    if (caixaMasculino.checked && caixaFeminino.checked == false) {
        sexo = 'Masculino'
    }
    else if (caixaMasculino.checked == false && caixaFeminino.checked) {
        sexo = 'Feminino'
    }
    else {
        sexo = 'Unissex'
    }

    // Adicionando como objeto em localStorage
    let prodAtuais = localStorage.getItem('produtos')
    var vermais = document.getElementsByClassName(".vermais")
    if (!prodAtuais) {
        prodAtuais = [] 
      } else {
        prodAtuais = JSON.parse(prodAtuais)
      }
    let idProduto = prodAtuais.length
    const produtoNovo = new Produto(nome.value, descricao.value, categoria.value, preco.value,  imagem.value, sexo, idProduto,)
    prodAtuais.push(produtoNovo)
    localStorage.setItem('produtos', JSON.stringify(prodAtuais))

    console.log(localStorage.produtos)
    if (idProduto>6){
        vermais.style.display="block"
    }
    window.location.assign("index.html")
})