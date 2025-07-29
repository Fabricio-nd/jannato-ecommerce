const produtos = [
 {
   nome: "camisa polo",
   preco: 79.90,
   imagem: "https://images.pexels.com/photos/3228848/pexels-photo-3228848.jpeg"
 },
 {
   nome: "camisa social",
   preco: 99.90,
   imagem: "https://images.pexels.com/photos/2013811/pexels-photo-2013811.jpeg"
 },
 {
   nome: "calça alfaiataria",
   preco: 129.90,
   imagem: "https://images.pexels.com/photos/5103042/pexels-photo-5103042.jpeg"
 },
 {
   nome: "conjunto calça e camisa",
   preco: 149.90,
   imagem: "https://images.pexels.com/photos/5934648/pexels-photo-5934648.jpeg"
 }
];
const loginSection = document.getElementById("login-section");
const storeSection = document.getElementById("store-section");
const loginButton = document.getElementById("login-button");
const loginError = document.getElementById("login-error");
const listaProdutos = document.getElementById("product-list");
const carrinhoItems = document.getElementById("cart-items");
const carrinhoTotal = document.getElementById("cart-total");
const campoBusca = document.getElementById("search");
let carrinho = [];
loginButton.addEventListener("click", () => {
 const u = document.getElementById("username").value.trim();
 const p = document.getElementById("password").value.trim();
 if (u === "admin" && p === "123") {
   loginSection.style.display = "none";
   storeSection.style.display = "block";
   mostrarProdutos(produtos);
 } else {
   loginError.textContent = "Usuário ou senha incorretos.";
 }
});
function mostrarProdutos(lista) {
 listaProdutos.innerHTML = "";
 lista.forEach((produto, idx) => {
   const div = document.createElement("div");
   div.className = "product";
   div.innerHTML = `
<img src="${produto.imagem}" alt="${produto.nome}">
<h3>${produto.nome}</h3>
<p>R$ ${produto.preco.toFixed(2)}</p>
<button onclick="adicionarAoCarrinho(${idx})">Adicionar ao carrinho</button>
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
 carrinhoItems.innerHTML = "";
 let total = 0;
 carrinho.forEach((item, i) => {
   const div = document.createElement("div");
   div.className = "cart-item";
   div.innerHTML = `
<span>${item.nome} - R$ ${item.preco.toFixed(2)}</span>
<button onclick="removerDoCarrinho(${i})">Remover</button>
   `;
   carrinhoItems.appendChild(div);
   total += item.preco;
 });
 carrinhoTotal.textContent = Total: R$ ${total.toFixed(2)};
}
campoBusca.addEventListener("input", () => {
 const termo = campoBusca.value.toLowerCase();
 const resultado = produtos.filter(p => p.nome.toLowerCase().includes(termo));
 mostrarProdutos(resultado);
});
