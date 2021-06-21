const products = [
  {
    name: "book",
    price: "10",
  },
  {
    name: "Shoes",
    price: "20",
  },
  {
    name: "Watch",
    price: "15",
  },
  {
    name: "Bag",
    price: "12",
  },
];

let cart = {
  items: [],
  totalPrice: 0,
};

function renderAllProduct() {
  const productTable = document.getElementById("products");
  productTable.innerHTML = "";
  products.forEach((product, index) => {
    productTable.innerHTML += `
    <tr>
        <td>${product.name}</td>
        <td>$${product.price}</td>
        <td>
            <button class="btn btn-primary" onclick="addToCart(${index})">Add To Cart</button>
        </td>
    </tr>
        
    `;
  });
}

function renderAllCartItem() {
  const cartItemTable = document.getElementById("cart-items");
  const totalPriceItem = document.getElementById("total-price");

  let totalPrice = 0;
  cartItemTable.innerHTML = "";
  if (cart.items.length === 0) {
    cartItemTable.innerHTML = `
        <tr>
            <td colspan="S">
                there is no item in cart yet
            </td>
        </tr>
        `;
  }
  cart.items.forEach((cartItem, index) => {
    totalPrice += cartItem.total;
    cartItemTable.innerHTML += `
      <tr>
          <td>${cartItem.name}</td>
          <td>$${cartItem.price}</td>
          <td>$${cartItem.quantity}</td>
          <td>$${cartItem.total}</td>
          <td>
              <button class="btn btn-danger" onclick="removeCart('${cartItem.name}')">Remove</button>
          </td>
      </tr>
          
      `;
  });

  totalPriceItem.innerText = `Total: $${totalPrice}`;
}

function addToCart(productIndex) {
  const product = products[productIndex];
  let alreadyToCart = false;

  let newCartItem = cart.items.reduce((state, item) => {
    if (item.name === product.name) {
      alreadyToCart = true;
      const newItem = {
        ...item,
        quantity: item.quantity + 1,
        total: (item.quantity + 1) * item.price,
      };
      return [...state, newItem];
    }
    return [...state, item];
  }, []);

  if (!alreadyToCart) {
    newCartItem.push({
      ...product,
      quantity: 1,
      total: product.price,
    });
  }

  cart = {
    ...cart,
    items: newCartItem,
  };
  renderAllCartItem();
}

function removeCart(productName) {
  let newCartItem = cart.items.reduce((state, item) => {
    if (item.name === productName) {
      alreadyToCart = true;
      const newItem = {
        ...item,
        quantity: item.quantity - 1,
        total: (item.quantity - 1) * item.price,
      };
      if (newItem.quantity > 0) {
        return [...state, newItem];
      } else {
        return state;
      }
    }
    return [...state, item];
  }, []);

  cart = {
    ...cart,
    items: newCartItem,
  };
  renderAllCartItem();
}

renderAllProduct();
renderAllCartItem();
