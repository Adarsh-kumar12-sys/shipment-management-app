
import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faProjectDiagram, faCalculator, faSave, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import bgImage from "../assets/bg.png";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="font-sans antialiased bg-gray-50 min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <div
        className="relative h-screen bg-cover bg-center text-white flex flex-col justify-center items-center px-6 py-20 overflow-hidden"
        style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)), url(${bgImage})` }}
      >




        <div className="relative z-10 flex flex-col justify-center items-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-center drop-shadow-2xl">
            Shipment Management App
          </h1>
          <p className="text-lg md:text-xl max-w-3xl text-center mb-8 drop-shadow-xl">
            Manage your shipments efficiently. Track, update, and organize all your shipments in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>

      {/* What It Offers Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-white text-gray-800 text-center">
        <h2 className="text-4xl font-bold mb-12 text-gray-900">What It Offers</h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 text-left">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-4 text-blue-700">
              <FontAwesomeIcon icon={faProjectDiagram} className="mr-3" />
              Shipment Tracking
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Track your shipments in real-time and get updates on their status.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-4 text-green-700">
              <FontAwesomeIcon icon={faCalculator} className="mr-3" />
              Cost Calculation
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Automatically calculate shipping costs, including fragile fees.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-4 text-purple-700">
              <FontAwesomeIcon icon={faSave} className="mr-3" />
              Shipment History
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Securely store all your shipment details and access them anytime.
            </p>
          </div>
        </div>
      </section>

      {/* How to Get Started Section */}
      <section className="py-20 px-6 bg-gradient-to-tl from-white to-gray-50 text-gray-800 text-center">
        <h2 className="text-4xl font-bold mb-12 text-gray-900">How to Get Started</h2>
        <div className="max-w-5xl mx-auto space-y-12 text-left">
          <div className="flex items-start bg-gray-100 p-6 rounded-lg shadow-md">
            <span className="text-3xl font-bold text-blue-600 mr-4">1.</span>
            <div>
              <h4 className="text-xl font-semibold mb-2 text-gray-900">Sign Up / Login</h4>
              <p className="text-gray-700">Begin by creating a free account or logging in to access your shipment dashboard.</p>
            </div>
          </div>
          <div className="flex items-start bg-gray-100 p-6 rounded-lg shadow-md">
            <span className="text-3xl font-bold text-blue-600 mr-4">2.</span>
            <div>
              <h4 className="text-xl font-semibold mb-2 text-gray-900">Add a Shipment</h4>
              <p className="text-gray-700">Use the intuitive form to add new shipments with all the necessary details.</p>
            </div>
          </div>
          <div className="flex items-start bg-gray-100 p-6 rounded-lg shadow-md">
            <span className="text-3xl font-bold text-blue-600 mr-4">3.</span>
            <div>
              <h4 className="text-xl font-semibold mb-2 text-gray-900">Manage Your Shipments</h4>
              <p className="text-gray-700">View, edit, and delete your shipments from your personalized dashboard.</p>
            </div>
          </div>
        </div>
        <button
            onClick={() => navigate("/register")}
            className="mt-12 bg-indigo-600 hover:bg-indigo-700 px-10 py-4 rounded-lg font-bold text-white text-xl transition-all duration-300 transform hover:scale-105 shadow-xl"
          >
            Get Started Now <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
          </button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 text-gray-700 py-6 px-4 sm:px-8 text-sm flex flex-col sm:flex-row justify-between items-center border-t border-gray-200">
        <span className="mb-2 sm:mb-0 text-gray-500">
          &copy; {new Date().getFullYear()} Shipment Management App. All rights reserved.
        </span>
        <span className="text-gray-600 font-medium">
          Built by <a href="https://codolio.com/profile/LearnerAdarsh" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-500 transition-colors duration-200">Adarsh Kumar</a> &middot; DTU &middot; 2026
        </span>
      </footer>
    </div>
  );
};

export default HomePage;
