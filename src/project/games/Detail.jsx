import React from "react";
import { useParams } from "react-router-dom";
import '../css/common.css';
import '../css/detail.css';
const Detail = () => {

    const { no } = useParams();

    return(
        <>
        <div>
            Detail
            <br />
            {no}
        </div>
    <div id="detail_wrap">
        <div class="container">
            <h2>리뷰를 작성해주세요</h2>
            <form id="ratingForm">
        <div class="rating">
            <input type="radio" id="star5" name="rating" value="5" />
            <label for="star5"></label>
            <input type="radio" id="star4" name="rating" value="4" />
            <label for="star4"></label>
            <input type="radio" id="star3" name="rating" value="3" />
            <label for="star3"></label>
            <input type="radio" id="star2" name="rating" value="2" />
            <label for="star2"></label>
            <input type="radio" id="star1" name="rating" value="1" />
            <label for="star1"></label>
        </div>
            <input type="text" id="review" class="review-box" placeholder="리뷰를 작성해주세요..." />
                <input type="submit" class="submit-btn" value="제출하기" />
                </form>
            <div class="result" id="result"></div>
        </div>
    </div>
    </>
    );
}

export default Detail;