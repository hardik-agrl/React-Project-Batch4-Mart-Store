import React from 'react';

const getImageUrl = (image) => {
  if (!image) {
    return 'https://via.placeholder.com/150x200?text=No+Image';
  }

  if (image.startsWith('http')) {
    return image;
  }

  return `/${image.replace(/\\/g, '/')}`;
};

const Card = ({ product }) => {
  const title = product.title || product.name || 'Untitled Product';
  const category = product.category || 'general';
  const description = product.description || 'No description available.';
  const shortDescription =
    description.length > 100
      ? `${description.substring(0, 100)}...`
      : description;

  return (
    <div className="card">
      <img
        src={getImageUrl(product.image)}
        alt={title}
        className="card-image"
      />

      <div className="card-content">
        <h3>{title}</h3>

        <p className="category">{category}</p>

        <p className="description">{shortDescription}</p>

        <h2 className="price">${Number(product.price || 0).toFixed(2)}</h2>

        <button className="buy-btn">Add to Cart</button>
      </div>
    </div>
  );
};

export default Card;
