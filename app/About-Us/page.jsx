import React from "react";
import { FaMapMarkerAlt, FaClock, FaCheckCircle } from "react-icons/fa";

const page = () => {
  return (
    <div className="bg-light py-12 mt-10">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="text-center mb-10">
          <h1 className="text-3xl font-heading text-primary font-bold mb-4">
            About Parts Point
          </h1>
          <p className="text-neutral text-lg leading-relaxed">
            Your trusted source for quality auto parts in Jaipur, Rajasthan.
          </p>
        </section>

        {/* Our Story */}
        <section className="mb-10">
          <h2 className="text-2xl font-heading text-primary font-semibold mb-4">
            Our Journey
          </h2>
          <p className="text-neutral leading-relaxed mb-4">
            At Parts Point, we're passionate about providing reliable and
            high-quality auto parts to meet the diverse needs of our customers
            in Jaipur and beyond. Established with a vision to simplify the
            process of finding the right parts, we've grown to become a trusted
            name in the automotive aftermarket.
          </p>
          <p className="text-neutral leading-relaxed mb-4">
            Located conveniently at **Plot-9 Shyam Nagar, Tonk Rd, opp. Lal
            bagh, Bilwa, Jaipur, Rajasthan 302022**, we are committed to serving
            our local community with expertise and dedication. Our team brings
            years of experience in the auto parts industry, ensuring that you
            receive the right guidance and the perfect components for your
            vehicle.
          </p>
          <p className="text-neutral leading-relaxed">
            We believe in building lasting relationships with our customers,
            driven by transparency, integrity, and a genuine desire to help you
            keep your vehicles running smoothly.
          </p>
        </section>

        {/* Our Values */}
        <section className="mb-10">
          <h2 className="text-2xl font-heading text-primary font-semibold mb-4">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="w-10 h-10 rounded-full bg-secondary text-light flex items-center justify-center mb-3">
                <FaCheckCircle className="text-xl" />
              </div>
              <h3 className="font-body font-semibold text-neutral mb-2">
                Quality Assurance
              </h3>
              <p className="text-neutral text-sm">
                We source parts from reputable manufacturers, ensuring
                durability and performance.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="w-10 h-10 rounded-full bg-accent text-light flex items-center justify-center mb-3">
                <FaClock className="text-xl" />
              </div>
              <h3 className="font-body font-semibold text-neutral mb-2">
                Reliable Service
              </h3>
              <p className="text-neutral text-sm">
                We are committed to providing timely and efficient service to
                all our customers.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="w-10 h-10 rounded-full bg-secondary text-light flex items-center justify-center mb-3">
                <FaMapMarkerAlt className="text-xl" />
              </div>
              <h3 className="font-body font-semibold text-neutral mb-2">
                Local Expertise
              </h3>
              <p className="text-neutral text-sm">
                Located in Jaipur, we understand the specific needs of the local
                automotive market.
              </p>
            </div>
            {/* You can add more value propositions here */}
          </div>
        </section>

        {/* Our Location */}
        <section className="mb-10">
          <h2 className="text-2xl font-heading text-primary font-semibold mb-4">
            Visit Us
          </h2>
          <p className="text-neutral leading-relaxed mb-2">
            You can find us at:
          </p>
          <p className="text-secondary font-semibold">
            Plot-9 Shyam Nagar, Tonk Rd, opp. Lal bagh, Bilwa,
          </p>
          <p className="text-secondary font-semibold mb-4">
            Jaipur, Rajasthan 302022
          </p>
          {/* You could embed a Google Maps iframe here if you like */}
          {/* <div className="rounded-md overflow-hidden shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.422747838998!2d75.80797867523634!3d26.84358577665858!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4c189b9b9b9b%3A0x9e6b3c7c8c8c8c8c!2sPlot-9%2C%20Shyam%20Nagar%2C%20Tonk%20Rd%2C%20opp.%20Lal%20bagh%2C%20Bilwa%2C%20Jaipur%2C%20Rajasthan%20302022!5e0!3m2!1sen!2sin!4v16xxxxxxxxxxxxx"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div> */}
        </section>

        {/* Call to Action (Optional) */}
        <section className="text-center py-8">
          <p className="text-neutral text-lg mb-4">
            Have any questions? Feel free to reach out or visit us!
          </p>
          <a
            href="/Customer-Support"
            className="inline-block bg-secondary text-light py-3 px-6 rounded-full font-semibold hover:bg-accent focus:outline-none focus:ring-2 focus:ring-secondary"
          >
            Contact Us
          </a>
        </section>
      </div>
    </div>
  );
};

export default page;
