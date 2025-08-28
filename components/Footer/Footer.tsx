// components/Footer.tsx
import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Link from "next/link";
const Footer = () => {
  return (
    <footer className="bg-stone-900  py-10 md:py-12 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Us Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">About Us</h3>
            <p className="text-sm leading-relaxed">
              Parts Point is your trusted source for high-quality car parts,
              exceptional service, and a comprehensive product selection.
            </p>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact</h3>
            <ul className="text-sm">
              <li className="flex items-center gap-2">
                <FaMapMarkerAlt className="w-4 h-4 text-secondary" />
                <span className="leading-relaxed">
                  Plot-9 Shyam Nagar, Tonk Rd, opp. Lal bagh, Bilwa, Jaipur,
                  Rajasthan 302022
                </span>
              </li>
              <li className="flex items-center gap-2">
                <FaPhone className="w-4 h-4 text-secondary" />
                <span>+91 9251129392</span>
              </li>
              <li className="flex items-center gap-2">
                <FaEnvelope className="w-4 h-4 text-secondary" />
                <span className="leading-relaxed">info@partspoint.com</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="text-sm">
              <li>
                <Link
                  href="/"
                  className="hover:text-secondary transition-colors duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <a
                  href="#parts"
                  className="hover:text-secondary transition-colors duration-200"
                >
                  Parts
                </a>
              </li>
              <li>
                <a
                  href="/About-Us"
                  className="hover:text-secondary transition-colors duration-200"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/Customer-Support"
                  className="hover:text-secondary transition-colors duration-200"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-gray-400 hover:text-secondary transition-colors duration-200"
                aria-label="Facebook"
              >
                <FaFacebook className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-secondary transition-colors duration-200"
                aria-label="Twitter"
              >
                <FaTwitter className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-secondary transition-colors duration-200"
                aria-label="Instagram"
              >
                <FaInstagram className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-secondary transition-colors duration-200"
                aria-label="YouTube"
              >
                <FaYoutube className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-gray-700 text-center text-sm">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Parts Point. All rights reserved.
          </p>
          <p>
            <a
              href="/Policy"
              className="text-secondary hover:underline transition-colors duration-200"
            >
              Privacy Policy
            </a>{" "}
            |{" "}
            <a
              href="/Term-and-Conditions"
              className="text-secondary hover:underline transition-colors duration-200"
            >
              Terms of Service
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
