import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import templates from '../data/templates.json';

export default function Cart() {
  const navigate = useNavigate();
  const { items, removeFromCart } = useCart();
  const { user } = useAuth();

  const cartItems = items.map(item => {
    const template = templates.templates.find(t => t.id === item.templateId);
    return {
      ...item,
      template
    };
  }).filter(item => item.template);

  const total = cartItems.reduce((sum, item) => {
    return sum + (item.template?.price || 0) * item.quantity;
  }, 0);

  const handleCheckout = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <ShoppingCart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">
          Looks like you haven't added any templates to your cart yet.
        </p>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Browse Templates
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="divide-y divide-gray-200">
          {cartItems.map(item => (
            <div key={item.templateId} className="p-6 flex items-center">
              <img
                src={item.template?.thumbnailUrl}
                alt={item.template?.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="ml-6 flex-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.template?.name}
                </h3>
                <p className="text-gray-600">{item.template?.category}</p>
              </div>
              <div className="ml-6">
                <p className="text-lg font-bold text-gray-900">
                  ${item.template?.price}
                </p>
              </div>
              <button
                onClick={() => removeFromCart(item.templateId)}
                className="ml-6 text-gray-400 hover:text-red-500"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
        
        <div className="bg-gray-50 p-6">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-900">Total</span>
            <span className="text-2xl font-bold text-gray-900">${total}</span>
          </div>
          <button
            onClick={handleCheckout}
            className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}