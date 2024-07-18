import React from 'react';
import { FaStar } from 'react-icons/fa';
import '../css/review.css'

const ReviewList = ({ reviews }) => {

    return (
        <div id="review_list">
            {reviews.map(review => (
                <div key={review.id} className="review_item">
                    <div className="review_header">
                    <div className="nickname">
                            {review.uNick}
                        </div>
                        <div id="rating">
                            {Array(5).fill(0).map((_, index) => (
                                <FaStar
                                    key={index}
                                    size="20"
                                />
                            ))}
                        </div>
                    </div>
                    <div className="review_text">
                        {review.text}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ReviewList;

