import React, { useState } from "react";
import '../css/review.css';
import { FaStar } from 'react-icons/fa';
const ReviewWrite = () => {
    
    // 별의 Index
    const ARRAY = [0, 1, 2, 3, 4];

    // Hook
    const [score, setScore] = useState([false, false, false, false, false]);
    const [hoverIndex, setHoverIndex] = useState(-1);

    const starScore = index => {

        // 현재 클릭된 별이 이미 활성화된 상태인지 확인
        const isCurrentlyActive = score[index];

        // 모든 별을 비활성화
        let star = [false, false, false, false, false];

        // 현재 클릭된 별이 비활성화된 상태라면 해당 별까지 활성화
        if (!isCurrentlyActive) {
            for (let i = 0; i <= index; i++) {
                star[i] = true;
            }
        }
        setScore(star);
    };

    return (
        <div id="detail_wrap">
            <div className="container">
                <h2>해당 게임에 대한 리뷰 작성</h2>
                <form id="ratingForm">
                    <div className="form-content">
                        <textarea id="review" className="review-box" placeholder="리뷰를 작성해주세요."></textarea>
                    </div>
                    <div className="options">
                        <div className="recommendation">
                            <label>별점을 선택해주세요</label>
                            {ARRAY.map((el, index) => (
                                <FaStar
                                    key={index}
                                    size="25"
                                    color={
                                        hoverIndex >= index || score[index]
                                            ? "#ffc107"
                                            : "#e4e5e9"
                                    }
                                    onClick={() => starScore(index)}
                                    onMouseEnter={() => setHoverIndex(index)}
                                    onMouseLeave={() => setHoverIndex(-1)}
                                    style={{ cursor: 'pointer' }}
                                />
                            ))}
                        </div>
                    </div>
                    <input type="button" className="submit-btn" value="리뷰 작성" />
                </form>
            </div>
        </div>
    );
};
export default ReviewWrite;