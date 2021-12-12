let cards = document.querySelectorAll(".add-card");

let products = [
  {
    name: "Turkuaz Tshirt",
    tag: "turkuaz",
    price: 10,
    inCard: 0,
  },
  {
    name: "Orange Tshirt",
    tag: "orange",
    price: 12,
    inCard: 0,
  },
  {
    name: "Dark Blue Tshirt",
    tag: "darkblue",
    price: 14,
    inCard: 0,
  },
  {
    name: "Green Tshirt",
    tag: "green",
    price: 16,
    inCard: 0,
  },
];

for (let i = 0; i < cards.length; i++) {
  cards[i].addEventListener("click", () => {
    cardNumbers(products[i]);
    totalCost(products[i]);
  });
}

function onLoadCardNumbers() {
  let productNumbers = localStorage.getItem("cardNumbers");

  if (productNumbers) {
    document.querySelector(".classforspan span").textContent = productNumbers;
  }
}

function cardNumbers(product) {
  let productNumbers = localStorage.getItem("cardNumbers");

  productNumbers = parseInt(productNumbers);

  if (productNumbers) {
    localStorage.setItem("cardNumbers", productNumbers + 1);
    document.querySelector(".classforspan span").textContent =
      productNumbers + 1;
  } else {
    localStorage.setItem("cardNumbers", 1);
    document.querySelector(".classforspan span").textContent = 1;
  }

  setItems(product);
}

function setItems(product) {
  let cardItems = localStorage.getItem("productsInCard");
  cardItems = JSON.parse(cardItems);

  if (cardItems != null) {
    if (cardItems[product.tag] == undefined) {
      cardItems = {
        ...cardItems,
        [product.tag]: product,
      };
    }
    cardItems[product.tag].inCard += 1;
  } else {
    product.inCard = 1;
    cardItems = {
      [product.tag]: product,
    };
  }

  localStorage.setItem("productsInCard", JSON.stringify(cardItems));
}

function totalCost(product){
    let cardCost = localStorage.getItem('totalCost');
   
    if(cardCost != null){
        cardCost = parseInt(cardCost);
        localStorage.setItem("totalCost", cardCost + product.price);   
    }
    else {
        localStorage.setItem("totalCost", product.price);
    }
    
}

function displayCard(){
    let cardItems = localStorage.getItem("productsInCard");
    cardItems = JSON.parse(cardItems);
    let productContainer = document.querySelector(".products");
    if (cardItems && productContainer){
        productContainer.innerHTML = '';
        Object.values(cardItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
                <ion-icon name="close-circle"></ion-icon>
                <img src="./images/${item.tag}.jpg">
                <span>${item.name}</span>
            </div>
            <div class="price">$${item.price},00</div>
            <div class="quantity">
                <ion-icon class="decrease"
                name="arrow-dropleft-circle"></ion-icon>
                <span>${item.inCard}</span>
                <ion-icon class="increase"
                name="arrow-dropright-circle"></ion-icon>
                </div>
                <div class="total">
                $${item.inCard*item.price},00
                </div>
            `;
        });

        productContainer.innerHTML += `
        <div class="basketTotalContainer">
        <h4 class="basketTotalTitle">
        Basket Total
        </h4>
        <h4 class="basketTotal">
            $${cardCost},00
        </h4>
        </div>
        `;

       
    }
}

onLoadCardNumbers();
displayCard();
