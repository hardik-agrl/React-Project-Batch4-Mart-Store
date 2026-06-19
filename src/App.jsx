import React, { useState, useEffect } from 'react';
import Card from './Card';

const App = () => {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
      })
      .catch((error) => console.log(error));
  }, []);

  // Get unique categories
  const categories = [
    'all',
    ...new Set(items.map((item) => item.category)),
  ];

  // Filter products
  const filteredItems =
    selectedCategory === 'all'
      ? items
      : items.filter(
          (item) => item.category === selectedCategory
        );

  return (
    <div>
      <h1>Mart Store</h1>

      {/* Category Dropdown */}
      <div className="filter-container">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-select"
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      {/* Products */}
      <div className="container">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <Card key={item.id} product={item} />
          ))
        ) : (
          <h2>No Products Found</h2>
        )}
      </div>
    </div>
  );
};

export default App;