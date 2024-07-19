import React from 'react';
import '../css/review.css';
import { FaStar } from 'react-icons/fa';

const StarRating = ({ rating, setRating }) => {
    return (
        <div className="star-rating">
            {[...Array(5)].map((star, index) => {
                const ratingValue = 5 - index;

                return (
                    <label key={index}>
                        <input
                            type="radio"
                            name="rating"
                            value={ratingValue}
                            checked={rating === ratingValue}
                            onChange={() => setRating(ratingValue)}
                        />
                        <FaStar
                            size={50}
                            color={ratingValue <= rating ? "#ffc107" : "#e4e5e9"}
                        />
                    </label>
                );
            })}
        </div>
    );
};

export default StarRating;