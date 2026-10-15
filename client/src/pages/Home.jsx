import React from 'react';
import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <div className="flex flex-col items-center">
      
      {/* Hero Section */}
      <div className="w-full bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 text-white py-24 px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
          Your AI Legal Assistant
        </h1>
        <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-10 leading-relaxed">
          Upload documents, ask legal questions, and get precise, AI-powered analysis backed by Indian case laws in seconds.
        </p>
        <div className="flex justify-center gap-4">
          <Link 
            to="/analyze" 
            className="bg-white text-blue-700 font-bold px-8 py-4 rounded-full shadow-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300"
          >
            Start Analysis
          </Link>
          <Link 
            to="/history" 
            className="bg-transparent border-2 border-white text-white font-bold px-8 py-4 rounded-full hover:bg-white/10 transition-all duration-300"
          >
            View Past Cases
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="w-full max-w-6xl mx-auto py-20 px-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="text-4xl mb-4">📄</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">1. Input Details</h3>
            <p className="text-gray-600">Type your legal query or upload PDF case files directly into our system.</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="text-4xl mb-4">🧠</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">2. AI Processing</h3>
            <p className="text-gray-600">Our RAG engine searches thousands of past cases to find the most relevant parallels.</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="text-4xl mb-4">⚖️</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">3. Get Results</h3>
            <p className="text-gray-600">Receive structured guidance, legal provisions, and a summarized similarity score.</p>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Home;
