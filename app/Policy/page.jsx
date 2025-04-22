import React from "react";

const page = () => {
  return (
    <div className="bg-light py-12 mt-10">
      <div className="container mx-auto px-4">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-heading text-primary font-bold mb-2">
            Our Policies
          </h1>
          <p className="text-neutral text-lg">
            Please take a moment to review our policies.
          </p>
        </header>

        {/* Privacy Policy Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-heading text-primary font-semibold mb-4">
            Privacy Policy
          </h2>
          <p className="text-neutral leading-relaxed mb-4">
            This Privacy Policy describes how we collect, use, and share your
            personal information when you use our services. We are committed to
            protecting your privacy and ensuring the security of your
            information.
          </p>
          <ul className="list-disc list-inside text-neutral mb-4">
            <li>Information We Collect</li>
            <li>How We Use Your Information</li>
            <li>Sharing Your Information</li>
            <li>Your Rights and Choices</li>
            <li>Data Security</li>
            <li>Changes to This Policy</li>
          </ul>
          <a
            href="/privacy-policy" // Replace with the actual link to your full privacy policy
            className="text-secondary hover:underline"
          >
            Read our full Privacy Policy
          </a>
        </section>

        {/* Terms of Service Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-heading text-primary font-semibold mb-4">
            Terms of Service
          </h2>
          <p className="text-neutral leading-relaxed mb-4">
            These Terms of Service govern your use of our website and services.
            By accessing or using our services, you agree to be bound by these
            terms. Please read them carefully.
          </p>
          <ul className="list-disc list-inside text-neutral mb-4">
            <li>Acceptance of Terms</li>
            <li>User Conduct</li>
            <li>Intellectual Property</li>
            <li>Disclaimer of Warranties</li>
            <li>Limitation of Liability</li>
            <li>Governing Law</li>
          </ul>
          <a
            href="/terms-of-service" // Replace with the actual link to your full terms of service
            className="text-secondary hover:underline"
          >
            Read our full Terms of Service
          </a>
        </section>

        {/* Shipping Policy Section (Example - Adapt as needed) */}
        <section className="mb-10">
          <h2 className="text-2xl font-heading text-primary font-semibold mb-4">
            Shipping Policy
          </h2>
          <p className="text-neutral leading-relaxed mb-4">
            This Shipping Policy outlines our procedures for the shipment of
            your orders. Please review this policy to understand our shipping
            methods, costs, and delivery times.
          </p>
          <ul className="list-disc list-inside text-neutral mb-4">
            <li>Shipping Costs</li>
            <li>Delivery Times</li>
            <li>Shipping Methods</li>
            <li>Order Processing</li>
            <li>Tracking Your Order</li>
          </ul>
          <a
            href="/shipping-policy" // Replace with the actual link to your full shipping policy
            className="text-secondary hover:underline"
          >
            Read our full Shipping Policy
          </a>
        </section>

        {/* Return Policy Section (Example - Adapt as needed) */}
        <section className="mb-10">
          <h2 className="text-2xl font-heading text-primary font-semibold mb-4">
            Return Policy
          </h2>
          <p className="text-neutral leading-relaxed mb-4">
            Our Return Policy provides information about returning products
            purchased from us. We strive to ensure your satisfaction with every
            purchase.
          </p>
          <ul className="list-disc list-inside text-neutral mb-4">
            <li>Eligibility for Returns</li>
            <li>Return Process</li>
            <li>Refunds</li>
            <li>Exchanges</li>
            <li>Non-Returnable Items</li>
          </ul>
          <a
            href="/return-policy" // Replace with the actual link to your full return policy
            className="text-secondary hover:underline"
          >
            Read our full Return Policy
          </a>
        </section>
      </div>
    </div>
  );
};

export default page;
