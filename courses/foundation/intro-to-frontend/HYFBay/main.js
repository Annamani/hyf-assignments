console.log("Script loaded");
const productList = document.querySelector(".product-list");

const products = getAvailableProducts();
console.log(products);

function renderProducts(products) {
  products.forEach((product) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
    <h2>${product.name}</h2>
    <p>Price: $${product.price}</p>
    <p>Rating: ${product.rating}</p>`;

    productList.appendChild(listItem);
  });
}

renderProducts(products);