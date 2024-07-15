import React from "react";
import '../css/recom.css';
const Recomended = () => {
    return(
        <div id="#recom_wrap">
            <div className="recom_title">
                어떤 게임을 추천받고싶나요?
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
                        <span className="text">스포츠</span>
                    </li>
                    <li className="category_li">
                        <span className="text">레이싱</span>
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


export default Recomended;