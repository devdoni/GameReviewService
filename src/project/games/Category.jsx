import React from "react";
import '../css/recom.css';
const Category = () => {
    return(
        <div id="#recom_wrap">
            <div className="recom_title">
                카테고리를 선택해주세요
            </div>
            <div className="recom_category">
                <ul className="category_ul">
                    <li className="category_li">
                        <span className="text">RPG</span>
                    </li>
                    <li className="category_li">
                        <span className="text">생존</span>
                    </li>
                    <li className="category_li">
                        <span className="text">오픈월드</span>
                    </li>
                    <li className="category_li">
                        <span className="text">스포츠</span>
                    </li>
                    <li className="category_li">
                        <span className="text">레이싱</span>
                    </li>
                    <li className="category_li">
                        <span className="text">퍼즐</span>
                    </li>
                    <li className="category_li">
                        <span className="text">액션</span>
                    </li>
                    <li className="category_li">
                        <span className="text">시뮬레이션</span>
                    </li>
                    <li className="category_li">
                        <span className="text">전략</span>
                    </li>
                    <li className="category_li">
                        <span className="text">공포</span>
                    </li>
                    <li className="category_li">
                        <span className="text">어드벤처</span>
                    </li>
                    <li className="category_li">
                        <span className="text">FPS</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}


export default Category;