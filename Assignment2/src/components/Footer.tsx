import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo / About Section */}
        <div>
          <h2 className="text-xl font-bold text-white mb-3">MyWebsite</h2>
          <p className="text-sm">
            Building modern web applications with React and Tailwind CSS.  
            Follow us for updates and tutorials!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
            <li><a href="#" className="hover:text-white transition-colors">About</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Services</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
          </ul>
        </div>

        {/* Contact / Social Section */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Connect With Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white"><i className="fab fa-facebook"></i> Facebook</a>
            <a href="#" className="hover:text-white"><i className="fab fa-twitter"></i> Twitter</a>
            <a href="#" className="hover:text-white"><i className="fab fa-instagram"></i> Instagram</a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center text-sm text-gray-500 mt-8 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} MyWebsite. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

