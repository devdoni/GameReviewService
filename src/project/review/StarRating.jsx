import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import '../css/review.css';

const StarRating = ({ rating, setRating }) => {
    const [hover, setHover] = useState(null);

    return (
        <div className="custom-star-rating">
            {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;

                return (
                    <label key={index}>
                        <input
                            type="radio"
                            name="rating"
                            value={ratingValue}
                            checked={rating === ratingValue}
                            onChange={() => setRating(ratingValue)}
                            style={{ display: 'none' }}
                        />
                        <FaStar
                            className="star"
                            size={30}
                            color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(null)}
                            onClick={() => setRating(ratingValue)}
                            style={{ cursor: 'pointer' }}
                        />
                    </label>
                );
            })}
        </div>
    );
};

export default StarRating;