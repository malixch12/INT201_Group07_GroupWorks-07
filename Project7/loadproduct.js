import { products } from "./product.js"; // Import

const root = document.querySelector(".item");
const searchBtn = document.querySelector("#btn");
const toggleSearchBtn = document.querySelector("#search");
const searchPanel = document.querySelector("#input");
const cartItemCount = document.querySelector("#cart-item-count");
const cart = [];
let isSearching = false;

renderProducts(products, root);

toggleSearchBtn.addEventListener('click', () => {
  if (isSearching) {
    searchPanel.setAttribute('class', 'd-none');
  }
  else {
    searchPanel.setAttribute('class', ' ');
  }
  isSearching = !isSearching;
})

searchBtn.addEventListener('click', () => {
  const input = document.querySelector("#input_txt").value;
  const filteredProducts = findProduct(input);
  renderProducts(filteredProducts, root);
});

function findProduct(pname) {
  if (pname.length == 0) {
    return products;
  } else {
    return products.filter(name => name.productName.toLowerCase().includes(pname.toLowerCase()));
  }
}

function renderProducts(products, root) {
  root.innerHTML = '';

  products.forEach(product => {
    const itemContainer = document.createElement("div");
    itemContainer.setAttribute("class", "card mb-4 col-12 col-sm-6 col-md-4 col-lg-3 shadow-sm border-0");

    const productImage = document.createElement("img");
    productImage.setAttribute("class", "card-img-top px-4");
    productImage.src = product.img;

    const productBody = document.createElement("div");
    productBody.setAttribute("class", "card-body");

    const productTitle = document.createElement("h5");
    productTitle.setAttribute("class", "card-title");
    productTitle.textContent = product.productName;

    const productId = document.createElement("p");
    productId.setAttribute("class", "card-subtitle text-muted");
    productId.textContent = `Product ID : ${product.productId}`;

    const productDetails = document.createElement("p");
    productDetails.setAttribute("class", "card-text mt-2");
    productDetails.textContent = product.productDesc;

    const br = document.createElement("br");

    const productStock = document.createElement("span");
    productStock.setAttribute("class", "text-muted");
    productStock.textContent = `Stock : ${product.stock}`;

    const productPrice = document.createElement("p");
    productPrice.setAttribute("class", "card-text fw-bold");
    productPrice.textContent = `ราคา : ${product.productPrice}฿`;

    const addToCartBtn = document.createElement("button");
    addToCartBtn.setAttribute('class', "btn btn-primary btn-add w-100");
    addToCartBtn.innerHTML = "Add to cart";

    addToCartBtn.addEventListener("click", function () {
      const productId = product.productId;
      const existingItem = cart.find(cartItem => cartItem.product.productId === productId);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        cart.push({ product, quantity: 1 });
      }

      cartItemCount.textContent = getCartItemCount(cart);
      alert(`${productId} added!`);
    });

    productDetails.append(br);
    productDetails.append(productStock);
    productBody.append(productTitle, productId, productDetails, productPrice, addToCartBtn);
    itemContainer.append(productImage, productBody);
    root.append(itemContainer);
  });
}

function getCartItemCount(cart) {
  return cart.reduce((accumulator, cartItem) => accumulator + cartItem.quantity, 0);
}