import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Shield, Monitor, Download, ShoppingCart } from 'lucide-react';
import templates from '../data/templates.json';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function TemplateDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart } = useCart();

  const template = templates.templates.find(t => t.id === id);

  if (!template) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-gray-800">Template not found</h2>
        <button
          onClick={() => navigate('/')}
          className="mt-4 text-blue-600 hover:text-blue-800"
        >
          Return to Home
        </button>
      </div>
    );
  }

  const handlePurchase = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (template.isFree) {
      // Handle free template download
      window.location.href = template.downloadUrl;
    } else {
      addToCart(template.id);
      navigate('/cart');
    }
  };

  const hasPurchased = user?.purchasedTemplates.includes(template.id);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Preview Section */}
        <div className="space-y-6">
          <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
            <img
              src={template.previewUrl}
              alt={template.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Features</h3>
            <ul className="grid grid-cols-2 gap-4">
              {template.features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-green-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Details Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {template.name}
            </h1>
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-2xl font-bold text-blue-600">
                {template.isFree ? 'Free' : `$${template.price}`}
              </span>
              <span className="px-3 py-1 bg-gray-100 rounded-full text-gray-600">
                {template.category}
              </span>
            </div>
            <p className="text-gray-600 mb-6">{template.description}</p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <Monitor className="h-5 w-5" />
                <span>Fully Responsive Design</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Download className="h-5 w-5" />
                <span>Instant Download</span>
              </div>
            </div>

            {hasPurchased ? (
              <a
                href={template.downloadUrl}
                className="mt-8 w-full bg-green-500 text-white py-3 px-6 rounded-lg flex items-center justify-center space-x-2 hover:bg-green-600 transition duration-200"
              >
                <Download className="h-5 w-5" />
                <span>Download Template</span>
              </a>
            ) : (
              <button
                onClick={handlePurchase}
                className="mt-8 w-full bg-blue-600 text-white py-3 px-6 rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-700 transition duration-200"
              >
                {template.isFree ? (
                  <>
                    <Download className="h-5 w-5" />
                    <span>Download Free</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-5 w-5" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>
            )}
          </div>

          {/* Technical Details */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Technical Details</h3>
            <div className="space-y-3 text-gray-600">
              <p>• Built with modern technologies</p>
              <p>• Responsive design for all devices</p>
              <p>• Well-documented code</p>
              <p>• Regular updates</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}