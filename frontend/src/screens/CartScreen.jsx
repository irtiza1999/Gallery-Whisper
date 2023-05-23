

const CartScreen = () => {
  // Assuming you have a cartItems array in your state or props
  const cartItems = [
    { id: 1, name: 'Product 1', price: 10, quantity: 2 },
    { id: 2, name: 'Product 2', price: 15, quantity: 1 },
    // Add more cart items as needed
  ];

  return (
    <div>
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              <p>{item.name}</p>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <button>Remove from Cart</button>
            </li>
          ))}
        </ul>
      )}
      <p>Total: ${calculateTotal(cartItems)}</p>
      <button>Checkout</button>
    </div>
  );
};

// Helper function to calculate the total price of all items in the cart
const calculateTotal = (cartItems) => {
  return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
};

export default CartScreen;
