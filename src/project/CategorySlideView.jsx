import React, { useEffect, useState } from "react";
import './css/home.css';
import { Link } from "react-router-dom";


const CategorySlideView = () => {
    const trainCompartment = [
        {
            link1: '/genre/strategy',
            link2: '/genre/adventure',
            link3: '/genre/sports',
            images: [
                './imgs/category/Str.png',
                './imgs/category/AD.png',
                './imgs/category/football_manager2024_allsports_photo.png'
            ]
        },
        {
            link1: '/genre/survival',
            link2: '/genre/horror',
            link3: '/genre/rpg',
            images: [
                './imgs/category/project_zomboid_survival_photo.png',
                './imgs/category/elden_ring_horror_photo.png',
                './imgs/category/palworld_animation_photo.png'
            ]
        },
        {
            link1: '/genre/fps',
            link2: '/genre/racing',
            link3: '/genre/simulation',
            images: [
                './imgs/category/FPS.png',
                './imgs/category/forza_horizon4_racing_photo.png',
                './imgs/category/stardew_valley_simulation_photo.png'
            ]
        }
    ];

    const [curSlide, setCurSlide] = useState(0); // 이미지 슬라이드에서 표출되는 이미지 번호
    const [intervalId, setIntervalId] = useState(null);

    const autoMoveSlide = () => {
        if (intervalId !== null) {
            clearInterval(intervalId);
        }

        setIntervalId(
            setInterval(() => {
                setCurSlide((prevState) => 
                prevState < LAST_SLIDE_INDEX
                ?
                prevState + MOVE_SLIDE_INDEX
                :
                FIRST_SLIDE_INDEX);
            }, 3000)
        );
    }

    useEffect(() => {
        autoMoveSlide();
        return () => clearInterval(intervalId);
    }, []);

    const FIRST_SLIDE_INDEX = 0; // 이미지 슬라이드의 시작 번호
    const LAST_SLIDE_INDEX = trainCompartment.length - 1; // 이미지 슬라이드의 끝 번호
    const MOVE_SLIDE_INDEX = 1; // 이미지 슬라이드 이동 값

    const moveToSlide = (value) => {
        if (value === 'next') {
            // 슬라이드 끝점에 도달했을 때 curSlide의 값을 바꿔 처음으로 돌아가게 한다.
            setCurSlide((prevState) =>
            prevState < LAST_SLIDE_INDEX
            ?
            prevState + MOVE_SLIDE_INDEX
            :
            FIRST_SLIDE_INDEX);
        }
        if (value === 'prev') {
            // 슬라이드 시작점에 도달했을 때 curSlide의 값을 바꿔 마지막으로 돌아가게 한다.
            setCurSlide((prevState) =>
            prevState > FIRST_SLIDE_INDEX
            ?
            prevState - MOVE_SLIDE_INDEX
            :
            LAST_SLIDE_INDEX);
        }
    };

    const handlePaginationClick = (index) => {
        setCurSlide(index);
        autoMoveSlide();
    }

    return(
        <div className="train"> 
            <button className="prev-button" onClick={() => moveToSlide('prev')}><img src="./imgs/leftarrow.png" className="arw"/></button>
            <div className="show">
                {
                    trainCompartment.map((item, index) => (
                        <div className="compartment" key={index}
                        style={{transform: `translateX(${-1100 * curSlide}px)`,  
                                transition: 'all 0.4s ease-in-out',
                        }}>
                            <Link to={item.link1} className="img-link">
                                <img src={item.images[0]} alt="Slide 1" className="slide-image"/>
                            </Link>
                            <Link to={item.link2} className="img-link">
                                <img src={item.images[1]} alt="Slide 2" className="slide-image"/>
                            </Link>
                            <Link to={item.link3} className="img-link">
                                <img src={item.images[2]} alt="Slide 3" className="slide-image"/>
                            </Link>
                        </div>
                    ))
                }
                </div>
                <ol className="slide-index">
                    {
                        trainCompartment.map((_, index) => (
                            <li key={index}
                            className={`index-item ${curSlide === index ? 'active' : ''}`}
                            onClick={() => handlePaginationClick(index)}>
                                {/* {index + 1} */}
                            </li>
                        ))
                    }
                </ol>
                <button className="next-button" onClick={() => moveToSlide('next')}><img src="./imgs/rightarrow.png" className="arw"/></button>
        </div>
    );
};

export default CategorySlideView;