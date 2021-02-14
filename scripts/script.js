// Script.js

window.addEventListener('DOMContentLoaded', () => {
  // TODO
  if (localStorage.getItem('data') == null) {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => localStorage.setItem('data', JSON.stringify(data)));

      for(let j = 0; j < cacheArray.length; j++) {
        cacheArray[j] == 0;
      }
      localStorage.setItem('cachedProducts', JSON.stringify(cacheArray));
  }
  let strProductData = localStorage.getItem('data');
  let objProductData = JSON.parse(strProductData);
  let productList = document.getElementById('product-list');

  let currentCache = localStorage.getItem('cachedProducts');
  for (let i = 0; i < objProductData.length; i++) {
    let objProductItem = new ProductItem(objProductData[i].image,objProductData[i].title,objProductData[i].price, 'Add to Cart', i);
    productList.appendChild(objProductItem);
  }

  console.log(cacheArray);
});