import React from "react";

const Offer = () => {
  return (
    <section className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 py-20 px-6 text-white overflow-hidden">
      {/* Decorative Background Overlay */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/dark-mosaic.png')]"></div>

      <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* Text Section */}
        <div className="text-center md:text-left space-y-5 md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight drop-shadow-md">
            Exclusive <span className="text-yellow-400">Offers</span> For You
          </h1>
          <p className="text-lg text-blue-100 tracking-wide">
            Only on our <span className="font-semibold text-white">Best Seller</span> products!
          </p>
          <button className="mt-6 px-8 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-md shadow-lg hover:bg-yellow-300 hover:scale-105 active:scale-95 transition-all duration-200">
            Check Now
          </button>
        </div>

        {/* Image Section */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80"
            alt="Exclusive Offers"
            className="w-80 md:w-[28rem] drop-shadow-2xl rounded-xl hover:scale-105 transition-transform duration-300"
          />
        </div>

      </div>
    </section>
  );
};

export default Offer;
