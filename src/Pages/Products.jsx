import React, { useState, useEffect } from 'react';
import Card from '../Card';

const API_BASE = '/api/v1';

const Products = () => {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await fetch(`${API_BASE}/all/products`);

      if (!response.ok) {
        throw new Error('Failed to load products');
      }

      const data = await response.json();
      setItems(data.products || []);
    } catch (err) {
      setError(err.message || 'Could not connect to the store backend');
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const seedProducts = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await fetch(`${API_BASE}/seed/products`, {
        method: 'POST'
      });

      if (!response.ok) {
        throw new Error('Failed to seed products');
      }

      await fetchProducts();
    } catch (err) {
      setError(err.message || 'Could not seed products');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const categories = [
    'all',
    ...new Set(items.map((item) => item.category || 'general')),
  ];

  const filteredItems =
    selectedCategory === 'all'
      ? items
      : items.filter(
          (item) => (item.category || 'general') === selectedCategory
        );

  return (
    <div>
      <h1>Mart Store</h1>

      <div className="filter-container">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-select"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      {loading && <p className="status-message">Loading products...</p>}
      {error && <p className="status-message error">{error}</p>}

      <div className="container">
        {!loading && filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <Card key={item._id || item.id} product={item} />
          ))
        ) : (
          !loading && (
            <div className="empty-state">
              <h2>No Products Found</h2>
              <p>Start the backend and add products to your database.</p>
              <button className="buy-btn" onClick={seedProducts}>
                Load Sample Products
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
  
}

export default Products
