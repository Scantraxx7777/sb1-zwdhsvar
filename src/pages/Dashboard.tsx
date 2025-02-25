import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Download } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import templates from '../data/templates.json';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!user) {
    navigate('/login');
    return null;
  }

  const purchasedTemplates = templates.templates.filter(template => 
    user.purchasedTemplates.includes(template.id)
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">My Templates</h1>

      {purchasedTemplates.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            No templates yet
          </h2>
          <p className="text-gray-600 mb-6">
            You haven't purchased any templates yet.
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Browse Templates
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {purchasedTemplates.map(template => (
            <div key={template.id} className="bg-white rounded-lg shadow overflow-hidden">
              <img
                src={template.thumbnailUrl}
                alt={template.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {template.name}
                </h3>
                <p className="text-gray-600 mb-4">{template.description}</p>
                <a
                  href={template.downloadUrl}
                  className="flex items-center justify-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                >
                  <Download className="h-5 w-5" />
                  <span>Download</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}