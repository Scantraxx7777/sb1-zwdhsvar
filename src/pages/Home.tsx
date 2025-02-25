import React from 'react';
import { Link } from 'react-router-dom';
import templates from '../data/templates.json';
import { Search, Filter } from 'lucide-react';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Beautiful Website Templates
        </h1>
        <p className="text-xl mb-8">
          Find the perfect template for your next project
        </p>
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex items-center bg-white rounded-lg p-2">
            <Search className="h-5 w-5 text-gray-400 mx-2" />
            <input
              type="text"
              placeholder="Search templates..."
              className="w-full px-4 py-2 outline-none text-gray-700"
            />
            <button className="flex items-center bg-gray-100 px-4 py-2 rounded-md text-gray-700">
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </button>
          </div>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.templates.map((template) => (
            <Link
              key={template.id}
              to={`/template/${template.id}`}
              className="group"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 group-hover:transform group-hover:scale-105">
                <img
                  src={template.thumbnailUrl}
                  alt={template.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{template.name}</h3>
                  <p className="text-gray-600 mb-4">{template.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-blue-600">
                      {template.isFree ? 'Free' : `$${template.price}`}
                    </span>
                    <span className="text-sm text-gray-500">
                      {template.category}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}