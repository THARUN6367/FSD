import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CartScreen.css';

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Load cart items from localStorage
    const loadCartItems = () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      setCartItems(cart);
      
      // Calculate total price
      const total = cart.reduce((sum, item) => sum + (Math.floor(item.price) * item.quantity), 0);
      setTotalPrice(total);
    };
    
    loadCartItems();
  }, []);

  // Update quantity of an item
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedCart = cartItems.map(item => 
      item._id === itemId ? { ...item, quantity: newQuantity } : item
    );
    
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    // Recalculate total price
    const total = updatedCart.reduce((sum, item) => sum + (Math.floor(item.price) * item.quantity), 0);
    setTotalPrice(total);
  };

  // Remove item from cart
  const removeItem = (itemId) => {
    const updatedCart = cartItems.filter(item => item._id !== itemId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    // Recalculate total price
    const total = updatedCart.reduce((sum, item) => sum + (Math.floor(item.price) * item.quantity), 0);
    setTotalPrice(total);
  };

  // Clear the entire cart
  const clearCart = () => {
    setCartItems([]);
    setTotalPrice(0);
    localStorage.removeItem('cart');
  };

  // Proceed to checkout
  const checkoutHandler = () => {
    // Check if user is logged in
    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) {
      alert('Please log in to proceed to checkout');
      navigate('/login?redirect=checkout');
      return;
    }
    
    // Navigate to checkout page
    navigate('/checkout');
  };

  return (
    <div className="cart-screen">
      <h1 className="page-title">Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <Link to="/" className="continue-shopping">Continue Shopping</Link>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item._id} className="cart-item">
                <div className="cart-item-image">
                  <img src={item.imageUrl} alt={item.name} />
                </div>
                
                <div className="cart-item-details">
                  <Link to={`/product/${item._id}`}>
                    <h3 className="cart-item-name">{item.name}</h3>
                  </Link>
                  
                  <p className="cart-item-price">₹{Math.floor(item.price)}</p>
                </div>
                
                <div className="cart-item-actions">
                  <div className="quantity-control">
                    <button 
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>
                      +
                    </button>
                  </div>
                  
                  <button 
                    className="remove-btn"
                    onClick={() => removeItem(item._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <div className="summary-row">
              <span>Total ({cartItems.reduce((a, c) => a + c.quantity, 0)} items):</span>
              <span className="total-price">₹{totalPrice}</span>
            </div>
            
            <button 
              className="checkout-btn"
              onClick={checkoutHandler}
              disabled={cartItems.length === 0}
            >
              Proceed to Checkout
            </button>
            
            <button 
              className="clear-cart-btn"
              onClick={clearCart}
            >
              Clear Cart
            </button>
            
            <Link to="/" className="continue-shopping">
              Continue Shopping
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CartScreen; 