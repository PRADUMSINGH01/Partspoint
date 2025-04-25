import React from "react";
import {
  FaQuestionCircle,
  FaHeadphones,
  FaEnvelope,
  FaSearch,
} from "react-icons/fa";

const CustomerSupportPage = () => {
  const WHATSAPP_NUMBER = "9468929392";
  return (
    <div className="bg-light min-h-screen py-12 mt-10">
      <div className="container mx-auto px-4">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-3xl font-heading text-primary font-bold mb-2">
            How can we help you today?
          </h1>
          <div className="relative w-full md:w-1/2 mx-auto">
            <input
              type="text"
              placeholder="Search our knowledge base..."
              className="w-full px-4 py-2 rounded-full border border-border focus:outline-none focus:ring-2 focus:ring-secondary"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <FaSearch className="text-neutral" />
            </div>
          </div>
        </header>

        {/* Support Options */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* FAQ Section */}
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-12 h-12 mx-auto rounded-full bg-secondary text-light flex items-center justify-center mb-3">
              <FaQuestionCircle className="text-xl" />
            </div>
            <h2 className="text-xl font-body font-semibold text-neutral mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-neutral text-sm">
              Find quick answers to common questions.
            </p>
            <a
              href="/#faq"
              className="inline-block mt-4 text-secondary hover:underline"
            >
              Browse FAQs
            </a>
          </div>

          {/* Contact Support Section */}
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-12 h-12 mx-auto rounded-full bg-accent text-light flex items-center justify-center mb-3">
              <FaHeadphones className="text-xl" />
            </div>
            <h2 className="text-xl font-body font-semibold text-neutral mb-2">
              Contact Support
            </h2>
            <p className="text-neutral text-sm">
              Need to talk to a real person? We're here to help.
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                `Hello Part point I need help `
              )}`}
              className="inline-block mt-4 text-secondary hover:underline"
            >
              Contact Us
            </a>
          </div>

          {/* Email Support Section */}
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-12 h-12 mx-auto rounded-full bg-secondary text-light flex items-center justify-center mb-3">
              <FaEnvelope className="text-xl" />
            </div>
            <h2 className="text-xl font-body font-semibold text-neutral mb-2">
              Email Support
            </h2>
            <p className="text-neutral text-sm">
              Send us an email and we'll get back to you.
            </p>
            <a
              href="mailto:support@example.com"
              className="inline-block mt-4 text-secondary hover:underline"
            >
              Email Us
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CustomerSupportPage;
