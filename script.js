const produtos = [
  {
    nome: "Camisa Azul",
    preco: 79.90,
    imagem: "https://i.imgur.com/Xcv0cK8.jpg"
  },
  {
    nome: "Camisa Social",
    preco: 99.90,
    imagem: "https://i.imgur.com/6s9JKYy.jpg"
  },
  {
    nome: "Calça Jeans",
    preco: 129.90,
    imagem: "https://i.imgur.com/KpVtoQH.jpg"
  },
  {
    nome: "Calça Social",
    preco: 149.90,
    imagem: "https://i.imgur.com/LBLv8ab.jpg"
  }
];

const loginSection = document.getElementById("login-section");
const storeSection = document.getElementById("store-section");
const loginButton = document.getElementById("login-button");
const loginError = document.getElementById("login-error");

const listaProdutos = document.getElementById("product-list");
const carrinhoItens = document.getElementById("cart-items");
const carrinhoTotal = document.getElementById("cart-total");
const campoBusca = document.getElementById("search");

let carrinho = [];

loginButton.addEventListener("click", () => {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (username === "admin" && password === "123") {
    loginSection.style.display = "none";
    storeSection.style.display = "block";
    mostrarProdutos(produtos);
  } else {
    loginError.textContent = "Usuário ou senha incorretos.";
  }
});

function mostrarProdutos(lista) {
  listaProdutos.innerHTML = "";
  lista.forEach((produto, index) => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}">
      <h3>${produto.nome}</h3>
      <p>R$ ${produto.preco.toFixed(2)}</p>
      <button onclick="adicionarAoCarrinho(${index})">Adicionar ao carrinho</button>
    `;
    listaProdutos.appendChild(div);
  });
}

function adicionarAoCarrinho(index) {
  carrinho.push(produtos[index]);
  atualizarCarrinho();
}

function removerDoCarrinho(index) {
  carrinho.splice(index, 1);
  atualizarCarrinho();
}

function atualizarCarrinho() {
  carrinhoItens.innerHTML = "";
  let total = 0;

  carrinho.forEach((item, i) => {
    const li = document.createElement("li");
    li.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;

    const btn = document.createElement("button");
    btn.textContent = "Remover";
    btn.onclick = () => removerDoCarrinho(i);

    li.appendChild(btn);
    carrinhoItens.appendChild(li);
    total += item.preco;
  });

  carrinhoTotal.textContent = `Total: R$ ${total.toFixed(2)}`;
}

campoBusca.addEventListener("input", () => {
  const termo = campoBusca.value.toLowerCase();
  const resultado = produtos.filter(p => p.nome.toLowerCase().includes(termo));
  mostrarProdutos(resultado);
});
