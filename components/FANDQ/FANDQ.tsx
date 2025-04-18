"use client";
import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

interface FaqItem {
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
  {
    question: "How do I find the right part number for my vehicle?",
    answer:
      "Enter your vehicle's make, model, and year in our search bar. You can also enter the part number directly if you have it. Our database will match compatible parts for you.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We accept returns within 30 days of purchase. Parts must be unused, in original packaging, and accompanied by a receipt or proof of purchase. Please refer to our Returns & Exchanges page for detailed instructions.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes, we ship worldwide. Shipping costs and delivery times vary based on destination. Add your items to the cart and enter your address at checkout to see available shipping options.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Standard shipping typically takes 5-7 business days within the country. Expedited options are available at checkout for faster delivery. International orders may take 10-20 business days depending on customs processing.",
  },
  {
    question: "Can I track my order?",
    answer:
      "Absolutely! Once your order ships, we will send you a tracking number via email. You can use it to monitor the status of your delivery.",
  },
];

const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-light py-8 px-4 sm:px-6 lg:px-8 font-body">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-heading text-primary mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqData.map((item, idx) => (
            <div
              key={idx}
              className="border border-border rounded-lg overflow-hidden"
            >
              <button
                onClick={() => handleToggle(idx)}
                className="w-full flex justify-between items-center px-4 py-3 bg-white hover:bg-light transition"
              >
                <span className="text-lg font-medium text-neutral">
                  {item.question}
                </span>
                {openIndex === idx ? (
                  <FiChevronUp className="text-secondary" size={20} />
                ) : (
                  <FiChevronDown className="text-secondary" size={20} />
                )}
              </button>
              {openIndex === idx && (
                <div className="px-4 py-3 bg-white border-t border-border text-neutral">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
