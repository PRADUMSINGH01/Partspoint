"use client";
import { useState } from "react";
import { FaStar, FaUserCircle } from "react-icons/fa";

// ----------- Interfaces -----------
interface Review {
  author: string;
  rating: number;
  text: string;
  timestamp?: string;
}

// ----------- Star Component -----------
const StarRating = ({ rating }: { rating: number }) => {
  const stars = Array.from({ length: 5 }, (_, index) => (
    <FaStar
      key={index}
      className={`h-4 w-4 sm:h-5 sm:w-5 ${
        index < rating ? "text-primary" : "text-gray-300"
      }`}
    />
  ));
  return <div className="flex items-center">{stars}</div>;
};

// ----------- Review Card -----------
const ReviewCard = ({ review }: { review: Review }) => {
  return (
    <div className="bg-white rounded-md shadow-sm border border-gray-200 p-4 sm:p-6 h-full max-w-2xl">
      <div className="flex items-start mb-3">
        <div className="mr-3">
          <FaUserCircle className="h-8 w-8 text-gray-400" />
        </div>
        <div>
          <h4 className="text-sm sm:text-base font-semibold text-gray-800">
            {review.author}
          </h4>
          {review.timestamp && (
            <p className="text-xs sm:text-sm text-gray-500">
              {review.timestamp}
            </p>
          )}
        </div>
      </div>
      <div className="mb-2">
        <StarRating rating={review.rating} />
      </div>
      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
        {review.text}
      </p>
    </div>
  );
};

// ----------- Reviews List (Slider) -----------
const ReviewsList = ({ reviews }: { reviews: Review[] }) => {
  return (
    <div className="mt-6">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
        Customer Reviews
      </h2>
      {reviews.length > 0 ? (
        <div className="flex overflow-x-auto space-x-4 scrollbar-hide -mx-4 px-4">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full sm:w-auto sm:min-w-[350px]"
            >
              <ReviewCard review={review} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No reviews yet.</p>
      )}
    </div>
  );
};

// ----------- Add Review Form -----------
const AddReviewForm = ({
  onReviewSubmit,
}: {
  onReviewSubmit: (newReview: Review) => void;
}) => {
  const [rating, setRating] = useState<number | null>(null);
  const [reviewText, setReviewText] = useState("");
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const author = "You";

  const handleStarClick = (value: number) => setRating(value);
  const handleStarHover = (value: number) => setHoveredStar(value);
  const handleStarLeave = () => setHoveredStar(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (rating && reviewText.trim()) {
      onReviewSubmit({
        author,
        rating,
        text: reviewText,
        timestamp: new Date().toLocaleDateString(),
      });
      setRating(null);
      setReviewText("");
    } else {
      alert("Please provide a rating and review text.");
    }
  };

  const stars = Array.from({ length: 5 }, (_, index) => {
    const starValue = index + 1;
    const isFilled = starValue <= (hoveredStar || rating || 0);
    return (
      <FaStar
        key={starValue}
        className={`h-5 w-5 mr-1 cursor-pointer ${
          isFilled ? "text-primary" : "text-gray-300"
        }`}
        onClick={() => handleStarClick(starValue)}
        onMouseEnter={() => handleStarHover(starValue)}
        onMouseLeave={handleStarLeave}
      />
    );
  });

  return (
    <div className="mt-8 border border-gray-200 rounded-md p-4 sm:p-6 bg-white shadow-sm">
      <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
        Leave a Review
      </h3>
      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Rating:
        </label>
        <div className="flex items-center">{stars}</div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Your Feedback:
        </label>
        <textarea
          rows={3}
          className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Share your experience..."
        />
      </div>
      <button
        type="submit"
        onClick={handleSubmit}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        Submit
      </button>
    </div>
  );
};

// ----------- Main Section Wrapper -----------
const ReviewsSection = ({ initialReviews }: { initialReviews: Review[] }) => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);

  const handleReviewSubmit = (newReview: Review) => {
    setReviews([newReview, ...reviews]);
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <ReviewsList reviews={reviews} />
      <AddReviewForm onReviewSubmit={handleReviewSubmit} />
    </div>
  );
};

// ----------- Sample Usage -----------
const sampleReviews: Review[] = [
  {
    author: "Aisha Khan",
    rating: 5,
    text: "Absolutely fantastic product! Exceeded my expectations.",
    timestamp: "2025-04-17",
  },
  {
    author: "Prakash Sharma",
    rating: 4,
    text: "Good product overall. Reliable performance.",
    timestamp: "2025-04-15",
  },
  {
    author: "Fatima Rizvi",
    rating: 3,
    text: "Okay product. Took time to set up but works now.",
    timestamp: "2025-04-10",
  },
  {
    author: "John Doe",
    rating: 5,
    text: "Longer review for horizontal scroll. Works great!",
    timestamp: "2025-04-18",
  },
];

const ExampleReviewsPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-center py-8">Product Reviews</h1>
      <ReviewsSection initialReviews={sampleReviews} />
    </div>
  );
};

export default ExampleReviewsPage;
