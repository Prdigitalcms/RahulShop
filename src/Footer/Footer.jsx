import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
        
        {/* Brand Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png"
              alt="Brand Logo"
              className="w-12 h-12 object-contain"
            />
            <h2 className="text-2xl font-bold text-white">BrandName</h2>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Discover the latest trends and exclusive offers with BrandName.
            We bring style and quality right to your doorstep.
          </p>
        </div>

        {/* Links Section */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li className="hover:text-yellow-400 transition">About</li>
            <li className="hover:text-yellow-400 transition">Products</li>
            <li className="hover:text-yellow-400 transition">Offers</li>
            <li className="hover:text-yellow-400 transition">Contact</li>
            <li className="hover:text-yellow-400 transition">Company</li>
            <li className="hover:text-yellow-400 transition">Offices</li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex items-center justify-center md:justify-start gap-5">
            {/* Instagram */}
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/174/174855.png"
                alt="Instagram"
                className="w-7 h-7"
              />
            </a>
            {/* Facebook */}
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
                alt="Facebook"
                className="w-7 h-7"
              />
            </a>
            {/* YouTube */}
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png"
                alt="YouTube"
                className="w-8 h-8"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} BrandName. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
