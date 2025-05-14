import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`}>
        <img src={product.imageUrl} alt={product.name} className="product-image" />
      </Link>
      
      <div className="product-info">
        <Link to={`/product/${product._id}`}>
          <h3 className="product-name">{product.name}</h3>
        </Link>
        
        <div className="product-category">
          <span className="badge badge-primary">{product.category}</span>
        </div>
        
        <p className="product-price">₹{Math.floor(product.price)}</p>
        
        <p className="product-description">
          {product.description.length > 100
            ? `${product.description.substring(0, 100)}...`
            : product.description}
        </p>
        
        <div className="product-stock">
          <span className={`badge ${product.countInStock > 0 ? 'badge-primary' : 'badge-danger'}`}>
            {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
        
        <Link to={`/product/${product._id}`} className="view-btn">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard; 