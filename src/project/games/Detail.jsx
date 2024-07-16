import React from "react";
import { useParams } from "react-router-dom";
import '../css/common.css';
import '../css/detail.css';
import popularDB from './popularDB.json'; //popularDB.json 파일을 불러옴

const Detail = () => {

    const { no } = useParams();                                     // Popular가 나한테 전달한 no값

    const gameDetail = popularDB.find(p => p.no === parseInt(no));  // no값을 이용해서 DB에서 게임의 모든 정보를 가져옴

/*     console.log('[Detail] gameDetail.detail_img_01: ', gameDetail.detail_img_01);
 */

    return(
    <>
        <div id="gamesinfo_wrap">
            <div className="detail_header">
                <h1>{gameDetail.Name}</h1>
            </div>


            <div className="per_game_info">

                <div className="game_pics">

                    <div><img src={'/imgs/data/' + gameDetail.detail_img_dir + '/' +gameDetail.detail_img_01} /></div>
                    <div><img src={'/imgs/data/' + gameDetail.detail_img_dir + '/' +gameDetail.detail_img_02} /></div>
                    <div><img src={'/imgs/data/' + gameDetail.detail_img_dir + '/' +gameDetail.detail_img_03} /></div>
                    <div><img src={'/imgs/data/' + gameDetail.detail_img_dir + '/' +gameDetail.detail_img_04} /></div>

        
                </div>

                <div className="game_info">
                    <div>이름:{gameDetail.Name}</div>
                    <div>출시시간:{gameDetail.date}</div>
                    <div>게임소개:{gameDetail.description}</div>
                </div>

                <div className="game_info_detail">               {/* 예시 게임정보 더 필요하면 popularDB.json 파일에 추가해주세요. */}
                    <div>플레이어수:{gameDetail.player_num}</div> 
                    <div>게임시간:{gameDetail.play_time}</div>
                    <div>게임종류:{gameDetail.genre}</div>
                </div>
            
            </div>
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