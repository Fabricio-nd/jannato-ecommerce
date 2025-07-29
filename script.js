document.getElementById('login-button').addEventListener('click', function () {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const errorMessage = document.getElementById('login-error');

  const validUser = 'admin';
  const validPass = '123';

  if (username === validUser && password === validPass) {
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('store-section').style.display = 'block';
    loadProducts();
  } else {
    errorMessage.textContent = 'Usuário ou senha inválidos.';
  }
});

// Produtos da loja
const products = [
  {
    id: 1,
    name: 'Camisa Polo',
    price: 79.90,
    image: "https://www.pexels.com/pt-br/foto/homem-vestindo-uma-camisa-polo-azul-lacoste-e-relogio-analogico-prateado-1232459/"
  },
  {
    id: 2,
    name: 'Camisa Social',
    price: 99.90,
    image: "https://images.pexels.com/photos/2013811/pexels-photo-2013811.jpeg"
  },
  {
    id: 3,
    name: 'Calça Alfaiataria',
    price: 129.90,
    image: "https://images.pexels.com/photos/5103042/pexels-photo-5103042.jpeg"
  },
  {
    id: 4,
    name: 'Conjunto Calça e Camisa',
    price: 199.90,
    image: "https://images.pexels.com/photos/5934648/pexels-photo-5934648.jpeg"
  }
];

function loadProducts() {
  const productList = document.getElementById('product-list');
  productList.innerHTML = '';

  products.forEach(product => {
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>R$ ${product.price.toFixed(2)}</p>
      <button onclick="addToCart(${product.id})">Adicionar</button>
    `;
    productList.appendChild(div);
  });
}

const cart = [];

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (product) {
    cart.push(product);
    updateCart();
  }
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  cartItems.innerHTML = '';

  let total = 0;

  cart.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <span>${item.name} - R$ ${item.price.toFixed(2)}</span>
      <button onclick="removeFromCart(${index})">Remover</button>
    `;
    cartItems.appendChild(div);
    total += item.price;
  });

  cartTotal.textContent = Total: R$ ${total.toFixed(2)};
}
