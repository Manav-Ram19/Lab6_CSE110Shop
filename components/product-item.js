// product-item.js
let cacheArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
class ProductItem extends HTMLElement {
  // TODO
  constructor(imgSrc, title, price, buttonMessage, index) {
    super();

    this.index = index;
    let cartCount = document.getElementById('cart-count');
    const shadow = this.attachShadow({ mode: 'open' });

    const list = document.createElement('li');
    list.setAttribute('class', 'product');

    const img = document.createElement('img');
    img.src = imgSrc;
    img.setAttribute('alt', title);
    img.setAttribute('width', 200);

    list.appendChild(img);

    const pTitle = document.createElement('p');
    pTitle.setAttribute('class', 'title');
    pTitle.textContent = title;

    list.appendChild(pTitle);

    const pPrice = document.createElement('p');
    pPrice.setAttribute('class', 'price');
    pPrice.textContent = price;

    list.appendChild(pPrice);

    const button = document.createElement('button');
    if (buttonMessage == 'Add to Cart') {
      button.setAttribute('onclick', "alert('Added to Cart!')");
      button.textContent = buttonMessage;
    }
    else if (buttonMessage == 'Remove from Cart') {
      button.setAttribute('onclick', "alert('Removed from Cart!')");
      button.textContent = buttonMessage;
    }
    button.addEventListener('click', changeButton);

    function changeButton() {
      console.log(button.textContent);
      if (button.textContent == 'Add to Cart') {
        button.textContent = 'Remove from Cart';
        cartCount.textContent = parseInt(cartCount.textContent) + 1;

        cacheArray[index] = 1;
        console.log(cacheArray);

        localStorage.setItem('cachedProducts', JSON.stringify(cacheArray));
        localStorage.setItem('cartCount', cartCount.textContent);
      }
      else {
        button.textContent = 'Add to Cart';
        cartCount.textContent = parseInt(cartCount.textContent) - 1;

        cacheArray[index] = 0;
        console.log(cacheArray);
        
        localStorage.setItem('cachedProducts', JSON.stringify(cacheArray));
        localStorage.setItem('cartCount', cartCount.textContent);
      }
    }

    list.appendChild(button);

    const style = document.createElement('style');

    style.textContent = `
    .price {
      color: green;
      font-size: 1.8em;
      font-weight: bold;
      margin: 0;
    }
    
    .product {
      align-items: center;
      background-color: white;
      border-radius: 5px;
      display: grid;
      grid-template-areas: 
      'image'
      'title'
      'price'
      'add';
      grid-template-rows: 67% 11% 11% 11%;
      height: 450px;
      filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
      margin: 0 30px 30px 0;
      padding: 10px 20px;
      width: 200px;
    }
    
    .product > button {
      background-color: rgb(255, 208, 0);
      border: none;
      border-radius: 5px;
      color: black;
      justify-self: center;
      max-height: 35px;
      padding: 8px 20px;
      transition: 0.1s ease all;
    }
    
    .product > button:hover {
      background-color: rgb(255, 166, 0);
      cursor: pointer;
      transition: 0.1s ease all;
    }
    
    .product > img {
      align-self: center;
      justify-self: center;
      width: 100%;
    }
    
    .title {
      font-size: 1.1em;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    .title:hover {
      font-size: 1.1em;
      margin: 0;
      white-space: wrap;
      overflow: auto;
      text-overflow: unset;
    }
    `;
    shadow.appendChild(list);
    shadow.appendChild(style);

  }
}

customElements.define('product-item', ProductItem);
