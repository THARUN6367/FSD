import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { OrderService } from '../services/api';
import './CheckoutScreen.css';

const CheckoutScreen = () => {
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart') 
      ? JSON.parse(localStorage.getItem('cart')) 
      : [];
    setCart(savedCart);
    
    // Calculate total
    const total = savedCart.reduce(
      (sum, item) => sum + Math.floor(item.price) * item.quantity, 
      0
    );
    setCartTotal(total);

    // Add Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Format cart items for the order
    const orderItems = cart.map(item => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      image: item.imageUrl,
      product: item._id
    }));
    
    try {
      // Create order in the database
      const order = await OrderService.createOrder({
        orderItems,
        shippingAddress,
        paymentMethod: 'Razorpay',
        totalPrice: cartTotal
      });
      
      // Proceed to payment
      payNow(order._id);
    } catch (error) {
      console.error('Error creating order:', error);
      alert('There was an error processing your order. Please try again.');
    }
  };

  const payNow = (orderId) => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const totalAmount = cartTotal * 100; // Convert to the smallest currency unit
    const options = {
      key: "rzp_test_qq2soTVNJR4ac2", // Replace with your actual Razorpay API key
      amount: totalAmount,
      currency: "INR",
      name: "E-Shop",
      description: "Purchase Payment",
      handler: async function (response) {
        // Handle successful payment
        console.log(response);
        
        try {
          // Update order as paid
          await OrderService.updateOrderToPaid(orderId, {
            id: response.razorpay_payment_id,
            status: 'completed',
            update_time: new Date().toISOString(),
            email_address: JSON.parse(localStorage.getItem('userInfo')).email
          });
          
          showSuccessMessage();
          
          // Clear cart after successful payment
          localStorage.setItem('cart', JSON.stringify([]));
          
          // Redirect to success page or home
          setTimeout(() => {
            navigate('/');
          }, 3000);
        } catch (error) {
          console.error('Error updating payment status:', error);
          alert('Payment was successful, but there was an issue updating your order. Our team will contact you shortly.');
        }
      },
      prefill: {
        name: shippingAddress.fullName,
        email: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).email : '',
        contact: ""
      },
      theme: {
        color: "#2874f0"
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const showSuccessMessage = () => {
    const successDiv = document.createElement('div');
    successDiv.className = 'payment-success';
    successDiv.innerHTML = `
      <div class="success-message">
        <h2>Payment Successful!</h2>
        <p>Your order has been placed successfully.</p>
        <p>You will be redirected to the home page shortly.</p>
      </div>
    `;
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
      document.body.removeChild(successDiv);
    }, 3000);
  };

  return (
    <div className="checkout-screen">
      <div className="checkout-container">
        <h1>Checkout</h1>
        
        <div className="checkout-grid">
          <div className="shipping-details">
            <h2>Shipping Information</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={shippingAddress.fullName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={shippingAddress.address}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={shippingAddress.city}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="postalCode">Postal Code</label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={shippingAddress.postalCode}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={shippingAddress.country}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <button type="submit" className="btn-primary">
                Proceed to Payment
              </button>
            </form>
          </div>
          
          <div className="order-summary">
            <h2>Order Summary</h2>
            <div className="cart-items">
              {cart.map((item, index) => (
                <div key={index} className="cart-item">
                  <img src={item.imageUrl} alt={item.name} />
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ₹{Math.floor(item.price)}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="cart-total">
              <p><strong>Total: ₹{cartTotal}</strong></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutScreen; 