import React from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, BookOpen, MessageCircle, Bell, Flame } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">

      {/* WELCOME BANNER */}
      <section className="bg-emerald-600 rounded-3xl p-8 text-white shadow-lg flex flex-col md:flex-row justify-between items-center bg-gradient-to-r from-emerald-600 to-teal-500">
        <div className="space-y-2 mb-4 md:mb-0">
          <h1 className="text-3xl font-bold">Welcome back, User! 👋</h1>
          <p className="text-emerald-100">Find and reserve your essential medications easily today.</p>
        </div>
        <button
          className="bg-white text-emerald-700 px-6 py-3 rounded-xl font-bold shadow-md hover:bg-emerald-50 transition-colors"
          onClick={() => navigate("/civilian/reservation")}
        >
          Reserve your medicine
        </button>
      </section>

      {/* DASHBOARD CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT GROUP */}
        <div className="lg:col-span-2 space-y-6">

          <div
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-between h-48"
            onClick={() => navigate("/civilian/find-pharmacy")}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-slate-800">Pharmacies Nearby</h3>
                <p className="text-gray-500 mt-1">Open now in your area</p>
              </div>
              <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                <MapPin size={24} />
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold text-slate-900">12</div>
            </div>
            <div className="text-sm font-medium text-emerald-600 flex items-center gap-1">
              View Map <span>→</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer h-40 flex flex-col justify-between"
            // onClick={() => navigate("/civilian/drug-dictionary")} // Feature not yet implemented
            >
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-slate-800">Drug Dictionary</h3>
                <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                  <BookOpen size={20} />
                </div>
              </div>
              <p className="text-sm text-gray-500">Search & learn about medicines.</p>
              <div className="text-sm font-medium text-emerald-600">Start Searching →</div>
            </div>

            <div
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer h-40 flex flex-col justify-between"
              onClick={() => navigate("/civilian/inquiries")}
            >
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-slate-800">My Inquiries</h3>
                <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
                  <MessageCircle size={20} />
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">3</div>
                <p className="text-xs text-gray-500">Pending responses</p>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT GROUP */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate("/civilian/notifications")}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-800">Notifications</h3>
              <Bell size={20} className="text-gray-400" />
            </div>
            <p className="text-sm text-gray-500">You have no new notifications.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-800">Popular Medicines</h3>
              <Flame size={20} className="text-orange-500" />
            </div>
            <ul className="space-y-3">
              <li className="flex justify-between text-sm">
                <span className="text-gray-600">Panadol</span>
                <span className="font-medium text-emerald-600">High Demand</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-gray-600">Vitamin C</span>
                <span className="font-medium text-emerald-600">Trending</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HomePage;
