import React from 'react';
import { FaStar } from 'react-icons/fa';
import '../css/review.css';

const StarRating = ({ rating, setRating }) => {
    
    const handleRatingClick = (ratingValue) => {
        setRating(rating === ratingValue ? 0 : ratingValue);
    };

    return (
        <div className="star-rating">
            {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1; 

                return (
                    <label key={index}>
                        <input
                            type="radio"
                            name="rating"
                            value={ratingValue}
                            checked={rating === ratingValue}
                            onChange={() => handleRatingClick(ratingValue)}
                            style={{ display: 'none' }} // 숨김
                        />
                        <FaStar
                            size={50}
                            color={ratingValue <= rating ? "#ffc107" : "#e4e5e9"}
                            onClick={() => handleRatingClick(ratingValue)}
                            style={{ cursor: 'pointer' }}
                        />
                    </label>
                );
            })}
        </div>
    );
};

export default StarRating;