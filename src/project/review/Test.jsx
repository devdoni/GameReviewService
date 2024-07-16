import React from "react";
import ReviewList from "./ReviewList";

const Test = () => {
    const reviews = [
        {
            id: 1,
            score: 4,
            regDate: '2024년 7월 3일',
            text: '재밌는 게임이네요',
            uNick:'Player1'
        },
        {
            id: 2,
            score: 5,
            regDate: '2024년 7월 5일',
            text: '진짜 이런게임이 있다니!',
            uNick:'GamerPro',
        }
    ];

    return (
        <div>
            <ReviewList reviews={reviews} />
        </div>
    );
};

export default Test;