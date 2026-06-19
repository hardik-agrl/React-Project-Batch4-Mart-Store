import React from 'react';

const Card = ({ product }) => {
  return (
    <div className="card">
      <img
        src={product.image}
        alt={product.title}
        className="card-image"
      />

      <div className="card-content">
        <h3>{product.title}</h3>

        <p className="category">{product.category}</p>

        <p className="description">
          {product.description.substring(0, 100)}...
        </p>

        <h2 className="price">${product.price}</h2>

        <button className="buy-btn">Add to Cart</button>
      </div>
    </div>
  );
};

export default Card;