import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductService } from '../services/api';
import './ProductScreen.css';

const ProductScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await ProductService.getProductById(id);
        setProduct(data);
        setLoading(false);
      } catch (error) {
        setError(error.toString());
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const addToCartHandler = () => {
    // Get existing cart from localStorage or initialize empty array
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if product is already in cart
    const existingItem = cart.find(item => item._id === product._id);
    
    if (existingItem) {
      // Update quantity if product already exists
      existingItem.quantity += quantity;
    } else {
      // Add new item to cart
      cart.push({
        _id: product._id,
        name: product.name,
        price: Math.floor(product.price),
        imageUrl: product.imageUrl,
        quantity
      });
    }
    
    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Navigate to cart page
    navigate('/cart');
  };

  const goBack = () => {
    navigate(-1);
  };

  if (loading) {
    return <div className="loading">Loading product details...</div>;
  }

  if (error) {
    return <div className="error alert alert-danger">{error}</div>;
  }

  if (!product) {
    return <div className="error alert alert-danger">Product not found</div>;
  }

  return (
    <div className="product-screen">
      <button className="back-button" onClick={goBack}>
        <i className="fas fa-arrow-left"></i> Back
      </button>
      
      <div className="product-details">
        <div className="product-image-container">
          <img src={product.imageUrl} alt={product.name} className="product-image" />
        </div>
        
        <div className="product-info">
          <h1 className="product-name">{product.name}</h1>
          
          <div className="product-meta">
            <span className="badge badge-primary">{product.category}</span>
            <div className="product-stock">
              <span className={`badge ${product.countInStock > 0 ? 'badge-primary' : 'badge-danger'}`}>
                {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
          </div>
          
          <div className="product-price">₹{Math.floor(product.price)}</div>
          
          <div className="product-description">{product.description}</div>
          
          {product.countInStock > 0 && (
            <div className="product-actions">
              <div className="quantity-control">
                <label htmlFor="quantity">Quantity:</label>
                <select 
                  id="quantity" 
                  value={quantity} 
                  onChange={handleQuantityChange}
                >
                  {[...Array(Math.min(product.countInStock, 10)).keys()].map(x => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>
              
              <button 
                className="add-to-cart-btn"
                onClick={addToCartHandler}
                disabled={product.countInStock === 0}
              >
                <i className="fas fa-shopping-cart"></i> Add to Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductScreen; 