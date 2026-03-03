import React, { useEffect } from 'react';
import eventBus from 'shared/eventBus';
import './Catalog.css';

const PRODUCTS = [
  { id: 1, name: 'Skin Dragon',    price: 15, image: '🐉' },
  { id: 2, name: 'Arme Laser',     price: 25, image: '🔫' },
  { id: 3, name: 'Cape Invisible', price: 30, image: '🧥' },
  { id: 4, name: 'Bouclier Or',    price: 20, image: '🛡️' },
  { id: 5, name: 'Potion Vitesse', price: 10, image: '⚡' },
  { id: 6, name: 'Casque Viking',  price: 18, image: '⛑️' },
];

function ProductCard({ product }) {
  const handleAddToCart = () => {
    // TODO: notifie l'eventBus que ce produit a été ajouté au panier
    // L'événement doit transmettre : id, name, price
    eventBus.emit('cart:add', {
      id: product.id,
      name: product.name,
      price: product.price,
    });
  };

  return (
    <div className="product-card">
      <div className="product-image">{product.image}</div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">{product.price} €</p>
      </div>
      <button className="add-button" onClick={handleAddToCart}>
        Ajouter au panier
      </button>
    </div>
  );
}

function Catalog() {
  useEffect(() => {
    const unsubscribe = eventBus.on('cart:add', (data) => {
      console.log('[Catalog] cart:add recu', data);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="catalog">
      <div className="catalog-header">
        <h2>Boutique</h2>
        <span className="mfe-badge">MFE</span>
      </div>
      <div className="products-grid">
        {PRODUCTS.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Catalog;
