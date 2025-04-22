import React from "react";

const page = () => {
  return (
    <div className="bg-light py-12 md:mt-10">
      <div className="container mx-auto px-4">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-heading text-primary font-bold mb-2">
            Terms and Conditions
          </h1>
          <p className="text-neutral text-lg">
            Please read these Terms and Conditions carefully before using our
            services.
          </p>
        </header>

        {/* Acceptance of Terms */}
        <section className="mb-10">
          <h2 className="text-2xl font-heading text-primary font-semibold mb-4">
            1. Acceptance of Terms
          </h2>
          <p className="text-neutral leading-relaxed mb-4">
            By accessing or using our website, applications, and services
            (collectively, the "Services"), you agree to be bound by these Terms
            and Conditions ("Terms"). If you do not agree to all of these Terms,
            then you are expressly prohibited from using the Services and you
            must discontinue use immediately.
          </p>
        </section>

        {/* User Conduct */}
        <section className="mb-10">
          <h2 className="text-2xl font-heading text-primary font-semibold mb-4">
            2. User Conduct
          </h2>
          <p className="text-neutral leading-relaxed mb-4">
            You agree to use the Services only for lawful purposes and in a
            manner that does not infringe the rights of, restrict, or inhibit
            anyone else's use and enjoyment of the Services. Prohibited behavior
            includes, but is not limited to:
          </p>
          <ul className="list-disc list-inside text-neutral mb-4">
            <li>Harassing or defaming others.</li>
            <li>Transmitting obscene or offensive content.</li>
            <li>Attempting to gain unauthorized access to our systems.</li>
            <li>Violating any applicable laws or regulations.</li>
            <li>Interfering with the operation of the Services.</li>
          </ul>
        </section>

        {/* Intellectual Property */}
        <section className="mb-10">
          <h2 className="text-2xl font-heading text-primary font-semibold mb-4">
            3. Intellectual Property
          </h2>
          <p className="text-neutral leading-relaxed mb-4">
            The content, features, and functionality of the Services, including
            but not limited to text, graphics, logos, images, and software, are
            the exclusive property of [Your Company Name] or its licensors and
            are protected by copyright, trademark, and other intellectual
            property laws.
          </p>
          <p className="text-neutral leading-relaxed mb-4">
            You are granted a limited, non-exclusive, non-transferable,
            revocable license to access and use the Services for your personal,
            non-commercial use. Any other use, including reproduction,
            modification, distribution, transmission, republication, display, or
            performance, without the prior written consent of [Your Company
            Name], is strictly prohibited.
          </p>
        </section>

        {/* Disclaimer of Warranties */}
        <section className="mb-10">
          <h2 className="text-2xl font-heading text-primary font-semibold mb-4">
            4. Disclaimer of Warranties
          </h2>
          <p className="text-neutral leading-relaxed mb-4">
            THE SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS
            WITHOUT ANY WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
            BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
            PARTICULAR PURPOSE, AND NON-INFRINGEMENT. [Your Company Name] DOES
            NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED, ERROR-FREE,
            SECURE, OR FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.
          </p>
        </section>

        {/* Limitation of Liability */}
        <section className="mb-10">
          <h2 className="text-2xl font-heading text-primary font-semibold mb-4">
            5. Limitation of Liability
          </h2>
          <p className="text-neutral leading-relaxed mb-4">
            TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL
            [Your Company Name], ITS AFFILIATES, OFFICERS, DIRECTORS, EMPLOYEES,
            AGENTS, SUPPLIERS, OR LICENSORS BE LIABLE FOR ANY INDIRECT,
            PUNITIVE, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES,
            INCLUDING WITHOUT LIMITATION DAMAGES FOR LOSS OF PROFITS, GOODWILL,
            USE, DATA, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR RELATING TO
            THE USE OF, OR INABILITY TO USE, THE SERVICES.
          </p>
        </section>

        {/* Governing Law */}
        <section className="mb-10">
          <h2 className="text-2xl font-heading text-primary font-semibold mb-4">
            6. Governing Law
          </h2>
          <p className="text-neutral leading-relaxed mb-4">
            These Terms shall be governed by and construed in accordance with
            the laws of the State of Rajasthan, India, without regard to its
            conflict of law provisions. You agree to submit to the exclusive
            jurisdiction of the courts located in Jaipur, Rajasthan for the
            resolution of any disputes arising out of or relating to these Terms
            or the Services.
          </p>
        </section>

        {/* Changes to Terms */}
        <section className="mb-10">
          <h2 className="text-2xl font-heading text-primary font-semibold mb-4">
            7. Changes to Terms
          </h2>
          <p className="text-neutral leading-relaxed mb-4">
            [Your Company Name] reserves the right to modify or revise these
            Terms at any time without prior notice. By continuing to access or
            use the Services after any such changes become effective, you agree
            to be bound by the revised Terms. It is your responsibility to
            review these Terms periodically for any updates or changes.
          </p>
        </section>

        {/* Contact Us */}
        <section className="mb-10">
          <h2 className="text-2xl font-heading text-primary font-semibold mb-4">
            8. Contact Us
          </h2>
          <p className="text-neutral leading-relaxed">
            If you have any questions about these Terms and Conditions, please
            contact us at:
          </p>
          <p className="text-secondary font-semibold">
            Parts point
            <br />
            Plot-9 Shyam Nagar, Tonk Rd, opp. Lal bagh, Bilwa,
            <br />
            Jaipur, Rajasthan 302022
            <br />
            <br />
            +91 9468929392
          </p>
        </section>
      </div>
    </div>
  );
};

export default page;
